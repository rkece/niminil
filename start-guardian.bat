@echo off
title Guardian System Controller
color 0A

echo ==================================================
echo       GUARDIAN WOMEN SAFETY SYSTEM
echo ==================================================
echo.

:: 1. Check for Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit
)
echo [OK] Node.js found.

:: 2. Check for Firebase Key
if not exist "serviceAccountKey.json" (
    color 0C
    echo [CRITICAL ERROR] MISSING FIREBASE KEY
    echo ==================================================
    echo You must download 'serviceAccountKey.json' from Firebase!
    echo.
    echo 1. Go to https://console.firebase.google.com/
    echo 2. Open Project Settings -> Service Accounts
    echo 3. Click 'Generate new private key'
    echo 4. Save the file exactly as 'serviceAccountKey.json' in this folder:
    echo    %CD%
    echo ==================================================
    pause
    exit
)
echo [OK] Service Key found.

:: 3. Install Dependencies (Simpler check)
if not exist "node_modules" (
    echo [INFO] First run detected. Installing libraries...
    call npm install serialport firebase-admin
    if %errorlevel% neq 0 (
        color 0C
        echo [ERROR] Failed to install libraries. Check internet connection.
        pause
        exit
    )
)

:: 4. Start the Bridge
echo.
echo [1/2] Opening Admin Dashboard...
start "" "admin-firebase.html"

echo [2/2] Starting Arduino Bridge...
echo.
echo ======================================================
echo  DO NOT CLOSE THIS WINDOW
echo  This bridge sends Arduino signals to the Dashboard.
echo ======================================================
echo.

:: RUN THE BRIDGE
node arduino-bridge.js

:: If node crashes, show error
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] The Bridge Script crashed!
    echo Read the error message above to fix it.
)

echo.
echo Script finished. Press text key to close...
pause
