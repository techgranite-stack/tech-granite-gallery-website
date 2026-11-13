/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ];
  },
};

export default nextConfig;
