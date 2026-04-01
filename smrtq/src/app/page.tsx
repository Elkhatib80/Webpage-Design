import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import WhySmrtQ from '@/components/sections/WhySmrtQ';
import UseCasesSection from '@/components/sections/UseCasesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'smrtQ Solutions — Power Without Limits',
  description:
    'Premium portable power stations and solar panels for Nigeria, UAE, and Saudi Arabia. End power outages, power your adventures, and keep your business running.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProducts />
      <WhySmrtQ />
      <UseCasesSection />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
