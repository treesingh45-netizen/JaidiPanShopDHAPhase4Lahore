import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BagDrawer } from './components/BagDrawer';
import { OrderReviewModal } from './components/OrderReviewModal';
import { AccountModal } from './components/AccountModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminMenuModal } from './components/AdminMenuModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activePage,
    cartCount,
    total,
    setIsBagDrawerOpen,
    toastMessage,
  } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F7] text-[#111111] antialiased">
      {/* Global Header */}
      <Header />

      {/* Main Dynamic View */}
      <main className="flex-1 pb-16">
        {activePage === 'home' && <HomePage />}
        {activePage === 'menu' && <MenuPage />}
        {activePage === 'category' && <CategoryPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Mobile Sticky Bag Summary (Appears when items are in bag) */}
      {cartCount > 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-xl transition-all">
          <button
            type="button"
            onClick={() => setIsBagDrawerOpen(true)}
            className="w-full bg-[#D90000] hover:bg-[#A80000] text-white py-3 px-4 rounded-2xl font-bold text-xs shadow-md flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-mono">
                {cartCount}
              </div>
              <span>
                {cartCount} {cartCount === 1 ? 'Item' : 'Items'} — Rs. {total.toLocaleString()}
              </span>
            </div>

            <span className="flex items-center gap-1 font-extrabold uppercase tracking-wider text-[11px]">
              <span>View Bag</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      )}

      {/* Global Modals & Drawers */}
      <BagDrawer />
      <OrderReviewModal />
      <AccountModal />
      <ProductDetailModal />
      <AdminMenuModal />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#111111] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="w-2 h-2 rounded-full bg-[#D90000] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
