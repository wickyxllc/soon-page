const translations = {
  en: {
    status: "Coming soon",
    tagline: "Next-Gen Social Media",
    intro: "Create, connect, and belong in one shared experience.",
    web: "Web",
    desktop: "Desktop",
    android: "Android",
    ios: "iOS",
    changed: "Language changed to English",
  },
  ar: {
    status: "قريباً",
    tagline: "جيل جديد من التواصل الاجتماعي",
    intro: "أنشئ وتواصل وانتمِ في تجربة واحدة تجمع الجميع.",
    web: "الويب",
    desktop: "سطح المكتب",
    android: "أندرويد",
    ios: "آي أو إس",
    changed: "تم تغيير اللغة إلى العربية",
  },
  es: {
    status: "Muy pronto",
    tagline: "La nueva generación de redes sociales",
    intro: "Crea, conecta y encuentra tu lugar en una experiencia compartida.",
    web: "Web",
    desktop: "Escritorio",
    android: "Android",
    ios: "iOS",
    changed: "Idioma cambiado a español",
  },
  tr: {
    status: "Çok yakında",
    tagline: "Yeni nesil sosyal medya",
    intro: "Tek bir ortak deneyimde üret, bağlan ve ait ol.",
    web: "Web",
    desktop: "Masaüstü",
    android: "Android",
    ios: "iOS",
    changed: "Dil Türkçe olarak değiştirildi",
  },
};

const languageSelect = document.querySelector("#language");
const languageStatus = document.querySelector("#language-status");
const particlesContainer = document.querySelector("#particles");
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const safeStorage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
    }
  },
};

const getInitialLanguage = () => {
  const saved = safeStorage.get("wickyx-soon-language");
  if (saved && translations[saved]) return saved;

  const browserLanguage = navigator.language?.slice(0, 2).toLowerCase();
  return translations[browserLanguage] ? browserLanguage : "en";
};

const applyLanguage = (language, announce = false) => {
  const dictionary = translations[language] ?? translations.en;

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  languageSelect.value = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-label]").forEach((element) => {
    const key = element.dataset.i18nLabel;
    if (!dictionary[key]) return;
    element.setAttribute("aria-label", dictionary[key]);
    element.setAttribute("title", dictionary[key]);
  });

  safeStorage.set("wickyx-soon-language", language);
  if (announce) languageStatus.textContent = dictionary.changed;
};

const createParticles = () => {
  if (!particlesContainer || motionQuery.matches) return;

  const fragment = document.createDocumentFragment();
  const particleCount = 18;

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    fragment.appendChild(particle);
  }

  particlesContainer.appendChild(fragment);
};

languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value, true);
});

document.addEventListener("visibilitychange", () => {
  document.body.classList.toggle("is-paused", document.hidden);
});

document.querySelector("#year").textContent = new Date().getFullYear();
applyLanguage(getInitialLanguage());
createParticles();

requestAnimationFrame(() => {
  requestAnimationFrame(() => document.body.classList.remove("is-loading"));
});