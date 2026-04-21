@echo off
echo ========================================
echo Smart Tourist Safety System - Setup
echo Ministry of DoNER - Government of India
echo ========================================
echo.

echo [1/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Setting up demo users in database...
node setup-demo-users.js
if errorlevel 1 (
    echo WARNING: Database setup failed. Make sure MySQL is running.
    echo Please run MySQL and execute: mysql -u root -p ^< setup-database.sql
)

echo.
echo [3/4] Starting server...
echo.
echo ========================================
echo Server will start on http://localhost:3000
echo ========================================
echo.
echo Demo Credentials:
echo   Tourist: demo_tourist / tourist123
echo   Police: demo_police / police123
echo   Tourism: demo_tourism / tourism123
echo   Admin: demo_admin / admin123
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

node server.js
