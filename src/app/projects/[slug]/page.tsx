import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/sections/PageHero';
import BannerContactForm from '@/components/sections/BannerContactForm';
import ProjectGallery from './ProjectGallery';
import { projectsData } from '@/lib/project-data';
import { productsData } from '@/lib/product-data';
import { resolveCollectionImage } from '@/lib/product-detail';
import styles from './project.module.css';

// Unknown slugs 404 at the routing layer instead of rendering placeholder content.
export const dynamicParams = false;

export async function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    keywords: project.keywords,
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      ...(project.ogImage ?? project.heroImage ? { images: [project.ogImage ?? project.heroImage] } : {}),
    },
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) notFound();

  // Featured stones: materials that map to a product page AND ship owned imagery.
  // Products still on placeholder stock photos are skipped — every material is
  // already listed under "Materials Sourced & Processed" above, so the section
  // simply drops out when nothing qualifies rather than showing a wrong slab.
  const relatedStones = productsData
    .filter((p) => project.materialsUsed.some(mat => mat.toLowerCase().includes(p.name.toLowerCase())))
    .map((p) => ({ ...p, cardImage: resolveCollectionImage(p.type, p.slug, 'catalog', '') }))
    .filter((p) => p.cardImage !== '')
    .slice(0, 4);

  // Other related landmark projects
  const relatedProjects = projectsData.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://granitegalleryindia.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Projects', 'item': 'https://granitegalleryindia.com/projects' },
      { '@type': 'ListItem', 'position': 3, 'name': project.title, 'item': `https://granitegalleryindia.com/projects/${project.slug}` }
    ]
  };

  const badges = [
    { value: project.location, label: 'Location' },
    { value: project.size, label: 'Project Size' },
  ];
  if (project.year) badges.push({ value: project.year.toString(), label: 'Year Completed' });
  if (project.area) badges.push({ value: project.area, label: 'Area Covered' });

  return (
    <>
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Landmark Case Study"
        title={project.title}
        subtitle={project.scope}
        heroImage={project.heroImage}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
        badges={badges}
      />

      {/* Case Study Grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>

            {/* Left: Challenge, Solution & Materials */}
            <div className={styles.left}>

              {/* Challenge */}
              <div className={styles.group}>
                <span className="section-eyebrow">The Challenge</span>
                <h2 className={styles.sectionTitle}>Project Constraints &amp; <em>Requirements</em></h2>
                <p className={styles.para}>{project.challenge}</p>
              </div>

              {/* Solution */}
              <div className={styles.group}>
                <span className="section-eyebrow">Our Solution</span>
                <h2 className={styles.sectionTitle}>Precision Supply &amp; <em>Craftsmanship</em></h2>
                <p className={styles.para}>{project.solution}</p>
              </div>

              {/* Architect / Developer Info */}
              {project.architect && (
                <div className={styles.architectBox}>
                  <span className={styles.archLabel}>Collaborator / Architect</span>
                  <p className={styles.archVal}>{project.architect}</p>
                </div>
              )}

              {/* Materials Used */}
              {project.materialsUsed.length > 0 && (
                <div className={styles.materialsGroup}>
                  <h3 className={styles.groupTitle}>Materials Sourced &amp; Processed</h3>
                  <div className={styles.pills}>
                    {project.materialsUsed.map((mat) => {
                      const match = productsData.find(p => p.name.toLowerCase() === mat.toLowerCase() || mat.toLowerCase().includes(p.name.toLowerCase()));
                      if (match) {
                        return (
                          <Link key={mat} href={`/collections/${match.type}/${match.slug}`} className={styles.pill}>
                            {mat}
                          </Link>
                        );
                      }
                      return (
                        <span key={mat} className={`${styles.pill} ${styles.pillStatic}`}>{mat}</span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Finishes Sourced */}
              {project.finishesUsed.length > 0 && (
                <div className={styles.materialsGroup}>
                  <h3 className={styles.groupTitle}>Spec Surface Finishes</h3>
                  <div className={styles.pills}>
                    {project.finishesUsed.map((finish) => (
                      <Link key={finish} href={`/finishes/${finish}`} className={`${styles.pill} ${styles.pillFinish}`}>
                        {finish.charAt(0).toUpperCase() + finish.slice(1)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right: Images Gallery & Sticky Inquiry */}
            <div className={styles.right}>
              <ProjectGallery images={project.images} title={project.title} />

              {/* Specs Box */}
              <div className={styles.specsBox}>
                <h3 className={styles.specsTitle}>Architectural Specifications</h3>
                {(project.specs ?? [
                  { key: 'Stone Origins', val: 'Kishangarh Yard & Imports' },
                  { key: 'Process Standards', val: 'Italian Gang-Saw Cut & Line Polished' },
                  { key: 'Thickness', val: project.thickness ?? '16mm / 18mm / 20mm Custom Slabs' },
                ]).map((row) => (
                  <div key={row.key} className={styles.specsRow}>
                    <span className={styles.specsKey}>{row.key}</span>
                    <span className={styles.specsVal}>{row.val}</span>
                  </div>
                ))}
              </div>

              {/* Inquiry CTA */}
              <div className={styles.ctaCard}>
                <h4>Recreate This Aesthetic</h4>
                <p>Discuss custom dimension processing, stone block selection, or sitemap specs for your project with our consultants.</p>
                <a
                  data-wa-source="project_detail"
                  href={`https://wa.me/919116622422?text=${encodeURIComponent(`Hello, I'm interested in natural stone solutions similar to your landmark case study: ${project.title}. Please guide me.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-copper btn-full"
                >
                  <span>Inquire about this project</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Recommended Stones Grid */}
      {relatedStones.length > 0 && (
        <section className={styles.stonesSection}>
          <div className={styles.container}>
            <div className={styles.stonesHeader}>
              <span className="section-eyebrow">Specifications</span>
              <h2 className={styles.sectionTitle}>Featured Stones from this <em>Project</em></h2>
            </div>
            <div className={styles.stonesGrid}>
              {relatedStones.map((p) => (
                <Link key={p.slug} href={`/collections/${p.type}/${p.slug}`} className={styles.stoneCard}>
                  <div className={styles.stoneImgWrap}>
                    <Image src={p.cardImage} alt={p.name} fill sizes="25vw" className={styles.stoneImg} />
                  </div>
                  <div className={styles.stoneOverlay} />
                  <div className={styles.stoneContent}>
                    {p.tag && <span className={styles.stoneTag}>{p.tag}</span>}
                    <p className={styles.stoneName}>{p.name}</p>
                    <p className={styles.stoneOrigin}>{p.origin}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Landmark Projects */}
      {relatedProjects.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.container}>
            <div className={styles.relatedHeader}>
              <span className="section-eyebrow">Our Legacy</span>
              <h2 className={styles.sectionTitle}>Explore More <em>Landmark Portfolio</em></h2>
            </div>
            <div className={styles.relatedGrid}>
              {relatedProjects.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedImgWrap}>
                    <Image src={p.heroImage} alt={p.title} fill sizes="25vw" className={styles.relatedImg} />
                  </div>
                  <div className={styles.relatedOverlay} />
                  <div className={styles.relatedContent}>
                    <span className={styles.relatedCategory}>{p.category}</span>
                    <p className={styles.relatedName}>{p.title}</p>
                    <p className={styles.relatedSub}>{p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BannerContactForm />
    </>
  );
}
