'use client';

import { Shield, Zap, Wifi, Sun, Battery, ThumbsUp } from 'lucide-react';
import { useReveal } from '@/lib/hooks/useReveal';

const features = [
  {
    icon: Battery,
    title: 'LFP Battery Technology',
    description: 'LiFePO4 chemistry offers 3,500+ cycles, superior thermal stability, and no thermal runaway risk. Built to last a decade.',
  },
  {
    icon: Zap,
    title: 'Ultra-Fast Charging',
    description: 'Go from 0 to 80% in under one hour with our dual-input fast charging — wall and solar simultaneously.',
  },
  {
    icon: Shield,
    title: 'BMS Protection',
    description: '12-layer Battery Management System protects against overcharge, over-discharge, short circuit, and extreme temperatures.',
  },
  {
    icon: Sun,
    title: 'Solar Ready',
    description: 'Every smrtQ station works with our solar panels out of the box. True off-grid independence in sunny climates.',
  },
  {
    icon: Wifi,
    title: 'Smart App Control',
    description: 'Monitor battery level, input/output wattage, charge schedules, and get alerts — all from your smartphone.',
  },
  {
    icon: ThumbsUp,
    title: '5-Year Warranty',
    description: "We stand behind every unit. Industry-leading warranty with in-country service centers across Nigeria, UAE, and KSA.",
  },
];

export default function WhySmrtQ() {
  const { ref, inView } = useReveal();

  return (
    <section className="py-24 bg-surface" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Why Choose Us</p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            ENGINEERED FOR EXCELLENCE
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Every detail designed for the demanding conditions of Africa and the Middle East.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-7 rounded-2xl border border-white/5 bg-dark-2 hover:border-yellow/20 hover:bg-dark-3 transition-all duration-300 cursor-default"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.7s ease ${i * 80}ms, transform 0.7s ease ${i * 80}ms`,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-yellow/10 border border-yellow/20 flex items-center justify-center mb-5 group-hover:bg-yellow/20 transition-colors">
                  <Icon size={22} className="text-yellow" />
                </div>
                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
