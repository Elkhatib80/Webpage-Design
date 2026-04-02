---
name: nextjs-app-router-canat
description: Next.js 15 App Router patterns for Server/Client Components, async params, layouts, route handlers, Server Actions, and data fetching. Use when creating routes, pages, layouts, API endpoints, or implementing form submissions with revalidation.
---

# Next.js App Router (Next.js 15)

## Server vs Client Components

**Default to Server Components.** Only add `'use client'` when you need:
- Event handlers (onClick, onChange, onSubmit)
- Browser APIs (localStorage, window, navigator)
- React hooks (useState, useEffect, useRef)
- Third-party client libraries

```tsx
// Server Component (default) - no directive needed
export default async function Page() {
  const data = await fetchData(); // Direct async/await
  return <div>{data.title}</div>;
}

// Client Component - explicit directive
'use client';
import { useState } from 'react';
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Next.js 15 Async Params (Critical)

Params and searchParams are now Promises and must be awaited:

```tsx
// ✅ Correct - Next.js 15
type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { locale, slug } = await params;
  const { theme } = await searchParams;
  return <div>Locale: {locale}, Slug: {slug}</div>;
}

// ✅ generateMetadata also uses async params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: `Page - ${locale}` };
}
```

## Route File Conventions

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── loading.tsx         # Loading UI (Suspense boundary)
├── error.tsx           # Error boundary ('use client' required)
├── not-found.tsx       # 404 page
├── [locale]/
│   ├── layout.tsx      # Nested layout
│   ├── page.tsx        # /[locale]
│   └── services/
│       ├── page.tsx    # /[locale]/services
│       └── [slug]/
│           └── page.tsx # /[locale]/services/[slug]
└── api/
    └── route.ts        # API route handler
```

## Server Actions

```tsx
// lib/actions.ts
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function submitForm(formData: FormData) {
  const email = formData.get('email') as string;
  
  // Validate, process data...
  
  revalidatePath('/[locale]/contact');
  redirect('/success');
}

// Usage in Client Component
'use client';
export function ContactForm() {
  return (
    <form action={submitForm}>
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Route Handlers (API Routes)

```tsx
// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  return NextResponse.json({ id });
}
```

## Data Fetching Patterns

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
    // OR cache: 'no-store',    // SSR: always fresh
  });
  
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}
```

## Static Generation

```tsx
export async function generateStaticParams() {
  const locales = ['pt-PT', 'en', 'tr', 'es', 'fr', 'de'];
  const services = await getServices();
  
  return locales.flatMap(locale =>
    services.map(service => ({
      locale,
      slug: service.slug,
    }))
  );
}
```

## Anti-Patterns to Avoid

```tsx
// ❌ Don't use params directly without awaiting (Next.js 15)
export default function Page({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>; // Will cause errors
}

// ❌ Don't fetch in Client Components when Server Components work
'use client';
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => { fetch('/api/data')... }, []); // Unnecessary
}

// ❌ Don't use 'use client' on entire pages unless necessary
'use client';
export default function Page() {
  return <div>Static content</div>; // Should be Server Component
}
```
