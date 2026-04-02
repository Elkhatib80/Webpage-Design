---
name: sitemap-robots
description: Automated sitemap generation for all locale URLs, robots.txt configuration, and llms.txt for AI crawler optimization. Use when setting up sitemap.xml, configuring crawling rules, or improving discoverability for search engines and AI systems.
---

# Sitemap & Robots

## Sitemap Generation

```tsx
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { locales } from '@/i18n.config';
import { getServices, getProgrammes } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  
  const staticPages = [
    '',
    '/about',
    '/services',
    '/book',
    '/pricing',
    '/contact',
  ];

  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${siteUrl}/${loc}${page}`])
        ),
      },
    }))
  );

  const services = await getServices('en');
  const serviceUrls = locales.flatMap((locale) =>
    services.map((service) => ({
      url: `${siteUrl}/${locale}/services/${service.slug}`,
      lastModified: new Date(service.lastUpdated),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticUrls, ...serviceUrls];
}
```

## Robots.txt

```tsx
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout/', '/_next/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

## LLMs.txt for AI Crawlers

```txt
// public/llms.txt
# Brand Name

## About
Brief description of your business.

## Important Pages
- Home: /
- About: /about
- Products: /products
- Contact: /contact

## Contact
Email: hello@example.com
```

## Verification

After deployment, verify:
- `https://yoursite.com/sitemap.xml` — All URLs present
- `https://yoursite.com/robots.txt` — Sitemap reference correct
- Google Search Console — Submit sitemap
