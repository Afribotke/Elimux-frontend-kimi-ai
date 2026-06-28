# ElimuX Local Build Test
# Run this BEFORE pushing to catch build errors locally

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ELIMUX LOCAL BUILD TEST" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ npm install failed!" -ForegroundColor Red
        exit 1
    }
}

# Run TypeScript type check
Write-Host "`nRunning TypeScript type check..." -ForegroundColor Cyan
npm run type-check 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ TypeScript errors found (may not block build)" -ForegroundColor Yellow
} else {
    Write-Host "✅ TypeScript check passed" -ForegroundColor Green
}

# Run lint check
Write-Host "`nRunning lint check..." -ForegroundColor Cyan
npm run lint 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Lint errors found (may not block build)" -ForegroundColor Yellow
} else {
    Write-Host "✅ Lint check passed" -ForegroundColor Green
}

# Run local build (this is the critical test)
Write-Host "`nRunning local build (this may take 2-3 minutes)..." -ForegroundColor Cyan
Write-Host "This simulates what Vercel will do..." -ForegroundColor Gray

npm run build 2>&1 | Tee-Object -FilePath "build-log.txt"

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n========================================" -ForegroundColor Red
    Write-Host "❌ BUILD FAILED!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Check build-log.txt for details" -ForegroundColor Yellow
    Write-Host "DO NOT PUSH until build succeeds!" -ForegroundColor Red
    exit 1
} else {
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "✅ BUILD SUCCESSFUL!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Safe to push to GitHub" -ForegroundColor Green
    Remove-Item "build-log.txt" -ErrorAction SilentlyContinue
}
