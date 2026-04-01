'use client';

import { Home, Briefcase, Tent, Truck } from 'lucide-react';
import { useReveal } from '@/lib/hooks/useReveal';

const useCases = [
  {
    icon: Home,
    title: 'Home Backup',
    description: 'Keep your lights, fans, TV, and fridge running during power cuts. Silent, emission-free, and safe indoors.',
    color: 'from-yellow/20 to-yellow/5',
    borderColor: 'border-yellow/20',
    iconBg: 'bg-yellow/10',
  },
  {
    icon: Briefcase,
    title: 'Business Continuity',
    description: 'Protect your POS systems, computers, and critical equipment from costly downtime during outages.',
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/20',
    iconBg: 'bg-blue-500/10',
  },
  {
    icon: Tent,
    title: 'Outdoor & Camping',
    description: 'Power your campsite, desert camp, or beach retreat with clean, portable energy. No noise, no fumes.',
    color: 'from-green-500/20 to-green-500/5',
    borderColor: 'border-green-500/20',
    iconBg: 'bg-green-500/10',
  },
  {
    icon: Truck,
    title: 'Work & Field Sites',
    description: 'Run power tools, laptops, and communication equipment on remote job sites, oil fields, and farms.',
    color: 'from-orange-500/20 to-orange-500/5',
    borderColor: 'border-orange-500/20',
    iconBg: 'bg-orange-500/10',
  },
];

export default function UseCasesSection() {
  const { ref, inView } = useReveal();

  return (
    <section className="py-24 bg-black overflow-hidden" ref={ref as React.RefObject<HTMLElement>}>
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
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Use Cases</p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            POWER FOR EVERY NEED
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.title}
                className={`relative p-7 rounded-2xl border ${uc.borderColor} bg-gradient-to-br ${uc.color} backdrop-blur overflow-hidden group cursor-default`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms`,
                }}
              >
                <div className={`w-12 h-12 rounded-xl ${uc.iconBg} flex items-center justify-center mb-5`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {uc.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">{uc.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
