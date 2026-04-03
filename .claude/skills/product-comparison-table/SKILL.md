---
name: product-comparison-table
description: Sticky multi-product comparison table with pinned row headers, diff highlighting, and mobile horizontal scroll. Use for B2B product comparison pages (Q-08 vs Q-16 vs Q-36) to drive conversion.
allowed-tools: Read, Write, Edit, Glob
---

# Product Comparison Table

## Data Structure

```ts
// types/comparison.ts
export interface ComparisonSpec {
  label: string
  key: string
  unit?: string
  highlight?: boolean  // bold/yellow — key differentiator
  format?: 'number' | 'boolean' | 'string'
}

export interface ProductColumn {
  id: string
  name: string         // "Q-16 Pro"
  slug: string         // "q-16-pro"
  badge?: string       // "Best Seller" | "New"
  price: number
  specs: Record<string, string | number | boolean>
}
```

## Component

```tsx
'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComparisonTableProps {
  specs: ComparisonSpec[]
  products: ProductColumn[]
  highlightId?: string  // pre-highlighted product column
}

export function ComparisonTable({ specs, products, highlightId }: ComparisonTableProps) {
  const [highlighted, setHighlighted] = useState(highlightId ?? products[0]?.id)

  return (
    <div className="w-full overflow-x-auto -mx-4 px-4">
      <table className="w-full min-w-[640px] border-collapse">
        {/* Header: product names */}
        <thead>
          <tr>
            {/* Sticky label column */}
            <th className="sticky left-0 z-20 bg-white w-40 min-w-[160px] text-left p-4 border-b border-gray-200" />
            {products.map((product) => (
              <th
                key={product.id}
                className={cn(
                  'p-4 text-center border-b border-gray-200 cursor-pointer transition-colors min-w-[160px]',
                  highlighted === product.id
                    ? 'bg-yellow-50 border-yellow-400'
                    : 'bg-white hover:bg-gray-50'
                )}
                onClick={() => setHighlighted(product.id)}
              >
                {product.badge && (
                  <span className="inline-block mb-2 px-2 py-0.5 text-xs font-medium bg-yellow-400 text-black rounded-full">
                    {product.badge}
                  </span>
                )}
                <div className="font-bold text-lg">{product.name}</div>
                <div className="text-2xl font-bold text-yellow-500 mt-1">
                  ${product.price.toLocaleString()}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Spec rows */}
        <tbody>
          {specs.map((spec, i) => (
            <tr
              key={spec.key}
              className={cn(
                'border-b border-gray-100',
                i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white',
                spec.highlight && 'font-semibold'
              )}
            >
              {/* Sticky label */}
              <td className="sticky left-0 z-10 bg-inherit p-4 text-sm text-gray-600 font-medium">
                {spec.label}
                {spec.unit && <span className="text-gray-400 ml-1">({spec.unit})</span>}
              </td>

              {products.map((product) => {
                const value = product.specs[spec.key]
                const isHighlighted = highlighted === product.id
                return (
                  <td
                    key={product.id}
                    className={cn(
                      'p-4 text-center text-sm transition-colors',
                      isHighlighted && 'bg-yellow-50'
                    )}
                  >
                    {spec.format === 'boolean' ? (
                      value ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-gray-300" />
                      )
                    ) : (
                      <span className={cn(spec.highlight && 'text-yellow-600 font-bold')}>
                        {value}{spec.unit && value !== '—' ? ` ${spec.unit}` : ''}
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

## Usage

```tsx
const SPECS: ComparisonSpec[] = [
  { key: 'capacity', label: 'Capacity', unit: 'Wh', highlight: true },
  { key: 'output', label: 'AC Output', unit: 'W', highlight: true },
  { key: 'solar', label: 'Solar Input', unit: 'W' },
  { key: 'weight', label: 'Weight', unit: 'kg' },
  { key: 'outlets', label: 'AC Outlets' },
  { key: 'app', label: 'App Control', format: 'boolean' },
  { key: 'warranty', label: 'Warranty', unit: 'years' },
]

const PRODUCTS: ProductColumn[] = [
  {
    id: 'q-08', name: 'Q-08', slug: 'q-08', price: 799,
    specs: { capacity: 1024, output: 1000, solar: 600, weight: 13.5, outlets: 3, app: true, warranty: 3 },
  },
  {
    id: 'q-16', name: 'Q-16 Pro', slug: 'q-16-pro', badge: 'Best Seller', price: 1499,
    specs: { capacity: 2048, output: 2400, solar: 1200, weight: 22, outlets: 6, app: true, warranty: 5 },
  },
  {
    id: 'q-36', name: 'Q-36 Max', slug: 'q-36-max', badge: 'New', price: 3299,
    specs: { capacity: 4608, output: 4000, solar: 2400, weight: 48, outlets: 8, app: true, warranty: 5 },
  },
]

<ComparisonTable specs={SPECS} products={PRODUCTS} highlightId="q-16" />
```

## Mobile Scroll Hint

```tsx
// Show scroll hint on mobile
<div className="md:hidden text-center text-xs text-gray-400 mb-2 flex items-center justify-center gap-1">
  <ChevronLeft className="h-3 w-3" />
  Scroll to compare
  <ChevronRight className="h-3 w-3" />
</div>
```

## Key UX Rules

- `sticky left-0` on first column — label stays visible while scrolling right on mobile
- `overflow-x-auto` on wrapper — enables horizontal scroll on mobile without breaking layout
- `min-w-[160px]` on columns — prevents columns from becoming unreadably narrow
- Click to highlight column — helps B2B buyers focus on the model they're considering
- Alternating row colors — essential for readability across many specs
