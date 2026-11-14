import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import Picture from '../components/ui/Picture';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import CtaBand from '../sections/shared/CtaBand';
import { photos, site } from '../data/site';
import { usePageMeta, businessSchema, breadcrumbSchema } from '../lib/seo';
import { CheckIcon, ArrowRight } from '../components/ui/icons';

const values = [
  {
    title: 'Cooked to order, not to schedule',
    body: 'We do not pre-cook and reheat. Your jollof starts the morning of your event, which is why it tastes like it does.',
  },
  {
    title: 'Real portions, real meat',
    body: 'Every pot is costed so the protein actually shows up on the plate. No hunting through stew for a piece of chicken.',
  },
  {
    title: 'Small batch by choice',
    body: 'We cap how many events we take each weekend. It means we can answer our phone and still taste every pot.',
  },
  {
    title: 'Straight answers on price',
    body: 'You get an itemised quote in writing before you pay anything. No surprise “logistics” charges on delivery day.',
  },
];

const milestones = [
  {
    year: '2016',
    title: 'One pot, one freezer',
    body: 'Cheryl starts taking small orders from friends and family in Surulere.',
  },
  {
    year: '2019',
    title: 'First real wedding',
    body: 'A 200-guest wedding. We buy a second freezer and learn to write a prep sheet.',
  },
  {
    year: '2022',
    title: 'The small chops era',
    body: 'Boxed small chops take over weekends. Corporate orders start coming in.',
  },
  {
    year: '2025',
    title: 'Still small, still ours',
    body: 'Hundreds of events later, we still cap bookings so everything leaves the same kitchen.',
  },
];

export default function About() {
  usePageMeta({
    title: 'About the Kitchen',
    description:
      "Meet Cheryl's Kitchen — a Lagos catering business built on one pot, small batches and food cooked the way family food should be. Catering weddings, offices and homes since 2016.",
    path: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        businessSchema,
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]),
      ],
    },
  });

  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="Who is cooking"
        title={
          <>
            The food is personal.
            <br />
            It always has been.
          </>
        }
        lead="Cheryl's Kitchen is a small Lagos team that cooks like it is feeding family — because for a long time, that is exactly what we were doing."
      />

      {/* ── Story ─────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24">
        <div className="shell">
          <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal className="relative lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[1.75rem]">
                <Picture
                  name={photos.kitchen}
                  alt="Nigerian cooking ingredients — scotch bonnet, tomatoes, onions, melon seeds and spices — laid out in Cheryl's kitchen"
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="block aspect-[4/4.4] w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
              <div className="border-cream-50/20 bg-forest-950/70 absolute right-4 bottom-4 left-4 rounded-2xl border p-4 backdrop-blur-md">
                <p className="text-cream-50 font-serif text-[1.0625rem] leading-snug italic">
                  &ldquo;If I would not serve it to my own family, it does not leave this
                  kitchen.&rdquo;
                </p>
                <p className="text-cream-200/60 mt-2.5 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
                  Cheryl · Founder & head cook
                </p>
              </div>
            </Reveal>

            <div>
              <Reveal as="p" className="eyebrow text-forest-700/70">
                <span className="bg-forest-700/40 h-px w-6" />
                Our story
              </Reveal>

              <Reveal
                as="h2"
                delay={60}
                className="text-forest-950 mt-5 text-[1.9rem] leading-[1.02] sm:text-[2.4rem]"
              >
                It started because someone
                <span className="text-forest-700 font-serif font-normal italic">
                  {' '}
                  liked the soup
                </span>
              </Reveal>

              <Reveal
                as="div"
                delay={110}
                className="text-ink-soft mt-6 space-y-4 text-[0.9375rem] leading-relaxed"
              >
                <p>
                  Long before it was a business, Cheryl&rsquo;s kitchen was where everybody showed
                  up on Sundays. Big pots of egusi, jollof for every birthday, small chops whenever
                  there was something to celebrate.
                </p>
                <p>
                  In 2016 a friend asked to pay for a tray of jollof for an office party. Then her
                  cousin asked. Then a stranger on WhatsApp asked, and the freezer was suddenly not
                  big enough.
                </p>
                <p>
                  Today we cater weddings, naming ceremonies, corporate lunches and sleepy
                  Tuesday-night dinners across Lagos. The pots are bigger and the prep sheets are
                  longer, but the standard has not moved: taste it, then send it out.
                </p>
                <p className="text-forest-900 font-medium">
                  We are still small on purpose. Every order is cooked by our own team, in our own
                  kitchen — never subcontracted to whoever is cheapest that weekend.
                </p>
              </Reveal>

              {/* Values */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {values.map((v, i) => (
                  <Reveal
                    key={v.title}
                    delay={i * 70}
                    className="border-forest-900/8 bg-cream-100/60 rounded-2xl border p-5"
                  >
                    <CheckIcon className="text-palm-600 size-4" />
                    <h3 className="font-display text-forest-950 mt-3 text-[0.9375rem] leading-snug font-semibold tracking-[-0.015em]">
                      {v.title}
                    </h3>
                    <p className="text-ink-soft mt-1.5 text-[0.8125rem] leading-relaxed">
                      {v.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <section className="bg-forest-950 text-cream-50 relative overflow-hidden py-20 sm:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <div className="shell relative">
          <SectionHeading
            tone="light"
            eyebrow="The long version"
            title={
              <>
                Eight years,
                <br className="hidden sm:block" /> one kitchen
              </>
            }
            lead="A short history of how a Sunday habit became a full catering operation."
          />

          <ol className="mt-12 grid gap-0 lg:mt-16 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal
                as="li"
                key={m.year}
                delay={i * 90}
                className="border-cream-50/15 relative border-t pt-6 pb-8 lg:pr-8"
              >
                <span
                  aria-hidden="true"
                  className="bg-palm-500 ring-forest-950 absolute -top-[5px] left-0 size-2.5 rounded-full ring-4"
                />
                <span className="text-palm-400 font-serif text-[1.5rem] italic">{m.year}</span>
                <h3 className="font-display text-cream-50 mt-3 text-[1.0625rem] leading-snug font-semibold">
                  {m.title}
                </h3>
                <p className="text-cream-200/60 mt-2 text-[0.8125rem] leading-relaxed">{m.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── How we work ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Reveal as="p" className="eyebrow text-forest-700/70">
                <span className="bg-forest-700/40 h-px w-6" />
                How it works
              </Reveal>
              <Reveal
                as="h2"
                delay={60}
                className="text-forest-950 mt-5 text-[1.9rem] leading-[1.02] sm:text-[2.35rem]"
              >
                From your message to
                <span className="text-forest-700 font-serif font-normal italic"> your table</span>
              </Reveal>
              <Reveal
                as="p"
                delay={110}
                className="text-ink-soft mt-5 max-w-sm text-[0.9375rem] leading-relaxed"
              >
                No forms that go nowhere, no waiting three days for a reply. This is how an order
                actually moves.
              </Reveal>
              <Reveal delay={160} className="mt-7">
                <Link
                  to="/contact"
                  className="group text-forest-950 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  <span className="border-palm-500/50 group-hover:border-palm-500 border-b pb-0.5 transition-colors">
                    Start an order
                  </span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>

            <ol className="space-y-3">
              {[
                {
                  t: 'You send a message',
                  d: 'WhatsApp or the contact form — tell us the date, guest count and what you have in mind. Screenshots and inspo pics welcome.',
                },
                {
                  t: 'We reply with a real quote',
                  d: 'Usually within a few hours. Itemised, in writing, with delivery included or clearly priced. No hidden add-ons.',
                },
                {
                  t: 'Deposit locks your date',
                  d: '60% confirms the booking and we block that weekend. You get a receipt and a prep plan.',
                },
                {
                  t: 'We cook, deliver and serve',
                  d: 'Hot, on time, and set up properly. Our team stays for larger events to keep the buffet full.',
                },
              ].map((step, i) => (
                <Reveal
                  as="li"
                  key={step.t}
                  delay={i * 80}
                  className="border-forest-900/8 bg-cream-50 hover:border-forest-900/15 flex gap-4 rounded-2xl border p-5 transition-colors duration-300 sm:p-6"
                >
                  <span className="bg-forest-900 font-display text-cream-50 grid size-8 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-forest-950 text-[1rem] font-semibold tracking-[-0.015em]">
                      {step.t}
                    </h3>
                    <p className="text-ink-soft mt-1.5 text-[0.8125rem] leading-relaxed">
                      {step.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand
        title="Come eat with us"
        lead={`We are in ${site.city} and we deliver across the mainland and island. Tell us what you are planning.`}
      />
    </>
  );
}
