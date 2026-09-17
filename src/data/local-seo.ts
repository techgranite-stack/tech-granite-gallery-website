// ============================================================
// src/data/local-seo.ts
//
// Single source of truth for every Local-SEO fact about the business.
//
// Why this file exists: before it, the same address existed as a flat string in
// `site.ts`, again as visible text in the Footer, again inside a Google Maps
// embed URL, and a fourth time as `address: 'Kishangarh, Rajasthan, India'`
// inside the Product schema's seller node — where schema.org requires a
// PostalAddress object, so Google discarded it. Four copies, one of them
// invalid, none of them machine-readable.
//
// NAP (Name / Address / Phone) consistency is the core ranking input for local
// search: Google cross-references what your site says against your Google
// Business Profile and third-party directories. Any drift between those copies
// weakens the match. Import from here so there is exactly one copy to keep in
// sync with the GBP listing.
// ============================================================

/**
 * Structured postal address — the shape schema.org/PostalAddress expects.
 *
 * ⚠️ Do NOT tidy the wording of `streetAddress`. It is a verbatim split of the
 * string already published in `siteConfig.links.address` and the footer, which
 * is presumably also what sits on the Google Business Profile and in existing
 * directory citations. Local ranking depends on those copies matching, and
 * Google compares them as text — "Khasra No.948, 4" and "Khasra No. 948/4" are
 * not the same string to it. Improving the punctuation here would quietly
 * weaken the NAP match rather than help it.
 *
 * If the address genuinely needs reformatting, change it on the Google Business
 * Profile and in the directory listings first, then mirror it here.
 */
export const businessAddress = {
  streetAddress: 'Khasra No.948, 4, MEGA Highway, Tehsil, Ralawata',
  addressLocality: 'Kishangarh',
  addressRegion: 'Rajasthan',
  postalCode: '305801',
  addressCountry: 'IN',
} as const;

/**
 * Geo coordinates of the Kishangarh facility.
 * Extracted from the `!3d…!4d…` segment of `siteConfig.links.maps` — that is
 * the authoritative pin Google already associates with the business.
 */
export const businessGeo = {
  latitude: 26.6799656,
  longitude: 74.8600186,
} as const;

/**
 * Opening hours for `openingHoursSpecification`.
 *
 * ⚠️ Deliberately `null` until the business confirms them.
 *
 * Publishing hours in schema is not a cosmetic choice — Google surfaces
 * "Open now / Closes at 6 pm" directly in the local pack, and a customer who
 * drives to Kishangarh on a wrong guess has a genuinely bad experience. An
 * absent field costs a small amount of rich-result completeness; a wrong field
 * costs trust. So this stays null until someone verifies it.
 *
 * To enable, replace with e.g.:
 *   export const openingHours = [
 *     { days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
 *       opens: '09:30', closes: '18:30' },
 *   ];
 */
export const openingHours: {
  days: string[];
  opens: string;
  closes: string;
}[] | null = null;

/**
 * Founding year for `foundingDate`.
 *
 * ⚠️ Deliberately `null` — the site currently states three different answers:
 *   • /about hero .............. "2022 Granite Gallery Est."
 *   • /projects meta ........... "premium natural stone since 1985"
 *   • /about stats ............. "30+ Years Family Heritage"
 *   • homepage trust stats ..... "20+ Years Experience"
 *
 * Emitting a `foundingDate` that contradicts visible on-page copy is worse than
 * emitting none. Pick one, make the four surfaces above agree, then set it here.
 * (Decision Log #3 in SEO/Implementation/Technical_SEO_Plan.md.)
 */
export const foundingYear: number | null = null;

/**
 * The primary local search target. Everything in the Kishangarh landing page
 * and the product-page local blocks reads from here.
 */
export const primaryLocation = {
  city: 'Kishangarh',
  district: 'Ajmer',
  region: 'Rajasthan',
  country: 'India',
  /** How the location is referred to in body copy. */
  label: 'Kishangarh, Rajasthan',
  /** Nearest airport — used in the "how to reach us" block. */
  airport: 'Kishangarh Airport (KQH)',
  /** Genuine, checkable context about why this city matters for stone. */
  context:
    "Kishangarh in Rajasthan's Ajmer district is Asia's largest marble market — a single stone belt processing and dispatching the bulk of India's marble output, from Makrana white to imported Italian blocks re-cut on site.",
} as const;

/**
 * Areas the business genuinely serves, in order of proximity.
 *
 * Kept honest on purpose. `areaServed` is a claim Google can and does check
 * against reviews, GBP service areas and delivery evidence. Listing cities you
 * cannot actually supply is the fastest way to have local pages reclassified as
 * doorway pages, which damages the whole domain rather than just those pages.
 */
export const areasServed = [
  { name: 'Kishangarh', type: 'City' },
  { name: 'Ajmer', type: 'City' },
  { name: 'Jaipur', type: 'City' },
  { name: 'Rajasthan', type: 'State' },
  { name: 'India', type: 'Country' },
] as const;

/**
 * Dispatch/logistics facts used in the product-page local block. These convert
 * a generic product page into one that answers a location-qualified query
 * ("black galaxy granite price in kishangarh") with something specific.
 */
export const dispatch = {
  /** Nearest container freight / dry port for export consignments. */
  port: 'Mundra & Kandla ports, Gujarat',
  /** Rail head used for domestic bulk dispatch. */
  railhead: 'Kishangarh (KSG) railhead',
  /** Highway the facility sits on — already in the street address. */
  highway: 'MEGA Highway (NH-448 corridor)',
} as const;

/** Google Business Profile signals shown on-site. Keep in sync with the GBP. */
export const googleBusinessProfile = {
  ratingValue: 4.9,
  reviewCount: 46,
} as const;

/**
 * Address as a single display line, rebuilt from the structured parts.
 *
 * Formatted to reproduce `siteConfig.links.address` exactly — region and
 * postcode separated by a space, not a comma — so the string rendered on
 * /contact and the landing page is byte-identical to the one in the footer.
 */
export const addressOneLine =
  `${businessAddress.streetAddress}, ${businessAddress.addressLocality}, ` +
  `${businessAddress.addressRegion} ${businessAddress.postalCode}`;
