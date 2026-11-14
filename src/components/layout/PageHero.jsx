import { Link } from 'react-router-dom';
import { ArrowRight } from '../ui/icons';

/**
 * Compact dark page header used on About / Services / Gallery / Contact.
 * Keeps the site feeling like one brand while giving each page its own tone.
 */
export default function PageHero({ eyebrow, title, lead, crumb, children, align = 'left' }) {
  return (
    <section className="bg-forest-950 text-cream-50 relative overflow-hidden pt-[7.5rem] pb-14 sm:pt-32 sm:pb-20">
      <div className="grain pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="bg-palm-500/15 pointer-events-none absolute -top-24 -right-20 size-72 rounded-full blur-3xl sm:size-96"
      />
      <div
        aria-hidden="true"
        className="from-cream-50/5 pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent"
      />

      <div className="shell relative">
        <nav
          aria-label="Breadcrumb"
          className="text-cream-200/45 mb-7 flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.16em] uppercase"
        >
          <Link to="/" className="hover:text-cream-50 transition-colors">
            Home
          </Link>
          <ArrowRight className="size-3" />
          <span className="text-cream-100/80">{crumb}</span>
        </nav>

        <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
          {eyebrow && (
            <p className="eyebrow hero-in text-palm-400">
              <span className="bg-palm-400/60 h-px w-6" />
              {eyebrow}
            </p>
          )}
          <h1
            className="hero-in text-cream-50 mt-5 text-[2.4rem] leading-[0.94] tracking-[-0.04em] sm:text-[3.4rem] lg:text-[4rem]"
            style={{ '--d': '70ms' }}
          >
            {title}
          </h1>
          {lead && (
            <p
              className="hero-in text-cream-200/70 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base"
              style={{ '--d': '140ms' }}
            >
              {lead}
            </p>
          )}
          {children && (
            <div className="hero-in mt-9" style={{ '--d': '210ms' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
