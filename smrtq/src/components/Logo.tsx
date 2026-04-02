'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const heights = { sm: 36, md: 44, lg: 60 };

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const h = heights[size];
  const w = Math.round(h * (1100 / 333)); // preserves 1100×333 aspect ratio
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const showFallback = !imgLoaded || imgError;

  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label="smrtQ Solutions home">
      {/* Real logo image — shown once file is uploaded to public/assets/logo/ */}
      {!imgError && (
        <Image
          src="/assets/logo/smrtq_logo_web.png"
          alt="smrtQ Solutions"
          width={w}
          height={h}
          priority
          className={`object-contain transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
          style={{ maxHeight: h }}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      )}

      {/* SVG wordmark fallback — shown until real logo is present */}
      {showFallback && (
        <div className="flex items-center gap-2">
          {/* Lightbulb icon */}
          <svg
            viewBox="0 0 80 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: h * 0.85, width: 'auto' }}
            aria-hidden="true"
          >
            <path
              d="M40 4C24.5 4 12 16.5 12 32C12 42 17.5 50.5 25.5 55.5V65C25.5 67.2 27.3 69 29.5 69H50.5C52.7 69 54.5 67.2 54.5 65V55.5C62.5 50.5 68 42 68 32C68 16.5 55.5 4 40 4Z"
              fill="#F5A623"
            />
            <rect x="29" y="71" width="22" height="5" rx="2" fill="#F5A623" />
            <rect x="31" y="78" width="18" height="5" rx="2" fill="#F5A623" />
            <path d="M35 83 Q40 88 45 83" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M45 20L33 38H41L37 56L52 34H43L45 20Z" fill="#1A1A1A" />
          </svg>
          {/* Wordmark */}
          <div className="flex flex-col leading-none">
            <span
              className="font-black text-white"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: h * 0.68,
                letterSpacing: '-0.02em',
              }}
            >
              smrt<span style={{ color: '#F5A623' }}>Q</span>
            </span>
            <span
              className="text-gray-400 tracking-widest font-semibold"
              style={{ fontSize: h * 0.22, letterSpacing: '0.22em' }}
            >
              SOLUTIONS
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}
