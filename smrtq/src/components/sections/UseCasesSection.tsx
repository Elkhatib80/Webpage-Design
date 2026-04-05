'use client';

import { Home, Briefcase, Tent, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const useCases = [
  {
    icon: Home,
    title: 'Home Backup',
    description: 'Keep your lights, fans, TV, and fridge running during power cuts. Silent, emission-free, and safe indoors.',
    gradient: 'from-yellow/15 to-yellow/5',
    border: 'border-yellow/25',
    iconBg: 'bg-yellow/10 text-yellow',
  },
  {
    icon: Briefcase,
    title: 'Business Continuity',
    description: 'Protect your POS systems, computers, and critical equipment from costly downtime during outages.',
    gradient: 'from-blue-100 to-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Tent,
    title: 'Outdoor & Camping',
    description: 'Power your campsite, desert camp, or beach retreat with clean, portable energy. No noise, no fumes.',
    gradient: 'from-green-100 to-green-50',
    border: 'border-green-200',
    iconBg: 'bg-green-100 text-green-600',
  },
  {
    icon: Truck,
    title: 'Work & Field Sites',
    description: 'Run power tools, laptops, and communication equipment on remote job sites, oil fields, and farms.',
    gradient: 'from-orange-100 to-orange-50',
    border: 'border-orange-200',
    iconBg: 'bg-orange-100 text-orange-600',
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

export default function UseCasesSection() {
  return (
    <section className="py-24 bg-[#F7F6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Use Cases</p>
          <h2
            className="text-4xl sm:text-5xl font-black text-gray-900"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            POWER FOR EVERY NEED
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                className={`relative p-7 rounded-2xl border ${uc.border} bg-gradient-to-br ${uc.gradient} overflow-hidden group cursor-default hover:shadow-md transition-shadow duration-300`}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 rounded-xl ${uc.iconBg} flex items-center justify-center mb-5`}>
                  <Icon size={22} />
                </div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {uc.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{uc.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
