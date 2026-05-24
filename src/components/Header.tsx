import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#0F172A] text-white">
        <div className="container mx-auto flex justify-between items-center text-[11px] py-1.5 px-4">
          <span className="text-white/50">Free Delivery on Orders Above ৳3000</span>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-white/80 transition-colors text-white/50">Store Locator</Link>
            <Link to="/about" className="hover:text-white/80 transition-colors text-white/50">About</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <svg width="32" height="32" viewBox="0 0 100 60" fill="none">
                <ellipse cx="25" cy="30" rx="20" ry="18" stroke="#0F172A" strokeWidth="4" fill="none" />
                <ellipse cx="75" cy="30" rx="20" ry="18" stroke="#0F172A" strokeWidth="4" fill="none" />
                <path d="M45 30 Q50 24 55 30" stroke="#0F172A" strokeWidth="4" fill="none" strokeLinecap="round" />
                <line x1="5" y1="30" x2="5" y2="18" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                <line x1="95" y1="30" x2="95" y2="18" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <div>
                <span className="text-lg font-bold text-[#0F172A] font-display tracking-tight">DocLens</span>
                <span className="text-[9px] text-[#6366F1] block font-bold tracking-[0.15em] uppercase -mt-0.5">Bangladesh</span>
              </div>
            </Link>

            {/* Nav */}
            <nav className="hidden lg:flex items-center">
              <ul className="flex items-center">
                <li><Link to="/products?category=eyeglasses" className="px-3.5 py-2 text-[#0F172A] font-medium text-sm hover:text-[#6366F1] transition-colors">Eyeglasses</Link></li>
                <li><Link to="/products?category=sunglasses" className="px-3.5 py-2 text-[#0F172A] font-medium text-sm hover:text-[#6366F1] transition-colors">Sunglasses</Link></li>
                <li><Link to="/products?category=computer-glasses" className="px-3.5 py-2 text-[#0F172A] font-medium text-sm hover:text-[#6366F1] transition-colors">Computer</Link></li>
                <li><Link to="/products?category=kids" className="px-3.5 py-2 text-[#0F172A] font-medium text-sm hover:text-[#6366F1] transition-colors">Kids</Link></li>
                <li><Link to="/products" className="px-3.5 py-2 text-[#F43F5E] font-bold text-sm">Sale</Link></li>
              </ul>
            </nav>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm">
              <div className="relative w-full">
                <input type="text" placeholder="Search frames..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-[#F1F5F9] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 focus:bg-white transition-all text-sm" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Link to="/wishlist" className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-[#475569] hover:text-[#F43F5E] hover:bg-[#FFF1F2] transition-all relative" aria-label="Wishlist">
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#F43F5E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              {user ? (
                <div className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-[#475569] hover:bg-[#F1F5F9] transition-all relative group cursor-pointer">
                  <User size={18} />
                  <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-xl border border-[#E2E8F0] p-1.5 hidden group-hover:block min-w-[180px] z-50">
                    <div className="px-3 py-2 text-[10px] text-[#94A3B8] border-b border-[#E2E8F0] mb-1 truncate">{user.email}</div>

                    <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-[#F43F5E] hover:bg-[#FFF1F2] rounded-lg transition-colors font-medium">Log Out</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-[#475569] hover:bg-[#F1F5F9] transition-all" aria-label="Sign In">
                  <User size={18} />
                </Link>
              )}
              <Link to="/cart" className="flex items-center justify-center w-9 h-9 rounded-lg text-[#475569] hover:bg-[#F1F5F9] transition-all relative" aria-label="Cart">
                <ShoppingCart size={18} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#0F172A] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {getCartCount()}
                  </span>
                )}
              </Link>
              <button className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-[#0F172A] hover:bg-[#F1F5F9] transition-all" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-[#E2E8F0] bg-white">
            <div className="container mx-auto px-4 py-3 space-y-0.5">
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 pl-10 bg-[#F1F5F9] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 text-sm" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                </div>
              </form>
              {[
                { to: '/products?category=eyeglasses', label: 'Eyeglasses' },
                { to: '/products?category=sunglasses', label: 'Sunglasses' },
                { to: '/products?category=computer-glasses', label: 'Computer Glasses' },
                { to: '/products?category=kids', label: 'Kids' },
                { to: '/wishlist', label: '♥ Wishlist' },
                { to: '/products', label: 'Sale 🔥', className: 'text-[#F43F5E] font-bold' },
              ].map((item, i) => (
                <Link key={i} to={item.to} onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 text-[#0F172A] font-medium rounded-lg hover:bg-[#F1F5F9] transition-colors ${item.className || ''}`}>
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-[#E2E8F0] pt-3 mt-3 flex gap-2">
                {user ? (
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex-1 px-4 py-2.5 text-[#F43F5E] font-medium rounded-lg bg-[#FFF1F2] text-center text-sm">Log Out</button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 px-4 py-2.5 text-white font-medium rounded-lg bg-[#0F172A] text-center text-sm">Sign In</Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex-1 px-4 py-2.5 text-[#0F172A] font-medium rounded-lg border border-[#E2E8F0] text-center text-sm">Register</Link>
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
