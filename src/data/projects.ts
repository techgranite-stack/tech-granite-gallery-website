import { ProjectItem } from '../types';

// ── Real landmark projects by Granite Gallery ──────────────────
// Source: Company records (handwritten notes)
// TODO: Replace images with actual project photography when available.

export interface ExtendedProjectItem extends ProjectItem {
  location: string;
  year?: number;
  scope?: string;
}

export const projects: ExtendedProjectItem[] = [
  {
    title: 'Taj Pushkar Resort & Spa',
    category: 'Luxury Hospitality',
    location: 'Pushkar, Rajasthan',
    scope: 'Complete Field Stone landscape — calibrated, numbered & chemical-free, installed up to ~45 ft',
    image: '/images/projects/taj-pushkar-resort/Taj-Pushkar-project_1.webp',
    size: 'Landmark',
    href: '/projects/taj-pushkar-resort',
  },
  {
    title: 'Palace on Wheels',
    category: 'Heritage & Transport',
    location: 'Rajasthan Circuit',
    scope: 'Vietnam White flooring for mother-of-pearl inlay & copper engraving, and exclusive Red Teak for the Maharaja Suite',
    image: '/images/projects/palace-on-wheels/Palace-on-wheel-project_1.webp',
    size: 'Heritage',
    href: '/projects/palace-on-wheels',
  },
  {
    title: 'Lohagarh Resort',
    category: 'Luxury Hospitality',
    location: 'Rajasthan',
    scope: 'Sandstone, marble & landscape stone — plus artifacts and sculptures',
    image: '/images/projects/lohagarh-resort/Lohagarh-project_1.webp',
    size: 'Premium',
    href: '/projects/lohagarh-resort',
  },
  {
    title: 'Parliament of India',
    category: 'Government & Institutional',
    location: 'New Delhi',
    scope: 'Thick Kota stone, Lakha Red and full sandstone work joining the old and new Parliament buildings',
    image: '/images/projects/parliament-of-india/Parliament-project_1.webp',
    size: 'National Icon',
    href: '/projects/parliament-of-india',
  },
  {
    title: 'National War Memorial',
    category: 'Government & Institutional',
    location: 'New Delhi',
    scope: 'Kilometre-long cement-free circular installation in Lakha Red — Amar Jawan Jyoti, name tablets & Param Vir Chakra statues',
    image: '/images/projects/national-war-memorial/National-war-memorial-project_1.webp',
    size: 'National Icon',
    href: '/projects/national-war-memorial',
  },
  {
    title: 'Central Vista — Kartavya Path',
    category: 'Government & Institutional',
    location: 'New Delhi',
    scope: 'Kota Stone, granite & Lakha Red pavers for the walkways & driveways of Kartavya Path',
    image: '/images/projects/central-vista-kartavya-path/Kartavya-path-project.webp',
    size: 'National Icon',
    href: '/projects/central-vista-kartavya-path',
  },
  {
    title: 'Jewar International Airport',
    category: 'Aviation & Infrastructure',
    location: 'Jewar, Uttar Pradesh',
    scope: 'Complete cut-to-size red stone tiles at 100% accuracy — flamed, leather & polished finishes',
    image: '/images/projects/jewar-international-airport/Noida-international-airport-project_1.webp',
    size: 'Mega Project',
    href: '/projects/jewar-international-airport',
  },
  {
    title: 'Chola Sheraton',
    category: 'Luxury Hospitality',
    location: 'Chennai, Tamil Nadu',
    scope: 'Complete stone refurbishment — lobby, corridors & bathroom suites',
    image: '/images/projects/chola-sheraton-chennai/chola-sherton-project.webp',
    size: 'Landmark',
    href: '/projects/chola-sheraton-chennai',
  },
  {
    title: 'Mandawa Resort',
    category: 'Luxury Hospitality',
    location: 'Mandawa, Rajasthan',
    scope: 'Cut-to-size chequered flooring in Red Teak & Karoi Black, custom Kandla Grey tables',
    image: '/images/projects/mandawa-resort/Gulab-haveli-project_1.webp',
    size: 'Premium',
    href: '/projects/mandawa-resort',
  },
];
