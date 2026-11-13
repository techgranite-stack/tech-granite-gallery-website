import Image from 'next/image';
import Link from 'next/link';
import type { ProductDetailData } from '@/lib/product-detail';
import styles from './ProductCatalog.module.css';

/* ── Highlight icons (chosen by index) ─────────────────────── */
const highlightIcons = [
  // sun
  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" key="sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>),
  // diamond / gem
  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" key="gem"><path d="M6 3h12l4 6-10 12L2 9l4-6Z" /><path d="M2 9h20M12 21 8 9l4-6 4 6-4 12" /></svg>),
  // sparkle
  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" key="sparkle"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l3 3M15.4 15.4l3 3M18.4 5.6l-3 3M8.6 15.4l-3 3" /></svg>),
  // coins
  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" key="coins"><ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v5c0 1.66 2.69 3 6 3s6-1.34 6-3V7" /><path d="M3 12v5c0 1.66 2.69 3 6 3 1.5 0 2.87-.28 3.9-.74" /><ellipse cx="17" cy="14" rx="4" ry="2" /><path d="M13 14v3c0 1.1 1.79 2 4 2s4-.9 4-2v-3" /></svg>),
];

/* ── Trust band (static, same for every product) ───────────── */
const trustItems = [
  {
    title: 'Premium Quality',
    sub: 'Carefully selected blocks',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>),
  },
  {
    title: 'Consistent Supply',
    sub: 'Reliable & on-time delivery',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></svg>),
  },
  {
    title: 'Custom Sizes Available',
    sub: 'Tailored to your project needs',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15 15 3l6 6L9 21z" /><path d="M7 11l2 2M11 7l2 2M9.5 15.5l1.5 1.5" /></svg>),
  },
  {
    title: 'Expert Support',
    sub: 'Get advice from our stone experts',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><path d="M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 1ZM20 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 1Z" /><path d="M18 18a4 4 0 0 1-4 3h-2" /></svg>),
  },
];

export default function ProductCatalog({
  eyebrow,
  title,
  subtitle,
  description,
  highlights,
  specRows,
  finishes,
  applications,
  image,
  imageAlt,
  whatsappUrl,
  backHref,
  backLabel,
  priceFormatted,
  priceNote,
}: ProductDetailData) {
  const paras = description.split('\n\n').filter(Boolean);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── Row 1: Intro + Image ── */}
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.titleMeta}>
              <span className={styles.subtitle}>{subtitle}</span>
              {priceFormatted && (
                <span className={styles.pricePill}>
                  {priceFormatted} <span className={styles.pricePillSub}>ex-factory</span>
                </span>
              )}
            </div>
            <div className={styles.copperLine} />

            {paras.map((p, i) => (
              <p key={i} className={styles.para}>{p}</p>
            ))}

            {highlights.length > 0 && (
              <ul className={styles.highlights}>
                {highlights.map((h, i) => (
                  <li key={i} className={styles.highlight}>
                    <span className={styles.highlightIcon}>
                      {highlightIcons[i % highlightIcons.length]}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.imageWrap}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        </div>

        {/* ── Row 2: Specs + Finishes ── */}
        <div className={styles.specsRow}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Technical Specifications</h3>
            <div className={styles.specsGrid}>
              {specRows.map((row) => {
                const isPrice = row.key.toLowerCase().includes('price');
                return (
                  <div
                    key={row.key}
                    className={`${styles.specRow} ${isPrice ? styles.specRowPrice : ''}`}
                  >
                    <span className={styles.specKey}>{row.key}</span>
                    <span className={styles.specVal}>{row.val}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Available Finishes</h3>
            <div className={styles.pills}>
              {finishes.map((f) => (
                <Link key={f.href} href={f.href} className={styles.pill}>
                  {f.label}
                </Link>
              ))}
            </div>

            {applications.length > 0 && (
              <>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleSpaced}`}>Best For</h3>
                <div className={styles.pills}>
                  {applications.map((a) => (
                    <Link key={a.href} href={a.href} className={`${styles.pill} ${styles.appPill}`}>
                      {a.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Row 3: CTA + Trust ── */}
        <div className={styles.ctaRow}>
          <div className={styles.ctaActions}>
            {priceFormatted && (
              <div className={styles.priceCallout}>
                <div className={styles.priceCalloutHeader}>
                  <span className={styles.priceCalloutLabel}>Indicative Price</span>
                  <span className={styles.priceCalloutBadge}>Direct Factory Rate</span>
                </div>
                <div className={styles.priceCalloutValue}>{priceFormatted}</div>
                <div className={styles.priceCalloutSub}>Ex-factory Kishangarh · Slabs & tiles</div>
              </div>
            )}
            <a
              data-wa-source="product_detail"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-copper ${styles.ctaBtn}`}
            >
              <span>Get Quote on WhatsApp</span>
            </a>
            <Link href={backHref} className={styles.backLink}>
              {backLabel}
            </Link>
          </div>

          <div className={styles.trust}>
            {trustItems.map((t) => (
              <div key={t.title} className={styles.trustItem}>
                <span className={styles.trustIcon}>{t.icon}</span>
                <div className={styles.trustText}>
                  <span className={styles.trustTitle}>{t.title}</span>
                  <span className={styles.trustSub}>{t.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
