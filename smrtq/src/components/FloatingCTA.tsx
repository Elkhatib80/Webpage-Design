'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('floating-cta-dismissed')) {
      setDismissed(true);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('floating-cta-dismissed', '1');
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          <div className="flex items-center gap-2 bg-yellow rounded-full shadow-2xl pl-5 pr-2 py-2.5">
            <Link
              href="/products"
              className="flex items-center gap-2 font-bold text-black text-sm"
            >
              <Zap size={16} className="shrink-0" />
              Shop Now
            </Link>
            <button
              onClick={handleDismiss}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors cursor-pointer ml-1"
              aria-label="Dismiss"
            >
              <X size={13} className="text-black" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
