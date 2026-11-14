# Reguli Constituționale — CrimaDezignz® (`crimadezignz.originzero.art`)

Acest depozit găzduiește platforma web oficială **CrimaDezignz®** (Vanilla ES2024, CSS 3D Transforms, Node.js 22 Hardened Static Server, Docker Alpine), dedicată exclusiv portofoliului de 170 de mărci vectoriale create în cadrul 99designs.

Toți agenții autonomi care inspectează, editează sau livrează cod în acest proiect sunt obligați să respecte următoarele directive constituționale.

---

## 1. Identitate de Brand și Nume Oficial
- **Casing Strict Obligatoriu**: Folosește întotdeauna denumirea exactă **`CrimaDezignz®`** (cu `C` majusculă, `rima` minuscule, `D` majusculă, `ezign` minuscule, `z` minusculă și simbolul `®`).
- **Excepție URL**: Singura excepție permisă pentru litere mici este în hostname (`crimadezignz.originzero.art`) sau în căi de sistem UNIX (`/home/antigravity/tenants/crimadezignz`).

---

## 2. Rigoare Carteziană: Zero Border-Radius
- **Colțuri Drepte de 90°**: Este strict interzisă rotunjirea colțurilor pe orice element din interfață (`carduri`, `butoane`, `badge-uri`, `modale`, `dropdown-uri`, `containere de imagine`).
- **Regulă CSS**: Toate componentele au declarate explicit `border-radius: 0 !important;`.

---

## 3. Puritate Vizuală a Operelor de Artă
- **Strict Fără Rame sau Borduri**: Nicio imagine reprezentând o creație a autorului nu va fi înconjurată de borduri decorative, chenare tip tablou clasic, umbre perimetrice artificiale sau măști de decolorare.
- **Integritate Fără Trunchiere (Zero Crop)**: Toate cele 170 de opere sunt afișate la raportul lor nativ de aspect, fără a tăia litere, margini sau detalii vectoriale fine.
- **Fără Măști Albe în Tema Light**: Toate contrastele se realizează pe bază de degradeuri negre/întunecate naturale, păstrând culorile vii și naturale ale lucrărilor.

---

## 4. Arhitectura Galeriilor 3D & 2D Haute-Couture
Platforma oferă exact 6 moduri de prezentare de înaltă performanță:
1. **3D Void Tunnel**: Tunel monumental 3D cu adâncime de până la -16.000px, 4 pereți structurali, inele de portal luminoase și **culoar central de zbor** printre toate cele 170 de opere.
2. **3D Coverflow**: Eșalonare 3D a cardurilor cu rotire la 45° și aducere în avanscenă a cardului activ.
3. **3D Spatial Tilt**: Scenă carteziană tridimensională ce răspunde subtil la mișcarea cursorului utilizatorului.
4. **Salon Royal**: Sală verticală arhitecturală de artă cu iluminare zenithală și umbre fine.
5. **Imperial Runway**: Podium orizontal continuu de defilare cu scroll lateral fluid via mouse wheel și trackpad.
6. **Sovereign Spotlight**: Mod mono-expoziție de înaltă rezoluție pentru contemplare individuală.

---

## 5. Simbolul Oficial de Profil: Alien Head Glitch
- Pictograma atelierului este exclusiv capul de extraterestru neon chromatic glitch (verde toxic, magenta și alb).
- Toate formatele de favicon (`favicon.ico`, `favicon.svg`, PNG-uri 16/32/48/64, `apple-touch-icon.png`) respectă cu fidelitate această grafică.

---

## 6. Infrastructură și Livrare GitOps
- **Depozit GitHub**: `git@github.com:seboriginzero/crimadezignz.originzero.art.git` pe ramura `main`.
- **Găzduire Proxmox**: VM1 (`192.168.57.51`), container `originzero-tenant-crimadezignz`, port `3105`.
- **Reverse Proxy**: Proxmox VM3 Nginx SSL pe domeniul `https://crimadezignz.originzero.art`.
- **Comenzi Git**: Folosește întotdeauna calea directă `/Library/Developer/CommandLineTools/usr/bin/git`. Nu folosi `/usr/bin/git`.
- **Deploy**: După fiecare push pe `origin/main`, declanșează `bash /home/antigravity/tenants/crimadezignz/deploy-gitops.sh` pe VM1 și verifică `/healthz`.
