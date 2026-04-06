'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import GoldDivider from '@/components/ui/GoldDivider';
import { MARKETS } from '@/lib/data/markets';
import { IMAGES } from '@/lib/data/images';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export default function MarketsSection() {
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
          <p className="eyebrow text-gold mb-3">Global Reach</p>
          <h2 className="font-display text-4xl font-light text-cream sm:text-5xl">
            Markets We Serve
          </h2>
          <GoldDivider className="mt-6" />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {MARKETS.map((market, i) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-sm"
            >
              {/* Background */}
              <div className="relative aspect-[3/4]">
                <Image
                  src={IMAGES.markets[market.id as keyof typeof IMAGES.markets]}
                  alt={`${market.name} market`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${market.color}CC 0%, ${market.color}40 40%, transparent 100%)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-3xl">{market.flagEmoji}</span>
                <h3 className="mt-2 font-display text-2xl font-light text-cream">
                  {market.name}
                </h3>
                <p className="mt-1 text-xs text-cream/70">
                  {market.countries.join(' · ')}
                </p>
                <p className="mt-3 text-sm font-body font-light text-cream/80 line-clamp-3">
                  {market.description}
                </p>
                <a
                  href={buildWhatsAppLink(market.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-sm bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-cream hover:bg-white/20 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" style={{ color: '#25D366' }} />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
