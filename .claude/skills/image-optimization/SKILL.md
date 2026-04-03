---
name: image-optimization
description: Next.js next/image optimization patterns with WebP/AVIF conversion, lazy loading, blur placeholders, and responsive sizing. Use when adding product images, hero shots, or any image to a Next.js page to ensure Google PageSpeed compliance.
allowed-tools: Read, Write, Edit, Bash, Glob
---

# Image Optimization (Next.js)

## Core Rule
Never use `<img>` — always use `next/image`. It auto-converts to WebP/AVIF, lazy-loads, prevents CLS, and resizes.

## Quick Reference

### Hero / Above-the-fold Image
```tsx
import Image from 'next/image'

<Image
  src="/images/hero-product.jpg"
  alt="smrtQ Q-16 Power Station"
  width={1440}
  height={810}
  priority              // LCP image — disables lazy loading
  quality={85}
  sizes="100vw"
  className="w-full h-auto object-cover"
/>
```

### Product Card Image (lazy, responsive)
```tsx
<Image
  src={product.image}
  alt={product.name}
  width={600}
  height={600}
  quality={80}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="w-full h-auto"
  placeholder="blur"
  blurDataURL={product.blurDataURL}   // see blur placeholder below
/>
```

### Remote Images (next.config.ts)
```ts
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'your-cdn.com' },
    ],
    formats: ['image/avif', 'image/webp'],  // prefer AVIF first
  },
}
```

## Blur Placeholder Generation

### Static blur (build time)
```tsx
import { getPlaiceholder } from 'plaiceholder'

// In getStaticProps or generateStaticParams
const { base64 } = await getPlaiceholder('/images/product.jpg')
// pass base64 as blurDataURL prop
```

### Inline base64 (quick, no dependency)
```tsx
// 1x1 gray pixel — use while plaiceholder is not set up
const shimmer = `data:image/svg+xml;base64,...`
```

## Responsive Sizes Guide

| Usage | `sizes` value |
|-------|--------------|
| Full-width hero | `100vw` |
| Half-width section | `(max-width: 768px) 100vw, 50vw` |
| Product grid (3-col) | `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw` |
| Thumbnail | `(max-width: 768px) 25vw, 10vw` |

## WebP/AVIF Conversion (local files)

```bash
# Install sharp (used by Next.js internally)
bun add sharp

# Batch convert to WebP (optional pre-process)
for f in public/images/*.jpg; do
  cwebp -q 85 "$f" -o "${f%.jpg}.webp"
done
```

Next.js handles on-the-fly conversion automatically — manual conversion is only needed if you want to ship pre-converted files.

## fill layout (unknown dimensions)

```tsx
<div className="relative w-full aspect-[4/3]">
  <Image
    src={src}
    alt={alt}
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
  />
</div>
```

## Product Sheet / PDF Preview

```tsx
// For product spec PDFs — use static image thumbnail
<Image
  src={`/images/spec-sheets/${product.slug}-thumb.jpg`}
  alt={`${product.name} spec sheet`}
  width={210}
  height={297}    // A4 ratio
  quality={75}
  sizes="120px"
/>
```

## Checklist

- [ ] `priority` on hero/LCP image only
- [ ] `sizes` matches actual layout
- [ ] `alt` is descriptive (not empty, not "image")
- [ ] Remote domains in `remotePatterns`
- [ ] `formats: ['image/avif', 'image/webp']` in next.config
- [ ] `fill` + `aspect-ratio` wrapper instead of fixed dimensions when container is fluid
