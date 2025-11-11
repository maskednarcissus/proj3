# 🚀 VitrineSorocabana - Automated Deployment Guide

This guide covers all automated deployment options for the VitrineSorocabana application.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Deployment Files Overview](#deployment-files-overview)
- [Platform-Specific Setup](#platform-specific-setup)
- [CI/CD Pipelines](#cicd-pipelines)
- [Deployment Scripts](#deployment-scripts)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Quick Start

### Option 1: Interactive Deployment Script

**Windows (PowerShell):**
```powershell
.\deploy.ps1
```

**Linux/Mac (Bash):**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Command-Line Deployment

```bash
# Build the application
./deploy.sh build

# Deploy to specific platform
./deploy.sh heroku
./deploy.sh render
./deploy.sh railway
./deploy.sh fly

# Deploy to all platforms
./deploy.sh all
```

### Option 3: Automated CI/CD

Push to your repository, and the CI/CD pipeline will automatically build and deploy:

```bash
git add .
git commit -m "Deploy application"
git push origin main
```

---

## 📁 Deployment Files Overview

| File | Purpose | Platform |
|------|---------|----------|
| `.github/workflows/deploy.yml` | GitHub Actions CI/CD | GitHub |
| `.gitlab-ci.yml` | GitLab CI/CD pipeline | GitLab |
| `render.yaml` | Render.com configuration | Render |
| `railway.json` | Railway configuration | Railway |
| `nixpacks.toml` | Nixpacks build config | Railway |
| `fly.toml` | Fly.io configuration | Fly.io |
| `Dockerfile` | Docker image definition | Docker/Any |
| `docker-compose.yml` | Local multi-container setup | Docker |
| `Procfile` | Process definition | Heroku |
| `deploy.sh` | Bash deployment script | Linux/Mac |
| `deploy.ps1` | PowerShell deployment script | Windows |

---

## 🔧 Platform-Specific Setup

### GitHub Actions (Automatic)

1. **Enable GitHub Actions** in your repository settings

2. **Add repository secrets** (Settings → Secrets and variables → Actions):
   ```
   HEROKU_API_KEY          - Your Heroku API key
   HEROKU_APP_NAME         - Your Heroku app name
   HEROKU_EMAIL            - Your Heroku email
   RENDER_DEPLOY_HOOK_URL  - Render deploy hook URL
   RAILWAY_TOKEN           - Railway API token
   DOCKER_USERNAME         - Docker Hub username
   DOCKER_PASSWORD         - Docker Hub password/token
   ```

3. **Push to main branch** to trigger automatic deployment:
   ```bash
   git push origin main
   ```

4. **Monitor** the deployment at: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`

### GitLab CI/CD (Automatic)

1. **Add CI/CD variables** (Settings → CI/CD → Variables):
   ```
   HEROKU_API_KEY
   HEROKU_APP_NAME
   RENDER_DEPLOY_HOOK_URL
   RAILWAY_TOKEN
   FLY_API_TOKEN
   CI_REGISTRY_USER
   CI_REGISTRY_PASSWORD
   ```

2. **Push to main branch** to trigger pipeline:
   ```bash
   git push origin main
   ```

3. **Monitor** the pipeline at: `https://gitlab.com/YOUR_USERNAME/YOUR_REPO/-/pipelines`

### Heroku (Manual/Automatic)

#### First-time Setup:

```bash
# Install Heroku CLI
# Windows: Download from https://devcenter.heroku.com/articles/heroku-cli
# Mac: brew tap heroku/brew && brew install heroku
# Linux: curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create vitrine-sorocabana

# Add buildpack
heroku buildpacks:set heroku/jvm

# Set environment variables
heroku config:set SPRING_PROFILES_ACTIVE=prod
```

#### Deploy:

```bash
# Manual deployment
git push heroku main

# Or use script
./deploy.sh heroku
```

### Render.com (Automatic)

#### First-time Setup:

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub/GitLab repository
4. Render will auto-detect the `render.yaml` file
5. Click **"Create Web Service"**

#### Manual Deploy:

```bash
# Get deploy hook URL from Render dashboard
export RENDER_DEPLOY_HOOK_URL="https://api.render.com/deploy/srv-xxxxx"

# Trigger deployment
./deploy.sh render
```

### Railway (Automatic)

#### First-time Setup:

1. Go to [Railway Dashboard](https://railway.app/)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect the configuration
5. Click **"Deploy"**

#### Manual Deploy:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

### Fly.io (Manual/Automatic)

#### First-time Setup:

```bash
# Install Fly CLI
# Windows: powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
# Mac: brew install flyctl
# Linux: curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Launch app (first time only)
flyctl launch --name vitrine-sorocabana --region gru

# Deploy
flyctl deploy
```

#### Subsequent Deployments:

```bash
# Deploy
flyctl deploy

# Or use script
./deploy.sh fly
```

### Docker Hub (Manual)

#### Setup:

```bash
# Login
docker login

# Set username
export DOCKER_USERNAME=your_username

# Build and push
./deploy.sh docker
```

#### Run deployed image:

```bash
docker run -d -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  your_username/vitrine-sorocabana:latest
```

### Docker Compose (Local)

#### Run locally:

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🔄 CI/CD Pipelines

### GitHub Actions Pipeline

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master`
- Manual trigger via GitHub UI

**Stages:**
1. **Build** - Compiles Java + React application
2. **Test** - Runs unit tests
3. **Deploy** - Deploys to multiple platforms (parallel)
4. **Notify** - Sends deployment status

**View logs:**
```
https://github.com/YOUR_USERNAME/YOUR_REPO/actions
```

### GitLab CI Pipeline

**Triggers:**
- Push to `main` or `master` branch
- Tags
- Manual trigger via GitLab UI

**Stages:**
1. **Build** - Compiles application
2. **Test** - Runs tests with coverage
3. **Package** - Creates JAR file
4. **Deploy** - Deploys to selected platform (manual)

**View logs:**
```
https://gitlab.com/YOUR_USERNAME/YOUR_REPO/-/pipelines
```

---

## 🔑 Environment Variables

### Required for Production

```bash
# Application
SPRING_PROFILES_ACTIVE=prod
PORT=8080

# Optional Database
DB_PASSWORD=your_secure_password

# Optional JVM Settings
JAVA_OPTS="-Xmx512m -Xms256m"
```

### Setting Environment Variables

**Heroku:**
```bash
heroku config:set SPRING_PROFILES_ACTIVE=prod
heroku config:set DB_PASSWORD=secret123
```

**Render:**
- Dashboard → Service → Environment → Add Variable

**Railway:**
- Dashboard → Project → Variables → New Variable

**Fly.io:**
```bash
flyctl secrets set SPRING_PROFILES_ACTIVE=prod
flyctl secrets set DB_PASSWORD=secret123
```

**Docker:**
```bash
docker run -e SPRING_PROFILES_ACTIVE=prod \
           -e DB_PASSWORD=secret123 \
           your_image
```

---

## 🛠️ Deployment Scripts

### Interactive Mode

Both scripts support interactive menus:

```bash
# Linux/Mac
./deploy.sh

# Windows
.\deploy.ps1
```

### Command Mode

```bash
# Build
./deploy.sh build

# Test
./deploy.sh test

# Deploy to specific platform
./deploy.sh heroku
./deploy.sh render
./deploy.sh railway
./deploy.sh fly

# Build and push Docker image
./deploy.sh docker

# Run with Docker Compose
./deploy.sh compose

# Deploy to ALL platforms
./deploy.sh all

# Show deployment URLs
./deploy.sh urls
```

### Script Features

- ✅ Automatic prerequisite checking
- ✅ Colored output for easy reading
- ✅ Error handling and recovery
- ✅ Multi-platform support
- ✅ Build verification
- ✅ Automatic authentication
- ✅ Progress indicators

---

## 🔍 Troubleshooting

### Build Fails

**Problem:** Maven build fails

**Solution:**
```bash
# Clean and rebuild
cd api
mvn clean install -DskipTests

# Check Java version
java -version  # Should be 17+

# Check Maven version
mvn -version   # Should be 3.6+
```

### Heroku Deployment Fails

**Problem:** Procfile not found or build error

**Solution:**
```bash
# Ensure Procfile exists in root
ls -la Procfile

# Check Heroku logs
heroku logs --tail

# Rebuild buildpack cache
heroku buildpacks:clear
heroku buildpacks:set heroku/jvm
```

### Docker Build Fails

**Problem:** Docker build fails or image too large

**Solution:**
```bash
# Clean Docker cache
docker system prune -a

# Build with no cache
docker build --no-cache -t vitrine-sorocabana .

# Check Dockerfile
cat Dockerfile
```

### GitHub Actions Fails

**Problem:** Workflow fails with authentication error

**Solution:**
1. Check repository secrets are set correctly
2. Verify API keys/tokens are valid
3. Check Actions logs for specific errors
4. Ensure workflow file syntax is correct

```bash
# Validate workflow locally (optional)
act -l  # Lists all jobs
```

### Port Already in Use

**Problem:** Application can't start - port 8080 in use

**Solution:**
```bash
# Find process using port 8080
# Windows
netstat -ano | findstr :8080

# Linux/Mac
lsof -i :8080

# Kill process
# Windows
taskkill /PID <PID> /F

# Linux/Mac
kill -9 <PID>
```

### Database Connection Issues

**Problem:** H2 database errors

**Solution:**
```bash
# Remove old database
rm -rf data/

# Restart application
./deploy.sh build

# Check database file permissions
ls -la data/
```

### Out of Memory Errors

**Problem:** Application crashes with OOM errors

**Solution:**
```bash
# Increase JVM memory
export JAVA_OPTS="-Xmx768m -Xms512m"

# Or in platform settings:
heroku config:set JAVA_OPTS="-Xmx768m -Xms512m"
```

---

## 📊 Monitoring Deployments

### Application URLs

After deployment, access your application at:

| Platform | URL |
|----------|-----|
| Heroku | `https://vitrine-sorocabana.herokuapp.com` |
| Render | `https://vitrine-sorocabana.onrender.com` |
| Railway | Check Railway dashboard |
| Fly.io | `https://vitrine-sorocabana.fly.dev` |
| Local | `http://localhost:8080` |

### Health Checks

```bash
# Check if application is running
curl https://your-app-url.com/

# Check specific endpoints
curl https://your-app-url.com/api/produtos
curl https://your-app-url.com/api/posts
```

### View Logs

```bash
# Heroku
heroku logs --tail

# Railway
railway logs

# Fly.io
flyctl logs

# Docker
docker logs <container_id>

# Docker Compose
docker-compose logs -f
```

---

## 🔐 Security Best Practices

1. **Never commit secrets** to version control
2. **Use environment variables** for sensitive data
3. **Rotate API keys** regularly
4. **Enable HTTPS** on all deployments
5. **Change default passwords** immediately
6. **Use strong database passwords** in production
7. **Enable authentication** on admin endpoints
8. **Keep dependencies updated**

---

## 📚 Additional Resources

- [Heroku Documentation](https://devcenter.heroku.com/)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Fly.io Documentation](https://fly.io/docs/)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [Docker Documentation](https://docs.docker.com/)

---

## 🆘 Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review platform-specific logs
3. Check platform status pages
4. Verify all environment variables are set
5. Test build locally first
6. Check GitHub/GitLab issues

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Application builds successfully locally
- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Default passwords changed
- [ ] Database backup created (if applicable)
- [ ] HTTPS enabled
- [ ] Domain configured (if custom domain)
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Performance tested
- [ ] Security audit completed

---

**Happy Deploying! 🚀**

