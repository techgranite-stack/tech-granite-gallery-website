# WhatsApp & Enquiry Tracking — What Is Measured and How to Read It

Every "Chat Us" / "Get Quote" button on this site opens WhatsApp. This document
explains **what is instrumented**, **what you must switch on in GA4 once**, and
**which metrics to actually look at** month to month.

GA4 property: `G-HTXN3PXHEF`

---

## 📊 TL;DR — the four numbers that matter

| Question | Where to look | Metric |
|---|---|---|
| How many people wanted to chat? | Reports → Engagement → Events → `whatsapp_click` | Event count |
| How many people actually enquired? | Reports → Engagement → Events → `generate_lead` | Event count |
| Which button drives chats? | Explore → break `whatsapp_click` down by `source` | Event count by dimension |
| What % of visitors convert? | Reports → Engagement → Conversions | Key event rate |

Everything below is detail on top of these four.

---

## 🏗️ What is instrumented

### Events

| Event | Fires when | Parameters |
|---|---|---|
| `whatsapp_click` | Any `wa.me` link is clicked, anywhere on the site | `source`, `link_url`, `page_path` |
| `whatsapp_click` | The Quick Enquiry dialog's WhatsApp button is used | `source: quick_dialog`, `stone`, `application`, `page_path` |
| `generate_lead` | The enquiry form **succeeds** — after `/api/enquiry` confirms | `form`, `page_path`, `application_interest` |

`generate_lead` is deliberately placed inside the success branch. Validation
failures and failed sends never reach it, so this event counts **real
enquiries**, not submit attempts.

### Code map

| File | Role |
|---|---|
| `src/lib/analytics.ts` | `trackEvent()` / `trackWhatsAppClick()`. No-ops when gtag is absent (ad-blocker, SSR, GA disabled) so callers need no guards. |
| `src/components/analytics/GoogleAnalytics.tsx` | Loads gtag.js via `next/script`, `afterInteractive`. |
| `src/components/analytics/WhatsAppClickTracker.tsx` | One delegated, capture-phase click listener that catches **every** `wa.me` anchor site-wide. |
| `src/components/ui/QuickDialog/index.tsx` | Uses `window.open()`, not an anchor — calls `trackWhatsAppClick()` explicitly. |
| `src/components/sections/BannerContactForm/index.tsx` | Fires `generate_lead` after API success. |
| `src/config/site.ts` | `gaMeasurementId`, overridable with `NEXT_PUBLIC_GA_ID`. |

### Why a delegated listener

There are **1,632 `wa.me` anchors across 164 pages**. A single capture-phase
listener on `document` catches all of them, so adding a new CTA requires no
tracking code — see [Adding a new CTA](#-adding-a-new-whatsapp-cta).

---

## ⚙️ One-time GA4 setup (required — do this first)

Code alone does not produce conversion metrics. Two things must be configured
in the GA4 UI, and **neither backfills**, so do them before you start relying
on the numbers.

### 1. Register custom dimensions

**Admin → Data display → Custom definitions → Create custom dimension**

| Dimension name | Scope | Event parameter |
|---|---|---|
| WhatsApp Source | Event | `source` |
| Page Path | Event | `page_path` |
| Application Interest | Event | `application_interest` |
| Stone | Event | `stone` |

> ⚠️ Until `source` is registered you cannot break `whatsapp_click` down by
> button — every click collapses into one undifferentiated total.

> ⚠️ Custom dimensions only populate **from the day they are created**.
> Historical events keep the raw parameter but stay unreportable.

### 2. Mark the key events

**Admin → Data display → Events** → toggle **Mark as key event** on:

- `whatsapp_click`
- `generate_lead`

Events only appear in this list **after GA4 has seen them at least once**.
So: deploy → click one WhatsApp button → submit the form once → wait a few
minutes → then toggle.

---

## 🔍 Which metrics to check

### Daily / smoke test — is tracking alive?

**Reports → Realtime**

Appears within seconds. Use this to confirm a deploy did not break tracking:
click a WhatsApp button yourself and watch `whatsapp_click` appear under
"Event count by Event name". If nothing shows, tracking is broken — do not wait
24 hours to find out.

### Monthly — the headline numbers

**Reports → Engagement → Events**, date range = last month.

| Look at | Read it as |
|---|---|
| `whatsapp_click` event count | Total chat intents |
| `whatsapp_click` total users | People who wanted to chat (a person clicking 3 buttons counts once) |
| `generate_lead` event count | Confirmed enquiries |
| `session_start` | Traffic baseline for the ratio below |

**The ratio that matters:** `whatsapp_click` users ÷ total users = chat intent
rate. Track its trend, not its absolute value.

### Monthly — which button works

`source` is the whole point of the instrumentation. Standard reports will not
show it; build an exploration once and reuse it.

**Explore → Blank → Free form**
- **Dimensions:** `WhatsApp Source`, `Page Path`
- **Metrics:** Event count, Total users
- **Filter:** `Event name` exactly matches `whatsapp_click`
- **Rows:** `WhatsApp Source`

Read it against the instance counts in the table below. `stone_card` exists on
727 anchors and `hero_slider` on 18 — so raw click totals are misleading.
**Clicks per instance** is the real signal: a `hero_slider` with 40 clicks from
18 placements vastly outperforms `stone_card` with 200 from 727.

### Monthly — which stones and pages drive intent

Same exploration, swap rows to `Page Path`. This answers the commercially
useful question: *which stone pages actually generate enquiries?* Pair it with
`application_interest` on `generate_lead` to see which use cases convert.

---

## 🏷️ `source` label reference

Instance counts are anchors rendered across all 164 prerendered pages, as of
the last build. Use them as the denominator when comparing performance.

| `source` | Instances | Location |
|---|---:|---|
| `stone_card` | 727 | Per-stone card CTA |
| `navbar` | 164 | Header, every page |
| `footer` | 164 | Footer social, every page |
| `float` | 164 | Floating WhatsApp button, every page |
| `faq` | 115 | FAQ accordion |
| `contact_banner` | 98 | Contact banner CTA |
| `product_detail` | 97 | Product detail page CTA |
| `coverflow_carousel` | 22 | Homepage 3D carousel |
| `stone_listing` | 21 | Stone listing section |
| `hero_slider` | 18 | Hero — "Book a Video Call" |
| `team_grid` | 12 | Team grid member contact |
| `finish_detail` | 11 | Finish detail page |
| `project_detail` | 9 | Project case-study CTA |
| `blog_detail` | 5 | Blog article CTA |
| `team_detail` | 4 | Team member page |
| `about_page` | 1 | About page CTA |
| `quick_dialog` | — | Quick Enquiry dialog (`window.open`) |
| `contact_success` | — | Shown only after a successful form submit |
| `page_cta` | — | Fallback for any unlabelled anchor |

> Seeing `page_cta` in reports means a new WhatsApp link was added without a
> `data-wa-source` attribute. Treat it as a to-do, not a category.

> `product_hero_enquire`, `product_hero_spec_sheet` and `sticky_product_bar`
> are labelled in source but `ProductHero` and `StickyProductBar` are **not
> imported anywhere** — dead components. They will never appear in reports
> unless those components are wired up.

---

## ⚠️ How to read the numbers honestly

**These are click intents, not conversations.** GA4 sees the click; it cannot
see whether WhatsApp opened, whether a message was sent, or whether anyone
replied. Reconcile against actual WhatsApp Business inbox volume before
reporting a conversion rate to anyone.

**Expect 10–30% undercount.** Ad blockers and privacy browsers block gtag.js
entirely. Every GA4 number here is a floor, not a true total.

**Local dev reports to production.** `NEXT_PUBLIC_GA_ID` is set in `.env`, so
`npm run dev` sends hits to the live property. Either add an internal-traffic
filter in GA4 (Admin → Data Streams → Configure tag settings → Define internal
traffic) or set `NEXT_PUBLIC_GA_ID=` blank in `.env.local` while developing.

**Reports lag 24–48h.** Only Realtime is immediate. Empty standard reports on
day one are normal.

**Page views on route change** come from GA4 Enhanced Measurement's "Page
changes based on browser history events" (Admin → Data Streams → Enhanced
measurement). It must stay enabled — the app is a Next.js App Router SPA and
soft navigations fire no page load. No manual `page_view` is sent from code;
adding one would double-count.

**Search Console data does not appear here.** It is a separate product
requiring domain verification plus Admin → Product links → Search Console
links, and even then only surfaces two limited reports.

---

## ➕ Adding a new WhatsApp CTA

If it is a normal anchor, tracking is automatic — just label it:

```tsx
<a
  data-wa-source="my_new_section"   // omit this and it reports as page_cta
  href={`https://wa.me/919116622422?text=${encodeURIComponent(msg)}`}
  target="_blank"
  rel="noopener noreferrer"
>
  Chat Us
</a>
```

If it opens WhatsApp via JavaScript instead of an anchor, the delegated
listener cannot see it — report it explicitly:

```tsx
import { trackWhatsAppClick } from '@/lib/analytics';

trackWhatsAppClick('my_new_section', { stone: product.name });
window.open(url, '_blank', 'noopener,noreferrer');
```

Then add the new `source` value to the reference table above.

### Verifying coverage after a change

```bash
npx next build
# every wa.me anchor should carry a label — these two numbers must match
grep -roh 'href="https://wa\.me[^"]*"' .next/server/app --include='*.html' | wc -l
grep -roh 'data-wa-source=' .next/server/app --include='*.html' | wc -l
```
