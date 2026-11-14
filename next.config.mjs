/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployment Skew Protection: prevents 404s on static chunk files across deployments
  deploymentId: process.env.VERCEL_DEPLOYMENT_ID || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Corrected stone trade-name spellings — preserve any indexed URLs.
      { source: '/marble/bottincino', destination: '/marble/botticino', permanent: true },
      { source: '/marble/michaelangelo-marble', destination: '/marble/michelangelo-marble', permanent: true },
      // Renamed project slug: Mandwa/Sikar → Mandawa.
      { source: '/projects/mandwa-resort-sikar', destination: '/projects/mandawa-resort', permanent: true },
      // Removed application: Hotel & Hospitality is no longer offered.
      { source: '/applications/hotel-projects', destination: '/applications', permanent: true },

      // ── 404 Resolution: Canonical Application Aliases ───────────────────────
      { source: '/applications/kitchen-counter', destination: '/applications/kitchen-countertops', permanent: true },
      { source: '/applications/kitchen-countertop', destination: '/applications/kitchen-countertops', permanent: true },
      { source: '/applications/outdoor-paving', destination: '/applications/exterior-cladding', permanent: true },
      { source: '/applications/landscaping', destination: '/applications/exterior-cladding', permanent: true },
      { source: '/applications/garden', destination: '/applications/exterior-cladding', permanent: true },
      { source: '/applications/pool-surround', destination: '/applications/exterior-cladding', permanent: true },
      { source: '/applications/bar-counter', destination: '/applications/tabletops', permanent: true },
      { source: '/applications/bar-counters', destination: '/applications/tabletops', permanent: true },
      { source: '/applications/feature-walls', destination: '/applications/wall-cladding', permanent: true },
      { source: '/applications/feature-wall', destination: '/applications/wall-cladding', permanent: true },
      { source: '/applications/backlit-feature-walls', destination: '/applications/wall-cladding', permanent: true },
      { source: '/applications/fireplace', destination: '/applications/wall-cladding', permanent: true },
      { source: '/applications/fireplaces', destination: '/applications/wall-cladding', permanent: true },
      { source: '/applications/bathroom-vanities', destination: '/applications/bathroom', permanent: true },
      { source: '/applications/bathroom-flooring', destination: '/applications/bathroom', permanent: true },

      // ── 404 Resolution: Canonical Finish Aliases ───────────────────────────
      { source: '/finishes/leather', destination: '/finishes/leathered', permanent: true },
      { source: '/finishes/brushed', destination: '/finishes/leathered', permanent: true },
      { source: '/finishes/unfilled-brushed', destination: '/finishes/antique', permanent: true },
      { source: '/finishes/honed-filled', destination: '/finishes/honed', permanent: true },
      { source: '/finishes/filled-polished', destination: '/finishes/polished', permanent: true },
      { source: '/finishes/backlit', destination: '/finishes/polished', permanent: true },
      { source: '/finishes/natural', destination: '/finishes/chiseled', permanent: true },
      { source: '/finishes/sandblasted', destination: '/finishes/shot-blast', permanent: true },

      // ── 404 Resolution: Category & Product Fallback Aliases ────────────────
      { source: '/collections/travertine', destination: '/marble/travertine', permanent: true },
      { source: '/collections/marble/carrara-white-marble', destination: '/marble', permanent: true },
    ];
  },
};

export default nextConfig;

