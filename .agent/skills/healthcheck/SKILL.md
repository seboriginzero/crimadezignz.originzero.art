---
name: healthcheck
description: Verifică disponibilitatea și parametrii de funcționare ai platformei CrimaDezignz® intern și extern.
---

# Abilitate Diagnostic: Healthcheck

Această abilitate testează starea containerului Docker pe VM1 și disponibilitatea publică securizată prin Nginx SSL pe VM3.

## Verificare Internă pe VM1:
```bash
ssh antigravity@192.168.57.51 "curl -s -i http://127.0.0.1:3105/healthz"
```

## Verificare Externă Publică:
```bash
curl -s -i https://crimadezignz.originzero.art/healthz
```

## Verificare Stare Container Docker:
```bash
ssh antigravity@192.168.57.51 "docker ps -f name=originzero-tenant-crimadezignz"
```
