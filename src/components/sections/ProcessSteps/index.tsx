'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from '@/components/ui/Reveal';
import { processSteps } from '@/data/process';
import { siteConfig } from '@/config/site';
import type { ProcessStep } from '@/types';
import ProcessIcon from './ProcessIcon';
import styles from './ProcessSteps.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
 * <ProcessSteps /> — Vertical journey timeline.
 * A copper spine down the middle with numbered nodes. Cards alternate left & right
 * and slide into place as you scroll, while the vertical line fills with copper
 * and connects seamlessly into the final project inquiry card.
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
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const fillLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!timelineRef.current || !fillLineRef.current) return;

      // 1. Vertical Copper Line Fill Progress (smooth scrub into terminal node)
      gsap.fromTo(
        fillLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        }
      );

      // 2. Slide-in animations for each row (cards & nodes)
      const rows = timelineRef.current.querySelectorAll<HTMLElement>(`.${styles.timelineRow}`);
      rows.forEach((row, idx) => {
        const isLeft = idx % 2 === 0;
        const card = row.querySelector<HTMLElement>(`.${styles.stepCard}`);
        const node = row.querySelector<HTMLElement>(`.${styles.nodeBadge}`);

        if (card) {
          const xOffset = isLeft ? -45 : 45;
          gsap.fromTo(
            card,
            { opacity: 0, x: xOffset },
            {
              opacity: 1,
              x: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (node) {
          gsap.fromTo(
            node,
            { scale: 0.6, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: row,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section id={id} ref={containerRef} className={styles.section} aria-labelledby={`${id}-title`}>
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
          opacity="0.32"
        />
        <path
          d="M-20 450 C 280 380, 520 540, 800 460 C 1080 380, 1340 520, 1520 480"
          stroke="url(#copperVeinGrad2)"
          strokeWidth="1.2"
          opacity="0.22"
        />
        <path
          d="M80 820 C 340 760, 640 860, 920 780 C 1200 700, 1380 820, 1550 790"
          stroke="url(#copperVeinGrad1)"
          strokeWidth="1.5"
          strokeDasharray="6 12"
          opacity="0.28"
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

        {/* ── Vertical Timeline Spine ── */}
        <div ref={timelineRef} className={styles.timeline}>
          {/* Base Track Line */}
          <div className={styles.timelineSpineBase} aria-hidden="true" />
          {/* Active Copper Fill Line (Scroll Driven) */}
          <div ref={fillLineRef} className={styles.timelineSpineFill} aria-hidden="true">
            <span className={styles.leadSpark} />
          </div>

          <ol className={styles.timelineList}>
            {steps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              const isVisualization = step.num === '03' || step.title.toLowerCase().includes('visualization');

              const cardContent = (
                <article
                  className={`${styles.stepCard} ${isVisualization ? styles.stepCardFeatured : ''} ${
                    isLeft ? styles.cardLeft : styles.cardRight
                  }`}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.titleWrap}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      {isVisualization && (
                        <span className={styles.highlightPill}>Interactive 3D / Bookmatch</span>
                      )}
                    </div>
                  </div>

                  <p className={styles.stepDesc}>{step.desc}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.iconMedallion}>
                      <ProcessIcon name={step.icon} />
                    </span>
                  </div>
                </article>
              );

              return (
                <li
                  key={step.num}
                  className={`${styles.timelineRow} ${isLeft ? styles.rowLeft : styles.rowRight}`}
                >
                  {/* Left Column (Desktop) */}
                  <div className={styles.colLeft}>
                    {isLeft ? cardContent : null}
                  </div>

                  {/* Center Node (Always on the timeline spine) */}
                  <div className={styles.colCenter}>
                    <div className={styles.nodeBadge}>
                      <span className={styles.nodeNumber}>{step.num}</span>
                    </div>
                    {/* Horizontal connector arm linking node to the card */}
                    <div
                      className={`${styles.connectorArm} ${
                        isLeft ? styles.connectorArmLeft : styles.connectorArmRight
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Right Column (Desktop) */}
                  <div className={styles.colRight}>
                    {!isLeft ? cardContent : null}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* ── Bottom Terminal CTA (Directly connected to the spine) ── */}
          {cta && (
            <div className={styles.terminalSection}>
              {/* Terminal Connection Node */}
              <div className={styles.terminalNode} aria-hidden="true">
                <span className={styles.terminalIcon}>✦</span>
                <span className={styles.terminalLabel}>START YOUR PROJECT</span>
              </div>

              <div className={styles.cta}>
                <div className={styles.ctaGlow} aria-hidden="true" />
                
                {/* Architectural Gemstone Facet Icon */}
                <span className={styles.ctaIcon} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
                    <path d="M2 9h20" />
                    <path d="M10 3l-2 6 4 12 4-12-2-6" />
                  </svg>
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
                      data-wa-source="process_timeline_cta"
                      className={styles.btnOutline}
                    >
                      {cta.secondary.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
