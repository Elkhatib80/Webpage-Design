'use client';

import { motion } from 'framer-motion';
import GoldDivider from '@/components/ui/GoldDivider';

const TESTIMONIALS = [
  {
    quote:
      'smrtCON sourced our entire WPC decking package for a 200-unit condo project. Quality was excellent, and they saved us over 30% compared to local suppliers.',
    name: 'Ahmed K.',
    role: 'Project Manager',
    location: 'Toronto, Canada',
  },
  {
    quote:
      'The padel court we ordered was delivered on time and met FIP standards perfectly. Their team handled everything from design to shipping.',
    name: 'Omar S.',
    role: 'Sports Facility Developer',
    location: 'Dubai, UAE',
  },
  {
    quote:
      'We needed custom kitchen cabinets for a hotel project in Lagos. smrtCON delivered 120 kitchens on spec and on time. Impressive coordination.',
    name: 'Chioma A.',
    role: 'Interior Designer',
    location: 'Lagos, Nigeria',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-charcoal py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="eyebrow text-gold mb-3">Trusted By</p>
          <h2 className="font-display text-4xl font-light text-cream sm:text-5xl">
            What Our Clients Say
          </h2>
          <GoldDivider className="mt-6" />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-sm border border-slate/20 bg-ink/50 p-8"
            >
              <div className="font-display text-3xl text-gold/30">&ldquo;</div>
              <p className="mt-2 text-sm font-body font-light leading-relaxed text-concrete italic">
                {t.quote}
              </p>
              <footer className="mt-6 border-t border-slate/20 pt-4">
                <p className="text-sm font-body font-medium text-cream">{t.name}</p>
                <p className="text-xs text-stone">
                  {t.role} — {t.location}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
