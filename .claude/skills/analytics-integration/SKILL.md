---
name: analytics-integration
description: Analytics setup for Next.js — Vercel Analytics, Google Analytics 4, and custom event tracking for ecommerce (view_item, add_to_cart, begin_checkout, purchase). Use when adding analytics to a Next.js ecommerce site.
allowed-tools: Read, Write, Edit, Bash, Glob
---

# Analytics Integration (Next.js)

## Option A: Vercel Analytics (recommended — zero config)

```bash
bun add @vercel/analytics @vercel/speed-insights
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />          {/* pageviews, web vitals */}
        <SpeedInsights />      {/* Core Web Vitals per route */}
      </body>
    </html>
  )
}
```

Vercel Analytics works automatically — no GA account, no cookies banner required for basic metrics.

---

## Option B: Google Analytics 4

```bash
bun add @next/third-parties
```

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  )
}
```

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Ecommerce Event Tracking

### Event Helper

```ts
// lib/analytics.ts

type GtagCommand = 'config' | 'event'
declare function gtag(command: GtagCommand, ...args: unknown[]): void

export function trackEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof gtag === 'undefined') return
  gtag('event', eventName, params)
}

// GA4 Ecommerce Events
export const analytics = {
  viewItem(product: { id: string; name: string; price: number; category?: string }) {
    trackEvent('view_item', {
      currency: 'USD',
      value: product.price / 100,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category ?? 'Power Stations',
        price: product.price / 100,
      }],
    })
  },

  addToCart(product: { id: string; name: string; price: number; quantity: number }) {
    trackEvent('add_to_cart', {
      currency: 'USD',
      value: (product.price * product.quantity) / 100,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price / 100,
        quantity: product.quantity,
      }],
    })
  },

  beginCheckout(items: { id: string; name: string; price: number; quantity: number }[], total: number) {
    trackEvent('begin_checkout', {
      currency: 'USD',
      value: total / 100,
      items: items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price / 100,
        quantity: i.quantity,
      })),
    })
  },

  purchase(orderId: string, total: number, items: { id: string; name: string; price: number; quantity: number }[]) {
    trackEvent('purchase', {
      transaction_id: orderId,
      currency: 'USD',
      value: total / 100,
      items: items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price / 100,
        quantity: i.quantity,
      })),
    })
  },

  quoteRequested(product: string, quantity: number) {
    trackEvent('generate_lead', {
      currency: 'USD',
      value: 0,
      lead_source: 'quote_form',
      product,
      quantity,
    })
  },
}
```

### Usage in Components

```tsx
// Fire view_item on product page load
'use client'
import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

export function ProductAnalytics({ product }: { product: Product }) {
  useEffect(() => {
    analytics.viewItem({ id: product.slug, name: product.name, price: product.price })
  }, [product])
  return null
}

// Fire add_to_cart in cart store
// In stores/cart.ts, addItem action:
addItem: (newItem) => {
  analytics.addToCart({ ...newItem, quantity: 1 })
  // ... rest of store logic
}

// Fire purchase on success page
// app/checkout/success/page.tsx
analytics.purchase(sessionId, totalCents, items)
```

---

## Conversion Goals to Set Up in GA4

| Goal | Event | Value |
|------|-------|-------|
| Quote form submitted | `generate_lead` | $0 |
| Add to cart | `add_to_cart` | cart value |
| Checkout started | `begin_checkout` | cart value |
| Purchase | `purchase` | order value |
| Product page view | `view_item` | — |

---

## Cookie Consent (GDPR)

If selling to EU customers, analytics must wait for consent:

```tsx
// Only load GA after consent
const [consent, setConsent] = useState(false)

return consent ? <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} /> : null
```

For Vercel Analytics — no cookies, no consent banner required.
