// Analytics helper — wraps Vercel Analytics track() + GA4 gtag events
// Safe to call on server or before scripts load (no-ops if unavailable)

declare function gtag(command: 'event', name: string, params: Record<string, unknown>): void;

function safeGtag(name: string, params: Record<string, unknown>) {
  try {
    if (typeof gtag !== 'undefined') gtag('event', name, params);
  } catch {
    // gtag not loaded yet — silently ignore
  }
}

export const analytics = {
  viewProduct(product: { id: string; name: string; price: number; category?: string }) {
    safeGtag('view_item', {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category ?? 'Power Station',
        price: product.price,
      }],
    });
  },

  addToCart(product: { id: string; name: string; price: number; quantity: number }) {
    safeGtag('add_to_cart', {
      currency: 'USD',
      value: product.price * product.quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: product.quantity,
      }],
    });
  },

  beginCheckout(total: number, itemCount: number) {
    safeGtag('begin_checkout', { currency: 'USD', value: total, items_count: itemCount });
  },

  quoteSubmitted(country: string, subject: string) {
    safeGtag('generate_lead', { lead_source: 'contact_form', country, subject });
  },

  selectCountry(countryCode: string) {
    safeGtag('select_content', { content_type: 'country', item_id: countryCode });
  },
};
