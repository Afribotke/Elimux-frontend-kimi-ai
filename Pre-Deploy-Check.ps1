# ElimuX Pre-Deployment Check
# Run this before EVERY push to catch errors early

$nodePath = "node"
$scriptPath = "C:\Users\ELON\OneDrive\Desktop\kimi\elimux-frontend\pre-deploy-check.js"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ELIMUX PRE-DEPLOYMENT CHECK" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

try {
    & $nodePath $scriptPath
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n⛔ PUSH BLOCKED: Fix errors before pushing!" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "ERROR: Could not run check. $_" -ForegroundColor Red
    exit 1
}
