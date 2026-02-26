# TEST CUSTOMER ORDER PAGE
# Copy one of these URLs and paste in your browser

Write-Host "`n======================================" -ForegroundColor Cyan
Write-Host "  CUSTOMER QR ORDER PAGE - TEST URLS" -ForegroundColor Cyan
Write-Host "======================================`n" -ForegroundColor Cyan

Write-Host "✅ Frontend running on: http://localhost:3001" -ForegroundColor Green
Write-Host "✅ Backend running on: http://localhost:3000/api`n" -ForegroundColor Green

Write-Host "Test URLs (copy and paste into browser):`n" -ForegroundColor Yellow

Write-Host "Restaurant ID 1:" -ForegroundColor White
Write-Host "http://localhost:3001/qr/9ef2e7e841f5e41dcad95882f5d4ca78bf8d70f7800ef220732d641e7fddef55`n" -ForegroundColor Cyan

Write-Host "Restaurant ID 6:" -ForegroundColor White
Write-Host "http://localhost:3001/qr/091b58747d84736476a0d7c7ec9cd556c6ffda5b4c7faa7ff25765b8d27eb2a7`n" -ForegroundColor Cyan

Write-Host "Restaurant ID 8:" -ForegroundColor White
Write-Host "http://localhost:3001/qr/4d0e4aa02daa2ae296bc1359a54b97d4b37ec2d2b3dc104ff5cb25069e064a23`n" -ForegroundColor Cyan

Write-Host "Restaurant ID 9:" -ForegroundColor White
Write-Host "http://localhost:3001/qr/a1cdd1c028d4de6404862fc3e32b8ee592d339dbb3f9768577644cdd671077ec`n" -ForegroundColor Cyan

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "HOW TO TEST:" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "1. Copy one of the URLs above" -ForegroundColor White
Write-Host "2. Paste into your browser" -ForegroundColor White
Write-Host "3. Browse menu and add items to cart" -ForegroundColor White
Write-Host "4. Click cart button (top right)" -ForegroundColor White
Write-Host "5. Enter table number (e.g., T-5)" -ForegroundColor White
Write-Host "6. Click 'Place Order'" -ForegroundColor White
Write-Host "7. See success screen with order number`n" -ForegroundColor White

Write-Host "Features:" -ForegroundColor Yellow
Write-Host "  ✅ No login required (public access)" -ForegroundColor Green
Write-Host "  ✅ Category filtering" -ForegroundColor Green
Write-Host "  ✅ Shopping cart with qty controls" -ForegroundColor Green
Write-Host "  ✅ Item & order notes" -ForegroundColor Green
Write-Host "  ✅ Table number required" -ForegroundColor Green
Write-Host "  ✅ Success screen with order details" -ForegroundColor Green
Write-Host "  ✅ Mobile responsive`n" -ForegroundColor Green

Write-Host "Opening test URL in browser..." -ForegroundColor Yellow
Start-Process "http://localhost:3001/qr/9ef2e7e841f5e41dcad95882f5d4ca78bf8d70f7800ef220732d641e7fddef55"
