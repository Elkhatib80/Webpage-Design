'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: 10000, suffix: '+', label: 'Customers', prefix: '' },
  { value: 5, suffix: '-Year', label: 'Warranty', prefix: '' },
  { value: 99.8, suffix: '%', label: 'Uptime', prefix: '' },
  { value: 24, suffix: '/7', label: 'Support', prefix: '' },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const isDecimal = target % 1 !== 0;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };

    requestAnimationFrame(animate);
  }, [target, duration, start]);

  return count;
}

function StatCard({ value, suffix, label, prefix, delay, inView }: {
  value: number; suffix: string; label: string; prefix: string; delay: number; inView: boolean;
}) {
  const count = useCountUp(value, 1800, inView);
  const isDecimal = value % 1 !== 0;

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      <div
        className="text-5xl sm:text-6xl font-black gradient-text mb-2"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {prefix}{isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-500 font-medium tracking-wide">{label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <section className="relative py-20 bg-white overflow-hidden" ref={ref}>
      {/* Subtle yellow accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow to-transparent opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-16">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 100} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
