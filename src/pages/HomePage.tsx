import React, { useRef } from 'react';
import {
  ArrowRight,
  Phone,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers,
  HeartHandshake,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/menuData';
import { OrderTypeSelector } from '../components/OrderTypeSelector';
import { ProductCard } from '../components/ProductCard';
import { SignatureMarquee } from '../components/SignatureMarquee';
import { CategoryId } from '../types';

export const HomePage: React.FC = () => {
  const { setActivePage, setSelectedCategory, menuItems } = useStore();
  const orderBlockRef = useRef<HTMLDivElement>(null);

  const scrollToOrder = () => {
    orderBlockRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActivePage('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const popularItems = menuItems.filter((m) => m.isPopular).slice(0, 8);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. HERO SECTION - Minimal & Elegant Cafe Style */}
      <section className="relative bg-[#0d0d0d] text-white overflow-hidden rounded-b-3xl sm:rounded-b-[2.5rem]">
        {/* Atmospheric Food Photography Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1800&q=85"
            alt="Jaidi Pan Shop Ambience & Refreshments"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/75 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28 text-center">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            {/* Small Elegant Overline */}
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-neutral-300 uppercase">
              WELCOME TO JAIDI PAN SHOP · DHA PHASE 4
            </p>

            {/* Large Elegant Serif Headline (Bruin Cafe Style) */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.15] drop-shadow-lg max-w-3xl">
              Enjoy Fresh Flavours & Bold Taste
            </h1>

            {/* Clean, Muted Descriptive Text */}
            <p className="text-xs sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl mx-auto drop-shadow-sm">
              Explore refreshing cold juices, thick creamy shakes, authentic falooda, royal paan,
              and signature dessert bowls handcrafted fresh every day in Lahore.
            </p>

            {/* Clean, Minimalist Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
              <button
                type="button"
                onClick={scrollToOrder}
                className="bg-[#D90000] hover:bg-[#b80000] text-white font-medium text-xs sm:text-sm tracking-wider uppercase px-7 py-3 rounded-lg transition-all duration-200 cursor-pointer shadow-lg hover:shadow-red-900/30"
              >
                Order Now
              </button>

              <button
                type="button"
                onClick={() => {
                  setActivePage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white hover:bg-neutral-200 text-neutral-900 font-medium text-xs sm:text-sm tracking-wider uppercase px-7 py-3 rounded-lg transition-all duration-200 cursor-pointer shadow-lg"
              >
                Explore Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE STYLE TEXT SMOOTH ANIMATION SCROLLING BANNER */}
      <div className="-mt-6 sm:-mt-8 relative z-20">
        <SignatureMarquee variant="luxury-dark" speed="normal" />
      </div>

      {/* 2. HOME — ORDER TYPE BLOCK (Directly Below Hero & Signature Banner) */}
      <section ref={orderBlockRef} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D90000]">
            Fast Online Ordering
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900">
            Order From Jaidi
          </h2>
        </div>
        <OrderTypeSelector
          onContinueBrowsing={() => {
            setActivePage('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </section>

      {/* 3. FEATURED CATEGORIES CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D90000]">
              Browse 15 Categories
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900">
              Explore Our Menu
            </h2>
          </div>

          <button
            onClick={() => {
              setActivePage('category');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#D90000] hover:text-[#A80000] flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal scrolling category cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x snap-mandatory">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group shrink-0 w-44 sm:w-52 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer snap-start flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-neutral-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md tabular-nums">
                  {cat.count} items
                </div>
              </div>

              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-bold text-sm text-neutral-900 group-hover:text-[#D90000] transition-colors line-clamp-1">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1 leading-snug">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#D90000]">
                  <span>View Category</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. POPULAR PRODUCTS (Customer Favourites) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D90000]">
              Signature Delights
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900">
              Customer Favourites
            </h2>
          </div>

          <button
            onClick={() => {
              setActivePage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#D90000] hover:text-[#A80000] flex items-center gap-1 cursor-pointer"
          >
            <span>See Full 146 Items Menu</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
          {popularItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* 5. ABOUT JAIDI SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xs">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D90000]">
              Heritage & Quality
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900">
              A Taste of Jaidi
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Jaidi Pan Shop brings together refreshing beverages, indulgent desserts, classic
              favourites, and creative signature drinks under one roof in DHA Phase 4, Lahore.
            </p>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Our menu is designed for families, friends, casual visits, celebrations, quick
              refreshment breaks, and anyone looking for something deliciously refreshing.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setActivePage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#111111] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Discover Jaidi & The Team
              </button>
            </div>
          </div>

          <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-neutral-200">
            <img
              src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80"
              alt="Jaidi Shakes and Beverages"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
              <p className="text-white text-xs font-semibold">
                Authentic preparation · Pure dairy & fresh garden fruits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY JAIDI (4 Clean Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D90000]">
            The Jaidi Standard
          </span>
          <h2 className="text-2xl font-display font-bold text-neutral-900">
            Why Lahore Chooses Jaidi
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-[#D90000] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base">Variety</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              A comprehensive menu of 146 selections created for different tastes, moods, and
              cravings.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-[#D90000] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base">Freshness</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Refreshing selections designed around fresh daily fruit preparation and pure quality
              ingredients.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-[#D90000] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base">Signature Flavours</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Discover unique Jaidi creations alongside familiar Lahori classics and creamy
              favourites.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-[#D90000] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base">Local Experience</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              A welcoming family and friends destination proudly serving DHA Phase 4, Lahore.
            </p>
          </div>
        </div>
      </section>

      {/* SIGNATURE STYLE REVERSE SCROLLING RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <SignatureMarquee variant="crimson" reverse={true} speed="slow" />
        </div>
      </section>

      {/* 7. VISIT CTA (Large Red Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#D90000] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-white/80">
              In-Person Experience
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold">
              Visit Jaidi Pan Shop
            </h2>
            <p className="text-white/90 text-sm leading-relaxed">
              Drop by our DHA Phase 4 location and enjoy the Jaidi experience in person.
            </p>
            <div className="pt-2 text-xs text-white/95 flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>DHA Phase 4, Sector CCA, DHA Phase 4, Lahore, Pakistan</span>
              </div>
              <span className="hidden sm:inline text-white/40">·</span>
              <div className="flex items-center gap-1.5 font-bold">
                <Phone className="w-4 h-4 shrink-0" />
                <span>0301 4002475</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:03014002475"
              className="w-full sm:w-auto bg-white text-[#D90000] hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors shadow-md text-center cursor-pointer"
            >
              Call Now
            </a>
            <a
              href="https://maps.google.com/?q=DHA+Phase+4+Sector+CCA+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-black/25 hover:bg-black/40 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors border border-white/30 text-center cursor-pointer"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
