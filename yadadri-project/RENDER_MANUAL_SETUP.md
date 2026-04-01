# ⚡ RENDER DEPLOYMENT - MANUAL WEB SETUP (Working Method)

**⚠️ Important**: Use the **Web Dashboard** method below (NOT render.yaml for manual setup)

---

## 🔧 Fix for "Dockerfile not found" Error

The issue: Render wasn't finding the Dockerfile because settings weren't configured correctly.

**Solution**: Follow these exact steps using Render's web dashboard.

---

## 📋 STEP 1: Deploy Backend to Render (5 minutes)

### 1.1 Go to Render Dashboard
- URL: https://render.com/dashboard
- Login with your account

### 1.2 Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**

### 1.3 Connect Repository

1. **GitHub settings screen** appears
2. If first time: Click "Connect with GitHub"
3. Authorize Render to access your GitHub
4. Select: **`yadadri-tourism`** repository
5. Click **"Connect"**

### 1.4 Configure Service

**Basic Info:**
- **Name**: `yadadri-backend`
- **Region**: `Singapore` (or closest to you)
- **Branch**: `main`
- **Runtime**: `Docker`

**Source:**
- **Repository**: Should auto-select `NavadeepSriramoju/yadadri-tourism`
- **Root Directory**: Leave **empty** (or put `.`)

**Docker:**
- **Dockerfile Path**: `./Dockerfile`
- **Docker Context**: `.` (root directory)

**Environment Variables:**
Click **"Add Environment Variable"** and add these:

| Key | Value |
|-----|-------|
| `PORT` | `8080` |
| `CORS_ORIGIN` | `*` (for now) |
| `JWT_SECRET` | `yadadri-secret-key-2024` |

**Instance Type:**
- Select **Free** tier
- Auto-deploy: **✓ ON**

### 1.5 Create Service

1. Scroll to bottom
2. Click **"Create Web Service"**
3. Watch the build logs

⏳ **Build takes 5-10 minutes** - Be patient! You'll see:
```
Building...
Pushing...
Deployed!
```

### ✅ Backend URL

Once deployed, you'll see a URL like:
```
https://yadadri-backend.onrender.com
```

**Save this URL!** You'll need it for frontend.

---

## 📋 STEP 2: Deploy Frontend to Render (5 minutes)

### 2.1 Create New Static Site

1. Go back to: https://render.com/dashboard
2. Click **"New +"** → **"Static Site"**

### 2.2 Connect Repository

1. Select: **`yadadri-tourism`** repo (auto-select)
2. Click **"Connect"**

### 2.3 Configure Static Site

**Basic Info:**
- **Name**: `yadadri-frontend`
- **Branch**: `main`
- **Region**: Same as backend (Singapore/Europe)

**Build & Deploy:**
- **Root Directory**: `frontend`
- **Build Command**: 
  ```
  npm install && npm run build
  ```
- **Publish Directory**: 
  ```
  build
  ```

**Environment Variables:**

Add one variable:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://yadadri-backend.onrender.com` |

(Replace with your actual backend URL from Step 1)

**Auto-deploy**: **✓ ON**

### 2.4 Create Static Site

1. Scroll to bottom
2. Click **"Create Static Site"**
3. Wait 2-3 minutes for build

### ✅ Frontend URL

Once built, you'll see:
```
https://yadadri-frontend.onrender.com
```

**Save this too!**

---

## ✅ TEST YOUR DEPLOYMENT

### Test 1: Backend Health Check

Open in browser:
```
https://yadadri-backend.onrender.com/health
```

You should see:
```json
{
  "status": "UP",
  "service": "Yadadri Temple Tourism API",
  "version": "1.0.0"
}
```

✅ If you see this, backend is working!

### Test 2: Frontend Website

Open in browser:
```
https://yadadri-frontend.onrender.com
```

You should see your temple tourism website with all animations!

✅ If it loads, frontend is working!

---

## 🔧 FIXING CORS ERROR

If frontend can't talk to backend, update backend environment:

1. Go to backend service in Render dashboard
2. Go to **"Environment"** tab
3. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN = https://yadadri-frontend.onrender.com
   ```
4. Click **"Save"**
5. Render auto-redeploys (1-2 min)

---

## 🚀 AUTO-DEPLOY FROM GITHUB

Both services are set to auto-deploy!

**What happens:**
1. You push code to GitHub: `git push origin main`
2. Render detects change automatically
3. Renders rebuilds and redeploys (5-10 min)
4. Your live site updates automatically

**You never need to manually deploy again!**

---

## 📊 YOUR LIVE APPLICATION

| Component | URL |
|-----------|-----|
| **Frontend** | `https://yadadri-frontend.onrender.com` |
| **Backend** | `https://yadadri-backend.onrender.com` |
| **Health Check** | `https://yadadri-backend.onrender.com/health` |

---

## 🐛 TROUBLESHOOTING

### ❌ "Dockerfile not found" Error

**Cause**: Root directory or path setting was wrong

**Fix:**
1. Go to backend service → Settings
2. Check: **Root Directory** is empty or `.`
3. Check: **Dockerfile Path** is `./Dockerfile`
4. Click **"Save"** and manually redeploy

### ❌ Build Keeps Failing

Check the **Build Logs**:
1. Go to service dashboard
2. Click **"Logs"** tab
3. Look at last 50 lines for error
4. Common issues:
   - Java version mismatch
   - Maven timeout
   - Missing pom.xml

**Solution**: Manually trigger rebuild:
1. Go to your service
2. Click **"Manual Deploy"** button at top
3. Select **"Deploy latest"**
4. Wait 10 minutes

### ❌ Frontend won't load CSS/animations

**Check 1:**
- Clear browser cache (Ctrl+Shift+Del)
- Reload site (Ctrl+F5)

**Check 2:**
- Check browser console (F12)
- Look for red error messages
- Usually: CORS or API URL issue

**Check 3:**
- Verify `REACT_APP_API_URL` env var is correct
- Redeploy frontend

### ❌ API calls from frontend fail

**Check CORS:**
1. Go to backend service
2. Environment → `CORS_ORIGIN`
3. Set to: `https://yadadri-frontend.onrender.com`
4. Save & wait for auto-redeploy

---

## 💡 USEFUL COMMANDS

### View Build Logs
Go to service → **Logs** tab

### Force Rebuild
Go to service → Click **"Manual Deploy"** → **"Deploy latest"**

### Update Environment Variables
Go to service → **Environment** → Edit → **Save**

### Check Service Status
Dashboard shows green ✅ if all good

---

## 🎉 SUCCESS!

If you see both URLs working and tests pass:

✅ Your app is live!
✅ It's accessible globally!
✅ No localhost needed!
✅ Works in any browser!

---

## 📱 SHARE YOUR APP

Send people these links:

**Website:**
```
https://yadadri-frontend.onrender.com
```

**API Status:**
```
https://yadadri-backend.onrender.com/health
```

---

## ⚡ NEXT STEPS

1. **Update GitHub Profile** (see GITHUB_PROFILE_IMPROVEMENT.md)
2. **Add Custom Domain** (Render settings → Custom Domain)
3. **Monitor Traffic** (Dashboard → Metrics)
4. **Add Database** (PostgreSQL addon from Render)
5. **Enable Paid Plan** (for always-on, no cold starts)

---

## 📞 GETTING HELP

- Render Docs: https://render.com/docs/docker
- Status Page: https://status.render.com
- Your Repo: https://github.com/NavadeepSriramoju/yadadri-tourism

---

**That's it! Your app is now live on the internet!** 🚀
