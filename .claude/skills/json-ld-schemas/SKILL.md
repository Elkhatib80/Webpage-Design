---
name: json-ld-schemas
description: JSON-LD structured data for Organization, Person, Service, Product, FAQPage, and BreadcrumbList with reusable components. Use when implementing schema.org markup, adding rich snippets, or improving search engine understanding of page content.
---

# JSON-LD Schemas

## Base JsonLd Component

```tsx
// components/seo/JsonLd.tsx
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

## Organization Schema

```tsx
// components/seo/OrganizationJsonLd.tsx
import { JsonLd } from './JsonLd';

export function OrganizationJsonLd({ locale }: { locale: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    name: 'Studio Name',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Professional Pilates and Yoga coaching',
    sameAs: [
      'https://instagram.com/studioname',
      'https://facebook.com/studioname',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-xxx-xxx-xxxx',
      contactType: 'customer service',
    },
  };

  return <JsonLd data={data} />;
}
```

## FAQPage Schema

```tsx
// components/seo/FAQPageJsonLd.tsx
import type { FAQGroup } from '@/types';

export function FAQPageJsonLd({ faqs }: { faqs: FAQGroup[] }) {
  const allQuestions = faqs.flatMap((group) =>
    group.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))
  );

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allQuestions,
  };

  return <JsonLd data={data} />;
}
```

## BreadcrumbList Schema

```tsx
// components/seo/BreadcrumbJsonLd.tsx
interface BreadcrumbItem {
  name: string;
  href: string;
}

export function BreadcrumbJsonLd({ items, locale }: { items: BreadcrumbItem[]; locale: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.href}`,
    })),
  };

  return <JsonLd data={data} />;
}
```

## Product Schema

```tsx
// components/seo/ProductJsonLd.tsx
import type { Programme } from '@/types';

export function ProductJsonLd({ programme, locale }: { programme: Programme; locale: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteUrl}/${locale}/programmes/${programme.slug}`,
    name: programme.title,
    description: programme.outcomes.join('. '),
    offers: {
      '@type': 'Offer',
      price: programme.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  };

  return <JsonLd data={data} />;
}
```

## Usage in Pages

```tsx
// app/[locale]/services/page.tsx
export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <OrganizationJsonLd locale={locale} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: 'Home', href: '' },
          { name: 'Services', href: '/services' },
        ]}
      />
      {/* Page content */}
    </>
  );
}
```
