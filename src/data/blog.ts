import { BlogPostItem } from '../types';

export interface ExtendedBlogPostItem extends BlogPostItem {
  readTime: string;
}

export const blogPosts: ExtendedBlogPostItem[] = [
  {
    slug: 'choose-right-marble',
    title: 'How to Choose the Right Marble for Your Home',
    excerpt: 'From Calacatta to Volakas — a comprehensive guide to picking the perfect Italian marble based on application, finish, and maintenance needs.',
    image: '/images/blog/choose-right-marble.webp',
    date: 'May 2025',
    category: 'Marble Guide',
    readTime: '5 min read'
  },
  {
    slug: 'granite-vs-marble',
    title: 'Granite vs Marble: The Ultimate Comparison',
    excerpt: 'Understand the key differences in durability, maintenance, aesthetics, and cost between granite and marble for making an informed decision.',
    image: '/images/blog/granite-vs-marble.webp',
    date: 'April 2025',
    category: 'Comparison',
    readTime: '7 min read'
  },
  {
    slug: 'stone-trends-2025',
    title: 'Stone Trends for Luxury Interiors in 2025',
    excerpt: 'Bookmatch marble walls, fluted stone panels, and warm earth tones — discover the stone design trends shaping luxury spaces this year.',
    image: '/images/blog/stone-trends-2025.webp',
    date: 'March 2025',
    category: 'Trends',
    readTime: '4 min read'
  },
  {
    slug: 'sealing-maintenance-guide',
    title: 'Sealing & Caring for Natural Stone: A Complete Guide',
    excerpt: 'How to seal, clean, and protect granite and marble surfaces — the right products, the right routine, and the mistakes that dull your stone.',
    image: '/images/blog/sealing-maintenance-guide.webp',
    date: 'February 2025',
    category: 'Care & Maintenance',
    readTime: '6 min read'
  },
  {
    slug: 'why-kishangarh-marble',
    title: 'Why Kishangarh Is India’s Marble Capital',
    excerpt: 'Inside the world’s largest marble market — how Kishangarh sources, processes, and exports premium stone to landmark projects across 30+ countries.',
    image: '/images/blog/why-kishangarh-marble.webp',
    date: 'January 2025',
    category: 'Heritage',
    readTime: '5 min read'
  }
];
