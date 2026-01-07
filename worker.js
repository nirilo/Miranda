export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.hostname === "mirandas.gr") {
      return Response.redirect(
        `https://www.mirandas.gr${url.pathname}${url.search}`,
        308
      );
    }

    if (url.pathname === "/api/evaluate") {
      return handleEvaluate(request, env);
    }

    if (url.pathname.startsWith("/api/contact")) {
      return handleContactRoutes(request, env, url);
    }

    //testing area
    // if (url.pathname === "/api/ai-health") {
    //   return aiHealth(request, env);
    // }

    return new Response(JSON.stringify({ ok: false, error: "Not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  },
};

//testing area
// async function aiHealth(request, env) {
//   const key = env?.AI_API_KEY;
//   if (!key) return new Response("Missing AI_API_KEY", { status: 500 });

//   const res = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: { "content-type": "application/json", Authorization: `Bearer ${key}` },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: "Say OK" }],
//       max_tokens: 5,
//     }),
//   });

//   const text = await res.text();
//   return new Response(text, { status: res.status, headers: { "content-type": "application/json" } });
// }


async function handleEvaluate(request, env) {
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
  const MAX_BYTES = 15 * 1024 * 1024; // 15MB cap
  if (contentLength && contentLength > MAX_BYTES) {
    return new Response(JSON.stringify({ error: "Payload too large" }), { status: 413, headers: corsHeaders(request) });
  }

  let form;
  try {
    form = await request.formData();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid form data" }), { status: 400, headers: corsHeaders(request) });
  }

  const photos = ["photo1", "photo2", "photo3"].map((key) => form.get(key));
  const itemType = (form.get("itemType") || "").toString().trim().toLowerCase();

  if (!itemType || !["clothing", "curtain", "other fabric"].includes(itemType)) {
    return new Response(JSON.stringify({
      score: null,
      stage: null,
      label: "Unsupported item",
      confidence: 0,
      confidence_label: "low",
      issues: [],
      issues_detected: [],
      repair_needed: false,
      advice: "Only fabric items are supported. Choose clothing, curtain, or other fabric.",
      notes: "Only fabric items are supported. Choose clothing, curtain, or other fabric."
    }), { status: 400, headers: corsHeaders(request) });
  }

  if (photos.some((p) => !isImageFile(p))) {
    return new Response(JSON.stringify({ error: "All three images are required and must be images." }), { status: 400, headers: corsHeaders(request) });
  }

  const MAX_FILE = 6 * 1024 * 1024; // 6MB per image (post compression expected)
  const totalBytes = photos.reduce((sum, file) => sum + (file.size || 0), 0);
  if (!totalBytes) {
    return new Response(JSON.stringify({ error: "Images missing or empty." }), { status: 400, headers: corsHeaders(request) });
  }
  if (totalBytes > MAX_BYTES) {
    return new Response(JSON.stringify({ error: "Images too large after compression." }), { status: 413, headers: corsHeaders(request) });
  }
  if (photos.some((p) => (p.size || 0) > MAX_FILE)) {
    return new Response(JSON.stringify({ error: "A single image exceeds the allowed size." }), { status: 413, headers: corsHeaders(request) });
  }

  // Basic non-fabric guard by filename cue (lightweight heuristic)
  const nameStr = photos.map((p) => (p.name || "").toLowerCase()).join(" ");
  const banned = ["shoe", "boot", "sneaker", "watch", "ring", "necklace", "phone", "laptop", "tablet", "camera", "electronics"];
  if (banned.some((word) => nameStr.includes(word))) {
    return new Response(JSON.stringify({
      score: null,
      stage: null,
      label: "Non-fabric item",
      confidence: 0,
      confidence_label: "low",
      issues: [],
      issues_detected: [],
      repair_needed: false,
      advice: "Only fabric items are supported (clothing, curtains, textiles).",
      notes: "Only fabric items are supported (clothing, curtains, textiles)."
    }), { status: 400, headers: corsHeaders(request) });
  }

  try {

    const payload = await runEvaluation(photos, itemType, env);
    return new Response(JSON.stringify(payload), { status: 200, headers: corsHeaders(request) });
  } catch (err) {
    
    const mock = mockResponse("Service unavailable, returning mock.");
    mock.mock = true;
    console.error("Evaluation failed:", err?.stack || err);
    return new Response(JSON.stringify(mock), { status: 503, headers: corsHeaders(request) });
  }
}

async function runEvaluation(files, itemType, env) {
  const key = env?.AI_API_KEY;
  if (!key) {
    return mockResponse("No AI_API_KEY set. Returning mock response.");
  }

  const imagesBase64 = [];
  for (const file of files) {
    try {
      imagesBase64.push(await toBase64(file));
    } catch (err) {
      return mockResponse("Could not process images. Returning mock response.");
    }
  }
  const rubric = `
    You are a fabric condition rater. Score 1-5 using:
    1 Unwearable: major tears/holes, heavy staining, severe degradation
    2 Needs fixing: missing buttons, seam rip, small hole, zipper issue
    3 Home use: noticeable wear/stains/fading/pilling; ok mainly for home
    4 Used but wearable: minor signs; no major defects
    5 Like new: no visible defects
    Refuse non-fabric items. Output JSON with keys: score (1-5 or null), label, confidence (0-1), confidence_label (low|medium|high), issues (array of short issue strings), repair_needed (bool), advice (string). If you return a field named stage, also include score with the same value. All text values (label, issues, advice/notes/comments) must be written in Greek; keep the JSON keys in English.
  `.trim();

  const userText = `Item type: ${itemType}. Rate the fabric condition from the three photos. Reply in Greek.`;
  const visionPayload = {
    model: "gpt-4o-mini",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: rubric },
      {
        role: "user",
        content: [
          { type: "text", text: userText },
          ...imagesBase64.map((b64) => ({
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${b64}` }
          }))
        ]
      }
    ]
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify(visionPayload)
  });
  const bodyText = await res.text();

  if (!res.ok) {
    console.log("OpenAI error:", res.status, bodyText);
    throw new Error(`OpenAI HTTP ${res.status}: ${bodyText}`);
  }
  const json = JSON.parse(bodyText);
  const text = json?.choices?.[0]?.message?.content || "";
  return safeParseResponse(text);
}

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";

  const allowed = new Set([
    "https://mirandas.gr",
    "https://www.mirandas.gr",
  ]);

  const h = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (allowed.has(origin)) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Vary"] = "Origin";
  }

  return h;
}

function safeParseResponse(text) {
  try {
    const parsed = JSON.parse(text);
    return normalizePayload(parsed);
  } catch (err) {
    return mockResponse("AI response could not be parsed. Returning mock.");
  }
}

function normalizePayload(data) {
  const rawScore = data.score ?? data.stage ?? null;
  const hasScore = rawScore !== null && rawScore !== undefined && rawScore !== "";
  const numericScore = hasScore ? Number(rawScore) : NaN;
  const score = Number.isFinite(numericScore) ? clamp(Math.round(numericScore), 1, 5) : null;
  const conf = Number(data.confidence ?? 0);
  const issues = Array.isArray(data.issues)
    ? data.issues
    : Array.isArray(data.issues_detected)
      ? data.issues_detected
      : [];
  const advice = data.advice || data.comments || data.notes || "";
  const labelIdx = score ? score - 1 : null;
  const fallbackLabel = Number.isInteger(labelIdx) && labelIdx >= 0 ? stageLabels()[labelIdx] : null;
  return {
    score,
    stage: score,
    label: fallbackLabel || "Rated",
    confidence: Number.isFinite(conf) ? conf : 0,
    confidence_label: data.confidence_label || confidenceLabel(conf),
    issues,
    issues_detected: issues,
    repair_needed: typeof data.repair_needed === "boolean" ? data.repair_needed : Boolean(data.repair),
    advice,
    notes: advice
  };
}

function confidenceLabel(value) {
  if (value >= 0.75) return "high";
  if (value >= 0.45) return "medium";
  return "low";
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function stageLabels() {
  return ["Φθαρμένο (σόρρυ)", "Θέλει φροντίδα κ' προδέρμ", "Καλούτσικη κατάσταση", "Έτοιμο για έξω, πένα!", "Σαν καινούριο, εύγε."];
}

function mockResponse(notes) {
  const score = 4;
  const advice = notes || "Mock response: add your AI key for live scoring.";
  return {
    mock: true,
    score,
    stage: score,
    label: stageLabels()[score - 1],
    confidence: 0.52,
    confidence_label: "medium",
    issues: ["Mock: sample wear note"],
    issues_detected: ["Mock: sample wear note"],
    repair_needed: false,
    advice,
    notes: advice
  };
}


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

// --- utilities ---
function isImageFile(p) {
  return p && typeof p === "object" && typeof p.type === "string" && p.type.startsWith("image/") && typeof p.size === "number";
}

async function toBase64(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  const chunks = [];
  for (let i = 0; i < bytes.length; i += chunkSize) {
    chunks.push(String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize)));
  }
  return btoa(chunks.join(""));
}

const rateMap = new Map();
function rateLimit(request) {
  const now = Date.now();
  const WINDOW = 60_000;
  const LIMIT = 20;
  const key = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "anon";
  const bucket = rateMap.get(key) || [];
  const recent = bucket.filter((ts) => now - ts < WINDOW);
  if (recent.length >= LIMIT) {
    rateMap.set(key, recent);
    return { ok: false };
  }
  recent.push(now);
  rateMap.set(key, recent);
  return { ok: true };
}

function looksLikeEmail(value) {
  const s = String(value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
