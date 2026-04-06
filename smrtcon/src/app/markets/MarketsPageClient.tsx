'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Ship, Globe } from 'lucide-react';
import GoldDivider from '@/components/ui/GoldDivider';
import { MARKETS } from '@/lib/data/markets';
import { IMAGES } from '@/lib/data/images';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export default function MarketsPageClient() {
  return (
    <div className="bg-charcoal pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="eyebrow text-gold mb-3">Global Reach</p>
          <h1 className="font-display text-4xl font-light text-cream sm:text-5xl md:text-6xl">
            Markets We Serve
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-body font-light text-concrete">
            From our headquarters in Mississauga, Ontario, we deliver premium
            construction materials to projects across three continents.
          </p>
          <GoldDivider className="mt-6" />
        </motion.div>

        <div className="mt-20 space-y-24">
          {MARKETS.map((market, i) => (
            <motion.section
              key={market.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative aspect-[16/10] overflow-hidden rounded-sm ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Image
                    src={IMAGES.markets[market.id as keyof typeof IMAGES.markets]}
                    alt={`${market.name} market`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${market.color}40 0%, transparent 60%)`,
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-5xl">{market.flagEmoji}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2
                    className="font-display text-3xl font-light sm:text-4xl"
                    style={{ color: market.color }}
                  >
                    {market.name}
                  </h2>
                  <p className="mt-2 text-sm text-stone">
                    {market.countries.join(' · ')}
                  </p>
                  <p className="mt-4 text-sm font-body font-light leading-relaxed text-concrete">
                    {market.description}
                  </p>

                  {/* Logistics */}
                  <div className="mt-6 rounded-sm border border-slate/20 bg-ink/50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-cream">
                      <Ship className="h-4 w-4 text-gold" />
                      Logistics
                    </div>
                    <p className="mt-2 text-xs font-body font-light text-concrete">
                      {market.logistics}
                    </p>
                    <p className="mt-1 text-xs text-stone">
                      Ports: {market.ports}
                    </p>
                  </div>

                  {/* Popular Products */}
                  <div className="mt-4">
                    <p className="eyebrow text-stone text-[10px] mb-2">
                      Popular Products
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {market.popularProducts.map((p) => (
                        <span
                          key={p}
                          className="rounded-sm bg-slate/30 px-2 py-1 text-xs text-concrete"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mt-4 flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-stone" />
                    <span className="text-xs text-stone">
                      Languages: {market.languages.join(', ')}
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={buildWhatsAppLink(market.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-sm py-3 px-6 text-sm font-medium text-white"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Us
                    </a>
                    <Link
                      href="/contact"
                      className="btn-gold inline-flex items-center justify-center rounded-sm py-3 px-6 text-sm font-medium"
                    >
                      Request a Quote
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
