# ITwebshop applikáció

## Tudnivalók
Ez a projekt egy webshop alkalmazás, amely informatikai termékek 
(jelenleg korlátozott állapotban és tartalomban) böngészését és rendelését teszi lehetővé.
Az adminisztrátorok számára külön felület áll rendelkezésre a termékek és rendelések kezeléséhez.

---

## Technológiák
A projekt az alábbi technológiákat használja:
- **React** – Felhasználói felület.
- **TypeScript** – Típusbiztos fejlesztés.
- **Firebase**:
  - **Firestore** – Adatbázis.
  - **Authentication** – Felhasználók hitelesítése.
- **CSS** – Egyedi stílusok.

---

## Használat

### Telepítés
1. Klónozd a projektet:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Telepítsd a függőségeket:
   ```bash
   npm install
   ```

3. Hozd létre a Firebase konfigurációs fájlt:
   - Készíts egy `.env` fájlt a projekt gyökérkönyvtárában.
   - Add hozzá a szükséges Firebase beállításokat, pl.:
     ```
     VITE_FIREBASE_API_KEY=...
     VITE_FIREBASE_AUTH_DOMAIN=...
     VITE_FIREBASE_PROJECT_ID=...
     ```

4. Indítsd el a fejlesztői szervert:
   ```bash
   npm run dev
   ```

5. Nyisd meg a böngésződben:  
   [http://localhost:3000](http://localhost:3000)

---

## Admin felület
Az adminisztrátorok számára az alábbi funkciók érhetők el:

### Termékek kezelése
- Új termékek hozzáadása
- Meglévő termékek szerkesztése és törlése

### Rendelések kezelése
- Folyamatban lévő rendelések megtekintése
- Rendelések jóváhagyása vagy elutasítása

## Az adminisztrátori felület használatához ezzel a fiókkal tudsz belépni:
### **Email**: `admin@example.com`

### **Jelszó**: `admin123` 