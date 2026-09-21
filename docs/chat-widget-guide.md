# PhiZeeo AI Chat Widget - Integration & Deployment Guide

This guide details how to integrate the standalone **PhiZeeo AI Chat Widget** into any static HTML page or serverless deployment environment.

---

## 1. Two-Line Drop-In Snippet for Static Pages

To add the AI Chat Widget to any static HTML page, insert the following two lines before the closing `</body>` tag:

```html
<!-- PhiZeeo AI Chat Widget -->
<link rel="stylesheet" href="/chat-widget.css" />
<script src="/chat-widget.js" defer></script>
```

*(Note: In your React project, `<ChatWidget />` is already mounted inside `App.jsx` and handles loading these files automatically).*

---

## 2. Serverless Backend Setup (`/api/chat`)

### Vercel / Netlify Setup
1. The serverless function code is located in [`api/chat.js`](file:///c:/Users/Acer%20Nitro%20Anv%2015/Downloads/phizeeo/api/chat.js).
2. Set the environment variable in your Vercel/Netlify project settings:
   - `ANTHROPIC_API_KEY`: `your_anthropic_api_key_here`
   - `ANTHROPIC_MODEL`: `claude-3-5-sonnet-20241022` (Optional)

---

## 3. Short QA / Test Checklist

| # | Test Scenario | Expected Result |
| :- | :--- | :--- |
| 1 | **Mobile View Check** | Launcher button sits at `bottom: 80px; right: 80px`, above the bottom tab bar and to the left of the WhatsApp button (no overlap). Opening chat displays full-screen sheet. |
| 2 | **Keyboard Accessibility** | Press `Tab` to navigate launcher, input, and buttons. Pressing `Esc` closes the chat panel and returns focus to launcher button. |
| 3 | **Emergency Keyword Filter** | Type *"chest pain"*, *"stroke"*, or *"can't breathe"*. The widget immediately halts AI and displays the red **Emergency Notice** advising callers to contact **112 in India**. |
| 4 | **Offline / Network Failure** | Disconnect network or simulate 500 error. The widget displays *"Sorry, I couldn't connect just now. You can reach us directly on WhatsApp."* with a clickable orange WhatsApp button. |
| 5 | **Oversized Message Handling** | Type a message exceeding 500 characters. The input field caps length at 500 chars and disables submission while loading. |
| 6 | **WhatsApp Hand-off** | Click *"Book a home visit"* or *"Talk to a physio"*. The assistant displays the orange *"Continue on WhatsApp"* button prefilled with your query context. |
