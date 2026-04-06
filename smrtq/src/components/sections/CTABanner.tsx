'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCountry } from '@/lib/contexts/CountryContext';
import { countries } from '@/lib/countries';

export default function CTABanner() {
  const { countryCode } = useCountry();
  const country = countries[countryCode];

  return (
    <section className="relative py-24 overflow-hidden">
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
      <motion.div
        className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      >
        <Zap size={300} className="text-black" />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        key={countryCode}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <h2
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-black leading-none mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {country.ctaHeadline}
        </h2>
        <p className="text-black/70 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
          {country.ctaSubtext}
        </p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/products"
              className="flex items-center gap-2 bg-black text-yellow px-8 py-4 rounded-xl text-base font-bold hover:bg-dark transition-all duration-200 hover:shadow-xl cursor-pointer"
            >
              <Zap size={18} />
              Shop Now
              <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              className="flex items-center gap-2 border-2 border-black text-black px-8 py-4 rounded-xl text-base font-bold hover:bg-black/10 transition-all duration-200 cursor-pointer"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
