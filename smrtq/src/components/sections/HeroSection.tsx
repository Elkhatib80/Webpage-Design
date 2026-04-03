'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCountry } from '@/lib/contexts/CountryContext';
import { countries } from '@/lib/countries';
import { products } from '@/lib/products';

const trustBadges = [
  { icon: Shield, label: '5-Year Warranty' },
  { icon: Star,   label: '4.9 / 5 Rating'  },
  { icon: Zap,    label: 'LFP Battery Tech' },
] as const;

const modelPills = products
  .filter((p) => p.category === 'power-station')
  .map((p) => ({
    label:     p.name.replace('smrtQ ', ''),
    sub:       p.capacity ?? '',
    href:      `/products/${p.slug}`,
    highlight: !!p.isFlagship,
  }));

// Animation variants
const spring = { type: 'spring', stiffness: 260, damping: 28 };

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: spring },
};

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
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,166,35,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Country badge */}
        <motion.div variants={fadeIn}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8">
            <span className="text-base">{country.flag}</span>
            <span>Now available in {country.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-black leading-none mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          variants={fadeUp}
        >
          <span className="block text-white" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
            POWER WITHOUT
          </span>
          <span className="block gradient-text yellow-glow-text" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
            LIMITS
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp}
        >
          {country.heroSubline}
        </motion.p>

        {/* Model pills */}
        <motion.div className="flex flex-wrap items-center justify-center gap-2 mb-8" variants={fadeUp}>
          {modelPills.map((m) => (
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
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          variants={container}
        >
          <motion.div variants={scaleIn}>
            <Link
              href="/products"
              className="btn-primary flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold w-full sm:w-auto justify-center"
            >
              <Zap size={18} />
              Shop Power Stations
              <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div variants={scaleIn}>
            <Link
              href="/about"
              className="btn-outline-white flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold w-full sm:w-auto justify-center"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          variants={container}
        >
          {trustBadges.map(({ icon: Icon, label }) => (
            <motion.div key={label} className="flex items-center gap-2 text-sm text-gray-400" variants={fadeIn}>
              <Icon size={16} className="text-yellow" />
              {label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-yellow" style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }} />
        </div>
      </motion.div>

      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
