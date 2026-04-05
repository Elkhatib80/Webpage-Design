'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingCart, Star, Zap, Shield, ChevronRight,
  CheckCircle, ArrowLeft, Plus, Minus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useCountry } from '@/lib/contexts/CountryContext';
import { useCart } from '@/lib/contexts/CartContext';
import { formatPrice } from '@/lib/countries';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ProductIllustration, { type ProductId } from '@/components/ProductIllustration';
import { JsonLd } from '@/components/JsonLd';
import { analytics } from '@/lib/analytics';

function toProductId(slug: string): ProductId {
  const parts = slug.split('-');
  const id = `${parts[0]}-${parts[1]}` as ProductId;
  return ['q-08', 'q-12', 'q-24', 'q-36'].includes(id) ? id : 'q-08';
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { countryCode } = useCountry();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'reviews'>('features');
  const [added, setAdded] = useState(false);

  const price = product.price[countryCode];
  const originalPrice = product.originalPrice?.[countryCode];
  const avgRating = product.reviews.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : null;

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  // Fire analytics view_item on mount
  useEffect(() => {
    analytics.viewProduct({ id: product.slug, name: product.name, price, category: product.category });
  }, [product, price]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, countryCode);
    analytics.addToCart({ id: product.slug, name: product.name, price, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // JSON-LD Product schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: 'smrtQ Solutions' },
    offers: {
      '@type': 'Offer',
      priceCurrency: countryCode === 'NG' ? 'NGN' : countryCode === 'AE' ? 'AED' : 'SAR',
      price: price,
      availability: 'https://schema.org/InStock',
    },
    ...(avgRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: product.reviews.length,
      },
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smrtq.com/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://smrtq.com/products/' },
      { '@type': 'ListItem', position: 3, name: product.name },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-16">
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <nav className="flex items-center gap-2 text-sm text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-yellow transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-yellow transition-colors">Products</Link>
          <ChevronRight size={14} />
          <span className="text-gray-600">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product visual */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <div
            className="relative aspect-square rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center p-8 shadow-sm"
            style={{ minHeight: '380px' }}
          >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.badge && (
                <span className="px-3 py-1 bg-yellow text-black text-xs font-bold rounded-full">
                  {product.badge}
                </span>
              )}
              {product.isNew && (
                <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">NEW</span>
              )}
            </div>

            {/* SVG Illustration */}
            <div className="w-full h-full max-w-[320px] mx-auto">
              <ProductIllustration productId={toProductId(product.slug)} />
            </div>
          </div>

          {/* Key specs strip */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: 'Capacity', value: product.capacity || '—' },
              { label: 'AC Output', value: product.wattage || '—' },
              { label: 'Warranty',  value: '5 Years' },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                <div className="text-sm font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product info */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <p className="text-yellow text-xs font-semibold tracking-widest uppercase mb-3">
            {product.category === 'power-station' ? 'Power Station' : 'Solar Panel'}
          </p>

          <h1
            className="text-4xl sm:text-5xl font-black text-gray-900 leading-none mb-2"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {product.name}
          </h1>
          <p className="text-yellow text-base font-semibold mb-4">{product.tagline}</p>

          {/* Rating */}
          {avgRating && (
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(avgRating) ? 'text-yellow fill-yellow' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {avgRating.toFixed(1)} ({product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          <p className="text-gray-600 leading-relaxed mb-7">{product.description}</p>

          {/* Price */}
          <div className="flex items-end gap-3 mb-7">
            <span
              className="text-4xl font-black text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {formatPrice(price, countryCode)}
            </span>
            {originalPrice && (
              <span className="text-lg text-gray-400 line-through pb-1">
                {formatPrice(originalPrice, countryCode)}
              </span>
            )}
            {originalPrice && (
              <span className="px-2 py-0.5 bg-red-50 text-red-500 text-sm font-semibold rounded pb-1">
                Save {Math.round((1 - price / originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center text-gray-900 font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <motion.button
              onClick={handleAddToCart}
              disabled={added}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer ${
                added ? 'bg-green-500 text-white' : 'btn-primary'
              }`}
              whileHover={added ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {added ? (
                <><CheckCircle size={18} />Added to Cart!</>
              ) : (
                <><ShoppingCart size={18} />Add to Cart</>
              )}
            </motion.button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200 mb-5">
            {[
              { icon: Shield, text: '5-Year Warranty' },
              { icon: Zap,    text: 'LFP Battery'    },
              { icon: CheckCircle, text: 'Free Shipping' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-gray-600">
                <Icon size={15} className="text-yellow" />
                {text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-green-600 font-medium">In Stock</span>
            <span className="text-gray-400">· Ships in 2–3 business days</span>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 border-b border-gray-200 overflow-x-auto">
            {(['features', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize whitespace-nowrap transition-all duration-200 border-b-2 cursor-pointer ${
                  activeTab === tab
                    ? 'border-yellow text-yellow'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${product.reviews.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="py-10">
            {activeTab === 'features' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {product.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex items-center justify-between px-5 py-3.5 text-sm ${
                      i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-medium text-gray-900 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-5 max-w-3xl">
                {product.reviews.map((r) => (
                  <div key={r.id} className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center text-sm font-bold text-yellow">
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                          <p className="text-xs text-gray-400">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} size={13} className="text-yellow fill-yellow" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="py-16 bg-[#F7F6F2] border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2
              className="text-3xl font-black text-gray-900 mb-8"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow transition-colors"
        >
          <ArrowLeft size={16} />
          Back to All Products
        </Link>
      </div>
    </div>
  );
}
