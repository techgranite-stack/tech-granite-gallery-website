# Keyword → URL Map

**Created:** 2026-08-30
**Companion docs:** [`Main_Strategy.md`](./Main_Strategy.md) · [`../Implementation/Local_SEO_Plan.md`](../Implementation/Local_SEO_Plan.md) · [`../Implementation/Technical_SEO_Plan.md`](../Implementation/Technical_SEO_Plan.md)

---

## Why this document exists

The repo had a strategy doc naming four keywords and a 1,000-line technical plan,
but nothing in between: **no record of which URL is meant to rank for what.**

That gap is what produced the site's central content defect. `/` and
`/marble-exporters-in-kishangarh` were both built from the same components and
shipped the same `<h1>` — two URLs competing for one intent, neither one
answering it. Without a map, nobody could see that.

**The rule this document enforces: one intent, one URL.** Before adding any
page, find its intent here. If a row already claims it, improve that page
instead of building a second one.

---

## Intent tiers

Search intent in this market splits four ways, and each tier wants a different
kind of page. Mixing them on one URL is what makes a page rank for nothing.

| Tier | The searcher wants | Page type | Example query |
|---|---|---|---|
| **Local-commercial** | To buy, from someone near a place | Landing / contact | "marble exporters in kishangarh" |
| **Product** | A specific named stone | Stone detail | "black galaxy granite price" |
| **Category** | To browse a class of stone | Listing / colour hub | "white marble india" |
| **Informational** | To learn before deciding | Blog / finish / application | "granite vs marble" |

---

## Tier 1 — Local-commercial (the priority)

Highest commercial value, lowest competition, and the tier the site was weakest
in. These are the pages that convert.

| Target keyword | URL | Status |
|---|---|---|
| marble exporters in kishangarh | `/marble-exporters-in-kishangarh` | ✅ rebuilt — real content, was a homepage duplicate |
| marble supplier kishangarh | `/marble-exporters-in-kishangarh` | ✅ same page, secondary term |
| granite manufacturer kishangarh | `/marble-exporters-in-kishangarh` | ✅ same page, secondary term |
| kishangarh marble market / marble mandi | `/marble-exporters-in-kishangarh` | ✅ covered in the "Why Kishangarh" block |
| marble supplier near me / contact number | `/contact` | ✅ new page — none existed |
| stone yard kishangarh address | `/contact` | ✅ new page |
| `{stone}` supplier in kishangarh | `/marble/[slug]`, `/granite/[slug]` | ✅ per-product local block on all 55 |
| `{stone}` price in kishangarh | `/marble/[slug]`, `/granite/[slug]` | ⚠️ block added; no price data on site — see Gaps |

**Do not** create `/marble-supplier-kishangarh`, `/granite-exporter-kishangarh`
or similar. They are the same intent as row 1. Splitting them across URLs divides
the signal and is the pattern Google classifies as doorway pages.

---

## Tier 2 — Product

55 stone pages, each with hand-written metadata and FAQs. Structurally the
strongest part of the site.

| Pattern | URL | Notes |
|---|---|---|
| `{stone name}` | `/marble/[slug]` · `/granite/[slug]` | Canonical home for every stone |
| `{stone name}` + price / slab / supplier | same | Served by the local block + FAQs |
| `{alt trade name}` | same | Carried in `altNames` → schema `alternateName` |

**Known conflict:** `statuario-luxe-marble` under `/collections/marble/` competes
with `/marble/statuario` on the same intent. One of the two should 301 to the
other. This is Decision Log #1 in the technical plan and is still open.

---

## Tier 3 — Category

| Target | URL |
|---|---|
| marble collection / indian marble / italian marble | `/marble` |
| granite varieties / granite collection | `/granite` |
| white marble india, black granite india, … (10 colours) | `/white-marble`, `/black-granite`, … |
| quartzite / sandstone / limestone / slate | `/collections/[category]` |
| polished, honed, flamed, leathered … | `/finishes/[slug]` |
| flooring, countertops, cladding … | `/applications/[slug]` |

The colour hubs are a genuine asset — 10 pages capturing high-volume
"`{colour}` marble/granite" queries that no individual stone page can own.

---

## Tier 4 — Informational

7 blog posts, including `why-kishangarh-marble`, which supports the Tier 1
landing page and should link to it directly.

---

## On-page rules

Derived from [`src/types/seo.ts`](../../src/types/seo.ts) and enforced by
`npm run seo:check`.

| Element | Rule | Enforced |
|---|---|---|
| `<title>` | ≤ 60 chars, unique | ✅ hard fail |
| meta description | 140–160 chars, unique | ⚠️ warn on length, hard fail on duplicate |
| `<h1>` | Exactly one, carries the target keyword | ✅ hard fail |
| canonical | Present, absolute, self-referential | ✅ hard fail |
| `<main>` | Exactly one (root layout supplies it) | ✅ hard fail |
| image `alt` | Present on every `<img>` | ✅ hard fail |
| JSON-LD | Parses | ✅ hard fail |

**The `| Granite Gallery` suffix has been dropped from 66 titles** that exceeded
60 characters. It was pure overhead: the site now emits Organization and WebSite
schema, from which Google derives the site name itself. Keep it only where the
title has room to spare.

---

## Gaps — worth doing next, in order

1. **No pricing signal anywhere.** "price" appears in the keyword lists of most
   stone pages, but no page contains a price, a range, or even "request a
   quote for pricing" as structured data. A `priceRange` or an
   `AggregateOffer` with `lowPrice`/`highPrice` would make those pages eligible
   for queries they currently only aspire to. Needs a business decision on
   whether to publish indicative pricing at all.
2. **91 meta descriptions outside the 140–160 band** (median 133 — mostly a bit
   short). Soft signal; Google rewrites descriptions freely. Low priority.
3. **36 live Unsplash hotlinks** in `src/lib/product-data.ts` across 6 of 41
   collection products. Image equity accrues to unsplash.com, and those 6
   products look like stock filler beside the other 35. This is P3-5.
4. **`/collections` vs `/marble` + `/granite` overlap** — one real conflict
   (`statuario-luxe-marble`). Decision Log #1.
5. **Founding year is stated four different ways** across `/about`,
   `/projects` and the homepage stats (2022 / 1985 / "30+ years" / "20+ years").
   This blocks `foundingDate` in the Organization schema and, more importantly,
   undermines the E-E-A-T signal it is meant to carry. Decision Log #3.
