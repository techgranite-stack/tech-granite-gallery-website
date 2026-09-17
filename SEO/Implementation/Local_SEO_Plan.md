# Local SEO Plan — Kishangarh

**Created:** 2026-08-30
**Scope:** Kishangarh, Rajasthan as the single anchor location
**Companion docs:** [`Technical_SEO_Plan.md`](./Technical_SEO_Plan.md) · [`../Strategy/Keyword_Map.md`](../Strategy/Keyword_Map.md)

---

## The strategic choice: depth, not breadth

Kishangarh only. No Delhi page, no Mumbai page, no Bangalore page — for now.

This is deliberate. The tempting move is 15 city landing pages, one per metro,
each a template with the city name swapped in. It is also the single fastest way
to get a site classified as **doorway pages**, and that penalty attaches to the
whole domain, not just the offending URLs.

Kishangarh is defensible in a way those pages would not be: the business has a
real facility there, a real address, a Google Business Profile with 46 reviews,
and a genuine claim on the city's reputation as Asia's largest marble market.
Every sentence on the Kishangarh page is checkable. That is what makes it rank,
and it is exactly what a Mumbai page would lack.

Expand later, one city at a time, only where there is something true to say —
a warehouse, staff on the ground, a body of delivered projects.

---

## Part 1 — On-site (shipped)

### 1.1 One source of truth for local facts

[`src/data/local-seo.ts`](../../src/data/local-seo.ts) *(new)*

The address previously existed in four places: a flat string in `site.ts`,
visible text in the Footer, an encoded Maps embed URL, and — critically — as
`address: 'Kishangarh, Rajasthan, India'` inside the Product schema's seller
node, where schema.org requires a `PostalAddress` object. Google discarded that
fourth copy silently.

NAP consistency is the core local ranking input. Google cross-references what
the site says against the Google Business Profile and third-party directories,
and drift between copies weakens the match. There is now one structured copy.

Two fields are deliberately `null`:

- **`openingHours`** — publishing hours in schema puts "Open now / Closes 6 pm"
  in the local pack. A customer who drives to Kishangarh on a guess has a
  genuinely bad experience. Stays null until the business confirms.
- **`foundingYear`** — the site currently asserts 2022, 1985, "30+ years" and
  "20+ years" on four different surfaces. Emitting a date that contradicts
  visible copy is worse than emitting none.

Both are one-line changes once someone confirms them.

### 1.2 Structured data

[`src/lib/structured-data.ts`](../../src/lib/structured-data.ts)

Before: Product, BreadcrumbList, FAQPage, Article, Person. **No Organization, no
LocalBusiness, no WebSite anywhere on the site** — for a business whose stated
strategy pillar #3 is local SEO.

| Node | Emitted on | Purpose |
|---|---|---|
| `Organization` `#organization` | Every page (root layout) | Identity + PostalAddress + areaServed |
| `WebSite` `#website` | Every page (root layout) | Ties domain to the organization |
| `LocalBusiness` `#localbusiness` | `/`, `/contact`, `/marble-exporters-in-kishangarh` | Premises, geo pin, local-pack eligibility |
| `Service` | The Kishangarh landing page | Pairs *what* with *where* |
| `Product` | 55 stone pages | Now with a resolvable seller and areaServed |

Three design decisions worth keeping:

- **LocalBusiness is not site-wide.** One authoritative node Google can resolve
  by `@id` beats 133 competing copies; duplicated LocalBusiness nodes are a
  known cause of Google picking none of them.
- **Product `seller` points at `#organization`, not `#localbusiness`.** The
  Organization node ships on every page, so the `@id` always resolves inside the
  page's own graph. Pointing at LocalBusiness would dangle on the 52 product
  pages that do not emit it. Organization carries the PostalAddress anyway, so
  no signal is lost.
- **No `aggregateRating`.** The 4.9 / 46 reviews in the footer come from the
  Google Business Profile. Google's policy prohibits marking up ratings you
  collected elsewhere or about yourself — it risks a manual action rather than a
  star snippet. The GBP surfaces those stars on its own.

### 1.3 Landing page engine

[`src/lib/landing-pages-data.ts`](../../src/lib/landing-pages-data.ts) ·
[`src/app/(landing-pages)/[slug]/page.tsx`](../../src/app/(landing-pages)/[slug]/page.tsx)

The old `LandingPageData` carried `{ slug, metadata, sections[] }`, where a
section was a component name plus a colour variant. A **layout** schema with
nowhere to put content. The route rendered `<HeroSlider />` and friends with no
props, so they fell back to the homepage's own data:

```
before                                    after
────────────────────────────────────      ────────────────────────────────────
/         H1 "Where Stone Meets…"         /         H1 "Premium Marble & Granite
/kishangarh H1 "Where Stone Meets…"                    from Kishangarh"
                                          /kishangarh H1 "Marble Exporters in
679 words, all shared with the homepage                Kishangarh"
"Kishangarh" ×4 — all in the footer       1,541 words unique
                                          "Kishangarh" ×34
```

The model now carries `hero` (with its own H1 and image alt), `intro`, `blocks`,
`showcase`, `tagline`, `localInfo`, `faqs`, `breadcrumb` and `service`. Adding a
second location page is a data edit, not a component change — but see the
strategic note above before adding one.

### 1.4 Homepage

The `<h1>` was *"Where Stone Meets Timeless Elegance"* — no material, no place,
while the `<title>` targeted "Premium Marble & Granite Kishangarh". The page's
two strongest on-page signals pointed at different things. The brand line now
runs as the sub-heading, where it still opens the page.

⚠️ The hero rotates its headline every 5.5s, so the `<h1>` text changes after
hydration. Only slide 1 is in the server HTML, so slide 1 is what Google reads —
**keep the primary keyword in slide 1 if those are ever reordered.**

### 1.5 Product pages — the biggest local surface

55 pages, and none of them carried any location text beyond the footer.
[`ProductLocalBlock`](../../src/components/sections/ProductLocalBlock/index.tsx)
adds a "Buy `{stone}` in Kishangarh" section to every one, generated from the
product's own fields plus the canonical local facts — specific per stone
(quarry origin, finishes, formats, dispatch route) without hand-writing 55
variants, and without inventing claims.

This targets the query shape that actually dominates commercial intent here:
`{stone} supplier in kishangarh`, `{stone} price in kishangarh`.

### 1.6 `/contact`

The site had **no contact route at all**. It is the conventional destination for
the website link on a Google Business Profile, the page "…near me" and
"…contact number" queries resolve to, and one of the pages Google checks when
corroborating the LocalBusiness schema against visible content.

### 1.7 Supporting fixes

| Fix | Why it matters locally |
|---|---|
| `PageHero` now renders its `breadcrumb` prop | The prop and its CSS both existed; only the markup was missing, so the site showed no visible breadcrumbs while emitting BreadcrumbList schema. Google prefers the two to agree. |
| Contact form no longer defaults to `contact@granitegallery.com` | A different address from the footer and the schema — and the "Request Catalogue" button mailed it. NAP consistency, and a live bug. |
| Footer links to `/contact` and the Kishangarh page from every page | Site-wide internal links are what mark these as primary pages rather than orphans. |
| 16 nested `<main>` elements removed | Invalid HTML; breaks Google's main-content extraction and landmark navigation. |
| `lang="en"` → `lang="en-IN"` | Matches `og:locale` and schema `inLanguage`. |

---

## Part 2 — Off-site (not code — someone must do this)

**On-site work alone will not move local rankings.** For local search the Google
Business Profile carries more weight than the website. These are ordered by
impact.

### 2.1 Google Business Profile — highest impact

- [ ] Confirm the listing is **claimed and verified**.
- [ ] Make the NAP match [`local-seo.ts`](../../src/data/local-seo.ts)
      **character for character**. Abbreviation differences ("Rd" vs "Road")
      measurably weaken the match.
- [ ] Set the website link to `https://granitegalleryindia.com/contact`.
- [ ] Primary category: **Marble supplier**. Secondary: Granite supplier,
      Stone supplier, Marble contractor.
- [ ] Confirm opening hours → then set `openingHours` in `local-seo.ts`.
- [ ] Upload ≥20 photos: the yard, gantry saws, polishing line, slabs racked,
      crated dispatch, the signage. Geotagged where possible. GBP photo volume
      and recency correlate strongly with local pack placement.
- [ ] Enable messaging; the business already runs on WhatsApp.
- [ ] Post weekly — new stock arrivals are natural GBP post material.

### 2.2 Reviews

Currently 4.9 across 46 reviews — good, and **the single strongest asset here.**

- [ ] Ask every completed buyer, in a WhatsApp follow-up with the review link.
- [ ] Reply to all of them, positive and negative. Reply rate is a ranking input.
- [ ] Aim for a steady trickle. 46 → 100 over six months beats 40 in one week,
      which reads as inauthentic.

### 2.3 Citations

Consistent NAP across directories is the third pillar after GBP and reviews.

- [ ] IndiaMART, TradeIndia, Justdial, Sulekha — the Indian B2B stone trade
      lives on these.
- [ ] CDOS / stone-industry association directories.
- [ ] Export council listings if the business is registered.
- [ ] Audit for existing duplicate or stale listings and merge them. Two
      listings with different phone numbers actively compete.

### 2.4 Local links

- [ ] Kishangarh Marble Association membership page.
- [ ] Trade-show and exhibition listings (Stona, India Stonemart).
- [ ] The landmark projects (Parliament, Central Vista, National War Memorial)
      are unusually strong link bait and are currently under-leveraged — a press
      or case-study push around them would earn links no competitor can match.

---

## Part 3 — Measurement

Record these **before** the next deploy so the delta is attributable.

| Metric | Where | Baseline |
|---|---|---|
| "marble exporters in kishangarh" position | Search Console → Queries | _record_ |
| Impressions on `/marble-exporters-in-kishangarh` | Search Console → Pages | _record_ |
| GBP: searches, views, direction requests, calls | GBP Insights | _record_ |
| Review count / average | GBP | 46 / 4.9 |
| Pages indexed | Search Console | 149 |
| Images indexed | Search Console | 0 (was robots-blocked; P0-1 fixed it) |

**Timeline.** Schema and content changes are picked up in 1–4 weeks. Local pack
movement is slower and GBP-driven — 2–4 months with consistent review flow.
Do not judge the landing page rewrite before six weeks.

---

## Open decisions

| # | Decision | Blocks |
|---|---|---|
| 1 | Confirm opening hours | `openingHoursSpecification` in LocalBusiness |
| 2 | Settle the founding year (2022 / 1985 / "30+ years") | `foundingDate`; also an E-E-A-T inconsistency users can see |
| 3 | Is the GSC DNS TXT verification actually in place? | All measurement |
| 4 | Are the Delhi NCR and Bangalore "centres" in the footer real premises? | If yes they belong in `areasServed` and may warrant their own pages; if not, the claim should come down |
| 5 | Publish indicative pricing? | Every `{stone} price` keyword the site targets but cannot serve |
