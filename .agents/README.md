# .agents — Ecosistemul de Agenți Autonomi CrimaDezignz®

Toți agenții autonomi, regulile constitutionale, specificațiile arhitecturale și scripturile operative sunt izolate în acest director (`.agents/`), complet separate de interfața publică a atelierului digital. Depozitul este dedicat **exclusiv identității vizuale, arhitecturii de galerie și colecției de mărci înregistrate ale creatorului `CrimaDezignz®`**.

---

## 🏛️ Coordonate Atelier & Producție

- **Proiect**: `CrimaDezignz®` — Avant-Garde Trademark Atelier & 99designs Pro Archive
- **Tenant ID**: `008-CrimaDezignz`
- **Județ / Macro-zonă**: Județul Arad (`AR`), Macro-zona `vest`
- **Domeniu de Producție**: `https://crimadezignz.originzero.art`
- **Găzduire Proxmox**: VM1 (`192.168.57.51`), container `originzero-tenant-crimadezignz` (port intern `3105`)
- **Reverse Proxy**: Proxmox VM3 Nginx SSL Termination (`crimadezignz.originzero.art`)
- **Depozit GitHub Oficial**: `git@github.com:seboriginzero/crimadezignz.originzero.art.git`
- **Inventar Opere**: 170 Master Marks (100% Vector Precision, 99designs Top Tier Contest Archive #1844933)

---

## 📁 Structura Directorului `.agents/`

```text
.agents/
├── README.md                               # Prezentul ghid și registru complet al ecosistemului
├── config.yaml                             # Configurație de tenant, metadate, infrastructură & branding
├── agents/                                 # Agenți autonomi specializați
│   ├── modern-ux-director.md               # Arhitectură spațială 3D, galerii 2D Haute-Couture, interacțiuni
│   ├── haute-couture-curator.md            # Curator de artă, 170 master marks, catalogare & metadate
│   ├── anti-ai-slop-sentinel.md            # Gardian al purității vizuale, interzicere chenare/rame/rotunjiri
│   ├── brand-identity-guardian.md          # Constrângeri CrimaDezignz®, paletă cromatică noir/aur, alien favicon
│   ├── gitops-proxmox-deployer.md          # Automatizare GitOps, pipeline VM1/VM3, container Docker
│   └── seo-geo-intelligence.md             # SEO tehnic, GEO (Generative Engine Optimization), Schema.org
├── rules/                                  # Ghiduri de conformitate și reguli inviolabile
│   ├── AGENTS.md                           # Constituția centrală a agenților autonomi
│   ├── brand-identity-rules.md             # Standarde de marcă, 0px border-radius, pure artwork
│   ├── gallery-3d-standards.md             # Specificații 3D Void Tunnel, Central Corridor, Coverflow, Tilt
│   ├── gallery-2d-haute-couture.md         # Specificații Salon Royal, Imperial Runway, Sovereign Spotlight
│   └── gitops-infrastructure.md            # Protocoale de deploy Proxmox VM1/VM3, rețea & sănătate
└── skills/                                 # Abilități operative și comenzi automatizate
    ├── deploy-vm1/
    │   └── SKILL.md                        # Script și procedură de livrare pe VM1
    ├── sync-github/
    │   └── SKILL.md                        # Procedură de staging, commit semantic și push GitHub
    └── healthcheck/
        └── SKILL.md                        # Monitorizare endpoint /healthz și containere
```

---

## 🤖 Registrul Agenților Autonomi

### 1. `modern-ux-director` ([agents/modern-ux-director.md](./agents/modern-ux-director.md))
- **Misiune**: Guvernează experiența utilizatorului, fizica spațială 3D și fluxul galeriilor 2D Haute-Couture.
- **Responsabilități**:
  - Administrează cele 3 moduri 3D selectate: **3D Spatial Tilt**, **3D Coverflow** și **3D Void Tunnel** (cu culoar central de zbor printre cele 170 de opere).
  - Administrează cele Top 3 galerii 2D Haute-Couture: **Salon Royal** (salon arhitectural cu iluminare zenithală), **Imperial Runway** (defilare orizontală cu scroll lateral fluid) și **Sovereign Spotlight** (mono-expoziție monumentală).
  - Garantează navigarea cu mouse-wheel lateral pe toate galeriile orizontale, touch drag inerțial și modul Auto-Cruise.
  - Interzice elementele obstructive (fără cadrane artificiale, fără titluri gigantice peste zona centrală de focus).

### 2. `haute-couture-curator` ([agents/haute-couture-curator.md](./agents/haute-couture-curator.md))
- **Misiune**: Păstrează integritatea și bogăția arhivei celor 170 de mărci master de la 99designs.
- **Responsabilități**:
  - Toate cele 170 de lucrări sunt prezente în tunelul 3D și în galeriile extinse.
  - Integritate 1:1 a fiecărei creații: raport de aspect nativ, fără tăieri (zero crop), fără măști de estompare.
  - Păstrează legăturile către înregistrările originale 99designs și metadatele de arhivă (#contest, dată, tip mark).

### 3. `anti-ai-slop-sentinel` ([agents/anti-ai-slop-sentinel.md](./agents/anti-ai-slop-sentinel.md))
- **Misiune**: Protecție intransigentă împotriva clișeelor vizuale sintetice, ornamentelor inutile și degradării estetice.
- **Responsabilități**:
  - **Zero Border-Radius**: Impune `border-radius: 0 !important;` pe fiecare card, buton, pop-up, modal sau container.
  - **Fără Rame sau Borduri pe Artă**: Lucrările originale sunt afișate pure, neînrămate, fără imitații de tablou de muzeu clasic sau linii perimetrice aplicate peste vectori.
  - **Fără Filtre Parazite**: Interzice orice mască albă sau efect de spălăceală peste artwork în tema light sau dark.

### 4. `brand-identity-guardian` ([agents/brand-identity-guardian.md](./agents/brand-identity-guardian.md))
- **Misiune**: Păstrarea și consolidarea identității vizuale exclusive `CrimaDezignz®`.
- **Responsabilități**:
  - Casing strict obligatoriu: **`CrimaDezignz®`** (C mare, D mare, z mic, simbol registered inclus).
  - Paletă cromatică Darkroom Noir: Obsidian `#050507`, Jet Black `#0a0a0c`, Champagne Gold `#c9a050`, Warm Silver `#e0e0e0`.
  - Suita de Favicon Alien Head Glitch: menține fidelitatea iconiței neon-cromatice Alien Head (`favicon.ico`, `favicon.svg`, PNG-uri 16/32/48/64, `apple-touch-icon.png`).

### 5. `gitops-proxmox-deployer` ([agents/gitops-proxmox-deployer.md](./agents/gitops-proxmox-deployer.md))
- **Misiune**: Automatizarea sigură a livrării continue de la depozitul local pe clusterul Proxmox.
- **Responsabilități**:
  - Sincronizare depozit GitHub `seboriginzero/crimadezignz.originzero.art` pe ramura `main`.
  - Execuție script de deploy VM1 `bash /home/antigravity/tenants/crimadezignz/deploy-gitops.sh`.
  - Verificare ciclu de viață Docker container (port 3105), Nginx SSL reverse proxy pe VM3 și healthcheck `GET /healthz`.

### 6. `seo-geo-intelligence` ([agents/seo-geo-intelligence.md](./agents/seo-geo-intelligence.md))
- **Misiune**: Vizibilitate maximă în motoarele de căutare clasice și motoarele generative de inteligență artificială (GEO 2026).
- **Responsabilități**:
  - Schema.org `VisualArtwork`, `ArtGallery` și `Brand`.
  - Optimizare `robots.txt`, `sitemap.xml`, OpenGraph și Twitter Cards cu imagine de preview de înaltă rezoluție.

---

## ⚡ Principii Fundamentale de Sistem

1. **Rigoare Carteziană**: Unghiuri drepte de 90° în toate elementele de interfață (`border-radius: 0 !important`).
2. **Puritate a Artei**: Operele de artă sunt suverane — fără rame adăugate, fără decupaje, fără blur sau măști de decolorare.
3. **Culoar Central de Zbor 3D**: În modul 3D Void Tunnel, camera înaintează fluid pe culoarul central, având operele etalate pe pereții stânga și dreapta.
4. **Navigare Hibridă Fluidă**: Suport impecabil pentru scroll vertical, scroll orizontal (mouse wheel / trackpad shift), drag inerțial și navigare cu taste săgeți.
5. **Livrare Imediată GitOps**: Orice modificare validată se comite semantic, se împinge pe GitHub și se livrează automat pe Proxmox VM1.
