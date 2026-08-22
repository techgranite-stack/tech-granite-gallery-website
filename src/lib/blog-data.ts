// ============================================================
// src/lib/blog-data.ts
// Real architectural & stone selection blog articles.
// Each article is highly optimized for search keywords.
// ============================================================

export interface BlogPost {
  slug: string;
  title: string;
  pageTitle?: string;
  excerpt: string;
  longContent: string;  // Detailed markdown/formatted article text
  image: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  authorSlug?: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  ogImage?: string;
  tags: string[];
}

export const mockBlogFallback: BlogPost = {
  slug: 'choose-right-marble',
  title: 'How to Choose the Right Marble for Your Home',
  pageTitle: 'Selecting Premium Italian Marble — The Homeowner\'s Guide',
  excerpt: 'From Calacatta to Volakas — a comprehensive guide to picking the perfect Italian marble based on application, finish, and maintenance needs.',
  longContent: `Selecting marble for your residential or commercial project is more than just choosing a colour — it is a significant aesthetic and functional decision that will define your space for generations. Natural marble, with its unique veining, depth, and organic variations, is unparalleled in luxury. However, different stone types possess distinct mineral structures that make them suitable for specific installations.

## 1. Understand Marble Types & Grading
Imported marble (predominantly from Italy, Greece, Spain, and Turkey) is generally grouped into white marbles, beige/cream marbles, and exotic colored marbles.
- **Carrara White**: Soft blue-gray veining, exceptionally durable, dense, classic.
- **Statuario Luxe**: Dramatic bold charcoal veins on pure white background. The most sought-after variety for book-matching.
- **Volakas Classic**: Sourced from Greece, known for its diagonal warm-gray and burgundy veins. Offers excellent workability.

## 2. Choosing by Application Area
Where the marble is installed determines the required finish and sealing regime:
- **Kitchen Countertops**: We recommend choosing harder white quartzites or highly dense granites if maintenance is a concern. If you select white marble, it *must* be treated with a premium impregnating sealer and wiped clean immediately after contact with acidic liquids.
- **Living Room Flooring**: Perfect for highly polished large-format slabs. Large slab dimensions (e.g. 8x5 feet) minimise grout lines, creating a grand, seamless mirror effect.
- **Bathroom Vanities & Cladding**: Soft white marbles thrive here. A honed or satin finish provides a tactile, organic softness that complements contemporary plumbing fixtures.

## 3. Maintenance and Care Principles
All calcite-based natural stones are susceptible to "etching" — a chemical reaction when exposed to acidic substances (vinegar, lemons, wine). 
1. **Always Seal**: Natural stone requires a premium sealer applied at installation, and resealed every 1-2 years depending on traffic.
2. **pH Neutral Cleaners**: Clean using soft microfibre cloths and dedicated stone cleaners. Never use standard bathroom acid-based tile cleaners.`,
  image: '/images/blog/choose-right-marble.webp',
  date: 'May 2025',
  category: 'Marble Guide',
  readTime: '5 min read',
  author: 'Shrikant Dargar',
  authorSlug: 'shrikant-dargar',
  metaTitle: 'How to Choose the Right Marble for Your Home | Granite Gallery',
  metaDescription: 'A comprehensive homeowner\'s guide to selecting imported Italian marble. Durability, color palettes, finishes, and maintenance tips for luxury spaces.',
  tags: ['Italian Marble', 'Home Interiors', 'Design Guide', 'Kishangarh Marble']
};

export const blogPostsData: BlogPost[] = [
  {
    slug: 'choose-right-marble',
    title: 'How to Choose the Right Marble for Your Home',
    pageTitle: 'Selecting Premium Italian Marble — The Homeowner\'s Guide',
    excerpt: 'From Calacatta to Volakas — a comprehensive guide to picking the perfect Italian marble based on application, finish, and maintenance needs.',
    longContent: `Selecting marble for your residential or commercial project is more than just choosing a colour — it is a significant aesthetic and functional decision that will define your space for generations. Natural marble, with its unique veining, depth, and organic variations, is unparalleled in luxury. However, different stone types possess distinct mineral structures that make them suitable for specific installations.

## 1. Understand Marble Types & Grading
Imported marble (predominantly from Italy, Greece, Spain, and Turkey) is generally grouped into white marbles, beige/cream marbles, and exotic colored marbles.
- **Carrara White**: Soft blue-gray veining, exceptionally durable, dense, classic.
- **Statuario Luxe**: Dramatic bold charcoal veins on pure white background. The most sought-after variety for book-matching.
- **Volakas Classic**: Sourced from Greece, known for its diagonal warm-gray and burgundy veins. Offers excellent workability.

## 2. Choosing by Application Area
Where the marble is installed determines the required finish and sealing regime:
- **Kitchen Countertops**: We recommend choosing harder white quartzites or highly dense granites if maintenance is a concern. If you select white marble, it *must* be treated with a premium impregnating sealer and wiped clean immediately after contact with acidic liquids.
- **Living Room Flooring**: Perfect for highly polished large-format slabs. Large slab dimensions (e.g. 8x5 feet) minimise grout lines, creating a grand, seamless mirror effect.
- **Bathroom Vanities & Cladding**: Soft white marbles thrive here. A honed or satin finish provides a tactile, organic softness that complements contemporary plumbing fixtures.

## 3. Maintenance and Care Principles
All calcite-based natural stones are susceptible to "etching" — a chemical reaction when exposed to acidic substances (vinegar, lemons, wine). 
1. **Always Seal**: Natural stone requires a premium sealer applied at installation, and resealed every 1-2 years depending on traffic.
2. **pH Neutral Cleaners**: Clean using soft microfibre cloths and dedicated stone cleaners. Never use standard bathroom acid-based tile cleaners.`,
    image: '/images/blog/choose-right-marble.webp',
    date: 'May 20, 2025',
    category: 'Marble Guide',
    readTime: '5 min read',
    author: 'Shrikant Dargar',
    authorSlug: 'shrikant-dargar',
    metaTitle: 'How to Choose the Right Marble for Your Home | Granite Gallery',
    metaDescription: 'A comprehensive homeowner\'s guide to selecting imported Italian marble. Durability, color palettes, finishes, and maintenance tips for luxury spaces.',
    keywords: ['how to choose marble', 'marble selection guide', 'best marble for home', 'marble types india', 'marble maintenance tips', 'italian marble guide'],
    tags: ['Italian Marble', 'Home Interiors', 'Design Guide', 'Kishangarh Marble']
  },
  {
    slug: 'granite-vs-marble',
    title: 'Granite vs Marble: The Ultimate Comparison',
    pageTitle: 'Granite vs Marble — Differences in Durability, Cost & Maintenance',
    excerpt: 'Understand the key differences in durability, maintenance, aesthetics, and cost between granite and marble for making an informed decision.',
    longContent: `When it comes to selecting natural stone for high-traffic surfaces like flooring, staircases, and kitchen worktops, the debate almost always boils down to two giants: Granite and Marble. While both are elegant geological wonders, their composition, performance, and aesthetic impact are fundamentally different.

## 1. Geological Composition & Durability
- **Granite**: An igneous rock formed from slowly cooling molten magma. It consists mainly of quartz and feldspar, making it one of the hardest minerals on Earth. It is extremely scratch-resistant, heat-resistant, and chemically stable.
- **Marble**: A metamorphic rock formed when limestone is subjected to intense heat and pressure. It is composed primarily of calcium carbonate, which is significantly softer (Mohs hardness of 3-4 compared to Granite's 6-7) and highly reactive to acids.

## 2. Aesthetic Appeal & Patterns
- **Granite** typically displays a granular, speckled pattern with varied minerals catching the light. It has a flecked, multi-colored look that is excellent at hiding dust and small stains.
- **Marble** is prized for its soft, flowing veining patterns. It offers a classic, sophisticated, and clean look with deep visual transparency that granite rarely replicates.

## 3. The Countertop Battle
For kitchen worktops, **Granite** is the undisputed functional champion. It does not etch from spilled lemon juice, is highly stain-resistant, and hot pans can be placed directly on it. **Marble** in a kitchen will acquire a "patina" over time — minor scratches and etches that give it an aged, lived-in character. If you want a pristine white worktop without the maintenance, granite or quartzite is your best choice.

## 4. Maintenance Requirements
- **Granite**: Low maintenance. Seal once every 2-3 years. Simple soap and water is all that is required for daily upkeep.
- **Marble**: High maintenance. Seal annually. Clean exclusively with pH-neutral cleaners. Place coasters under glasses and trivets under hot pans.`,
    image: '/images/blog/granite-vs-marble.webp',
    date: 'April 15, 2025',
    category: 'Comparison',
    readTime: '7 min read',
    author: 'Amit Rathi',
    authorSlug: 'amit-rathi',
    metaTitle: 'Granite vs Marble: The Ultimate Stone Comparison Guide',
    metaDescription: 'Detailed comparison between granite and marble. Learn about scratch resistance, stain tolerance, sealing needs, pricing, and aesthetic values. Granite Gallery.',
    keywords: ['granite vs marble', 'marble or granite for kitchen', 'granite marble differences', 'which stone is better granite or marble', 'stone comparison guide india'],
    tags: ['Granite', 'Marble', 'Kitchen Countertops', 'Material Science']
  },
  {
    slug: 'stone-trends-2025',
    title: 'Stone Trends for Luxury Interiors in 2025',
    pageTitle: 'Luxury Stone Interior Trends 2025 — Granite Gallery',
    excerpt: 'Bookmatch marble walls, fluted stone panels, and warm earth tones — discover the stone design trends shaping luxury spaces this year.',
    longContent: `Luxury interior design is undergoing a significant shift. The sterile, cold minimalism of the early 2020s has given way to warm, tactile, and highly expressive spaces. Natural stone, as a primary medium of expression, is leading this renaissance. Based on our work with leading architects and designers visiting our Kishangarh yard, these are the key stone trends defining 2025.

## 1. The Rise of "Quiet Luxury" Exotic Quartzites
While Statuario and Calacatta White remain timeless classics, high-end residential interiors are increasingly incorporating colorful, exotic quartzites. Stones like Taj Mahal Quartzite, Patagonia, and Fusion Green are taking center stage. Their quartzite composition offers the hardness of granite but with the crystalline depth, transparency, and dramatic flows of high-end marble.

## 2. Fluted, Carved, and 3D Textured Stone
Smooth, flat polished surfaces are no longer the default. Designers are seeking tactile texture. 
- **Fluted Stone Panels**: Creating a ribbed texture on absolute black granite or beige travertine for bar fronts and bathroom vanity backdrops.
- **Artisanal Chiseled Finishes**: Hand-chiseled margins on exterior cladding that contrast with polished stone panels.

## 3. Warm Earth Tones and Dynamic Inlays
Bespoke marble inlays (pietra dura) are experiencing a massive resurgence in grand residential lobbies. Geometric and organic floral patterns composed of Jaisalmer Yellow, Rainforest Brown, Jade Green Onyx, and Volakas white are being specified for entryways, mimicking high-art custom rugs that will never fade or wear out.

## 4. Bold Book-Matched Feature Walls
Symmetry is nature's geometry. Book-matching — aligning two or four consecutive marble slabs so their veining mirror-images each other — is the ultimate statement wall. In 2025, book-matched exotic onyx slabs with integrated LED backlighting are popular for lounge feature walls, acting as live geological art panels.`,
    image: '/images/blog/stone-trends-2025.webp',
    date: 'March 10, 2025',
    category: 'Trends',
    readTime: '4 min read',
    author: 'Anuj Rathi',
    authorSlug: 'anuj-rathi',
    metaTitle: 'Natural Stone Interior Trends 2025 | Granite Gallery',
    metaDescription: 'Discover the latest natural stone design trends — backlit onyx, fluted granite panels, book-matched feature walls, and quiet luxury quartzites. Granite Gallery.',
    keywords: ['stone design trends 2025', 'luxury stone interior 2025', 'backlit onyx wall', 'book matched marble', 'fluted stone panels', 'quartzite design trends'],
    tags: ['Interior Design', 'Design Trends', 'Exotic Stone', 'Onyx']
  },
  {
    slug: 'sealing-maintenance-guide',
    title: 'Sealing & Caring for Natural Stone: A Complete Guide',
    pageTitle: 'How to Seal & Maintain Granite and Marble — Granite Gallery',
    excerpt: 'How to seal, clean, and protect granite and marble surfaces — the right products, the right routine, and the mistakes that dull your stone.',
    longContent: `Natural stone is one of the most durable surfaces you can install — but it is not maintenance-free. The good news: with the right routine, granite and marble stay flawless for decades. Most "stone problems" we are called about are actually care mistakes, not stone defects.

## 1. Why Sealing Matters
Granite and marble are porous to varying degrees. A penetrating (impregnating) sealer fills the micro-pores so spills sit on top long enough to be wiped away instead of soaking in and staining.
- **Granite**: Dense and stain-resistant, but lighter granites still benefit from sealing every 1–2 years.
- **Marble**: Softer and more porous — seal more frequently, and always after honing or polishing.

## 2. The Simple Water Test
Drop a tablespoon of water on the surface. If it beads up, your seal is intact. If it darkens the stone within a few minutes, it is time to re-seal. Run this test on countertops every few months.

## 3. Daily & Weekly Care
- Wipe spills immediately — especially acidic liquids (wine, citrus, vinegar, coffee) which etch marble.
- Clean with a pH-neutral stone cleaner and a soft cloth. **Never** use vinegar, lemon, bleach, or generic abrasive sprays.
- Use coasters, trivets, and chopping boards. Stone is heat- and scratch-resistant, not heat- and scratch-proof.

## 4. Fixing Common Issues
- **Etch marks** (dull spots on marble): polished out with a marble polishing powder.
- **Stains**: drawn out with a poultice before they set.
- **Lost shine**: professional re-polishing restores the original finish.

A few minutes of the right care keeps natural stone looking like the day it was installed.`,
    image: '/images/blog/sealing-maintenance-guide.webp',
    date: 'February 18, 2025',
    category: 'Care & Maintenance',
    readTime: '6 min read',
    author: 'Shrikant Dargar',
    authorSlug: 'shrikant-dargar',
    metaTitle: 'How to Seal & Maintain Granite and Marble | Granite Gallery',
    metaDescription: 'A complete guide to sealing, cleaning, and protecting natural stone. Learn the right products and routine to keep granite and marble flawless for decades.',
    keywords: ['how to seal granite', 'marble maintenance', 'natural stone care', 'how to clean marble countertops', 'stone sealer guide', 'remove stains from marble'],
    tags: ['Care & Maintenance', 'Granite', 'Marble', 'Sealing']
  },
  {
    slug: 'why-kishangarh-marble',
    title: 'Why Kishangarh Is India’s Marble Capital',
    pageTitle: 'Kishangarh Marble Market — India’s Stone Capital | Granite Gallery',
    excerpt: 'Inside the world’s largest marble market — how Kishangarh sources, processes, and exports premium stone to landmark projects across 30+ countries.',
    longContent: `When architects source premium natural stone in India, the trail almost always leads to one place: Kishangarh, Rajasthan. Home to the largest marble market in Asia, this is where raw blocks from quarries worldwide are graded, processed, and shipped to projects across the globe. Granite Gallery has been built in the heart of this ecosystem.

## 1. A Global Stone Hub in One City
Kishangarh consolidates the entire supply chain in one place — domestic marble and granite alongside imported Italian, Greek, Turkish, and Brazilian blocks. This concentration means unmatched selection and competitive pricing that single-quarry suppliers simply cannot match.

## 2. Italian-Grade Processing Technology
The reputation rests on processing, not just sourcing. State-of-the-art Italian gang-saws, resin lines, and automated polishing deliver slabs cut to precise thickness with mirror-grade finishes — the standard demanded by five-star hospitality and government projects.

## 3. Quality Grading & Selection
Every block is graded for veining consistency, soundness, and finish potential. For book-matched feature walls, slabs are kept in sequence so designers can preview the mirror pattern before a single piece ships.

## 4. Built for Export
With customs documentation, container loading, and material certifications handled in-house, Kishangarh stone reaches landmark installations in 30+ countries — from luxury resorts to national monuments. Sourcing here means going direct to the origin, with the scale and consistency large projects require.`,
    image: '/images/blog/why-kishangarh-marble.webp',
    date: 'January 22, 2025',
    category: 'Heritage',
    readTime: '5 min read',
    author: 'Vishal Rathi',
    authorSlug: 'vishal-rathi',
    metaTitle: 'Why Kishangarh Is India’s Marble Capital | Granite Gallery',
    metaDescription: 'Inside Kishangarh — the world’s largest marble market. How premium stone is sourced, processed with Italian technology, and exported to projects in 30+ countries.',
    keywords: ['Kishangarh marble', 'marble market India', 'Kishangarh stone', 'buy marble Kishangarh', 'India marble capital', 'marble exporter Rajasthan'],
    tags: ['Heritage', 'Kishangarh', 'Sourcing', 'Export']
  }
];
