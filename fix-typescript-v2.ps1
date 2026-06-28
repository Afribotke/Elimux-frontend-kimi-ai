# Elimux Phase 6 - TypeScript Auto-Fix (CORRECTED)
# Run from: C:\Users\ELON\OneDrive\Desktop\kimi\elimux-frontend
$ErrorActionPreference = "Stop"
Set-Location "C:\Users\ELON\OneDrive\Desktop\kimi\elimux-frontend"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ElimuX Phase 6 - Fixing TypeScript Errors" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# FIX 1: FeatureCard in app\page.tsx
Write-Host "`n[1/12] Fixing FeatureCard in app\page.tsx..." -ForegroundColor Green
$pagePath = "app\page.tsx"
if (Test-Path $pagePath) {
    $content = Get-Content $pagePath -Raw
    $old = 'function FeatureCard({ icon: Icon, title, description }) {'
    $new = "interface FeatureCardProps {`n  icon: any;`n  title: string;`n  description: string;`n}`n`nfunction FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {"
    $content = $content -replace [regex]::Escape($old), $new
    Set-Content $pagePath $content -NoNewline
    Write-Host "  OK FeatureCard fixed" -ForegroundColor Green
} else { Write-Host "  SKIP page.tsx not found" -ForegroundColor Yellow }

# FIX 2: ReferralCode.tsx
Write-Host "`n[2/12] Fixing ReferralCode.tsx..."
$path = "components\gamification\ReferralCode.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old = 'export function ReferralCode({ code }) {'
    $new = "interface ReferralCodeProps {`n  code: string;`n}`n`nexport function ReferralCode({ code }: ReferralCodeProps) {"
    $content = $content -replace [regex]::Escape($old), $new
    Set-Content $path $content -NoNewline
    Write-Host "  OK ReferralCode fixed" -ForegroundColor Green
} else { Write-Host "  SKIP ReferralCode.tsx not found" -ForegroundColor Yellow }

# FIX 3: ReviewCard.tsx
Write-Host "`n[3/12] Fixing ReviewCard.tsx..."
$path = "components\reviews\ReviewCard.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old = 'export function ReviewCard({ review }) {'
    $new = "interface Review {`n  id: string;`n  rating: number;`n  comment: string;`n  author: string;`n  date: string;`n}`n`ninterface ReviewCardProps {`n  review: Review;`n}`n`nexport function ReviewCard({ review }: ReviewCardProps) {"
    $content = $content -replace [regex]::Escape($old), $new
    Set-Content $path $content -NoNewline
    Write-Host "  OK ReviewCard fixed" -ForegroundColor Green
} else { Write-Host "  SKIP ReviewCard.tsx not found" -ForegroundColor Yellow }

# FIX 4: ReviewForm.tsx
Write-Host "`n[4/12] Fixing ReviewForm.tsx..."
$path = "components\reviews\ReviewForm.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old = 'export function ReviewForm({ institutionId, onSubmit }) {'
    $new = "interface ReviewFormProps {`n  institutionId: string;`n  onSubmit?: () => void;`n}`n`nexport function ReviewForm({ institutionId, onSubmit }: ReviewFormProps) {"
    $content = $content -replace [regex]::Escape($old), $new
    $content = $content -replace 'catch \(error\)', 'catch (error: any)'
    Set-Content $path $content -NoNewline
    Write-Host "  OK ReviewForm fixed" -ForegroundColor Green
} else { Write-Host "  SKIP ReviewForm.tsx not found" -ForegroundColor Yellow }

# FIX 5: ReviewsList.tsx
Write-Host "`n[5/12] Fixing ReviewsList.tsx..."
$path = "components\reviews\ReviewsList.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old = 'export function ReviewsList({ institutionId }) {'
    $new = "interface ReviewsListProps {`n  institutionId: string;`n}`n`nexport function ReviewsList({ institutionId }: ReviewsListProps) {"
    $content = $content -replace [regex]::Escape($old), $new
    $content = $content -replace 'catch \(error\)', 'catch (error: any)'
    Set-Content $path $content -NoNewline
    Write-Host "  OK ReviewsList fixed" -ForegroundColor Green
} else { Write-Host "  SKIP ReviewsList.tsx not found" -ForegroundColor Yellow }

# FIX 6: SponsorDashboard.tsx (3 components)
Write-Host "`n[6/12] Fixing SponsorDashboard.tsx..."
$path = "components\sponsor-ads\SponsorDashboard.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old1 = 'export function SponsorDashboard({ sponsorId }) {'
    $new1 = "interface SponsorDashboardProps {`n  sponsorId: string;`n}`n`nexport function SponsorDashboard({ sponsorId }: SponsorDashboardProps) {"
    $content = $content -replace [regex]::Escape($old1), $new1
    $old2 = 'function SummaryCard({ icon: Icon, label, value }) {'
    $new2 = "interface SummaryCardProps {`n  icon: any;`n  label: string;`n  value: string;`n}`n`nfunction SummaryCard({ icon: Icon, label, value }: SummaryCardProps) {"
    $content = $content -replace [regex]::Escape($old2), $new2
    $old3 = 'function CampaignRow({ campaign }) {'
    $new3 = "interface Campaign {`n  id: string;`n  name: string;`n  status: string;`n  budget: number;`n  spent: number;`n  clicks: number;`n  impressions: number;`n}`n`ninterface CampaignRowProps {`n  campaign: Campaign;`n}`n`nfunction CampaignRow({ campaign }: CampaignRowProps) {"
    $content = $content -replace [regex]::Escape($old3), $new3
    Set-Content $path $content -NoNewline
    Write-Host "  OK SponsorDashboard fixed (3 components)" -ForegroundColor Green
} else { Write-Host "  SKIP SponsorDashboard.tsx not found" -ForegroundColor Yellow }

# FIX 7: SponsoredListing.tsx (2 components)
Write-Host "`n[7/12] Fixing SponsoredListing.tsx..."
$path = "components\sponsor-ads\SponsoredListing.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old1 = 'export function SponsoredListing({ country, category }) {'
    $new1 = "interface SponsoredListingProps {`n  country?: string;`n  category?: string;`n}`n`nexport function SponsoredListing({ country, category }: SponsoredListingProps) {"
    $content = $content -replace [regex]::Escape($old1), $new1
    $old2 = 'function SponsoredCard({ ad }) {'
    $new2 = "interface Ad {`n  id: string;`n  title: string;`n  institution: string;`n  description: string;`n  logo?: string;`n  ctaText?: string;`n  ctaUrl?: string;`n}`n`ninterface SponsoredCardProps {`n  ad: Ad;`n}`n`nfunction SponsoredCard({ ad }: SponsoredCardProps) {"
    $content = $content -replace [regex]::Escape($old2), $new2
    Set-Content $path $content -NoNewline
    Write-Host "  OK SponsoredListing fixed (2 components)" -ForegroundColor Green
} else { Write-Host "  SKIP SponsoredListing.tsx not found" -ForegroundColor Yellow }

# VERIFICATION
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "VERIFICATION - Re-scanning..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$remaining = 0

Get-ChildItem -Recurse -Filter "*.tsx" | ForEach-Object {
    $file = $_
    $content = Get-Content $file.FullName -Raw
    $lines = $content -split "`n"
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match 'function\s+\w+\(\{\s*[\w\s:,]+\s*\}\)') {
            if ($lines[$i] -notmatch ':\s*\w+Props' -and $lines[$i-1] -notmatch 'interface|type') {
                Write-Host ("  FAIL: " + $file.FullName + ":" + ($i+1)) -ForegroundColor Red
                $remaining++
            }
        }
    }
}

Get-ChildItem -Recurse -Filter "*.tsx" | ForEach-Object {
    $file = $_
    $content = Get-Content $file.FullName -Raw
    $lines = $content -split "`n"
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match 'catch\s*\(\s*error\s*\)') {
            if ($lines[$i] -notmatch 'error:\s*any') {
                Write-Host ("  FAIL: " + $file.FullName + ":" + ($i+1) + " catch") -ForegroundColor Red
                $remaining++
            }
        }
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
if ($remaining -eq 0) {
    Write-Host "ALL 12 TYPE ERRORS FIXED!" -ForegroundColor Green
    Write-Host "`nNext: Run npm run build" -ForegroundColor Yellow
} else {
    Write-Host ("" + $remaining + " error(s) remain") -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Cyan
