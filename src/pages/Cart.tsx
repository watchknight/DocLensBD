import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { lensTypes, lensCoatings } from '../data/products';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart, getItemLensPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-[#000042] mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything yet</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-[#000042] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#000060] transition-all">
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#000042] mb-8">Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => {
              const lensPrice = getItemLensPrice(item);
              const itemTotal = (item.product.price + lensPrice) * item.quantity;

              return (
                <div key={item.id} className="bg-white rounded-2xl shadow-md p-5 flex gap-5 group">
                  <Link to={`/product/${item.product.id}`}>
                    <img src={item.product.images[0]} alt={item.product.name} className="w-28 h-28 object-cover rounded-xl" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-[#00BAC6] font-semibold uppercase">{item.product.brand}</p>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-semibold text-[#000042] hover:text-[#00BAC6] transition-colors truncate">{item.product.name}</h3>
                        </Link>
                        <p className="text-xs text-gray-400 mt-1">Color: {item.product.color} | Size: {item.product.frameWidth || 'Medium'}</p>
                        {item.lensType && (
                          <p className="text-xs text-[#000042] mt-1 font-medium">
                            🔍 Lens: {getLensTypeName(item.lensType)}
                            {lensPrice > 0 && <span className="text-[#00BAC6]"> (+৳{lensPrice.toLocaleString()})</span>}
                          </p>
                        )}
                        {item.lensCoating && item.lensCoating.length > 0 && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            ✨ Coatings: {getCoatingNames(item.lensCoating)}
                          </p>
                        )}
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-gray-100 transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="px-4 py-1.5 border-x font-medium text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-gray-100 transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#000042]">৳{itemTotal.toLocaleString()}</p>
                        {(item.product.originalPrice || lensPrice > 0) && (
                          <p className="text-xs text-gray-400">
                            ৳{(item.product.price + lensPrice).toLocaleString()} × {item.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <button onClick={clearCart} className="text-sm text-red-500 hover:underline">Remove all items</button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-40">
              <h2 className="text-lg font-bold text-[#000042] mb-5">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className={`font-medium ${delivery === 0 ? 'text-green-600' : ''}`}>
                    {delivery === 0 ? 'FREE' : `৳${delivery}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax (5%)</span>
                  <span className="font-medium">৳{tax.toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold text-[#000042]">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>
              {subtotal < 3000 && (
                <div className="mt-4 bg-amber-50 text-amber-800 text-xs p-3 rounded-lg">
                  Add ৳{(3000 - subtotal).toLocaleString()} more for free delivery!
                </div>
              )}
              <Link to="/checkout" className="mt-5 w-full bg-[#000042] text-white py-4 rounded-xl font-bold hover:bg-[#000060] transition-all flex items-center justify-center gap-2 text-lg shadow-lg block text-center">
                Checkout <ArrowRight size={20} />
              </Link>
              <Link to="/products" className="mt-3 w-full text-[#00BAC6] py-2 rounded-xl font-medium hover:bg-[#00BAC6]/5 transition-all flex items-center justify-center gap-2 text-sm block text-center">
                Continue Shopping
              </Link>
              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex items-center gap-2 text-xs text-gray-500"><ShieldCheck size={15} className="text-[#00BAC6]" /> Secure checkout</div>
                <div className="flex items-center gap-2 text-xs text-gray-500"><RotateCcw size={15} className="text-[#00BAC6]" /> 14-day easy returns</div>
                <div className="flex items-center gap-2 text-xs text-gray-500"><Truck size={15} className="text-[#00BAC6]" /> Free delivery on ৳3000+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
