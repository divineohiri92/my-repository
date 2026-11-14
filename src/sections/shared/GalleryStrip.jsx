import { Link } from 'react-router-dom';
import Picture from '../../components/ui/Picture';
import Reveal from '../../components/ui/Reveal';
import { photos } from '../../data/site';
import { ArrowRight } from '../../components/ui/icons';

const shots = [
  {
    name: photos.catering,
    alt: 'A styled catering buffet spread with jollof, grills and small chops at a Lagos wedding',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  { name: photos.suya, alt: 'Suya beef skewers grilling over charcoal' },
  { name: photos.puffPuff, alt: 'A basket of golden Nigerian puff puff' },
  { name: photos.drinks, alt: 'Glasses of zobo and chapman on a brass tray' },
  { name: photos.asun, alt: 'Peppered asun goat meat in a clay bowl' },
];

/** Asymmetric photo wall that links into the gallery page. */
export default function GalleryStrip() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal as="p" className="eyebrow text-forest-700/70">
              <span className="bg-forest-700/40 h-px w-6" />
              From the kitchen
            </Reveal>
            <Reveal
              as="h2"
              delay={60}
              className="text-forest-950 mt-4 max-w-md text-[2rem] leading-[0.98] sm:text-[2.6rem]"
            >
              Look at it before you
              <span className="text-forest-700 font-serif font-normal italic"> order it</span>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <Link
              to="/gallery"
              className="group text-forest-950 inline-flex items-center gap-2 text-sm font-semibold"
            >
              <span className="border-palm-500/50 group-hover:border-palm-500 border-b pb-0.5 transition-colors">
                Open the gallery
              </span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {shots.map((shot, i) => (
            <Reveal
              key={shot.name}
              delay={i * 70}
              className={[
                'group bg-forest-900/5 relative overflow-hidden rounded-[1.25rem]',
                shot.span ?? '',
              ].join(' ')}
            >
              <Link to="/gallery" className="block h-full" aria-label="View the gallery">
                <Picture
                  name={shot.name}
                  alt={shot.alt}
                  sizes={
                    shot.span ? '(min-width: 1024px) 50vw, 50vw' : '(min-width: 1024px) 25vw, 50vw'
                  }
                  className="block h-full w-full"
                  imgClassName={[
                    'h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]',
                    shot.span ? 'aspect-[4/3] lg:aspect-auto lg:h-full' : 'aspect-square',
                  ].join(' ')}
                />
                <span className="bg-forest-950/0 group-hover:bg-forest-950/15 pointer-events-none absolute inset-0 transition-colors duration-500" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
