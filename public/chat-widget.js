/**
 * PhiZeeo AI Chat Widget - Standalone Production Script
 * Enforces official system rules, quick reply handlers, Tanglish/Tamil support,
 * emergency safety checks, and step-by-step WhatsApp booking flow.
 */

(function () {
  'use strict';

  if (window.PhiZeeoChatWidgetInitialized) return;
  window.PhiZeeoChatWidgetInitialized = true;

  // Emergency Keywords (India 112 Safety Rule)
  const EMERGENCY_KEYWORDS = [
    'chest pain', 'difficulty breathing', "can't breathe", 'cannot breathe',
    'shortness of breath', 'stroke', 'face droop', 'arm weakness', 'slurred speech',
    'severe bleeding', 'unconscious', 'loss of consciousness', 'suicidal', 'self-harm',
    'heart attack'
  ];

  // In-Memory State
  let conversationHistory = [];
  let isOpen = false;
  let isLoading = false;
  
  // Guided Booking Flow State
  let bookingStep = 0; // 0: inactive, 1: name, 2: phone, 3: condition, 4: preferred date/time
  let bookingData = { name: '', phone: '', service: '', date: '' };

  // SVG Icons
  const CHAT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  const CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
  const SEND_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
  const WHATSAPP_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;

  function createWidgetHTML() {
    const launcher = document.createElement('button');
    launcher.id = 'phizeeoChatLauncher';
    launcher.className = 'phizeeo-chat-launcher';
    launcher.setAttribute('aria-label', 'Open PhiZeeo Virtual Assistant');
    launcher.innerHTML = CHAT_ICON;

    const panel = document.createElement('div');
    panel.id = 'phizeeoChatPanel';
    panel.className = 'phizeeo-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'PhiZeeo Virtual Assistant');
    panel.setAttribute('aria-hidden', 'true');

    panel.innerHTML = `
      <div class="phizeeo-chat-header">
        <div class="phizeeo-chat-header-brand">
          <div class="phizeeo-avatar-icon">PZ</div>
          <div class="phizeeo-header-info">
            <span class="phizeeo-header-title">PhiZeeo</span>
            <div class="phizeeo-header-status">
              <span class="phizeeo-online-dot"></span>
              <span>Physio assistant</span>
            </div>
          </div>
        </div>
        <button id="phizeeoCloseBtn" class="phizeeo-chat-close-btn" aria-label="Close assistant">${CLOSE_ICON}</button>
      </div>

      <div id="phizeeoMessages" class="phizeeo-chat-messages" aria-live="polite">
        <!-- Messages rendered dynamically -->
      </div>

      <div class="phizeeo-chat-footer">
        <form id="phizeeoForm" class="phizeeo-input-row" novalidate>
          <input 
            type="text" 
            id="phizeeoInput" 
            class="phizeeo-chat-input" 
            placeholder="Type your message..." 
            maxlength="500" 
            autocomplete="off" 
            required 
          />
          <button type="submit" id="phizeeoSendBtn" class="phizeeo-send-btn" aria-label="Send message">
            ${SEND_ICON}
          </button>
        </form>
        <div class="phizeeo-disclaimer">General information only, not medical advice.</div>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    attachEvents();
    renderWelcomeMessage();
  }

  function attachEvents() {
    const launcher = document.getElementById('phizeeoChatLauncher');
    const closeBtn = document.getElementById('phizeeoCloseBtn');
    const form = document.getElementById('phizeeoForm');
    const input = document.getElementById('phizeeoInput');

    launcher.addEventListener('click', toggleWidget);
    closeBtn.addEventListener('click', closeWidget);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = input.value.trim();
      if (text && !isLoading) {
        handleUserMessage(text);
        input.value = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeWidget();
      }
    });
  }

  function toggleWidget() {
    isOpen ? closeWidget() : openWidget();
  }

  function openWidget() {
    isOpen = true;
    const panel = document.getElementById('phizeeoChatPanel');
    const launcher = document.getElementById('phizeeoChatLauncher');
    const input = document.getElementById('phizeeoInput');

    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    launcher.setAttribute('aria-expanded', 'true');
    launcher.innerHTML = CLOSE_ICON;

    setTimeout(() => input.focus(), 150);
  }

  function closeWidget() {
    isOpen = false;
    const panel = document.getElementById('phizeeoChatPanel');
    const launcher = document.getElementById('phizeeoChatLauncher');

    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = CHAT_ICON;
    launcher.focus();
  }

  function renderWelcomeMessage() {
    const messagesContainer = document.getElementById('phizeeoMessages');
    const welcomeHTML = `
      <div class="phizeeo-message-row bot">
        <div class="phizeeo-avatar-icon" style="width:28px; height:28px; font-size:0.75rem; flex-shrink:0;">PZ</div>
        <div>
          <div class="phizeeo-msg-bubble">
            Hi, I'm PhiZeeo's virtual assistant. I can answer questions about our home physio services and help you book a visit.
          </div>
          <div class="phizeeo-chips-wrap">
            <button class="phizeeo-chip-btn" data-chip="Our services">Our services</button>
            <button class="phizeeo-chip-btn" data-chip="How it works">How it works</button>
            <button class="phizeeo-chip-btn" data-chip="Book a home visit">Book a home visit</button>
            <button class="phizeeo-chip-btn" data-chip="Talk to a physio">Talk to a physio</button>
          </div>
        </div>
      </div>
    `;
    messagesContainer.innerHTML = welcomeHTML;

    messagesContainer.querySelectorAll('.phizeeo-chip-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const chipText = this.getAttribute('data-chip');
        if (chipText && !isLoading) {
          handleChipClick(chipText);
        }
      });
    });
  }

  // Handle Quick Reply Chips Specifically per rules
  function handleChipClick(chipText) {
    appendMessage(chipText, 'user');

    if (chipText === "Our services") {
      const servicesText = 
        "Here are PhiZeeo's specialized home physiotherapy services:\n" +
        "1. Home Visit Physio: Professional treatment delivered at home.\n" +
        "2. Orthopedic Rehab: Pain relief and mobility recovery for joints, spine, and fractures.\n" +
        "3. Neuro Rehabilitation: Stroke, paralysis, and neurological recovery.\n" +
        "4. Sports Injury Rehab: Injury recovery and performance training.\n" +
        "5. Pediatric and Geriatric Care: Specialized care for children and seniors.\n" +
        "6. Cardiopulmonary Rehab: Support for heart and lung conditions.\n\n" +
        "Which of these services can I help you with today?";
      appendMessage(servicesText, 'bot');
      return;
    }

    if (chipText === "How it works") {
      const worksText = 
        "Our home treatment process works in 4 simple steps:\n" +
        "1. Assessment: Complete physical evaluation at your home.\n" +
        "2. Treatment plan: Customized physio program.\n" +
        "3. Therapy sessions: Hands-on treatment and guided exercises.\n" +
        "4. Recovery guidance: Progress tracking and home exercise support.\n\n" +
        "Would you like to schedule an initial home assessment?";
      appendMessage(worksText, 'bot');
      return;
    }

    if (chipText === "Book a home visit") {
      bookingStep = 1;
      bookingData = { name: '', phone: '', service: '', date: '' };
      appendMessage("I would be glad to help set up your booking request. May I have your full name?", 'bot');
      return;
    }

    if (chipText === "Talk to a physio") {
      const talkText = "You can connect directly with our physiotherapy team on WhatsApp at 9360447385. Would you like to send them a message now?";
      appendMessage(talkText, 'bot');
      appendWhatsAppButton("Inquiry to talk to a physio");
      return;
    }

    handleUserMessage(chipText);
  }

  // Handle User Inputs
  function handleUserMessage(text) {
    // If not triggered via chip click, append user message
    if (!document.querySelector(`.phizeeo-message-row.user:last-child`)) {
      appendMessage(text, 'user');
    }

    // Safety Rule: Emergency Check
    const isEmergency = EMERGENCY_KEYWORDS.some(kw => text.toLowerCase().includes(kw));
    if (isEmergency) {
      renderEmergencyAlert();
      return;
    }

    // Guided Booking Flow (One Question at a Time)
    if (bookingStep > 0) {
      handleBookingFlowStep(text);
      return;
    }

    // In-Memory History (max 10)
    conversationHistory.push({ role: 'user', content: text });
    if (conversationHistory.length > 10) conversationHistory.shift();

    showTypingIndicator();
    setLoading(true);

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: conversationHistory })
    })
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json().then(data => data.reply || "How can I assist your physical recovery today?");
      })
      .then(replyText => {
        removeTypingIndicator();
        appendMessage(replyText, 'bot');
        conversationHistory.push({ role: 'assistant', content: replyText });
        if (conversationHistory.length > 10) conversationHistory.shift();

        // If assistant suggested booking/WhatsApp, show WhatsApp button
        if (replyText.toLowerCase().includes('whatsapp') || replyText.toLowerCase().includes('book')) {
          appendWhatsAppButton(text);
        }
      })
      .catch(() => {
        removeTypingIndicator();
        appendMessage("Sorry, I could not connect just now. You can reach us directly on WhatsApp.", 'bot');
        appendWhatsAppButton(text);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Step-by-Step Booking Collector
  function handleBookingFlowStep(userInput) {
    if (bookingStep === 1) {
      bookingData.name = userInput;
      bookingStep = 2;
      appendMessage(`Thank you, ${userInput}. What is your best phone number?`, 'bot');
      return;
    }
    if (bookingStep === 2) {
      bookingData.phone = userInput;
      bookingStep = 3;
      appendMessage("Got it. What condition or physiotherapy service do you need help with?", 'bot');
      return;
    }
    if (bookingStep === 3) {
      bookingData.service = userInput;
      bookingStep = 4;
      appendMessage("Thank you. What is your preferred date or time for the home visit?", 'bot');
      return;
    }
    if (bookingStep === 4) {
      bookingData.date = userInput;
      bookingStep = 0; // Completed

      // Save lead to Supabase if available
      if (typeof window.saveAppointmentToSupabase === 'function') {
        window.saveAppointmentToSupabase(bookingData);
      }

      const summary = `Request for ${bookingData.name} (${bookingData.phone}) - Service: ${bookingData.service} on ${bookingData.date}`;
      const summaryMsg = `I have collected your details:\n${summary}\n\nPlease tap the WhatsApp button below to send your request. Our team will check availability and confirm your visit, as I cannot confirm appointments directly.`;
      
      appendMessage(summaryMsg, 'bot');
      appendWhatsAppButton(summary);
    }
  }

  function appendMessage(text, role) {
    const messagesContainer = document.getElementById('phizeeoMessages');
    const row = document.createElement('div');
    row.className = `phizeeo-message-row ${role}`;

    if (role === 'bot') {
      row.innerHTML = `
        <div class="phizeeo-avatar-icon" style="width:28px; height:28px; font-size:0.75rem; flex-shrink:0;">PZ</div>
        <div class="phizeeo-msg-bubble">${escapeHTML(text).replace(/\n/g, '<br/>')}</div>
      `;
    } else {
      row.innerHTML = `<div class="phizeeo-msg-bubble">${escapeHTML(text).replace(/\n/g, '<br/>')}</div>`;
    }

    messagesContainer.appendChild(row);
    scrollToBottom();
  }

  function appendWhatsAppButton(summaryText) {
    const messagesContainer = document.getElementById('phizeeoMessages');
    const waText = encodeURIComponent(`Hi PhiZeeo, I'd like to book a home physio visit. Summary: ${summaryText}`);
    const waUrl = `https://wa.me/919360447385?text=${waText}`;

    const wrap = document.createElement('div');
    wrap.style.paddingLeft = '36px';
    wrap.innerHTML = `
      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="phizeeo-whatsapp-btn">
        ${WHATSAPP_ICON}
        Continue on WhatsApp
      </a>
    `;
    messagesContainer.appendChild(wrap);
    scrollToBottom();
  }

  function renderEmergencyAlert() {
    removeTypingIndicator();
    setLoading(false);
    const messagesContainer = document.getElementById('phizeeoMessages');
    const alertDiv = document.createElement('div');
    alertDiv.className = 'phizeeo-emergency-box';
    alertDiv.innerHTML = `
      This may be an emergency. Please call 112 or go to the nearest hospital immediately.
    `;
    messagesContainer.appendChild(alertDiv);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const messagesContainer = document.getElementById('phizeeoMessages');
    const indicator = document.createElement('div');
    indicator.id = 'phizeeoTypingIndicator';
    indicator.className = 'phizeeo-message-row bot';
    indicator.innerHTML = `
      <div class="phizeeo-avatar-icon" style="width:28px; height:28px; font-size:0.75rem; flex-shrink:0;">PZ</div>
      <div class="phizeeo-typing-indicator">
        <span class="phizeeo-typing-dot"></span>
        <span class="phizeeo-typing-dot"></span>
        <span class="phizeeo-typing-dot"></span>
      </div>
    `;
    messagesContainer.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('phizeeoTypingIndicator');
    if (indicator) indicator.remove();
  }

  function setLoading(loading) {
    isLoading = loading;
    const sendBtn = document.getElementById('phizeeoSendBtn');
    const input = document.getElementById('phizeeoInput');
    if (sendBtn) sendBtn.disabled = loading;
    if (input) input.disabled = loading;
  }

  function scrollToBottom() {
    const messagesContainer = document.getElementById('phizeeoMessages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidgetHTML);
  } else {
    createWidgetHTML();
  }
})();
