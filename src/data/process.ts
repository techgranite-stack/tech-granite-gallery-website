import type { ProcessStep } from '../types';

/**
 * Granite Gallery's own project journey, in order. Copy here is original to
 * this site — do not paste in wording from other suppliers' pages (duplicate
 * content hurts SEO and trust). Step 03 (Material Visualization) lets clients
 * judge the stone in context before anything is cut.
 */
export const processSteps: ProcessStep[] = [
  {
    num: '01',
    icon: 'chat',
    title: 'Brief & Shortlist',
    desc: 'Tell us about the project: the space, the look you want, the budget and the timeline. We shortlist marble, granite, quartzite or sandstone that genuinely suits the brief.',
  },
  {
    num: '02',
    icon: 'slab',
    title: 'Slab Walk-Through',
    desc: 'Walk the yard at our Kishangarh facility, or join a video call, and see full slabs in real light. Colour and movement are judged on the slab itself, not a palm-sized sample.',
  },
  {
    num: '03',
    icon: 'visualize',
    title: 'Material Visualization',
    desc: 'See your shortlisted stone in context: photographs of the exact slabs, bookmatch and joint layouts, and finish swatches checked against your lighting and palette before cutting begins.',
  },
  {
    num: '04',
    icon: 'check',
    title: 'Specification Sign-Off',
    desc: 'Finish, thickness, sizes, quantity and slab batch are written down and approved, so what is cut and shipped matches exactly what you chose.',
  },
  {
    num: '05',
    icon: 'factory',
    title: 'Processing & Quality Check',
    desc: 'Slabs are cut, finished and inspected at our facility. Each lot is checked for flatness, polish and tone consistency before it is packed.',
  },
  {
    num: '06',
    icon: 'truck',
    title: 'Dispatch & Site Support',
    desc: 'Stone is crated for transit and sent across India, or containerised for export. We stay reachable for your contractor on laying, alignment and care.',
  },
];
