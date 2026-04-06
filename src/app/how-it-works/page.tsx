import type { Metadata } from 'next';
import HowItWorksPageClient from './HowItWorksPageClient';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the minimum order quantity (MOQ)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MOQs vary by product category. For example, WPC decking starts at 100 sqm, LVT flooring at 500 sqm, and kitchen cabinets at 5 kitchens. Contact us for specific MOQs for your project.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does shipping take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Manufacturing typically takes 4-8 weeks depending on the product. Sea freight to Canada takes 4-6 weeks, to Middle East 2-3 weeks, and to Africa 3-5 weeks. Total project timeline is usually 8-14 weeks from order confirmation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide samples before ordering?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We provide physical product samples for most categories. Sample shipping typically takes 5-7 business days via express courier. Sample costs may apply but are credited against your order.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment terms do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard terms are 30% deposit upon order confirmation, 70% balance against Bill of Lading (B/L). We accept wire transfer (T/T) and can discuss LC terms for large orders.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do products meet Canadian building codes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All products destined for Canada meet relevant Canadian standards including NRCan energy requirements for windows and HVAC, ASTM fire ratings, and CARB2 formaldehyde emission standards for cabinetry.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you handle customs and import duties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For Canadian orders, we handle complete customs brokerage and HST processing. For international orders, we can arrange CIF delivery (including freight and insurance) or FOB Shanghai — your choice.',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how smrtCON delivers factory-direct construction materials — from initial inquiry to on-site delivery in 4 simple steps.',
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HowItWorksPageClient />
    </>
  );
}
