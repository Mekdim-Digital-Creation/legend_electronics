/* ============================================================
   Ethio Electronics — script.js
   Three.js hero · 16-product catalog · search + filters ·
   quick-view modal · Telegram ordering · toasts
   ════════════════════════════════════════════════════════════
   ★ SETUP REQUIRED — edit the line below:
   Replace YOUR_TELEGRAM_USERNAME with your real Telegram
   username (no "@"). All Contact buttons, the floating widget
   and footer button update automatically.
   ============================================================ */

const TELEGRAM_USERNAME = "YOUR_TELEGRAM_USERNAME";

// ★ SETUP TIKTOK — replace YOUR_TIKTOK_USERNAME with your real
//   TikTok username (no "@"). The Follow button + video tiles update.
const TIKTOK_USERNAME = "YOUR_TIKTOK_USERNAME";

const TELEGRAM_LINK = `https://t.me/${@sebahhhh}`;
const TIKTOK_LINK = `https://www.tiktok.com/@${@legend.electronic3}`;

function tgLink(message) {
  return `${TELEGRAM_LINK}?text=${encodeURIComponent(message)}`;
}

// ================= PRODUCT DATA =================

const IMG = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80`;

const PRODUCTS = [
  { id: 1,  name: "Nova X5 Pro 5G",        cat: "phones",     key: "phone",     specs: ['6.7" OLED · 120Hz', "12GB / 256GB", "108MP camera", "5G"],        price: 32499, badge: "Best Seller", img: IMG("1511707171634-5f897ff02aa9") },
  { id: 2,  name: "Titan Ultra 5G",        cat: "phones",     key: "phone",     specs: ['6.9" 2K · 144Hz', "16GB / 512GB", "200MP camera", "5G"],        price: 55999, badge: "Premium", img: IMG("1592750475338-74b7b21085ab") },
  { id: 3,  name: "EchoBuds Pro",          cat: "audio",      key: "earbuds",   specs: ["Active ANC", "36h battery", "IPX5", "Bluetooth 5.3"],               price: 6999,  badge: "Hot Deal", img: IMG("1606220588913-b3aacb4d2f46") },
  { id: 4,  name: "SkyPod ANC Earbuds",    cat: "audio",      key: "earbuds",   specs: ["Adaptive ANC", "48h battery", "Spatial audio", "Wireless charge"], price: 9499,  badge: "New", img: IMG("1590658268037-6bf12165a8df") },
  { id: 5,  name: "StudioHead Max",        cat: "audio",      key: "headphones", specs: ["Over-ear", "40mm drivers", "Bluetooth 5.3", "40h battery"],        price: 4999,  badge: null, img: IMG("1505740420928-5e560c06d30e") },
  { id: 6,  name: "BassRock X1 Speaker",   cat: "audio",      key: "speaker",   specs: ["360° sound", "20W output", "IPX6", "12h battery"],                   price: 8499,  badge: null, img: IMG("1589003077984-894e133dabab") },
  { id: 7,  name: "Vertex 16 Pro Laptop",  cat: "computing",  key: "laptop",    specs: ["Intel i7 · 14-core", "16GB / 512GB SSD", '16" 2.5K', "RTX"],        price: 89999, badge: "Best Seller", img: IMG("1517336714731-489689fd1ca8") },
  { id: 8,  name: "AirBook Slim Laptop",   cat: "computing",  key: "laptop",    specs: ["M-series chip", "16GB / 1TB SSD", '13.6" Retina', "1.2kg"],        price: 128500, badge: "New", img: IMG("1496181133206-80ce9b88a853") },
  { id: 9,  name: "Typemaster Mech KB",    cat: "computing",  key: "keyboard",  specs: ["Hot-swap", "RGB backlit", "PBT keycaps", "Wireless"],                price: 6499,  badge: null, img: IMG("1587829741301-dc798b83add3") },
  { id: 10, name: "Aurora Smartwatch",     cat: "wearables",  key: "watch",     specs: ["AMOLED always-on", "GPS + NFC", "14-day battery", "Health suite"],   price: 12499, badge: "Best Seller", img: IMG("1546868871-7041f2a55e12") },
  { id: 11, name: "Pulse Band Fitness",    cat: "wearables",  key: "watch",     specs: ["HD display", "HR + SpO2", "10-day battery", "100+ sports modes"],    price: 6499,  badge: "Hot Deal", img: IMG("1523275335684-37898b6baf30") },
  { id: 12, name: 'Vision 55" 4K TV',      cat: "tv",         key: "tv",        specs: ['55" 4K UHD', "HDR10+", "Smart OS", "120Hz"],                         price: 74999, badge: "Premium", img: IMG("1593784991095-a205069470b6") },
  { id: 13, name: "PocketShot Action Cam", cat: "cameras",    key: "camera",    specs: ["4K/60fps", "32MP", "Waterproof 10m", "Stabilization"],               price: 18999, badge: "New", img: IMG("1516035069371-29a1b244cc32") },
  { id: 14, name: "LensCraft Pro DSLR",    cat: "cameras",    key: "camera",    specs: ["Full-frame 24MP", "4K/120fps", "IBIS", "Interchangeable lens"],      price: 96999, badge: "Premium", img: IMG("1502920917128-1aa500764cbd") },
  { id: 15, name: "SkyBox 5 Console",      cat: "gaming",     key: "console",   specs: ["4K/60fps", "8-core CPU", "SSD storage", "Wireless pad"],             price: 59999, badge: null, img: IMG("1606813907291-d86efa9b94db") },
  { id: 16, name: "TurboPad Controller",   cat: "gaming",     key: "controller", specs: ["Wireless", "Hall-effect sticks", "RGB", "18h battery"],           price: 4999,  badge: "Hot Deal", img: IMG("1605901309584-818e25960a8f") }
];

const CAT_LABELS = {
  phones: "Phones", audio: "Audio", computing: "Computing",
  wearables: "Wearables", tv: "TV", cameras: "Cameras", gaming: "Gaming"
};

function etb(n) {
  return n.toLocaleString("en-US") + " ETB";
}

// ================= IMAGE FALLBACK (offline-safe) =================

const FALLBACK_SHAPES = {
  phone: '<rect x="140" y="42" width="120" height="218" rx="26" fill="#0b131a" stroke="url(#g)" stroke-width="6"/><rect x="154" y="56" width="92" height="190" rx="18" fill="url(#g)" opacity="0.2"/><rect x="168" y="116" width="64" height="12" rx="6" fill="#00ff9d" opacity="0.9"/><rect x="168" y="138" width="48" height="12" rx="6" fill="#93a7b8" opacity="0.5"/><rect x="168" y="160" width="56" height="12" rx="6" fill="#93a7b8" opacity="0.5"/>',
  laptop: '<rect x="78" y="60" width="244" height="150" rx="12" fill="#0b131a" stroke="url(#g)" stroke-width="6"/><rect x="92" y="74" width="216" height="122" rx="8" fill="url(#g)" opacity="0.2"/><rect x="120" y="100" width="150" height="10" rx="5" fill="#00ff9d" opacity="0.9"/><rect x="120" y="122" width="120" height="10" rx="5" fill="#93a7b8" opacity="0.5"/><rect x="120" y="144" width="110" height="10" rx="5" fill="#93a7b8" opacity="0.5"/><rect x="90" y="210" width="220" height="16" rx="6" fill="#0b131a" stroke="url(#g)" stroke-width="5"/>',
  earbuds: '<path d="M152 122 a28 28 0 0 1 56 0 v70 a10 10 0 0 1 -10 10 h-36 a10 10 0 0 1 -10 -10 z" fill="#0b131a" stroke="url(#g)" stroke-width="5"/><circle cx="180" cy="122" r="22" fill="none" stroke="url(#g)" stroke-width="4"/><circle cx="180" cy="122" r="8" fill="#00ff9d"/><path d="M208 122 a28 28 0 0 1 56 0 v70 a10 10 0 0 1 -10 10 h-36 a10 10 0 0 1 -10 -10 z" fill="#0b131a" stroke="url(#g)" stroke-width="5"/><circle cx="236" cy="122" r="22" fill="none" stroke="url(#g)" stroke-width="4"/><circle cx="236" cy="122" r="8" fill="#3ee6ff"/>',
  headphones: '<circle cx="118" cy="214" r="42" fill="none" stroke="#00ff9d" stroke-opacity="0.35" stroke-width="2"/><circle cx="282" cy="214" r="42" fill="none" stroke="#3ee6ff" stroke-opacity="0.35" stroke-width="2"/><path d="M118 214 v-32 a82 82 0 0 1 164 0 v32" fill="none" stroke="url(#g)" stroke-width="9" stroke-linecap="round"/><ellipse cx="118" cy="214" rx="27" ry="35" fill="#0b131a" stroke="url(#g)" stroke-width="5"/><ellipse cx="118" cy="214" rx="11" ry="15" fill="#00ff9d"/><ellipse cx="282" cy="214" rx="27" ry="35" fill="#0b131a" stroke="url(#g)" stroke-width="5"/><ellipse cx="282" cy="214" rx="11" ry="15" fill="#3ee6ff"/>',
  speaker: '<rect x="90" y="120" width="220" height="120" rx="20" fill="#0b131a" stroke="url(#g)" stroke-width="6"/><circle cx="200" cy="175" r="50" fill="none" stroke="url(#g)" stroke-width="6"/><circle cx="200" cy="175" r="26" fill="url(#g)" opacity="0.25"/><rect x="176" y="96" width="48" height="18" rx="9" fill="#ffc53d"/><line x1="120" y1="120" x2="120" y2="240" stroke="#93a7b8" stroke-width="3" stroke-dasharray="4 5"/>',
  watch: '<path d="M182 92 v-38 a18 18 0 0 1 36 0 v38" fill="none" stroke="url(#g)" stroke-width="26" stroke-linecap="round"/><path d="M182 208 v38 a18 18 0 0 0 36 0 v-38" fill="none" stroke="url(#g)" stroke-width="26" stroke-linecap="round"/><circle cx="200" cy="150" r="64" fill="#0b131a" stroke="url(#g)" stroke-width="7"/><circle cx="200" cy="150" r="48" fill="url(#g)" opacity="0.2"/><line x1="200" y1="150" x2="200" y2="118" stroke="#00ff9d" stroke-width="5" stroke-linecap="round"/><line x1="200" y1="150" x2="222" y2="162" stroke="#ffc53d" stroke-width="5" stroke-linecap="round"/><circle cx="200" cy="150" r="5" fill="#3ee6ff"/>',
  tv: '<rect x="50" y="56" width="300" height="176" rx="16" fill="#0b131a" stroke="url(#g)" stroke-width="7"/><rect x="62" y="68" width="276" height="152" rx="10" fill="url(#g)" opacity="0.28"/><rect x="62" y="68" width="276" height="152" rx="10" fill="none" stroke="#00ff9d" stroke-opacity="0.5" stroke-width="2"/><circle cx="128" cy="118" r="14" fill="#00ff9d"/><circle cx="168" cy="162" r="20" fill="#3ee6ff"/><rect x="180" y="232" width="40" height="20" rx="4" fill="#ffc53d"/><rect x="156" y="252" width="88" height="8" rx="4" fill="#131d26"/>',
  camera: '<rect x="78" y="88" width="244" height="152" rx="20" fill="#0b131a" stroke="url(#g)" stroke-width="6"/><rect x="78" y="88" width="160" height="62" rx="20" fill="#0e1620" stroke="url(#g)" stroke-width="5"/><circle cx="188" cy="168" r="48" fill="none" stroke="url(#g)" stroke-width="6"/><circle cx="188" cy="168" r="30" fill="url(#g)" opacity="0.22"/><circle cx="188" cy="168" r="13" fill="url(#g)"/><circle cx="270" cy="120" r="9" fill="#ffc53d"/>',
  keyboard: '<rect x="52" y="96" width="296" height="128" rx="18" fill="#0b131a" stroke="url(#g)" stroke-width="6"/><rect x="66" y="110" width="30" height="22" rx="6" fill="#00ff9d"/><rect x="102" y="110" width="30" height="22" rx="6" fill="#93a7b8" opacity="0.4"/><rect x="138" y="110" width="30" height="22" rx="6" fill="#93a7b8" opacity="0.4"/><rect x="174" y="110" width="30" height="22" rx="6" fill="#93a7b8" opacity="0.4"/><rect x="210" y="110" width="30" height="22" rx="6" fill="#93a7b8" opacity="0.4"/><rect x="246" y="110" width="78" height="22" rx="6" fill="#3ee6ff" opacity="0.8"/><rect x="66" y="140" width="268" height="22" rx="6" fill="none" stroke="#00ff9d" stroke-opacity="0.45" stroke-width="2"/><rect x="66" y="170" width="268" height="22" rx="6" fill="none" stroke="#00ff9d" stroke-opacity="0.45" stroke-width="2"/>',
  console: '<rect x="70" y="110" width="260" height="80" rx="18" fill="#0b131a" stroke="url(#g)" stroke-width="6"/><rect x="90" y="96" width="220" height="14" rx="7" fill="#ffc53d"/><circle cx="150" cy="150" r="12" fill="url(#g)"/><circle cx="250" cy="150" r="12" fill="url(#g)"/><line x1="150" y1="210" x2="250" y2="210" stroke="#00ff9d" stroke-width="6" stroke-linecap="round"/>',
  controller: '<path d="M120 130 a38 38 0 0 1 34 -34 h12 a38 38 0 0 1 68 0 h12 a38 38 0 0 1 34 34 v6 a38 38 0 0 1 -34 34 h-16 a34 34 0 0 0 -40 0 h-16 a38 38 0 0 1 -34 -34 z" fill="#0b131a" stroke="url(#g)" stroke-width="6"/><circle cx="160" cy="138" r="10" fill="none" stroke="#00ff9d" stroke-width="5"/><circle cx="160" cy="150" r="6" fill="#00ff9d"/><circle cx="240" cy="138" r="10" fill="none" stroke="#3ee6ff" stroke-width="5"/><circle cx="240" cy="150" r="6" fill="#3ee6ff"/><rect x="146" y="170" width="8" height="16" rx="3" fill="#ffc53d"/><rect x="183" y="176" width="9" height="9" rx="2" fill="#00ff9d"/><rect x="197" y="176" width="9" height="9" rx="2" fill="#3ee6ff"/><rect x="211" y="176" width="9" height="9" rx="2" fill="#ffc53d"/><rect x="225" y="176" width="9" height="9" rx="2" fill="#ff3b5c"/>'
};

window.fallbackImg = function (imgEl, key) {
  const shape = FALLBACK_SHAPES[key] || FALLBACK_SHAPES.phone;
  const svg = `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00ff9d"/><stop offset="100%" stop-color="#3ee6ff"/></linearGradient></defs><rect width="400" height="300" fill="#050a0f"/><circle cx="200" cy="140" r="150" fill="#00ff9d" opacity="0.08"/><circle cx="200" cy="140" r="110" fill="#00ff9d" opacity="0.06"/>${shape}</svg>`;
  imgEl.onerror = null;
  imgEl.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};

// ================= RENDER GRID =================

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
let activeFilter = "all";
let query = "";

function productCardHTML(p, index) {
  const delay = (index % 4) * 60;
  const chips = p.specs.map(s => `<span class="spec-chip">${s}</span>`).join("");
  return `
  <article class="product-card glass" data-name="${p.name.toLowerCase()}">
    <div class="product-media" data-view="${p.id}">
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="fallbackImg(this, '${p.key}')" />
      <span class="product-cat">${CAT_LABELS[p.cat]}</span>
      ${p.badge ? `<span class="product-badge-top">${p.badge}</span>` : ""}
      <span class="quick-view">Quick View</span>
    </div>
    <div class="product-body">
      <h3 class="product-name">${p.name}</h3>
      <div class="product-specs">${chips}</div>
      <div class="product-buy">
        <div class="product-price">${etb(p.price)}<small>ETB</small></div>
        <a class="contact-btn" target="_blank" rel="noopener"
           href="${tgLink(`Hi, I'm interested in buying ${p.name}`)}">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.6 18.7 19c-.24 1.06-.87 1.32-1.76.82l-4.87-3.59-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.97L18.3 6.6c.4-.35-.09-.55-.61-.2L6.57 13.5l-4.75-1.48c-1.03-.32-1.05-1.03.22-1.53L20.73 3.1c.86-.32 1.61.19 1.17 1.5z"/></svg>
          Contact
        </a>
      </div>
    </div>
  </article>`;
}

function renderGrid() {
  const list = PRODUCTS.filter(p => {
    const inCat = activeFilter === "all" || p.cat === activeFilter;
    const inQuery = !query ||
      p.name.toLowerCase().includes(query) ||
      p.specs.join(" ").toLowerCase().includes(query) ||
      CAT_LABELS[p.cat].toLowerCase().includes(query);
    return inCat && inQuery;
  });

  const label = CAT_LABELS[activeFilter] || "All categories";
  resultCount.textContent = list.length === 0
    ? "No matches"
    : `${list.length} device${list.length === 1 ? "" : "s"} · ${label}`;

  productGrid.innerHTML = list.length
    ? list.map(productCardHTML).join("")
    : `<p class="no-products">Nothing found${query ? ` for “${query}”` : " in this category"}.</p>`;
}

// ================= SEARCH + FILTERS =================

searchInput.addEventListener("input", () => {
  query = searchInput.value.trim().toLowerCase();
  renderGrid();
});

const filterTabs = document.getElementById("filterTabs");
filterTabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".filter-tab");
  if (!tab) return;
  filterTabs.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
  activeFilter = tab.dataset.filter;
  renderGrid();
});

renderGrid();

// ================= QUICK VIEW MODAL =================

const modal = document.getElementById("productModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalContact = document.getElementById("modalContact");

function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  document.getElementById("modalMedia").innerHTML = `<img src="${p.img}" alt="${p.name}" onerror="fallbackImg(this, '${p.key}')" />`;
  document.getElementById("modalCat").textContent = CAT_LABELS[p.cat];
  document.getElementById("modalTitle").textContent = p.name;
  document.getElementById("modalSpecs").innerHTML = p.specs.map(s => `<li>${s}</li>`).join("");
  document.getElementById("modalPrice").textContent = etb(p.price);
  modalContact.href = tgLink(`Hi, I'm interested in buying ${p.name}`);
  modal.classList.add("open");
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

productGrid.addEventListener("click", (e) => {
  const view = e.target.closest("[data-view]");
  if (view) openModal(Number(view.dataset.view));
});

modalOverlay.addEventListener("click", closeModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

// ================= TELEGRAM LINKS + TOAST =================

const toast = document.getElementById("toast");
let toastTimer;

function showToast(msg) {
  toast.innerHTML = `<span class="toast-dot"></span><span>${msg}</span>`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

const genericMsg = "Hi, I'd like to ask about Ethio Electronics products and prices.";

[NavTelegram(), heroTelegram(), footerTelegram(), floatTelegram()].forEach(btn => {
  btn.setAttribute("href", tgLink(genericMsg));
  btn.setAttribute("target", "_blank");
  btn.setAttribute("rel", "noopener");
});

function NavTelegram() { return document.getElementById("navTelegram"); }
function heroTelegram() { return document.getElementById("heroTelegram"); }
function footerTelegram() { return document.getElementById("footerTelegram"); }
function floatTelegram() { return document.getElementById("floatTelegram"); }

// Toast when any Telegram/TikTok button is pressed (still opens the link)
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-tiktok]")) {
    showToast("Opening TikTok — follow us for reviews & giveaways");
  } else if (e.target.closest(".tg-btn, .contact-btn, .float-tg")) {
    showToast("Opening Telegram — your message is pre-filled");
  }
});

// TikTok links
document.querySelectorAll("[data-tiktok]").forEach(link => {
  link.setAttribute("href", TIKTOK_LINK);
});

const tiktokButton = document.getElementById("tiktokButton");
if (tiktokButton) {
  tiktokButton.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 6.5a4.8 4.8 0 0 1-3.3-1.3 4.8 4.8 0 0 1-1.4-3.4h-3.1v13.1a2.9 2.9 0 1 1-2-2.8V8.9a6.1 6.1 0 1 0 5.1 6V8.9a7.9 7.9 0 0 0 4.6 1.5V7.4c-.3 0-.6-.1-.9-.2z"/></svg> Follow @${TIKTOK_USERNAME}`;
}

if (TELEGRAM_USERNAME === "YOUR_TELEGRAM_USERNAME" || TIKTOK_USERNAME === "YOUR_TIKTOK_USERNAME") {
  console.warn("EthioElectronics: open script.js and set your Telegram + TikTok usernames (TELEGRAM_USERNAME / TIKTOK_USERNAME).");
}

// ================= NAVBAR / MOBILE MENU =================

const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

hamburger.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  hamburger.classList.toggle("active", open);
  document.body.style.overflow = open ? "hidden" : "";
});

navMenu.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
  });
});

const navSections = ["home", "products", "about", "contact"];
function updateActive() {
  const pos = window.scrollY + 140;
  let current = "home";
  navSections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= pos) current = id;
  });
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", updateActive, { passive: true });
updateActive();

// ================= REVEAL ON SCROLL =================

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section-head, .about-card, .about-copy, .footer-grid").forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// ================= THREE.JS HERO =================

if (window.THREE) {
  initHero3D();
}

function initHero3D() {
  const mount = document.getElementById("hero3d");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 120);
  camera.position.set(0, 0, 10);

  const renderer = new THREE.WebGLRenderer({ canvas: mount, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  scene.add(new THREE.AmbientLight(0xaaccff, 0.9));
  const keyLight = new THREE.DirectionalLight(0x00ff9d, 1.5);
  keyLight.position.set(4, 6, 6);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xffc53d, 1.0);
  rimLight.position.set(-6, -3, 4);
  scene.add(rimLight);

  const group = new THREE.Group();
  scene.add(group);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 48, 48),
    new THREE.MeshPhongMaterial({ color: 0x00ff9d, emissive: 0x00ff9d, emissiveIntensity: 1.0, shininess: 90 })
  );
  group.add(core);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.25, 1),
    new THREE.MeshBasicMaterial({ color: 0x3ee6ff, wireframe: true, transparent: true, opacity: 0.5 })
  );
  group.add(shell);

  const holoshell = new THREE.Mesh(
    new THREE.DodecahedronGeometry(2.2, 0),
    new THREE.MeshBasicMaterial({ color: 0x00ff9d, wireframe: true, transparent: true, opacity: 0.16 })
  );
  group.add(holoshell);

  const rings = [
    { r: 2.7, size: 0.016, color: 0x00ff9d, opacity: 0.4, rx: 1.45, ry: 0, dir: 1 },
    { r: 3.05, size: 0.013, color: 0x3ee6ff, opacity: 0.35, rx: 1.2, ry: 1.9, dir: -1 },
    { r: 3.4, size: 0.011, color: 0xffc53d, opacity: 0.3, rx: 1.0, ry: 3.4, dir: 1 }
  ].map(s => {
    const mat = new THREE.MeshBasicMaterial({
      color: s.color, transparent: true, opacity: s.opacity,
      side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(s.r, s.size, 12, 140), mat);
    ring.rotation.x = s.rx;
    ring.rotation.y = s.ry;
    ring.userData.dir = s.dir;
    group.add(ring);
    return ring;
  });

  const count = 700;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    const r = 4 + Math.random() * 6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i] = r * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = r * Math.cos(phi);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({
      color: 0x8fffd0, size: 0.04, transparent: true, opacity: 0.75,
      blending: THREE.AdditiveBlending, depthWrite: false
    })
  );
  scene.add(particles);

  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  window.addEventListener("pointermove", (e) => {
    targetX = (e.clientX / window.innerWidth) * 2 - 1;
    targetY = (e.clientY / window.innerHeight) * 2 - 1;
  });

  const clock = new THREE.Clock();

  function onResize() {
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", onResize);
  onResize();

  function animate() {
    const t = clock.getElapsedTime();
    const scroll = window.scrollY;

    group.rotation.y += 0.0023;
    group.rotation.z += 0.0007;

    curX += (targetX - curX) * 0.05;
    curY += (targetY - curY) * 0.05;
    group.rotation.y += curX * 0.07;
    group.rotation.x += -curY * 0.055;
    camera.position.x += (curX * 0.55 - camera.position.x) * 0.05;
    camera.position.y += (-curY * 0.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    const scrollNorm = Math.min(scroll / 850, 1);
    camera.position.z = 10 - scrollNorm * 1.7;
    group.rotation.z += scrollNorm * 0.002;

    core.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
    core.material.emissiveIntensity = 0.85 + Math.sin(t * 2.4) * 0.45;
    shell.rotation.x = t * 0.25;
    shell.rotation.y = t * 0.35;
    holoshell.rotation.y = -t * 0.12;
    holoshell.rotation.x = -t * 0.08;

    rings.forEach(ring => {
      ring.rotation.z += ring.userData.dir * 0.0014;
    });

    particles.rotation.y = t * 0.018;

    const heroContent = document.getElementById("heroContent");
    if (heroContent) {
      heroContent.style.transform = `translateY(${scroll * 0.16}px)`;
      heroContent.style.opacity = Math.max(1 - scroll / 700, 0);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}