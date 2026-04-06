'use client';

import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp';

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppLink(WA_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full animate-pulse-ring"
        style={{ backgroundColor: '#25D366', opacity: 0.4 }}
      />
      <MessageCircle className="h-6 w-6 text-white" fill="white" />
    </a>
  );
}
