import Link from 'next/link';
import { MapPin, MessageCircle } from 'lucide-react';
import type { StoneProduct } from '@/types/stone';
import { siteConfig } from '@/config/site';
import { primaryLocation, dispatch, addressOneLine } from '@/data/local-seo';
import { buildSlug } from '@/lib/landing/slug';
import type { MaterialId, LocationId } from '@/lib/landing/types';
import styles from './ProductLocalBlock.module.css';

const DELIVERY_CITIES: { id: LocationId; label: string }[] = [
  { id: 'delhi', label: 'Delhi NCR' },
  { id: 'mumbai', label: 'Mumbai' },
  { id: 'bangalore', label: 'Bengaluru' },
  { id: 'ludhiana', label: 'Ludhiana' },
  { id: 'ahmedabad', label: 'Ahmedabad' },
  { id: 'surat', label: 'Surat' },
  { id: 'indore', label: 'Indore' },
  { id: 'gurugram', label: 'Gurugram' },
  { id: 'pune', label: 'Pune' },
  { id: 'nagpur', label: 'Nagpur' },
  { id: 'mysuru', label: 'Mysuru' },
  { id: 'karnataka', label: 'Karnataka' },
  { id: 'hyderabad', label: 'Hyderabad' },
  { id: 'jaipur', label: 'Jaipur' },
  { id: 'rajasthan', label: 'Rajasthan' },
  { id: 'kishangarh', label: 'Kishangarh' },
];

/**
 * Per-product local supply block.
 *
 * A stone detail page answers "what is Black Galaxy granite". It does not answer
 * "black galaxy granite supplier in kishangarh" or "…price in kishangarh" —
 * which is the shape most commercial-intent queries in this market actually
 * take. Before this block, all 55 product pages carried no location text at all
 * beyond the footer address, and their Product schema named the seller with a
 * bare string that Google discards.
 *
 * The copy is generated from the product's own fields plus the one canonical
 * copy of the local facts, so it stays specific per stone (origin, formats,
 * finish count) without anyone hand-writing 55 variants — and without inventing
 * claims, since every value shown is already asserted elsewhere on the page.
 */
export default function ProductLocalBlock({ product }: { product: StoneProduct }) {
  const categoryLabel = product.category === 'granite' ? 'granite' : 'marble';

  const whatsappUrl = `https://wa.me/${siteConfig.links.phoneRaw.replace(
    /\D/g,
    ''
  )}?text=${encodeURIComponent(
    `Hello, I'd like a quote for ${product.name} — please share available sizes, finishes and pricing ex-Kishangarh.`
  )}`;

  // The last size is the largest. Its `dimensions` string sometimes already
  // reads "Up to 240 × 140 cm", so strip that before prefixing our own.
  const largestSize = product.sizes[product.sizes.length - 1]?.dimensions?.replace(
    /^up to\s+/i,
    ''
  );

  const finishLabel = product.finishes[0]?.label.toLowerCase() ?? 'polished';

  // Composed as strings rather than inline JSX: interleaving {expressions} with
  // punctuation across lines makes JSX emit stray spaces before commas and
  // full stops ("… railhead ." / "… 5 finishes) ,").
  const processedLine =
    `${product.name} is quarried at ${product.origin} and processed at our own facility ` +
    `in ${primaryLocation.label} — cut, ${finishLabel}` +
    (product.finishes.length > 1 ? ` (or any of ${product.finishes.length} finishes)` : '') +
    `, hand-inspected in daylight and crated on site. Selecting in person is welcome: ` +
    `tell us the lot size you need and we will have ${product.name} slabs standing out ` +
    `for you when you arrive.`;

  const dispatchLine =
    `Domestic orders dispatch by road from the ${dispatch.highway} and by rail from the ` +
    `${dispatch.railhead}. Export consignments containerise for ${dispatch.port}.`;

  const formatsLine =
    `Tiles and slabs${largestSize ? ` up to ${largestSize}` : ''}` +
    `${product.specs.thickness ? ` · ${product.specs.thickness}` : ''}`;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <span className="section-eyebrow">Supply &amp; Dispatch</span>
            <h2 className={styles.title}>
              Buy {product.name} in <em>{primaryLocation.city}</em>
            </h2>
          </div>

          <div>
            <div className={styles.body}>
              <p>{processedLine}</p>
              <p>{dispatchLine}</p>
            </div>

            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt className={styles.factLabel}>Quarry origin</dt>
                <dd className={styles.factValue}>{product.origin}</dd>
              </div>
              <div className={styles.fact}>
                <dt className={styles.factLabel}>Processed at</dt>
                <dd className={styles.factValue}>{addressOneLine}</dd>
              </div>
              <div className={styles.fact}>
                <dt className={styles.factLabel}>Finishes available</dt>
                <dd className={styles.factValue}>
                  {product.finishes.map((f) => f.label).join(', ')}
                </dd>
              </div>
              <div className={styles.fact}>
                <dt className={styles.factLabel}>Formats</dt>
                <dd className={styles.factValue}>{formatsLine}</dd>
              </div>
            </dl>

            {/* ── Direct Delivery Corridors ── */}
            <div className={styles.corridorBlock}>
              <span className={styles.corridorEyebrow}>Direct Supply &amp; City Rates</span>
              <h3 className={styles.corridorTitle}>
                Order {product.name} with Doorstep Delivery
              </h3>
              <div className={styles.cityPills}>
                {DELIVERY_CITIES.map((loc) => {
                  const mat = (product.category === 'imported-marble' ? 'marble' : product.category) as MaterialId;
                  const citySlug = buildSlug({
                    pattern: 'P-Stone',
                    stoneSlug: product.slug,
                    material: mat,
                    location: loc.id,
                  });
                  return (
                    <Link
                      key={loc.id}
                      href={`/${citySlug}`}
                      className={styles.cityPill}
                    >
                      <span>{loc.label}</span>
                      <span className={styles.cityPillArrow}>→</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className={styles.ctaRow}>
              <a
                data-wa-source="product_local_block"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaPrimary}
              >
                <MessageCircle size={14} aria-hidden="true" />
                Get a {categoryLabel} quote
              </a>
              <Link href="/marble-exporters-in-kishangarh" className={styles.ctaSecondary}>
                <MapPin size={14} aria-hidden="true" />
                Visit the Kishangarh yard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
