import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'All Products — Power Stations & Solar Panels',
  description: 'Shop smrtQ power stations (512Wh–3840Wh) and solar panels. Premium LiFePO4 portable power for Nigeria, UAE, and Saudi Arabia. Free shipping.',
  keywords: [
    'portable power station', 'solar panel', 'LFP battery', 'backup power',
    'smrtQ Q-08', 'smrtQ Q-12', 'smrtQ Q-24', 'smrtQ Q-36',
    'power station Nigeria', 'power station UAE', 'power station Saudi Arabia',
  ],
  openGraph: {
    title: 'smrtQ Products — Power Stations & Solar Panels',
    description: 'Premium portable power stations from 512Wh to 3840Wh. Available in Nigeria, UAE, and Saudi Arabia with free shipping.',
    type: 'website',
    siteName: 'smrtQ Solutions',
  },
  alternates: { canonical: 'https://smrtq.com/products/' },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
