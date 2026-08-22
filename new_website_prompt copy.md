# 🏗️ Architecture Prompt — New Client Website

> **Premise:** All UI primitives (`Button`, `GlassCard`, `SectionHeader`, `Reveal`, `ArticleCarousel`) are already built and available. This prompt is purely about **how to architect the system** — scalability, SEO, reusable sections with props, and the design override pattern.

---

## 📋 Mission

Build the **[CLIENT NAME]** website on **Next.js (App Router) + TypeScript + Tailwind CSS v4**, architected so that:

- **Adding a new landing page = adding one object to a data array** (zero new files)
- **Adding a new blog post = adding one object to a data array** (zero new files)
- **Every section component works out-of-the-box but can be visually overridden by any page** via `className` props — no component source edits needed
- **SEO (metadata, JSON-LD, sitemap, canonical, OpenGraph) is automatic** for every data-driven route

---

## 📁 Scalable Repo Structure

```
src/
├── app/
│   ├── layout.tsx                    ← Root: Navbar + Footer + SmoothScroll + PageTransition + global JSON-LD
│   ├── globals.css                   ← Design tokens (@theme), typography, .container-custom, .section-padding
│   ├── page.tsx                      ← Home: imports section components, no inline JSX logic
│   ├── robots.ts                     ← Dynamic robots.txt
│   │
│   ├── (landing-pages)/              ← ⭐ Route GROUP (no URL segment added)
│   │   └── [slug]/
│   │       └── page.tsx              ← One template renders ALL landing pages from data
│   │
│   ├── blogs/
│   │   ├── page.tsx                  ← Blog listing (maps over blogPosts[])
│   │   └── [slug]/
│   │       └── page.tsx              ← Blog detail (finds post by slug, renders markdown)
│   │
│   ├── solutions/[slug]/page.tsx     ← Solutions detail (same data-driven pattern)
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   └── api/contact/route.ts          ← Resend email handler
│
├── components/
│   ├── Navbar.tsx                    ← Scroll-morphing (Framer Motion useTransform)
│   ├── Footer.tsx                    ← Full links + schema
│   ├── Hero.tsx                      ← Brand-specific, NOT generic
│   ├── SectionCTA.tsx                ← ⭐ Most reused section — all props optional with defaults
│   ├── SmoothScroll.tsx              ← Lenis wrapper
│   ├── PageTransition.tsx            ← Framer Motion AnimatePresence on pathname
│   ├── ClientOnly.tsx                ← Hydration-safe shell for analytics + WhatsApp
│   │
│   ├── sections/                     ← ⭐ Page-section components (reusable with props)
│   │   ├── ProblemSection.tsx        ← Renders problems[] array as cards
│   │   ├── FeatureGrid.tsx           ← Renders features[] as 2/3/4-col grid
│   │   ├── UseCaseSection.tsx        ← Renders useCases[] as role cards
│   │   ├── FAQSection.tsx            ← Renders faqs[] as accordion or Q&A pairs
│   │   ├── InternalLinksSection.tsx  ← Renders internalLinks[] as arrow-link rows
│   │   └── BlogGrid.tsx              ← Renders BlogPost[] cards (used on listing + related)
│   │
│   └── ui/                           ← Primitives (already built — do not rebuild)
│       ├── Button.tsx
│       ├── GlassCard.tsx
│       ├── SectionHeader.tsx
│       ├── Reveal.tsx
│       └── ArticleCarousel.tsx
│
└── lib/
    ├── utils.ts                      ← cn() only
    ├── blog-data.ts                  ← BlogPost[] — ALL blog content
    ├── landing-pages-data.ts         ← LandingPage[] — ALL landing page content
    ├── solution-data.ts              ← SolutionArticle[]
    └── [feature]-data.ts             ← Any other content collection (team, features, etc.)
```

---

## ⭐ Architecture Rule #1 — Data-Driven Routing

**Never create a new page file for each landing page or blog post.** One template + one data array = infinite pages.

### Pattern: Landing Pages

```typescript
// src/lib/landing-pages-data.ts
export interface LandingPage {
  slug: string;              // → URL at /[slug]
  keyword: string;           // Primary SEO target keyword
  h1: string;                // Hero heading
  metaTitle: string;         // <title> tag
  metaDescription: string;   // meta description
  introduction: string;      // Hero paragraph
  problems: string[];        // Pain point bullets → rendered as alert cards
  solution: string;          // Solution section paragraph
  features: { title: string; desc: string }[];  // Feature grid cards
  useCases: { role: string; benefit: string }[]; // Who benefits section
  comparison: string;        // Why us vs competitors paragraph
  internalLinks: { text: string; href: string }[]; // Related links
  faqs: { q: string; a: string }[];  // FAQ pairs → FAQPage JSON-LD
  content: string;           // Long-form markdown (800–1200 words for SEO depth)
}

export const landingPagesData: LandingPage[] = [
  {
    slug: "service-name-keyword",
    keyword: "target keyword",
    h1: "Keyword-Rich Hero Heading",
    metaTitle: "Keyword | Brand Name",
    metaDescription: "150-char compelling description with keyword.",
    // ...all other fields
  }
];
```

```tsx
// src/app/(landing-pages)/[slug]/page.tsx
// This ONE file renders ALL landing pages

export async function generateStaticParams() {
  // ⭐ Tells Next.js to pre-build a static page for every slug in the array
  return landingPagesData.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = landingPagesData.find((p) => p.slug === (await params).slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [page.keyword, ...globalKeywords],
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url: `${BASE_URL}/${page.slug}` }
  };
}

export default async function LandingPageRoute({ params }: Props) {
  const page = landingPagesData.find((p) => p.slug === (await params).slug);
  if (!page) notFound();

  // Inline breadcrumb schema (page-specific)
  const breadcrumbSchema = { ... };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero: page.h1, page.introduction */}
      {/* ProblemSection: problems={page.problems} */}
      {/* FeatureGrid: features={page.features} */}
      {/* Markdown content: page.content */}
      {/* UseCaseSection: useCases={page.useCases} */}
      {/* FAQSection: faqs={page.faqs} → also renders FAQPage JSON-LD */}
      {/* SectionCTA: default props (no customization needed here) */}
    </div>
  );
}
```

**Result:** Adding a new keyword landing page = add one object to `landingPagesData[]`. Zero new files. Automatic static generation, automatic SEO.

---

### Pattern: Blogs

```typescript
// src/lib/blog-data.ts
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;           // Card preview text
  date: string;
  readTime: string;
  category: string;          // Used for: related posts filter + JSON-LD
  tag: string;
  image?: string;
  content: string;           // Full markdown body
  metaTitle?: string;        // Falls back to title
  metaDescription?: string;  // Falls back to excerpt
  keywords?: string[];
  faq?: { question: string; answer: string }[]; // → FAQPage JSON-LD auto-injected
}
```

```tsx
// src/app/blogs/[slug]/page.tsx

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === (await params).slug);
  return {
    title: `${post.metaTitle || post.title} | ${BRAND}`,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: { type: 'article', ... },
    twitter: { card: 'summary_large_image', ... }
  };
}

export default async function BlogPost({ params }) {
  const post = blogPosts.find((p) => p.slug === (await params).slug);
  if (!post) return notFound();

  // Semantic cross-linking: map blog category → solution category
  const categoryMap: Record<string, string> = { "Category A": "Solution Type 1" };
  const relatedSolutions = solutionArticles.filter(s => s.category === categoryMap[post.category]).slice(0, 2);
  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 2);

  return (
    <div>
      {/* BreadcrumbList JSON-LD */}
      {/* FAQPage JSON-LD — conditional on post.faq */}
      {/* Article header: category + readTime + date + h1 */}
      {/* GlassCard > ReactMarkdown with .blog-content class */}
      {/* Related Solutions (semantic cross-link) */}
      {/* Related Landing Pages (first 3 from landingPagesData) */}
      {/* Continue Reading (same-category posts) */}
    </div>
  );
}
```

---

## ⭐ Architecture Rule #2 — Reusable Section Components with Props

Section components live in `src/components/sections/`. They are **not page-specific**. They accept data via props and render consistently. Pages assemble them.

### Design contract for every section component:

```tsx
interface SomeSectionProps {
  // Required data
  items: DataType[];
  
  // Optional overrides — all have sensible defaults
  title?: string;            // Section heading
  badge?: string;            // Badge pill text
  description?: string;      // Section subheading
  columns?: 2 | 3 | 4;      // Grid columns (default: 3)
  
  // ⭐ Design overrideability
  className?: string;         // Section wrapper override
  cardClassName?: string;     // Individual card override
  headerClassName?: string;   // SectionHeader override
}
```

### Example: `FeatureGrid.tsx`

```tsx
// src/components/sections/FeatureGrid.tsx
interface FeatureGridProps {
  features: { title: string; desc: string; icon?: LucideIcon }[];
  title?: string;
  badge?: string;
  description?: string;
  columns?: 2 | 3 | 4;
  className?: string;        // Override section wrapper (bg, padding)
  cardClassName?: string;    // Override each card (colors, padding)
}

export const FeatureGrid = ({
  features,
  title,
  badge,
  description,
  columns = 3,
  className,
  cardClassName,
}: FeatureGridProps) => {
  const colMap = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

  return (
    <section className={cn('section-padding', className)}>
      <div className="container-custom">
        {(title || badge) && (
          <SectionHeader badge={badge} title={title!} description={description} className="mb-12" />
        )}
        <Reveal stagger={0.08}>
          <div className={cn('grid grid-cols-1 gap-6', colMap[columns])}>
            {features.map((f, i) => (
              <GlassCard key={i} className={cardClassName}>
                {f.icon && <f.icon className="w-8 h-8 text-primary mb-4" />}
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
```

**Usage — same component, different visual on each page:**

```tsx
// On the Home page: 3 columns, default white cards, slate-50 background
<FeatureGrid features={homeFeatures} title="What We Do" badge="Features" />

// On a Landing page: 4 columns, primary-tinted cards, white background
<FeatureGrid
  features={page.features}
  columns={4}
  className="bg-white"
  cardClassName="!p-8 border-primary/10 hover:border-primary/30"
/>

// On the Solutions page: 2 columns, extra large cards
<FeatureGrid
  features={solutionFeatures}
  columns={2}
  cardClassName="!p-12 h-full"
/>
```

### Example: `SectionCTA.tsx` (most reused component)

```tsx
// src/components/SectionCTA.tsx
interface SectionCTAProps {
  title?: ReactNode;        // Default: brand's global CTA headline
  description?: string;     // Default: brand's global CTA body
  primaryText?: string;     // Default: "Get Started" (or whatever brand default is)
  primaryHref?: string;     // Default: "/contact"
  secondaryText?: string;   // Default: "Learn More"
  secondaryHref?: string;   // Default: "/features"
  badge?: string;           // Default: "Ready to Start?"
  className?: string;       // Override section wrapper
}

// Used as: <SectionCTA /> (fully default)
// Or:      <SectionCTA title="Custom message" primaryText="Book Demo" />
// Or:      <SectionCTA className="bg-slate-900 text-white" /> for dark variant
```

### Example: `FAQSection.tsx`

```tsx
// src/components/sections/FAQSection.tsx
interface FAQSectionProps {
  faqs: { q: string; a: string }[];
  title?: string;             // Default: "Frequently Asked Questions"
  className?: string;
  injectJsonLd?: boolean;     // Default: true — auto-injects FAQPage schema
}

export const FAQSection = ({ faqs, title, className, injectJsonLd = true }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };

  return (
    <section className={cn('section-padding container-custom', className)}>
      {injectJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <SectionHeader title={title || "Frequently Asked Questions"} className="mb-12" />
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="font-semibold text-slate-900 mb-2">{faq.q}</div>
              <p className="text-slate-500">{faq.a}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
```

---

## ⭐ Architecture Rule #3 — The Design Override Pattern

> **Every component accepts `className` as its last prop. `cn()` places it last so the caller always wins.**

```tsx
// CORRECT pattern inside every component:
className={cn(
  "default-base-styles",   // Component defaults first
  conditionalStyles,        // Any internal conditionals
  className                 // ⭐ Caller override LAST — always wins
)}
```

**Three levels of override:**

```
Level 1 — Prop-based (semantic):
  <SectionHeader center={false} />       → Left-aligned instead of centered

Level 2 — className override (visual):
  <GlassCard className="bg-slate-900 text-white border-slate-700" />  → Dark card variant

Level 3 — Tailwind important prefix (force override):
  <GlassCard className="!p-12" />        → Force-override default padding from parent
```

**Never break this pattern by:**
- Hardcoding visual styles in data files
- Using `style={{}}` instead of `className`
- Adding `!important` inside the component itself

---

## ⭐ Architecture Rule #4 — Page as Orchestrator, Not Builder

Pages import section components. Pages do NOT build layouts inline.

```tsx
// ✅ CORRECT — page.tsx is an orchestration file
export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureGrid features={homeFeatures} title="Our Services" badge="What We Do" />
      <Testimonials items={testimonials} />
      <SectionCTA title="Ready to get started?" primaryText="Book a Call" />
    </main>
  );
}

// ❌ WRONG — page.tsx builds layouts inline
export default function Home() {
  return (
    <main>
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-3 gap-6">
            {features.map(f => (
              <div className="bg-white border rounded-xl p-6">...</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## 🗺️ SEO Infrastructure

### 1. Root Layout JSON-LD (site-wide, in `<head>`)

```tsx
// src/app/layout.tsx — schemas that apply to the entire site
const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite",
  "name": "[BRAND]", "url": "[BASE_URL]",
  "potentialAction": { "@type": "SearchAction", "target": "[BASE_URL]/blogs?q={search_term_string}", "query-input": "required name=search_term_string" }
};

const organizationSchema = {
  "@context": "https://schema.org", "@type": "Organization",
  "name": "[BRAND]", "url": "[BASE_URL]",
  "logo": { "@type": "ImageObject", "url": "[BASE_URL]/logo.png" },
  "sameAs": ["[social_url_1]", "[social_url_2]"]
};

const siteNavigationSchema = {
  "@context": "https://schema.org", "@type": "ItemList",
  "name": "Main Navigation",
  "itemListElement": navLinks.map((link, i) => ({
    "@type": "SiteNavigationElement", "position": i + 1, "name": link.name, "url": `[BASE_URL]${link.href}`
  }))
};
```

### 2. Per-Page Metadata (Server Components)

```tsx
// Static pages (about, contact, etc.)
export const metadata: Metadata = {
  title: "[Page Name] | [Brand]",
  description: "...",
  alternates: { canonical: '/page-slug' },
  openGraph: { title, description, url: `${BASE_URL}/page-slug`, type: 'website' }
};

// Dynamic pages (blogs, landing pages)
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = findBySlug((await params).slug);
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: { canonical: `/path/${data.slug}` },
    openGraph: { title: data.metaTitle, description: data.metaDescription, url: `${BASE_URL}/path/${data.slug}` }
  };
}
```

### 3. Page-Level JSON-LD (Inline in page component)

```tsx
// Every page injects its own BreadcrumbList
const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
    { "@type": "ListItem", "position": 2, "name": "Page Name", "item": `${BASE_URL}/page` }
  ]
};

// FAQPage JSON-LD — auto-generated by FAQSection component when injectJsonLd={true}
// Article JSON-LD — injected in blog detail pages
// LocalBusiness JSON-LD — injected in contact/about pages (if applicable)
```

### 4. Categorized Sitemap Index

> **Do NOT use a single flat `sitemap.ts`.** Use a **Sitemap Index** — one master `sitemap.xml` that points to category-grouped child sitemaps. This is how large-scale sites (like Google News, e-commerce) signal content structure to crawlers.

**File structure:**
```
src/app/
├── sitemap.ts                  ← Master index → points to all child sitemaps
├── sitemap/
│   ├── pages/
│   │   └── route.ts            → /sitemap/pages.xml (static pages)
│   ├── blogs/
│   │   └── route.ts            → /sitemap/blogs.xml (all blog posts)
│   ├── landing-pages/
│   │   └── route.ts            → /sitemap/landing-pages.xml
│   └── solutions/
│       └── route.ts            → /sitemap/solutions.xml
```

**Master sitemap index (`src/app/sitemap.ts`):**
```ts
// Returns a sitemap INDEX — each entry points to a child sitemap XML
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // In Next.js, returning objects with a `url` pointing to other sitemaps
  // creates a sitemap index automatically when you use generateSitemaps()
  return [
    { url: `${BASE_URL}/sitemap/pages.xml` },
    { url: `${BASE_URL}/sitemap/blogs.xml` },
    { url: `${BASE_URL}/sitemap/landing-pages.xml` },
    { url: `${BASE_URL}/sitemap/solutions.xml` },
  ];
}
```

**Category sitemap — Pages (`src/app/sitemap/pages/route.ts`):**
```ts
import { NextResponse } from 'next/server';

const staticPages = [
  { url: '/',          priority: 1.0, changeFreq: 'weekly'  },
  { url: '/about',     priority: 0.8, changeFreq: 'monthly' },
  { url: '/contact',   priority: 0.8, changeFreq: 'monthly' },
  { url: '/blogs',     priority: 0.9, changeFreq: 'daily'   },
  { url: '/solutions', priority: 0.9, changeFreq: 'weekly'  },
  { url: '/features',  priority: 0.8, changeFreq: 'monthly' },
  { url: '/faq',       priority: 0.7, changeFreq: 'monthly' },
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `
  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${p.changeFreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
```

**Category sitemap — Blogs (`src/app/sitemap/blogs/route.ts`):**
```ts
import { NextResponse } from 'next/server';
import { blogPosts } from '@/lib/blog-data';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogPosts.map(post => `
  <url>
    <loc>${BASE_URL}/blogs/${post.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
```

**Category sitemap — Landing Pages (`src/app/sitemap/landing-pages/route.ts`):**
```ts
import { NextResponse } from 'next/server';
import { landingPagesData } from '@/lib/landing-pages-data';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${landingPagesData.map(page => `
  <url>
    <loc>${BASE_URL}/${page.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
```

**Why categorized sitemaps?**
- Crawlers understand your content model — blogs vs. landing pages vs. static pages
- Each category can have its own `changeFreq` and `priority` strategy
- Scales cleanly: add a new content type → add a new sitemap route + one line to the index
- Easier to debug and inspect in Google Search Console (per-category coverage reports)
- Landing pages at `priority: 0.9` signals they're primary SEO targets vs. blogs at `0.7`

### 5. HTML Visual Sitemap Page (Optional but Recommended)

Besides the XML sitemap for crawlers, add a `/sitemap` page for humans — grouped by category:

```tsx
// src/app/sitemap-page/page.tsx  (use a different route like /site-index or /all-pages)
// Groups all site links by category — good for UX + internal linking

const sitemapCategories = [
  {
    label: "Main Pages",
    links: [
      { text: "Home", href: "/" },
      { text: "About", href: "/about" },
      { text: "Contact", href: "/contact" },
    ]
  },
  {
    label: "Services & Solutions",
    links: landingPagesData.map(p => ({ text: p.h1, href: `/${p.slug}` }))
  },
  {
    label: "Blog",
    links: blogPosts.map(p => ({ text: p.title, href: `/blogs/${p.slug}` }))
  },
  {
    label: "Resources",
    links: [
      { text: "FAQ", href: "/faq" },
      { text: "Features", href: "/features" },
    ]
  },
];

// Renders: Category heading → list of links per category
// Also injects SiteMapPage JSON-LD for structured data bonus
```

### 6. Robots

```ts
// src/app/robots.ts
// Points to the master sitemap INDEX (which Google then follows to child sitemaps)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] }],
    sitemap: `${BASE_URL}/sitemap.xml`,  // ← points to the index
  };
}
```

---

## 🏠 Home Page Pattern

The home page is the ONLY page that doesn't follow the data-driven slug pattern. It assembles unique brand sections.

```tsx
// src/app/page.tsx
// ⭐ ZERO inline JSX layout — pure component orchestration

import Hero from "@/components/Hero";
import FeatureGrid from "@/components/sections/FeatureGrid";
import Testimonials from "@/components/sections/Testimonials";
import SectionCTA from "@/components/SectionCTA";
import { homeFeatures, homeTestimonials } from "@/lib/home-data";

export const metadata: Metadata = {
  title: "[Primary Keyword] | [Brand]",
  description: "[Compelling 150-char description with keyword]",
  alternates: { canonical: '/' },
};

const homeBreadcrumb = { /* ... */ };

export default function Home() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }} />
      
      <Hero />                    {/* Brand-specific — unique design */}
      
      <FeatureGrid               {/* Reusable section, home variant */}
        features={homeFeatures}
        title="What We Offer"
        badge="Services"
        columns={3}
      />

      <Testimonials items={homeTestimonials} />

      <SectionCTA                {/* Global CTA, home-specific copy */}
        title="Your home page CTA headline"
        description="Compelling subtext"
        primaryText="Get Started"
      />
    </main>
  );
}
```

---

## 📰 Blog Architecture

### Listing Page — `src/app/blogs/page.tsx`

```tsx
// 'use client' ONLY if Reveal animations are needed (GSAP requires client)
// Otherwise keep as Server Component for better SEO

// Structure:
// 1. SectionHeader — left-aligned, badge + title + description
// 2. <BlogGrid posts={blogPosts} /> — reusable grid from sections/BlogGrid.tsx
// 3. <SectionCTA /> — default props

// BlogGrid.tsx — reusable section (also used on blog detail for "Continue Reading"):
interface BlogGridProps {
  posts: BlogPost[];
  columns?: 2 | 3;
  className?: string;
  cardClassName?: string;
}
```

### Detail Page — `src/app/blogs/[slug]/page.tsx`

```tsx
// Server Component — maximum SEO
// JSON-LD injected: BreadcrumbList + Article + FAQPage (conditional on post.faq)

// Semantic internal linking strategy:
// Blog category → maps to → Solution category → surfaces related solutions
// This keeps users on-site and builds topical authority

const categoryToSolution: Record<string, string> = {
  "How-to Guides": "Core Feature",
  "Industry Analysis": "Business Value",
  // ...
};

// Related content blocks:
// 1. Related Solutions (category-mapped, 2 cards)
// 2. Related Landing Pages (first 3 from landingPagesData — always relevant)
// 3. Continue Reading (same-category posts, fallback to latest)
```

---

## 📌 Non-Negotiable Architecture Rules

| Rule | Reason |
|---|---|
| `className` is **always last** in `cn()` | Caller override always wins |
| Content lives in `lib/*.ts` data files | Components never hardcode copy |
| Use `.section-padding` not `py-20` | Design system stays consistent globally |
| Use `.container-custom` not Tailwind `container` | Uniform max-width and padding |
| Wrap scroll content in `<Reveal>` (except Hero) | Consistent animation system |
| Landing pages + blogs = Server Components | Maximum SEO, static generation |
| `'use client'` only for interactive components | Minimize client JS bundle |
| Every page exports `metadata` or `generateMetadata` | Never have empty title/description |
| `generateStaticParams` on all `[slug]` routes | Pre-rendered = fast + SEO-crawlable |
| FAQSection auto-injects FAQPage JSON-LD | Structured data is automatic, not manual |

---

## 🚀 Kickoff Command (paste into new session)

```
Build the [CLIENT NAME] website using this architecture.

**Project details:**
- Brand: [NAME]
- Domain: [domain.com]  
- Primary brand color: #[HEX]
- Tagline: [tagline]
- Business type: [SaaS / Agency / Local Business / E-commerce]
- Primary CTA: [e.g. "Book a Demo" → /contact]
- Nav links: [e.g. Services, Work, Blog, About, Contact]

**All UI primitives are already built:**
- Button (variant: primary|secondary|outline|ghost, size: sm|md|lg)
- GlassCard (children, className)
- SectionHeader (badge, title, description, center, className)
- Reveal (direction, delay, stagger, instant, className)
- ArticleCarousel (children)
- cn() utility from clsx + tailwind-merge

**What to build now (in this order):**
1. `src/lib/blog-data.ts` — BlogPost interface + 3 sample posts
2. `src/lib/landing-pages-data.ts` — LandingPage interface + 3 sample pages
3. `src/components/sections/FeatureGrid.tsx` — with props: features, title, badge, columns, className, cardClassName
4. `src/components/sections/FAQSection.tsx` — with props: faqs, title, className, injectJsonLd
5. `src/components/sections/BlogGrid.tsx` — with props: posts, columns, className
6. `src/components/SectionCTA.tsx` — fully prop-driven with all defaults set
7. `src/app/layout.tsx` — root JSON-LD schemas + metadata
8. `src/app/sitemap.ts` — dynamic sitemap pulling from data files
9. `src/app/robots.ts`
10. `src/app/(landing-pages)/[slug]/page.tsx` — data-driven template
11. `src/app/blogs/page.tsx` — listing page
12. `src/app/blogs/[slug]/page.tsx` — detail page with semantic cross-linking
13. `src/app/page.tsx` — home page (assemble components only)
```
