# Main SEO Strategy — Granite Gallery

**Documents in this folder**

| Doc | What it covers |
|---|---|
| This file | Audience, pillars, positioning |
| [`Keyword_Map.md`](./Keyword_Map.md) | Which URL ranks for what — **check before adding any page** |
| [`../Implementation/Local_SEO_Plan.md`](../Implementation/Local_SEO_Plan.md) | Kishangarh local SEO, on-site and off-site |
| [`../Implementation/Technical_SEO_Plan.md`](../Implementation/Technical_SEO_Plan.md) | Crawl, indexation, schema, images — phased |

---

## Target Audience
- Architects & Interior Designers
- Luxury Homeowners
- International Stone Importers (B2B)
- Construction Developers

## Core Pillars

1. **Topical Authority** — be the definitive resource for "Granite & Marble in
   Kishangarh" and "Luxury Stone Export from India."
2. **Visual SEO** — optimised slab imagery with descriptive alt text and
   metadata. *Gated on P4-3: 165 per-stone image folders are still empty, so 55
   stone pages share roughly seven room photos below the hero.*
3. **Local SEO** — Kishangarh, in depth. See the Local SEO plan for why the
   answer is one excellent city page rather than fifteen templated ones.
4. **Technical Excellence** — fast pages, clean Core Web Vitals, valid schema
   (Organization, LocalBusiness, WebSite, Product, FAQ, Breadcrumb).

## Positioning

The differentiator is that **the business manufactures rather than trades**:
its own facility inside the Kishangarh stone belt, block to container on one
site. Every page should be able to support that claim, because it is the one
thing most competitors in this market cannot say.

The landmark project list — Parliament of India, Central Vista, National War
Memorial, Jewar Airport, Taj Pushkar — is the strongest trust asset on the site
and is currently under-used outside `/projects`.

## Initial Keyword Focus

Full mapping in [`Keyword_Map.md`](./Keyword_Map.md). Headline targets:

| Keyword | URL |
|---|---|
| Marble Exporters in Kishangarh | `/marble-exporters-in-kishangarh` |
| Premium Granite Kishangarh | `/` |
| Italian Marble Exporters India | `/marble` |
| Best Marble for Flooring India | `/applications/flooring` |
| `{stone}` supplier / price in Kishangarh | `/marble/[slug]`, `/granite/[slug]` |

## Guardrail

`npm run build && npm run seo:check` — validates titles, descriptions,
canonicals, H1 count, landmark nesting, image alt and JSON-LD against the
**built HTML**. Wire it into CI.
