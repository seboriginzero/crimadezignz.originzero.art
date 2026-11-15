/**
 * originZero.Art — 100% Deterministic Live Surface Stage (ZERO-AI)
 * Master 10-Surface Physical Mockup & Vector Inspection Engine
 * 
 * Strict Mathematical Reproducibility • Offline Execution • Zero External APIs
 * Multi-Panel Presentation Sheet Detector & Isolated Primary Logo Extractor
 */

class LiveSurfaceStageEngine {
  constructor() {
    this.currentMark = null;
    this.vectorManifest = null;
    this.currentSurfaceIndex = 0; // 0 to 9 (Surfaces 01 to 10)
    this.currentFinish = "original"; // original, spot_uv, gold_foil, silver_foil, blind_deboss, backlit_glow
    this.lightAngle = 125; // 0 to 360 degrees
    this.logoScale = 1.0; // 0.25 to 1.5
    this.isIsolated = true; // Isolated Logo Mark vs Full Presentation Sheet
    this.knockoutThreshold = 28; // 10 to 90
    this.surfaceVariants = {
      1: "black", // apparel: black or ecru
      2: "dark", // ceramic: dark or white
      4: "black", // leather: black or cognac
      5: "gunmetal", // metal: gunmetal or silver
      7: "dark", // os-grid: dark or light
      8: "stencil", // blade-sign: stencil or acrylic
      9: "gloss" // window: gloss or etched
    };

    // The 10 Calibrated Standard Surfaces
    this.surfaces = [
      { id: "01", name: "Cotton Card 600gsm", shortName: "01 Card", category: "Stationery Plinth", hasVariant: false },
      { id: "02", name: "Heavyweight Apparel 280gsm", shortName: "02 Apparel", category: "Textile / Jersey", hasVariant: true, variantLabel: "Obsidian / Ecru" },
      { id: "03", name: "Matte Ceramic Cylinder", shortName: "03 Mug", category: "Cylindrical Object", hasVariant: true, variantLabel: "Dark / White" },
      { id: "04", name: "Frosted Glass Wall Sign", shortName: "04 Glass", category: "Architectural Signage", hasVariant: false },
      { id: "05", name: "Full-Grain Leather Folio", shortName: "05 Leather", category: "Executive Goods", hasVariant: true, variantLabel: "Onyx / Cognac" },
      { id: "06", name: "Brushed Anodized Metal", shortName: "06 Metal", category: "Industrial Plaque", hasVariant: true, variantLabel: "Gunmetal / Silver" },
      { id: "07", name: "Rigid Luxury Packaging", shortName: "07 Luxury Box", category: "Boutique Gift Box", hasVariant: false },
      { id: "08", name: "Digital OS & Favicon Grid", shortName: "08 OS Grid", category: "Technical Scale Test", hasVariant: true, variantLabel: "Dark / Light OS" },
      { id: "09", name: "Illuminated Night Blade Sign", shortName: "09 Blade Sign", category: "Street Lightbox", hasVariant: true, variantLabel: "Stencil / Acrylic" },
      { id: "10", name: "Storefront Window Vinyl", shortName: "10 Vinyl", category: "Facade Cutter-Plotter", hasVariant: true, variantLabel: "Gloss / Etched" }
    ];

    // The 6 Physical Finishes
    this.finishes = [
      { id: "original", name: "Original Brand", icon: "●" },
      { id: "spot_uv", name: "Spot UV Gloss", icon: "✧" },
      { id: "gold_foil", name: "24K Gold Foil", icon: "★" },
      { id: "silver_foil", name: "Sterling Silver", icon: "✦" },
      { id: "blind_deboss", name: "Blind Deboss", icon: "⌗" },
      { id: "backlit_glow", name: "Backlit / Etched", icon: "☀" }
    ];

    this.cache = new Map(); // In-memory cache for processed isolated canvases
    this.init();
  }

  async init() {
    // Attempt loading pre-compiled vector manifest
    try {
      const res = await fetch("assets/vectors/manifest.json");
      if (res.ok) {
        this.vectorManifest = await res.json();
      }
    } catch (_) {
      this.vectorManifest = null;
    }

    this.bindKeyboardShortcuts();
    this.bindDomControls();
  }

  // ===========================================================================
  // Mark Loading & Deterministic Knockout (Browser Engine + Manifest Bridge)
  // ===========================================================================
  async loadMark(item) {
    if (!item) return;
    this.currentMark = item;

    const meta = this.vectorManifest ? this.vectorManifest[item.id] : null;
    const cacheKey = `${item.id}_${this.knockoutThreshold}`;

    if (!this.cache.has(cacheKey)) {
      await this.processMarkImage(item, meta);
    }

    this.render();
  }

  async processMarkImage(item, meta) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;

        // Path A: Use pre-compiled manifest coordinates if available
        if (meta && meta.logoBBox && meta.background) {
          const bbox = meta.logoBBox;
          const bg = meta.background;

          const canvas = document.createElement("canvas");
          canvas.width = bbox.width;
          canvas.height = bbox.height;
          const ctx = canvas.getContext("2d", { willReadFrequently: true });

          // Extract ONLY the isolated primary logo region
          ctx.drawImage(img, bbox.x, bbox.y, bbox.width, bbox.height, 0, 0, bbox.width, bbox.height);

          const imgData = ctx.getImageData(0, 0, bbox.width, bbox.height);
          const data = imgData.data;
          const threshold = this.knockoutThreshold;
          const ramp = 12;

          let fgR = 0, fgG = 0, fgB = 0, fgCount = 0;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const dist = Math.sqrt((r - bg.r) ** 2 + (g - bg.g) ** 2 + (b - bg.b) ** 2);

            if (dist <= threshold - ramp) {
              data[i + 3] = 0; // Pure transparent background
            } else if (dist >= threshold + ramp) {
              data[i + 3] = 255; // Solid foreground mark
              fgR += r; fgG += g; fgB += b; fgCount++;
            } else {
              // Smoothstep anti-aliasing ramp
              const t = (dist - (threshold - ramp)) / (ramp * 2);
              const alpha = Math.round(255 * (t * t * (3 - 2 * t)));
              data[i + 3] = alpha;

              const aNorm = alpha / 255;
              if (aNorm > 0.05) {
                data[i] = Math.min(255, Math.max(0, Math.round((r - bg.r * (1 - aNorm)) / aNorm)));
                data[i + 1] = Math.min(255, Math.max(0, Math.round((g - bg.g * (1 - aNorm)) / aNorm)));
                data[i + 2] = Math.min(255, Math.max(0, Math.round((b - bg.b * (1 - aNorm)) / aNorm)));
              }
              if (alpha > 40) {
                fgR += r; fgG += g; fgB += b; fgCount++;
              }
            }
          }

          ctx.putImageData(imgData, 0, 0);

          const dominantFg = meta.dominantForeground || (fgCount > 0 ? {
            r: Math.round(fgR / fgCount),
            g: Math.round(fgG / fgCount),
            b: Math.round(fgB / fgCount)
          } : { r: 229, g: 192, b: 123 });

          const result = {
            trimmedDataUrl: canvas.toDataURL("image/png"),
            originalDataUrl: item.image,
            svgUrl: meta.svgPath || `assets/vectors/${item.id}.svg`,
            width: bbox.width,
            height: bbox.height,
            aspectRatio: meta.aspectRatio || +(bbox.width / bbox.height).toFixed(4),
            bg,
            dominantFg,
            layout: meta.layout || "single"
          };

          this.cache.set(`${item.id}_${this.knockoutThreshold}`, result);
          resolve(result);
          return;
        }

        // Path B: Dynamic in-browser seam & panel detection fallback
        const fullCanvas = document.createElement("canvas");
        fullCanvas.width = w;
        fullCanvas.height = h;
        const fCtx = fullCanvas.getContext("2d", { willReadFrequently: true });
        fCtx.drawImage(img, 0, 0);

        const fullImgData = fCtx.getImageData(0, 0, w, h);
        const fData = fullImgData.data;

        const getPix = (px, py) => {
          const idx = (py * w + px) * 4;
          return { r: fData[idx], g: fData[idx + 1], b: fData[idx + 2] };
        };

        // Mathematical Seam Analysis
        const midY = Math.floor(h / 2);
        const midX = Math.floor(w / 2);
        const y3_1 = Math.floor(h / 3);
        const y3_2 = Math.floor(h * 2 / 3);
        const x3_1 = Math.floor(w / 3);
        const x3_2 = Math.floor(w * 2 / 3);

        let hSeam2 = 0, vSeam2 = 0, hSeam3 = 0, vSeam3 = 0;

        for (let x = 40; x < w - 40; x += 10) {
          const pA = getPix(x, midY - 20);
          const pB = getPix(x, midY + 20);
          hSeam2 += Math.abs(pA.r - pB.r) + Math.abs(pA.g - pB.g) + Math.abs(pA.b - pB.b);
        }
        const hasH2 = (hSeam2 / ((w - 80) / 10)) > 70;

        for (let y = 40; y < h - 40; y += 10) {
          const pA = getPix(midX - 20, y);
          const pB = getPix(midX + 20, y);
          vSeam2 += Math.abs(pA.r - pB.r) + Math.abs(pA.g - pB.g) + Math.abs(pA.b - pB.b);
        }
        const hasV2 = (vSeam2 / ((h - 80) / 10)) > 70;

        for (let y = 40; y < h - 40; y += 10) {
          const pA1 = getPix(x3_1 - 20, y);
          const pB1 = getPix(x3_1 + 20, y);
          const pA2 = getPix(x3_2 - 20, y);
          const pB2 = getPix(x3_2 + 20, y);
          vSeam3 += Math.abs(pA1.r - pB1.r) + Math.abs(pA1.g - pB1.g) + Math.abs(pA1.b - pB1.b);
          vSeam3 += Math.abs(pA2.r - pB2.r) + Math.abs(pA2.g - pB2.g) + Math.abs(pA2.b - pB2.b);
        }
        const hasV3 = (vSeam3 / ((h - 80) / 10)) > 140;

        for (let x = 40; x < w - 40; x += 10) {
          const pA1 = getPix(x, y3_1 - 20);
          const pB1 = getPix(x, y3_1 + 20);
          const pA2 = getPix(x, y3_2 - 20);
          const pB2 = getPix(x, y3_2 + 20);
          hSeam3 += Math.abs(pA1.r - pB1.r) + Math.abs(pA1.g - pB1.g) + Math.abs(pA1.b - pB1.b);
          hSeam3 += Math.abs(pA2.r - pB2.r) + Math.abs(pA2.g - pB2.g) + Math.abs(pA2.b - pB2.b);
        }
        const hasH3 = (hSeam3 / ((w - 80) / 10)) > 140;

        let layoutType = "single";
        let targetBox = { x: 0, y: 0, width: w, height: h };

        if (hasH2 && hasV3) {
          layoutType = "grid-3x2";
          targetBox = { x: 0, y: 0, width: Math.floor(w / 3), height: Math.floor(h / 2) };
        } else if (hasH3 && hasV2) {
          layoutType = "grid-2x3";
          targetBox = { x: 0, y: 0, width: Math.floor(w / 2), height: Math.floor(h / 3) };
        } else if (hasH2 && hasV2) {
          layoutType = "grid-2x2";
          targetBox = { x: 0, y: 0, width: Math.floor(w / 2), height: Math.floor(h / 2) };
        } else if (hasH2) {
          layoutType = "split-1x2";
          targetBox = { x: 0, y: 0, width: w, height: Math.floor(h / 2) };
        } else if (hasV2) {
          layoutType = "split-2x1";
          targetBox = { x: 0, y: 0, width: Math.floor(w / 2), height: h };
        }

        // Sample corners of the primary target box
        const cornerSamplePoints = [
          getPix(targetBox.x + 12, targetBox.y + 12),
          getPix(targetBox.x + targetBox.width - 12, targetBox.y + 12),
          getPix(targetBox.x + 12, targetBox.y + targetBox.height - 12),
          getPix(targetBox.x + targetBox.width - 12, targetBox.y + targetBox.height - 12)
        ];
        const rSort = cornerSamplePoints.map(p => p.r).sort((a, b) => a - b);
        const gSort = cornerSamplePoints.map(p => p.g).sort((a, b) => a - b);
        const bSort = cornerSamplePoints.map(p => p.b).sort((a, b) => a - b);
        const bg = { r: rSort[1], g: gSort[1], b: bSort[1] };

        // Find foreground bounding box
        let minX = targetBox.x + targetBox.width, maxX = targetBox.x;
        let minY = targetBox.y + targetBox.height, maxY = targetBox.y;
        let fgR = 0, fgG = 0, fgB = 0, fgCount = 0;
        const threshold = this.knockoutThreshold;

        for (let y = targetBox.y + 8; y < targetBox.y + targetBox.height - 8; y += 2) {
          for (let x = targetBox.x + 8; x < targetBox.x + targetBox.width - 8; x += 2) {
            const p = getPix(x, y);
            const dist = Math.sqrt((p.r - bg.r) ** 2 + (p.g - bg.g) ** 2 + (p.b - bg.b) ** 2);
            if (dist > threshold) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
              fgR += p.r; fgG += p.g; fgB += p.b; fgCount++;
            }
          }
        }

        if (maxX <= minX || maxY <= minY) {
          minX = targetBox.x; minY = targetBox.y;
          maxX = targetBox.x + targetBox.width; maxY = targetBox.y + targetBox.height;
        }

        const pad = 12;
        const cropX = Math.max(targetBox.x, minX - pad);
        const cropY = Math.max(targetBox.y, minY - pad);
        const cropW = Math.min(targetBox.width - (cropX - targetBox.x), (maxX - minX) + pad * 2);
        const cropH = Math.min(targetBox.height - (cropY - targetBox.y), (maxY - minY) + pad * 2);

        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = cropW;
        cropCanvas.height = cropH;
        const cCtx = cropCanvas.getContext("2d");
        cCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        const cropData = cCtx.getImageData(0, 0, cropW, cropH);
        const d = cropData.data;
        const ramp = 12;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          const dist = Math.sqrt((r - bg.r) ** 2 + (g - bg.g) ** 2 + (b - bg.b) ** 2);
          if (dist <= threshold - ramp) {
            d[i + 3] = 0;
          } else if (dist >= threshold + ramp) {
            d[i + 3] = 255;
          } else {
            const t = (dist - (threshold - ramp)) / (ramp * 2);
            d[i + 3] = Math.round(255 * (t * t * (3 - 2 * t)));
          }
        }

        cCtx.putImageData(cropData, 0, 0);

        const dominantFg = fgCount > 0 ? {
          r: Math.round(fgR / fgCount),
          g: Math.round(fgG / fgCount),
          b: Math.round(fgB / fgCount)
        } : { r: 229, g: 192, b: 123 };

        const result = {
          trimmedDataUrl: cropCanvas.toDataURL("image/png"),
          originalDataUrl: item.image,
          svgUrl: `assets/vectors/${item.id}.svg`,
          width: cropW,
          height: cropH,
          aspectRatio: +(cropW / cropH).toFixed(4),
          bg,
          dominantFg,
          layout: layoutType
        };

        this.cache.set(`${item.id}_${this.knockoutThreshold}`, result);
        resolve(result);
      };

      img.onerror = () => {
        resolve();
      };

      img.src = item.image;
    });
  }

  getActiveMarkData() {
    if (!this.currentMark) return null;
    const cacheKey = `${this.currentMark.id}_${this.knockoutThreshold}`;
    return this.cache.get(cacheKey) || {
      trimmedDataUrl: this.currentMark.image,
      originalDataUrl: this.currentMark.image,
      aspectRatio: 1,
      dominantFg: { r: 229, g: 192, b: 123 },
      layout: "single"
    };
  }

  // ===========================================================================
  // WCAG Contrast Ratio Calculator
  // ===========================================================================
  calculateContrast(fg, bg) {
    const sRGB = (val) => {
      const v = val / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };

    const l1 = 0.2126 * sRGB(fg.r) + 0.7152 * sRGB(fg.g) + 0.0722 * sRGB(fg.b);
    const l2 = 0.2126 * sRGB(bg.r) + 0.7152 * sRGB(bg.g) + 0.0722 * sRGB(bg.b);

    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return +ratio.toFixed(2);
  }

  getSurfaceBgRgb(surfaceIndex) {
    switch (surfaceIndex) {
      case 0: return { r: 247, g: 245, b: 240 }; // Cotton Card (Off-white)
      case 1: return this.surfaceVariants[1] === "ecru" ? { r: 236, g: 232, b: 223 } : { r: 17, g: 18, b: 22 };
      case 2: return this.surfaceVariants[2] === "white" ? { r: 240, g: 240, b: 242 } : { r: 24, g: 25, b: 32 };
      case 3: return { r: 43, g: 44, b: 49 }; // Frosted Glass / Concrete
      case 4: return this.surfaceVariants[4] === "cognac" ? { r: 74, g: 40, b: 20 } : { r: 20, g: 20, b: 24 };
      case 5: return this.surfaceVariants[5] === "silver" ? { r: 207, g: 211, b: 218 } : { r: 36, g: 39, b: 48 };
      case 6: return { r: 15, g: 16, b: 21 }; // Packaging Box Lid
      case 7: return this.surfaceVariants[7] === "light" ? { r: 245, g: 245, b: 247 } : { r: 9, g: 10, b: 15 };
      case 8: return this.surfaceVariants[8] === "acrylic" ? { r: 250, g: 250, b: 252 } : { r: 8, g: 8, b: 12 };
      case 9: return { r: 11, g: 12, b: 16 }; // Storefront Window
      default: return { r: 15, g: 16, b: 21 };
    }
  }

  // ===========================================================================
  // Physical Finish CSS Filters & Styling
  // ===========================================================================
  getFinishStyle() {
    const rad = (this.lightAngle * Math.PI) / 180;
    const dx = Math.round(Math.cos(rad) * 4);
    const dy = Math.round(Math.sin(rad) * 4);

    switch (this.currentFinish) {
      case "spot_uv":
        return `filter: drop-shadow(${dx}px ${dy}px 3px rgba(0,0,0,0.65)) drop-shadow(0 0 10px rgba(255,255,255,0.45));`;
      case "gold_foil":
        return `filter: drop-shadow(${dx}px ${dy}px 2px rgba(0,0,0,0.85)) drop-shadow(0 0 8px rgba(201,160,80,0.75)) sepia(1) saturate(5) hue-rotate(5deg);`;
      case "silver_foil":
        return `filter: drop-shadow(${dx}px ${dy}px 2px rgba(0,0,0,0.8)) drop-shadow(0 0 8px rgba(220,225,235,0.75)) grayscale(1) brightness(1.2);`;
      case "blind_deboss":
        return `filter: drop-shadow(${dx}px ${dy}px 2px rgba(0,0,0,0.85)) drop-shadow(${-dx}px ${-dy}px 2px rgba(255,255,255,0.45)); opacity: 0.92;`;
      case "backlit_glow":
        return `filter: drop-shadow(0 0 2px rgba(255,255,255,0.95)) drop-shadow(0 0 10px rgba(229,192,123,0.85)) drop-shadow(0 0 28px rgba(229,192,123,0.5));`;
      case "original":
      default:
        return "";
    }
  }

  // ===========================================================================
  // Master Render Engine (Produces HTML for Active Surface)
  // ===========================================================================
  render() {
    const container = document.getElementById("surfaceStageViewport");
    if (!container) return;

    const data = this.getActiveMarkData();
    if (!data) return;

    const src = this.isIsolated ? data.trimmedDataUrl : data.originalDataUrl;
    const finishStyle = this.getFinishStyle();
    const scaleStyle = `transform: scale(${this.logoScale});`;

    let html = "";
    const idx = this.currentSurfaceIndex;

    switch (idx) {
      // 01. Cotton Card 600gsm
      case 0:
        html = `
          <div class="stage-surface-01">
            <div class="plinth-cotton-card">
              <img src="${src}" alt="Cotton Card Plinth" class="stage-mark-element finish-${this.currentFinish}" style="${scaleStyle} ${finishStyle}">
            </div>
          </div>
        `;
        break;

      // 02. Heavyweight Apparel 280gsm
      case 1: {
        const isEcru = this.surfaceVariants[1] === "ecru";
        html = `
          <div class="stage-surface-02">
            <div class="plinth-apparel ${isEcru ? "variant-ecru" : ""}">
              <img src="${src}" alt="Apparel Print" class="stage-mark-element finish-${this.currentFinish}" style="${scaleStyle} ${finishStyle}">
            </div>
          </div>
        `;
        break;
      }

      // 03. Matte Ceramic Cylinder
      case 2: {
        const isWhite = this.surfaceVariants[2] === "white";
        html = `
          <div class="stage-surface-03">
            <div class="plinth-ceramic-cylinder ${isWhite ? "variant-white" : ""}">
              <div class="cylinder-rim-top"></div>
              <div class="ceramic-mark-wrapper">
                <img src="${src}" alt="Ceramic Projection" class="stage-mark-element finish-${this.currentFinish}" style="${scaleStyle} ${finishStyle}">
              </div>
            </div>
          </div>
        `;
        break;
      }

      // 04. Frosted Glass Wall Sign
      case 3: {
        const rad = (this.lightAngle * Math.PI) / 180;
        const dx = Math.round(Math.cos(rad) * 18);
        const dy = Math.round(Math.sin(rad) * 18);
        html = `
          <div class="stage-surface-04">
            <div class="glass-sign-assembly">
              <div class="glass-wall-shadow" style="transform: translate(${dx}px, ${dy}px);">
                <img src="${src}" alt="Wall Shadow" class="stage-mark-element" style="${scaleStyle}">
              </div>
              <div class="plinth-frosted-glass">
                <div class="glass-standoff standoff-tl"></div>
                <div class="glass-standoff standoff-tr"></div>
                <div class="glass-standoff standoff-bl"></div>
                <div class="glass-standoff standoff-br"></div>
                <img src="${src}" alt="Frosted Glass Surface" class="stage-mark-element finish-${this.currentFinish}" style="${scaleStyle} ${finishStyle}">
              </div>
            </div>
          </div>
        `;
        break;
      }

      // 05. Full-Grain Leather Folio
      case 4: {
        const isCognac = this.surfaceVariants[4] === "cognac";
        html = `
          <div class="stage-surface-05">
            <div class="plinth-leather ${isCognac ? "variant-cognac" : ""}">
              <img src="${src}" alt="Leather Deboss" class="stage-mark-element finish-${this.currentFinish}" style="${scaleStyle} ${finishStyle}">
            </div>
          </div>
        `;
        break;
      }

      // 06. Brushed Anodized Metal
      case 5: {
        const isSilver = this.surfaceVariants[5] === "silver";
        html = `
          <div class="stage-surface-06">
            <div class="plinth-metal ${isSilver ? "variant-silver" : ""}">
              <img src="${src}" alt="Brushed Metal Print" class="stage-mark-element finish-${this.currentFinish}" style="${scaleStyle} ${finishStyle}">
            </div>
          </div>
        `;
        break;
      }

      // 07. Rigid Luxury Packaging
      case 6:
        html = `
          <div class="stage-surface-07">
            <div class="isometric-box-assembly">
              <div class="box-lid-plane">
                <img src="${src}" alt="Luxury Box Lid" class="stage-mark-element finish-${this.currentFinish}" style="${scaleStyle} ${finishStyle}">
              </div>
            </div>
          </div>
        `;
        break;

      // 08. Digital OS & Favicon Grid (Scale Test)
      case 7: {
        const isLight = this.surfaceVariants[7] === "light";
        html = `
          <div class="stage-surface-08 ${isLight ? "variant-light" : ""}">
            <div class="os-grid-assembly">
              <div class="os-frame-card">
                <span class="os-frame-label">APP ICON 512px (SQUIRCLE)</span>
                <div class="os-squircle-preview">
                  <img src="${src}" alt="512px App Icon" class="stage-mark-element finish-${this.currentFinish}" style="max-height: 80px; ${finishStyle}">
                </div>
              </div>
              <div class="os-stack-column">
                <div class="os-frame-card">
                  <span class="os-frame-label">NAVBAR HEADER 48px</span>
                  <div class="os-navbar-simulation">
                    <img src="${src}" alt="Navbar Header" class="stage-mark-element" style="height: 26px; width: auto; ${finishStyle}">
                    <div class="os-nav-url-pill">crimadezignz.originzero.art</div>
                  </div>
                </div>
                <div class="os-frame-card">
                  <span class="os-frame-label">SYSTEM TRAY 24px & BROWSER TAB 16px</span>
                  <div style="display: flex; gap: 12px; width: 100%;">
                    <div class="os-tab-simulation">
                      <img src="${src}" alt="16px Favicon" style="width: 16px; height: 16px; object-fit: contain;">
                      <span>CrimaDezignz®</span>
                    </div>
                    <div class="os-tray-simulation" style="flex: 1;">
                      <img src="${src}" alt="24px Tray" style="height: 18px; width: auto;">
                      <span>100% | 23:42</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      }

      // 09. Illuminated Night Blade Sign
      case 8: {
        const isAcrylic = this.surfaceVariants[8] === "acrylic";
        html = `
          <div class="stage-surface-09">
            <div class="blade-sign-assembly">
              <div class="blade-wall-bracket"></div>
              <div class="blade-sign-plinth ${isAcrylic ? "variant-lit-acrylic" : ""}">
                <img src="${src}" alt="Illuminated Blade Sign" class="stage-mark-element photometric-lit-logo finish-${this.currentFinish}" style="${scaleStyle} ${finishStyle}">
              </div>
            </div>
          </div>
        `;
        break;
      }

      // 10. Storefront Window Vinyl
      case 9: {
        const isEtched = this.surfaceVariants[9] === "etched";
        html = `
          <div class="stage-surface-10">
            <div class="storefront-window-plinth ${isEtched ? "variant-etched" : ""}">
              <div class="window-glass-glare"></div>
              <div class="window-glass-refraction">
                <img src="${src}" alt="Glass Refraction" class="stage-mark-element" style="${scaleStyle}">
              </div>
              <div class="window-mark-primary">
                <img src="${src}" alt="Window Vinyl Decal" class="stage-mark-element finish-${this.currentFinish}" style="${scaleStyle} ${finishStyle}">
              </div>
            </div>
          </div>
        `;
        break;
      }
    }

    container.innerHTML = html;
    this.updateDockUI();
  }

  // ===========================================================================
  // Dock Telemetry & Controls Synchronization (2-Tier Figma Workstation)
  // ===========================================================================
  updateDockUI() {
    const s = this.surfaces[this.currentSurfaceIndex];
    const f = this.finishes.find(x => x.id === this.currentFinish) || this.finishes[0];
    const data = this.getActiveMarkData();

    // Telemetry Update
    const surfaceNameEl = document.getElementById("dockSurfaceName");
    const finishNameEl = document.getElementById("dockFinishName");
    const contrastValEl = document.getElementById("dockContrastVal");
    const wcagBadgeEl = document.getElementById("dockWcagBadge");
    const markStatusEl = document.getElementById("dockMarkStatus");

    if (surfaceNameEl) surfaceNameEl.textContent = `${s.id} ${s.name.toUpperCase()}`;
    if (finishNameEl) finishNameEl.textContent = f.name.toUpperCase();

    if (contrastValEl && wcagBadgeEl && data) {
      const surfaceBg = this.getSurfaceBgRgb(this.currentSurfaceIndex);
      const ratio = this.calculateContrast(data.dominantFg, surfaceBg);
      contrastValEl.textContent = `${ratio}:1`;

      if (ratio >= 7.0) {
        wcagBadgeEl.textContent = "AAA";
        wcagBadgeEl.style.color = "#50fa7b";
      } else if (ratio >= 4.5) {
        wcagBadgeEl.textContent = "AA";
        wcagBadgeEl.style.color = "#dfba68";
      } else {
        wcagBadgeEl.textContent = "FAIL";
        wcagBadgeEl.style.color = "#ff5555";
      }
    }

    if (markStatusEl && data) {
      if (this.isIsolated) {
        const layoutDesc = data.layout && data.layout !== "single" ? ` (${data.layout.toUpperCase()} HERO CELL)` : "";
        markStatusEl.textContent = `ISOLATED LOGO${layoutDesc}`;
      } else {
        markStatusEl.textContent = "FULL PRESENTATION SHEET";
      }
    }

    // Surface Ribbon Active State
    document.querySelectorAll(".stage-surface-btn").forEach((btn, idx) => {
      btn.classList.toggle("active", idx === this.currentSurfaceIndex);
    });

    // Finish Chips Active State
    document.querySelectorAll(".stage-finish-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-finish") === this.currentFinish);
    });

    // Sliders Readout
    const angleReadout = document.getElementById("stageAngleVal");
    if (angleReadout) angleReadout.textContent = `${this.lightAngle}°`;

    const scaleReadout = document.getElementById("stageScaleVal");
    if (scaleReadout) scaleReadout.textContent = `${Math.round(this.logoScale * 100)}%`;

    // Variant Button Visibility & Label
    const variantBtn = document.getElementById("stageVariantBtn");
    const variantText = document.getElementById("stageVariantText");
    if (variantBtn) {
      if (s.hasVariant) {
        variantBtn.style.display = "inline-flex";
        if (variantText) {
          variantText.textContent = `V: ${s.variantLabel.toUpperCase()}`;
        } else {
          variantBtn.textContent = `VARIANT: ${s.variantLabel.toUpperCase()}`;
        }
      } else {
        variantBtn.style.display = "none";
      }
    }

    // Segmented Mark Toggle Buttons
    const isoBtn = document.getElementById("markModeIsolatedBtn");
    const fullBtn = document.getElementById("markModeFullBtn");
    if (isoBtn) isoBtn.classList.toggle("active", this.isIsolated);
    if (fullBtn) fullBtn.classList.toggle("active", !this.isIsolated);

    // Backward-compatible knockout button
    const knockoutBtn = document.getElementById("stageKnockoutBtn");
    if (knockoutBtn) {
      knockoutBtn.textContent = this.isIsolated ? "ISOLATED MARK [ON]" : "ORIGINAL CARD [OFF]";
      knockoutBtn.classList.toggle("active", this.isIsolated);
    }
  }

  // ===========================================================================
  // Interactive Operations
  // ===========================================================================
  selectSurface(index) {
    if (index < 0 || index >= this.surfaces.length) return;
    this.currentSurfaceIndex = index;
    this.render();
  }

  selectFinish(finishId) {
    this.currentFinish = finishId;
    this.render();
  }

  setLightAngle(angle) {
    this.lightAngle = parseInt(angle, 10);
    this.render();
  }

  setLogoScale(scale) {
    this.logoScale = parseFloat(scale);
    this.render();
  }

  setMarkMode(mode) {
    this.isIsolated = (mode === "isolated");
    this.render();
  }

  toggleKnockout() {
    this.isIsolated = !this.isIsolated;
    this.render();
  }

  toggleVariant() {
    const idx = this.currentSurfaceIndex;
    if (idx === 1) this.surfaceVariants[1] = this.surfaceVariants[1] === "black" ? "ecru" : "black";
    else if (idx === 2) this.surfaceVariants[2] = this.surfaceVariants[2] === "dark" ? "white" : "dark";
    else if (idx === 4) this.surfaceVariants[4] = this.surfaceVariants[4] === "black" ? "cognac" : "black";
    else if (idx === 5) this.surfaceVariants[5] = this.surfaceVariants[5] === "gunmetal" ? "silver" : "gunmetal";
    else if (idx === 7) this.surfaceVariants[7] = this.surfaceVariants[7] === "dark" ? "light" : "dark";
    else if (idx === 8) this.surfaceVariants[8] = this.surfaceVariants[8] === "stencil" ? "acrylic" : "stencil";
    else if (idx === 9) this.surfaceVariants[9] = this.surfaceVariants[9] === "gloss" ? "etched" : "gloss";

    this.render();
  }

  // ===========================================================================
  // High-Resolution 2400x1800 Local PNG Export
  // ===========================================================================
  exportHighResPNG() {
    if (!this.currentMark) return;

    const exportW = 2400;
    const exportH = 1800;
    const canvas = document.createElement("canvas");
    canvas.width = exportW;
    canvas.height = exportH;
    const ctx = canvas.getContext("2d");

    // 1. Draw Surface Studio Background
    const bgGrad = ctx.createRadialGradient(exportW / 2, exportH / 2, 100, exportW / 2, exportH / 2, exportW * 0.7);
    bgGrad.addColorStop(0, "#15161c");
    bgGrad.addColorStop(1, "#050507");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, exportW, exportH);

    // 2. Draw Simulated Plinth
    const plinthW = 1600;
    const plinthH = 1000;
    const px = (exportW - plinthW) / 2;
    const py = (exportH - plinthH) / 2;

    const surfaceBg = this.getSurfaceBgRgb(this.currentSurfaceIndex);
    ctx.fillStyle = `rgb(${surfaceBg.r}, ${surfaceBg.g}, ${surfaceBg.b})`;
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 80;
    ctx.shadowOffsetY = 40;
    ctx.fillRect(px, py, plinthW, plinthH);
    ctx.shadowColor = "transparent";

    // 3. Draw Plinth Inner Bevel Highlight
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    ctx.strokeRect(px, py, plinthW, plinthH);

    // 4. Draw Logo Mark
    const data = this.getActiveMarkData();
    const markImg = new Image();
    markImg.crossOrigin = "anonymous";
    markImg.onload = () => {
      const mw = (plinthW * 0.6) * this.logoScale;
      const mh = (mw / (data.aspectRatio || 1));
      const mx = (exportW - mw) / 2;
      const my = (exportH - mh) / 2;

      ctx.drawImage(markImg, mx, my, mw, mh);

      // 5. Watermark / OriginZero Technical Attribution
      ctx.fillStyle = "#c9a050";
      ctx.font = "bold 24px monospace";
      ctx.fillText(`CrimaDezignz® • SURFACE ${this.surfaces[this.currentSurfaceIndex].id} [${this.surfaces[this.currentSurfaceIndex].name}]`, 80, 80);

      ctx.fillStyle = "#8c8c9a";
      ctx.font = "18px monospace";
      const modeLabel = this.isIsolated ? "ISOLATED VECTOR MARK" : "FULL PRESENTATION SHEET";
      ctx.fillText(`MARK: #${this.currentMark.id} - ${this.currentMark.title} | ${modeLabel} | 100% DETERMINISTIC ZERO-AI`, 80, 115);

      // Trigger Instant Download
      const link = document.createElement("a");
      const cleanTitle = (this.currentMark.title || "mark").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      link.download = `crimadezignz-${cleanTitle}-surface-${this.surfaces[this.currentSurfaceIndex].id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    markImg.src = this.isIsolated ? data.trimmedDataUrl : data.originalDataUrl;
  }

  // ===========================================================================
  // DOM Controls Binding
  // ===========================================================================
  bindDomControls() {
    const isoBtn = document.getElementById("markModeIsolatedBtn");
    if (isoBtn) {
      isoBtn.addEventListener("click", () => this.setMarkMode("isolated"));
    }

    const fullBtn = document.getElementById("markModeFullBtn");
    if (fullBtn) {
      fullBtn.addEventListener("click", () => this.setMarkMode("full"));
    }
  }

  // ===========================================================================
  // Keyboard Shortcuts (1-0 for Surfaces, S for Stage Toggle, O for Mark, E for Export)
  // ===========================================================================
  bindKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      const modal = document.getElementById("designModal");
      if (!modal || !modal.classList.contains("open")) return;

      // Ignore if typing in input
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;

      // 1 to 9 -> Surface 0 to 8, 0 -> Surface 9
      if (e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key, 10) - 1;
        this.selectSurface(idx);
      } else if (e.key === "0") {
        this.selectSurface(9);
      } else if (e.key === "s" || e.key === "S") {
        const stageBtn = document.getElementById("viewModeStageBtn");
        const twoDBtn = document.getElementById("viewMode2DBtn");
        if (stageBtn && twoDBtn) {
          if (stageBtn.classList.contains("active")) twoDBtn.click();
          else stageBtn.click();
        }
      } else if (e.key === "v" || e.key === "V") {
        this.toggleVariant();
      } else if (e.key === "o" || e.key === "O") {
        this.toggleKnockout();
      } else if (e.key === "e" || e.key === "E") {
        this.exportHighResPNG();
      }
    });
  }
}

// Global Single Instance
window.SURFACE_STAGE = new LiveSurfaceStageEngine();
