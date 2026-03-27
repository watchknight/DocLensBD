import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageProducts from './pages/Admin/ManageProducts';
import AdminOrders from './pages/Admin/AdminOrders';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Routes - Secured */}
              <Route path="/admin" element={<ProtectedRoute requireAdmin={false} />}>
                <Route element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<ManageProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>
              </Route>
            </Routes>
          </main>
          <Footer />
          <WhatsAppWidget />
        </div>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
};

export default App;
