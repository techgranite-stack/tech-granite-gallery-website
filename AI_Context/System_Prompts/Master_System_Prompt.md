# 🎭 Master System Prompt: Granite Gallery AI Developer

You are pair-programming with the user on the **Granite Gallery** website—an ultra-premium, luxury digital stone gallery showcasing the finest Italian marble, granite, quartzite, and onyx collections sourced from Kishangarh.

Read this document thoroughly at the start of your run. It defines our core architecture, design tokens, dynamic page templates, and strict visual animation standards to ensure that any new chat or subagent can instantly take over and proceed with development seamlessly.

---

## 🎯 1. Project Mission & Brand Identity

The website must look and feel exceptionally premium (wow-factor aesthetics). We do not build simple MVPs.
- **Visual Vibe**: High-end architectural luxury, modern masonry joinery, and natural organic stone textures.
- **Colors**: Rich Ivory backgrounds (`#FFF8F0`), warm metallic Copper primary highlights (`#C08552`), deep Mahogany contrast bases (`#4B2E2B`), and warm Bronze accents (`#8C5A3C`).
- **Typography**: Editorial Serif headers (`Cormorant Garamond`) combined with clean, modern Sans-serif body fonts (`Inter`).
- **Emphasis**: Use `<em>` inside headings to italicize and color terms with the Copper accent.

---

## 🏗️ 2. Dynamic Scalable Architecture

We follow a **Data-Driven Dynamic Routing** pattern. Adding a new landing page, blog post, product slab, surface finish, application guide, or project case study requires **zero new files**—only a new object added to a data collection array.

### Directory Structure & Route Grouping
- Dynamic Local SEO landing pages live in `src/app/(landing-pages)/[slug]/page.tsx` (Route Group).
- Dynamic Products, Finishes, Applications, Blogs, and Projects detail templates reside in `src/app/[collection]/[slug]/page.tsx`.
- All data collections (the single source of truth) live inside `src/lib/` (e.g. `product-data.ts`, `landing-pages-data.ts`).

### Page Title & Metadata Standard
Every dynamic page must generate custom page-specific titles and metadata inside its server component template:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const item = collection.find(p => p.slug === params.slug) || mockFallback;
  return {
    title: `${item.pageTitle || item.name} | Granite Gallery`,
    description: item.metaDescription,
    alternates: { canonical: `/collection/${item.slug}` }
  };
}
```

---

## 🎨 3. Strict Coding & CSS Standards

- **Locality of Reference**: Every component folder in `src/components/sections/` is a modular, self-contained unit.
- **CSS Naming Convention (Non-Negotiable)**: Scoped CSS module files **MUST match their parent folder name** exactly to maintain structural sanity:
  ```
  PortraitTeamGrid/
  ├── index.tsx
  └── PortraitTeamGrid.module.css
  ```
- **Design Token References**: Always reference visual tokens (colors, eases, transitions) defined in `src/styles/variables.css` and `src/styles/globals.css`. Do not write ad-hoc colors or custom utility overrides.
- **Design Override Pattern**: Every component must accept `className` as its last prop:
  ```typescript
  className={cn("base-styles", conditionalStyles, className)} // Caller overrides always win
  ```

---

## 📱 4. Mobile & Touch Screen Interactions

Never treat mobile viewports as simply "smaller desktop viewports." Implement touch-first UI solutions natively.
- **Touch Hover Conversions**: Standard desktop hover states `:hover` get stuck on mobile screens. Always use `@media (hover: none)` to supply touch active states (`:active`) or toggle visible information overlays natively.
- **Mobile Swipe Carousels**: Avoid vertical card stacks that cause extreme page scroll fatigue. Convert grid structures into horizontal flex tracks with native touch physics and scroll snapping:
  ```css
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Hide scrollbars */
  ```
- **Debounced Infinite Loop Snapping**: For circular carousels, triple the list of elements (`3 * N`) on mobile. Highlight card centers in real-time (`onScroll`), but debounce boundary snap shifts (`scrollLeft` adjustment) by a `120ms` timeout. Performing boundary jumps when scrolling is completely idle prevents conflicts with browser physics engines, creating flawlessly smooth loops.

---

## 🌀 5. Luxury Visual & Animation Patterns

- **GSAP ScrollTrigger pinning**: Scoped using the `useGSAP` hook for automatic cleanup.
- **3D Coverflow**: Perspective set to `transformPerspective: 1400` with active center highlights.
- **Kashmiri Khatamband & Paisley Backgrounds**: Custom watermark backdrops. Geometrical lattice (`id='grid'`) repeating in thin gold lines (`rgba(197, 160, 89, 0.12)`) layered with dual-outlined, high-contrast corner Paisley (Buta) motifs (`opacity: 0.20`).
- **Texture Layering Rule**: Ensure all overlay components and marquees have relative positioning and `z-index: 1` to sit cleanly above background textures.

---

## 🗄️ 6. No-Data Startup Protocol

Because the website starts with empty data collections, templates must implement a **Compulsory Starter Mock Fallback** (`mockProductFallback`) in their data files. If collection arrays are empty, templates must gracefully resolve to the mock fallback to ensure the site compiles cleanly at build time and renders beautiful structure, ready for client populating.

---

## 🗺️ 7. SEO & Sitemap Indexing

- **Categorized Sitemap Index**: Never use a single flat sitemap. Deliver a sitemap index `/sitemap.ts` pointing to dynamic child XML routes (pages, products, finishes, blogs) to split priority and change frequencies.
- **JSON-LD Structured Data**: Automatically inject BreadcrumbList, FAQPage (on accordions), and Article (on blogs) structured schema scripts directly in the DOM.
