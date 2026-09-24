import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const { activeDetailItem, setActiveDetailItem, addToCart } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [sugarLevel, setSugarLevel] = useState<'Regular' | 'Less Sugar' | 'No Sugar'>('Regular');
  const [iceLevel, setIceLevel] = useState<'Normal Ice' | 'Less Ice' | 'No Ice'>('Normal Ice');
  const [instructions, setInstructions] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (activeDetailItem) {
      setQuantity(1);
      setSelectedSize('Regular');
      setSugarLevel('Regular');
      setIceLevel('Normal Ice');
      setInstructions('');
      setImageError(false);
    }
  }, [activeDetailItem]);

  if (!activeDetailItem) return null;

  const sizeExtra = selectedSize === 'Large' ? 80 : 0;
  const singlePrice = activeDetailItem.price + sizeExtra;
  const totalPrice = singlePrice * quantity;

  const handleAddAndClose = () => {
    addToCart(activeDetailItem, quantity, {
      size: selectedSize,
      sugar: sugarLevel,
      ice: iceLevel,
      instructions: instructions.trim(),
    });
    setActiveDetailItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveDetailItem(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-neutral-700 hover:text-neutral-900 hover:bg-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Media */}
        <div className="relative aspect-video w-full bg-neutral-100 overflow-hidden shrink-0">
          {!imageError ? (
            <img
              src={activeDetailItem.image}
              alt={activeDetailItem.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-200 p-6 text-center">
              <span className="font-display font-bold text-neutral-800 text-lg">
                {activeDetailItem.name}
              </span>
              <span className="text-xs text-neutral-500 mt-1">Jaidi Pan Shop · DHA Phase 4</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-300">
              Jaidi Pan Shop
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold">{activeDetailItem.name}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* Price & Description */}
          <div className="flex items-baseline justify-between gap-4 border-b border-neutral-100 pb-3">
            <div>
              <span className="text-xs text-neutral-500 uppercase tracking-wider block">Price</span>
              <span className="text-2xl font-extrabold text-[#D90000] tabular-nums">
                Rs. {singlePrice.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Prepared Fresh on Order</span>
            </div>
          </div>

          <p className="text-sm text-neutral-700 leading-relaxed">
            {activeDetailItem.description}
          </p>

          {/* Ingredients list if present */}
          {activeDetailItem.ingredients && activeDetailItem.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Ingredients & Highlights
              </h4>
              <div className="flex flex-wrap gap-1.5 text-xs text-neutral-600">
                {activeDetailItem.ingredients.map((ing, i) => (
                  <span key={i} className="inline-flex items-center gap-1">
                    <span>{ing}</span>
                    {i < activeDetailItem.ingredients!.length - 1 && (
                      <span className="text-neutral-300">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Customization: Size */}
          <div>
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Select Size
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedSize('Regular')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  selectedSize === 'Regular'
                    ? 'border-[#D90000] bg-red-50/50 text-[#D90000]'
                    : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                }`}
              >
                <span>Regular (Standard)</span>
                <span>Rs. {activeDetailItem.price}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedSize('Large')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  selectedSize === 'Large'
                    ? 'border-[#D90000] bg-red-50/50 text-[#D90000]'
                    : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                }`}
              >
                <span>Large (Jumbo)</span>
                <span>+Rs. 80</span>
              </button>
            </div>
          </div>

          {/* Customization: Sugar Level */}
          <div>
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Sugar Level
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {(['Regular', 'Less Sugar', 'No Sugar'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSugarLevel(level)}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-semibold text-center transition-colors cursor-pointer ${
                    sugarLevel === level
                      ? 'border-[#D90000] bg-red-50/50 text-[#D90000] font-bold'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Customization: Ice Level */}
          <div>
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Ice Level
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {(['Normal Ice', 'Less Ice', 'No Ice'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setIceLevel(level)}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-semibold text-center transition-colors cursor-pointer ${
                    iceLevel === level
                      ? 'border-[#D90000] bg-red-50/50 text-[#D90000] font-bold'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
              Special Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Extra thick, less sweet, separate straw"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-xl px-3 py-2 text-xs text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
            />
          </div>

          {/* Quantity and Add CTA */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-[#F7F7F7] border border-neutral-200 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-white text-neutral-800 hover:text-[#D90000] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-extrabold text-neutral-900 px-2 tabular-nums min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg bg-[#D90000] text-white hover:bg-[#A80000] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddAndClose}
              className="flex-1 bg-[#D90000] hover:bg-[#A80000] text-white py-3 px-5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </span>
              <span className="tabular-nums font-extrabold">Rs. {totalPrice.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
