import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { lensTypes, lensCoatings } from '../data/products';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, lensType?: string, lensCoating?: string[]) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getItemLensPrice: (item: CartItem) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Generate a unique ID for each cart item
let cartItemIdCounter = 0;
const generateCartItemId = (): string => {
  cartItemIdCounter += 1;
  return `cart-${Date.now()}-${cartItemIdCounter}`;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('doclens-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all items have IDs (migration from old format)
        return parsed.map((item: CartItem) => ({
          ...item,
          id: item.id || generateCartItemId(),
        }));
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('doclens-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const getItemLensPrice = (item: CartItem): number => {
    let price = 0;
    if (item.lensType) {
      const lens = lensTypes.find(l => l.id === item.lensType);
      if (lens) price += lens.price;
    }
    if (item.lensCoating && item.lensCoating.length > 0) {
      item.lensCoating.forEach(coatingId => {
        const coating = lensCoatings.find(c => c.id === coatingId);
        if (coating) price += coating.price;
      });
    }
    return price;
  };

  const addToCart = (product: Product, lensType?: string, lensCoating?: string[]) => {
    setCartItems(prev => {
      const hasCustomization = lensType || (lensCoating && lensCoating.length > 0);

      if (!hasCustomization) {
        // If no customization, look for an existing uncustomized item to increment
        const existing = prev.find(item => item.product.id === product.id && !item.lensType && (!item.lensCoating || item.lensCoating.length === 0));
        if (existing) {
          return prev.map(item =>
            item.id === existing.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
      }
      
      return [...prev, {
        id: generateCartItemId(),
        product,
        quantity: 1,
        lensType,
        lensCoating
      }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const lensPrice = getItemLensPrice(item);
      return total + (item.product.price + lensPrice) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount, getItemLensPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
