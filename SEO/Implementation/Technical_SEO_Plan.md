# Technical SEO Implementation Plan — Granite Gallery

**Created:** 2026-08-29
**Scope:** `tech-granite-gallery-website/` (Next.js 14.2.3, App Router)
**Companion doc:** [`../Strategy/Main_Strategy.md`](../Strategy/Main_Strategy.md) — keyword & audience strategy
**Owner:** _unassigned_

---

## How to use this document

Work top-down. Phases are ordered by **dependency and blast radius**, not by effort.
Phase 0 gates everything else — until it ships, work in later phases cannot be measured.

Every task carries:

| Field | Meaning |
|---|---|
| **ID** | Stable reference (e.g. `P1-3`) — use in commit messages and PR titles |
| **Files** | Exact paths to touch |
| **Why** | The defect, stated as observed behaviour |
| **Change** | What to do, with code where useful |
| **Accept** | Objective pass condition — how you prove it's done |
| **Effort** | S ≤ 1h · M ≤ half day · L ≤ 2 days · XL = multi-week |
| **Risk** | Chance of breaking something live |

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done · `[-]` dropped (record why in the Decision Log)

---

## Baseline snapshot — 2026-08-29

Measured against the repo at commit `c216e31`. Re-measure after Phase 3 to quantify movement.

> **Revised 2026-08-30.** The first pass of these counts was taken with a regex that
> only matched single-quoted `slug:` keys and did not strip `/* */` blocks.
> `product-data.ts` mixes quote styles, so the collections catalogue was undercounted
> as 6 products when it actually holds **41**. Corrected figures below are verified
> against a real `next build` (179 static pages) and a crawl of all 162 sitemap URLs.
> The tasks affected — P4-1, P4-2, P3-5 — have been rewritten accordingly.

| Metric | Value | Source |
|---|---|---|
| Indexable URLs | 162 | verified: crawled every sitemap URL, all 200 |
| — of which `/collections/*` products | 41 | `productsData` (9 stone types) |
| — of which `/collections/*` categories | 9 | 6 in `categories.ts` + 3 product-type-only |
| Pages reported indexed | 149 | Search Console (user-reported) |
| Images indexed | 0 | Search Console (user-reported) |
| Image files on disk | 405 `.webp` + 3 `.png` | `public/images/` |
| Distinct image paths referenced in code | 259 | static analysis |
| Orphaned images (never referenced) | 146 | static analysis |
| Broken image references | 0 | static analysis |
| Unique photos per stone page | 3 (`_hero`, `_stand`, `_catalog`) | `public/images/stones/<slug>/` |
| Empty image subfolders (`gallery`/`applications`/`finishes`) | 165 (all `.gitkeep`, 0 `.webp`) | `public/images/stones/*/` |
| Stone pages sharing the same ~7 room photos | 55 of 55 | `marble-products.ts`, `granite-products.ts` |
| Unsplash hotlinks — **live** | 32 refs | `product-data.ts`, in 6 of 41 products |
| Unsplash hotlinks — inside commented-out blocks | 24 refs | `categories.ts` (20), `product-data.ts` (4) |
| Routes with `alternates.canonical` | 14 of 21 | `src/app/**/page.tsx` |
| Route families that never return 404 | 5 | soft-404 audit |
| JSON-LD types emitted | Product, BreadcrumbList, FAQPage, Article, Person | `grep application/ld+json` |
| JSON-LD types missing | Organization, LocalBusiness, WebSite, ImageObject | — |

### Reproduce the baseline

```bash
cd tech-granite-gallery-website

# Orphaned vs referenced images
find public/images -type f \( -name '*.webp' -o -name '*.png' \) | sed 's|^public||' | sort -u > /tmp/all.txt
grep -rhoE "/images/[A-Za-z0-9._/-]+\.(webp|jpg|jpeg|png|avif)" src | sort -u > /tmp/ref.txt
echo "orphaned: $(comm -23 /tmp/all.txt /tmp/ref.txt | wc -l)"
echo "broken:   $(comm -13 /tmp/all.txt /tmp/ref.txt | wc -l)"

# Empty stone image subfolders
find public/images/stones/*/gallery public/images/stones/*/applications \
     public/images/stones/*/finishes -name '*.webp' | wc -l   # expect 0 today

# Routes missing a canonical
grep -rLn "alternates" src/app --include=page.tsx

# Route families that fall back to a mock instead of notFound()
grep -rn "?? mock[A-Za-z]*Fallback" src/app
```

---

# Phase 0 — Unblock the crawler

**Goal:** Make images and render-critical assets fetchable by Googlebot.
**Effort:** S · **Ship:** immediately, on its own commit, ahead of everything else.

> Nothing in Phases 1–5 can be measured while this is broken. One line of code is
> currently suppressing 100% of image indexing.

### `[x]` P0-1 — Stop blocking `/_next/` in robots.txt

- **Files:** [`src/app/robots.ts`](../../src/app/robots.ts)
- **Why:** `disallow` contains `/_next/`. Every image on the site is rendered through
  `next/image` (46 usages, zero raw `<img>`), and there is no `unoptimized` flag or
  custom loader in `next.config.mjs`. So the URL that actually ships in the HTML is:

  ```html
  <img srcset="/_next/image?url=%2Fimages%2Fstones%2Fstatuario%2Fstatuario_hero.webp&w=1920&q=85 1x">
  ```

  That path sits under `/_next/`. The original `/images/...` path appears nowhere in the
  rendered markup — not in `src`, not in `srcset` — so Googlebot-Image has nothing it is
  permitted to fetch. This is the direct cause of "149 pages indexed, 0 images".

  Secondary damage: `/_next/static/` holds the JS and CSS chunks. Blocking those degrades
  Google's rendering of client components — which includes `/about`, `HeroSlider`,
  `MosaicGrid` and every carousel on the site.

- **Change:**

  ```ts
  // src/app/robots.ts
  disallow: ['/api/', '/admin/', '/private/'],   // '/_next/' removed
  ```

  While in the file, also drop the `host` field — it is a Yandex-only directive that
  Google ignores, and it duplicates information already in the sitemap.

- **Accept:**
  1. `curl -s https://granitegalleryindia.com/robots.txt` contains no `/_next/` line.
  2. Search Console → Settings → **robots.txt report** shows the fetched file without it.
  3. Search Console → **URL Inspection** on any `/_next/image?url=...` URL returns
     *Crawl allowed: Yes*.
- **Effort:** S · **Risk:** none — `/admin/` and `/private/` do not exist as routes;
  `/api/` stays blocked.

### `[x]` P0-2 — Move `.env` into the Next project root

- **Files:** `../.env` → `tech-granite-gallery-website/.env`
- **Why:** `.env` currently sits one directory **above** the Next project root. Next reads
  env files from its own root, so `next build` run inside `tech-granite-gallery-website/`
  never loads it. `NEXT_PUBLIC_SITE_URL` silently falls back to the hardcoded default in
  eleven places, and `RESEND_API_KEY` is undefined locally, so the enquiry form fails.
- **Change:** Move the file. Confirm `.gitignore` still covers it at the new path (it lists
  bare `.env`, which matches at any level — verify after the move). Keep the Vercel
  dashboard values as the production source of truth.
- **Accept:** `npm run build` from the project root emits sitemaps whose `<loc>` values
  match `NEXT_PUBLIC_SITE_URL`, and a local enquiry submission reaches Resend.
- **Effort:** S · **Risk:** low — verify the deploy still builds, since Vercel's root
  directory setting may need updating.

---

# Phase 1 — Crawl integrity and indexation hygiene

**Goal:** Every URL Google can reach either serves unique content or returns a real 404.
**Depends on:** Phase 0 · **Effort:** M–L overall

### `[x]` P1-1 — Return 404 instead of mock content on unknown slugs

- **Files:**
  - [`src/app/blogs/[slug]/page.tsx`](../../src/app/blogs/[slug]/page.tsx)
  - [`src/app/projects/[slug]/page.tsx`](../../src/app/projects/[slug]/page.tsx)
  - [`src/app/applications/[slug]/page.tsx`](../../src/app/applications/[slug]/page.tsx)
  - [`src/app/finishes/[slug]/page.tsx`](../../src/app/finishes/[slug]/page.tsx)
  - [`src/app/collections/[category]/[slug]/page.tsx`](../../src/app/collections/[category]/[slug]/page.tsx)
- **Why:** All five resolve their record with `?? mockFallback` rather than calling
  `notFound()`. With `dynamicParams` defaulting to `true`, **any** invented slug under
  these paths renders on demand and returns HTTP 200 with placeholder content. That is an
  unbounded soft-404 surface: `/finishes/anything`, `/blogs/anything`,
  `/collections/marble/anything` all resolve. `/marble`, `/granite`, `/team` and the colour
  hubs already do this correctly — copy their pattern.

  Three of the five also inject the mock into `generateStaticParams`, so a placeholder page
  is **prebuilt and submitted**: `/collections/marble/carrara-white-marble` is a real,
  crawlable page built from Unsplash stock imagery.

- **Change:** Apply this shape to each route. Example for blogs:

  ```ts
  export async function generateStaticParams() {
    return blogPostsData.map((p) => ({ slug: p.slug }));   // mock removed
  }

  export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
  ): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPostsData.find((p) => p.slug === slug);
    if (!post) return {};                                   // no metadata for a 404
    return { /* unchanged */ };
  }

  export default async function BlogDetailPage(
    { params }: { params: Promise<{ slug: string }> }
  ) {
    const { slug } = await params;
    const post = blogPostsData.find((p) => p.slug === slug);
    if (!post) notFound();                                  // was: ?? mockBlogFallback
    // …
  }
  ```

  Add `export const dynamicParams = false;` to each of the five as a second line of
  defence — unknown params then 404 without reaching the component at all.

  **Do not delete the `mock*Fallback` exports.** `finishes/page.tsx:65` and
  `collections/[category]/page.tsx` still use them as empty-state guards for the listing
  views. Only stop using them in the *detail* routes.

  **Exception:** do not set `dynamicParams = false` on
  `collections/[category]/page.tsx` yet — eight categories legitimately have no products
  and are still linked from the nav. That is resolved in P4-2.

- **Accept:** `curl -o /dev/null -w '%{http_code}' https://granitegalleryindia.com/finishes/does-not-exist`
  returns `404` — repeat for one invented slug per route family. Search Console
  → Pages → *Not found (404)* count rises (expected and correct); *Soft 404* trends to zero.
- **Effort:** M · **Risk:** low — verify every nav and footer link still resolves first
  (they all did at audit time; re-run the link check in the Verification appendix).

### `[x]` P1-2 — Give `/about` a title and description

- **Files:** new `src/app/about/layout.tsx`
- **Why:** [`src/app/about/page.tsx`](../../src/app/about/page.tsx) is a `'use client'`
  component, so it cannot export `metadata`. `/about` currently inherits the root layout's
  generic *"Granite Gallery | Luxury Natural Stone Boutique"* title and site-wide
  description. A `pageSeo['/about']` entry already exists in
  [`src/data/page-seo.ts`](../../src/data/page-seo.ts) and is simply never read.
- **Change:** Do **not** refactor the 669-line client component. Add a sibling layout —
  layouts are server components by default and metadata composes down:

  ```tsx
  // src/app/about/layout.tsx
  import type { Metadata } from 'next';
  import { pageSeo } from '@/data/page-seo';

  const seo = pageSeo['/about'];

  export const metadata: Metadata = {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: { canonical: '/about' },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
  };

  export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  }
  ```

  Note: the existing `metaTitle` is 68 characters, over the 60-char ceiling set by the
  project's own [`SeoMeta` contract](../../src/types/seo.ts). Shorten it as part of P4-4 —
  suggested: `About Granite Gallery | Stone Manufacturer, Kishangarh` (54).

- **Accept:** `curl -s https://granitegalleryindia.com/about | grep -o '<title>[^<]*'`
  returns the About-specific title, not the site default.
- **Effort:** S · **Risk:** none.

### `[x]` P1-3 — Add the seven missing canonicals

- **Files:**
  - [`src/app/page.tsx`](../../src/app/page.tsx) → `'/'`
  - [`src/app/marble/page.tsx`](../../src/app/marble/page.tsx) → `'/marble'`
  - [`src/app/granite/page.tsx`](../../src/app/granite/page.tsx) → `'/granite'`
  - [`src/app/granite/[slug]/page.tsx`](../../src/app/granite/[slug]/page.tsx) → `` `/granite/${product.slug}` ``
  - [`src/app/(landing-pages)/[slug]/page.tsx`](../../src/app/(landing-pages)/[slug]/page.tsx) → `` `/${colorPage.slug}` `` and `` `/${pageData.slug}` ``
  - `src/app/about/layout.tsx` → covered by P1-2
- **Why:** 14 of 21 routes set `alternates.canonical`. The gaps are all high-value: the
  homepage, both primary category listings, **all 40 granite detail pages**, all 10 colour
  hubs and the Kishangarh landing page. `/marble/[slug]` sets one; `/granite/[slug]` does
  not — the two files are otherwise near-identical, so this is an oversight, not a decision.
- **Change:** `metadataBase` is already configured in the root layout, so relative values
  resolve to absolute URLs automatically:

  ```ts
  alternates: { canonical: `/granite/${product.slug}` },
  ```

- **Accept:** every URL in `sitemap.xml` returns a `<link rel="canonical">` that is
  self-referential and absolute. Script this — see the Verification appendix.
- **Effort:** S · **Risk:** none.

### `[x]` P1-4 — Repair the sitemap set

- **Files:** [`src/app/sitemap.xml/route.ts`](../../src/app/sitemap.xml/route.ts), all ten
  routes under [`src/app/sitemap/`](../../src/app/sitemap/), new `src/lib/seo-url.ts`
- **Why:** four separate defects:

  1. **Invalid XML.** The index emits a `<count>` child inside `<sitemap>`. That element
     does not exist in the sitemaps.org 0.9 schema — validators reject it and parsers may
     discard the entry.
  2. **Wrong count.** `sitemap-main.xml` is declared as `9 + types + landing`, but the
     route emits **10** static paths. Off by one.
  3. **Duplicate URLs.** `sitemap-products.xml` re-lists all 55 marble and granite URLs
     that `sitemap-marble.xml` and `sitemap-granite.xml` already carry.
  4. **Two different base-URL constants.** Six routes use
     `NEXT_PUBLIC_SITE_URL ?? NEXT_PUBLIC_APP_URL` with a trailing-slash strip; five
     (`applications`, `blogs`, `finishes`, `projects`, `team`) use `BASE_URL` with the
     **reverse** precedence and no strip. If both vars are ever set to different values,
     your sitemaps will advertise two different hostnames — a canonical-splitting bug
     waiting to happen.

- **Change:**

  ```ts
  // src/lib/seo-url.ts — single source of truth
  export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    'https://granitegalleryindia.com'
  ).replace(/\/$/, '');

  /** Absolute URL for a site-relative path. Pass-through for URLs already absolute. */
  export const abs = (p: string) => (p.startsWith('http') ? p : `${SITE_URL}${p}`);
  ```

  Import `SITE_URL` in all eleven sitemap routes, plus `robots.ts` and
  `structured-data.ts`, and delete the local constants. Then drop `<count>`, derive the
  main count from `staticRoutes.length`, and reduce `sitemap-products.xml` to the
  `/collections/*` URLs only.

- **Accept:** all eleven sitemaps validate against the sitemaps.org XSD; no URL appears in
  two sitemaps; `grep -rn "BASE_URL\|const BASE" src/app/sitemap*` returns nothing.
- **Effort:** M · **Risk:** low. Resubmit the index in Search Console afterwards.

---

## ✅ Phases 0 & 1 — completion record (2026-08-30)

Verified against a clean `next build` (179 static pages, `tsc --noEmit` clean) and a crawl
of all 162 sitemap URLs on a local production server.

| Task | Result |
|---|---|
| P0-1 | `/_next/` removed from robots.txt. Built output confirms `Disallow:` is now only `/api/`, `/admin/`, `/private/`. `host` dropped. |
| P0-2 | `.env` moved into the Next project root — **and split**, see note below. |
| P1-1 | All 5 route families now 404 on unknown slugs; `dynamicParams = false` on each. Mock products no longer prebuilt. Bonus: the collections detail route now pins a product to its own category. |
| P1-2 | `/about` serves its own title via a new server `layout.tsx`. |
| P1-3 | 0 missing canonicals across all 162 sitemap URLs (was 7 routes / 52 pages short). |
| P1-4 | `<count>` removed; single `SITE_URL` source; **0 duplicate URLs** across sitemaps (was 57). |

**Verified behaviour**

```
/finishes/does-not-exist                     404      (was 200 + mock)
/blogs/does-not-exist                        404      (was 200 + mock)
/projects/does-not-exist                     404      (was 200 + mock)
/applications/does-not-exist                 404      (was 200 + mock)
/collections/marble/does-not-exist           404      (was 200 + mock)
/collections/granite/statuario-luxe-marble   404      (was 200 — cross-category duplicate)

162/162 sitemap URLs                         200
162/162 canonicals present and self-referential
0 duplicate URLs across the 10 sitemaps
```

**Note on P0-2 — the `.env` move surfaced a live hazard.** The file contained
`NEXT_PUBLIC_SITE_URL=http://localhost:3000`. While it sat outside the project root Next
never read it, so builds silently used the production fallback. Moving it in made the
build honour it — and because `.env` is loaded in **every** environment including
production, a build from this machine would have written `http://localhost:3000` into
every canonical, sitemap `<loc>` and JSON-LD `url`. It is now split:

- `.env.development` → `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (loaded by `next dev` only)
- `.env.local` → `RESEND_API_KEY`, `ENQUIRY_NOTIFICATION_EMAIL` (secrets, all environments)

A `.gitignore` was also added to the Next project root, which previously had none —
every file there, `.env` included, was trackable.

**Known cosmetic difference:** the homepage canonical renders as
`https://granitegalleryindia.com` while the sitemap lists `https://granitegalleryindia.com/`.
Google normalises these to the same URL; left as-is rather than fighting `metadataBase`.


---

# Phase 2 — Structured data and metadata completeness

**Goal:** Every page declares what it is, in a form Google can parse.
**Depends on:** Phase 1 · **Effort:** M–L

### `[ ]` P2-1 — Emit Organization, LocalBusiness and WebSite schema

- **Files:** [`src/lib/structured-data.ts`](../../src/lib/structured-data.ts),
  [`src/app/layout.tsx`](../../src/app/layout.tsx), [`src/app/page.tsx`](../../src/app/page.tsx)
- **Why:** the site emits Product, BreadcrumbList, FAQPage, Article and Person schema, but
  **no Organization, LocalBusiness or WebSite node anywhere**. For a Kishangarh
  manufacturer whose stated strategy pillar #3 is local SEO, this is the single
  highest-value missing markup — and it needs no new content, because every field already
  exists in [`src/config/site.ts`](../../src/config/site.ts).
- **Change:** add three builders. Coordinates are recoverable from the existing `links.maps`
  URL (`!3d26.6799656!4d74.8600186`):

  ```ts
  // src/lib/structured-data.ts
  import { siteConfig } from '@/config/site';
  import { SITE_URL, abs } from '@/lib/seo-url';

  export function organizationJsonLd() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: siteConfig.name,
      url: SITE_URL,
      logo: abs('/Logo-black.png'),
      description: siteConfig.description,
      email: siteConfig.links.email,
      telephone: siteConfig.links.phoneRaw,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Khasra No.948, 4, MEGA Highway, Tehsil, Ralawata',
        addressLocality: 'Kishangarh',
        addressRegion: 'Rajasthan',
        postalCode: '305801',
        addressCountry: 'IN',
      },
      sameAs: [
        siteConfig.links.instagram,
        siteConfig.links.youtube,
      ],
    };
  }

  export function localBusinessJsonLd() {
    return {
      ...organizationJsonLd(),
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${SITE_URL}/#localbusiness`,
      image: abs('/images/hero/granite-gallery-kishangarh-stone-facility.webp'),
      hasMap: siteConfig.links.maps,
      geo: { '@type': 'GeoCoordinates', latitude: 26.6799656, longitude: 74.8600186 },
      priceRange: '$$$',
      areaServed: { '@type': 'Country', name: 'Worldwide' },
      // openingHoursSpecification: add once confirmed with the business
    };
  }

  export function websiteJsonLd() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: siteConfig.name,
      publisher: { '@id': `${SITE_URL}/#organization` },
    };
  }
  ```

  Emit `organizationJsonLd()` + `websiteJsonLd()` **once** in the root layout `<body>`, and
  `localBusinessJsonLd()` on the homepage only. Do not emit LocalBusiness site-wide — one
  authoritative node is stronger than 133 copies.

  **Open question for the business:** confirm opening hours, founding year (the About page
  says *"2022 Granite Gallery Est."* while `/projects` copy says *"since 1985"* and the
  About stats say *"30+ Years Family Heritage"* — pick one and make it consistent before
  putting `foundingDate` in schema).

- **Accept:** the [Rich Results Test](https://search.google.com/test/rich-results) reports
  Organization on any page and LocalBusiness on `/`, with zero errors.
- **Effort:** M · **Risk:** none.

### `[ ]` P2-2 — Fix the images inside Product schema

- **Files:** [`src/lib/structured-data.ts`](../../src/lib/structured-data.ts),
  [`src/app/marble/[slug]/page.tsx`](../../src/app/marble/[slug]/page.tsx),
  [`src/app/granite/[slug]/page.tsx`](../../src/app/granite/[slug]/page.tsx)
- **Why:** two compounding bugs make the `image` field unusable on all 55 stone pages:

  1. **Relative URLs.** `productJsonLd` builds `image` from raw `/images/...` paths.
     schema.org requires absolute URLs; Google discards relative ones.
  2. **Wrong images.** It reads `stone.ogImage ?? stone.heroImages[0]` plus
     `stone.galleryImages`. `ogImage` is set on **zero** stones in either data file, and
     `heroImages`/`galleryImages` point at the *shared room pool* — not the per-slug photos
     the page actually renders via `resolveHeroImage()` / `resolveStandImage()`. So the
     image a visitor sees and the image in the structured data are different files, and the
     structured-data one is a generic bathroom shot reused across all 55 stones.

- **Change:** pass the already-resolved images in, and absolutise. Both
  `structured-data.ts` and `product-detail.ts` are server-only, so this is safe:

  ```ts
  // src/lib/structured-data.ts
  export function productJsonLd(stone: StoneProduct, images: string[]) {
    return {
      // …unchanged…
      image: images.filter(Boolean).map(abs).slice(0, 6),
      url: abs(productPath(stone)),
      offers: { /* … */ url: abs(productPath(stone)) },
    };
  }
  ```

  ```ts
  // src/app/marble/[slug]/page.tsx  (and the granite twin)
  const standImage   = resolveStandImage(product.slug,   product.heroImages[0] ?? product.thumbnail);
  const heroImage    = resolveHeroImage(product.slug,    product.heroImages[0] ?? product.thumbnail);
  const catalogImage = resolveCatalogImage(product.slug, product.thumbnail);

  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify(productJsonLd(product, [heroImage, standImage, catalogImage])),
  }} />
  ```

  Apply the same `abs()` treatment to `breadcrumbJsonLd` and to the inline Product schema in
  `collections/[category]/[slug]/page.tsx`.

- **Accept:** Rich Results Test on `/granite/black-galaxy` shows Product with three absolute
  image URLs, all under `/images/stones/black-galaxy/`, all returning 200.
- **Effort:** M · **Risk:** none.

### `[ ]` P2-3 — Set site-wide Open Graph and Twitter defaults

- **Files:** [`src/app/layout.tsx`](../../src/app/layout.tsx)
- **Why:** there is no `openGraph.type`, `siteName`, `locale` or default `images`, and
  **zero `twitter:` tags site-wide**. Every share on WhatsApp — the primary channel for this
  business, with a floating CTA on every page — falls back to whatever the individual page
  happens to set, and pages without an `ogImage` get nothing.
- **Change:**

  ```ts
  // src/app/layout.tsx — inside the existing `metadata` export
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'en_IN',
    url: siteConfig.url,
    title: `${siteConfig.name} | Luxury Natural Stone Boutique`,
    description: siteConfig.description,
    images: [{
      url: '/images/hero/granite-gallery-marble-granite-sandstone.webp',
      width: 1200, height: 630,
      alt: 'Granite Gallery — marble, granite and sandstone slabs, Kishangarh',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Luxury Natural Stone Boutique`,
    description: siteConfig.description,
    images: ['/images/hero/granite-gallery-marble-granite-sandstone.webp'],
  },
  ```

  **Prerequisite:** confirm that asset is actually ≥1200×630 and close to 1.91:1. Check with
  `sips -g pixelWidth -g pixelHeight public/images/hero/*.webp`. If none of the six hero
  images fit, crop one to `public/images/og/og-default-1200x630.webp` and point at that.
  Article-type pages (`/blogs/[slug]`) should additionally set `openGraph.type: 'article'`.

- **Accept:** [opengraph.xyz](https://www.opengraph.xyz/) renders a correct card for `/`,
  `/marble/statuario` and `/blogs/granite-vs-marble`.
- **Effort:** S · **Risk:** none.

### `[ ]` P2-4 — Remove the nested `<main>` elements

- **Files:** 16 page components — `blogs/page.tsx`, `blogs/[slug]`, `marble/[slug]`,
  `granite/[slug]`, `projects/page.tsx`, `projects/[slug]`, `sitemap/page.tsx`, `about`,
  `team/page.tsx`, `team/[slug]`, `applications/page.tsx`, `applications/[slug]`,
  `collections/page.tsx`, `collections/[category]/[slug]`, `finishes/page.tsx`,
  `finishes/[slug]`
- **Why:** [`src/app/layout.tsx:69`](../../src/app/layout.tsx) already wraps children in
  `<main>`, and these 16 render a second one inside it. Nested `<main>` is invalid HTML and
  breaks landmark navigation for assistive tech and for Google's main-content extraction.
- **Change:** replace the inner `<main>…</main>` with a fragment `<>…</>`. Purely
  mechanical, but check each file's CSS modules for selectors bound to `main` before
  deleting the element.
- **Accept:** `grep -rn "<main" src/app --include=page.tsx` returns nothing; W3C validator
  reports no nested-landmark error on three sampled pages.
- **Effort:** M · **Risk:** low — visual regression only if CSS targets `main`.

---

# Phase 3 — Image SEO pipeline

**Goal:** Every image is crawlable, uniquely associated with one page, and described.
**Depends on:** Phase 0 (mandatory), Phase 1 · **Effort:** L

> Phase 0 makes images *fetchable*. This phase makes them *findable and rankable*.
> P3-3 is capped by photo production — see P4-3.

### `[ ]` P3-1 — Ship an image sitemap

- **Files:** new `src/app/sitemap/sitemap-images.xml/route.ts`,
  [`src/app/sitemap.xml/route.ts`](../../src/app/sitemap.xml/route.ts)
- **Why:** no `<image:image>`, `<image:loc>` or `xmlns:image` declaration exists anywhere
  across the ten sitemap routes. Given that 55 stone pages currently share the same handful
  of room photos (P3-3), an image sitemap is the fastest way to tell Google which image
  belongs to which page — it disambiguates what the HTML currently cannot.
- **Change:** follow the existing sub-sitemap pattern, adding the image namespace. Resolve
  per-slug paths server-side rather than reading the shared pools:

  ```ts
  // src/app/sitemap/sitemap-images.xml/route.ts
  import { getAllMarble, getAllGranite } from '@/data/stone-index';
  import { resolveHeroImage, resolveStandImage, resolveCatalogImage } from '@/lib/product-detail';
  import { productPath } from '@/types/stone';
  import { SITE_URL, abs } from '@/lib/seo-url';

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
     .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

  export async function GET() {
    const stones = [...getAllMarble(), ...getAllGranite()];

    const body = stones.map((s) => {
      const imgs = [
        resolveHeroImage(s.slug,    s.thumbnail),
        resolveStandImage(s.slug,   s.thumbnail),
        resolveCatalogImage(s.slug, s.thumbnail),
      ].filter((v, i, a) => v && a.indexOf(v) === i);   // de-dupe fallbacks

      return `  <url>
    <loc>${SITE_URL}${productPath(s)}</loc>
${imgs.map((img) => `    <image:image>
      <image:loc>${esc(abs(img))}</image:loc>
      <image:title>${esc(s.name)}</image:title>
      <image:caption>${esc(`${s.name} — ${s.tagline}. ${s.origin}.`)}</image:caption>
    </image:image>`).join('\n')}
  </url>`;
    }).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }
  ```

  Register it in the sitemap index. Extend later to projects, applications and finishes once
  those images are unique.

  **Note:** the de-dupe matters. Until P3-3 lands, `resolve*Image` falls back to the shared
  pool for any missing variant, which would otherwise emit the same `<image:loc>` three
  times under one URL.

- **Accept:** `/sitemap/sitemap-images.xml` validates; Search Console accepts it and reports
  ~165 discovered images within two weeks.
- **Effort:** M · **Risk:** none.

### `[ ]` P3-2 — Write real alt text for hero images

- **Files:** [`src/components/sections/PageHero/index.tsx`](../../src/components/sections/PageHero/index.tsx),
  the two stone detail routes
- **Why:** `PageHero:111` uses `alt={title}`, so the highest-value image on every stone page
  carries `alt="Statuario"` — no stone type, no finish, no location, no context. Alt text is
  a primary ranking input for image search. `StoneCard` already does better
  (`` `${product.name} — ${product.tagline}` ``); bring PageHero up to that standard.

  Site-wide alt coverage is otherwise good: 45 of 46 `<Image>` uses have alt, one is `alt=""`.
  Audit that one and confirm the image is genuinely decorative.

- **Change:** add an optional `imageAlt?: string` prop to `PageHero`, defaulting to `title`
  so the other 14 call sites are unaffected. Pass a composed value from the stone routes:

  ```tsx
  imageAlt={`${product.name} ${categoryLabel.toLowerCase()} slab — ${product.finishes[0]?.label ?? 'polished'} finish, ${product.origin}`}
  // → "Makrana White indian marble slab — Polished finish, Makrana, Rajasthan"
  ```

  Keep alt under ~125 characters and never keyword-stuff — describe the photograph.

- **Accept:** no two stone pages share an alt string; spot-check five against the
  actual photo.
- **Effort:** S · **Risk:** none.

### `[ ]` P3-3 — Replace the shared room-photo pools

- **Files:** [`src/data/marble-products.ts:5-28`](../../src/data/marble-products.ts),
  [`src/data/granite-products.ts:5-32`](../../src/data/granite-products.ts)
- **Why:** this is the reason images would not *rank* even once crawlable. The pools are
  declared like this:

  ```ts
  const MARBLE_ROOMS = {
    bath1: '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
    bath2: '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',  // same file
    bath3: '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',  // same file
    // …
  };
  ```

  `bath1`/`bath2`/`bath3` are byte-identical, as are `kitchen1..3`, `wall1`/`wall2` and
  `slab1`/`slab2`. Across `MARBLE_ROOMS`, `DARK_MARBLE_ROOMS`, `DARK_ROOMS`, `LIGHT_ROOMS`
  and `GREY_ROOMS`, all 55 stone pages draw `heroImages`, `galleryImages`,
  `finishes[].images` and `applications[].images` from roughly **seven unique files**.

  Google dedupes byte-identical images and indexes one canonical instance. So Black Galaxy
  granite and Makrana White marble both serve the same bathroom photo — topically
  irrelevant to either, and competing with each other for the one slot Google keeps.

  Each stone *does* have three genuine photos (`_hero`, `_stand`, `_catalog`) — those are
  fine. The problem is everything below the hero.

- **Change:** blocked on photo production (P4-3). Migrate per stone as assets arrive:
  point `heroImages`, `galleryImages`, `finishes[].images` and `applications[].images` at
  `/images/stones/<slug>/gallery/…`, `/finishes/…`, `/applications/…`. Delete each pool
  constant once no stone references it.

  **Interim mitigation, ship now:** set `ogImage` on every stone to its own
  `_hero.webp`. That is a one-line-per-stone edit, gives each page one unique
  social/schema image immediately, and needs no new photography.

- **Accept:** `grep -c "_ROOMS" src/data/*.ts` returns 0; no image path appears under more
  than one stone slug.
- **Effort:** XL (gated by photography) · **Risk:** low per stone, migrate incrementally.

### `[ ]` P3-4 — Resolve the 146 orphaned images

- **Files:** `public/images/**`
- **Why:** 146 of 405 image files are referenced nowhere in `src/`. They ship in the deploy,
  have no crawl path, and cannot be indexed. Some are likely the exact per-stone photography
  that P3-3 needs.
- **Change:** run the baseline orphan script, then trichotomise: **wire up** (real stone
  photography → move into the right `stones/<slug>/` subfolder and reference it),
  **archive** (move out of `public/`), **delete**. Do not leave them where they are.
- **Accept:** orphan count under 20, each remaining one justified in the Decision Log.
- **Effort:** M · **Risk:** low — the audit found **zero broken references**, so nothing
  currently depends on them.

### `[ ]` P3-5 — Remove Unsplash hotlinks

- **Files:** [`src/lib/product-data.ts`](../../src/lib/product-data.ts) (32 live refs),
  [`next.config.mjs`](../../next.config.mjs)
- **Why:** **32 live** references to `images.unsplash.com`, all in `product-data.ts` and
  confined to **6 of the 41** collection products (`calacatta-gold-marble`,
  `statuario-luxe-marble`, `volakas-white-marble`, `absolute-black-granite`,
  `jade-green-onyx`, `rainforest-brown-marble`) plus 4 in `mockProductFallback`. Those
  images are hosted on Unsplash's domain — any image-search equity accrues to unsplash.com,
  never to you — and they make those 6 products look like stock filler beside the other 35,
  which already use real local photography under `/images/collections/`.

  Corrected scope: the 20 references in `categories.ts` are **all inside a commented-out
  block** and ship nothing. This task is smaller and more targeted than first assessed.
- **Change:** replace with local assets (P3-4 may supply them). Once the last reference is
  gone, delete the `remotePatterns` entry from `next.config.mjs` so no new hotlinks creep in.
- **Accept:** `grep -rc "images.unsplash.com" src` returns 0.
- **Effort:** M · **Risk:** low, but ties into the P4-1 and P4-2 decisions — do not
  photograph categories you are about to delete.

---

# Phase 4 — Content and duplication

**Goal:** One page per intent. No thin or duplicated pages in the index.
**Depends on:** Phases 1–3 · **Effort:** XL
**Blocked on business decisions — see the Decision Log. Do not start P4-1/P4-2 without a call.**

### `[ ]` P4-1 — Resolve the overlap between `/collections/*` and `/marble` + `/granite`

- **Files:** [`src/lib/product-data.ts`](../../src/lib/product-data.ts),
  [`next.config.mjs`](../../next.config.mjs)
- **Why:** the site runs two product systems, and they are **complementary, not
  duplicates** — the original framing of this task was wrong and is corrected here.

  `productsData` holds **41 products across 9 stone types**:

  | Type | Count | Equivalent under `/marble` or `/granite`? |
  |---|---|---|
  | sandstone | 18 | none — `/collections` is the only home |
  | slate | 7 | none |
  | quartzite | 6 | none |
  | marble | 3 | partial — see below |
  | limestone | 2 | none |
  | porphyry | 2 | none |
  | granite | 1 | none (`absolute-black-granite` is not in the 40-stone catalogue) |
  | onyx | 1 | none (`jade-green-onyx` ≠ `honey-onyx`) |
  | exotic | 1 | none |

  So **35 of 41** products exist nowhere else on the site. Removing or redirecting the
  `/collections` tree wholesale would delete the entire sandstone, slate, quartzite,
  limestone and porphyry catalogue.

  The genuine overlap is narrow: **one** product, `statuario-luxe-marble`, competes with
  `/marble/statuario` on name and intent. `calacatta-gold-marble`, `volakas-white-marble`,
  `absolute-black-granite`, `jade-green-onyx` and `rainforest-brown-marble` have no
  counterpart — they are simply thinner entries that use Unsplash stock while the other 35
  use real local photography.

  A second, subtler duplication existed and is **already fixed** in P1-1: the detail route
  resolved a product by slug alone and ignored the category segment, so every product was
  reachable at every category path (`/collections/granite/statuario-luxe-marble` returned
  200). It now 404s.

- **Change — two independent decisions:**
  1. **`statuario-luxe-marble`** — the only true conflict. Either 301 it to
     `/marble/statuario`, or differentiate it. Check Search Console impressions first;
     if it has none, redirecting is free.
  2. **The 5 stock-photo products** — do not redirect. Bring them up to the standard of
     the other 35: real photography (P3-5) and fuller data. They are legitimate products.

- **Accept:** one canonical URL per product; no *Duplicate, Google chose different canonical*
  under `/collections/`.
- **Effort:** S for (1), M for (2) · **Risk:** low — much smaller than first assessed.

### `[ ]` P4-2 — Decide on the five commented-out categories

- **Files:** [`src/data/categories.ts`](../../src/data/categories.ts),
  [`src/config/site.ts`](../../src/config/site.ts)
- **Why:** also corrected. The earlier claim that *"eight collection categories render
  identical Carrara mock content"* was wrong — **no category renders the mock**. All nine
  built category pages have real products behind them.

  What is actually true: `categories.ts` defines 6 active categories (`marble`, `granite`,
  `quartzite`, `limestone`, `sandstone`, `slate`), and a further **5 are commented out**
  inside a `/* */` block at lines 113–206 — `porphyry`, `cobble-pebble`, `stone-veneer`,
  `tombstone`, `imported`. All 20 Unsplash references in this file sit inside that dead
  block.

  The consequence is a nav/content mismatch, not thin content:
  - `/collections/porphyry` **does** build (2 products supply the type) but has no curated
    title, description or keywords — it falls back to a generated
    `"Porphyry Collection | Granite Gallery"` and an empty `desc`.
  - The nav's "More Stones" menu links `/collections/stone-veneer`, which has **no products
    and no category record**. With `dynamicParams` left `true` on this route (deliberately —
    see P1-1), it still renders the Carrara mock. **This is the one place the mock is still
    reachable.**

- **Change:**
  1. **Uncomment and finish `porphyry`** — it has products and builds today; it only lacks
     curated metadata. Cheapest win in this task.
  2. **`stone-veneer`, `cobble-pebble`, `tombstone`** — verified as the only three URLs on
     the site that still render the Carrara mock. `stone-veneer` is the urgent one: it is
     linked from the nav's "More Stones" menu, so it is crawlable. Either add products or
     remove the nav link. (`imported` and `porphyry` were checked and resolve to real
     products via the `typeMap` aliases — they need curated metadata, not products.)
  3. Once no category can be empty, set `dynamicParams = false` on
     `collections/[category]/page.tsx` and drop the `mockProductFallback` branch from
     `resolveProducts`, closing the last soft-404 on the site.
- **Accept:** every nav link resolves to a page with real products; `grep -rn
  "mockProductFallback" src/app` returns nothing.
- **Effort:** M · **Risk:** low.

### `[ ]` P4-3 — Photo production for 165 empty image folders

- **Files:** `public/images/stones/*/{gallery,applications,finishes}/`
- **Why:** all 165 of these folders contain a `.gitkeep` and zero `.webp`. This is the root
  cause behind P3-3 — the shared pools exist *because* there is nothing else to point at.
  Until real per-stone photography lands, every stone page below the hero shows the same
  seven images.
- **Change:** prioritise rather than attempting all 55 at once:
  - **Batch 1 (10 stones)** — the nav-featured set: Makrana White, Statuario, Botticino,
    Black Galaxy, Tan Brown, Blue Pearl, Steel Grey, Majestic Black, Travertine, Honey Onyx.
  - **Batch 2 (~15)** — whatever Search Console shows getting impressions after Phase 3.
  - **Batch 3** — the long tail.

  Target ≥4 gallery images per stone. Follow the existing conventions in
  [`docs/IMAGE_STANDARDS.md`](../../docs/IMAGE_STANDARDS.md) and
  [`docs/IMAGE_REQUEST_BRIEF.md`](../../docs/IMAGE_REQUEST_BRIEF.md), and keep the
  descriptive-filename discipline already visible in `public/images/hero/` — filenames like
  `granite-gallery-kishangarh-stone-facility.webp` are a real asset, do not regress to
  `IMG_4821.webp`.

- **Accept:** Batch 1 stones have ≥4 unique gallery images each and reference zero pool
  constants.
- **Effort:** XL (external dependency) · **Risk:** none technically; this is the long pole
  on image rankings.

### `[ ]` P4-4 — Audit titles and descriptions against the project's own contract

- **Files:** [`src/data/page-seo.ts`](../../src/data/page-seo.ts), all `*-products.ts`,
  `*-data.ts`
- **Why:** [`src/types/seo.ts`](../../src/types/seo.ts) defines a clear contract — titles
  ≤60 chars, descriptions 140–160, unique across all pages. It is not enforced anywhere.
  Known violations: `/about` (67 chars), and `/marble`'s description still says
  *"Bottincino"* — the misspelling that `next.config.mjs` redirects away from.
- **Change:** write a check script (see appendix) and wire it into CI or a pre-commit hook.
  Fix violations in the data files; no component changes needed.
- **Accept:** the script exits 0 across all data files.
- **Effort:** M · **Risk:** none.

---

# Phase 5 — Measurement and guardrails

**Goal:** Prove the work landed, and stop regressions.

### `[ ]` P5-1 — Establish Search Console baselines

- Submit `/sitemap.xml` and the new `/sitemap/sitemap-images.xml`.
- Record, **before** Phase 0 ships, so the delta is attributable:
  - Performance → Search type: **Image** — impressions, clicks, position
  - Pages → indexed / not indexed, and the *Soft 404* count
  - Crawl stats → by response type
- Confirm domain verification. `googleSiteVerification` is empty in `site.ts`; the comment
  says a DNS TXT record covers the domain property. **Verify that is actually in place** —
  if not, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy.

### `[ ]` P5-2 — Expected timeline after Phase 0

Image indexing is slow even after the block is lifted. Do not judge the fix too early.

| Window | Expectation |
|---|---|
| 0–3 days | robots.txt refetched; `/_next/image` URLs report *Crawl allowed: Yes* |
| 1–2 weeks | First images appear in the Image search type; crawl stats show image requests |
| 3–6 weeks | Bulk of the ~165 unique stone photos discovered, given P3-1 |
| 2–4 months | Rankings stabilise; genuine gains gated on P3-3 / P4-3 uniqueness |

### `[ ]` P5-3 — Regression guards

- CI check: fail the build if `robots.ts` disallows `/_next` (this bug must never return).
- CI check: fail if any `page.tsx` under a dynamic segment contains `?? mock` and no `notFound`.
- CI check: run the P4-4 metadata length/uniqueness script.
- CI check: fail on any new `images.unsplash.com` reference.
- Add all four to a single `npm run seo:check` script.

---

# Decision Log

Record every judgement call here, with a date and a reason. Items marked **OPEN** block work.

| # | Decision | Status | Owner | Notes |
|---|---|---|---|---|
| 1 | Legacy `/collections/*` products: redirect, keep, or delete (P4-1) | **OPEN** | — | Recommend A (301). Check Search Console impressions first. |
| 2 | Eight empty categories: populate, noindex, or redirect (P4-2) | **OPEN** | — | Recommend noindex now, populate over time. |
| 3 | Founding year: 1985 vs 2022 vs "30+ years" — currently inconsistent across `/about`, `/projects` and `page-seo.ts` | **OPEN** | — | Blocks `foundingDate` in P2-1. |
| 4 | Opening hours for LocalBusiness schema | **OPEN** | — | Blocks `openingHoursSpecification` in P2-1. |
| 5 | Photo production budget and batch sizes (P4-3) | **OPEN** | — | Long pole on image rankings. |
| 6 | Is the GSC DNS TXT record actually in place? (P5-1) | **OPEN** | — | — |

---

# Appendix A — Verification commands

```bash
cd tech-granite-gallery-website

# P0-1 — robots.txt must not block /_next/
curl -s https://granitegalleryindia.com/robots.txt | grep -i "_next" && echo "STILL BLOCKED" || echo "OK"

# P1-1 — unknown slugs must 404
for u in /finishes/nope /blogs/nope /projects/nope /applications/nope /collections/marble/nope; do
  printf "%-34s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' "https://granitegalleryindia.com$u")"
done   # all must be 404

# P1-3 — every sitemap URL must carry a self-referential canonical
curl -s https://granitegalleryindia.com/sitemap/sitemap-marble.xml \
  | grep -oE '<loc>[^<]+' | sed 's/<loc>//' | while read -r u; do
      c=$(curl -s "$u" | grep -oE '<link rel="canonical" href="[^"]+' | sed 's/.*href="//')
      [ "$c" = "$u" ] || echo "MISMATCH  $u  ->  ${c:-MISSING}"
    done

# P1-4 — no duplicate URLs across sitemaps
for s in main marble granite colors products finishes applications blogs projects team; do
  curl -s "https://granitegalleryindia.com/sitemap/sitemap-$s.xml" | grep -oE '<loc>[^<]+' | sed 's/<loc>//'
done | sort | uniq -d      # expect empty

# P2-4 — no nested <main>
grep -rn "<main" src/app --include=page.tsx    # expect empty

# P3-5 — no Unsplash hotlinks
grep -rn "images.unsplash.com" src             # expect empty

# Internal link check — every nav href resolves to real data
grep -oE "href: '/[^']*'" src/config/site.ts | sed "s/href: '//;s/'//" | grep -v "→" | sort -u
```

# Appendix B — Metadata contract check (P4-4)

Save as `scripts/seo-check.mjs` and run with `node scripts/seo-check.mjs`.

```js
import { pageSeo } from '../src/data/page-seo.ts';

let failures = 0;
const titles = new Map();

for (const [route, seo] of Object.entries(pageSeo)) {
  if (seo.metaTitle.length > 60)
    console.error(`✗ ${route} title ${seo.metaTitle.length} chars (max 60)`), failures++;
  if (seo.metaDescription.length < 140 || seo.metaDescription.length > 160)
    console.error(`✗ ${route} description ${seo.metaDescription.length} chars (want 140–160)`), failures++;
  if (titles.has(seo.metaTitle))
    console.error(`✗ ${route} duplicate title, shared with ${titles.get(seo.metaTitle)}`), failures++;
  titles.set(seo.metaTitle, route);
}

process.exit(failures ? 1 : 0);
```

Extend it to the stone, finish, application, project and blog data files — they carry the
same `SeoMeta` shape and are not currently checked either.

# Appendix C — Change index by file

| File | Tasks |
|---|---|
| `src/app/robots.ts` | P0-1, P1-4 |
| `.env` (relocate) | P0-2 |
| `src/lib/seo-url.ts` *(new)* | P1-4 |
| `src/app/sitemap.xml/route.ts` | P1-4, P3-1 |
| `src/app/sitemap/*/route.ts` (×10) | P1-4 |
| `src/app/sitemap/sitemap-images.xml/route.ts` *(new)* | P3-1 |
| `src/app/layout.tsx` | P2-1, P2-3 |
| `src/app/page.tsx` | P1-3, P2-1 |
| `src/app/about/layout.tsx` *(new)* | P1-2 |
| `src/app/about/page.tsx` | P2-4 |
| `src/app/marble/page.tsx`, `granite/page.tsx` | P1-3 |
| `src/app/marble/[slug]/page.tsx` | P2-2, P2-4, P3-2 |
| `src/app/granite/[slug]/page.tsx` | P1-3, P2-2, P2-4, P3-2 |
| `src/app/(landing-pages)/[slug]/page.tsx` | P1-3 |
| `src/app/blogs/[slug]/page.tsx` | P1-1, P2-3, P2-4 |
| `src/app/projects/[slug]/page.tsx` | P1-1, P2-4 |
| `src/app/applications/[slug]/page.tsx` | P1-1, P2-4 |
| `src/app/finishes/[slug]/page.tsx` | P1-1, P2-4 |
| `src/app/collections/[category]/page.tsx` | P4-2 |
| `src/app/collections/[category]/[slug]/page.tsx` | P1-1, P2-2, P2-4, P4-1 |
| `src/lib/structured-data.ts` | P1-4, P2-1, P2-2 |
| `src/lib/product-data.ts` | P3-5, P4-1 |
| `src/data/categories.ts` | P3-5, P4-2 |
| `src/data/marble-products.ts`, `granite-products.ts` | P3-3 |
| `src/data/page-seo.ts` | P4-4 |
| `src/components/sections/PageHero/index.tsx` | P3-2 |
| `next.config.mjs` | P3-5, P4-1 |
| `public/images/**` | P3-4, P4-3 |
