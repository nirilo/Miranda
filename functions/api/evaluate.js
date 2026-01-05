export async function onRequest(context) {
  return handleEvaluate(context.request, context.env);
}
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
    Refuse non-fabric items. Output JSON with keys: score (1-5 or null), label, confidence (0-1), confidence_label (low|medium|high), issues (array of short issue strings), repair_needed (bool), advice (string). If you return a field named stage, also include score with the same value.
  `.trim();

  const userText = `Item type: ${itemType}. Rate the fabric condition from the three photos.`;
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
    label: data.label || fallbackLabel || "Rated",
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
