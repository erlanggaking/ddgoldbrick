'use client';

import { MessageCircle } from 'lucide-react';
import { whatsappNumber } from '@/lib/data/sample-data';

export default function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent('Hello BrickStore! I would like to inquire about a LEGO set.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
}