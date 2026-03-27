const fs = require('fs');

// ========== UPDATED HEADER WITH AUTH & WISHLIST ==========
const header = `import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, Phone, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(\`/products?search=\${encodeURIComponent(searchQuery)}\`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
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
            <Link to="/try-on/1" className="hover:underline flex items-center gap-1">
              🪞 Virtual Try-On
            </Link>
            <Link to="/contact" className="hover:underline">Store Locator</Link>
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
            <Link to="/wishlist" className="hidden md:flex flex-col items-center text-gray-600 hover:text-blue-600 relative">
              <Heart size={24} />
              <span className="text-xs">Wishlist</span>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            {/* User Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hidden md:flex flex-col items-center text-gray-600 hover:text-blue-600"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs flex items-center gap-1">
                    {user?.name.split(' ')[0]} <ChevronDown size={12} />
                  </span>
                </button>
              ) : (
                <Link to="/login" className="hidden md:flex flex-col items-center text-gray-600 hover:text-blue-600">
                  <User size={24} />
                  <span className="text-xs">Login</span>
                </Link>
              )}

              {/* Dropdown Menu */}
              {showUserMenu && isAuthenticated && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border z-20">
                    <div className="p-3 border-b">
                      <p className="font-medium text-gray-800">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/account"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/account"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/prescription"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        My Prescriptions
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

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
          <ul className={\`md:flex items-center justify-center gap-8 py-3 \${isMenuOpen ? 'block' : 'hidden md:flex'}\`}>
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
              <Link to="/try-on/1" className="block py-2 md:py-0 text-purple-600 hover:text-purple-700 font-medium">
                🪞 Try On
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
              <Heart size={20} /> Wishlist ({wishlistItems.length})
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/account" className="flex items-center gap-2 py-2 text-gray-600">
                  <User size={20} /> My Account
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 py-2 text-red-600">
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 py-2 text-gray-600">
                <User size={20} /> Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
`;
fs.writeFileSync('./src/components/Header.tsx', header);

console.log('Created updated Header...');

// ========== UPDATED PRODUCT CARD WITH WISHLIST ==========
const productCard = `import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={\`/product/\${product.id}\`}>
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
          <button 
            onClick={toggleWishlist}
            className={\`bg-white p-2 rounded-full shadow-md transition-colors \${
              inWishlist ? 'text-red-500 bg-red-50' : 'hover:bg-red-50 hover:text-red-500'
            }\`}
          >
            <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          <Link 
            to={\`/try-on/\${product.id}\`}
            className="bg-white p-2 rounded-full shadow-md hover:bg-purple-50 hover:text-purple-500"
          >
            <Eye size={20} />
          </Link>
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
        <Link to={\`/product/\${product.id}\`}>
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
`;
fs.writeFileSync('./src/components/ProductCard.tsx', productCard);

console.log('Created updated ProductCard...');

// ========== UPDATED PRODUCT DETAIL WITH TRY-ON & PRESCRIPTION ==========
const productDetail = `import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus, ChevronRight, Eye, FileText } from 'lucide-react';
import { products, lensTypes, lensCoatings } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showLensOptions, setShowLensOptions] = useState(false);
  const [selectedLensType, setSelectedLensType] = useState('single-vision');
  const [selectedCoatings, setSelectedCoatings] = useState<string[]>([]);

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

  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const toggleCoating = (coatingId: string) => {
    setSelectedCoatings(prev =>
      prev.includes(coatingId)
        ? prev.filter(c => c !== coatingId)
        : [...prev, coatingId]
    );
  };

  const calculateLensPrice = () => {
    let price = lensTypes.find(t => t.id === selectedLensType)?.price || 0;
    selectedCoatings.forEach(coating => {
      price += lensCoatings.find(c => c.id === coating)?.price || 0;
    });
    return price;
  };

  const handleAddToCart = () => {
    addToCart(product, undefined, selectedLensType, selectedCoatings);
  };

  const handleBuyWithPrescription = () => {
    addToCart(product, undefined, selectedLensType, selectedCoatings);
    navigate('/prescription', { state: { productId: product.id, returnTo: '/cart' } });
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
            <Link to={\`/products?category=\${product.category}\`} className="hover:text-blue-600 capitalize">
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
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4 relative">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Try On Button */}
                <Link
                  to={\`/try-on/\${product.id}\`}
                  className="absolute bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-2 shadow-lg"
                >
                  <Eye size={20} />
                  Virtual Try-On
                </Link>
              </div>
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={\`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors \${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }\`}
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
                {product.lensWidth && (
                  <div>
                    <span className="text-sm text-gray-500">Lens Width</span>
                    <p className="font-medium">{product.lensWidth}mm</p>
                  </div>
                )}
                {product.frameWidth && (
                  <div>
                    <span className="text-sm text-gray-500">Frame Width</span>
                    <p className="font-medium">{product.frameWidth}</p>
                  </div>
                )}
              </div>

              {/* Lens Options Toggle */}
              {product.category === 'eyeglasses' && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowLensOptions(!showLensOptions)}
                    className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 flex items-center justify-center gap-2"
                  >
                    <FileText size={20} />
                    {showLensOptions ? 'Hide Lens Options' : 'Customize Lenses (+৳0)'}
                  </button>

                  {showLensOptions && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      {/* Lens Type */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Lens Type</h4>
                        <div className="space-y-2">
                          {lensTypes.map(type => (
                            <label
                              key={type.id}
                              className={\`flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer border-2 transition-colors \${
                                selectedLensType === type.id ? 'border-blue-600' : 'border-transparent'
                              }\`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="lensType"
                                  value={type.id}
                                  checked={selectedLensType === type.id}
                                  onChange={(e) => setSelectedLensType(e.target.value)}
                                  className="text-blue-600"
                                />
                                <div>
                                  <p className="font-medium text-gray-800">{type.name}</p>
                                  <p className="text-sm text-gray-500">{type.description}</p>
                                </div>
                              </div>
                              <span className="font-semibold text-gray-800">
                                {type.price === 0 ? 'Free' : \`+৳\${type.price}\`}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Lens Coatings */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Add-On Coatings</h4>
                        <div className="space-y-2">
                          {lensCoatings.map(coating => (
                            <label
                              key={coating.id}
                              className={\`flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer border-2 transition-colors \${
                                selectedCoatings.includes(coating.id) ? 'border-blue-600' : 'border-transparent'
                              }\`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={selectedCoatings.includes(coating.id)}
                                  onChange={() => toggleCoating(coating.id)}
                                  className="text-blue-600"
                                />
                                <div>
                                  <p className="font-medium text-gray-800">{coating.name}</p>
                                  <p className="text-sm text-gray-500">{coating.description}</p>
                                </div>
                              </div>
                              <span className="font-semibold text-gray-800">+৳{coating.price}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Lens Price Summary */}
                      {calculateLensPrice() > 0 && (
                        <div className="mt-4 pt-4 border-t border-blue-200">
                          <div className="flex justify-between font-semibold text-gray-800">
                            <span>Lens Customization:</span>
                            <span>+৳{calculateLensPrice().toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

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
              <div className="flex items-center gap-4 mb-4">
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
                <button 
                  onClick={toggleWishlist}
                  className={\`p-3 border rounded-lg transition-colors \${
                    inWishlist 
                      ? 'bg-red-50 border-red-200 text-red-500' 
                      : 'hover:bg-red-50 hover:border-red-200 hover:text-red-500'
                  }\`}
                >
                  <Heart size={24} fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Buy with Prescription */}
              {product.category === 'eyeglasses' && (
                <button
                  onClick={handleBuyWithPrescription}
                  className="w-full mb-6 py-3 px-6 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 flex items-center justify-center gap-2"
                >
                  <FileText size={20} />
                  Buy with Prescription
                </button>
              )}

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
`;
fs.writeFileSync('./src/pages/ProductDetail.tsx', productDetail);

console.log('Created updated ProductDetail...');

// ========== UPDATED APP.TSX ==========
const appTsx = `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import Prescription from './pages/Prescription';
import VirtualTryOn from './pages/VirtualTryOn';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Routes>
                {/* Pages without Header/Footer */}
                <Route path="/login" element={<Login />} />
                <Route path="/try-on/:id" element={<VirtualTryOn />} />
                
                {/* Pages with Header/Footer */}
                <Route path="*" element={
                  <>
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
                        <Route path="/account" element={<Account />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/prescription" element={<Prescription />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                } />
              </Routes>
            </div>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
`;
fs.writeFileSync('./src/App.tsx', appTsx);

console.log('Created updated App.tsx...');

// ========== MAIN.TSX ==========
const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
fs.writeFileSync('./src/main.tsx', mainTsx);

// ========== INDEX.CSS ==========
const indexCss = `@tailwind base;
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

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Animation for loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
`;
fs.writeFileSync('./src/index.css', indexCss);

// ========== VITE-ENV.D.TS ==========
const viteEnv = `/// <reference types="vite/client" />
`;
fs.writeFileSync('./src/vite-env.d.ts', viteEnv);

console.log('Created main entry files...');

// ========== FOOTER ==========
const footer = `import React from 'react';
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
              <li><Link to="/try-on/1" className="hover:text-white">Virtual Try-On</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/prescription" className="hover:text-white">Upload Prescription</Link></li>
              <li><Link to="/account" className="hover:text-white">My Account</Link></li>
              <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-white">Track Order</Link></li>
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
`;
fs.writeFileSync('./src/components/Footer.tsx', footer);

// ========== HERO ==========
const hero = `import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw, Eye } from 'lucide-react';

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
                to="/try-on/1"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all"
              >
                <Eye size={20} /> Virtual Try-On
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <div className="flex items-center justify-center gap-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <Eye className="text-pink-600" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Virtual Try-On</h3>
                <p className="text-sm text-gray-500">Try before you buy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
`;
fs.writeFileSync('./src/components/Hero.tsx', hero);

console.log('Created Hero and Footer...');
console.log('\\n✅ Part 3 complete - Created all updated components');
