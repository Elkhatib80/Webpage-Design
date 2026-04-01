'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart, Star, Zap, Shield, ChevronRight,
  Battery, CheckCircle, ArrowLeft, Plus, Minus
} from 'lucide-react';
import { Product } from '@/types';
import { useCountry } from '@/lib/contexts/CountryContext';
import { useCart } from '@/lib/contexts/CartContext';
import { formatPrice } from '@/lib/countries';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

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

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, countryCode);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <nav className="flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-yellow transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-yellow transition-colors">Products</Link>
          <ChevronRight size={14} />
          <span className="text-gray-300">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product visual */}
        <div className="relative">
          <div
            className="relative aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-dark-2 to-dark-3 overflow-hidden flex items-center justify-center"
            style={{ minHeight: '380px' }}
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(245,197,24,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Yellow glow */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 60%, rgba(245,197,24,0.08) 0%, transparent 70%)',
              }}
            />
            {/* Product icon */}
            <div className="relative z-10 text-center">
              <div
                className="w-40 h-28 rounded-2xl border-2 border-yellow/30 bg-black/50 flex items-center justify-center mx-auto mb-4 animate-float"
                style={{ boxShadow: '0 0 60px rgba(245,197,24,0.15)' }}
              >
                {product.category === 'power-station' ? (
                  <Battery size={56} className="text-yellow" />
                ) : (
                  <Zap size={56} className="text-yellow" />
                )}
              </div>
              <p className="text-sm text-gray-500">{product.name}</p>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="px-3 py-1 bg-yellow text-black text-xs font-bold rounded-full">
                  {product.badge}
                </span>
              )}
              {product.isNew && (
                <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">NEW</span>
              )}
            </div>
          </div>

          {/* Key specs strip below image */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: 'Capacity', value: product.capacity || product.wattage || '—' },
              { label: 'Output', value: product.wattage || '—' },
              { label: 'Warranty', value: '5 Years' },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-dark-2 border border-white/5">
                <div className="text-sm font-bold text-white">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          {/* Category */}
          <p className="text-yellow text-xs font-semibold tracking-widest uppercase mb-3">
            {product.category === 'power-station' ? 'Power Station' : 'Solar Panel'}
          </p>

          {/* Name */}
          <h1
            className="text-4xl sm:text-5xl font-black text-white leading-none mb-2"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {product.name}
          </h1>
          <p className="text-yellow text-base font-medium mb-4">{product.tagline}</p>

          {/* Rating */}
          {avgRating && (
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(avgRating) ? 'text-yellow fill-yellow' : 'text-gray-600'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {avgRating.toFixed(1)} ({product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-300 leading-relaxed mb-7">{product.description}</p>

          {/* Price */}
          <div className="flex items-end gap-3 mb-7">
            <span
              className="text-4xl font-black text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {formatPrice(price, countryCode)}
            </span>
            {originalPrice && (
              <span className="text-lg text-gray-500 line-through pb-1">
                {formatPrice(originalPrice, countryCode)}
              </span>
            )}
            {originalPrice && (
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-sm font-semibold rounded pb-1">
                Save {Math.round((1 - price / originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3 mb-6">
            {/* Qty selector */}
            <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center text-white font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer ${
                added
                  ? 'bg-green-500 text-white'
                  : 'btn-primary'
              }`}
            >
              {added ? (
                <>
                  <CheckCircle size={18} />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 p-5 rounded-2xl bg-dark-2 border border-white/5 mb-5">
            {[
              { icon: Shield, text: '5-Year Warranty' },
              { icon: Zap, text: 'LFP Battery' },
              { icon: CheckCircle, text: 'Free Shipping' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                <Icon size={15} className="text-yellow" />
                {text}
              </div>
            ))}
          </div>

          {/* In stock */}
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-green-400 font-medium">In Stock</span>
            <span className="text-gray-500">· Ready to ship within 2–3 business days</span>
          </div>
        </div>
      </div>

      {/* Tabs: Features / Specs / Reviews */}
      <div className="border-t border-white/5 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Tab bar */}
          <div className="flex gap-1 border-b border-white/5 overflow-x-auto">
            {(['features', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize whitespace-nowrap transition-all duration-200 border-b-2 cursor-pointer ${
                  activeTab === tab
                    ? 'border-yellow text-yellow'
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${product.reviews.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="py-10">
            {activeTab === 'features' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl rounded-2xl border border-white/5 overflow-hidden">
                {product.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex items-center justify-between px-5 py-3.5 text-sm ${
                      i % 2 === 0 ? 'bg-dark-2' : 'bg-dark-3'
                    }`}
                  >
                    <span className="text-gray-400">{spec.label}</span>
                    <span className="font-medium text-white text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-5 max-w-3xl">
                {product.reviews.map((r) => (
                  <div key={r.id} className="p-5 rounded-2xl border border-white/5 bg-dark-2">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center text-sm font-bold text-yellow">
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{r.name}</p>
                          <p className="text-xs text-gray-500">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} size={13} className="text-yellow fill-yellow" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="py-16 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2
              className="text-3xl font-black text-white mb-8"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-yellow transition-colors"
        >
          <ArrowLeft size={16} />
          Back to All Products
        </Link>
      </div>
    </div>
  );
}
