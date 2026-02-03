@echo off
REM Script de build pour production
REM Usage: build.bat

echo.
echo ============================================================
echo MTG Print FR - Build Production
echo ============================================================
echo.

REM Verifier Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo Erreur: Node.js n'est pas installe!
    echo Telechargez depuis: https://nodejs.org
    echo.
    pause
    exit /b 1
)

REM Verifier node_modules
if not exist "node_modules" (
    echo node_modules/ n'existe pas
    echo Installation des dependances...
    echo.
    call npm install
    if errorlevel 1 (
        echo Erreur lors de l'installation!
        pause
        exit /b 1
    )
)

echo Compilation en cours...
echo.

npm run build

if errorlevel 1 (
    echo.
    echo Erreur lors du build!
    pause
    exit /b 1
)

echo.
echo ============================================================
echo Build reussi!
echo ============================================================
echo.
echo Le dossier 'dist/' est pret pour GitHub Pages
echo.
echo Prochaines etapes:
echo   1. Uploade le contenu de 'dist/' sur GitHub Pages
echo   2. Accede a: https://votre-username.github.io/mtg-print-fr/
echo.
echo Voir INSTALLATION.md pour les details du deploiement
echo.
pause
