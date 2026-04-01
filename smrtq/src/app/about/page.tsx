import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about smrtQ Solutions — our mission, story, and the team bringing premium power stations to Nigeria, UAE, and Saudi Arabia.',
};

export default function AboutPage() {
  return <AboutClient />;
}
