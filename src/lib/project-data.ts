// ============================================================
// src/lib/project-data.ts
// Real landmark project case studies for Granite Gallery.
// Source: Company records (handwritten notes)
// Projects: Taj Pushkar, Palace on Wheels, Parliament, Central Vista,
//           Jewar Airport, Chola Sheraton, National War Memorial, etc.
// ============================================================

export interface Project {
  slug: string;
  title: string;
  pageTitle?: string;
  category: 'hospitality' | 'government' | 'infrastructure' | 'residential' | 'heritage';
  location: string;
  year?: number;
  scope: string;
  challenge: string;
  solution: string;
  materialsUsed: string[];   // Stone slugs / descriptions
  finishesUsed: string[];    // Finish slugs
  area?: string;             // Area covered e.g. "12,000 sq ft"
  thickness?: string;        // Slab thickness for the specs-box fallback
  specs?: { key: string; val: string }[];  // Architectural Specifications rows; falls back to a generic set
  architect?: string;
  images: string[];
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  ogImage?: string;
  size: string;              // Display badge: 'Landmark', 'Mega Project', etc.
}

// ── Compulsory Starter Mock Fallback ──────────────────────────
export const mockProjectFallback: Project = {
  slug: 'taj-pushkar-resort',
  title: 'Taj Pushkar Resort & Spa',
  pageTitle: 'Taj Pushkar — Luxury Stone Supply & Installation',
  category: 'hospitality',
  location: 'Pushkar, Rajasthan',
  year: 2022,
  scope: 'Complete stone supply & installation — lobby flooring, pool deck, spa interiors, and outdoor terraces.',
  challenge: 'The resort demanded a cohesive stone palette that evoked Rajput heritage while meeting international five-star luxury standards. All installations needed to be completed within a strict pre-opening timeline.',
  solution: 'We sourced a combination of Makrana White Marble for the grand lobby, Kota Stone for the pool deck, and custom mosaic inlay panels for the spa — all processed at our Kishangarh facility to exact architectural specifications.',
  materialsUsed: ['Makrana White Marble', 'Kota Stone', 'Rainforest Brown', 'Absolute Black Granite'],
  finishesUsed: ['polished', 'shot-blast', 'leathered'],
  area: '18,000 sq ft',
  architect: 'Taj Group Architecture Division',
  images: [
    '/images/projects/taj-pushkar-resort/Taj-Pushkar-project_1.webp',
    '/images/projects/taj-pushkar-resort/Taj-Pushkar-project_2.webp',
    '/images/projects/taj-pushkar-resort/Taj-Pushkar-project.webp',
  ],
  heroImage: '/images/projects/taj-pushkar-resort/Taj-Pushkar-Hero.webp',
  metaTitle: 'Taj Pushkar Resort Stone Supply — Granite Gallery Portfolio',
  metaDescription: 'Granite Gallery supplied and installed premium natural stone for the Taj Pushkar Resort & Spa — Makrana Marble, Kota Stone & bespoke mosaic inlays.',
  size: 'Landmark',
};

// ── Real Landmark Projects ─────────────────────────────────────
export const projectsData: Project[] = [
  {
    slug: 'taj-pushkar-resort',
    title: 'Taj Pushkar Resort & Spa',
    pageTitle: 'Taj Pushkar Resort — Field Stone Landscape',
    category: 'hospitality',
    location: 'Pushkar, Rajasthan',
    scope: 'Complete Field Stone landscape for Taj Pushkar Resort & Spa — every piece calibrated and numbered, hand-fitted up to around 45 feet in height, and installed entirely chemical-free by our team.',
    challenge: 'Wrapping a luxury resort landscape in natural Field Stone meant every irregular piece had to be calibrated and numbered so it locked precisely into place. Much of the work sat at height — up to roughly 45 feet — and had to be built without chemical adhesives that would compromise the natural, heritage character of the stone.',
    solution: 'Our team took complete responsibility for the resort\'s entire landscape in Field Stone — calibrating and numbering every piece, raising the scaffolding, and hand-fitting each stone with skilled labour up to around 45 feet in height. The full installation was completed chemical-free, to exacting technical standards and a flawless natural finish.',
    materialsUsed: ['Field Stone'],
    finishesUsed: [],
    specs: [
      { key: 'Material', val: 'Field Stone' },
      { key: 'Preparation', val: 'Calibrated & numbered, piece by piece' },
      { key: 'Install Height', val: 'Up to ~45 ft' },
      { key: 'Method', val: 'Scaffolded · hand-fitted · chemical-free' },
    ],
    images: [
      '/images/projects/taj-pushkar-resort/Taj-Pushkar-project_1.webp',
      '/images/projects/taj-pushkar-resort/Taj-Pushkar-project_2.webp',
      '/images/projects/taj-pushkar-resort/Taj-Pushkar-project.webp',
    ],
    heroImage: '/images/projects/taj-pushkar-resort/Taj-Pushkar-Hero.webp',
    metaTitle: 'Taj Pushkar Resort — Field Stone Landscape | Granite Gallery',
    metaDescription: 'Granite Gallery executed the complete Field Stone landscape at Taj Pushkar Resort & Spa — every piece calibrated and numbered, installed up to ~45 ft, entirely chemical-free.',
    keywords: ['taj pushkar resort stone', 'field stone landscape', 'field stone supplier india', 'chemical-free stone installation', 'resort landscape stone rajasthan'],
    size: 'Landmark',
  },
  {
    slug: 'palace-on-wheels',
    title: 'Palace on Wheels',
    pageTitle: 'Palace on Wheels — Vietnam White & Red Teak Stone Supply',
    category: 'heritage',
    location: 'Rajasthan Circuit',
    scope: 'Natural stone supply for the world-famous Palace on Wheels — Vietnam White flooring for its mother-of-pearl inlay and copper engraving, and our exclusive Red Teak for the Maharaja Suite bathroom.',
    challenge: 'The Palace on Wheels sets a global benchmark for rail luxury, so its stone had to match that grandeur — flawless Vietnam White ready to carry intricate mother-of-pearl inlay and copper engraving, and a rare, characterful stone worthy of the flagship Maharaja Suite.',
    solution: 'Our company supplied the natural stone that dresses this iconic train. We provided the Vietnam White used across the flooring — the canvas for its exquisite mother-of-pearl inlay and copper engraving — and our exclusive Red Teak for the bathroom of the prestigious Maharaja Suite. Every piece was supplied to precise technical standards and a premium finish befitting one of the world\'s most celebrated luxury trains.',
    materialsUsed: ['Vietnam White', 'Red Teak'],
    finishesUsed: [],
    specs: [
      { key: 'Materials', val: 'Vietnam White · Red Teak' },
      { key: 'Maharaja Suite', val: 'Red Teak bathroom' },
      { key: 'Flooring', val: 'Vietnam White · mother-of-pearl inlay & copper engraving' },
      { key: 'Our Role', val: 'Natural stone supply' },
    ],
    images: [
      '/images/projects/palace-on-wheels/Palace-on-wheel-project_1.webp',
      '/images/projects/palace-on-wheels/Palace-on-wheel-project_2.webp',
      '/images/projects/palace-on-wheels/Palace-on-wheel-project_3.webp',
      '/images/projects/palace-on-wheels/Palace-on-wheel-project_4.webp',
      '/images/projects/palace-on-wheels/Palace-on-wheel-project.webp',
    ],
    heroImage: '/images/projects/palace-on-wheels/Palace-on-wheel-Hero.webp',
    metaTitle: 'Palace on Wheels — Vietnam White & Red Teak Stone | Granite Gallery',
    metaDescription: 'Granite Gallery supplied the natural stone for the Palace on Wheels — Vietnam White flooring for mother-of-pearl inlay and copper engraving, and exclusive Red Teak for the Maharaja Suite bathroom.',
    keywords: ['palace on wheels stone', 'vietnam white marble', 'red teak stone', 'luxury train stone supplier', 'mother of pearl inlay stone'],
    size: 'Heritage',
  },
  {
    slug: 'parliament-of-india',
    title: 'Parliament of India',
    pageTitle: 'Parliament of India — Kota Stone, Lakha Red & Sandstone Supply and Laying',
    category: 'government',
    location: 'New Delhi',
    scope: 'Supply and complete laying of thick Kota stone and Lakha Red, plus all the sandstone work for the structure that connects India\'s circular old Parliament (Sansad Bhavan) with the new triangular Parliament building.',
    challenge: 'Uniting two monumental structures — the historic circular Sansad Bhavan and the new triangular Parliament — demanded stone heavy and durable enough to carry constant ceremonial and public footfall in a fully exposed setting. It called for Kota stone in exceptional thicknesses, precisely cut and laid to flawless levels and joints across the junction of the two buildings, all against a fixed national timeline.',
    solution: 'Granite Gallery supplied Kota stone in heavy sections ranging from 70 mm up to 150 mm thick and laid Lakha Red across the full flooring, then carried out all of the sandstone work that ties the circular and triangular Parliament buildings together. Every slab was set to precise levels, falls and joint lines by our specialist laying crew — delivering a seamless, hard-wearing stone surface worthy of the nation\'s most important address.',
    materialsUsed: ['Kota Stone', 'Lakha Red', 'Rajasthan Sandstone'],
    finishesUsed: [],
    specs: [
      { key: 'Materials', val: 'Kota Stone · Lakha Red · Sandstone' },
      { key: 'Thickness', val: '70mm – 150mm heavy sections' },
      { key: 'Scope of Work', val: 'Supply & complete on-site laying' },
    ],
    images: [
      '/images/projects/parliament-of-india/Parliament-project_1.webp',
      '/images/projects/parliament-of-india/Parliament-project_2.webp',
      '/images/projects/parliament-of-india/Parliament-project_3.webp',
      '/images/projects/parliament-of-india/Parliament-project_4.webp',
      '/images/projects/parliament-of-india/Parliament-project.webp',
    ],
    heroImage: '/images/projects/parliament-of-india/Parliament-Hero.webp',
    metaTitle: 'Parliament of India Stone Project — Kota Stone, Lakha Red & Sandstone | Granite Gallery',
    metaDescription: 'Granite Gallery supplied and laid thick Kota stone (70–150mm), Lakha Red and all the sandstone work connecting India\'s old circular Parliament with the new triangular Parliament building.',
    keywords: ['parliament of india stone contractor', 'kota stone parliament', 'lakha red parliament', 'sandstone parliament of india', 'new parliament building stone work'],
    size: 'National Icon',
  },
  {
    slug: 'central-vista-kartavya-path',
    title: 'Central Vista — Kartavya Path',
    pageTitle: 'Central Vista Kartavya Path — Kota, Granite & Lakha Red',
    category: 'government',
    location: 'New Delhi',
    scope: 'Manufacture and supply of natural stone for Kartavya Path, Central Vista — Kota Stone and granite work, plus Lakha Red pavers in heavy thicknesses for the walkways and driveways.',
    challenge: 'Kartavya Path — the ceremonial route linking Sansad Bhavan to India Gate — demanded paving stone of consistent colour and texture, produced in heavy paver thicknesses and precise sizes to carry ceremonial and public traffic while holding its beauty for decades.',
    solution: 'Our team manufactured and supplied the natural stone for this national landmark — Kota Stone and granite work, and Lakha Red pavers produced in multiple heavy thicknesses for the walkways and driveways that line Kartavya Path. Every batch was made to consistent size and colour so the stone along the route that connects Parliament to India Gate would deliver the strength, beauty and longevity it deserves.',
    materialsUsed: ['Kota Stone', 'Granite', 'Lakha Red'],
    finishesUsed: [],
    specs: [
      { key: 'Materials', val: 'Kota Stone · Granite · Lakha Red' },
      { key: 'Pavers', val: 'Lakha Red · 40 / 50 / 60 / 80 mm' },
      { key: 'Application', val: 'Walkways & driveways' },
      { key: 'Route', val: 'Sansad Bhavan ↔ India Gate' },
    ],
    images: [
      '/images/projects/central-vista-kartavya-path/Kartavya-path-project.webp',
    ],
    heroImage: '/images/projects/central-vista-kartavya-path/Kartavya-path-Hero.webp',
    metaTitle: 'Central Vista Kartavya Path — Kota Stone, Granite & Lakha Red | Granite Gallery',
    metaDescription: 'Granite Gallery manufactured and supplied Kota Stone, granite and Lakha Red pavers (40–80mm) for the walkways and driveways of Kartavya Path, Central Vista, New Delhi.',
    keywords: ['central vista stone supplier', 'kartavya path stone', 'lakha red pavers', 'kota stone central vista', 'india government project stone'],
    size: 'National Icon',
  },
  {
    slug: 'national-war-memorial',
    title: 'National War Memorial',
    pageTitle: 'National War Memorial — Lakha Red Stone & Amar Jawan Jyoti',
    category: 'government',
    location: 'New Delhi',
    scope: 'Stone work for the National War Memorial\'s Amar Jawan Jyoti, New Delhi — a kilometre-long circular installation in Lakha Red, laid entirely cement-free through a male-female interlocking system.',
    challenge: 'The National War Memorial demanded stone work of the highest civil and architectural order — a kilometre-long circular pathway built without a drop of cement, the name of every post-independence martyr inscribed into the stone, and statuary and memorial elements finished to a standard worthy of the nation\'s tribute to its fallen soldiers.',
    solution: 'Our team executed the stone work for the new Amar Jawan Jyoti within the India Gate complex — a vast circular installation in Lakha Red assembled through a male-female interlocking system, with zero cement across the entire kilometre-long round. We delivered the inscribed name tablets of India\'s post-independence martyrs, the stone work for the statues of Param Vir Chakra awardees, single-stone benches and the wider architectural stone elements. For our contribution to this landmark, we were honoured by the then Defence Minister, Nirmala Sitharaman.',
    materialsUsed: ['Lakha Red'],
    finishesUsed: [],
    specs: [
      { key: 'Material', val: 'Lakha Red' },
      { key: 'Jointing', val: 'Male-female interlock · zero cement' },
      { key: 'Circular Pathway', val: '~1 km round' },
      { key: 'Scope', val: 'Name tablets · Param Vir Chakra statues · single-stone benches' },
    ],
    images: [
      '/images/projects/national-war-memorial/National-war-memorial-project_1.webp',
      '/images/projects/national-war-memorial/National-war-memorial-project_2.webp',
      '/images/projects/national-war-memorial/National-war-memorial-project_3.webp',
      '/images/projects/national-war-memorial/National-war-memorial-project_4.webp',
      '/images/projects/national-war-memorial/National-war-memorial-project.webp',
    ],
    heroImage: '/images/projects/national-war-memorial/National-war-memorial-Hero.webp',
    metaTitle: 'National War Memorial, New Delhi — Lakha Red Stone Work | Granite Gallery',
    metaDescription: 'Granite Gallery executed the stone work for the National War Memorial\'s Amar Jawan Jyoti, New Delhi — a kilometre-long cement-free circular installation in Lakha Red, honoured by the Defence Minister.',
    keywords: ['national war memorial stone', 'amar jawan jyoti stone work', 'lakha red stone', 'cement-free stone installation', 'india gate memorial stone'],
    size: 'National Icon',
  },
  {
    slug: 'jewar-international-airport',
    title: 'Jewar International Airport',
    pageTitle: 'Noida International Airport, Jewar — Cut-to-Size Red Stone',
    category: 'infrastructure',
    location: 'Jewar, Uttar Pradesh',
    scope: 'Complete cut-to-size red stone supply for Noida International Airport, Jewar — precision-machined tiles finished to 100% dimensional accuracy in flamed, leather and polished finishes.',
    challenge: 'An international airport demands cut-to-size stone produced at exact, repeatable dimensions across enormous tile volumes — every piece identical to the last, dead-flat and true, with hard-wearing finishes able to take relentless footfall and trolley traffic for decades.',
    solution: 'Granite Gallery processed and supplied the airport\'s red stone entirely as precision cut-to-size tiles, machined to 100% dimensional accuracy and delivered across flamed, leather and polished finishes. Every batch was calibrated and quality-checked at our Kishangarh facility so each tile met the specified size and tolerance exactly.',
    materialsUsed: ['Red Granite'],
    finishesUsed: ['flamed', 'leathered', 'polished'],
    specs: [
      { key: 'Format', val: 'Cut-to-Size Tiles' },
      { key: 'Tile Sizes', val: '747×747mm · 747×544mm' },
      { key: 'Accuracy', val: '100% dimensional' },
      { key: 'Finishes', val: 'Flamed · Leather · Polished' },
    ],
    images: [
      '/images/projects/jewar-international-airport/Noida-international-airport-project_1.webp',
      '/images/projects/jewar-international-airport/Noida-international-airport-project_2.webp',
      '/images/projects/jewar-international-airport/Noida-international-airport-project_3.webp',
      '/images/projects/jewar-international-airport/Noida-international-airport-project_4.webp',
      '/images/projects/jewar-international-airport/Noida-international-airport-project.webp',
    ],
    heroImage: '/images/projects/jewar-international-airport/Noida-international-airport-Hero.webp',
    metaTitle: 'Jewar (Noida International) Airport — Cut-to-Size Red Stone | Granite Gallery',
    metaDescription: 'Granite Gallery executed the complete cut-to-size red stone work for Noida International Airport, Jewar — precision tiles at 100% dimensional accuracy in flamed, leather and polished finishes.',
    keywords: ['jewar airport stone supplier', 'noida international airport stone', 'cut to size red granite', 'airport red stone tiles', 'cut to size stone india'],
    size: 'Mega Project',
  },
  {
    slug: 'chola-sheraton-chennai',
    title: 'Chola Sheraton Chennai',
    pageTitle: 'Chola Sheraton — Heritage Hotel Stone Refurbishment',
    category: 'hospitality',
    location: 'Chennai, Tamil Nadu',
    scope: 'Complete stone refurbishment — lobby flooring, corridor cladding, restaurant feature walls, and all bathroom suites across the hotel.',
    challenge: 'The Chola Sheraton\'s refurbishment required replacing aging stone while preserving the hotel\'s distinctive South Indian heritage aesthetic. Minimising disruption to hotel operations during a phased renovation was critical.',
    solution: 'We worked with the hotel\'s design team to select South Indian Granite varieties alongside Italian Marble for premium suites. Phased delivery allowed installation block by block with zero hotel closure. Custom edge profiles matched the heritage architecture.',
    // Exact stone selection for this refurbishment is not on record — left empty
    // rather than guessed, so the materials block is omitted on the page.
    materialsUsed: [],
    finishesUsed: ['polished', 'leathered'],
    images: [
      '/images/projects/chola-sheraton-chennai/chola-sherton-project.webp',
    ],
    heroImage: '/images/projects/chola-sheraton-chennai/chola-sherton-hero.webp',
    metaTitle: 'Chola Sheraton Chennai Stone Refurbishment | Granite Gallery',
    metaDescription: 'Stone refurbishment for Chola Sheraton Chennai — phased granite & marble supply across lobby, corridors and suites by Granite Gallery.',
    keywords: ['chola sheraton stone', 'hotel stone renovation india', 'sheraton chennai marble', 'hospitality stone supplier india'],
    size: 'Landmark',
  },
  {
    slug: 'mandawa-resort',
    title: 'Mandawa Resort',
    pageTitle: 'Mandawa Resort — Cut-to-Size Stone Interiors & Landscape',
    category: 'hospitality',
    location: 'Mandawa, Rajasthan',
    scope: 'Extensive stone work across the restaurant, kitchen, bathrooms and landscape at Mandawa Resort — a cut-to-size chequered floor in Red Teak and Karoi Black, custom Kandla Grey tables, and architectural stone throughout.',
    challenge: 'A resort spanning restaurant, kitchen, bathrooms and landscape needed one cohesive stone language across very different surfaces — a crisp chequered floor, hard-wearing kitchen and bathroom stone, custom furniture and outdoor landscape work — every element cut to size and fitted so it aligned perfectly.',
    solution: 'Our team executed the resort\'s stone work end to end. In the restaurant and kitchen we laid a striking chequered floor in cut-to-size Red Teak and Karoi Black tiles, and fabricated custom tables in Kandla Grey to suit the design. We also completed the bathroom stone elevations, the landscape stone work and a range of architectural stone installations — every piece cut to size, precisely fitted and finished to a high standard.',
    materialsUsed: ['Red Teak', 'Karoi Black', 'Kandla Grey'],
    finishesUsed: [],
    specs: [
      { key: 'Restaurant & Kitchen', val: 'Chequered floor · 18×18" cut-to-size' },
      { key: 'Stones', val: 'Red Teak · Karoi Black · Kandla Grey' },
      { key: 'Custom Work', val: 'Kandla Grey tables' },
      { key: 'Scope', val: 'Restaurant · kitchen · bathrooms · landscape' },
    ],
    images: [
      '/images/projects/mandawa-resort/Gulab-haveli-project_1.webp',
      '/images/projects/mandawa-resort/Gulab-haveli-project.webp',
    ],
    heroImage: '/images/projects/mandawa-resort/Gulab-haveli-hero.webp',
    metaTitle: 'Mandawa Resort — Cut-to-Size Stone Interiors & Landscape | Granite Gallery',
    metaDescription: 'Granite Gallery executed the stone work at Mandawa Resort — a cut-to-size chequered floor in Red Teak and Karoi Black, custom Kandla Grey tables, plus bathroom, landscape and architectural stone.',
    keywords: ['mandawa resort stone', 'chequered stone flooring', 'red teak sandstone', 'karoi black stone', 'cut to size resort stone'],
    size: 'Premium',
  },
  {
    slug: 'lohagarh-resort',
    title: 'Lohagarh Resort',
    pageTitle: 'Lohagarh Resort — Sandstone, Marble & Landscape Stone',
    category: 'hospitality',
    location: 'Rajasthan',
    scope: 'Comprehensive supply of sandstone, marble and landscape stone for Lohagarh Resort — including stone artifacts, sculptures and a range of landscape materials.',
    challenge: 'A resort built around natural beauty needed a wide, coordinated palette of stone — sandstone, marble and landscape materials — together with artifacts and sculptures, all matched to the design vision and delivered to a consistently high standard.',
    solution: 'Our company supplied the full breadth of natural stone for Lohagarh Resort — sandstone, marble and landscape stone — alongside stone artifacts, sculptures and a variety of landscape materials. Every piece was provided to the project\'s design requirements and our quality standards, giving the resort\'s architecture and grounds a distinctive natural character.',
    materialsUsed: ['Sandstone', 'Marble', 'Landscape Stone'],
    finishesUsed: [],
    specs: [
      { key: 'Materials', val: 'Sandstone · Marble · Landscape stone' },
      { key: 'Also Supplied', val: 'Stone artifacts · sculptures' },
      { key: 'Our Role', val: 'Supply to design & quality spec' },
    ],
    images: [
      '/images/projects/lohagarh-resort/Lohagarh-project_1.webp',
      '/images/projects/lohagarh-resort/Lohagarh-project_2.webp',
      '/images/projects/lohagarh-resort/Lohagarh-project_3.webp',
      '/images/projects/lohagarh-resort/Lohagarh-project_4.webp',
      '/images/projects/lohagarh-resort/Lohagarh-project.webp',
    ],
    heroImage: '/images/projects/lohagarh-resort/Lohagarh-hero.webp',
    metaTitle: 'Lohagarh Resort — Sandstone, Marble & Landscape Stone | Granite Gallery',
    metaDescription: 'Granite Gallery supplied sandstone, marble, landscape stone, artifacts and sculptures for Lohagarh Resort — a full natural-stone palette to the project\'s design and quality standards.',
    keywords: ['lohagarh resort stone', 'sandstone marble supplier india', 'landscape stone supplier', 'stone artifacts sculptures', 'resort stone rajasthan'],
    size: 'Premium',
  },
];
