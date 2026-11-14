import Hero from '../sections/home/Hero';
import TrustStrip from '../sections/home/TrustStrip';
import Story from '../sections/home/Story';
import Favourites from '../sections/home/Favourites';
import ServicesTeaser from '../sections/home/ServicesTeaser';
import Testimonials from '../sections/shared/Testimonials';
import GalleryStrip from '../sections/shared/GalleryStrip';
import CtaBand from '../sections/shared/CtaBand';
import { usePageMeta, businessSchema } from '../lib/seo';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    businessSchema,
    {
      '@type': 'WebSite',
      '@id': 'https://cherrylskitchen.ng/#website',
      url: 'https://cherrylskitchen.ng/',
      name: "Cheryl's Kitchen",
      inLanguage: 'en-NG',
      publisher: { '@id': 'https://cherrylskitchen.ng/#business' },
    },
  ],
};

export default function Home() {
  usePageMeta({
    title: 'Lagos Catering, Small Chops & Party Jollof',
    description:
      "Cheryl's Kitchen caters weddings, parties and offices across Lagos — small chops, smoky party jollof, soups and grills, cooked fresh in small batches. Order on WhatsApp: 0903 544 8624.",
    path: '/',
    jsonLd: homeJsonLd,
  });

  return (
    <>
      <Hero />
      <TrustStrip />
      <Story />
      <Favourites />
      <ServicesTeaser />
      <Testimonials />
      <GalleryStrip />
      <CtaBand />
    </>
  );
}
