'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Eye, Zap } from 'lucide-react';
import GoldDivider from '@/components/ui/GoldDivider';
import { IMAGES } from '@/lib/data/images';

const VALUES = [
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'We show you exactly where your materials come from, how they are made, and what they cost. No hidden markups, no surprises.',
  },
  {
    icon: Shield,
    title: 'Quality',
    description:
      'Every product is sourced from vetted, audited factories. We inspect at every stage — pre-production, in-line, and pre-shipment.',
  },
  {
    icon: Zap,
    title: 'Speed',
    description:
      'Quotes in 48 hours. Responsive WhatsApp support. Efficient logistics. We value your time as much as your project.',
  },
];

export default function AboutPageClient() {
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
          <p className="eyebrow text-gold mb-3">Our Story</p>
          <h1 className="font-display text-4xl font-light text-cream sm:text-5xl md:text-6xl">
            About smrtCON
          </h1>
          <GoldDivider className="mt-6" />
        </motion.div>

        {/* Who We Are */}
        <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-3xl font-light text-cream">
              Who We Are
            </h2>
            <p className="mt-4 text-sm font-body font-light leading-relaxed text-concrete">
              smrtCON is the construction materials division of{' '}
              <strong className="text-cream">SMRTQ Solutions Inc.</strong>,
              headquartered in Mississauga, Ontario, Canada. We bridge the gap
              between world-class Chinese manufacturing and construction
              projects in Canada, Africa, and the Middle East.
            </p>
            <p className="mt-3 text-sm font-body font-light leading-relaxed text-concrete">
              Our mission is simple: deliver premium construction materials at
              factory-direct prices, with the quality assurance and
              accountability of a Canadian company. We cut out the middlemen,
              the markups, and the uncertainty — so you get better materials for
              less.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-sm"
          >
            <Image
              src={IMAGES.about}
              alt="smrtCON team and operations"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </motion.div>
        </div>

        {/* Sourcing Network */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:order-2">
              <Image
                src={IMAGES.factory}
                alt="Factory inspection and quality control"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
            <div className="lg:order-1">
              <h2 className="font-display text-3xl font-light text-cream">
                Our Sourcing Network
              </h2>
              <p className="mt-4 text-sm font-body font-light leading-relaxed text-concrete">
                Over the past 5+ years, we&apos;ve built a carefully vetted
                network of manufacturing partners across China&apos;s key
                production hubs. Each factory is selected based on production
                quality, capacity, certifications, and export experience.
              </p>
              <p className="mt-3 text-sm font-body font-light leading-relaxed text-concrete">
                We don&apos;t just source — we verify. Our China-side QC
                partners conduct factory audits, pre-production checks, in-line
                inspections, and pre-shipment quality controls. Every order is
                documented with photos and video so you can see your materials
                being made.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Vetted factory partners for each product category',
                  'On-site QC inspectors at major production hubs',
                  'Factory audit reports available on request',
                  'Photo & video documentation at every production stage',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span className="text-sm font-body font-light text-concrete">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Our Team */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-light text-cream">
                Our Team
              </h2>
              <p className="mt-4 text-sm font-body font-light leading-relaxed text-concrete">
                Our team combines Canadian business accountability with deep
                China-side sourcing expertise. We&apos;re fluent in English,
                Arabic, and Mandarin — ensuring seamless communication across
                every market we serve.
              </p>
              <p className="mt-3 text-sm font-body font-light leading-relaxed text-concrete">
                When you work with smrtCON, you get a dedicated project
                coordinator who manages your order from quote to delivery.
                You&apos;re never passed around — one point of contact, start to
                finish.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={IMAGES.team}
                alt="smrtCON team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <h2 className="text-center font-display text-3xl font-light text-cream">
            Our Values
          </h2>
          <GoldDivider className="mt-4" />
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-sm border border-slate/20 bg-ink/50 p-8 text-center"
              >
                <v.icon className="mx-auto h-8 w-8 text-gold" />
                <h3 className="mt-4 font-display text-xl font-light text-cream">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm font-body font-light text-concrete">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 text-center"
        >
          <h2 className="font-display text-3xl font-light text-cream">
            Let&apos;s Build Together
          </h2>
          <p className="mt-3 text-sm font-body font-light text-concrete">
            Ready to source smarter? Get in touch and let&apos;s discuss your
            project.
          </p>
          <Link
            href="/contact"
            className="btn-gold mt-6 inline-block rounded-sm px-8 py-3.5 text-sm font-medium"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
