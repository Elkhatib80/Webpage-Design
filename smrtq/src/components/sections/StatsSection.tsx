'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useCountry } from '@/lib/contexts/CountryContext';
import { countries } from '@/lib/countries';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function StatCard({
  display,
  label,
  delay,
  inView,
}: {
  display: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: delay / 1000, ease: EASE }}
    >
      <div
        className="text-5xl sm:text-6xl font-black gradient-text mb-2"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {display}
      </div>
      <div className="text-sm text-gray-500 font-medium tracking-wide">{label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const { countryCode } = useCountry();
  const country = countries[countryCode];
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [countryCode]);

  return (
    <section className="relative py-20 bg-white overflow-hidden" ref={ref}>
      {/* Subtle yellow accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow to-transparent opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-16">
          {country.statsBar.map((stat, i) => (
            <StatCard
              key={`${countryCode}-${stat.label}`}
              display={stat.display}
              label={stat.label}
              delay={i * 100}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
