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
  // 3D Spatial Architecture (Top 3)
  { id: "tilt", name: "3D Spatial Tilt", sub: "Monolithic Parallax", badge: "3D SPATIAL TILT", num: "01" },
  { id: "coverflow", name: "3D Coverflow", sub: "Infinite Deep Stack", badge: "3D COVERFLOW", num: "02" },
  { id: "tunnel", name: "3D Void Tunnel", sub: "Deep Corridor Warp", badge: "3D VOID TUNNEL", num: "03" },

  // Haute-Couture 2D Royal Galleries (Top 3)
  { id: "salon-royal", name: "Salon Royal", sub: "Monolithic Editorial Plinths", badge: "2D SALON ROYAL", num: "04" },
  { id: "imperial-runway", name: "Imperial Runway", sub: "Horizontal Luxury Ribbon", badge: "2D IMPERIAL RUNWAY", num: "05" },
  { id: "sovereign-spotlight", name: "Sovereign Spotlight", sub: "Curatorial Pedestal Focus", badge: "2D SOVEREIGN SPOTLIGHT", num: "06" }
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
    pledge: {
      tag: "ATELIER PHILANTHROPY & SOCIAL IMPACT",
      text_start: "A portion of these proceeds ",
      text_end: " can also support causes or people in need of help.",
      sub_info: "Grammatical nuance: strict formal agreement in Romanian (nucleul subiectului 'o parte' ⟶ 'poate').",
      btn_explain: "LINGUISTIC EXPLANATION [POATE / POT] ℹ"
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
    pledge: {
      tag: "ANGAJAMENT COMUNITAR & IMPACT SOCIAL",
      text_start: "O parte din acești bani ",
      text_end: " sprijini și cauze sau oameni care au nevoie de ajutor.",
      sub_info: "Acord formal canonic cu nucleul subiectului „o parte” (singular) ⟶ „poate”.",
      btn_explain: "EXPLICAȚIE LINGVISTICĂ [POATE / POT] ℹ"
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
    this.activeCategory = "all";
    this.searchQuery = "";
    this.modalCurrentIndex = 0;

    // 3D Navigation Index for spatial presentation modes
    this.active3DIndex = 0;
    this.carouselAngle = 0;

    // 3D Void Tunnel Endless Walkway Physics
    this.tunnelDepth = 0;
    this.targetTunnelDepth = 0;
    this.isAutoWalking = false;
    this.tunnelRafId = null;

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
    this.setupGrammarModal();
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

    // Tunnel Auto-Walk Cruise Button
    const autoWalkBtn = document.getElementById("tunnelAutoWalkBtn");
    if (autoWalkBtn) {
      autoWalkBtn.addEventListener("click", () => this.toggleAutoWalk());
    }

    // Apply stored mode
    this.switch3DMode(this.current3DMode, false);
  }

  toggleAutoWalk() {
    this.isAutoWalking = !this.isAutoWalking;
    const btn = document.getElementById("tunnelAutoWalkBtn");
    if (btn) {
      btn.classList.toggle("active", this.isAutoWalking);
      btn.textContent = this.isAutoWalking ? "⏸ PAUSE CRUISE" : "▶ AUTO-CRUISE";
    }
    this.playMicroTone(this.isAutoWalking ? 620 : 380, 0.04);
  }

  startTunnelLoop() {
    if (this.tunnelRafId) return;
    const loop = () => {
      if (this.current3DMode === "tunnel") {
        this.renderTunnelFrame();
        this.tunnelRafId = requestAnimationFrame(loop);
      } else {
        this.tunnelRafId = null;
      }
    };
    this.tunnelRafId = requestAnimationFrame(loop);
  }

  stopTunnelLoop() {
    if (this.tunnelRafId) {
      cancelAnimationFrame(this.tunnelRafId);
      this.tunnelRafId = null;
    }
  }

  switch3DMode(modeId, animate = true) {
    const modeConfig = GALLERY_3D_MODES.find(m => m.id === modeId) || GALLERY_3D_MODES[0];
    this.current3DMode = modeConfig.id;
    localStorage.setItem("crimadezignz_3d_mode", this.current3DMode);

    // When entering tunnel mode, load ALL 170 master works into the corridor
    if (this.current3DMode === "tunnel" && this.displayedCount < this.filteredItems.length) {
      this.itemsPerPage = this.filteredItems.length;
      this.renderNextBatch();
    }

    // Toggle Auto-Cruise button visibility
    const autoWalkBtn = document.getElementById("tunnelAutoWalkBtn");
    if (autoWalkBtn) {
      autoWalkBtn.style.display = (this.current3DMode === "tunnel") ? "inline-flex" : "none";
    }

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
    if (counter) counter.textContent = `MODE ${modeConfig.num} / 06`;

    // Start or stop tunnel 60fps loop
    if (this.current3DMode === "tunnel") {
      this.startTunnelLoop();
    } else {
      this.stopTunnelLoop();
      this.isAutoWalking = false;
      if (autoWalkBtn) {
        autoWalkBtn.classList.remove("active");
        autoWalkBtn.textContent = "▶ AUTO-CRUISE";
      }
    }

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
    if (this.current3DMode === "tunnel") {
      const spacing = 380;
      this.targetTunnelDepth += direction * spacing;
      this.playMicroTone(440 + ((Math.floor(this.tunnelDepth / spacing) % 12) + 12) % 12 * 15, 0.03);
      return;
    }

    const cards = document.querySelectorAll(".exhibition-item");
    if (cards.length === 0) return;

    this.active3DIndex = (this.active3DIndex + direction + cards.length) % cards.length;
    this.carouselAngle += direction * 30;
    this.apply3DModeTransforms();
    this.playMicroTone(440 + (this.active3DIndex % 12) * 15, 0.03);
  }

  ensureTunnelElements() {
    const grid = document.getElementById("portfolioGrid");
    if (!grid) return;
    let world = document.getElementById("tunnelWorld");
    if (!world) {
      world = document.createElement("div");
      world.className = "tunnel-world";
      world.id = "tunnelWorld";
      world.setAttribute("aria-hidden", "true");
      world.innerHTML = `
        <div class="tunnel-portal">
          <div class="tunnel-portal-ring"></div>
          <div class="tunnel-portal-core"></div>
          <div class="tunnel-portal-hud">HORIZON // 008</div>
        </div>
        <div class="tunnel-floor"></div>
        <div class="tunnel-ceiling"></div>
        <div class="tunnel-rail rail-top-left"></div>
        <div class="tunnel-rail rail-top-right"></div>
        <div class="tunnel-rail rail-bottom-left"></div>
        <div class="tunnel-rail rail-bottom-right"></div>
        <div class="tunnel-ring" style="--ring-z: 120px;"></div>
        <div class="tunnel-ring" style="--ring-z: -260px;"></div>
        <div class="tunnel-ring" style="--ring-z: -640px;"></div>
        <div class="tunnel-ring" style="--ring-z: -1020px;"></div>
        <div class="tunnel-ring" style="--ring-z: -1400px;"></div>
        <div class="tunnel-ring" style="--ring-z: -1780px;"></div>
        <div class="tunnel-ring" style="--ring-z: -2160px;"></div>
        <div class="tunnel-ring" style="--ring-z: -2540px;"></div>
      `;
      grid.prepend(world);
    }
    world.style.display = "block";
  }

  renderTunnelFrame() {
    const grid = document.getElementById("portfolioGrid");
    const cards = document.querySelectorAll(".exhibition-item");
    if (!grid || cards.length === 0) return;

    this.ensureTunnelElements();

    const total = cards.length;
    const totalPairs = Math.ceil(total / 2);
    const spacing = 380;
    const maxDepth = totalPairs * spacing;

    // Auto-walk cruise forward
    if (this.isAutoWalking) {
      this.targetTunnelDepth += 2.8; // smooth cinematic cruising speed
    }

    // Smooth lerp physics
    const diff = this.targetTunnelDepth - this.tunnelDepth;
    this.tunnelDepth += diff * 0.12;

    // Wrap tunnelDepth seamlessly
    if (this.tunnelDepth > maxDepth) {
      this.tunnelDepth -= maxDepth;
      this.targetTunnelDepth -= maxDepth;
    } else if (this.tunnelDepth < 0) {
      this.tunnelDepth += maxDepth;
      this.targetTunnelDepth += maxDepth;
    }

    // 1. Animate Floor Runway & Ceiling Tracks with continuous glide
    const floor = document.querySelector(".tunnel-floor");
    if (floor) {
      const offset = (this.tunnelDepth % 100);
      floor.style.backgroundPositionY = `${offset.toFixed(1)}px`;
    }
    const ceiling = document.querySelector(".tunnel-ceiling");
    if (ceiling) {
      const offset = (this.tunnelDepth % 200);
      ceiling.style.backgroundPositionY = `${offset.toFixed(1)}px`;
    }

    // 2. Animate the 8 Portal Rings
    const rings = document.querySelectorAll(".tunnel-ring");
    rings.forEach((ring, r) => {
      const ringSpacing = 380;
      let rz = 120 - ((r * ringSpacing + (this.tunnelDepth % ringSpacing)) % (rings.length * ringSpacing));
      ring.style.transform = `translateZ(${rz.toFixed(1)}px)`;
    });

    // 3. Virtualized 3D Card Positioning along Corridor Walls
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const xDist = isMobile ? Math.min(130, window.innerWidth * 0.32) : isTablet ? 250 : 380;

    let closestIndex = 0;
    let minAbsZ = Infinity;

    cards.forEach((card, i) => {
      const pair = Math.floor(i / 2);
      const baseZ = -pair * spacing;
      let z = (baseZ + this.tunnelDepth) % maxDepth;
      if (z > 200) z -= maxDepth;
      if (z < -maxDepth + 200) z += maxDepth;

      const absZ = Math.abs(z);
      if (absZ < minAbsZ) {
        minAbsZ = absZ;
        closestIndex = i;
      }

      // Virtualization frustum: -3400px to +180px
      if (z > 180 || z < -3400) {
        card.style.display = "none";
      } else {
        card.style.display = "block";
        const isLeft = (i % 2 === 0);
        const x = isLeft ? -xDist : xDist;
        const rotY = isLeft ? (isMobile ? 18 : 30) : (isMobile ? -18 : -30);

        const horizonFade = Math.max(0, Math.min(1, (z + 3400) / 1000));
        const nearFade = z > 40 ? Math.max(0, 1 - (z - 40) / 140) : 1;
        const opacity = (horizonFade * nearFade).toFixed(2);
        const brightness = Math.max(0.25, Math.min(1.15, 1 - Math.abs(z) / 3200)).toFixed(2);

        const isClosest = absZ < 190;
        if (isClosest) {
          card.style.transform = `translateX(${x}px) translateZ(${z.toFixed(1)}px) rotateY(${rotY}deg) scale(1.05)`;
          card.style.zIndex = "120";
          card.style.opacity = opacity;
          card.style.filter = "brightness(1.18) drop-shadow(0 0 35px rgba(197, 160, 89, 0.75))";
          card.style.borderColor = "var(--accent-gold)";
          card.style.pointerEvents = "auto";
        } else {
          card.style.transform = `translateX(${x}px) translateZ(${z.toFixed(1)}px) rotateY(${rotY}deg)`;
          card.style.zIndex = `${Math.round(100 + z / 40)}`;
          card.style.opacity = opacity;
          card.style.filter = `brightness(${brightness})`;
          card.style.borderColor = "";
          card.style.pointerEvents = (z > -800 && z < 100) ? "auto" : "none";
        }
      }
    });

    // 4. Update Telemetry HUD
    this.active3DIndex = closestIndex;
    const counter = document.getElementById("toolbarCounter");
    if (counter) {
      counter.textContent = `MODE 03/06 • CORRIDOR MARK ${closestIndex + 1}/${total} • DEPTH ${Math.round(this.tunnelDepth)}m`;
    }
  }

  apply3DModeTransforms() {
    const grid = document.getElementById("portfolioGrid");
    const cards = Array.from(document.querySelectorAll(".exhibition-item"));
    if (!grid || cards.length === 0) return;

    const total = cards.length;
    const mode = this.current3DMode;

    // Toggle tunnel world background geometry
    const tunnelWorld = document.getElementById("tunnelWorld");
    if (mode === "tunnel") {
      this.ensureTunnelElements();
      this.renderTunnelFrame();
      return;
    } else if (tunnelWorld) {
      tunnelWorld.style.display = "none";
      tunnelWorld.style.transform = "";
    }

    // Full reset of transforms, opacities, and display visibility
    cards.forEach((card) => {
      card.style.transform = "";
      card.style.opacity = "";
      card.style.zIndex = "";
      card.style.display = "";
      card.style.visibility = "";
      card.style.pointerEvents = "";
      card.style.filter = "";
      card.style.borderColor = "";
    });

    // Update Mode Status in Toolbar
    const counter = document.getElementById("toolbarCounter");
    const modeConfig = GALLERY_3D_MODES.find(m => m.id === mode) || GALLERY_3D_MODES[0];
    if (counter) {
      const isSpatial = ["coverflow", "sovereign-spotlight"].includes(mode);
      if (isSpatial) {
        counter.textContent = `MODE ${modeConfig.num}/06 • MARK ${this.active3DIndex + 1}/${total}`;
      } else {
        counter.textContent = `MODE ${modeConfig.num}/06`;
      }
    }

    // Modes 1 & 4 (3D Spatial Tilt, Salon Royal) rely purely on responsive CSS Grid layouts
    if (mode === "tilt" || mode === "salon-royal") {
      return;
    }

    // Mode 5: Imperial Runway (Horizontal Luxury Ribbon)
    if (mode === "imperial-runway") {
      const targetCard = cards[this.active3DIndex];
      if (targetCard) {
        const offsetLeft = targetCard.offsetLeft - (grid.clientWidth / 2) + (targetCard.clientWidth / 2);
        grid.scrollTo({ left: Math.max(0, offsetLeft), behavior: "smooth" });
      }
      return;
    }

    // Mode 6: Sovereign Spotlight (Curatorial Solitary Pedestal)
    if (mode === "sovereign-spotlight") {
      cards.forEach((card, i) => {
        if (i === this.active3DIndex) {
          card.style.display = "block";
          card.style.transform = "scale(1)";
          card.style.opacity = "1";
          card.style.zIndex = "100";
          card.style.pointerEvents = "auto";
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });
      return;
    }

    // Mode 2: 3D Coverflow (Infinite Deep Stack)
    if (mode === "coverflow") {
      cards.forEach((card, i) => {
        const diff = i - this.active3DIndex;
        if (Math.abs(diff) > 5) {
          card.style.display = "none";
        } else {
          card.style.display = "";
          if (diff === 0) {
            card.style.transform = `scale(1.14) translateZ(90px)`;
            card.style.zIndex = "100";
            card.style.opacity = "1";
            card.style.pointerEvents = "auto";
          } else if (diff < 0) {
            card.style.transform = `translateX(${diff * 180 - 70}px) rotateY(48deg) translateZ(-90px)`;
            card.style.zIndex = `${50 + diff}`;
            card.style.opacity = `${Math.max(0.3, 1 + diff * 0.18)}`;
            card.style.pointerEvents = "auto";
          } else {
            card.style.transform = `translateX(${diff * 180 + 70}px) rotateY(-48deg) translateZ(-90px)`;
            card.style.zIndex = `${50 - diff}`;
            card.style.opacity = `${Math.max(0.3, 1 - diff * 0.18)}`;
            card.style.pointerEvents = "auto";
          }
        }
      });
      return;
    }
  }

  // ===========================================================================
  // The Darkroom Exhibition (Pure Visual Focus)
  // ===========================================================================
  setupExhibition() {
    this.renderExhibition(true);

    // Load More & Load All Buttons
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const loadAllBtn = document.getElementById("loadAllBtn");

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        this.renderNextBatch();
        this.playMicroTone(420, 0.03);
      });
    }

    if (loadAllBtn) {
      loadAllBtn.addEventListener("click", () => {
        this.itemsPerPage = this.filteredItems.length;
        this.renderNextBatch();
        this.playMicroTone(680, 0.05);
      });
    }

    // Lateral Mouse Wheel, Trackpad Horizontal Swipe & Drag
    const grid = document.getElementById("portfolioGrid");
    if (grid) {
      let wheelAccumulator = 0;
      let wheelTimer = null;

      grid.addEventListener("wheel", (e) => {
        if (this.current3DMode === "tunnel") {
          e.preventDefault();
          const rawDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
          this.targetTunnelDepth += rawDelta * 2.2;
          this.isAutoWalking = false;
          const autoWalkBtn = document.getElementById("tunnelAutoWalkBtn");
          if (autoWalkBtn) {
            autoWalkBtn.classList.remove("active");
            autoWalkBtn.textContent = "▶ AUTO-CRUISE";
          }
          return;
        }

        const isSpatialMode = [
          "coverflow", "imperial-runway", "sovereign-spotlight"
        ].includes(this.current3DMode);

        const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        const hasLateralIntent = isHorizontalScroll && Math.abs(e.deltaX) > 6;
        const hasSpatialVerticalIntent = isSpatialMode && Math.abs(e.deltaY) > 8;

        if (hasLateralIntent || hasSpatialVerticalIntent) {
          const rawDelta = hasLateralIntent ? e.deltaX : e.deltaY;
          e.preventDefault();
          wheelAccumulator += rawDelta;

          const threshold = 32;
          if (Math.abs(wheelAccumulator) >= threshold) {
            const step = wheelAccumulator > 0 ? 1 : -1;
            this.navigate3D(step);
            wheelAccumulator = 0;
          }

          clearTimeout(wheelTimer);
          wheelTimer = setTimeout(() => {
            wheelAccumulator = 0;
          }, 140);
        }
      }, { passive: false });

      // Touch swipe gestures
      let touchStartX = 0;
      let touchStartY = 0;
      grid.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      grid.addEventListener("touchmove", (e) => {
        if (e.touches.length === 1) {
          const diffX = e.touches[0].clientX - touchStartX;
          const diffY = e.touches[0].clientY - touchStartY;

          if (this.current3DMode === "tunnel") {
            const raw = Math.abs(diffY) > Math.abs(diffX) ? -diffY : -diffX;
            if (Math.abs(raw) > 8) {
              this.targetTunnelDepth += raw * 3.2;
              touchStartX = e.touches[0].clientX;
              touchStartY = e.touches[0].clientY;
            }
            return;
          }

          if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
            this.navigate3D(diffX > 0 ? -1 : 1);
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
          }
        }
      }, { passive: true });

      // Pointer drag with tactile visual feedback
      let isPointerDown = false;
      let pointerStartX = 0;
      let pointerStartY = 0;

      grid.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        isPointerDown = true;
        pointerStartX = e.clientX;
        pointerStartY = e.clientY;
        grid.classList.add("stage-dragging");
      });

      window.addEventListener("pointermove", (e) => {
        if (!isPointerDown) return;
        if (this.current3DMode === "tunnel") {
          const deltaY = e.clientY - pointerStartY;
          this.targetTunnelDepth -= deltaY * 3.5;
          pointerStartY = e.clientY;
          this.isAutoWalking = false;
          const autoWalkBtn = document.getElementById("tunnelAutoWalkBtn");
          if (autoWalkBtn) {
            autoWalkBtn.classList.remove("active");
            autoWalkBtn.textContent = "▶ AUTO-CRUISE";
          }
          return;
        }

        const deltaX = e.clientX - pointerStartX;
        if (Math.abs(deltaX) > 42) {
          this.navigate3D(deltaX > 0 ? -1 : 1);
          pointerStartX = e.clientX;
        }
      });

      const stopPointerDrag = () => {
        if (isPointerDown) {
          isPointerDown = false;
          grid.classList.remove("stage-dragging");
        }
      };
      window.addEventListener("pointerup", stopPointerDrag);
      window.addEventListener("pointercancel", stopPointerDrag);

      // Keyboard Walking Controls for Tunnel Corridor
      window.addEventListener("keydown", (e) => {
        if (this.current3DMode === "tunnel") {
          if (e.key === "ArrowDown" || e.key === "KeyS" || e.key === "PageDown") {
            e.preventDefault();
            this.targetTunnelDepth += 260; // walk forward
            this.isAutoWalking = false;
          } else if (e.key === "ArrowUp" || e.key === "KeyW" || e.key === "PageUp") {
            e.preventDefault();
            this.targetTunnelDepth -= 260; // walk backward
            this.isAutoWalking = false;
          } else if (e.key === " " && document.activeElement && document.activeElement.tagName !== "INPUT") {
            e.preventDefault();
            this.toggleAutoWalk();
          }
        }
      });

      // Interactive 3D Tunnel Gyroscope Look-Around
      grid.addEventListener("mousemove", (e) => {
        if (this.current3DMode !== "tunnel") return;
        const rect = grid.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        const rotY = normX * 12;
        const rotX = -normY * 8;
        const world = document.getElementById("tunnelWorld");
        if (world) {
          world.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        }
      });

      grid.addEventListener("mouseleave", () => {
        const world = document.getElementById("tunnelWorld");
        if (world) {
          world.style.transform = "rotateX(0deg) rotateY(0deg)";
        }
      });
    }
  }

  applyExhibitionFilters() {
    const cat = this.activeCategory || "all";
    const query = this.searchQuery || "";

    this.filteredItems = this.portfolioItems.filter(item => {
      const matchCat = (cat === "all") || (item.category === cat);
      const matchQuery = !query ||
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.id && item.id.toString().includes(query));
      return matchCat && matchQuery;
    });

    this.renderExhibition(true);
  }

  updateArchiveCounters() {
    const counterText = document.getElementById("archiveCounterText");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const loadAllBtn = document.getElementById("loadAllBtn");
    const total = this.portfolioItems.length;
    const matching = this.filteredItems.length;
    const showing = Math.min(this.displayedCount, matching);

    if (counterText) {
      if (matching === total) {
        counterText.textContent = `Showing ${showing} of ${total} Master Works`;
      } else {
        counterText.textContent = `Showing ${showing} of ${matching} Filtered Marks (${total} in Archive)`;
      }
    }

    const isFullyLoaded = this.displayedCount >= matching;
    if (loadMoreBtn) loadMoreBtn.style.display = isFullyLoaded ? "none" : "inline-block";
    if (loadAllBtn) loadAllBtn.style.display = isFullyLoaded ? "none" : "inline-block";
  }

  renderExhibition(reset = false) {
    const grid = document.getElementById("portfolioGrid");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const loadAllBtn = document.getElementById("loadAllBtn");
    if (!grid) return;

    if (reset) {
      grid.innerHTML = "";
      this.displayedCount = 0;
      this.active3DIndex = 0;
      this.carouselAngle = 0;
      this.itemsPerPage = 24;
    }

    if (this.filteredItems.length === 0) {
      grid.innerHTML = `
        <div class="archive-empty-state" style="grid-column: 1 / -1; padding: 5rem 2rem; text-align: center; color: var(--text-dim);">
          <p style="font-family: var(--font-mono); font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.75rem; color: var(--accent-gold);">NO ARCHIVE ENTRIES MATCH YOUR CRITERIA</p>
          <p style="font-size: 0.9rem; opacity: 0.75;">Try searching for another keyword (e.g. lion, apex, monogram) or choose "ALL WORKS".</p>
        </div>
      `;
      if (loadMoreBtn) loadMoreBtn.style.display = "none";
      if (loadAllBtn) loadAllBtn.style.display = "none";
      this.updateArchiveCounters();
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
      const isFeatured = (overallIndex === 0 || overallIndex === 7 || overallIndex === 15) && this.current3DMode === "tilt";

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

      card.addEventListener("click", () => this.openModal(item, overallIndex));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.openModal(item, overallIndex);
        }
      });

      grid.appendChild(card);
    });

    this.displayedCount += nextBatch.length;

    if (loadMoreBtn) {
      loadMoreBtn.style.display = this.displayedCount >= this.filteredItems.length ? "none" : "inline-block";
    }

    this.updateArchiveCounters();

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
    const prevBtn = document.getElementById("modalPrevBtn");
    const nextBtn = document.getElementById("modalNextBtn");
    const zoomBtn = document.getElementById("modalZoomBtn");

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => this.closeModal());
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeModal();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.navigateModal(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.navigateModal(1);
      });
    }

    if (zoomBtn) {
      zoomBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const img = document.getElementById("modalImage");
        const zoomText = document.getElementById("zoomBtnText");
        if (img) {
          img.classList.toggle("zoomed");
          const isZoomed = img.classList.contains("zoomed");
          if (zoomText) zoomText.textContent = isZoomed ? "RESET" : "ZOOM 2X";
          this.playMicroTone(isZoomed ? 680 : 520, 0.03);
        }
      });
    }

    const modalImg = document.getElementById("modalImage");
    if (modalImg) {
      modalImg.addEventListener("click", () => {
        modalImg.classList.toggle("zoomed");
        const zoomText = document.getElementById("zoomBtnText");
        const isZoomed = modalImg.classList.contains("zoomed");
        if (zoomText) zoomText.textContent = isZoomed ? "RESET" : "ZOOM 2X";
      });
    }

    window.addEventListener("keydown", (e) => {
      if (!modal || !modal.classList.contains("open")) return;
      if (e.key === "Escape") {
        this.closeModal();
      } else if (e.key === "ArrowLeft") {
        this.navigateModal(-1);
      } else if (e.key === "ArrowRight") {
        this.navigateModal(1);
      }
    });
  }

  openModal(item, index) {
    const modal = document.getElementById("designModal");
    if (!modal || !item) return;

    this.modalCurrentIndex = (typeof index === "number") ? index : this.filteredItems.indexOf(item);

    const modalImg = document.getElementById("modalImage");
    if (modalImg) {
      modalImg.src = item.image;
      modalImg.alt = item.title;
      modalImg.classList.remove("zoomed");
    }

    const zoomText = document.getElementById("zoomBtnText");
    if (zoomText) zoomText.textContent = "ZOOM 2X";

    const titleEl = document.getElementById("modalTitle");
    if (titleEl) titleEl.textContent = item.title;

    const catEl = document.getElementById("modalCategory");
    if (catEl) catEl.textContent = (item.category || "TRADEMARK").toUpperCase() + " MARK";

    const idEl = document.getElementById("modalId");
    if (idEl) idEl.textContent = `#${item.id}`;

    const dateEl = document.getElementById("modalDate");
    if (dateEl) dateEl.textContent = item.createdAt ? item.createdAt.slice(0, 10) : "Verified";

    const linkEl = document.getElementById("modalSourceLink");
    if (linkEl) linkEl.href = item.url;

    // Authentic Design Concept & Brief Rationale
    const descEl = document.getElementById("modalDesc");
    if (descEl) {
      if (item.description && item.description.trim().length > 0) {
        descEl.textContent = item.description;
      } else {
        descEl.textContent = "Original trademark design and bespoke vector geometry crafted by CrimaDezignz® for international contest submission on 99designs.";
      }
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    this.playMicroTone(720, 0.05);
  }

  navigateModal(direction) {
    if (!this.filteredItems || this.filteredItems.length === 0) return;
    const len = this.filteredItems.length;
    this.modalCurrentIndex = (this.modalCurrentIndex + direction + len) % len;
    const nextItem = this.filteredItems[this.modalCurrentIndex];
    this.openModal(nextItem, this.modalCurrentIndex);
  }

  closeModal() {
    const modal = document.getElementById("designModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";

    const modalImg = document.getElementById("modalImage");
    if (modalImg) modalImg.classList.remove("zoomed");

    this.playMicroTone(360, 0.03);
  }

  // ===========================================================================
  // Academic Grammar Explanation Modal Dialog (DOOM3 / GALR Standard)
  // ===========================================================================
  setupGrammarModal() {
    const modal = document.getElementById("grammarExplanationModal");
    const openBtn = document.getElementById("openGrammarModalBtn");
    const inlineLink = document.getElementById("grammarInlineLink");
    const closeBtn = document.getElementById("grammarModalCloseBtn");
    const closeSecondaryBtn = document.getElementById("closeGrammarModalBtn");

    const openGrammarModal = (e) => {
      if (e) e.preventDefault();
      if (modal) {
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
        this.playMicroTone(720, 0.05);
      }
    };

    const closeGrammarModal = () => {
      if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
        this.playMicroTone(440, 0.03);
      }
    };

    if (openBtn) openBtn.addEventListener("click", openGrammarModal);
    if (inlineLink) inlineLink.addEventListener("click", openGrammarModal);
    if (closeBtn) closeBtn.addEventListener("click", closeGrammarModal);
    if (closeSecondaryBtn) closeSecondaryBtn.addEventListener("click", closeGrammarModal);

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeGrammarModal();
      });
    }

    window.addEventListener("keydown", (e) => {
      if (modal && modal.classList.contains("open") && e.key === "Escape") {
        closeGrammarModal();
      }
    });
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
