import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { processSteps } from '@/data/process';
import { siteConfig } from '@/config/site';
import type { ProcessStep } from '@/types';
import ProcessIcon from './ProcessIcon';
import styles from './ProcessSteps.module.css';

interface CtaLink {
  label: string;
  href: string;
}

export interface ProcessStepsProps {
  steps?: ProcessStep[];
  eyebrow?: string;
  title?: string;
  /** Italic copper word(s) at the end of the title. */
  titleAccent?: string;
  description?: string;
  /** Bottom call-to-action card. Pass null to hide it. */
  cta?: {
    title: string;
    description: string;
    primary: CtaLink;
    secondary?: CtaLink;
  } | null;
  tone?: 'ivory' | 'stone';
  id?: string;
}

/**
 * <ProcessSteps /> — numbered journey list with a photo per step.
 * Presentational and data-driven: reuse it for any sequence (marble process,
 * export process, installation guide) by passing `steps` + copy props.
 */
export default function ProcessSteps({
  steps = processSteps,
  eyebrow = 'Our Selection & Project Process',
  title = 'How We Bring Your',
  titleAccent = 'Vision to Life',
  description = 'Every stone project is different. From slab selection to final application, our team helps homeowners, architects and designers choose the right natural stone with clarity and confidence.',
  cta = {
    title: 'Planning a Stone Project?',
    description:
      'Visit our Kishangarh facility to compare full slabs and select your stone with confidence.',
    primary: { label: 'Plan Showroom Visit', href: '/contact' },
    secondary: { label: 'Enquire on WhatsApp', href: siteConfig.links.whatsapp },
  },
  tone = 'stone',
  id = 'process',
}: ProcessStepsProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${tone === 'ivory' ? styles.toneIvory : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.inner}>
        <Reveal animation="fade-up">
          <header className={styles.header}>
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 id={`${id}-title`} className="section-title">
              {title} <em>{titleAccent}</em>
            </h2>
            <p className="section-desc centered">{description}</p>
          </header>
        </Reveal>

        <ol className={styles.list}>
          {steps.map((step, i) => (
            <li key={step.num} className={styles.step}>
              <span className={styles.num}>{step.num}</span>
              <span className={styles.icon}>
                <ProcessIcon name={step.icon} />
              </span>
              <div className={styles.copy}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
              <div className={styles.media}>
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 280px"
                  className={styles.img}
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              </div>
            </li>
          ))}
        </ol>

        {cta && (
          <div className={styles.cta}>
            <span className={styles.ctaIcon}>
              <ProcessIcon name="build" />
            </span>
            <div className={styles.ctaCopy}>
              <h3 className={styles.ctaTitle}>{cta.title}</h3>
              <p className={styles.ctaDesc}>{cta.description}</p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href={cta.primary.href} className={styles.btnSolid}>
                {cta.primary.label}
              </Link>
              {cta.secondary && (
                <a
                  href={cta.secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-wa-source="page_cta"
                  className={styles.btnOutline}
                >
                  {cta.secondary.label}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
