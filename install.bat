@echo off
echo ============================================
echo   DocLensBD Website Setup
echo   Premium Eyewear E-commerce
echo ============================================
echo.

echo [1/5] Creating directory structure...
mkdir public 2>nul
mkdir src 2>nul
mkdir src\components 2>nul
mkdir src\pages 2>nul
mkdir src\data 2>nul
mkdir src\context 2>nul
mkdir src\types 2>nul
echo Done!
echo.

echo [2/5] Running setup scripts...
echo Running setup-enhanced.js...
node setup-enhanced.js
echo.
echo Running setup-part2.js...
node setup-part2.js
echo.
echo Running setup-part3.js...
node setup-part3.js
echo.
echo Running setup-part4.js...
node setup-part4.js
echo.
echo Running setup-part5.js (Payment & Order Tracking)...
node setup-part5.js
echo.

echo [3/5] Installing dependencies...
call npm install
echo.

echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Then open http://localhost:5173 in your browser
echo.
echo Features included:
echo   - User Login/Signup
echo   - Prescription Form
echo   - Wishlist Functionality  
echo   - 32+ Products
echo   - Virtual Try-On
echo   - Shopping Cart
echo   - Checkout Flow
echo   - Payment Gateway (bKash, Nagad, Card, COD)
echo   - Order Tracking
echo ============================================
pause
