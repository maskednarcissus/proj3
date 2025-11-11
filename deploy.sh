#!/bin/bash

###############################################################################
# VitrineSorocabana Auto-Deployment Script
# This script automates the deployment process to various platforms
###############################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Build application
build_application() {
    print_header "Building Application"
    
    if [ ! -d "api" ]; then
        print_error "api directory not found!"
        exit 1
    fi
    
    print_info "Building with Maven (includes frontend build)..."
    cd api
    mvn clean package -DskipTests
    cd ..
    
    if [ -f "api/target/vitrine-sorocabana-1.0.0.jar" ]; then
        print_success "Build completed successfully!"
        print_info "JAR location: api/target/vitrine-sorocabana-1.0.0.jar"
    else
        print_error "Build failed! JAR not found."
        exit 1
    fi
}

# Test application locally
test_local() {
    print_header "Testing Application Locally"
    
    print_info "Running tests..."
    cd api
    mvn test
    cd ..
    
    print_success "Tests passed!"
}

# Deploy to Heroku
deploy_heroku() {
    print_header "Deploying to Heroku"
    
    if ! command_exists heroku; then
        print_error "Heroku CLI not installed!"
        print_info "Install from: https://devcenter.heroku.com/articles/heroku-cli"
        return 1
    fi
    
    print_info "Logging into Heroku..."
    heroku auth:whoami || heroku login
    
    print_info "Deploying to Heroku..."
    git push heroku main || git push heroku master
    
    print_info "Setting environment variables..."
    heroku config:set SPRING_PROFILES_ACTIVE=prod
    
    print_success "Deployed to Heroku!"
    print_info "Opening application..."
    heroku open
}

# Deploy to Render
deploy_render() {
    print_header "Deploying to Render"
    
    if [ -z "$RENDER_DEPLOY_HOOK_URL" ]; then
        print_error "RENDER_DEPLOY_HOOK_URL not set!"
        print_info "Get your deploy hook from Render dashboard"
        return 1
    fi
    
    print_info "Triggering Render deployment..."
    curl -X POST "$RENDER_DEPLOY_HOOK_URL"
    
    print_success "Render deployment triggered!"
    print_info "Check status at: https://dashboard.render.com/"
}

# Deploy to Railway
deploy_railway() {
    print_header "Deploying to Railway"
    
    if ! command_exists railway; then
        print_warning "Railway CLI not installed. Installing..."
        npm install -g @railway/cli
    fi
    
    print_info "Deploying to Railway..."
    railway up
    
    print_success "Deployed to Railway!"
}

# Deploy to Fly.io
deploy_fly() {
    print_header "Deploying to Fly.io"
    
    if ! command_exists flyctl; then
        print_error "Fly CLI not installed!"
        print_info "Install from: https://fly.io/docs/hands-on/install-flyctl/"
        return 1
    fi
    
    print_info "Logging into Fly.io..."
    flyctl auth login
    
    # Check if app exists
    if ! flyctl apps list | grep -q "vitrine-sorocabana"; then
        print_info "Creating new Fly.io app..."
        flyctl launch --no-deploy
    fi
    
    print_info "Deploying to Fly.io..."
    flyctl deploy
    
    print_success "Deployed to Fly.io!"
    print_info "Opening application..."
    flyctl open
}

# Build and push Docker image
deploy_docker() {
    print_header "Building and Pushing Docker Image"
    
    if ! command_exists docker; then
        print_error "Docker not installed!"
        return 1
    fi
    
    if [ -z "$DOCKER_USERNAME" ]; then
        print_error "DOCKER_USERNAME not set!"
        read -p "Enter Docker Hub username: " DOCKER_USERNAME
    fi
    
    print_info "Logging into Docker Hub..."
    docker login
    
    print_info "Building Docker image..."
    docker build -t $DOCKER_USERNAME/vitrine-sorocabana:latest .
    
    print_info "Pushing to Docker Hub..."
    docker push $DOCKER_USERNAME/vitrine-sorocabana:latest
    
    print_success "Docker image pushed successfully!"
    print_info "Image: $DOCKER_USERNAME/vitrine-sorocabana:latest"
}

# Run locally with Docker Compose
run_docker_compose() {
    print_header "Running with Docker Compose"
    
    if ! command_exists docker-compose && ! docker compose version >/dev/null 2>&1; then
        print_error "Docker Compose not installed!"
        return 1
    fi
    
    print_info "Starting services..."
    docker-compose up -d
    
    print_success "Services started!"
    print_info "Application: http://localhost:8080"
    print_info "View logs: docker-compose logs -f"
}

# Show deployment URLs
show_urls() {
    print_header "Deployment URLs"
    
    echo ""
    print_info "Heroku: https://vitrine-sorocabana.herokuapp.com"
    print_info "Render: https://vitrine-sorocabana.onrender.com"
    print_info "Railway: Check Railway dashboard"
    print_info "Fly.io: https://vitrine-sorocabana.fly.dev"
    echo ""
}

# Main menu
show_menu() {
    echo ""
    print_header "VitrineSorocabana Deployment Tool"
    echo ""
    echo "1) Build Application"
    echo "2) Test Locally"
    echo "3) Deploy to Heroku"
    echo "4) Deploy to Render"
    echo "5) Deploy to Railway"
    echo "6) Deploy to Fly.io"
    echo "7) Build & Push Docker Image"
    echo "8) Run with Docker Compose"
    echo "9) Deploy to ALL platforms"
    echo "10) Show Deployment URLs"
    echo "0) Exit"
    echo ""
    read -p "Select option: " choice
    
    case $choice in
        1) build_application ;;
        2) test_local ;;
        3) deploy_heroku ;;
        4) deploy_render ;;
        5) deploy_railway ;;
        6) deploy_fly ;;
        7) deploy_docker ;;
        8) run_docker_compose ;;
        9)
            build_application
            deploy_heroku || true
            deploy_render || true
            deploy_railway || true
            deploy_fly || true
            deploy_docker || true
            print_success "All deployments completed!"
            ;;
        10) show_urls ;;
        0) exit 0 ;;
        *) print_error "Invalid option" ;;
    esac
    
    # Show menu again
    show_menu
}

# Check if running with arguments
if [ $# -eq 0 ]; then
    # No arguments, show interactive menu
    show_menu
else
    # Run with arguments
    case $1 in
        build) build_application ;;
        test) test_local ;;
        heroku) deploy_heroku ;;
        render) deploy_render ;;
        railway) deploy_railway ;;
        fly) deploy_fly ;;
        docker) deploy_docker ;;
        compose) run_docker_compose ;;
        all)
            build_application
            deploy_heroku || true
            deploy_render || true
            deploy_railway || true
            deploy_fly || true
            deploy_docker || true
            ;;
        urls) show_urls ;;
        *)
            print_error "Unknown command: $1"
            echo ""
            echo "Usage: $0 [command]"
            echo ""
            echo "Commands:"
            echo "  build     - Build application"
            echo "  test      - Run tests"
            echo "  heroku    - Deploy to Heroku"
            echo "  render    - Deploy to Render"
            echo "  railway   - Deploy to Railway"
            echo "  fly       - Deploy to Fly.io"
            echo "  docker    - Build and push Docker image"
            echo "  compose   - Run with Docker Compose"
            echo "  all       - Deploy to all platforms"
            echo "  urls      - Show deployment URLs"
            exit 1
            ;;
    esac
fi

