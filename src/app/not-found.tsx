import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './not-found.module.css';

// `noindex` keeps soft-404s out of the index; `follow` still lets Google use
// the links below as crawl paths back into the catalogue.
export const metadata: Metadata = {
  title: 'Page Not Found | Granite Gallery',
  description:
    'This page could not be found. Explore our marble, granite, sandstone and quartzite collections, or speak to our team in Kishangarh.',
  robots: { index: false, follow: true },
};

const SECTIONS = [
  { href: '/marble', title: 'Marble', sub: 'Indian & Imported' },
  { href: '/granite', title: 'Granite', sub: '40+ Varieties' },
  { href: '/collections', title: 'Collections', sub: 'All Stone Types' },
  { href: '/applications', title: 'Applications', sub: 'Where Stone Fits' },
];

const POPULAR = [
  { href: '/marble/makrana-white', label: 'Makrana White' },
  { href: '/marble/statuario', label: 'Statuario' },
  { href: '/granite/black-galaxy', label: 'Black Galaxy' },
  { href: '/granite/tan-brown', label: 'Tan Brown' },
  { href: '/collections/sandstone', label: 'Sandstone' },
  { href: '/collections/quartzite', label: 'Quartzite' },
  { href: '/finishes', label: 'Finishes' },
  { href: '/projects', label: 'Projects' },
];

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className={styles.bg}>
        <Image
          src="/images/hero/granite-gallery-luxury-marble-interior.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.bgImg}
        />
      </div>
      <div className={styles.veil} />

      <div className={styles.container}>
        <p className={styles.code}>404</p>
        <div className={styles.rule} />

        <h1 className={styles.title}>
          This Slab Isn&apos;t in <em>Our Yard</em>
        </h1>
        <p className={styles.lede}>
          The page you&apos;re looking for has been moved, renamed, or never existed.
          Our stone, however, is exactly where it should be — let&apos;s get you back to it.
        </p>

        <div className={styles.actions}>
          <Link href="/" className="btn btn-copper">
            <span>Back to Home</span>
          </Link>
          <Link href="/collections" className="btn btn-outline-ivory">
            <span>Browse Collections</span>
          </Link>
        </div>

        <div className={styles.navBlock}>
          <p className={styles.navLabel}>Explore Instead</p>

          <div className={styles.grid}>
            {SECTIONS.map((s) => (
              <Link key={s.href} href={s.href} className={styles.card}>
                <span className={styles.cardTitle}>{s.title}</span>
                <span className={styles.cardSub}>{s.sub}</span>
              </Link>
            ))}
          </div>

          <p className={styles.chipsLabel}>Popular right now</p>
          <div className={styles.chips}>
            {POPULAR.map((p) => (
              <Link key={p.href} href={p.href} className={styles.chip}>
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
