import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000042] text-gray-300">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-[#00BAC6] to-[#008a93] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-xl font-bold">Subscribe to Our Newsletter</h3>
              <p className="text-white/80">Get exclusive offers and updates directly to your inbox</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input type="email" placeholder="Enter your email"
                className="px-4 py-3 rounded-l-xl w-full md:w-80 focus:outline-none text-gray-800" />
              <button className="bg-[#000042] text-white px-6 py-3 rounded-r-xl hover:bg-[#000060] font-semibold transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 100 60" fill="none"><ellipse cx="25" cy="30" rx="20" ry="18" stroke="white" strokeWidth="4" fill="none" /><ellipse cx="75" cy="30" rx="20" ry="18" stroke="white" strokeWidth="4" fill="none" /><path d="M45 30 Q50 24 55 30" stroke="white" strokeWidth="4" fill="none" /><line x1="5" y1="30" x2="5" y2="18" stroke="white" strokeWidth="4" /><line x1="95" y1="30" x2="95" y2="18" stroke="white" strokeWidth="4" /></svg>
              <span className="text-2xl font-bold text-white">DocLensBD</span>
            </div>
            <p className="text-gray-400 mb-4">Your trusted destination for premium eyewear in Bangladesh. Quality frames, affordable prices.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#00BAC6] transition-colors"><Facebook size={22} /></a>
              <a href="#" className="hover:text-[#00BAC6] transition-colors"><Instagram size={22} /></a>
              <a href="#" className="hover:text-[#00BAC6] transition-colors"><Twitter size={22} /></a>
              <a href="#" className="hover:text-[#00BAC6] transition-colors"><Youtube size={22} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products?category=eyeglasses" className="hover:text-[#00BAC6] transition-colors">Eyeglasses</Link></li>
              <li><Link to="/products?category=sunglasses" className="hover:text-[#00BAC6] transition-colors">Sunglasses</Link></li>
              <li><Link to="/products?category=computer-glasses" className="hover:text-[#00BAC6] transition-colors">Computer Glasses</Link></li>
              <li><Link to="/products?category=kids" className="hover:text-[#00BAC6] transition-colors">Kids Glasses</Link></li>
              <li><Link to="/products" className="hover:text-[#00BAC6] transition-colors">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-[#00BAC6] transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-[#00BAC6] transition-colors">About Us</Link></li>
              <li><Link to="/about" className="hover:text-[#00BAC6] transition-colors">Shipping Info</Link></li>
              <li><Link to="/about" className="hover:text-[#00BAC6] transition-colors">Returns & Exchange</Link></li>
              <li><Link to="/about" className="hover:text-[#00BAC6] transition-colors">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><MapPin size={18} className="text-[#00BAC6]" /><span>123 Gulshan Avenue, Dhaka 1212</span></li>
              <li className="flex items-center gap-2"><Phone size={18} className="text-[#00BAC6]" /><span>+880 1234-567890</span></li>
              <li className="flex items-center gap-2"><Mail size={18} className="text-[#00BAC6]" /><span>info@doclensbd.com</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© 2024 DocLensBD. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/about" className="hover:text-[#00BAC6]">Privacy Policy</Link>
              <Link to="/about" className="hover:text-[#00BAC6]">Terms of Service</Link>
            </div>
            <div className="flex items-center gap-2">
              <span>We Accept:</span>
              <span className="bg-white text-[#000042] px-2 py-1 rounded text-xs font-bold">bKash</span>
              <span className="bg-white text-[#000042] px-2 py-1 rounded text-xs font-bold">Nagad</span>
              <span className="bg-white text-[#000042] px-2 py-1 rounded text-xs font-bold">VISA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
