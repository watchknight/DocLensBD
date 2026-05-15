import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  toggleWishlist: () => {},
  isInWishlist: () => false,
  getWishlistCount: () => 0,
});

export const useWishlist = () => useContext(WishlistContext);

const STORAGE_KEY = 'doclensbd_wishlist';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = useCallback((productId: number) => {
    setWishlist(prev => prev.includes(productId) ? prev : [...prev, productId]);
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  }, []);

  const toggleWishlist = useCallback((productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback((productId: number) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  const getWishlistCount = useCallback(() => wishlist.length, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, getWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};
