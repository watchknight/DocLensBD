import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#FFF1F2] flex items-center justify-center">
              <Heart size={20} className="text-[#F43F5E]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-[#0F172A]">My Wishlist</h1>
          </div>
          <p className="text-[#94A3B8] text-sm">
            {wishlistProducts.length === 0
              ? 'Your wishlist is empty'
              : `${wishlistProducts.length} item${wishlistProducts.length !== 1 ? 's' : ''} saved`
            }
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-[#F8FAFC] flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-[#CBD5E1]" />
            </div>
            <h2 className="text-xl font-display font-bold text-[#0F172A] mb-2">Nothing here yet</h2>
            <p className="text-[#94A3B8] mb-8 max-w-md mx-auto">Browse our collection and tap the heart icon on any frame you love. They'll appear here for easy access later.</p>
            <Link to="/products" className="btn-press inline-flex items-center gap-2 bg-[#0F172A] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#1E293B] transition-all text-sm">
              <ShoppingBag size={18} /> Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
