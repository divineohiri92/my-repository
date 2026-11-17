import { Link } from 'react-router-dom';
import Picture from '../../components/ui/Picture';
import Reveal from '../../components/ui/Reveal';
import { photos } from '../../data/site';
import { ArrowRight } from '../../components/ui/icons';

const stats = [
  { value: '2,400+', label: 'Plates served' },
  { value: '180+', label: 'Events catered' },
  { value: '8 yrs', label: 'In the kitchen' },
];

/** Short, human origin story — the "who is behind the food" trust signal. */
export default function Story() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Images */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="bg-forest-900/5 overflow-hidden rounded-[1.75rem]">
                <Picture
                  name={photos.kitchen}
                  alt="Fresh Nigerian cooking ingredients — peppers, onions, tomatoes and spices — laid out on a kitchen counter"
                  sizes="(min-width: 1024px) 44vw, (min-width: 640px) 70vw, 90vw"
                  className="block aspect-[4/3.4] w-full"
                  imgClassName="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>

              {/* Overlap card */}
              <div className="border-cream-50 absolute -right-2 -bottom-8 w-40 overflow-hidden rounded-2xl border-4 shadow-xl sm:-right-5 sm:w-48">
                <Picture
                  name={photos.egusi}
                  alt="A bowl of egusi soup with pounded yam, served traditionally"
                  sizes="200px"
                  className="block aspect-square w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </div>

              <span className="bg-cream-50 text-forest-900 absolute -top-4 -left-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.625rem] font-bold tracking-[0.14em] uppercase shadow-md">
                <span className="bg-palm-500 size-1.5 rounded-full" />
                Lagos made
              </span>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal as="p" className="eyebrow text-forest-700/70">
              <span className="bg-forest-700/40 h-px w-6" />
              Our kitchen
            </Reveal>

            <Reveal
              as="h2"
              delay={60}
              className="text-forest-950 mt-5 text-[2rem] leading-[0.98] sm:text-[2.75rem] lg:text-[3.15rem]"
            >
              Started with one pot and a
              <span className="text-forest-700 font-serif font-normal tracking-[-0.02em] italic">
                {' '}
                Sunday habit
              </span>
            </Reveal>

            <Reveal
              as="div"
              delay={120}
              className="text-ink-soft mt-6 space-y-4 text-[0.9375rem] leading-relaxed"
            >
              <p>
                Cheryl has been cooking for people her whole life. It started at home — big Sunday
                pots of egusi, jollof for every birthday, small chops whenever someone was
                celebrating.
              </p>
              <p>
                Eventually friends started asking to pay for it. Then their friends did. Then a
                wedding for 200 people, and we had to buy a second freezer.
              </p>
              <p className="text-forest-900 font-medium">
                What hasn&rsquo;t changed: we still cook in small batches, we still taste everything
                before it leaves the kitchen, and we still answer our own WhatsApp messages.
              </p>
            </Reveal>

            <Reveal
              as="dl"
              delay={180}
              className="border-forest-900/10 mt-9 grid grid-cols-3 gap-4 border-t pt-7"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="font-display text-forest-950 block text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
                      {s.value}
                    </span>
                    <span className="text-ink-soft/70 mt-1 block text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </Reveal>

            <Reveal delay={220} className="mt-8">
              <Link
                to="/about"
                className="group text-forest-950 inline-flex items-center gap-2 text-sm font-semibold"
              >
                <span className="border-palm-500/50 group-hover:border-palm-500 border-b pb-0.5 transition-colors">
                  More about us
                </span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
