import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Shield, RotateCcw, Truck, CheckCircle, ChevronRight, Ruler, Minus, Plus, X } from 'lucide-react';
import { products, lensTypes, lensCoatings } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../components/Toast';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = product ? isInWishlist(product.id) : false;
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLensFlow, setShowLensFlow] = useState(false);
  const [selectedLens, setSelectedLens] = useState('');
  const [selectedCoatings, setSelectedCoatings] = useState<string[]>([]);
  const [pincode, setPincode] = useState('');
  const [pincodeValid, setPincodeValid] = useState<boolean | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFBFD]">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-[#F0F2F8] flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😕</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-[#0A0A3E] mb-2">Product Not Found</h2>
          <Link to="/products" className="text-[#00C9D6] font-semibold hover:underline">Browse All Products</Link>
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



  const handleAddToCart = () => {
    const lens = selectedLens || undefined;
    const coatings = selectedCoatings.length > 0 ? selectedCoatings : undefined;
    for (let i = 0; i < quantity; i++) {
      addToCart(product, lens, coatings);
    }
    setShowLensFlow(false);
    showToast(`${product.name} added to cart`, 'success', { label: 'View Cart', onClick: () => navigate('/cart') });
  };

  const handleAddToCartFromModal = () => {
    const lens = selectedLens || undefined;
    const coatings = selectedCoatings.length > 0 ? selectedCoatings : undefined;
    addToCart(product, lens, coatings);
    setShowLensFlow(false);
    showToast(`${product.name} added to cart`, 'success', { label: 'View Cart', onClick: () => navigate('/cart') });
  };

  const toggleCoating = (coatingId: string) => {
    setSelectedCoatings(prev =>
      prev.includes(coatingId)
        ? prev.filter(c => c !== coatingId)
        : [...prev, coatingId]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD]">


      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E8EAF2]">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#9CA0B8]">
            <Link to="/" className="hover:text-[#0A0A3E] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-[#0A0A3E] transition-colors">Products</Link>
            <ChevronRight size={14} />
            <Link to={`/products?category=${product.category}`} className="hover:text-[#0A0A3E] transition-colors capitalize">{product.category.replace('-', ' ')}</Link>
            <ChevronRight size={14} />
            <span className="text-[#0A0A3E] font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-[#E8EAF2]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Images */}
            <div className="p-6 lg:p-8">
              <div className="relative mb-4 rounded-2xl overflow-hidden bg-[#F0F2F8] aspect-square">
                <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                {product.isNew && <span className="absolute top-4 left-4 badge-new text-xs font-bold px-3 py-1 rounded-full">NEW</span>}
                {discount > 0 && <span className="absolute top-4 right-4 badge-sale text-xs font-bold px-3 py-1 rounded-full">{discount}% OFF</span>}
              </div>
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button key={idx} onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${idx === selectedImage ? 'border-[#0A0A3E] ring-2 ring-[#0A0A3E]/20' : 'border-[#E8EAF2] hover:border-[#D0D4E4]'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-6 lg:p-8 border-l border-[#E8EAF2]">
              <p className="text-[#00C9D6] font-semibold text-sm uppercase tracking-wider">{product.brand}</p>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-[#0A0A3E] mt-2">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center bg-emerald-600 text-white px-2 py-1 rounded text-sm gap-1">
                  <span className="font-bold">{product.rating}</span> <Star size={12} fill="white" />
                </div>
                <span className="text-[#9CA0B8] text-sm">{product.reviews} Reviews</span>
              </div>

              {/* Price */}
              <div className="mt-6 p-4 bg-[#F0F2F8] rounded-xl">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-display font-bold text-[#0A0A3E]">৳{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-[#9CA0B8] line-through">৳{product.originalPrice.toLocaleString()}</span>
                      <span className="text-emerald-600 font-semibold text-sm">({discount}% off)</span>
                    </>
                  )}
                </div>
                {lensPrice > 0 && <p className="text-sm text-[#5A5E7A] mt-1">+ ৳{lensPrice.toLocaleString()} for lenses</p>}
                <p className="text-xs text-[#9CA0B8] mt-1">Inclusive of all taxes</p>
              </div>

              {/* Frame Specs */}
              {product.lensWidth && (
                <div className="mt-5">
                  <h3 className="font-semibold text-[#0A0A3E] flex items-center gap-2 mb-3 text-sm"><Ruler size={16} /> Frame Dimensions</h3>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { label: 'Lens Width', value: `${product.lensWidth}mm` },
                      { label: 'Bridge', value: `${product.bridgeWidth}mm` },
                      { label: 'Temple', value: `${product.templeLength}mm` },
                    ].map((spec, i) => (
                      <div key={i} className="text-center px-4 py-2 bg-[#F0F2F8] rounded-lg">
                        <p className="text-xs text-[#9CA0B8]">{spec.label}</p>
                        <p className="font-bold text-[#0A0A3E] text-sm">{spec.value}</p>
                      </div>
                    ))}
                    {product.frameWidth && (
                      <div className="text-center px-4 py-2 bg-[#0A0A3E]/5 rounded-lg border border-[#0A0A3E]/10">
                        <p className="text-xs text-[#9CA0B8]">Size</p>
                        <p className="font-bold text-[#0A0A3E] text-sm">{product.frameWidth}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-4">
                <span className="font-semibold text-[#0A0A3E] text-sm">Quantity:</span>
                <div className="flex items-center border border-[#E8EAF2] rounded-lg overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-[#F0F2F8] transition-colors"><Minus size={14} /></button>
                  <span className="px-4 py-2 border-x border-[#E8EAF2] font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-[#F0F2F8] transition-colors"><Plus size={14} /></button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 flex gap-3">
                <button onClick={() => setShowLensFlow(true)}
                  className="btn-press flex-1 bg-[#0A0A3E] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#12124F] transition-all flex items-center justify-center gap-2 text-base shadow-lg">
                  Select Lenses
                </button>
                <button onClick={handleAddToCart}
                  className="btn-press flex items-center gap-2 bg-[#00C9D6] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#00B3BF] transition-all shadow-lg">
                  <ShoppingCart size={20} /> Add
                </button>
                <button
                  onClick={() => { toggleWishlist(product.id); showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist ❤️', wishlisted ? 'info' : 'success'); }}
                  className={`border-2 p-4 rounded-xl transition-all btn-press ${
                    wishlisted ? 'border-[#FF6B8A] text-[#FF6B8A] bg-[#FFE0E8]' : 'border-[#E8EAF2] text-[#9CA0B8] hover:border-[#FF6B8A] hover:text-[#FF6B8A] hover:bg-[#FFE0E8]'
                  }`}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={20} fill={wishlisted ? '#FF6B8A' : 'none'} />
                </button>
              </div>

              {/* Pincode Checker */}
              <div className="mt-5">
                <h3 className="font-semibold text-[#0A0A3E] text-sm mb-2">Delivery & Services</h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter Pincode" value={pincode} onChange={(e) => { setPincode(e.target.value); setPincodeValid(null); }}
                    className="bg-[#F0F2F8] border-none rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9D6]/30 flex-1" />
                  <button onClick={handleCheckPincode} className="bg-[#0A0A3E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#12124F] transition-colors btn-press">Check</button>
                </div>
                {pincodeValid !== null && (
                  <p className={`text-sm mt-2 ${pincodeValid ? 'text-emerald-600' : 'text-[#FF6B8A]'}`}>
                    {pincodeValid ? '✓ Delivery available! Estimated 3-5 business days.' : '✗ Sorry, delivery not available in this area.'}
                  </p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2 bg-[#F0F2F8] rounded-lg p-3">
                  <RotateCcw size={18} className="text-[#00C9D6] flex-shrink-0" />
                  <span className="text-xs text-[#5A5E7A] font-medium">14-Day<br/>Exchange</span>
                </div>
                <div className="flex items-center gap-2 bg-[#F0F2F8] rounded-lg p-3">
                  <Shield size={18} className="text-[#00C9D6] flex-shrink-0" />
                  <span className="text-xs text-[#5A5E7A] font-medium">1 Year<br/>Warranty</span>
                </div>
                <div className="flex items-center gap-2 bg-[#F0F2F8] rounded-lg p-3">
                  <Truck size={18} className="text-[#00C9D6] flex-shrink-0" />
                  <span className="text-xs text-[#5A5E7A] font-medium">Free<br/>Delivery</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h3 className="font-semibold text-[#0A0A3E] mb-3 text-sm">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[#5A5E7A]">
                      <CheckCircle size={16} className="text-[#00C9D6] flex-shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-[#E8EAF2] px-6 lg:px-8 py-8">
            <h3 className="font-display font-bold text-[#0A0A3E] text-lg mb-3">Product Description</h3>
            <p className="text-[#5A5E7A] leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Lens Selection Modal */}
        {showLensFlow && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" style={{ backdropFilter: 'blur(4px)' }}>
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-2xl" style={{ animation: 'fadeIn 0.2s ease-out' }}>
              <button onClick={() => setShowLensFlow(false)} className="absolute top-4 right-4 text-[#9CA0B8] hover:text-[#0A0A3E] transition-colors">
                <X size={24} />
              </button>
              
              <h2 className="text-xl font-display font-bold text-[#0A0A3E] mb-6">Select Your Lenses</h2>
              
              {/* Lens Type */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#0A0A3E] mb-3 text-sm">Lens Type</h3>
                <div className="space-y-2">
                  {lensTypes.map(lens => (
                    <label key={lens.id} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedLens === lens.id ? 'border-[#0A0A3E] bg-[#0A0A3E]/5' : 'border-[#E8EAF2] hover:border-[#D0D4E4]'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="lensType" value={lens.id} checked={selectedLens === lens.id} onChange={() => setSelectedLens(lens.id)} className="accent-[#0A0A3E]" />
                        <div>
                          <p className="font-medium text-[#0A0A3E] text-sm">{lens.name}</p>
                          <p className="text-xs text-[#9CA0B8]">{lens.description}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#0A0A3E] text-sm">{lens.price === 0 ? 'Free' : `+ ৳${lens.price}`}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Coatings */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#0A0A3E] mb-3 text-sm">Coatings</h3>
                <div className="space-y-2">
                  {lensCoatings.map(coating => (
                    <label key={coating.id} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedCoatings.includes(coating.id) ? 'border-[#00C9D6] bg-[#00C9D6]/5' : 'border-[#E8EAF2] hover:border-[#D0D4E4]'}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedCoatings.includes(coating.id)}
                          onChange={() => toggleCoating(coating.id)}
                          className="accent-[#00C9D6]" />
                        <div>
                          <p className="font-medium text-[#0A0A3E] text-sm">{coating.name}</p>
                          <p className="text-xs text-[#9CA0B8]">{coating.description}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#0A0A3E] text-sm">+ ৳{coating.price}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Total and Add to Cart */}
              <div className="border-t border-[#E8EAF2] pt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9CA0B8]">Total Price</p>
                  <p className="text-2xl font-display font-bold text-[#0A0A3E]">৳{(product.price + lensPrice).toLocaleString()}</p>
                </div>
                <button onClick={handleAddToCartFromModal} className="btn-press bg-[#0A0A3E] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#12124F] transition-all flex items-center gap-2">
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-display font-bold text-[#0A0A3E] mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky CTA — visible only on small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8EAF2] shadow-lg px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-display font-bold text-[#0A0A3E]">৳{(product.price + lensPrice).toLocaleString()}</p>
          {product.originalPrice && <p className="text-xs text-[#9CA0B8] line-through">৳{product.originalPrice.toLocaleString()}</p>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { toggleWishlist(product.id); showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist ❤️', wishlisted ? 'info' : 'success'); }}
            className={`p-3 rounded-xl border-2 transition-all ${wishlisted ? 'border-[#FF6B8A] text-[#FF6B8A] bg-[#FFE0E8]' : 'border-[#E8EAF2] text-[#9CA0B8]'}`}
            aria-label="Wishlist"
          >
            <Heart size={20} fill={wishlisted ? '#FF6B8A' : 'none'} />
          </button>
          <button onClick={handleAddToCart}
            className="btn-press flex-1 bg-[#0A0A3E] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm">
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
