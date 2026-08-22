# Animation & Visual Patterns (Granite Gallery)

This document defines the high-end architectural interactions that give the Granite Gallery its "Luxury" feel.

## 1. GSAP Scroll Standards
- **Plugin Usage**: Always use `ScrollTrigger` and `useGSAP` hook for cleanup safety.
- **Ease Curves**: Use `expo.out` for large scaling items and `power3.out` for text/UI elements.
- **Stagger**: Standard stagger for card grids is `0.07s` to `0.1s`.

## 2. The "Ghost" Pattern
Used for background numbers or monograms.
- **Visuals**: Large font-size, low opacity (`0.1` to `0.15`).
- **Interaction**: Scale from `2.5` to `1.0` as the user scrolls into the section.
- **Color**: Dark Ivory on Light Ivory background.

## 3. 3D Coverflow Logic
For featured products and collections.
- **Perspective**: `transformPerspective: 1400`.
- **Rotation**: Active card is `0deg`, flanking cards rotate `-42deg` (left) and `42deg` (right).
- **Infinite Loop**: Use a "Continuous Index" with a modulo operation: `((index % total) + total) % total`.
- **Drag**: Logic must handle both `onMouseDown/onMouseMove` and `onTouchStart/onTouchMove`.

## 4. Magic Spotlight (Bento)
- **Primary Color**: Copper `rgba(192, 133, 82, opacity)`.
- **Implementation**: Mouse coordinates mapped to a `radial-gradient` in a CSS Variable.
- **Border Glow**: A separate overlay that masks the gradient to only show on the border edges.

## 5. Mobile Snapping & Infinite Loops
Used to convert grid stacks into sleek swipeable carousels.
- **Physics**: CSS scroll snapping (`scroll-snap-type: x mandatory`).
- **Tripling Copy**: Triple the list of members (`3 * N`) only when `isMobile` is active.
- **Debounced Snapping**: Highlight card centers in real-time, but defer the boundary reset jump by a `120ms` timeout. This performs the jump when scrolling is completely idle, avoiding scroll physics conflicts.
- **Layout-Agnostic Math**: Programmatically measure copy offsets: `const copyWidth = cards[N].offsetLeft - cards[0].offsetLeft`.

## 6. Heritage Watermark Patterns (Kashmiri)
Intricate cultural watermarks layered on top of clean ivory backdrops.
- **Lattice Grid (Khatamband)**: Intricate star-and-hexagon geometric pattern repeating in thin gold lines (`rgba(197, 160, 89, 0.12)`) at standard pattern units (`60px`).
- **Floral Paisley (Buta)**: Double-outlined Kashmiri Paisley watermarks placed subtly at margins (`x='5%'`, `x='85%'`) at a prominent `0.20` opacity to create custom heritage textures.
- **Stacking**: Sub-components must utilize relative positioning and `z-index: 1` to sit cleanly above background textures.
