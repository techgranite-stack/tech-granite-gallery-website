import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/sections/PageHero';
import BannerContactForm from '@/components/sections/BannerContactForm';
import FAQAccordion from '@/components/sections/FAQAccordion';
import LocalDeliveryCorridor from '@/components/sections/LocalDeliveryCorridor';
import { finishesData } from '@/lib/finish-data';
import { buildMetadata } from '@/lib/seo';
import styles from './finish.module.css';

// Unknown slugs 404 at the routing layer instead of rendering placeholder content.
export const dynamicParams = false;

export async function generateStaticParams() {
  return finishesData.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const finish = finishesData.find((f) => f.slug === slug);
  if (!finish) return {};
  return buildMetadata({
    title: finish.metaTitle,
    description: finish.metaDescription,
    keywords: finish.keywords,
    canonical: `/finishes/${finish.slug}`,
    image: finish.ogImage ?? finish.image,
  });
}

export default async function FinishDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const finish = finishesData.find((f) => f.slug === slug);
  if (!finish) notFound();

  // Other finishes for related section
  const related = finishesData.filter((f) => f.slug !== slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Surface Finishes"
        title={finish.name}
        subtitle={finish.subtitle}
        heroImage={finish.image}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Finishes', href: '/finishes' },
          { label: finish.name },
        ]}
        badges={[
          { value: finish.texture.charAt(0).toUpperCase() + finish.texture.slice(1), label: 'Texture' },
          { value: finish.maintenanceLevel === 'low' ? 'Low' : finish.maintenanceLevel === 'medium' ? 'Medium' : 'High', label: 'Maintenance' },
        ]}
      />

      {/* Detail Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>

            {/* Left: Description */}
            <div className={styles.left}>
              <div className={styles.textBlock}>
                <span className="section-eyebrow">About This Finish</span>
                <h2 className={styles.sectionTitle}>{finish.pageTitle ?? finish.name}</h2>
                {finish.longDescription.split('\n\n').map((para, i) => (
                  <p key={i} className={styles.para}>{para}</p>
                ))}
              </div>

              {/* Best For Stones */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>Best Stone Types</h3>
                <div className={styles.pills}>
                  {finish.bestFor.map((s) => (
                    <Link key={s} href={`/collections/${s}`} className={styles.pill}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>Ideal Applications</h3>
                <div className={styles.pills}>
                  {finish.applications.map((a) => (
                    <span key={a} className={`${styles.pill} ${styles.pillNeutral}`}>{a}</span>
                  ))}
                </div>
              </div>

              {/* Pros / Cons */}
              <div className={styles.prosConsGrid}>
                <div className={styles.prosCons}>
                  <h3 className={`${styles.groupTitle} ${styles.prosTitle}`}>✓ Advantages</h3>
                  <ul className={styles.prosList}>
                    {finish.pros.map((p, i) => (
                      <li key={i} className={styles.prosItem}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.prosCons}>
                  <h3 className={`${styles.groupTitle} ${styles.consTitle}`}>✗ Considerations</h3>
                  <ul className={styles.consList}>
                    {finish.cons.map((c, i) => (
                      <li key={i} className={styles.consItem}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Care Instructions */}
              <div className={styles.careBlock}>
                <h3 className={styles.groupTitle}>Care & Maintenance</h3>
                <p className={styles.careText}>{finish.careInstructions}</p>
              </div>

              {/* CTA */}
              <a
                data-wa-source="finish_detail"
                href="https://wa.me/919116622422?text=Hello, I'd like to know more about stone finishes."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-copper"
              >
                <span>Discuss Your Finish Requirements</span>
              </a>
            </div>

            {/* Right: Image */}
            <div className={styles.right}>
              <div className={styles.mainImg}>
                <Image
                  src={finish.image}
                  alt={finish.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={styles.mainImgInner}
                />
                <div className={styles.imgOverlay}>
                  <span className={styles.finishLabel}>{finish.name}</span>
                </div>
              </div>

              {/* Texture Info Box */}
              <div className={styles.infoBox}>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>Texture Type</span>
                  <span className={styles.infoVal}>{finish.texture.charAt(0).toUpperCase() + finish.texture.slice(1)}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>Maintenance</span>
                  <span className={styles.infoVal}>{finish.maintenanceLevel.charAt(0).toUpperCase() + finish.maintenanceLevel.slice(1)}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>Best Stones</span>
                  <span className={styles.infoVal}>{finish.bestFor.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Finishes */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.container}>
            <div className={styles.relatedHeader}>
              <span className="section-eyebrow">Other Finishes</span>
              <h2 className={styles.sectionTitle}>Explore More <em>Finishes</em></h2>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((f) => (
                <Link key={f.slug} href={`/finishes/${f.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedImgWrap}>
                    <Image src={f.image} alt={f.name} fill sizes="25vw" className={styles.relatedImg} />
                  </div>
                  <div className={styles.relatedOverlay} />
                  <div className={styles.relatedContent}>
                    <p className={styles.relatedName}>{f.name}</p>
                    <p className={styles.relatedSub}>{f.texture}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <LocalDeliveryCorridor />

      {finish.faqs && finish.faqs.length > 0 && (
        <FAQAccordion
          items={finish.faqs}
          title={finish.name}
          titleEm="FAQs"
          eyebrow="FAQ"
        />
      )}

      <BannerContactForm />
    </>
  );
}
