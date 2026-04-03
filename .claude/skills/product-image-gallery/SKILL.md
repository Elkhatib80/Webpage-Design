---
name: product-image-gallery
description: Product image gallery with thumbnail strip, main image swap, zoom on hover, lightbox modal, and touch swipe for mobile. Use for product detail pages on ecommerce sites.
allowed-tools: Read, Write, Edit, Glob
---

# Product Image Gallery

## Full Component

```tsx
'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  images: { src: string; alt: string }[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const prev = useCallback(() =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() =>
    setActiveIndex((i) => (i + 1) % images.length), [images.length])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main image */}
        <div
          className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={cn(
                  'object-contain transition-transform duration-200',
                  isZoomed && 'scale-150'
                )}
                style={isZoomed ? {
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                } : undefined}
              />
            </motion.div>
          </AnimatePresence>

          {/* Arrow nav (desktop) */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 p-1.5 shadow hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 p-1.5 shadow hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <ZoomIn className="absolute bottom-2 right-2 h-5 w-5 text-gray-400" />
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                  activeIndex === i
                    ? 'border-yellow-500 ring-2 ring-yellow-400 ring-offset-1'
                    : 'border-gray-200 hover:border-gray-400'
                )}
              >
                <Image src={img.src} alt={img.alt} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-8 w-8" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              onClick={(e) => { e.stopPropagation(); prev() }}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <div
              className="relative w-[90vw] h-[90vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              onClick={(e) => { e.stopPropagation(); next() }}
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <div className="absolute bottom-4 text-white text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

## Usage

```tsx
const images = [
  { src: '/images/q-16-front.jpg', alt: 'Q-16 front view' },
  { src: '/images/q-16-side.jpg', alt: 'Q-16 side view' },
  { src: '/images/q-16-ports.jpg', alt: 'Q-16 port panel' },
  { src: '/images/q-16-in-use.jpg', alt: 'Q-16 in use outdoors' },
]

<ProductGallery images={images} productName="Q-16 Pro" />
```

## Touch Swipe (Mobile)

Add `use-swipeable` for touch support:

```bash
bun add react-swipeable
```

```tsx
import { useSwipeable } from 'react-swipeable'

const swipeHandlers = useSwipeable({
  onSwipedLeft: next,
  onSwipedRight: prev,
  preventScrollOnSwipe: true,
})

// Add to main image div:
<div {...swipeHandlers} className="relative aspect-square ...">
```
