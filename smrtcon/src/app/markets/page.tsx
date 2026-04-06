import type { Metadata } from 'next';
import MarketsPageClient from './MarketsPageClient';

export const metadata: Metadata = {
  title: 'Markets We Serve',
  description:
    'smrtCON serves Canada, Africa, and the Middle East with factory-direct construction materials. Learn about our logistics, products, and support in each market.',
};

export default function MarketsPage() {
  return <MarketsPageClient />;
}
