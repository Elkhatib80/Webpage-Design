import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import './globals.css';

const displayFont = localFont({
  src: [
    {
      path: '../fonts/cormorant-garamond-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/cormorant-garamond-light-italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/cormorant-garamond-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/cormorant-garamond-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

const bodyFont = localFont({
  src: [
    {
      path: '../fonts/dm-sans-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/dm-sans-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/dm-sans-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/dm-sans-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | smrtCON Construction Materials',
    default: 'smrtCON — Premium Construction Materials for Canada, Africa & Middle East',
  },
  description:
    'smrtCON delivers factory-direct premium construction materials — WPC decking, LVT flooring, kitchen cabinets, shower enclosures, padel courts and more. Serving Canada, Africa, and the Middle East.',
  metadataBase: new URL('https://smrtcon.com'),
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'smrtCON',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'smrtCON — Smart Construction Materials',
  url: 'https://smrtcon.com',
  logo: 'https://smrtcon.com/logo.png',
  description:
    'Factory-direct premium construction materials for Canada, Africa and Middle East',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mississauga',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'info@smrtcon.com',
    availableLanguage: ['English', 'Arabic', 'French'],
  },
  areaServed: ['CA', 'NG', 'EG', 'KE', 'GH', 'AE', 'SA', 'QA'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
