'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 10000, suffix: '+', label: 'Customers Powered', prefix: '' },
  { value: 5, suffix: '-Year', label: 'Warranty Guarantee', prefix: '' },
  { value: 99.8, suffix: '%', label: 'Uptime Rate', prefix: '' },
  { value: 24, suffix: '/7', label: 'Customer Support', prefix: '' },
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
    <div
      className="text-center reveal"
      style={{
        animationDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <div
        className="text-5xl sm:text-6xl font-black gradient-text mb-2"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {prefix}{isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-400 font-medium tracking-wide">{label}</div>
    </div>
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
    <section className="relative py-20 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface to-black" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #F5C518 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 100} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
