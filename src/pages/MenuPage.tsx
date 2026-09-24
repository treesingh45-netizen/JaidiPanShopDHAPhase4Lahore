import React, { useRef, useState, useEffect } from 'react';
import { Search, X, Bike, Store, MapPin, Filter, ArrowUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/menuData';
import { ProductCard } from '../components/ProductCard';
import { CategoryId, MenuItem } from '../types';

export const MenuPage: React.FC = () => {
  const {
    menuItems,
    searchQuery,
    setSearchQuery,
    orderType,
    setOrderType,
    location,
  } = useStore();

  const [activeCategoryTab, setActiveCategoryTab] = useState<CategoryId>('fresh-juices');
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // References for category sections to support smooth scroll
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Find current active category based on scroll position
      if (!searchQuery) {
        for (const cat of CATEGORIES) {
          const el = categoryRefs.current[cat.id];
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 180 && rect.bottom > 180) {
              setActiveCategoryTab(cat.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery]);

  const scrollToCategory = (catId: CategoryId) => {
    setActiveCategoryTab(catId);
    const target = categoryRefs.current[catId];
    if (target) {
      const topOffset = 140;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Filter items if searching
  const isSearching = searchQuery.trim().length > 0;
  const filteredSearchItems = isSearching
    ? menuItems.filter((item) => {
        const matchesQuery =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesVeg = filterVegOnly ? item.isVegetarian : true;
        return matchesQuery && matchesVeg;
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 pt-4 sm:pt-6">
      {/* 1. Header Hero Bar */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#D90000]" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Online Ordering · DHA Phase 4
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-[#111111]">
              Order From Jaidi
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl leading-relaxed">
              Choose your favourites from our 146 menu items, add them to your Bag, and send your
              order directly to Jaidi on WhatsApp.
            </p>
          </div>

          {/* Quick Order Type & Location pill */}
          <div className="bg-[#F7F7F7] border border-neutral-200 rounded-2xl p-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="inline-flex p-1 bg-white border border-neutral-200 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-[#D90000] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  orderType === 'pickup'
                    ? 'bg-[#D90000] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Pick-Up</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-neutral-600 pl-1">
              <MapPin className="w-3.5 h-3.5 text-[#D90000] shrink-0" />
              <span className="font-semibold text-neutral-800">
                {orderType === 'delivery' ? 'DHA Phase 4, Lahore' : 'Sector CCA Outlet'}
              </span>
            </div>
          </div>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search juices, shakes, desserts, ice cream, samosas..."
              className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-2xl pl-10 pr-9 py-2.5 text-sm text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000] focus:ring-1 focus:ring-[#D90000]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setFilterVegOnly((v) => !v)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                filterVegOnly
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                  : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{filterVegOnly ? 'Vegetarian Only ✓' : 'Veg Only'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. STICKY HORIZONTAL CATEGORY NAVIGATION BAR (15 Categories) */}
      {!isSearching && (
        <div className="sticky top-[58px] z-30 bg-white/95 backdrop-blur-md py-3 -mx-4 sm:-mx-6 px-4 sm:px-6 border-y border-neutral-200 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategoryTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#D90000] text-white shadow-xs'
                      : 'bg-[#F7F7F7] text-neutral-700 hover:bg-neutral-200/80 hover:text-[#111111]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`ml-1.5 text-[11px] tabular-nums ${
                      isActive ? 'text-white/80' : 'text-neutral-400'
                    }`}
                  >
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. MENU CONTENT: SEARCH RESULTS OR 15 CATEGORY SECTIONS */}
      {isSearching ? (
        /* Live Search View */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-neutral-900">
              Search Results for &ldquo;{searchQuery}&rdquo;
            </h2>
            <span className="text-xs font-semibold text-neutral-500">
              {filteredSearchItems.length} items found
            </span>
          </div>

          {filteredSearchItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center space-y-3">
              <p className="text-base font-semibold text-neutral-800">
                No menu items match your search.
              </p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try searching for &quot;mango&quot;, &quot;shake&quot;, &quot;ice cream&quot;,
                &quot;falooda&quot;, or &quot;tea&quot;.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-[#D90000] text-white text-xs font-bold px-4 py-2 rounded-xl mt-2 cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
              {filteredSearchItems.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* All 15 Category Sections (146 items) */
        <div className="space-y-12">
          {CATEGORIES.map((cat) => {
            const items = menuItems.filter((m) => m.category === cat.id);

            return (
              <section
                key={cat.id}
                ref={(el) => {
                  categoryRefs.current[cat.id] = el;
                }}
                className="space-y-4 scroll-mt-28"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-2 border-b-2 border-neutral-200 gap-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-display font-extrabold text-neutral-900">
                        {cat.name}
                      </h2>
                      <span className="text-xs font-bold bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-full tabular-nums">
                        {items.length} items
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xl">{cat.description}</p>
                  </div>
                </div>

                {/* Product Grid: 3 per row desktop, 2 tablet, 1 mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Back to top floating button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-6 z-30 p-2.5 rounded-full bg-white text-neutral-700 shadow-md border border-neutral-200 hover:text-[#D90000] hover:bg-neutral-50 transition-all cursor-pointer"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
