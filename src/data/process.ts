import type { ProcessStep } from '../types';

/**
 * "How we bring your vision to life" — the client journey, in order.
 * Step 03 (Material Visualization) lets clients judge the stone in context
 * before anything is cut. Edit copy/order here; the component adapts.
 */
export const processSteps: ProcessStep[] = [
  {
    num: '01',
    icon: 'chat',
    title: 'Requirement Discussion',
    desc: 'Share your space, application, design style or reference images. Our team shortlists suitable marble, granite, quartzite or exotic stones based on aesthetics, usage and budget.',
    image: '/images/hero/granite-gallery-luxury-marble-interior.webp',
    imageAlt: 'Luxury marble interior used as a design reference during requirement discussion',
  },
  {
    num: '02',
    icon: 'slab',
    title: 'Full Slab Selection',
    desc: 'We recommend choosing from full slabs rather than small samples, so you can judge vein movement, background tone and overall consistency before you commit.',
    image: '/images/hero/granite-gallery-kishangarh-stone-facility.webp',
    imageAlt: 'Full stone slabs laid out at the Granite Gallery Kishangarh facility',
  },
  {
    num: '03',
    icon: 'visualize',
    title: 'Material Visualization',
    desc: 'Preview how the stone will look in your space. Slab photographs, bookmatch and layout planning, and finish samples help you judge colour, veining and lighting before anything is cut.',
    image: '/images/applications/wall-cladding/luxury-bedroom-interior-granite.webp',
    imageAlt: 'Granite wall cladding visualised in a luxury bedroom interior',
  },
  {
    num: '04',
    icon: 'check',
    title: 'Material Finalization',
    desc: 'Stone type, finish, thickness, quantity and matching slabs are confirmed carefully, so the final result is refined and balanced.',
    image: '/images/collections/showroom/marble-showroom-display-wall-kishangarh.webp',
    imageAlt: 'Marble display wall at the Kishangarh showroom used to confirm finish and tone',
  },
  {
    num: '05',
    icon: 'truck',
    title: 'Pan-India & Export Dispatch',
    desc: 'Selected slabs are securely crated and dispatched across India, and containerised for export to 30+ countries — for residential, commercial and luxury projects.',
    image: '/images/hero/granite-gallery-natural-stone-export.webp',
    imageAlt: 'Natural stone slabs prepared for export dispatch',
  },
  {
    num: '06',
    icon: 'build',
    title: 'Installation Coordination',
    desc: 'We stay connected with your architect, contractor or installation team for correct application, alignment and stone usage guidance.',
    image: '/images/projects/parliament-of-india/Parliament-project.webp',
    imageAlt: 'Granite Gallery stone installed at the Parliament of India project',
  },
];
