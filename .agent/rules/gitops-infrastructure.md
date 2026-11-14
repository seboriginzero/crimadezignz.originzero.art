# Reguli de Infrastructură și GitOps — CrimaDezignz®

Acest document reglementează ciclul complet de viață al codului, mediul de execuție Docker, rețeaua și procedurile de livrare automată pe serverele Proxmox.

---

## 1. Topologia Rețelei și a Nodurilor

```text
[ Utilizator / Browser ]
         │
         ▼  HTTPS (443) cu Let's Encrypt TLS
[ Proxmox VM3 — Reverse Proxy Nginx ]
  Domeniu: crimadezignz.originzero.art
         │
         ▼  HTTP Proxy Pass (192.168.57.51:3105)
[ Proxmox VM1 — Docker Host ]
  Container: originzero-tenant-crimadezignz
  Port intern: 3105 -> 3000
```

- **IP Host VM1**: `192.168.57.51`
- **Utilizator SSH**: `antigravity`
- **Director Rădăcină VM1**: `/home/antigravity/tenants/crimadezignz`
- **Port Alocat Tenant**: `3105`

---

## 2. Depozitul Git și Reguli de Livrare

- **URL Oficial**: `git@github.com:seboriginzero/crimadezignz.originzero.art.git`
- **Binar Git Local (macOS)**: Folosește obligatoriu:
  ```bash
  /Library/Developer/CommandLineTools/usr/bin/git
  ```
  *(Nu folosi `/usr/bin/git` pentru a evita dialogurile interactive de licență Xcode).*

---

## 3. Protocolul de Deploy Automatizat

La fiecare set de modificări validate local:

1. **Staging și Commit Semantic**:
   ```bash
   /Library/Developer/CommandLineTools/usr/bin/git add .
   /Library/Developer/CommandLineTools/usr/bin/git commit -m "feat/fix/chore: descriere clara"
   /Library/Developer/CommandLineTools/usr/bin/git push origin main
   ```

2. **Execuție Deploy pe VM1 via SSH**:
   ```bash
   ssh antigravity@192.168.57.51 "bash /home/antigravity/tenants/crimadezignz/deploy-gitops.sh"
   ```

3. **Verificare Răspuns Healthcheck**:
   ```bash
   curl -s -i https://crimadezignz.originzero.art/healthz
   ```
   Răspunsul așteptat este `HTTP/2 200 OK` cu payload JSON `{ status: "ok", timestamp: ... }`.
