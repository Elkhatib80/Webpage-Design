'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { useReveal } from '@/lib/hooks/useReveal';

export default function CTABanner() {
  const { ref, inView } = useReveal();

  return (
    <section
      className="relative py-24 overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-yellow" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Large bolt watermark */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10">
        <Zap size={300} className="text-black" />
      </div>

      <div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <h2
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-black leading-none mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          READY TO POWER UP?
        </h2>
        <p className="text-black/70 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
          Join 10,000+ households and businesses across Nigeria, UAE, and Saudi Arabia who chose smrtQ.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="flex items-center gap-2 bg-black text-yellow px-8 py-4 rounded-xl text-base font-bold hover:bg-dark transition-all duration-200 hover:shadow-xl cursor-pointer"
          >
            <Zap size={18} />
            Shop Now
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 border-2 border-black text-black px-8 py-4 rounded-xl text-base font-bold hover:bg-black/10 transition-all duration-200 cursor-pointer"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
