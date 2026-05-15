#!/bin/bash
echo "Cloning the repository..."
# Clone into a temporary folder to avoid the "not empty directory" error because of setup.sh
git clone https://github.com/watchknight/DocLensBD.git temp_repo

# Move everything (including hidden files) to the current directory
cp -a temp_repo/. .
rm -rf temp_repo

echo "Installing dependencies..."
npm install

echo "Starting the development server..."
npm run dev
