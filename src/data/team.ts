import { TeamMember } from '../types';

export interface ExtendedTeamMember extends TeamMember {
  slug: string;
  phone: string;
  email?: string;
  expertise: string;
  linkedin?: string;
  instagram?: string;
  // ── Profile / V-card detail ──
  bio: string;
  location: string;
  experience: string;
  languages: string[];
  specialties: string[];
  // ── Per-member SEO (mirrors Project meta fields) ──
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  ogImage?: string;
}

// ── Real team members (sourced from Granite Gallery records) ──
export const teamMembers: ExtendedTeamMember[] = [
  {
    slug: 'amit-rathi',
    name: 'Amit Rathi',
    role: 'Founder & Director',
    image: '/images/team/amit-rathi.webp',
    phone: '+91 91668 82222',
    email: 'Amitinvogue@gmail.com',
    instagram: 'https://www.instagram.com/amitinvogue',
    expertise: 'Product Development & Natural Stone Specialist',
    location: 'Kishangarh, Rajasthan',
    experience: '20+ Years',
    languages: ['English', 'Hindi'],
    specialties: ['Product Development', 'Sandstone & Quartzite', 'Architectural Stone Solutions', 'Natural Stone Sourcing'],
    bio: 'With over 20 years of experience in the natural stone industry, Amit Rathi leads Granite Gallery India\'s vision of innovation, quality, and excellence. He specializes in new product development, sandstone, quartzite, and customized architectural stone solutions. His deep understanding of materials, market trends, and customer requirements has helped create distinctive stone products for architects, builders, developers, hospitality projects, and global clients. His passion for innovation and craftsmanship continues to drive Granite Gallery India\'s growth as a trusted name in natural stone.',
    metaTitle: 'Amit Rathi — Founder & Director | Granite Gallery India',
    metaDescription: 'Meet Amit Rathi, Founder & Director of Granite Gallery India — Product Development & Natural Stone Specialist with 20+ years of natural stone industry experience.',
    keywords: ['Amit Rathi', 'Granite Gallery Founder', 'Natural Stone Specialist', 'Sandstone Quartzite Expert', 'Product Development Stone'],
  },
  {
    slug: 'shrikant-dargar',
    name: 'Shreekant Dargar',
    role: 'Head – Accounts & Finance',
    image: '/images/team/shrikant-dargar.webp',
    phone: '+91 96729 54000',
    email: 'granitegalleryindia@gmail.com',
    instagram: 'https://www.instagram.com/shreekantdargar/',
    expertise: 'Head – Accounts & Finance',
    location: 'Kishangarh, Rajasthan',
    experience: '15+ Years',
    languages: ['English', 'Hindi', 'Marwari'],
    specialties: ['Financial Planning', 'Accounting Systems', 'Taxation & Compliance', 'Business Controls'],
    bio: 'Shreekant Dargar manages the company\'s financial operations, ensuring strong financial planning, accounting systems, taxation, compliance, and business controls. With a focus on accuracy, transparency, and financial discipline, he plays a vital role in maintaining operational stability and supporting sustainable growth. His expertise ensures efficient financial management and strong governance across the organization.',
    metaTitle: 'Shreekant Dargar — Head – Accounts & Finance | Granite Gallery India',
    metaDescription: 'Meet Shreekant Dargar, Head – Accounts & Finance at Granite Gallery India, directing financial planning, accounting systems, taxation, compliance, and business controls.',
    keywords: ['Shreekant Dargar', 'Head Accounts & Finance', 'Granite Gallery finance head', 'stone industry accounting', 'financial governance'],
  },
  {
    slug: 'vishal-rathi',
    name: 'Vishal Rathi',
    role: 'IIT Alumnus | Head – CNC Technology & Design',
    image: '/images/team/vishal-rathi.webp',
    phone: '+91 77520 04484',
    email: 'granitegalleryindia@gmail.com',
    instagram: 'https://www.instagram.com/_vishal.rathi/',
    expertise: 'IIT Alumnus | Head – CNC Technology & Design',
    location: 'Kishangarh, Rajasthan',
    experience: '12+ Years',
    languages: ['English', 'Hindi'],
    specialties: ['CNC Technology', 'CAD/CAM Design', 'Digital Manufacturing', 'Precision Stone Carving'],
    bio: 'An IIT alumnus with expertise in engineering and digital manufacturing, Vishal Rathi leads Granite Gallery India\'s CNC operations, CAD/CAM designing, and advanced machining processes. He specializes in transforming creative concepts into precision-crafted stone products using modern technology. His technical expertise enables the execution of intricate carvings, sculptures, architectural elements, and customized stone designs with exceptional accuracy and craftsmanship.',
    metaTitle: 'Vishal Rathi — Head – CNC Technology & Design | Granite Gallery India',
    metaDescription: 'Meet Vishal Rathi, IIT Alumnus and Head – CNC Technology & Design at Granite Gallery India, leading digital manufacturing, CAD/CAM design, and precision stone carving.',
    keywords: ['Vishal Rathi', 'IIT Alumnus', 'CNC Technology', 'Stone Design Specialist', 'CAD CAM stone milling', 'Granite Gallery'],
  },
  {
    slug: 'anuj-rathi',
    name: 'Anuj Rathi',
    role: 'Head – Plant Operations & Manufacturing',
    image: '/images/team/anuj-rathi.webp',
    phone: '+91 80003 869070',
    email: 'granitegalleryindia@gmail.com',
    instagram: 'https://www.instagram.com/rathianuj3/',
    expertise: 'Head – Plant Operations & Manufacturing',
    location: 'Kishangarh, Rajasthan',
    experience: '10+ Years',
    languages: ['English', 'Hindi'],
    specialties: ['Plant Operations', 'Manufacturing & Slicing', 'Quality Control', 'Inventory & Logistics'],
    bio: 'Anuj Rathi oversees the day-to-day operations of Granite Gallery India\'s manufacturing facility, ensuring smooth production and efficient workflow. He manages production planning, team coordination, quality control, inventory movement, and process optimization. His focus on operational excellence, timely execution, and maintaining consistent quality standards plays a key role in delivering premium natural stone products to clients across India and international markets.',
    metaTitle: 'Anuj Rathi — Head – Plant Operations & Manufacturing | Granite Gallery India',
    metaDescription: 'Meet Anuj Rathi, Head – Plant Operations & Manufacturing at Granite Gallery India, directing factory production, quality control, and inventory workflow.',
    keywords: ['Anuj Rathi', 'Head Plant Operations', 'Granite Gallery Manufacturing', 'stone factory management', 'production planning'],
  },
];

// ── Lookup helper for the [slug] route ──
export const getTeamMember = (slug: string): ExtendedTeamMember | undefined =>
  teamMembers.find((m) => m.slug === slug);
