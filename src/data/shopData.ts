import type { Product, CartItem, ProductFilter } from '../types/shop';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'ספר: "הדרך אל האושר"',
    description: 'ספר מעורר השראה על מציאת האושר והמשמעות בחיים. כתוב בצורה יפה ומרגשת.',
    price: 89,
    originalPrice: 120,
    imageUrl: '/api/placeholder/300/400',
    category: 'ספרים',
    stock: 15,
    rating: 4.8,
    reviewCount: 156,
    isOnSale: true,
    tags: ['השראה', 'פסיכולוגיה', 'חיים טובים']
  },
  {
    id: '2',
    name: 'מחברת מעוצבת "פרחי ירושלים"',
    description: 'מחברת איכותית עם עיצוב מקורי של פרחים ירושלמיים. מושלמת לכתיבה יומית.',
    price: 45,
    imageUrl: '/api/placeholder/300/400',
    category: 'אקססוריז',
    stock: 8,
    rating: 4.5,
    reviewCount: 89,
    tags: ['כתיבה', 'עיצוב', 'מתנה']
  },
  {
    id: '3',
    name: 'חולצה "אוהבת ספרים"',
    description: 'חולצת כותנה איכותית עם הדפס מקורי לאוהבי ספרים. נוחה ויפה.',
    price: 85,
    imageUrl: '/api/placeholder/300/400',
    category: 'בגדים',
    stock: 12,
    rating: 4.3,
    reviewCount: 67,
    tags: ['אופנה', 'ספרות', 'כותנה']
  },
  {
    id: '4',
    name: 'שרשרת "אות ראשונה"',
    description: 'שרשרת עדינה עם תליון של האות הראשונה של השם. עשויה כסף 925.',
    price: 180,
    imageUrl: '/api/placeholder/300/400',
    category: 'תכשיטים',
    stock: 6,
    rating: 5.0,
    reviewCount: 34,
    tags: ['כסף', 'אישי', 'עדין']
  },
  {
    id: '5',
    name: 'סט מתנה "בוקר טוב"',
    description: 'סט מתנה הכולל ספל מעוצב, תה איכותי ושוקולד בלגי. אריזת מתנה מפוארת.',
    price: 120,
    imageUrl: '/api/placeholder/300/400',
    category: 'מתנות',
    stock: 20,
    rating: 4.7,
    reviewCount: 123,
    tags: ['מתנה', 'תה', 'שוקולד']
  },
  {
    id: '6',
    name: 'ציור מקורי "נוף ירושלים"',
    description: 'ציור מקורי בצבעי מים של נוף ירושלים. עבודת יד של אמן מקומי.',
    price: 350,
    imageUrl: '/api/placeholder/300/400',
    category: 'אמנות',
    stock: 3,
    rating: 4.9,
    reviewCount: 12,
    tags: ['מקורי', 'ציור', 'ירושלים']
  },
  {
    id: '7',
    name: 'ספר: "שירים לנשמה"',
    description: 'אוסף שירים מרגש ויפה הכתוב בעברית. מתאים לקריאה ולמתנה.',
    price: 65,
    originalPrice: 85,
    imageUrl: '/api/placeholder/300/400',
    category: 'ספרים',
    stock: 25,
    rating: 4.4,
    reviewCount: 98,
    isOnSale: true,
    tags: ['שירה', 'עברית', 'רגש']
  },
  {
    id: '8',
    name: 'תיק יד "אלגנטי"',
    description: 'תיק יד מעור איכותי בצבע חום קלאסי. מתאים לכל אירוע.',
    price: 280,
    imageUrl: '/api/placeholder/300/400',
    category: 'אקססוריז',
    stock: 7,
    rating: 4.6,
    reviewCount: 45,
    tags: ['עור', 'אלגנטי', 'קלאסי']
  }
];

// פונקציות עזר לניהול עגלת קניות
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

export const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

// פונקציות פילטור מוצרים
export const filterProducts = (products: Product[], filters: ProductFilter): Product[] => {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.priceRange) {
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;
    }
    if (filters.rating && product.rating < filters.rating) return false;
    if (filters.inStock && product.stock === 0) return false;
    if (filters.onSale && !product.isOnSale) return false;
    return true;
  });
};

export const sortProducts = (products: Product[], sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name'): Product[] => {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'he'));
    default:
      return sorted;
  }
};
