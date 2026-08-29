import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/sections/PageHero';
import BannerContactForm from '@/components/sections/BannerContactForm';
import { blogPostsData } from '@/lib/blog-data';
import { getTeamMember } from '@/data/team';
import styles from './blog.module.css';

// Unknown slugs 404 at the routing layer instead of rendering placeholder content.
export const dynamicParams = false;

export async function generateStaticParams() {
  return blogPostsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      ...(post.ogImage ?? post.image ? { images: [post.ogImage ?? post.image] } : {}),
    },
    alternates: { canonical: `/blogs/${post.slug}` },
  };
}

const parseInlineMarkdown = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={idx}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

const renderContent = (content: string) => {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let keyCount = 0;

  const flushList = () => {
    if (!currentList) return;
    const ListTag = currentList.type === 'ul' ? 'ul' : 'ol';
    const className = currentList.type === 'ul' ? styles.list : styles.orderedList;
    elements.push(
      <ListTag key={`list-${keyCount++}`} className={className}>
        {currentList.items.map((item, idx) => (
          <li key={idx} className={styles.listItem}>
            {parseInlineMarkdown(item)}
          </li>
        ))}
      </ListTag>
    );
    currentList = null;
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${keyCount++}`} className={styles.heading2}>
          {parseInlineMarkdown(trimmed.replace(/^##\s+/, ''))}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${keyCount++}`} className={styles.heading2}>
          {parseInlineMarkdown(trimmed.replace(/^###\s+/, ''))}
        </h3>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const itemText = trimmed.replace(/^[-*]\s+/, '');
      if (currentList && currentList.type === 'ul') {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: 'ul', items: [itemText] };
      }
    } else if (/^\d+\.\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^\d+\.\s+/, '');
      if (currentList && currentList.type === 'ol') {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: 'ol', items: [itemText] };
      }
    } else {
      flushList();
      elements.push(
        <p key={`p-${keyCount++}`} className={styles.paragraph}>
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    }
  });

  flushList();
  return elements;
};

export default async function BlogDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);
  if (!post) notFound();
  const authorMember = post.authorSlug ? getTeamMember(post.authorSlug) : undefined;

  // Format date and other items
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'image': post.image,
    'datePublished': post.date,
    'author': {
      '@type': 'Person',
      'name': post.author,
      ...(authorMember ? { 'url': `https://granitegalleryindia.com/team/${authorMember.slug}` } : {}),
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Granite Gallery',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://granitegalleryindia.com/Logo-black.png',
      },
    },
    'description': post.excerpt,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://granitegalleryindia.com/blogs/${post.slug}`,
    },
  };

  // Related posts
  const related = blogPostsData.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main>
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
        heroImage={post.image}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Blogs', href: '/blogs' },
          { label: post.title },
        ]}
        badges={[
          { value: post.author, label: 'Author' },
          { value: post.date, label: 'Published' },
          { value: post.readTime, label: 'Read Time' },
        ]}
      />

      {/* Article Body */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>

            {/* Article Content */}
            <article className={styles.article}>
              <div className={styles.richText}>
                {renderContent(post.longContent)}
              </div>

              {/* Tags */}
              <div className={styles.tagSection}>
                <span className={styles.tagLabel}>Tags:</span>
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio Box */}
              <div className={styles.authorBox}>
                <div className={styles.authorImg}>
                  {authorMember ? (
                    <Image
                      src={authorMember.image}
                      alt={authorMember.name}
                      fill
                      sizes="64px"
                      className={styles.authorPhoto}
                    />
                  ) : (
                    post.author.charAt(0)
                  )}
                </div>
                <div className={styles.authorInfo}>
                  <p className={styles.authorName}>
                    Written by{' '}
                    {authorMember ? (
                      <Link href={`/team/${authorMember.slug}`} className={styles.authorLink}>
                        {authorMember.name}
                      </Link>
                    ) : (
                      post.author
                    )}
                  </p>
                  <p className={styles.authorRole}>
                    {authorMember ? authorMember.role : 'Natural Stone Specialist at Granite Gallery'}
                  </p>
                  <p className={styles.authorDesc}>
                    {authorMember ? authorMember.expertise : 'Helping homeowners and architects select premium Italian marble, granite, and exotic quartzites processed at our state-of-the-art Kishangarh facility.'}
                  </p>
                  {authorMember && (
                    <Link href={`/team/${authorMember.slug}`} className={styles.viewProfileBtn}>
                      View Profile ➔
                    </Link>
                  )}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarWidget}>
                <h3 className={styles.widgetTitle}>Need Expert Advice?</h3>
                <p className={styles.widgetText}>
                  Speak with our stone consultants to get specific recommendations for your residential or commercial projects.
                </p>
                <a
                  data-wa-source="blog_detail"
                  href={`https://wa.me/919116622422?text=${encodeURIComponent(`Hello, I read your article "${post.title}" and would like expert advice on stone selection.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-copper btn-full"
                >
                  <span>Consult via WhatsApp</span>
                </a>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className={styles.sidebarWidget}>
                  <h3 className={styles.widgetTitle}>Related Articles</h3>
                  <div className={styles.relatedList}>
                    {related.map((p) => (
                      <Link key={p.slug} href={`/blogs/${p.slug}`} className={styles.relatedItem}>
                        <div className={styles.relatedThumb}>
                          <Image src={p.image} alt={p.title} fill sizes="80px" className={styles.relatedImg} />
                        </div>
                        <div className={styles.relatedText}>
                          <span className={styles.relatedCategory}>{p.category}</span>
                          <h4 className={styles.relatedTitle}>{p.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>

          </div>
        </div>
      </section>

      <BannerContactForm />
    </main>
  );
}
