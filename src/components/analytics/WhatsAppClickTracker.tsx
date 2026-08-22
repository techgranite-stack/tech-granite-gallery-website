'use client';

import { useEffect } from 'react';
import { trackWhatsAppClick, type WhatsAppSource } from '@/lib/analytics';

/**
 * Fires a `whatsapp_click` event for every `wa.me` anchor on the site via one
 * delegated listener, so the ~21 files holding WhatsApp CTAs need no changes.
 *
 * Anchors may opt into a specific source with `data-wa-source`; everything else
 * reports as `page_cta`. QuickDialog uses window.open() rather than an anchor,
 * so it calls trackWhatsAppClick() directly instead of relying on this.
 */
export default function WhatsAppClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href*="wa.me"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      trackWhatsAppClick((anchor.dataset.waSource as WhatsAppSource) ?? 'page_cta', {
        link_url: anchor.href,
      });
    };

    // Capture phase: still records the click if a handler stops propagation.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
