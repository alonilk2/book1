export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: ProductCategory;
  stock: number;
  rating: number;
  reviewCount: number;
  isOnSale?: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShoppingCart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export type ProductCategory = 
  | 'ספרים'
  | 'אקססוריז'
  | 'בגדים'
  | 'תכשיטים'
  | 'מתנות'
  | 'אמנות';

export interface ProductFilter {
  category?: ProductCategory;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
}
