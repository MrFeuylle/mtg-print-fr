# MTG Print FR

Application web **100% Frontend** pour convertir une decklist MTG en grille d'impressions PDF.

## Caractéristiques

- ✅ Pas de backend, pas de serveur
- ✅ Fonctionne sur GitHub Pages (hébergement statique)
- ✅ Appels directs API Scryfall
- ✅ Génération PDF côté client (pdf-lib)
- ✅ Interface moderne et responsive
- ✅ Support français natif

## Stack Technique

- **Framework**: React 18 + Vite
- **Langage**: JavaScript (ES modules)
- **PDF**: pdf-lib
- **API**: Scryfall (recherche cartes)
- **CSS**: Vanilla CSS (gradient, flexbox, grid)

## Installation locale

```bash
npm install
npm run dev
```

Puis ouvrez `http://localhost:5173`

## Build pour GitHub Pages

```bash
npm run build
```

Le dossier `dist/` est prêt pour être uploadé sur GitHub Pages.

## Déploiement GitHub Pages

### Étape 1: Préparer le repo
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mtg-print-fr.git
git push -u origin main
```

### Étape 2: Build
```bash
npm run build
```

### Étape 3: Settings GitHub
1. Allez dans **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **root** ou **gh-pages** / **root**
4. Attendez la compilation (~1 min)

### Étape 3b (Alternative avec gh-pages branch)
```bash
npm install gh-pages --save-dev
```

Ajoutez dans `package.json`:
```json
{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  }
}
```

Puis:
```bash
npm run deploy
```

### Étape 4: URL finale
Votre app sera accessible à:
```
https://YOUR_USERNAME.github.io/mtg-print-fr/
```

## Utilisation

1. **Coller decklist**
   ```
   4 Foudre
   3 Contresort
   2 Renvoi aux mains
   ```

2. **Cliquer "Prévisualiser"**
   - Récupère les images depuis Scryfall
   - Affiche la grille de cartes

3. **Cliquer "Télécharger PDF"**
   - Génère un PDF A4 avec grille 3×3
   - Télécharge automatiquement

## Architecture

```
src/
  components/
    DeckInput.jsx      # Textarea + boutons
    Preview.jsx        # Grille et stats
  utils/
    deckParser.js      # Parse "4 Foudre" → {qty: 4, name: "Foudre"}
    scryfall.js        # Appels API Scryfall
    pdfGenerator.js    # Génération PDF (pdf-lib)
  App.jsx              # Composant racine
  index.css            # Styles (gradients, etc)
  main.jsx             # Point d'entrée React
index.html             # HTML
package.json
vite.config.js         # Config avec base: "/mtg-print-fr/"
```

## API Scryfall

L'app utilise:
```
GET /cards/search?q=lang:fr+"Foudre"
```

**Règles implémentées**:
- Force `lang:fr` pour français
- Prend `data[0]` (première résultat)
- Utilise `image_uris.large` (900×1260px)
- Gestion erreurs si pas d'image
- Délai 100ms entre requêtes (respect limites API)

## Format Decklist

Support:
```
4 Foudre
3 Contresort
2 Renvoi aux mains
```

Après parsing:
```js
[
  { qty: 4, name: "Foudre" },
  { qty: 3, name: "Contresort" },
  { qty: 2, name: "Renvoi aux mains" }
]
```

## Génération PDF

- **Format**: A4 (210 × 297 mm)
- **Layout**: Grille 3 colonnes × 3 lignes
- **Total**: 9 cartes par page
- **Répétition**: Chaque carte est répétée selon `qty`
- **Lib**: pdf-lib (aucune dépendance serveur)

## Fonctionnalités

- ✅ Parser decklist avec regex
- ✅ Valider quantités (1-4)
- ✅ Rechercher cartes en français
- ✅ Afficher images en grille
- ✅ Générer PDF A4 (9 cartes/page)
- ✅ Téléchargement automatique
- ✅ Gestion erreurs réseau
- ✅ UI responsive mobile/desktop
- ✅ Status messages (success/error/loading)

## Limitations / Notes

- ⚠️ Scryfall peut ne pas avoir toutes les cartes en français
- ⚠️ Les images sont optimisées 900×1260px
- ⚠️ CORS: Scryfall n'a pas de restriction CORS stricte
- ⚠️ Impressions: À adapter selon votre imprimante

## Troubleshooting

**"Carte non trouvée"**
- Vérifiez l'orthographe (case-insensitive OK)
- Scryfall ne connaît peut-être pas la traduction FR
- Essayez le nom anglais

**"Pas d'image disponible"**
- Certaines cartes en français n'ont pas d'image Scryfall
- Vérifiez sur scryfall.com directement

**PDF blanc/vide**
- Rafraîchissez la page
- Vérifiez que les images ont bien chargé (grille visible)

## License

MIT

## Credits

- API: [Scryfall](https://scryfall.com)
- PDF Lib: [pdfkit](https://pdf-lib.js.org)
- React: Facebook Open Source
