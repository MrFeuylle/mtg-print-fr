@echo off
REM Script de démarrage rapide pour Windows
REM Usage: verify.bat

echo.
echo ============================================================
echo MTG Print FR - Verification Environnement Windows
echo ============================================================
echo.

REM Verifier Node.js
echo Verification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo X Node.js n'est PAS installe
    echo.
    echo Telechargez depuis: https://nodejs.org
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo OK - Node.js: %NODE_VERSION%
echo OK - npm: %NPM_VERSION%
echo.

REM Verifier fichiers
echo Verification des fichiers...
if not exist "package.json" (
    echo X package.json introuvable
    pause
    exit /b 1
)
echo OK - package.json

if not exist "vite.config.js" (
    echo X vite.config.js introuvable
    pause
    exit /b 1
)
echo OK - vite.config.js

if not exist "src\App.jsx" (
    echo X Fichiers source manquants (src/)
    pause
    exit /b 1
)
echo OK - Tous les fichiers source

if not exist "node_modules" (
    echo.
    echo ! node_modules/ n'existe pas encore
    echo.
    echo Voulez-vous installer les dependances maintenant?
    echo Tapez: npm install
    echo.
) else (
    echo OK - node_modules/
)

echo.
echo ============================================================
echo Environnement OK!
echo ============================================================
echo.
echo Prochaines etapes:
echo.
echo   npm install        (installer dependances)
echo   npm run dev        (lancer serveur local)
echo   npm run build      (build production)
echo.
echo Documentation: INSTALLATION.md, README.md
echo.
pause
