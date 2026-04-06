'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/contexts/CartContext';
import { useCountry } from '@/lib/contexts/CountryContext';
import { formatPrice } from '@/lib/countries';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ProductIllustration, { type ProductId } from '@/components/ProductIllustration';

function toProductId(slug: string): ProductId {
  const parts = slug.split('-');
  const id = `${parts[0]}-${parts[1]}` as ProductId;
  return ['q-08', 'q-12', 'q-24', 'q-36'].includes(id) ? id : 'q-08';
}

export default function CartClient() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const { countryCode } = useCountry();

  const recommended = products
    .filter((p) => !items.some((i) => i.product.id === p.id))
    .slice(0, 3);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-16 flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-yellow" />
          </div>
          <h1
            className="text-4xl font-black text-gray-900 mb-3"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            YOUR CART IS EMPTY
          </h1>
          <p className="text-gray-500 mb-8">Add some power stations or solar panels to get started.</p>
          <Link href="/products" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold">
            <Zap size={18} />
            Shop Products
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Recommendations */}
        {recommended.length > 0 && (
          <div className="w-full max-w-7xl mt-20 px-4 sm:px-6">
            <h2
              className="text-2xl font-black text-gray-900 mb-8 text-center"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              POPULAR PRODUCTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommended.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1
            className="text-4xl sm:text-5xl font-black text-gray-900"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            YOUR CART
            <span className="text-yellow ml-3">({totalItems})</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, idx) => {
            const price = item.product.price[countryCode];
            return (
              <motion.div
                key={item.product.id}
                className="p-5 rounded-2xl border border-gray-200 bg-white flex gap-5 shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
              >
                {/* Product illustration */}
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden p-2">
                  <ProductIllustration productId={toProductId(item.product.slug)} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-bold text-gray-900 hover:text-yellow transition-colors leading-tight"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.1rem' }}
                    >
                      {item.product.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0 cursor-pointer"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{item.product.tagline}</p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    {/* Qty */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm text-gray-900 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="font-bold text-gray-900" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.1rem' }}>
                      {formatPrice(price * item.quantity, countryCode)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Clear cart */}
          <div className="text-right">
            <button
              onClick={clearCart}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear cart
            </button>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
            <h2
              className="text-2xl font-black text-gray-900 mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              ORDER SUMMARY
            </h2>

            {/* Line items */}
            <div className="space-y-3 mb-5">
              {items.map((item) => {
                const price = item.product.price[countryCode];
                return (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-500 truncate mr-2">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-gray-700 flex-shrink-0">
                      {formatPrice(price * item.quantity, countryCode)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Shipping</span>
                <span className="text-green-500 text-sm font-medium">Free</span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-gray-900 font-bold text-lg">Total</span>
                <span
                  className="text-yellow font-black text-2xl"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {formatPrice(totalPrice, countryCode)}
                </span>
              </div>
            </div>

            {/* Checkout button */}
            <motion.button
              className="btn-primary w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => alert('Checkout integration coming soon!')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </motion.button>

            {/* Trust */}
            <div className="mt-5 space-y-2">
              {[
                { icon: Shield, text: '5-Year Warranty Included' },
                { icon: Zap, text: 'Free Delivery in 2–3 days' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                  <Icon size={13} className="text-yellow" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Continue shopping */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow transition-colors">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
