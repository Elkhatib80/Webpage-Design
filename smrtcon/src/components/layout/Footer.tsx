import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const PRODUCT_LINKS = [
  { href: '/products/wpc-decking', label: 'WPC Decking' },
  { href: '/products/lvt-flooring', label: 'LVT Flooring' },
  { href: '/products/kitchen-cabinets', label: 'Kitchen Cabinets' },
  { href: '/products/shower-enclosures', label: 'Shower Enclosures' },
  { href: '/products/padel-courts', label: 'Padel Courts' },
  { href: '/products/doors-windows', label: 'Doors & Windows' },
  { href: '/products/lighting', label: 'Custom Lighting' },
  { href: '/products/blinds-furnishings', label: 'Blinds & Furnishings' },
  { href: '/products/hvac', label: 'Heat Pumps & ERV' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/markets', label: 'Markets We Serve' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-slate/20">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-light tracking-wide text-cream">
                smrtCON
              </span>
            </Link>
            <p className="mt-1 text-xs text-stone">by SMRTQ Solutions Inc.</p>
            <p className="mt-4 text-sm font-light leading-relaxed text-concrete">
              Factory-direct premium construction materials for Canada, Africa,
              and the Middle East. No middlemen. No markups. Just quality
              materials, delivered.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="eyebrow text-gold mb-4">Products</h3>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-concrete hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="eyebrow text-gold mb-4">Company</h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-concrete hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-gold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-stone flex-shrink-0" />
                <span className="text-sm font-light text-concrete">
                  Mississauga, Ontario, Canada
                </span>
              </li>
              <li>
                <a
                  href="mailto:info@smrtcon.com"
                  className="flex items-center gap-2 text-sm font-light text-concrete hover:text-gold transition-colors"
                >
                  <Mail className="h-4 w-4 text-stone flex-shrink-0" />
                  info@smrtcon.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1XXXXXXXXXX"
                  className="flex items-center gap-2 text-sm font-light text-concrete hover:text-gold transition-colors"
                >
                  <Phone className="h-4 w-4 text-stone flex-shrink-0" />
                  +1 (XXX) XXX-XXXX
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="eyebrow text-stone mb-2 text-[10px]">Markets</p>
              <div className="flex gap-2">
                <span className="rounded-sm bg-slate/50 px-2 py-1 text-xs text-concrete">
                  🍁 Canada
                </span>
                <span className="rounded-sm bg-slate/50 px-2 py-1 text-xs text-concrete">
                  🌍 Africa
                </span>
                <span className="rounded-sm bg-slate/50 px-2 py-1 text-xs text-concrete">
                  🕌 Middle East
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate/20 pt-8 sm:flex-row">
          <p className="text-xs text-stone">
            &copy; {new Date().getFullYear()} SMRTQ Solutions Inc. All rights reserved.
          </p>
          <p className="text-xs text-stone">
            smrtCON is the construction materials division of SMRTQ Solutions Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
