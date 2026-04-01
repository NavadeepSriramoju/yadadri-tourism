#!/bin/bash

# Yadadri Temple Tourism - Render Deployment Script
# This script builds and prepares the application for Render deployment

set -e  # Exit on error

echo "🚀 Yadadri Temple Tourism - Render Deployment Script"
echo "======================================================"

# Step 1: Build Backend
echo ""
echo "📦 Building Backend (Spring Boot)..."
cd backend
mvn clean package -DskipTests
cd ..

if [ $? -eq 0 ]; then
    echo "✅ Backend built successfully"
else
    echo "❌ Backend build failed"
    exit 1
fi

# Step 2: Build Frontend
echo ""
echo "🎨 Building Frontend (React)..."
cd frontend
npm install
npm run build
cd ..

if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Step 3: Prepare for deployment
echo ""
echo "📝 Preparing for deployment..."

# Verify Dockerfile exists
if [ ! -f "Dockerfile" ]; then
    echo "❌ Dockerfile not found in root directory"
    exit 1
fi

echo "✅ Dockerfile verified"

# Step 4: Commit to Git
echo ""
echo "🔄 Committing changes to Git..."
git add -A
git commit -m "🚀 Build for Render deployment - ready to deploy" || echo "No changes to commit"
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Changes pushed to GitHub"
else
    echo "⚠️  Could not push to GitHub (network issue?)"
fi

# Step 5: Summary
echo ""
echo "======================================================"
echo "✅ BUILD COMPLETE!"
echo "======================================================"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://render.com"
echo "2. Create a new Web Service (Backend)"
echo "3. Create a new Static Site (Frontend)"
echo "4. See RENDER_DEPLOYMENT.md for detailed instructions"
echo ""
echo "🔗 After deployment, you'll have:"
echo "   - Backend: https://yadadri-backend.onrender.com"
echo "   - Frontend: https://yadadri-frontend.onrender.com"
echo ""
