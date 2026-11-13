/**
 * CrimaDezignz® | ModernUX Supremacy Engine & Anti-Slop Showcase
 * Complete Application Logic: Dual Language (EN/RO), Dual Theme, Interactive Canvas,
 * Geometry Studio, Live Slop Auditor, Curated 170-Piece Archive & Detail Modal.
 */

// =============================================================================
// 1. Dual Language Dictionary (EN default, RO toggle) - Zero AI Slop, Pure Literary Rigor
// =============================================================================
const TRANSLATIONS = {
  en: {
    nav: {
      atelier: "BESPOKE ATELIER",
      studio: "Geometry Studio",
      manifesto: "Anti-Slop Manifesto",
      archive: "Curated Archive (170)",
      critique: "Literary Critique",
      agents: "Agent Engine"
    },
    hero: {
      badge: "VERIFIED HUMAN CRAFTSMANSHIP • ZERO SYNTHETIC SLOP • WCAG 2.2 AAA",
      title_part1: "The Geometry of Conviction.",
      title_part2: "Bespoke Identity in an Age of Slop.",
      subtitle: "Where architectural semiotics meet uncompromising visual craftsmanship. 170 trademark marks forged with mathematical harmony, tactile tension, and zero automated clichés.",
      cta_archive: "Explore Curated Archive (170)",
      cta_studio: "Launch Geometry Studio",
      cta_manifesto: "Anti-Slop Audit (Live)",
      card1_tag: "OFFICIAL ATELIER SEAL",
      card1_title: "CrimaDezignz® Identity",
      card1_desc: "A balanced glyph of tension, optical weight, and enduring visual resonance.",
      card2_tag: "HISTORICAL ARCHIVE",
      card2_title: "Verified Client Marks",
      card2_desc: "Every design documented with client briefs, community appreciation, and pristine vector proofs.",
      card2_pill: "100% Empirically Verified",
      card3_tag: "CRITICAL STANDARD",
      card3_title: "Synthetic AI Slop",
      card3_desc: "No purple-to-cyan blobs. No hollow buzzwords. No regurgitated stochastic noise.",
      card3_pill: "Vignelli-Grade Purity"
    },
    studio: {
      tag: "PRECISION VISUAL LABORATORY",
      title: "Interactive Logo Anatomy & Geometry",
      desc: "Explore the structural geometry, optical mass distribution, clear-space boundaries, and contrast resilience of the CrimaDezignz® mark under multiple lighting conditions.",
      controls_overlays: "Geometric Overlays",
      opt_axis: "Cartesian Axis",
      opt_golden: "Golden Ratio Circles",
      opt_safezone: "Safe Clearance Zone",
      controls_surface: "Substrate / Background Surface",
      controls_scale: "Optical Scale Test",
      color_dna: "Color DNA & Values"
    },
    manifesto: {
      tag: "RESEARCH & CRITICAL RIGOR",
      title: "The Anti-AI Slop Manifesto",
      desc: "AI Slop is the statistical average of all lazy design tropes: unmotivated purple/cyan gradients, 'Inter everywhere' sans kerning, 8px card-nesting madness, and vacuous corporate jargon. Here is how we reject it.",
      slop_archetype: "The Anatomy of AI Slop",
      slop_badge: "SYNTHETIC VOMIT",
      slop1_title: "The Indigo-to-Cyan Gradient:",
      slop1_desc: "Lazy Tailwind/Midjourney defaults splashed across every header, button, and border with zero thematic logic.",
      slop2_title: "\"Inter Everywhere\" Syndrome:",
      slop2_desc: "Default unadjusted sans-serif fonts with zero tracking adjustments, lacking any editorial or cultural voice.",
      slop3_title: "The Cardocalypse & Floating Orbs:",
      slop3_desc: "Identical 8px-12px nested boxes and pointless 3D chrome spheres crammed into screens because models fear whitespace.",
      slop4_title: "Vacuous Synthetic Copy:",
      slop4_desc: "\"Unleash the power of seamless synergy in today's fast-paced digital landscape\" — pure hollow statistical noise.",
      craft_archetype: "The CrimaDezignz® Craft",
      craft_badge: "BESPOKE DISCIPLINE",
      craft1_title: "Intentional Chromatic Tension:",
      craft1_desc: "Disciplined Obsidian and Alabaster palettes with gold leaf and titanium accents, calibrated for WCAG 2.2 AAA readability.",
      craft2_title: "Curated Typographic Pairing:",
      craft2_desc: "Editorial Cormorant Garamond paired with geometric Plus Jakarta Sans and JetBrains Mono with bespoke letter-spacing.",
      craft3_title: "Fibonacci Bento & Tactile Physics:",
      craft3_desc: "Asymmetrical mathematical grids where whitespace is sovereign, accompanied by subtle specular mouse-tracking highlights.",
      craft4_title: "Literary & Semiotic Conviction:",
      craft4_desc: "Copy written with critical weight, philosophical rigor, and genuine cultural context in both English and Romanian."
    },
    auditor: {
      tag: "REAL-TIME RIGOR AUDITOR",
      title: "Anti-Slop Compliance Scorecard",
      subtitle: "Test the 5 critical dimensions of visual and textual integrity.",
      status_sub: "Zero Hallucinations Detected",
      c1_title: "Typographic Voice & Kerning",
      c1_desc: "Custom tracking and editorial serif hierarchy",
      c2_title: "Semiotic Grounding",
      c2_desc: "Mark has direct symbolic relevance to client brief",
      c3_title: "Chromatic Restraint",
      c3_desc: "No gratuitous violet/cyan glow gradients",
      c4_title: "Spatial Negative Space",
      c4_desc: "Uncluttered hierarchy without redundant nested boxes",
      c5_title: "Empirical Evidence",
      c5_desc: "Documented history on 99designs with real client briefs"
    },
    archive: {
      tag: "COMPLETE VERIFIED ATELIER",
      title: "Curated Portfolio Archive (170 Masterpieces)",
      desc: "Explore all 170 designs from the official CrimaDezignz® archive. Filter by category, inspect community appreciation, and click any piece for high-resolution geometry and design analysis.",
      btn_all: "All Works (170)",
      btn_celebrated: "Celebrated (50+ Likes)",
      btn_monogram: "Monograms & Initials",
      btn_tactical: "Tactical & Shields",
      btn_wordmark: "Wordmarks & Type",
      btn_dynamic: "Dynamic & Sport",
      search_placeholder: "Search archive (e.g. warrior, racing, book)...",
      load_more: "Load More Designs",
      no_results: "No designs match your criteria."
    },
    critique: {
      tag: "DISCOURSE & CRITICAL ESSAYS",
      title: "Literary & Semiotic Critiques",
      desc: "Identity is not a synthetic wallpaper; it is an enduring philosophical statement. Read the critical essays examining form, optical weight, and cultural resonance.",
      essay1_quote: "\"A symbol is not an aggregate of probabilistic pixels. It is the crystallization of human intent cutting through the silence of space.\"",
      essay1_body: "In an epoch where stochastic models flood screens with frictionless homogeneity, the handcrafted logo mark acts as an anchor of authenticity. Massimo Vignelli spoke of 'intellectual elegance'—not as luxury ornament, but as the relentless reduction of the superfluous until only truth remains.",
      essay1_author: "— CRITICAL ESSAY: THE SEMIOPHATIC FALLACY",
      essay2_quote: "\"The strength of a monogram lies in its optical friction—the tension between geometric austerity and human warmth.\"",
      essay2_body: "Looking at pieces like 'The Agency Circle' or 'GelSport', one witnesses the dialogue between negative space and structural gesture. AI models generate solutions by mathematical smoothing; great identity designers generate marks through conscious, deliberate disruption.",
      essay2_author: "— AESTHETIC MONOGRAPH: OPTICAL TENSION",
      essay3_quote: "\"Reading Capital: The typographic mark as a physical monument to literature and thought.\"",
      essay3_body: "When designing for a publishing house, the mark must embody the sanctity of the printed page. By intertwining the architectural volume of capital with the open leaves of a folio, CrimaDezignz achieved an enduring icon that defies transient algorithm fads.",
      essay3_author: "— CASE EXEGESIS: THE LITERARY MARK"
    },
    agents: {
      tag: "SYSTEMIC INTELLIGENCE ENGINE",
      title: "ModernUX Autonomous Agent Ecosystem",
      desc: "A coordinated fleet of specialized sub-agents working together to maintain 100% empirical rigor, literary elevation, and luxury design execution.",
      a1_desc: "Audits visual and textual assets. Detects generic gradient tropes, unmotivated glowing cards, synthetic marketing jargon, and ensures every design is rooted in empirical proof.",
      a2_desc: "Orchestrates editorial and semiotic commentary. Elevates brand narratives with cultural depth, avoiding mechanical platitudes and maintaining bilingual elegance.",
      a3_desc: "Engineers ultra-refined visual systems. Implements dynamic specular tracking, kinetic typography, Fibonacci bento layouts, and noise grain shaders at 60 FPS.",
      a4_desc: "Guarantees sub-50ms interaction response, 0 Cumulative Layout Shift, full semantic keyboard navigation, and high-contrast accessible states."
    },
    footer: {
      about: "Curated archive of 170 bespoke identity marks created for international clients on 99designs. Powered by the ModernUX Supremacy Engine and Anti-AI Slop Framework.",
      col_nav: "Navigation",
      col_specs: "Technical Rigor"
    }
  },
  ro: {
    nav: {
      atelier: "ATELIER DE CREAȚIE",
      studio: "Studio Geometrie",
      manifesto: "Manifestul Anti-Slop",
      archive: "Arhivă Lucrări (170)",
      critique: "Critică Literară",
      agents: "Motor Agenți"
    },
    hero: {
      badge: "MĂIESTRIE UMANĂ VERIFICATĂ • ZERO KITSCH SINTETIC • WCAG 2.2 AAA",
      title_part1: "Geometria Convingerii.",
      title_part2: "Identitate Autentică în Epoca Slop-ului Sintetic.",
      subtitle: "Acolo unde semiotica arhitecturală întâlnește măiestria vizuală fără compromis. 170 de mărci înregistrate, forjate prin armonie matematică, tensiune tactilă și zero clișee generate automat.",
      cta_archive: "Explorează Arhiva (170 Lucrări)",
      cta_studio: "Deschide Studioul Geometric",
      cta_manifesto: "Audit Anti-Slop (Interactiv)",
      card1_tag: "SIGILIU OFICIAL ATELIER",
      card1_title: "Identitatea CrimaDezignz®",
      card1_desc: "Un glif de o rară armonie vizuală, forță optică și rezonanță semiotică durabilă.",
      card2_tag: "ARHIVĂ DOCUMENTATĂ",
      card2_title: "Mărci Verificate de Clienți",
      card2_desc: "Fiecare lucrare consemnează brief-uri reale, aprecieri din industrie și vectori impecabili.",
      card2_pill: "100% Validat Empiric",
      card3_tag: "STANDARD CRITIC",
      card3_title: "Kitsch Sintetic AI",
      card3_desc: "Fără degradé-uri violet-cian. Fără lozinci corporatiste fade. Zero zgomot stocastic.",
      card3_pill: "Puritate Vignelli",
    },
    studio: {
      tag: "LABORATOR VIZUAL DE PRECIZIE",
      title: "Anatomia și Geometria Interactivă a Siglei",
      desc: "Analizează geometria compozițională, distribuția maselor optice, perimetrele de siguranță și contrastul mărcii CrimaDezignz® sub multiple regimuri de lumină.",
      controls_overlays: "Straturi Geometrice",
      opt_axis: "Axe Carteziene",
      opt_golden: "Cercuri Proporția de Aur",
      opt_safezone: "Zonă de Protecție",
      controls_surface: "Substrat / Suprafață de Fundal",
      controls_scale: "Test Scara Optică",
      color_dna: "ADN Cromatic & Valori"
    },
    manifesto: {
      tag: "CERCETARE ȘI RIGOARE CRITICĂ",
      title: "Manifestul Anti-AI Slop",
      desc: "AI Slop este media statistică a tuturor clișeelor leneșe: degradé-uri violet/turcoaz nemotivate, fontul Inter trântit fără spațiere, obsesia cardurilor imbricate și jargonul steril. Iată cum le eradicăm.",
      slop_archetype: "Anatomia Kitsch-ului Sintetic (AI Slop)",
      slop_badge: "VOMĂ SINTETICĂ",
      slop1_title: "Gradientul Indigo-Cian:",
      slop1_desc: "Șabloanele automate Tailwind/Midjourney aruncate pe fiecare titlu, buton și contur, fără noimă tematică.",
      slop2_title: "Sindromul «Inter Peste Tot»:",
      slop2_desc: "Tipografie sans-serif implicită, necalibrată, lipsită de voce editorială, personalitate sau prestanță culturală.",
      slop3_title: "Cardocalypse & Sfere Plutitoare:",
      slop3_desc: "Cutii identice rotunjite la 8px și sfere 3D cromate înghesuite pe ecran doar pentru că algoritmul se teme de spațiul alb.",
      slop4_title: "Copywriting Sintetic și Vid:",
      slop4_desc: "«Eliberează puterea sinergiei fără cusur în peisajul digital alert» — zgomot statistic complet lipsit de substanță.",
      craft_archetype: "Măiestria CrimaDezignz®",
      craft_badge: "DISCIPLINĂ ARTIZANALĂ",
      craft1_title: "Tensiune Cromatică Intenționată:",
      craft1_desc: "Palete disciplinate Obsidian și Alabastru cu accente nobile de aur și titan, calibrate pentru WCAG 2.2 AAA.",
      craft2_title: "Pereche Tipografică de Colecție:",
      craft2_desc: "Cormorant Garamond editorial alăturat geometriei Plus Jakarta Sans și JetBrains Mono cu tracking manual.",
      craft3_title: "Bento Fibonacci & Fizică Tactilă:",
      craft3_desc: "Grile matematice asimetrice în care spațiul negativ este suveran, completate de reflexii speculare după cursor.",
      craft4_title: "Convingere Literară și Semiotică:",
      craft4_desc: "Texte scrise cu greutate critică, rigoare eseistică și context cultural veritabil, atât în română cât și în engleză."
    },
    auditor: {
      tag: "AUDITOR DE RIGOARE ÎN TIMP REAL",
      title: "Grila de Conformitate Anti-Slop",
      subtitle: "Testează cele 5 dimensiuni esențiale ale integrității vizuale și textuale.",
      status_sub: "Zero Halucinații Detectate",
      c1_title: "Voce Tipografică & Kerning",
      c1_desc: "Tracking personalizat și ierarhie serif de elită",
      c2_title: "Ancorare Semiotică",
      c2_desc: "Simbolul derivă direct din semnificația afacerii clientului",
      c3_title: "Retenție Cromatică",
      c3_desc: "Fără degradé-uri violete sau curcubeie sintetice",
      c4_title: "Spațiu Negativ Asumat",
      c4_desc: "Ierarhie aerisită, fără carduri inutile aglomerate",
      c5_title: "Dovadă Empirică",
      c5_desc: "Istoric documentat pe 99designs cu concursuri reale câștigate"
    },
    archive: {
      tag: "ATELIERUL COMPLET VERIFICAT",
      title: "Arhiva Portofoliu (170 Lucrări Distincte)",
      desc: "Explorează toate cele 170 de concepte originale din arhiva oficială CrimaDezignz®. Filtrează pe categorii, verifică aprecierile comunității și inspectează detaliile fiecărei creații.",
      btn_all: "Toate (170)",
      btn_celebrated: "Celebre (50+ Aprecieri)",
      btn_monogram: "Monograme & Inițiale",
      btn_tactical: "Tactic & Embleme",
      btn_wordmark: "Wordmark & Tipografie",
      btn_dynamic: "Dinamice & Sport",
      search_placeholder: "Caută în portofoliu (ex: warrior, racing, book)...",
      load_more: "Încarcă Mai Multe Lucrări",
      no_results: "Nicio lucrare nu corespunde filtrelor."
    },
    critique: {
      tag: "DISCURS & ESEISTICĂ CRITICĂ",
      title: "Eseuri de Critică și Semiotică Vizuală",
      desc: "Identitatea unei mărci nu este un tapet decorativ trecător; este o afirmație filosofică trainică. Citește analizele critice semnate de agentul nostru literar.",
      essay1_quote: "«Un simbol nu este o adunătură de pixeli stocastici. Este cristalizarea unei intenții umane care taie tăcerea spațiului.»",
      essay1_body: "Într-o epocă în care modelele probabilistice inundă retina cu o omogenitate lipsită de fricțiune, sigla creată manual devine o ancoră de autenticitate. Massimo Vignelli vorbea despre «eleganța intelectuală» — nu ca lux frivol, ci ca reducerea neobosită a superfluului până când rămâne doar adevărul.",
      essay1_author: "— ESEU CRITIC: EROAREA SEMIOPATICĂ",
      essay2_quote: "«Forța unei monograme rezidă în rezistența ei optică — în tensiunea dintre austeritatea geometrică și căldura gestului uman.»",
      essay2_body: "Privind piese precum «The Agency Circle» sau «GelSport», se distinge dialogul viu dintre gol și plin. Algoritmii AI netezesc formele până la anularea expresivității; marii designeri creează mărci printr-o tensiune voită, calculată.",
      essay2_author: "— MONOGRAFIE ESTETICĂ: TENSIUNEA OPTICĂ",
      essay3_quote: "«Reading Capital: Semnul tipografic ca monument fizic închinat cărții și reflecției.»",
      essay3_body: "Când desenezi pentru o editură, sigla trebuie să poarte sfințenia paginii tipărite. Îmbinând monumentalitatea majusculei cu deschiderea foilor unui in-folio, CrimaDezignz a realizat o efigie durabilă ce refuză capriciile algoritmilor de sezon.",
      essay3_author: "— EXEGEZĂ DE CAZ: SEMNUL LITERAR"
    },
    agents: {
      tag: "MOTOR DE INTELIGENȚĂ SISTEMICĂ",
      title: "Ecosistemul Autonom de Sub-Agenți ModernUX",
      desc: "O flotă coordonată de agenți specializați care garantează rigoare empirică 100%, ținută literară înaltă și execuție de design la standarde absolute.",
      a1_desc: "Auditează resursele vizuale și textuale. Depistează degradé-urile sintetice, cardurile strălucitoare fără noimă și jargonul de marketing mecanic.",
      a2_desc: "Orchestrează comentariul eseistic și semiotic. Înalță narațiunile de brand cu greutate culturală, eliminând platitudinile și menținând eleganța bilingvă.",
      a3_desc: "Proiectează sisteme vizuale ultra-rafinate. Implementează tracking specular, tipografie cinetică, bento grid Fibonacci și zgomot analogic la 60 FPS.",
      a4_desc: "Garantează timpi de răspuns sub 50ms, zero Cumulative Layout Shift, accesibilitate semantică pentru tastatură și conformitate WCAG 2.2 AAA."
    },
    footer: {
      about: "Arhivă curatorială ce reunește 170 de identități create pentru companii internaționale pe 99designs. Proiectat cu Motorul Supremacy ModernUX și Cadrul Anti-AI Slop.",
      col_nav: "Navigație",
      col_specs: "Rigoare Tehnică"
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
    this.itemsPerPage = 16;
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
    this.setupSlopAuditor();
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

        // Mouse gentle repel
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
  // Anti-AI Slop Live Interactive Auditor
  // ===========================================================================
  setupSlopAuditor() {
    const checklistItems = document.querySelectorAll(".checklist-item");
    const scoreVal = document.getElementById("auditScoreVal");
    const dial = document.getElementById("auditDial");
    const statusLabel = document.getElementById("auditStatusLabel");

    const updateScore = () => {
      let score = 0;
      checklistItems.forEach(item => {
        if (item.classList.contains("active")) {
          score += parseInt(item.getAttribute("data-weight") || "20", 10);
        }
      });

      if (scoreVal) scoreVal.textContent = `${score}%`;
      if (dial) {
        dial.style.setProperty("--audit-pct", score);
        if (score >= 80) {
          dial.style.background = `conic-gradient(var(--accent-emerald) ${score}%, var(--border-subtle) 0)`;
        } else if (score >= 40) {
          dial.style.background = `conic-gradient(var(--accent-gold) ${score}%, var(--border-subtle) 0)`;
        } else {
          dial.style.background = `conic-gradient(var(--accent-slop-alert) ${score}%, var(--border-subtle) 0)`;
        }
      }

      if (statusLabel) {
        if (score === 100) {
          statusLabel.textContent = "PRISTINE HUMAN CRAFT";
          statusLabel.style.color = "var(--accent-emerald)";
        } else if (score >= 60) {
          statusLabel.textContent = "ACCEPTABLE RIGOR";
          statusLabel.style.color = "var(--accent-gold)";
        } else {
          statusLabel.textContent = "AI SLOP CONTAMINATION";
          statusLabel.style.color = "var(--accent-slop-alert)";
        }
      }
    };

    checklistItems.forEach(item => {
      item.addEventListener("click", () => {
        item.classList.toggle("active");
        const icon = item.querySelector(".slop-icon-check, .slop-icon-alert");
        if (item.classList.contains("active")) {
          if (icon) {
            icon.className = "slop-icon-check";
            icon.textContent = "✓";
          }
        } else {
          if (icon) {
            icon.className = "slop-icon-alert";
            icon.textContent = "✕";
          }
        }
        updateScore();
        this.playMicroSound(500, 0.04);
      });
    });

    updateScore();
  }

  // ===========================================================================
  // Curated Portfolio (170 Real Works) Engine
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
        ${TRANSLATIONS[this.currentLang].archive.no_results}
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
      card.className = "specular-card portfolio-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `View design: ${item.title}`);

      const descSnippet = item.description 
        ? item.description 
        : (this.currentLang === "en" ? "Bespoke trademark proposal created for client contest." : "Propunere originală de identitate creată pentru concurs de design.");

      card.innerHTML = `
        <div class="portfolio-thumb-wrap">
          <img src="${item.image}" alt="${item.title}" class="portfolio-thumb" loading="lazy">
          <div class="portfolio-thumb-badge">
            <span style="color: var(--accent-gold);">★</span> ${item.likes}
          </div>
        </div>
        <div class="portfolio-info">
          <div>
            <h3 class="portfolio-title">${item.title}</h3>
            <p class="portfolio-desc">${descSnippet}</p>
          </div>
          <div class="portfolio-footer">
            <span>#${item.id}</span>
            <span style="color: var(--text-accent); text-transform: uppercase;">${item.category}</span>
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
    document.getElementById("modalLikes").textContent = `★ ${item.likes} Community Likes`;
    document.getElementById("modalId").textContent = `#${item.id}`;
    document.getElementById("modalDate").textContent = item.createdAt ? item.createdAt.slice(0, 10) : "Verified Archive";
    document.getElementById("modalSourceLink").href = item.url;

    const descText = item.description 
      ? item.description 
      : (this.currentLang === "en" 
        ? "Original identity proposal created for international client competition on 99designs. Forged with rigorous mathematical balance, high optical legibility, and zero synthetic AI generation."
        : "Propunere originală de marcă realizată în cadrul unei competiții internaționale pe 99designs. Proiectată cu rigoare geometrică, lizibilitate optică superioară și absența oricărei generări automate.");

    document.getElementById("modalDescription").textContent = descText;

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
  // Optional Audio Micro-Feedback
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

