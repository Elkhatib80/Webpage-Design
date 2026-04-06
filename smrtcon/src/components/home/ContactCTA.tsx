'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp';

export default function ContactCTA() {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow text-gold mb-3">Let&apos;s Talk</p>
            <h2 className="font-display text-4xl font-light text-cream sm:text-5xl">
              Ready to Source Smarter?
            </h2>
            <p className="mt-4 max-w-md text-base font-body font-light leading-relaxed text-concrete">
              Tell us about your project and get a factory-direct quote in 48
              hours. No obligation, no middlemen.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="btn-gold inline-flex items-center justify-center gap-2 rounded-sm px-8 py-3.5 text-sm font-medium"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={buildWhatsAppLink(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center gap-2 rounded-sm px-8 py-3.5 text-sm"
              >
                <MessageCircle className="h-4 w-4" style={{ color: '#25D366' }} />
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          {/* Right — Key info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-sm border border-slate/20 bg-charcoal/50 p-8 lg:p-12"
          >
            <h3 className="font-display text-2xl font-light text-cream">
              What to Expect
            </h3>
            <ul className="mt-6 space-y-4">
              {[
                'Detailed quote within 48 hours',
                'Factory samples shipped to you',
                'Transparent pricing — no hidden fees',
                'Dedicated project coordinator',
                'Quality photos & videos during production',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                  <span className="text-sm font-body font-light text-concrete">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-slate/20 pt-6">
              <p className="text-xs text-stone">
                info@smrtcon.com &middot; Mississauga, Ontario, Canada
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
