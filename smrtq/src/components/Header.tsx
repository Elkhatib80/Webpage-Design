'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Zap } from 'lucide-react';
import Logo from './Logo';
import CountrySelector from './CountrySelector';
import { useCart } from '@/lib/contexts/CartContext';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Logo size="sm" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  scrolled
                    ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <CountrySelector />

            {/* Cart */}
            <Link
              href="/cart"
              className={`relative flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 cursor-pointer ${
                scrolled
                  ? 'border-gray-200 hover:border-yellow/60 bg-gray-50 hover:bg-yellow/5'
                  : 'border-white/10 hover:border-yellow/50 bg-white/5 hover:bg-white/10'
              }`}
              aria-label={`Shopping cart, ${totalItems} items`}
            >
              <ShoppingCart size={18} className={scrolled ? 'text-gray-600' : 'text-gray-300'} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-yellow text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* CTA */}
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 btn-primary px-4 py-2 rounded-lg text-sm font-bold"
            >
              <Zap size={14} />
              Shop Now
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg border cursor-pointer ${
                scrolled ? 'border-gray-200 bg-gray-50' : 'border-white/10 bg-white/5'
              }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen
                ? <X size={18} className={scrolled ? 'text-gray-900' : 'text-white'} />
                : <Menu size={18} className={scrolled ? 'text-gray-600' : 'text-gray-300'} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="mt-2 btn-primary px-4 py-3 rounded-lg text-sm font-bold text-center"
            >
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
