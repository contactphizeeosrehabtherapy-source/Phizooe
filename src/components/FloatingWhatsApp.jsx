import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/919360447385?text=Hi%2C%20I%27d%20like%20to%20book%20a%20home%20physio%20visit." 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float" 
      aria-label="Chat on WhatsApp to book home physio"
    >
      <MessageCircle size={32} />
    </a>
  );
}
