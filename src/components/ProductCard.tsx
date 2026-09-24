import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: MenuItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity, setActiveDetailItem } = useStore();
  const [imageError, setImageError] = useState(false);

  // Check if item is already in cart
  const cartItem = cart.find((ci) => ci.item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, -1);
  };

  return (
    <div
      onClick={() => setActiveDetailItem(product)}
      className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-300 p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer relative overflow-hidden"
    >
      {/* Left Content: Title, Description, Price Pill */}
      <div className="flex-1 flex flex-col justify-between min-h-[90px] sm:min-h-[105px] pr-1">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            <h4 className="font-bold text-neutral-900 text-sm sm:text-base leading-tight group-hover:text-[#D90000] transition-colors line-clamp-2">
              {product.name}
            </h4>
          </div>

          <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price Pill Badge */}
        <div className="mt-3 pt-1 flex items-center gap-2">
          <span className="inline-flex items-center bg-[#D90000] text-white text-xs sm:text-sm font-extrabold px-3 py-1 rounded-lg shadow-xs tracking-wide">
            Rs. {product.price.toLocaleString()}
          </span>

          {product.isFeatured && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D90000] bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
              Signature
            </span>
          )}
        </div>
      </div>

      {/* Right Content: Product Cutout / Photo with Floating Round '+' Button */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 p-2 text-center">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              Jaidi
            </span>
            <span className="text-[11px] font-semibold text-neutral-700 line-clamp-1 mt-0.5">
              {product.name}
            </span>
          </div>
        )}

        {/* Floating Circular Plus / Stepper Button at bottom right */}
        <div className="absolute bottom-1.5 right-1.5 z-10">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D90000] hover:bg-[#b80000] active:scale-90 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 bg-black/90 text-white rounded-full p-0.5 shadow-md backdrop-blur-xs"
            >
              <button
                type="button"
                onClick={handleDecrement}
                aria-label="Decrease quantity"
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3 stroke-[2.5]" />
              </button>

              <span className="text-xs font-black text-white px-1.5 tabular-nums min-w-[14px] text-center">
                {quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrement}
                aria-label="Increase quantity"
                className="w-6 h-6 rounded-full bg-[#D90000] hover:bg-[#ff2020] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
