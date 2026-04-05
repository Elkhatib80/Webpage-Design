import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us — Born From Blackouts',
  description: 'smrtQ Solutions was founded to end generator dependency in Africa and the Middle East. Learn our story, mission, and values.',
  keywords: ['about smrtQ', 'portable power Nigeria', 'clean energy Africa', 'power station company', 'smrtQ Solutions'],
  openGraph: {
    title: 'About smrtQ Solutions | Power Without Limits',
    description: 'Born from Lagos blackouts, smrtQ Solutions brings clean portable power to Nigeria, UAE, and Saudi Arabia.',
    type: 'website',
    siteName: 'smrtQ Solutions',
  },
  alternates: { canonical: 'https://smrtq.com/about/' },
};

export default function AboutPage() {
  return <AboutClient />;
}
