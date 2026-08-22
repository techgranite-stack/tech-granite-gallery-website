import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroSlider from '@/components/sections/HeroSlider';
import StatsBand from '@/components/sections/StatsBand';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import StoneListingSection from '@/components/sections/StoneListingSection';
import type { FilterGroup } from '@/components/sections/StoneListingSection';
import HorizontalScrollGallery from '@/components/sections/HorizontalScrollGallery';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import BannerContactForm from '@/components/sections/BannerContactForm';
import { productsData, mockProductFallback, type Product } from '@/lib/product-data';
import { fromCollectionProduct } from '@/lib/listing-item';
import { resolveCollectionImage } from '@/lib/product-detail';
import { categories } from '@/data/categories';
import { testimonials } from '@/data/testimonials';
import type { HeroSlide, StatItem } from '@/types';

// ── Static Params ──────────────────────────────────────────────
// Union of curated categories AND every product `type`, so product-type-only
// listings (e.g. onyx, exotic) prebuild too — fixes their breadcrumb 404.
export async function generateStaticParams() {
  const ids = new Set<string>(categories.map((c) => c.id));
  productsData.forEach((p) => ids.add(p.type));
  return Array.from(ids).map((category) => ({ category }));
}

// ── Helpers ────────────────────────────────────────────────────
const titleCaseSlug = (s: string) =>
  s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const COLOR_LABEL: Record<string, string> = {
  white: 'White', black: 'Black', grey: 'Grey', pink: 'Pink', red: 'Red',
  green: 'Green', brown: 'Brown', blue: 'Blue', yellow: 'Yellow',
  beige: 'Beige', multi: 'Multicolour',
};

interface ResolvedCat {
  id: string;
  title: string;
  desc: string;
  image?: string;
  images?: string[];
  tag?: string;
}

/** A curated category, or a minimal derived one for product-type-only slugs. */
function resolveCat(category: string, products: Product[]): ResolvedCat | null {
  const cat = categories.find((c) => c.id === category);
  if (cat) return cat;
  if (products.length > 0) {
    return { id: category, title: titleCaseSlug(category), desc: '', image: products[0].heroImage };
  }
  return null;
}

/** Products shown for a category: exact type match, then legacy aliases, then mock. */
function resolveProducts(category: string): Product[] {
  let products = productsData.filter((p) => p.type === category);
  if (products.length === 0) {
    const typeMap: Record<string, string[]> = {
      exotic: ['exotic', 'onyx'],
      onyx: ['onyx'],
      imported: ['marble', 'travertine', 'onyx', 'exotic'],
    };
    const types = typeMap[category] ?? [category];
    products = productsData.filter((p) => types.includes(p.type));
  }
  if (products.length === 0) products = [mockProductFallback];
  return products;
}

/** Build hero slides from the category products using stand photos + product titles. */
function buildSlides(cat: ResolvedCat, products: Product[]): HeroSlide[] {
  if (products.length > 0) {
    // Select tagged/featured items first, or top items, max 6 for hero presentation
    const tagged = products.filter((p) => p.tag);
    const featured = tagged.length >= 3 ? tagged.slice(0, 6) : products.slice(0, 6);

    return featured.map((p) => {
      const standImg = resolveCollectionImage(
        p.type,
        p.slug,
        'stand',
        p.standImage || p.heroImage || cat.image || ''
      );
      return {
        image: standImg,
        title: p.name.toLowerCase().includes(cat.title.toLowerCase()) ? p.name : `${p.name} ${cat.title}`,
        sub: p.subtitle || p.description || `Premium ${p.name} ${cat.title.toLowerCase()} slabs & tiles directly from Kishangarh, Rajasthan.`,
      };
    });
  }

  const raw = (cat.images && cat.images.length ? cat.images : [cat.image]).filter(Boolean) as string[];
  return raw.map((image, i) => ({
    image,
    title: `The ${cat.title} Collection`,
    sub: cat.desc || `Explore our ${cat.title.toLowerCase()} range — export quality from Kishangarh.`,
  }));
}

/** Derive a stats band from the products on offer. */
function buildStats(cat: ResolvedCat, products: Product[]): StatItem[] {
  const finishes = new Set(products.flatMap((p) => p.finishesAvailable));
  const regions = new Set(products.map((p) => p.origin.split(',').pop()!.trim()));
  return [
    { number: `${products.length}`, label: `${cat.title} ${products.length === 1 ? 'Variety' : 'Varieties'}` },
    { number: `${finishes.size}`, label: 'Surface Finishes' },
    { number: `${regions.size}`, label: 'Source Regions' },
    { number: '10+', label: 'Countries Shipped' },
    { number: '100+', label: 'Projects Completed' },
    { number: '20+', label: 'Years Experience' },
  ];
}

/**
 * Build the listing filter groups *from the data* — fully modular:
 * a colour group only when the stones carry colours, plus finish and
 * application groups when there's more than one option. A collection with
 * no colours simply gets finish/application filters instead.
 */
function buildFilters(products: Product[]): FilterGroup[] {
  const groups: FilterGroup[] = [];

  const colors = Array.from(new Set(products.flatMap((p) => p.colorFamily ?? [])));
  if (colors.length > 0) {
    groups.push({
      key: 'color', label: 'Color', display: 'swatch',
      options: colors.map((c) => ({ value: c, label: COLOR_LABEL[c] ?? titleCaseSlug(c) })),
    });
  }

  const finishes = Array.from(new Set(products.flatMap((p) => p.finishesAvailable)));
  if (finishes.length > 1) {
    groups.push({
      key: 'finish', label: 'Finish',
      options: finishes.map((f) => ({ value: f, label: titleCaseSlug(f) })),
    });
  }

  const apps = Array.from(new Set(products.flatMap((p) => p.applications)));
  if (apps.length > 1) {
    groups.push({
      key: 'application', label: 'Application',
      options: apps.map((a) => ({ value: a, label: titleCaseSlug(a) })),
    });
  }

  return groups;
}

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  const name = cat?.title ?? titleCaseSlug(category);
  return {
    title: cat?.metaTitle ?? `${name} Collection | Granite Gallery`,
    description: cat?.metaDescription ?? `Explore our ${name} collection — premium slabs, tiles and custom formats. Direct export from Kishangarh.`,
    keywords: cat?.keywords,
    openGraph: {
      title: cat?.metaTitle ?? `${name} Collection | Granite Gallery`,
      description: cat?.metaDescription,
      ...(cat?.image ? { images: [cat.image] } : {}),
    },
    alternates: { canonical: `/collections/${category}` },
  };
}

// ── Page ──────────────────────────────────────────────────────
export default async function CategoryPage(
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;

  const products = resolveProducts(category);
  const cat = resolveCat(category, products);
  if (!cat) notFound();

  const items = products.map((p) => fromCollectionProduct(p, cat.title));
  const filters = buildFilters(products);

  // "Explore other collections" — every category except this one
  const otherCollections = categories
    .filter((c) => c.id !== category)
    .map((c) => ({
      title: c.title,
      category: c.desc,
      image: c.image,
      size: c.tag,
      href: c.href ?? `/collections/${c.id}`,
    }));

  return (
    <>
      <HeroSlider slides={buildSlides(cat, products)} />
      <StatsBand stats={buildStats(cat, products)} />
      <ScrollingTagline
        items={[
          `${products.length} ${cat.title} ${products.length === 1 ? 'Variety' : 'Varieties'}`,
          'Direct from Quarry',
          'Export Quality',
          'Ships to 30+ Countries',
          'Kishangarh, Rajasthan',
        ]}
      />
      <StoneListingSection
        products={items}
        filters={filters}
        heading={`All ${cat.title}`}
      />
      <HorizontalScrollGallery
        projects={otherCollections}
        eyebrow="Explore More"
        title={<>Other <em>Collections</em></>}
        desc="Marble, granite, sandstone and more — browse our full range of natural stones."
        btnLabel="Explore Collection"
      />
      <MarqueeTestimonials testimonials={testimonials} />
      <BannerContactForm />
    </>
  );
}
