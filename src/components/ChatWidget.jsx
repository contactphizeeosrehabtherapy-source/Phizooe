import React, { useEffect } from 'react';

export default function ChatWidget() {
  useEffect(() => {
    // Inject chat-widget.css if not already present
    if (!document.getElementById('phizeeoChatCss')) {
      const link = document.createElement('link');
      link.id = 'phizeeoChatCss';
      link.rel = 'stylesheet';
      link.href = '/chat-widget.css';
      document.head.appendChild(link);
    }

    // Inject chat-widget.js if not already present
    if (!document.getElementById('phizeeoChatJs')) {
      const script = document.createElement('script');
      script.id = 'phizeeoChatJs';
      script.src = '/chat-widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
