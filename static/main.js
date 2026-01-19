const galleryItems = [
  {
    before: "assets/images/denim_before.webp",
    after: "assets/images/denim_after.webp",
    title: { en: "Denim repair", el: "Επιδιόρθωση τζιν" },
    note: {
      en: "Invisible patch & color-match stitching.",
      el: "Μπάλωμα με ραφές που δεν ενοχλούν το δέρμα."
    },
    aria: { en: "Show denim repair", el: "Προβολή επιδιόρθωσης τζιν" }
  },
  {
    before: "assets/images/dress_before.webp",
    after: "assets/images/dress_after.webp",
    title: { en: "Evening dress hem", el: "Στρίφωμα βραδινού φορέματος" },
    note: {
      en: "Hand-finished hem; original drape preserved.",
      el: "Καλά εδώ υπερβάλλαμε λιγάκι, αλλά εντάξει. Κάτι τέτοιο."
    },
    aria: { en: "Show evening dress hem", el: "Προβολή στριφώματος φορέματος" }
  },
  {
    before: "assets/images/curtain_before.webp",
    after: "assets/images/curtain_after.webp",
    title: { en: "Curtain resizing", el: "Κόντεμα κουρτινών" },
    note: {
      en: "Custom length + new header tape.",
      el: "Προσαρμοσμένο μήκος και τοποθέτηση νέας τρέσας."
    },
    aria: { en: "Show curtain resizing", el: "Προβολή κοψίματος κουρτινών" }
  }
];

const specTranslations = {
  en: {
    brandSubtitle: "atelier",
    nav: {
      home: "Home",
      about: "About",
      work: "Work",
      contact: "Contact",
      condition: "Condition Rater",
      toggle: "GR"
    },
    heroTag: "Made-to-measure care",
    heroLead:
      'Careful, high-quality <strong>repairs & alterations</strong> from denim to bridal wear and home textiles.',
    heroBtnPrimary: "Book a fitting",
    heroBtnSecondary: "See work",
    hoursLabel: "Hours",
    hoursValue: "Mon-Fri, 09:00-15:00, 17:00-21:00",
    locationLabel: "Location",
    locationValue: "Athens, Sepolia, GR",
    heroQuote: '"We keep the original look - minimal on the outside, maximum care inside."',
    heroList: [
      "Invisible mending for denim",
      "Hand-finished hems & bridal adjustments",
      "Home textiles resized with care"
    ],
    aboutTitle: "About the atelier",
    aboutLead: "I'm Miranda, a tailor who keeps your favorites in rotation with light, respectful alterations.",
    pills: ["Tailored fits", "Mindful mending", "Home textiles"],
    specialtiesTitle: "Specialties",
    specialtiesList: [
      "Bridal and evening wear adjustments",
      "Denim darning, color-matched threads",
      "Curtain and upholstery tailoring"
    ],
    workHeading: "Before & After",
    workSubtitle: "Small miracles, stitched by hand.",
    beforeLabel: "Before",
    afterLabel: "After",
    cards: [
      { title: "Custom fits", body: "Waist, bust, and hem adjustments that honor the garment's lines." },
      { title: "Repair & revive", body: "Mending, darning, and reinforcing high-wear areas with color-matched thread." },
      { title: "Home textiles", body: "Curtains resized, cushions refreshed, linens finished with neat seams." }
    ],
    contactHeading: "Contact",
    contactPhone: "<strong>Phone:</strong> +30 210 5158929",
    contactEmail: "<strong>Email:</strong> contact@mirandas.gr",
    contactAddress: "<strong>Address:</strong> Avlonos, Athens",
    backTop: "Back to top",
    formTitle: "Book a fitting ❤",
    labelName: "Name",
    labelEmail: "Email",
    labelDetails: "What do you need?",
    detailsPlaceholder: "Hem, repair, bridal fitting...",
    labelPhotos: "Upload reference photos",
    formSubmit: "Send request",
    formNote: "Send your request and we'll get back to you soon.",
    formSending: "Sending...",
    formConfirm: "Request sent. We'll reply soon.",
    formError: "Could not send. Please try again.",
    fileSelectedPrefix: "Selected",
    footerNote: "&copy; <span id=\"year\"></span> Miranda 2026 - Creative repairs & alterations",
    footerAbout: "About",
    footerContact: "Contact"
  },
  el: {
    brandSubtitle: "ατελιέ",
    nav: {
      home: "Αρχική",
      about: "Σχετικά",
      work: "Δουλειές",
      contact: "Επικοινωνία",
      condition: "Αξιολόγηση υφάσματος",
      toggle: "EN"
    },
    heroTag: "Μοδίστρα",
    heroLead:
      'Προσεκτικές, υψηλής ποιότητας <strong>επιδιορθώσεις και μεταποιήσεις</strong> από denim μέχρι νυφικά και υφάσματα σπιτιού.',
    heroBtnPrimary: "Κλείστε ραντεβού",
    heroBtnSecondary: "Δείτε δουλειές",
    hoursLabel: "Ωράριο",
    hoursValue: "Δευ-Παρ, 09:00-15:00, 17:00-21:00",
    locationLabel: "Περιοχή",
    locationValue: "Αθήνα, Σεπόλια",
    heroQuote: "Κρατάμε το αρχικό ύφος με τις απαραίτητες παρεμβάσεις, και τη μέγιστη φροντίδα και προσοχή.",
    heroList: [
      "Αόρατες επιδιορθώσεις σε denim",
      "Στριφώματα στο χέρι και προσαρμογές σε βραδινά φορέματα.",
      "Μεταποίηση κουρτινών με επίσκεψη κατ'οίκον για μέτρηση."
    ],
    aboutTitle: "Σχετικά με το εργαστήρι",
    aboutLead:
      "Είμαι η Miranda, η μοδίστρα που χρειάζεστε για να κρατήσετε τα αγαπημένα σας ρούχα σε χρήση ακριβώς όπως τα έχετε φανταστεί! (ή και καλύτερα! 😉)",
    pills: ["Δημιουργικότητα", "Φαντασία", "Αισθητική"],
    specialtiesTitle: "Μερικές Ιδέες...",
    specialtiesList: [
      "Στένεμα μέσης ή φάρδεμα σε τουαλέτες, τοποθέτηση caps, επιδιόρθωση ντεκολτέ",
      "Ανανέωση των τζιν με ραφές στο ίδιο χρώμα, προεκτάσεις, μπάλωμα καβάλου, στρίφωμα με ορίτζιναλ, κρόσια / διασκοσμητικά σκισίματα",
      "Τοποθέτηση μανικιών, Ανέβασμα ώμων, Στένεμα, Κόντεμα, Προσθήκη / Αλλαγή φόδρας"
    ],
    workHeading: "Πριν & Μετά",
    workSubtitle: "Μικρά θαύματα, ραμμένα με αγάπη και φροντίδα ⠂˖❥࿐",
    beforeLabel: "Πριν",
    afterLabel: "Μετά",
    cards: [
      {
        title: "Εφαρμογές στα μέτρα σας...",
        body: "Μετατροπές σε μέση, στήθος και μήκος που σέβονται το στύλ του ρούχου, ή ακόμα και του δίνουν νέο αέρα!"
      },
      {
        title: "Επιδιόρθωση & ανανέωση ρούχων!",
        body: "Τι καλύτερο από το να βλέπετε το ρούχο σας να ξαναζωντανεύει!"
      },
      {
        title: "Υφάσματα σπιτιού",
        body: "Κουρτίνες ραμμένες στο σωστό μήκος, μαξιλαροθήκες και μαξιλάρες καναπέ, λευκά είδη..."
      }
    ],
    contactHeading: "Επικοινωνία",
    contactPhone: "<strong>Τηλ.:</strong> +30 210 5158929",
    contactEmail: "<strong>Email:</strong> contact@mirandas.gr",
    contactAddress: "<strong>Διεύθυνση:</strong> Αυλώνος, Αθήνα",
    backTop: "Επιστροφή στην αρχή",
    formTitle: "Κλείστε ραντεβού, αμέ! ❤",
    labelName: "Όνομα, Επώνυμο",
    labelEmail: "Email",
    labelDetails: "Τι χρειάζεστε;",
    detailsPlaceholder: "Στρίφωμα, μπάλωμα, πρόβα νυφικού, σακάκια, μια ιδέα...",
    labelPhotos: "Μεταφόρτωση φωτογραφίας",
    formSubmit: "Αποστολή",
    formNote: "Στείλτε το αίτημά σας και θα απαντήσουμε σύντομα.",
    formSending: "Αποστολή...",
    formConfirm: "Το αίτημα εστάλη. Θα επικοινωνήσουμε σύντομα.",
    formError: "Δεν στάλθηκε. Προσπαθήστε ξανά.",
    fileSelectedPrefix: "Επιλέχθηκαν",
    footerNote: "&copy; <span id=\"year\"></span> Miranda 2026 - Δημιουργικές μεταποιήσεις & επιδιορθώσεις",
    footerAbout: "Σχετικά",
    footerContact: "Επικοινωνία"
  }
};

const translations = specTranslations;


const LANG_STORAGE_KEY = "miranda-lang";

let currentLang = "el";
let thumbButtons = [];
let beforeImg, afterImg, titleEl, noteEl, beforeLabelEl, afterLabelEl;
let fileNoteEl;
let fileInputEl;

function setText(id, text, asHtml = false) {
  const el = document.getElementById(id);
  if (!el) return;
  if (asHtml) {
    el.innerHTML = text;
  } else {
    el.textContent = text;
  }
}

function renderLists(lang) {
  const t = translations[lang];
  const heroList = document.getElementById("hero-note-list");
  if (heroList) {
    heroList.innerHTML = t.heroList.map(item => `<li>${item}</li>`).join("");
  }
  const specialtiesList = document.getElementById("specialties-list");
  if (specialtiesList) {
    specialtiesList.innerHTML = t.specialtiesList.map(item => `<li>${item}</li>`).join("");
  }
}

function renderPills(lang) {
  const t = translations[lang];
  ["pill-1", "pill-2", "pill-3"].forEach((id, idx) => setText(id, t.pills[idx] || ""));
}

function renderCards(lang) {
  const t = translations[lang];
  t.cards.forEach((card, idx) => {
    setText(`card-${idx + 1}-title`, card.title);
    setText(`card-${idx + 1}-body`, card.body);
  });
}

function setGalleryActive(index) {
  const item = galleryItems[index] || galleryItems[0];
  const t = translations[currentLang];

  if (beforeImg) {
    beforeImg.src = item.before;
    beforeImg.alt = `${item.title[currentLang]} — ${t.beforeLabel.toLowerCase()}`;
  }
  if (afterImg) {
    afterImg.src = item.after;
    afterImg.alt = `${item.title[currentLang]} — ${t.afterLabel.toLowerCase()}`;
  }
  if (titleEl) titleEl.textContent = item.title[currentLang];
  if (noteEl) noteEl.textContent = item.note[currentLang];
  if (beforeLabelEl) beforeLabelEl.textContent = t.beforeLabel;
  if (afterLabelEl) afterLabelEl.textContent = t.afterLabel;

  thumbButtons.forEach((btn, i) => {
    const isActive = i === index;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
    btn.setAttribute("aria-label", item.aria[currentLang]);
  });
}

function initGallery() {
  beforeImg = document.getElementById("before-img");
  afterImg = document.getElementById("after-img");
  titleEl = document.getElementById("work-title");
  noteEl = document.getElementById("work-note");
  beforeLabelEl = document.getElementById("before-label");
  afterLabelEl = document.getElementById("after-label");
  thumbButtons = Array.from(document.querySelectorAll(".thumb"));

  thumbButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setGalleryActive(Number(btn.dataset.index) || 0);
    });
  });
  setGalleryActive(0);
}

function initContactForm() {
  const form = document.querySelector(".form");
  if (!form) return;

  fileInputEl = form.querySelector('input[type="file"]');
  fileNoteEl = document.createElement("div");
  fileNoteEl.className = "micro muted";
  form.insertBefore(fileNoteEl, form.lastElementChild);

  fileInputEl.addEventListener("change", () => {
    if (fileInputEl.files.length === 0) {
      fileNoteEl.textContent = "";
      return;
    }
    const names = Array.from(fileInputEl.files).map((f) => f.name).join(", ");
    fileNoteEl.textContent = `${translations[currentLang].fileSelectedPrefix}: ${names}`;
  });

   const submitBtn = form.querySelector("button[type='submit']");

   form.addEventListener("submit", async (e) => {
     e.preventDefault();
     form
       .querySelectorAll("input, textarea, button")
       .forEach((el) => el.blur());

     const fd = new FormData(form);
     fd.set("lang", currentLang);

     if (submitBtn) submitBtn.disabled = true;
     fileNoteEl.textContent =
       translations[currentLang].formSending || "Sending…";

     try {
       const res = await fetch("/api/contact", { method: "POST", body: fd });
       let payload = null;
       try {
         payload = await res.json();
       } catch (_) {}

       if (!res.ok || !payload?.ok) {
         fileNoteEl.textContent =
           translations[currentLang].formError ||
           "Could not send. Please try again.";
         return;
       }

       form.reset();
       if (window.turnstile) turnstile.reset();
       fileNoteEl.textContent = translations[currentLang].formConfirm;
     } catch (err) {
       fileNoteEl.textContent =
         translations[currentLang].formError ||
         "Could not send. Please try again.";
     } finally {
       if (submitBtn) submitBtn.disabled = false;
     }
   });
}

function applyTranslations(lang) {
  currentLang = lang === "en" ? "en" : "el";
  const t = translations[currentLang];
  document.documentElement.lang = currentLang === "en" ? "en" : "el";

  setText("brand-subtitle", t.brandSubtitle);
  setText("nav-home", t.nav.home);
  setText("nav-about", t.nav.about);
  setText("nav-work", t.nav.work);
  setText("nav-contact", t.nav.contact);
  setText("nav-condition", t.nav.condition);
   setText("mobile-nav-home", t.nav.home);
   setText("mobile-nav-about", t.nav.about);
   setText("mobile-nav-work", t.nav.work);
   setText("mobile-nav-contact", t.nav.contact);
   setText("mobile-nav-condition", t.nav.condition);

  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) toggleBtn.textContent = t.nav.toggle;
  const mobileToggleBtn = document.getElementById("mobile-lang-toggle");
  if (mobileToggleBtn) mobileToggleBtn.textContent = t.nav.toggle;

  setText("hero-tag", t.heroTag);
  setText("hero-lead", t.heroLead, true);
  setText("hero-btn-primary", t.heroBtnPrimary);
  setText("hero-btn-secondary", t.heroBtnSecondary);
  setText("hours-label", t.hoursLabel);
  setText("hours-value", t.hoursValue);
  setText("location-label", t.locationLabel);
  setText("location-value", t.locationValue);
  setText("hero-quote", t.heroQuote);

  renderLists(currentLang);
  renderPills(currentLang);

  setText("about-title", t.aboutTitle);
  setText("about-lead", t.aboutLead);
  setText("specialties-title", t.specialtiesTitle);

  renderCards(currentLang);

  setText("work-heading", t.workHeading);
  setText("work-subtitle", t.workSubtitle);

  setText("contact-heading", t.contactHeading);
  setText("contact-phone", t.contactPhone, true);
  setText("contact-email", t.contactEmail, true);
  setText("contact-address", t.contactAddress, true);
  // setText("contact-note", t.contactNote);
  setText("back-top", t.backTop);

  setText("form-title", t.formTitle);
  setText("label-name", t.labelName);
  setText("label-email", t.labelEmail);
  setText("label-details", t.labelDetails);
  const detailsField = document.querySelector("textarea[name='details']");
  if (detailsField) detailsField.placeholder = t.detailsPlaceholder;
  setText("label-photos", t.labelPhotos);
  setText("form-submit", t.formSubmit);
  setText("form-note", t.formNote);

  setText("footer-note", t.footerNote, true);
  setText("footer-about", t.footerAbout);
  setText("footer-contact", t.footerContact);

  // Refresh gallery labels/text per language
  setGalleryActive(thumbButtons.findIndex((b) => b.classList.contains("active")) || 0);

  // Reset file note text to match new language
  if (fileNoteEl && fileNoteEl.textContent) {
    if (fileInputEl && fileInputEl.files.length > 0) {
      const names = Array.from(fileInputEl.files).map((f) => f.name).join(", ");
      fileNoteEl.textContent = `${t.fileSelectedPrefix}: ${names}`;
    } else {
      fileNoteEl.textContent = t.formNote;
    }
  }
}

function detectPreferredLanguage() {
  try {
    const cached = localStorage.getItem(LANG_STORAGE_KEY);
    if (cached === "en" || cached === "el") return cached;
  } catch (_) {}
  return "el";
}

function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "el";
  try {
    localStorage.setItem(LANG_STORAGE_KEY, currentLang);
  } catch (_) {}
  document.documentElement.lang = currentLang;
  applyTranslations(currentLang);
}

function setYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

function initLangToggle() {
  const toggles = Array.from(document.querySelectorAll("#lang-toggle, #mobile-lang-toggle"));
  if (!toggles.length) return;
  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(currentLang === "en" ? "el" : "en");
    });
  });
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("menu-overlay");
  const menu = document.getElementById("mobile-menu");
  if (!menuToggle || !overlay || !menu) return;

  const focusableSelector = "a, button";
  const getFocusable = () =>
    Array.from(menu.querySelectorAll(focusableSelector)).filter((el) => !el.disabled);

  const setState = (isOpen, returnFocus = true) => {
    document.body.classList.toggle("menu-open", isOpen);
    overlay.hidden = !isOpen;
    menu.hidden = !isOpen;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      const first = getFocusable()[0];
      if (first) first.focus();
    } else if (returnFocus) {
      menuToggle.focus();
    }
  };

  const trapFocus = (evt) => {
    if (!document.body.classList.contains("menu-open") || evt.key !== "Tab") return;
    const focusable = getFocusable();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (evt.shiftKey && document.activeElement === first) {
      evt.preventDefault();
      last.focus();
    } else if (!evt.shiftKey && document.activeElement === last) {
      evt.preventDefault();
      first.focus();
    }
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menu-open");
    setState(!isOpen);
  });

  overlay.addEventListener("click", () => setState(false));

  menu.addEventListener("click", (evt) => {
    const link = evt.target.closest("a, button");
    if (link) {
      setState(false, false);
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" && document.body.classList.contains("menu-open")) {
      setState(false);
    }
    trapFocus(evt);
  });

  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (e.matches) setState(false, false);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initGallery();
  initContactForm();
  setYear();
  setLanguage(detectPreferredLanguage());
  initLangToggle();
  initMobileMenu();
});
