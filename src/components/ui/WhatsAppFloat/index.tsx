'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';
import styles from './WhatsAppFloat.module.css';

export const GRANITE_GALLERY_AI_QUERY =
  "Tell me about Granite Gallery, Kishangarh: luxury natural stone and Italian marble collections, factory showroom location, contact details, and reputation.";

export const GRANITE_GALLERY_FULL_PROMPT =
  "Tell me about Granite Gallery, a premier luxury natural stone and marble manufacturer & exporter in Kishangarh, Rajasthan, India. Include company overview, stone collections (Italian marble, Indian marble, granite, quartzite, sandstone, slate, onyx), showroom and processing facility location, landmark projects (Parliament of India, Central Vista, National War Memorial), reputation, and contact details. Mention that Granite Gallery is known for premium architectural stone solutions, precision Italian gangsaw processing, and direct quarry sourcing. Location: Khasra No.948, 4, MEGA Highway, Tehsil, Ralawata, Kishangarh, Rajasthan 305801. Contact: +91 91166 22422, sales.granitegalleryindia@gmail.com. Also summarize why Granite Gallery is considered a trusted natural stone exporter & manufacturer in Kishangarh.";

// Backward compatibility alias
export const GRANITE_GALLERY_AI_PROMPT = GRANITE_GALLERY_FULL_PROMPT;

interface AiEngine {
  id: string;
  name: string;
  tooltip: string;
  getUrl: (query: string) => string;
  icon: () => JSX.Element;
}

const AI_ENGINES: AiEngine[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    tooltip: 'Ask ChatGPT (Free Chat)',
    getUrl: (query) => `https://chatgpt.com/?q=${encodeURIComponent(query)}`,
    icon: () => (
      <svg viewBox="0 0 24 24" className={styles.engineSvg} fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    ),
  },
  {
    id: 'gemini',
    name: 'Gemini',
    tooltip: 'Ask Google Gemini AI',
    getUrl: (query) => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    icon: () => (
      <svg viewBox="0 0 24 24" className={styles.engineSvg}>
        <defs>
          <linearGradient id="dockGeminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <path
          fill="url(#dockGeminiGrad)"
          d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"
        />
      </svg>
    ),
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    tooltip: 'Ask Perplexity AI (Free Chat)',
    getUrl: (query) => `https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`,
    icon: () => (
      <svg viewBox="0 0 24 24" className={styles.engineSvg} fill="none" stroke="#0D9488" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="6.8" />
        <line x1="4" y1="20" x2="20" y2="4" />
      </svg>
    ),
  },
];

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const dockRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Close AI menu on click outside or Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setAiOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setAiOpen(false);
      }
    }

    if (aiOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [aiOpen]);

  const handleOpenAi = (engine: AiEngine) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(GRANITE_GALLERY_FULL_PROMPT).catch(() => {});
    }

    const targetUrl = engine.getUrl(GRANITE_GALLERY_AI_QUERY);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    setToastMessage(`Opening ${engine.name} (Starting free chat...)`);
    setAiOpen(false);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <nav
      ref={dockRef}
      className={`${styles.dock} ${visible ? styles.visible : ''}`}
      aria-label="Quick contact & AI options"
    >
      {/* Toast Feedback */}
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}

      {/* 1. WhatsApp Action */}
      <a
        href={siteConfig.links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.dockItem} ${styles.itemWhatsApp}`}
        aria-label="Chat with us on WhatsApp"
        data-wa-source="float"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.dockIcon} aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className={styles.tooltip}>WhatsApp</span>
      </a>

      {/* 2. Call Action */}
      <a
        href={`tel:${siteConfig.links.phoneRaw}`}
        className={`${styles.dockItem} ${styles.itemCall}`}
        aria-label={`Call us at ${siteConfig.links.phone}`}
      >
        <Phone size={19} strokeWidth={2} className={styles.dockIcon} />
        <span className={styles.tooltip}>Call Us</span>
      </a>

      {/* 3. Mail Action */}
      <a
        href={`mailto:${siteConfig.links.email}?subject=Inquiry%20from%20Website`}
        className={`${styles.dockItem} ${styles.itemMail}`}
        aria-label={`Email us at ${siteConfig.links.email}`}
      >
        <Mail size={19} strokeWidth={2} className={styles.dockIcon} />
        <span className={styles.tooltip}>Email Us</span>
      </a>

      {/* 4. Ask AI Action (Last Option) */}
      <button
        type="button"
        className={`${styles.dockItem} ${styles.itemAi} ${aiOpen ? styles.itemAiActive : ''}`}
        onClick={() => setAiOpen((prev) => !prev)}
        aria-label="Ask AI about Granite Gallery"
        aria-expanded={aiOpen}
      >
        <Sparkles size={18} strokeWidth={2.2} className={styles.dockIcon} />
        {!aiOpen && <span className={styles.tooltip}>Ask AI</span>}
      </button>

      {/* AI Search Engines Menu (Opens Vertically Upwards) */}
      {aiOpen && (
        <div className={styles.aiPopup} role="dialog" aria-label="Ask AI search options">
          <div className={styles.aiPopupHeader}>
            <Sparkles size={13} className={styles.aiPopupHeaderSparkle} />
            <span>Ask AI Engines</span>
          </div>

          <div className={styles.aiEngineList}>
            {AI_ENGINES.map((engine) => (
              <button
                key={engine.id}
                type="button"
                className={styles.aiEngineItem}
                onClick={() => handleOpenAi(engine)}
                title={engine.tooltip}
              >
                <span className={styles.aiEngineIconWrap}>{engine.icon()}</span>
                <span className={styles.aiEngineName}>{engine.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
