import PageHero from '../components/layout/PageHero';
import Picture from '../components/ui/Picture';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import MenuBrowser from '../sections/services/MenuBrowser';
import CtaBand from '../sections/shared/CtaBand';
import Testimonials from '../sections/shared/Testimonials';
import { services, packages, faqs } from '../data/menu';
import { whatsappLink } from '../data/site';
import { usePageMeta, businessSchema, breadcrumbSchema, faqSchema } from '../lib/seo';
import { CheckIcon, WhatsAppIcon, ArrowUpRight, PhoneIcon } from '../components/ui/icons';
import { site } from '../data/site';

export default function Services() {
  usePageMeta({
    title: 'Menu, Catering Packages & Services',
    description:
      "See Cheryl's Kitchen menus and prices — small chops boxes, party jollof trays, soups, grills and full wedding catering packages in Lagos. Order on WhatsApp.",
    path: '/services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        businessSchema,
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Menu & Services', path: '/services' },
        ]),
        faqSchema(faqs),
      ],
    },
  });

  return (
    <>
      <PageHero
        crumb="Menu & Services"
        eyebrow="What we cook"
        title={
          <>
            Everything on the menu
            <br />
            is something we actually
            <span className="text-palm-400 font-serif font-normal italic"> eat</span>
          </>
        }
        lead="Small chops, rice pots, soups and grills — plus full catering packages for weddings and offices. Prices are honest guides; your final quote is itemised."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[0.8125rem] font-semibold text-[#062b14] transition-transform duration-300 hover:scale-[1.02]"
          >
            <WhatsAppIcon className="size-4" />
            Order on WhatsApp
          </a>
          <a
            href="#packages"
            className="border-cream-50/30 text-cream-50 hover:bg-cream-50 hover:text-forest-950 inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-[0.8125rem] font-semibold transition-colors"
          >
            Jump to packages
          </a>
        </div>
      </PageHero>

      {/* ── Services grid ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="shell">
          <span id="services" className="block scroll-mt-28" aria-hidden="true" />
          <SectionHeading
            eyebrow="Ways to work with us"
            title={
              <>
                Four ways to get
                <br className="hidden sm:block" /> our food on your table
              </>
            }
            lead="Whether it is 300 wedding guests or dinner for four, the kitchen is the same."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-5">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 80} className="h-full">
                <article
                  id={service.id}
                  className="group border-forest-900/8 bg-cream-50 flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[1.5rem] border transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgba(11,26,18,0.5)]"
                >
                  <div className="relative overflow-hidden">
                    <Picture
                      name={service.photo}
                      alt={service.title}
                      sizes="(min-width: 640px) 45vw, 92vw"
                      className="block aspect-[16/9] w-full"
                      imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="bg-cream-50/95 text-forest-900 absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.5625rem] font-bold tracking-[0.14em] uppercase">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-display text-forest-950 text-[1.1875rem] tracking-[-0.025em]">
                      {service.title}
                    </h3>
                    <p className="text-ink-soft mt-2 flex-1 text-[0.8125rem] leading-relaxed">
                      {service.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {service.points.map((p) => (
                        <li
                          key={p}
                          className="bg-forest-900/5 text-forest-800/80 rounded-full px-2.5 py-1 text-[0.625rem] font-medium"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={whatsappLink(
                        `Hi Cheryl's Kitchen! I'd like to ask about ${service.title.toLowerCase()}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest-950 mt-5 inline-flex items-center gap-1.5 self-start text-[0.75rem] font-semibold"
                    >
                      <span className="border-palm-500/50 border-b pb-0.5">Enquire about this</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Menu browser ──────────────────────────────────────────── */}
      <section id="menu" className="bg-cream-100 scroll-mt-24 py-16 sm:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="The menu"
            title={
              <>
                Pick a category,
                <br className="hidden sm:block" /> then tell us what you fancy
              </>
            }
            lead="Everything below can be ordered as a tray, a bowl or per person. Tap order and it opens a WhatsApp chat with the item already written in."
          />
          <div className="mt-10">
            <MenuBrowser />
          </div>
        </div>
      </section>

      {/* ── Packages ──────────────────────────────────────────────── */}
      <section id="packages" className="scroll-mt-24 py-16 sm:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Event packages"
            title={
              <>
                Catering packages,
                <br className="hidden sm:block" /> priced per guest
              </>
            }
            lead="Booked most often for weddings, birthdays and office parties. Need something different? We build custom menus all the time."
          />

          <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-3 lg:gap-5">
            {packages.map((pkg, i) => (
              <Reveal
                key={pkg.id}
                delay={i * 90}
                className={[
                  'relative flex flex-col overflow-hidden rounded-[1.5rem] p-6 sm:p-7',
                  pkg.featured
                    ? 'bg-forest-900 text-cream-50 shadow-[0_30px_60px_-35px_rgba(11,26,18,0.8)] lg:-mt-4 lg:mb-4'
                    : 'border-forest-900/10 bg-cream-50 text-forest-950 border',
                ].join(' ')}
              >
                {pkg.featured && (
                  <div className="grain pointer-events-none absolute inset-0">
                    <span className="bg-palm-500 text-forest-950 absolute top-5 right-5 rounded-full px-2.5 py-1 text-[0.5625rem] font-bold tracking-[0.14em] uppercase">
                      Most booked
                    </span>
                  </div>
                )}

                <h3
                  className={[
                    'font-display text-[1.25rem] tracking-[-0.025em]',
                    pkg.featured ? 'text-cream-50' : 'text-forest-950',
                  ].join(' ')}
                >
                  {pkg.name}
                </h3>
                <p
                  className={[
                    'mt-1.5 text-[0.8125rem] leading-relaxed',
                    pkg.featured ? 'text-cream-200/70' : 'text-ink-soft',
                  ].join(' ')}
                >
                  {pkg.summary}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span
                    className={[
                      'font-display text-[2rem] font-semibold tracking-[-0.04em]',
                      pkg.featured ? 'text-cream-50' : 'text-forest-950',
                    ].join(' ')}
                  >
                    {pkg.price}
                  </span>
                  <span
                    className={[
                      'text-[0.6875rem] font-medium tracking-[0.1em] uppercase',
                      pkg.featured ? 'text-cream-200/50' : 'text-ink-soft/60',
                    ].join(' ')}
                  >
                    {pkg.unit}
                  </span>
                </div>
                <p
                  className={[
                    'mt-1 text-[0.6875rem]',
                    pkg.featured ? 'text-cream-200/45' : 'text-ink-soft/55',
                  ].join(' ')}
                >
                  {pkg.min}
                </p>

                <ul
                  className={[
                    'mt-6 flex-1 space-y-2.5 border-t pt-6',
                    pkg.featured ? 'border-cream-50/15' : 'border-forest-900/10',
                  ].join(' ')}
                >
                  {pkg.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <CheckIcon
                        className={[
                          'mt-0.5 size-3.5 shrink-0',
                          pkg.featured ? 'text-palm-400' : 'text-palm-600',
                        ].join(' ')}
                      />
                      <span
                        className={[
                          'text-[0.8125rem] leading-snug',
                          pkg.featured ? 'text-cream-100/80' : 'text-ink-soft',
                        ].join(' ')}
                      >
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(
                    `Hi Cheryl's Kitchen! I'm interested in ${pkg.name} (${pkg.price} ${pkg.unit}). Can you send me a quote?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    'mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full text-[0.8125rem] font-semibold transition-colors duration-300',
                    pkg.featured
                      ? 'bg-palm-500 text-forest-950 hover:bg-palm-400'
                      : 'border-forest-900/20 text-forest-950 hover:bg-forest-900 hover:text-cream-50 border',
                  ].join(' ')}
                >
                  <WhatsAppIcon className="size-4" />
                  Request this package
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section id="faq" className="scroll-mt-24 py-16 sm:py-24">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal as="p" className="eyebrow text-forest-700/70">
                <span className="bg-forest-700/40 h-px w-6" />
                Good questions
              </Reveal>
              <Reveal
                as="h2"
                delay={60}
                className="text-forest-950 mt-5 text-[1.9rem] leading-[1.02] sm:text-[2.35rem]"
              >
                The things people
                <span className="text-forest-700 font-serif font-normal italic"> always ask</span>
              </Reveal>
              <Reveal
                as="p"
                delay={110}
                className="text-ink-soft mt-5 max-w-sm text-[0.9375rem] leading-relaxed"
              >
                Still unsure about something? Send a message — we answer our own WhatsApp.
              </Reveal>
              <Reveal delay={160} className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={whatsappLink("Hi Cheryl's Kitchen! I have a question about ordering.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-forest-900 text-cream-50 hover:bg-forest-800 inline-flex h-11 items-center gap-2 rounded-full px-5 text-[0.8125rem] font-semibold transition-colors"
                >
                  <WhatsAppIcon className="size-4 text-[#25D366]" />
                  Ask on WhatsApp
                </a>
                <a
                  href={site.phone.tel}
                  className="border-forest-900/20 text-forest-950 hover:bg-forest-900 hover:text-cream-50 inline-flex h-11 items-center gap-2 rounded-full border px-5 text-[0.8125rem] font-semibold transition-colors"
                >
                  <PhoneIcon className="size-4" />
                  Call us
                </a>
              </Reveal>
            </div>

            <div className="divide-forest-900/10 border-forest-900/10 divide-y border-y">
              {faqs.map((faq, i) => (
                <details key={faq.q} className="group" open={i === 0}>
                  <summary className="hover:text-forest-700 flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left transition-colors [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-forest-950 text-[0.9375rem] leading-snug font-semibold tracking-[-0.015em] sm:text-base">
                      {faq.q}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="relative mt-1 grid size-5 shrink-0 place-items-center"
                    >
                      <span className="bg-forest-900 absolute h-[1.5px] w-3.5 rounded-full" />
                      <span className="bg-forest-900 absolute h-3.5 w-[1.5px] rounded-full transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="text-ink-soft max-w-prose pr-8 pb-5 text-[0.875rem] leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let’s build your menu"
        lead="Send the date and the guest count. We will come back with a menu, a quote and an honest answer on whether we can do it well."
      />
    </>
  );
}
