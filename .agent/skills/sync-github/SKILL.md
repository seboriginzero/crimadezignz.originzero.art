---
name: sync-github
description: Sincronizează depozitul local de lucru cu depozitul oficial de pe GitHub (origin/main).
---

# Abilitate GitOps: Sincronizare GitHub

Această abilitate gestionează fluxul de adăugare a fișierelor, generare a mesajului de commit semantic și împingere către GitHub.

## Reguli Cheie:
- Folosește întotdeauna binarul Apple CLT: `/Library/Developer/CommandLineTools/usr/bin/git`.
- Nu folosi `/usr/bin/git` pentru a evita dialogurile de licență Xcode.

## Comenzi Tipice:

```bash
/Library/Developer/CommandLineTools/usr/bin/git status
/Library/Developer/CommandLineTools/usr/bin/git add .
/Library/Developer/CommandLineTools/usr/bin/git commit -m "mesaj semantic"
/Library/Developer/CommandLineTools/usr/bin/git push origin main
```
