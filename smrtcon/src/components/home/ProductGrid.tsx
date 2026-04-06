'use client';

import { motion } from 'framer-motion';
import CategoryCard from '@/components/ui/CategoryCard';
import GoldDivider from '@/components/ui/GoldDivider';
import { PRODUCT_CATEGORIES } from '@/lib/data/products';
import { IMAGES } from '@/lib/data/images';

export default function ProductGrid() {
  return (
    <section className="bg-charcoal py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="eyebrow text-gold mb-3">Our Range</p>
          <h2 className="font-display text-4xl font-light text-cream sm:text-5xl">
            Everything Your Project Needs
          </h2>
          <GoldDivider className="mt-6" />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.map((cat, i) => (
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
      </div>
    </section>
  );
}
