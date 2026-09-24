import React from 'react';
import { Phone, MapPin, ExternalLink, Settings } from 'lucide-react';
import { JaidiLogo } from './JaidiLogo';
import { useStore } from '../context/StoreContext';
import { PageId } from '../types';

export const Footer: React.FC = () => {
  const { setActivePage, setIsBagDrawerOpen, setIsAdminModalOpen } = useStore();

  const handleNav = (p: PageId) => {
    setActivePage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#D90000] text-white pt-14 pb-8 px-4 sm:px-6 mt-16 border-t-4 border-[#A80000]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/20">
          {/* Col 1 & 2: Brand Lockup */}
          <div className="lg:col-span-2 space-y-4">
            <JaidiLogo variant="white" size="lg" />
            <p className="text-white/90 text-sm leading-relaxed max-w-sm">
              Fresh Flavours. Bold Taste.
              <br />
              Lahore’s premier food and beverage storefront serving 100% freshly squeezed juices,
              dry-fruit shakes, gourmet ice creams, falooda, and savouries.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-md">
                146 Menu Items
              </span>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-md">
                DHA Phase 4
              </span>
            </div>
          </div>

          {/* Col 3: Explore Navigation */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white/70 mb-3.5">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-white/90 font-medium">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Full Menu (146 Items)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('category')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Category Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Jaidi & Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Map
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Ordering & Services */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white/70 mb-3.5">
              Customer Orders
            </h4>
            <ul className="space-y-2 text-sm text-white/90 font-medium">
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pick-Up DHA Phase 4
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsBagDrawerOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Review Shopping Bag
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/923014002475"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Ordering
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white bg-black/20 hover:bg-black/30 px-2.5 py-1 rounded transition-colors cursor-pointer"
                >
                  <Settings className="w-3 h-3" />
                  <span>Store Menu Manager</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Location */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white/70 mb-3.5">
              Contact & Social
            </h4>
            <div className="space-y-2.5 text-sm text-white/90">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  DHA Phase 4, Sector CCA, DHA Phase 4, Lahore, Pakistan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:03014002475" className="text-xs font-bold hover:underline">
                  0301 4002475
                </a>
              </div>
              <div className="pt-2 flex items-center gap-3 text-xs">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-white/40">·</span>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-white/40">·</span>
                <a
                  href="https://wa.me/923014002475"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/75 font-medium">
          <p>© {new Date().getFullYear()} Jaidi Pan Shop. All Rights Reserved.</p>
          <p>DHA Phase 4, Sector CCA, Lahore, Pakistan</p>
        </div>
      </div>
    </footer>
  );
};
