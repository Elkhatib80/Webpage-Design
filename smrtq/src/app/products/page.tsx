import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse smrtQ power stations, solar panels, and accessories. Available in Nigeria, UAE, and Saudi Arabia.',
};

export default function ProductsPage() {
  return <ProductsClient />;
}
