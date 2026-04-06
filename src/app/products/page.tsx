import type { Metadata } from 'next';
import ProductsPageClient from './ProductsPageClient';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse our complete catalogue of factory-direct construction materials — WPC decking, LVT flooring, kitchen cabinets, shower enclosures, padel courts, and more.',
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
