import React, { useEffect } from 'react';
import { defaultKeywords } from '../../lib/seo';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  schema?: Record<string, unknown>;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Medynex Solutions LLP | MediTrust – Digital Healthcare Platform',
  description = 'Medynex Solutions LLP is building MediTrust, a digital healthcare platform connecting patients, doctors, pharmacies and AI to simplify healthcare through secure appointments, healthcare discovery and digital solutions.',
  keywords = defaultKeywords,
  canonicalUrl,
  ogImage = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
  ogType = 'website',
  noindex = false,
  schema
}) => {
  useEffect(() => {
    // Current URL canonical fallback
    const currentUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0].replace(/\/$/, '') : 'https://medynex.com';
    const effectiveCanonical = canonicalUrl || currentUrl;

    // Formatted Title
    const formattedTitle = title.includes('Medynex') || title.includes('MediTrust')
      ? title
      : `${title} | Medynex Solutions LLP`;
    document.title = formattedTitle;

    // Helper function to update or create meta tag
    const updateMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Description
    updateMeta("meta[name='description']", 'name', 'description', description);

    // Keywords
    if (keywords && keywords.length > 0) {
      updateMeta("meta[name='keywords']", 'name', 'keywords', keywords.join(', '));
    }

    // Robots / Noindex
    let robotsEl = document.querySelector("meta[name='robots']");
    if (noindex) {
      if (!robotsEl) {
        robotsEl = document.createElement('meta');
        robotsEl.setAttribute('name', 'robots');
        document.head.appendChild(robotsEl);
      }
      robotsEl.setAttribute('content', 'noindex, nofollow');
    } else if (robotsEl) {
      robotsEl.setAttribute('content', 'index, follow');
    }

    // Canonical Tag
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', effectiveCanonical);

    // OG & Twitter Meta Tags
    const ogTags = [
      { property: 'og:title', content: formattedTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: effectiveCanonical },
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: 'Medynex Solutions LLP - MediTrust' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: formattedTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage }
    ];

    ogTags.forEach(({ property, name, content }) => {
      const attr = property ? 'property' : 'name';
      const val = property || name;
      updateMeta(`meta[${attr}='${val}']`, attr, val!, content);
    });

    // Structured Data JSON-LD
    const schemaId = 'medynex-jsonld-schema';
    let scriptEl = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = schemaId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    if (schema) {
      scriptEl.text = JSON.stringify(schema);
    } else {
      scriptEl.text = JSON.stringify({
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
            ]
          },
          {
            '@type': 'WebPage',
            '@id': `${effectiveCanonical}/#webpage`,
            'url': effectiveCanonical,
            'name': formattedTitle,
            'description': description,
            'publisher': {
              '@id': 'https://medynex.com/#organization'
            }
          }
        ]
      });
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, noindex, schema]);

  return null;
};
