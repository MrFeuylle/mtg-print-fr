@echo off
REM ╔═══════════════════════════════════════════════════════════════╗
REM ║           VERIFICATION ENVIRONNEMENT - MTG PRINT FR            ║
REM ╚═══════════════════════════════════════════════════════════════╝

chcp 65001 >nul 2>&1

cls
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║        VÉRIFICATION ENVIRONNEMENT - MTG PRINT FR              ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

setlocal enabledelayedexpansion

REM Vérifier Node.js
echo [1/5] Vérification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo     ✗ Node.js NOT FOUND
    echo.
    echo ERREUR: Node.js n'est pas installé!
    echo.
    echo Solution: Téléchargez depuis https://nodejs.org
    echo           Installez la version LTS
    echo           Redémarrez votre terminal
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo     ✓ Node.js: %NODE_VERSION%

REM Vérifier npm
echo [2/5] Vérification de npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo     ✗ npm NOT FOUND
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo     ✓ npm: %NPM_VERSION%

REM Vérifier package.json
echo [3/5] Vérification de package.json...
if not exist "package.json" (
    echo     ✗ package.json NOT FOUND
    pause
    exit /b 1
)
echo     ✓ package.json found

REM Vérifier vite.config.js
echo [4/5] Vérification de vite.config.js...
if not exist "vite.config.js" (
    echo     ✗ vite.config.js NOT FOUND
    pause
    exit /b 1
)
echo     ✓ vite.config.js found

REM Vérifier src/
echo [5/5] Vérification de src/...
if not exist "src\App.jsx" (
    echo     ✗ src/ fichiers manquants
    pause
    exit /b 1
)
echo     ✓ Tous les fichiers source présents

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                  ✓ ENVIRONNEMENT VALIDÉ                       ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo Prochaines étapes:
echo.
echo   npm install        Installer les dépendances (1ère fois)
echo   npm run dev        Lancer le serveur local
echo   npm run build      Build production
echo.
echo Ou double-cliquez sur: start-dev.bat
echo.
pause
