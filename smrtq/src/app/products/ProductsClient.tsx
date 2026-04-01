'use client';

import { useState } from 'react';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { ProductCategory } from '@/types';

const categories: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'power-station', label: 'Power Stations' },
  { value: 'solar-panel', label: 'Solar Panels' },
];

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

export default function ProductsClient() {
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const [sort, setSort] = useState('default');
  const [search, setSearch] = useState('');

  const filtered = products
    .filter((p) => category === 'all' || p.category === category)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const country = 'NG';
      if (sort === 'price-asc') return (a.price[country] ?? 0) - (b.price[country] ?? 0);
      if (sort === 'price-desc') return (b.price[country] ?? 0) - (a.price[country] ?? 0);
      if (sort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Page hero */}
      <div className="relative py-20 bg-surface border-b border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,197,24,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">smrtQ Store</p>
          <h1
            className="text-5xl sm:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            ALL PRODUCTS
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Premium power stations and solar panels — priced for Nigeria, UAE, and Saudi Arabia.
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="sticky top-16 z-40 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-dark-2 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow/50 transition-colors"
              aria-label="Search products"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1 bg-dark-2 border border-white/10 rounded-lg p-1">
            <Filter size={14} className="text-gray-500 ml-2" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  category === cat.value
                    ? 'bg-yellow text-black'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-gray-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-dark-2 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-yellow/50 cursor-pointer"
              aria-label="Sort products"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <span className="ml-auto text-sm text-gray-500">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">No products found.</p>
            <button
              onClick={() => { setSearch(''); setCategory('all'); }}
              className="mt-4 text-yellow text-sm hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
