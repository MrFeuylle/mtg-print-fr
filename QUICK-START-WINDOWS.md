# 🚀 DÉMARRAGE RAPIDE - Windows

## ✅ Votre projet est prêt!

Vous avez une application MTG Print 100% frontend avec tous les fichiers.

## 📋 Checklist avant de commencer

- [ ] Node.js installé? (Téléchargez: https://nodejs.org)
- [ ] Dossier du projet ouvert dans VS Code?
- [ ] Vous lisez ce fichier? ✅

## 🏃 Démarrage en 30 secondes

### Option 1: Double-cliquer sur le script (plus simple)

```
1. Ouvrez l'Explorateur Windows
2. Allez dans: c:\Users\axelg\Desktop\MTGPRINTFR
3. Double-cliquez sur: start-dev.bat
4. Une fenêtre s'ouvre automatiquement
5. Ouvrez http://localhost:5173/ dans votre navigateur
```

### Option 2: Terminal PowerShell (contrôle complet)

```powershell
# 1. Ouvrir PowerShell dans le dossier du projet
cd "c:\Users\axelg\Desktop\MTGPRINTFR"

# 2. Installer les dépendances (première fois seulement)
npm install

# 3. Lancer le serveur
npm run dev
```

Vous verrez:
```
  VITE v5.0.0  ready in 250 ms

  ➜  Local:   http://localhost:5173/
```

Ouvrez http://localhost:5173/ → ✅ Vous êtes live!

## 🧪 Tester l'app

1. Collez une decklist dans le textarea:
   ```
   4 Foudre
   3 Contresort
   2 Renvoi aux mains
   ```

2. Cliquez **"🔍 Prévisualiser"**
   - Les images se chargent depuis Scryfall
   - La grille s'affiche en temps réel

3. Cliquez **"📥 Télécharger PDF"**
   - Un fichier PDF se télécharge
   - Format A4, grille 3×3

## 📦 Préparer pour GitHub Pages

Quand vous êtes prêt à publier:

### Option 1: Double-cliquer sur build.bat
```
1. Double-cliquez: build.bat
2. Attendez la fin (quelques secondes)
3. Le dossier 'dist/' est généré
```

### Option 2: Terminal PowerShell
```powershell
npm run build
```

Cela crée le dossier `dist/` avec tous les fichiers statiques.

## 🐙 Déployer sur GitHub Pages (détails complets dans INSTALLATION.md)

```powershell
# 1. Créer un repo GitHub nommé 'mtg-print-fr'

# 2. Dans PowerShell, dans votre projet:
git init
git config user.name "Votre Nom"
git config user.email "votre@email.com"
git add .
git commit -m "Initial: MTG Print FR"
git branch -M main
git remote add origin https://github.com/VotreUsername/mtg-print-fr.git
git push -u origin main

# 3. Sur GitHub.com:
#    - Settings → Pages
#    - Source: main branch / root
#    - Attendre 1-2 minutes

# 4. Votre app est accessible à:
#    https://VotreUsername.github.io/mtg-print-fr/
```

## 📁 Fichiers importants

```
c:\Users\axelg\Desktop\MTGPRINTFR\
├── start-dev.bat         ← Double-cliquez pour développer
├── build.bat             ← Double-cliquez pour builder
├── verify.bat            ← Vérifier l'environnement
├── package.json          ← Dépendances npm
├── vite.config.js        ← Config Vite (base: '/mtg-print-fr/')
├── index.html            ← Page HTML
├── src/                  ← Code source
│   ├── App.jsx
│   ├── components/
│   ├── utils/
│   └── index.css
├── dist/                 ← Généré par 'npm run build'
├── node_modules/         ← Généré par 'npm install'
├── README.md             ← Documentation complète
└── INSTALLATION.md       ← Guide détaillé
```

## ⚙️ Commandes npm

| Commande | Utilité |
|----------|---------|
| `npm install` | Installer les dépendances (une seule fois) |
| `npm run dev` | Lancer le serveur local (http://localhost:5173/) |
| `npm run build` | Créer la version production dans `dist/` |
| `npm run preview` | Prévisualiser le build production localement |

## 🆘 Problèmes courants

### Node.js introuvable
```
❌ Erreur: node: The term 'node' is not recognized...
```
→ Node.js n'est pas installé
→ Téléchargez depuis https://nodejs.org
→ Relancez PowerShell après installation

### Port 5173 en utilisation
```powershell
npm run dev -- --port 3000
```

### Cartes non trouvées
- Vérifiez l'orthographe exacte
- Certaines cartes n'existent que en anglais sur Scryfall
- Essayez le nom anglais

### PDF vide
- Attendez que la grille d'images se charge complètement
- Vérifiez la console (F12) pour les erreurs

## 📚 Documentation

- **README.md** - Description complète de l'app
- **INSTALLATION.md** - Guide d'installation et déploiement détaillé
- **vite.config.js** - Configuration Vite avec base URL GitHub Pages

## 🎯 Checklist finale

Avant de publier sur GitHub Pages:

- [ ] `npm install` exécuté sans erreurs
- [ ] `npm run dev` lance le serveur
- [ ] App fonctionne sur http://localhost:5173/
- [ ] Vous pouvez charger une decklist
- [ ] Les images se chargent depuis Scryfall
- [ ] Le PDF se télécharge correctement
- [ ] `npm run build` crée le dossier `dist/`
- [ ] Repo GitHub créé
- [ ] GitHub Pages configuré
- [ ] URL finale accessible

## 🎉 Vous êtes prêt!

Lancez maintenant:
```powershell
npm install && npm run dev
```

Puis ouvrez http://localhost:5173/

Bon développement! 🚀
