import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Bike,
  Store,
  Phone,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderReviewModal: React.FC = () => {
  const {
    isOrderReviewOpen,
    setIsOrderReviewOpen,
    cart,
    subtotal,
    deliveryFee,
    total,
    orderType,
    location,
    setLocation,
    customerProfile,
    setCustomerProfile,
    generateWhatsAppUrl,
    clearCart,
    setActivePage,
  } = useStore();

  const [step, setStep] = useState<'review' | 'confirmed'>('review');

  if (!isOrderReviewOpen) return null;

  const handlePlaceOrderWhatsApp = () => {
    // Generate WhatsApp URL
    const url = generateWhatsAppUrl();

    // Open WhatsApp
    window.open(url, '_blank');

    // Switch to confirmed state
    setStep('confirmed');
  };

  const handleFinishAndReturn = () => {
    clearCart();
    setStep('review');
    setIsOrderReviewOpen(false);
    setActivePage('menu');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D90000]" />
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#111111]">
              {step === 'review' ? 'Review Your Order' : 'Order Ready on WhatsApp'}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOrderReviewOpen(false);
              setStep('review');
            }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'review' ? (
          <div className="p-4 sm:p-6 space-y-5">
            {/* Customer Details Verification */}
            <div className="bg-[#F7F7F7] border border-neutral-200 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 flex items-center justify-between">
                <span>Customer & Delivery Details</span>
                <span className="text-[#D90000] font-semibold">
                  {orderType === 'delivery' ? 'Delivery Order' : 'Store Pick-Up'}
                </span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-500 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Tariq"
                    value={customerProfile.name}
                    onChange={(e) =>
                      setCustomerProfile((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:border-[#D90000] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-500 mb-1">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="0301 4002475"
                    value={customerProfile.phone}
                    onChange={(e) =>
                      setCustomerProfile((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:border-[#D90000] focus:outline-none"
                  />
                </div>

                {orderType === 'delivery' ? (
                  <>
                    <div>
                      <label className="block text-neutral-500 mb-1">House / Shop / Street</label>
                      <input
                        type="text"
                        placeholder="House #, Street #"
                        value={location.houseOrShop || location.street}
                        onChange={(e) =>
                          setLocation((prev) => ({ ...prev, houseOrShop: e.target.value }))
                        }
                        className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:border-[#D90000] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-500 mb-1">Area / Sector</label>
                      <input
                        type="text"
                        value={location.area}
                        onChange={(e) =>
                          setLocation((prev) => ({ ...prev, area: e.target.value }))
                        }
                        className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:border-[#D90000] focus:outline-none"
                      />
                    </div>
                  </>
                ) : (
                  <div className="sm:col-span-2 bg-white border border-neutral-200 rounded-lg p-2.5 flex items-center gap-2">
                    <Store className="w-4 h-4 text-[#D90000]" />
                    <span className="text-neutral-700">
                      Pick-up Location: <strong>Jaidi Pan Shop — DHA Phase 4, Sector CCA, Lahore</strong>
                    </span>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="block text-neutral-500 mb-1">Order Notes (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Extra mint, napkins, call on arrival"
                    value={location.instructions}
                    onChange={(e) =>
                      setLocation((prev) => ({ ...prev, instructions: e.target.value }))
                    }
                    className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:border-[#D90000] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Itemized Order List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                Order Items ({cart.length})
              </h4>
              <div className="border border-neutral-200 rounded-2xl divide-y divide-neutral-100 overflow-hidden">
                {cart.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="p-3 flex items-center justify-between text-xs bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#D90000] w-6 text-center tabular-nums">
                        {ci.quantity}×
                      </span>
                      <div>
                        <span className="font-bold text-neutral-900">{ci.item.name}</span>
                        {(ci.selectedSize || ci.sugarLevel !== 'Regular' || ci.iceLevel !== 'Normal Ice') && (
                          <div className="text-[11px] text-neutral-400">
                            {ci.selectedSize ? `${ci.selectedSize}` : ''}
                            {ci.sugarLevel !== 'Regular' ? ` · ${ci.sugarLevel}` : ''}
                            {ci.iceLevel !== 'Normal Ice' ? ` · ${ci.iceLevel}` : ''}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-neutral-900 tabular-nums">
                      Rs. {(ci.item.price * ci.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Breakdown */}
            <div className="bg-[#F7F7F7] border border-neutral-200 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900 tabular-nums">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>
                  {orderType === 'delivery' ? 'Delivery Fee (Lahore)' : 'Pick-Up Charges'}
                </span>
                <span className="font-bold text-neutral-900 tabular-nums">
                  {deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Final Total</span>
                <span className="text-[#D90000] tabular-nums">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handlePlaceOrderWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.99] text-white py-3.5 px-6 rounded-2xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Place Order on WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-neutral-500 mt-2">
                Clicking opens WhatsApp with your pre-formatted order ready to send to{' '}
                <strong className="text-neutral-800 font-semibold">+92 301 4002475</strong>
              </p>
            </div>
          </div>
        ) : (
          /* Order Confirmed State */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h4 className="font-display font-bold text-2xl text-neutral-900">
                Your order details are ready on WhatsApp.
              </h4>
              <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Please send the prepared WhatsApp message to Jaidi Pan Shop to confirm preparation
                and dispatch.
              </p>
            </div>

            <div className="bg-[#F7F7F7] border border-neutral-200 rounded-2xl p-4 text-xs text-neutral-700 max-w-sm mx-auto space-y-1">
              <div className="font-bold text-neutral-900">Jaidi Pan Shop Official Hotline</div>
              <div className="font-mono text-sm text-[#D90000] font-bold">0301 4002475</div>
              <div className="text-neutral-500">DHA Phase 4, Sector CCA, Lahore</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.open(generateWhatsAppUrl(), '_blank')}
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleFinishAndReturn}
                className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Back to Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
