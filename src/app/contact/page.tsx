import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import LocalInfoBlock from '@/components/sections/LocalInfoBlock';
import BannerContactForm from '@/components/sections/BannerContactForm';
import GoogleReviews from '@/components/sections/GoogleReviews';

// Daily ISR so the Google Reviews section stays fresh.
export const revalidate = 86400;
import FAQAccordion from '@/components/sections/FAQAccordion';
import { pageSeo } from '@/data/page-seo';
import { localBusinessJsonLd, trailJsonLd } from '@/lib/structured-data';
import { addressOneLine, primaryLocation, dispatch } from '@/data/local-seo';
import { siteConfig } from '@/config/site';

import { buildMetadata } from '@/lib/seo';

const seo = pageSeo['/contact'];

export const metadata: Metadata = buildMetadata({
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  canonical: '/contact',
  image: seo.ogImage,
});

/**
 * /contact — the site had no contact route at all before this.
 *
 * It matters for local search specifically: it is the conventional destination
 * for the website link on a Google Business Profile, the page "…near me" and
 * "…contact number" queries resolve to, and one of the pages Google checks when
 * corroborating the NAP in the LocalBusiness schema against visible content.
 */
export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            trailJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Contact', path: '/contact' },
            ])
          ),
        }}
      />

      <PageHero
        eyebrow={`${primaryLocation.label} · India`}
        title="Contact Granite"
        titleEm="Gallery"
        subtitle={`Speak to the people who cut the stone. Our yard and processing facility are at ${primaryLocation.label} — call, message, or come and walk the slabs.`}
        heroImages={['/images/hero/granite-gallery-kishangarh-stone-facility.webp']}
        imageAlt={`Granite Gallery stone processing facility and slab yard at ${addressOneLine}`}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        badges={[
          { value: 'Same day', label: 'Enquiry Response' },
          { value: '30+', label: 'Export Countries' },
          { value: 'Own', label: 'Processing Facility' },
        ]}
      />

      <LocalInfoBlock
        info={{
          eyebrow: 'Find Us',
          heading: 'The Kishangarh',
          headingEm: 'facility',
          intro:
            'Visitors are welcome during working hours. Call ahead with the stones you want to see and we will have those lots pulled out and standing in daylight before you arrive.',
          directions: [
            {
              label: 'By road',
              detail: `On the ${dispatch.highway} at Ralawata, Tehsil Kishangarh — roughly 30 minutes from Ajmer and about 100 km from Jaipur on NH-48.`,
            },
            {
              label: 'By air',
              detail: `${primaryLocation.airport} is the closest airport. Jaipur International (JAI) is the nearest major hub, about two hours by road.`,
            },
            {
              label: 'By rail',
              detail: `${dispatch.railhead} is the local station; Ajmer Junction is the nearest mainline stop with wider connections.`,
            },
          ],
          mapEmbedUrl:
            'https://maps.google.com/maps?q=' +
            encodeURIComponent(addressOneLine) +
            '&t=&z=15&ie=UTF8&iwloc=&output=embed',
        }}
      />

      <FAQAccordion
        eyebrow="Before You Call"
        title="Contact"
        titleEm="Questions"
        description="How to reach us, what to have ready, and what happens after you send an enquiry."
        items={[
          {
            question: 'What is the fastest way to get a quote?',
            answer: `WhatsApp on ${siteConfig.links.phone}. Send the stone name, the finish, the thickness and the approximate quantity, and you will normally have a figure the same working day. Email to ${siteConfig.links.email} works equally well if you have drawings or a BOQ to attach.`,
          },
          {
            question: 'Can I visit without an appointment?',
            answer:
              'You can, but a call ahead makes the visit far more useful. Slabs are racked across the yard, and with notice we pull the materials on your list out and stand them in daylight so you can compare them side by side rather than walking the aisles.',
          },
          {
            question: 'Do you supply outside India?',
            answer: `Yes — we have supplied stone to over 30 countries. Export consignments are crated at the facility and containerised for ${dispatch.port}. Send the port of discharge and the quantity and we will quote FOB or CIF.`,
          },
          {
            question: 'Where exactly is the facility?',
            answer: `${addressOneLine}. It sits inside the Kishangarh stone belt on the MEGA Highway, about 30 minutes from Ajmer and two hours from Jaipur.`,
          },
        ]}
      />

      <GoogleReviews tone="white" limit={3} secondaryCta={null} />

      <BannerContactForm />
    </>
  );
}
