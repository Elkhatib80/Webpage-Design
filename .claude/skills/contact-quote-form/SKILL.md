---
name: contact-quote-form
description: Complete B2B quote request form pattern for Next.js — Zod validation + React Hook Form + API route + Resend email + success state. Use when building contact forms, quote request forms, or lead capture forms.
allowed-tools: Read, Write, Edit, Glob
---

# Contact / Quote Request Form (Full Stack)

## 1. Zod Schema

```ts
// lib/schemas/quote.ts
import { z } from 'zod'

export const quoteSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  company: z.string().min(1, 'Company name required'),
  phone: z.string().optional(),
  product: z.enum(['Q-08', 'Q-16', 'Q-36', 'Custom']),
  quantity: z.coerce.number().min(1).max(999),
  message: z.string().min(10, 'Please describe your requirements').max(1000),
})

export type QuoteFormData = z.infer<typeof quoteSchema>
```

## 2. API Route

```ts
// app/api/quote/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { quoteSchema } from '@/lib/schemas/quote'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = quoteSchema.parse(body)  // throws ZodError if invalid

    await resend.emails.send({
      from: 'quotes@smrtq.com',
      to: ['sales@smrtq.com'],
      replyTo: data.email,
      subject: `Quote Request: ${data.product} × ${data.quantity} — ${data.company}`,
      html: `
        <h2>New Quote Request</h2>
        <table>
          <tr><td><b>Name</b></td><td>${data.name}</td></tr>
          <tr><td><b>Email</b></td><td>${data.email}</td></tr>
          <tr><td><b>Company</b></td><td>${data.company}</td></tr>
          <tr><td><b>Phone</b></td><td>${data.phone ?? '—'}</td></tr>
          <tr><td><b>Product</b></td><td>${data.product}</td></tr>
          <tr><td><b>Quantity</b></td><td>${data.quantity}</td></tr>
          <tr><td><b>Message</b></td><td>${data.message}</td></tr>
        </table>
      `,
    })

    // Auto-reply to customer
    await resend.emails.send({
      from: 'sales@smrtq.com',
      to: data.email,
      subject: 'We received your quote request — smrtQ',
      html: `
        <p>Hi ${data.name},</p>
        <p>Thanks for your interest in the smrtQ ${data.product}. 
        Our team will review your request and get back to you within 1 business day.</p>
        <p>— The smrtQ Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }
    console.error('Quote form error:', error)
    return NextResponse.json({ error: 'Failed to send quote request' }, { status: 500 })
  }
}
```

## 3. Client Form Component

```tsx
// components/QuoteForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quoteSchema, type QuoteFormData } from '@/lib/schemas/quote'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle } from 'lucide-react'

export function QuoteForm({ defaultProduct }: { defaultProduct?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { product: (defaultProduct as QuoteFormData['product']) ?? 'Q-16', quantity: 1 },
  })

  const onSubmit = async (data: QuoteFormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <h3 className="text-xl font-semibold">Quote Request Sent!</h3>
        <p className="text-gray-600">We'll get back to you within 1 business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input placeholder="Full name *" {...register('name')} />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Input placeholder="Work email *" type="email" {...register('email')} />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Input placeholder="Company *" {...register('company')} />
          {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>}
        </div>
        <div>
          <Input placeholder="Phone (optional)" {...register('phone')} />
        </div>
        <div>
          <Select onValueChange={(v) => setValue('product', v as QuoteFormData['product'])} defaultValue="Q-16">
            <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
            <SelectContent>
              {['Q-08', 'Q-16', 'Q-36', 'Custom'].map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input placeholder="Quantity *" type="number" min={1} {...register('quantity')} />
          {errors.quantity && <p className="text-sm text-red-500 mt-1">{errors.quantity.message}</p>}
        </div>
      </div>
      <div>
        <Textarea
          placeholder="Describe your requirements, use case, or questions *"
          rows={4}
          {...register('message')}
        />
        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-500">Something went wrong. Please try again or email sales@smrtq.com</p>
      )}

      <Button type="submit" disabled={status === 'loading'} className="w-full" size="lg">
        {status === 'loading' ? 'Sending...' : 'Request Quote'}
      </Button>
    </form>
  )
}
```

## Environment Variables Required

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
```

## Checklist

- [ ] `RESEND_API_KEY` in `.env.local`
- [ ] Verified sending domain in Resend dashboard
- [ ] API route at `app/api/quote/route.ts`
- [ ] `quoteSchema` shared between client and server (no duplication)
- [ ] Auto-reply email sent to customer
- [ ] Success state shown after submission
- [ ] Error state with fallback contact info
