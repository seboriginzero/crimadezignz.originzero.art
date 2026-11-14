# Standarde pentru Galeriile 2D Haute-Couture — CrimaDezignz®

Acest document definește principiile celor 3 moduri de galerie 2D de lux implementate în platformă.

---

## 1. Top 3 Galerii Haute-Couture

### 1. Salon Royal (`mode: 'salon'`)
- **Inspirație**: Saloanele private de expoziție din Place Vendôme și Via Montenapoleone.
- **Compoziție**:
  - Zonă superioară monumentală cu lucrarea principală pusă în valoare;
  - Grilă arhitecturală inferioară asimetrică (ritm de 2, 3 și 4 coloane);
  - Iluminare zenithală discretă și texturi pure de fundal;
  - Cartușe informative carteziene la baza fiecărei opere.

### 2. Imperial Runway (`mode: 'runway'`)
- **Inspirație**: Podiumul de prezentare al caselor de modă pariziene.
- **Compoziție & Navigare**:
  - Defilare orizontală infinită sau extinsă;
  - **Scroll Lateral Obligatoriu**: Rotița verticală a mouse-ului este translatată automat în derulare orizontală pe axa X (`e.deltaY` adăugat la `scrollLeft`);
  - Suport tactil și gesturi de touchpad orizontale native;
  - Butoane discrete de avans lateral stânga/dreapta cu accelerare fină;
  - Fără bare de scroll standard Windows/Mac inestetice (scroll ascuns cu `scrollbar-width: none`).

### 3. Sovereign Spotlight (`mode: 'spotlight'`)
- **Inspirație**: Piesa unică de muzeu contemporan.
- **Compoziție**:
  - Afișare individuală de înaltă rezoluție a fiecărei lucrări;
  - Zonă generoasă de respirație vizuală în jurul operei;
  - Fișă tehnică de identitate vizuală plasată lateral sau inferior cu detalii complete despre geometria mărcii și istoricul de concurs 99designs;
  - Trecere fluidă către lucrarea următoare/anterioară prin butoane mari de navigație sau glisare.

---

## 2. Regula Inviolabilă a Arhitecturii Imaginii
- Toate cardurile respectă `border-radius: 0 !important`.
- Nicio lucrare nu conține margini adăugate din CSS.
- Fiecare imagine își păstrează proporțiile native (`object-fit: contain`).
