# Multi-stage hardened runner for CrimaDezignz showcase
FROM node:22-alpine AS runner

WORKDIR /app

# Hardening: Run as unprivileged node user (UID 1000)
RUN chown -R node:node /app

# Copy application files
COPY --chown=node:node index.html /app/
COPY --chown=node:node styles.css /app/
COPY --chown=node:node app.js /app/
COPY --chown=node:node portfolio-data.js /app/
COPY --chown=node:node server.js /app/
COPY --chown=node:node favicon.ico /app/
COPY --chown=node:node favicon.svg /app/
COPY --chown=node:node crimadezignz-profile-assets /app/crimadezignz-profile-assets/
COPY --chown=node:node crimadezignz-portfolio /app/crimadezignz-portfolio/

USER node

ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --retries=3 \
  CMD node -e "const http = require('http'); http.get('http://127.0.0.1:3000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1));"

CMD ["node", "server.js"]
