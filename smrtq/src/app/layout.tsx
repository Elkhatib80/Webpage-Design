import type { Metadata } from 'next';
import './globals.css';
import { CountryProvider } from '@/lib/contexts/CountryContext';
import { CartProvider } from '@/lib/contexts/CartContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CountryProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </CountryProvider>
      </body>
    </html>
  );
}
