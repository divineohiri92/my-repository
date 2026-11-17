import PageHero from '../components/layout/PageHero';
import Reveal from '../components/ui/Reveal';
import ContactForm from '../components/ContactForm';
import { site, whatsappLink, telegramLink, telegramLabel } from '../data/site';
import { usePageMeta, businessSchema, breadcrumbSchema } from '../lib/seo';
import {
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  PinIcon,
  ClockIcon,
  socialIcons,
  TelegramIcon,
  ArrowUpRight,
} from '../components/ui/icons';

export default function Contact() {
  usePageMeta({
    title: 'Contact & Order',
    description:
      "Order from Cheryl's Kitchen or request a catering quote. Call or WhatsApp 0903 544 8624, send an enquiry, or find our opening hours. Delivery across Lagos.",
    path: '/contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        businessSchema,
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]),
        {
          '@type': 'ContactPage',
          name: "Contact Cheryl's Kitchen",
          url: `${site.url}/contact`,
        },
      ],
    },
  });

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Let’s talk food"
        title={
          <>
            Tell us the date.
            <br />
            We&rsquo;ll handle the
            <span className="text-palm-400 font-serif font-normal italic"> rest</span>
          </>
        }
        lead="WhatsApp is usually answered within a few hours. If it goes quiet, message us on Telegram or call — one of them will get through."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[0.8125rem] font-semibold text-[#062b14] transition-transform duration-300 hover:scale-[1.02]"
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp us now
          </a>
          <a
            href={site.phone.tel}
            className="border-cream-50/30 text-cream-50 hover:bg-cream-50 hover:text-forest-950 inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-[0.8125rem] font-semibold transition-colors"
          >
            <PhoneIcon className="size-4" />
            {site.phone.display}
          </a>
        </div>
      </PageHero>

      <section className="py-14 sm:py-20">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            {/* ── Form ─────────────────────────────────────────────── */}
            <Reveal className="border-forest-900/10 bg-cream-50 rounded-[1.75rem] border p-6 shadow-[0_20px_60px_-50px_rgba(11,26,18,0.5)] sm:p-9">
              <p className="eyebrow text-palm-600">Enquiry form</p>
              <h2 className="font-display text-forest-950 mt-3 text-[1.6rem] leading-tight tracking-[-0.03em] sm:text-[1.9rem]">
                Send us the details
              </h2>
              <p className="text-ink-soft mt-2.5 max-w-md text-[0.875rem] leading-relaxed">
                Fill this in and we will come back with a menu and an itemised quote — usually the
                same day.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>

            {/* ── Details ──────────────────────────────────────────── */}
            <div className="space-y-4">
              <Reveal
                delay={60}
                className="bg-forest-900 text-cream-50 rounded-[1.5rem] p-6 sm:p-7"
              >
                <h2 className="eyebrow text-palm-400">Direct lines</h2>

                <ul className="mt-5 space-y-1">
                  <li>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group hover:bg-cream-50/5 flex items-center gap-3.5 rounded-xl py-3 transition-colors"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                        <WhatsAppIcon className="size-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-cream-200/45 block text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
                          WhatsApp
                        </span>
                        <span className="font-display block truncate text-[0.9375rem] font-semibold">
                          {site.phone.intl}
                        </span>
                      </span>
                      <ArrowUpRight className="text-cream-200/40 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>

                  <li>
                    <a
                      href={telegramLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group hover:bg-cream-50/5 flex items-center gap-3.5 rounded-xl py-3 transition-colors"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#2AABEE]/15 text-[#2AABEE]">
                        <TelegramIcon className="size-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-cream-200/45 block text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
                          Telegram
                        </span>
                        <span className="font-display block truncate text-[0.9375rem] font-semibold">
                          {telegramLabel()}
                        </span>
                      </span>
                      <ArrowUpRight className="text-cream-200/40 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>

                  <li>
                    <a
                      href={site.phone.tel}
                      className="group hover:bg-cream-50/5 flex items-center gap-3.5 rounded-xl py-3 transition-colors"
                    >
                      <span className="bg-palm-500/15 text-palm-400 grid size-10 shrink-0 place-items-center rounded-full">
                        <PhoneIcon className="size-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-cream-200/45 block text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
                          Call us
                        </span>
                        <span className="font-display block truncate text-[0.9375rem] font-semibold">
                          {site.phone.display}
                        </span>
                      </span>
                      <ArrowUpRight className="text-cream-200/40 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>

                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="group hover:bg-cream-50/5 flex items-center gap-3.5 rounded-xl py-3 transition-colors"
                    >
                      <span className="bg-cream-50/8 text-cream-100 grid size-10 shrink-0 place-items-center rounded-full">
                        <MailIcon className="size-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-cream-200/45 block text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
                          Email
                        </span>
                        <span className="font-display block truncate text-[0.9375rem] font-semibold">
                          {site.email}
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>

                <div className="border-cream-50/10 mt-5 flex items-center gap-2.5 border-t pt-5">
                  {site.socials.map((s) => {
                    const Icon = socialIcons[s.name];
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${site.name} on ${s.name}`}
                        className="border-cream-50/15 hover:border-palm-400/50 hover:bg-palm-500 hover:text-forest-950 grid size-9 place-items-center rounded-full border transition-colors"
                      >
                        <Icon className="size-4" />
                      </a>
                    );
                  })}
                  <span className="text-cream-200/45 ml-1 text-[0.6875rem]">
                    Follow for weekly specials
                  </span>
                </div>
              </Reveal>

              {/* Hours */}
              <Reveal
                delay={120}
                className="border-forest-900/10 bg-cream-100 rounded-[1.5rem] border p-6 sm:p-7"
              >
                <h2 className="text-forest-800/60 flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
                  <ClockIcon className="size-3.5" />
                  Opening hours
                </h2>
                <dl className="mt-4 space-y-2.5">
                  {site.hours.map((h) => (
                    <div
                      key={h.days}
                      className="border-forest-900/8 flex items-baseline justify-between gap-4 border-b pb-2.5 last:border-0 last:pb-0"
                    >
                      <dt className="text-forest-900 text-[0.8125rem] font-medium">{h.days}</dt>
                      <dd className="text-ink-soft text-[0.8125rem]">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="bg-cream-50 text-ink-soft mt-4 rounded-lg px-3 py-2.5 text-[0.6875rem] leading-relaxed">
                  {site.hoursNote}
                </p>
              </Reveal>

              {/* Area */}
              <Reveal
                delay={180}
                className="border-forest-900/10 bg-cream-50 rounded-[1.5rem] border p-6 sm:p-7"
              >
                <h2 className="text-forest-800/60 flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
                  <PinIcon className="size-3.5" />
                  Where we deliver
                </h2>
                <p className="text-ink-soft mt-3 text-[0.8125rem] leading-relaxed">
                  Based in {site.city}. We deliver across the mainland and island — collection is
                  also welcome by arrangement.
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {site.areaServed.map((area) => (
                    <li
                      key={area}
                      className="bg-forest-900/5 text-forest-800/75 rounded-full px-2.5 py-1 text-[0.625rem] font-medium"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
                <p className="text-ink-soft/60 mt-4 text-[0.6875rem]">
                  Outside Lagos? We travel for large events — mention it in your message.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
