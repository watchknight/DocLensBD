@echo off
echo Creating directories for DocLensBD...

mkdir public 2>nul
mkdir src 2>nul
mkdir src\components 2>nul
mkdir src\pages 2>nul
mkdir src\data 2>nul
mkdir src\context 2>nul
mkdir src\types 2>nul

echo Directories created!
echo.
echo Now run: npm install
echo Then run: npm run dev
