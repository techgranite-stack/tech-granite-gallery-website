'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Clock,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  ChevronDown,
  Phone,
  User,
  PenLine,
  AlertCircle,
  Send,
} from 'lucide-react';
import styles from './QuoteModal.module.css';
import { COUNTRY_CODES, formatFullPhoneNumber } from '@/data/country-codes';

const LOCAL_STORAGE_SUBMITTED_KEY = 'gg_quote_submitted';
const SESSION_AUTO_OPENED_KEY = 'gg_quote_auto_opened_session';

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    query: '',
  });

  const clearError = (field: string) => {
    setErrors((prev) => {
      const n = { ...prev };
      delete n[field];
      return n;
    });
  };

  // Auto-open after 15 seconds per session & listen to manual triggers
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Listen to custom trigger event from Navbar or other buttons
    const handleCustomOpen = () => {
      setIsOpen(true);
      setSubmitSuccess(false);
    };
    window.addEventListener('gg:open-quote-modal', handleCustomOpen);

    // If user already submitted enquiry, do not auto-open
    const alreadySubmitted = localStorage.getItem(LOCAL_STORAGE_SUBMITTED_KEY) === 'true';
    if (alreadySubmitted) {
      setHasSubmitted(true);
      return () => window.removeEventListener('gg:open-quote-modal', handleCustomOpen);
    }

    // Check if modal has already auto-opened in this session
    const alreadyOpenedInSession = sessionStorage.getItem(SESSION_AUTO_OPENED_KEY) === 'true';
    if (alreadyOpenedInSession) {
      return () => window.removeEventListener('gg:open-quote-modal', handleCustomOpen);
    }

    // Auto-open after 15 seconds in this session
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem(SESSION_AUTO_OPENED_KEY, 'true');
    }, 15000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('gg:open-quote-modal', handleCustomOpen);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_AUTO_OPENED_KEY, 'true');
    }
  }, []);

  // Handle escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  const validatePhone = (digits: string, code: string): string => {
    if (!digits) return 'Please enter your mobile number';
    if (code === '+91') {
      if (digits.length !== 10) {
        return 'Please enter a valid 10-digit mobile number';
      }
      if (!/^[6-9]\d{9}$/.test(digits)) {
        return 'Mobile number must start with 6, 7, 8, or 9';
      }
    } else {
      if (digits.length < 7 || digits.length > 14) {
        return 'Please enter a valid phone number';
      }
    }
    return '';
  };

  const handlePhoneBlur = () => {
    const digits = formData.phone.replace(/\D/g, '');
    if (digits) {
      const err = validatePhone(digits, countryCode);
      if (err) setErrors((prev) => ({ ...prev, phone: err }));
    }
  };

  const handleNameBlur = () => {
    const name = formData.name.trim();
    if (name && name.length < 2) {
      setErrors((prev) => ({ ...prev, name: 'Please enter your full name' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const name = formData.name.trim();
    if (!name) {
      newErrors.name = 'Please enter your name';
    } else if (name.length < 2) {
      newErrors.name = 'Please enter your full name';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    const phoneErr = validatePhone(phoneDigits, countryCode);
    if (phoneErr) {
      newErrors.phone = phoneErr;
    }

    const query = formData.query.trim();
    if (!query) {
      newErrors.query = 'Please tell us a bit about your requirement or project';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const fullPhoneNumber = formatFullPhoneNumber(countryCode, phoneDigits);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: fullPhoneNumber,
          country_code: countryCode,
          message: query,
          application_interest: 'Direct Factory Quote Modal',
          location: 'Website Lead',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmitSuccess(true);
      setHasSubmitted(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_SUBMITTED_KEY, 'true');
      }

      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } catch (err: any) {
      setErrors({ form: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Shimmer Pill (Bottom Right Corner, always accessible) */}
      {!isOpen && (
        <div className={styles.pillWrapper}>
          <div className={styles.pulseRing} aria-hidden="true" />
          <button
            type="button"
            className={styles.floatingPill}
            onClick={() => {
              setIsOpen(true);
              setSubmitSuccess(false);
            }}
            aria-label="Enquire Now - Direct Factory Rates"
          >
            <span className={styles.pillIcon} aria-hidden="true">
              <Send size={16} strokeWidth={2.4} />
            </span>
            <span className={styles.pillText}>Enquire Now</span>
          </button>
        </div>
      )}

      {/* Modal Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="factory-quote-title"
      >
        <div className={styles.card}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className={styles.content}>
            {submitSuccess ? (
              <div className={styles.successWrap}>
                <div className={styles.successIcon}>
                  <CheckCircle2 size={36} color="var(--copper)" />
                </div>
                <h3 className={styles.successTitle}>Enquiry Received</h3>
                <p className={styles.successText}>
                  Thank you, <strong>{formData.name}</strong>. Our Kishangarh team will connect within 2 hours with verified ex-factory rates and live slab lot details.
                </p>
              </div>
            ) : (
              <>
                {/* Header with Endless Choices & Timeless Luxury together as one headline */}
                <div className={styles.header}>
                  <h2 id="factory-quote-title" className={styles.title}>
                    Endless Choices. <em>Timeless Luxury.</em>
                  </h2>
                </div>

                {/* Form with exact boxes UI & effects from Get Your Free Quote */}
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  {/* Your Name */}
                  <div className={styles.fieldOuter}>
                    <div className={`${styles.fieldWrap} ${errors.name ? styles.fieldWrapError : ''}`}>
                      <span className={styles.fieldPrefixIcon}>
                        <User size={16} strokeWidth={1.6} color="#b0968a" />
                      </span>
                      <input
                        id="quote-name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        className={styles.fieldInput}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, name: e.target.value }));
                          clearError('name');
                        }}
                        onBlur={handleNameBlur}
                        autoComplete="name"
                      />
                    </div>
                    {errors.name && (
                      <span className={styles.fieldError}>
                        <AlertCircle size={13} strokeWidth={2.2} style={{ flexShrink: 0 }} />
                        <span>{errors.name}</span>
                      </span>
                    )}
                  </div>

                  {/* Phone Number with Country Code Dropdown */}
                  <div className={styles.fieldOuter}>
                    <div className={`${styles.fieldWrap} ${errors.phone ? styles.fieldWrapError : ''}`}>
                      <span className={styles.fieldPrefixIcon}>
                        <Phone size={16} strokeWidth={1.6} color="#b0968a" />
                      </span>
                      <div className={styles.countrySelectWrap}>
                        <select
                          id="quote-country-code"
                          name="country_code_select"
                          value={countryCode}
                          onChange={(e) => {
                            setCountryCode(e.target.value);
                            clearError('phone');
                          }}
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
                        id="quote-phone"
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        className={`${styles.fieldInput} ${styles.phoneInput}`}
                        value={formData.phone}
                        maxLength={countryCode === '+91' ? 10 : 14}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, '');
                          setFormData((prev) => ({ ...prev, phone: digits }));
                          clearError('phone');
                        }}
                        onBlur={handlePhoneBlur}
                        autoComplete="tel"
                        inputMode="numeric"
                      />
                    </div>
                    {errors.phone && (
                      <span className={styles.fieldError}>
                        <AlertCircle size={13} strokeWidth={2.2} style={{ flexShrink: 0 }} />
                        <span>{errors.phone}</span>
                      </span>
                    )}
                  </div>

                  {/* Project Requirements */}
                  <div className={styles.fieldOuter}>
                    <div className={`${styles.textareaWrap} ${errors.query ? styles.fieldWrapError : ''}`}>
                      <span className={styles.textareaIcon}>
                        <PenLine size={16} strokeWidth={1.6} color="#b0968a" />
                      </span>
                      <textarea
                        id="quote-query"
                        name="query"
                        rows={3}
                        placeholder="Tell us about your project (area, stone type, city)"
                        className={styles.textareaInput}
                        value={formData.query}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, query: e.target.value }));
                          clearError('query');
                        }}
                      />
                    </div>
                    {errors.query && (
                      <span className={styles.fieldError}>
                        <AlertCircle size={13} strokeWidth={2.2} style={{ flexShrink: 0 }} />
                        <span>{errors.query}</span>
                      </span>
                    )}
                  </div>

                  {errors.form && (
                    <span className={styles.fieldError}>
                      <AlertCircle size={13} strokeWidth={2.2} style={{ flexShrink: 0 }} />
                      <span>{errors.form}</span>
                    </span>
                  )}

                  {/* Primary CTA Submit Button (Centered, Clean Text Only) */}
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}</span>
                  </button>
                </form>

                {/* Bottom 3-Column Trust Bar */}
                <div className={styles.bottomTrustBar}>
                  <div className={styles.bottomTrustItem}>
                    <Clock size={20} color="var(--copper)" strokeWidth={1.8} />
                    <div>
                      <strong>Response within</strong>
                      <span>15 mins</span>
                    </div>
                  </div>
                  <div className={styles.bottomTrustItem}>
                    <ShieldCheck size={20} color="var(--copper)" strokeWidth={1.8} />
                    <div>
                      <strong>No Spam</strong>
                      <span>Promise</span>
                    </div>
                  </div>
                  <div className={styles.bottomTrustItem}>
                    <Headphones size={20} color="var(--copper)" strokeWidth={1.8} />
                    <div>
                      <strong>Free Design</strong>
                      <span>Assistance</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
