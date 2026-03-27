const fs = require('fs');

// ========== HOME PAGE ==========
const homePage = `import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote, Eye } from 'lucide-react';
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

      {/* Virtual Try-On Banner */}
      <section className="py-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Eye size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Try Before You Buy!</h2>
                <p className="text-purple-100">Use our virtual try-on to see how frames look on you</p>
              </div>
            </div>
            <Link
              to="/try-on/1"
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:text-gray-900 transition-all"
            >
              Try Virtual Try-On
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Shop By Category</h2>
            <p className="text-gray-500 mt-2">Find the perfect eyewear for every need</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map(category => (
              <Link
                key={category.id}
                to={\`/products?category=\${category.id}\`}
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
`;
fs.writeFileSync('./src/pages/Home.tsx', homePage);

console.log('Created Home page...');

// ========== PRODUCTS PAGE ==========
const productsPage = `import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, frameColors } from '../data/products';
import { Product } from '../types';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    gender: searchParams.get('gender') || '',
    frameType: '',
    frameShape: '',
    color: '',
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
        p.description.toLowerCase().includes(search) ||
        p.color.toLowerCase().includes(search)
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
    if (filters.frameShape) {
      result = result.filter(p => p.frameShape === filters.frameShape);
    }
    if (filters.color) {
      result = result.filter(p => p.color.toLowerCase().includes(filters.color.toLowerCase()));
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
      case 'discount':
        result.sort((a, b) => {
          const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discountB - discountA;
        });
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
      frameShape: '',
      color: '',
      priceRange: '',
      sortBy: 'featured'
    });
  };

  const activeFilterCount = Object.values(filters).filter(v => v && v !== 'featured').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {filters.category 
              ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1).replace('-', ' ') 
              : searchParams.get('search') 
                ? \`Search: "\${searchParams.get('search')}"\`
                : 'All Products'}
          </h1>
          <p className="text-gray-500 mt-1">{filteredProducts.length} products found</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={\`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform lg:relative lg:transform-none lg:shadow-none lg:w-64 lg:flex-shrink-0 \${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}\`}>
            <div className="h-full overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">
                  Filters {activeFilterCount > 0 && <span className="text-blue-600">({activeFilterCount})</span>}
                </h2>
                <button onClick={() => setShowFilters(false)} className="lg:hidden">
                  <X size={24} />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Category</h3>
                <div className="space-y-2">
                  {['eyeglasses', 'sunglasses', 'computer-glasses', 'kids', 'reading'].map(cat => (
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

              {/* Frame Shape Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Frame Shape</h3>
                <div className="space-y-2">
                  {['rectangle', 'round', 'square', 'aviator', 'cat-eye', 'wayfarer', 'oval'].map(shape => (
                    <label key={shape} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="frameShape"
                        checked={filters.frameShape === shape}
                        onChange={() => setFilters(prev => ({ ...prev, frameShape: shape }))}
                        className="text-blue-600"
                      />
                      <span className="capitalize">{shape.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {frameColors.map(color => (
                    <button
                      key={color}
                      onClick={() => setFilters(prev => ({ 
                        ...prev, 
                        color: prev.color === color ? '' : color 
                      }))}
                      className={\`px-3 py-1 rounded-full text-sm border transition-colors \${
                        filters.color === color
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:border-blue-300'
                      }\`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Under ৳1500', value: '0-1500' },
                    { label: '৳1500 - ৳2500', value: '1500-2500' },
                    { label: '৳2500 - ৳3500', value: '2500-3500' },
                    { label: '৳3500 - ৳4500', value: '3500-4500' },
                    { label: 'Above ৳4500', value: '4500-99999' }
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
                {activeFilterCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2 ml-auto">
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
                    <option value="discount">Best Discount</option>
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
`;
fs.writeFileSync('./src/pages/Products.tsx', productsPage);

console.log('Created Products page...');

// ========== CART PAGE ==========
const cartPage = `import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { lensTypes, lensCoatings } from '../data/products';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getLensTotal, clearCart } = useCart();

  const calculateItemLensPrice = (item: any) => {
    let price = 0;
    if (item.lensType) {
      price += lensTypes.find(t => t.id === item.lensType)?.price || 0;
    }
    if (item.lensCoating) {
      item.lensCoating.forEach((coating: string) => {
        price += lensCoatings.find(c => c.id === coating)?.price || 0;
      });
    }
    return price;
  };

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

  const subtotal = getCartTotal();
  const lensTotal = getLensTotal();
  const shipping = subtotal >= 3000 ? 0 : 100;
  const total = subtotal + lensTotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex gap-4">
                  <Link to={\`/product/\${item.product.id}\`} className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <Link to={\`/product/\${item.product.id}\`} className="font-semibold text-gray-800 hover:text-blue-600">
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
                    
                    {/* Lens Options Display */}
                    {(item.lensType || item.lensCoating?.length) && (
                      <div className="mt-2 p-2 bg-blue-50 rounded-lg text-sm">
                        {item.lensType && (
                          <p className="text-blue-700">
                            Lens: {lensTypes.find(t => t.id === item.lensType)?.name}
                          </p>
                        )}
                        {item.lensCoating && item.lensCoating.length > 0 && (
                          <p className="text-blue-600">
                            Coatings: {item.lensCoating.map(c => 
                              lensCoatings.find(lc => lc.id === c)?.name
                            ).join(', ')}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Prescription Status */}
                    {item.prescription && (
                      <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                        <FileText size={16} />
                        Prescription added
                      </div>
                    )}

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
                          ৳{((item.product.price + calculateItemLensPrice(item)) * item.quantity).toLocaleString()}
                        </p>
                        {calculateItemLensPrice(item) > 0 && (
                          <p className="text-sm text-gray-500">
                            (Frame: ৳{item.product.price.toLocaleString()} + Lens: ৳{calculateItemLensPrice(item).toLocaleString()})
                          </p>
                        )}
                      </div>
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
                  <span>Frames Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                {lensTotal > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Lens Customization</span>
                    <span>৳{lensTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'FREE' : \`৳\${shipping}\`}
                  </span>
                </div>
                {subtotal < 3000 && (
                  <p className="text-sm text-blue-600">
                    Add ৳{(3000 - subtotal).toLocaleString()} more for free shipping!
                  </p>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
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
`;
fs.writeFileSync('./src/pages/Cart.tsx', cartPage);

console.log('Created Cart page...');

// ========== CHECKOUT PAGE ==========
const checkoutPage = `import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, Check, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { lensTypes, lensCoatings } from '../data/products';

const Checkout: React.FC = () => {
  const { cartItems, getCartTotal, getLensTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.addresses?.[0]?.address || '',
    city: user?.addresses?.[0]?.city || '',
    postalCode: user?.addresses?.[0]?.postalCode || '',
    paymentMethod: 'cod'
  });

  const subtotal = getCartTotal();
  const lensTotal = getLensTotal();
  const shipping = subtotal >= 3000 ? 0 : 100;
  const total = subtotal + lensTotal + shipping;

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
        {/* Login Prompt */}
        {!isAuthenticated && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <p className="text-blue-800">
              Already have an account? <Link to="/login" state={{ from: { pathname: '/checkout' } }} className="font-semibold underline">Login</Link> for faster checkout
            </p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[
            { num: 1, label: 'Shipping' },
            { num: 2, label: 'Payment' },
            { num: 3, label: 'Review' }
          ].map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center">
                <div className={\`w-10 h-10 rounded-full flex items-center justify-center font-bold \${
                  step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }\`}>
                  {s.num}
                </div>
                <span className="text-sm mt-1 text-gray-600">{s.label}</span>
              </div>
              {i < 2 && (
                <div className={\`w-20 h-1 mx-2 \${step > s.num ? 'bg-blue-600' : 'bg-gray-200'}\`} />
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
                  
                  {/* Saved Addresses */}
                  {user?.addresses && user.addresses.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-3">Saved Addresses</h3>
                      <div className="space-y-2">
                        {user.addresses.map(addr => (
                          <button
                            key={addr.id}
                            type="button"
                            onClick={() => setFormData({
                              ...formData,
                              name: addr.name,
                              phone: addr.phone,
                              address: addr.address,
                              city: addr.city,
                              postalCode: addr.postalCode
                            })}
                            className="w-full text-left p-3 border rounded-lg hover:border-blue-500 flex items-start gap-3"
                          >
                            <MapPin size={20} className="text-gray-400 mt-1" />
                            <div>
                              <p className="font-medium">{addr.name}</p>
                              <p className="text-sm text-gray-500">{addr.address}, {addr.city}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">Or enter new address</span>
                        </div>
                      </div>
                    </div>
                  )}

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
                      { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when you receive', icon: '💵' },
                      { id: 'bkash', name: 'bKash', desc: 'Pay with bKash mobile banking', icon: '📱' },
                      { id: 'nagad', name: 'Nagad', desc: 'Pay with Nagad mobile banking', icon: '📱' },
                      { id: 'card', name: 'Credit/Debit Card', desc: 'Visa, Mastercard, Amex', icon: '💳' }
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={\`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors \${
                          formData.paymentMethod === method.id ? 'border-blue-600 bg-blue-50' : 'hover:bg-gray-50'
                        }\`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="text-blue-600"
                        />
                        <span className="text-2xl">{method.icon}</span>
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
                      <p className="text-gray-600 capitalize">{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : formData.paymentMethod}</p>
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
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
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
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                {lensTotal > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Lens Customization</span>
                    <span>৳{lensTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : \`৳\${shipping}\`}</span>
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
`;
fs.writeFileSync('./src/pages/Checkout.tsx', checkoutPage);

console.log('Created Checkout page...');

// ========== ABOUT PAGE ==========
const aboutPage = `import React from 'react';
import { Eye, Heart, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About DocLensBD</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your trusted destination for premium eyewear in Bangladesh since 2020.
          </p>
        </div>
      </div>

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
`;
fs.writeFileSync('./src/pages/About.tsx', aboutPage);

// ========== CONTACT PAGE ==========
const contactPage = `import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-6">
            {[
              { icon: MapPin, title: 'Visit Us', content: '123 Gulshan Avenue, Dhaka 1212', color: 'blue' },
              { icon: Phone, title: 'Call Us', content: '+880 1234-567890', color: 'green' },
              { icon: Mail, title: 'Email Us', content: 'info@doclensbd.com', color: 'purple' },
              { icon: Clock, title: 'Business Hours', content: 'Sat - Thu: 10AM - 8PM', color: 'orange' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={\`bg-\${item.color}-100 p-3 rounded-full\`}>
                    <item.icon className={\`text-\${item.color}-600\`} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
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
`;
fs.writeFileSync('./src/pages/Contact.tsx', contactPage);

console.log('Created About and Contact pages...');
console.log('\\n✅ Part 4 complete - All pages created!');
