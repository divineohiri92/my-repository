import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import { PhoneIcon, WhatsAppIcon, TelegramIcon, CloseIcon, socialIcons } from '../ui/icons';
import { site, whatsappLink, telegramLink } from '../../data/site';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Menu & Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

/** Small floating-pill nav that condenses on scroll. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();

  /* Every inner page opens with a dark hero, so the bar starts light there. */
  const darkHero = pathname !== '/';
  const light = (darkHero && !scrolled) || open;

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll + trap focus while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;

    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  return (
    <>
      {/* Skip link for keyboard + screen-reader users */}
      <a
        href="#main"
        className="focus:bg-forest-900 focus:text-cream-50 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:px-5 focus:py-3 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-60 pt-3 sm:pt-4">
        <div className="shell">
          <div
            className={[
              'flex items-center justify-between gap-4 rounded-full transition-all duration-500 ease-out',
              !open && scrolled
                ? 'border-forest-900/8 bg-cream-50/88 border py-2 pr-2 pl-3 shadow-[0_12px_40px_-24px_rgba(11,26,18,0.55)] backdrop-blur-xl sm:pl-4'
                : 'border border-transparent py-2.5 pr-1 pl-1',
            ].join(' ')}
          >
            <Link
              to="/"
              aria-label={`${site.name} — home`}
              className="rounded-full transition-opacity hover:opacity-80"
            >
              <Logo compact tone={light ? 'light' : 'dark'} />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {nav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        [
                          'relative block rounded-full px-3.5 py-2 text-[0.8125rem] font-medium tracking-[-0.005em] transition-colors duration-200',
                          isActive
                            ? light
                              ? 'text-cream-50'
                              : 'text-forest-950'
                            : light
                              ? 'text-cream-200/70 hover:text-cream-50'
                              : 'text-forest-900/65 hover:text-forest-950',
                        ].join(' ')
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          <span
                            aria-hidden="true"
                            className={[
                              'bg-palm-500 absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-300 ease-out',
                              isActive ? 'scale-x-100' : 'scale-x-0',
                            ].join(' ')}
                          />
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2 lg:flex">
              <a
                href={telegramLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message ${site.name} on Telegram`}
                title="Message us on Telegram"
                className={[
                  'grid size-9 place-items-center rounded-full transition-colors',
                  light
                    ? 'text-cream-100 hover:bg-cream-50/10'
                    : 'text-forest-900/70 hover:bg-forest-900/6 hover:text-forest-950',
                ].join(' ')}
              >
                <TelegramIcon className="size-4" />
              </a>
              <a
                href={site.phone.tel}
                className={[
                  'inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.8125rem] font-semibold transition-colors',
                  light
                    ? 'text-cream-100 hover:bg-cream-50/10'
                    : 'text-forest-950 hover:bg-forest-900/6',
                ].join(' ')}
              >
                <PhoneIcon className="size-4" />
                {site.phone.display}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'inline-flex h-10 items-center gap-2 rounded-full pr-4 pl-3.5 text-[0.8125rem] font-semibold transition-colors duration-300',
                  light
                    ? 'bg-palm-500 text-forest-950 hover:bg-palm-400'
                    : 'bg-forest-900 text-cream-50 hover:bg-forest-800',
                ].join(' ')}
              >
                <WhatsAppIcon className="size-4 text-[#25D366]" />
                Order now
              </a>
            </div>

            {/* Mobile menu trigger */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={[
                'relative z-60 grid size-11 shrink-0 place-items-center rounded-full transition-colors lg:hidden',
                open
                  ? 'bg-cream-50 text-forest-950 ring-cream-50/40 ring-1'
                  : light
                    ? 'bg-cream-50/12 text-cream-50 ring-cream-50/25 hover:bg-cream-50/20 ring-1 backdrop-blur-md'
                    : 'bg-forest-900 text-cream-50 hover:bg-forest-800',
              ].join(' ')}
            >
              <span className="sr-only">{open ? 'Close' : 'Open'} menu</span>
              <span className="flex w-4.5 flex-col items-end gap-[5px]" aria-hidden="true">
                <span
                  className={[
                    'h-[1.6px] w-full rounded-full bg-current transition-all duration-300 ease-out',
                    open ? 'translate-y-[3.3px] rotate-45' : '',
                  ].join(' ')}
                />
                <span
                  className={[
                    'h-[1.6px] rounded-full bg-current transition-all duration-300 ease-out',
                    open ? 'w-full -translate-y-[3.3px] -rotate-45' : 'w-3',
                  ].join(' ')}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile sheet ─────────────────────────────────────────────── */}
      <div
        className={[
          'fixed inset-0 z-45 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={[
            'bg-forest-950/45 absolute inset-0 backdrop-blur-sm transition-opacity duration-400',
            open ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />

        <div
          ref={panelRef}
          id="mobile-menu"
          role={open ? 'dialog' : undefined}
          aria-modal={open || undefined}
          aria-label="Site menu"
          className={[
            'bg-forest-900 text-cream-50 absolute inset-x-0 top-0 origin-top rounded-b-[2rem] px-5 pt-26 pb-8 shadow-2xl transition-all duration-400 ease-out',
            open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
          ].join(' ')}
        >
          <div className="grain absolute inset-0 overflow-hidden rounded-b-[2rem]" />

          <nav aria-label="Mobile" className="relative">
            <ul className="divide-cream-50/10 border-cream-50/10 divide-y border-y">
              {nav.map((item, i) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      [
                        'group flex items-baseline justify-between gap-4 py-4 transition-opacity',
                        isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100',
                      ].join(' ')
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="font-display text-[1.75rem] font-semibold tracking-[-0.035em]">
                          {item.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className={[
                            'font-serif text-sm italic transition-opacity',
                            isActive ? 'text-palm-400 opacity-100' : 'opacity-40',
                          ].join(' ')}
                        >
                          {isActive ? 'You’re here' : `0${i + 1}`}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-[#25D366] text-sm font-semibold text-[#062b14]"
              >
                <WhatsAppIcon className="size-4.5" />
                Order on WhatsApp
              </a>
              <a
                href={telegramLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#2AABEE] text-sm font-semibold text-[#04212f]"
              >
                <TelegramIcon className="size-4.5" />
                Message on Telegram
              </a>
              <a
                href={site.phone.tel}
                className="border-cream-50/25 inline-flex h-12 items-center justify-center gap-2 rounded-full border text-[0.8125rem] font-semibold"
              >
                <PhoneIcon className="size-4" />
                Call us
              </a>
              <Link
                to="/contact"
                className="border-cream-50/25 inline-flex h-12 items-center justify-center gap-2 rounded-full border text-[0.8125rem] font-semibold"
              >
                Get a quote
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="text-cream-200/50 text-[0.6875rem] font-medium tracking-[0.18em] uppercase">
                {site.city}, {site.country}
              </span>
              {/* Social icons as 44px targets rather than tiny text links */}
              <div className="flex items-center gap-1">
                {site.socials.map((s) => {
                  const Icon = socialIcons[s.name];
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${s.name}`}
                      className="text-cream-200/60 hover:text-cream-50 hover:bg-cream-50/10 grid size-11 place-items-center rounded-full transition-colors"
                    >
                      <Icon className="size-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
