import React from 'react';
import { JAIDI_ICON_URL } from './JaidiLogo';

interface SignatureMarqueeProps {
  variant?: 'luxury-dark' | 'crimson' | 'gold-accent';
  speed?: 'normal' | 'slow';
  reverse?: boolean;
  className?: string;
}

export const SignatureMarquee: React.FC<SignatureMarqueeProps> = ({
  variant = 'luxury-dark',
  speed = 'normal',
  reverse = false,
  className = '',
}) => {
  const marqueeItems = [
    {
      signature: 'Jaidi Pan Shop',
      tag: 'Handcrafted Heritage',
      detail: 'DHA Phase 4, Lahore',
    },
    {
      signature: 'Royal Meetha & Saada Paan',
      tag: 'Signature Recipes',
      detail: 'Traditional Speciality',
    },
    {
      signature: '100% Pure Fresh Juices',
      tag: 'Freshly Pressed Daily',
      detail: 'Seasonal Citrus & Pomegranate',
    },
    {
      signature: 'Velvety Shakes & Falooda',
      tag: 'Pure Indulgence',
      detail: 'Rich Dry Fruit Blends',
    },
    {
      signature: 'Gourmet Ice Creams',
      tag: 'Artisanal Flavours',
      detail: 'Kulfa, Mango & Pistachio',
    },
    {
      signature: 'The Authentic Taste of Lahore',
      tag: 'Since Inception',
      detail: 'WhatsApp 0301 4002475',
    },
    {
      signature: 'Swift Curbside & City Delivery',
      tag: 'Fresh To Order',
      detail: 'Direct To Your Doorstep',
    },
  ];

  // Variant themes (strictly red and white)
  const themeStyles = {
    'luxury-dark': 'bg-[#111111] border-y border-red-900/40 text-white',
    crimson: 'bg-[#D90000] border-y border-[#A80000] text-white',
    'gold-accent': 'bg-black border-y border-white/20 text-white',
  };

  const signatureColor = {
    'luxury-dark': 'text-white',
    crimson: 'text-white',
    'gold-accent': 'text-white',
  };

  const tagColor = {
    'luxury-dark': 'text-[#FF4D4D]',
    crimson: 'text-white/95',
    'gold-accent': 'text-[#D90000]',
  };

  const animClass = reverse
    ? 'animate-marquee-reverse'
    : speed === 'slow'
    ? 'animate-marquee-slow'
    : 'animate-marquee-smooth';

  return (
    <div
      className={`relative w-full overflow-hidden py-3 select-none ${themeStyles[variant]} ${className}`}
      aria-label="Jaidi Pan Shop Signature Announcements"
    >
      {/* Scrolling Content Track (duplicated twice for infinite loop) */}
      <div className={`${animClass} flex items-center`}>
        {/* Track 1 */}
        <div className="flex items-center shrink-0">
          {marqueeItems.map((item, index) => (
            <div key={`track1-${index}`} className="flex items-center shrink-0">
              <div className="flex items-center gap-3 px-5 sm:px-7">
                {/* Official Jaidi Brand Emblem */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shadow-xs shrink-0 bg-[#D90000] flex items-center justify-center">
                  <img
                    src={JAIDI_ICON_URL}
                    alt="Jaidi Pan Shop"
                    className="w-full h-full object-cover scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Signature Style Calligraphy Text */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2.5">
                  <span
                    className={`font-signature text-2xl sm:text-3xl tracking-wide leading-none ${signatureColor[variant]} drop-shadow-xs`}
                  >
                    {item.signature}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-widest">
                    <span className={tagColor[variant]}>{item.tag}</span>
                    <span className="text-[#D90000] font-serif">·</span>
                    <span className="text-white/80 font-medium normal-case tracking-normal">
                      {item.detail}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Divider */}
              <div className="px-2 text-[#D90000] text-xs shrink-0 select-none">
                ✦
              </div>
            </div>
          ))}
        </div>

        {/* Track 2 (Exact duplicate for seamless infinite loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {marqueeItems.map((item, index) => (
            <div key={`track2-${index}`} className="flex items-center shrink-0">
              <div className="flex items-center gap-3 px-5 sm:px-7">
                {/* Official Jaidi Brand Emblem */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shadow-xs shrink-0 bg-[#D90000] flex items-center justify-center">
                  <img
                    src={JAIDI_ICON_URL}
                    alt="Jaidi Pan Shop"
                    className="w-full h-full object-cover scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Signature Style Calligraphy Text */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2.5">
                  <span
                    className={`font-signature text-2xl sm:text-3xl tracking-wide leading-none ${signatureColor[variant]} drop-shadow-xs`}
                  >
                    {item.signature}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-widest">
                    <span className={tagColor[variant]}>{item.tag}</span>
                    <span className="text-[#D90000] font-serif">·</span>
                    <span className="text-white/80 font-medium normal-case tracking-normal">
                      {item.detail}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Divider */}
              <div className="px-2 text-[#D90000] text-xs shrink-0 select-none">
                ✦
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
