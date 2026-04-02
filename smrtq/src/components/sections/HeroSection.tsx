'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import { useCountry } from '@/lib/contexts/CountryContext';
import { countries } from '@/lib/countries';

export default function HeroSection() {
  const { countryCode } = useCountry();
  const country = countries[countryCode];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        {/* Radial yellow glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #F5C518 0%, transparent 70%)' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,197,24,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Diagonal lines */}
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(245,197,24,0.05) 0px, rgba(245,197,24,0.05) 1px, transparent 1px, transparent 60px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        {/* Country badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 animate-fade-in">
          <span className="text-base">{country.flag}</span>
          <span>Now available in {country.name}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>

        {/* Main headline */}
        <h1
          className="font-black leading-none mb-6 animate-fade-in-up"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          <span className="block text-white" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
            POWER WITHOUT
          </span>
          <span
            className="block gradient-text yellow-glow-text"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            LIMITS
          </span>
        </h1>

        {/* Country-specific subline */}
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-100">
          {country.heroSubline}
        </p>

        {/* Model range pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 animate-fade-in-up delay-100">
          {[
            { label: 'Q-08', sub: '512Wh', href: '/products/q-08-512wh' },
            { label: 'Q-12', sub: '1024Wh', href: '/products/q-12-1024wh' },
            { label: 'Q-24', sub: '2048Wh', href: '/products/q-24-2048wh' },
            { label: 'Q-36', sub: '3840Wh', href: '/products/q-36-3840wh', highlight: true },
          ].map((m) => (
            <Link
              key={m.label}
              href={m.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer ${
                m.highlight
                  ? 'bg-yellow/10 border-yellow/50 text-yellow'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:border-yellow/30 hover:text-white'
              }`}
            >
              {m.label}
              <span className={`font-normal ${m.highlight ? 'text-yellow/70' : 'text-gray-500'}`}>· {m.sub}</span>
              {m.highlight && <span className="text-yellow/60">★ Flagship</span>}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-200">
          <Link
            href="/products"
            className="btn-primary flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold w-full sm:w-auto justify-center"
          >
            <Zap size={18} />
            Shop Power Stations
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/about"
            className="btn-outline flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold w-full sm:w-auto justify-center"
          >
            Learn More
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 animate-fade-in delay-300">
          {[
            { icon: Shield, label: '5-Year Warranty' },
            { icon: Star, label: '4.9 / 5 Rating' },
            { icon: Zap, label: 'LFP Battery Tech' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-gray-400">
              <Icon size={16} className="text-yellow" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500">
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <div
            className="w-1 h-2 rounded-full bg-yellow"
            style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
