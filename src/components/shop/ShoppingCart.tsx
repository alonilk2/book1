import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../../types/shop';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  total: number;
}

const ShoppingCartComponent: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  total
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Cart Panel */}
      <div className="absolute left-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              עגלת קניות
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="סגור עגלה"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">העגלה ריקה</p>
                <p className="text-sm">הוסף מוצרים כדי להתחיל קנייה</p>
              </div>
            ) : (
              <div className="p-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 py-4 border-b last:border-b-0">
                    {/* תמונת המוצר */}
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    {/* פרטי המוצר */}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        ₪{item.product.price} לפריט
                      </p>
                      
                      {/* בקרי כמות */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title="הפחת כמות"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title="הוסף כמות"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="mr-auto p-1 hover:bg-red-100 text-red-600 rounded"
                          title="הסר מהעגלה"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* מחיר כולל */}
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">
                        ₪{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">סה"כ:</span>
                <span className="text-xl font-bold text-blue-600">₪{total}</span>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                המשך לתשלום
              </button>
              
              <button 
                onClick={onClose}
                className="w-full mt-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                המשך קנייה
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;
