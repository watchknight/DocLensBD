import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { lensTypes, lensCoatings } from '../data/products';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart, getItemLensPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-[#F1F5F9] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-[#94A3B8]" />
          </div>
          <h2 className="text-2xl font-display font-bold text-[#0F172A] mb-2">Your Cart is Empty</h2>
          <p className="text-[#475569] mb-6">Looks like you haven't added anything yet</p>
          <Link to="/products" className="btn-press inline-flex items-center gap-2 bg-[#0F172A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1E293B] transition-all">
            <ShoppingBag size={20} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const getLensTypeName = (lensId: string) => {
    return lensTypes.find(l => l.id === lensId)?.name || lensId;
  };

  const getCoatingNames = (coatingIds: string[]) => {
    return coatingIds.map(id => lensCoatings.find(c => c.id === id)?.name || id).join(', ');
  };

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.05);
  const delivery = subtotal >= 3000 ? 0 : 150;
  const total = subtotal + tax + delivery;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-[#0F172A] mb-8">Shopping Cart <span className="text-[#94A3B8] text-lg font-normal">({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span></h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => {
              const lensPrice = getItemLensPrice(item);
              const itemTotal = (item.product.price + lensPrice) * item.quantity;

              return (
                <div key={item.id} className="bg-white rounded-2xl shadow-card p-5 flex gap-5 group border border-[#E2E8F0] hover:shadow-md transition-shadow">
                  <Link to={`/product/${item.product.id}`}>
                    <img src={item.product.images[0]} alt={item.product.name} className="w-28 h-28 object-cover rounded-xl" loading="lazy" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-[#6366F1] font-semibold uppercase tracking-wider">{item.product.brand}</p>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-semibold text-[#0F172A] hover:text-[#6366F1] transition-colors truncate">{item.product.name}</h3>
                        </Link>
                        <p className="text-xs text-[#94A3B8] mt-1">Color: {item.product.color} | Size: {item.product.frameWidth || 'Medium'}</p>
                        {item.lensType && (
                          <p className="text-xs text-[#0F172A] mt-1 font-medium">
                            🔍 Lens: {getLensTypeName(item.lensType)}
                            {lensPrice > 0 && <span className="text-[#6366F1]"> (+৳{lensPrice.toLocaleString()})</span>}
                          </p>
                        )}
                        {item.lensCoating && item.lensCoating.length > 0 && (
                          <p className="text-xs text-[#475569] mt-0.5">
                            ✨ Coatings: {getCoatingNames(item.lensCoating)}
                          </p>
                        )}
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-[#D0D4E4] hover:text-[#F43F5E] transition-colors flex-shrink-0" aria-label="Remove item">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-[#E2E8F0] rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-[#F1F5F9] transition-colors" aria-label="Decrease quantity">
                          <Minus size={14} />
                        </button>
                        <span className="px-4 py-1.5 border-x border-[#E2E8F0] font-medium text-sm text-[#0F172A]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-[#F1F5F9] transition-colors" aria-label="Increase quantity">
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-display font-bold text-[#0F172A]">৳{itemTotal.toLocaleString()}</p>
                        {(item.product.originalPrice || lensPrice > 0) && (
                          <p className="text-xs text-[#94A3B8]">
                            ৳{(item.product.price + lensPrice).toLocaleString()} × {item.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <button onClick={clearCart} className="text-sm text-[#F43F5E] hover:underline font-medium">Remove all items</button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-28 border border-[#E2E8F0]">
              <h2 className="text-lg font-display font-bold text-[#0F172A] mb-5">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#475569]">Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium text-[#0F172A]">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#475569]">Delivery</span>
                  <span className={`font-medium ${delivery === 0 ? 'text-emerald-600' : 'text-[#0F172A]'}`}>
                    {delivery === 0 ? 'FREE' : `৳${delivery}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#475569]">Tax (5%)</span>
                  <span className="font-medium text-[#0F172A]">৳{tax.toLocaleString()}</span>
                </div>
                <hr className="border-[#E2E8F0]" />
                <div className="flex justify-between text-lg font-display font-bold text-[#0F172A]">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>
              {subtotal < 3000 && (
                <div className="mt-4 bg-[#F59E0B]/10 text-[#F59E0B] text-xs p-3 rounded-lg font-medium">
                  Add ৳{(3000 - subtotal).toLocaleString()} more for free delivery!
                </div>
              )}
              <Link to="/checkout" className="btn-press mt-5 w-full bg-[#0F172A] text-white py-4 rounded-xl font-bold hover:bg-[#1E293B] transition-all flex items-center justify-center gap-2 text-base shadow-lg block text-center">
                Checkout <ArrowRight size={20} />
              </Link>
              <Link to="/products" className="mt-3 w-full text-[#6366F1] py-2 rounded-xl font-medium hover:bg-[#6366F1]/5 transition-all flex items-center justify-center gap-2 text-sm block text-center">
                Continue Shopping
              </Link>
              <div className="mt-6 space-y-2 border-t border-[#E2E8F0] pt-4">
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]"><ShieldCheck size={15} className="text-[#6366F1]" /> Secure checkout</div>
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]"><RotateCcw size={15} className="text-[#6366F1]" /> 14-day easy returns</div>
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]"><Truck size={15} className="text-[#6366F1]" /> Free delivery on ৳3000+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
