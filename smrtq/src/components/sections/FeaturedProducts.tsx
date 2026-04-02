'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { useReveal, revealStyle, revealItemStyle } from '@/lib/hooks/useReveal';

export default function FeaturedProducts() {
  const { ref, inView } = useReveal();

  return (
    <section className="py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14"
          style={revealStyle(inView)}
        >
          <div>
            <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Our Products</p>
            <h2
              className="text-4xl sm:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              BUILT TO POWER<br />
              <span className="gradient-text">YOUR WORLD</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-semibold text-yellow hover:text-white transition-colors group"
          >
            View all products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              style={revealItemStyle(inView, i)}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
