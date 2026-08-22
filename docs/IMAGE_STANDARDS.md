# Image Standards — Granite Gallery

> **Purpose:** A single source of truth for how images are produced, optimized, marked up, and handled in the UI on this website. Use it for (1) **engineering** (how to add an image correctly), (2) **auditing** (the checklist at the end), and (3) **AI content workflows** (prompt templates for alt text, filenames, captions).
>
> **Owner:** Web/Engineering · **Last updated:** 2026-06-06 · **Stack:** Next.js (App Router) + `next/image`
>
> Two goals drive every rule here:
> 1. **Rank** — our images should be discoverable and rank in Google Search & Google Images (we are an image-heavy stone catalogue).
> 2. **Never look broken** — slow networks and failed loads must degrade gracefully, never showing a broken-image icon or a layout jump.

---

## 0. TL;DR — the 10 non-negotiables

1. Always use `next/image` (`<Image>`), never a raw `<img>` (logos included, where practical).
2. Every meaningful image has **descriptive, specific `alt` text** — not just the product name.
3. Every image reserves space via `width/height` or a fixed-aspect container → **zero layout shift (CLS)**.
4. The **one** above-the-fold hero image per page gets `priority`; nothing else does.
5. Every below-the-fold image stays lazy (the `next/image` default) — never add `loading="eager"` casually.
6. Every image has a **placeholder** (blur or skeleton) so there is never a blank flash.
7. Every image has an **error fallback** (`onError`) — a branded placeholder, never the broken-image glyph.
8. Always pass a correct **`sizes`** attribute so the browser downloads the right resolution.
9. Serve **AVIF/WebP** (configured in `next.config`) and keep source files reasonably compressed.
10. Keep the **image sitemap** and **`ImageObject` structured data** up to date for ranking.

---

## 1. Two pillars

```
            ┌───────────────────────────┐        ┌───────────────────────────┐
            │   PILLAR A — IMAGE SEO    │        │  PILLAR B — LOADING / UX  │
            │  (get them found & ranked)│        │ (handle slow + failed loads)│
            └───────────────────────────┘        └───────────────────────────┘
            • Descriptive alt text                • Placeholder (blur/skeleton)
            • Semantic file names                 • Reserved space (no CLS)
            • AVIF/WebP + compression             • Lazy load below the fold
            • Responsive srcset + sizes           • Priority for LCP only
            • Image sitemap                       • Fade-in on load
            • ImageObject structured data         • onError → branded fallback
            • Captions + surrounding text         • Optional retry
            • Fast LCP / Core Web Vitals          • Reduced-motion respect
```

Both pillars share one foundation: **performance**. Google ranks faster pages higher, and faster images also produce a better loading UX. So optimizing once helps both.

---

## 2. PILLAR A — Image SEO (ranking on Google)

### 2.1 Alt text — the single highest-impact SEO + accessibility win

`alt` is read by screen readers **and** is a primary ranking signal for Google Images.

**Rules**
- Describe **what is in the image** and its **context**, specifically and naturally.
- Include the relevant keyword **only if it genuinely describes the image** — never keyword-stuff.
- 5–15 words is the sweet spot. End without "image of" / "picture of" (redundant).
- **Decorative images** (pure visual flourish, background textures) → `alt=""` (empty, not missing) so screen readers skip them.
- Logos → the brand name, e.g. `alt="Granite Gallery"`.

| ❌ Weak (current pattern) | ✅ Strong |
|---|---|
| `alt={p.title}` → "Calacatta Gold" | "Calacatta Gold marble slab with grey veining, mirror-polished finish" |
| `alt="marble"` | "Makrana White marble flooring in a hotel lobby" |
| `alt="project"` | "Parliament of India interior clad in Kishangarh sandstone" |
| (missing alt) | `alt=""` if decorative, otherwise a real description |

> **In this repo:** alt is currently `alt={p.title}` / `alt={item.title}` etc. — just the name. Upgrade data so each image carries a descriptive alt (see §5 remediation) or compose it: `alt={\`${p.name} — ${p.finish} ${p.origin}\`}`.

### 2.2 File names

Search engines read the filename. Use lowercase, hyphenated, descriptive slugs.

- ✅ `calacatta-gold-marble-polished-slab.webp`
- ❌ `IMG_3920.jpg`, `photo-1600585154340.jpg`

> **In this repo:** images are hosted on Unsplash with opaque IDs (`photo-1600585…`). When the client supplies **owned, hosted images**, name them semantically and store under a predictable path (e.g. `/images/marble/calacatta-gold/hero.webp`). Owned, well-named images on our own domain rank far better than hot-linked stock.

### 2.3 Format & compression

- Serve **AVIF** first, **WebP** fallback (configured in `next.config`, see §4). Both are far smaller than JPEG/PNG at equal quality.
- Target visual quality `q≈75–85`. Above 85 is wasted bytes; below 70 shows artifacts on stone textures.
- Source masters: keep a high-res original, let `next/image` derive sizes. Don't ship a 4000px image to a 500px slot.
- Use **JPEG/WebP for photos**, **SVG for logos/icons/line art**, **PNG only when transparency + hard edges are needed**.

### 2.4 Responsive delivery (`sizes`)

`next/image` auto-generates a `srcset`. The `sizes` attribute tells the browser which candidate to pick. **A wrong/missing `sizes` is the most common cause of oversized downloads.**

- `sizes` must reflect the rendered width at each breakpoint.
- Example for a half-width card that goes full-width on mobile:
  `sizes="(max-width: 768px) 100vw, 50vw"`
- For a fixed-pixel element: `sizes="(max-width: 768px) 300px, 500px"` (matches the coverflow cards).

### 2.5 Discoverability — image sitemap + structured data

- **Image sitemap:** list important image URLs so Google Images can crawl them. Mirror the existing dynamic sitemap pattern (`src/app/sitemap/sitemap-*.xml/route.ts`) with a `sitemap-images.xml` derived from product/project data, and register it in `sitemap.xml`. (Not yet present — see §5.)
- **`ImageObject` / `Product` structured data:** product and project pages should emit JSON-LD with `image` URLs (absolute). Rich results and Google Images use this. We already emit `BreadcrumbList`/`Person`; extend product/project pages with `image`.
- **Captions & surrounding text:** Google weighs the text *around* an image. Real captions and nearby descriptive copy boost image relevance — don't leave catalogue images floating with no context.
- **Open Graph image** (`og:image`) per page for social/discovery (already wired via `metadata.openGraph`).

### 2.6 Performance = ranking (Core Web Vitals targets)

| Metric | Target | Image lever |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5 s | `priority` + AVIF + correct `sizes` on the hero |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Always reserve space (width/height or aspect-ratio) |
| **INP** (Interaction to Next Paint) | < 200 ms | Don't block the main thread with huge decodes; lazy-load offscreen |

---

## 3. PILLAR B — Loading & error UX

The site must look intentional on a cold 3G load and when a CDN/image 404s.

### 3.1 Reserve space — kill layout shift

Never let content jump when an image arrives.
- Give `<Image>` explicit `width`/`height`, **or** wrap a `fill` image in a container with a fixed `aspect-ratio` (or fixed height).
- This is both a CLS (SEO) fix and a UX fix.

### 3.2 Placeholder — never a blank box

Pick one per context:
- **Blur placeholder** (best for hero/photographic): `placeholder="blur"` + a `blurDataURL` (tiny base64 LQIP). For static imports Next generates it automatically; for remote images, generate a blurhash/LQIP at build or store one per record.
- **Skeleton shimmer** (best for grids/cards): a CSS shimmer block shown until `onLoad` fires, then cross-fade to the image.

> **In this repo:** 0 images currently use a placeholder. This is the biggest perceived-quality gap. Adopt the `SmartImage` wrapper in §6.

### 3.3 Progressive reveal

Fade/scale the image in on load (`onLoadingComplete`/`onLoad`) so it resolves elegantly instead of popping. Respect `prefers-reduced-motion` (no transform, just instant or a short fade).

### 3.4 Error handling — the part that's missing today

When an image fails (network, 404, hot-link broken), **catch it and show a branded fallback** — a stone-textured placeholder with the product name, not the browser's broken-image icon.

- Use the `onError` callback to swap to a local fallback asset or a CSS placeholder.
- Optionally implement **one** silent retry (re-request with a cache-bust) before falling back — useful for flaky mobile networks.
- Log failures (console in dev, telemetry in prod) so we can fix dead source URLs.

### 3.5 Lazy loading & priority discipline

- Below-the-fold images: keep the `next/image` lazy default. Do **not** set `priority`/`loading="eager"` on them — it steals bandwidth from the LCP.
- Exactly **one** `priority` image per page: the hero / LCP element.
- For long galleries, lazy-load is essential; consider virtualizing very long lists.

---

## 4. Reference: recommended `next.config` image block

```js
// next.config.mjs
const nextConfig = {
  images: {
    // Serve AVIF first, then WebP. (Default is webp only.)
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images at the edge for 31 days.
    minimumCacheTTL: 60 * 60 * 24 * 31,
    // Tune to the actual breakpoints we render at (fewer = smaller srcset).
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 300, 384, 500],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Add the client's own image host/CDN here once images are migrated off stock.
    ],
  },
};
export default nextConfig;
```

> **Current state:** only `remotePatterns` (unsplash) is set — no `formats`, `deviceSizes`, or `minimumCacheTTL`. Adding the block above is a quick, high-value win.

---

## 5. Gap analysis — this site, as of 2026-06-06

| # | Gap | Impact | Fix | Priority |
|---|---|---|---|---|
| 1 | No blur/skeleton placeholders (0 images) | Blank flashes on load | `SmartImage` wrapper (§6) | **High** |
| 2 | No `onError` fallbacks (0 images) | Broken-image icon on failure | `SmartImage` wrapper (§6) | **High** |
| 3 | Generic alt text (`alt={p.title}`) | Weak image SEO + a11y | Descriptive alt in data / composed | **High** |
| 4 | No image sitemap | Poor Google Images discovery | `sitemap-images.xml` (mirror existing pattern) | **High** |
| 5 | `next.config` lacks AVIF/sizes/TTL | Larger downloads, slower LCP | Add config block (§4) | Medium |
| 6 | Product/project pages lack `image` JSON-LD | Missed rich/image results | Extend structured data | Medium |
| 7 | 2 raw `<img>` (Navbar drawer, Footer logo) | Unoptimized, no lazy | Convert to `<Image>` | Low |
| 8 | Images hot-linked from Unsplash | Can't own/name/rank them | Migrate to owned, semantically-named assets on our CDN | Medium (pre-launch) |

---

## 6. Reference implementation — `SmartImage`

A single wrapper that bakes in placeholder + fade-in + error fallback, so every team member gets it right by default. (Spec — implement under `src/components/ui/SmartImage/`.)

**Behavior**
- Renders `next/image` with all passed props (`fill`/`width`/`height`, `sizes`, `priority`, `alt`).
- Shows a CSS **skeleton shimmer** until `onLoad`, then cross-fades the image in (skips animation under `prefers-reduced-motion`).
- On `onError`: swaps to a **branded fallback** (stone-texture div + optional label), and (optionally) attempts one cache-busted retry first.
- Forwards `className` so callers control sizing/`object-fit`.

**Sketch**
```tsx
'use client';
import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import styles from './SmartImage.module.css';

type Props = ImageProps & { fallbackLabel?: string };

export default function SmartImage({ fallbackLabel, className, alt, ...rest }: Props) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  if (status === 'error') {
    return (
      <div className={`${styles.fallback} ${className ?? ''}`} role="img" aria-label={alt}>
        {fallbackLabel && <span>{fallbackLabel}</span>}
      </div>
    );
  }
  return (
    <>
      {status === 'loading' && <div className={`${styles.skeleton} ${className ?? ''}`} aria-hidden />}
      <Image
        {...rest}
        alt={alt}
        className={`${className ?? ''} ${status === 'loaded' ? styles.loaded : styles.preLoad}`}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </>
  );
}
```
```css
/* SmartImage.module.css */
.preLoad { opacity: 0; }
.loaded  { opacity: 1; transition: opacity 0.5s ease; }
.skeleton {
  position: absolute; inset: 0;
  background: linear-gradient(100deg, var(--stone-100) 30%, var(--stone-200) 50%, var(--stone-100) 70%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
.fallback {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, var(--stone-200), var(--stone-100));
  color: var(--text-muted); font-family: var(--font-sans); font-size: 12px;
}
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) {
  .preLoad { opacity: 1; } .loaded { transition: none; } .skeleton { animation: none; }
}
```

---

## 7. AUDIT CHECKLIST

Run this per page / per PR that touches images.

### Per-image
- [ ] Uses `<Image>` (not raw `<img>`).
- [ ] `alt` is descriptive & specific (or `alt=""` if decorative).
- [ ] Space reserved (`width/height` or aspect-ratio container) → no layout shift.
- [ ] Correct `sizes` matching the rendered width.
- [ ] Has a placeholder (blur or skeleton).
- [ ] Has an error fallback.
- [ ] `priority` **only** if it's the page's LCP image.
- [ ] Source file reasonably sized (not a 4000px master in a 500px slot).

### Per-page
- [ ] Exactly one `priority` image.
- [ ] LCP < 2.5s, CLS < 0.1 (Lighthouse / PageSpeed).
- [ ] `og:image` set.
- [ ] Product/project images present in JSON-LD (absolute URLs).
- [ ] Important images covered by the image sitemap.

### Site-wide (periodic)
- [ ] `next.config` serves AVIF/WebP with tuned sizes + cache TTL.
- [ ] No raw `<img>` regressions: `grep -rn "<img " src --include="*.tsx"`.
- [ ] Image sitemap valid and submitted in Google Search Console.
- [ ] Search Console → "Page indexing" + Images report has no spikes in errors.
- [ ] No 404 image URLs (crawl with Screaming Frog or similar).

### Tools
- **Lighthouse / PageSpeed Insights** — LCP, CLS, "properly size images", "next-gen formats".
- **Google Search Console** — Image indexing, Core Web Vitals report.
- **Screaming Frog / Sitebulb** — bulk audit alt text, broken images, oversized files.
- **WebPageTest** — filmstrip view to verify placeholder → image transition on slow networks.

---

## 8. AI CONTENT WORKFLOWS

Reusable prompts for generating compliant image metadata at scale. Feed these (plus this doc) to an LLM.

### 8.1 Alt-text generation
```
You are writing SEO + accessibility alt text for a luxury natural-stone supplier (Granite Gallery).
Rules: 5–15 words, describe what is literally visible AND its context, natural language,
include the stone/product name only if it genuinely describes the image, no "image of"/"photo of",
no keyword stuffing. If the image is purely decorative, return an empty string.

Input (per image): product/project name, stone type, finish, origin, where it's used, short scene description.
Output: a single alt string. 

Example in: { name: "Calacatta Gold", finish: "Mirror Polished", origin: "Carrara, Italy", scene: "kitchen island countertop" }
Example out: "Calacatta Gold marble kitchen countertop with gold veining, mirror-polished finish"
```

### 8.2 File-name slug generation
```
Generate a lowercase, hyphenated, descriptive image filename (no spaces, no IDs, max ~6 words)
from: product name, finish, and shot type (hero/detail/application).
Example: "Calacatta Gold" + "polished" + "slab detail" -> "calacatta-gold-polished-slab-detail.webp"
```

### 8.3 Caption + surrounding copy
```
Write a one-sentence caption (max 18 words) and a 2-sentence supporting paragraph for an image,
optimised so nearby text reinforces the image's topic for Google Images, written in a refined,
trustworthy brand voice. Avoid clichés. Input: product, origin, finish, typical application.
```

> **Guardrail for AI-generated alt/captions:** a human must verify the description matches the *actual* image — never let an LLM hallucinate veining colours or origins it can't see. Treat AI output as a first draft.

---

## 9. Change log
- **2026-06-06** — Initial standard. Baseline audit recorded in §5.
```
