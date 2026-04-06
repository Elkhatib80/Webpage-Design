import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle, Clock, Package } from 'lucide-react';
import { PRODUCT_CATEGORIES, getCategoryBySlug } from '@/lib/data/products';
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp';
import MarketBadge from '@/components/ui/MarketBadge';
import CategoryPageClient from './CategoryPageClient';

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: 'Product Not Found' };
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const relatedCategories = PRODUCT_CATEGORIES.filter(
    (c) => c.id !== cat.id
  ).slice(0, 3);

  return (
    <div className="bg-charcoal pt-24">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={cat.heroImage}
          alt={cat.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/products"
              className="mb-4 inline-flex items-center gap-1 text-sm text-gold hover:text-gold-light transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All Products
            </Link>
            <h1 className="font-display text-4xl font-light text-cream sm:text-5xl md:text-6xl">
              {cat.name}
            </h1>
            <p className="mt-2 max-w-xl text-base font-body font-light text-concrete">
              {cat.tagline}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cat.markets.map((m) => (
                <MarketBadge key={m} market={m} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section>
              <h2 className="font-display text-2xl font-light text-cream">
                Overview
              </h2>
              <p className="mt-4 text-sm font-body font-light leading-relaxed text-concrete">
                {cat.longDescription}
              </p>
            </section>

            {/* Specs Table */}
            <section className="mt-12">
              <h2 className="font-display text-2xl font-light text-cream">
                Specifications
              </h2>
              <div className="mt-4 overflow-hidden rounded-sm border border-slate/20">
                <table className="w-full">
                  <tbody>
                    {cat.specs.map((spec, i) => (
                      <tr
                        key={spec.label}
                        className={i % 2 === 0 ? 'bg-ink/50' : 'bg-charcoal/50'}
                      >
                        <td className="px-4 py-3 text-sm font-body font-medium text-gold w-1/3">
                          {spec.label}
                        </td>
                        <td className="px-4 py-3 text-sm font-body font-light text-concrete">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Features */}
            <section className="mt-12">
              <h2 className="font-display text-2xl font-light text-cream">
                Key Features
              </h2>
              <ul className="mt-4 space-y-3">
                {cat.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span className="text-sm font-body font-light text-concrete">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Gallery */}
            <CategoryPageClient galleryImages={cat.galleryImages} name={cat.name} />

            {/* Certifications */}
            {cat.certifications.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-light text-cream">
                  Certifications
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="rounded-sm border border-gold/20 bg-gold/5 px-3 py-1.5 text-xs font-body font-medium text-gold"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-sm border border-slate/20 bg-ink/50 p-6">
              <h3 className="font-display text-xl font-light text-cream">
                Get a Quote
              </h3>
              <p className="mt-2 text-sm font-body font-light text-concrete">
                Interested in {cat.name}? Get a factory-direct quote in 48
                hours.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-concrete">
                  <Clock className="h-4 w-4 text-gold" />
                  <span>Lead Time: {cat.leadTime}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-concrete">
                  <Package className="h-4 w-4 text-gold" />
                  <span>MOQ: {cat.moq}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={buildWhatsAppLink(WA_MESSAGES.quote(cat.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-sm py-3 text-sm font-medium text-white"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Quote
                </a>
                <Link
                  href="/contact"
                  className="btn-gold block w-full rounded-sm py-3 text-center text-sm font-medium"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <section className="mt-24 border-t border-slate/20 pt-16">
          <h2 className="font-display text-2xl font-light text-cream">
            Related Categories
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCategories.map((rc) => (
              <Link
                key={rc.id}
                href={`/products/${rc.slug}`}
                className="group relative block aspect-[16/9] overflow-hidden rounded-sm"
              >
                <Image
                  src={rc.heroImage}
                  alt={rc.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-lg font-light text-cream">
                    {rc.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
