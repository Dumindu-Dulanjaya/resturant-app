# Test Old-System QR Ordering
# This script displays test URLs and opens one in the browser

Write-Host "`n======================================" -ForegroundColor Cyan
Write-Host "  OLD-SYSTEM QR ORDERING - TEST" -ForegroundColor Cyan
Write-Host "======================================`n" -ForegroundColor Cyan

Write-Host "✅ Frontend: http://localhost:3001" -ForegroundColor Green
Write-Host "✅ Backend: http://localhost:3000/api`n" -ForegroundColor Green

Write-Host "🏢 TEST URLS (One QR per Table):`n" -ForegroundColor Yellow

Write-Host "SeaSpray Café - Table T-1:" -ForegroundColor White
$url1 = "http://localhost:3001/qr/9ef1760341f428a417b453ed4e376d2ab932dcfb0932d2fdcd3d53ad0773359a"
Write-Host "$url1`n" -ForegroundColor Cyan

Write-Host "SeaSpray Café - Table T-2:" -ForegroundColor White
$url2 = "http://localhost:3001/qr/36a80a20b993118587cb82b3d61cec26896d6b8ac201f19f30e628d9fc969bb2"
Write-Host "$url2`n" -ForegroundColor Cyan

Write-Host "Test Restaurant - Table T-1:" -ForegroundColor White
$url3 = "http://localhost:3001/qr/07dfb64441b783978142b53e0a8c4cf1236aca58221b09c31f6db3d793573ceb"
Write-Host "$url3`n" -ForegroundColor Cyan

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "WHAT TO EXPECT:" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "1. Page loads with Restaurant Name" -ForegroundColor White
Write-Host "2. Table Number shown in badge (e.g., T-1)" -ForegroundColor White
Write-Host "3. Full menu displayed for that restaurant" -ForegroundColor White
Write-Host "4. Add items to cart" -ForegroundColor White
Write-Host "5. Table number is pre-filled (cannot change)" -ForegroundColor White
Write-Host "6. Place order → Goes to Kitchen KDS`n" -ForegroundColor White

Write-Host "KEY DIFFERENCES FROM OLD API KEY SYSTEM:" -ForegroundColor Yellow
Write-Host "  ✅ One QR per TABLE (not per restaurant)" -ForegroundColor Green
Write-Host "  ✅ Table number AUTO-FILLED from QR" -ForegroundColor Green
Write-Host "  ✅ Customer CANNOT change table" -ForegroundColor Green
Write-Host "  ✅ More secure (table-level isolation)" -ForegroundColor Green
Write-Host "  ✅ Can disable individual tables`n" -ForegroundColor Green

Write-Host "Opening test URL in browser..." -ForegroundColor Yellow
Start-Process $url1

Write-Host "`n🎉 Test URL opened! Check your browser." -ForegroundColor Green
Write-Host "   If page shows restaurant + table, it's working!`n" -ForegroundColor White
