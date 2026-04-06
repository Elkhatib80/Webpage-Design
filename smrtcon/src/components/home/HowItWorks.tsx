'use client';

import { motion } from 'framer-motion';
import { MessageSquare, FileText, Factory, Truck } from 'lucide-react';
import GoldDivider from '@/components/ui/GoldDivider';

const STEPS = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'Inquiry',
    description:
      'Share your specs, drawings, and quantities via WhatsApp or our quote form. Tell us about your project and timeline.',
  },
  {
    num: '02',
    icon: FileText,
    title: 'Quote in 48h',
    description:
      'We source the best factory match and send you a detailed quote with specs, pricing, and lead times — within 48 hours.',
  },
  {
    num: '03',
    icon: Factory,
    title: 'Manufacturing',
    description:
      'We oversee quality control at the factory with photo and video updates at every stage. You stay informed.',
  },
  {
    num: '04',
    icon: Truck,
    title: 'Delivery',
    description:
      'FOB, CIF, or direct delivery to your project site. We handle logistics, customs, and last-mile coordination.',
  },
];

export default function HowItWorks() {
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
          <p className="eyebrow text-gold mb-3">Process</p>
          <h2 className="font-display text-4xl font-light text-cream sm:text-5xl">
            How We Work
          </h2>
          <GoldDivider className="mt-6" />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Connector line (not on last) */}
              {i < STEPS.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-full bg-gradient-to-r from-gold/30 to-transparent lg:block" style={{ left: '60%' }} />
              )}
              <span className="font-display text-5xl font-semibold text-gold/20">
                {step.num}
              </span>
              <div className="mt-4 flex items-center gap-3">
                <step.icon className="h-5 w-5 text-gold" />
                <h3 className="font-display text-xl font-light text-cream">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm font-body font-light leading-relaxed text-concrete">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
