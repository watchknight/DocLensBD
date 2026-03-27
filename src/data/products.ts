import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1, name: "Classic Rectangle Frame", brand: "DocLens Premium", price: 2499, originalPrice: 3499,
    category: "eyeglasses", frameType: "full-rim", frameShape: "rectangle", frameMaterial: "acetate",
    color: "Black", gender: "unisex",
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500","https://images.unsplash.com/photo-1577803645773-f96470509666?w=500"],
    description: "Timeless rectangle frames crafted with premium acetate. Perfect for everyday wear with a professional look.",
    features: ["UV Protection","Anti-scratch coating","Lightweight design","Spring hinges"],
    rating: 4.5, reviews: 128, inStock: true, isBestSeller: true, frameWidth: "Medium", lensWidth: 52, bridgeWidth: 18, templeLength: 145
  },
  {
    id: 2, name: "Aviator Sunglasses Gold", brand: "DocLens Elite", price: 3299, originalPrice: 4499,
    category: "sunglasses", frameType: "full-rim", frameShape: "aviator", frameMaterial: "metal",
    color: "Gold", gender: "unisex",
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500","https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"],
    description: "Iconic aviator design with polarized lenses. Premium metal frame with adjustable nose pads.",
    features: ["Polarized lenses","100% UV protection","Adjustable nose pads","Includes case"],
    rating: 4.8, reviews: 256, inStock: true, isBestSeller: true, frameWidth: "Large", lensWidth: 58, bridgeWidth: 14, templeLength: 140
  },
  {
    id: 3, name: "Blue Light Blocking Glasses", brand: "DocLens Digital", price: 1999, originalPrice: 2799,
    category: "computer-glasses", frameType: "full-rim", frameShape: "square", frameMaterial: "plastic",
    color: "Matte Black", gender: "unisex",
    images: ["https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500","https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=500"],
    description: "Protect your eyes from digital strain with advanced blue light filtering technology.",
    features: ["Blue light filtering","Anti-reflective coating","Reduces eye strain","Lightweight"],
    rating: 4.6, reviews: 189, inStock: true, isNew: true, frameWidth: "Medium", lensWidth: 50, bridgeWidth: 20, templeLength: 140
  },
  {
    id: 4, name: "Cat Eye Vintage Frame", brand: "DocLens Chic", price: 2799, originalPrice: 3999,
    category: "eyeglasses", frameType: "full-rim", frameShape: "cat-eye", frameMaterial: "acetate",
    color: "Tortoise", gender: "women",
    images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=500","https://images.unsplash.com/photo-1513673054901-2b5f51551112?w=500"],
    description: "Vintage-inspired cat eye frames that add glamour to any look. Handcrafted acetate.",
    features: ["Handcrafted acetate","Vintage design","Spring hinges","Includes cleaning cloth"],
    rating: 4.7, reviews: 145, inStock: true, isNew: true, frameWidth: "Medium", lensWidth: 54, bridgeWidth: 16, templeLength: 140
  },
  {
    id: 5, name: "Round Wire Frame", brand: "DocLens Classic", price: 2199, originalPrice: 2999,
    category: "eyeglasses", frameType: "full-rim", frameShape: "round", frameMaterial: "metal",
    color: "Silver", gender: "unisex",
    images: ["https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500","https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"],
    description: "Classic round frames with thin metal wire construction. Intellectual and stylish.",
    features: ["Thin metal frame","Adjustable nose pads","Lightweight","Classic design"],
    rating: 4.4, reviews: 98, inStock: true, frameWidth: "Small", lensWidth: 48, bridgeWidth: 21, templeLength: 145
  },
  {
    id: 6, name: "Wayfarer Sunglasses", brand: "DocLens Street", price: 2899, originalPrice: 3799,
    category: "sunglasses", frameType: "full-rim", frameShape: "wayfarer", frameMaterial: "acetate",
    color: "Black", gender: "unisex",
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500","https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"],
    description: "Iconic wayfarer style sunglasses. Perfect for any outdoor activity.",
    features: ["UV400 protection","Durable acetate","Classic wayfarer shape","Includes pouch"],
    rating: 4.6, reviews: 178, inStock: true, isBestSeller: true, frameWidth: "Large", lensWidth: 54, bridgeWidth: 18, templeLength: 145
  },
  {
    id: 7, name: "Kids Flexible Frame", brand: "DocLens Junior", price: 1499, originalPrice: 1999,
    category: "kids", frameType: "full-rim", frameShape: "rectangle", frameMaterial: "tr90",
    color: "Blue", gender: "kids",
    images: ["https://images.unsplash.com/photo-1577803645773-f96470509666?w=500","https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"],
    description: "Durable and flexible frames designed for active kids. Virtually unbreakable.",
    features: ["Flexible TR90 material","Impact resistant","Comfortable fit","Fun colors"],
    rating: 4.8, reviews: 89, inStock: true, isNew: true, frameWidth: "Small", lensWidth: 44, bridgeWidth: 16, templeLength: 125
  },
  {
    id: 8, name: "Titanium Rimless Frame", brand: "DocLens Lite", price: 4499, originalPrice: 5999,
    category: "eyeglasses", frameType: "rimless", frameShape: "rectangle", frameMaterial: "titanium",
    color: "Gunmetal", gender: "men",
    images: ["https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=500","https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500"],
    description: "Ultra-lightweight rimless frames made from premium titanium. Barely there feeling.",
    features: ["Pure titanium","Rimless design","Ultra-lightweight","Hypoallergenic"],
    rating: 4.9, reviews: 67, inStock: true, frameWidth: "Medium", lensWidth: 54, bridgeWidth: 17, templeLength: 140
  },
  {
    id: 9, name: "Sport Sunglasses Pro", brand: "DocLens Active", price: 3499, originalPrice: 4299,
    category: "sunglasses", frameType: "half-rim", frameShape: "rectangle", frameMaterial: "tr90",
    color: "Red/Black", gender: "unisex",
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500","https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"],
    description: "High-performance sport sunglasses with anti-slip grip and impact-resistant lenses.",
    features: ["Anti-slip grip","Impact resistant","Wraparound design","Ventilated frame"],
    rating: 4.7, reviews: 134, inStock: true, frameWidth: "Large", lensWidth: 60, bridgeWidth: 15, templeLength: 135
  },
  {
    id: 10, name: "Half Rim Business Frame", brand: "DocLens Executive", price: 2699, originalPrice: 3499,
    category: "eyeglasses", frameType: "half-rim", frameShape: "rectangle", frameMaterial: "metal",
    color: "Brown", gender: "men",
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500","https://images.unsplash.com/photo-1577803645773-f96470509666?w=500"],
    description: "Sophisticated half-rim design perfect for the modern professional.",
    features: ["Premium metal","Half-rim style","Spring hinges","Business elegant"],
    rating: 4.5, reviews: 112, inStock: true, frameWidth: "Medium", lensWidth: 55, bridgeWidth: 17, templeLength: 145
  },
  {
    id: 11, name: "Oversized Square Sunglasses", brand: "DocLens Glam", price: 2999, originalPrice: 3799,
    category: "sunglasses", frameType: "full-rim", frameShape: "square", frameMaterial: "acetate",
    color: "Black", gender: "women",
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500","https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"],
    description: "Make a statement with these oversized square frames. Ultimate sun protection and style.",
    features: ["Oversized design","Gradient lenses","UV protection","Fashion forward"],
    rating: 4.6, reviews: 156, inStock: true, isBestSeller: true, frameWidth: "Large", lensWidth: 58, bridgeWidth: 16, templeLength: 140
  },
  {
    id: 12, name: "Progressive Reading Glasses", brand: "DocLens Vision", price: 3999, originalPrice: 5499,
    category: "reading", frameType: "full-rim", frameShape: "rectangle", frameMaterial: "acetate",
    color: "Navy Blue", gender: "unisex",
    images: ["https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500","https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=500"],
    description: "Premium progressive lenses in a stylish frame. See clearly at all distances.",
    features: ["Progressive lenses","Anti-fatigue","Premium coatings","All-day comfort"],
    rating: 4.8, reviews: 203, inStock: true, frameWidth: "Medium", lensWidth: 52, bridgeWidth: 18, templeLength: 145
  },
  {
    id: 13, name: "Geometric Fashion Frame", brand: "DocLens Trend", price: 2599, originalPrice: 3299,
    category: "eyeglasses", frameType: "full-rim", frameShape: "geometric", frameMaterial: "acetate",
    color: "Crystal Pink", gender: "women",
    images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=500","https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"],
    description: "Bold geometric frames for the fashion-forward. Stand out from the crowd.",
    features: ["Geometric shape","Transparent frame","Trendy design","Lightweight"],
    rating: 4.4, reviews: 76, inStock: true, isNew: true, frameWidth: "Medium", lensWidth: 53, bridgeWidth: 17, templeLength: 140
  },
  {
    id: 14, name: "Clubmaster Style Frame", brand: "DocLens Retro", price: 2899, originalPrice: 3699,
    category: "eyeglasses", frameType: "half-rim", frameShape: "rectangle", frameMaterial: "acetate",
    color: "Tortoise/Gold", gender: "unisex",
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500","https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500"],
    description: "Classic clubmaster inspired design. A perfect blend of vintage and modern.",
    features: ["Browline style","Metal rim","Acetate brow","Adjustable nose pads"],
    rating: 4.6, reviews: 167, inStock: true, isBestSeller: true, frameWidth: "Medium", lensWidth: 51, bridgeWidth: 20, templeLength: 145
  },
  {
    id: 15, name: "Mirror Lens Aviator", brand: "DocLens Sport", price: 2799, originalPrice: 3599,
    category: "sunglasses", frameType: "full-rim", frameShape: "aviator", frameMaterial: "metal",
    color: "Silver/Blue Mirror", gender: "unisex",
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500","https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"],
    description: "Bold mirror lens aviators for a striking look. Perfect for sunny days.",
    features: ["Mirror coating","Polarized option","Double bridge","Spring hinges"],
    rating: 4.5, reviews: 143, inStock: true, frameWidth: "Large", lensWidth: 58, bridgeWidth: 14, templeLength: 140
  },
  {
    id: 16, name: "Ultra-Thin Titanium Round", brand: "DocLens Minimal", price: 2999, originalPrice: 3999,
    category: "eyeglasses", frameType: "full-rim", frameShape: "round", frameMaterial: "titanium",
    color: "Black", gender: "unisex",
    images: ["https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500","https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"],
    description: "Minimalist design with ultra-thin titanium frame. Weighs only 12 grams.",
    features: ["Ultra-thin","12g weight","Titanium","Minimalist"],
    rating: 4.8, reviews: 76, inStock: true, isNew: true, frameWidth: "Small", lensWidth: 47, bridgeWidth: 21, templeLength: 145
  }
];

export const categories = [
  { id: 'eyeglasses', name: 'Eyeglasses', icon: '👓', count: 156 },
  { id: 'sunglasses', name: 'Sunglasses', icon: '🕶️', count: 98 },
  { id: 'computer-glasses', name: 'Computer Glasses', icon: '💻', count: 45 },
  { id: 'kids', name: 'Kids Glasses', icon: '👶', count: 32 },
  { id: 'reading', name: 'Reading Glasses', icon: '📖', count: 28 }
];

export const frameShapes = [
  { id: 'rectangle', name: 'Rectangle', icon: '▬' },
  { id: 'round', name: 'Round', icon: '●' },
  { id: 'aviator', name: 'Aviator', icon: '◇' },
  { id: 'cat-eye', name: 'Cat Eye', icon: '◆' },
  { id: 'square', name: 'Square', icon: '■' },
  { id: 'wayfarer', name: 'Wayfarer', icon: '◈' },
  { id: 'oval', name: 'Oval', icon: '⬮' },
  { id: 'geometric', name: 'Geometric', icon: '⬡' },
];

export const frameColors = ['Black','Silver','Gold','Brown','Tortoise','Blue','Pink','Red','Green','Transparent'];

export const brands = [
  'DocLens Premium','DocLens Elite','DocLens Digital','DocLens Chic','DocLens Classic',
  'DocLens Street','DocLens Junior','DocLens Lite','DocLens Active','DocLens Executive',
  'DocLens Glam','DocLens Vision','DocLens Trend','DocLens Retro','DocLens Sport','DocLens Minimal'
];

export const lensTypes = [
  { id: 'single-vision', name: 'Single Vision', description: 'For distance or near vision', price: 0 },
  { id: 'bifocal', name: 'Bifocal', description: 'For distance and near vision', price: 800 },
  { id: 'progressive', name: 'Progressive', description: 'Seamless distance, mid, and near vision', price: 1500 },
  { id: 'zero-power', name: 'Zero Power', description: 'No prescription needed', price: 0 },
];

export const lensCoatings = [
  { id: 'anti-glare', name: 'Anti-Glare', description: 'Reduces reflections', price: 300 },
  { id: 'blue-cut', name: 'Blue Cut', description: 'Blocks harmful blue light', price: 500 },
  { id: 'photochromic', name: 'Photochromic', description: 'Auto-darkens in sunlight', price: 800 },
  { id: 'scratch-resistant', name: 'Scratch Resistant', description: 'Extra durability', price: 200 },
];
