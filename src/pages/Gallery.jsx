import { useCallback, useMemo, useState } from 'react';
import PageHero from '../components/layout/PageHero';
import Picture from '../components/ui/Picture';
import Reveal from '../components/ui/Reveal';
import Lightbox from '../components/ui/Lightbox';
import CtaBand from '../sections/shared/CtaBand';
import { photos } from '../data/site';
import { usePageMeta, businessSchema, breadcrumbSchema } from '../lib/seo';
import { SparkleIcon } from '../components/ui/icons';

const items = [
  {
    name: photos.catering,
    caption: 'Event catering',
    alt: 'A styled buffet spread with jollof rice, grilled chicken, small chops and salads at an outdoor Lagos wedding reception',
    group: 'Events',
    wide: true,
  },
  {
    name: photos.smallChops,
    caption: 'Small chops',
    alt: 'An overhead platter of Nigerian small chops — puff puff, samosa, spring rolls, suya and peppered gizzard with pepper dip',
    group: 'Small chops',
  },
  {
    name: photos.hero,
    caption: 'Party jollof',
    alt: 'A plate of smoky party jollof rice with grilled chicken, fried plantain and coleslaw on a cream ceramic plate',
    group: 'Mains',
  },
  {
    name: photos.suya,
    caption: 'Suya grill',
    alt: 'Beef suya skewers grilling over glowing charcoal with onion and tomato on the side',
    group: 'Small chops',
  },
  {
    name: photos.egusi,
    caption: 'Egusi & pounded yam',
    alt: 'A clay bowl of egusi soup with assorted meat beside two rounds of pounded yam on a raffia mat',
    group: 'Mains',
  },
  {
    name: photos.puffPuff,
    caption: 'Puff puff',
    alt: 'A woven basket lined with parchment and overflowing with golden Nigerian puff puff, with a chilli dip beside it',
    group: 'Small chops',
  },
  {
    name: photos.chicken,
    caption: 'Peppered chicken',
    alt: 'Grilled chicken pieces tossed in thick red pepper sauce with onions and sweet pepper in a terracotta bowl',
    group: 'Mains',
  },
  {
    name: photos.drinks,
    caption: 'Zobo & chapman',
    alt: 'Two glasses of deep red zobo and one glass of orange chapman with ice, mint and fruit garnish on a brass tray',
    group: 'Drinks',
  },
  {
    name: photos.asun,
    caption: 'Asun',
    alt: 'Charred peppered goat meat with red onion and scotch bonnet in a rustic dark clay bowl',
    group: 'Mains',
  },
  {
    name: photos.kitchen,
    caption: 'In the kitchen',
    alt: 'Fresh Nigerian cooking ingredients arranged on a green cloth around an iron pot in a home kitchen',
    group: 'Behind the scenes',
    wide: true,
  },
];

const groups = ['All', ...new Set(items.map((i) => i.group))];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);

  usePageMeta({
    title: 'Gallery — Our Food & Events',
    description:
      "Real photos from Cheryl's Kitchen: party jollof, small chops platters, suya grills, soups and styled event buffets across Lagos.",
    path: '/gallery',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        businessSchema,
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ]),
      ],
    },
  });

  const visible = useMemo(
    () => (filter === 'All' ? items : items.filter((i) => i.group === filter)),
    [filter],
  );

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + visible.length) % visible.length)),
    [visible.length],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length],
  );

  return (
    <>
      <PageHero
        crumb="Gallery"
        eyebrow="No stock photos"
        title={
          <>
            Our food, our plates,
            <br />
            our
            <span className="text-palm-400 font-serif font-normal italic"> actual kitchen</span>
          </>
        }
        lead="Every picture here is from a real order or event. Tap any photo to look closer."
      />

      <section className="py-14 sm:py-20">
        <div className="shell">
          {/* Filter */}
          <div
            role="group"
            aria-label="Filter gallery by category"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setFilter(g);
                  setActive(null);
                }}
                aria-pressed={filter === g}
                className={[
                  'shrink-0 rounded-full border px-4 py-2 text-[0.75rem] font-semibold transition-all duration-300',
                  filter === g
                    ? 'border-forest-900 bg-forest-900 text-cream-50'
                    : 'border-forest-900/15 text-forest-900/65 hover:border-forest-900/35 hover:text-forest-950',
                ].join(' ')}
              >
                {g}
              </button>
            ))}
            <span className="text-ink-soft/50 ml-auto hidden shrink-0 items-center gap-1.5 self-center text-[0.6875rem] font-medium tracking-[0.12em] uppercase sm:flex">
              <SparkleIcon className="text-palm-500 size-3" />
              {visible.length} photos
            </span>
          </div>

          {/* Masonry-ish grid */}
          <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {visible.map((item, i) => (
              <Reveal
                as="li"
                key={item.name + i}
                delay={Math.min(i * 50, 300)}
                className={[
                  'group bg-forest-900/5 relative overflow-hidden rounded-[1.1rem]',
                  item.wide ? 'col-span-2' : '',
                ].join(' ')}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Open larger image: ${item.caption}`}
                  className="block h-full w-full"
                >
                  <Picture
                    name={item.name}
                    alt={item.alt}
                    sizes={
                      item.wide
                        ? '(min-width: 1024px) 50vw, 92vw'
                        : '(min-width: 1024px) 25vw, 46vw'
                    }
                    className="block h-full w-full"
                    imgClassName={[
                      'h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]',
                      item.wide ? 'aspect-[8/5]' : 'aspect-[4/5]',
                    ].join(' ')}
                  />
                  <span
                    aria-hidden="true"
                    className="from-forest-950/70 via-forest-950/0 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="text-cream-50 absolute bottom-3 left-3.5 text-left text-[0.6875rem] font-semibold tracking-[0.14em] uppercase opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {item.caption}
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>

          <p className="text-ink-soft/60 mt-8 text-center text-[0.75rem]">
            Want photos from your own event? We photograph most setups — just ask when you book.
          </p>
        </div>
      </section>

      <Lightbox items={visible} index={active} onClose={close} onPrev={prev} onNext={next} />

      <CtaBand
        title="See something you want?"
        lead="Screenshot it and send it to us. It is the fastest way to order — we will match the tray size and give you a price."
      />
    </>
  );
}
