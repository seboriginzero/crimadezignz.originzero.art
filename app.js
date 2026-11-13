/**
 * CrimaDezignz® | Haute-Couture Avant-Garde Trademark Atelier
 * Core 3D Gallery Engine:
 * - 10 Switchable 3D Visual Gallery Modes
 * - 3D Gyroscope Emblem Crucible (Hero Centerpiece)
 * - Custom Magnetic Cursor with Inertia Damping
 * - Monolithic Brutalist Architecture (Strict Zero Border Radius)
 * - Dual Language System (EN default / RO)
 * - Obsidian / Alabaster Dual Theme
 */

// =============================================================================
// 1. 3D Presentation Gallery Modes Definition
// =============================================================================
const GALLERY_3D_MODES = [
  { id: "tilt", name: "3D Spatial Tilt", sub: "Monolithic Parallax", badge: "3D SPATIAL TILT", num: "01" },
  { id: "carousel", name: "3D Cylinder Ring", sub: "Orbital Revolver", badge: "3D CYLINDER RING", num: "02" },
  { id: "coverflow", name: "3D Coverflow", sub: "Infinite Deep Stack", badge: "3D COVERFLOW", num: "03" },
  { id: "spiral", name: "3D Helix Spiral", sub: "Ascending Column", badge: "3D HELIX SPIRAL", num: "04" },
  { id: "stack", name: "3D Quantum Deck", sub: "Physics Stack Swipe", badge: "3D QUANTUM DECK", num: "05" },
  { id: "matrix", name: "3D Hypercube Matrix", sub: "Z-Plane Constellation", badge: "3D HYPERCUBE MATRIX", num: "06" },
  { id: "tunnel", name: "3D Void Tunnel", sub: "Endless Warp Corridor", badge: "3D VOID TUNNEL", num: "07" },
  { id: "spherical", name: "3D Sphere Galaxy", sub: "Geodesic Orbital Dome", badge: "3D SPHERE GALAXY", num: "08" },
  { id: "kinetic", name: "3D Kinetic Wall", sub: "Velocity Parallax Planes", badge: "3D KINETIC WALL", num: "09" },
  { id: "hologram", name: "3D Hologram Deck", sub: "Chromatic RGB Refraction", badge: "3D HOLOGRAM DECK", num: "10" }
];

// =============================================================================
// 2. Dual Language Dictionary (EN default, RO toggle)
// =============================================================================
const TRANSLATIONS = {
  en: {
    nav: {
      exhibition: "Exhibition",
      profile: "99designs Profile ↗"
    },
    works: {
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
      exhibition: "Expoziție",
      profile: "Profil 99designs ↗"
    },
    works: {
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
// 3. Application Core Class
// =============================================================================
class AvantGardeAtelierApp {
  constructor() {
    this.currentLang = localStorage.getItem("crimadezignz_lang") || "en";
    this.currentTheme = localStorage.getItem("crimadezignz_theme") || "dark";
    this.current3DMode = localStorage.getItem("crimadezignz_3d_mode") || "tilt";
    this.isAudioEnabled = false;
    this.portfolioItems = window.CRIMA_PORTFOLIO || [];
    
    // Exhibition State
    this.itemsPerPage = 24;
    this.displayedCount = 0;
    this.filteredItems = this.portfolioItems;

    // 3D Navigation Index for spatial presentation modes
    this.active3DIndex = 0;
    this.carouselAngle = 0;

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
    this.setup3DGalleryEngine();
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

      // Max tilt angles: ±20 deg
      targetX = -normY * 20;
      targetY = normX * 20;

      const lightX = ((e.clientX - rect.left) / rect.width) * 100;
      const lightY = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--light-x", `${lightX}%`);
      card.style.setProperty("--light-y", `${lightY}%`);
    });

    wrap.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
    });

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
    const particleCount = 24;
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
  // 10 3D Presentation Galleries Engine
  // ===========================================================================
  setup3DGalleryEngine() {
    const wrap = document.querySelector(".gallery-3d-dropdown-wrap");
    const dropdownBtn = document.getElementById("gallery3DDropdownBtn");
    const prevBtn = document.getElementById("galleryPrevBtn");
    const nextBtn = document.getElementById("galleryNextBtn");

    // Toggle 3D Mode Dropdown
    if (dropdownBtn && wrap) {
      dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        wrap.classList.toggle("open");
        this.playMicroTone(540, 0.03);
      });

      document.addEventListener("click", (e) => {
        if (!wrap.contains(e.target)) {
          wrap.classList.remove("open");
        }
      });
    }

    // Dropdown Items Click
    document.querySelectorAll(".gallery-3d-item").forEach(item => {
      item.addEventListener("click", () => {
        const mode = item.getAttribute("data-mode");
        this.switch3DMode(mode);
        wrap.classList.remove("open");
        this.playMicroTone(740, 0.04);
      });
    });

    // Toolbar Prev / Next Navigation
    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.navigate3D(-1));
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.navigate3D(1));
    }

    // Apply stored mode
    this.switch3DMode(this.current3DMode, false);
  }

  switch3DMode(modeId, animate = true) {
    const modeConfig = GALLERY_3D_MODES.find(m => m.id === modeId) || GALLERY_3D_MODES[0];
    this.current3DMode = modeConfig.id;
    localStorage.setItem("crimadezignz_3d_mode", this.current3DMode);

    // Update Header 3D Button Label
    const modeLabel = document.getElementById("current3DModeLabel");
    if (modeLabel) modeLabel.textContent = modeConfig.name;

    // Update Dropdown Active States
    document.querySelectorAll(".gallery-3d-item").forEach(el => {
      el.classList.toggle("active", el.getAttribute("data-mode") === this.current3DMode);
    });

    // Update Toolbar Badges
    const badge = document.getElementById("toolbarModeBadge");
    const counter = document.getElementById("toolbarCounter");
    if (badge) badge.textContent = modeConfig.badge;
    if (counter) counter.textContent = `MODE ${modeConfig.num} / 10`;

    // Update Exhibition Grid Classes
    const grid = document.getElementById("portfolioGrid");
    if (grid) {
      grid.className = `exhibition-grid mode-${this.current3DMode}`;
      this.active3DIndex = 0;
      this.carouselAngle = 0;
      this.apply3DModeTransforms();
    }
  }

  navigate3D(direction) {
    const cards = document.querySelectorAll(".exhibition-item");
    if (cards.length === 0) return;

    this.active3DIndex = (this.active3DIndex + direction + cards.length) % cards.length;
    this.carouselAngle += direction * (360 / Math.min(cards.length, 12));
    this.apply3DModeTransforms();
    this.playMicroTone(440 + this.active3DIndex * 15, 0.03);
  }

  apply3DModeTransforms() {
    const grid = document.getElementById("portfolioGrid");
    const cards = Array.from(document.querySelectorAll(".exhibition-item"));
    if (!grid || cards.length === 0) return;

    const total = cards.length;
    const mode = this.current3DMode;

    cards.forEach((card, i) => {
      // Reset generic styles
      card.style.transform = "";
      card.style.opacity = "";
      card.style.zIndex = "";

      if (mode === "carousel") {
        const ringCount = Math.min(total, 12);
        if (i < ringCount) {
          const angle = (i * (360 / ringCount)) - this.carouselAngle;
          const rad = (angle * Math.PI) / 180;
          const zDepth = 520;
          card.style.transform = `rotateY(${angle}deg) translateZ(${zDepth}px)`;
          card.style.opacity = Math.cos(rad) > -0.2 ? "1" : "0.2";
          card.style.zIndex = Math.round((Math.cos(rad) + 1) * 50);
        } else {
          card.style.display = "none";
        }
      } else if (mode === "coverflow") {
        const diff = i - this.active3DIndex;
        if (Math.abs(diff) > 4) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
        } else if (diff === 0) {
          card.style.transform = `scale(1.12) translateZ(80px)`;
          card.style.zIndex = "100";
          card.style.opacity = "1";
        } else if (diff < 0) {
          card.style.transform = `translateX(${diff * 180 - 60}px) rotateY(48deg) translateZ(-80px)`;
          card.style.zIndex = `${50 + diff}`;
          card.style.opacity = `${Math.max(0.3, 1 + diff * 0.2)}`;
        } else {
          card.style.transform = `translateX(${diff * 180 + 60}px) rotateY(-48deg) translateZ(-80px)`;
          card.style.zIndex = `${50 - diff}`;
          card.style.opacity = `${Math.max(0.3, 1 - diff * 0.2)}`;
        }
      } else if (mode === "spiral") {
        const rel = (i - this.active3DIndex);
        const angle = rel * 32;
        const yOffset = rel * 38;
        card.style.transform = `translateY(${yOffset}px) rotateY(${angle}deg) translateZ(360px)`;
        card.style.opacity = Math.abs(rel) <= 5 ? "1" : "0.15";
        card.style.zIndex = `${100 - Math.abs(rel)}`;
      } else if (mode === "stack") {
        const diff = (i - this.active3DIndex + total) % total;
        if (diff === 0) {
          card.style.transform = `translateZ(60px) rotate(0deg) scale(1)`;
          card.style.zIndex = "100";
          card.style.opacity = "1";
        } else if (diff <= 4) {
          const rot = diff % 2 === 0 ? diff * 3 : -diff * 3;
          card.style.transform = `translateY(${diff * 14}px) translateZ(${60 - diff * 20}px) rotate(${rot}deg) scale(${1 - diff * 0.04})`;
          card.style.zIndex = `${100 - diff}`;
          card.style.opacity = `${1 - diff * 0.15}`;
        } else {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
        }
      } else if (mode === "tunnel") {
        const diff = (i - this.active3DIndex + total) % total;
        if (diff < 8) {
          const zPos = -diff * 180;
          const xSide = diff % 2 === 0 ? -120 : 120;
          card.style.transform = `translateX(${xSide}px) translateZ(${zPos}px) rotateY(${xSide > 0 ? -25 : 25}deg)`;
          card.style.opacity = `${1 - diff * 0.12}`;
          card.style.zIndex = `${100 - diff}`;
        } else {
          card.style.opacity = "0";
        }
      } else if (mode === "spherical") {
        const phi = Math.acos(-1 + (2 * i) / Math.min(total, 16));
        const theta = Math.sqrt(Math.min(total, 16) * Math.PI) * phi + this.carouselAngle * 0.02;
        const xRot = (phi * 180) / Math.PI - 90;
        const yRot = (theta * 180) / Math.PI;
        if (i < 16) {
          card.style.transform = `rotateY(${yRot}deg) rotateX(${xRot}deg) translateZ(480px)`;
          card.style.opacity = "0.9";
        } else {
          card.style.display = "none";
        }
      }
    });
  }

  // ===========================================================================
  // The Darkroom Exhibition (Pure Visual Focus)
  // ===========================================================================
  setupExhibition() {
    this.renderExhibition(true);

    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        this.renderNextBatch();
        this.playMicroTone(420, 0.03);
      });
    }

    // Drag interaction for 3D modes
    const grid = document.getElementById("portfolioGrid");
    if (grid) {
      let isDown = false;
      let startX = 0;

      grid.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.clientX;
      });

      window.addEventListener("mouseup", () => {
        isDown = false;
      });

      grid.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        const delta = e.clientX - startX;
        if (Math.abs(delta) > 50) {
          this.navigate3D(delta > 0 ? -1 : 1);
          startX = e.clientX;
        }
      });
    }
  }

  renderExhibition(reset = false) {
    const grid = document.getElementById("portfolioGrid");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (!grid) return;

    if (reset) {
      grid.innerHTML = "";
      this.displayedCount = 0;
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
      card.setAttribute("data-index", overallIndex);

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

    this.apply3DModeTransforms();
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
  // Sonic Feedback Micro-Synthesizer
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
