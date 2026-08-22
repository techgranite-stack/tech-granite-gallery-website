# Scalable Data-Driven Architecture Blueprint

This document defines the core architecture for scaling the **Granite Gallery** website using Next.js (App Router), TypeScript, and schema-driven page generation. 

Our mission is to ensure that adding a new page (product, finish, blog, team member, application, project, or local SEO landing page) requires **zero new files**—only a single object added to a data collection array.

---

## 🏗️ Directory Routing Map

To support clean indexing and maximum SEO authority, the routing structure is designed as follows:

```
src/
├── app/
│   ├── layout.tsx                      ← Root layout: global schema + base elements
│   ├── page.tsx                        ← Home page (custom orchestrated layout)
│   ├── sitemap.ts                      ← Sitemap index (references child sitemaps)
│   │
│   ├── (landing-pages)/                ← ⭐ Dynamic landing pages & Local SEO
│   │   └── [slug]/
│   │       └── page.tsx                ← Template for all Local SEO and keywords
│   │
│   ├── products/
│   │   ├── page.tsx                    ← Catalog listing of all natural stones
│   │   └── [slug]/
│   │       └── page.tsx                ← Detail page for specific stones (e.g. White Carrara)
│   │
│   ├── finishes/
│   │   ├── page.tsx                    ← Showcase of all surface finishes (Polished, Honed)
│   │   └── [slug]/
│   │       └── page.tsx                ← Detail page per finish type
│   │
│   ├── blogs/
│   │   ├── page.tsx                    ← Magazine/Blog listing
│   │   └── [slug]/
│   │       └── page.tsx                ← Markdown article reader
│   │
│   ├── applications/
│   │   ├── page.tsx                    ← Interactive application categories
│   │   └── [slug]/
│   │       └── page.tsx                ← Detail page (e.g. Luxury Kitchen Countertops)
│   │
│   └── projects/
│       ├── page.tsx                    ← Portfolio project showcase
│       └── [slug]/
│           └── page.tsx                ← Interactive case study
│
├── lib/                                ← ⭐ Data Collections (The Single Source of Truth)
│   ├── landing-pages-data.ts           ← Local SEO and landing page definitions
│   ├── product-data.ts                 ← Stone specs, origins, and sizes
│   ├── finish-data.ts                  ← Texture descriptions, pros/cons, and videos
│   ├── blog-data.ts                    ← Fully-written blog markdown articles
│   ├── team-data.ts                    ← Leadership profiles and direct contact URLs
│   ├── application-data.ts             ← Installation guides, matching stones, and galleries
│   └── project-data.ts                 ← Architect details, materials used, and case studies
```

---

## 📋 Collection Schemas

Each data collection must adhere to strict TypeScript interfaces to guarantee that the dynamic templates render flawlessly.

### 1. Products (`src/lib/product-data.ts`)
For listing and detailing individual natural stones.
```typescript
export interface Product {
  slug: string;
  name: string;
  pageTitle?: string;          // Scoped title override for heading & metadata
  type: 'marble' | 'granite' | 'quartzite' | 'onyx';
  origin: string;              // Country of origin (e.g., Italy, Brazil)
  primaryColor: string;
  finishesAvailable: string[]; // Slugs of finishes
  applications: string[];      // Slugs of applications
  sizes: string[];             // Available slab/tile dimensions
  specifications: {
    compressiveStrength?: string;
    waterAbsorption?: string;
    density?: string;
  };
  gallery: string[];           // Array of Unsplash or asset URLs
  description: string;         // Long-form copy
  metaTitle: string;
  metaDescription: string;
}
```

### 2. Finishes (`src/lib/finish-data.ts`)
For educating clients on surface textures.
```typescript
export interface Finish {
  slug: string;
  name: string;
  pageTitle?: string;          // Scoped title override for heading & metadata
  subtitle: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string[];           // Stone types best suited for this finish
  careInstructions: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
}
```

### 3. Local SEO Landing Pages (`src/lib/landing-pages-data.ts`)
To capture geo-specific and long-tail search intent.
```typescript
export interface SectionData {
  type: 'hero' | 'why-us' | 'products' | 'categories' | 'applications' | 'projects' | 'team' | 'contact';
  personality?: 'marble' | 'granite' | 'onyx' | 'clean';
  grid?: 'square' | 'asymmetric' | 'luxury' | 'none';
  variant?: 'ivory' | 'mahogany' | 'bronze';
  title?: string;
}

export interface LandingPageData {
  slug: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  sections: SectionData[];
}
```

### 4. Applications (`src/lib/application-data.ts`)
For room-specific and installation-based intent.
```typescript
export interface Application {
  slug: string;
  title: string;               // e.g. "Cladding & Facades"
  pageTitle?: string;          // Scoped title override for heading & metadata
  tagline: string;
  description: string;
  suitableStones: string[];    // Stone slugs
  maintenanceLevel: 'low' | 'medium' | 'high';
  technicalRequirements: string[];
  gallery: string[];
  metaTitle: string;
  metaDescription: string;
}
```

### 5. Projects (`src/lib/project-data.ts`)
For premium case studies and real-world galleries.
```typescript
export interface Project {
  slug: string;
  title: string;               // e.g. "Penthouse Onyx Installation"
  pageTitle?: string;          // Scoped title override for heading & metadata
  location: string;
  year: number;
  materialsUsed: string[];     // Stone slugs
  architect: string;
  scope: string;               // Brief overview
  challenge: string;
  solution: string;
  images: string[];
  metaTitle: string;
  metaDescription: string;
}
```

---

## 🗺️ Automatic SEO & Structured Data

To ensure every dynamic route has bulletproof SEO, all templates must leverage the dynamic metadata pattern and inject page-specific JSON-LD.

### Breadcrumbs Pattern
Every dynamic detail page must automatically inject a `BreadcrumbList` schema to define hierarchy for crawlers:
```tsx
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": `${BASE_URL}/products` },
    { "@type": "ListItem", "position": 3, "name": product.name, "item": `${BASE_URL}/products/${product.slug}` }
  ]
};

return (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    {/* Page Content */}
  </>
);
```

### Categorized Dynamic Sitemaps
Sitemap routes must be split by category to handle large numbers of dynamic pages without hitting Google Search Console limits. Refer to sitemap index guidelines inside `src/app/` for implementation rules.

---

## 🎨 The "SectionPersonality" Orchestration

Dynamic landing pages map section configurations using the `SectionPersonality` wrapper. This wraps the target section in a specific backdrop pattern (e.g. *Kashmiri Khatamband* on ivory, or *Mineral crystals* on mahogany) to give the page the desired aesthetic personality.

```tsx
// src/app/(landing-pages)/[slug]/page.tsx
export default function LandingPage({ params }: PageProps) {
  const pageData = landingPages[params.slug];
  if (!pageData) notFound();

  return (
    <>
      {pageData.sections.map((section, index) => {
        const { type, personality, grid, variant } = section;
        return (
          <SectionPersonality 
            key={`${type}-${index}`}
            personality={personality} 
            grid={grid}
            variant={variant}
            padding={type === 'hero' ? 'none' : 'large'}
          >
            {type === 'hero' && <HeroSlider />}
            {type === 'why-us' && <NumberedCardGrid />}
            {type === 'products' && <CoverflowCarousel />}
            {type === 'team' && <PortraitTeamGrid />}
            {/* ... */}
          </SectionPersonality>
        );
      })}
    </>
  );
}
```
