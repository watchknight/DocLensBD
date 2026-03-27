const fs = require('fs');
const path = require('path');

console.log('Creating Payment Gateway & Order Tracking features...');

// OrderContext
const orderContext = `import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  lensType?: string;
  coatings?: string[];
  prescription?: {
    rightSph: string;
    rightCyl: string;
    rightAxis: string;
    leftSph: string;
    leftCyl: string;
    leftAxis: string;
    pd: string;
  };
}

export interface PaymentDetails {
  method: 'bkash' | 'nagad' | 'card' | 'cod';
  transactionId?: string;
  cardLast4?: string;
  paidAt?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
}

export interface OrderStatus {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  timestamp: string;
  message: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  payment: PaymentDetails;
  shippingAddress: ShippingAddress;
  statusHistory: OrderStatus[];
  currentStatus: OrderStatus['status'];
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  createOrder: (orderData: Omit<Order, 'id' | 'statusHistory' | 'currentStatus' | 'createdAt' | 'estimatedDelivery' | 'trackingNumber'>) => Order;
  getOrder: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus['status'], message: string) => void;
  cancelOrder: (orderId: string) => boolean;
  setCurrentOrder: (order: Order | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('doclens_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem('doclens_orders', JSON.stringify(orders));
  }, [orders]);

  const generateOrderId = () => {
    return 'DL' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  };

  const generateTrackingNumber = () => {
    return 'TRK' + Date.now().toString().slice(-8) + Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  const getEstimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5); // 5 days delivery estimate
    return date.toISOString();
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'statusHistory' | 'currentStatus' | 'createdAt' | 'estimatedDelivery' | 'trackingNumber'>): Order => {
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...orderData,
      id: generateOrderId(),
      trackingNumber: generateTrackingNumber(),
      createdAt: now,
      estimatedDelivery: getEstimatedDelivery(),
      currentStatus: 'pending',
      statusHistory: [
        {
          status: 'pending',
          timestamp: now,
          message: 'Order placed successfully'
        }
      ]
    };

    // Simulate order confirmation after 2 seconds
    setTimeout(() => {
      updateOrderStatus(newOrder.id, 'confirmed', 'Order confirmed and payment verified');
    }, 2000);

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    return newOrder;
  };

  const getOrder = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus['status'], message: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          currentStatus: status,
          statusHistory: [
            ...order.statusHistory,
            {
              status,
              timestamp: new Date().toISOString(),
              message
            }
          ]
        };
      }
      return order;
    }));
  };

  const cancelOrder = (orderId: string): boolean => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return false;
    
    if (['shipped', 'out_for_delivery', 'delivered'].includes(order.currentStatus)) {
      return false; // Cannot cancel shipped orders
    }

    updateOrderStatus(orderId, 'cancelled', 'Order cancelled by customer');
    return true;
  };

  return (
    <OrderContext.Provider value={{
      orders,
      currentOrder,
      createOrder,
      getOrder,
      updateOrderStatus,
      cancelOrder,
      setCurrentOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
};
`;

fs.writeFileSync(path.join('src', 'context', 'OrderContext.tsx'), orderContext);
console.log('✓ Created OrderContext.tsx');

// Payment Page
const paymentPage = `import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Smartphone, Truck, Shield, CheckCircle, ArrowLeft, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

interface LocationState {
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    postalCode: string;
  };
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, total, clearCart } = useCart();
  const { createOrder } = useOrders();
  
  const shippingAddress = (location.state as LocationState)?.shippingAddress;
  
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card' | 'cod'>('bkash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // bKash/Nagad fields
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  
  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const shipping = total >= 3000 ? 0 : 100;
  const grandTotal = total + shipping;

  if (!shippingAddress) {
    navigate('/checkout');
    return null;
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleMobilePayment = () => {
    if (!mobileNumber || mobileNumber.length !== 11) {
      alert('Please enter a valid 11-digit mobile number');
      return;
    }
    if (!pin || pin.length < 4) {
      alert('Please enter your PIN');
      return;
    }
    setShowOtp(true);
  };

  const handleOtpVerify = () => {
    if (!otp || otp.length !== 6) {
      alert('Please enter the 6-digit OTP');
      return;
    }
    processPayment();
  };

  const handleCardPayment = () => {
    if (!cardNumber || cardNumber.replace(/\\s/g, '').length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return;
    }
    if (!cardName) {
      alert('Please enter the cardholder name');
      return;
    }
    if (!expiry || expiry.length !== 5) {
      alert('Please enter a valid expiry date (MM/YY)');
      return;
    }
    if (!cvv || cvv.length < 3) {
      alert('Please enter the CVV');
      return;
    }
    processPayment();
  };

  const handleCodPayment = () => {
    processPayment();
  };

  const processPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const order = createOrder({
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          lensType: item.lensType,
          coatings: item.coatings
        })),
        subtotal: total,
        shipping,
        discount: 0,
        total: grandTotal,
        payment: {
          method: paymentMethod,
          transactionId: paymentMethod !== 'cod' ? 'TXN' + Date.now() : undefined,
          cardLast4: paymentMethod === 'card' ? cardNumber.slice(-4) : undefined,
          paidAt: paymentMethod !== 'cod' ? new Date().toISOString() : undefined
        },
        shippingAddress
      });
      
      setOrderId(order.id);
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart();
    }, 3000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-6">Thank you for shopping with DocLensBD</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="text-xl font-bold text-primary">{orderId}</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/order-tracking/' + orderId)}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Track Your Order
              </button>
              <button
                onClick={() => navigate('/products')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Processing Payment...</h2>
          <p className="text-gray-500 mt-2">Please do not close this window</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Checkout
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Payment Method</h1>
            
            {/* Payment Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => { setPaymentMethod('bkash'); setShowOtp(false); }}
                className={\`p-4 border-2 rounded-xl text-center transition \${
                  paymentMethod === 'bkash' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'
                }\`}
              >
                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">bKash</span>
                </div>
                <span className="text-sm font-medium">bKash</span>
              </button>
              
              <button
                onClick={() => { setPaymentMethod('nagad'); setShowOtp(false); }}
                className={\`p-4 border-2 rounded-xl text-center transition \${
                  paymentMethod === 'nagad' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                }\`}
              >
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">Nagad</span>
                </div>
                <span className="text-sm font-medium">Nagad</span>
              </button>
              
              <button
                onClick={() => { setPaymentMethod('card'); setShowOtp(false); }}
                className={\`p-4 border-2 rounded-xl text-center transition \${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }\`}
              >
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium">Card</span>
              </button>
              
              <button
                onClick={() => { setPaymentMethod('cod'); setShowOtp(false); }}
                className={\`p-4 border-2 rounded-xl text-center transition \${
                  paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                }\`}
              >
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium">Cash on Delivery</span>
              </button>
            </div>

            {/* bKash Payment Form */}
            {paymentMethod === 'bkash' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">bKash</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Pay with bKash</h3>
                    <p className="text-sm text-gray-500">Fast & secure mobile payment</p>
                  </div>
                </div>
                
                {!showOtp ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        bKash Account Number
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\\D/g, '').slice(0, 11))}
                          placeholder="01XXXXXXXXX"
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        bKash PIN
                      </label>
                      <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\\D/g, '').slice(0, 5))}
                        placeholder="Enter PIN"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={handleMobilePayment}
                      className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <p className="text-sm text-pink-800">
                        An OTP has been sent to {mobileNumber}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\\D/g, '').slice(0, 6))}
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-center text-2xl tracking-widest"
                      />
                    </div>
                    <button
                      onClick={handleOtpVerify}
                      className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
                    >
                      Pay ৳{grandTotal.toLocaleString()}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Nagad Payment Form */}
            {paymentMethod === 'nagad' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">Nagad</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Pay with Nagad</h3>
                    <p className="text-sm text-gray-500">Digital financial service</p>
                  </div>
                </div>
                
                {!showOtp ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nagad Account Number
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\\D/g, '').slice(0, 11))}
                          placeholder="01XXXXXXXXX"
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nagad PIN
                      </label>
                      <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\\D/g, '').slice(0, 5))}
                        placeholder="Enter PIN"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={handleMobilePayment}
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm text-orange-800">
                        An OTP has been sent to {mobileNumber}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\\D/g, '').slice(0, 6))}
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-2xl tracking-widest"
                      />
                    </div>
                    <button
                      onClick={handleOtpVerify}
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                    >
                      Pay ৳{grandTotal.toLocaleString()}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Pay with Card</h3>
                    <p className="text-sm text-gray-500">Visa, Mastercard, AMEX accepted</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      placeholder="JOHN DOE"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\\D/g, '').slice(0, 4))}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleCardPayment}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                  >
                    Pay ৳{grandTotal.toLocaleString()}
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/100px-American_Express_logo_%282018%29.svg.png" alt="AMEX" className="h-8" />
                </div>
              </div>
            )}

            {/* Cash on Delivery */}
            {paymentMethod === 'cod' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Cash on Delivery</h3>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Please keep exact change ready. Our delivery partner may not carry change.
                  </p>
                </div>
                
                <button
                  onClick={handleCodPayment}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  Place Order - ৳{grandTotal.toLocaleString()}
                </button>
              </div>
            )}

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Your payment information is secure and encrypted</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold">৳{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : \`৳\${shipping}\`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Delivering to:</h3>
                <p className="text-sm text-gray-600">
                  {shippingAddress.fullName}<br />
                  {shippingAddress.address}<br />
                  {shippingAddress.city}, {shippingAddress.district} {shippingAddress.postalCode}<br />
                  {shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
`;

fs.writeFileSync(path.join('src', 'pages', 'Payment.tsx'), paymentPage);
console.log('✓ Created Payment.tsx');

// Order Tracking Page
const orderTrackingPage = `import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Package, Truck, CheckCircle, Clock, MapPin, Phone, 
  ArrowLeft, Copy, XCircle, ShoppingBag, Home,
  FileText, AlertCircle
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrder, cancelOrder } = useOrders();
  const [order, setOrder] = useState(orderId ? getOrder(orderId) : undefined);
  const [copied, setCopied] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Refresh order data periodically
  useEffect(() => {
    if (orderId) {
      const interval = setInterval(() => {
        setOrder(getOrder(orderId));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [orderId, getOrder]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCancelOrder = () => {
    if (orderId && cancelOrder(orderId)) {
      setShowCancelConfirm(false);
      setOrder(getOrder(orderId));
    } else {
      alert('Unable to cancel this order. It may have already been shipped.');
    }
  };

  const statusSteps = [
    { key: 'pending', label: 'Order Placed', icon: ShoppingBag },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { key: 'processing', label: 'Processing', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin },
    { key: 'delivered', label: 'Delivered', icon: Home },
  ];

  const getStatusIndex = (status: string) => {
    if (status === 'cancelled') return -1;
    return statusSteps.findIndex(s => s.key === status);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
            <p className="text-gray-600 mb-6">
              We couldn't find an order with ID: {orderId}
            </p>
            <Link
              to="/account"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentStatusIndex = getStatusIndex(order.currentStatus);
  const isCancelled = order.currentStatus === 'cancelled';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        {/* Order Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-gray-900">Order {order.id}</h1>
                <button
                  onClick={() => copyToClipboard(order.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Copy className="h-4 w-4" />
                </button>
                {copied && <span className="text-xs text-green-500">Copied!</span>}
              </div>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-BD', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {order.trackingNumber && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">Tracking Number</p>
                  <p className="font-mono font-semibold">{order.trackingNumber}</p>
                </div>
              )}
              
              {!isCancelled && currentStatusIndex < 3 && (
                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cancel Order?</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Keep Order
                </button>
                <button
                  onClick={handleCancelOrder}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Timeline */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-6">Order Status</h2>
          
          {isCancelled ? (
            <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
              <XCircle className="h-12 w-12 text-red-500" />
              <div>
                <p className="font-semibold text-red-700">Order Cancelled</p>
                <p className="text-sm text-red-600">
                  {order.statusHistory.find(s => s.status === 'cancelled')?.message}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="relative mb-8">
                <div className="flex justify-between mb-2">
                  {statusSteps.map((step, index) => {
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    const Icon = step.icon;
                    
                    return (
                      <div key={step.key} className="flex flex-col items-center relative z-10">
                        <div className={\`w-10 h-10 rounded-full flex items-center justify-center \${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-400'
                        } \${isCurrent ? 'ring-4 ring-green-200' : ''}\`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={\`text-xs mt-2 text-center \${
                          isCompleted ? 'text-green-600 font-medium' : 'text-gray-400'
                        }\`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0" style={{ marginLeft: '20px', marginRight: '20px' }}>
                  <div 
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: \`\${(currentStatusIndex / (statusSteps.length - 1)) * 100}%\` }}
                  />
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Clock className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm text-blue-600">Estimated Delivery</p>
                  <p className="font-semibold text-blue-800">
                    {new Date(order.estimatedDelivery).toLocaleDateString('en-BD', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Status History */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Status History</h2>
          <div className="space-y-4">
            {[...order.statusHistory].reverse().map((status, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={\`w-3 h-3 rounded-full \${
                    status.status === 'cancelled' ? 'bg-red-500' : 'bg-green-500'
                  }\`} />
                  {index < order.statusHistory.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-1" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="font-medium text-gray-900">{status.message}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(status.timestamp).toLocaleString('en-BD')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Items */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    {item.lensType && (
                      <p className="text-sm text-gray-500">Lens: {item.lensType}</p>
                    )}
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="font-semibold text-primary">৳{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>৳{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>{order.shipping === 0 ? 'FREE' : \`৳\${order.shipping}\`}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-৳{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-primary">৳{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </h2>
              <div className="text-gray-600">
                <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.district} {order.shippingAddress.postalCode}</p>
                <p className="flex items-center gap-2 mt-2">
                  <Phone className="h-4 w-4" />
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Payment Information
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Method</span>
                  <span className="font-medium capitalize">
                    {order.payment.method === 'cod' ? 'Cash on Delivery' : order.payment.method}
                  </span>
                </div>
                {order.payment.transactionId && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="font-mono text-sm">{order.payment.transactionId}</span>
                  </div>
                )}
                {order.payment.cardLast4 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Card</span>
                    <span>**** **** **** {order.payment.cardLast4}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className={\`font-medium \${
                    order.payment.method === 'cod' 
                      ? 'text-yellow-600' 
                      : 'text-green-600'
                  }\`}>
                    {order.payment.method === 'cod' ? 'Pending' : 'Paid'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 mt-6 text-white">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-white/80 mb-4">
            If you have any questions about your order, our support team is here to help.
          </p>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="px-4 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Contact Support
            </Link>
            <a
              href="tel:+8801700000000"
              className="px-4 py-2 border border-white/30 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Call: +880 1700-000000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
`;

fs.writeFileSync(path.join('src', 'pages', 'OrderTracking.tsx'), orderTrackingPage);
console.log('✓ Created OrderTracking.tsx');

// My Orders Page
const myOrdersPage = `import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

const MyOrders: React.FC = () => {
  const { orders } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'shipped':
      case 'out_for_delivery': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase());
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h1>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              to="/products"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={\`/order-tracking/\${order.id}\`}
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{order.id}</span>
                      <span className={\`px-2 py-0.5 text-xs font-medium rounded-full \${getStatusColor(order.currentStatus)}\`}>
                        {getStatusLabel(order.currentStatus)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} • ৳{order.total.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Ordered on {new Date(order.createdAt).toLocaleDateString('en-BD', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              {/* Order Items Preview */}
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {order.items.slice(0, 4).map((item) => (
                  <img
                    key={item.id}
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                ))}
                {order.items.length > 4 && (
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-gray-500">+{order.items.length - 4}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
`;

fs.writeFileSync(path.join('src', 'pages', 'MyOrders.tsx'), myOrdersPage);
console.log('✓ Created MyOrders.tsx');

// Updated Checkout Page with Payment Navigation
const checkoutPage = `import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Truck, Shield, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, total } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
  });
  
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const shipping = total >= 3000 ? 0 : 100;
  const grandTotal = total + shipping - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectAddress = (index: number) => {
    if (user?.addresses && user.addresses[index]) {
      const addr = user.addresses[index];
      setFormData({
        ...formData,
        fullName: user.name,
        address: addr.address,
        city: addr.city,
        district: addr.district || '',
        postalCode: addr.postalCode,
      });
      setSelectedAddress(index);
    }
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'DOCLENS10') {
      setDiscount(Math.round(total * 0.1));
      alert('Coupon applied! 10% discount');
    } else if (couponCode.toUpperCase() === 'FIRST20') {
      setDiscount(Math.round(total * 0.2));
      alert('Coupon applied! 20% discount');
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      alert('Please fill in all required fields');
      return;
    }

    navigate('/payment', {
      state: {
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          postalCode: formData.postalCode,
        }
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-lg mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to checkout</p>
          <Link to="/products" className="bg-primary text-white px-6 py-3 rounded-lg inline-block">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const districts = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Sylhet', 'Rangpur', 'Barisal', 'Mymensingh',
    'Comilla', 'Gazipur', 'Narayanganj', 'Bogra', 'Cox\\'s Bazar', 'Jessore', 'Dinajpur'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Saved Addresses */}
              {isAuthenticated && user?.addresses && user.addresses.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Saved Addresses
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {user.addresses.map((addr, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSelectAddress(index)}
                        className={\`text-left p-4 border-2 rounded-lg transition \${
                          selectedAddress === index
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }\`}
                      >
                        <p className="font-medium">{addr.label}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{addr.address}</p>
                        <p className="text-sm text-gray-500">{addr.city}, {addr.postalCode}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="House no, Road, Area"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        District
                      </label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select District</option>
                        {districts.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition"
              >
                Proceed to Payment
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      {item.lensType && (
                        <p className="text-xs text-gray-500">Lens: {item.lensType}</p>
                      )}
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold">৳{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="h-4 w-4 inline mr-1" />
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Try: DOCLENS10 or FIRST20</p>
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-500' : ''}>
                    {shipping === 0 ? 'FREE' : \`৳\${shipping}\`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Free shipping on orders above ৳3,000
                </p>
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

fs.writeFileSync(path.join('src', 'pages', 'Checkout.tsx'), checkoutPage);
console.log('✓ Updated Checkout.tsx');

// Updated App.tsx with new routes
const appTsx = `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderTracking from './pages/OrderTracking';
import MyOrders from './pages/MyOrders';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import Prescription from './pages/Prescription';
import VirtualTryOn from './pages/VirtualTryOn';

function App() {
  return (
    <Router>
      <AuthProvider>
        <OrderProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:category" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/prescription" element={<Prescription />} />
                    <Route path="/virtual-try-on" element={<VirtualTryOn />} />
                    <Route path="/virtual-try-on/:productId" element={<VirtualTryOn />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </CartProvider>
          </WishlistProvider>
        </OrderProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
`;

fs.writeFileSync(path.join('src', 'App.tsx'), appTsx);
console.log('✓ Updated App.tsx with new routes');

// Updated Header with Orders link
const headerComponent = `import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, Heart, User, Menu, X, 
  ChevronDown, Eye, Sun, Monitor, Baby, BookOpen, Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    { name: 'Eyeglasses', slug: 'eyeglasses', icon: Eye },
    { name: 'Sunglasses', slug: 'sunglasses', icon: Sun },
    { name: 'Computer Glasses', slug: 'computer-glasses', icon: Monitor },
    { name: 'Kids Glasses', slug: 'kids', icon: Baby },
    { name: 'Reading Glasses', slug: 'reading', icon: BookOpen },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(\`/products?search=\${encodeURIComponent(searchQuery)}\`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>Free Shipping on Orders Above ৳3,000</span>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/virtual-try-on" className="hover:underline flex items-center gap-1">
              <Eye className="h-3 w-3" /> Virtual Try-On
            </Link>
            <Link to="/prescription" className="hover:underline">Upload Prescription</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">DocLensBD</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for eyeglasses, sunglasses..."
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-primary"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400 hover:text-primary" />
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1 hover:text-primary transition p-2"
              >
                <User className="h-5 w-5" />
                <span className="hidden lg:inline text-sm">
                  {isAuthenticated ? user?.name?.split(' ')[0] : 'Sign In'}
                </span>
                <ChevronDown className="h-4 w-4 hidden lg:block" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/account"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/my-orders"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Package className="h-4 w-4" /> My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        Wishlist
                      </Link>
                      <Link
                        to="/prescription"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        Prescriptions
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/login?signup=true"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 hover:text-primary transition">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:text-primary transition">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-primary"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-8 py-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={\`/products/\${category.slug}\`}
                  className="flex items-center gap-2 py-2 text-gray-700 hover:text-primary transition"
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/my-orders"
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-primary transition"
              >
                <Package className="h-4 w-4" />
                Track Order
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={\`/products/\${category.slug}\`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-gray-700 hover:text-primary"
                  >
                    <category.icon className="h-5 w-5" />
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/my-orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-gray-700 hover:text-primary"
                >
                  <Package className="h-5 w-5" />
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/virtual-try-on"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-gray-700 hover:text-primary"
                >
                  <Eye className="h-5 w-5" />
                  Virtual Try-On
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
`;

fs.writeFileSync(path.join('src', 'components', 'Header.tsx'), headerComponent);
console.log('✓ Updated Header.tsx with Orders link');

console.log('\\n✅ Payment Gateway & Order Tracking features created!');
console.log('\\nNew features added:');
console.log('  - bKash payment');
console.log('  - Nagad payment');
console.log('  - Card payment (Visa, Mastercard, AMEX)');
console.log('  - Cash on Delivery');
console.log('  - Order tracking page');
console.log('  - My Orders page');
console.log('  - Order status history');
console.log('  - Cancel order functionality');
