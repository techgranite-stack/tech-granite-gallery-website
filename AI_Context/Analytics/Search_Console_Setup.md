# Google Search Console — Verification & Setup

Canonical host in production: **`https://www.granitegalleryindia.com`**

> ⚠️ The bare domain **308-redirects to `www`**. Production sets
> `NEXT_PUBLIC_SITE_URL=https://www.granitegalleryindia.com` on the hosting
> platform, which is why the live `robots.txt` emits
> `Host: https://www.granitegalleryindia.com`. The in-code fallbacks say
> non-`www` — harmless while the env var is set, since it takes precedence, but
> they should be reconciled so a missing env var cannot silently switch hosts.

**Verification status:** DNS TXT record is live and resolving —
`google-site-verification=2JGJpV310clN3uC7sbRWW0JQH0XveE_MPINMspXY_Vo`
confirmed via `dig @8.8.8.8`.

Two verification methods are used together, on purpose:

| Method | Covers | Configured in | Survives a bad deploy |
|---|---|---|---|
| **DNS TXT** | Whole domain — all subdomains, http + https | Registrar DNS | ✅ Yes |
| **Meta tag** | One URL prefix | `src/config/site.ts` → `layout.tsx` | ✅ Yes |

DNS TXT is the primary. The meta tag is a second, independent proof so that
losing DNS access, or migrating registrar, never costs you the property.

> The GA4 tag (`G-HTXN3PXHEF`) *can* also verify ownership, but it is not used
> for that. It only verifies while GA stays installed — disable GA and Search
> Console can revoke the property, taking indexing history and manual-action
> alerts with it. Verification should never depend on an analytics vendor.

---

## 1️⃣ DNS TXT — Domain property (do this first)

Creates a **Domain property**, the only type that covers `www` and non-`www`,
`http` and `https`, and every subdomain in a single property. Every other
method verifies exactly one prefix and would otherwise force you to maintain
several properties with split data.

1. Search Console → **Add property** → choose **Domain** (left-hand box).
2. Enter `granitegalleryindia.com` — no `https://`, no `www`.
3. Copy the TXT record it shows, e.g. `google-site-verification=abc123…`.
4. At the registrar's DNS panel, add:

   | Field | Value |
   |---|---|
   | Type | `TXT` |
   | Name / Host | `@` (or blank — means the root domain) |
   | Value | `google-site-verification=abc123…` |
   | TTL | Default (3600) |

5. Wait for propagation, then hit **Verify**.

Check propagation before clicking Verify, so a failed attempt does not send you
hunting for a non-existent problem:

```bash
dig +short TXT granitegalleryindia.com
# or
nslookup -type=TXT granitegalleryindia.com
```

> ⚠️ **Do not delete the TXT record after verifying.** Google re-checks
> periodically and will unverify the property if the record disappears.

> ⚠️ Keep any existing TXT records at `@` (SPF, DMARC, etc.). Add a *new*
> record — do not overwrite. A domain may hold multiple TXT records.

---

## 2️⃣ Meta tag — URL-prefix property

The plumbing is already in place; only the token is missing.

1. Search Console → **Add property** → **URL prefix** →
   `https://www.granitegalleryindia.com`
   (the `www` form — the bare domain only 308-redirects here, so a prefix
   property on the bare domain would track a host that serves no content)
2. Choose **HTML tag**. It shows:
   `<meta name="google-site-verification" content="TOKEN_HERE" />`
3. Copy **only the `content` value**, not the whole tag.
4. Set it either way:

   **Option A — env var (per environment):**
   ```bash
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=TOKEN_HERE
   ```
   Set on the hosting platform. `.env` is gitignored and never deployed, so a
   local-only value will not reach production.

   **Option B — committed default (`src/config/site.ts`):**
   ```ts
   googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "TOKEN_HERE",
   ```
   The token is public in page source anyway, and this cannot be forgotten at
   deploy time.

5. Deploy, then click **Verify**.

### How it renders

`src/app/layout.tsx` spreads `verification` in only when the token is non-empty,
so an unset token emits **no** meta tag rather than an empty one:

```tsx
...(siteConfig.googleSiteVerification
  ? { verification: { google: siteConfig.googleSiteVerification } }
  : {}),
```

Verify after deploying:

```bash
curl -sL https://www.granitegalleryindia.com | grep google-site-verification
```

It must appear inside `<head>`. Google will not accept it from `<body>`.

---

## ☁️ Cloudflare prepends to robots.txt

The live `robots.txt` is **not** purely what `src/app/robots.ts` generates.
Cloudflare injects a "Cloudflare Managed Content" block ahead of it, containing
the Content Signals policy and `Disallow: /` rules for `Google-Extended`,
`GPTBot` and `meta-externalagent`. The app's own rules follow underneath and
are intact.

This does **not** block Googlebot — `Google-Extended` only governs AI training,
not Search indexing. But be aware that editing `robots.ts` cannot remove that
block; it is controlled in the Cloudflare dashboard.

```bash
curl -sL https://www.granitegalleryindia.com/robots.txt
```

---

## 3️⃣ After verification

### Submit the sitemap

Search Console → **Sitemaps** → submit `sitemap.xml`.

The site serves a sitemap index plus per-section sitemaps (products, marble,
granite, blogs, projects, team, finishes, applications, colors). Submitting the
index is enough — Google follows it to the children.

### Link to GA4 (optional)

Admin → **Product links** → **Search Console links**. Then publish the two
Search Console reports into the GA4 report library, or they stay hidden.

This surfaces only two limited reports inside GA4. Queries, impressions,
average position and CTR live in Search Console itself — GA4 is not a
substitute.

---

## 🔗 Domain consistency (why this matters)

Search Console treats `granitegallery.com` and `granitegalleryindia.com` as
unrelated sites. If canonicals point at one domain while the sitemap declares
another, Google sees a sitemap full of off-site URLs and suppresses indexing.

All base-URL fallbacks now resolve to `https://granitegalleryindia.com`:

| File | Purpose |
|---|---|
| `src/config/site.ts` | `siteConfig.url` — single source of truth |
| `src/app/layout.tsx` | `metadataBase` — drives canonicals & OG URLs |
| `src/app/robots.ts` | `host` + sitemap location |
| `src/app/sitemap.xml/route.ts` and `src/app/sitemap/*.xml/route.ts` | Sitemap URLs |
| `src/lib/structured-data.ts` | JSON-LD `@id` / `url` |
| `src/app/team/[slug]/page.tsx`, `src/app/blogs/[slug]/page.tsx`, `src/app/projects/[slug]/page.tsx` | Inline JSON-LD |

Each reads `NEXT_PUBLIC_SITE_URL` first and falls back to the canonical domain.

> ⚠️ `.env` currently sets `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for local
> development. That is correct locally, but **if you set this variable on the
> hosting platform it must be `https://granitegalleryindia.com`** — otherwise
> every canonical, sitemap URL and JSON-LD `@id` in production points at
> localhost, which de-indexes the site.

### Verifying after any change

```bash
npx next build
grep -rhoE 'https://[a-z.]*granitegallery[a-z]*\.com' .next/server/app --include='*.html' | sort -u
# expect exactly one line: https://granitegalleryindia.com
```

---

## 📋 Known loose end

`src/components/sections/BannerContactForm/index.tsx` defaults its display
email to `contact@granitegallery.com` — the **old** domain. It was left
unchanged because it is a mailbox address, not a URL, and changing it could
point customers at an address nobody monitors.

`siteConfig.links.email` is `sales.granitegalleryindia@gmail.com`, and enquiry
notifications go to `tech.granitegalleryindia@gmail.com`. Decide which address
should be shown publicly and update the default prop to match.
