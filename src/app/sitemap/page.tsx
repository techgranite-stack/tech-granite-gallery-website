import type { Metadata } from 'next';
import Link from 'next/link';
import { productsData }     from '@/lib/product-data';
import { finishesData }     from '@/lib/finish-data';
import { applicationsData } from '@/lib/application-data';
import { blogPostsData }    from '@/lib/blog-data';
import { projectsData }     from '@/lib/project-data';
import { landingPages }     from '@/lib/landing-pages-data';
import { getAllMarble, getAllGranite } from '@/data/stone-index';

// Render on-demand — heavy data imports cause static generation timeout on Vercel
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sitemap | Granite Gallery',
  description: 'Complete sitemap of all pages, products, and content on the Granite Gallery website.',
  robots: { index: false },
};

interface SitemapGroup {
  heading: string;
  links: { label: string; href: string }[];
}

function buildGroups(): SitemapGroup[] {
  const marbleStones  = getAllMarble();
  const graniteStones = getAllGranite();
  const categories    = Array.from(new Set(productsData.map((p) => p.type)));

  return [
    {
      heading: 'Main Pages',
      links: [
        { label: 'Home',         href: '/' },
        { label: 'Collections',  href: '/collections' },
        { label: 'Marble',       href: '/marble' },
        { label: 'Granite',      href: '/granite' },
        { label: 'Finishes',     href: '/finishes' },
        { label: 'Applications', href: '/applications' },
        { label: 'Projects',     href: '/projects' },
        { label: 'Blog',         href: '/blogs' },
        { label: 'Our Team',     href: '/team' },
      ],
    },
    {
      heading: 'Marble Collection',
      links: marbleStones.map((s) => ({
        label: s.name,
        href:  `/marble/${s.slug}`,
      })),
    },
    {
      heading: 'Granite Collection',
      links: graniteStones.map((s) => ({
        label: s.name,
        href:  `/granite/${s.slug}`,
      })),
    },
    {
      heading: 'Collections (Legacy)',
      links: [
        ...categories.map((cat) => ({
          label: cat.charAt(0).toUpperCase() + cat.slice(1),
          href:  `/collections/${cat}`,
        })),
        ...productsData.map((p) => ({
          label: p.name,
          href:  `/collections/${p.type}/${p.slug}`,
        })),
      ],
    },
    {
      heading: 'Surface Finishes',
      links: finishesData.map((f) => ({
        label: f.name,
        href:  `/finishes/${f.slug}`,
      })),
    },
    {
      heading: 'Applications',
      links: applicationsData.map((a) => ({
        label: a.title,
        href:  `/applications/${a.slug}`,
      })),
    },
    {
      heading: 'Project Case Studies',
      links: projectsData.map((p) => ({
        label: p.title,
        href:  `/projects/${p.slug}`,
      })),
    },
    {
      heading: 'Blog & Articles',
      links: blogPostsData.map((b) => ({
        label: b.title,
        href:  `/blogs/${b.slug}`,
      })),
    },
    {
      heading: 'Landing Pages',
      links: Object.values(landingPages).map((lp) => ({
        label: lp.metadata.title,
        href:  `/${lp.slug}`,
      })),
    },
  ].filter((g) => g.links.length > 0);
}

export default function SitemapPage() {
  const groups = buildGroups();

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 40px 80px', fontFamily: 'Inter, sans-serif' }}>
      {/* CSS hover without JS event handlers */}
      <style>{`.sm-link:hover { color: #C08552 !important; }`}</style>
      <header style={{ marginBottom: 60 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C08552', marginBottom: 12 }}>
          Site Navigation
        </p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400, color: '#4B2E2B', marginBottom: 16 }}>
          Sitemap
        </h1>
        <p style={{ fontSize: 14, color: '#8C7060', maxWidth: 560, lineHeight: 1.7 }}>
          Every page on the Granite Gallery website, organised by category.
          This page is auto-generated — adding content to any data file automatically
          adds it here.
        </p>
        <Link href="/sitemap.xml" style={{ display: 'inline-block', marginTop: 16, fontSize: 12, color: '#C08552', textDecoration: 'underline' }}>
          View XML Sitemap →
        </Link>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 48 }}>
        {groups.map((group) => (
          <section key={group.heading}>
            <h2 style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#C08552',
              marginBottom: 16,
              paddingBottom: 10,
              borderBottom: '1px solid #E5D8C8',
            }}>
              {group.heading}
              <span style={{ marginLeft: 8, background: '#F2EBE0', borderRadius: 100, padding: '2px 8px', fontSize: 9, color: '#8C7060' }}>
                {group.links.length}
              </span>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="sm-link"
                    style={{
                      fontSize: 13,
                      color: '#5C3D34',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <footer style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid #E5D8C8', fontSize: 12, color: '#8C7060' }}>
        Total pages indexed: {groups.reduce((sum, g) => sum + g.links.length, 0)}
        {' · '}
        Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
      </footer>
    </div>
  );
}
