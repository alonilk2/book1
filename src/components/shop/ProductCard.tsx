import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../../types/shop';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onToggleFavorite,
  isFavorite = false 
}) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* תמונת המוצר */}
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        {/* תגיות הנחה ומועדפים */}
        <div className="absolute top-2 left-2 flex gap-2">
          {product.isOnSale && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{discount}%
            </span>
          )}
          {product.stock < 5 && product.stock > 0 && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              נותרו {product.stock}
            </span>
          )}
        </div>
        
        {onToggleFavorite && (
          <button 
            onClick={() => onToggleFavorite(product.id)}
            title={isFavorite ? 'הסר מהמועדפים' : 'הוסף למועדפים'}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
          >
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
          </button>
        )}
      </div>

      {/* תוכן הכרטיס */}
      <div className="p-4">
        {/* שם המוצר */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* תיאור */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* דירוג */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount} ביקורות)
          </span>
        </div>
        
        {/* מחיר */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ₪{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₪{product.originalPrice}
            </span>
          )}
        </div>
        
        {/* תגיות */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* כפתור הוספה לעגלה */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.stock === 0 ? 'אזל מהמלאי' : 'הוסף לעגלה'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
