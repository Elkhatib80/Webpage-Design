'use client';

import { motion } from 'framer-motion';
import {
  Factory,
  ShieldCheck,
  Globe,
  Ruler,
  MapPin,
  Zap,
} from 'lucide-react';
import GoldDivider from '@/components/ui/GoldDivider';

const REASONS = [
  {
    icon: Factory,
    title: 'Factory-Direct Pricing',
    description: 'No middleman markup. We source directly from vetted manufacturers, passing savings to you.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Verified',
    description: 'Factory audits, pre-production samples, and QC photo/video reports at every stage.',
  },
  {
    icon: Globe,
    title: 'Global Logistics',
    description: 'Land, sea, and air freight options. FOB, CIF, or door-to-door delivery worldwide.',
  },
  {
    icon: Ruler,
    title: 'Custom Specifications',
    description: 'Sizes, colors, finishes, and configurations manufactured to your exact project specs.',
  },
  {
    icon: MapPin,
    title: 'Canadian HQ',
    description: 'Based in Mississauga, Ontario — local accountability, Canadian business practices.',
  },
  {
    icon: Zap,
    title: 'Fast Quotes',
    description: '48-hour turnaround on detailed quotes. Responsive WhatsApp support in your timezone.',
  },
];

export default function WhyUs() {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="eyebrow text-gold mb-3">Advantage</p>
          <h2 className="font-display text-4xl font-light text-cream sm:text-5xl">
            Why smrtCON
          </h2>
          <GoldDivider className="mt-6" />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-sm border border-slate/30 bg-charcoal/50 p-6"
            >
              <reason.icon className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-lg font-light text-cream">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm font-body font-light leading-relaxed text-concrete">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
