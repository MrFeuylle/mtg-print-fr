@echo off
REM Script de demarrage rapide pour npm run dev
REM Usage: start-dev.bat

echo.
echo ============================================================
echo MTG Print FR - Serveur de Developpement
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

echo.
echo Demarrage du serveur...
echo.
echo Ouvrez votre navigateur a:
echo   http://localhost:5173/
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.
pause

npm run dev
