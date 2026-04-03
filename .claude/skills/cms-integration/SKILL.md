---
name: cms-integration
description: Sanity CMS integration with Next.js App Router — schema definition, GROQ queries, live preview, and portable text rendering. Use when products, specs, or content need to be editable by non-technical team members.
allowed-tools: Read, Write, Edit, Bash, Glob
---

# Sanity CMS Integration (Next.js)

## Setup

```bash
bun add next-sanity @sanity/image-url @portabletext/react
bunx sanity@latest init --env  # creates sanity.config.ts and .env.local entries
```

## Environment Variables

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=sk...   # for server-side / ISR fetches
```

## Sanity Client

```ts
// lib/sanity/client.ts
import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
})

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {}, {
    next: { revalidate: 60 },  // ISR: revalidate every 60s
  })
}
```

## Product Schema

```ts
// sanity/schemas/product.ts
import { defineField, defineType } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'price', title: 'Price (USD)', type: 'number' }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'object',
      fields: [
        defineField({ name: 'capacity', title: 'Capacity (Wh)', type: 'number' }),
        defineField({ name: 'output', title: 'AC Output (W)', type: 'number' }),
        defineField({ name: 'solarInput', title: 'Solar Input (W)', type: 'number' }),
        defineField({ name: 'weight', title: 'Weight (kg)', type: 'number' }),
        defineField({ name: 'warranty', title: 'Warranty (years)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],  // Portable Text
    }),
    defineField({ name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true }),
    defineField({ name: 'featured', title: 'Featured Product', type: 'boolean', initialValue: false }),
  ],
})
```

## GROQ Queries

```ts
// lib/sanity/queries.ts
import { groq } from 'next-sanity'

export const PRODUCTS_QUERY = groq`
  *[_type == "product" && inStock == true] | order(_createdAt asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    price,
    specs,
    "images": images[].asset->url,
    featured,
  }
`

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    price,
    specs,
    "images": images[] {
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      alt,
    },
    description,
    inStock,
  }
`
```

## Fetching in Server Components

```tsx
// app/products/page.tsx
import { sanityFetch } from '@/lib/sanity/client'
import { PRODUCTS_QUERY } from '@/lib/sanity/queries'

interface Product {
  _id: string
  name: string
  slug: string
  price: number
  images: string[]
  specs: { capacity: number; output: number }
}

export default async function ProductsPage() {
  const products = await sanityFetch<Product[]>(PRODUCTS_QUERY)
  return (
    <div className="grid grid-cols-3 gap-8">
      {products.map((p) => <ProductCard key={p._id} product={p} />)}
    </div>
  )
}
```

## Portable Text (Rich Text Rendering)

```tsx
import { PortableText } from '@portabletext/react'

const components = {
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
    normal: ({ children }: any) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
  },
}

<PortableText value={product.description} components={components} />
```

## Image URL Builder

```ts
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from '@/lib/sanity/client'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Usage:
// urlFor(image).width(800).height(600).format('webp').url()
```

## When to Use Sanity vs JSON Files

| Use JSON files | Use Sanity |
|----------------|-----------|
| ≤ 5 products, rarely changes | Products updated frequently |
| Developer manages content | Non-technical team edits content |
| No media uploads needed | Images managed in CMS |
| Static build is sufficient | Need live preview / real-time updates |
