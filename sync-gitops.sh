#!/usr/bin/env bash
set -euo pipefail

TENANT_SLUG="crimadezignz"
CURRENT_OS="$(uname -s)"
CURRENT_ARCH="$(uname -m)"
CURRENT_HOST="$(hostname 2>/dev/null || uname -n)"

if [[ "$CURRENT_ARCH" == "x86_64" ]] && [[ "$CURRENT_OS" == "Linux" ]]; then
  ENV_MODE="PROXMOX_VM1_DEV_STANDBY"
else
  ENV_MODE="MAC_LOCAL_DEVELOPMENT"
fi

echo "================================================================================"
echo "🚀 ORIGINZERO GITOPS SYNC — Tenant: ${TENANT_SLUG} | Env: ${ENV_MODE} (${CURRENT_HOST})"
echo "   Domain: https://crimadezignz.originzero.art (Port: 3105)"
echo "   Standard: Zero-Local-Copy | Zero .env in Git | Docker Hardened | Let's Encrypt"
echo "================================================================================"

# Poarta 1: Blocare scurgere secrete .env în Git
if git status --porcelain 2>/dev/null | grep -E '(^|\s)\.env($|\.)' | grep -v '\.env\.example'; then
  echo "❌ [BLOCAT] S-a detectat un fișier .env în Git! Adaugă-l în .gitignore."
  exit 1
fi

if [[ "$ENV_MODE" == "MAC_LOCAL_DEVELOPMENT" ]]; then
  echo "✅ [Mac Dev] GitOps checks passed. Run: git push origin main"
else
  exec ./deploy-gitops.sh
fi
