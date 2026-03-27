import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#000042] mb-8">Shopping Cart ({cartItems.length} items)</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="bg-white rounded-2xl shadow-md p-5 flex gap-5 group">
                <Link to={`/product/${item.product.id}`}>
                  <img src={item.product.images[0]} alt={item.product.name} className="w-28 h-28 object-cover rounded-xl" />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-[#00BAC6] font-semibold uppercase">{item.product.brand}</p>
                      <Link to={`/product/${item.product.id}`}><h3 className="font-semibold text-[#000042] hover:text-[#00BAC6] transition-colors">{item.product.name}</h3></Link>
                      <p className="text-xs text-gray-400 mt-1">Color: {item.product.color} | Size: {item.product.frameWidth || 'Medium'}</p>
                      {item.lensType && <p className="text-xs text-gray-400">Lens: {item.lensType}</p>}
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-gray-300 hover:text-red-500 transition-colors"><X size={20} /></button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-gray-100 transition-colors"><Minus size={14} /></button>
                      <span className="px-4 py-1.5 border-x font-medium text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-gray-100 transition-colors"><Plus size={14} /></button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#000042]">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                      {item.product.originalPrice && <p className="text-xs text-gray-400 line-through">৳{(item.product.originalPrice * item.quantity).toLocaleString()}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-sm text-red-500 hover:underline">Remove all items</button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-40">
              <h2 className="text-lg font-bold text-[#000042] mb-5">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal ({cartItems.length} items)</span><span className="font-medium">৳{getCartTotal().toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Delivery</span><span className="text-green-600 font-medium">{getCartTotal() >= 3000 ? 'FREE' : '৳150'}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Tax (5%)</span><span className="font-medium">৳{Math.round(getCartTotal() * 0.05).toLocaleString()}</span></div>
                <hr />
                <div className="flex justify-between text-lg font-bold text-[#000042]">
                  <span>Total</span>
                  <span>৳{(getCartTotal() + Math.round(getCartTotal() * 0.05) + (getCartTotal() >= 3000 ? 0 : 150)).toLocaleString()}</span>
                </div>
              </div>
              {getCartTotal() < 3000 && (
                <div className="mt-4 bg-amber-50 text-amber-800 text-xs p-3 rounded-lg">
                  Add ৳{(3000 - getCartTotal()).toLocaleString()} more for free delivery!
                </div>
              )}
              <Link to="/checkout" className="mt-5 w-full bg-[#000042] text-white py-4 rounded-xl font-bold hover:bg-[#000060] transition-all flex items-center justify-center gap-2 text-lg shadow-lg">
                Checkout <ArrowRight size={20} />
              </Link>
              <Link to="/products" className="mt-3 w-full text-[#00BAC6] py-2 rounded-xl font-medium hover:bg-[#00BAC6]/5 transition-all flex items-center justify-center gap-2 text-sm">
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
