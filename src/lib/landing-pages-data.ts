export interface SectionData {
  type: 'hero' | 'why-us' | 'products' | 'categories' | 'applications' | 'projects' | 'team' | 'contact';
  personality?: 'marble' | 'granite' | 'onyx' | 'clean';
  grid?: 'square' | 'asymmetric' | 'luxury' | 'none';
  variant?: 'ivory' | 'mahogany' | 'bronze';
  title?: string;
}

export interface LandingPageData {
  slug: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  sections: SectionData[];
}

export const landingPages: Record<string, LandingPageData> = {
  'marble-exporters-in-kishangarh': {
    slug: 'marble-exporters-in-kishangarh',
    metadata: {
      title: 'Premium Marble Exporters in Kishangarh | Granite Gallery',
      description: 'The leading source for Italian marble and granite in Kishangarh. Global exports of premium natural stones.',
      keywords: ['marble kishangarh', 'italian marble', 'granite exports'],
    },
    sections: [
      {
        type: 'hero',
        personality: 'marble',
        grid: 'luxury',
        variant: 'ivory',
      },
      {
        type: 'why-us',
        personality: 'granite',
        grid: 'square',
        variant: 'mahogany',
      },
      {
        type: 'products',
        personality: 'marble',
        grid: 'luxury',
        variant: 'ivory',
      },
      {
        type: 'contact',
        personality: 'granite',
        variant: 'mahogany',
      }
    ],
  },
};
