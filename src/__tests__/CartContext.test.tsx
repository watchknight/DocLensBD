import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';
import React from 'react';

// Mock the localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock product
const mockProduct: any = {
  id: 1,
  name: 'Test Glasses',
  price: 1500,
  category: 'eyeglasses',
  images: ['test.png'],
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('should initialize with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getCartTotal()).toBe(0);
    expect(result.current.getCartCount()).toBe(0);
  });

  it('should add a basic product to cart without customizations', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].product.name).toBe('Test Glasses');
    expect(result.current.getCartCount()).toBe(1);
    expect(result.current.getCartTotal()).toBe(1500); // 1500 base price
  });

  it('should group identical products without customizations', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
    expect(result.current.getCartTotal()).toBe(3000);
  });

  it('should separate products with different customizations', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      // First pair: Single Vision + Anti-Reflective
      result.current.addToCart(mockProduct, 'single-vision', ['anti-reflective']);
      // Second pair: Progressive + Blue Light
      result.current.addToCart(mockProduct, 'progressive', ['blue-light']);
    });

    expect(result.current.cartItems.length).toBe(2);
    expect(result.current.cartItems[0].lensType).toBe('single-vision');
    expect(result.current.cartItems[1].lensType).toBe('progressive');
  });

  it('should update quantity correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    const itemId = result.current.cartItems[0].id;

    act(() => {
      result.current.updateQuantity(itemId, 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);
    expect(result.current.getCartTotal()).toBe(7500);
  });

  it('should remove item when quantity is set to less than 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    const itemId = result.current.cartItems[0].id;

    act(() => {
      result.current.updateQuantity(itemId, 0);
    });

    expect(result.current.cartItems.length).toBe(0);
  });

  it('should calculate lens and coating prices correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      // Single Vision (500) + Anti-Reflective (300) = 800 added to 1500 base = 2300
      result.current.addToCart(mockProduct, 'single-vision', ['anti-reflective']);
    });

    const item = result.current.cartItems[0];
    expect(result.current.getItemLensPrice(item)).toBe(800);
    expect(result.current.getCartTotal()).toBe(2300);
  });

  it('should persist cart to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'doclens-cart',
      expect.any(String)
    );
  });
});
