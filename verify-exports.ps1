# verify-exports.ps1
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "FreshWave Juice - Export Verification" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking exports..." -ForegroundColor Cyan

# Check ProductModal.tsx
Write-Host "`n📦 Checking ProductModal.tsx..." -ForegroundColor Yellow
$modalPath = "src/components/products/ProductModal.tsx"
if (Test-Path $modalPath) {
    $modalContent = Get-Content $modalPath -Raw
    if ($modalContent -match "export const ProductModal") {
        Write-Host "  ✓ ProductModal.tsx has correct export" -ForegroundColor Green
    } else {
        Write-Host "  ✗ ProductModal.tsx missing 'export const ProductModal'" -ForegroundColor Red
        Write-Host "    File contains:" -ForegroundColor Gray
        $exportLine = $modalContent | Select-String -Pattern "export" | Select-Object -First 1
        if ($exportLine) {
            Write-Host "    → $exportLine" -ForegroundColor Gray
        }
    }
} else {
    Write-Host "  ✗ ProductModal.tsx file not found!" -ForegroundColor Red
}

# Check ProductCard3D.tsx imports
Write-Host "`n📦 Checking ProductCard3D.tsx imports..." -ForegroundColor Yellow
$cardPath = "src/components/products/ProductCard3D.tsx"
if (Test-Path $cardPath) {
    $cardContent = Get-Content $cardPath -Raw
    if ($cardContent -match "import.*ProductModal.*from.*'\.\/ProductModal'") {
        Write-Host "  ✓ ProductCard3D.tsx imports ProductModal correctly" -ForegroundColor Green
    } else {
        Write-Host "  ✗ ProductCard3D.tsx has incorrect import for ProductModal" -ForegroundColor Red
        Write-Host "    Looking for: import { ProductModal } from './ProductModal'" -ForegroundColor Gray
        $importLine = $cardContent | Select-String -Pattern "import.*ProductModal" | Select-Object -First 1
        if ($importLine) {
            Write-Host "    Found: $importLine" -ForegroundColor Gray
        } else {
            Write-Host "    No import for ProductModal found" -ForegroundColor Gray
        }
    }
} else {
    Write-Host "  ✗ ProductCard3D.tsx file not found!" -ForegroundColor Red
}

# Check if files exist
Write-Host "`n📁 Checking file existence..." -ForegroundColor Yellow
$files = @(
    "src/components/products/ProductModal.tsx",
    "src/components/products/ProductCard3D.tsx",
    "src/components/products/ProductShowcase.tsx",
    "src/types/product.types.ts",
    "src/constants/products.ts"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file exists" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file missing" -ForegroundColor Red
    }
}

# Summary
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Verification Complete" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan