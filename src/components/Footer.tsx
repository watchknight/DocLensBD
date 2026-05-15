import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A3E] text-gray-300">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-[#00C9D6] to-[#008a93] py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-2xl font-bold font-display">Get Exclusive Deals</h3>
              <p className="text-white/70 mt-1">Subscribe for offers, new arrivals, and eye care tips</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input type="email" placeholder="Enter your email"
                className="px-5 py-3.5 rounded-l-xl w-full md:w-80 focus:outline-none text-[#0A0A3E] bg-white placeholder-[#9CA0B8]" />
              <button className="bg-[#0A0A3E] text-white px-6 py-3.5 rounded-r-xl hover:bg-[#12124F] font-semibold transition-colors flex items-center gap-2 btn-press">
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <svg width="32" height="32" viewBox="0 0 100 60" fill="none"><ellipse cx="25" cy="30" rx="20" ry="18" stroke="white" strokeWidth="4" fill="none" /><ellipse cx="75" cy="30" rx="20" ry="18" stroke="white" strokeWidth="4" fill="none" /><path d="M45 30 Q50 24 55 30" stroke="white" strokeWidth="4" fill="none" /><line x1="5" y1="30" x2="5" y2="18" stroke="white" strokeWidth="4" /><line x1="95" y1="30" x2="95" y2="18" stroke="white" strokeWidth="4" /></svg>
              <span className="text-2xl font-bold text-white font-display">DocLensBD</span>
            </div>
            <p className="text-white/40 mb-6 leading-relaxed text-sm">Your trusted destination for premium eyewear in Bangladesh. Quality frames, affordable prices, delivered to your door.</p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={18} />, label: 'Facebook' },
                { icon: <Instagram size={18} />, label: 'Instagram' },
                { icon: <Twitter size={18} />, label: 'Twitter' },
                { icon: <Youtube size={18} />, label: 'YouTube' },
              ].map((s, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#00C9D6] flex items-center justify-center text-white/50 hover:text-white transition-all" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 font-display">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/products?category=eyeglasses" className="text-white/50 hover:text-[#00C9D6] transition-colors text-sm hover:pl-1">Eyeglasses</Link></li>
              <li><Link to="/products?category=sunglasses" className="text-white/50 hover:text-[#00C9D6] transition-colors text-sm hover:pl-1">Sunglasses</Link></li>
              <li><Link to="/products?category=computer-glasses" className="text-white/50 hover:text-[#00C9D6] transition-colors text-sm hover:pl-1">Computer Glasses</Link></li>
              <li><Link to="/products?category=kids" className="text-white/50 hover:text-[#00C9D6] transition-colors text-sm hover:pl-1">Kids Glasses</Link></li>
              <li><Link to="/products" className="text-white/50 hover:text-[#00C9D6] transition-colors text-sm hover:pl-1">All Products</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 font-display">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-white/50 hover:text-[#00C9D6] transition-colors text-sm hover:pl-1">Contact Us</Link></li>
              <li><Link to="/about" className="text-white/50 hover:text-[#00C9D6] transition-colors text-sm hover:pl-1">About Us</Link></li>
              <li><Link to="/about" className="text-white/50 hover:text-[#00C9D6] transition-colors text-sm hover:pl-1">Shipping Info</Link></li>
              <li><Link to="/about" className="text-white/50 hover:text-[#00C9D6] transition-colors text-sm hover:pl-1">Returns & Exchange</Link></li>
              <li><Link to="/about" className="text-white/50 hover:text-[#00C9D6] transition-colors text-sm hover:pl-1">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 font-display">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#00C9D6] flex-shrink-0 mt-0.5" />
                <span className="text-white/50 text-sm">123 Gulshan Avenue, Dhaka 1212</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#00C9D6] flex-shrink-0" />
                <span className="text-white/50 text-sm">+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#00C9D6] flex-shrink-0" />
                <span className="text-white/50 text-sm">info@doclensbd.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>© {currentYear} DocLensBD. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/about" className="hover:text-[#00C9D6] transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-[#00C9D6] transition-colors">Terms of Service</Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/20">We Accept:</span>
              <span className="bg-white/10 text-white/60 px-2.5 py-1 rounded text-[10px] font-bold">bKash</span>
              <span className="bg-white/10 text-white/60 px-2.5 py-1 rounded text-[10px] font-bold">Nagad</span>
              <span className="bg-white/10 text-white/60 px-2.5 py-1 rounded text-[10px] font-bold">VISA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
