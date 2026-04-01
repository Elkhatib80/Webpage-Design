'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { useCountry } from '@/lib/contexts/CountryContext';
import { countries } from '@/lib/countries';

const productLinks = [
  { href: '/products?category=power-station', label: 'Power Stations' },
  { href: '/products?category=solar-panel', label: 'Solar Panels' },
  { href: '/products', label: 'All Products' },
];

const companyLinks = [
  { href: '/about', label: 'About smrtQ' },
  { href: '/contact', label: 'Contact Us' },
  { href: '#', label: 'Become a Dealer' },
  { href: '#', label: 'Press & Media' },
];

const supportLinks = [
  { href: '#', label: 'User Manuals' },
  { href: '#', label: 'Warranty Policy' },
  { href: '#', label: 'FAQ' },
  { href: '#', label: 'Returns' },
];

const socialLabels = ['Facebook', 'Instagram', 'YouTube', 'X (Twitter)'];

export default function Footer() {
  const { countryCode } = useCountry();
  const country = countries[countryCode];

  return (
    <footer className="bg-surface border-t border-white/5">
      {/* Top bar — newsletter */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-xl font-bold text-white mb-1"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Stay Charged. Stay Informed.
            </h3>
            <p className="text-sm text-gray-400">New products, energy tips, and exclusive deals — straight to your inbox.</p>
          </div>
          <form
            className="flex w-full md:w-auto gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-dark-2 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow/50 transition-colors"
              aria-label="Email address for newsletter"
            />
            <button type="submit" className="btn-primary px-5 py-3 rounded-lg text-sm whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Logo size="md" className="mb-4" />
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">
            Premium portable power solutions built for Africa and the Middle East. Clean, quiet, and reliable — wherever you are.
          </p>
          {/* Contact */}
          <div className="space-y-2">
            <a
              href={`mailto:${country.email}`}
              className="flex items-center gap-3 text-sm text-gray-400 hover:text-yellow transition-colors cursor-pointer"
            >
              <Mail size={15} className="flex-shrink-0" />
              {country.email}
            </a>
            <a
              href={`tel:${country.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-sm text-gray-400 hover:text-yellow transition-colors cursor-pointer"
            >
              <Phone size={15} className="flex-shrink-0" />
              {country.phone}
            </a>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <MapPin size={15} className="flex-shrink-0" />
              {country.name} Operations Center
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">Products</h4>
          <ul className="space-y-3">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-yellow transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">Company</h4>
          <ul className="space-y-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-gray-400 hover:text-yellow transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">Support</h4>
          <ul className="space-y-3">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-gray-400 hover:text-yellow transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Social */}
          <div className="mt-8">
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">Follow Us</h4>
            <div className="flex gap-3">
              {socialLabels.map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-yellow hover:border-yellow/50 hover:bg-yellow/5 transition-all duration-200 cursor-pointer text-xs font-bold"
                >
                  {label[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} smrtQ Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-yellow transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-yellow transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-yellow transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
