'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { IMAGES } from '@/lib/data/images';
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={IMAGES.hero}
        alt="Modern construction site with premium building materials"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/90" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-gold mb-6"
        >
          Canada &middot; Africa &middot; Middle East
        </motion.p>

        <motion.h1
          {...fadeInUp}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-light leading-tight tracking-wide text-cream sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Where Precision{' '}
          <em className="font-light italic text-gold">Meets</em> Materials.
        </motion.h1>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base font-body font-light leading-relaxed text-concrete sm:text-lg"
        >
          Factory-direct construction supplies — WPC decking, flooring, cabinetry,
          shower enclosures and more — delivered to your project, anywhere.
        </motion.p>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/contact"
            className="btn-gold rounded-sm px-8 py-3.5 text-sm font-body font-medium tracking-wide"
          >
            Request a Quote
          </Link>
          <a
            href={buildWhatsAppLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-body"
          >
            <MessageCircle className="h-4 w-4" style={{ color: '#25D366' }} />
            WhatsApp Us
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6 text-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
