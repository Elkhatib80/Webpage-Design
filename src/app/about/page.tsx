import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about smrtCON — the construction materials division of SMRTQ Solutions Inc. Based in Mississauga, Ontario, we connect builders to factory-direct materials from China.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
