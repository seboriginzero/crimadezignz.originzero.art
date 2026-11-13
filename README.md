# CrimaDezignz® — ModernUX Identity Showcase & Anti-AI Slop Engine

[![OriginZero GitOps](https://img.shields.io/badge/OriginZero-GitOps%20Standard-gold)](https://originzero.art)
[![Domain](https://img.shields.io/badge/Production-crimadezignz.originzero.art-blue)](https://crimadezignz.originzero.art)
[![WCAG AAA](https://img.shields.io/badge/WCAG-2.2%20AAA-success)](https://www.w3.org/WAI/standards-guidelines/wcag/)

> **CrimaDezignz® Portfolio Showcase**: 170 verified client marks from official 99designs archive (ID #1844933).  
> Integrated with an active **Anti-AI Slop Compliance Auditor**, **Interactive Geometry Lab**, and **Literary & Semiotic Critiques**.

---

## 1. Arhitectură & Infrastructură Proxmox

- **FQDN Oficial:** `https://crimadezignz.originzero.art`
- **Reverse Proxy VM3 (`192.168.57.105`):** Nginx SSL termination + Let's Encrypt TLSv1.3 + HTTP/2 + HSTS.
- **Hosting VM1 (`192.168.57.51`):** Docker container `originzero-tenant-crimadezignz` pe portul `3105:3000`.
- **Nod Provizionare VM4 (`192.168.57.101`):** Scriptul `manage_domain.sh` & `oz-domain-adapter` pentru management vhost și certificate.

---

## 2. Piloni Tehnici

- **Dual Theme:** Obsidian Dark (`#070709`) & Gallery Alabaster Light (`#fcfbf9`) cu comutare fluidă și memorare în `localStorage`.
- **Dual Language:** English (Implicit) & Română cu traducere completă și instantanee a DOM-ului (`data-i18n`).
- **Interactive Geometry Studio:** Axe carteziene, cercuri Fibonacci / Golden Ratio, safe-zone bounds și reglaj dinamic al scării optice.
- **Auditor Anti-AI Slop:** Diagnosticare în timp real a 5 dimensiuni critice de design și integritate semantică.
- **Zero Dependințe Externe:** Server Node.js nativ hardened (UID 1000 node) cu compresie Gzip/Deflate și endpoint `/api/health`.

---

## 3. GitOps Workflow

```bash
# Sincronizare locală
./sync-gitops.sh
git push origin main

# Deploy atomic pe VM1 Proxmox
ssh antigravity@192.168.57.51 "cd /home/antigravity/tenants/crimadezignz && ./deploy-gitops.sh"
```
