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

const TELEGRAM_USERNAME = "sebahhhh";

// ★ SETUP TIKTOK — replace YOUR_TIKTOK_USERNAME with your real
//   TikTok username (no "@"). The Follow button + video tiles update.
const TIKTOK_USERNAME = "legend.electronic3";

const TELEGRAM_LINK = `https://t.me/${TELEGRAM_USERNAME}`;
const TIKTOK_LINK = `https://www.tiktok.com/@${TIKTOK_USERNAME}`;

function tgLink(message) {
  return `${TELEGRAM_LINK}?text=${encodeURIComponent(message)}`;
}

// ================= TELEGRAM LINKS + TOAST =================

const toast = document.getElementById("toast");
let toastTimer;

function showToast(msg) {
  toast.innerHTML = `<span class="toast-dot"></span><span>${msg}</span>`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

const genericMsg = "Hi, I'd like to ask about Legend Electronics products and prices.";

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
  } else if (e.target.closest(".tg-btn, .product-cta, .float-tg")) {
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


// ================= NAVBAR / MOBILE MENU =================

const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

hamburger.addEventListener("click", () => {
  const open = navMenu.classList.toggle("active");
  hamburger.classList.toggle("active", open);
  document.body.style.overflow = open ? "hidden" : "";
});

navMenu.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
  });
});

const navSections = ["home", "products", "about", "faq", "contact-form-section"];
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

document.querySelectorAll(".section-head, .about-card, .about-copy, .faq-card, .tiktok-video, .contact-form-card, .footer-grid").forEach(el => {
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

  const boxes = [];
  for (let i = 0; i < 7; i++) {
    const c = i % 2 ? 0x3ee6ff : 0xffc53d;
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.32),
      new THREE.MeshPhongMaterial({ color: c, emissive: c, emissiveIntensity: 0.35, transparent: true, opacity: 0.85 }));
    m.userData = { a: (i / 7) * Math.PI * 2, r: 2.3 + (i % 3) * 0.45, s: 0.25 + (i % 4) * 0.07, y: Math.random() - 0.5 };
    group.add(m); boxes.push(m);
  }

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
    boxes.forEach(b => {
      const u = b.userData, a = u.a + t * u.s;
      b.position.set(Math.cos(a) * u.r, Math.sin(t * 0.8 + u.a) * 0.6 + u.y, Math.sin(a) * u.r);
      b.rotation.x = t * 0.9; b.rotation.y = t * 0.7;
    });

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

// ================= SCROLL PROGRESS + 3D CARD TILT =================
const progress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
}, { passive: true });

const tiltGrid = document.getElementById("productGrid");
if (tiltGrid && matchMedia("(hover: hover)").matches) {
  tiltGrid.addEventListener("pointermove", (e) => {
    const c = e.target.closest(".product-card");
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 10 + "deg");
    c.style.setProperty("--rx", -((e.clientY - r.top) / r.height - 0.5) * 10 + "deg");
  });
  tiltGrid.addEventListener("pointerout", (e) => {
    const c = e.target.closest(".product-card");
    if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); }
  });
}