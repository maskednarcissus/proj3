###############################################################################
# VitrineSorocabana Auto-Deployment Script (PowerShell)
# This script automates the deployment process to various platforms
###############################################################################

# Set error action preference
$ErrorActionPreference = "Stop"

# Color functions
function Write-Header {
    param([string]$Message)
    Write-Host "`n========================================" -ForegroundColor Blue
    Write-Host $Message -ForegroundColor Blue
    Write-Host "========================================`n" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ $Message" -ForegroundColor Cyan
}

# Check if command exists
function Test-Command {
    param([string]$Command)
    $null -ne (Get-Command $Command -ErrorAction SilentlyContinue)
}

# Build application
function Build-Application {
    Write-Header "Building Application"
    
    if (-not (Test-Path "api")) {
        Write-Error "api directory not found!"
        exit 1
    }
    
    Write-Info "Building with Maven (includes frontend build)..."
    Set-Location api
    mvn clean package -DskipTests
    Set-Location ..
    
    if (Test-Path "api/target/vitrine-sorocabana-1.0.0.jar") {
        Write-Success "Build completed successfully!"
        Write-Info "JAR location: api/target/vitrine-sorocabana-1.0.0.jar"
    } else {
        Write-Error "Build failed! JAR not found."
        exit 1
    }
}

# Test application locally
function Test-Local {
    Write-Header "Testing Application Locally"
    
    Write-Info "Running tests..."
    Set-Location api
    mvn test
    Set-Location ..
    
    Write-Success "Tests passed!"
}

# Deploy to Heroku
function Deploy-Heroku {
    Write-Header "Deploying to Heroku"
    
    if (-not (Test-Command "heroku")) {
        Write-Error "Heroku CLI not installed!"
        Write-Info "Install from: https://devcenter.heroku.com/articles/heroku-cli"
        return
    }
    
    Write-Info "Checking Heroku authentication..."
    try {
        heroku auth:whoami
    } catch {
        heroku login
    }
    
    Write-Info "Deploying to Heroku..."
    try {
        git push heroku main
    } catch {
        git push heroku master
    }
    
    Write-Info "Setting environment variables..."
    heroku config:set SPRING_PROFILES_ACTIVE=prod
    
    Write-Success "Deployed to Heroku!"
    Write-Info "Opening application..."
    heroku open
}

# Deploy to Render
function Deploy-Render {
    Write-Header "Deploying to Render"
    
    $deployHook = $env:RENDER_DEPLOY_HOOK_URL
    if (-not $deployHook) {
        Write-Error "RENDER_DEPLOY_HOOK_URL not set!"
        Write-Info "Get your deploy hook from Render dashboard"
        return
    }
    
    Write-Info "Triggering Render deployment..."
    Invoke-RestMethod -Uri $deployHook -Method Post
    
    Write-Success "Render deployment triggered!"
    Write-Info "Check status at: https://dashboard.render.com/"
}

# Deploy to Railway
function Deploy-Railway {
    Write-Header "Deploying to Railway"
    
    if (-not (Test-Command "railway")) {
        Write-Warning "Railway CLI not installed. Installing..."
        npm install -g @railway/cli
    }
    
    Write-Info "Deploying to Railway..."
    railway up
    
    Write-Success "Deployed to Railway!"
}

# Deploy to Fly.io
function Deploy-Fly {
    Write-Header "Deploying to Fly.io"
    
    if (-not (Test-Command "flyctl")) {
        Write-Error "Fly CLI not installed!"
        Write-Info "Install with: powershell -Command `"iwr https://fly.io/install.ps1 -useb | iex`""
        return
    }
    
    Write-Info "Logging into Fly.io..."
    flyctl auth login
    
    # Check if app exists
    $apps = flyctl apps list | Out-String
    if ($apps -notmatch "vitrine-sorocabana") {
        Write-Info "Creating new Fly.io app..."
        flyctl launch --no-deploy
    }
    
    Write-Info "Deploying to Fly.io..."
    flyctl deploy
    
    Write-Success "Deployed to Fly.io!"
    Write-Info "Opening application..."
    flyctl open
}

# Build and push Docker image
function Deploy-Docker {
    Write-Header "Building and Pushing Docker Image"
    
    if (-not (Test-Command "docker")) {
        Write-Error "Docker not installed!"
        return
    }
    
    $dockerUser = $env:DOCKER_USERNAME
    if (-not $dockerUser) {
        $dockerUser = Read-Host "Enter Docker Hub username"
        $env:DOCKER_USERNAME = $dockerUser
    }
    
    Write-Info "Logging into Docker Hub..."
    docker login
    
    Write-Info "Building Docker image..."
    docker build -t "$dockerUser/vitrine-sorocabana:latest" .
    
    Write-Info "Pushing to Docker Hub..."
    docker push "$dockerUser/vitrine-sorocabana:latest"
    
    Write-Success "Docker image pushed successfully!"
    Write-Info "Image: $dockerUser/vitrine-sorocabana:latest"
}

# Run locally with Docker Compose
function Run-DockerCompose {
    Write-Header "Running with Docker Compose"
    
    if (-not (Test-Command "docker-compose") -and -not (Test-Command "docker")) {
        Write-Error "Docker Compose not installed!"
        return
    }
    
    Write-Info "Starting services..."
    docker-compose up -d
    
    Write-Success "Services started!"
    Write-Info "Application: http://localhost:8080"
    Write-Info "View logs: docker-compose logs -f"
}

# Show deployment URLs
function Show-Urls {
    Write-Header "Deployment URLs"
    
    Write-Host ""
    Write-Info "Heroku: https://vitrine-sorocabana.herokuapp.com"
    Write-Info "Render: https://vitrine-sorocabana.onrender.com"
    Write-Info "Railway: Check Railway dashboard"
    Write-Info "Fly.io: https://vitrine-sorocabana.fly.dev"
    Write-Host ""
}

# Show menu
function Show-Menu {
    Write-Host ""
    Write-Header "VitrineSorocabana Deployment Tool"
    Write-Host ""
    Write-Host "1)  Build Application"
    Write-Host "2)  Test Locally"
    Write-Host "3)  Deploy to Heroku"
    Write-Host "4)  Deploy to Render"
    Write-Host "5)  Deploy to Railway"
    Write-Host "6)  Deploy to Fly.io"
    Write-Host "7)  Build & Push Docker Image"
    Write-Host "8)  Run with Docker Compose"
    Write-Host "9)  Deploy to ALL platforms"
    Write-Host "10) Show Deployment URLs"
    Write-Host "0)  Exit"
    Write-Host ""
    
    $choice = Read-Host "Select option"
    
    switch ($choice) {
        "1" { Build-Application }
        "2" { Test-Local }
        "3" { Deploy-Heroku }
        "4" { Deploy-Render }
        "5" { Deploy-Railway }
        "6" { Deploy-Fly }
        "7" { Deploy-Docker }
        "8" { Run-DockerCompose }
        "9" {
            Build-Application
            try { Deploy-Heroku } catch { Write-Warning "Heroku deployment failed" }
            try { Deploy-Render } catch { Write-Warning "Render deployment failed" }
            try { Deploy-Railway } catch { Write-Warning "Railway deployment failed" }
            try { Deploy-Fly } catch { Write-Warning "Fly.io deployment failed" }
            try { Deploy-Docker } catch { Write-Warning "Docker deployment failed" }
            Write-Success "All deployments completed!"
        }
        "10" { Show-Urls }
        "0" { exit 0 }
        default { Write-Error "Invalid option" }
    }
    
    # Show menu again
    Show-Menu
}

# Main execution
if ($args.Count -eq 0) {
    # No arguments, show interactive menu
    Show-Menu
} else {
    # Run with arguments
    switch ($args[0]) {
        "build" { Build-Application }
        "test" { Test-Local }
        "heroku" { Deploy-Heroku }
        "render" { Deploy-Render }
        "railway" { Deploy-Railway }
        "fly" { Deploy-Fly }
        "docker" { Deploy-Docker }
        "compose" { Run-DockerCompose }
        "all" {
            Build-Application
            try { Deploy-Heroku } catch { Write-Warning "Heroku deployment failed" }
            try { Deploy-Render } catch { Write-Warning "Render deployment failed" }
            try { Deploy-Railway } catch { Write-Warning "Railway deployment failed" }
            try { Deploy-Fly } catch { Write-Warning "Fly.io deployment failed" }
            try { Deploy-Docker } catch { Write-Warning "Docker deployment failed" }
        }
        "urls" { Show-Urls }
        default {
            Write-Error "Unknown command: $($args[0])"
            Write-Host ""
            Write-Host "Usage: .\deploy.ps1 [command]"
            Write-Host ""
            Write-Host "Commands:"
            Write-Host "  build     - Build application"
            Write-Host "  test      - Run tests"
            Write-Host "  heroku    - Deploy to Heroku"
            Write-Host "  render    - Deploy to Render"
            Write-Host "  railway   - Deploy to Railway"
            Write-Host "  fly       - Deploy to Fly.io"
            Write-Host "  docker    - Build and push Docker image"
            Write-Host "  compose   - Run with Docker Compose"
            Write-Host "  all       - Deploy to all platforms"
            Write-Host "  urls      - Show deployment URLs"
            exit 1
        }
    }
}

