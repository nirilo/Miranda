export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.hostname === "mirandas.gr") {
      url.hostname = "www.mirandas.gr";
      return Response.redirect(`https://www.mirandas.gr${url.pathname}${url.search}`, 308);
    }

     if (url.pathname === "/evaluate" || url.pathname === "/evaluate/"|| url.pathname === "/condition/" || url.pathname === "/condition") {
      url.pathname = "/condition.html";
      request = new Request(url.toString(), request);
      return env.ASSETS.fetch(request);
    }

    if (url.pathname === "/api/evaluate") {
      return handleEvaluate(request, env);
    }

    if (url.pathname.startsWith("/api/contact")) {
      return handleContactRoutes(request, env, url);
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleContactRoutes(request, env, url) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(request) });
  }

  if (url.pathname === "/api/contact") return handleContact(request, env);

  // Admin-only endpoints for viewing messages/photos:
  if (url.pathname === "/api/contact/list") return handleContactList(request, env, url);
  if (url.pathname === "/api/contact/get") return handleContactGet(request, env, url);
  if (url.pathname === "/api/contact/file") return handleContactFile(request, env, url);

  return new Response(JSON.stringify({ ok: false, error: "Not found" }), {
    status: 404,
    headers: corsHeaders(request),
  });
}

function requireAdmin(url, env) {
  const token = url.searchParams.get("token") || "";
  return Boolean(env.ADMIN_TOKEN) && token === env.ADMIN_TOKEN;
}

function safeFilename(name) {
  return (name || "photo")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function handleContactList(request, env, url) {
  if (!requireAdmin(url, env)) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), { status: 401, headers: corsHeaders(request) });
  }
  if (!env.CONTACT_KV) {
    return new Response(JSON.stringify({ ok: false, error: "CONTACT_KV not bound" }), { status: 500, headers: corsHeaders(request) });
  }

  const limit = Math.min(Number(url.searchParams.get("limit") || 50), 100);
  const listed = await env.CONTACT_KV.list({ prefix: "contact:", limit });

  const items = [];
  for (const k of listed.keys) {
    const v = await env.CONTACT_KV.get(k.name, "json");
    if (v) items.push(v);
  }

  // newest first (by receivedAt)
  items.sort((a, b) => (b.receivedAt || "").localeCompare(a.receivedAt || ""));
  return new Response(JSON.stringify({ ok: true, items }), { status: 200, headers: corsHeaders(request) });
}

async function handleContactGet(request, env, url) {
  if (!requireAdmin(url, env)) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), { status: 401, headers: corsHeaders(request) });
  }
  if (!env.CONTACT_KV) {
    return new Response(JSON.stringify({ ok: false, error: "CONTACT_KV not bound" }), { status: 500, headers: corsHeaders(request) });
  }

  const id = (url.searchParams.get("id") || "").trim();
  if (!id) {
    return new Response(JSON.stringify({ ok: false, error: "Missing id" }), { status: 400, headers: corsHeaders(request) });
  }

  const record = await env.CONTACT_KV.get(`contact:${id}`, "json");
  if (!record) {
    return new Response(JSON.stringify({ ok: false, error: "Not found" }), { status: 404, headers: corsHeaders(request) });
  }

  return new Response(JSON.stringify({ ok: true, record }), { status: 200, headers: corsHeaders(request) });
}

async function handleContactFile(request, env, url) {
  if (!requireAdmin(url, env)) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), { status: 401, headers: corsHeaders(request) });
  }
  if (!env.CONTACT_UPLOADS) {
    return new Response(JSON.stringify({ ok: false, error: "CONTACT_UPLOADS not bound" }), { status: 500, headers: corsHeaders(request) });
  }

  const key = (url.searchParams.get("key") || "").trim();
  if (!key) {
    return new Response(JSON.stringify({ ok: false, error: "Missing key" }), { status: 400, headers: corsHeaders(request) });
  }

  const obj = await env.CONTACT_UPLOADS.get(key);
  if (!obj) {
    return new Response(JSON.stringify({ ok: false, error: "Not found" }), { status: 404, headers: corsHeaders(request) });
  }

  const headers = {
    ...corsHeaders(request),
    "Cache-Control": "no-store",
    "Content-Type": obj.httpMetadata?.contentType || "application/octet-stream",
  };

  return new Response(obj.body, { status: 200, headers });
}


async function handleContact(request, env) {

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders(request) });
    }

    const rateStatus = rateLimit(request);
    if (!rateStatus.ok) {
      return new Response(JSON.stringify({ error: "Too many requests. Please slow down." }), { status: 429, headers: corsHeaders(request) });
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("multipart/form-data")) {
      return new Response(JSON.stringify({ error: "Content-Type must be multipart/form-data" }), { status: 400, headers: corsHeaders(request) });
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    const MAX_BYTES = 10 * 1024 * 1024;
    if (contentLength && contentLength > MAX_BYTES) {
      return new Response(JSON.stringify({ error: "Payload too large" }), { status: 413, headers: corsHeaders(request) });
    }

    let form;
    try {
      form = await request.formData();
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid form data" }), { status: 400, headers: corsHeaders(request) });
    }

    const token = form.get("cf-turnstile-response");
    const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "";

    if (!token) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing Turnstile token" }),
        {
          status: 400,
          headers: corsHeaders(request),
        }
      );
    }

    const verifyBody = new FormData();
    verifyBody.append("secret", env.TURNSTILE_SECRET);
    verifyBody.append("response", token);
    if (ip) verifyBody.append("remoteip", ip);

    const resp = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: verifyBody,
      }
    );

    const outcome = await resp.json();

    if (!outcome.success) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Turnstile failed",
          codes: outcome["error-codes"],
        }),
        {
          status: 403,
          headers: corsHeaders(request),
        }
      );
    }

  
    const name = (form.get("name") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim();
    const details = (form.get("details") || "").toString().trim();
    const lang = (form.get("lang") || "").toString().trim();

    if (!name || !email || !details) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), { status: 400, headers: corsHeaders(request) });
    }
    if (!looksLikeEmail(email)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid email" }), { status: 400, headers: corsHeaders(request) });
    }

    // Photos: allow multiple files under the field name "photos"
    const photos = form.getAll("photos").filter((p) => isImageFile(p));
    const MAX_FILES = 5;
    const MAX_FILE = 4 * 1024 * 1024;
    const limitedPhotos = photos.slice(0, MAX_FILES);
    const totalBytes = limitedPhotos.reduce((sum, file) => sum + (file.size || 0), 0);
    if (limitedPhotos.some((p) => (p.size || 0) > MAX_FILE) || totalBytes > MAX_BYTES) {
      return new Response(JSON.stringify({ ok: false, error: "Photos too large" }), { status: 413, headers: corsHeaders(request) });
    }

    const submissionId = crypto.randomUUID();
    const receivedAt = new Date().toISOString();
    const userAgent = request.headers.get("user-agent") || "";

    const uploaded = [];
    if (env.CONTACT_UPLOADS && limitedPhotos.length) {
      for (let i = 0; i < limitedPhotos.length; i++) {
        const f = limitedPhotos[i];
        const key = `contact/${submissionId}/${String(i + 1).padStart(
          2,
          "0"
        )}-${safeFilename(f.name)}`;

        await env.CONTACT_UPLOADS.put(key, f.stream(), {
          httpMetadata: { contentType: f.type || "application/octet-stream" },
        });

        uploaded.push({
          key,
          name: f.name || "",
          type: f.type || "",
          size: f.size || 0,
        });
      }
    }

    const record = {
      id: submissionId, 
      receivedAt,
      ip,
      userAgent,
      lang,
      name,
      email,
      details,
      photos: uploaded,
    };

  if (env.CONTACT_KV && typeof env.CONTACT_KV.put === "function") {
    await env.CONTACT_KV.put(
      `contact:${submissionId}`,
      JSON.stringify(record),
      {
        expirationTtl: 60 * 60 * 24 * 90,
      }
    );
  } else {
    console.log("Contact submission", record);
  }

  return new Response(JSON.stringify({ ok: true, id: submissionId }), { status: 200, headers: corsHeaders(request) });
}

function looksLikeEmail(value) {
  const s = String(value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
