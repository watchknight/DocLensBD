import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from './Toast';

interface ProductCardProps { product: Product; }

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast(`${product.name} added to cart`, 'success', {
      label: 'View Cart',
      onClick: () => { window.location.href = '/cart'; },
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      wishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      wishlisted ? 'info' : 'success'
    );
  };

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden border border-[#E2E8F0]">
      <div className="relative aspect-square overflow-hidden bg-[#F8FAFC]">
        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-4 sm:p-8 group-hover:scale-105 transition-transform duration-500 drop-shadow-xl mix-blend-multiply" loading="lazy" />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <span className="badge-new text-[10px] font-bold px-2.5 py-1 rounded-full">NEW</span>}
          {discount > 0 && <span className="badge-sale text-[10px] font-bold px-2.5 py-1 rounded-full">{discount}% OFF</span>}
          {product.isBestSeller && <span className="badge-bestseller text-[10px] font-bold px-2.5 py-1 rounded-full">BESTSELLER</span>}
        </div>
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 btn-press ${
            wishlisted
              ? 'bg-[#F43F5E] text-white'
              : 'bg-white/90 backdrop-blur-sm text-[#94A3B8] opacity-0 group-hover:opacity-100 hover:text-[#F43F5E]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={wishlisted ? 'white' : 'none'} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button onClick={handleAddToCart}
            className="btn-press w-full bg-white text-[#0F172A] py-2.5 rounded-lg font-semibold hover:bg-[#6366F1] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm">
            <ShoppingCart size={15} /> Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <p className="text-[10px] text-[#6366F1] font-semibold uppercase tracking-wider">{product.brand}</p>
          <h3 className="text-[#0F172A] font-medium mt-1 hover:text-[#6366F1] transition-colors line-clamp-1 text-sm">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={12} className={s <= Math.round(product.rating) ? 'text-[#F59E0B]' : 'text-[#E2E8F0]'} fill={s <= Math.round(product.rating) ? '#F59E0B' : 'none'} />
            ))}
          </div>
          <span className="text-[10px] text-[#94A3B8]">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-2.5">
          <span className="text-base font-bold text-[#0F172A] font-display">৳{product.price.toLocaleString()}</span>
          {product.originalPrice && <span className="text-xs text-[#94A3B8] line-through">৳{product.originalPrice.toLocaleString()}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
