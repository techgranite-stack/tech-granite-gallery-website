'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { trackEvent } from '@/lib/analytics';
import {
  LayoutGrid,
  ChefHat,
  Bath,
  Layers,
  Umbrella,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  PenLine,
  Lock,
  Users,
  Clock,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import styles from './BannerContactForm.module.css';
import { COUNTRY_CODES, formatFullPhoneNumber } from '@/data/country-codes';
import { siteConfig } from '@/config/site';


if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

// ── WhatsApp icon (no Lucide equivalent) ─────────────────────────────────────

const WaIcon = ({ size = 17, color = '#25D366' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ── Chip data ─────────────────────────────────────────────────────────────────

const APPLICATION_CHIPS = [
  { value: 'Flooring', Icon: LayoutGrid },
  { value: 'Kitchen Counter', Icon: ChefHat },
  { value: 'Bathroom', Icon: Bath },
  { value: 'Wall Cladding', Icon: Layers },
  { value: 'Outdoor', Icon: Umbrella },
  { value: 'Commercial', Icon: Building2 },
];

const TRUST_STATS = [
  { Icon: Users, preLabel: '', primary: '1200+', secondary: 'Happy Clients' },
  { Icon: Clock, preLabel: 'Reply within', primary: '2 Hours', secondary: '' },
  { Icon: ShieldCheck, preLabel: '', primary: '30+ Years', secondary: 'Experience' },
];

// ── Props ─────────────────────────────────────────────────────────────────────

export interface BannerContactFormProps {
  web3FormsKey?: string;
  headOffice?: string;
  phone?: string;
  email?: string;
  bannerEyebrow?: string;
  bannerHeadline?: string;
  hideBanner?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BannerContactForm({
  web3FormsKey = '6170b2ba-9972-4bff-a0c2-b7d256aa1ce0',
  // NAP consistency: these used to be hardcoded here and disagreed with the
  // footer, the schema and each other — the "Request Catalogue" mailto pointed
  // at contact@granitegallery.com, which is not the address the business reads.
  // Local ranking depends on the name/address/phone matching everywhere Google
  // sees it, so both now come from the single source in site.ts.
  phone = siteConfig.links.phone,
  email = siteConfig.links.email,
  bannerEyebrow = 'Ready to Begin?',
  bannerHeadline = 'Transform Your Space with Premium Stone',
  hideBanner = false,
}: BannerContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [errors, setErrors] = useState<Record<string, string>>({});


  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const bannerBgRef = useRef<HTMLDivElement>(null);

  // ── Scroll-in animation ───────────────────────────────────────────────────

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 48, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 82%', once: true },
      }
    );
    // Parallax on banner background
    if (bannerBgRef.current) {
      gsap.fromTo(
        bannerBgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerBgRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }
  }, { scope: sectionRef });

  // ── Chip click with micro-bounce ──────────────────────────────────────────

  const selectChip = (e: React.MouseEvent<HTMLButtonElement>, value: string) => {
    setApplication(prev => prev === value ? '' : value);
    gsap.fromTo(e.currentTarget, { scale: 0.88 }, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.4)' });
  };

  const clearError = (field: string) =>
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });

  // ── Form submit ───────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    const fd = new FormData(e.currentTarget);
    const name = (fd.get('name') as string)?.trim();
    const emailInput = (fd.get('email') as string)?.trim();
    const phoneInput = ((fd.get('phone') || fd.get('whatsapp')) as string)?.replace(/\D/g, '');

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = 'Please enter your name';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput) {
      newErrors.email = 'Please enter your email address';
    } else if (!emailRegex.test(emailInput)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phoneInput || phoneInput.length < 7 || phoneInput.length > 12) {
      newErrors.phone = 'Please enter a valid phone number';
    }



    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    setErrors({});

    const fullPhoneNumber = formatFullPhoneNumber(countryCode, phoneInput);
    fd.set('phone', fullPhoneNumber);
    fd.set('whatsapp', fullPhoneNumber);
    fd.set('country_code', countryCode);
    fd.append('access_key', web3FormsKey);
    if (application) fd.append('application_interest', application);



    try {
      const res = await fetch('/api/enquiry', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        // Fired only after the API confirms delivery — validation failures and
        // failed sends above never reach here, so this counts real enquiries.
        trackEvent('generate_lead', {
          form: 'banner_contact',
          page_path: window.location.pathname,
          ...(application ? { application_interest: application } : {}),
        });
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setApplication('');
        gsap.fromTo(formRef.current, { scale: 0.97 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  const phoneRaw = phone.replace(/\D/g, '');

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>

      {/* ── Top CTA Banner ─────────────────────────────────────────────────── */}
      {!hideBanner && (
        <div className={styles.banner}>
          <div ref={bannerBgRef} className={styles.bannerBg} />
          <div className={styles.bannerInner}>
            <div className={styles.bannerText}>
              <span className={styles.bannerEyebrow}>{bannerEyebrow}</span>
              <h2 className={styles.bannerTitle}>{bannerHeadline}</h2>
            </div>
            <div className={styles.bannerActions}>
              <a
                data-wa-source="contact_banner"
                href={`https://wa.me/${phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.bannerBtn} ${styles.bannerBtnPrimary}`}
              >
                Schedule Consultation
              </a>
              <a
                href={`mailto:${email}`}
                className={`${styles.bannerBtn} ${styles.bannerBtnOutline}`}
              >
                Request Catalogue
              </a>
            </div>
          </div>
        </div>
      )}

      <div className={styles.container}>

        {/* ── Card ── */}
        <div ref={cardRef} className={styles.card}>

          {status === 'success' ? (

            /* ── Success state ── */
            <div className={styles.successState}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Quote Request Sent!</h3>
              <p className={styles.successText}>
                We&apos;ll get back to you within 2 hours. Or reach us directly on WhatsApp.
              </p>
              <a
                data-wa-source="contact_success"
                href={`https://wa.me/${phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.successWa}
              >
                <WaIcon size={16} color="#fff" /> Continue on WhatsApp
              </a>
              <button className={styles.successReset} onClick={() => setStatus('idle')}>
                Send another request
              </button>
            </div>

          ) : (
            <>

              {/* ── Heading ── */}
              <header className={styles.cardHeader}>
                <h2 className={styles.heading}>
                  Get Your <em>Free Quote</em>
                </h2>
                <div className={styles.subtext}>
                  <Clock size={14} color="var(--copper)" strokeWidth={2} />
                  Response within <strong>2 hours</strong>
                </div>
              </header>

              {/* ── Form ── */}
              <form ref={formRef} onSubmit={handleSubmit} noValidate>

                {/* Application chips */}
                <div className={styles.chipSection}>
                  <h3 className={styles.chipLabel}>
                    What space are you <em>designing?</em>
                  </h3>
                  <div className={styles.chips}>
                    {APPLICATION_CHIPS.map(({ value, Icon }) => (
                      <button
                        key={value}
                        type="button"
                        className={`${styles.chip} ${application === value ? styles.chipActive : ''}`}
                        onClick={(e) => selectChip(e, value)}
                        aria-pressed={application === value}
                      >
                        {application === value && (
                          <span className={styles.chipCheck} aria-hidden="true">✓</span>
                        )}
                        <span className={styles.chipIcon}>
                          <Icon size={26} strokeWidth={1.4} />
                        </span>
                        <span className={styles.chipText}>{value}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + WhatsApp */}
                <div className={styles.fieldRow}>

                  {/* Name */}
                  <div className={styles.fieldOuter}>
                    <div className={`${styles.fieldWrap} ${errors.name ? styles.fieldWrapError : ''}`}>
                      <span className={styles.fieldPrefixIcon}>
                        <User size={16} strokeWidth={1.6} color="#b0968a" />
                      </span>
                      <input
                        id="cf-name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        className={styles.fieldInput}
                        autoComplete="name"
                        onChange={() => clearError('name')}
                      />
                    </div>
                    {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className={styles.fieldOuter}>
                    <div className={`${styles.fieldWrap} ${errors.email ? styles.fieldWrapError : ''}`}>
                      <span className={styles.fieldPrefixIcon}>
                        <Mail size={16} strokeWidth={1.6} color="#b0968a" />
                      </span>
                      <input
                        id="cf-email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className={styles.fieldInput}
                        autoComplete="email"
                        onChange={() => clearError('email')}
                      />
                    </div>
                    {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                  </div>

                  {/* Phone */}
                  <div className={styles.fieldOuter}>
                    <div className={`${styles.fieldWrap} ${errors.phone || errors.whatsapp ? styles.fieldWrapError : ''}`}>
                      <span className={styles.fieldPrefixIcon}>
                        <Phone size={16} strokeWidth={1.6} color="#b0968a" />
                      </span>
                      <div className={styles.countrySelectWrap}>
                        <select
                          id="cf-country-code"
                          name="country_code_select"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className={styles.countrySelect}
                          aria-label="Country Code"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={`${c.iso}-${c.code}`} value={c.code}>
                              {c.flag} {c.code} ({c.country})
                            </option>
                          ))}
                        </select>
                        <span className={styles.countryCodeDisplay}>
                          {countryCode} <ChevronDown size={12} strokeWidth={2} color="currentColor" />
                        </span>
                      </div>
                      <div className={styles.countryDivider} aria-hidden="true" />
                      <input
                        id="cf-whatsapp"
                        name="whatsapp"
                        type="tel"
                        placeholder="Phone Number"
                        className={`${styles.fieldInput} ${styles.phoneInput}`}
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={12}
                        onChange={() => { clearError('phone'); clearError('whatsapp'); }}
                      />
                    </div>
                    {(errors.phone || errors.whatsapp) && (
                      <span className={styles.fieldError}>{errors.phone || errors.whatsapp}</span>
                    )}
                  </div>

                  {/* City / Location */}
                  <div className={styles.fieldOuter}>
                    <div className={styles.fieldWrap}>
                      <span className={styles.fieldPrefixIcon}>
                        <MapPin size={16} strokeWidth={1.6} color="#b0968a" />
                      </span>
                      <input
                        id="cf-city"
                        name="city"
                        type="text"
                        placeholder="Project Location"
                        className={styles.fieldInput}
                        autoComplete="address-level2"
                      />
                    </div>
                  </div>

                </div>

                {/* Project textarea */}
                <div className={styles.textareaOuter}>
                  <div className={styles.textareaWrap}>
                    <span className={styles.textareaIcon}>
                      <PenLine size={15} strokeWidth={1.6} color="#b0968a" />
                    </span>
                    <textarea
                      id="cf-msg"
                      name="message"
                      className={styles.textarea}
                      placeholder="Tell us about your project"
                      rows={3}
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className={styles.globalError} role="alert">
                    Something went wrong. Please try again or reach us on WhatsApp.
                  </p>
                )}

                {/* CTA button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                  aria-busy={loading}
                >
                  {loading
                    ? <span className={styles.spinner} />
                    : <><span>Get Free Quote</span><span className={styles.arrow}>→</span></>
                  }
                </button>

                {/* Privacy */}
                <p className={styles.privacy}>
                  <Lock size={13} strokeWidth={2} />
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>

        {/* ── Trust bar ── */}
        <div className={styles.trustBar} aria-label="Trust statistics">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className={styles.trustItem}>
              <div className={styles.trustIconWrap}>
                <stat.Icon size={26} strokeWidth={1.4} />
              </div>
              <div className={styles.trustText}>
                {stat.preLabel && <span className={styles.trustPreLabel}>{stat.preLabel}</span>}
                <strong className={styles.trustPrimary}>{stat.primary}</strong>
                {stat.secondary && <span className={styles.trustSecondary}>{stat.secondary}</span>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
