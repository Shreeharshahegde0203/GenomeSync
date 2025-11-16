# GenomeSync 2.0 - Quick Start Script
# This script will help you set up and run both backend and frontend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   GenomeSync 2.0 - Quick Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$currentDir = Get-Location

# Backend Setup
Write-Host "[1/4] Setting up Python backend..." -ForegroundColor Yellow
Set-Location "$currentDir\backend"

# Check if virtual environment exists
if (-not (Test-Path "venv")) {
    Write-Host "  Creating virtual environment..." -ForegroundColor Gray
    python -m venv venv
}

Write-Host "  Activating virtual environment..." -ForegroundColor Gray
& ".\venv\Scripts\Activate.ps1"

Write-Host "  Installing Python dependencies..." -ForegroundColor Gray
pip install -q -r requirements.txt

Write-Host "  ✓ Backend setup complete!" -ForegroundColor Green
Write-Host ""

# Frontend Setup
Set-Location "$currentDir\frontend"
Write-Host "[2/4] Setting up React frontend..." -ForegroundColor Yellow

if (-not (Test-Path "node_modules")) {
    Write-Host "  Installing npm dependencies (this may take a minute)..." -ForegroundColor Gray
    npm install --silent
    Write-Host "  ✓ Frontend setup complete!" -ForegroundColor Green
} else {
    Write-Host "  ✓ Dependencies already installed!" -ForegroundColor Green
}

Write-Host ""

# Instructions
Write-Host "[3/4] Setup Complete! Now starting servers..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   GenomeSync 2.0 is Ready!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor White
Write-Host ""
Write-Host "  Terminal 1 (Backend):" -ForegroundColor Yellow
Write-Host "    cd backend" -ForegroundColor Gray
Write-Host "    .\venv\Scripts\Activate" -ForegroundColor Gray
Write-Host "    python main.py" -ForegroundColor Gray
Write-Host ""
Write-Host "  Terminal 2 (Frontend):" -ForegroundColor Yellow
Write-Host "    cd frontend" -ForegroundColor Gray
Write-Host "    npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Then open: " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Sample FASTA files are in: backend\genome_a_sample.fasta" -ForegroundColor Green
Write-Host ""

Set-Location $currentDir
