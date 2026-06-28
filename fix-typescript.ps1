# Elimux Phase 6 - TypeScript Auto-Fix
$ErrorActionPreference = "Stop"
Set-Location "C:\Users\ELON\OneDrive\Desktop\kimi\elimux-frontend"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ElimuX Phase 6 - Fixing TypeScript Errors" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# FIX 1: StatCard in page.tsx
Write-Host "
[1/7] Fixing StatCard in page.tsx..." -ForegroundColor Green
$pagePath = "app\page.tsx"
if (Test-Path $pagePath) {
    $content = Get-Content $pagePath -Raw
    $old = 'function StatCard({ number, label }) {'
    $new = "interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {"
    $content = $content -replace [regex]::Escape($old), $new
    Set-Content $pagePath $content -NoNewline
    Write-Host "  OK StatCard fixed" -ForegroundColor Green
} else { Write-Host "  SKIP page.tsx not found" -ForegroundColor Yellow }

# FIX 2: ReferralCode.tsx
Write-Host "
[2/7] Fixing ReferralCode.tsx..."
$path = "app\components\ReferralCode.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old = 'export function ReferralCode({ code }) {'
    $new = "interface ReferralCodeProps {
  code: string;
}

export function ReferralCode({ code }: ReferralCodeProps) {"
    $content = $content -replace [regex]::Escape($old), $new
    Set-Content $path $content -NoNewline
    Write-Host "  OK ReferralCode fixed" -ForegroundColor Green
} else { Write-Host "  SKIP ReferralCode.tsx not found" -ForegroundColor Yellow }

# FIX 3: ReviewCard.tsx
Write-Host "
[3/7] Fixing ReviewCard.tsx..."
$path = "app\components\ReviewCard.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old = 'export function ReviewCard({ review }) {'
    $new = "interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {"
    $content = $content -replace [regex]::Escape($old), $new
    Set-Content $path $content -NoNewline
    Write-Host "  OK ReviewCard fixed" -ForegroundColor Green
} else { Write-Host "  SKIP ReviewCard.tsx not found" -ForegroundColor Yellow }

# FIX 4: ReviewForm.tsx
Write-Host "
[4/7] Fixing ReviewForm.tsx..."
$path = "app\components\ReviewForm.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old = 'export function ReviewForm({ institutionId, onSubmit }) {'
    $new = "interface ReviewFormProps {
  institutionId: string;
  onSubmit?: () => void;
}

export function ReviewForm({ institutionId, onSubmit }: ReviewFormProps) {"
    $content = $content -replace [regex]::Escape($old), $new
    $content = $content -replace 'catch \(error\)', 'catch (error: any)'
    Set-Content $path $content -NoNewline
    Write-Host "  OK ReviewForm fixed" -ForegroundColor Green
} else { Write-Host "  SKIP ReviewForm.tsx not found" -ForegroundColor Yellow }

# FIX 5: ReviewsList.tsx
Write-Host "
[5/7] Fixing ReviewsList.tsx..."
$path = "app\components\ReviewsList.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old = 'export function ReviewsList({ institutionId }) {'
    $new = "interface ReviewsListProps {
  institutionId: string;
}

export function ReviewsList({ institutionId }: ReviewsListProps) {"
    $content = $content -replace [regex]::Escape($old), $new
    $content = $content -replace 'catch \(error\)', 'catch (error: any)'
    Set-Content $path $content -NoNewline
    Write-Host "  OK ReviewsList fixed" -ForegroundColor Green
} else { Write-Host "  SKIP ReviewsList.tsx not found" -ForegroundColor Yellow }

# FIX 6: SponsorDashboard.tsx
Write-Host "
[6/7] Fixing SponsorDashboard.tsx..."
$path = "app\components\SponsorDashboard.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old1 = 'export function SponsorDashboard({ sponsorId }) {'
    $new1 = "interface SponsorDashboardProps {
  sponsorId: string;
}

export function SponsorDashboard({ sponsorId }: SponsorDashboardProps) {"
    $content = $content -replace [regex]::Escape($old1), $new1
    $old2 = 'function CampaignRow({ campaign }) {'
    $new2 = "interface Campaign {
  id: string;
  name: string;
  status: string;
  budget: number;
  spent: number;
  clicks: number;
  impressions: number;
}

interface CampaignRowProps {
  campaign: Campaign;
}

function CampaignRow({ campaign }: CampaignRowProps) {"
    $content = $content -replace [regex]::Escape($old2), $new2
    Set-Content $path $content -NoNewline
    Write-Host "  OK SponsorDashboard fixed" -ForegroundColor Green
} else { Write-Host "  SKIP SponsorDashboard.tsx not found" -ForegroundColor Yellow }

# FIX 7: SponsoredListing.tsx
Write-Host "
[7/7] Fixing SponsoredListing.tsx..."
$path = "app\components\SponsoredListing.tsx"
if (Test-Path $path) {
    $content = Get-Content $path -Raw
    $old1 = 'export function SponsoredListing({ country, category }) {'
    $new1 = "interface SponsoredListingProps {
  country?: string;
  category?: string;
}

export function SponsoredListing({ country, category }: SponsoredListingProps) {"
    $content = $content -replace [regex]::Escape($old1), $new1
    $old2 = 'function SponsoredCard({ ad }) {'
    $new2 = "interface Ad {
  id: string;
  title: string;
  institution: string;
  description: string;
  logo?: string;
  ctaText?: string;
  ctaUrl?: string;
}

interface SponsoredCardProps {
  ad: Ad;
}

function SponsoredCard({ ad }: SponsoredCardProps) {"
    $content = $content -replace [regex]::Escape($old2), $new2
    Set-Content $path $content -NoNewline
    Write-Host "  OK SponsoredListing fixed" -ForegroundColor Green
} else { Write-Host "  SKIP SponsoredListing.tsx not found" -ForegroundColor Yellow }

# VERIFICATION
Write-Host "
========================================" -ForegroundColor Cyan
Write-Host "VERIFICATION - Re-scanning..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$remaining = 0

Get-ChildItem -Recurse -Filter "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $lines = $content -split "
"
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match 'function\s+\w+\(\{\s*[\w\s,]+\s*\}\)') {
            if ($lines[$i] -notmatch ':\s*\w+Props' -and $lines[$i-1] -notmatch 'interface|type') {
                Write-Host "  FAIL: $(.Name):$($i+1)" -ForegroundColor Red
                $remaining++
            }
        }
    }
}

Get-ChildItem -Recurse -Filter "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $lines = $content -split "
"
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match 'catch\s*\(\s*error\s*\)') {
            if ($lines[$i] -notmatch 'error:\s*any') {
                Write-Host "  FAIL: $(.Name):$($i+1) catch" -ForegroundColor Red
                $remaining++
            }
        }
    }
}

Write-Host "
========================================" -ForegroundColor Cyan
if ($remaining -eq 0) {
    Write-Host "ALL TYPE ERRORS FIXED!" -ForegroundColor Green
} else {
    Write-Host "$remaining error(s) remain" -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Cyan
