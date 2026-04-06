import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import ProductGrid from '@/components/home/ProductGrid';
import HowItWorks from '@/components/home/HowItWorks';
import MarketsSection from '@/components/home/MarketsSection';
import WhyUs from '@/components/home/WhyUs';
import Testimonials from '@/components/home/Testimonials';
import ContactCTA from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProductGrid />
      <HowItWorks />
      <MarketsSection />
      <WhyUs />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
