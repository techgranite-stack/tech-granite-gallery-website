'use client';
import StoneBackground from '@/components/ui/StoneBackground';
import LuxuryShell from '@/components/ui/LuxuryShell';
import Reveal from '@/components/ui/Reveal';
import WordReveal from '@/components/ui/WordReveal';
import styles from './BrandShowcase.module.css';

export default function BrandShowcase() {
  return (
    <section className={styles.section}>
      {/* 1. Background Layer */}
      <StoneBackground texture="marble" opacity={0.1} enableWatermark={true} />

      <div className={styles.inner}>
        <div className={styles.content}>
          <Reveal animation="fade-up">
            <span className={styles.eyebrow}>The Boutique Experience</span>
            <h2 className={styles.title}>
              <WordReveal text="Architectural Excellence in Every Slab" />
            </h2>
          </Reveal>

          {/* 2. Content Layer using Glossy Shells */}
          <div className={styles.grid}>
            <LuxuryShell variant="glass" className={styles.featureCard}>
              <div className={styles.cardContent}>
                <span className={styles.cardIcon}>01</span>
                <h3>Sourcing Philosophy</h3>
                <p>We don&apos;t just import stone; we curate natural art from the world&apos;s most remote and prestigious quarries.</p>
              </div>
            </LuxuryShell>

            <LuxuryShell variant="glass" className={styles.featureCard}>
              <div className={styles.cardContent}>
                <span className={styles.cardIcon}>02</span>
                <h3>Artisanal Processing</h3>
                <p>Every block is processed with Italian precision and hand-finished by masters of the craft.</p>
              </div>
            </LuxuryShell>
            
            <LuxuryShell variant="glass" className={styles.featureCard}>
              <div className={styles.cardContent}>
                <span className={styles.cardIcon}>03</span>
                <h3>Global Vision</h3>
                <p>From Kishangarh to New York, our stones grace the interiors of the most iconic luxury landmarks.</p>
              </div>
            </LuxuryShell>
          </div>
        </div>
      </div>
    </section>
  );
}
