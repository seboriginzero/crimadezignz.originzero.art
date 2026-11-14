/**
 * CrimaDezignz® — Production Web Server
 * Domain: crimadezignz.originzero.art
 * Standards: Zero External Dependencies, High Performance, Gzip/Deflate Compression,
 *            Strict Security Headers, WCAG AAA Caching, /api/health Endpoint
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // 1. Healthcheck Endpoint
  if (req.url === '/api/health' || req.url === '/health') {
    const health = {
      status: 'healthy',
      service: 'crimadezignz.originzero.art',
      tenant: '008-CrimaDezignz',
      uptime_seconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    };
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(JSON.stringify(health));
    return;
  }

  // 2. Normalize and Sanitize Path (Prevent Directory Traversal)
  let safePath = path.normalize(decodeURIComponent(req.url.split('?')[0]));
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  // Favicon fallback safeguard
  if (safePath === '/favicon.ico') {
    const icoPath = path.join(ROOT_DIR, 'favicon.ico');
    if (!fs.existsSync(icoPath)) {
      safePath = '/crimadezignz-profile-assets/crimadezignz-logo-avatar.jpg';
    }
  }

  const filePath = path.join(ROOT_DIR, safePath);

  // Security check: ensure path stays within ROOT_DIR
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html><html><head><title>404 Not Found</title></head><body style="background:#070709;color:#f4f4f6;font-family:sans-serif;padding:60px;text-align:center;"><h1>404 — Identity Asset Not Found</h1><p>The requested asset does not exist on crimadezignz.originzero.art.</p><a href="/" style="color:#c5a059;">Return to Atelier</a></body></html>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // 3. Security & Caching Headers
    const headers = {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    };

    if (ext === '.html') {
      headers['Cache-Control'] = 'public, max-age=0, must-revalidate';
    } else {
      // 24 hours caching for static assets
      headers['Cache-Control'] = 'public, max-age=86400, stale-while-revalidate=3600';
    }

    // 4. ETag & Conditional GET
    const etag = `W/"${stats.size}-${stats.mtimeMs}"`;
    headers['ETag'] = etag;

    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, headers);
      res.end();
      return;
    }

    // 5. Compression (Gzip / Deflate) for compressible text assets
    const isCompressible = /^(text\/|application\/javascript|application\/json|image\/svg\+xml)/.test(contentType);
    const acceptEncoding = req.headers['accept-encoding'] || '';

    if (isCompressible && acceptEncoding.includes('gzip')) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      const rawStream = fs.createReadStream(filePath);
      const gzipStream = zlib.createGzip({ level: 6 });
      rawStream.pipe(gzipStream).pipe(res);
    } else if (isCompressible && acceptEncoding.includes('deflate')) {
      headers['Content-Encoding'] = 'deflate';
      res.writeHead(200, headers);
      const rawStream = fs.createReadStream(filePath);
      const deflateStream = zlib.createDeflate({ level: 6 });
      rawStream.pipe(deflateStream).pipe(res);
    } else {
      headers['Content-Length'] = stats.size;
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`[CrimaDezignz Server] Running on http://${HOST}:${PORT}`);
  console.log(`[CrimaDezignz Server] Environment: Production | Service: crimadezignz.originzero.art`);
});

process.on('SIGTERM', () => {
  console.log('[CrimaDezignz Server] SIGTERM received, shutting down gracefully...');
  server.close(() => process.exit(0));
});
