# Standarde Tehnice pentru Galeriile 3D — CrimaDezignz®

Acest document definește specificațiile de implementare și performanță pentru motoarele 3D bazate pe CSS 3D Transforms și Canvas.

---

## 1. Arhitectura Scenelor 3D
- Fiecare container 3D folosește:
  ```css
  perspective: 1400px;
  perspective-origin: 50% 50%;
  transform-style: preserve-3d;
  ```
- Toate transformările utilizează accelerația hardware GPU (`translate3d`, `rotate3d`, `scale3d`).

---

## 2. Modul 3D Void Tunnel (Specificație de Zbor)
- **Culoar Central Liber**: Zborul camerei se efectuează pe axa Z centrală (`translateZ(currentZ)`). Lucrările sunt plasate la `translateX(-420px)` (stânga) și `translateX(420px)` (dreapta), asigurând un culoar central aerisit de minimum 840px lățime.
- **Lungime Tunel**: Până la 170 de poziții eșalonate la intervale de 160–200px pe axa Z, acoperind o adâncime de peste -16.000px.
- **Pereți Structurali**:
  - Podea carteziană cu perspectivă accelerată și linii de pistă;
  - Tavan cu șine de lumină zenithală;
  - Pereți laterali cu panouri structurate;
  - Inele luminoase de portal plasate la fiecare 2.000px în adâncime.
- **Inerție și Control**:
  - Funcție de navigare `navigate3D(direction)` cu pas calibrat la 200px;
  - Ascultător de eveniment `wheel` cu acumulare lină și `requestAnimationFrame`;
  - Suport complet pentru glisare cu cursorul / touch drag și tastatură (`ArrowUp`, `ArrowDown`);
  - Buton dedicat **Auto-Cruise** cu viteză constantă de zbor și oprire instantanee la interacțiunea utilizatorului.

---

## 3. Modurile 3D Coverflow și Spatial Tilt
- **3D Coverflow**: Calibrare precisă a unghiului de rotație (45° pe axa Y), separare Z de 80px și ridicare frontală a elementului activ.
- **3D Spatial Tilt**: Limitare la maximum ±8 grade pe axele X și Y pentru a preveni distorsiunile nefirești sau senzația de vertij.
