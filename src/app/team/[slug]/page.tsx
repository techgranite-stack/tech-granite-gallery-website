import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BannerContactForm from '@/components/sections/BannerContactForm';
import StatsBand from '@/components/sections/StatsBand';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import { teamMembers, getTeamMember } from '@/data/team';
import { testimonials } from '@/data/testimonials';
import type { StatItem } from '@/types';
import styles from './teamMember.module.css';

const SITE = 'https://granitegalleryindia.com';

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return { title: 'Team Member — Granite Gallery' };

  return {
    title: member.metaTitle,
    description: member.metaDescription,
    keywords: member.keywords,
    openGraph: {
      title: member.metaTitle,
      description: member.metaDescription,
      type: 'profile',
      images: [member.ogImage ?? member.image],
    },
    alternates: { canonical: `/team/${member.slug}` },
  };
}

export default async function TeamMemberPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const phoneRaw = member.phone.replace(/\s+/g, '');
  const waNumber = phoneRaw.replace('+', '');
  const [firstName, ...rest] = member.name.split(' ');
  const lastName = rest.join(' ');

  // ── Downloadable .vcf (actual vCard contact) ──
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${member.name}`,
    'ORG:Granite Gallery',
    `TITLE:${member.role}`,
    `TEL;TYPE=CELL:${phoneRaw}`,
    member.email ? `EMAIL;TYPE=WORK:${member.email}` : '',
    `ADR;TYPE=WORK:;;${member.location};;;;India`,
    `URL:${SITE}/team/${member.slug}`,
    `NOTE:${member.expertise}`,
    'END:VCARD',
  ].filter(Boolean).join('\n');
  const vcfHref = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcf)}`;

  // ── Structured data — Person (ranking) + Breadcrumb ──
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      image: member.image,
      telephone: phoneRaw,
      ...(member.email ? { email: member.email } : {}),
      url: `${SITE}/team/${member.slug}`,
      worksFor: { '@type': 'Organization', name: 'Granite Gallery', url: SITE },
      knowsAbout: member.specialties,
      knowsLanguage: member.languages,
      address: {
        '@type': 'PostalAddress',
        addressLocality: member.location,
        addressCountry: 'IN',
      },
      sameAs: [member.linkedin, member.instagram].filter(Boolean),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Team', item: `${SITE}/team` },
        { '@type': 'ListItem', position: 3, name: member.name, item: `${SITE}/team/${member.slug}` },
      ],
    },
  ];

  const others = teamMembers.filter((m) => m.slug !== member.slug).slice(0, 3);

  // ── Custom trust numbers — personalised to this member (fills the 6-col band) ──
  const memberStats: StatItem[] = [
    { number: member.experience.replace(/\s*Years?/i, '').trim(), label: 'Years of Experience' },
    { number: String(member.specialties.length), label: 'Core Specialties' },
    { number: String(member.languages.length), label: 'Languages Spoken' },
    { number: '100+', label: 'Projects Delivered' },
    { number: '10+', label: 'Countries Served' },
    { number: '30 min', label: 'Avg. Response Time' },
  ];

  // ── Personalised marquee — the member's specialties + brand ──
  const memberMarquee = [...member.specialties, 'Kishangarh Stone', 'Granite Gallery'];

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.bcSep}>/</span>
          <Link href="/team">Team</Link>
          <span className={styles.bcSep}>/</span>
          <span className={styles.bcCurrent}>{member.name}</span>
        </nav>

        <div className={styles.layout}>
          {/* ── V-card ── */}
          <article className={styles.vcard}>
            <div className={styles.cover} aria-hidden="true" />

            <div className={styles.portraitWrap}>
              <Image
                src={member.image}
                alt={`${member.name}, ${member.role} at Granite Gallery`}
                fill
                sizes="160px"
                className={styles.portrait}
                priority
              />
            </div>

            <h1 className={styles.name}>{member.name}</h1>
            <p className={styles.role}>{member.role}</p>
            <span className={styles.flourish} aria-hidden="true" />
            <p className={styles.expertise}>{member.expertise}</p>

            {/* Contact actions */}
            <div className={styles.actions}>
              <a href={`tel:${phoneRaw}`} className={styles.action} aria-label={`Call ${member.name}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call</span>
              </a>
              <a data-wa-source="team_detail" href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className={`${styles.action} ${styles.actionWa}`} aria-label={`WhatsApp ${member.name}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                </svg>
                <span>WhatsApp</span>
              </a>
              {member.email && (
                <a href={`mailto:${member.email}`} className={styles.action} aria-label={`Email ${member.name}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </svg>
                  <span>Email</span>
                </a>
              )}
              {member.instagram && (
                <a href={member.instagram} target="_blank" rel="noopener noreferrer" className={styles.action} aria-label={`Instagram profile of ${member.name}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>Instagram</span>
                </a>
              )}
            </div>

            {/* Save contact (vCard) */}
            <a href={vcfHref} download={`${member.name.replace(/\s+/g, '-')}.vcf`} className={styles.saveBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="M7 10l5 5 5-5" />
                <path d="M12 15V3" />
              </svg>
              Save Contact
            </a>
          </article>

          {/* ── Detail column ── */}
          <div className={styles.detail}>
            <section className={styles.block}>
              <span className="section-eyebrow">About</span>
              <h2 className={styles.blockTitle}>{firstName}&apos;s <em>Story</em></h2>
              <p className={styles.bio}>{member.bio}</p>
            </section>

            <section className={styles.block}>
              <h3 className={styles.subTitle}>Areas of Expertise</h3>
              <div className={styles.chips}>
                {member.specialties.map((s) => (
                  <span key={s} className={styles.chip}>{s}</span>
                ))}
              </div>
            </section>

            <section className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoKey}>Experience</span>
                <span className={styles.infoVal}>{member.experience}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoKey}>Based In</span>
                <span className={styles.infoVal}>{member.location}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoKey}>Languages</span>
                <span className={styles.infoVal}>{member.languages.join(', ')}</span>
              </div>
            </section>
          </div>
        </div>

        {/* Other members */}
        {others.length > 0 && (
          <section className={styles.others}>
            <div className={styles.othersHeader}>
              <span className="section-eyebrow">The Team</span>
              <h2 className={styles.blockTitle}>Meet the Rest of Our <em>Leadership</em></h2>
            </div>
            <div className={styles.othersGrid}>
              {others.map((m) => (
                <Link key={m.slug} href={`/team/${m.slug}`} className={styles.otherCard}>
                  <div className={styles.otherImgWrap}>
                    <Image src={m.image} alt={m.name} fill sizes="(max-width: 768px) 33vw, 200px" className={styles.otherImg} />
                  </div>
                  <p className={styles.otherName}>{m.name}</p>
                  <p className={styles.otherRole}>{m.role}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Custom trust numbers */}
      <StatsBand stats={memberStats} />

      {/* Personalised marquee */}
      <ScrollingTagline items={memberMarquee} />

      {/* Testimonials */}
      <MarqueeTestimonials testimonials={testimonials} />

      <BannerContactForm />
    </div>
  );
}
