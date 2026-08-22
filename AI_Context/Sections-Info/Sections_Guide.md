# Reusable Sections Guide: Granite Gallery

This document serves as the official catalog and usage guide for all **13 reusable section components** located in `src/components/sections/`. 

To maintain clean repository standards, each component scoped CSS module follows the strict **Parent Folder Naming Convention** (`ComponentFolder.module.css`).

---

## 🗃️ Active Sections Catalog

Every section accepts local props to render its content dynamically, with optional `className` styles as overrides to support the dynamic `SectionPersonality` system.

### 1. HeroSlider
* **Path**: `src/components/sections/HeroSlider/`
* **CSS Module**: `HeroSlider.module.css`
* **Visual Purpose**: Royal top-of-the-fold sliders displaying high-res natural stone slides. Uses premium text animations and elegant pagination.

### 2. CoverflowCarousel
* **Path**: `src/components/sections/CoverflowCarousel/`
* **CSS Module**: `CoverflowCarousel.module.css`
* **Visual Purpose**: Interactive 3D coverflow carousel showing stone collections (e.g. Statuario, Calacatta). Uses touch drag and perspective rotation mathematics.

### 3. HorizontalScrollGallery
* **Path**: `src/components/sections/HorizontalScrollGallery/`
* **CSS Module**: `HorizontalScrollGallery.module.css`
* **Visual Purpose**: Ultra-premium horizontal portfolio slider. Uses GSAP ScrollTrigger to pin and scrub project cards horizontally, using convex 3D spherical bends.

### 4. MarqueeTestimonials
* **Path**: `src/components/sections/MarqueeTestimonials/`
* **CSS Module**: `MarqueeTestimonials.module.css`
* **Visual Purpose**: Dynamic client testimonials. Features two rows of cards moving in opposite horizontal directions, pausing on touch/tap, with a luxurious Kashmiri woodcarving and paisley watermark backdrop.

### 5. PortraitTeamGrid
* **Path**: `src/components/sections/PortraitTeamGrid/`
* **CSS Module**: `PortraitTeamGrid.module.css`
* **Visual Purpose**: Elite team profiles. Utilizes a 4-column layout on desktop, converting into a smooth center-snapped horizontal swipe track on mobile with real-time active card highlights (lifting cards and converting them from grayscale to color).

### 6. HoverListReveal
* **Path**: `src/components/sections/HoverListReveal/`
* **CSS Module**: `HoverListReveal.module.css`
* **Visual Purpose**: High-end categorical stone lists. Displays categories vertically; hovering a row immediately reveals its mapped background image.

### 7. MosaicGrid
* **Path**: `src/components/sections/MosaicGrid/`
* **CSS Module**: `MosaicGrid.module.css`
* **Visual Purpose**: Asymmetric layout grids designed to highlight stone specifications, slab close-ups, and block details in a premium mosaic frame.

### 8. NumberedCardGrid
* **Path**: `src/components/sections/NumberedCardGrid/`
* **CSS Module**: `NumberedCardGrid.module.css`
* **Visual Purpose**: Card structures showing value propositions or masonry standards, indexed with large copper background numbers (`01`, `02`).

### 9. ArticleCardGrid
* **Path**: `src/components/sections/ArticleCardGrid/`
* **CSS Module**: `ArticleCardGrid.module.css`
* **Visual Purpose**: Dynamic blogs or catalog article grids displaying featured cover images, read times, and brief summaries.

### 10. BrandShowcase
* **Path**: `src/components/sections/BrandShowcase/`
* **CSS Module**: `BrandShowcase.module.css`
* **Visual Purpose**: Logo showcases of prestigious builders, architects, and global masonry partners.

### 11. BannerContactForm
* **Path**: `src/components/sections/BannerContactForm/`
* **CSS Module**: `BannerContactForm.module.css`
* **Visual Purpose**: Sleek quarry-inquiry form band containing text fields for quote requests and contact info.

### 12. ScrollingTagline
* **Path**: `src/components/sections/ScrollingTagline/`
* **CSS Module**: `ScrollingTagline.module.css`
* **Visual Purpose**: High-speed marquees scrolling bold brand taglines and natural-stone slogans.

### 13. StatsBand
* **Path**: `src/components/sections/StatsBand/`
* **CSS Module**: `StatsBand.module.css`
* **Visual Purpose**: Full-bleed trust number bars tracking yards quarried, years active, and projects delivered.

---

## 🎨 Layout Personalities & Overrides

Dynamic templates leverage `SectionPersonality` config parameters (`marble` | `granite` | `onyx` | `clean`) to color-theme these sections natively:
- **`marble`**: Off-white cards, gold accents, soft borders.
- **`granite`**: Bold mahogany structures, high contrast borders, copper indicators.
- **`onyx`**: Translucent glass backgrounds with heavy backdrop blurs on dark ivory backdrops.
- **`clean`**: Frameless layouts using high white spacing.
