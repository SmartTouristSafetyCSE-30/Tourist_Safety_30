@echo off
echo.
echo ========================================
echo   Smart Tourist Safety System
echo   Ministry of DoNER - Government of India
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if package.json exists
if not exist package.json (
    echo Creating package.json...
    echo {
    echo   "name": "smart-tourist-safety-system",
    echo   "version": "1.0.0",
    echo   "description": "Smart Tourist Safety System - Ministry of DoNER",
    echo   "main": "server.js",
    echo   "scripts": {
    echo     "start": "node server.js",
    echo     "dev": "node server.js"
    echo   },
    echo   "dependencies": {
    echo     "express": "^4.18.2"
    echo   },
    echo   "keywords": ["tourism", "safety", "government", "india"],
    echo   "author": "Ministry of DoNER, Government of India"
    echo } > package.json
)

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo Starting Smart Tourist Safety System Server...
echo.

REM Start the server
node server.js

pause