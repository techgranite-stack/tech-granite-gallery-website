# Pages Structure & Routing: Granite Gallery

This document details the App Router page architecture of the **Granite Gallery** website. It defines how static pages, sitemaps, and dynamic route groups are composed to scale intent-driven traffic.

---

## 🏗️ App Directory Map

All router routes are located in `src/app/`.

```
src/app/
├── layout.tsx                      ← Root layout: global schema + base elements
├── page.tsx                        ← Home page (custom orchestrated layout)
│
├── (landing-pages)/                ← Route Group (No URL segment added)
│   └── [slug]/
│       └── page.tsx                ← Template for all Local SEO and keywords
│
├── collections/
│   ├── page.tsx                    ← Stone categories listing (Marble, Granite, Onyx...)
│   ├── [category]/
│   │   ├── page.tsx                ← Products in a category (e.g. /collections/granite)
│   │   └── [slug]/
│   │       └── page.tsx            ← Individual stone detail (e.g. /collections/granite/alaska-white)
│
├── finishes/
│   ├── page.tsx                    ← Surface finishes catalog
│   └── [slug]/
│       └── page.tsx                ← Finish details (e.g. Mirror Polished, Leathered)
│
├── applications/
│   ├── page.tsx                    ← Stone application guide catalog
│   └── [slug]/
│       └── page.tsx                ← Application details (e.g. Flooring, Kitchen)
│
├── blogs/
│   ├── page.tsx                    ← Knowledge base and dynamic guides index
│   └── [slug]/
│       └── page.tsx                ← Blog article detail page with custom markdown parser
│
├── projects/
│   ├── page.tsx                    ← Dynamic filterable portfolio listing
│   └── [slug]/
│       └── page.tsx                ← Landmark case study details (e.g. Taj Pushkar, Parliament)
│
├── team/
│   └── page.tsx                    ← Leadership profiles and corporate philosophy
│
├── sitemap.xml/
│   └── route.ts                    ← Master XML Sitemap Index with dynamic URL counts
├── sitemap-main.xml/
│   └── route.ts                    ← Core static pages sitemap
├── sitemap-products.xml/
│   └── route.ts                    ← Dynamic products sitemap
├── sitemap-finishes.xml/
│   └── route.ts                    ← Dynamic finishes sitemap
├── sitemap-applications.xml/
│   └── route.ts                    ← Dynamic applications sitemap
├── sitemap-blogs.xml/
│   └── route.ts                    ← Dynamic blogs sitemap
└── sitemap-projects.xml/
    └── route.ts                    ← Dynamic landmark projects sitemap
```

---

## 🏠 Pages Blueprint

### 1. Root Layout (`layout.tsx`)
The overarching shell for every viewport.
- **Features**:
  - Automatically loads the premium Cormorant Garamond (Serif) and Inter (Sans) Google fonts.
  - Links `src/styles/variables.css` and `src/styles/globals.css` design system styles.
  - Injects global JSON-LD schemas inside `<head>` (e.g. Website and Organization schema).
  - Standardizes the responsive page layout wrapper.

### 2. Home Page (`page.tsx`)
Our signature brand showcase.
- **Orchestration**:
  - Combines individual visual components sequentially (`HeroSlider`, `NumberedCardGrid`, etc.).
  - Orchestrates static metadata values with custom local keyword density.
  - Injects Home Breadcrumb structured schema in the DOM.

### 3. Dynamic Landing Pages (`(landing-pages)/[slug]/page.tsx`)
Our schema-driven page generator for infinite Local SEO landing pages.
- **Template Logic**:
  - Resolves `params.slug` directly from `src/lib/landing-pages-data.ts`.
  - Maps section arrays to dynamic components, wrapping them inside a `SectionPersonality` wrapper.
  - Automatically loads dynamic metadata block per slug.
  - Handles fallback validation: triggers standard Next.js `notFound()` if a slug does not exist.

### 4. Dynamic Collections & Product Detail Pages
Our product catalog.
- **Routes**:
  - `/collections`: Lists all categories (Marble, Granite, Quartzite, Limestone, Exotic) as luxury card boards.
  - `/collections/[category]`: Automatically groups products by stone category.
  - `/collections/[category]/[slug]`: Individual stone detail pages with sticky galleries, specification metrics tables, dynamic finish/application pills, and similar product covers.
  - **SEO**: Dynamic breadcrumb schemas and canonicals mapped automatically.

### 5. Surface Finishes, Applications & Landmark Projects
Our specifications and portfolio maps.
- **Finishes & Applications**: Beautiful catalogs showing custom surface options (leather, flamed, acid-wash) and architectural fitments (flooring, feature walls).
- **Landmark Case Studies**: Filterable interactive tabs for prestigious government, hospitality, infrastructure, and heritage stone installations (e.g. India Parliament, Taj Pushkar, Palace on Wheels).

### 6. Dynamic Segmented Sitemaps Index
Our index crawling structure.
- **Routing**: The sitemap is split into multiple category sitemaps (main, products, finishes, applications, blogs, projects) all registered under the master index `/sitemap.xml` with dynamic counts.
- **Styling**: Uses an XSLT sheet `/sitemap.xsl` inside `public/` to transform raw XML files into beautiful browser-readable HTML tables for human visitors, while keeping pure schemas for Googlebot.

---

## 🧭 Dynamic Routing & Static Generation

To deliver lightning-fast static page loads with optimal crawling results, all dynamic detail pages leverage `generateStaticParams`:

```typescript
export async function generateStaticParams() {
  // Pre-builds static HTML files at build time for dynamic route slugs
  return productsData.map((p) => ({
    category: p.type,
    slug: p.slug,
  }));
}
```
This guarantees that dynamic pages compile to static HTML at build time, optimizing server response times (TTFB) and delivering maximum core web vital performance scores.
