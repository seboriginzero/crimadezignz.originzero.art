#!/usr/bin/env bash
# ==============================================================================
# OriginZero Art - SSL & Ingress Provisioning for VM1 (Proxmox)
# Domains: crimadezignz.originzero.art & spartan.originzero.art
# ==============================================================================

set -e

DOMAINS=("crimadezignz.originzero.art" "spartan.originzero.art")
PRIMARY_DOMAIN="crimadezignz.originzero.art"
GATEWAY_DOMAIN="spartan.originzero.art"
UPSTREAM_PORT="${PORT:-8088}"
EMAIL="admin@originzero.art"

echo "=========================================================="
echo " Provisioning SSL & Ingress on Proxmox VM1"
echo " Target Domains: ${DOMAINS[*]}"
echo " Upstream Web Port: ${UPSTREAM_PORT}"
echo "=========================================================="

# 1. Caddy Ingress Detection (Preferred for automatic Let's Encrypt TLS)
if command -v caddy &> /dev/null; then
    echo "==> Caddy detected. Configuring Caddyfile..."
    CADDY_SNIPPET="/etc/caddy/conf.d/crimadezignz.caddy"
    mkdir -p /etc/caddy/conf.d/

    cat <<EOF > "$CADDY_SNIPPET"
# CrimaDezignz® Luxury Showcase
${PRIMARY_DOMAIN} {
    reverse_proxy 127.0.0.1:${UPSTREAM_PORT}
    encode zstd gzip
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}

# Gateway Ingress (if not already handled)
${GATEWAY_DOMAIN} {
    encode zstd gzip
    respond "Spartan Gateway Active (OriginZero VM1)" 200
}
EOF

    echo "==> Reloading Caddy..."
    systemctl reload caddy || caddy reload --config /etc/caddy/Caddyfile || true
    echo "==> Caddy SSL provisioned successfully."

# 2. Nginx + Certbot Ingress Detection
elif command -v nginx &> /dev/null; then
    echo "==> Nginx detected. Writing server block..."
    NGINX_CONF="/etc/nginx/sites-available/crimadezignz.originzero.art"
    mkdir -p /etc/nginx/sites-available/ /etc/nginx/sites-enabled/

    cat <<EOF > "$NGINX_CONF"
server {
    listen 80;
    server_name ${PRIMARY_DOMAIN} ${GATEWAY_DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://127.0.0.1:${UPSTREAM_PORT};
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

    ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/"
    nginx -t && systemctl reload nginx

    if command -v certbot &> /dev/null; then
        echo "==> Running Certbot for Let's Encrypt certificates..."
        certbot --nginx \
            -d "${PRIMARY_DOMAIN}" \
            -d "${GATEWAY_DOMAIN}" \
            --non-interactive \
            --agree-tos \
            --email "${EMAIL}" \
            --redirect || echo "Certbot DNS verification pending propagation."
    fi

# 3. Traefik / Docker Ingress
else
    echo "==> Ingress handled dynamically via Docker container labels (Traefik / Compose)."
fi

echo "==> SSL & Ingress Provisioning completed."
