const translations = {
  en: {
    brandSubtitle: "atelier",
    nav: {
      home: "Home",
      about: "About",
      work: "Work",
      contact: "Contact",
      condition: "Condition Rater",
      toggle: "GR",
    },
    heroTag: "AI Fabric Condition Rater",
    heroTitle: "Check fabric health in 3 snaps",
    heroLead:
      "Upload a full item photo, a texture close-up, and any problem areas. We’ll score 1–5, note issues, and share quick advice.",
    heroBtnPrimary: "Start rating",
    heroBtnSecondary: "Need human help?",
    heroNoteTitle: "What you need",
    heroList: [
      "Good lighting, no flash",
      "Hold steady; fill the frame",
      "Focus on cuffs, collars, hems for issues",
    ],
    heroNoteFoot:
      "Your photos stay in-memory for scoring and are discarded right after.",
    wizardTitle: "3-step capture",
    wizardSubtitle: "Full item → texture → problem spots",
    steps: [
      {
        title: "Step 1 — Full item",
        body: "Capture the whole garment or curtain, laid flat or hanging.",
        hint: "Keep the item centered, even lighting, no flash.",
      },
      {
        title: "Step 2 — Texture close-up",
        body: "Show fabric texture for pilling, thinning, or fuzz.",
        hint: "Hold steady; let the weave fill the frame.",
      },
      {
        title: "Step 3 — Problem areas",
        body: "Focus on cuffs, collars, hems, stains, or tears.",
        hint: "Add any visible issues; we’ll flag what matters.",
      },
    ],
    uploadLabel: "Upload photo",
    retakeLabel: "Retake",
    noPhoto: "No photo yet",
    itemSelectTitle: "Select item type",
    itemSelectBody: "Choose the closest match so the AI uses the right rubric.",
    itemLabel: "Item",
    options: {
      clothing: "Clothing",
      curtain: "Curtain",
      other: "Other fabric",
    },
    finalReady: "Ready to evaluate all three photos.",
    back: "Back",
    next: "Next",
    evaluate: "Evaluate",
    resultTitle: "Result",
    resultSubtitle: "Score, noticed issues, and quick care advice",
    labels: {
      stage: "Overall fabric health (1-5)",
      confidence: "Confidence",
      repair: "Repair needed?",
      issues: "What we noticed",
      advice: "Quick care advice",
    },
    issuesEmpty: "No specific issues noted.",
    adviceEmpty: "No care advice provided.",
    tipsTitle: "Low confidence tips",
    tips: [
      "Retake in brighter, even lighting",
      "Keep the item centered and fill most of the frame",
      "Tap to focus on the fabric before shooting",
    ],
    faqTitle: "FAQ",
    faq: {
      q1: "Are photos stored?",
      a1: "No. They’re compressed in your browser, sent for scoring, then discarded.",
      q2: "Supported items?",
      a2: "Clothing, curtains, and other fabrics. Shoes/electronics/jewelry are refused.",
      q3: "No AI key?",
      a3: "You’ll see a mock response so you can test the flow.",
    },
    footer: {
      note: '© <span id="year"></span> Miranda — Creative repairs & alterations',
      about: "About",
      contact: "Contact",
    },
    status: {
      yes: "Yes",
      no: "No",
      high: "high",
      medium: "medium",
      low: "low",
    },
    stageLabels: [
      "Threadbare Tales",
      "Needs TLC",
      "Home Comfort",
      "Street Ready",
      "Like New",
    ],
    mockNotes:
      "Mock response - add your AI key to the worker for live scoring.",
    errors: { image: "Could not process the image. Try again." },
  },
  el: {
    brandSubtitle: "ατελιέ",
    nav: {
      home: "Αρχική",
      about: "Σχετικά",
      work: "Δουλειές",
      contact: "Επικοινωνία",
      condition: "Εκτίμηση Υφάσματος",
      toggle: "EN",
    },
    heroTag: "AI Εκτίμηση Κατάστασης Υφάσματος",
    heroTitle: "Έλεγχος υφάσματος σε 3 λήψεις",
    heroLead:
      "Ανεβάστε μια πλήρη φωτογραφία, ένα κοντινό υφής και τις προβληματικές περιοχές. Θα βαθμολογήσουμε 1–5 και θα δώσουμε συμβουλές για το ρούχο.",
    heroBtnPrimary: "Ξεκινήστε",
    heroBtnSecondary: "Θέλω άνθρωπο",
    heroNoteTitle: "Τι θα χρειαστείτε",
    heroList: [
      "Καλός φωτισμός, χωρίς φλας",
      "Κρατήστε σταθερά, γεμίστε το κάδρο",
      "Εστιάστε σε μανσέτες, γιακάδες, στριφώματα",
    ],
    heroNoteFoot:
      "Οι φωτογραφίες μένουν στη μνήμη για αξιολόγηση και διαγράφονται αμέσως μετά.",
    wizardTitle: "Λήψη σε 3 βήματα",
    wizardSubtitle: "Πλήρες ένδυμα → υφή → προβληματικά σημεία",
    steps: [
      {
        title: "Βήμα 1 — Πλήρες ένδυμα",
        body: "Φωτογραφίστε ολόκληρο το ρούχο ή την κουρτίνα, απλωμένα ή κρεμασμένα.",
        hint: "Κέντρο στο κάδρο, ομοιόμορφος φωτισμός, χωρίς φλας.",
      },
      {
        title: "Βήμα 2 — Κοντινό υφής",
        body: "Δείξτε την υφή για χνούδι, αραίωση ή pilling.",
        hint: "Κρατήστε σταθερά και γεμίστε το πλάνο με την ύφανση.",
      },
      {
        title: "Βήμα 3 — Προβληματικά σημεία",
        body: "Εστιάστε σε μανσέτες, γιακάδες, στριφώματα, λεκέδες ή σκισίματα.",
        hint: "Προσθέστε ό,τι φαίνεται... Θα το επισημάνουμε.",
      },
    ],
    uploadLabel: "Ανέβασμα φωτογραφίας",
    retakeLabel: "Ξανά",
    noPhoto: "Καμία φωτογραφία ακόμη",
    itemSelectTitle: "Επιλέξτε είδος",
    itemSelectBody:
      "Διαλέξτε το πιο κοντινό ώστε το AI να εφαρμόσει το σωστό κριτήριο.",
    itemLabel: "Είδος",
    options: { clothing: "Ρούχο", curtain: "Κουρτίνα", other: "Ύφασμα/άλλο" },
    finalReady: "Έτοιμο για αξιολόγηση και των τριών φωτογραφιών.",
    back: "Πίσω",
    next: "Επόμενο",
    evaluate: "Αξιολόγηση",
    resultTitle: "Αποτέλεσμα",
    resultSubtitle: "Σύντομη ανάγνωση με βεβαιότητα και συμβουλές",
    labels: {
      stage: "Βαθμός",
      confidence: "Βεβαιότητα",
      repair: "Χρειάζεται επιδιορθώση;",
      issues: "Θέματα που εντοπίστηκαν",
    },
    issuesEmpty: "Δεν εντοπίστηκαν εμφανή θέματα.",
    tipsTitle: "Συμβουλές για αβεβαιότητα εκτίμησης",
    tips: [
      "Ξαναδοκιμάστε σε πιο έντονο, ομοιόμορφο φως",
      "Κεντράρετε και γεμίστε το πλάνο με το αντικείμενο",
      "Πατήστε για εστίαση στο ύφασμα πριν τη λήψη",
    ],
    faqTitle: "Συχνές ερωτήσεις",
    faq: {
      q1: "Αποθηκεύονται οι φωτογραφίες;",
      a1: "Όχι. Συμπιέζονται στον browser, αποστέλλονται για αξιολόγηση και διαγράφονται.",
      q2: "Τι υποστηρίζεται;",
      a2: "Ρούχα, κουρτίνες και άλλα υφάσματα. Παπούτσια/ηλεκτρονικά/κοσμήματα απορρίπτονται.",
      q3: "Χωρίς AI key;",
      a3: "Θα δείτε δοκιμαστική απάντηση για να ελέγξετε τη ροή.",
    },
    footer: {
      note: '© <span id="year"></span> Miranda — Δημιουργικές επιδιορθώσεις & μεταποιήσεις',
      about: "Σχετικά",
      contact: "Επικοινωνία",
    },
    status: {
      yes: "Ναι",
      no: "Όχι",
      high: "υψηλή",
      medium: "μεσαία",
      low: "χαμηλή",
    },
    stageLabels: [
      "Πολύ φθαρμένο",
      "Χρειάζεται φροντίδα",
      "Ρούχο για σπίτι",
      "Φοριέται άνετα",
      "Σαν καινούριο",
    ],
    mockNotes:
      "Δοκιμαστική απάντηση : προσθέστε AI key στο worker για ζωντανή αξιολόγηση.",
    errors: { image: "Αποτυχία επεξεργασίας εικόνας. Δοκιμάστε ξανά." },
  },
};

translations.el.labels.advice =
  translations.el.labels.advice || translations.en.labels.advice;
translations.el.adviceEmpty =
  translations.el.adviceEmpty || translations.en.adviceEmpty;
const state = {
  current: 0,
  photos: [null, null, null],
  itemType: "clothing",
  lang: "el",
};

const progressBar = document.getElementById("progress-bar");
const stepsContainer = document.getElementById("steps");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const resultCard = document.getElementById("result-card");
const resultStage = document.getElementById("result-stage");
const resultLabel = document.getElementById("result-label");
const resultConfidence = document.getElementById("result-confidence");
const resultRepair = document.getElementById("result-repair");
const resultIssues = document.getElementById("result-issues-list");
const resultNotes = document.getElementById("result-notes");
const resultTips = document.getElementById("result-tips");
const langToggle = document.getElementById("lang-toggle");

function t() {
  return translations[state.lang] || translations.en;
}

function createStepMarkup(step, idx) {
  return `
    <article class="step" data-step="${idx}">
      <div>
        <h3 class="h3">${step.title}</h3>
        <p>${step.body}</p>
        <p class="muted micro">${step.hint}</p>
        <div class="upload-box">
          <label for="${step.key}">
            ${t().uploadLabel}
            <input type="file" id="${
              step.key
            }" data-step-index="${idx}" accept="image/*" capture="environment">
          </label>
          <div class="upload-actions">
            <button type="button" class="btn btn-secondary retake" data-step-index="${idx}">${
    t().retakeLabel
  }</button>
          </div>
        </div>
      </div>
      <div class="preview empty" id="${step.key}-preview">${t().noPhoto}</div>
    </article>
  `;
}

function renderSteps() {
  const steps = t().steps;
  stepsContainer.innerHTML =
    steps
      .map((step, idx) =>
        createStepMarkup({ ...step, key: `photo${idx + 1}` }, idx)
      )
      .join("") +
    `
    <article class="step final-step" data-step="3">
      <div>
        <h3 class="h3">${t().itemSelectTitle}</h3>
        <p class="muted">${t().itemSelectBody}</p>
        <div class="select-row">
          <label>
            <span class="micro muted">${t().itemLabel}</span>
            <select id="item-type">
              <option value="clothing" ${
                state.itemType === "clothing" ? "selected" : ""
              }>${t().options.clothing}</option>
              <option value="curtain" ${
                state.itemType === "curtain" ? "selected" : ""
              }>${t().options.curtain}</option>
              <option value="other fabric" ${
                state.itemType === "other fabric" ? "selected" : ""
              }>${t().options.other}</option>
            </select>
          </label>
        </div>
      </div>
      <div class="preview" id="final-preview">
        <div class="micro muted">${t().finalReady}</div>
      </div>
    </article>
  `;
}

function updateProgress() {
  const totalSteps = t().steps.length;
  const pct = Math.max(
    0,
    Math.min(100, ((state.current + 1) / (totalSteps + 1)) * 100)
  );
  if (progressBar) progressBar.style.width = `${pct}%`;
}

function updateButtons() {
  backBtn.textContent = t().back;
  const totalSteps = t().steps.length;
  if (state.current < totalSteps) {
    nextBtn.textContent = t().next;
    nextBtn.disabled = !state.photos[state.current];
  } else {
    nextBtn.textContent = t().evaluate;
    nextBtn.disabled = state.photos.some((p) => !p);
  }
}

function showStep(idx) {
  const allSteps = Array.from(document.querySelectorAll(".step"));
  allSteps.forEach((step) => step.classList.remove("active"));
  const active = allSteps[idx];
  if (active) active.classList.add("active");

  backBtn.disabled = idx === 0;
  updateButtons();
  updateProgress();
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function compressImage(file) {
  const dataUrl = await readFile(file);
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });
  const maxEdge = 1280;
  const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.75)
  );
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
    type: "image/jpeg",
  });
}

function setPreview(idx, file) {
  const preview = document.getElementById(`photo${idx + 1}-preview`);
  if (!preview) return;
  preview.classList.remove("empty");
  preview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Step ${
    idx + 1
  } preview">`;
}

async function handleFileInput(e) {
  const idx = Number(e.target.dataset.stepIndex);
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const compressed = await compressImage(file);
    state.photos[idx] = compressed;
    setPreview(idx, compressed);
    if (state.current === idx) {
      nextBtn.disabled = false;
    }
  } catch (err) {
    alert(t().errors.image);
    console.error(err);
  }
}

function handleRetake(e) {
  const idx = Number(e.target.dataset.stepIndex);
  state.photos[idx] = null;
  const input = document.getElementById(`photo${idx + 1}`);
  if (input) input.value = "";
  const preview = document.getElementById(`photo${idx + 1}-preview`);
  if (preview) {
    preview.classList.add("empty");
    preview.textContent = t().noPhoto;
  }
  if (state.current === idx) nextBtn.disabled = true;
}

function attachStepEvents() {
  const stepsConfig = t().steps;
  stepsConfig.forEach((_, idx) => {
    const input = document.getElementById(`photo${idx + 1}`);
    const retake = document.querySelector(`.retake[data-step-index="${idx}"]`);
    if (input) input.addEventListener("change", handleFileInput);
    if (retake) retake.addEventListener("click", handleRetake);
  });
  const itemTypeSelect = document.getElementById("item-type");
  if (itemTypeSelect) {
    itemTypeSelect.addEventListener("change", () => {
      state.itemType = itemTypeSelect.value;
    });
  }
}

function restorePreviews() {
  state.photos.forEach((file, idx) => {
    if (file) setPreview(idx, file);
  });
}

function confidenceLabel(value) {
  if (value >= 0.75) return t().status.high;
  if (value >= 0.45) return t().status.medium;
  return t().status.low;
}

function stageLabel(stage) {
  if (!stage || stage < 1 || stage > 5) return "Rated";
  return t().stageLabels[stage - 1] || "Rated";
}

function ratingClass(score) {
  const val = Number(score);
  if (!Number.isFinite(val)) return "";
  const rounded = Math.round(val);
  if (rounded < 1 || rounded > 5) return "";
  return `badge-${rounded}`;
}

function renderResult(data) {
  const rawScore = data?.score ?? data?.stage;
  const hasScore =
    rawScore !== null && rawScore !== undefined && rawScore !== "";
  const numericScore = hasScore ? Number(rawScore) : NaN;
  const score = Number.isFinite(numericScore)
    ? Math.min(5, Math.max(1, Math.round(numericScore)))
    : null;

  const labelText = data.label || stageLabel(score);

  resultStage.textContent = score ?? "-";
  resultLabel.textContent = labelText;
  resultLabel.className = "badge";
  const badge = ratingClass(score);
  if (badge) resultLabel.classList.add(badge);

  const confPct = Math.round((data.confidence ?? 0) * 100);
  const labelKey = (data.confidence_label || "").toLowerCase();
  const confLabel = ["low", "medium", "high"].includes(labelKey)
    ? t().status[labelKey]
    : confidenceLabel(data.confidence ?? 0);
  resultConfidence.innerHTML = `${confPct}% <span class="status">${confLabel}</span>`;
  resultRepair.textContent = data.repair_needed
    ? t().status.yes
    : t().status.no;

  resultIssues.innerHTML = "";
  const issues =
    Array.isArray(data.issues) && data.issues.length
      ? data.issues
      : Array.isArray(data.issues_detected)
      ? data.issues_detected
      : [];
  issues.forEach((issue) => {
    const li = document.createElement("li");
    li.textContent = issue;
    resultIssues.appendChild(li);
  });
  if (!issues.length) {
    const li = document.createElement("li");
    li.textContent = t().issuesEmpty;
    resultIssues.appendChild(li);
  }

  const advice = data.advice || data.comments || data.notes || "";
  const adviceFallback = t().adviceEmpty || "";
  resultNotes.textContent = advice || adviceFallback;
  const lowConf =
    (data.confidence ?? 0) < 0.45 || data.confidence_label === "low";
  resultTips.hidden = !lowConf;
  resultCard.hidden = false;
}
function mockResponse() {
  const score = Math.ceil(Math.random() * 5);
  const advice = t().mockNotes;
  return {
    mock: true,
    score,
    stage: score,
    label: stageLabel(score),
    confidence: 0.55,
    confidence_label: "medium",
    issues: ["Mock: seam wear", "Mock: loose thread"],
    repair_needed: score <= 2,
    advice,
    notes: advice,
  };
}

async function evaluate() {
  nextBtn.disabled = true;
  nextBtn.textContent = t().evaluate;

  const form = new FormData();
  state.photos.forEach((file, idx) => {
    form.append(`photo${idx + 1}`, file, file.name);
  });
  form.append("itemType", state.itemType);

  try {
    //todo
    const res = await fetch("/api/evaluate", { method: "POST", body: form });


   if (!res.ok) {
     const text = await res.text();
     console.error("Server returned:", res.status, text);
     throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
   }


    // Parse JSON safely (in case content-type is wrong)
    const ct = res.headers.get("content-type") || "";
    let data;
    if (ct.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Expected JSON but got: ${text.slice(0, 300)}`);
      }
    }

    renderResult(data);
  } catch (err) {
    console.warn("Falling back to mock", err);
    renderResult(mockResponse());
  } finally {
    nextBtn.disabled = false;
    nextBtn.textContent = t().evaluate;
  }
}
function setYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

function applyStaticText() {
  document.documentElement.lang = state.lang === "en" ? "en" : "el";
  const textMap = [
    ["brand-subtitle", t().brandSubtitle],
    ["nav-home", t().nav.home],
    ["nav-about", t().nav.about],
    ["nav-work", t().nav.work],
    ["nav-contact", t().nav.contact],
    ["nav-condition", t().nav.condition],
    ["hero-tag", t().heroTag],
    ["hero-title", t().heroTitle],
    ["hero-lead", t().heroLead],
    ["hero-btn-primary", t().heroBtnPrimary],
    ["hero-btn-secondary", t().heroBtnSecondary],
    ["hero-note-title", t().heroNoteTitle],
    ["hero-note-foot", t().heroNoteFoot],
    ["wizard-title", t().wizardTitle],
    ["wizard-subtitle", t().wizardSubtitle],
    ["results-title", t().resultTitle],
    ["results-subtitle", t().resultSubtitle],
    ["label-stage", t().labels.stage],
    ["label-confidence", t().labels.confidence],
    ["label-repair", t().labels.repair],
    ["label-issues", t().labels.issues],
    ["label-advice", t().labels.advice || translations.en.labels.advice],
    ["tips-title", t().tipsTitle],
    ["tips-1", t().tips[0]],
    ["tips-2", t().tips[1]],
    ["tips-3", t().tips[2]],
    ["faq-title", t().faqTitle],
    ["faq-q1", t().faq.q1],
    ["faq-a1", t().faq.a1],
    ["faq-q2", t().faq.q2],
    ["faq-a2", t().faq.a2],
    ["faq-q3", t().faq.q3],
    ["faq-a3", t().faq.a3],
    ["footer-about", t().footer.about],
    ["footer-contact", t().footer.contact],
  ];
  textMap.forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
  });
  const list = document.getElementById("hero-list");
  if (list)
    list.innerHTML = t()
      .heroList.map((item) => `<li>${item}</li>`)
      .join("");
  if (langToggle) langToggle.textContent = t().nav.toggle;
  const footerNote = document.getElementById("footer-note");
  if (footerNote) footerNote.innerHTML = t().footer.note;
}

function setUpNavigation() {
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      state.lang = state.lang === "en" ? "el" : "en";
      renderSteps();
      attachStepEvents();
      restorePreviews();
      applyStaticText();
      updateButtons();
      showStep(state.current);
    });
  }

  backBtn.addEventListener("click", () => {
    state.current = Math.max(0, state.current - 1);
    showStep(state.current);
  });

  nextBtn.addEventListener("click", () => {
    const totalSteps = t().steps.length;
    if (state.current < totalSteps) {
      state.current += 1;
      showStep(state.current);
    } else {
      evaluate();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSteps();
  attachStepEvents();
  restorePreviews();
  applyStaticText();
  setUpNavigation();
  showStep(state.current);
  setYear();
});
