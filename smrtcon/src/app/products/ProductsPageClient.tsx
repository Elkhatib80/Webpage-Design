'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CategoryCard from '@/components/ui/CategoryCard';
import GoldDivider from '@/components/ui/GoldDivider';
import { PRODUCT_CATEGORIES } from '@/lib/data/products';
import { IMAGES } from '@/lib/data/images';
import type { Market } from '@/types';

const MARKET_FILTERS: { id: Market | 'all'; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'canada', label: '🍁 Canada' },
  { id: 'africa', label: '🌍 Africa' },
  { id: 'mideast', label: '🕌 Middle East' },
];

export default function ProductsPageClient() {
  const [filter, setFilter] = useState<Market | 'all'>('all');

  const filtered =
    filter === 'all'
      ? PRODUCT_CATEGORIES
      : PRODUCT_CATEGORIES.filter((c) => c.markets.includes(filter));

  return (
    <div className="bg-charcoal pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="eyebrow text-gold mb-3">Catalogue</p>
          <h1 className="font-display text-4xl font-light text-cream sm:text-5xl md:text-6xl">
            Our Product Catalogue
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-body font-light text-concrete">
            Nine categories of premium construction materials, sourced
            factory-direct and delivered to your project site.
          </p>
          <GoldDivider className="mt-6" />
        </motion.div>

        {/* Filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {MARKET_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-sm px-4 py-2 text-sm font-body transition-all ${
                filter === f.id
                  ? 'bg-gold text-ink font-medium'
                  : 'border border-slate/30 text-concrete hover:border-gold/50 hover:text-cream'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              slug={cat.slug}
              name={cat.name}
              image={
                IMAGES.categories[cat.slug as keyof typeof IMAGES.categories]?.card ||
                cat.heroImage
              }
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-concrete">
            No products available for this market filter.
          </p>
        )}
      </div>
    </div>
  );
}
