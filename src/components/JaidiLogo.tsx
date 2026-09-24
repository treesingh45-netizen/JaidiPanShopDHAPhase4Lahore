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
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon Mark using the official Jaidi image */}
      <div
        className={`${iconSizes[size]} rounded-xl flex items-center justify-center p-0.5 shadow-sm shrink-0 relative overflow-hidden bg-neutral-900 border border-white/20`}
        title="Jaidi Pan Shop DHA Phase 4"
      >
        {!imgError ? (
          <img
            src={JAIDI_ICON_URL}
            alt="Jaidi Pan Shop Icon"
            className="w-full h-full object-cover rounded-[10px]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-[#D90000] flex items-center justify-center rounded-[10px]">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full p-1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 52 22 L 72 22 C 72 25 70 27 67 27 L 61 27 L 61 62 C 61 74 54 82 40 82 C 28 82 22 74 22 66 C 22 58 28 54 34 54 C 38 54 41 57 41 61 C 41 66 38 69 34 69 C 32 69 31 68 30 67 C 32 72 36 75 42 75 C 49 75 53 70 53 60 L 53 27 L 46 27 C 43 27 41 25 41 22 Z"
                fill="white"
              />
              <path
                d="M 44 38 C 44 35 48 33 54 33 C 60 33 63 35 63 38 C 63 42 59 44 54 44 C 49 44 46 42 46 40"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>

      {variant !== 'mark' && (
        <div className="flex flex-col leading-none">
          <span
            className={`${textSizes[size]} font-display font-bold tracking-tight uppercase ${
              variant === 'white' ? 'text-white' : 'text-[#111111]'
            }`}
          >
            Jaidi Pan Shop
          </span>
          <span
            className={`text-[10px] tracking-wider font-semibold uppercase mt-0.5 ${
              variant === 'white' ? 'text-white/80' : 'text-[#D90000]'
            }`}
          >
            DHA Phase 4 · Lahore
          </span>
        </div>
      )}
    </div>
  );
};
