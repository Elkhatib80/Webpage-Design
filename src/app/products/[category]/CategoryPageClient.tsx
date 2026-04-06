'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface CategoryPageClientProps {
  galleryImages: string[];
  name: string;
}

export default function CategoryPageClient({ galleryImages, name }: CategoryPageClientProps) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-light text-cream">Gallery</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-sm"
          >
            <Image
              src={img}
              alt={`${name} - image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
