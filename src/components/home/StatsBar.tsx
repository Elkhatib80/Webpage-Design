'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const STATS = [
  { label: 'Factory-Direct Pricing', value: 30, suffix: '%+', prefix: '', sublabel: 'Savings' },
  { label: 'Product Categories', value: 9, suffix: '', prefix: '' },
  { label: 'Years Sourcing', value: 5, suffix: '+', prefix: '' },
  { label: 'Markets Served', value: 3, suffix: '', prefix: '', sublabel: 'Canada + Africa + ME' },
];

export default function StatsBar() {
  return (
    <section className="bg-slate py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'backOut' }}
              className="text-center"
            >
              <div className="text-3xl text-gold sm:text-4xl">
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-2 text-sm font-body font-light text-concrete">
                {stat.label}
              </p>
              {stat.sublabel && (
                <p className="mt-0.5 text-xs text-stone">{stat.sublabel}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
