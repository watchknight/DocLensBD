import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps { product: Product; }

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="product-card group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <span className="bg-[#00BAC6] text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>}
          {discount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">{discount}% OFF</span>}
          {product.isBestSeller && <span className="bg-[#000042] text-white text-xs font-bold px-3 py-1 rounded-full">BESTSELLER</span>}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-white p-2 rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 transition-colors">
            <Heart size={18} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button onClick={() => addToCart(product)}
            className="w-full bg-white text-[#000042] py-2.5 rounded-xl font-semibold hover:bg-[#00BAC6] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm">
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <p className="text-xs text-[#00BAC6] font-semibold uppercase tracking-wider">{product.brand}</p>
          <h3 className="text-[#000042] font-semibold mt-1 hover:text-[#00BAC6] transition-colors line-clamp-2 text-sm">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs gap-0.5">
            <span className="font-bold">{product.rating}</span> <Star size={10} fill="white" />
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-[#000042]">৳{product.price.toLocaleString()}</span>
          {product.originalPrice && <span className="text-sm text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</span>}
        </div>
        {product.frameWidth && <p className="text-xs text-gray-400 mt-1">Size: {product.frameWidth}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
