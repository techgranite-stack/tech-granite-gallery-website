import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/sections/HeroSlider';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import NumberedCardGrid from '@/components/sections/NumberedCardGrid';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import GoogleReviews from '@/components/sections/GoogleReviews';
import ProcessSteps from '@/components/sections/ProcessSteps';
import BannerContactForm from '@/components/sections/BannerContactForm';
import { finishesData, mockFinishFallback } from '@/lib/finish-data';
import { marqueeItems } from '@/data/landing';
import { testimonials } from '@/data/testimonials';
import { finishesReasons, finishesMarquee } from '@/data/whyus';
import { pageSeo } from '@/data/page-seo';
import type { HeroSlide } from '@/types';
import { buildMetadata } from '@/lib/seo';
import styles from './finishes.module.css';

const seo = pageSeo['/finishes'];

export const metadata: Metadata = buildMetadata({
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  canonical: '/finishes',
  image: seo.ogImage,
});

const finishSlides: HeroSlide[] = [
  {
    image: '/images/finishes/finishes-showroom-display-wall-kishangarh.webp',
    title: 'Masterpiece Surface Finishes',
    sub: 'Discover 11 specialized stone surface treatments — Mirror Polished, Leathered, Flamed, Honed & more.',
    eyebrow: 'Precision Craftsmanship',
  },
  {
    image: '/images/finishes/polished.webp',
    title: 'Mirror Polished Finish',
    sub: 'Maximum reflectivity & visual depth for luxury marble & granite interiors.',
    eyebrow: 'Classic Luxury Standard',
  },
  {
    image: '/images/finishes/leathered.webp',
    title: 'Leathered & Tactile Textures',
    sub: 'Sophisticated matte texture that highlights natural stone character.',
    eyebrow: 'Organic Tactile Surface',
  },
  {
    image: '/images/finishes/flamed.webp',
    title: 'Flamed & Anti-Slip Surfaces',
    sub: 'Intense thermal treatment creating durable, non-slip outdoor paving.',
    eyebrow: 'Exterior Paving & Decks',
  },
  {
    image: '/images/finishes/bush-hammered.webp',
    title: 'Bush Hammered & Chiseled',
    sub: 'Artisanal heritage textures for architectural facades & rustic stone walls.',
    eyebrow: 'Artisanal Masonry',
  },
];

const textureColors: Record<string, string> = {
  glossy: '#C08552',
  textured: '#6B5E4E',
  rough: '#5A3E36',
  matte: '#8B7355',
  smooth: '#A0917F',
};

export default function FinishesPage() {
  const finishes = finishesData.length > 0 ? finishesData : [mockFinishFallback];

  return (
    <>
      <HeroSlider slides={finishSlides} />

      <section className={styles.section} id="collections">
        <div className={styles.container}>
          <div className={styles.header}>
            <span className="section-eyebrow">All Finishes</span>
            <h2 className="section-title">How We <em>Finish</em> Stone</h2>
            <p className="section-desc centered">
              The finish you choose changes everything — from the stone's visual depth to its grip and maintenance requirements.
            </p>
          </div>

          <div className={styles.grid}>
            {finishes.map((finish) => (
              <Link
                key={finish.slug}
                href={`/finishes/${finish.slug}`}
                className={styles.card}
              >
                <div className={styles.imgWrap}>
                  <Image
                    src={finish.image}
                    alt={finish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.img}
                  />
                </div>
                <div className={styles.overlay} />

                {/* Texture badge */}
                <span
                  className={styles.textureBadge}
                  style={{ background: `${textureColors[finish.texture] ?? '#C08552'}22`, borderColor: `${textureColors[finish.texture] ?? '#C08552'}44`, color: textureColors[finish.texture] ?? '#C08552' }}
                >
                  {finish.texture}
                </span>

                <div className={styles.cardContent}>
                  <div className={styles.accentLine} />
                  <h3 className={styles.finishName}>{finish.name}</h3>
                  <p className={styles.finishSubtitle}>{finish.subtitle}</p>
                  <div className={styles.bestForRow}>
                    {finish.bestFor.slice(0, 3).map((b) => (
                      <span key={b} className={styles.bestForPill}>{b}</span>
                    ))}
                  </div>
                  <span className={styles.cta}>Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ScrollingTagline items={marqueeItems} />

      {/* Why Choose Our Finishes — 6 points with same design */}
      <NumberedCardGrid
        reasons={finishesReasons}
        marqueeItems={finishesMarquee}
        title="Why Architects & Builders Choose Our Finishes"
        bg="#C8B89A"
        cardBg="var(--stone-100, #F2EBE0)"
      />

      {/* Client Voices, Google Reviews & Process Journey */}
      <MarqueeTestimonials testimonials={testimonials} />
      <GoogleReviews />
      <ProcessSteps />

      <BannerContactForm />
    </>
  );
}
