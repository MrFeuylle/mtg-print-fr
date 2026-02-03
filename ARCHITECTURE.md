# 🏗️ ARCHITECTURE TECHNIQUE - MTG PRINT FR

## Vue d'ensemble

Application React 100% frontend pour convertir une decklist MTG en PDF.

```
UTILISATEUR
    ↓
[Navigateur]
    ↓
[React App - http://localhost:5173/]
    ├── UI (DeckInput.jsx + Preview.jsx)
    ├── Logic (deckParser.js)
    ├── API (scryfall.js) ──→ Scryfall.com
    └── PDF (pdfGenerator.js) ──→ Download
    
AUCUN SERVEUR BACKEND
```

---

## 📁 Structure des fichiers

### Entry Points

```
index.html
  └── root div
      └── src/main.jsx
          └── React.StrictMode
              └── App.jsx
```

### Flux de données

```
App.jsx
  ├── state: [cards, cardImages, loading, status]
  ├── handlers: [onCardsLoaded, onStatus, onLoading]
  │
  └── <DeckInput /> (formulaire)
      ├── textarea (deckText)
      ├── bouton "Prévisualiser"
      │   └── parseDeckList()
      │       └── searchCards() (Scryfall API)
      │           └── onCardsLoaded()
      │
      ├── bouton "Télécharger PDF"
      │   └── convertImageToBase64()
      │       └── generatePDF() (pdf-lib)
      │           └── downloadPDF()
      │
      └── <Preview /> (affichage)
          ├── grille d'images
          ├── statistiques
          └── status messages
```

---

## 🔄 Flux du parsing decklist

### Étape 1: Input utilisateur

```
Textarea:
"4 Foudre
3 Contresort"
```

### Étape 2: deckParser.js

```javascript
parseDeckList(text)
  ├── split('\n')
  ├── filter(trim)
  └── regex: /^(\d+)\s+(.+)$/
      └── return [
          { qty: 4, name: "Foudre" },
          { qty: 3, name: "Contresort" }
        ]
```

### Étape 3: Validation

```javascript
validateDeckList(cards)
  ├── vérifie qty > 0
  ├── vérifie qty <= 4
  ├── vérifie name non-vide
  └── return errors[] ou []
```

### Étape 4: Résultat

```
✅ { qty: 4, name: "Foudre" }
✅ { qty: 3, name: "Contresort" }
```

---

## 🌐 Flux API Scryfall

### Étape 1: Recherche une carte

```javascript
searchCard("Foudre")
  ├── query = 'lang:fr "Foudre"'
  ├── url = 'https://api.scryfall.com/cards/search?q=...'
  └── fetch(url)
      └── response.json()
          └── data.data[0]
```

### Étape 2: Extrait les données

```javascript
card = {
  name: "Foudre",
  image_uris: {
    large: "https://...image.jpg"
  },
  id: "..." // Scryfall ID
}
```

### Étape 3: Retourne le résultat

```javascript
return {
  name: "Foudre",
  imageUrl: "https://...jpg",
  scryfallId: "...",
  success: true
}
```

### Étape 4: Boucle pour chaque carte

```javascript
searchCards(["Foudre", "Contresort"])
  ├── pour chaque nom:
  │   ├── appel searchCard()
  │   ├── attendre 100ms (limite API)
  │   └── push résultat
  └── return results[]
```

---

## 📄 Flux génération PDF

### Étape 1: Récupérer les images

```javascript
cardImages = [
  "https://scryfall.com/...1.jpg", // Foudre #1
  "https://scryfall.com/...2.jpg", // Foudre #2
  "https://scryfall.com/...3.jpg", // Foudre #3
  "https://scryfall.com/...4.jpg", // Foudre #4
  "https://scryfall.com/...5.jpg", // Contresort #1
  // ...etc selon qty
]
```

### Étape 2: Convertir en buffers

```javascript
pour chaque URL:
  ├── fetch(imageUrl)
  ├── blob = response.blob()
  ├── reader = new FileReader()
  └── ArrayBuffer
      └── imageBuffers[]
```

### Étape 3: Layout PDF

```
A4: 595 × 842 points

Margin: 10 points
Usable: 575 × 822 points

3×3 grid:
  CARD_WIDTH = 575 / 3 ≈ 192 points
  CARD_HEIGHT = 822 / 3 ≈ 274 points

Page 1: cartes 1-9
Page 2: cartes 10-18
...
```

### Étape 4: Création PDF

```javascript
pdfDoc = PDFDocument.create()

pour chaque page:
  page = pdfDoc.addPage([595, 842])
  
  pour chaque position (row, col):
    image = pdfDoc.embedPng(buffer)
    page.drawImage(image, {
      x, y, width, height
    })

pdfBytes = pdfDoc.save()
```

### Étape 5: Téléchargement

```javascript
blob = new Blob([pdfBytes])
link = createElement('a')
link.href = URL.createObjectURL(blob)
link.download = 'mtg-print.pdf'
link.click()
URL.revokeObjectURL(url)
```

---

## 🎨 Structure CSS

```
index.css (700+ lignes)
  ├── Reset global
  ├── Variables (colors, fonts)
  ├── Layout
  │   ├── Container
  │   ├── Grid (2 columns)
  │   └── Responsive (@media 768px)
  ├── Composants
  │   ├── .section
  │   ├── textarea
  │   ├── button
  │   ├── .preview-grid
  │   ├── .card-image
  │   └── .status-message
  ├── Animations
  │   ├── @keyframes slideIn
  │   ├── @keyframes spin
  │   └── transitions
  └── Dark theme (gradients violets)
```

---

## ⚛️ Composants React

### App.jsx

```javascript
export default function App() {
  const [cards, setCards] = useState([])
  const [cardImages, setCardImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  
  return (
    <>
      <header>MTG Print FR</header>
      <main>
        <DeckInput 
          onCardsLoaded={...}
          onStatus={...}
          onLoading={...}
        />
        <Preview 
          cards={cards}
          cardImages={cardImages}
        />
      </main>
    </>
  )
}
```

### DeckInput.jsx

```javascript
function DeckInput({onCardsLoaded, onStatus, onLoading}) {
  const [deckText, setDeckText] = useState("")
  
  async function handlePreview() {
    // 1. Parse
    const cards = parseDeckList(deckText)
    
    // 2. Validate
    const errors = validateDeckList(cards)
    
    // 3. Fetch from Scryfall
    const results = await searchCards(cardNames)
    
    // 4. Expand by qty
    const expanded = []
    for (card in results) {
      for (let i=0; i<card.qty; i++) {
        expanded.push(card)
      }
    }
    
    // 5. Update parent
    onCardsLoaded(results, expanded)
  }
  
  return (
    <div>
      <textarea value={deckText} />
      <button onClick={handlePreview}>Prévisualiser</button>
      <button onClick={handleDownloadPDF}>Télécharger PDF</button>
    </div>
  )
}
```

### Preview.jsx

```javascript
function Preview({cards, cardImages}) {
  const totalCards = cardImages.length
  const totalPages = Math.ceil(totalCards / 9)
  
  return (
    <div>
      <div class="stats">
        <div>Cartes: {cards.length}</div>
        <div>Total: {totalCards}</div>
        <div>Pages: {totalPages}</div>
      </div>
      
      <div class="preview-grid">
        {cardImages.map(card => (
          <img src={card.imageUrl} />
        ))}
      </div>
    </div>
  )
}
```

---

## 🔧 Utilitaires

### deckParser.js

```javascript
parseDeckList(text)
  ├── Entrée: "4 Foudre\n3 Contresort"
  ├── Regex: /^(\d+)\s+(.+)$/
  └── Sortie: [{qty, name}, ...]

validateDeckList(cards)
  ├── Vérifie: qty, name
  └── Sortie: errors[]
```

### scryfall.js

```javascript
searchCard(cardName)
  ├── API: https://api.scryfall.com/cards/search
  ├── Query: lang:fr "nom"
  └── Return: {name, imageUrl, scryfallId}

searchCards(cardNames)
  ├── Boucle: searchCard() pour chaque
  ├── Délai: 100ms entre requêtes
  └── Return: results[]
```

### pdfGenerator.js

```javascript
generatePDF(imageBuffers)
  ├── PDFDocument.create()
  ├── Layout: 3×3 (9/page)
  ├── Embed images
  └── Return: pdfBytes

downloadPDF(pdfBytes)
  ├── Blob
  ├── ObjectURL
  ├── Download
  └── Cleanup

convertImageToBase64(url)
  ├── fetch(url)
  ├── blob
  ├── FileReader
  └── ArrayBuffer
```

---

## 📦 Dépendances npm

```json
{
  "dependencies": {
    "react": "^18.2.0",          // Framework UI
    "react-dom": "^18.2.0",      // DOM rendering
    "pdf-lib": "^1.17.1"         // PDF generation
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",  // React support
    "vite": "^5.0.0"                    // Builder
  }
}
```

---

## 🌐 Configuration Vite

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/mtg-print-fr/',  // GitHub Pages subpath
  build: {
    outDir: 'dist',        // Output folder
    assetsDir: 'assets'    // Assets subfolder
  }
})
```

---

## 🚀 Build process

```
npm run build
  ├── Vite compiles:
  │   ├── React JSX → JavaScript
  │   ├── CSS (minified)
  │   ├── HTML (template)
  │   └── Assets
  │
  └── Output: dist/
      ├── index.html
      ├── assets/
      │   ├── index-xxx.js (bundled)
      │   └── index-xxx.css (bundled)
      └── (prêt pour GitHub Pages)
```

---

## 📊 Data Flow Diagram

```
User Input
    ↓
[DeckInput.jsx]
    ↓
parseDeckList() ──→ [{qty, name}]
    ↓
validateDeckList() ──→ errors[] ou OK
    ↓
searchCards() ──→ API Scryfall
    ↓
    ├─→ [{name, imageUrl, scryfallId}]
    │       ↓
    │   Expand by qty
    │       ↓
    └─→ [image1, image2, image3, ...]
            ↓
        [Preview.jsx]
        Display grid + stats
            ↓
        User clicks "Download PDF"
            ↓
        convertImageToBase64()
            ↓
        generatePDF()
            ├── Create PDF
            ├── Layout 3×3
            ├── Embed images
            └── Save as bytes
            ↓
        downloadPDF()
            ├── Blob
            ├── ObjectURL
            ├── Download
            └── ✅ mtg-print.pdf
```

---

## 🔐 CORS et API

**Scryfall API:**
- ✅ CORS enabled (pas de proxy requis)
- ✅ Rate limit: respecté (100ms délai)
- ✅ Public API (aucune clé requise)
- ✅ Images disponibles (900×1260px)

**Pas de backend:**
- ✅ Appels directs depuis le navigateur
- ✅ Aucun serveur Node/Express
- ✅ Aucune base de données
- ✅ Aucun service AWS/Azure

---

## 📱 Responsive Design

```
Desktop (≥769px):
  2 colonnes (DeckInput | Preview)
  Grille 3×3

Mobile (<768px):
  1 colonne (stacked)
  Grille responsive
  Boutons full-width
```

---

## ✅ Checklist d'architecture

- ✅ 100% Frontend
- ✅ Aucun backend
- ✅ API Scryfall directe
- ✅ PDF côté client
- ✅ GitHub Pages compatible
- ✅ Responsive design
- ✅ Gestion erreurs
- ✅ Code modulaire
- ✅ Documentation complète
- ✅ Prêt pour production

---

C'est tout! L'architecture est simple, modulaire et 100% fonctionnelle.

Bon développement! 🚀
