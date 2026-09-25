import React, { useState } from 'react';

export const JAIDI_ICON_URL =
  'https://scontent.fkhi21-1.fna.fbcdn.net/v/t39.30808-6/300382058_396196469298301_3792139760266283064_n.png?stp=dst-png&cstp=mx800x800&ctp=s800x800&_nc_cat=101&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=XDn2PCyPFNkQ7kNvwHD-ziM&_nc_oc=AdrCLLTCtfloz9SpjQK0UVSDwxI3l0nsb4BzofGILfFzKG85hTJ3msaZb9YBdAdwP2M&_nc_zt=23&_nc_ht=scontent.fkhi21-1.fna&_nc_gid=ML6vdXAhAqYLzUeDk5FGFg&_nc_ss=7b2a8&oh=00_AQKsm-g_lSBbsZwF3GaFH_UfpfoxpjAf4r6IV5JkBcEukg&oe=6ABA9297';

interface JaidiLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export const JaidiLogo: React.FC<JaidiLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);

  const iconSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
  };

  const textSizes = {
    sm: 'text-xs sm:text-sm md:text-base',
    md: 'text-sm sm:text-base md:text-lg lg:text-xl',
    lg: 'text-lg sm:text-xl md:text-2xl',
  };

  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 select-none whitespace-nowrap shrink-0 ${className}`}>
      {/* Brand Icon Mark - Pure styling without any black line or dark border */}
      <div
        className={`${iconSizes[size]} rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden ${
          isWhite
            ? 'bg-white shadow-sm'
            : 'bg-[#D90000] shadow-sm'
        }`}
        title="Jaidi Pan Shop DHA Phase 4"
      >
        {!imgError ? (
          <img
            src={JAIDI_ICON_URL}
            alt="Jaidi Pan Shop Icon"
            className="w-full h-full object-cover rounded-xl"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center rounded-xl p-1.5 ${
              isWhite ? 'bg-white text-[#D90000]' : 'bg-[#D90000] text-white'
            }`}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stylized Jaidi J Emblem with Crown */}
              <circle cx="50" cy="50" r="46" fill="currentColor" fillOpacity={isWhite ? "0.08" : "0.15"} />
              <path
                d="M 52 20 L 72 20 C 72 23 70 25 67 25 L 61 25 L 61 60 C 61 72 54 80 40 80 C 28 80 22 72 22 64 C 22 56 28 52 34 52 C 38 52 41 55 41 59 C 41 64 38 67 34 67 C 32 67 31 66 30 65 C 32 70 36 73 42 73 C 49 73 53 68 53 58 L 53 25 L 46 25 C 43 25 41 23 41 20 Z"
                fill={isWhite ? '#D90000' : '#FFFFFF'}
              />
              <path
                d="M 38 28 L 50 16 L 62 28 L 56 30 L 50 24 L 44 30 Z"
                fill={isWhite ? '#D90000' : '#FFD700'}
              />
            </svg>
          </div>
        )}
      </div>

      {variant !== 'mark' && (
        <div className="flex flex-col leading-none whitespace-nowrap">
          <span
            className={`${textSizes[size]} font-display font-bold tracking-tight uppercase whitespace-nowrap ${
              isWhite ? 'text-white' : 'text-[#111111]'
            }`}
          >
            Jaidi Pan Shop
          </span>
          <span
            className={`text-[9px] sm:text-[10px] tracking-wider font-semibold uppercase mt-0.5 whitespace-nowrap ${
              isWhite ? 'text-white/85' : 'text-[#D90000]'
            }`}
          >
            DHA Phase 4 · Lahore
          </span>
        </div>
      )}
    </div>
  );
};
