---
name: stripe-checkout
description: Stripe Checkout integration for purchases with Server Actions, webhook signature verification, and success/cancel flows. Use when implementing payments, creating checkout sessions, handling webhooks, or setting up purchase flows.
---

# Stripe Checkout

## Environment Variables

```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Stripe Client

```tsx
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export function hasStripe(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}
```

## Create Checkout Session (Server Action)

```tsx
// lib/actions/stripe.ts
'use server';

import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';

interface CreateCheckoutParams {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export async function createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
  metadata,
}: CreateCheckoutParams) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    metadata,
  });

  if (session.url) {
    redirect(session.url);
  }

  throw new Error('Failed to create checkout session');
}
```

## Buy Button Component

```tsx
'use client';

import { useTransition } from 'react';
import { createCheckoutSession } from '@/lib/actions/stripe';
import { Button } from '@/components/ui/button';

interface BuyButtonProps {
  priceId: string;
  price: number;
}

export function BuyButton({ priceId, price }: BuyButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleBuy = () => {
    startTransition(async () => {
      await createCheckoutSession({
        priceId,
        successUrl: `${window.location.origin}/checkout/success`,
        cancelUrl: `${window.location.origin}/checkout/cancel`,
      });
    });
  };

  return (
    <Button onClick={handleBuy} disabled={isPending} size="lg" className="w-full">
      {isPending ? 'Processing...' : `Buy Now — $${price}`}
    </Button>
  );
}
```

## Webhook Handler (Critical Security)

```tsx
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // CRITICAL: Always verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // Grant access, send confirmation email, etc.
    console.log('Payment successful:', session.id);
  }

  return NextResponse.json({ received: true });
}
```

## Conditional Rendering (No Stripe)

```tsx
import { hasStripe } from '@/lib/stripe';

export function ProductCard({ product }) {
  return (
    <div>
      {hasStripe() ? (
        <BuyButton priceId={product.stripePriceId} price={product.price} />
      ) : (
        <a href="/contact">Contact to Purchase</a>
      )}
    </div>
  );
}
```

## Testing Webhooks Locally

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
