# ElimuX Master Deployment Script
# Run this for COMPLETE pre-deployment verification

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ELIMUX MASTER DEPLOYMENT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Step 1: Pre-Deploy Checklist
Write-Host "`n[1/4] Running Pre-Deploy Checklist..." -ForegroundColor Yellow
.\Pre-Deploy-Check.ps1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n⛔ STOPPED at Step 1" -ForegroundColor Red
    exit 1
}

# Step 2: Local Build Test
Write-Host "`n[2/4] Running Local Build Test..." -ForegroundColor Yellow
.\Test-LocalBuild.ps1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n⛔ STOPPED at Step 2" -ForegroundColor Red
    exit 1
}

# Step 3: Confirm push
Write-Host "`n[3/4] Ready to push?" -ForegroundColor Yellow
$confirm = Read-Host "Type 'yes' to push to GitHub"
if ($confirm -ne "yes") {
    Write-Host "Push cancelled." -ForegroundColor Yellow
    exit 0
}

# Step 4: Push and monitor
Write-Host "`n[4/4] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Push successful!" -ForegroundColor Green
Write-Host "Monitor deployment at: https://vercel.com" -ForegroundColor Cyan
Write-Host "Run health check in 3 minutes:" -ForegroundColor Cyan
Write-Host "  cd ..\elimux-health-monitor" -ForegroundColor White
Write-Host "  .\Run-HealthCheck.ps1" -ForegroundColor White
