import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'smrtCON Construction Materials',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mississauga',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  email: 'info@smrtcon.com',
  url: 'https://smrtcon.com',
};

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get a quote for factory-direct construction materials. Contact smrtCON via our form, WhatsApp, or email. Based in Mississauga, Ontario.',
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
