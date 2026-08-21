import { useEffect } from 'react';
export { SEO, type SEOProps as ReactSEOProps } from '../components/common/SEO';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schema?: Record<string, unknown>;
}

// Master Keyword Sets matching exact User Technical SEO Specifications
export const HOMEPAGE_KEYWORDS = [
  // Company Keywords
  'Medynex Solutions', 'Medynex Solutions LLP', 'Medynex', 'Medynex Healthcare', 'Medynex Healthcare Technology', 'Medynex India', 'Healthcare Startup India', 'Digital Healthcare Company', 'HealthTech Startup', 'Healthcare Software Company', 'Medical Technology Company', 'Healthcare Innovation', 'Healthcare AI', 'Healthcare Platform', 'AI Healthcare Platform',
  // MediTrust Keywords
  'MediTrust', 'MediTrust Healthcare', 'MediTrust App', 'MediTrust Platform', 'MediTrust India', 'MediTrust Doctor Booking', 'MediTrust AI', 'MediTrust Pharmacy', 'MediTrust Hospitals', 'MediTrust Medical Platform',
  // Doctor Search Keywords
  'Doctors near me', 'Best doctors near me', 'Find doctors nearby', 'Book doctor appointment', 'Online doctor booking', 'Nearby clinic', 'General physician', 'Cardiologist', 'Pediatrician', 'Dentist', 'Dermatologist', 'Orthopedic doctor', 'Neurologist', 'Gynecologist', 'ENT specialist',
  // Pharmacy Keywords
  'Pharmacy near me', 'Medical store near me', '24 hour pharmacy', 'Medicine delivery', 'Nearby medical shop', 'Pharmacy finder',
  // Hospital Keywords
  'Hospital near me', 'Best hospital near me', 'Emergency hospital', 'Multi-specialty hospital', 'Private hospital', 'Government hospital',
  // Laboratory Keywords
  'Diagnostic lab near me', 'Blood test', 'Health checkup', 'Pathology lab', 'Medical laboratory',
  // AI Keywords
  'AI healthcare assistant', 'AI medical assistant', 'AI symptom checker', 'Medicine verification', 'Digital prescription', 'AI healthcare chatbot'
];

export const FOUNDER_KEYWORDS = [
  'Afriz Shaik',
  'Shaik Afriz',
  'Afriz Shaik Founder',
  'Afriz Shaik Medynex',
  'Afriz Shaik MediTrust',
  'Founder of Medynex Solutions',
  'Founder of MediTrust',
  'Healthcare startup founder',
  'Student entrepreneur',
  'HealthTech founder',
  'Shaik Afriz CEO',
  'Mohan Babu University alumnus',
  'Healthcare AI Innovator'
];

export const COFOUNDER_KEYWORDS = [
  'B. Nandini',
  'B Nandini',
  'Bandi Nandini',
  'Nandini Medynex',
  'Medynex Co-Founder',
  'MediTrust Co-Founder',
  'Healthcare startup co-founder',
  'Bandi Nandini Operations',
  'Medynex Head of Operations'
];

export const DOCTOR_SEARCH_KEYWORDS = [
  'Doctors near me', 'Best doctors near me', 'Find doctors nearby', 'Book doctor appointment', 'Online doctor booking', 'Nearby clinic', 'General physician', 'Cardiologist', 'Pediatrician', 'Dentist', 'Dermatologist', 'Orthopedic doctor', 'Neurologist', 'Gynecologist', 'ENT specialist', 'Doctors in Hyderabad', 'Doctors in Tirupati', 'Doctors in Kanigiri', 'MediTrust Doctor Booking'
];

export const PHARMACY_SEARCH_KEYWORDS = [
  'Pharmacy near me', 'Medical store near me', '24 hour pharmacy', 'Medicine delivery', 'Nearby medical shop', 'Pharmacy finder', 'Pharmacies in Hyderabad', 'Pharmacies in Tirupati', 'Pharmacies in Kanigiri', 'MediTrust Digital Prescription'
];

export const HOSPITAL_SEARCH_KEYWORDS = [
  'Hospital near me', 'Best hospital near me', 'Emergency hospital', 'Multi-specialty hospital', 'Private hospital', 'Government hospital', 'Hospitals in Hyderabad', 'Hospitals in Tirupati', 'Hospitals in Kanigiri', 'MediTrust Digital Queue Tokens'
];

export const LAB_SEARCH_KEYWORDS = [
  'Diagnostic lab near me', 'Blood test', 'Health checkup', 'Pathology lab', 'Medical laboratory', 'Diagnostic labs in Hyderabad', 'Labs in Tirupati', 'MediTrust Diagnostic Network'
];

export const AI_KEYWORDS = [
  'AI healthcare assistant', 'AI medical assistant', 'AI symptom checker', 'Medicine verification', 'Digital prescription', 'AI healthcare chatbot', 'MediTrust Clinical AI'
];

export const defaultKeywords = HOMEPAGE_KEYWORDS;

export function updateSEO({
  title = 'Medynex Solutions LLP | MediTrust – Digital Healthcare Platform for Patients, Doctors & Pharmacies',
  description = 'Medynex Solutions LLP is building MediTrust, a digital healthcare platform connecting patients, doctors, pharmacies and AI to simplify healthcare through secure appointments, healthcare discovery and digital solutions.',
  keywords = defaultKeywords,
  canonicalUrl,
  ogImage = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
  ogType = 'website',
  schema
}: SEOProps) {
  useEffect(() => {
    // Current window canonical fallback
    const effectiveCanonical = canonicalUrl || window.location.href.split('?')[0].replace(/\/$/, '') || 'https://medynex.com';

    // Update Title
    document.title = title.includes('Medynex') || title.includes('MediTrust') ? title : `${title} | Medynex Solutions LLP`;

    // Update Meta Description
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Meta Keywords
    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords.join(', '));

    // Update Canonical Tag (<link rel="canonical" ...>)
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', effectiveCanonical);

    // Update OG & Twitter Tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: effectiveCanonical },
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: 'Medynex Solutions LLP - MediTrust' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage }
    ];

    ogTags.forEach(({ property, name, content }) => {
      const attr = property ? 'property' : 'name';
      const val = property || name;
      let el = document.querySelector(`meta[${attr}='${val}']`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, val!);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    });

    // Inject JSON-LD Schema
    const schemaId = 'medynex-jsonld-schema';
    let scriptEl = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = schemaId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const defaultOrganizationSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://medynex.com/#organization',
          'name': 'Medynex Solutions LLP',
          'alternateName': 'Medynex Solutions',
          'url': 'https://medynex.com',
          'slogan': 'Innovating Healthcare Through Technology',
          'logo': 'https://medynex.com/logo.png',
          'sameAs': [
            'https://linkedin.com/in/shaik-afriz-a49311385',
            'https://github.com/shaik-afriz'
          ],
          'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+91-8328620294',
            'email': 'medynexsolutions26@gmail.com',
            'contactType': 'customer support',
            'areaServed': 'IN',
            'availableLanguage': ['en', 'hi', 'te']
          },
          'founder': {
            '@type': 'Person',
            'name': 'Shaik Afriz',
            'jobTitle': 'Founder & Chief Executive Officer',
            'alumniOf': 'Mohan Babu University',
            'sameAs': [
              'https://linkedin.com/in/shaik-afriz-a49311385',
              'https://github.com/shaik-afriz'
            ]
          }
        },
        {
          '@type': 'WebSite',
          '@id': 'https://medynex.com/#website',
          'url': 'https://medynex.com',
          'name': 'MediTrust Platform by Medynex Solutions LLP',
          'publisher': {
            '@id': 'https://medynex.com/#organization'
          }
        },
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://medynex.com/#software',
          'name': 'MediTrust Healthcare Ecosystem',
          'operatingSystem': 'Web, iOS, Android',
          'applicationCategory': 'HealthApplication',
          'publisher': {
            '@id': 'https://medynex.com/#organization'
          }
        }
      ]
    };

    scriptEl.text = JSON.stringify(schema || defaultOrganizationSchema);
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schema]);
}

