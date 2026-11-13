/**
 * CrimaDezignz® | Haute-Couture Avant-Garde Trademark Atelier
 * Core Application Engine:
 * - 3D Gyroscope Physics & Specular Matrix
 * - Custom Magnetic Cursor with Inertia Damping
 * - Dynamic Darkroom Spotlight Exhibition
 * - Interactive Optical Geometry Lab
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
      exhibition: "Exhibition",
      crucible: "3D Crucible",
      studio: "Geometry Lab",
      profile: "99designs Profile ↗"
    },
    hero: {
      kicker: "AVANT-GARDE IDENTITY ATELIER",
      badge_pro: "99DESIGNS TOP TIER CREATOR",
      title_p1: "CRIMA",
      title_p2: "DEZIGNZ",
      sub_accent: "RADICAL FORM. UNCOMPROMISING PRECISION.",
      subtitle: "Surgically crafted brand marks, menacing monograms, and architectural emblems designed to dominate the visual landscape.",
      explore: "EXPLORE EXHIBITION",
      launch_3d: "3D CRUCIBLE"
    },
    crucible: {
      tag: "SPATIAL EMBLEM CRUCIBLE",
      title: "Interactive 3D Identity Matrix",
      desc: "Manipulate the primary CrimaDezignz® crest in real-time 3D space. Move your cursor to trigger parallax depth, specular highlights, and chromatic aura fields."
    },
    works: {
      tag: "CURATED EXHIBITION",
      title: "Visual Works Exhibition",
      desc: "Hover any work to trigger darkroom spotlight focus and optical coordinate analysis.",
      btn_all: "All Works",
      btn_celebrated: "Most Celebrated",
      btn_monogram: "Monograms",
      btn_tactical: "Tactical & Crests",
      btn_wordmark: "Wordmarks",
      btn_dynamic: "Dynamic & Sport",
      search_placeholder: "Search exhibition (e.g. warrior, lion, hawk, racing)...",
      load_more: "LOAD MORE WORKS",
      no_results: "No marks match your search criteria."
    },
    studio: {
      tag: "OPTICAL GEOMETRY LAB",
      title: "Mathematical Construction",
      desc: "Examine the underlying Fibonacci radii, safe clear-zones, and chromatic adaptability of the mark.",
      controls_overlays: "Geometric Overlays",
      opt_axis: "Cartesian Axis",
      opt_golden: "Golden Ratio Circles",
      opt_safezone: "Safe Clearance Zone",
      controls_surface: "Substrate Surface",
      controls_scale: "Optical Scale Test",
      color_dna: "Color Spectrum"
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
      exhibition: "Expoziție",
      crucible: "Creuzet 3D",
      studio: "Laborator Geometrie",
      profile: "Profil 99designs ↗"
    },
    hero: {
      kicker: "ATELIER AVANT-GARDE DE IDENTITATE",
      badge_pro: "CREATOR DE TOP 99DESIGNS",
      title_p1: "CRIMA",
      title_p2: "DEZIGNZ",
      sub_accent: "FORMĂ RADICALĂ. PRECIZIE FĂRĂ COMPROMIS.",
      subtitle: "Mărci tăiate chirurgical, monograme impunătoare și embleme arhitecturale forjate pentru a domina spațiul vizual.",
      explore: "EXPLOREAZĂ EXPOZIȚIA",
      launch_3d: "CREUZET 3D"
    },
    crucible: {
      tag: "CREUZET SPAȚIAL AL EMBLEMEI",
      title: "Matrice 3D Interactivă a Identității",
      desc: "Manipulează blazonul principal CrimaDezignz® în spațiu 3D în timp real. Mișcă cursorul pentru adâncime de paralaxă, reflexii speculare și câmpuri de aură cromatică."
    },
    works: {
      tag: "EXPOZIȚIE CURATĂ",
      title: "Expoziția Lucrărilor Vizuale",
      desc: "Treci cursorul peste orice lucrare pentru a activa focalizarea darkroom și analiza coordonatelor optice.",
      btn_all: "Toate Lucrările",
      btn_celebrated: "Cele Mai Apreciate",
      btn_monogram: "Monograme",
      btn_tactical: "Tactic & Blazoane",
      btn_wordmark: "Wordmarks",
      btn_dynamic: "Dinamice & Sport",
      search_placeholder: "Caută în expoziție (ex: warrior, lion, hawk, racing)...",
      load_more: "ÎNCARCĂ MAI MULTE LUCRĂRI",
      no_results: "Nicio lucrare nu corespunde căutării."
    },
    studio: {
      tag: "LABORATOR GEOMETRIE OPTICĂ",
      title: "Construcție Matematică",
      desc: "Examinează razele Fibonacci, zonele de siguranță și adaptabilitatea cromatică a siglei pe diverse fundaluri.",
      controls_overlays: "Straturi Geometrice",
      opt_axis: "Axe Carteziene",
      opt_golden: "Cercuri Proporția de Aur",
      opt_safezone: "Zonă de Siguranță",
      controls_surface: "Suprafață Substrat",
      controls_scale: "Test Scara Optică",
      color_dna: "Spectru Cromatic"
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
    this.activeCategory = "all";
    this.searchQuery = "";
    this.itemsPerPage = 20;
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
    this.setupStudioControls();
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

    // Magnetic attachment & cursor enlargement
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
  // 3D Gyroscope Emblem Crucible
  // ===========================================================================
  setup3DCrucible() {
    const wrap = document.getElementById("crucibleWrap");
    const card = document.getElementById("crucibleCard");
    const cardLight = document.getElementById("cardLight");
    const hudCoords = document.getElementById("hudCoords");
    if (!wrap || !card) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovered = false;

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

      isHovered = true;
    });

    wrap.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
      isHovered = false;
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
  // The Darkroom Exhibition (Visual Works Grid & Darkroom Spotlight)
  // ===========================================================================
  setupExhibition() {
    this.filterExhibition();

    // Category button filters
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeCategory = btn.getAttribute("data-category") || "all";
        this.filterExhibition();
        this.playMicroTone(480, 0.03);
      });
    });

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
      let catMatch = true;
      if (this.activeCategory === "celebrated") {
        catMatch = item.likes >= 50;
      } else if (this.activeCategory !== "all") {
        catMatch = item.category === this.activeCategory;
      }

      let searchMatch = true;
      if (this.searchQuery) {
        const text = (item.title + " " + item.description).toLowerCase();
        searchMatch = text.includes(this.searchQuery);
      }

      return catMatch && searchMatch;
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
            <span class="spec-pill">★ ${item.likes}</span>
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
  // Interactive Optical Geometry Lab
  // ===========================================================================
  setupStudioControls() {
    // Layer toggles
    document.querySelectorAll(".tool-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        chip.classList.toggle("active");
        const layerId = chip.getAttribute("data-layer");
        const layer = document.getElementById(layerId);
        if (layer) {
          layer.style.display = chip.classList.contains("active") ? "block" : "none";
        }
        this.playMicroTone(620, 0.03);
      });
    });

    // Substrate background swatches
    const viewport = document.getElementById("studioViewport");
    document.querySelectorAll(".swatch-btn").forEach(swatch => {
      swatch.addEventListener("click", () => {
        document.querySelectorAll(".swatch-btn").forEach(s => s.classList.remove("active"));
        swatch.classList.add("active");
        const bg = swatch.getAttribute("data-bg");
        if (viewport) {
          viewport.style.backgroundColor = bg;
        }
        this.playMicroTone(540, 0.03);
      });
    });

    // Optical Scale slider
    const slider = document.getElementById("studioScaleSlider");
    const logo = document.getElementById("studioLogo");
    const sliderVal = document.getElementById("sliderValue");
    if (slider && logo) {
      slider.addEventListener("input", (e) => {
        const val = e.target.value;
        logo.style.width = `${val}px`;
        logo.style.height = `${val}px`;
        if (sliderVal) sliderVal.textContent = `${val}px`;
      });
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
    document.getElementById("modalCategory").textContent = item.category.toUpperCase() + " MARK";
    document.getElementById("modalLikes").textContent = `★ ${item.likes} Likes`;
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
