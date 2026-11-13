// ============================================================
// src/data/seo-matrix/materials.ts
// Physical engineering parameters and technical facts for stone materials.
// ============================================================

import { MaterialFacts, MaterialId } from '@/lib/landing/types';

export const MATERIALS: Record<MaterialId, MaterialFacts> = {
  granite: {
    id: 'granite',
    name: 'Granite',
    category: 'granite',
    geologicalOrigin: 'Igneous plutonic rock composed predominantly of quartz, feldspar, and mica.',
    densityRange: '2.63 – 2.75 g/cm³',
    hardnessMohs: '6.0 – 7.0 (Highly Scratch Resistant)',
    waterAbsorption: '< 0.20% (Virtually Impermeable)',
    compressiveStrength: '160 – 240 MPa (Extreme Load-Bearing)',
    idealApplications: ['kitchen-countertops', 'flooring', 'wall-cladding', 'staircase', 'exterior-cladding', 'tabletops'],
    suitableFinishes: ['polished', 'leathered', 'flamed', 'shot-blast', 'bush-hammered', 'acid-wash', 'honed', 'latino'],
    maintenanceSummary: 'Extremely durable. Highly resistant to acidic household liquids, oils, and thermal shock. Clean with pH-neutral stone soap.',
  },
  marble: {
    id: 'marble',
    name: 'Marble',
    category: 'marble',
    geologicalOrigin: 'Metamorphic crystalline rock recrystallized from limestone under high tectonic heat and pressure.',
    densityRange: '2.60 – 2.70 g/cm³',
    hardnessMohs: '3.0 – 4.0 (Workable & Naturally Cool)',
    waterAbsorption: '0.08 – 0.40% (Makrana calcitic purity < 0.10%)',
    compressiveStrength: '75 – 130 MPa',
    idealApplications: ['flooring', 'bathroom', 'wall-cladding', 'tabletops', 'staircase'],
    suitableFinishes: ['polished', 'honed', 'antique', 'latino'],
    maintenanceSummary: 'Calcitic composition requires prompt wiping of acidic spills (vinegar, lemon, wine). Periodic penetrating sealer recommended once a year.',
  },
  sandstone: {
    id: 'sandstone',
    name: 'Sandstone',
    category: 'sandstone',
    geologicalOrigin: 'Sedimentary rock composed of mineral particles and quartz fragments bound by silica and iron oxides.',
    densityRange: '2.30 – 2.45 g/cm³',
    hardnessMohs: '5.0 – 6.0',
    waterAbsorption: '1.2 – 2.8% (Naturally Breathable)',
    compressiveStrength: '60 – 95 MPa',
    idealApplications: ['exterior-cladding', 'wall-cladding', 'flooring', 'staircase'],
    suitableFinishes: ['honed', 'shot-blast', 'chiseled', 'bush-hammered', 'antique'],
    maintenanceSummary: 'Superb thermal insulation for exterior facades. Resistant to weathering, freeze-thaw cycles, and sun fading.',
  },
  quartzite: {
    id: 'quartzite',
    name: 'Quartzite',
    category: 'quartzite',
    geologicalOrigin: 'Non-foliated metamorphic rock created by sandstone subjected to extreme heat and pressure, fusing quartz grains into a glass-hard matrix.',
    densityRange: '2.64 – 2.72 g/cm³',
    hardnessMohs: '7.0 – 7.5 (Harder than Granite and Glass)',
    waterAbsorption: '< 0.15%',
    compressiveStrength: '180 – 260 MPa',
    idealApplications: ['kitchen-countertops', 'wall-cladding', 'flooring', 'tabletops'],
    suitableFinishes: ['polished', 'leathered', 'honed'],
    maintenanceSummary: 'The peak of natural stone resilience. Combines the dramatic veining of marble with chemical and scratch resistance exceeding granite.',
  },
  onyx: {
    id: 'onyx',
    name: 'Onyx Stone',
    category: 'onyx',
    geologicalOrigin: 'Cryptocrystalline form of quartz and calcite, precipitated from cold spring water into translucent parallel layers.',
    densityRange: '2.50 – 2.65 g/cm³',
    hardnessMohs: '3.0 (Semi-Precious & Translucent)',
    waterAbsorption: '0.10 – 0.35%',
    compressiveStrength: '65 – 90 MPa',
    idealApplications: ['wall-cladding', 'tabletops', 'bathroom'],
    suitableFinishes: ['polished', 'honed'],
    maintenanceSummary: 'Prized for backlighting applications in luxury bars, feature walls, and reception desks. Requires delicate handling and non-abrasive cleaning.',
  },
  travertine: {
    id: 'travertine',
    name: 'Travertine',
    category: 'travertine',
    geologicalOrigin: 'Terrestrial sedimentary rock formed by the rapid precipitation of calcium carbonate from hot mineral springs.',
    densityRange: '2.40 – 2.55 g/cm³',
    hardnessMohs: '3.5 – 4.0 (Characteristic Pores)',
    waterAbsorption: '0.40 – 1.80%',
    compressiveStrength: '70 – 105 MPa',
    idealApplications: ['wall-cladding', 'flooring', 'bathroom'],
    suitableFinishes: ['honed', 'antique', 'polished', 'bush-hammered'],
    maintenanceSummary: 'Distinctive earthy texture. Can be supplied filled-and-honed for seamless interior elegance or vein-cut with natural open pores for acoustic exterior warmth.',
  },
};

export function getMaterial(id: MaterialId): MaterialFacts {
  return MATERIALS[id] ?? MATERIALS.granite;
}
