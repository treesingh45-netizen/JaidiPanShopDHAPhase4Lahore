import React from 'react';
import { ShieldCheck, Heart, Users, MapPin, Phone } from 'lucide-react';
import { OWNER_INFO, INITIAL_TEAM_MEMBERS } from '../data/teamData';
import { useStore } from '../context/StoreContext';
import { SignatureMarquee } from '../components/SignatureMarquee';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16 pt-4 sm:pt-6">
      {/* 1. ABOUT HERO */}
      <section className="relative rounded-3xl overflow-hidden bg-[#111111] text-white p-8 sm:p-14 lg:p-16 border border-neutral-200">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80"
            alt="Jaidi Pan Shop Lahore Atmosphere"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#D90000] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <span>DHA Phase 4 · Lahore</span>
          </div>

          <div className="font-signature text-3xl sm:text-4xl text-[#F6C343] font-normal tracking-wide drop-shadow-xs select-none">
            A Tradition of Pure Flavour
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
            THE STORY OF JAIDI
          </h1>

          <p className="text-lg sm:text-xl font-display text-neutral-200 font-semibold">
            A Local Lahore Destination Built Around Taste, Variety & Hospitality
          </p>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
            From humble beginnings to becoming a signature hangout spot in DHA Phase 4, Jaidi Pan
            Shop has defined quality, freshness, and authentic Lahori sweetness.
          </p>
        </div>
      </section>

      {/* SIGNATURE MARQUEE BANNER */}
      <div className="rounded-2xl overflow-hidden shadow-xs">
        <SignatureMarquee variant="luxury-dark" speed="normal" />
      </div>

      {/* 2. ABOUT JAIDI NARRATIVE */}
      <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D90000]">
            Our Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900">
            Freshness Without Compromise
          </h2>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
            Jaidi Pan Shop is a food and refreshment destination located in DHA Phase 4, Lahore.
            Our menu brings together a broad selection of juices, shakes, ice cream, desserts,
            smoothies, beverages, salads, savouries, tea, coffee, and signature Jaidi creations.
          </p>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
            The goal is simple: create a place where customers can discover something refreshing,
            satisfying, and enjoyable every time they visit.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4 border-t border-neutral-100">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#D90000] font-display">
                146
              </span>
              <p className="text-xs text-neutral-500 font-medium">Distinct Menu Items</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display">
                100%
              </span>
              <p className="text-xs text-neutral-500 font-medium">Fresh Daily Preparation</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <img
            src="https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
            alt="Fresh Juice Pressing"
            className="rounded-2xl object-cover aspect-square border border-neutral-200"
          />
          <img
            src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80"
            alt="Artisanal Ice Cream"
            className="rounded-2xl object-cover aspect-square border border-neutral-200 mt-6"
          />
        </div>
      </section>

      {/* 3. OWNER SECTION */}
      <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-12 shadow-xs">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Real Portrait Photo */}
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl overflow-hidden shrink-0 border-4 border-neutral-100 shadow-md">
            <img
              src={OWNER_INFO.image}
              alt={OWNER_INFO.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-2 left-2 bg-[#D90000] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
              Founder
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3.5 text-center md:text-left flex-1">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D90000]">
                Meet the Owner
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-neutral-900 mt-0.5">
                {OWNER_INFO.name}
              </h3>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                {OWNER_INFO.title}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {OWNER_INFO.bio}
            </p>

            <blockquote className="bg-[#F7F7F7] border-l-4 border-[#D90000] p-3 rounded-r-xl text-xs italic text-neutral-700">
              &ldquo;{OWNER_INFO.quote}&rdquo;
            </blockquote>

            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-neutral-600 font-semibold">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D90000]" />
                <span>DHA Phase 4, Sector CCA, Lahore</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D90000]" />
                <span>0301 4002475</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEAM SECTION (8 Team Cards) */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D90000]">
            The People Behind The Taste
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900">
            Meet Our Team
          </h2>
          <p className="text-xs text-neutral-500">
            8 dedicated department specialists serving DHA Phase 4 day and night.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {INITIAL_TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {member.roleNumber}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D90000] block">
                    {member.role}
                  </span>
                  <h4 className="font-bold text-neutral-900 text-sm mt-0.5">{member.name}</h4>
                  <p className="text-[11px] font-medium text-neutral-500 mt-0.5">
                    {member.specialty}
                  </p>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 text-[10px] text-neutral-400 font-semibold uppercase">
                  Jaidi Pan Shop DHA 4
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Menu Banner */}
      <section className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-display font-bold">
          Ready to experience the Jaidi taste?
        </h3>
        <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto">
          Explore all 146 juices, shakes, ice creams, and savouries ready for delivery or pickup.
        </p>
        <div>
          <button
            onClick={() => {
              setActivePage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#D90000] hover:bg-[#A80000] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors cursor-pointer"
          >
            Explore Menu & Order
          </button>
        </div>
      </section>
    </div>
  );
};
