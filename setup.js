const fs = require('fs');
const path = require('path');

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
  category: 'eyeglasses' | 'sunglasses' | 'computer-glasses' | 'kids';
  frameType: 'full-rim' | 'half-rim' | 'rimless';
  frameShape: 'rectangle' | 'round' | 'square' | 'aviator' | 'cat-eye' | 'wayfarer';
  frameMaterial: 'metal' | 'acetate' | 'titanium' | 'plastic';
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
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  frameType: string;
  frameShape: string;
  gender: string;
  priceRange: [number, number];
  sortBy: string;
}
`;
fs.writeFileSync('./src/types/index.ts', types);

// ========== PRODUCTS DATA ==========
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
    isBestSeller: true
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
    isBestSeller: true
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
    isNew: true
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
    isNew: true
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
    inStock: true
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
    isBestSeller: true
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
    frameMaterial: "plastic",
    color: "Blue",
    gender: "kids",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"
    ],
    description: "Durable and flexible frames designed for active kids. Virtually unbreakable.",
    features: ["Flexible material", "Impact resistant", "Comfortable fit", "Fun colors"],
    rating: 4.8,
    reviews: 89,
    inStock: true,
    isNew: true
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
    inStock: true
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
    frameMaterial: "plastic",
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
    inStock: true
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
    inStock: true
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
    isBestSeller: true
  },
  {
    id: 12,
    name: "Progressive Reading Glasses",
    brand: "DocLens Vision",
    price: 3999,
    originalPrice: 5499,
    category: "eyeglasses",
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
    inStock: true
  }
];

export const categories = [
  { id: 'eyeglasses', name: 'Eyeglasses', icon: '👓', count: 156 },
  { id: 'sunglasses', name: 'Sunglasses', icon: '🕶️', count: 98 },
  { id: 'computer-glasses', name: 'Computer Glasses', icon: '💻', count: 45 },
  { id: 'kids', name: 'Kids Glasses', icon: '👶', count: 32 }
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
  'DocLens Vision'
];
`;
fs.writeFileSync('./src/data/products.ts', products);

// ========== CART CONTEXT ==========
const cartContext = \`import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
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

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
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

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => 
    cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const getCartCount = () => 
    cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
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
\`;
fs.writeFileSync('./src/context/CartContext.tsx', cartContext);

// ========== HEADER COMPONENT ==========
const header = \`import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(\\\`/products?search=\\\${encodeURIComponent(searchQuery)}\\\`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={14} />
              +880 1234-567890
            </span>
            <span className="hidden md:block">Free Delivery on Orders Above ৳3000</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:underline">Store Locator</Link>
            <Link to="/about" className="hover:underline">About Us</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">👓</span>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DocLens
              </span>
              <span className="text-xs text-gray-500 block">BD</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search eyeglasses, sunglasses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="hidden md:flex flex-col items-center text-gray-600 hover:text-blue-600">
              <Heart size={24} />
              <span className="text-xs">Wishlist</span>
            </Link>
            <Link to="/account" className="hidden md:flex flex-col items-center text-gray-600 hover:text-blue-600">
              <User size={24} />
              <span className="text-xs">Account</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-blue-600 relative">
              <ShoppingCart size={24} />
              <span className="text-xs">Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-200">
        <div className="container mx-auto px-4">
          <ul className={\\\`md:flex items-center justify-center gap-8 py-3 \\\${isMenuOpen ? 'block' : 'hidden md:flex'}\\\`}>
            <li>
              <Link to="/products?category=eyeglasses" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 font-medium">
                Eyeglasses
              </Link>
            </li>
            <li>
              <Link to="/products?category=sunglasses" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 font-medium">
                Sunglasses
              </Link>
            </li>
            <li>
              <Link to="/products?category=computer-glasses" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 font-medium">
                Computer Glasses
              </Link>
            </li>
            <li>
              <Link to="/products?category=kids" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 font-medium">
                Kids
              </Link>
            </li>
            <li>
              <Link to="/products?gender=men" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 font-medium">
                Men
              </Link>
            </li>
            <li>
              <Link to="/products?gender=women" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 font-medium">
                Women
              </Link>
            </li>
            <li>
              <Link to="/products" className="block py-2 md:py-0 text-red-500 hover:text-red-600 font-bold">
                SALE 🔥
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link to="/wishlist" className="flex items-center gap-2 py-2 text-gray-600">
              <Heart size={20} /> Wishlist
            </Link>
            <Link to="/account" className="flex items-center gap-2 py-2 text-gray-600">
              <User size={20} /> Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
\`;
fs.writeFileSync('./src/components/Header.tsx', header);

// ========== FOOTER COMPONENT ==========
const footer = \`import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-xl font-bold">Subscribe to Our Newsletter</h3>
              <p className="text-blue-100">Get exclusive offers and updates directly to your inbox</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-l-lg w-full md:w-80 focus:outline-none text-gray-800"
              />
              <button className="bg-gray-900 text-white px-6 py-3 rounded-r-lg hover:bg-gray-800 font-semibold">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">👓</span>
              </div>
              <span className="text-2xl font-bold text-white">DocLensBD</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted destination for premium eyewear in Bangladesh. Quality frames, affordable prices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500"><Facebook size={24} /></a>
              <a href="#" className="hover:text-pink-500"><Instagram size={24} /></a>
              <a href="#" className="hover:text-blue-400"><Twitter size={24} /></a>
              <a href="#" className="hover:text-red-500"><Youtube size={24} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products?category=eyeglasses" className="hover:text-white">Eyeglasses</Link></li>
              <li><Link to="/products?category=sunglasses" className="hover:text-white">Sunglasses</Link></li>
              <li><Link to="/products?category=computer-glasses" className="hover:text-white">Computer Glasses</Link></li>
              <li><Link to="/products?category=kids" className="hover:text-white">Kids Glasses</Link></li>
              <li><Link to="/products" className="hover:text-white">All Products</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-white">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-white">Returns & Exchange</Link></li>
              <li><Link to="/track-order" className="hover:text-white">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={18} />
                <span>123 Gulshan Avenue, Dhaka 1212</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span>info@doclensbd.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© 2024 DocLensBD. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
            <div className="flex items-center gap-2">
              <span>We Accept:</span>
              <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-bold">bKash</span>
              <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-bold">Nagad</span>
              <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-bold">VISA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
\`;
fs.writeFileSync('./src/components/Footer.tsx', footer);

// ========== PRODUCT CARD COMPONENT ==========
const productCard = \`import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={\\\`/product/\\\${product.id}\\\`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{discount}% OFF</span>
          )}
          {product.isBestSeller && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">BESTSELLER</span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-500">
            <Heart size={20} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-white text-gray-900 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={\\\`/product/\\\${product.id}\\\`}>
          <p className="text-sm text-blue-600 font-medium">{product.brand}</p>
          <h3 className="text-gray-800 font-semibold mt-1 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
\`;
fs.writeFileSync('./src/components/ProductCard.tsx', productCard);

// ========== HERO COMPONENT ==========
const hero = \`import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section>
      {/* Main Hero */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 min-h-[500px] md:min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              🎉 Grand Opening Sale - Up to 50% OFF
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              See the World in <span className="text-yellow-300">Style</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Discover premium eyewear at unbeatable prices. From classic frames to trendy sunglasses, find your perfect pair at DocLensBD.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 hover:text-gray-900 transition-all"
              >
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link
                to="/products?category=sunglasses"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all"
              >
                Explore Sunglasses
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800" 
            alt="Stylish Eyeglasses"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white shadow-md py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="text-blue-600" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Free Delivery</h3>
                <p className="text-sm text-gray-500">On orders above ৳3000</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="text-green-600" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">1 Year Warranty</h3>
                <p className="text-sm text-gray-500">On all frames</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <RotateCcw className="text-purple-600" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">14 Day Returns</h3>
                <p className="text-sm text-gray-500">Easy return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
\`;
fs.writeFileSync('./src/components/Hero.tsx', hero);

console.log('Created core components...');

// Continue in next part due to size
// ========== HOME PAGE ==========
const homePage = \`import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Home: React.FC = () => {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  const testimonials = [
    {
      name: "Rafiq Ahmed",
      location: "Dhaka",
      rating: 5,
      text: "Excellent quality frames at amazing prices! The delivery was super fast and the packaging was great.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Fatima Khan",
      location: "Chittagong",
      rating: 5,
      text: "I've been wearing glasses for 10 years and DocLensBD has the best collection I've ever seen.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Kamal Hossain",
      location: "Sylhet",
      rating: 5,
      text: "The computer glasses have really helped reduce my eye strain. Highly recommended!",
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  return (
    <div>
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Shop By Category</h2>
            <p className="text-gray-500 mt-2">Find the perfect eyewear for every need</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link
                key={category.id}
                to={\\\`/products?category=\\\${category.id}\\\`}
                className="group bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-gray-800 text-lg">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}+ Products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Best Sellers</h2>
              <p className="text-gray-500">Our most popular frames loved by customers</p>
            </div>
            <Link to="/products" className="flex items-center gap-1 text-blue-600 hover:underline font-medium">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Summer Sale is ON! 🔥</h2>
              <p className="text-xl mt-2">Get up to 50% OFF on selected sunglasses</p>
            </div>
            <Link
              to="/products?category=sunglasses"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Shop Sunglasses
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">New Arrivals</h2>
              <p className="text-gray-500">Fresh styles just dropped</p>
            </div>
            <Link to="/products" className="flex items-center gap-1 text-blue-600 hover:underline font-medium">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Customers Say</h2>
            <p className="text-gray-500 mt-2">Join thousands of satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md relative">
                <Quote className="absolute top-4 right-4 text-blue-100" size={40} />
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Promise */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The DocLensBD Promise</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            We're committed to providing you with the best eyewear experience. Quality products, honest prices, and customer satisfaction guaranteed.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold">10,000+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold">500+</div>
              <div className="text-blue-200">Frame Styles</div>
            </div>
            <div>
              <div className="text-4xl font-bold">15+</div>
              <div className="text-blue-200">Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold">99%</div>
              <div className="text-blue-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
\`;
fs.writeFileSync('./src/pages/Home.tsx', homePage);

console.log('Created Home page...');

// ========== PRODUCTS PAGE ==========
const productsPage = \`import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Product } from '../types';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    gender: searchParams.get('gender') || '',
    frameType: '',
    priceRange: '',
    sortBy: 'featured'
  });

  useEffect(() => {
    let result = [...products];
    const search = searchParams.get('search')?.toLowerCase();

    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }
    if (filters.gender) {
      result = result.filter(p => p.gender === filters.gender || p.gender === 'unisex');
    }
    if (filters.frameType) {
      result = result.filter(p => p.frameType === filters.frameType);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(p => p.price >= min && p.price <= max);
    }

    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
        break;
    }

    setFilteredProducts(result);
  }, [filters, searchParams]);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: searchParams.get('category') || '',
      gender: searchParams.get('gender') || ''
    }));
  }, [searchParams]);

  const clearFilters = () => {
    setFilters({
      category: '',
      gender: '',
      frameType: '',
      priceRange: '',
      sortBy: 'featured'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {filters.category ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1).replace('-', ' ') : 'All Products'}
          </h1>
          <p className="text-gray-500 mt-1">{filteredProducts.length} products found</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={\\\`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform lg:relative lg:transform-none lg:shadow-none lg:w-64 lg:flex-shrink-0 \\\${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}\\\`}>
            <div className="h-full overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="lg:hidden">
                  <X size={24} />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Category</h3>
                <div className="space-y-2">
                  {['eyeglasses', 'sunglasses', 'computer-glasses', 'kids'].map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === cat}
                        onChange={() => setFilters(prev => ({ ...prev, category: cat }))}
                        className="text-blue-600"
                      />
                      <span className="capitalize">{cat.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Gender</h3>
                <div className="space-y-2">
                  {['men', 'women', 'unisex', 'kids'].map(g => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={filters.gender === g}
                        onChange={() => setFilters(prev => ({ ...prev, gender: g }))}
                        className="text-blue-600"
                      />
                      <span className="capitalize">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Frame Type Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Frame Type</h3>
                <div className="space-y-2">
                  {['full-rim', 'half-rim', 'rimless'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="frameType"
                        checked={filters.frameType === type}
                        onChange={() => setFilters(prev => ({ ...prev, frameType: type }))}
                        className="text-blue-600"
                      />
                      <span className="capitalize">{type.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Under ৳2000', value: '0-2000' },
                    { label: '৳2000 - ৳3000', value: '2000-3000' },
                    { label: '৳3000 - ৳4000', value: '3000-4000' },
                    { label: 'Above ৳4000', value: '4000-99999' }
                  ].map(range => (
                    <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range.value}
                        onChange={() => setFilters(prev => ({ ...prev, priceRange: range.value }))}
                        className="text-blue-600"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="w-full py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 text-gray-600"
              >
                <SlidersHorizontal size={20} />
                Filters
              </button>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <div className="relative">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Overlay */}
      {showFilters && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default Products;
\`;
fs.writeFileSync('./src/pages/Products.tsx', productsPage);

console.log('Created Products page...');

// ========== PRODUCT DETAIL PAGE ==========
const productDetail = \`import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
          <Link to="/products" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={16} />
            <Link to="/products" className="hover:text-blue-600">Products</Link>
            <ChevronRight size={16} />
            <Link to={\\\`/products?category=\\\${product.category}\\\`} className="hover:text-blue-600 capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-800">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Images */}
            <div>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={\\\`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors \\\${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }\\\`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="mb-4">
                <span className="text-blue-600 font-medium">{product.brand}</span>
                <h1 className="text-3xl font-bold text-gray-800 mt-1">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div>
                  <span className="text-sm text-gray-500">Frame Type</span>
                  <p className="font-medium capitalize">{product.frameType.replace('-', ' ')}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Frame Shape</span>
                  <p className="font-medium capitalize">{product.frameShape}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Material</span>
                  <p className="font-medium capitalize">{product.frameMaterial}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Color</span>
                  <p className="font-medium">{product.color}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="p-3 border rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-500">
                  <Heart size={24} />
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck size={20} className="text-blue-600" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield size={20} className="text-green-600" />
                  <span>1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RotateCcw size={20} className="text-purple-600" />
                  <span>14 Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
\`;
fs.writeFileSync('./src/pages/ProductDetail.tsx', productDetail);

console.log('Created ProductDetail page...');

// ========== CART PAGE ==========
const cartPage = \`import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={80} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Start Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
                <Link to={\\\`/product/\\\${item.product.id}\\\`} className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link to={\\\`/product/\\\${item.product.id}\\\`} className="font-semibold text-gray-800 hover:text-blue-600">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500">{item.product.brand}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-500">৳{item.product.price.toLocaleString()} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-500 hover:underline text-sm"
            >
              Clear entire cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span>৳{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={getCartTotal() >= 3000 ? 'text-green-600' : ''}>
                    {getCartTotal() >= 3000 ? 'FREE' : '৳100'}
                  </span>
                </div>
                {getCartTotal() < 3000 && (
                  <p className="text-sm text-blue-600">
                    Add ৳{(3000 - getCartTotal()).toLocaleString()} more for free shipping!
                  </p>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>৳{(getCartTotal() + (getCartTotal() >= 3000 ? 0 : 100)).toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </Link>

              <Link to="/products" className="block text-center text-blue-600 hover:underline mt-4">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
\`;
fs.writeFileSync('./src/pages/Cart.tsx', cartPage);

console.log('Created Cart page...');

// ========== CHECKOUT PAGE ==========
const checkoutPage = \`import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod'
  });

  const shipping = getCartTotal() >= 3000 ? 0 : 100;
  const total = getCartTotal() + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setOrderPlaced(true);
      clearCart();
      setTimeout(() => navigate('/'), 5000);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={40} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <p className="text-sm text-gray-500">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={\\\`w-10 h-10 rounded-full flex items-center justify-center font-bold \\\${
                step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }\\\`}>
                {s}
              </div>
              {s < 3 && (
                <div className={\\\`w-20 h-1 \\\${step > s ? 'bg-blue-600' : 'bg-gray-200'}\\\`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Truck size={24} /> Shipping Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+880 1XXX-XXXXXX"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full address"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Dhaka"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1212"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <CreditCard size={24} /> Payment Method
                  </h2>
                  <div className="space-y-4">
                    {[
                      { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when you receive' },
                      { id: 'bkash', name: 'bKash', desc: 'Pay with bKash mobile banking' },
                      { id: 'nagad', name: 'Nagad', desc: 'Pay with Nagad mobile banking' },
                      { id: 'card', name: 'Credit/Debit Card', desc: 'Visa, Mastercard, Amex' }
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={\\\`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors \\\${
                          formData.paymentMethod === method.id ? 'border-blue-600 bg-blue-50' : 'hover:bg-gray-50'
                        }\\\`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="text-blue-600"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Review Order</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Shipping To:</h3>
                      <p className="text-gray-600">{formData.name}</p>
                      <p className="text-gray-600">{formData.address}</p>
                      <p className="text-gray-600">{formData.city}, {formData.postalCode}</p>
                      <p className="text-gray-600">{formData.phone}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Payment Method:</h3>
                      <p className="text-gray-600 capitalize">{formData.paymentMethod.replace('-', ' ')}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  {step === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>৳{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : \\\`৳\\\${shipping}\\\`}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
\`;
fs.writeFileSync('./src/pages/Checkout.tsx', checkoutPage);

console.log('Created Checkout page...');

// ========== ABOUT PAGE ==========
const aboutPage = \`import React from 'react';
import { Eye, Heart, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About DocLensBD</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your trusted destination for premium eyewear in Bangladesh since 2020.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              DocLensBD was founded with a simple mission: to make quality eyewear accessible to everyone in Bangladesh. 
              We believe that everyone deserves to see the world clearly and look great while doing it.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              What started as a small online store has grown into one of Bangladesh's most trusted eyewear destinations, 
              serving thousands of happy customers across the country.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Eye, title: 'Quality Vision', desc: 'We source only the finest materials and lenses for optimal clarity.' },
              { icon: Heart, title: 'Customer First', desc: 'Your satisfaction is our top priority. We go above and beyond.' },
              { icon: Award, title: 'Excellence', desc: 'We strive for excellence in everything we do, from products to service.' },
              { icon: Users, title: 'Community', desc: 'We are committed to giving back to our community through vision care initiatives.' }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Frame Styles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">64</div>
              <div className="text-blue-200">Districts Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-blue-200">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
\`;
fs.writeFileSync('./src/pages/About.tsx', aboutPage);

// ========== CONTACT PAGE ==========
const contactPage = \`import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Visit Us</h3>
                  <p className="text-gray-600">123 Gulshan Avenue, Dhaka 1212</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Call Us</h3>
                  <p className="text-gray-600">+880 1234-567890</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Mail className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">info@doclensbd.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Business Hours</h3>
                  <p className="text-gray-600">Sat - Thu: 10AM - 8PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-green-600" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h2>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
\`;
fs.writeFileSync('./src/pages/Contact.tsx', contactPage);

console.log('Created About and Contact pages...');

// ========== MAIN FILES ==========
const indexCss = \`@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
\`;
fs.writeFileSync('./src/index.css', indexCss);

const mainTsx = \`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
\`;
fs.writeFileSync('./src/main.tsx', mainTsx);

const appTsx = \`import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
\`;
fs.writeFileSync('./src/App.tsx', appTsx);

const viteEnv = \`/// <reference types="vite/client" />
\`;
fs.writeFileSync('./src/vite-env.d.ts', viteEnv);

console.log('\\n✅ All files created successfully!');
console.log('\\n📁 Project structure created for DocLensBD');
console.log('\\n🚀 To start the development server:');
console.log('   1. Run: npm install');
console.log('   2. Run: npm run dev');
console.log('   3. Open: http://localhost:5173');
console.log('\\n🎉 Happy coding!');
