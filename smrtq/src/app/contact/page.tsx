import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with smrtQ Solutions. We have dedicated support teams in Nigeria, UAE, and Saudi Arabia.',
};

export default function ContactPage() {
  return <ContactClient />;
}
