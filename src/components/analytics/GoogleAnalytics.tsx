import Script from 'next/script';

interface GoogleAnalyticsProps {
  /** GA4 measurement ID, e.g. "G-XXXXXXXXXX". Renders nothing when empty. */
  gaId: string;
}

/**
 * Google tag (gtag.js). Loaded through next/script with the `afterInteractive`
 * strategy so it never blocks first paint and is injected exactly once, even
 * across App Router soft navigations.
 *
 * Route changes are captured by GA4 Enhanced Measurement ("Page changes based
 * on browser history events"), so no manual page_view call is needed here —
 * adding one would double-count.
 */
export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
