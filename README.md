# DocLensBD - Eyewear E-commerce Website

A modern e-commerce website for eyeglasses and sunglasses built with React, TypeScript, and Tailwind CSS.

## Quick Setup

1. **Create the required directories:**
   ```
   mkdir public src src\components src\pages src\data src\context src\types
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

## Features

- 🛍️ Product catalog with eyeglasses and sunglasses
- 🔍 Search and filter functionality
- 🛒 Shopping cart management
- 📱 Fully responsive design
- ⚡ Fast loading with Vite
- 🎨 Modern UI with Tailwind CSS

## Project Structure

```
doclensbd/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   └── ...
│   ├── data/
│   │   └── products.ts
│   ├── context/
│   │   └── CartContext.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **React Router** - Navigation
- **Lucide React** - Icons

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

© 2024 DocLensBD. All rights reserved.
