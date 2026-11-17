export interface HeroSlide {
  image: string;
  title: string;
  sub: string;
  /** Optional explicit eyebrow; falls back to a short phrase derived from `sub`. */
  eyebrow?: string;
  /**
   * Alt text describing the photograph. Falls back to `title`, which describes
   * the marketing headline rather than the image — fine as a default, poor for
   * image search on a business whose product *is* the picture.
   */
  alt?: string;
}

export interface StatItem {
  number: string;
  label: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  desc: string;
  tag: string;
  image: string;
  /** Multiple images for the collections section image panel */
  images?: string[];
  /** Override the default /collections/[id] link */
  href?: string;
  /** Approximate number of varieties available */
  count?: number;
  /** SEO for the /collections/[id] listing page */
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface ApplicationItem {
  title: string;
  sub: string;
  image: string;
  wide?: boolean;
  href?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  category: string;
  image: string;
  whatsappMsg?: string;
}

export interface WhyUsReason {
  num: string;
  title: string;
  desc: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  image: string;
  size?: string;
  href?: string;
}

export interface TestimonialItem {
  text: string;
  author: string;
  role: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface BlogPostItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type ProcessIconName = "chat" | "slab" | "visualize" | "check" | "truck" | "build";

export interface ProcessStep {
  /** Display number, e.g. "01". */
  num: string;
  title: string;
  desc: string;
  image: string;
  /** Describes the photograph — used as the <img> alt. */
  imageAlt: string;
  icon: ProcessIconName;
}
