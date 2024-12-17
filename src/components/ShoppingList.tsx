import React from 'react';
import { Check, Trash2, Printer, Share2 } from 'lucide-react';
import { ShoppingListItem } from '../types';
import { printShoppingList, generateShoppingListEmail } from '../utils/shoppingList';

type Props = {
  items: ShoppingListItem[];
  onToggleItem: (index: number) => void;
  onRemoveItem: (index: number) => void;
};

export function ShoppingList({ items, onToggleItem, onRemoveItem }: Props) {
  const handlePrint = () => {
    printShoppingList(items);
  };

  const handleShare = () => {
    window.location.href = generateShoppingListEmail(items);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Liste de courses</h2>
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Partager
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Imprimer
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleItem(index)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                  ${item.checked ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-500'}`}
              >
                {item.checked && <Check className="w-4 h-4 text-white" />}
              </button>
              <span className={`transition-all ${item.checked ? 'line-through text-gray-500' : ''}`}>
                {item.quantity} {item.unit} {item.name}
              </span>
            </div>
            <button
              onClick={() => onRemoveItem(index)}
              className="text-red-500 hover:text-red-700 transition-colors p-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            Votre liste de courses est vide
          </p>
        )}
      </div>
    </div>
  );
}