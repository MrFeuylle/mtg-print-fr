# Guide d'installation et déploiement - MTG Print FR

## ⚙️ Prérequis

Vous devez avoir **Node.js 16+** installé sur votre système.

### Installer Node.js

#### Windows (Option 1: Installer directement)
1. Allez sur https://nodejs.org
2. Téléchargez la version **LTS** (Long Term Support)
3. Installez normalement
4. Redémarrez votre terminal/PowerShell

#### Windows (Option 2: Avec Chocolatey)
Si vous avez Chocolatey installé:
```powershell
choco install nodejs
```

#### Vérifier l'installation
Après l'installation, ouvrez PowerShell ou CMD et testez:
```powershell
node --version
npm --version
```

Vous devriez voir:
```
v18.x.x (ou supérieur)
9.x.x (ou supérieur)
```

## 🚀 Étapes d'installation locale

Une fois Node.js installé, dans votre terminal (PowerShell recommandé):

```powershell
# 1. Aller dans le dossier du projet
cd "c:\Users\axelg\Desktop\MTGPRINTFR"

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Vous verrez:
```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Ouvrez `http://localhost:5173/` dans votre navigateur. ✅

## 📦 Build pour production (GitHub Pages)

```powershell
cd "c:\Users\axelg\Desktop\MTGPRINTFR"
npm run build
```

Cela crée le dossier `dist/` avec tous les fichiers statiques prêts.

## 🚀 Déploiement sur GitHub Pages

### Étape 1: Créer un repo GitHub

1. Allez sur https://github.com/new
2. Créez un repo nommé exactement: `mtg-print-fr`
3. Public ou Private (GitHub Pages fonctionne pour les deux)
4. **Ne créez PAS de README, .gitignore, ou license** (nous les avons déjà)

### Étape 2: Connecter votre repo local

Dans PowerShell, dans le dossier du projet:

```powershell
git init
git config user.name "Your Name"
git config user.email "your.email@gmail.com"
git add .
git commit -m "Initial commit: MTG Print FR application"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mtg-print-fr.git
git push -u origin main
```

Remplacez:
- `Your Name` par votre nom
- `your.email@gmail.com` par votre email
- `YOUR_USERNAME` par votre nom d'utilisateur GitHub

### Étape 3: Activer GitHub Pages

1. Allez sur: https://github.com/YOUR_USERNAME/mtg-print-fr
2. Cliquez sur **Settings** (⚙️)
3. À gauche, cliquez sur **Pages**
4. Sous "Source", sélectionnez:
   - Branch: **main**
   - Folder: **/(root)**
5. Cliquez "Save"

GitHub va automatiquement:
- Détecter le `vite.config.js` avec `base: '/mtg-print-fr/'`
- Exécuter `npm run build`
- Déployer le dossier `dist/`

### Étape 4: Accéder votre app

Dans ~1-2 minutes, votre app sera accessible à:

```
https://YOUR_USERNAME.github.io/mtg-print-fr/
```

Exemple:
```
https://john-doe.github.io/mtg-print-fr/
```

## 🔄 Mettre à jour après les changements

Chaque fois que vous modifiez le code:

```powershell
cd "c:\Users\axelg\Desktop\MTGPRINTFR"
git add .
git commit -m "Description des changements"
git push origin main
```

GitHub Pages redéploiera automatiquement en ~1-2 minutes. ✅

## 📝 Exemple de test local

1. Lancez `npm run dev`
2. Ouvrez http://localhost:5173/
3. Collez une decklist:
   ```
   4 Foudre
   3 Contresort
   2 Renvoi aux mains
   ```
4. Cliquez "Prévisualiser"
5. Les images se chargent depuis Scryfall
6. Cliquez "Télécharger PDF"
7. Un fichier `mtg-print.pdf` se télécharge

## ⚠️ Troubleshooting

### `npm: command not found`
→ Node.js n'est pas installé correctement
→ Relancez l'installer Node.js et redémarrez votre terminal

### Port 5173 déjà utilisé
```powershell
npm run dev -- --port 3000
```

### Changements ne se reflètent pas sur GitHub Pages
→ Attendez 1-2 minutes après le push
→ Vérifiez l'onglet "Actions" sur GitHub pour voir l'état du déploiement

### Cartes non trouvées dans Scryfall
→ Vérifiez l'orthographe exacte
→ Certaines cartes n'existent peut-être pas en français
→ Essayez le nom anglais

## 📂 Structure finale

```
mtg-print-fr/
├── src/
│   ├── components/
│   │   ├── DeckInput.jsx
│   │   └── Preview.jsx
│   ├── utils/
│   │   ├── deckParser.js
│   │   ├── scryfall.js
│   │   └── pdfGenerator.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── dist/                    ← généré par npm run build
├── node_modules/            ← généré par npm install
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── .gitignore
```

## 🎉 Terminé!

Votre app est maintenant:
- ✅ 100% Frontend
- ✅ Sans serveur
- ✅ Hébergée sur GitHub Pages
- ✅ Gratuite
- ✅ Accessible de n'importe où
