import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

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
      <div className="bg-white rounded-b-2xl shadow-lg border border-[#E8EAF2] p-6 grid grid-cols-4 gap-6 min-w-[600px]"
           style={{ animation: 'fadeIn 0.2s ease-out' }}>
        {columns.map((col, i) => (
          <div key={i}>
            <h4 className="font-bold text-[#0A0A3E] text-xs uppercase tracking-wider mb-3 font-display">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link, j) => (
                <li key={j}>
                  <Link to={link.to} className="text-sm text-[#5A5E7A] hover:text-[#00C9D6] hover:pl-1 transition-all block" onClick={onClose}>
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
  const { getWishlistCount } = useWishlist();
  const wishlistCount = getWishlistCount();
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
    <header className="sticky top-0 z-50">
      {/* Slim Promo Ticker */}
      <div className="bg-[#0A0A3E] text-white overflow-hidden">
        <div className="container mx-auto flex justify-between items-center text-xs py-2 px-4">
          <span className="text-white/70">Free Delivery on Orders Above ৳3000 ✨</span>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-[#00C9D6] transition-colors text-white/70">Store Locator</Link>
            <Link to="/about" className="hover:text-[#00C9D6] transition-colors text-white/70">About Us</Link>
          </div>
        </div>
      </div>

      {/* Main Header — Combined Logo + Search + Nav */}
      <div className="bg-white shadow-sm border-b border-[#E8EAF2]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <svg width="36" height="36" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="25" cy="30" rx="20" ry="18" stroke="#0A0A3E" strokeWidth="4" fill="none" />
                <ellipse cx="75" cy="30" rx="20" ry="18" stroke="#0A0A3E" strokeWidth="4" fill="none" />
                <path d="M45 30 Q50 24 55 30" stroke="#0A0A3E" strokeWidth="4" fill="none" strokeLinecap="round" />
                <line x1="5" y1="30" x2="5" y2="18" stroke="#0A0A3E" strokeWidth="4" strokeLinecap="round" />
                <line x1="95" y1="30" x2="95" y2="18" stroke="#0A0A3E" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <div>
                <span className="text-xl font-bold text-[#0A0A3E] font-display tracking-tight">DocLens</span>
                <span className="text-[10px] text-[#00C9D6] block font-semibold tracking-widest uppercase">BD</span>
              </div>
            </Link>

            {/* Navigation — Desktop inline */}
            <nav className="hidden lg:flex items-center">
              <ul className="flex items-center gap-0">
                <li className="relative"
                  onMouseEnter={() => handleMegaEnter('eyeglasses')}
                  onMouseLeave={handleMegaLeave}>
                  <Link to="/products?category=eyeglasses"
                    className="flex items-center gap-1 px-4 py-2 text-[#0A0A3E] font-medium text-sm hover:text-[#00C9D6] transition-colors">
                    Eyeglasses <ChevronDown size={14} className={`opacity-40 transition-transform ${activeMega === 'eyeglasses' ? 'rotate-180' : ''}`} />
                  </Link>
                  {activeMega === 'eyeglasses' && (
                    <MegaMenu menuKey="eyeglasses" columns={megaMenuData.eyeglasses} onClose={closeMega} />
                  )}
                </li>
                <li className="relative"
                  onMouseEnter={() => handleMegaEnter('sunglasses')}
                  onMouseLeave={handleMegaLeave}>
                  <Link to="/products?category=sunglasses"
                    className="flex items-center gap-1 px-4 py-2 text-[#0A0A3E] font-medium text-sm hover:text-[#00C9D6] transition-colors">
                    Sunglasses <ChevronDown size={14} className={`opacity-40 transition-transform ${activeMega === 'sunglasses' ? 'rotate-180' : ''}`} />
                  </Link>
                  {activeMega === 'sunglasses' && (
                    <MegaMenu menuKey="sunglasses" columns={megaMenuData.sunglasses} onClose={closeMega} />
                  )}
                </li>
                <li><Link to="/products?category=computer-glasses" className="block px-4 py-2 text-[#0A0A3E] font-medium text-sm hover:text-[#00C9D6] transition-colors">Computer Glasses</Link></li>
                <li><Link to="/products?category=kids" className="block px-4 py-2 text-[#0A0A3E] font-medium text-sm hover:text-[#00C9D6] transition-colors">Kids</Link></li>
                <li><Link to="/contact" className="block px-4 py-2 text-[#0A0A3E] font-medium text-sm hover:text-[#00C9D6] transition-colors">Stores</Link></li>
                <li><Link to="/products" className="block px-4 py-2 text-[#FF6B8A] font-bold text-sm hover:text-[#e85578] transition-colors">Sale 🔥</Link></li>
              </ul>
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search eyeglasses, sunglasses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pl-11 bg-[#F0F2F8] border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[#00C9D6]/30 focus:bg-white transition-all text-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA0B8]" size={18} />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Link to="/products" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-[#5A5E7A] hover:text-[#FF6B8A] hover:bg-[#FFE0E8] transition-all relative" aria-label="Wishlist">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#FF6B8A] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              {user ? (
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-[#00C9D6] hover:bg-[#00C9D6]/10 transition-all relative group cursor-pointer">
                  <User size={20} />
                  <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-xl border border-[#E8EAF2] p-2 hidden group-hover:block min-w-[200px] z-50">
                    <div className="px-3 py-2 text-xs text-[#9CA0B8] border-b border-[#E8EAF2] mb-1 truncate">{user.email}</div>
                    {profile?.role === 'admin' && (
                      <Link to="/admin/dashboard" className="block px-3 py-2 text-sm text-[#0A0A3E] hover:bg-[#F0F2F8] rounded-lg transition-colors font-medium">Admin Panel</Link>
                    )}
                    <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-[#FF6B8A] hover:bg-[#FFE0E8] rounded-lg transition-colors font-medium">Log Out</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-[#5A5E7A] hover:text-[#0A0A3E] hover:bg-[#F0F2F8] transition-all" aria-label="Sign In">
                  <User size={20} />
                </Link>
              )}
              <Link to="/cart" className="flex items-center justify-center w-10 h-10 rounded-full text-[#5A5E7A] hover:text-[#0A0A3E] hover:bg-[#F0F2F8] transition-all relative" aria-label="Cart">
                <ShoppingCart size={20} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#FF6B8A] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {getCartCount()}
                  </span>
                )}
              </Link>
              <button className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-[#0A0A3E] hover:bg-[#F0F2F8] transition-all" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="relative">
              <input type="text" placeholder="Search..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 bg-[#F0F2F8] border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[#00C9D6]/30 text-sm" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA0B8]" size={18} />
            </div>
          </form>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-[#E8EAF2] bg-white" style={{ animation: 'fadeIn 0.2s ease-out' }}>
            <div className="container mx-auto px-4 py-4 space-y-1">
              <Link to="/products?category=eyeglasses" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[#0A0A3E] font-medium rounded-xl hover:bg-[#F0F2F8] transition-colors">Eyeglasses</Link>
              <Link to="/products?category=sunglasses" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[#0A0A3E] font-medium rounded-xl hover:bg-[#F0F2F8] transition-colors">Sunglasses</Link>
              <Link to="/products?category=computer-glasses" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[#0A0A3E] font-medium rounded-xl hover:bg-[#F0F2F8] transition-colors">Computer Glasses</Link>
              <Link to="/products?category=kids" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[#0A0A3E] font-medium rounded-xl hover:bg-[#F0F2F8] transition-colors">Kids</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[#0A0A3E] font-medium rounded-xl hover:bg-[#F0F2F8] transition-colors">Stores</Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[#FF6B8A] font-bold rounded-xl hover:bg-[#FFE0E8] transition-colors">Sale 🔥</Link>
              <div className="border-t border-[#E8EAF2] pt-3 mt-3 flex gap-2">
                {user ? (
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex-1 px-4 py-3 text-[#FF6B8A] font-medium rounded-xl bg-[#FFE0E8] text-center text-sm">Log Out</button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 px-4 py-3 text-white font-medium rounded-xl bg-[#0A0A3E] text-center text-sm">Sign In</Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex-1 px-4 py-3 text-[#0A0A3E] font-medium rounded-xl border border-[#E8EAF2] text-center text-sm">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
