'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Our Products</p>
            <h2
              className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              BUILT TO POWER<br />
              <span className="gradient-text">YOUR WORLD</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-semibold text-yellow hover:text-yellow-dark transition-colors group"
          >
            View all products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Product grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
