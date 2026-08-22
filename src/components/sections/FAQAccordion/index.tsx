'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FAQItem } from '@/types';
import styles from './FAQAccordion.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin();
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  titleEm?: string;
  eyebrow?: string;
  description?: string;
  /** Override the section background. Defaults to var(--ivory) from CSS. */
  bg?: string;
}

export default function FAQAccordion({
  items,
  title = "Frequently Asked",
  titleEm = "Questions",
  eyebrow = "Got Questions?",
  description = "Find clear, expert answers to common queries regarding stone selection, processing, dimensions, and maintenance details.",
  bg,
}: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate Google FAQPage structured metadata
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    items.forEach((_, index) => {
      const panel = containerRef.current?.querySelector(`#faq-panel-${index}`) as HTMLElement;
      const inner = containerRef.current?.querySelector(`#faq-inner-${index}`) as HTMLElement;
      const plusSign = containerRef.current?.querySelector(`#faq-icon-${index}`) as HTMLElement;

      if (!panel || !inner || !plusSign) return;

      const isCurrentActive = activeIndex === index;

      // Animate height smoothly
      gsap.to(panel, {
        height: isCurrentActive ? inner.offsetHeight : 0,
        duration: 0.35,
        ease: 'power2.out',
      });

      // Animate the plus icon to a close sign (rotate by 45 degrees)
      gsap.to(plusSign, {
        rotate: isCurrentActive ? 45 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, { scope: containerRef, dependencies: [activeIndex, items] });

  if (!items || items.length === 0) return null;

  return (
    <section className={styles.section} ref={containerRef} style={bg ? { background: bg } : undefined}>
      {/* Dynamic SEO JSON-LD FAQ Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Left Column: Sticky Editorial */}
          <div className={styles.left}>
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 className={styles.sectionTitle}>
              {title} <em>{titleEm}</em>
            </h2>
            <p className={styles.description}>{description}</p>

            <a
              data-wa-source="faq"
              href={`https://wa.me/919116622422?text=${encodeURIComponent(`Hello, I'd like to ask a custom question about your natural stone offerings.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.waBtn} btn btn-copper`}
            >
              <span>Have a Custom Question? Chat Us</span>
            </a>
          </div>

          {/* Right Column: Dynamic GSAP Accordion List */}
          <div className={styles.right}>
            <div className={styles.faqList}>
              {items.map((item, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div
                    key={index}
                    className={`${styles.faqItem} ${isOpen ? styles.faqItemActive : ''}`}
                  >
                    <button
                      className={styles.trigger}
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                    >
                      <span className={styles.questionText}>{item.question}</span>
                      <span className={styles.iconWrap}>
                        <svg
                          id={`faq-icon-${index}`}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className={styles.icon}
                        >
                          <path
                            d="M8 1V15M1 8H15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </button>
                    
                    <div
                      id={`faq-panel-${index}`}
                      className={styles.panel}
                      style={{ height: 0, overflow: 'hidden' }}
                    >
                      <div id={`faq-inner-${index}`} className={styles.panelInner}>
                        <p className={styles.answerText}>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
