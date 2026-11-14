---
name: deploy-vm1
description: Declanșează livrarea automată GitOps pe serverul Proxmox VM1 (192.168.57.51) pentru containerul originzero-tenant-crimadezignz.
---

# Abilitate GitOps: Deploy pe Proxmox VM1

Această abilitate automatizează conectarea prin SSH la gazda Proxmox VM1 și executarea scriptului de rebuild și redeploy Docker.

## Comandă de Execuție

```bash
ssh antigravity@192.168.57.51 "bash /home/antigravity/tenants/crimadezignz/deploy-gitops.sh"
```

## Ce execută scriptul pe VM1:
1. `git fetch --prune origin` și `git reset --hard origin/main` în `/home/antigravity/tenants/crimadezignz/source`
2. Reconstrucția imaginii Docker `originzero-tenant-crimadezignz:latest`
3. Restartarea containerului pe portul `3105`
4. Verificarea `curl http://127.0.0.1:3105/healthz`
