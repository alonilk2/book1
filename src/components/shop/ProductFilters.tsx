import React from 'react';
import { Filter, X } from 'lucide-react';
import type { ProductCategory, ProductFilter } from '../../types/shop';

interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilter;
  onFiltersChange: (filters: ProductFilter) => void;
  onClearFilters: () => void;
}

const categories: ProductCategory[] = [
  'ספרים',
  'אקססוריז', 
  'בגדים',
  'תכשיטים',
  'מתנות',
  'אמנות'
];

const ProductFilters: React.FC<ProductFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  if (!isOpen) return null;

  const handleCategoryChange = (category: ProductCategory | undefined) => {
    onFiltersChange({ ...filters, category });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFiltersChange({ 
      ...filters, 
      priceRange: { min, max }
    });
  };

  const handleRatingChange = (rating: number | undefined) => {
    onFiltersChange({ ...filters, rating });
  };

  const handleStockChange = (inStock: boolean | undefined) => {
    onFiltersChange({ ...filters, inStock });
  };

  const handleSaleChange = (onSale: boolean | undefined) => {
    onFiltersChange({ ...filters, onSale });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden md:relative md:inset-auto">
      {/* Mobile Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 md:hidden" onClick={onClose} />
      
      {/* Filters Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl md:relative md:w-auto md:shadow-none md:bg-transparent">
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b md:border-b-0">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Filter className="w-5 h-5" />
              סינון מוצרים
            </h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full md:hidden"
              title="סגור פילטרים"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* קטגוריות */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">קטגוריה</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={!filters.category}
                    onChange={() => handleCategoryChange(undefined)}
                    className="ml-2"
                  />
                  הכל
                </label>
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category}
                      onChange={() => handleCategoryChange(category)}
                      className="ml-2"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            {/* טווח מחירים */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">טווח מחירים</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={!filters.priceRange}
                    onChange={() => onFiltersChange({ ...filters, priceRange: undefined })}
                    className="ml-2"
                  />
                  הכל
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange?.min === 0 && filters.priceRange?.max === 50}
                    onChange={() => handlePriceRangeChange(0, 50)}
                    className="ml-2"
                  />
                  עד ₪50
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange?.min === 50 && filters.priceRange?.max === 150}
                    onChange={() => handlePriceRangeChange(50, 150)}
                    className="ml-2"
                  />
                  ₪50 - ₪150
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange?.min === 150 && filters.priceRange?.max === 300}
                    onChange={() => handlePriceRangeChange(150, 300)}
                    className="ml-2"
                  />
                  ₪150 - ₪300
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange?.min === 300 && filters.priceRange?.max === 1000}
                    onChange={() => handlePriceRangeChange(300, 1000)}
                    className="ml-2"
                  />
                  מעל ₪300
                </label>
              </div>
            </div>

            {/* דירוג */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">דירוג מינימלי</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={!filters.rating}
                    onChange={() => handleRatingChange(undefined)}
                    className="ml-2"
                  />
                  הכל
                </label>
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleRatingChange(rating)}
                      className="ml-2"
                    />
                    {rating} כוכבים ומעלה
                  </label>
                ))}
              </div>
            </div>

            {/* זמינות במלאי */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">זמינות</h4>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock || false}
                  onChange={(e) => handleStockChange(e.target.checked || undefined)}
                  className="ml-2"
                />
                רק מוצרים זמינים
              </label>
            </div>

            {/* מוצרים במבצע */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">מבצעים</h4>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.onSale || false}
                  onChange={(e) => handleSaleChange(e.target.checked || undefined)}
                  className="ml-2"
                />
                רק מוצרים במבצע
              </label>
            </div>

            {/* כפתורי פעולה */}
            <div className="pt-4 border-t">
              <button
                onClick={onClearFilters}
                className="w-full py-2 px-4 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                נקה פילטרים
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
