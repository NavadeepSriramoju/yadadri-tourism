# Render.com Deployment Guide - Yadadri Temple Tourism

Complete step-by-step guide to deploy your full-stack application on Render.com with standalone backend and frontend.

## Overview

This guide deploys:
- **Backend**: Spring Boot API on Render (via Docker)
- **Frontend**: React App on Render (via Nginx)
- **Database**: H2 In-Memory (for demo/development)

## Prerequisites

1. **GitHub Account**: Repository must be pushed to GitHub
2. **Render Account**: Free account at https://render.com
3. **Git**: Installed locally
4. **Docker**: For local testing (optional)

## Step 1: Prepare Your Repository

### 1.1 Update GitHub with Render Configuration

```bash
cd c:\Users\Navadheep\Downloads\yadadri-fullstack\yadadri-project
git add Dockerfile .dockerignore render.yaml
git add backend/ frontend/
git commit -m "🚀 Add Render deployment configuration with Docker and production settings"
git push origin main
```

### 1.2 Verify All Files Are Committed

```bash
git status  # Should show: nothing to commit, working tree clean
```

## Step 2: Create Backend Service on Render

### 2.1 Go to Render Dashboard
- Visit: https://dashboard.render.com
- Click "New +" → "Web Service"

### 2.2 Configure Backend Service

**Basic Settings:**
- **Name**: `yadadri-backend`
- **Region**: Choose closest to your users (e.g., Singapore, Europe)
- **Branch**: `main`
- **Runtime**: `Docker`

**Source:**
- **GitHub Account**: Select your account (authorize if needed)
- **Repository**: Select `yadadri-tourism`
- **Root Directory**: Leave empty

**Docker Configuration:**
- **Dockerfile Path**: `./Dockerfile`
- **Docker Context**: `.`

**Environment Variables:**
- `CORS_ORIGIN`: `*` (allows any origin for testing)
- `JWT_SECRET`: `your-super-secret-key-change-in-production`

**Pricing Plan:**
- Select **Free** tier (0.50 credits/hour)

**Auto-Deploy:**
- Enable "Auto-deploy new commits"

### 2.3 Create Service

Click "Create Web Service" and wait 5-10 minutes for build to complete.

**Note the URL**: Something like `https://yadadri-backend.onrender.com`

## Step 3: Create Frontend Service on Render

### 3.1 Go to Render Dashboard Again
- Click "New +" → "Static Site"

### 3.2 Configure Frontend Service

**Basic Settings:**
- **Name**: `yadadri-frontend`
- **Branch**: `main`
- **Region**: Same as backend

**Source:**
- **GitHub Account**: Select your account
- **Repository**: Select `yadadri-tourism`
- **Root Directory**: `frontend`

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```bash
build
```

**Environment Variables:**
- `REACT_APP_API_URL`: `https://yadadri-backend.onrender.com` (your backend URL)

### 3.3 Create Service

Click "Create Static Site" and wait 2-3 minutes for build.

**Note the URL**: Something like `https://yadadri-frontend.onrender.com`

## Step 4: Update Frontend Configuration

### 4.1 Update Frontend Environment

Go to frontend/src/App.jsx and verify:

```javascript
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
```

### 4.2 Update Frontend Redeploy

After updating App.jsx:

```bash
git add frontend/src/App.jsx
git commit -m "🔧 Update API URL configuration for Render deployment"
git push origin main
```

Frontend will auto-redeploy on Render.

## Step 5: Test Your Deployment

### 5.1 Test Backend Health

```bash
curl https://yadadri-backend.onrender.com/health
```

Expected response:
```json
{
  "status": "UP",
  "service": "Yadadri Temple Tourism API",
  "version": "1.0.0"
}
```

### 5.2 Test Frontend

Visit: `https://yadadri-frontend.onrender.com`

You should see your temple tourism website with all features.

### 5.3 Test API Integration

Try creating a booking or fetching darshan timings from the frontend.

## Step 6: Monitor Your Services

### 6.1 Backend Monitoring
- Go to Backend Service Dashboard
- Check "Logs" tab for real-time logs
- Monitor CPU/Memory usage

### 6.2 Frontend Monitoring
- Go to Frontend Service Dashboard
- Check Build Logs for any issues

## Step 7: Custom Domain (Optional)

### 7.1 Add Custom Domain to Backend
- Go to Backend Service Settings
- Click "Add Custom Domain"
- Add your domain (requires DNS configuration)

### 7.2 Add Custom Domain to Frontend
- Same process for Frontend Service

## Live URLs

After successful deployment:

- **Frontend**: `https://yadadri-frontend.onrender.com`
- **Backend API**: `https://yadadri-backend.onrender.com`
- **Health Check**: `https://yadadri-backend.onrender.com/health`

## Sharing Your Live Application

### Copy-Paste These Links:

**To Share Website:**
```
https://yadadri-frontend.onrender.com
```

**To Share API Documentation:**
```
Backend URL: https://yadadri-backend.onrender.com
Health Check: https://yadadri-backend.onrender.com/health
```

## Troubleshooting

### Backend Failing to Build?

Check the build logs:
1. Go to Backend Service → Logs
2. Look for error messages
3. Common issues:
   - Java version mismatch
   - Maven dependencies not downloading
   - Solution: Rebuild and check internet connection

### Frontend Not Loading?

1. Check Build Logs in Frontend Service
2. Verify `npm install` completes successfully
3. Check Console (F12) in browser for errors

### API Calls Failing (CORS)?

Update backend environment variable:
```
CORS_ORIGIN: https://yadadri-frontend.onrender.com
```

Then manually trigger a rebuild in Render dashboard.

### Cold Starts?

Render spins down free tier services after 15 minutes of inactivity.
- First request takes 30-60 seconds
- Solution: Upgrade to paid plan OR just wait

## Environment Variables Reference

| Variable | Backend | Frontend | Example |
|----------|---------|----------|---------|
| `PORT` | ✓ | - | `8080` |
| `CORS_ORIGIN` | ✓ | - | `*` or domain |
| `JWT_SECRET` | ✓ | - | `your-secret-key` |
| `REACT_APP_API_URL` | - | ✓ | `https://backend-url` |

## Next Steps

1. ✅ Update your GitHub profile README with live links
2. ✅ Create a professional portfolio page
3. ✅ Add more advanced features to the backend
4. ✅ Implement database persistence (PostgreSQL on Render)
5. ✅ Set up CI/CD pipeline

## Support

For issues with Render:
- Documentation: https://render.com/docs
- Status: https://status.render.com
- Support: https://render.com/support

---

**Your Application is Now Live!** 🎉

Share your links with anyone and it works globally. No localhost, no ngrok, pure production deployment.
