# Start GenomeSync 2.0 Frontend
Write-Host "Starting GenomeSync 2.0 Frontend..." -ForegroundColor Cyan
Write-Host "Application will be available at: http://localhost:3000" -ForegroundColor Green
Write-Host ""

Set-Location frontend

# Start the development server
npm run dev
