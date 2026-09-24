import React, { useState } from 'react';
import { Bike, Store, MapPin, Compass, Check, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface OrderTypeSelectorProps {
  compact?: boolean;
  onContinueBrowsing?: () => void;
}

export const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({
  compact = false,
  onContinueBrowsing,
}) => {
  const {
    orderType,
    setOrderType,
    location,
    setLocation,
    customerProfile,
    setCustomerProfile,
  } = useStore();

  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setLocationSuccess(true);
        setLocation((prev) => ({
          ...prev,
          address: `Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)} (DHA Lahore)`,
          area: 'DHA Lahore Vicinity',
        }));
        setTimeout(() => setLocationSuccess(false), 3000);
      },
      () => {
        setIsLocating(false);
        setLocation((prev) => ({
          ...prev,
          address: 'DHA Phase 4, Sector CCA, Lahore',
          area: 'DHA Phase 4',
        }));
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className={`bg-white rounded-2xl border border-neutral-200 shadow-xs p-4 sm:p-6 transition-all`}>
      {/* 1. Header & Order Type Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-neutral-500 font-bold mb-1">
            Order Method
          </h3>
          <h2 className="text-lg sm:text-xl font-display font-bold text-[#111111]">
            How would you like to receive your order?
          </h2>
        </div>

        {/* Delivery / Pick-Up Switch Buttons (NO EMOJIS, CLEAN SVG OUTLINES) */}
        <div className="inline-flex p-1 bg-[#F7F7F7] rounded-xl border border-neutral-200">
          <button
            type="button"
            onClick={() => setOrderType('delivery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              orderType === 'delivery'
                ? 'bg-[#D90000] text-white shadow-xs'
                : 'text-neutral-700 hover:text-[#111111] hover:bg-neutral-200/60'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>Delivery</span>
          </button>

          <button
            type="button"
            onClick={() => setOrderType('pickup')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              orderType === 'pickup'
                ? 'bg-[#D90000] text-white shadow-xs'
                : 'text-neutral-700 hover:text-[#111111] hover:bg-neutral-200/60'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Pick-Up</span>
          </button>
        </div>
      </div>

      {/* 2. Location Details based on Selected Order Type */}
      <div className="pt-4">
        {orderType === 'delivery' ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-800">
                <MapPin className="w-4 h-4 text-[#D90000]" />
                <span>Select Your Location (Delivery within Lahore)</span>
              </div>

              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isLocating}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D90000] hover:text-[#A80000] border border-red-200 hover:border-[#D90000] px-3 py-1.5 rounded-lg transition-colors cursor-pointer w-fit"
              >
                {locationSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Location Set</span>
                  </>
                ) : (
                  <>
                    <Compass className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? 'Detecting...' : 'Use Current Location'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Address Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Muhammad Tariq"
                  value={customerProfile.name}
                  onChange={(e) =>
                    setCustomerProfile((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-lg px-3 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Phone (WhatsApp)
                </label>
                <input
                  type="tel"
                  placeholder="0300 1234567"
                  value={customerProfile.phone}
                  onChange={(e) =>
                    setCustomerProfile((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-lg px-3 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  House / Shop / Office #
                </label>
                <input
                  type="text"
                  placeholder="e.g. House 42, Block B"
                  value={location.houseOrShop}
                  onChange={(e) =>
                    setLocation((prev) => ({ ...prev, houseOrShop: e.target.value }))
                  }
                  className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-lg px-3 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Area / Sector
                </label>
                <input
                  type="text"
                  placeholder="e.g. DHA Phase 4, Lahore"
                  value={location.area}
                  onChange={(e) =>
                    setLocation((prev) => ({ ...prev, area: e.target.value }))
                  }
                  className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-lg px-3 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3">
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Street & Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near CCA Roundabout, deliver chilled, ring bell"
                  value={location.instructions}
                  onChange={(e) =>
                    setLocation((prev) => ({ ...prev, instructions: e.target.value }))
                  }
                  className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-lg px-3 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
                />
              </div>

              <div className="flex items-end">
                <div className="w-full bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-neutral-700 flex items-center justify-between">
                  <span className="font-medium text-[#D90000]">Delivery: Rs. 150</span>
                  <span className="text-[11px] text-neutral-500">Avg 35-45 mins</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Pick-Up Info */
          <div className="space-y-4">
            <div className="bg-[#F7F7F7] border border-neutral-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Store className="w-5 h-5 text-[#D90000]" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">
                    Jaidi Pan Shop — DHA Phase 4 Outlet
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Sector CCA, DHA Phase 4, Lahore, Pakistan
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D90000]" />
                    <span>Ready for pickup in 15–20 minutes · Free of Charge</span>
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-200">
                <a
                  href="tel:03014002475"
                  className="text-xs font-semibold text-[#D90000] hover:underline"
                >
                  Call: 0301 4002475
                </a>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Open Today
                </span>
              </div>
            </div>

            {/* Customer Contact for Pickup */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Muhammad Tariq"
                  value={customerProfile.name}
                  onChange={(e) =>
                    setCustomerProfile((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-lg px-3 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Your Phone (WhatsApp)
                </label>
                <input
                  type="tel"
                  placeholder="0300 1234567"
                  value={customerProfile.phone}
                  onChange={(e) =>
                    setCustomerProfile((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-lg px-3 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Pickup Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Arriving at 9:30 PM"
                  value={location.instructions}
                  onChange={(e) =>
                    setLocation((prev) => ({ ...prev, instructions: e.target.value }))
                  }
                  className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-lg px-3 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
                />
              </div>
            </div>
          </div>
        )}

        {onContinueBrowsing && (
          <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-end">
            <button
              type="button"
              onClick={onContinueBrowsing}
              className="bg-[#111111] hover:bg-neutral-800 text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Start Browsing Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
