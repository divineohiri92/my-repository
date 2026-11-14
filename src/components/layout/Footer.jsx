import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { site, whatsappLink } from '../../data/site';
import { PhoneIcon, MailIcon, PinIcon, socialIcons, WhatsAppIcon, ArrowUpRight } from '../ui/icons';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/services', label: 'Menu & services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const popular = [
  { label: 'Small chops boxes', to: '/services#small-chops' },
  { label: 'Party jollof trays', to: '/services#rice-mains' },
  { label: 'Wedding catering', to: '/services#packages' },
  { label: 'Weekly meal prep', to: '/services#services' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-cream-100 relative overflow-hidden">
      <div className="grain pointer-events-none absolute inset-0" />

      {/* Warm glow */}
      <div
        aria-hidden="true"
        className="bg-palm-500/12 pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
      />

      <div className="shell relative pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Logo tone="light" />
            <p className="text-cream-200/70 mt-5 max-w-xs text-sm leading-relaxed">
              Small chops, party jollof and full event catering — cooked in small batches in Lagos,
              delivered hot to your door.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.name];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${s.name} (${s.handle})`}
                    className="border-cream-50/15 text-cream-100 hover:border-palm-400/50 hover:bg-palm-500 hover:text-forest-950 grid size-10 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon className="size-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer navigation">
            <h2 className="eyebrow text-palm-400">Explore</h2>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group text-cream-200/70 hover:text-cream-50 inline-flex items-center gap-1.5 text-sm transition-colors"
                  >
                    <span className="bg-palm-400 h-px w-0 transition-all duration-300 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular */}
          <nav aria-label="Popular orders">
            <h2 className="eyebrow text-palm-400">Popular</h2>
            <ul className="mt-5 space-y-3">
              {popular.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="group text-cream-200/70 hover:text-cream-50 inline-flex items-center gap-1.5 text-sm transition-colors"
                  >
                    <span className="bg-palm-400 h-px w-0 transition-all duration-300 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow text-palm-400">Find us</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={site.phone.tel}
                  className="text-cream-200/70 hover:text-cream-50 flex items-start gap-3 transition-colors"
                >
                  <PhoneIcon className="text-palm-400 mt-0.5 size-4 shrink-0" />
                  <span>
                    {site.phone.display}
                    <span className="text-cream-200/40 block text-xs">Tap to call</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-cream-200/70 hover:text-cream-50 flex items-start gap-3 transition-colors"
                >
                  <MailIcon className="text-palm-400 mt-0.5 size-4 shrink-0" />
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
              <li className="text-cream-200/70 flex items-start gap-3">
                <PinIcon className="text-palm-400 mt-0.5 size-4 shrink-0" />
                <span>
                  {site.city}, {site.country}
                  <span className="text-cream-200/40 block text-xs">Delivery across Lagos</span>
                </span>
              </li>
            </ul>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cream-50/10 text-cream-50 ring-cream-50/15 mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-[0.8125rem] font-semibold ring-1 transition-colors hover:bg-[#25D366] hover:text-[#062b14] hover:ring-transparent"
            >
              <WhatsAppIcon className="size-4" />
              Chat with us
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-cream-50/10 text-cream-200/45 mt-14 flex flex-col gap-4 border-t pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span>Made with pepper and patience in Lagos</span>
            <span aria-hidden="true">🇳🇬</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
