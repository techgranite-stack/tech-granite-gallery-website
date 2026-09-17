import { NavItem } from "@/types/navigation";
import { addressOneLine } from "@/data/local-seo";

export const siteConfig = {
  name: "Granite Gallery",
  description: "Manufacturer & exporter of premium Italian Marble, Granite, Onyx, and Exotic Stones. High-end architectural stone solutions from Kishangarh.",
  url: "https://granitegalleryindia.com",
  /**
   * GA4 measurement ID. Public by design (it ships in the page source), so it
   * lives here rather than in .env — which is gitignored and would silently
   * disable analytics on any deploy that forgot to set it. Override per
   * environment with NEXT_PUBLIC_GA_ID; set it to "" to disable the tag.
   */
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID ?? "G-HTXN3PXHEF",
  /**
   * Google Search Console "HTML tag" verification token — the `content` value
   * only, not the whole <meta> tag. Get it from Search Console → Settings →
   * Ownership verification → HTML tag. Leave "" and no meta tag is rendered.
   *
   * This verifies a single URL-prefix property. The DNS TXT record verifies the
   * whole domain (www + non-www, http + https) and is configured at the
   * registrar, not here — see AI_Context/Analytics/Search_Console_Setup.md.
   */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  mainNav: [
    // ── Collections mega menu ──────────────────────────────────────────────────
    {
      label: 'Collections',
      mega: true,
      href: '/collections',
      groups: [
        {
          heading: 'Indian Marble',
          href: '/marble',
          items: [
            { label: 'Makrana White', href: '/marble/makrana-white' },
            { label: 'Nizarana White', href: '/marble/nizarana-white' },
            { label: 'Agariya White', href: '/marble/agariya-white' },
            { label: 'Talai', href: '/marble/talai-marble' },
            { label: 'Umraya White', href: '/marble/umraya-white' },
            { label: 'View All Marble →', href: '/marble' },
          ],
        },
        {
          heading: 'Imported Marble',
          href: '/marble',
          items: [
            { label: 'Statuario', href: '/marble/statuario' },
            { label: 'Botticino', href: '/marble/botticino' },
            { label: 'Travertine', href: '/marble/travertine' },
            { label: 'Vietnam White', href: '/marble/vietnam-white' },
            { label: 'Honey Onyx', href: '/marble/honey-onyx' },
            { label: 'View All Imported →', href: '/marble' },
          ],
        },
        {
          heading: 'Granite',
          href: '/granite',
          items: [
            { label: 'Black Galaxy', href: '/granite/black-galaxy' },
            { label: 'Tan Brown', href: '/granite/tan-brown' },
            { label: 'Blue Pearl', href: '/granite/blue-pearl' },
            { label: 'Steel Grey', href: '/granite/steel-grey' },
            { label: 'Majestic Black', href: '/granite/majestic-black' },
            { label: 'View All Granite →', href: '/granite' },
          ],
        },
        {
          heading: 'More Stones',
          href: '/collections',
          items: [
            { label: 'Quartzite', href: '/collections/quartzite' },
            { label: 'Sandstone', href: '/collections/sandstone' },
            { label: 'Limestone', href: '/collections/limestone' },
            { label: 'Slate', href: '/collections/slate' },
            { label: 'Stone Veneer', href: '/collections/stone-veneer' },
            { label: 'All Collections →', href: '/collections' },
          ],
        },
      ],
    },

    // ── Finishes dropdown ──────────────────────────────────────────────────────
    {
      label: 'Finishes',
      href: '/finishes',
      mega: false,
      items: [
        { label: 'Mirror Polished', href: '/finishes/polished' },
        { label: 'Leathered', href: '/finishes/leathered' },
        { label: 'Flamed', href: '/finishes/flamed' },
        { label: 'Shot Blast', href: '/finishes/shot-blast' },
        { label: 'Bush Hammered', href: '/finishes/bush-hammered' },
        { label: 'Chiseled', href: '/finishes/chiseled' },
        { label: 'Acid Wash', href: '/finishes/acid-wash' },
        { label: 'Hydro Blast', href: '/finishes/hydro-blast' },
      ],
    },

    // ── Applications dropdown ──────────────────────────────────────────────────
    {
      label: 'Applications',
      href: '/applications',
      mega: false,
      items: [
        { label: 'Flooring', href: '/applications/flooring' },
        { label: 'Wall Cladding', href: '/applications/wall-cladding' },
        { label: 'Kitchen Countertops', href: '/applications/kitchen-countertops' },
        { label: 'Bathroom', href: '/applications/bathroom' },
        { label: 'Staircase', href: '/applications/staircase' },
        { label: 'Exterior Cladding', href: '/applications/exterior-cladding' },
        { label: 'Tabletops & Furniture', href: '/applications/tabletops' },
      ],
    },

    // ── Projects dropdown ──────────────────────────────────────────────────────
    {
      label: 'Projects',
      href: '/projects',
      mega: false,
      items: [
        { label: 'Taj Pushkar Resort & Spa', href: '/projects/taj-pushkar-resort' },
        { label: 'Parliament of India', href: '/projects/parliament-of-india' },
        { label: 'Central Vista — Kartavya Path', href: '/projects/central-vista-kartavya-path' },
        { label: 'Jewar International Airport', href: '/projects/jewar-international-airport' },
        { label: 'Palace on Wheels', href: '/projects/palace-on-wheels' },
        { label: 'National War Memorial', href: '/projects/national-war-memorial' },
        { label: 'Chola Sheraton Chennai', href: '/projects/chola-sheraton-chennai' },
        { label: 'View All Projects →', href: '/projects' },
      ],
    },

    // ── Blogs dropdown ────────────────────────────────────────────────────────
    {
      label: 'Blogs',
      href: '/blogs',
      mega: false,
      items: [
        { label: 'How to Choose the Right Marble', href: '/blogs/choose-right-marble' },
        { label: 'Granite vs Marble — Full Comparison', href: '/blogs/granite-vs-marble' },
        { label: 'Stone Trends for Luxury Interiors 2025', href: '/blogs/stone-trends-2025' },
        { label: 'View All Articles →', href: '/blogs' },
      ],
    },

    { label: 'Team', href: '/team' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] as NavItem[],

  links: {
    whatsapp: "https://wa.me/919116622422",
    phone: "+91 91166 22422",
    phoneRaw: "+919116622422",
    email: "sales.granitegalleryindia@gmail.com",
    // Derived from the structured copy in src/data/local-seo.ts so the flat
    // display string and the PostalAddress in the schema can never drift apart.
    address: addressOneLine,
    maps: "https://www.google.com/maps/place/Granite+Gallery+India/@26.6790384,74.8630417,16.28z/data=!4m6!3m5!1s0x396bf3652f4b26cd:0x9e6bd1cd0358ce90!8m2!3d26.6799656!4d74.8600186!16s%2Fg%2F11clvcz9nb",
    instagram: "https://www.instagram.com/granitegalleryindia/",
    youtube: "https://www.youtube.com/c/GraniteGalleryIndia",
  },
};

export type SiteConfig = typeof siteConfig;
