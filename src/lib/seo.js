import { useEffect } from 'react';
import { site } from '../data/site';

/** Create-or-update a <meta> tag, supporting name= and property=. */
function setMeta(key, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Applies page metadata on navigation: title, description, canonical,
 * Open Graph, Twitter card and an optional JSON-LD block.
 */
export function usePageMeta({ title, description, path = '/', image = '/og-image.jpg', jsonLd }) {
  // Serialise so an inline object literal does not re-run the effect on every render.
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`;
    const url = `${site.url}${path}`;
    const desc = description || site.description;

    document.title = fullTitle;
    setMeta('description', desc);
    setMeta('author', site.name);
    setMeta('theme-color', '#0f2318');
    setLink('canonical', url);

    // Open Graph
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', site.name, 'property');
    setMeta('og:locale', site.locale, 'property');
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', desc, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:image', `${site.url}${image}`, 'property');
    setMeta('og:image:width', '1200', 'property');
    setMeta('og:image:height', '630', 'property');
    setMeta('og:image:alt', `A catering spread by ${site.name}`, 'property');

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', `${site.url}${image}`);

    // Structured data (replaced on every navigation)
    document.querySelector('script[data-seo-jsonld="page"]')?.remove();
    if (jsonLdString) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = 'page';
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }
  }, [title, description, path, image, jsonLdString]);
}

/* ── Reusable schema objects ─────────────────────────────────────────────── */

const postalAddress = {
  '@type': 'PostalAddress',
  addressLocality: site.city,
  addressRegion: site.region,
  addressCountry: 'NG',
};

export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': ['FoodEstablishment', 'LocalBusiness'],
  '@id': `${site.url}/#business`,
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/og-image.jpg`,
  logo: `${site.url}/favicon.svg`,
  telephone: `+${site.phone.whatsapp}`,
  email: site.email,
  priceRange: '₦₦',
  servesCuisine: ['Nigerian', 'West African', 'Catering'],
  currenciesAccepted: 'NGN',
  paymentAccepted: 'Bank transfer, Cash',
  address: postalAddress,
  geo: { '@type': 'GeoCoordinates', latitude: 6.5244, longitude: 3.3792 },
  areaServed: site.areaServed.map((a) => ({ '@type': 'City', name: a })),
  sameAs: site.socials.map((s) => s.href),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  potentialAction: {
    '@type': 'OrderAction',
    target: `https://wa.me/${site.phone.whatsapp}`,
  },
};

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${site.url}${item.path}`,
  })),
});
