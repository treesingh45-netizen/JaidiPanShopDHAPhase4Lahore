import React, { useState } from 'react';
import {
  Phone,
  ShoppingBag,
  User,
  Search,
  Menu as MenuIcon,
  X,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { JaidiLogo } from './JaidiLogo';
import { PageId } from '../types';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    setIsBagDrawerOpen,
    searchQuery,
    setSearchQuery,
    setIsAccountModalOpen,
    customerProfile,
    orderType,
    location,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpandedMobile, setIsSearchExpandedMobile] = useState(false);

  const handleNavClick = (page: PageId) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all shadow-xs">
      {/* 1. Top Utility Bar */}
      <div className="bg-[#111111] text-white/90 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D90000] animate-pulse shrink-0" />
            <span className="font-medium tracking-wide">
              Welcome to Jaidi Pan Shop — DHA Phase 4, Lahore
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-neutral-300">
            <a
              href="tel:03014002475"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D90000]" />
              <span className="tabular-nums">Call: 0301 4002475</span>
            </a>
            <span className="text-neutral-600">|</span>
            <a
              href="https://wa.me/923014002475"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D90000] transition-colors"
            >
              WhatsApp
            </a>
            <span className="text-neutral-600">|</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D90000] transition-colors"
            >
              Instagram
            </a>
            <span className="text-neutral-600">|</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D90000] transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90000] rounded-lg"
          aria-label="Jaidi Pan Shop Home"
        >
          <JaidiLogo size="md" />
        </button>

        {/* Center: Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== 'menu' && activePage !== 'category') {
                  setActivePage('menu');
                }
              }}
              placeholder="Search juices, shakes, desserts, ice cream..."
              className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-full pl-10 pr-9 py-2 text-sm text-[#111111] placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#D90000] focus:ring-1 focus:ring-[#D90000] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-neutral-700">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-[#D90000] cursor-pointer ${
              activePage === 'home' ? 'text-[#D90000] font-bold border-b-2 border-[#D90000] pb-0.5' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className={`transition-colors hover:text-[#D90000] cursor-pointer ${
              activePage === 'menu' ? 'text-[#D90000] font-bold border-b-2 border-[#D90000] pb-0.5' : ''
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => handleNavClick('category')}
            className={`transition-colors hover:text-[#D90000] cursor-pointer ${
              activePage === 'category' ? 'text-[#D90000] font-bold border-b-2 border-[#D90000] pb-0.5' : ''
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors hover:text-[#D90000] cursor-pointer ${
              activePage === 'about' ? 'text-[#D90000] font-bold border-b-2 border-[#D90000] pb-0.5' : ''
            }`}
          >
            About Jaidi
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors hover:text-[#D90000] cursor-pointer ${
              activePage === 'contact' ? 'text-[#D90000] font-bold border-b-2 border-[#D90000] pb-0.5' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Actions: Search Mobile, Account, Bag */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchExpandedMobile((v) => !v)}
            className="lg:hidden p-2 text-neutral-700 hover:text-[#D90000] rounded-lg transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account Button */}
          <button
            onClick={() => setIsAccountModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors border border-neutral-200 cursor-pointer"
          >
            <User className="w-4 h-4 text-[#D90000]" />
            <span className="truncate max-w-[100px]">
              {customerProfile.name ? customerProfile.name.split(' ')[0] : 'Sign In'}
            </span>
          </button>

          {/* Bag Button */}
          <button
            onClick={() => setIsBagDrawerOpen(true)}
            className="relative flex items-center gap-2 bg-[#D90000] hover:bg-[#A80000] text-white px-3.5 py-2 rounded-lg font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            aria-label={`Shopping Bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="whitespace-nowrap">Bag ({cartCount})</span>
            {cartCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-white absolute top-1.5 right-1.5 animate-ping" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="xl:hidden p-2 text-neutral-800 hover:text-[#D90000] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {isSearchExpandedMobile && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-neutral-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== 'menu') setActivePage('menu');
              }}
              placeholder="Search juices, shakes, desserts, ice cream..."
              className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-lg pl-9 pr-9 py-2 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-1.5 text-xs text-neutral-600">
              <MapPin className="w-3.5 h-3.5 text-[#D90000]" />
              <span>{orderType === 'delivery' ? 'Delivery: DHA Phase 4' : 'Pick-Up: DHA Phase 4 CCA'}</span>
            </div>
            <button
              onClick={() => {
                setIsAccountModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-[#D90000]"
            >
              {customerProfile.name ? `Account: ${customerProfile.name}` : 'Sign In / Register'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 rounded-lg text-left transition-colors ${
                activePage === 'home' ? 'bg-red-50 text-[#D90000]' : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className={`p-2.5 rounded-lg text-left transition-colors ${
                activePage === 'menu' ? 'bg-red-50 text-[#D90000]' : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              Menu (146 Items)
            </button>
            <button
              onClick={() => handleNavClick('category')}
              className={`p-2.5 rounded-lg text-left transition-colors ${
                activePage === 'category' ? 'bg-red-50 text-[#D90000]' : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`p-2.5 rounded-lg text-left transition-colors ${
                activePage === 'about' ? 'bg-red-50 text-[#D90000]' : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              About Jaidi
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`p-2.5 rounded-lg text-left transition-colors col-span-2 ${
                activePage === 'contact' ? 'bg-red-50 text-[#D90000]' : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              Contact & Location
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <a href="tel:03014002475" className="flex items-center gap-1 text-neutral-800 font-semibold">
              <Phone className="w-3.5 h-3.5 text-[#D90000]" />
              <span>0301 4002475</span>
            </a>
            <a
              href="https://wa.me/923014002475"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#D90000] font-semibold"
            >
              <span>WhatsApp Chat</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
