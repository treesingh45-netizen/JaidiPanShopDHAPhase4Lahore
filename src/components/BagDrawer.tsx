import React from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Bike,
  Store,
  MapPin,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BagDrawer: React.FC = () => {
  const {
    isBagDrawerOpen,
    setIsBagDrawerOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    orderType,
    setOrderType,
    location,
    setIsOrderReviewOpen,
    setActivePage,
  } = useStore();

  if (!isBagDrawerOpen) return null;

  const handleProceed = () => {
    setIsBagDrawerOpen(false);
    setIsOrderReviewOpen(true);
  };

  const handleBrowseMenu = () => {
    setIsBagDrawerOpen(false);
    setActivePage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#D90000]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-neutral-900 leading-tight">
                Your Bag
              </h3>
              <span className="text-xs text-neutral-500 font-medium">
                {cart.length} {cart.length === 1 ? 'distinct item' : 'distinct items'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-neutral-400 hover:text-red-600 transition-colors p-1"
                title="Clear Bag"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsBagDrawerOpen(false)}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Order Type Switcher in Drawer */}
        <div className="px-4 py-2.5 bg-[#F7F7F7] border-b border-neutral-200 flex items-center justify-between gap-2 shrink-0">
          <span className="text-xs font-semibold text-neutral-600">Order Method:</span>
          <div className="inline-flex p-0.5 bg-white border border-neutral-200 rounded-lg text-xs font-bold">
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                orderType === 'delivery'
                  ? 'bg-[#D90000] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Delivery</span>
            </button>
            <button
              onClick={() => setOrderType('pickup')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                orderType === 'pickup'
                  ? 'bg-[#D90000] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Pick-Up</span>
            </button>
          </div>
        </div>

        {/* Cart Item List / Empty State */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-neutral-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-neutral-800">
                  Your Bag is Empty
                </h4>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs leading-relaxed">
                  Looks like you haven&apos;t added anything yet. Explore our menu and discover your
                  favourites.
                </p>
              </div>
              <button
                type="button"
                onClick={handleBrowseMenu}
                className="bg-[#D90000] hover:bg-[#A80000] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((ci) => {
              const itemTotal = ci.item.price * ci.quantity;
              return (
                <div key={ci.item.id} className="py-3.5 flex gap-3 items-center">
                  {/* Thumbnail */}
                  <img
                    src={ci.item.image}
                    alt={ci.item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-neutral-200 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-neutral-900 text-sm truncate leading-snug">
                      {ci.item.name}
                    </h5>
                    <div className="flex flex-wrap gap-1 text-[11px] text-neutral-500 mt-0.5">
                      {ci.selectedSize && <span>{ci.selectedSize}</span>}
                      {ci.sugarLevel && ci.sugarLevel !== 'Regular' && (
                        <span>· {ci.sugarLevel}</span>
                      )}
                      {ci.iceLevel && ci.iceLevel !== 'Normal Ice' && <span>· {ci.iceLevel}</span>}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-extrabold text-neutral-900 tabular-nums">
                        Rs. {itemTotal.toLocaleString()}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center gap-1.5 bg-[#F7F7F7] border border-neutral-200 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(ci.item.id, -1)}
                          className="w-6 h-6 rounded bg-white text-neutral-700 hover:text-[#D90000] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-neutral-800 px-1.5 tabular-nums">
                          {ci.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(ci.item.id, 1)}
                          className="w-6 h-6 rounded bg-[#D90000] text-white hover:bg-[#A80000] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(ci.item.id)}
                    className="p-1.5 text-neutral-300 hover:text-red-500 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white space-y-3 shrink-0">
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900 tabular-nums">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>
                  {orderType === 'delivery' ? 'Delivery Fee (DHA Lahore)' : 'Pick-Up Charges'}
                </span>
                <span className="font-bold text-neutral-900 tabular-nums">
                  {deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-neutral-100 text-sm font-extrabold text-neutral-900">
                <span>Estimated Total</span>
                <span className="text-base text-[#D90000] tabular-nums">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsBagDrawerOpen(false)}
                className="w-1/3 py-3 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer text-center"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                onClick={handleProceed}
                className="w-2/3 bg-[#D90000] hover:bg-[#A80000] active:scale-[0.99] text-white py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
