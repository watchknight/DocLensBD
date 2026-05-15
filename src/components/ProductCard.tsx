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
      wishlisted ? 'Removed from wishlist' : 'Added to wishlist ❤️',
      wishlisted ? 'info' : 'success'
    );
  };

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden border border-[#E8EAF2] shadow-card">
      <div className="relative aspect-square overflow-hidden bg-[#F0F2F8]">
        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <span className="badge-new text-xs font-bold px-3 py-1 rounded-full">NEW</span>}
          {discount > 0 && <span className="badge-sale text-xs font-bold px-3 py-1 rounded-full">{discount}% OFF</span>}
          {product.isBestSeller && <span className="badge-bestseller text-xs font-bold px-3 py-1 rounded-full">BESTSELLER</span>}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full shadow-lg transition-all duration-300 btn-press ${
              wishlisted
                ? 'bg-[#FF6B8A] text-white scale-110'
                : 'bg-white text-[#9CA0B8] opacity-0 group-hover:opacity-100 hover:bg-[#FFE0E8] hover:text-[#FF6B8A]'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={wishlisted ? 'white' : 'none'} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button onClick={handleAddToCart}
            className="btn-press w-full bg-white text-[#0A0A3E] py-2.5 rounded-xl font-semibold hover:bg-[#00C9D6] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm">
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <p className="text-xs text-[#00C9D6] font-semibold uppercase tracking-wider">{product.brand}</p>
          <h3 className="text-[#0A0A3E] font-semibold mt-1 hover:text-[#00C9D6] transition-colors line-clamp-2 text-sm">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center bg-emerald-600 text-white px-1.5 py-0.5 rounded text-xs gap-0.5">
            <span className="font-bold">{product.rating}</span> <Star size={10} fill="white" />
          </div>
          <span className="text-xs text-[#9CA0B8]">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-[#0A0A3E] font-display">৳{product.price.toLocaleString()}</span>
          {product.originalPrice && <span className="text-sm text-[#9CA0B8] line-through">৳{product.originalPrice.toLocaleString()}</span>}
        </div>
        {product.frameWidth && <p className="text-xs text-[#9CA0B8] mt-1">Size: {product.frameWidth}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
