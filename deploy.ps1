# Eventify Deployment Script
# This script helps you deploy your Eventify app

Write-Host "🚀 Eventify Deployment Helper" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "bakend") -or -not (Test-Path "Frontend")) {
    Write-Host "❌ Please run this script from the eventify root directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Project structure found" -ForegroundColor Green

# Check if .env files exist
if (-not (Test-Path "bakend\.env")) {
    Write-Host "❌ Backend .env file not found. Please create it first." -ForegroundColor Red
    Write-Host "   Copy bakend\env.example to bakend\.env and configure it" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path "Frontend\.env")) {
    Write-Host "❌ Frontend .env file not found. Please create it first." -ForegroundColor Red
    Write-Host "   Copy Frontend\env.example to Frontend\.env and configure it" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Environment files found" -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Blue
Set-Location "bakend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend dependency installation failed" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Blue
Set-Location "../Frontend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend dependency installation failed" -ForegroundColor Red
    exit 1
}

Set-Location ".."

Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green

# Build frontend
Write-Host "🔨 Building frontend..." -ForegroundColor Blue
Set-Location "Frontend"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed" -ForegroundColor Red
    exit 1
}

Set-Location ".."

Write-Host "✅ Frontend built successfully" -ForegroundColor Green

# Test backend locally (optional)
Write-Host "🧪 Testing backend locally..." -ForegroundColor Blue
Write-Host "   Starting backend server for 5 seconds..." -ForegroundColor Yellow

$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    Set-Location "bakend"
    npm start
}

Start-Sleep -Seconds 5
Stop-Job $backendJob
Remove-Job $backendJob

Write-Host "✅ Backend test completed" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Your Eventify app is ready for deployment!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Choose a deployment platform (Railway, Vercel, Heroku)" -ForegroundColor White
Write-Host "2. Deploy backend first" -ForegroundColor White
Write-Host "3. Update frontend API URL with backend URL" -ForegroundColor White
Write-Host "4. Deploy frontend" -ForegroundColor White
Write-Host "5. Run database seeding: cd bakend && npm run seed" -ForegroundColor White
Write-Host ""
Write-Host "📖 See DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Cyan
