'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { trackWhatsAppClick } from '@/lib/analytics';
import styles from './QuickDialog.module.css';
import {
  Clock,
  ShieldCheck,
  Headphones,
  Zap,
  ArrowRight,
  Award,
  Users,
  CheckCircle2,
  Factory,
  Check,
  BadgeCheck
} from 'lucide-react';


// ── Public API ────────────────────────────────────────────────────────────────
export interface QuickDialogDetail {
  stone?: string;     // e.g. "Makrana White" — pre-fills chip + WA message
  context?: 'product' | 'listing' | 'color' | 'application' | 'project' | 'general';
  applicationHint?: string; // e.g. "Kitchen Countertops"
}

export function openQuickDialog(detail: QuickDialogDetail = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('gg:open-dialog', { detail }));
}

// ── Chip icons (inline SVG, copper/mahogany themed) ───────────────────────────

const IconFloor = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IconKitchen = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="14" width="20" height="6" rx="1" />
    <line x1="6" y1="14" x2="6" y2="20" /><line x1="12" y1="14" x2="12" y2="20" /><line x1="18" y1="14" x2="18" y2="20" />
    <path d="M7 14V8a5 5 0 0110 0v6" />
  </svg>
);
const IconBathroom = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z" />
    <path d="M4 12V6a2 2 0 012-2h1a2 2 0 012 2v1" />
    <line x1="8" y1="20" x2="8" y2="22" /><line x1="16" y1="20" x2="16" y2="22" />
  </svg>
);
const IconWall = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="9" />
    <line x1="15" y1="9" x2="15" y2="15" />
    <line x1="9" y1="15" x2="9" y2="21" />
  </svg>
);
const IconOutdoor = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17l4-8 4 5 3-3 4 6" />
    <line x1="3" y1="21" x2="21" y2="21" />
  </svg>
);
const IconCommercial = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="17" rx="1" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="9" y1="10" x2="9" y2="21" />
    <line x1="15" y1="10" x2="15" y2="21" />
    <line x1="3" y1="16" x2="9" y2="16" />
    <line x1="15" y1="16" x2="21" y2="16" />
  </svg>
);

const APPLICATION_CHIPS: { value: string; label: string; Icon: () => JSX.Element }[] = [
  { value: 'Flooring', label: 'Flooring', Icon: IconFloor },
  { value: 'Kitchen Counter', label: 'Kitchen Counter', Icon: IconKitchen },
  { value: 'Bathroom', label: 'Bathroom', Icon: IconBathroom },
  { value: 'Feature Wall', label: 'Feature Wall', Icon: IconWall },
  { value: 'Outdoor Paving', label: 'Outdoor Paving', Icon: IconOutdoor },
  { value: 'Commercial', label: 'Commercial', Icon: IconCommercial },
];

// ── Context-aware copy ────────────────────────────────────────────────────────
function getHeadline(ctx: QuickDialogDetail): { title: string; sub: string } {
  if (ctx.stone) return {
    title: `Interested in ${ctx.stone}?`,
    sub: 'Premium Stone Consultation',
  };
  return {
    title: 'Get Your Free Quote',
    sub: 'Premium Stone Consultation',
  };
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function QuickDialog() {
  const [detail, setDetail] = useState<QuickDialogDetail>({});
  const [open, setOpen] = useState(false);
  const [app, setApp] = useState('');

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);

  const PHONE = '9116622422';

  // ── Open / close ─────────────────────────────────────────────────────────────
  const openDialog = useCallback((d: QuickDialogDetail = {}) => {
    setDetail(d);
    if (d.applicationHint) setApp(d.applicationHint);
    setOpen(true);
  }, []);

  const isMobileViewport = () =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 540px)').matches;

  const closeDialog = useCallback(() => {
    if (!cardRef.current || !overlayRef.current) { setOpen(false); return; }
    const exit = isMobileViewport() ? { yPercent: 100, xPercent: 0 } : { xPercent: 100, yPercent: 0 };
    gsap.to(cardRef.current, { ...exit, duration: 0.4, ease: 'power3.in' });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.4, ease: 'power2.in',
      onComplete: () => setOpen(false)
    });
  }, []);

  // ── Entrance animation ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!open || !cardRef.current || !overlayRef.current) return;
    document.body.style.overflow = 'hidden';

    const from = isMobileViewport() ? { yPercent: 100, xPercent: 0 } : { xPercent: 100, yPercent: 0 };

    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.fromTo(cardRef.current,
      from,
      { xPercent: 0, yPercent: 0, duration: 0.55, ease: 'power3.out' }
    );
    if (fieldsRef.current) {
      gsap.fromTo(fieldsRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.45, ease: 'power2.out', delay: 0.12 }
      );
    }

    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // ── Custom event listener ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: Event) => openDialog((e as CustomEvent<QuickDialogDetail>).detail ?? {});
    window.addEventListener('gg:open-dialog', handler);
    return () => window.removeEventListener('gg:open-dialog', handler);
  }, [openDialog]);

  // ── Escape key ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDialog(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeDialog]);

  // ── WhatsApp submit ───────────────────────────────────────────────────────────
  const handleWa = () => {
    const parts: string[] = ['Hi Granite Gallery,'];
    if (detail.stone) parts.push(`I am interested in ${detail.stone}.`);
    if (app) parts.push(`I need stone for: ${app}.`);
    if (!detail.stone && !app) parts.push("I'd like help choosing natural stone for my project.");
    parts.push("Could you please assist me with options, pricing, and catalogue?");

    const msg = encodeURIComponent(parts.join(' '));
    // window.open() is invisible to both GA4 outbound-click measurement and the
    // delegated anchor listener, so this click has to be reported explicitly.
    trackWhatsAppClick('quick_dialog', { stone: detail.stone || undefined, application: app || undefined });
    window.open(`https://wa.me/91${PHONE}?text=${msg}`, '_blank', 'noopener,noreferrer');
    closeDialog();
  };

  const { title, sub } = getHeadline(detail);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={(e) => { if (e.target === overlayRef.current) closeDialog(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Quick enquiry"
    >
      <div ref={cardRef} className={styles.card}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>
              Get Your <em>Free Quote</em>
            </h2>
            <div className={styles.subPill}>
              <BadgeCheck size={14} color="#b87a4b" strokeWidth={2} />
              <span>{sub || 'Premium Stone Consultation'}</span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={closeDialog} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Header Divider */}
        <div className={styles.headerDivider} aria-hidden="true" />

        {/* Drag handle (mobile) */}
        <div className={styles.handle} aria-hidden="true" />

        <div ref={fieldsRef} className={styles.body}>

          {/* 3-Column Trust Micro-Bar */}
          <div className={styles.trustMicroBar}>
            <div className={styles.trustMicroItem}>
              <Clock size={16} color="var(--copper)" strokeWidth={1.8} />
              <div>
                <strong>Response within</strong>
                <span>15 mins</span>
              </div>
            </div>
            <div className={styles.trustMicroItem}>
              <ShieldCheck size={16} color="var(--copper)" strokeWidth={1.8} />
              <div>
                <strong>No Spam</strong>
                <span>Promise</span>
              </div>
            </div>
            <div className={styles.trustMicroItem}>
              <Headphones size={16} color="var(--copper)" strokeWidth={1.8} />
              <div>
                <strong>Free Design</strong>
                <span>Assistance</span>
              </div>
            </div>
          </div>

          {/* Application chips section */}
          <div className={styles.chipSection}>
            <h3 className={styles.chipLabel}>What are you <em>looking for?</em></h3>
            <div className={styles.chipsGrid}>
              {APPLICATION_CHIPS.map(({ value, label, Icon }) => {
                const isActive = app === value;
                return (
                  <button
                    key={value}
                    type="button"
                    className={`${styles.chipCard} ${isActive ? styles.chipCardActive : ''}`}
                    onClick={() => setApp(p => p === value ? '' : value)}
                  >
                    {isActive && (
                      <span className={styles.checkBadge}>
                        <Check size={10} strokeWidth={3} color="#ffffff" />
                      </span>
                    )}
                    <span className={styles.chipIconWrap}>
                      <Icon />
                    </span>
                    <span className={styles.chipCardText}>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary CTA: WhatsApp */}
          <button
            className={styles.waCta}
            onClick={handleWa}
          >
            <Zap size={18} strokeWidth={2.2} />
            <span>Get Instant Help</span>
            <ArrowRight size={16} style={{ marginLeft: 'auto' }} />
          </button>

          {/* Secondary link */}
          <a
            href="#contact"
            className={styles.fullFormLink}
            onClick={closeDialog}
          >
            <span>Need a detailed estimate? <strong>Fill Detailed Form ➔</strong></span>
          </a>

          {/* 4-Column Bottom Trust Footer Bar */}
          <div className={styles.trustFooterBar}>
            <div className={styles.trustFooterItem}>
              <Award size={15} color="var(--copper)" />
              <strong>20+</strong>
              <span>Years Experience</span>
            </div>
            <div className={styles.trustFooterItem}>
              <Users size={15} color="var(--copper)" />
              <strong>1000+</strong>
              <span>Happy Clients</span>
            </div>
            <div className={styles.trustFooterItem}>
              <CheckCircle2 size={15} color="var(--copper)" />
              <strong>Premium</strong>
              <span>Quality Stones</span>
            </div>
            <div className={styles.trustFooterItem}>
              <Factory size={15} color="var(--copper)" />
              <strong>Factory</strong>
              <span>Direct Pricing</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
