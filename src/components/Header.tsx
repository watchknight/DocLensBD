import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, Phone, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

const megaMenuData: Record<string, { title: string; links: { label: string; to: string }[] }[]> = {
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

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar — Lenskart Deep Blue */}
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
          <Link to="/" className="flex items-center gap-2">
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
          <div className="flex items-center gap-5">
            <Link to="/products" className="hidden md:flex flex-col items-center text-[#000042]/70 hover:text-[#000042] transition-colors relative">
              <Heart size={22} />
              <span className="text-[10px] font-medium mt-0.5">Wishlist</span>
            </Link>
            <Link to="/about" className="hidden md:flex flex-col items-center text-[#000042]/70 hover:text-[#000042] transition-colors">
              <User size={22} />
              <span className="text-[10px] font-medium mt-0.5">Sign In</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-[#000042]/70 hover:text-[#000042] transition-colors relative">
              <ShoppingCart size={22} />
              <span className="text-[10px] font-medium mt-0.5">Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#00BAC6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button className="md:hidden text-[#000042]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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

      {/* Navigation — Lenskart Style */}
      <nav className="border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <ul className={`md:flex items-center justify-center gap-0 ${isMenuOpen ? 'block' : 'hidden md:flex'}`}>
            {/* Eyeglasses with Mega Menu */}
            <li className="nav-item relative group"
              onMouseEnter={() => setActiveMega('eyeglasses')}
              onMouseLeave={() => setActiveMega(null)}>
              <Link to="/products?category=eyeglasses"
                className="flex items-center gap-1 px-5 py-4 text-[#000042] font-semibold text-sm tracking-wide hover:text-[#00BAC6] transition-colors uppercase">
                Eyeglasses <ChevronDown size={14} className="opacity-50" />
              </Link>
              {activeMega === 'eyeglasses' && (
                <div className="mega-menu absolute left-1/2 -translate-x-1/2 top-full w-[700px] bg-white rounded-b-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-4 gap-6 z-50" style={{opacity:1,visibility:'visible',transform:'translateY(0)'}}>
                  {megaMenuData.eyeglasses.map((col, i) => (
                    <div key={i}>
                      <h4 className="font-bold text-[#000042] text-xs uppercase tracking-wider mb-3">{col.title}</h4>
                      <ul className="space-y-2">
                        {col.links.map((link, j) => (
                          <li key={j}>
                            <Link to={link.to} className="text-sm text-gray-600 hover:text-[#00BAC6] hover:pl-1 transition-all" onClick={() => setActiveMega(null)}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>

            {/* Sunglasses with Mega Menu */}
            <li className="nav-item relative group"
              onMouseEnter={() => setActiveMega('sunglasses')}
              onMouseLeave={() => setActiveMega(null)}>
              <Link to="/products?category=sunglasses"
                className="flex items-center gap-1 px-5 py-4 text-[#000042] font-semibold text-sm tracking-wide hover:text-[#00BAC6] transition-colors uppercase">
                Sunglasses <ChevronDown size={14} className="opacity-50" />
              </Link>
              {activeMega === 'sunglasses' && (
                <div className="mega-menu absolute left-1/2 -translate-x-1/2 top-full w-[600px] bg-white rounded-b-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-4 gap-6 z-50" style={{opacity:1,visibility:'visible',transform:'translateY(0)'}}>
                  {megaMenuData.sunglasses.map((col, i) => (
                    <div key={i}>
                      <h4 className="font-bold text-[#000042] text-xs uppercase tracking-wider mb-3">{col.title}</h4>
                      <ul className="space-y-2">
                        {col.links.map((link, j) => (
                          <li key={j}>
                            <Link to={link.to} className="text-sm text-gray-600 hover:text-[#00BAC6] hover:pl-1 transition-all" onClick={() => setActiveMega(null)}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
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
