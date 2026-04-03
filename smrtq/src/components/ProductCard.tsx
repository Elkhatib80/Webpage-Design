'use client';

import Link from 'next/link';
import { ShoppingCart, Star, Zap, Battery } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useCountry } from '@/lib/contexts/CountryContext';
import { useCart } from '@/lib/contexts/CartContext';
import { formatPrice } from '@/lib/countries';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { countryCode } = useCountry();
  const { addItem } = useCart();

  const price = product.price[countryCode];
  const originalPrice = product.originalPrice?.[countryCode];
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null;
  const avgRating = product.reviews.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : null;

  return (
    <article className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover flex flex-col shadow-sm">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <span className="px-2.5 py-1 bg-yellow text-black text-xs font-bold rounded-full tracking-wide">
            {product.badge}
          </span>
        )}
        {product.isNew && !product.badge && (
          <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">NEW</span>
        )}
        {discount && (
          <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">-{discount}%</span>
        )}
      </div>

      {/* Product image area */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-52 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'linear-gradient(rgba(245,166,35,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.2) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
          {/* Product silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {product.category === 'power-station' ? (
                <div className="relative">
                  <motion.div
                    className="w-28 h-20 rounded-xl border-2 border-yellow/40 bg-white flex items-center justify-center mx-auto shadow-md"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Battery size={36} className="text-yellow" />
                  </motion.div>
                  <div className="mt-2 flex justify-center gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-2 bg-yellow/30 rounded border border-yellow/40" />
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div
                  className="w-32 h-24 rounded-lg border-2 border-yellow/40 bg-white flex items-center justify-center mx-auto shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Zap size={32} className="text-yellow" />
                </motion.div>
              )}
            </div>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-yellow/0 group-hover:bg-yellow/5 transition-all duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category label */}
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
          {product.category === 'power-station' ? 'Power Station' : 'Solar Panel'}
        </p>

        {/* Name */}
        <Link href={`/products/${product.slug}`} className="group/name">
          <h3
            className="font-bold text-gray-900 text-lg leading-tight mb-1 group-hover/name:text-yellow transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-yellow font-semibold mb-2">{product.tagline}</p>

        {/* Key specs pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.capacity && (
            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-600">
              {product.capacity}
            </span>
          )}
          {product.wattage && (
            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-600">
              {product.wattage} AC
            </span>
          )}
        </div>

        {/* Rating */}
        {avgRating && (
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.round(avgRating) ? 'text-yellow fill-yellow' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviews.length})</span>
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {formatPrice(price, countryCode)}
            </div>
            {originalPrice && (
              <div className="text-xs text-gray-400 line-through">{formatPrice(originalPrice, countryCode)}</div>
            )}
          </div>
          <motion.button
            onClick={() => addItem(product, countryCode)}
            className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
            aria-label={`Add ${product.name} to cart`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <ShoppingCart size={15} />
            Add
          </motion.button>
        </div>
      </div>
    </article>
  );
}
