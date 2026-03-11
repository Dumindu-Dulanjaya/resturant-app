@echo off
echo.
echo ================================================
echo   Adding Windows Firewall Rules for Restaurant App
echo ================================================
echo.

netsh advfirewall firewall add rule name="Restaurant Frontend (Port 3001)" dir=in action=allow protocol=TCP localport=3001

netsh advfirewall firewall add rule name="Restaurant Backend (Port 3000)" dir=in action=allow protocol=TCP localport=3000

echo.
echo ================================================
echo   Firewall Rules Added Successfully!
echo ================================================
echo.
echo You can now access:
echo   Frontend: http://192.168.8.127:3001
echo   Backend:  http://192.168.8.127:3000
echo.
echo QR Menu URL:
echo   http://192.168.8.127:3001/qr/8c64ea2868a2923fcbf676d9f26cddde1343dfb9a7afe20daefe86af4c290aa0
echo.
pause
