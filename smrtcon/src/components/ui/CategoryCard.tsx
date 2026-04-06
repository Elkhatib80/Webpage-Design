'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  slug: string;
  name: string;
  image: string;
  index: number;
}

export default function CategoryCard({ slug, name, image, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/products/${slug}`}
        className="group relative block aspect-[4/5] overflow-hidden rounded-sm"
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Default overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gold/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-xl font-light text-cream">{name}</h3>
          <div className="mt-2 flex items-center gap-1 text-sm text-gold opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
            Explore <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
