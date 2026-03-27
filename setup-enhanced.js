const fs = require('fs');

// ========== DIRECTORY CREATION ==========
const dirs = [
  './public',
  './src',
  './src/components',
  './src/pages',
  './src/data',
  './src/context',
  './src/types'
];

dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  console.log('Created:', dir);
});

// ========== FAVICON ==========
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="30" cy="50" r="20" fill="none" stroke="url(#grad1)" stroke-width="4"/>
  <circle cx="70" cy="50" r="20" fill="none" stroke="url(#grad1)" stroke-width="4"/>
  <path d="M50 50 L50 50" stroke="url(#grad1)" stroke-width="4" stroke-linecap="round"/>
  <line x1="10" y1="50" x2="10" y2="35" stroke="url(#grad1)" stroke-width="4" stroke-linecap="round"/>
  <line x1="90" y1="50" x2="90" y2="35" stroke="url(#grad1)" stroke-width="4" stroke-linecap="round"/>
</svg>`;
fs.writeFileSync('./public/favicon.svg', favicon);

// ========== TYPES ==========
const types = `export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: 'eyeglasses' | 'sunglasses' | 'computer-glasses' | 'kids' | 'reading';
  frameType: 'full-rim' | 'half-rim' | 'rimless';
  frameShape: 'rectangle' | 'round' | 'square' | 'aviator' | 'cat-eye' | 'wayfarer' | 'oval' | 'geometric';
  frameMaterial: 'metal' | 'acetate' | 'titanium' | 'plastic' | 'tr90' | 'wood';
  color: string;
  gender: 'men' | 'women' | 'unisex' | 'kids';
  images: string[];
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  frameWidth?: string;
  lensWidth?: number;
  bridgeWidth?: number;
  templeLength?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  prescription?: Prescription;
  lensType?: string;
  lensCoating?: string[];
}

export interface Prescription {
  rightEye: {
    sph: string;
    cyl: string;
    axis: string;
    add?: string;
  };
  leftEye: {
    sph: string;
    cyl: string;
    axis: string;
    add?: string;
  };
  pd: string;
  prescriptionType: 'single-vision' | 'bifocal' | 'progressive';
  hasFile?: boolean;
  fileName?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  addresses?: Address[];
  prescriptions?: SavedPrescription[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export interface SavedPrescription {
  id: string;
  name: string;
  prescription: Prescription;
  createdAt: string;
}

export interface FilterState {
  category: string;
  frameType: string;
  frameShape: string;
  gender: string;
  priceRange: [number, number];
  sortBy: string;
  color: string;
  material: string;
}
`;
fs.writeFileSync('./src/types/index.ts', types);

console.log('Created types...');

// ========== PRODUCTS DATA (30+ products) ==========
const products = `import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Rectangle Frame",
    brand: "DocLens Premium",
    price: 2499,
    originalPrice: 3499,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "rectangle",
    frameMaterial: "acetate",
    color: "Black",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500"
    ],
    description: "Timeless rectangle frames crafted with premium acetate. Perfect for everyday wear with a professional look.",
    features: ["UV Protection", "Anti-scratch coating", "Lightweight design", "Spring hinges"],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isBestSeller: true,
    frameWidth: "Medium",
    lensWidth: 52,
    bridgeWidth: 18,
    templeLength: 145
  },
  {
    id: 2,
    name: "Aviator Sunglasses Gold",
    brand: "DocLens Elite",
    price: 3299,
    originalPrice: 4499,
    category: "sunglasses",
    frameType: "full-rim",
    frameShape: "aviator",
    frameMaterial: "metal",
    color: "Gold",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"
    ],
    description: "Iconic aviator design with polarized lenses. Premium metal frame with adjustable nose pads.",
    features: ["Polarized lenses", "100% UV protection", "Adjustable nose pads", "Includes case"],
    rating: 4.8,
    reviews: 256,
    inStock: true,
    isBestSeller: true,
    frameWidth: "Large",
    lensWidth: 58,
    bridgeWidth: 14,
    templeLength: 140
  },
  {
    id: 3,
    name: "Blue Light Blocking Glasses",
    brand: "DocLens Digital",
    price: 1999,
    originalPrice: 2799,
    category: "computer-glasses",
    frameType: "full-rim",
    frameShape: "square",
    frameMaterial: "plastic",
    color: "Matte Black",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500",
      "https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=500"
    ],
    description: "Protect your eyes from digital strain with advanced blue light filtering technology.",
    features: ["Blue light filtering", "Anti-reflective coating", "Reduces eye strain", "Lightweight"],
    rating: 4.6,
    reviews: 189,
    inStock: true,
    isNew: true,
    frameWidth: "Medium",
    lensWidth: 50,
    bridgeWidth: 20,
    templeLength: 140
  },
  {
    id: 4,
    name: "Cat Eye Vintage Frame",
    brand: "DocLens Chic",
    price: 2799,
    originalPrice: 3999,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "cat-eye",
    frameMaterial: "acetate",
    color: "Tortoise",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=500",
      "https://images.unsplash.com/photo-1513673054901-2b5f51551112?w=500"
    ],
    description: "Vintage-inspired cat eye frames that add glamour to any look. Handcrafted acetate.",
    features: ["Handcrafted acetate", "Vintage design", "Spring hinges", "Includes cleaning cloth"],
    rating: 4.7,
    reviews: 145,
    inStock: true,
    isNew: true,
    frameWidth: "Medium",
    lensWidth: 54,
    bridgeWidth: 16,
    templeLength: 140
  },
  {
    id: 5,
    name: "Round Wire Frame",
    brand: "DocLens Classic",
    price: 2199,
    originalPrice: 2999,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "round",
    frameMaterial: "metal",
    color: "Silver",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"
    ],
    description: "Classic round frames with thin metal wire construction. Intellectual and stylish.",
    features: ["Thin metal frame", "Adjustable nose pads", "Lightweight", "Classic design"],
    rating: 4.4,
    reviews: 98,
    inStock: true,
    frameWidth: "Small",
    lensWidth: 48,
    bridgeWidth: 21,
    templeLength: 145
  },
  {
    id: 6,
    name: "Wayfarer Sunglasses",
    brand: "DocLens Street",
    price: 2899,
    originalPrice: 3799,
    category: "sunglasses",
    frameType: "full-rim",
    frameShape: "wayfarer",
    frameMaterial: "acetate",
    color: "Black",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    ],
    description: "Iconic wayfarer style sunglasses. Perfect for any outdoor activity.",
    features: ["UV400 protection", "Durable acetate", "Classic wayfarer shape", "Includes pouch"],
    rating: 4.6,
    reviews: 178,
    inStock: true,
    isBestSeller: true,
    frameWidth: "Large",
    lensWidth: 54,
    bridgeWidth: 18,
    templeLength: 145
  },
  {
    id: 7,
    name: "Kids Flexible Frame",
    brand: "DocLens Junior",
    price: 1499,
    originalPrice: 1999,
    category: "kids",
    frameType: "full-rim",
    frameShape: "rectangle",
    frameMaterial: "tr90",
    color: "Blue",
    gender: "kids",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"
    ],
    description: "Durable and flexible frames designed for active kids. Virtually unbreakable.",
    features: ["Flexible TR90 material", "Impact resistant", "Comfortable fit", "Fun colors"],
    rating: 4.8,
    reviews: 89,
    inStock: true,
    isNew: true,
    frameWidth: "Small",
    lensWidth: 44,
    bridgeWidth: 16,
    templeLength: 125
  },
  {
    id: 8,
    name: "Titanium Rimless Frame",
    brand: "DocLens Lite",
    price: 4499,
    originalPrice: 5999,
    category: "eyeglasses",
    frameType: "rimless",
    frameShape: "rectangle",
    frameMaterial: "titanium",
    color: "Gunmetal",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=500",
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500"
    ],
    description: "Ultra-lightweight rimless frames made from premium titanium. Barely there feeling.",
    features: ["Pure titanium", "Rimless design", "Ultra-lightweight", "Hypoallergenic"],
    rating: 4.9,
    reviews: 67,
    inStock: true,
    frameWidth: "Medium",
    lensWidth: 54,
    bridgeWidth: 17,
    templeLength: 140
  },
  {
    id: 9,
    name: "Sport Sunglasses Pro",
    brand: "DocLens Active",
    price: 3499,
    originalPrice: 4299,
    category: "sunglasses",
    frameType: "half-rim",
    frameShape: "rectangle",
    frameMaterial: "tr90",
    color: "Red/Black",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"
    ],
    description: "High-performance sport sunglasses with anti-slip grip and impact-resistant lenses.",
    features: ["Anti-slip grip", "Impact resistant", "Wraparound design", "Ventilated frame"],
    rating: 4.7,
    reviews: 134,
    inStock: true,
    frameWidth: "Large",
    lensWidth: 60,
    bridgeWidth: 15,
    templeLength: 135
  },
  {
    id: 10,
    name: "Half Rim Business Frame",
    brand: "DocLens Executive",
    price: 2699,
    originalPrice: 3499,
    category: "eyeglasses",
    frameType: "half-rim",
    frameShape: "rectangle",
    frameMaterial: "metal",
    color: "Brown",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500"
    ],
    description: "Sophisticated half-rim design perfect for the modern professional.",
    features: ["Premium metal", "Half-rim style", "Spring hinges", "Business elegant"],
    rating: 4.5,
    reviews: 112,
    inStock: true,
    frameWidth: "Medium",
    lensWidth: 55,
    bridgeWidth: 17,
    templeLength: 145
  },
  {
    id: 11,
    name: "Oversized Square Sunglasses",
    brand: "DocLens Glam",
    price: 2999,
    originalPrice: 3799,
    category: "sunglasses",
    frameType: "full-rim",
    frameShape: "square",
    frameMaterial: "acetate",
    color: "Black",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    ],
    description: "Make a statement with these oversized square frames. Ultimate sun protection and style.",
    features: ["Oversized design", "Gradient lenses", "UV protection", "Fashion forward"],
    rating: 4.6,
    reviews: 156,
    inStock: true,
    isBestSeller: true,
    frameWidth: "Large",
    lensWidth: 58,
    bridgeWidth: 16,
    templeLength: 140
  },
  {
    id: 12,
    name: "Progressive Reading Glasses",
    brand: "DocLens Vision",
    price: 3999,
    originalPrice: 5499,
    category: "reading",
    frameType: "full-rim",
    frameShape: "rectangle",
    frameMaterial: "acetate",
    color: "Navy Blue",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500",
      "https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=500"
    ],
    description: "Premium progressive lenses in a stylish frame. See clearly at all distances.",
    features: ["Progressive lenses", "Anti-fatigue", "Premium coatings", "All-day comfort"],
    rating: 4.8,
    reviews: 203,
    inStock: true,
    frameWidth: "Medium",
    lensWidth: 52,
    bridgeWidth: 18,
    templeLength: 145
  },
  {
    id: 13,
    name: "Geometric Fashion Frame",
    brand: "DocLens Trend",
    price: 2599,
    originalPrice: 3299,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "geometric",
    frameMaterial: "acetate",
    color: "Crystal Pink",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=500",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"
    ],
    description: "Bold geometric frames for the fashion-forward. Stand out from the crowd.",
    features: ["Geometric shape", "Transparent frame", "Trendy design", "Lightweight"],
    rating: 4.4,
    reviews: 76,
    inStock: true,
    isNew: true,
    frameWidth: "Medium",
    lensWidth: 53,
    bridgeWidth: 17,
    templeLength: 140
  },
  {
    id: 14,
    name: "Wooden Temple Frame",
    brand: "DocLens Eco",
    price: 3799,
    originalPrice: 4599,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "rectangle",
    frameMaterial: "wood",
    color: "Walnut",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500"
    ],
    description: "Eco-friendly frames with genuine wood temples. Each piece is unique.",
    features: ["Real wood temples", "Eco-friendly", "Unique grain pattern", "Hypoallergenic"],
    rating: 4.7,
    reviews: 54,
    inStock: true,
    frameWidth: "Medium",
    lensWidth: 52,
    bridgeWidth: 18,
    templeLength: 145
  },
  {
    id: 15,
    name: "Retro Oval Frame",
    brand: "DocLens Vintage",
    price: 2299,
    originalPrice: 2999,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "oval",
    frameMaterial: "metal",
    color: "Rose Gold",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500",
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=500"
    ],
    description: "Elegant oval frames with a retro vibe. Timeless beauty meets modern comfort.",
    features: ["Rose gold finish", "Oval shape", "Nose pads", "Vintage style"],
    rating: 4.5,
    reviews: 88,
    inStock: true,
    frameWidth: "Small",
    lensWidth: 48,
    bridgeWidth: 19,
    templeLength: 140
  },
  {
    id: 16,
    name: "Kids Cartoon Frame",
    brand: "DocLens Junior",
    price: 1299,
    originalPrice: 1799,
    category: "kids",
    frameType: "full-rim",
    frameShape: "round",
    frameMaterial: "tr90",
    color: "Pink",
    gender: "kids",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"
    ],
    description: "Fun and colorful frames designed for little ones. Safe and comfortable.",
    features: ["Flexible material", "Colorful design", "Soft nose pads", "Break-resistant"],
    rating: 4.9,
    reviews: 122,
    inStock: true,
    isBestSeller: true,
    frameWidth: "Small",
    lensWidth: 42,
    bridgeWidth: 15,
    templeLength: 120
  },
  {
    id: 17,
    name: "Clubmaster Style Frame",
    brand: "DocLens Retro",
    price: 2899,
    originalPrice: 3699,
    category: "eyeglasses",
    frameType: "half-rim",
    frameShape: "rectangle",
    frameMaterial: "acetate",
    color: "Tortoise/Gold",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500",
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500"
    ],
    description: "Classic clubmaster inspired design. A perfect blend of vintage and modern.",
    features: ["Browline style", "Metal rim", "Acetate brow", "Adjustable nose pads"],
    rating: 4.6,
    reviews: 167,
    inStock: true,
    isBestSeller: true,
    frameWidth: "Medium",
    lensWidth: 51,
    bridgeWidth: 20,
    templeLength: 145
  },
  {
    id: 18,
    name: "Mirror Lens Aviator",
    brand: "DocLens Sport",
    price: 2799,
    originalPrice: 3599,
    category: "sunglasses",
    frameType: "full-rim",
    frameShape: "aviator",
    frameMaterial: "metal",
    color: "Silver/Blue Mirror",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"
    ],
    description: "Bold mirror lens aviators for a striking look. Perfect for sunny days.",
    features: ["Mirror coating", "Polarized option", "Double bridge", "Spring hinges"],
    rating: 4.5,
    reviews: 143,
    inStock: true,
    frameWidth: "Large",
    lensWidth: 58,
    bridgeWidth: 14,
    templeLength: 140
  },
  {
    id: 19,
    name: "Computer Clip-On",
    brand: "DocLens Digital",
    price: 999,
    originalPrice: 1499,
    category: "computer-glasses",
    frameType: "rimless",
    frameShape: "rectangle",
    frameMaterial: "plastic",
    color: "Yellow Tint",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500",
      "https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=500"
    ],
    description: "Clip-on blue light blocking lenses for existing glasses. Easy to use.",
    features: ["Clip-on design", "Blue light blocking", "Universal fit", "Flip-up feature"],
    rating: 4.3,
    reviews: 234,
    inStock: true,
    isNew: true,
    frameWidth: "Medium",
    lensWidth: 56,
    bridgeWidth: 18,
    templeLength: 0
  },
  {
    id: 20,
    name: "Premium Reading Glasses",
    brand: "DocLens Vision",
    price: 1799,
    originalPrice: 2499,
    category: "reading",
    frameType: "full-rim",
    frameShape: "rectangle",
    frameMaterial: "metal",
    color: "Bronze",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500",
      "https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=500"
    ],
    description: "High-quality reading glasses with spring hinges for all-day comfort.",
    features: ["Multiple powers", "Spring hinges", "Anti-reflective", "Durable"],
    rating: 4.6,
    reviews: 189,
    inStock: true,
    frameWidth: "Medium",
    lensWidth: 52,
    bridgeWidth: 18,
    templeLength: 145
  },
  {
    id: 21,
    name: "Gradient Lens Cat Eye",
    brand: "DocLens Glam",
    price: 3199,
    originalPrice: 4199,
    category: "sunglasses",
    frameType: "full-rim",
    frameShape: "cat-eye",
    frameMaterial: "acetate",
    color: "Black/Pink Gradient",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=500",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    ],
    description: "Glamorous cat eye sunglasses with beautiful gradient lenses.",
    features: ["Gradient lenses", "UV400 protection", "Designer style", "Premium acetate"],
    rating: 4.7,
    reviews: 98,
    inStock: true,
    isNew: true,
    frameWidth: "Medium",
    lensWidth: 55,
    bridgeWidth: 16,
    templeLength: 140
  },
  {
    id: 22,
    name: "Ultra-Thin Frame",
    brand: "DocLens Minimal",
    price: 2999,
    originalPrice: 3999,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "round",
    frameMaterial: "titanium",
    color: "Black",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"
    ],
    description: "Minimalist design with ultra-thin titanium frame. Weighs only 12 grams.",
    features: ["Ultra-thin", "12g weight", "Titanium", "Minimalist"],
    rating: 4.8,
    reviews: 76,
    inStock: true,
    frameWidth: "Small",
    lensWidth: 47,
    bridgeWidth: 21,
    templeLength: 145
  },
  {
    id: 23,
    name: "Kids Sports Frame",
    brand: "DocLens Junior",
    price: 1699,
    originalPrice: 2299,
    category: "kids",
    frameType: "full-rim",
    frameShape: "rectangle",
    frameMaterial: "tr90",
    color: "Navy/Orange",
    gender: "kids",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"
    ],
    description: "Durable sports frames for active kids. Strap included for secure fit.",
    features: ["Sports strap included", "Impact resistant", "Rubberized temples", "Sweat resistant"],
    rating: 4.7,
    reviews: 67,
    inStock: true,
    frameWidth: "Small",
    lensWidth: 46,
    bridgeWidth: 16,
    templeLength: 125
  },
  {
    id: 24,
    name: "Fashion Oversized Round",
    brand: "DocLens Trend",
    price: 2699,
    originalPrice: 3499,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "round",
    frameMaterial: "acetate",
    color: "Transparent Gray",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=500",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500"
    ],
    description: "Fashion-forward oversized round frames. Make a bold statement.",
    features: ["Oversized", "Transparent frame", "Trendy", "Lightweight"],
    rating: 4.4,
    reviews: 89,
    inStock: true,
    isNew: true,
    frameWidth: "Large",
    lensWidth: 56,
    bridgeWidth: 18,
    templeLength: 145
  },
  {
    id: 25,
    name: "Executive Gold Frame",
    brand: "DocLens Executive",
    price: 4299,
    originalPrice: 5499,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "rectangle",
    frameMaterial: "titanium",
    color: "Gold",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500",
      "https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=500"
    ],
    description: "Premium executive frames with gold-plated titanium. Luxury meets function.",
    features: ["Gold plated", "Pure titanium", "Executive style", "Premium hinges"],
    rating: 4.9,
    reviews: 45,
    inStock: true,
    frameWidth: "Medium",
    lensWidth: 54,
    bridgeWidth: 17,
    templeLength: 145
  },
  {
    id: 26,
    name: "Photochromic Rectangle",
    brand: "DocLens Smart",
    price: 3599,
    originalPrice: 4499,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "rectangle",
    frameMaterial: "plastic",
    color: "Black",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"
    ],
    description: "Smart photochromic lenses that darken in sunlight. Two glasses in one.",
    features: ["Photochromic lenses", "UV reactive", "Clear indoors", "Dark outdoors"],
    rating: 4.6,
    reviews: 156,
    inStock: true,
    isBestSeller: true,
    frameWidth: "Medium",
    lensWidth: 53,
    bridgeWidth: 18,
    templeLength: 145
  },
  {
    id: 27,
    name: "Wrap Around Sport",
    brand: "DocLens Active",
    price: 2499,
    originalPrice: 3299,
    category: "sunglasses",
    frameType: "full-rim",
    frameShape: "rectangle",
    frameMaterial: "tr90",
    color: "Black/Yellow",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    ],
    description: "Full coverage wrap around sunglasses for outdoor sports and activities.",
    features: ["Wrap around", "Anti-slip", "Polarized", "Ventilated"],
    rating: 4.5,
    reviews: 123,
    inStock: true,
    frameWidth: "Large",
    lensWidth: 62,
    bridgeWidth: 14,
    templeLength: 135
  },
  {
    id: 28,
    name: "Vintage Tortoise Round",
    brand: "DocLens Vintage",
    price: 2399,
    originalPrice: 3199,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "round",
    frameMaterial: "acetate",
    color: "Classic Tortoise",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"
    ],
    description: "Classic tortoise shell pattern in a round frame. Timeless elegance.",
    features: ["Tortoise pattern", "Keyhole bridge", "Spring hinges", "Vintage style"],
    rating: 4.6,
    reviews: 134,
    inStock: true,
    frameWidth: "Medium",
    lensWidth: 49,
    bridgeWidth: 20,
    templeLength: 145
  },
  {
    id: 29,
    name: "Kids First Frame",
    brand: "DocLens Junior",
    price: 999,
    originalPrice: 1499,
    category: "kids",
    frameType: "full-rim",
    frameShape: "oval",
    frameMaterial: "tr90",
    color: "Purple",
    gender: "kids",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"
    ],
    description: "Perfect first glasses for toddlers. Extra soft and comfortable.",
    features: ["Toddler friendly", "Ultra soft", "Flexible", "Adjustable"],
    rating: 4.8,
    reviews: 78,
    inStock: true,
    frameWidth: "Extra Small",
    lensWidth: 40,
    bridgeWidth: 14,
    templeLength: 115
  },
  {
    id: 30,
    name: "Polarized Fishing Glasses",
    brand: "DocLens Active",
    price: 2999,
    originalPrice: 3799,
    category: "sunglasses",
    frameType: "full-rim",
    frameShape: "rectangle",
    frameMaterial: "tr90",
    color: "Brown/Amber",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"
    ],
    description: "Specialized polarized lenses for fishing. See through water glare.",
    features: ["Amber polarized", "Floatable", "Anti-glare", "Water sports"],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    frameWidth: "Large",
    lensWidth: 60,
    bridgeWidth: 16,
    templeLength: 135
  },
  {
    id: 31,
    name: "Designer Square Frame",
    brand: "DocLens Premium",
    price: 3499,
    originalPrice: 4499,
    category: "eyeglasses",
    frameType: "full-rim",
    frameShape: "square",
    frameMaterial: "acetate",
    color: "Havana",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500",
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500"
    ],
    description: "Designer inspired bold square frames. Premium Italian acetate.",
    features: ["Italian acetate", "Bold style", "Premium quality", "Designer look"],
    rating: 4.6,
    reviews: 98,
    inStock: true,
    frameWidth: "Large",
    lensWidth: 56,
    bridgeWidth: 18,
    templeLength: 145
  },
  {
    id: 32,
    name: "Gaming Glasses Pro",
    brand: "DocLens Digital",
    price: 2499,
    originalPrice: 3299,
    category: "computer-glasses",
    frameType: "full-rim",
    frameShape: "rectangle",
    frameMaterial: "tr90",
    color: "Black/Red",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500",
      "https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=500"
    ],
    description: "Designed for gamers. Maximum blue light protection for long sessions.",
    features: ["Gaming optimized", "Extra blue light protection", "Comfortable", "Headset compatible"],
    rating: 4.8,
    reviews: 234,
    inStock: true,
    isBestSeller: true,
    frameWidth: "Medium",
    lensWidth: 54,
    bridgeWidth: 17,
    templeLength: 140
  }
];

export const categories = [
  { id: 'eyeglasses', name: 'Eyeglasses', icon: '👓', count: 156 },
  { id: 'sunglasses', name: 'Sunglasses', icon: '🕶️', count: 98 },
  { id: 'computer-glasses', name: 'Computer Glasses', icon: '💻', count: 45 },
  { id: 'kids', name: 'Kids Glasses', icon: '👶', count: 32 },
  { id: 'reading', name: 'Reading Glasses', icon: '📖', count: 28 }
];

export const brands = [
  'DocLens Premium',
  'DocLens Elite', 
  'DocLens Digital',
  'DocLens Chic',
  'DocLens Classic',
  'DocLens Street',
  'DocLens Junior',
  'DocLens Lite',
  'DocLens Active',
  'DocLens Executive',
  'DocLens Glam',
  'DocLens Vision',
  'DocLens Trend',
  'DocLens Eco',
  'DocLens Vintage',
  'DocLens Retro',
  'DocLens Sport',
  'DocLens Minimal',
  'DocLens Smart'
];

export const frameColors = [
  'Black', 'Brown', 'Gold', 'Silver', 'Tortoise', 'Blue', 'Red', 'Pink', 'Purple', 'Green', 'Transparent'
];

export const lensTypes = [
  { id: 'single-vision', name: 'Single Vision', price: 0, description: 'For one field of vision' },
  { id: 'bifocal', name: 'Bifocal', price: 1500, description: 'Two fields of vision' },
  { id: 'progressive', name: 'Progressive', price: 3000, description: 'Seamless multi-focal' }
];

export const lensCoatings = [
  { id: 'anti-reflective', name: 'Anti-Reflective', price: 500, description: 'Reduces glare and reflections' },
  { id: 'blue-light', name: 'Blue Light Filter', price: 800, description: 'Protects from digital screens' },
  { id: 'photochromic', name: 'Photochromic', price: 2000, description: 'Darkens in sunlight' },
  { id: 'scratch-resistant', name: 'Scratch Resistant', price: 300, description: 'Extra durability' },
  { id: 'uv-protection', name: 'UV Protection', price: 400, description: '100% UV blocking' }
];
`;
fs.writeFileSync('./src/data/products.ts', products);

console.log('Created products data with 32 products...');

// ========== AUTH CONTEXT ==========
const authContext = `import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Address, SavedPrescription, Prescription } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  savePrescription: (name: string, prescription: Prescription) => void;
  removePrescription: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('doclens-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('doclens-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('doclens-user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check stored users
    const users = JSON.parse(localStorage.getItem('doclens-users') || '[]');
    const existingUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const { password: _, ...userWithoutPassword } = existingUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('doclens-users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      return false; // Email already exists
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      phone,
      addresses: [],
      prescriptions: []
    };
    
    users.push(newUser);
    localStorage.setItem('doclens-users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      // Update in stored users
      const users = JSON.parse(localStorage.getItem('doclens-users') || '[]');
      const index = users.findIndex((u: any) => u.id === user.id);
      if (index !== -1) {
        users[index] = { ...users[index], ...data };
        localStorage.setItem('doclens-users', JSON.stringify(users));
      }
    }
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (user) {
      const newAddress: Address = {
        ...address,
        id: Date.now().toString()
      };
      const addresses = [...(user.addresses || []), newAddress];
      updateProfile({ addresses });
    }
  };

  const removeAddress = (id: string) => {
    if (user) {
      const addresses = (user.addresses || []).filter(a => a.id !== id);
      updateProfile({ addresses });
    }
  };

  const setDefaultAddress = (id: string) => {
    if (user) {
      const addresses = (user.addresses || []).map(a => ({
        ...a,
        isDefault: a.id === id
      }));
      updateProfile({ addresses });
    }
  };

  const savePrescription = (name: string, prescription: Prescription) => {
    if (user) {
      const newPrescription: SavedPrescription = {
        id: Date.now().toString(),
        name,
        prescription,
        createdAt: new Date().toISOString()
      };
      const prescriptions = [...(user.prescriptions || []), newPrescription];
      updateProfile({ prescriptions });
    }
  };

  const removePrescription = (id: string) => {
    if (user) {
      const prescriptions = (user.prescriptions || []).filter(p => p.id !== id);
      updateProfile({ prescriptions });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      updateProfile,
      addAddress,
      removeAddress,
      setDefaultAddress,
      savePrescription,
      removePrescription
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
`;
fs.writeFileSync('./src/context/AuthContext.tsx', authContext);

console.log('Created AuthContext...');

// ========== WISHLIST CONTEXT ==========
const wishlistContext = `import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('doclens-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('doclens-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
`;
fs.writeFileSync('./src/context/WishlistContext.tsx', wishlistContext);

console.log('Created WishlistContext...');

// ========== CART CONTEXT (UPDATED) ==========
const cartContext = `import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Prescription } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, prescription?: Prescription, lensType?: string, lensCoating?: string[]) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updatePrescription: (productId: number, prescription: Prescription) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getLensTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('doclens-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('doclens-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, prescription?: Prescription, lensType?: string, lensCoating?: string[]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing && !prescription) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, prescription, lensType, lensCoating }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updatePrescription = (productId: number, prescription: Prescription) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, prescription } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => 
    cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const getLensTotal = () => {
    // Calculate lens customization costs
    return cartItems.reduce((total, item) => {
      let lensPrice = 0;
      if (item.lensType === 'bifocal') lensPrice += 1500;
      if (item.lensType === 'progressive') lensPrice += 3000;
      if (item.lensCoating) {
        item.lensCoating.forEach(coating => {
          if (coating === 'anti-reflective') lensPrice += 500;
          if (coating === 'blue-light') lensPrice += 800;
          if (coating === 'photochromic') lensPrice += 2000;
          if (coating === 'scratch-resistant') lensPrice += 300;
          if (coating === 'uv-protection') lensPrice += 400;
        });
      }
      return total + (lensPrice * item.quantity);
    }, 0);
  };

  const getCartCount = () => 
    cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      updatePrescription,
      clearCart,
      getCartTotal,
      getCartCount,
      getLensTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
`;
fs.writeFileSync('./src/context/CartContext.tsx', cartContext);

console.log('Created CartContext...');

// Continue creating components...
console.log('Creating components...');
