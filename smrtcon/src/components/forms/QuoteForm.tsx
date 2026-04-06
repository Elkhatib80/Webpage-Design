'use client';

import { useState, type FormEvent } from 'react';
import { MessageCircle, Loader2, CheckCircle } from 'lucide-react';
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp';
import { PRODUCT_CATEGORIES } from '@/lib/data/products';

const COUNTRIES = [
  'Canada',
  'UAE',
  'Saudi Arabia',
  'Qatar',
  'Egypt',
  'Nigeria',
  'Kenya',
  'Ghana',
  'Other',
];

const TIMELINES = ['ASAP', '1-3 months', '3-6 months', '6+ months'];

const REFERRALS = [
  'Google Search',
  'Social Media',
  'Referral / Word of Mouth',
  'Trade Show',
  'Other',
];

export default function QuoteForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      country: formData.get('country') as string,
      categories: formData.getAll('categories') as string[],
      description: formData.get('description') as string,
      quantity: formData.get('quantity') as string,
      timeline: formData.get('timeline') as string,
      referral: formData.get('referral') as string,
    };

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try WhatsApp or email us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-gold/20 bg-charcoal/50 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-gold" />
        <h3 className="mt-4 font-display text-2xl font-light text-cream">
          Thank You!
        </h3>
        <p className="mt-2 text-sm font-body font-light text-concrete">
          We&apos;ll reach out within 48 hours with a detailed quote.
        </p>
        <a
          href={buildWhatsAppLink(WA_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3 text-sm font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" />
          Or reach us now on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Company */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow text-stone mb-1 block text-[10px]">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-sm border border-slate/30 bg-ink px-4 py-3 text-sm text-cream placeholder:text-stone/50 focus:border-gold focus:outline-none transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="company" className="eyebrow text-stone mb-1 block text-[10px]">
            Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full rounded-sm border border-slate/30 bg-ink px-4 py-3 text-sm text-cream placeholder:text-stone/50 focus:border-gold focus:outline-none transition-colors"
            placeholder="Your company"
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="eyebrow text-stone mb-1 block text-[10px]">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-sm border border-slate/30 bg-ink px-4 py-3 text-sm text-cream placeholder:text-stone/50 focus:border-gold focus:outline-none transition-colors"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="eyebrow text-stone mb-1 block text-[10px]">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-sm border border-slate/30 bg-ink px-4 py-3 text-sm text-cream placeholder:text-stone/50 focus:border-gold focus:outline-none transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="eyebrow text-stone mb-1 block text-[10px]">
          Country *
        </label>
        <select
          id="country"
          name="country"
          required
          className="w-full rounded-sm border border-slate/30 bg-ink px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none transition-colors"
        >
          <option value="">Select country</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Product Categories (checkboxes) */}
      <div>
        <p className="eyebrow text-stone mb-2 text-[10px]">Product Categories *</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PRODUCT_CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 text-sm font-body font-light text-concrete cursor-pointer hover:text-cream transition-colors"
            >
              <input
                type="checkbox"
                name="categories"
                value={cat.name}
                className="rounded-sm border-slate/30 bg-ink text-gold focus:ring-gold accent-gold"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="eyebrow text-stone mb-1 block text-[10px]">
          Project Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full rounded-sm border border-slate/30 bg-ink px-4 py-3 text-sm text-cream placeholder:text-stone/50 focus:border-gold focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your project — scope, location, specific requirements..."
        />
      </div>

      {/* Quantity + Timeline */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="quantity" className="eyebrow text-stone mb-1 block text-[10px]">
            Quantity / Volume
          </label>
          <input
            id="quantity"
            name="quantity"
            type="text"
            className="w-full rounded-sm border border-slate/30 bg-ink px-4 py-3 text-sm text-cream placeholder:text-stone/50 focus:border-gold focus:outline-none transition-colors"
            placeholder="e.g. 500 sqm, 20 units"
          />
        </div>
        <div>
          <label htmlFor="timeline" className="eyebrow text-stone mb-1 block text-[10px]">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            className="w-full rounded-sm border border-slate/30 bg-ink px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none transition-colors"
          >
            <option value="">Select timeline</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Referral */}
      <div>
        <label htmlFor="referral" className="eyebrow text-stone mb-1 block text-[10px]">
          How did you hear about us?
        </label>
        <select
          id="referral"
          name="referral"
          className="w-full rounded-sm border border-slate/30 bg-ink px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none transition-colors"
        >
          <option value="">Select one</option>
          {REFERRALS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-gold w-full rounded-sm px-8 py-4 text-sm font-medium tracking-wide disabled:opacity-50"
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </span>
        ) : (
          'Submit Quote Request'
        )}
      </button>
    </form>
  );
}
