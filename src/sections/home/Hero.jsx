import { Link } from 'react-router-dom';
import Picture from '../../components/ui/Picture';
import { site, whatsappLink, photos } from '../../data/site';
import { ArrowRight, StarIcon, WhatsAppIcon, SparkleIcon } from '../../components/ui/icons';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[4.5rem] pb-14 sm:pb-20 lg:pt-28 lg:pb-24">
      {/* Soft ambient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_85%_-10%,#fff3e2_0%,transparent_55%),radial-gradient(80%_60%_at_-10%_20%,#eef3ea_0%,transparent_60%)]"
      />

      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* ── Copy ─────────────────────────────────────────────── */}
          <div className="max-w-xl">
            <div className="hero-in flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="bg-forest-900 text-cream-50 inline-flex items-center gap-1.5 rounded-full py-1.5 pr-3.5 pl-2.5 text-[0.6875rem] font-semibold tracking-[0.02em]">
                <span className="relative flex size-1.5">
                  <span className="bg-palm-400 absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                  <span className="bg-palm-400 relative inline-flex size-1.5 rounded-full" />
                </span>
                Taking orders this week
              </span>
              <span className="text-forest-800/60 inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
                <StarIcon className="text-palm-500 size-3" />
                4.9 from 300+ Lagos orders
              </span>
            </div>

            <h1
              className="hero-in mt-6 text-[2.6rem] leading-[0.92] tracking-[-0.045em] sm:text-[3.75rem] lg:text-[4.15rem]"
              style={{ '--d': '80ms' }}
            >
              Food that makes
              <br />
              your guests{' '}
              <span className="relative inline-block">
                <span className="text-forest-700 font-serif font-normal tracking-[-0.02em] italic">
                  ask questions
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 14"
                  className="text-palm-500 absolute -bottom-1.5 left-0 h-3 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9c48-6 96-7 148-4 38 2 76 5 148 1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p
              className="hero-in text-ink-soft mt-7 max-w-md text-[0.9375rem] leading-relaxed sm:text-base"
              style={{ '--d': '160ms' }}
            >
              Small chops, smoky party jollof and full event catering in Lagos. Cooked fresh in
              small batches — never in a hurry, never in a factory.
            </p>

            <div
              className="hero-in mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ '--d': '240ms' }}
            >
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-forest-900 text-cream-50 hover:bg-forest-800 inline-flex h-13 items-center justify-center gap-2.5 rounded-full pr-6 pl-5 text-[0.875rem] font-semibold shadow-[0_14px_34px_-16px_rgba(11,26,18,0.85)] transition-all duration-300 active:scale-[0.985]"
              >
                <WhatsAppIcon className="size-4.5 text-[#25D366]" />
                Order on WhatsApp
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                to="/services"
                className="group border-forest-900/20 text-forest-950 hover:border-forest-900 hover:bg-forest-900 hover:text-cream-50 inline-flex h-13 items-center justify-center gap-2 rounded-full border px-6 text-[0.875rem] font-semibold transition-colors duration-300"
              >
                See the menu
              </Link>
            </div>

            <div
              className="hero-in border-forest-900/10 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6"
              style={{ '--d': '320ms' }}
            >
              <a
                href={site.phone.tel}
                className="group text-ink-soft hover:text-forest-950 inline-flex items-baseline gap-2 text-[0.8125rem] transition-colors"
              >
                <span className="text-forest-800/45 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
                  Call
                </span>
                <span className="font-display text-forest-950 decoration-palm-500/40 group-hover:decoration-palm-500 text-base font-semibold tracking-[-0.02em] underline decoration-1 underline-offset-4 transition-colors">
                  {site.phone.display}
                </span>
              </a>
              <span className="bg-forest-900/15 hidden h-4 w-px sm:block" />
              <span className="text-ink-soft text-[0.8125rem]">
                Delivery across <strong className="text-forest-950 font-semibold">Lagos</strong>
              </span>
            </div>
          </div>

          {/* ── Image composition ─────────────────────────────────── */}
          <div className="hero-in relative" style={{ '--d': '180ms' }}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main plate */}
              <div className="bg-forest-900/5 relative overflow-hidden rounded-[2rem] rounded-tr-[5.5rem] shadow-[0_40px_80px_-50px_rgba(11,26,18,0.65)]">
                <Picture
                  name={photos.hero}
                  alt="A plate of Cheryl's Kitchen party jollof rice with grilled chicken, fried plantain and coleslaw"
                  priority
                  sizes="(min-width: 1024px) 44vw, (min-width: 640px) 75vw, 92vw"
                  imgClassName="h-full w-full object-cover"
                  className="block aspect-[4/5] w-full"
                />
                <div
                  aria-hidden="true"
                  className="from-forest-950/60 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                />

                {/* Price pill */}
                <div className="border-cream-50/20 bg-forest-950/70 absolute inset-x-3 bottom-3 flex items-center justify-between gap-2.5 rounded-2xl border p-2 pl-3 backdrop-blur-md">
                  <div className="min-w-0">
                    <p className="text-cream-200/70 text-[0.5625rem] font-semibold tracking-[0.18em] uppercase">
                      Signature plate
                    </p>
                    <p className="font-display text-cream-50 truncate text-[0.9375rem] font-semibold">
                      Jollof & grilled chicken
                    </p>
                  </div>
                  <span className="bg-palm-500 font-display text-forest-950 shrink-0 rounded-xl px-2.5 py-1.5 text-[0.8125rem] font-bold">
                    ₦9,500
                  </span>
                </div>
              </div>

              {/* Floating small-chops card — sits mid-left to avoid the price pill */}
              <div className="border-cream-50 absolute top-[46%] -left-4 hidden w-32 rotate-[-5deg] overflow-hidden rounded-2xl border-4 shadow-xl sm:block lg:-left-7 lg:w-36">
                <Picture
                  name={photos.smallChops}
                  alt="A platter of Nigerian small chops: puff puff, samosa, spring rolls and suya"
                  sizes="160px"
                  className="block aspect-square w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </div>

              {/* Badge */}
              <div className="border-cream-50/40 bg-forest-950/60 text-cream-50 absolute top-4 right-4 z-0 flex items-center gap-2 rounded-full border py-1.5 pr-3 pl-1.5 shadow-lg backdrop-blur-md">
                <span className="bg-palm-500 text-forest-950 grid size-6 place-items-center rounded-full">
                  <SparkleIcon className="size-3" />
                </span>
                <span className="text-[0.625rem] leading-none font-semibold tracking-[0.12em] uppercase">
                  Fresh daily
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
