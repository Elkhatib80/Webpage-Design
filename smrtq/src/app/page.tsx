import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import ComparisonTable from '@/components/sections/ComparisonTable';
import WhySmrtQ from '@/components/sections/WhySmrtQ';
import UseCasesSection from '@/components/sections/UseCasesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'smrtQ Solutions — Smart Power. Anywhere.',
  description:
    'Premium LiFePO4 portable power stations for Nigeria, UAE, and Saudi Arabia. 512Wh to 3840Wh — pure sine wave, UPS mode, fast charging. End outages permanently.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProducts />
      <ComparisonTable />
      <WhySmrtQ />
      <UseCasesSection />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
