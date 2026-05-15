import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, CreditCard, Smartphone, Truck, ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
import { lensTypes } from '../data/products';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { initiatePayment } from '../services/payment';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart, getItemLensPrice } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '', payment: 'bkash' });

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.05);
  const delivery = subtotal >= 3000 ? 0 : 150;
  const total = subtotal + tax + delivery;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Initialize Payment (Simulation for Payment Gateways like bKash/SSLCommerz)
      if (form.payment !== 'cod') {
        const paymentResult = await initiatePayment({
          amount: total,
          currency: 'BDT',
          orderId: `DL${Math.floor(Math.random() * 1000000)}`,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          customerAddress: form.address
        }, form.payment as 'sslcommerz' | 'bkash');
        
        if (!paymentResult.success) {
          alert(paymentResult.error || "Payment failed.");
          setIsProcessing(false);
          return;
        }
        
        // In a real app with a redirect URL, you would do:
        // if (paymentResult.redirectUrl) {
        //   window.location.href = paymentResult.redirectUrl;
        //   return;
        // }
      }
      
      // 1. Create the Order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user?.uid || 'guest',
        customerName: form.name,
        customerEmail: form.email,
        phone: form.phone,
        address: `${form.address}, ${form.city} - ${form.zip}`,
        items: cartItems.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price + getItemLensPrice(item),
          lensType: item.lensType || 'none'
        })),
        subtotal,
        tax,
        delivery,
        total,
        status: form.payment === 'cod' ? 'pending' : 'paid',
        paymentMethod: form.payment,
        createdAt: new Date().toISOString()
      });

      // 2. Queue Email Trigger in Firestore
      await addDoc(collection(db, 'emails'), {
        to: form.email,
        message: {
          subject: `DocLensBD - Order Confirmation (#DL${orderRef.id.substring(0,6).toUpperCase()})`,
          text: `Hi ${form.name},\n\nThank you for your order! Your payment method is ${form.payment.toUpperCase()}.\n\nTotal: ৳${total}\n\nWe will notify you when it ships.`,
          html: `<div style="font-family:sans-serif;color:#0A0A3E;"><h2>Thank you for your order, ${form.name}!</h2><p>Your order <strong>#DL${orderRef.id.substring(0,6).toUpperCase()}</strong> has been securely placed.</p><p>Total Amount: <strong>৳${total}</strong></p><p>We will update you via email exactly when your package ships!</p></div>`
        }
      });

      setOrderId(`DL${orderRef.id.substring(0,6).toUpperCase()}`);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error("Failed to process order:", error);
      alert("There was an issue processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getLensTypeName = (lensId: string) => {
    return lensTypes.find(l => l.id === lensId)?.name || lensId;
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-[#0A0A3E] mb-2">Order Placed!</h2>
          <p className="text-[#5A5E7A] mb-6">Your order has been securely placed in our database. An automated email receipt will be sent shortly.</p>
          <p className="text-lg font-semibold text-[#0A0A3E] mb-4">Order #{orderId}</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-[#0A0A3E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#12124F]">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-2xl font-bold text-[#0A0A3E] mb-2">No items to checkout</h2>
          <Link to="/products" className="text-[#00C9D6] font-semibold hover:underline">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD] py-8">
      <div className="container mx-auto px-4">
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-10">
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-[#0A0A3E] text-white' : 'bg-gray-200 text-[#5A5E7A]'}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`text-sm font-medium ${step >= i + 1 ? 'text-[#0A0A3E]' : 'text-[#9CA0B8]'}`}>{s}</span>
              </div>
              {i < 2 && <div className={`h-0.5 w-20 mx-4 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
                  <h2 className="text-xl font-bold text-[#0A0A3E]">Shipping Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">Full Name</label>
                      <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border-2 border-[#E8EAF2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A0A3E]" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">Email</label>
                      <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border-2 border-[#E8EAF2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A0A3E]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 block mb-1">Phone</label>
                    <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border-2 border-[#E8EAF2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A0A3E]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 block mb-1">Address</label>
                    <textarea required rows={3} value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full border-2 border-[#E8EAF2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A0A3E]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">City</label>
                      <input required value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full border-2 border-[#E8EAF2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A0A3E]" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">ZIP Code</label>
                      <input required value={form.zip} onChange={e => setForm({...form, zip: e.target.value})} className="w-full border-2 border-[#E8EAF2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A0A3E]" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#0A0A3E] text-white py-4 rounded-xl font-bold hover:bg-[#12124F] transition-all text-lg">Continue to Payment</button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
                  <h2 className="text-xl font-bold text-[#0A0A3E]">Payment Method</h2>
                  {[
                    { id: 'bkash', label: 'bKash', icon: <Smartphone className="text-pink-500" size={24} />, desc: 'Pay with bKash mobile wallet' },
                    { id: 'nagad', label: 'Nagad', icon: <Smartphone className="text-orange-500" size={24} />, desc: 'Pay with Nagad mobile wallet' },
                    { id: 'card', label: 'Card', icon: <CreditCard className="text-[#0A0A3E]" size={24} />, desc: 'Credit or Debit card' },
                    { id: 'cod', label: 'Cash on Delivery', icon: <Truck className="text-green-600" size={24} />, desc: 'Pay when you receive' },
                  ].map(p => (
                    <label key={p.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.payment === p.id ? 'border-[#0A0A3E] bg-[#0A0A3E]/5' : 'border-[#E8EAF2] hover:border-gray-400'}`}>
                      <input type="radio" name="payment" value={p.id} checked={form.payment === p.id} onChange={() => setForm({...form, payment: p.id})} className="accent-[#0A0A3E]" />
                      {p.icon}
                      <div>
                        <p className="font-medium text-[#0A0A3E]">{p.label}</p>
                        <p className="text-xs text-[#5A5E7A]">{p.desc}</p>
                      </div>
                    </label>
                  ))}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 border-2 border-[#E8EAF2] text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-[#FAFBFD]"><ArrowLeft size={18} /> Back</button>
                    <button type="submit" className="flex-1 bg-[#0A0A3E] text-white py-4 rounded-xl font-bold hover:bg-[#12124F] transition-all text-lg">Review Order</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
                  <h2 className="text-xl font-bold text-[#0A0A3E]">Review Order</h2>
                  <div className="bg-[#FAFBFD] rounded-xl p-4 space-y-1">
                    <p className="font-semibold text-[#0A0A3E]">{form.name}</p>
                    <p className="text-sm text-[#5A5E7A]">{form.address}, {form.city} - {form.zip}</p>
                    <p className="text-sm text-[#5A5E7A]">{form.phone} | {form.email}</p>
                    <p className="text-sm text-[#00C9D6] font-medium mt-2">Payment: {form.payment.toUpperCase()}</p>
                  </div>
                  <div className="space-y-3">
                    {cartItems.map(item => {
                      const lensPrice = getItemLensPrice(item);
                      return (
                        <div key={item.id} className="flex items-center gap-4 py-3 border-b last:border-0">
                          <img src={item.product.images[0]} alt="" className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#0A0A3E] text-sm truncate">{item.product.name}</p>
                            <p className="text-xs text-[#9CA0B8]">Qty: {item.quantity}</p>
                            {item.lensType && (
                              <p className="text-xs text-[#5A5E7A]">Lens: {getLensTypeName(item.lensType)}</p>
                            )}
                          </div>
                          <p className="font-bold text-[#0A0A3E]">৳{((item.product.price + lensPrice) * item.quantity).toLocaleString()}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button type="button" onClick={() => setStep(2)} className="flex items-center gap-2 border-2 border-[#E8EAF2] text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-[#FAFBFD]" disabled={isProcessing}><ArrowLeft size={18} /> Back</button>
                    <button type="submit" disabled={isProcessing} className="flex-1 bg-[#00C9D6] flex items-center justify-center gap-2 text-white py-4 rounded-xl font-bold hover:bg-[#00B3BF] transition-all text-lg shadow-lg disabled:opacity-70">
                      {isProcessing ? <><Loader2 size={24} className="animate-spin" /> Processing Securely...</> : `Place Order — ৳${total.toLocaleString()}`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-40">
            <h3 className="font-bold text-[#0A0A3E] mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[#5A5E7A]">Items ({cartItems.length})</span><span>৳{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#5A5E7A]">Delivery</span><span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>{delivery === 0 ? 'FREE' : `৳${delivery}`}</span></div>
              <div className="flex justify-between"><span className="text-[#5A5E7A]">Tax (5%)</span><span>৳{tax.toLocaleString()}</span></div>
              <hr />
              <div className="flex justify-between text-lg font-bold text-[#0A0A3E]"><span>Total</span><span>৳{total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
