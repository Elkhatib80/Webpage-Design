'use client';

import { Shield, Zap, Wifi, Sun, Battery, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const features = [
  {
    icon: Battery,
    title: 'LFP Battery Technology',
    description: 'LiFePO4 chemistry offers 3,500+ cycles, superior thermal stability, and no thermal runaway risk. Built to last a decade.',
    accent: 'bg-yellow/10 border-yellow/25 text-yellow',
  },
  {
    icon: Zap,
    title: 'Ultra-Fast Charging',
    description: 'Go from 0 to 80% in under one hour with our dual-input fast charging — wall and solar simultaneously.',
    accent: 'bg-orange-50 border-orange-200 text-orange-500',
  },
  {
    icon: Shield,
    title: 'BMS Protection',
    description: '12-layer Battery Management System protects against overcharge, over-discharge, short circuit, and extreme temperatures.',
    accent: 'bg-blue-50 border-blue-200 text-blue-500',
  },
  {
    icon: Sun,
    title: 'Solar Ready',
    description: 'Every smrtQ station works with our solar panels out of the box. True off-grid independence in sunny climates.',
    accent: 'bg-green-50 border-green-200 text-green-500',
  },
  {
    icon: Wifi,
    title: 'Smart App Control',
    description: 'Monitor battery level, input/output wattage, charge schedules, and get alerts — all from your smartphone.',
    accent: 'bg-purple-50 border-purple-200 text-purple-500',
  },
  {
    icon: ThumbsUp,
    title: '5-Year Warranty',
    description: "We stand behind every unit. Industry-leading warranty with in-country service centers across Nigeria, UAE, and KSA.",
    accent: 'bg-yellow/10 border-yellow/25 text-yellow',
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

export default function WhySmrtQ() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Why Choose Us</p>
          <h2
            className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            ENGINEERED FOR EXCELLENCE
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Every detail designed for the demanding conditions of Africa and the Middle East.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group p-7 rounded-2xl border border-gray-200 bg-white hover:border-yellow/40 hover:shadow-lg transition-all duration-300 cursor-default"
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                whileHover={{ y: -4 }}
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${feature.accent}`}>
                  <Icon size={22} />
                </div>
                <h3
                  className="text-lg font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
