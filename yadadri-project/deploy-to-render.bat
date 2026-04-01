@echo off
REM Yadadri Temple Tourism - Render Deployment Script (Windows)
REM This script builds and prepares the application for Render deployment

setlocal enabledelayedexpansion

echo.
echo 🚀 Yadadri Temple Tourism - Render Deployment Script
echo ======================================================

REM Step 1: Build Backend
echo.
echo 📦 Building Backend (Spring Boot)...
cd backend
call mvn clean package -DskipTests
cd ..

if !ERRORLEVEL! EQU 0 (
    echo ✅ Backend built successfully
) else (
    echo ❌ Backend build failed
    exit /b 1
)

REM Step 2: Build Frontend
echo.
echo 🎨 Building Frontend (React)...
cd frontend
call npm install
call npm run build
cd ..

if !ERRORLEVEL! EQU 0 (
    echo ✅ Frontend built successfully
) else (
    echo ❌ Frontend build failed
    exit /b 1
)

REM Step 3: Verify Docker files
echo.
echo 📝 Verifying deployment files...

if exist "Dockerfile" (
    echo ✅ Dockerfile verified
) else (
    echo ❌ Dockerfile not found
    exit /b 1
)

REM Step 4: Git commit
echo.
echo 🔄 Committing changes to Git...
call git add -A
call git commit -m "🚀 Build for Render deployment - ready to deploy" 2>nul
call git push origin main

if !ERRORLEVEL! EQU 0 (
    echo ✅ Changes pushed to GitHub
) else (
    echo ⚠️  Note: Could not push (might be no changes or network issue)
)

REM Step 5: Summary
echo.
echo ======================================================
echo ✅ BUILD COMPLETE!
echo ======================================================
echo.
echo 📋 Next Steps:
echo 1. Go to https://render.com
echo 2. Create a new Web Service (Backend)
echo 3. Create a new Static Site (Frontend)
echo 4. See RENDER_DEPLOYMENT.md for detailed instructions
echo.
echo 🔗 After deployment, you'll have:
echo    Backend: https://yadadri-backend.onrender.com
echo    Frontend: https://yadadri-frontend.onrender.com
echo.
pause
