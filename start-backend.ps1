# Start GenomeSync 2.0 Backend Server
Write-Host "Starting GenomeSync 2.0 Backend..." -ForegroundColor Cyan
Write-Host "API will be available at: http://localhost:8000" -ForegroundColor Green
Write-Host "API Docs available at: http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host ""

Set-Location backend

# Activate virtual environment if it exists
if (Test-Path "venv\Scripts\Activate.ps1") {
    & ".\venv\Scripts\Activate.ps1"
}

# Start the server
python main.py
