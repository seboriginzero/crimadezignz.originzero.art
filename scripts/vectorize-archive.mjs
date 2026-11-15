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

  // 1. Detect Seams & Multi-Panel Grids
  const midY = Math.floor(height / 2);
  const midX = Math.floor(width / 2);

  // Horizontal seam at h/2
  let hSeam = 0;
  for (let x = 40; x < width - 40; x += 20) {
    const pA = getPixel(x, midY - 20);
    const pB = getPixel(x, midY + 20);
    hSeam += Math.abs(pA.r - pB.r) + Math.abs(pA.g - pB.g) + Math.abs(pA.b - pB.b);
  }
  const hasH2 = (hSeam / ((width - 80) / 20)) > 140;

  // Vertical seams at w/3 and 2w/3
  const x3_1 = Math.floor(width / 3);
  const x3_2 = Math.floor((2 * width) / 3);
  let vSeam3 = 0;
  for (let y = 40; y < height - 40; y += 20) {
    const pL1 = getPixel(x3_1 - 20, y);
    const pR1 = getPixel(x3_1 + 20, y);
    const pL2 = getPixel(x3_2 - 20, y);
    const pR2 = getPixel(x3_2 + 20, y);
    vSeam3 += Math.abs(pL1.r - pR1.r) + Math.abs(pL1.g - pR1.g) + Math.abs(pL1.b - pR1.b);
    vSeam3 += Math.abs(pL2.r - pR2.r) + Math.abs(pL2.g - pR2.g) + Math.abs(pL2.b - pR2.b);
  }
  const hasV3 = (vSeam3 / ((height - 80) / 10)) > 140;

  // Vertical seam at w/2
  let vSeam2 = 0;
  for (let y = 40; y < height - 40; y += 20) {
    const pL = getPixel(midX - 20, y);
    const pR = getPixel(midX + 20, y);
    vSeam2 += Math.abs(pL.r - pR.r) + Math.abs(pL.g - pR.g) + Math.abs(pL.b - pR.b);
  }
  const hasV2 = (vSeam2 / ((height - 80) / 20)) > 140;

  // Horizontal seams at h/3 and 2h/3
  const y3_1 = Math.floor(height / 3);
  const y3_2 = Math.floor((2 * height) / 3);
  let hSeam3 = 0;
  for (let x = 40; x < width - 40; x += 20) {
    const pA1 = getPixel(x, y3_1 - 20);
    const pB1 = getPixel(x, y3_1 + 20);
    const pA2 = getPixel(x, y3_2 - 20);
    const pB2 = getPixel(x, y3_2 + 20);
    hSeam3 += Math.abs(pA1.r - pB1.r) + Math.abs(pA1.g - pB1.g) + Math.abs(pA1.b - pB1.b);
    hSeam3 += Math.abs(pA2.r - pB2.r) + Math.abs(pA2.g - pB2.g) + Math.abs(pA2.b - pB2.b);
  }
  const hasH3 = (hSeam3 / ((width - 80) / 10)) > 140;

  let layoutType = "single";
  let targetBox = { x: 0, y: 0, width: width, height: height };

  if (hasH2 && hasV3) {
    layoutType = "grid-3x2";
    targetBox = { x: 0, y: 0, width: Math.floor(width / 3), height: Math.floor(height / 2) };
  } else if (hasH3 && hasV2) {
    layoutType = "grid-2x3";
    targetBox = { x: 0, y: 0, width: Math.floor(width / 2), height: Math.floor(height / 3) };
  } else if (hasH2 && hasV2) {
    layoutType = "grid-2x2";
    targetBox = { x: 0, y: 0, width: Math.floor(width / 2), height: Math.floor(height / 2) };
  } else if (hasH2) {
    layoutType = "split-1x2";
    targetBox = { x: 0, y: 0, width: width, height: Math.floor(height / 2) };
  } else if (hasV2) {
    layoutType = "split-2x1";
    targetBox = { x: 0, y: 0, width: Math.floor(width / 2), height: height };
  }

  // Sample corners of the primary target box to determine background
  const cornerSamplePoints = [
    getPixel(targetBox.x + 12, targetBox.y + 12),
    getPixel(targetBox.x + targetBox.width - 12, targetBox.y + 12),
    getPixel(targetBox.x + 12, targetBox.y + targetBox.height - 12),
    getPixel(targetBox.x + targetBox.width - 12, targetBox.y + targetBox.height - 12)
  ];
  const rSort = cornerSamplePoints.map(p => p.r).sort((a, b) => a - b);
  const gSort = cornerSamplePoints.map(p => p.g).sort((a, b) => a - b);
  const bSort = cornerSamplePoints.map(p => p.b).sort((a, b) => a - b);
  const bg = { r: rSort[1], g: gSort[1], b: bSort[1] };

  // Scan inside targetBox for the pure isolated logo mark
  let minX = targetBox.x + targetBox.width;
  let maxX = targetBox.x;
  let minY = targetBox.y + targetBox.height;
  let maxY = targetBox.y;
  let fgR = 0, fgG = 0, fgB = 0, fgCount = 0;
  const threshold = 28;

  for (let y = targetBox.y + 8; y < targetBox.y + targetBox.height - 8; y += 2) {
    for (let x = targetBox.x + 8; x < targetBox.x + targetBox.width - 8; x += 2) {
      const p = getPixel(x, y);
      const dist = Math.sqrt((p.r - bg.r) ** 2 + (p.g - bg.g) ** 2 + (p.b - bg.b) ** 2);
      if (dist > threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        fgR += p.r; fgG += gSort[1]; fgB += p.b; fgCount++;
      }
    }
  }

  // Safety fallback if cell was empty or detection missed
  if (maxX <= minX || maxY <= minY) {
    minX = targetBox.x;
    minY = targetBox.y;
    maxX = targetBox.x + targetBox.width;
    maxY = targetBox.y + targetBox.height;
  }

  // Padding
  minX = Math.max(targetBox.x, minX - 6);
  minY = Math.max(targetBox.y, minY - 6);
  maxX = Math.min(targetBox.x + targetBox.width, maxX + 6);
  maxY = Math.min(targetBox.y + targetBox.height, maxY + 6);

  const logoW = maxX - minX;
  const logoH = maxY - minY;

  const fg = fgCount > 0 ? {
    r: Math.round(fgR / fgCount),
    g: Math.round(fgG / fgCount),
    b: Math.round(fgB / fgCount)
  } : { r: 200, g: 160, b: 80 };

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
    targetCell: targetBox,
    logoBBox: { x: minX, y: minY, width: logoW, height: logoH },
    background: bg,
    dominantForeground: fg,
    aspectRatio: +(logoW / logoH).toFixed(4)
  };

  try { fs.unlinkSync(tmpBmp); } catch (_) {}

  processed++;
  if (processed % 25 === 0 || processed === items.length) {
    console.log(`✓ Processed ${processed}/${items.length} marks (Latest: #${id}, Layout: ${layoutType}, Logo: ${logoW}x${logoH})...`);
  }
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`\n🎉 [SUCCESS] All ${Object.keys(manifest).length} marks processed with Smart Logo Isolation!`);
