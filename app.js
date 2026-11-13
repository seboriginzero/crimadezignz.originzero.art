/**
 * CrimaDezignz® | Haute-Couture Avant-Garde Trademark Atelier
 * Clean Hero 3D Crucible & Darkroom Exhibition Engine
 * - 3D Gyroscope Physics & Dynamic Specular Matrix
 * - Custom Magnetic Cursor with Inertia Damping
 * - Dynamic Darkroom Spotlight Exhibition (Pure Visual Focus, No Categories)
 * - Dual Language System (EN default / RO)
 * - Obsidian / Alabaster Dual Theme
 */

// =============================================================================
// 1. Dual Language Dictionary (EN default, RO toggle)
// =============================================================================
const TRANSLATIONS = {
  en: {
    nav: {
      sub: "TRADEMARK ATELIER",
      crucible: "3D Crucible",
      exhibition: "Exhibition",
      profile: "99designs Profile ↗"
    },
    works: {
      tag: "CURATED EXHIBITION",
      title: "Visual Works Exhibition",
      desc: "Hover any work to trigger darkroom spotlight focus and optical coordinate analysis.",
      search_placeholder: "Search exhibition (e.g. warrior, lion, hawk, racing)...",
      load_more: "LOAD MORE WORKS",
      no_results: "No marks match your search criteria."
    },
    footer: {
      about: "Haute-couture trademark architecture and visual identities created for international clients and competitions on 99designs.",
      col_nav: "Navigation",
      col_specs: "Platform Architecture"
    }
  },
  ro: {
    nav: {
      sub: "ATELIER DE MĂRCI",
      crucible: "Creuzet 3D",
      exhibition: "Expoziție",
      profile: "Profil 99designs ↗"
    },
    works: {
      tag: "EXPOZIȚIE CURATĂ",
      title: "Expoziția Lucrărilor Vizuale",
      desc: "Treci cursorul peste orice lucrare pentru a activa focalizarea darkroom și analiza coordonatelor optice.",
      search_placeholder: "Caută în expoziție (ex: warrior, lion, hawk, racing)...",
      load_more: "ÎNCARCĂ MAI MULTE LUCRĂRI",
      no_results: "Nicio lucrare nu corespunde căutării."
    },
    footer: {
      about: "Arhitectură de identitate haute-couture și mărci vizuale create pentru clienți și competiții internaționale pe 99designs.",
      col_nav: "Navigație",
      col_specs: "Arhitectură Platformă"
    }
  }
};

// =============================================================================
// 2. Application Core Class
// =============================================================================
class AvantGardeAtelierApp {
  constructor() {
    this.currentLang = localStorage.getItem("crimadezignz_lang") || "en";
    this.currentTheme = localStorage.getItem("crimadezignz_theme") || "dark";
    this.isAudioEnabled = false;
    this.portfolioItems = window.CRIMA_PORTFOLIO || [];
    
    // Exhibition State
    this.searchQuery = "";
    this.itemsPerPage = 24;
    this.displayedCount = 0;
    this.filteredItems = [];

    // Synthesized Audio Context
    this.audioCtx = null;

    this.init();
  }

  init() {
    this.setupTheme();
    this.setupLanguage();
    this.setupMagneticCursor();
    this.setupAmbientCanvas();
    this.setup3DCrucible();
    this.setupExhibition();
    this.setupModal();
    this.setupAudio();
  }

  // ===========================================================================
  // Theme Switching (Obsidian Noir / Gallery Alabaster)
  // ===========================================================================
  setupTheme() {
    document.documentElement.setAttribute("data-theme", this.currentTheme);
    this.updateThemeUI();

    const btn = document.getElementById("themeToggleBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", this.currentTheme);
        localStorage.setItem("crimadezignz_theme", this.currentTheme);
        this.updateThemeUI();
        this.playMicroTone(520, 0.04);
      });
    }
  }

  updateThemeUI() {
    const label = document.getElementById("themeLabel");
    if (label) {
      label.textContent = this.currentTheme === "dark" ? "Dark" : "Light";
    }
  }

  // ===========================================================================
  // Dual Language System (EN default / RO toggle)
  // ===========================================================================
  setupLanguage() {
    this.applyTranslations();

    const btn = document.getElementById("langToggleBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        this.currentLang = this.currentLang === "en" ? "ro" : "en";
        localStorage.setItem("crimadezignz_lang", this.currentLang);
        this.applyTranslations();
        this.renderExhibition(true);
        this.playMicroTone(640, 0.04);
      });
    }
  }

  applyTranslations() {
    const langData = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
    const indicator = document.getElementById("langIndicator");
    if (indicator) {
      indicator.textContent = this.currentLang === "en" ? "RO" : "EN";
    }

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const keyPath = el.getAttribute("data-i18n").split(".");
      let val = langData;
      for (const k of keyPath) {
        if (val && val[k] !== undefined) {
          val = val[k];
        } else {
          val = null;
          break;
        }
      }
      if (val !== null) {
        el.textContent = val;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const keyPath = el.getAttribute("data-i18n-placeholder").split(".");
      let val = langData;
      for (const k of keyPath) {
        if (val && val[k] !== undefined) {
          val = val[k];
        } else {
          val = null;
          break;
        }
      }
      if (val !== null) {
        el.setAttribute("placeholder", val);
      }
    });
  }

  // ===========================================================================
  // Custom Magnetic Cursor with Spring Physics
  // ===========================================================================
  setupMagneticCursor() {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const updateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(updateRing);
    };
    requestAnimationFrame(updateRing);

    const attachMagnetic = () => {
      document.querySelectorAll(".magnetic-target").forEach(target => {
        target.addEventListener("mouseenter", () => {
          ring.classList.add("cursor-hover");
        });
        target.addEventListener("mouseleave", () => {
          ring.classList.remove("cursor-hover");
        });
      });
    };
    attachMagnetic();
    this.refreshMagneticTargets = attachMagnetic;
  }

  // ===========================================================================
  // 3D Gyroscope Emblem Crucible (Hero Centerpiece)
  // ===========================================================================
  setup3DCrucible() {
    const wrap = document.getElementById("crucibleWrap");
    const card = document.getElementById("crucibleCard");
    const hudCoords = document.getElementById("hudCoords");
    if (!wrap || !card) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    wrap.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const normX = (e.clientX - cardCenterX) / (rect.width / 2);
      const normY = (e.clientY - cardCenterY) / (rect.height / 2);

      // Max tilt angles: ±22 deg
      targetX = -normY * 22;
      targetY = normX * 22;

      // Specular highlight coordinate percentage
      const lightX = ((e.clientX - rect.left) / rect.width) * 100;
      const lightY = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--light-x", `${lightX}%`);
      card.style.setProperty("--light-y", `${lightY}%`);
    });

    wrap.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
    });

    // Smooth inertia render loop
    const animateCrucible = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      card.style.transform = `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;

      if (hudCoords) {
        hudCoords.textContent = `X: ${currentX.toFixed(2)}° / Y: ${currentY.toFixed(2)}°`;
      }

      requestAnimationFrame(animateCrucible);
    };
    requestAnimationFrame(animateCrucible);
  }

  // ===========================================================================
  // Interactive Ambient Mesh Canvas
  // ===========================================================================
  setupAmbientCanvas() {
    const canvas = document.getElementById("ambientCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];
    const particleCount = 26;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.35 + 0.15;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const force = (160 - dist) / 160;
          this.x -= (dx / dist) * force * 1.8;
          this.y -= (dy / dist) * force * 1.8;
        }

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 192, 123, ${this.alpha * 0.6})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(197, 160, 89, ${0.12 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  // ===========================================================================
  // The Darkroom Exhibition (Pure Visual Focus, No Categories)
  // ===========================================================================
  setupExhibition() {
    this.filterExhibition();

    // Search input
    const searchInput = document.getElementById("archiveSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.filterExhibition();
      });
    }

    // Load More Button
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        this.renderNextBatch();
        this.playMicroTone(420, 0.03);
      });
    }
  }

  filterExhibition() {
    this.filteredItems = this.portfolioItems.filter(item => {
      if (!this.searchQuery) return true;
      const text = (item.title + " " + (item.description || "")).toLowerCase();
      return text.includes(this.searchQuery);
    });

    this.renderExhibition(true);
  }

  renderExhibition(reset = false) {
    const grid = document.getElementById("portfolioGrid");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (!grid) return;

    if (reset) {
      grid.innerHTML = "";
      this.displayedCount = 0;
    }

    if (this.filteredItems.length === 0) {
      const emptyMsg = (TRANSLATIONS[this.currentLang] || TRANSLATIONS.en).works.no_results;
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 80px 20px; color: var(--text-tertiary); font-family: var(--font-mono);">
          ${emptyMsg}
        </div>
      `;
      if (loadMoreBtn) loadMoreBtn.style.display = "none";
      return;
    }

    this.renderNextBatch();
  }

  renderNextBatch() {
    const grid = document.getElementById("portfolioGrid");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (!grid) return;

    const nextBatch = this.filteredItems.slice(
      this.displayedCount,
      this.displayedCount + this.itemsPerPage
    );

    nextBatch.forEach((item, index) => {
      const overallIndex = this.displayedCount + index;
      const isFeatured = overallIndex === 0 || overallIndex === 7 || overallIndex === 15;

      const card = document.createElement("article");
      card.className = `exhibition-item magnetic-target ${isFeatured ? "span-featured" : ""}`;
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Inspect Mark: ${item.title}`);

      card.innerHTML = `
        <div class="exhibition-thumb-wrap">
          <img src="${item.image}" alt="${item.title}" class="exhibition-thumb" loading="lazy">
          <div class="exhibition-floating-bar">
            <span class="exhibition-title">${item.title}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => this.openModal(item));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.openModal(item);
        }
      });

      grid.appendChild(card);
    });

    this.displayedCount += nextBatch.length;

    if (loadMoreBtn) {
      loadMoreBtn.style.display = this.displayedCount >= this.filteredItems.length ? "none" : "inline-block";
    }

    if (this.refreshMagneticTargets) {
      this.refreshMagneticTargets();
    }
  }

  // ===========================================================================
  // High-Fidelity Detail Modal Dialog
  // ===========================================================================
  setupModal() {
    const modal = document.getElementById("designModal");
    const closeBtn = document.getElementById("modalCloseBtn");

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => this.closeModal());
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeModal();
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) {
          this.closeModal();
        }
      });
    }
  }

  openModal(item) {
    const modal = document.getElementById("designModal");
    if (!modal) return;

    document.getElementById("modalImage").src = item.image;
    document.getElementById("modalImage").alt = item.title;
    document.getElementById("modalTitle").textContent = item.title;
    document.getElementById("modalCategory").textContent = (item.category || "TRADEMARK").toUpperCase() + " MARK";
    document.getElementById("modalId").textContent = `#${item.id}`;
    document.getElementById("modalDate").textContent = item.createdAt ? item.createdAt.slice(0, 10) : "Archive Entry";
    document.getElementById("modalSourceLink").href = item.url;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    this.playMicroTone(720, 0.05);
  }

  closeModal() {
    const modal = document.getElementById("designModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
    this.playMicroTone(360, 0.03);
  }

  // ===========================================================================
  // Optional Sonic Feedback Micro-Synthesizer
  // ===========================================================================
  setupAudio() {
    const btn = document.getElementById("audioToggleBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      this.isAudioEnabled = !this.isAudioEnabled;
      btn.style.opacity = this.isAudioEnabled ? "1" : "0.5";
      btn.style.color = this.isAudioEnabled ? "var(--accent-gold)" : "inherit";

      if (this.isAudioEnabled) {
        if (!this.audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          this.audioCtx = new AudioContext();
        }
        if (this.audioCtx.state === "suspended") {
          this.audioCtx.resume();
        }
        this.playMicroTone(880, 0.05);
      }
    });

    btn.style.opacity = "0.5";
  }

  playMicroTone(frequency, duration) {
    if (!this.isAudioEnabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback
    }
  }
}

// Initialize application on DOM ready
window.addEventListener("DOMContentLoaded", () => {
  window.atelierApp = new AvantGardeAtelierApp();
});
