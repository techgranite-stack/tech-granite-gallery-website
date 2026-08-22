# Design Tokens & Styles: Granite Gallery

This document serves as the absolute visual standard for the **Granite Gallery** design system. All visual patterns, typography rules, color definitions, and utility classes are matched exactly to the active project stylesheets (`src/styles/variables.css` and `src/styles/globals.css`).

---

## 🎨 Color Palette

We utilize a luxury natural-stone themed color palette composed of warm, earthy, and deep mineral pigments:

### Brand Palette
- **Ivory (Base Background)**: `#FFF8F0` / `rgb(255, 248, 240)` (`--ivory`)
- **Copper (Primary Accent)**: `#C08552` / `rgb(192, 133, 82)` (`--copper`)
- **Bronze (Secondary Accent)**: `#8C5A3C` / `rgb(140, 90, 60)` (`--bronze` / `--copper-dark`)
- **Mahogany (Deep Mineral Contrast)**: `#4B2E2B` / `rgb(75, 46, 43)` (`--mahogany`)

### Tone Extensions
- **Copper Light**: `#D9A87A` (`--copper-light`)
- **Copper Pale**: `#F0DBC8` (`--copper-pale`)
- **Mahogany Muted**: `rgba(75, 46, 43, 0.7)` (`--mahogany-muted`)
- **Off-White**: `#FAF5EE` (`--off-white`)
- **Glass Backdrop**: `rgba(255, 255, 255, 0.05)` with `rgba(255, 255, 255, 0.1)` border (`--glass-bg` / `--glass-border`)

### Neutrals
- **Stone 100**: `#F2EBE0` (Light borders, soft cards)
- **Stone 200**: `#E5D8C8` (Muted card borders)
- **Stone 300**: `#C8B89A` (Light text dividers)
- **Stone 500**: `#7A6858` (Body paragraph secondary)
- **Text Dark**: `#2A1A17` (High contrast text)
- **Text Mid**: `#5C3D34` (Secondary headings/descriptions)
- **Text Muted**: `#8C7060` (Body subtitles/descriptions)

---

## ✍️ Typography

- **Headings (h1, h2, h3, h4, h5, h6)**:
  - **Font**: `'Cormorant Garamond', 'Georgia', serif` (`--font-serif`)
  - **Weight**: `400`
  - **Color**: `var(--mahogany)`
- **Body & Interface**:
  - **Font**: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` (`--font-sans`)
  - **Weight**: `300` / `400` / `500` / `600`
  - **Color**: `var(--text-dark)`
- **Eyebrows (Section Badge)**:
  - Uppercase, spaced letter-spacing (`0.25em`), font-size `11px`, with horizontal lines.
- **Emphasis Text (`em` inside title)**:
  - Rendered in elegant italics with a `var(--copper)` color accent.

---

## 📐 Spacing & Layout Utilities

- **Section Padding**: `120px` vertical padding (`var(--section-py)`), auto-scaling to `80px` on tablets and `60px` on mobile.
- **Container**: `100%` width, centered (`margin: 0 auto`), max-width `1300px` (`--container-max`), with `40px` horizontal padding (`20px` on mobile).
- **Luxury Divider (`.copper-line`)**:
  - A subtle `48px` wide, `1px` high copper line used to segment subtitles.

---

## 🎛️ Interactive Primitives

### 1. Buttons (`.btn`)
- **btn-copper**: Filled copper background, morphs to darker copper on hover with a copper drop shadow (`--shadow-copper`).
- **btn-outline-copper**: Bare background with copper border, turns filled copper on hover.
- **btn-outline-ivory**: Transparent with ivory border, turns golden-copper on hover.
- **btn-mahogany**: Filled mahogany background, morphs to bronze on hover.

### 2. Shadows
- **shadow-sm**: `0 2px 12px rgba(75, 46, 43, 0.08)`
- **shadow-md**: `0 8px 32px rgba(75, 46, 43, 0.12)`
- **shadow-lg**: `0 20px 60px rgba(75, 46, 43, 0.18)`

---

## 🌀 Transitions & Anim Eases

- **Expo Ease**: `cubic-bezier(0.19, 1, 0.22, 1)` (`--ease-expo`)
- **Power3 Ease**: `cubic-bezier(0.25, 1, 0.5, 1)` (`--ease-power3` / `--transition`)
- **Slow Transition**: `0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)` (`--transition-slow`)
- **Scrollbar**: Scopes a super-sleek `5px` scrollbar Thumb utilizing `--copper` and Track utilizing `--ivory`.
