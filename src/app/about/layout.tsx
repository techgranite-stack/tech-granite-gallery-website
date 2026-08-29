import type { Metadata } from 'next';
import { pageSeo } from '@/data/page-seo';

/**
 * `about/page.tsx` is a client component (it drives the stone/application/finish
 * selectors with useState), so it cannot export `metadata` itself — which left
 * /about inheriting the root layout's generic site-wide title and description,
 * while its perfectly good `pageSeo['/about']` entry went unread.
 *
 * Layouts are server components by default and their metadata composes down to
 * the page, so this recovers the SEO without refactoring 669 lines of UI.
 */
const seo = pageSeo['/about'];

export const metadata: Metadata = {
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  alternates: { canonical: '/about' },
  openGraph: {
    title: seo.metaTitle,
    description: seo.metaDescription,
    ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
