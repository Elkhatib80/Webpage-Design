'use client';

import { useState } from 'react';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-[#FAFAFA] pt-16">
      {/* Page hero */}
      <div className="relative py-20 bg-[#F7F6F2] border-b border-gray-200 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,166,35,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.8) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            smrtQ Store
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ALL PRODUCTS
          </motion.h1>
          <motion.p
            className="text-gray-500 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Premium power stations and solar panels — priced for Nigeria, UAE, and Saudi Arabia.
          </motion.p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow/60 transition-colors"
              aria-label="Search products"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1">
            <Filter size={14} className="text-gray-400 ml-2" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  category === cat.value
                    ? 'bg-yellow text-black'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-gray-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-yellow/60 cursor-pointer"
              aria-label="Sort products"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <span className="ml-auto text-sm text-gray-400">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No products found.</p>
            <button
              onClick={() => { setSearch(''); setCategory('all'); }}
              className="mt-4 text-yellow text-sm hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
