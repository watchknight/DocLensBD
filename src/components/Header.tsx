import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, Phone, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface MegaMenuColumn {
  title: string;
  links: { label: string; to: string }[];
}

const megaMenuData: Record<string, MegaMenuColumn[]> = {
  eyeglasses: [
    { title: 'By Gender', links: [
      { label: 'Men', to: '/products?category=eyeglasses&gender=men' },
      { label: 'Women', to: '/products?category=eyeglasses&gender=women' },
      { label: 'Kids', to: '/products?category=kids' },
      { label: 'Unisex', to: '/products?category=eyeglasses&gender=unisex' },
    ]},
    { title: 'By Frame Type', links: [
      { label: 'Full Rim', to: '/products?category=eyeglasses&frameType=full-rim' },
      { label: 'Half Rim', to: '/products?category=eyeglasses&frameType=half-rim' },
      { label: 'Rimless', to: '/products?category=eyeglasses&frameType=rimless' },
    ]},
    { title: 'By Shape', links: [
      { label: 'Rectangle', to: '/products?frameShape=rectangle' },
      { label: 'Round', to: '/products?frameShape=round' },
      { label: 'Cat Eye', to: '/products?frameShape=cat-eye' },
      { label: 'Aviator', to: '/products?frameShape=aviator' },
      { label: 'Geometric', to: '/products?frameShape=geometric' },
    ]},
    { title: 'Collections', links: [
      { label: '🔥 Bestsellers', to: '/products?category=eyeglasses' },
      { label: '✨ New Arrivals', to: '/products?category=eyeglasses' },
      { label: '💰 Under ৳2000', to: '/products?category=eyeglasses' },
      { label: '🏷️ On Sale', to: '/products?category=eyeglasses' },
    ]},
  ],
  sunglasses: [
    { title: 'By Gender', links: [
      { label: 'Men', to: '/products?category=sunglasses&gender=men' },
      { label: 'Women', to: '/products?category=sunglasses&gender=women' },
      { label: 'Unisex', to: '/products?category=sunglasses&gender=unisex' },
    ]},
    { title: 'By Shape', links: [
      { label: 'Aviator', to: '/products?category=sunglasses&frameShape=aviator' },
      { label: 'Wayfarer', to: '/products?category=sunglasses&frameShape=wayfarer' },
      { label: 'Round', to: '/products?category=sunglasses&frameShape=round' },
      { label: 'Square', to: '/products?category=sunglasses&frameShape=square' },
    ]},
    { title: 'By Feature', links: [
      { label: 'Polarized', to: '/products?category=sunglasses' },
      { label: 'Mirror Lens', to: '/products?category=sunglasses' },
      { label: 'Gradient Lens', to: '/products?category=sunglasses' },
    ]},
    { title: 'Collections', links: [
      { label: '🔥 Bestsellers', to: '/products?category=sunglasses' },
      { label: '🏖️ Beach Ready', to: '/products?category=sunglasses' },
      { label: '🏃 Sports', to: '/products?category=sunglasses' },
    ]},
  ],
};

const MegaMenu: React.FC<{ menuKey: string; columns: MegaMenuColumn[]; onClose: () => void }> = ({ columns, onClose }) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-0 z-50">
      <div className="bg-white rounded-b-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-4 gap-6 min-w-[600px]">
        {columns.map((col, i) => (
          <div key={i}>
            <h4 className="font-bold text-[#000042] text-xs uppercase tracking-wider mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link, j) => (
                <li key={j}>
                  <Link to={link.to} className="text-sm text-gray-600 hover:text-[#00BAC6] hover:pl-1 transition-all block" onClick={onClose}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { getCartCount } = useCart();
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleMegaEnter = useCallback((key: string) => {
    if (megaTimeoutRef.current) {
      clearTimeout(megaTimeoutRef.current);
      megaTimeoutRef.current = null;
    }
    setActiveMega(key);
  }, []);

  const handleMegaLeave = useCallback(() => {
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 150);
  }, []);

  const closeMega = useCallback(() => {
    setActiveMega(null);
    if (megaTimeoutRef.current) {
      clearTimeout(megaTimeoutRef.current);
      megaTimeoutRef.current = null;
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-[#000042] text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={14} />
              +880 1234-567890
            </span>
            <span className="hidden md:block">Free Delivery on Orders Above ৳3000</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-[#00BAC6] transition-colors">Store Locator</Link>
            <Link to="/about" className="hover:text-[#00BAC6] transition-colors">About Us</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <svg width="40" height="40" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="25" cy="30" rx="20" ry="18" stroke="#000042" strokeWidth="4" fill="none" />
              <ellipse cx="75" cy="30" rx="20" ry="18" stroke="#000042" strokeWidth="4" fill="none" />
              <path d="M45 30 Q50 24 55 30" stroke="#000042" strokeWidth="4" fill="none" strokeLinecap="round" />
              <line x1="5" y1="30" x2="5" y2="18" stroke="#000042" strokeWidth="4" strokeLinecap="round" />
              <line x1="95" y1="30" x2="95" y2="18" stroke="#000042" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div>
              <span className="text-2xl font-bold text-[#000042]">DocLens</span>
              <span className="text-xs text-[#00BAC6] block font-semibold tracking-wider">BD</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search eyeglasses, sunglasses, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border-2 border-[#000042]/20 rounded-full focus:outline-none focus:border-[#000042] focus:ring-2 focus:ring-[#000042]/10 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#000042]/40" size={20} />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <Link to="/products" className="hidden md:flex flex-col items-center text-[#000042]/70 hover:text-[#000042] transition-colors relative">
              <Heart size={22} />
              <span className="text-[10px] font-medium mt-0.5">Wishlist</span>
            </Link>
            {user ? (
              <div className="hidden md:flex flex-col items-center text-[#000042]/70 hover:text-[#000042] transition-colors relative group cursor-pointer">
                <User size={22} className="text-[#00BAC6]" />
                <span className="text-[10px] font-medium mt-0.5 truncate max-w-[50px]">{profile?.name?.split(' ')[0] || 'Profile'}</span>
                <div className="absolute top-full right-0 mt-5 bg-white shadow-xl rounded-xl border border-gray-100 p-2 hidden group-hover:block min-w-[200px] z-50">
                  <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100 mb-1 truncate">{user.email}</div>
                  <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">Log Out</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex flex-col items-center text-[#000042]/70 hover:text-[#000042] transition-colors">
                <User size={22} />
                <span className="text-[10px] font-medium mt-0.5">Sign In</span>
              </Link>
            )}
            <Link to="/cart" className="flex flex-col items-center text-[#000042]/70 hover:text-[#000042] transition-colors relative">
              <ShoppingCart size={22} />
              <span className="text-[10px] font-medium mt-0.5">Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#00BAC6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button className="md:hidden text-[#000042]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-3">
          <div className="relative">
            <input type="text" placeholder="Search..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#000042]" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <ul className={`md:flex items-center justify-center gap-0 ${isMenuOpen ? 'block' : 'hidden md:flex'}`}>
            {/* Eyeglasses with Mega Menu */}
            <li className="relative"
              onMouseEnter={() => handleMegaEnter('eyeglasses')}
              onMouseLeave={handleMegaLeave}>
              <Link to="/products?category=eyeglasses"
                className="flex items-center gap-1 px-5 py-4 text-[#000042] font-semibold text-sm tracking-wide hover:text-[#00BAC6] transition-colors uppercase">
                Eyeglasses <ChevronDown size={14} className={`opacity-50 transition-transform ${activeMega === 'eyeglasses' ? 'rotate-180' : ''}`} />
              </Link>
              {activeMega === 'eyeglasses' && (
                <MegaMenu menuKey="eyeglasses" columns={megaMenuData.eyeglasses} onClose={closeMega} />
              )}
            </li>

            {/* Sunglasses with Mega Menu */}
            <li className="relative"
              onMouseEnter={() => handleMegaEnter('sunglasses')}
              onMouseLeave={handleMegaLeave}>
              <Link to="/products?category=sunglasses"
                className="flex items-center gap-1 px-5 py-4 text-[#000042] font-semibold text-sm tracking-wide hover:text-[#00BAC6] transition-colors uppercase">
                Sunglasses <ChevronDown size={14} className={`opacity-50 transition-transform ${activeMega === 'sunglasses' ? 'rotate-180' : ''}`} />
              </Link>
              {activeMega === 'sunglasses' && (
                <MegaMenu menuKey="sunglasses" columns={megaMenuData.sunglasses} onClose={closeMega} />
              )}
            </li>

            <li><Link to="/products?category=computer-glasses" className="block px-5 py-4 text-[#000042] font-semibold text-sm tracking-wide hover:text-[#00BAC6] transition-colors uppercase">Computer Glasses</Link></li>
            <li><Link to="/products?category=kids" className="block px-5 py-4 text-[#000042] font-semibold text-sm tracking-wide hover:text-[#00BAC6] transition-colors uppercase">Kids</Link></li>
            <li><Link to="/contact" className="block px-5 py-4 text-[#000042] font-semibold text-sm tracking-wide hover:text-[#00BAC6] transition-colors uppercase">Stores</Link></li>
            <li><Link to="/products" className="block px-5 py-4 text-red-500 font-bold text-sm tracking-wide hover:text-red-600 transition-colors uppercase">Sale 🔥</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
