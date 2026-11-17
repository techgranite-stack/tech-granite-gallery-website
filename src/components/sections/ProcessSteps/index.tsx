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
  id?: string;
}

/**
 * <ProcessSteps /> — Dark mahogany stone band with vein texture, copper glow,
 * and horizontal stepper with a dotted copper path.
 */
export default function ProcessSteps({
  steps = processSteps,
  eyebrow = 'From Brief to Installation',
  title = 'Your Stone, Handled',
  titleAccent = 'End to End',
  description = 'A clear, accountable path for architects, builders and homeowners: from the first conversation at our Kishangarh facility to stone arriving ready for your site.',
  cta = {
    title: 'Have a Project in Mind?',
    description:
      'Tell us the space and the stone you are considering. We will reply with options, availability and a quote.',
    primary: { label: 'Request a Quote', href: '/contact' },
    secondary: { label: 'Chat on WhatsApp', href: siteConfig.links.whatsapp },
  },
  id = 'process',
}: ProcessStepsProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      {/* Background marble vein texture & copper glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <svg
        className={styles.veinTexture}
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-50 120 C 220 180, 480 80, 720 220 C 960 360, 1220 280, 1500 380"
          stroke="url(#copperVeinGrad1)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.35"
        />
        <path
          d="M-20 450 C 280 380, 520 540, 800 460 C 1080 380, 1340 520, 1520 480"
          stroke="url(#copperVeinGrad2)"
          strokeWidth="1.2"
          opacity="0.25"
        />
        <path
          d="M80 820 C 340 760, 640 860, 920 780 C 1200 700, 1380 820, 1550 790"
          stroke="url(#copperVeinGrad1)"
          strokeWidth="1.5"
          strokeDasharray="6 12"
          opacity="0.3"
        />
        <defs>
          <linearGradient id="copperVeinGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C08552" stopOpacity="0" />
            <stop offset="50%" stopColor="#D9A87A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C08552" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="copperVeinGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C08552" stopOpacity="0" />
            <stop offset="40%" stopColor="#C08552" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8C5A3C" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.inner}>
        <Reveal animation="fade-up">
          <header className={styles.header}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot}>✦</span>
              {eyebrow}
              <span className={styles.eyebrowDot}>✦</span>
            </span>
            <h2 id={`${id}-title`} className={styles.title}>
              {title} <em>{titleAccent}</em>
            </h2>
            <p className={styles.description}>{description}</p>
          </header>
        </Reveal>

        {/* Horizontal Stepper Grid with Dotted Copper Track */}
        <div className={styles.stepperContainer}>
          <ol className={styles.grid}>
            {steps.map((step, idx) => {
              const isVisualization = step.num === '03' || step.title.toLowerCase().includes('visualization');
              return (
                <li
                  key={step.num}
                  className={`${styles.stepCard} ${isVisualization ? styles.stepCardFeatured : ''}`}
                >
                  {/* Step Stepper Header: Number node & dotted path */}
                  <div className={styles.nodeHeader}>
                    <div className={styles.numBadge}>
                      <span className={styles.numText}>{step.num}</span>
                    </div>
                    <div className={styles.dottedConnector} aria-hidden="true" />
                    {idx < steps.length - 1 && (
                      <span className={styles.stepArrow} aria-hidden="true">→</span>
                    )}
                  </div>

                  {/* Step Body: Title and Description */}
                  <div className={styles.stepBody}>
                    <div className={styles.titleRow}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      {isVisualization && (
                        <span className={styles.highlightPill}>Interactive 3D / Bookmatch</span>
                      )}
                    </div>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>

                  {/* Step Footer: Icon in frosted copper medallion */}
                  <div className={styles.stepFooter}>
                    <span className={styles.iconMedallion}>
                      <ProcessIcon name={step.icon} />
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Bottom CTA Card */}
        {cta && (
          <Reveal animation="fade-up">
            <div className={styles.cta}>
              <div className={styles.ctaGlow} aria-hidden="true" />
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
                    data-wa-source="process_cta"
                    className={styles.btnOutline}
                  >
                    {cta.secondary.label}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
