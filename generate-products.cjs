const fs = require('fs');
const path = require('path');

// ──────────────────────────────────────────────────────────────────────
// FIX #1 & #3: Generate unique .svg FILES in public/glasses/ instead
// of inlining base64 into the JS bundle. Each product gets a truly
// unique SVG by combining shape + color + category-specific tweaks.
// ──────────────────────────────────────────────────────────────────────

const GLASSES_DIR = path.join(__dirname, 'public', 'glasses');

// Ensure directory exists
if (!fs.existsSync(GLASSES_DIR)) {
  fs.mkdirSync(GLASSES_DIR, { recursive: true });
}

// ── Color palette (maps descriptive names → hex) ──
const colorMap = {
  'Black': '#222222', 'Matte Black': '#333333', 'Gold': '#D4AF37',
  'Silver': '#C0C0C0', 'Tortoise': '#5C3A21', 'Brown': '#8B4513',
  'Navy': '#000080', 'Gunmetal': '#2A3439', 'Crystal': '#EEEEEE',
  'Rose Gold': '#B76E79', 'Blue': '#1E90FF', 'Red': '#B22222',
  'Wood': '#8B5A2B', 'Gray': '#808080', 'Havana': '#3B2F2F'
};

// ── Category-specific lens tint & accent colors ──
const categoryTints = {
  eyeglasses:       { fill: 'rgba(240,245,255,0.12)', accent: 'rgba(100,130,200,0.08)' },
  sunglasses:       { fill: 'rgba(0,0,0,0.65)',       accent: 'rgba(255,255,255,0.06)' },
  'computer-glasses': { fill: 'rgba(200,220,255,0.25)', accent: 'rgba(80,120,255,0.10)' },
  kids:             { fill: 'rgba(255,200,220,0.18)',  accent: 'rgba(255,100,150,0.08)' },
  reading:          { fill: 'rgba(255,245,230,0.15)',  accent: 'rgba(200,170,120,0.08)' },
};

// ── SVG shape generators ──
// Each returns {leftLens, rightLens, bridge, temples} SVG strings.
// Parameters allow per-product variation via offsets.
function getShapeParts(shape, strokeColor, sw, fill, ox, oy) {
  // ox/oy are small offsets (±5) that make each product subtly unique
  const shapes = {
    round: {
      leftLens:  `<circle cx="${148+ox}" cy="${100+oy}" r="${53+ox}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      rightLens: `<circle cx="${352-ox}" cy="${100+oy}" r="${53+ox}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      bridge:    `<path d="M ${201+ox} ${90+oy} Q 250 ${75+oy} ${299-ox} ${90+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      temples:   `<path d="M ${95+ox} ${95+oy} L 25 ${85+oy} M ${405-ox} ${95+oy} L 475 ${85+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`
    },
    rectangle: {
      leftLens:  `<rect x="${78+ox}" y="${63+oy}" width="${128+ox}" height="${68+oy}" rx="${6+ox}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      rightLens: `<rect x="${292-ox}" y="${63+oy}" width="${128+ox}" height="${68+oy}" rx="${6+ox}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      bridge:    `<path d="M ${206+ox} ${85+oy} L ${294-ox} ${85+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      temples:   `<path d="M ${78+ox} ${80+oy} L 25 ${75+oy} M ${420-ox} ${80+oy} L 475 ${75+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`
    },
    aviator: {
      leftLens:  `<path d="M ${78+ox} ${63+oy} Q ${143+ox} ${63+oy} ${143+ox} ${133+oy} Q ${78+ox} ${153+oy} ${78+ox} ${63+oy}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      rightLens: `<path d="M ${422-ox} ${63+oy} Q ${357-ox} ${63+oy} ${357-ox} ${133+oy} Q ${422-ox} ${153+oy} ${422-ox} ${63+oy}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      bridge:    `<path d="M ${143+ox} ${78+oy} L ${357-ox} ${78+oy} M ${128+ox} ${63+oy} Q 250 ${53+oy} ${372-ox} ${63+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      temples:   `<path d="M ${78+ox} ${73+oy} L 25 ${73+oy} M ${422-ox} ${73+oy} L 475 ${73+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`
    },
    'cat-eye': {
      leftLens:  `<path d="M ${68+ox} ${53+oy} Q ${158+ox} ${53+oy} ${148+ox} ${118+oy} Q ${88+ox} ${118+oy} ${68+ox} ${53+oy}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      rightLens: `<path d="M ${432-ox} ${53+oy} Q ${342-ox} ${53+oy} ${352-ox} ${118+oy} Q ${412-ox} ${118+oy} ${432-ox} ${53+oy}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      bridge:    `<path d="M ${146+ox} ${83+oy} Q 250 ${78+oy} ${354-ox} ${83+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      temples:   `<path d="M ${73+ox} ${63+oy} L 18 ${68+oy} M ${427-ox} ${63+oy} L 482 ${68+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`
    },
    square: {
      leftLens:  `<rect x="${88+ox}" y="${58+oy}" width="${108+ox}" height="${88+oy}" rx="${10+ox}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      rightLens: `<rect x="${302-ox}" y="${58+oy}" width="${108+ox}" height="${88+oy}" rx="${10+ox}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      bridge:    `<path d="M ${196+ox} ${78+oy} L ${302-ox} ${78+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      temples:   `<path d="M ${88+ox} ${73+oy} L 25 ${68+oy} M ${410-ox} ${73+oy} L 475 ${68+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`
    },
    wayfarer: {
      leftLens:  `<path d="M ${68+ox} ${58+oy} L ${148+ox} ${63+oy} L ${138+ox} ${118+oy} L ${78+ox} ${113+oy} Z" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}" stroke-linejoin="round"/>`,
      rightLens: `<path d="M ${432-ox} ${58+oy} L ${352-ox} ${63+oy} L ${362-ox} ${118+oy} L ${422-ox} ${113+oy} Z" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}" stroke-linejoin="round"/>`,
      bridge:    `<path d="M ${146+ox} ${73+oy} Q 250 ${68+oy} ${354-ox} ${73+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      temples:   `<path d="M ${70+ox} ${68+oy} L 18 ${73+oy} M ${430-ox} ${68+oy} L 482 ${73+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw+2}"/>`
    },
    oval: {
      leftLens:  `<ellipse cx="${143+ox}" cy="${93+oy}" rx="${63+ox}" ry="${38+oy}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      rightLens: `<ellipse cx="${357-ox}" cy="${93+oy}" rx="${63+ox}" ry="${38+oy}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      bridge:    `<path d="M ${206+ox} ${83+oy} Q 250 ${78+oy} ${294-ox} ${83+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      temples:   `<path d="M ${80+ox} ${88+oy} L 25 ${83+oy} M ${420-ox} ${88+oy} L 475 ${83+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`
    },
    geometric: {
      leftLens:  `<polygon points="${88+ox},${58+oy} ${148+ox},${58+oy} ${128+ox},${118+oy} ${98+ox},${118+oy}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}" stroke-linejoin="round"/>`,
      rightLens: `<polygon points="${412-ox},${58+oy} ${352-ox},${58+oy} ${372-ox},${118+oy} ${402-ox},${118+oy}" fill="${fill}" stroke="${strokeColor}" stroke-width="${sw}" stroke-linejoin="round"/>`,
      bridge:    `<path d="M ${143+ox} ${78+oy} L ${357-ox} ${78+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`,
      temples:   `<path d="M ${93+ox} ${68+oy} L 25 ${63+oy} M ${407-ox} ${68+oy} L 475 ${63+oy}" fill="none" stroke="${strokeColor}" stroke-width="${sw}"/>`
    }
  };
  return shapes[shape] || shapes.rectangle;
}

function generateGlassesSvg(shape, color, frameType, category, productIndex) {
  // Stroke width varies by frame type
  let sw = 5;
  if (frameType === 'half-rim') sw = 3.5;
  if (frameType === 'rimless') sw = 1.5;

  const strokeColor = colorMap[color] || '#333';
  const tints = categoryTints[category] || categoryTints.eyeglasses;
  const fill = tints.fill;
  const accent = tints.accent;

  // FIX #1: Per-product offset based on product index (0-19) to ensure
  // that even products with the same shape+color in different categories
  // produce a unique SVG.
  const ox = Math.round((productIndex % 7) * 1.5 - 4);
  const oy = Math.round((productIndex % 5) * 1.2 - 2);

  const parts = getShapeParts(shape, strokeColor, sw, fill, ox, oy);

  // Category-specific decorations
  let decoration = '';
  if (category === 'sunglasses') {
    // Gradient lens reflection for sunglasses
    decoration = `<defs><linearGradient id="g${productIndex}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.15)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </linearGradient></defs>
    <rect x="85" y="65" width="125" height="65" rx="8" fill="url(#g${productIndex})" opacity="0.4"/>
    <rect x="295" y="65" width="125" height="65" rx="8" fill="url(#g${productIndex})" opacity="0.4"/>`;
  } else if (category === 'computer-glasses') {
    // Blue light indicator dot
    decoration = `<circle cx="${420-ox}" cy="${65+oy}" r="4" fill="#4F86FF" opacity="0.7"/>
    <circle cx="${420-ox}" cy="${65+oy}" r="7" fill="none" stroke="#4F86FF" stroke-width="1" opacity="0.3"/>`;
  } else if (category === 'kids') {
    // Playful colored temple tips
    const kidColors = ['#FF6B8A','#FFB347','#87CEEB','#98FB98','#DDA0DD','#F0E68C','#FFA07A','#ADD8E6','#FFB6C1','#FFDAB9',
                       '#B0E0E6','#FFD700','#FF69B4','#7FFFD4','#FFC0CB','#E6E6FA','#FFFACD','#FF7F50','#87CEFA','#F5DEB3'];
    const tipColor = kidColors[productIndex];
    decoration = `<circle cx="22" cy="${85+oy}" r="5" fill="${tipColor}"/>
    <circle cx="478" cy="${85+oy}" r="5" fill="${tipColor}"/>`;
  } else if (category === 'reading') {
    // Small "+" magnification symbol on bridge
    decoration = `<text x="250" y="${72+oy}" text-anchor="middle" font-size="10" font-family="Arial" fill="${strokeColor}" opacity="0.4">+</text>`;
  }

  // Subtle lens shine lines (vary position per product)
  const shineX1 = 115 + (productIndex % 4) * 5;
  const shineX2 = 315 + (productIndex % 4) * 5;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" width="500" height="200">
  <g stroke-linecap="round">
    ${parts.leftLens} ${parts.rightLens} ${parts.bridge} ${parts.temples}
    ${decoration}
    <path d="M ${shineX1} 75 L ${shineX1-15} 110 M ${shineX1+10} 75 L ${shineX1-5} 110 M ${shineX2} 75 L ${shineX2-15} 110 M ${shineX2+10} 75 L ${shineX2-5} 110" stroke="rgba(255,255,255,0.3)" stroke-width="3" fill="none"/>
  </g>
</svg>`;

  return svg;
}

// ── Product category definitions ──
const categories = [
  { cat: 'eyeglasses', names: ['Classic Rectangle','Vintage Round','Modern Square','Elegant Oval','Urban Rectangle','Retro Aviator','Executive Half-Rim','Minimalist Wire','Bold Geometric','Sleek Cat Eye','Heritage Round','Professional Rectangle','Slim Oval','Designer Square','Artisan Wood','Flexible Titanium','Lightweight TR90','Oversized Round','Narrow Rectangle','Premium Acetate'], brand: 'DocLens Premium', shapes: ['rectangle','round','square','oval','rectangle','aviator','rectangle','round','geometric','cat-eye','round','rectangle','oval','square','rectangle','round','rectangle','round','rectangle','oval'] },
  { cat: 'sunglasses', names: ['Aviator Gold','Classic Wayfarer','Sport Wrap','Oversized Square','Round Lennon','Cat Eye Glam','Pilot Chrome','Retro Clubmaster','Shield Sport','Butterfly Frame','Metal Aviator','Wooden Wayfarer','Polarized Rectangle','Mirror Round','Gradient Cat Eye','Vintage Oval','Rimless Aviator','Bold Square','Slim Rectangle','Oversized Round'], brand: 'DocLens Elite', shapes: ['aviator','wayfarer','rectangle','square','round','cat-eye','aviator','wayfarer','rectangle','cat-eye','aviator','wayfarer','rectangle','round','cat-eye','oval','aviator','square','rectangle','round'] },
  { cat: 'computer-glasses', names: ['Blue Shield Rectangle','Digital Comfort Round','Anti-Fatigue Square','Screen Guard Oval','Night Owl Rectangle','Gamer Pro','Office Classic','Coder Slim','Designer Blue Block','Tech Round','Zero Strain','Ultra Light Digital','Smart Screen','Focus Plus','Digital Elite','Eye Care Pro','Blue Cut Premium','Screen Safe','Pixel Guard','Vision Comfort'], brand: 'DocLens Digital', shapes: ['rectangle','round','square','oval','rectangle','square','rectangle','rectangle','geometric','round','rectangle','oval','rectangle','square','round','rectangle','rectangle','square','rectangle','oval'] },
  { cat: 'kids', names: ['Junior Explorer','Little Scholar','Tiny Aviator','Rainbow Flex','Sport Junior','Mini Round','Cool Cat Eye','Durable Square','Colorful Oval','Adventure Frame','Flexi Junior','Super Hero','Princess Sparkle','Little Einstein','Mini Wayfarer','Active Sport','Cartoon Square','Baby Pilot','Cute Round','Junior Pro'], brand: 'DocLens Junior', shapes: ['rectangle','rectangle','aviator','round','rectangle','round','cat-eye','square','oval','rectangle','rectangle','square','cat-eye','round','wayfarer','rectangle','square','aviator','round','rectangle'] },
  { cat: 'reading', names: ['Classic Reader','Slim Fold','Half Frame','Spring Hinge','Compact Fold','Executive Reader','Bifocal Classic','Vintage Reader','Lightweight Fold','Premium Half-Rim','Pocket Reader','Designer Reading','Comfort Plus','Auto-Focus Style','Wide Lens Reader','Thin Profile','Heritage Reader','Modern Bifocal','Flex Reader','Ultra Slim'], brand: 'DocLens Vision', shapes: ['rectangle','rectangle','rectangle','oval','rectangle','rectangle','rectangle','round','rectangle','rectangle','oval','square','rectangle','round','rectangle','rectangle','round','rectangle','oval','rectangle'] },
];

const materials = ['acetate','metal','titanium','plastic','tr90','acetate','metal','plastic','acetate','metal','titanium','tr90','acetate','metal','plastic','acetate','metal','wood','tr90','acetate'];
const colors = ['Black','Gold','Matte Black','Tortoise','Navy','Silver','Brown','Gunmetal','Crystal','Rose Gold','Black','Tortoise','Blue','Silver','Red','Brown','Black','Wood','Gray','Havana'];
const frameTypes = ['full-rim','full-rim','half-rim','full-rim','rimless','full-rim','half-rim','full-rim','full-rim','full-rim','rimless','full-rim','full-rim','half-rim','full-rim','rimless','full-rim','full-rim','half-rim','full-rim'];

const products = [];
let id = 1;
let svgFilesWritten = 0;

categories.forEach((c, ci) => {
  for (let i = 0; i < 20; i++) {
    const basePrice = c.cat === 'kids'
      ? 1200 + Math.floor(Math.random() * 800)
      : c.cat === 'reading'
        ? 800 + Math.floor(Math.random() * 1200)
        : 1500 + Math.floor(Math.random() * 3000);
    const price = Math.round(basePrice / 100) * 100 + 99;
    const origPrice = Math.round(price * (1.2 + Math.random() * 0.3) / 100) * 100 + 99;
    const rating = (4 + Math.random() * 0.9).toFixed(1);
    const reviews = 50 + Math.floor(Math.random() * 400);

    // Generate SVG and write to file
    const svgContent = generateGlassesSvg(c.shapes[i], colors[i], frameTypes[i], c.cat, i);
    const filename = `${c.cat}-${i + 1}.svg`;
    const filePath = path.join(GLASSES_DIR, filename);
    fs.writeFileSync(filePath, svgContent);
    svgFilesWritten++;

    // Reference via public path (Vite serves /public as /)
    const imgPath = `/glasses/${filename}`;

    const gender = c.cat === 'kids' ? 'kids' : (i % 2 === 0 ? 'unisex' : (i % 3 === 0 ? 'women' : 'men'));

    const product = {
      id,
      name: c.names[i],
      brand: c.brand,
      price,
      originalPrice: origPrice,
      category: c.cat,
      frameType: frameTypes[i],
      frameShape: c.shapes[i],
      frameMaterial: materials[i],
      color: colors[i],
      gender,
      images: [imgPath],  // FIX #9: Single image, no duplicate
      tryOnImage: imgPath,
      description: `Premium ${c.names[i].toLowerCase()} from ${c.brand}. Crafted with quality ${materials[i]} for comfort and style.`,
      features: ['UV Protection', 'Anti-scratch coating', 'Lightweight design', 'Spring hinges'],
      rating: parseFloat(rating),
      reviews,
      inStock: true,
      frameWidth: ['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)],
      lensWidth: 48 + Math.floor(Math.random() * 14),
      bridgeWidth: 14 + Math.floor(Math.random() * 8),
      templeLength: 135 + Math.floor(Math.random() * 15),
    };

    // FIX #4: Use explicit boolean properties instead of `true || undefined`
    if (i < 4) product.isBestSeller = true;
    if (i >= 16) product.isNew = true;

    products.push(product);
    id++;
  }
});

// ── Generate TypeScript ──
// FIX #2: Use JSON.stringify replacer instead of fragile regex
const productsJson = JSON.stringify(products, null, 2);

const ts = `import { Product } from '../types';

export const products: Product[] = ${productsJson};

export const lensTypes = [
  { id: 'single-vision', name: 'Single Vision', price: 500, description: 'For distance or reading' },
  { id: 'bifocal', name: 'Bifocal', price: 1200, description: 'Distance + reading in one lens' },
  { id: 'progressive', name: 'Progressive', price: 2500, description: 'Seamless distance to reading transition' },
  { id: 'non-prescription', name: 'Non-Prescription', price: 0, description: 'Plano lenses \\u2014 no power' },
];

export const lensCoatings = [
  { id: 'anti-reflective', name: 'Anti-Reflective', price: 300, description: 'Reduces glare' },
  { id: 'blue-light', name: 'Blue Light Filter', price: 400, description: 'Blocks harmful blue light' },
  { id: 'photochromic', name: 'Photochromic', price: 800, description: 'Darkens in sunlight' },
  { id: 'scratch-resistant', name: 'Scratch Resistant', price: 200, description: 'Extra durability' },
];

export const frameShapes = [
  { id: 'rectangle', name: 'Rectangle', icon: '▬' },
  { id: 'round', name: 'Round', icon: '○' },
  { id: 'aviator', name: 'Aviator', icon: '◇' },
  { id: 'cat-eye', name: 'Cat Eye', icon: '◠' },
  { id: 'square', name: 'Square', icon: '□' },
  { id: 'wayfarer', name: 'Wayfarer', icon: '⬡' },
  { id: 'oval', name: 'Oval', icon: '⬭' },
  { id: 'geometric', name: 'Geometric', icon: '△' },
];

export const frameColors = [
  'Black', 'Gold', 'Silver', 'Tortoise', 'Brown', 'Navy',
  'Matte Black', 'Gunmetal', 'Crystal', 'Rose Gold', 'Blue',
  'Red', 'Wood', 'Gray', 'Havana',
];
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'products.ts'), ts);

// Verify uniqueness
const svgHashes = new Set();
const allFiles = fs.readdirSync(GLASSES_DIR).filter(f => f.endsWith('.svg'));
allFiles.forEach(f => {
  const content = fs.readFileSync(path.join(GLASSES_DIR, f), 'utf8');
  svgHashes.add(content);
});

console.log(`✅ Generated ${products.length} products`);
console.log(`✅ Wrote ${svgFilesWritten} SVG files to public/glasses/`);
console.log(`✅ Unique SVGs: ${svgHashes.size}/${allFiles.length}`);
console.log(`✅ products.ts size: ${(Buffer.byteLength(ts) / 1024).toFixed(1)} KB (was ~361 KB)`);
