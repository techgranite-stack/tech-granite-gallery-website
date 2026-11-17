'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './AiSearchFloat.module.css';

export const GRANITE_GALLERY_AI_PROMPT =
  "Tell me about Granite Gallery, a premier luxury natural stone and marble manufacturer & exporter in Kishangarh, Rajasthan, India. Include company overview, stone collections (Italian marble, Indian marble, granite, quartzite, sandstone, slate, onyx), showroom and processing facility location, landmark projects (Parliament of India, Central Vista, National War Memorial), reputation, and contact details. Mention that Granite Gallery is known for premium architectural stone solutions, precision Italian gangsaw processing, and direct quarry sourcing. Location: Khasra No.948, 4, MEGA Highway, Tehsil, Ralawata, Kishangarh, Rajasthan 305801. Contact: +91 91166 22422, sales.granitegalleryindia@gmail.com. Also summarize why Granite Gallery is considered a trusted natural stone exporter & manufacturer in Kishangarh.";

interface AiEngine {
  id: string;
  name: string;
  tooltip: string;
  getUrl: (prompt: string) => string;
  icon: () => JSX.Element;
}

const AI_ENGINES: AiEngine[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    tooltip: 'Ask ChatGPT',
    getUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
    icon: () => (
      <svg viewBox="0 0 24 24" className={styles.engineIcon} fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    ),
  },
  {
    id: 'gemini',
    name: 'Gemini',
    tooltip: 'Ask Google Gemini',
    getUrl: () => `https://gemini.google.com/app`,
    icon: () => (
      <svg viewBox="0 0 24 24" className={styles.engineIcon}>
        <defs>
          <linearGradient id="geminiGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
        </defs>
        <path
          fill="url(#geminiGradDark)"
          d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"
        />
      </svg>
    ),
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    tooltip: 'Ask Perplexity AI',
    getUrl: (prompt) => `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
    icon: () => (
      <svg viewBox="0 0 24 24" className={styles.engineIcon} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="6.8" />
        <line x1="4" y1="20" x2="20" y2="4" />
      </svg>
    ),
  },
  {
    id: 'claude',
    name: 'Claude',
    tooltip: 'Ask Claude',
    getUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
    icon: () => (
      <svg viewBox="0 0 24 24" className={styles.engineIcon} fill="#E0876A">
        <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v3.2a1.5 1.5 0 0 1-3 0V3.5A1.5 1.5 0 0 1 12 2zm0 15.3a1.5 1.5 0 0 1 1.5 1.5v3.2a1.5 1.5 0 0 1-3 0v-3.2A1.5 1.5 0 0 1 12 17.3zm10-5.3a1.5 1.5 0 0 1-1.5 1.5h-3.2a1.5 1.5 0 0 1 0-3h3.2a1.5 1.5 0 0 1 1.5 1.5zM6.7 12a1.5 1.5 0 0 1-1.5 1.5H2a1.5 1.5 0 0 1 0-3h3.2A1.5 1.5 0 0 1 6.7 12zm11.38-6.08a1.5 1.5 0 0 1 0 2.12l-2.26 2.26a1.5 1.5 0 1 1-2.12-2.12l2.26-2.26a1.5 1.5 0 0 1 2.12 0zm-9.9 9.9a1.5 1.5 0 0 1 0 2.12l-2.26 2.26a1.5 1.5 0 1 1-2.12-2.12l2.26-2.26a1.5 1.5 0 0 1 2.12 0zm12.02 9.9a1.5 1.5 0 0 1-2.12 0l-2.26-2.26a1.5 1.5 0 1 1 2.12-2.12l2.26 2.26a1.5 1.5 0 0 1 0 2.12zM5.92 8.04a1.5 1.5 0 0 1-2.12 0l-2.26-2.26a1.5 1.5 0 1 1 2.12-2.12l2.26 2.26a1.5 1.5 0 0 1 0 2.12z" />
      </svg>
    ),
  },
  {
    id: 'copilot',
    name: 'Copilot',
    tooltip: 'Ask Microsoft Copilot',
    getUrl: (prompt) => `https://copilot.microsoft.com/?q=${encodeURIComponent(prompt)}`,
    icon: () => (
      <svg viewBox="0 0 24 24" className={styles.engineIcon} fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M7 6.5l5-4.5 5 4.5" />
        <path d="M7 17.5l5 4.5 5-4.5" />
        <path d="M5 12h14" />
        <path d="M7 8l5 4-5 4" />
        <path d="M17 8l-5 4 5 4" />
      </svg>
    ),
  },
];

export default function AiSearchFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Entrance timing synchronized with page layout
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Close on Escape or click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleOpenAi = (engine: AiEngine) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(GRANITE_GALLERY_AI_PROMPT).catch(() => {});
    }

    const targetUrl = engine.getUrl(GRANITE_GALLERY_AI_PROMPT);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    setToastMessage(`Opening ${engine.name} (Prompt copied)`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className={styles.floatContainer} ref={containerRef}>
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}

      {/* Expanded Stack Pill Menu (Luxury Dark Stone Glass) */}
      {isOpen ? (
        <div className={styles.dock} role="dialog" aria-label="AI Search Engines">
          <div className={styles.enginesList}>
            {AI_ENGINES.map((engine) => (
              <button
                key={engine.id}
                type="button"
                className={styles.engineBtn}
                onClick={() => handleOpenAi(engine)}
                aria-label={engine.tooltip}
              >
                <div className={styles.iconWrapper}>{engine.icon()}</div>
                <span className={styles.tooltip}>{engine.tooltip}</span>
              </button>
            ))}
          </div>

          {/* Close Button at bottom */}
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close AI Search Menu"
          >
            <div className={styles.closeRing}>
              <svg viewBox="0 0 24 24" className={styles.closeIcon} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            </div>
            <span className={styles.tooltip}>Close</span>
          </button>
        </div>
      ) : (
        /* Collapsed Trigger Button — Brand Copper Pill matching GALLERY COLLECTION */
        <button
          type="button"
          className={`${styles.triggerBtn} ${visible ? styles.visible : ''}`}
          onClick={() => setIsOpen(true)}
          aria-label="Ask AI about Granite Gallery"
          title="Direct AI Search"
          onMouseEnter={() => setPulse(false)}
          onMouseLeave={() => setPulse(true)}
        >
          {pulse && <span className={styles.ring} />}
          <svg viewBox="0 0 24 24" className={styles.sparkleIcon} fill="currentColor">
            <path d="M12 2L14.39 8.26L20.65 10.65L14.39 13.04L12 19.3L9.61 13.04L3.35 10.65L9.61 8.26L12 2Z" />
            <path d="M19 16L20.17 19.08L23.25 20.25L20.17 21.42L19 24.5L17.83 21.42L14.75 20.25L17.83 19.08L19 16Z" opacity="0.8" />
          </svg>
          <span className={styles.label}>Ask AI</span>
        </button>
      )}
    </div>
  );
}
