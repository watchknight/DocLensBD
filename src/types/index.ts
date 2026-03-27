export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: 'eyeglasses' | 'sunglasses' | 'computer-glasses' | 'kids' | 'reading';
  frameType: 'full-rim' | 'half-rim' | 'rimless';
  frameShape: 'rectangle' | 'round' | 'square' | 'aviator' | 'cat-eye' | 'wayfarer' | 'oval' | 'geometric';
  frameMaterial: 'metal' | 'acetate' | 'titanium' | 'plastic' | 'tr90' | 'wood';
  color: string;
  gender: 'men' | 'women' | 'unisex' | 'kids';
  images: string[];
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  frameWidth?: string;
  lensWidth?: number;
  bridgeWidth?: number;
  templeLength?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  lensType?: string;
  lensCoating?: string[];
}

export interface FilterState {
  category: string;
  frameType: string;
  frameShape: string;
  gender: string;
  priceRange: [number, number];
  sortBy: string;
  color: string;
  material: string;
}
