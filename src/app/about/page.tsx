'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import StatsBand from '@/components/sections/StatsBand';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import PortraitTeamGrid from '@/components/sections/PortraitTeamGrid';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import BannerContactForm from '@/components/sections/BannerContactForm';
import Reveal from '@/components/ui/Reveal';
import { testimonials } from '@/data/testimonials';
import type { StatItem } from '@/types';
import styles from './about.module.css';

// ── About Page Trust Numbers ──
const aboutStats: StatItem[] = [
  { number: '30+ Years', label: 'Family Heritage' },
  { number: '2022', label: 'Granite Gallery Est.' },
  { number: '10+', label: 'Countries Exported' },
  { number: '100+', label: 'Delivered Projects' },
  { number: '15+', label: 'Exotic Stones' },
  { number: '100%', label: 'Quality Assured' },
];

// ── About Page Hero Images ──
const aboutHeroImages = [
  '/images/about/Marble_sculpture_in_marble_quarry.webp',
  '/images/about/White_marble_sculpture_overlooki.webp',
  '/images/about/Infinity_symbol_sculpture_showroom_K.webp',
  '/images/about/Infinity_sculpture_in_zen_garden.webp',
];

// ── Scrolling Brand Strips ──
const marqueeItems = [
  'Infinite Possibilities',
  'Four Decades of Heritage',
  'Heart of Kishangarh',
  'Own Mines & Godowns',
  'State-of-the-Art Manufacturing',
  'Granite, Quartz & Marble',
  'From Selection to Installation',
];

// ── Matrix Data & Links ──
const STONE_ITEMS = [
  { label: 'Granite', href: '/granite' },
  { label: 'Quartz', href: '/collections/quartz' },
  { label: 'Indian Marble', href: '/marble' },
  { label: 'Imported Marble', href: '/marble' },
  { label: 'Sandstone', href: '/collections/sandstone' },
  { label: 'Exotic Quartzite', href: '/collections/quartzite' },
  { label: 'Onyx', href: '/collections/onyx' },
  { label: 'Limestone', href: '/collections/limestone' },
  { label: 'Slate', href: '/collections/slate' },
];

const APPLICATION_ITEMS = [
  { label: 'Living Room Flooring', href: '/applications/flooring' },
  { label: 'Kitchen Countertops', href: '/applications/kitchen-countertops' },
  { label: 'Wall Cladding', href: '/applications/wall-cladding' },
  { label: 'Bathroom Vanities', href: '/applications/bathroom' },
  { label: 'Staircases', href: '/applications/staircase' },
  { label: 'Outdoor Paving', href: '/applications/exterior-cladding' },
  { label: 'Feature Walls', href: '/applications/wall-cladding' },
  { label: 'Commercial Lobbies', href: '/applications/flooring' },
];

const FINISH_ITEMS = [
  { label: 'Mirror Polished', href: '/finishes/polished' },
  { label: 'Honed / Satin', href: '/finishes/honed' },
  { label: 'Leathered', href: '/finishes/leathered' },
  { label: 'Flamed', href: '/finishes/flamed' },
  { label: 'Bush Hammered', href: '/finishes/bush-hammered' },
  { label: 'Shot Blast', href: '/finishes/shot-blast' },
  { label: 'Hydro Blast', href: '/finishes/hydro-blast' },
  { label: 'Chiseled', href: '/finishes/chiseled' },
];

interface CustomSelectProps {
  label: string;
  options: { label: string; href?: string }[];
  value: string;
  onChange: (val: string) => void;
}

function CustomSelect({ label, options, value, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.label === value) || options[0];

  return (
    <div className={styles.comboGroup} ref={dropdownRef}>
      <label className={styles.comboLabel}>{label}</label>
      <div className={styles.customSelectWrap}>
        <button
          type="button"
          className={`${styles.customSelectTrigger} ${isOpen ? styles.open : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption?.label}</span>
          <span className={styles.customSelectChevron}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className={styles.customDropdownMenu} onWheel={(e) => e.stopPropagation()}>
            {options.map((opt) => {
              const isSelected = opt.label === value;
              return (
                <button
                  key={opt.label}
                  type="button"
                  className={`${styles.customOption} ${isSelected ? styles.selectedOption : ''}`}
                  onClick={() => {
                    onChange(opt.label);
                    setIsOpen(false);
                  }}
                >
                  <span>{opt.label}</span>
                  {isSelected && <span className={styles.optionCheck}>✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  // Interactive Combination Engine State
  const [selectedStone, setSelectedStone] = useState('Imported Marble');
  const [selectedApp, setSelectedApp] = useState('Kitchen Countertops');
  const [selectedFinish, setSelectedFinish] = useState('Mirror Polished');

  const waMessage = encodeURIComponent(
    `Hello Granite Gallery team, I am interested in exploring: ${selectedStone} for ${selectedApp} with a ${selectedFinish} finish. Please provide samples and factory pricing.`
  );
  const waUrl = `https://wa.me/919116622422?text=${waMessage}`;

  return (
    <div className={styles.main}>

      {/* Hero Banner */}
      <PageHero
        eyebrow="About Granite Gallery"
        title="Infinite Possibilities in Natural Stone"
        subtitle="Established in 2020 with family roots spanning four decades. From our own mines and state-of-the-art manufacturing in Kishangarh to landmark projects across 30+ countries."
        heroImages={aboutHeroImages}
        fullHeight={true}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
        badges={[
          { value: '40+ Years', label: 'Family Experience' },
          { value: 'Kishangarh', label: 'Global Hub' },
          { value: '30+ Countries', label: 'Worldwide Delivery' },
        ]}
      />

      {/* Stats Band */}
      <StatsBand stats={aboutStats} />

      {/* Marquee Strip */}
      <ScrollingTagline items={marqueeItems} />

      {/* ── 1. Infinite Possibilities Matrix (Light Luxury Theme) ── */}
      <section className={styles.matrixSection}>
        <div className={styles.container}>

          <Reveal animation="fade-up">
            <div className={styles.textCenter}>
              <span className="section-eyebrow">Our Brand Philosophy</span>
              <h2 className="section-title">Enabling <em>Infinite Possibilities</em></h2>
              <p className="section-desc centered">
                Every space demands a unique architectural voice. Select any combination of stone, application, and custom surface finish to experience endless design versatility.
              </p>
            </div>
          </Reveal>

          <Reveal animation="fade-up" delay={0.2} stagger={0.15}>
            <div className={styles.matrixGrid}>

              {/* Pillar 1: Stones */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarImgWrap}>
                  <Image
                    src="/images/hero/granite-gallery-marble-granite-sandstone.webp"
                    alt="Natural Stone Spectrum"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className={styles.pillarImg}
                  />
                </div>

                <div className={styles.pillarBody}>
                  <div className={styles.pillarCategory}>01 / CURATED COLLECTIONS</div>
                  <h3 className={styles.pillarTitle}>Stones &amp; Materials</h3>
                  <p className={styles.pillarDesc}>
                    Hand-picked granite, quartz, sandstone, and imported Italian marble curated for every architectural requirement.
                  </p>

                  <Link href="/collections" className={styles.pillarBtn}>
                    <span>Explore All Collections</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Pillar 2: Applications */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarImgWrap}>
                  <Image
                    src="/images/applications/kitchen-countertops/kitchen-hero.webp"
                    alt="Architectural Applications"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className={styles.pillarImg}
                  />
                </div>

                <div className={styles.pillarBody}>
                  <div className={styles.pillarCategory}>02 / ARCHITECTURAL SPACES</div>
                  <h3 className={styles.pillarTitle}>Versatile Applications</h3>
                  <p className={styles.pillarDesc}>
                    Whether crafting a classic sanctuary or a bold contemporary statement, we provide custom cut-to-size blocks, slabs, and tiles.
                  </p>

                  <Link href="/applications" className={styles.pillarBtn}>
                    <span>Explore Applications</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Pillar 3: Finishes */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarImgWrap}>
                  <Image
                    src="/images/finishes/finishes-showroom-display-wall-kishangarh.webp"
                    alt="Custom Surface Finishes"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className={styles.pillarImg}
                  />
                </div>

                <div className={styles.pillarBody}>
                  <div className={styles.pillarCategory}>03 / BESPOKE CRAFTSMANSHIP</div>
                  <h3 className={styles.pillarTitle}>Surface Finishes</h3>
                  <p className={styles.pillarDesc}>
                    From high-gloss mirror polish to rustic tactile leather and flamed textures, our skilled craftsmen tailor every surface.
                  </p>

                  <Link href="/finishes" className={styles.pillarBtn}>
                    <span>Explore Surface Finishes</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

            </div>
          </Reveal>

          {/* ── Dynamic Combination Engine ── */}
          <Reveal animation="fade-up" delay={0.3}>
            <div className={styles.comboEngine}>
              <div className={styles.comboEngineBg} />
              <div className={styles.comboHeader}>
                <span className={styles.comboTag}>Interactive Combination Engine</span>
                <h3 className={styles.comboTitle}>Create Your Custom Stone Combination</h3>
              </div>

              <div className={styles.comboControls}>
                <CustomSelect
                  label="Select Natural Stone"
                  options={STONE_ITEMS}
                  value={selectedStone}
                  onChange={setSelectedStone}
                />
                <CustomSelect
                  label="Select Application"
                  options={APPLICATION_ITEMS}
                  value={selectedApp}
                  onChange={setSelectedApp}
                />
                <CustomSelect
                  label="Select Surface Finish"
                  options={FINISH_ITEMS}
                  value={selectedFinish}
                  onChange={setSelectedFinish}
                />
              </div>

              {/* Combination Result Card */}
              <div className={styles.comboResultCard}>
                <div className={styles.comboResultText}>
                  <div className={styles.comboResultFormula}>
                    {selectedStone} + {selectedApp} + {selectedFinish} Finish
                  </div>
                  <div className={styles.comboResultDesc}>
                    Custom processed at our Kishangarh factory with sequential book-matching &amp; international export packing.
                  </div>
                </div>

                <a
                  data-wa-source="about_page"
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.comboBtn}
                >
                  <span>Request Custom Quote</span>
                  <span>→</span>
                </a>
              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* ── 2. Heritage & Infrastructure Split ── */}
      <section className={styles.heritageSection}>
        <div className={styles.container}>

          {/* Top Centered Section Header */}
          <Reveal animation="fade-up">
            <div className={styles.heritageHeader}>
              <span className="section-eyebrow">Our Roots &amp; Capabilities</span>
              <h2 className="section-title">
                Four Decades of <em>Family Heritage &amp; Innovation</em>
              </h2>
            </div>
          </Reveal>

          {/* 2-Column Split: Image on Left, Editorial Story on Right */}
          <div className={styles.heritageGrid}>

            {/* Left Column: Clean Pristine Facility Photo */}
            <Reveal animation="fade-right">
              <div className={styles.heritageImageWrap}>
                <Image
                  src="/images/hero/granite-gallery-kishangarh-stone-facility.webp"
                  alt="Granite Gallery Kishangarh Factory and Stone Processing Facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className={styles.heritageImg}
                  priority
                />
                <div className={styles.heritageImgScrim} />

                {/* Bottom Main Heritage Badge */}
                <div className={styles.heritageBadge}>
                  <div className={styles.heritageBadgeNum}>40+ Years</div>
                  <div className={styles.heritageBadgeLabel}>Family Heritage &amp; Innovation in Kishangarh</div>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Light Editorial Story + Dark Mahogany Pull-Quote */}
            <Reveal animation="fade-left">
              <div className={styles.heritageContent}>

                <span className={styles.storyRule} aria-hidden="true" />

                <h3 className={styles.storyTitle}>
                  Connecting India&apos;s Stone Heritage with Global Architecture
                </h3>

                <p className={styles.storyLede}>
                  Operating with four decades of deep-rooted industry experience, Granite Gallery connects India&apos;s richest marble and granite belts with modern, international project delivery.
                </p>

                <p className={styles.storyBody}>
                  Based in Kishangarh, Rajasthan, we manage owned quarries, expansive godowns, and state-of-the-art Italian processing facilities.
                </p>

                {/* Dark Mahogany Pull-Quote — short copy, high contrast */}
                <figure className={styles.quoteCard}>
                  <div className={styles.quoteCardBg} />
                  <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
                  <blockquote className={styles.quoteText}>
                    Equipped with multi-blade Italian gang saws and epoxy resin lines, our craftsmen ensure every block and slab reflects world-class precision.
                  </blockquote>
                  <figcaption className={styles.quoteAuthor}>Founders &amp; Leadership Team</figcaption>
                </figure>

              </div>
            </Reveal>

          </div>

          {/* 4-Column Full Width Capability Cards Bar (Bottom Row) */}
          <Reveal animation="fade-up" delay={0.2}>
            <div className={styles.capabilityGrid}>
              <div className={styles.capCard}>
                <div className={styles.capIconWrap}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="21" x2="21" y2="21" />
                    <line x1="6" y1="21" x2="6" y2="10" />
                    <line x1="10" y1="21" x2="10" y2="10" />
                    <line x1="14" y1="21" x2="14" y2="10" />
                    <line x1="18" y1="21" x2="18" y2="10" />
                    <polygon points="12 3 2 10 22 10 12 3" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.capTitle}>40+ Years Legacy</h4>
                  <p className={styles.capDesc}>Deep family roots spanning 4 decades.</p>
                </div>
              </div>

              <div className={styles.capCard}>
                <div className={styles.capIconWrap}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.capTitle}>Kishangarh Hub</h4>
                  <p className={styles.capDesc}>Asia&apos;s premier stone trade center.</p>
                </div>
              </div>

              <div className={styles.capCard}>
                <div className={styles.capIconWrap}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.capTitle}>Own Mines &amp; Sourcing</h4>
                  <p className={styles.capDesc}>Direct quarry control &amp; godowns.</p>
                </div>
              </div>

              <div className={styles.capCard}>
                <div className={styles.capIconWrap}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.capTitle}>Italian Technology</h4>
                  <p className={styles.capDesc}>Multi-blade gang saws &amp; epoxy lines.</p>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── 3. Group Ecosystem & Sister Ventures (Light Theme) ── */}
      <section className={styles.groupSection}>
        <div className={styles.container}>

          <Reveal animation="fade-up">
            <div className={styles.textCenter}>
              <span className="section-eyebrow">Group Ecosystem</span>
              <h2 className="section-title">Our Specialized <em>Sister Ventures &amp; Divisions</em></h2>
              <p className="section-desc centered">
                Granite Gallery operates alongside a powerhouse ecosystem of specialized sister divisions across India — unifying quarrying, gang-saw processing, luxury distribution, and artisanal stone craftsmanship.
              </p>
            </div>
          </Reveal>

          <Reveal animation="fade-up" delay={0.2} stagger={0.12}>
            <div className={styles.groupGrid}>

              {/* Flagship: Granite Gallery — the parent house, spans two columns */}
              <div className={`${styles.groupCard} ${styles.groupFlagship}`}>
                <div className={styles.groupFlagshipBg} />
                <div className={styles.groupFlagshipLead}>
                  <span className={styles.groupTag}>
                    <span className={styles.groupTagRule} aria-hidden="true" />
                    Flagship &middot; Parent House
                  </span>
                  <h3 className={styles.groupTitle}>Granite Gallery</h3>
                  <div className={styles.groupLocation}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Kishangarh, Rajasthan</span>
                  </div>
                </div>
                <p className={styles.groupDesc}>
                  The parent house of the group — four decades of owned quarries, Italian gang-saw processing and direct export, supplying marble, granite, sandstone and quartzite to projects across 30+ countries.
                </p>
              </div>

              {/* Division 1: Sunshine Marble */}
              <div className={styles.groupCard}>
                <span className={styles.groupIndex} aria-hidden="true">01</span>
                <span className={styles.groupTag}>
                  <span className={styles.groupTagRule} aria-hidden="true" />
                  Distribution Hub
                </span>
                <h3 className={styles.groupTitle}>Sunshine Marble</h3>
                <div className={styles.groupLocation}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Delhi (NCR)</span>
                </div>
                <p className={styles.groupDesc}>
                  Northern India&apos;s premier distribution center specializing in high-end imported &amp; Indian marble for luxury residential villas, embassies, and commercial projects across Delhi NCR.
                </p>
              </div>

              {/* Division 2: Century Stone */}
              <div className={styles.groupCard}>
                <span className={styles.groupIndex} aria-hidden="true">02</span>
                <span className={styles.groupTag}>
                  <span className={styles.groupTagRule} aria-hidden="true" />
                  Marble Division
                </span>
                <h3 className={styles.groupTitle}>Century Stone</h3>
                <div className={styles.groupLocation}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Kishangarh, Rajasthan</span>
                </div>
                <p className={styles.groupDesc}>
                  Dedicated marble processing facility specializing in raw block selection, Italian gang-saw slabbing, resin line curing, and large-format mirror-polish finishing.
                </p>
              </div>

              {/* Division 3: Stone Sagaa */}
              <div className={styles.groupCard}>
                <span className={styles.groupIndex} aria-hidden="true">03</span>
                <span className={styles.groupTag}>
                  <span className={styles.groupTagRule} aria-hidden="true" />
                  Artifacts &amp; Handicrafts
                </span>
                <h3 className={styles.groupTitle}>Stone Sagaa</h3>
                <div className={styles.groupLocation}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Kishangarh, Rajasthan</span>
                </div>
                <p className={styles.groupDesc}>
                  Artisanal stone craftsmanship division delivering hand-carved stone artifacts, pietra dura marble inlays, water features, CNC 3D wall panels, and bespoke decor.
                </p>
              </div>

              {/* Division 4: Kamdhenu Granite */}
              <div className={styles.groupCard}>
                <span className={styles.groupIndex} aria-hidden="true">04</span>
                <span className={styles.groupTag}>
                  <span className={styles.groupTagRule} aria-hidden="true" />
                  Granite Division
                </span>
                <h3 className={styles.groupTitle}>Kamdhenu Granite</h3>
                <div className={styles.groupLocation}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Shoolgiri, Bangalore Region</span>
                </div>
                <p className={styles.groupDesc}>
                  Southern India hub managing granite quarrying, heavy slab processing, cut-to-size commercial flooring, and export container packing for global delivery.
                </p>
              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* ── 4. End-to-End Client Guidance Process ── */}
      <section className={styles.processSection}>
        <div className={styles.container}>

          <Reveal animation="fade-up">
            <div className={styles.textCenter}>
              <span className="section-eyebrow" style={{ color: 'var(--copper-light)' }}>Client-Centric Philosophy</span>
              <h2 className="section-title light">Guided Excellence from <em>Selection to Installation</em></h2>
              <p className="section-desc centered" style={{ color: 'rgba(255, 248, 240, 0.75)' }}>
                At Granite Gallery, customer satisfaction is paramount. Our team of experts guides architects, interior designers, builders, and homeowners seamlessly through every phase.
              </p>
            </div>
          </Reveal>

          <Reveal animation="fade-up" delay={0.2} stagger={0.12}>
            <div className={styles.processGrid}>

              {/* Step 1 */}
              <div className={styles.processCard}>
                <div className={styles.processStepNum}>01</div>
                <h3 className={styles.processTitle}>Personalized Selection</h3>
                <p className={styles.processDesc}>
                  Consultation with resident stone experts to choose the exact vein, tone, and mineral hardness ideal for your residential or commercial project.
                </p>
              </div>

              {/* Step 2 */}
              <div className={styles.processCard}>
                <div className={styles.processStepNum}>02</div>
                <h3 className={styles.processTitle}>Precision Processing</h3>
                <p className={styles.processDesc}>
                  Calibrated cutting, gang-saw slab processing, and automated resin line treatment using state-of-the-art Italian machinery.
                </p>
              </div>

              {/* Step 3 */}
              <div className={styles.processCard}>
                <div className={styles.processStepNum}>03</div>
                <h3 className={styles.processTitle}>Rigorous Inspection</h3>
                <p className={styles.processDesc}>
                  Every piece undergoes strict quality checks for structural soundness, sequential book-matching, and surface perfection.
                </p>
              </div>

              {/* Step 4 */}
              <div className={styles.processCard}>
                <div className={styles.processStepNum}>04</div>
                <h3 className={styles.processTitle}>Global Delivery &amp; Care</h3>
                <p className={styles.processDesc}>
                  Secure wooden crate container packaging, full export documentation, and guidance for seamless installation at your site.
                </p>
              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* Leadership Team Grid */}
      <PortraitTeamGrid />

      {/* Testimonials */}
      <MarqueeTestimonials testimonials={testimonials} />

      {/* CTA Contact Banner */}
      <BannerContactForm />

    </div>
  );
}
