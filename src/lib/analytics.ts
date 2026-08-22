// ============================================================
// src/lib/analytics.ts
// Thin wrapper over gtag.js. Every call is a no-op when the tag has not
// loaded (ad-blocker, GA disabled via NEXT_PUBLIC_GA_ID="", or SSR), so
// callers never need to guard.
// ============================================================

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      targetOrName: string | Date,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/**
 * Where a WhatsApp click came from. Sent as `source` so the floating button,
 * the quick-enquiry dialog and the ~21 in-page CTAs stay distinguishable in
 * GA4 without having to filter on link_url.
 */
export type WhatsAppSource = 'float' | 'quick_dialog' | 'page_cta';

export function trackWhatsAppClick(source: WhatsAppSource, extra: Record<string, unknown> = {}): void {
  trackEvent('whatsapp_click', {
    source,
    page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    ...extra,
  });
}
