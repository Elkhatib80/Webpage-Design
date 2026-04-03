---
name: ecommerce-cart-state
description: Zustand cart store with localStorage persistence, quantity management, and mini-cart drawer UI. Use when building add-to-cart functionality that feeds into Stripe Checkout.
allowed-tools: Read, Write, Edit, Glob
---

# Ecommerce Cart State (Zustand)

## Installation

```bash
bun add zustand
```

## Cart Store

```ts
// stores/cart.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string           // product slug
  name: string
  price: number        // in cents (e.g. 149900 = $1,499)
  image: string
  quantity: number
  stripePriceId: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void

  // Derived
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === newItem.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              isOpen: true,
            }
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }], isOpen: true }
        })
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }))
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'smrtq-cart',              // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),  // only persist items, not isOpen
    }
  )
)
```

## Add to Cart Button

```tsx
'use client'

import { useCartStore } from '@/stores/cart'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

interface AddToCartProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    stripePriceId: string
  }
}

export function AddToCartButton({ product }: AddToCartProps) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <Button
      size="lg"
      onClick={() => addItem(product)}
      className="w-full gap-2"
    >
      <ShoppingCart className="h-5 w-5" />
      Add to Cart
    </Button>
  )
}
```

## Mini-Cart Drawer

```tsx
'use client'

import { useCartStore } from '@/stores/cart'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCartStore()

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((i) => ({ price: i.stripePriceId, quantity: i.quantity })),
      }),
    })
    const { url } = await res.json()
    window.location.href = url   // redirect to Stripe Checkout
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="flex flex-col w-full max-w-md">
        <SheetHeader>
          <SheetTitle>Cart ({items.length})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-gray-500">${(item.price / 100).toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="ml-auto text-gray-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${(totalPrice() / 100).toLocaleString()}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full" size="lg">
              Checkout with Stripe
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
```

## Cart Icon (navbar)

```tsx
'use client'

import { useCartStore } from '@/stores/cart'
import { ShoppingCart } from 'lucide-react'

export function CartIcon() {
  const { totalItems, openCart } = useCartStore()
  const count = totalItems()

  return (
    <button onClick={openCart} className="relative p-2">
      <ShoppingCart className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}
```

## Stripe Checkout API Route

```ts
// app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { items } = await req.json()

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items,
    success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancelled`,
  })

  return NextResponse.json({ url: session.url })
}
```

## Checklist

- [ ] `bun add zustand`
- [ ] `<CartDrawer />` in root layout (renders once, globally)
- [ ] `<CartIcon />` in navbar
- [ ] Price stored in **cents** (avoid floating point issues)
- [ ] `stripePriceId` on each product (from Stripe Dashboard)
- [ ] `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_URL` in `.env.local`
