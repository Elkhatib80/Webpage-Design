'use client';

import { motion } from 'framer-motion';
import {
  MessageSquare,
  FileText,
  Factory,
  Truck,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import GoldDivider from '@/components/ui/GoldDivider';

const STEPS = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'Inquiry',
    description:
      'Share your specs, drawings, and quantities via WhatsApp or our quote request form. The more detail you provide, the more accurate our quote.',
    details: [
      'Product specifications and quantities',
      'Project location and delivery requirements',
      'Timeline and budget expectations',
      'Any custom requirements (sizes, colors, finishes)',
    ],
  },
  {
    num: '02',
    icon: FileText,
    title: 'Quote in 48 Hours',
    description:
      'We match your requirements to our vetted factory network and send a detailed quote within 48 hours — including specs, pricing, lead times, and shipping options.',
    details: [
      'Detailed product specifications',
      'Factory-direct pricing (FOB/CIF)',
      'Shipping and logistics options',
      'Production timeline estimate',
    ],
  },
  {
    num: '03',
    icon: Factory,
    title: 'Manufacturing & QC',
    description:
      'Once you approve the quote and confirm the order, we oversee production at the factory. You receive photo and video updates at every stage.',
    details: [
      'Pre-production sample approval',
      'Regular photo/video updates',
      'In-factory quality inspections',
      'Third-party QC available on request',
    ],
  },
  {
    num: '04',
    icon: Truck,
    title: 'Delivery',
    description:
      'We handle logistics from factory floor to your project site — sea freight, customs clearance, and last-mile trucking included.',
    details: [
      'Container loading inspection',
      'Sea/air freight coordination',
      'Customs clearance and documentation',
      'Last-mile delivery to site',
    ],
  },
];

const TIMELINE_EXAMPLES = [
  {
    product: 'WPC Decking (500 sqm)',
    steps: ['Quote: 2 days', 'Production: 4 weeks', 'Shipping: 4 weeks', 'Total: ~10 weeks'],
  },
  {
    product: 'Kitchen Cabinets (10 kitchens)',
    steps: ['Quote: 2 days', 'Design: 1 week', 'Production: 6 weeks', 'Shipping: 4 weeks', 'Total: ~12 weeks'],
  },
  {
    product: 'LVT Flooring (1,000 sqm)',
    steps: ['Quote: 1 day', 'Production: 3 weeks', 'Shipping: 4 weeks', 'Total: ~8 weeks'],
  },
];

const FAQS = [
  {
    q: 'What is the minimum order quantity (MOQ)?',
    a: 'MOQs vary by product category. For example, WPC decking starts at 100 sqm, LVT flooring at 500 sqm, and kitchen cabinets at 5 kitchens. Contact us for specific MOQs for your project.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Manufacturing typically takes 4-8 weeks depending on the product. Sea freight to Canada takes 4-6 weeks, to Middle East 2-3 weeks, and to Africa 3-5 weeks. Total project timeline is usually 8-14 weeks from order confirmation.',
  },
  {
    q: 'Do you provide samples before ordering?',
    a: 'Yes! We provide physical product samples for most categories. Sample shipping typically takes 5-7 business days via express courier. Sample costs may apply but are credited against your order.',
  },
  {
    q: 'What payment terms do you offer?',
    a: 'Standard terms are 30% deposit upon order confirmation, 70% balance against Bill of Lading (B/L). We accept wire transfer (T/T) and can discuss LC terms for large orders.',
  },
  {
    q: 'Do products meet Canadian building codes?',
    a: 'Yes. All products destined for Canada meet relevant Canadian standards including NRCan energy requirements for windows and HVAC, ASTM fire ratings, and CARB2 formaldehyde emission standards for cabinetry.',
  },
  {
    q: 'Can you handle customs and import duties?',
    a: 'For Canadian orders, we handle complete customs brokerage and HST processing. For international orders, we can arrange CIF delivery (including freight and insurance) or FOB Shanghai — your choice.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate/20">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-sm font-body font-medium text-cream pr-4">
          {q}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-gold transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pb-5"
        >
          <p className="text-sm font-body font-light leading-relaxed text-concrete">
            {a}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function HowItWorksPageClient() {
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
          <p className="eyebrow text-gold mb-3">Process</p>
          <h1 className="font-display text-4xl font-light text-cream sm:text-5xl md:text-6xl">
            How It Works
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-body font-light text-concrete">
            From initial inquiry to on-site delivery, we make sourcing
            factory-direct construction materials simple and transparent.
          </p>
          <GoldDivider className="mt-6" />
        </motion.div>

        {/* Steps */}
        <div className="mt-20 space-y-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 ${
                i % 2 === 1 ? '' : ''
              }`}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="font-display text-6xl font-semibold text-gold/20 sm:text-7xl">
                  {step.num}
                </span>
                <div className="mt-2 flex items-center gap-3">
                  <step.icon className="h-6 w-6 text-gold" />
                  <h2 className="font-display text-3xl font-light text-cream">
                    {step.title}
                  </h2>
                </div>
                <p className="mt-4 text-sm font-body font-light leading-relaxed text-concrete">
                  {step.description}
                </p>
              </div>
              <div
                className={`rounded-sm border border-slate/20 bg-ink/50 p-6 ${
                  i % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <p className="eyebrow text-gold text-[10px] mb-3">
                  What&apos;s involved
                </p>
                <ul className="space-y-3">
                  {step.details.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      <span className="text-sm font-body font-light text-concrete">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Examples */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <h2 className="text-center font-display text-3xl font-light text-cream">
            Example Timelines
          </h2>
          <GoldDivider className="mt-4" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TIMELINE_EXAMPLES.map((ex) => (
              <div
                key={ex.product}
                className="rounded-sm border border-slate/20 bg-ink/50 p-6"
              >
                <h3 className="font-display text-lg font-light text-gold">
                  {ex.product}
                </h3>
                <ul className="mt-4 space-y-2">
                  {ex.steps.map((s, i) => (
                    <li
                      key={s}
                      className={`text-sm font-body font-light ${
                        i === ex.steps.length - 1
                          ? 'border-t border-slate/20 pt-2 mt-3 font-medium text-cream'
                          : 'text-concrete'
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <h2 className="text-center font-display text-3xl font-light text-cream">
            Frequently Asked Questions
          </h2>
          <GoldDivider className="mt-4" />
          <div className="mx-auto mt-12 max-w-3xl">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
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
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-sm font-body font-light text-concrete">
            Send us your project details and we&apos;ll have a quote ready in 48
            hours.
          </p>
          <Link
            href="/contact"
            className="btn-gold mt-6 inline-block rounded-sm px-8 py-3.5 text-sm font-medium"
          >
            Request a Quote
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
