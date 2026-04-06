import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch',
  description: 'Reach smrtQ Solutions in Nigeria, UAE, or Saudi Arabia. Request a quote, get technical support, or inquire about becoming a dealer.',
  keywords: ['contact smrtQ', 'power station support', 'quote request', 'dealer enquiry', 'smrtQ Nigeria', 'smrtQ UAE', 'smrtQ Saudi Arabia'],
  openGraph: {
    title: 'Contact smrtQ Solutions | Local Support in 3 Countries',
    description: 'Our dedicated teams in Nigeria, UAE, and Saudi Arabia are ready to help with product advice, support, or dealer information.',
    type: 'website',
    siteName: 'smrtQ Solutions',
  },
  alternates: { canonical: 'https://smrtq.com/contact/' },
};

export default function ContactPage() {
  return <ContactClient />;
}
