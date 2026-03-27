import React, { useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Shield, RotateCcw, Truck, CheckCircle, ChevronRight, Ruler, Minus, Plus, X } from 'lucide-react';
import { products, lensTypes, lensCoatings } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLensFlow, setShowLensFlow] = useState(false);
  const [selectedLens, setSelectedLens] = useState('');
  const [selectedCoatings, setSelectedCoatings] = useState<string[]>([]);
  const [pincode, setPincode] = useState('');
  const [pincodeValid, setPincodeValid] = useState<boolean | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-[#000042] mb-2">Product Not Found</h2>
          <Link to="/products" className="text-[#00BAC6] font-semibold hover:underline">Browse All Products</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const lensPrice = (selectedLens ? lensTypes.find(l => l.id === selectedLens)?.price || 0 : 0) +
    selectedCoatings.reduce((sum, c) => sum + (lensCoatings.find(l => l.id === c)?.price || 0), 0);

  const handleCheckPincode = () => {
    setPincodeValid(pincode.length >= 4);
  };

  const showAddedFeedback = () => {
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleAddToCart = () => {
    const lens = selectedLens || undefined;
    const coatings = selectedCoatings.length > 0 ? selectedCoatings : undefined;
    for (let i = 0; i < quantity; i++) {
      addToCart(product, lens, coatings);
    }
    setShowLensFlow(false);
    showAddedFeedback();
  };

  const handleAddToCartFromModal = () => {
    const lens = selectedLens || undefined;
    const coatings = selectedCoatings.length > 0 ? selectedCoatings : undefined;
    addToCart(product, lens, coatings);
    setShowLensFlow(false);
    showAddedFeedback();
  };

  const toggleCoating = (coatingId: string) => {
    setSelectedCoatings(prev =>
      prev.includes(coatingId)
        ? prev.filter(c => c !== coatingId)
        : [...prev, coatingId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Added to cart feedback */}
      {addedFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
          <CheckCircle size={20} />
          <span className="font-semibold">Added to cart!</span>
          <button onClick={() => navigate('/cart')} className="underline text-sm ml-2">View Cart</button>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#000042]">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-[#000042]">Products</Link>
            <ChevronRight size={14} />
            <Link to={`/products?category=${product.category}`} className="hover:text-[#000042] capitalize">{product.category.replace('-', ' ')}</Link>
            <ChevronRight size={14} />
            <span className="text-[#000042] font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Images */}
            <div className="p-6 lg:p-8">
              <div className="relative mb-4 rounded-2xl overflow-hidden bg-gray-50 aspect-square">
                <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                {product.isNew && <span className="absolute top-4 left-4 bg-[#00BAC6] text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>}
                {discount > 0 && <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">{discount}% OFF</span>}
              </div>
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button key={idx} onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${idx === selectedImage ? 'border-[#000042] ring-2 ring-[#000042]/20' : 'border-gray-200 hover:border-gray-400'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-6 lg:p-8 border-l border-gray-100">
              <p className="text-[#00BAC6] font-semibold text-sm uppercase tracking-wider">{product.brand}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#000042] mt-2">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-sm gap-1">
                  <span className="font-bold">{product.rating}</span> <Star size={12} fill="white" />
                </div>
                <span className="text-gray-500 text-sm">{product.reviews} Reviews</span>
              </div>

              {/* Price */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-[#000042]">৳{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
                      <span className="text-green-600 font-semibold text-sm">({discount}% off)</span>
                    </>
                  )}
                </div>
                {lensPrice > 0 && <p className="text-sm text-gray-500 mt-1">+ ৳{lensPrice.toLocaleString()} for lenses</p>}
                <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
              </div>

              {/* Frame Specs */}
              {product.lensWidth && (
                <div className="mt-5">
                  <h3 className="font-semibold text-[#000042] flex items-center gap-2 mb-3"><Ruler size={16} /> Frame Dimensions</h3>
                  <div className="flex gap-4 flex-wrap">
                    <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Lens Width</p>
                      <p className="font-bold text-[#000042]">{product.lensWidth}mm</p>
                    </div>
                    <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Bridge</p>
                      <p className="font-bold text-[#000042]">{product.bridgeWidth}mm</p>
                    </div>
                    <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Temple</p>
                      <p className="font-bold text-[#000042]">{product.templeLength}mm</p>
                    </div>
                    {product.frameWidth && (
                      <div className="text-center px-4 py-2 bg-[#000042]/5 rounded-lg border border-[#000042]/10">
                        <p className="text-xs text-gray-500">Size</p>
                        <p className="font-bold text-[#000042]">{product.frameWidth}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-4">
                <span className="font-semibold text-[#000042] text-sm">Quantity:</span>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100 transition-colors"><Minus size={14} /></button>
                  <span className="px-4 py-2 border-x font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100 transition-colors"><Plus size={14} /></button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 flex gap-3">
                <button onClick={() => setShowLensFlow(true)}
                  className="flex-1 bg-[#000042] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#000060] transition-all flex items-center justify-center gap-2 text-lg shadow-lg">
                  Select Lenses
                </button>
                <button onClick={handleAddToCart}
                  className="flex items-center gap-2 bg-[#00BAC6] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#00a8b3] transition-all shadow-lg">
                  <ShoppingCart size={20} /> Add
                </button>
                <button className="border-2 border-gray-200 p-4 rounded-xl hover:border-red-400 hover:text-red-500 transition-all">
                  <Heart size={20} />
                </button>
              </div>

              {/* Pincode Checker */}
              <div className="mt-5">
                <h3 className="font-semibold text-[#000042] text-sm mb-2">Delivery & Services</h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter Pincode" value={pincode} onChange={(e) => { setPincode(e.target.value); setPincodeValid(null); }}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#000042] flex-1" />
                  <button onClick={handleCheckPincode} className="bg-[#000042] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#000060] transition-colors">Check</button>
                </div>
                {pincodeValid !== null && (
                  <p className={`text-sm mt-2 ${pincodeValid ? 'text-green-600' : 'text-red-500'}`}>
                    {pincodeValid ? '✓ Delivery available! Estimated 3-5 business days.' : '✗ Sorry, delivery not available in this area.'}
                  </p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                  <RotateCcw size={18} className="text-[#00BAC6] flex-shrink-0" />
                  <span className="text-xs text-gray-600 font-medium">14-Day<br />Exchange</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                  <Shield size={18} className="text-[#00BAC6] flex-shrink-0" />
                  <span className="text-xs text-gray-600 font-medium">1 Year<br />Warranty</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                  <Truck size={18} className="text-[#00BAC6] flex-shrink-0" />
                  <span className="text-xs text-gray-600 font-medium">Free<br />Delivery</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h3 className="font-semibold text-[#000042] mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-[#00BAC6] flex-shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t px-6 lg:px-8 py-8">
            <h3 className="font-bold text-[#000042] text-lg mb-3">Product Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Lens Selection Modal */}
        {showLensFlow && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 relative">
              {/* Close button */}
              <button onClick={() => setShowLensFlow(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
                <X size={24} />
              </button>
              
              <h2 className="text-xl font-bold text-[#000042] mb-6">Select Your Lenses</h2>
              
              {/* Lens Type */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#000042] mb-3">Lens Type</h3>
                <div className="space-y-2">
                  {lensTypes.map(lens => (
                    <label key={lens.id} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedLens === lens.id ? 'border-[#000042] bg-[#000042]/5' : 'border-gray-200 hover:border-gray-400'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="lensType" value={lens.id} checked={selectedLens === lens.id} onChange={() => setSelectedLens(lens.id)} className="accent-[#000042]" />
                        <div>
                          <p className="font-medium text-[#000042]">{lens.name}</p>
                          <p className="text-xs text-gray-500">{lens.description}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#000042]">{lens.price === 0 ? 'Free' : `+ ৳${lens.price}`}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Coatings */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#000042] mb-3">Coatings</h3>
                <div className="space-y-2">
                  {lensCoatings.map(coating => (
                    <label key={coating.id} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedCoatings.includes(coating.id) ? 'border-[#00BAC6] bg-[#00BAC6]/5' : 'border-gray-200 hover:border-gray-400'}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedCoatings.includes(coating.id)}
                          onChange={() => toggleCoating(coating.id)}
                          className="accent-[#00BAC6]" />
                        <div>
                          <p className="font-medium text-[#000042]">{coating.name}</p>
                          <p className="text-xs text-gray-500">{coating.description}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#000042]">+ ৳{coating.price}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Total and Add to Cart */}
              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="text-2xl font-bold text-[#000042]">৳{(product.price + lensPrice).toLocaleString()}</p>
                </div>
                <button onClick={handleAddToCartFromModal} className="bg-[#000042] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#000060] transition-all flex items-center gap-2">
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-[#000042] mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
