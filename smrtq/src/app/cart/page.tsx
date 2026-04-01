import type { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review your smrtQ order and proceed to checkout.',
};

export default function CartPage() {
  return <CartClient />;
}
