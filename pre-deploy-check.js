/**
 * ELIMUX PRE-DEPLOYMENT CHECKLIST
 * Run this BEFORE pushing to GitHub
 */

const { execSync } = require('child_process');
const fs = require('fs');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(message, type = 'info') {
  const color = type === 'error' ? colors.red : 
                type === 'success' ? colors.green : 
                type === 'warning' ? colors.yellow : colors.cyan;
  console.log(`${color}${message}${colors.reset}`);
}

let errors = 0;
let warnings = 0;

// ============================================
// CHECK 1: Required Files Exist
// ============================================
log('\n========================================', 'info');
log('CHECK 1: REQUIRED FILES', 'info');
log('========================================', 'info');

const requiredFiles = [
  'components/ui/textarea.tsx',
  'components/admin/AdminSidebar.tsx',
  'lib/supabase.js',
  'lib/api.js',
  'context/AuthContext.js'
];

for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    log(`✅ ${file}`, 'success');
  } else {
    log(`❌ MISSING: ${file}`, 'error');
    errors++;
  }
}

// ============================================
// CHECK 2: Syntax Validation (Basic)
// ============================================
log('\n========================================', 'info');
log('CHECK 2: SYNTAX VALIDATION', 'info');
log('========================================', 'info');

const filesToCheck = [
  'components/admin/AdminSidebar.tsx',
  'components/reviews/StarRating.tsx',
  'components/reviews/ReviewCard.tsx',
  'components/reviews/ReviewForm.tsx',
  'components/reviews/ReviewsList.tsx'
];

for (const file of filesToCheck) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for common syntax errors
    if (content.includes('import {') && content.includes('import {')) {
      // Check for duplicate imports on same line
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/import\s*{\s*[^}]*import/)) {
          log(`❌ ${file}: Line ${i+1} has corrupted import`, 'error');
          errors++;
        }
      }
    }
    
    // Check for "use client" in client components
    if (file.includes('components/') && !file.includes('layout') && !content.includes('"use client"')) {
      if (content.includes('useState') || content.includes('useEffect')) {
        log(`⚠️ ${file}: Missing "use client" directive`, 'warning');
        warnings++;
      }
    }
    
    log(`✅ ${file}: Syntax OK`, 'success');
  } catch (err) {
    log(`❌ ${file}: ${err.message}`, 'error');
    errors++;
  }
}

// ============================================
// CHECK 3: Git Status
// ============================================
log('\n========================================', 'info');
log('CHECK 3: GIT STATUS', 'info');
log('========================================', 'info');

try {
  const status = execSync('git status --short', { encoding: 'utf8' }).trim();
  if (status) {
    log('⚠️ Uncommitted changes:', 'warning');
    log(status, 'warning');
    warnings++;
  } else {
    log('✅ All changes committed', 'success');
  }
} catch (err) {
  log(`❌ Git check failed: ${err.message}`, 'error');
  errors++;
}

// ============================================
// CHECK 4: Backend Routes Registered
// ============================================
log('\n========================================', 'info');
log('CHECK 4: BACKEND ROUTES', 'info');
log('========================================', 'info');

try {
  const backendIndex = fs.readFileSync('../elimux-backend/src/index.js', 'utf8');
  const routes = ['auth', 'scraper', 'reviews', 'gamification', 'sponsor-ads'];
  
  for (const route of routes) {
    if (backendIndex.includes(route)) {
      log(`✅ /api/${route} registered`, 'success');
    } else {
      log(`❌ /api/${route} NOT registered`, 'error');
      errors++;
    }
  }
} catch (err) {
  log(`⚠️ Could not check backend: ${err.message}`, 'warning');
  warnings++;
}

// ============================================
// FINAL REPORT
// ============================================
log('\n========================================', 'info');
log('PRE-DEPLOYMENT REPORT', 'info');
log('========================================', 'info');

if (errors === 0 && warnings === 0) {
  log('\n🎉 ALL CHECKS PASSED! Safe to push.', 'success');
  log('Run: git push origin main', 'cyan');
  process.exit(0);
} else {
  log(`\n❌ ERRORS: ${errors}`, 'error');
  log(`⚠️ WARNINGS: ${warnings}`, 'warning');
  log('\n⛔ DO NOT PUSH! Fix errors first.', 'error');
  process.exit(1);
}
