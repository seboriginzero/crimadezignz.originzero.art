#!/usr/bin/env bash
# ==============================================================================
# ORIGINZERO — GITOPS ATOMIC DEPLOY FOR CRIMADEZIGNZ
# Domain: crimadezignz.originzero.art
# Server: Proxmox VM1 Hosting (192.168.57.51)
# Port: 3105 -> 3000
# ==============================================================================
set -euo pipefail

TENANT_DIR="/home/antigravity/tenants/crimadezignz"
SOURCE_DIR="${TENANT_DIR}/source"
COMPOSE_FILE="${TENANT_DIR}/docker-compose.yml"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🚀 [GitOps Deploy] CrimaDezignz deployment started at ${TIMESTAMP}..."

# 1. Pull latest code from GitHub using dedicated key (if git remote exists)
if [ -d "${SOURCE_DIR}/.git" ]; then
  echo "📥 Pulling latest release from GitHub (origin/main)..."
  cd "${SOURCE_DIR}"
  git fetch origin main || true
  git reset --hard origin/main || true
fi

# 2. Build fresh Docker image
echo "🔨 Building container image originzero-tenant-crimadezignz:latest..."
docker build --no-cache -t originzero-tenant-crimadezignz:latest "${SOURCE_DIR}"

# 3. Copy latest compose file to tenant dir
cp "${SOURCE_DIR}/docker-compose.yml" "${COMPOSE_FILE}"

# 4. Launch container cleanly
echo "🔄 Applying container update..."
cd "${TENANT_DIR}"
docker stop originzero-tenant-crimadezignz 2>/dev/null || true
docker rm -f originzero-tenant-crimadezignz 2>/dev/null || true
sleep 1 && docker compose up -d

# 5. Healthcheck Gate
echo "🩺 Validating container health on port 3105..."
MAX_ATTEMPTS=20
ATTEMPT=0
HEALTHY=false

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  STATUS=$(docker inspect --format '{{.State.Health.Status}}' originzero-tenant-crimadezignz 2>/dev/null || echo "unknown")
  if [ "$STATUS" = "healthy" ]; then
    HEALTHY=true
    break
  fi
  ATTEMPT=$((ATTEMPT + 1))
  sleep 2
done

if [ "$HEALTHY" = true ]; then
  echo "✅ [SUCCESS] originzero-tenant-crimadezignz:latest is HEALTHY! Deployed on port 3105."
  docker image prune -f > /dev/null 2>&1 || true
else
  echo "❌ [ERROR] Container healthcheck failed (Status: $STATUS)!"
  exit 1
fi

