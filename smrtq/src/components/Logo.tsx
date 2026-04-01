import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const scales = { sm: 'h-8', md: 'h-10', lg: 'h-14' };

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`} aria-label="smrtQ Solutions home">
      {/* Lightbulb icon */}
      <div className={`relative ${scales[size]} aspect-square flex-shrink-0`}>
        <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          {/* Outer bulb shape */}
          <path
            d="M40 4C24.5 4 12 16.5 12 32C12 42 17.5 50.5 25.5 55.5V65C25.5 67.2 27.3 69 29.5 69H50.5C52.7 69 54.5 67.2 54.5 65V55.5C62.5 50.5 68 42 68 32C68 16.5 55.5 4 40 4Z"
            fill="#F5C518"
            stroke="#F5C518"
            strokeWidth="1"
          />
          {/* Bottom cap */}
          <rect x="29" y="71" width="22" height="5" rx="2" fill="#F5C518" />
          <rect x="31" y="78" width="18" height="5" rx="2" fill="#F5C518" />
          {/* Curly bottom */}
          <path d="M35 83 Q40 88 45 83" stroke="#F5C518" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Lightning bolt */}
          <path
            d="M45 20L33 38H41L37 56L52 34H43L45 20Z"
            fill="#0A0A0A"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span
          className="font-black tracking-tight text-white"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: size === 'sm' ? '1.4rem' : size === 'md' ? '1.75rem' : '2.25rem',
            letterSpacing: '-0.02em',
          }}
        >
          smrt<span style={{ color: '#F5C518' }}>Q</span>
        </span>
        <span
          className="tracking-widest text-gray-400"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: size === 'sm' ? '0.45rem' : size === 'md' ? '0.55rem' : '0.7rem',
            letterSpacing: '0.25em',
            fontWeight: 600,
          }}
        >
          SOLUTIONS
        </span>
      </div>
    </Link>
  );
}
