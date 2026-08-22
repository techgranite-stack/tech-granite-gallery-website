import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import QuickDialog from "@/components/ui/QuickDialog";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import WhatsAppClickTracker from "@/components/analytics/WhatsAppClickTracker";
import { siteConfig } from "@/config/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url),
  title: siteConfig.name + " | Luxury Natural Stone Boutique",
  description: siteConfig.description,
  // Omitted entirely until a token is set, so we never emit an empty meta tag.
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body style={{ backgroundColor: 'var(--ivory)' }}>
        <SmoothScroll>
          <CustomCursor />
          <Navbar 
            links={siteConfig.mainNav} 
            logoSrc="/Logo-black.png"
            logoAlt={siteConfig.name}
            navBackgroundRgb="255, 248, 240"
            ctaText="Get Quote"
            ctaHref="#contact"
          />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
          <QuickDialog />
        </SmoothScroll>
        <GoogleAnalytics gaId={siteConfig.gaMeasurementId} />
        <WhatsAppClickTracker />
      </body>
    </html>
  );
}
