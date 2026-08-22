# Page Templates & Dynamic Section Composition

This document defines how **Collection Pages** are dynamically composed using defined templates and reusable section components. 

Since production data is not yet available, each template uses a **Starter/Mock Data Schema** that compiles instantly and renders clean structure, ready to be populated when real stone specs and copy are provided.

---

## 📋 Page Title & Metadata Blueprint

Every dynamic page must automatically generate its own target SEO metadata and a matching primary page header (`h1`). 

### Template Standard
```tsx
// Example dynamic metadata generator inside any collection page template (e.g. app/products/[slug]/page.tsx)
export async function generateMetadata({ params }): Promise<Metadata> {
  const item = productCollection.find((p) => p.slug === params.slug) || mockProductFallback;
  return {
    title: `${item.pageTitle || item.name} | Granite Gallery`,
    description: item.metaDescription || `Sourcing premium natural stone ${item.name} directly from our global quarries.`,
    alternates: { canonical: `/products/${item.slug}` },
  };
}
```

---

## 🏗️ Reusable Section Templates (Starter Blueprints)

Each collection type uses a defined template of reusable sections, wrapped in `SectionPersonality` components to apply the chosen brand styling.

### 1. Products Detail Template
For stones like *Statuario Marble* or *Volga Blue Granite*.

**Dynamic Section Stack:**
1. `HeroSlider` (configured for stone category)
2. `MosaicGrid` (renders stones specifications and slabs)
3. `CoverflowCarousel` (renders related/similar stones)
4. `BannerContactForm` (direct quarry price inquiry)

**Starter Mock Implementation (`src/app/products/[slug]/page.tsx`):**
```tsx
import { notFound } from 'next/navigation';
import { productsData, mockProductFallback } from '@/lib/product-data';
import SectionPersonality from '@/components/ui/SectionPersonality';
import HeroSlider from "@/components/sections/HeroSlider";
import MosaicGrid from "@/components/sections/MosaicGrid";
import CoverflowCarousel from "@/components/sections/CoverflowCarousel";
import BannerContactForm from "@/components/sections/BannerContactForm";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  // Gracefully fallback to mock product if the database is initially empty
  const product = productsData.find((p) => p.slug === params.slug) || mockProductFallback;
  
  if (!product && !mockProductFallback) notFound();

  return (
    <main>
      {/* 1. Hero: Displays pageTitle and high-res stone image */}
      <SectionPersonality personality={product.type === 'marble' ? 'marble' : 'granite'} padding="none">
        <HeroSlider 
          title={product.pageTitle || product.name}
          subtitle={`Premium natural stone sourced directly from ${product.origin}`}
          images={product.gallery}
        />
      </SectionPersonality>

      {/* 2. Specifications Grid */}
      <SectionPersonality personality="clean" padding="large" grid="luxury">
        <MosaicGrid 
          title="Technical Specifications"
          badge="Specs"
          description={`Engineering metrics for ${product.name}`}
          items={[
            { title: "Origin", value: product.origin },
            { title: "Sizes Available", value: product.sizes.join(', ') },
            { title: "Density", value: product.specifications.density || 'N/A' },
            { title: "Compressive Strength", value: product.specifications.compressiveStrength || 'N/A' }
          ]}
        />
      </SectionPersonality>

      {/* 3. Related Collections */}
      <SectionPersonality personality="onyx" padding="large">
        <CoverflowCarousel 
          title="Similar Stone Slabs"
          badge="Explore"
          category={product.type}
        />
      </SectionPersonality>

      {/* 4. Inquiry CTA */}
      <SectionPersonality personality="clean" padding="large" variant="mahogany">
        <BannerContactForm 
          title={`Inquire About ${product.name}`}
          subtitle="Get a direct quarry quote within 24 hours."
        />
      </SectionPersonality>
    </main>
  );
}
```

---

### 2. Surface Finishes Detail Template
For textures like *Leathered*, *Flamed*, or *Polished*.

**Dynamic Section Stack:**
1. `HeroSlider` (finish texture close-up)
2. `NumberedCardGrid` (pros, cons, and suitabilities)
3. `HorizontalScrollGallery` (showcase of slabs utilizing this finish)
4. `BannerContactForm` (technical care consultation)

**Starter Mock Implementation (`src/app/finishes/[slug]/page.tsx`):**
```tsx
import { finishesData, mockFinishFallback } from '@/lib/finish-data';
// Renders similar logic wrapping:
// NumberedCardGrid for Pros & Cons
// HorizontalScrollGallery for applied showcase
```

---

### 3. Application Detail Template
For rooms like *Luxury Kitchen Countertops* or *Bookmatched Wall Facades*.

**Dynamic Section Stack:**
1. `HeroSlider` (breathtaking architectural layout)
2. `MosaicGrid` (installation criteria & stone suitability guidelines)
3. `CoverflowCarousel` (highly recommended stone slabs)
4. `BannerContactForm` (specialist masonry booking)

**Starter Mock Implementation (`src/app/applications/[slug]/page.tsx`):**
```tsx
import { applicationsData, mockApplicationFallback } from '@/lib/application-data';
```

---

### 4. Case Study Projects Detail Template
For custom architectural stone case studies.

**Dynamic Section Stack:**
1. `HeroSlider` (completed project hero overview)
2. `HorizontalScrollGallery` (structural process layout)
3. `MarqueeTestimonials` (architect/client testimonials)
4. `BannerContactForm` (portfolio project consultation)

**Starter Mock Implementation (`src/app/projects/[slug]/page.tsx`):**
```tsx
import { projectsData, mockProjectFallback } from '@/lib/project-data';
```

---

## 🗄️ Starter Fallbacks & Mock Data (No Data Initially)

To guarantee compile stability when `productsData` or other arrays are empty, each data file must define a **compulsory fallback object**:

```typescript
// Example: src/lib/product-data.ts
export const mockProductFallback: Product = {
  slug: 'carrara-white-marble',
  name: 'Carrara White Marble',
  pageTitle: 'Statuesque Carrara White Italian Marble',
  type: 'marble',
  origin: 'Italy',
  primaryColor: 'White & Grey Veins',
  finishesAvailable: ['polished', 'honed'],
  applications: ['kitchen-countertops', 'bathroom-flooring'],
  sizes: ['3000x1800mm', '600x600mm'],
  specifications: {
    density: '2.7 g/cm³',
    compressiveStrength: '115 MPa'
  },
  gallery: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200'],
  description: 'A timeless Italian classic, Carrara Marble features dynamic grey veining overlaying a brilliant warm-white backdrop.',
  metaTitle: 'Carrara White Marble Slabs Exporters | Granite Gallery',
  metaDescription: 'Direct sourcing of Statuesque Carrara White Italian Marble slabs from Kishangarh. Premium finishes available.'
};

export const productsData: Product[] = []; // Initially empty, resolves to mockProductFallback
```
