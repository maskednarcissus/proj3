# ⚡ Quick Deploy Reference - VitrineSorocabana

## 🚀 One-Line Deployments

### Automated (Push to Deploy)
```bash
git add . && git commit -m "Deploy" && git push origin main
```
*Automatically triggers GitHub Actions or GitLab CI*

### Interactive Script
```bash
# Windows
.\deploy.ps1

# Linux/Mac
./deploy.sh
```

### Platform-Specific Commands

```bash
# Heroku
git push heroku main

# Render (trigger webhook)
curl -X POST $RENDER_DEPLOY_HOOK_URL

# Railway
railway up

# Fly.io
flyctl deploy

# Docker Build & Run
docker-compose up -d
```

---

## 📦 Files Created

| File | What It Does |
|------|--------------|
| `.github/workflows/deploy.yml` | 🤖 Auto-deploys on every push to main (GitHub) |
| `.gitlab-ci.yml` | 🤖 Auto-deploys on every push to main (GitLab) |
| `render.yaml` | 🎯 Render.com auto-detects and deploys |
| `railway.json` | 🎯 Railway auto-detects and deploys |
| `fly.toml` | 🎯 Fly.io deployment configuration |
| `deploy.sh` | 🛠️ Interactive deployment script (Linux/Mac) |
| `deploy.ps1` | 🛠️ Interactive deployment script (Windows) |
| `docker-compose.yml` | 🐳 Run entire stack locally |

---

## ⚙️ Setup Requirements

### For GitHub Actions (Automatic)
Add these secrets in GitHub repo settings:
```
HEROKU_API_KEY
HEROKU_APP_NAME
HEROKU_EMAIL
RENDER_DEPLOY_HOOK_URL
RAILWAY_TOKEN
DOCKER_USERNAME
DOCKER_PASSWORD
```

### For Manual Deployments
Install CLI tools as needed:
```bash
# Heroku
# https://devcenter.heroku.com/articles/heroku-cli

# Railway
npm install -g @railway/cli

# Fly.io
# https://fly.io/docs/hands-on/install-flyctl/
```

---

## 🎯 Recommended Deployment Flow

### First Time Setup
1. Choose your platform (Heroku, Render, Railway, or Fly.io)
2. Create account on chosen platform
3. Set up CI/CD (optional but recommended)
4. Run deployment

### Using GitHub Actions (Recommended)
```bash
# 1. Add secrets to GitHub repo
# 2. Push to main
git push origin main
# 3. Watch deployment at github.com/YOUR_REPO/actions
```

### Using Interactive Script (Quick)
```bash
# Windows
.\deploy.ps1
# Select option 1 (Build), then option 3-6 for platform

# Linux/Mac
./deploy.sh
# Select option 1 (Build), then option 3-6 for platform
```

### Using Command Line (Pro)
```bash
# Build
./deploy.sh build

# Deploy to preferred platform
./deploy.sh heroku    # or render, railway, fly
```

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | `cd api && mvn clean package -DskipTests` |
| Port 8080 in use | Change port: `set PORT=8081` or `export PORT=8081` |
| GitHub Actions fails | Check repo secrets are set correctly |
| Heroku login fails | `heroku login` then try again |
| Docker build slow | `docker system prune -a` to clean cache |
| Out of memory | Increase to paid tier or optimize memory |

---

## 📱 Platform Comparison

| Platform | Free Tier | Auto-Deploy | Persistent Storage | Best For |
|----------|-----------|-------------|-------------------|----------|
| **Heroku** | ✅ Yes | ✅ Yes | ⚠️ Sleeps after 30min | Quick demos |
| **Render** | ✅ Yes | ✅ Yes | ⚠️ Sleeps after 15min | Simple projects |
| **Railway** | ⚠️ $5 credit | ✅ Yes | ✅ Yes | Active development |
| **Fly.io** | ✅ Yes | ✅ Yes | ✅ Yes | Production apps |
| **Docker** | ✅ Free | ➖ Manual | ✅ Yes | Self-hosting |

---

## ✅ Pre-Deployment Checklist

- [ ] App builds locally: `cd api && mvn package`
- [ ] Tests pass: `cd api && mvn test`
- [ ] Environment variables set
- [ ] Default password changed (admin@vitrine.com / admin123)
- [ ] Database backed up (if production data exists)

---

## 🌐 After Deployment

### Default Credentials
```
Admin:
  Email: admin@vitrine.com
  Password: admin123

User:
  Email: user@vitrine.com
  Password: user123
```

**⚠️ CHANGE THESE IMMEDIATELY IN PRODUCTION!**

### Access Your App
- Portal: `https://your-app-url.com/`
- Store: `https://your-app-url.com/loja`
- Blog: `https://your-app-url.com/blog`
- Admin: `https://your-app-url.com/admin`

### Monitor Logs
```bash
# Heroku
heroku logs --tail

# Railway
railway logs

# Fly.io
flyctl logs

# Docker
docker-compose logs -f
```

---

## 💡 Pro Tips

1. **Use GitHub Actions** for hands-free deployment
2. **Start with Render** if you want zero config
3. **Use Railway** if you need always-on free tier
4. **Choose Fly.io** for production with free tier
5. **Test locally first** with Docker Compose
6. **Monitor costs** - free tiers have limits
7. **Enable HTTPS** - most platforms do this automatically
8. **Set up alerts** for downtime monitoring

---

## 📞 Quick Commands Reference

```bash
# BUILD
./deploy.sh build              # Build application
cd api && mvn package          # Direct Maven build

# TEST
./deploy.sh test               # Run tests
cd api && mvn test             # Direct Maven test

# DEPLOY
./deploy.sh all                # Deploy everywhere
./deploy.sh heroku             # Heroku only
./deploy.sh render             # Render only
./deploy.sh railway            # Railway only
./deploy.sh fly                # Fly.io only

# DOCKER
./deploy.sh compose            # Run locally
docker-compose up -d           # Start services
docker-compose down            # Stop services
docker-compose logs -f         # View logs

# INFO
./deploy.sh urls               # Show all deployment URLs
heroku open                    # Open Heroku app
flyctl open                    # Open Fly.io app
```

---

**That's it! Choose your method and deploy! 🚀**

*For detailed instructions, see [DEPLOYMENT_AUTOMATION.md](./DEPLOYMENT_AUTOMATION.md)*

