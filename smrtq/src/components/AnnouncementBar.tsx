'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Zap } from 'lucide-react';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="announcement-bar relative z-50 bg-yellow text-black text-sm font-semibold">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3">
        <Zap size={14} className="shrink-0" />
        <span className="text-center leading-tight">
          Free shipping on orders over ₦500k · AED 2,000 · SAR 2,000
          {' — '}
          <Link href="/products" className="underline underline-offset-2 hover:no-underline font-black">
            Shop Now
          </Link>
        </span>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/10 transition-colors cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
