import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CountryProvider } from '@/lib/contexts/CountryContext';
import { CartProvider } from '@/lib/contexts/CartContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: {
    default: 'smrtQ Solutions — Power Without Limits',
    template: '%s | smrtQ Solutions',
  },
  description:
    'Premium portable power stations and solar panels for Nigeria, UAE, and Saudi Arabia. Clean, quiet, reliable energy — wherever you need it.',
  keywords: ['power station', 'portable power', 'solar panel', 'backup power', 'Nigeria', 'UAE', 'Saudi Arabia', 'LFP battery', 'smrtQ'],
  openGraph: {
    title: 'smrtQ Solutions — Power Without Limits',
    description: 'Premium portable power stations for Nigeria, UAE, and Saudi Arabia.',
    type: 'website',
    siteName: 'smrtQ Solutions',
    url: 'https://smrtq.com/',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://smrtq.com/' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'smrtQ Solutions',
  url: 'https://smrtq.com',
  logo: 'https://smrtq.com/logo.png',
  sameAs: [],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+234-800-000-0000',
      contactType: 'customer service',
      areaServed: 'NG',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+966-11-000-0000',
      contactType: 'customer service',
      areaServed: 'SA',
      availableLanguage: ['English', 'Arabic'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+971-4-000-0000',
      contactType: 'customer service',
      areaServed: 'AE',
      availableLanguage: ['English', 'Arabic'],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd data={organizationSchema} />
      </head>
      <body>
        <CountryProvider>
          <CartProvider>
            <ScrollProgress />
            <AnnouncementBar />
            <Header />
            <main><PageTransitionWrapper>{children}</PageTransitionWrapper></main>
            <Footer />
            <FloatingCTA />
          </CartProvider>
        </CountryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
