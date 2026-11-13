/**
 * CrimaDezignz® | Modern Visual Identity Atelier
 * Clean Visual-First Showcase: Dual Language (EN/RO), Dual Theme, Interactive Canvas,
 * Geometry Studio, High-Density Visual Portfolio & Detail Modal.
 */

// =============================================================================
// 1. Dual Language Dictionary (EN default, RO toggle) - Pure Design Focus
// =============================================================================
const TRANSLATIONS = {
  en: {
    nav: {
      atelier: "BESPOKE ATELIER",
      works: "Portfolio Works",
      studio: "Logo Studio",
      profile: "99designs Profile ↗"
    },
    hero: {
      badge: "BRAND IDENTITY & LOGOMARK ATELIER",
      title_part1: "CrimaDezignz®",
      title_part2: "Distinctive Identity Architecture.",
      subtitle: "Bespoke trademark marks, timeless monograms, and optical geometry crafted for global clients.",
      cta_works: "View All Works",
      cta_studio: "Interactive Logo Studio",
      card1_tag: "OFFICIAL ATELIER MARK",
      card1_title: "CrimaDezignz® Identity",
      card1_desc: "A balanced emblem of optical tension, pure geometry, and visual resonance.",
      card2_tag: "PRECISION CRAFT",
      card2_title: "Mathematical Balance",
      card2_desc: "Every design crafted with exact clear-space ratios, optical kerning, and grid discipline.",
      card2_pill: "Golden Ratio Geometry",
      card3_tag: "INTERNATIONAL CLIENTS",
      card3_title: "Contest Winning Works",
      card3_desc: "Commissioned and appreciated by brands, teams, publishers, and startups worldwide.",
      card3_pill: "Award-Winning Standard"
    },
    works: {
      tag: "PORTFOLIO COLLECTION",
      title: "All Works Showcase",
      desc: "Explore the visual collection. Filter by style or search in real time. Click any work to inspect in high resolution.",
      btn_all: "All Works",
      btn_celebrated: "Most Appreciated",
      btn_monogram: "Monograms",
      btn_tactical: "Tactical & Shields",
      btn_wordmark: "Wordmarks",
      btn_dynamic: "Dynamic & Sport",
      search_placeholder: "Search works (e.g. warrior, racing, book)...",
      load_more: "Load More Works",
      no_results: "No designs match your criteria."
    },
    studio: {
      tag: "PRECISION VISUAL LABORATORY",
      title: "Interactive Logo Anatomy & Geometry",
      desc: "Inspect the optical mass distribution, golden ratio proportions, clear-space boundaries, and contrast resilience of the CrimaDezignz® mark across various substrates.",
      controls_overlays: "Geometric Overlays",
      opt_axis: "Cartesian Axis",
      opt_golden: "Golden Ratio Circles",
      opt_safezone: "Safe Clearance Zone",
      controls_surface: "Substrate / Background Surface",
      controls_scale: "Optical Scale Test",
      color_dna: "Color Palette"
    },
    footer: {
      about: "Curated identity marks created for international clients and competitions on 99designs.",
      col_nav: "Navigation",
      col_specs: "Platform"
    }
  },
  ro: {
    nav: {
      atelier: "ATELIER DE CREAȚIE",
      works: "Lucrări Portofoliu",
      studio: "Studio Siglă",
      profile: "Profil 99designs ↗"
    },
    hero: {
      badge: "ATELIER DE IDENTITATE VIZUALĂ & MĂRCI",
      title_part1: "CrimaDezignz®",
      title_part2: "Arhitectură de Identitate Distinctivă.",
      subtitle: "Sigle de autor, monograme atemporale și geometrie optică forjate pentru companii din întreaga lume.",
      cta_works: "Vezi Toate Lucrările",
      cta_studio: "Studio Interactiv Siglă",
      card1_tag: "SIGILIU OFICIAL ATELIER",
      card1_title: "Identitatea CrimaDezignz®",
      card1_desc: "Un glif de o rară armonie vizuală, forță optică și rezonanță geometrică durabilă.",
      card2_tag: "PRECIZIE ARTIZANALĂ",
      card2_title: "Echilibru Matematic",
      card2_desc: "Fiecare concept este construit respectând proporțiile de aur, spațiul de siguranță și kerning-ul optic.",
      card2_pill: "Geometria Proporției de Aur",
      card3_tag: "CLIENȚI INTERNAȚIONALI",
      card3_title: "Concursuri Câștigate",
      card3_desc: "Proiecte premiate și apreciate de branduri, echipe sportive, edituri și startup-uri globale.",
      card3_pill: "Standard Premiat"
    },
    works: {
      tag: "COLECȚIA DE PORTOFOLIU",
      title: "Galeria Tuturor Lucrărilor",
      desc: "Explorează portofoliul vizual. Filtrează după stil sau caută instantaneu. Fă click pe orice lucrare pentru detalii la rezoluție maximă.",
      btn_all: "Toate Lucrările",
      btn_celebrated: "Cele Mai Apreciate",
      btn_monogram: "Monograme",
      btn_tactical: "Tactic & Embleme",
      btn_wordmark: "Wordmarks",
      btn_dynamic: "Dinamice & Sport",
      search_placeholder: "Caută în lucrări (ex: warrior, racing, book)...",
      load_more: "Încarcă Mai Multe Lucrări",
      no_results: "Nicio lucrare nu corespunde căutării."
    },
    studio: {
      tag: "LABORATOR VIZUAL DE PRECIZIE",
      title: "Anatomia și Geometria Interactivă a Siglei",
      desc: "Analizează distribuția maselor optice, cercurile proporției de aur, perimetrele de siguranță și contrastul mărcii CrimaDezignz® pe diverse suprafețe de fond.",
      controls_overlays: "Straturi Geometrice",
      opt_axis: "Axe Carteziene",
      opt_golden: "Cercuri Proporția de Aur",
      opt_safezone: "Zonă de Siguranță",
      controls_surface: "Substrat / Suprafață de Fundal",
      controls_scale: "Test Scara Optică",
      color_dna: "Paletă Cromatică"
    },
    footer: {
      about: "Identități vizuale de autor create pentru clienți și competiții internaționale pe 99designs.",
      col_nav: "Navigație",
      col_specs: "Platformă"
    }
  }
};

// =============================================================================
// 2. Application State Management
// =============================================================================
class ModernUXApp {
  constructor() {
    this.currentLang = localStorage.getItem("crimadezignz_lang") || "en";
    this.currentTheme = localStorage.getItem("crimadezignz_theme") || "dark";
    this.isAudioEnabled = false;
    this.portfolioItems = window.CRIMA_PORTFOLIO || [];
    
    // Gallery State
    this.activeCategory = "all";
    this.searchQuery = "";
    this.itemsPerPage = 24; // Show more visual items per batch
    this.displayedCount = 0;
    this.filteredItems = [];

    // Audio Context (Synthesized micro-haptics)
    this.audioCtx = null;

    this.init();
  }

  init() {
    this.setupTheme();
    this.setupLanguage();
    this.setupAmbientCanvas();
    this.setupSpecularLighting();
    this.setupStudioControls();
    this.setupPortfolio();
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
        this.playMicroSound(440, 0.05);
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
  // Bilingual System (EN default / RO switch)
  // ===========================================================================
  setupLanguage() {
    this.applyTranslations();

    const btn = document.getElementById("langToggleBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        this.currentLang = this.currentLang === "en" ? "ro" : "en";
        localStorage.setItem("crimadezignz_lang", this.currentLang);
        this.applyTranslations();
        this.renderPortfolio(true);
        this.playMicroSound(580, 0.04);
      });
    }
  }

  applyTranslations() {
    const langData = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
    const indicator = document.getElementById("langIndicator");
    if (indicator) {
      indicator.textContent = this.currentLang === "en" ? "RO" : "EN";
    }

    // Update text elements with data-i18n
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

    // Update placeholders
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
  // Interactive Ambient Mesh Canvas (Latest Modern Visual Effect)
  // ===========================================================================
  setupAmbientCanvas() {
    const canvas = document.getElementById("ambientCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];
    const particleCount = 28;
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
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.4 + 0.15;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 192, 123, ${this.alpha * 0.5})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles
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
  // Specular Border Mouse Tracking (Figma / Linear / Vercel effect)
  // ===========================================================================
  setupSpecularLighting() {
    document.addEventListener("mousemove", (e) => {
      document.querySelectorAll(".specular-card").forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  }

  // ===========================================================================
  // Interactive Logo Geometry Studio
  // ===========================================================================
  setupStudioControls() {
    // Overlay layer toggles
    document.querySelectorAll(".tool-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        chip.classList.toggle("active");
        const layerId = chip.getAttribute("data-layer");
        const layer = document.getElementById(layerId);
        if (layer) {
          layer.style.display = chip.classList.contains("active") ? "block" : "none";
        }
        this.playMicroSound(620, 0.03);
      });
    });

    // Substrate / background swatches
    const viewport = document.getElementById("studioViewport");
    document.querySelectorAll(".swatch-btn").forEach(swatch => {
      swatch.addEventListener("click", () => {
        document.querySelectorAll(".swatch-btn").forEach(s => s.classList.remove("active"));
        swatch.classList.add("active");
        const bg = swatch.getAttribute("data-bg");
        if (viewport) {
          viewport.style.backgroundColor = bg;
        }
        this.playMicroSound(520, 0.03);
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
  // Visual-First Portfolio Works Grid (No Descriptions in Grid)
  // ===========================================================================
  setupPortfolio() {
    this.filterPortfolio();

    // Category button filters
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeCategory = btn.getAttribute("data-category") || "all";
        this.filterPortfolio();
        this.playMicroSound(480, 0.03);
      });
    });

    // Search bar filter
    const searchInput = document.getElementById("archiveSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.filterPortfolio();
      });
    }

    // Load More Button
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        this.renderNextBatch();
        this.playMicroSound(420, 0.03);
      });
    }
  }

  filterPortfolio() {
    this.filteredItems = this.portfolioItems.filter(item => {
      // Category Match
      let catMatch = true;
      if (this.activeCategory === "celebrated") {
        catMatch = item.likes >= 50;
      } else if (this.activeCategory !== "all") {
        catMatch = item.category === this.activeCategory;
      }

      // Search Match
      let searchMatch = true;
      if (this.searchQuery) {
        const text = (item.title + " " + item.description).toLowerCase();
        searchMatch = text.includes(this.searchQuery);
      }

      return catMatch && searchMatch;
    });

    this.renderPortfolio(true);
  }

  renderPortfolio(reset = false) {
    const grid = document.getElementById("portfolioGrid");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (!grid) return;

    if (reset) {
      grid.innerHTML = "";
      this.displayedCount = 0;
    }

    if (this.filteredItems.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-tertiary);">
        ${TRANSLATIONS[this.currentLang].works.no_results}
      </div>`;
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

    nextBatch.forEach(item => {
      const card = document.createElement("article");
      card.className = "portfolio-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `View design: ${item.title}`);

      // Visual-first: Only image + sleek bottom glass title/likes pill. No long descriptions!
      card.innerHTML = `
        <div class="portfolio-thumb-wrap">
          <img src="${item.image}" alt="${item.title}" class="portfolio-thumb" loading="lazy">
          <div class="portfolio-overlay">
            <span class="portfolio-title-text">${item.title}</span>
            <span class="portfolio-likes-pill">★ ${item.likes}</span>
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
  }

  // ===========================================================================
  // High-Resolution Detail Modal
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
    this.playMicroSound(700, 0.05);
  }

  closeModal() {
    const modal = document.getElementById("designModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
    this.playMicroSound(380, 0.03);
  }

  // ===========================================================================
  // Optional Audio Feedback
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
        this.playMicroSound(880, 0.05);
      }
    });

    btn.style.opacity = "0.5";
  }

  playMicroSound(frequency, duration) {
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
      // Audio fallback gracefully handled
    }
  }
}

// Instantiate application when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  window.modernApp = new ModernUXApp();
});
