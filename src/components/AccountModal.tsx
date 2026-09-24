import React, { useState } from 'react';
import { X, User, Phone, Mail, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountModal: React.FC = () => {
  const {
    isAccountModalOpen,
    setIsAccountModalOpen,
    customerProfile,
    setCustomerProfile,
  } = useStore();

  const [name, setName] = useState(customerProfile.name);
  const [phone, setPhone] = useState(customerProfile.phone);
  const [email, setEmail] = useState(customerProfile.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAccountModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerProfile({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsAccountModalOpen(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-neutral-200 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAccountModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D90000] flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-neutral-900">
              Customer Account
            </h3>
            <p className="text-xs text-neutral-500">
              Save your contact info for fast 1-click WhatsApp ordering
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Muhammad Tariq"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-xl pl-9 pr-3 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              WhatsApp Phone
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder="e.g. 0301 4002475"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-xl pl-9 pr-3 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Email Address (Optional)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-xl pl-9 pr-3 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#D90000] hover:bg-[#A80000] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Profile Saved</span>
                </>
              ) : (
                <span>Save Profile</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
