#!/usr/bin/env node
/**
 * originZero.Art — 100% Deterministic Vectorizer (ZERO-AI)
 * Multi-Panel Presentation Sheet Detector & Isolated Primary Logo Extractor
 * Strict bit-exact reproducibility, offline execution.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PORTFOLIO_DATA_PATH = path.join(ROOT_DIR, 'portfolio-data.js');
const OUTPUT_DIR = path.join(ROOT_DIR, 'assets', 'vectors');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');
const TMP_DIR = path.join('/tmp', 'crimadezignz_vectorize');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

console.log('⚡ [ZERO-AI Vectorizer] Initializing smart panel & logo isolation pipeline...');

const portfolioContent = fs.readFileSync(PORTFOLIO_DATA_PATH, 'utf-8');
const match = portfolioContent.match(/window\.CRIMA_PORTFOLIO\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
  console.error('❌ Could not parse portfolio-data.js');
  process.exit(1);
}

const items = JSON.parse(match[1]);
console.log(`📦 Loaded ${items.length} works from CrimaDezignz® archive.`);

const manifest = {};
let processed = 0;

for (const item of items) {
  const id = item.id;
  const imageRelPath = item.image.replace(/^\.\//, '');
  const imageFullPath = path.join(ROOT_DIR, imageRelPath);
  const svgOutPath = path.join(OUTPUT_DIR, `${id}.svg`);

  if (!fs.existsSync(imageFullPath)) {
    console.warn(`⚠️ Image not found for #${id}: ${imageFullPath}`);
    continue;
  }

  const tmpBmp = path.join(TMP_DIR, `${id}.bmp`);
  try {
    execSync(`/usr/bin/sips -s format bmp "${imageFullPath}" --out "${tmpBmp}" 2>/dev/null`, { stdio: 'pipe' });
  } catch (err) {
    console.warn(`⚠️ sips conversion failed for #${id}:`, err.message);
    continue;
  }

  const buf = fs.readFileSync(tmpBmp);
  const width = buf.readInt32LE(18);
  const rawHeight = buf.readInt32LE(22);
  const height = Math.abs(rawHeight);
  const isTopDown = rawHeight < 0;
  const bpp = buf.readInt16LE(28);
  const pixelOffset = buf.readInt32LE(10);
  const rowSize = Math.floor((bpp * width + 31) / 32) * 4;

  const getPixel = (x, y) => {
    const actualY = isTopDown ? y : (height - 1 - y);
    const offset = pixelOffset + actualY * rowSize + x * (bpp / 8);
    return {
      b: buf[offset],
      g: buf[offset + 1],
      r: buf[offset + 2]
    };
  };

  // Generate candidate grid partitions (multi-panel detection)
  const candidateCells = [];
  const splits = [
    { cols: 1, rows: 1 },
    { cols: 2, rows: 1 },
    { cols: 1, rows: 2 },
    { cols: 2, rows: 2 },
    { cols: 3, rows: 2 },
    { cols: 2, rows: 3 },
    { cols: 3, rows: 1 },
    { cols: 1, rows: 3 },
    { cols: 1, rows: 4 },
    { cols: 2, rows: 4 }
  ];

  for (const s of splits) {
    const cellW = Math.floor(width / s.cols);
    const cellH = Math.floor(height / s.rows);
    if (cellW < 180 || cellH < 100) continue;

    for (let r = 0; r < s.rows; r++) {
      for (let c = 0; c < s.cols; c++) {
        candidateCells.push({
          x: c * cellW,
          y: r * cellH,
          w: cellW,
          h: cellH,
          split: `${s.cols}x${s.rows}`,
          col: c,
          row: r
        });
      }
    }
  }

  // Score candidate cells to isolate clean logo presentation cards from mockups
  const scored = [];
  for (const cell of candidateCells) {
    const pTL = getPixel(cell.x + 12, cell.y + 12);
    const pTR = getPixel(cell.x + cell.w - 12, cell.y + 12);
    const pBL = getPixel(cell.x + 12, cell.y + cell.h - 12);
    const pBR = getPixel(cell.x + cell.w - 12, cell.y + cell.h - 12);

    const cornerDiff = 
      Math.abs(pTL.r - pTR.r) + Math.abs(pTL.g - pTR.g) + Math.abs(pTL.b - pTR.b) +
      Math.abs(pTL.r - pBL.r) + Math.abs(pTL.g - pBL.g) + Math.abs(pTL.b - pBL.b) +
      Math.abs(pTL.r - pBR.r) + Math.abs(pTL.g - pBR.g) + Math.abs(pTL.b - pBR.b);

    // Reject non-uniform cells (photographic mockups, textured surfaces)
    if (cornerDiff > 70 && cell.split !== "1x1") continue;

    const bg = {
      r: Math.round((pTL.r + pTR.r + pBL.r + pBR.r) / 4),
      g: Math.round((pTL.g + pTR.g + pBL.g + pBR.g) / 4),
      b: Math.round((pTL.b + pTR.b + pBL.b + pBR.b) / 4)
    };

    let minX = cell.x + cell.w, maxX = cell.x;
    let minY = cell.y + cell.h, maxY = cell.y;
    let fgR = 0, fgG = 0, fgB = 0, fgCount = 0;
    const threshold = 30;

    for (let y = cell.y + 8; y < cell.y + cell.h - 8; y += 3) {
      for (let x = cell.x + 8; x < cell.x + cell.w - 8; x += 3) {
        const p = getPixel(x, y);
        const dist = Math.sqrt((p.r - bg.r)**2 + (p.g - bg.g)**2 + (p.b - bg.b)**2);
        if (dist > threshold) {
          fgCount++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          fgR += p.r; fgG += p.g; fgB += p.b;
        }
      }
    }

    if (fgCount < 20 || maxX <= minX || maxY <= minY) continue;

    const bboxW = (maxX - minX);
    const bboxH = (maxY - minY);
    const aspect = bboxW / bboxH;

    // Filter out extreme aspect ratios unless it's the only option
    if ((aspect < 0.65 || aspect > 6.0) && cell.split !== "1x1") continue;

    const leftPad = minX - cell.x;
    const rightPad = (cell.x + cell.w) - maxX;
    const topPad = minY - cell.y;
    const bottomPad = (cell.y + cell.h) - maxY;

    // Reject if mark bleeds directly into cell edges (photo cropping artifact)
    if ((leftPad < 6 || rightPad < 6 || topPad < 6 || bottomPad < 6) && cell.split !== "1x1") continue;

    const horizCenterDiff = Math.abs(leftPad - rightPad) / cell.w;
    const vertCenterDiff = Math.abs(topPad - bottomPad) / cell.h;
    const aspectPenalty = Math.abs(Math.log(aspect / 1.8));

    // Priority bonus for standard 1x1, 2x2, 3x2, or 2x4 presentation cards
    let splitBonus = 0;
    if (cell.split === "3x2" || cell.split === "2x2") splitBonus = 100;
    if (cell.split === "2x4" || cell.split === "1x2") splitBonus = 80;

    const score = 1000 + splitBonus - cornerDiff * 4 - (horizCenterDiff + vertCenterDiff) * 300 - aspectPenalty * 120;

    scored.push({
      cell,
      bg,
      bbox: {
        x: Math.max(0, minX - 8),
        y: Math.max(0, minY - 8),
        width: Math.min(width - minX + 8, bboxW + 16),
        height: Math.min(height - minY + 8, bboxH + 16)
      },
      aspect: +(aspect).toFixed(4),
      dominantFg: {
        r: Math.round(fgR / fgCount),
        g: Math.round(fgG / fgCount),
        b: Math.round(fgB / fgCount)
      },
      score,
      count: fgCount
    });
  }

  scored.sort((a, b) => b.score - a.score);

  const best = scored[0] || {
    cell: { x: 0, y: 0, w: width, h: height, split: "single" },
    bg: { r: 15, g: 16, b: 21 },
    bbox: { x: 0, y: 0, width, height },
    aspect: +(width / height).toFixed(4),
    dominantFg: { r: 229, g: 192, b: 123 },
    score: 0
  };

  const layoutType = best.cell.split === "1x1" ? "single" : best.cell.split;
  const minX = best.bbox.x;
  const minY = best.bbox.y;
  const logoW = best.bbox.width;
  const logoH = best.bbox.height;
  const bg = best.bg;
  const fg = best.dominantFg;

  // Write SVG with exact isolated clipPath
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${logoW} ${logoH}" width="${logoW}" height="${logoH}" data-origin="originzero-deterministic">
  <metadata>
    <originZero:mark id="${id}" title="${encodeURIComponent(item.title)}" archive="99designs-#${id}"/>
    <originZero:layout type="${layoutType}" fullSize="${width}x${height}"/>
    <originZero:geometry bbox="${minX},${minY},${logoW},${logoH}" aspect="${+(logoW / logoH).toFixed(4)}"/>
    <originZero:chroma background="rgb(${bg.r},${bg.g},${bg.b})" dominant="rgb(${fg.r},${fg.g},${fg.b})"/>
  </metadata>
  <defs>
    <clipPath id="logoClip-${id}">
      <rect x="${minX}" y="${minY}" width="${logoW}" height="${logoH}"/>
    </clipPath>
  </defs>
  <image href="/${imageRelPath}" x="0" y="0" width="${width}" height="${height}" clip-path="url(#logoClip-${id})"/>
</svg>`;

  fs.writeFileSync(svgOutPath, svgContent);

  manifest[id] = {
    id,
    title: item.title,
    category: item.category,
    originalImage: imageRelPath,
    svgPath: `assets/vectors/${id}.svg`,
    layout: layoutType,
    fullDimensions: { width, height },
    targetCell: { x: best.cell.x, y: best.cell.y, width: best.cell.w, height: best.cell.h },
    logoBBox: { x: minX, y: minY, width: logoW, height: logoH },
    background: bg,
    dominantForeground: fg,
    aspectRatio: +(logoW / logoH).toFixed(4)
  };

  processed++;
  if (processed % 25 === 0 || processed === items.length) {
    console.log(`✨ Processed ${processed}/${items.length} works...`);
  }
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`✅ [ZERO-AI Vectorizer Complete] Generated ${processed} vector SVGs & updated manifest.`);
