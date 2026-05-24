import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <svg width="28" height="28" viewBox="0 0 100 60" fill="none"><ellipse cx="25" cy="30" rx="20" ry="18" stroke="white" strokeWidth="4" fill="none" /><ellipse cx="75" cy="30" rx="20" ry="18" stroke="white" strokeWidth="4" fill="none" /><path d="M45 30 Q50 24 55 30" stroke="white" strokeWidth="4" fill="none" /><line x1="5" y1="30" x2="5" y2="18" stroke="white" strokeWidth="4" /><line x1="95" y1="30" x2="95" y2="18" stroke="white" strokeWidth="4" /></svg>
              <span className="text-xl font-bold font-display tracking-tight">DocLensBD</span>
            </div>
            <p className="text-white/30 mb-6 leading-relaxed text-sm">Premium eyewear for Bangladesh. Quality frames, honest prices, delivered to your doorstep.</p>
            <div className="flex gap-2">
              {[
                { icon: <Facebook size={16} />, label: 'Facebook' },
                { icon: <Instagram size={16} />, label: 'Instagram' },
                { icon: <Twitter size={16} />, label: 'Twitter' },
                { icon: <Youtube size={16} />, label: 'YouTube' },
              ].map((s, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#6366F1] flex items-center justify-center text-white/40 hover:text-white transition-all" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white/60">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Eyeglasses', to: '/products?category=eyeglasses' },
                { label: 'Sunglasses', to: '/products?category=sunglasses' },
                { label: 'Computer Glasses', to: '/products?category=computer-glasses' },
                { label: 'Kids Glasses', to: '/products?category=kids' },
                { label: 'All Products', to: '/products' },
              ].map((link, i) => (
                <li key={i}><Link to={link.to} className="text-white/30 hover:text-white transition-colors text-sm">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white/60">Support</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Contact Us', to: '/contact' },
                { label: 'About Us', to: '/about' },
                { label: 'Shipping Info', to: '/about' },
                { label: 'Returns & Exchange', to: '/about' },
                { label: 'Track Order', to: '/about' },
              ].map((link, i) => (
                <li key={i}><Link to={link.to} className="text-white/30 hover:text-white transition-colors text-sm">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white/60">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#6366F1] flex-shrink-0 mt-0.5" />
                <span className="text-white/30 text-sm">123 Gulshan Avenue, Dhaka 1212</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#6366F1] flex-shrink-0" />
                <span className="text-white/30 text-sm">+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#6366F1] flex-shrink-0" />
                <span className="text-white/30 text-sm">info@doclensbd.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/20">
            <p>© {currentYear} DocLensBD. All rights reserved.</p>
            <div className="flex gap-5">
              <Link to="/about" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            </div>
            <div className="flex items-center gap-1.5">
              <span>We Accept:</span>
              <span className="bg-white/5 text-white/40 px-2 py-0.5 rounded text-[10px] font-semibold">bKash</span>
              <span className="bg-white/5 text-white/40 px-2 py-0.5 rounded text-[10px] font-semibold">Nagad</span>
              <span className="bg-white/5 text-white/40 px-2 py-0.5 rounded text-[10px] font-semibold">VISA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
