'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import GoldDivider from '@/components/ui/GoldDivider';
import QuoteForm from '@/components/forms/QuoteForm';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { MARKETS } from '@/lib/data/markets';

export default function ContactPageClient() {
  return (
    <div className="bg-charcoal pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="eyebrow text-gold mb-3">Get In Touch</p>
          <h1 className="font-display text-4xl font-light text-cream sm:text-5xl md:text-6xl">
            Request a Quote
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-body font-light text-concrete">
            Tell us about your project and get a factory-direct quote in 48
            hours. No obligation, no middlemen.
          </p>
          <GoldDivider className="mt-6" />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <div>
              <h2 className="font-display text-2xl font-light text-cream">
                Direct Contact
              </h2>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="mailto:info@smrtcon.com"
                    className="flex items-center gap-3 text-sm text-concrete hover:text-gold transition-colors"
                  >
                    <Mail className="h-5 w-5 text-gold" />
                    info@smrtcon.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+1XXXXXXXXXX"
                    className="flex items-center gap-3 text-sm text-concrete hover:text-gold transition-colors"
                  >
                    <Phone className="h-5 w-5 text-gold" />
                    +1 (XXX) XXX-XXXX
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold flex-shrink-0" />
                  <span className="text-sm text-concrete">
                    Mississauga, Ontario
                    <br />
                    Canada
                  </span>
                </li>
              </ul>
            </div>

            {/* WhatsApp by Market */}
            <div>
              <h3 className="font-display text-xl font-light text-cream">
                WhatsApp by Market
              </h3>
              <div className="mt-4 space-y-3">
                {MARKETS.map((market) => (
                  <a
                    key={market.id}
                    href={buildWhatsAppLink(market.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-sm border border-slate/20 bg-ink/50 p-3 text-sm text-concrete hover:border-[#25D366]/30 hover:text-cream transition-all"
                  >
                    <MessageCircle
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: '#25D366' }}
                    />
                    <span>
                      {market.flagEmoji} {market.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="rounded-sm border border-gold/20 bg-gold/5 p-4">
              <p className="text-sm font-body font-medium text-gold">
                48-Hour Response Guarantee
              </p>
              <p className="mt-1 text-xs font-body font-light text-concrete">
                Every quote request receives a detailed response within 48
                business hours. For urgent inquiries, reach us on WhatsApp.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 rounded-sm border border-slate/20 bg-ink/30 p-6 sm:p-8"
          >
            <QuoteForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
