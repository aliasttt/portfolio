const CONFIG = {
  brandName: "A&M Software",
  whatsappNumber: "905XXXXXXXXX",
  email: "hello@example.com",

  githubAli: "#",
  githubMahsun: "#",

  linkedinAli: "#",
  linkedinMahsun: "#",

  gtManagerId: "GTM-XXXXXXX",

  contactFormEndpoint: "",
  consentEnabled: false,
  defaultLanguage: "tr"
};

const translations = {
  tr: {
    documentTitle: "A&M Software | Web, Mobil, Backend ve Yapay Zeka Yazılım Geliştirme",
    metaDescription: "İki kişilik senior yazılım ekibiyle web, mobil, backend ve yapay zeka projelerinizi tasarımdan production'a kadar geliştirin.",
    skipLink: "İçeriğe geç",
    navServices: "Hizmetler",
    navProjects: "Projeler",
    navTeam: "Ekibimiz",
    navProcess: "Süreç",
    navContact: "İletişim",
    navCta: "Projenizi Anlatın",
    heroEyebrow: "İki mühendis. Tek eksiksiz geliştirme ekibi.",
    heroTitle: "Fikrinizi çalışan bir yazılım ürününe dönüştürüyoruz.",
    heroText: "Web, mobil, backend ve yapay zeka projelerini tasarımdan production'a kadar geliştiriyoruz.",
    heroPrimary: "Projenizi Görüşelim",
    heroSecondary: "WhatsApp'tan Yazın",
    heroReassurance: "Doğrudan geliştiricilerle görüşün. Gereksiz satış süreçleri yok.",
    heroPanelLabel: "Teslimat kapsamı",
    heroPanelStatus: "Production odaklı",
    heroPanelFooter: "Mimari, geliştirme, yayına alma ve destek tek ekipte.",
    servicesEyebrow: "Hizmetler",
    servicesTitle: "Ürününüzü tasarlamak, geliştirmek ve çalıştırmak için gereken çekirdek ekip.",
    projectsEyebrow: "Seçili işler",
    projectsTitle: "Gercek projeler. Gercek sistemler.",
    whyEyebrow: "Neden biz?",
    whyTitle: "Küçük ekip hızıyla senior mühendislik disiplini.",
    teamEyebrow: "Ekibimiz",
    teamTitle: "İki uzmanlık alanı, tek ürün sorumluluğu.",
    teamEqTop: "Backend + AI + Infrastructure",
    teamEqMiddle: "Frontend + Mobile Architecture",
    teamEqResult: "Complete Product Team",
    aliRole: "Backend / Full Stack / AI Engineer",
    aliBio: "Backend mimarisi, Django/Python, AI sistemleri, bulut altyapısı ve full-stack ürün geliştirme tarafında uçtan uca sorumluluk alır.",
    aliAlt: "Ali Asadi portre fotoğrafı",
    mahsunRole: "Frontend / Mobile / Full Stack Engineer",
    mahsunBio: "React Native, frontend mimarisi, mobil ürün geliştirme ve full-stack uygulama akışlarında temiz, sürdürülebilir arayüzler kurar.",
    mahsunAlt: "Mahsun Kaya portre fotoğrafı",
    processEyebrow: "Süreç",
    processTitle: "Belirsizliği azaltan net bir geliştirme akışı.",
    techEyebrow: "Teknolojiler",
    techTitle: "Modern ürünler için pratik ve production'da kullanılan teknoloji seti.",
    faqEyebrow: "SSS",
    faqTitle: "Görüşmeden önce aklınıza gelebilecek sorular.",
    finalEyebrow: "İletişim",
    finalTitle: "Aklınızda bir proje mi var?",
    finalText: "Bize kısaca ne yapmak istediğinizi anlatın. Teknik tarafını birlikte planlayalım.",
    finalWhatsapp: "WhatsApp'tan Projenizi Anlatın",
    finalEmail: "E-posta Gönderin",
    formNote: "Form entegrasyonu gerekirse Formspree, Web3Forms veya özel endpoint ile sonradan etkinleştirilebilir.",
    footerText: "Web, mobil, backend ve yapay zeka çözümleri.",
    privacyLink: "Gizlilik Politikası",
    rights: "Tüm hakları saklıdır.",
    consentText: "Analitik ve reklam ölçümleri için çerez tercihlerinizi kaydedebiliriz.",
    consentPrivacy: "Gizlilik bilgisi",
    consentReject: "Reddet",
    consentAccept: "Kabul et",
    floatingCta: "Projenizi Anlatın",
    whatsappMessage: "Merhaba, yazılım projem hakkında görüşmek istiyorum.",
    emailSubject: "Yazılım projesi hakkında görüşme",
    emailBody: "Merhaba,%0D%0A%0D%0AYazılım projem hakkında görüşmek istiyorum.",
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
    trust: [
      "Production-ready geliştirme",
      "Web + mobil + backend",
      "Doğrudan geliştirici iletişimi",
      "Yayına alma ve bakım"
    ],
    services: [
      ["Custom Web Development", "İşinize özel platformlar, portallar, SaaS ürünleri ve dahili web uygulamaları."],
      ["Backend & API Development", "Python, Django, DRF, PostgreSQL, kimlik doğrulama, entegrasyonlar ve ölçeklenebilir backend mimarisi."],
      ["Mobile App Development", "iOS ve Android için React Native ile performanslı mobil uygulamalar."],
      ["AI & Automation", "LLM entegrasyonları, dahili AI asistanları, veritabanı bağlantılı AI akışları ve otomasyon."],
      ["Business Systems", "CRM, CMS, dashboard, e-ticaret ve operasyonel süreçlere özel yazılım sistemleri."],
      ["Deployment & Infrastructure", "Docker, Linux, VPS, Nginx, CI/CD, izleme ve production bakımı."]
    ],
    projects: [
      ["Loyalty Platform", "MyBonus Berlin", "Mobil uygulamalar, backend servisleri ve işletme yönetim araçlarını birleştiren müşteri sadakat platformu.", "React Native · Django · PostgreSQL · Firebase", ["Mobile", "Backend"]],
      ["Restaurant System", "QR Menu", "Restoranlar için dijital menü, yönetim paneli ve operasyon akışını sade hale getiren web tabanlı sistem.", "React · Django · PostgreSQL", ["Web", "Backend"]],
      ["E-Commerce", "Firmen TShirt", "Ürün yönetimi, sipariş akışı ve marka odaklı satış deneyimi için geliştirilmiş e-ticaret yapısı.", "Next.js · API · Payments", ["Web", "Commerce"]],
      ["Industry Platform", "BIM / Construction Platform", "İnşaat ve BIM süreçlerinde proje verisini daha izlenebilir hale getiren iş platformu.", "Django · Dashboard · APIs", ["Web", "Backend"]],
      ["Infrastructure Product", "ZamokVPN", "Kullanıcı, erişim ve servis yönetimi gerektiren teknik altyapı odaklı VPN platformu.", "Linux · Nginx · Automation", ["Backend", "Infrastructure"]],
      ["Product Systems", "Mobile & Business Platforms", "Mobil uygulama, panel, API ve entegrasyonlardan oluşan iş odaklı ürün sistemleri.", "React Native · React · Django", ["Mobile", "Web"]]
    ],
    why: [
      ["Direct Communication", "Ürünü geliştiren mühendislerle doğrudan konuşursunuz. Bilgi kaybı ve gereksiz satış katmanları azalır."],
      ["Full Product Coverage", "Backend, web, mobil, AI ve altyapı ihtiyaçları tek ekip tarafından birlikte ele alınabilir."],
      ["Production Focus", "Mimari, güvenlik, deployment ve bakım konuları projenin başından itibaren hesaba katılır."],
      ["Flexible Collaboration", "Yeni ürünler, mevcut sistemler, MVP geliştirme ve sürekli teknik destek için uyumlu çalışırız."]
    ],
    process: [
      ["İhtiyacı Anlıyoruz", "İş hedefinizi, kullanıcı akışını, teknik kısıtları ve öncelikleri netleştiririz."],
      ["Teknik Planı Oluşturuyoruz", "Mimariyi, teknoloji seçimini, teslim adımlarını ve riskleri açık şekilde planlarız."],
      ["Geliştiriyoruz", "Backend, arayüz, mobil, AI ve entegrasyon işlerini kontrollü iterasyonlarla ilerletiriz."],
      ["Yayınlıyor ve Destekliyoruz", "Production ortamını kurar, yayına alır ve ihtiyaca göre bakım desteği veririz."]
    ],
    techGroups: [
      ["Backend", ["Python", "Django", "DRF", "PostgreSQL", "Redis", "Celery"]],
      ["Frontend", ["React", "Next.js", "TypeScript"]],
      ["Mobile", ["React Native", "Swift / Kotlin integrations"]],
      ["AI", ["LLM", "AI APIs", "Private AI Systems"]],
      ["Infrastructure", ["Docker", "Linux", "Nginx", "GitHub", "CI/CD"]]
    ],
    faq: [
      ["Proje geliştirme süreci nasıl başlıyor?", "Önce hedefinizi ve mevcut durumu kısa bir görüşmede anlıyoruz. Ardından kapsam, teknik yaklaşım ve ilk adımları netleştiriyoruz."],
      ["Sadece yeni projeler mi geliştiriyorsunuz?", "Hayır. Yeni ürünlerin yanı sıra mevcut sistemlerin iyileştirilmesi, yeniden yapılandırılması ve bakımı için de destek verebiliriz."],
      ["Mevcut bir projeye destek verebilir misiniz?", "Evet. Kod yapısını, altyapıyı ve öncelikleri inceledikten sonra geliştirme, hata giderme veya performans iyileştirme desteği sağlayabiliriz."],
      ["Web ve mobil uygulamayı birlikte geliştirebilir misiniz?", "Evet. Backend, web paneli ve React Native mobil uygulamayı aynı ürün mimarisi içinde birlikte planlayabiliriz."],
      ["Backend veya API geliştirme hizmeti alabilir miyim?", "Evet. Django, DRF, PostgreSQL, kimlik doğrulama, entegrasyonlar ve production deployment tarafında backend odaklı çalışabiliriz."],
      ["Yapay zekayı mevcut sistemime entegre edebilir misiniz?", "Evet. LLM API entegrasyonları, dahili asistanlar, veritabanı bağlantılı AI akışları ve otomasyon senaryoları geliştirebiliriz."],
      ["Proje tamamlandıktan sonra destek sağlıyor musunuz?", "Evet. Deployment, izleme, bakım, küçük geliştirmeler ve teknik destek için uzun vadeli çalışma modeli oluşturabiliriz."]
    ]
  },
  en: {
    documentTitle: "A&M Software | Web, Mobile, Backend and AI Software Development",
    metaDescription: "A senior two-person engineering team building web, mobile, backend and AI software from architecture to production.",
    skipLink: "Skip to content",
    navServices: "Services",
    navProjects: "Projects",
    navTeam: "Team",
    navProcess: "Process",
    navContact: "Contact",
    navCta: "Tell Us About Your Project",
    heroEyebrow: "Two engineers. One complete development team.",
    heroTitle: "We turn ideas into production-ready software.",
    heroText: "From backend architecture and web applications to mobile products and AI integrations, we design, build and deploy complete software systems.",
    heroPrimary: "Discuss Your Project",
    heroSecondary: "Message on WhatsApp",
    heroReassurance: "Talk directly with the engineers building your product. No unnecessary sales layers.",
    heroPanelLabel: "Delivery coverage",
    heroPanelStatus: "Production focused",
    heroPanelFooter: "Architecture, development, deployment and support handled by one team.",
    servicesEyebrow: "Services",
    servicesTitle: "The core engineering team to design, build and run your product.",
    projectsEyebrow: "Selected work",
    projectsTitle: "Real projects. Real systems.",
    whyEyebrow: "Why work with us?",
    whyTitle: "Senior engineering discipline with the speed of a small team.",
    teamEyebrow: "Team",
    teamTitle: "Two complementary specialties, one product responsibility.",
    teamEqTop: "Backend + AI + Infrastructure",
    teamEqMiddle: "Frontend + Mobile Architecture",
    teamEqResult: "Complete Product Team",
    aliRole: "Backend / Full Stack / AI Engineer",
    aliBio: "Ali leads backend architecture, Django/Python systems, AI integrations, cloud infrastructure and full-stack product development end to end.",
    aliAlt: "Portrait photo of Ali Asadi",
    mahsunRole: "Frontend / Mobile / Full Stack Engineer",
    mahsunBio: "Mahsun builds clean, maintainable interfaces across React Native, frontend architecture, mobile products and full-stack application flows.",
    mahsunAlt: "Portrait photo of Mahsun Kaya",
    processEyebrow: "Process",
    processTitle: "A clear development flow that reduces uncertainty.",
    techEyebrow: "Technologies",
    techTitle: "A practical production-tested technology stack for modern products.",
    faqEyebrow: "FAQ",
    faqTitle: "Questions you may have before we talk.",
    finalEyebrow: "Contact",
    finalTitle: "Have a project in mind?",
    finalText: "Tell us what you want to build. We'll help you define the technical path.",
    finalWhatsapp: "Discuss It on WhatsApp",
    finalEmail: "Send an Email",
    formNote: "If needed, a form integration can later be enabled through Formspree, Web3Forms or a custom endpoint.",
    footerText: "Web, mobile, backend and AI software solutions.",
    privacyLink: "Privacy Policy",
    rights: "All rights reserved.",
    consentText: "We can store your analytics and advertising measurement preferences.",
    consentPrivacy: "Privacy information",
    consentReject: "Reject",
    consentAccept: "Accept",
    floatingCta: "Discuss Your Project",
    whatsappMessage: "Hi, I'd like to discuss a software project.",
    emailSubject: "Software project discussion",
    emailBody: "Hi,%0D%0A%0D%0AI'd like to discuss a software project.",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    trust: [
      "Production-ready development",
      "Web + mobile + backend",
      "Direct developer communication",
      "Deployment & maintenance"
    ],
    services: [
      ["Custom Web Development", "Custom business platforms, portals, SaaS products and internal applications."],
      ["Backend & API Development", "Python, Django, DRF, PostgreSQL, authentication, integrations and scalable backend architecture."],
      ["Mobile App Development", "React Native applications for iOS and Android."],
      ["AI & Automation", "LLM integrations, internal AI assistants, database-connected AI workflows and automation."],
      ["Business Systems", "CRM, CMS, dashboards, e-commerce and custom operational platforms."],
      ["Deployment & Infrastructure", "Docker, Linux, VPS, Nginx, CI/CD, monitoring and production maintenance."]
    ],
    projects: [
      ["Loyalty Platform", "MyBonus Berlin", "Customer loyalty platform combining mobile applications, backend services and business management tools.", "React Native · Django · PostgreSQL · Firebase", ["Mobile", "Backend"]],
      ["Restaurant System", "QR Menu", "A web-based system that simplifies digital menus, management screens and restaurant operations.", "React · Django · PostgreSQL", ["Web", "Backend"]],
      ["E-Commerce", "Firmen TShirt", "An e-commerce structure for product management, order flows and a focused branded buying experience.", "Next.js · API · Payments", ["Web", "Commerce"]],
      ["Industry Platform", "BIM / Construction Platform", "A business platform that makes construction and BIM project data easier to track and manage.", "Django · Dashboard · APIs", ["Web", "Backend"]],
      ["Infrastructure Product", "ZamokVPN", "A technical infrastructure product involving user, access and service management for VPN operations.", "Linux · Nginx · Automation", ["Backend", "Infrastructure"]],
      ["Product Systems", "Mobile & Business Platforms", "Business-focused product systems combining mobile apps, dashboards, APIs and integrations.", "React Native · React · Django", ["Mobile", "Web"]]
    ],
    why: [
      ["Direct Communication", "Clients communicate directly with the developers responsible for the product, reducing handoff loss and unnecessary sales layers."],
      ["Full Product Coverage", "Backend, web, mobile, AI and infrastructure needs can be planned together by one team."],
      ["Production Focus", "Architecture, security, deployment and maintainability are considered from the beginning."],
      ["Flexible Collaboration", "Suitable for new products, existing systems, MVP development and ongoing technical support."]
    ],
    process: [
      ["Understand", "We clarify your business goal, user flows, technical constraints and priorities."],
      ["Plan", "We define the architecture, technology choices, delivery steps and risks in plain language."],
      ["Build", "We develop backend, frontend, mobile, AI and integrations through controlled iterations."],
      ["Launch & Support", "We prepare the production environment, deploy the product and support it when needed."]
    ],
    techGroups: [
      ["Backend", ["Python", "Django", "DRF", "PostgreSQL", "Redis", "Celery"]],
      ["Frontend", ["React", "Next.js", "TypeScript"]],
      ["Mobile", ["React Native", "Swift / Kotlin integrations"]],
      ["AI", ["LLM", "AI APIs", "Private AI Systems"]],
      ["Infrastructure", ["Docker", "Linux", "Nginx", "GitHub", "CI/CD"]]
    ],
    faq: [
      ["How does the project development process start?", "We first understand your goal and current situation in a short call. Then we clarify scope, technical direction and next steps."],
      ["Do you only build new projects?", "No. We can also improve, restructure and maintain existing systems."],
      ["Can you support an existing project?", "Yes. After reviewing the codebase, infrastructure and priorities, we can help with development, bug fixing or performance improvements."],
      ["Can you build web and mobile together?", "Yes. We can plan the backend, web dashboard and React Native mobile app as one coherent product architecture."],
      ["Can I hire you for backend or API development?", "Yes. We can focus on Django, DRF, PostgreSQL, authentication, integrations and production deployment."],
      ["Can you integrate AI into my existing system?", "Yes. We build LLM API integrations, internal assistants, database-connected AI workflows and automation scenarios."],
      ["Do you provide support after the project is complete?", "Yes. We can provide long-term maintenance for deployment, monitoring, small improvements and technical support."]
    ]
  }
};

let currentLanguage = CONFIG.defaultLanguage;

function trackEvent(eventName, parameters = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...parameters,
    language: currentLanguage,
    attribution: getAttributionData()
  });
}

function getAttributionData() {
  try {
    return JSON.parse(sessionStorage.getItem("ads_attribution") || "{}");
  } catch {
    return {};
  }
}

function storeAttribution() {
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
  const data = {};
  keys.forEach((key) => {
    const value = params.get(key);
    if (value) data[key] = value.slice(0, 180);
  });
  if (Object.keys(data).length) {
    sessionStorage.setItem("ads_attribution", JSON.stringify(data));
  }
}

function iconSvg(index) {
  const icons = [
    '<path d="M5 12h14M12 5v14"/><path d="M4 4h16v16H4z"/>',
    '<path d="M4 7h16M7 7v10m10-10v10"/><path d="M6 17h12"/>',
    '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
    '<path d="M12 3a4 4 0 0 0-4 4v1H6v4h2v5a4 4 0 0 0 8 0v-5h2V8h-2V7a4 4 0 0 0-4-4z"/>',
    '<path d="M4 6h16v12H4z"/><path d="M8 10h8M8 14h5"/>',
    '<path d="M12 3v6l5 3-5 3v6"/><path d="M7 6l5 3-5 3m10-6-5 3 5 3"/>'
  ];
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[index % icons.length]}</svg>`;
}

function setTextContent(dictionary) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    if (dictionary[key]) element.alt = dictionary[key];
  });

  document.querySelectorAll("[data-brand]").forEach((element) => {
    element.textContent = CONFIG.brandName;
  });
}

function renderLists(dictionary) {
  const trustGrid = document.getElementById("trustGrid");
  trustGrid.innerHTML = dictionary.trust.map((item, index) => `
    <div class="trust-item reveal">${iconSvg(index)}<span>${item}</span></div>
  `).join("");

  const servicesGrid = document.getElementById("servicesGrid");
  servicesGrid.innerHTML = dictionary.services.map(([title, text], index) => `
    <article class="service-card reveal">
      ${iconSvg(index)}
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `).join("");

  const projectsGrid = document.getElementById("projectsGrid");
  projectsGrid.innerHTML = dictionary.projects.map(([category, name, text, tech, tags]) => `
    <article class="project-card reveal" tabindex="0" data-project-card>
      <div class="project-visual" aria-hidden="true"></div>
      <div class="project-body">
        <div class="project-category">${category}</div>
        <h3>${name}</h3>
        <p>${text}</p>
        <p><strong>${tech}</strong></p>
        <div class="project-tags">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");

  const whyGrid = document.getElementById("whyGrid");
  whyGrid.innerHTML = dictionary.why.map(([title, text]) => `
    <article class="why-card reveal">
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `).join("");

  const processGrid = document.getElementById("processGrid");
  processGrid.innerHTML = dictionary.process.map(([title, text], index) => `
    <article class="process-step reveal">
      <span class="step-number">${String(index + 1).padStart(2, "0")}</span>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `).join("");

  const techCloud = document.getElementById("techCloud");
  techCloud.innerHTML = dictionary.techGroups.map(([group, items]) => `
    <div class="tech-group reveal">
      <strong>${group}</strong>
      ${items.map((item) => `<span>${item}</span>`).join("")}
    </div>
  `).join("");

  const faqList = document.getElementById("faqList");
  faqList.innerHTML = dictionary.faq.map(([question, answer], index) => `
    <article class="faq-item reveal">
      <button class="faq-button" type="button" aria-expanded="false" aria-controls="faq-panel-${index}" id="faq-button-${index}">
        <span>${question}</span><span aria-hidden="true">+</span>
      </button>
      <div class="faq-panel" id="faq-panel-${index}" role="region" aria-labelledby="faq-button-${index}" aria-hidden="true">
        <div><p>${answer}</p></div>
      </div>
    </article>
  `).join("");
}

function updateLinks(dictionary) {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(dictionary.whatsappMessage)}`;
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = whatsappUrl;
    link.rel = "noopener";
    link.onclick = () => {
      trackEvent("whatsapp_click", { location: link.dataset.location || "unknown" });
      trackEvent("generate_lead", { method: "whatsapp", location: link.dataset.location || "unknown" });
    };
  });

  document.querySelectorAll("[data-email]").forEach((link) => {
    link.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(dictionary.emailSubject)}&body=${dictionary.emailBody}`;
    link.textContent = link.dataset.location === "footer" ? CONFIG.email : link.textContent;
    link.onclick = () => {
      trackEvent("email_click", { location: link.dataset.location || "unknown" });
      trackEvent("generate_lead", { method: "email", location: link.dataset.location || "unknown" });
    };
  });

  document.querySelectorAll("[data-social]").forEach((link) => {
    const value = CONFIG[link.dataset.social] || "#";
    link.href = value;
    if (value !== "#") {
      link.target = "_blank";
      link.rel = "noopener";
    }
  });
}

function updateSeo(dictionary) {
  document.documentElement.lang = currentLanguage;
  document.title = dictionary.documentTitle;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", dictionary.metaDescription);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (ogTitle) ogTitle.setAttribute("content", dictionary.documentTitle);
  if (ogDescription) ogDescription.setAttribute("content", dictionary.metaDescription);
  if (twitterTitle) twitterTitle.setAttribute("content", dictionary.documentTitle);
  if (twitterDescription) twitterDescription.setAttribute("content", dictionary.metaDescription);
}

function setLanguage(language, shouldTrack = true) {
  currentLanguage = translations[language] ? language : CONFIG.defaultLanguage;
  const dictionary = translations[currentLanguage];
  localStorage.setItem("preferred_language", currentLanguage);
  setTextContent(dictionary);
  renderLists(dictionary);
  updateLinks(dictionary);
  updateSeo(dictionary);
  bindFaq();
  bindProjectTracking();
  observeReveals();

  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.langButton === currentLanguage));
  });

  const menuToggle = document.querySelector("[data-menu-toggle]");
  if (menuToggle) {
    menuToggle.setAttribute("aria-label", menuToggle.getAttribute("aria-expanded") === "true" ? dictionary.menuClose : dictionary.menuOpen);
  }

  if (shouldTrack) trackEvent("language_change", { selected_language: currentLanguage });
}

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const queryLanguage = params.get("lang");
  if (queryLanguage && translations[queryLanguage]) return queryLanguage;
  const storedLanguage = localStorage.getItem("preferred_language");
  if (storedLanguage && translations[storedLanguage]) return storedLanguage;
  return CONFIG.defaultLanguage;
}

function bindNavigation() {
  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-menu]");
  const toggle = document.querySelector("[data-menu-toggle]");

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  }, { passive: true });

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", translations[currentLanguage][!isOpen ? "menuClose" : "menuOpen"]);
    menu.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", translations[currentLanguage].menuOpen);
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });

  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.langButton));
  });
}

function bindFaq() {
  document.querySelectorAll(".faq-button").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isExpanded));
      panel.setAttribute("aria-hidden", String(isExpanded));
    });
  });
}

function bindProjectTracking() {
  document.querySelectorAll("[data-project-card]").forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h3")?.textContent || "unknown";
      trackEvent("portfolio_click", { project: title, location: "project_section" });
    });
  });
}

let revealObserver;
function observeReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => revealObserver.observe(element));
}

function initConsent() {
  const consent = document.querySelector("[data-consent]");
  if (!CONFIG.consentEnabled || !consent) return;
  const stored = localStorage.getItem("analytics_consent");
  if (!stored) consent.hidden = false;

  document.querySelector("[data-consent-accept]").addEventListener("click", () => {
    localStorage.setItem("analytics_consent", "accepted");
    consent.hidden = true;
    trackEvent("consent_update", { consent: "accepted" });
  });

  document.querySelector("[data-consent-reject]").addEventListener("click", () => {
    localStorage.setItem("analytics_consent", "rejected");
    consent.hidden = true;
    trackEvent("consent_update", { consent: "rejected" });
  });
}

function bindCtaTracking() {
  document.querySelectorAll("[data-whatsapp], [data-email]").forEach((link) => {
    link.addEventListener("click", () => {
      if (link.dataset.location) {
        trackEvent("project_cta_click", { location: link.dataset.location });
      }
    });
  });
}

function updateStructuredData() {
  const node = document.getElementById("structured-data");
  if (!node) return;
  node.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: CONFIG.brandName,
    url: "https://example.com/",
    description: translations.en.metaDescription,
    email: CONFIG.email,
    sameAs: [CONFIG.githubAli, CONFIG.linkedinAli, CONFIG.githubMahsun, CONFIG.linkedinMahsun].filter((url) => url && url !== "#")
  });
}

document.addEventListener("DOMContentLoaded", () => {
  storeAttribution();
  document.getElementById("year").textContent = new Date().getFullYear();
  bindNavigation();
  setLanguage(getInitialLanguage(), false);
  bindCtaTracking();
  initConsent();
  updateStructuredData();
});
