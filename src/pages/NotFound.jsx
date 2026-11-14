import { Link } from 'react-router-dom';
import Picture from '../components/ui/Picture';
import { photos, site } from '../data/site';
import { useEffect } from 'react';
import { usePageMeta } from '../lib/seo';
import { ArrowRight, PhoneIcon } from '../components/ui/icons';

export default function NotFound() {
  usePageMeta({
    title: 'Page not found',
    description: 'That page has moved or never existed. Head back to the kitchen.',
    path: '/404',
  });

  // Tell search engines this page is not indexable.
  useEffect(() => {
    let tag = document.head.querySelector('meta[name="robots"][data-page]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'robots';
      tag.dataset.page = 'true';
      document.head.appendChild(tag);
    }
    tag.content = 'noindex, follow';
    return () => tag?.remove();
  }, []);

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-32 pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_80%_0%,#fff3e2_0%,transparent_60%)]"
      />
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-palm-600">Error 404</p>
            <h1 className="text-forest-950 mt-4 text-[2.6rem] leading-[0.94] tracking-[-0.04em] sm:text-[3.6rem]">
              This plate is
              <br />
              <span className="text-forest-700 font-serif font-normal italic">empty</span>
            </h1>
            <p className="text-ink-soft mt-5 max-w-sm text-[0.9375rem] leading-relaxed">
              The page you were looking for has moved, or it never existed. The kitchen is still
              open though — here is where to go next.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className="group bg-forest-900 text-cream-50 hover:bg-forest-800 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.8125rem] font-semibold transition-colors"
              >
                Back to home
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="border-forest-900/20 text-forest-950 hover:bg-forest-900 hover:text-cream-50 inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-[0.8125rem] font-semibold transition-colors"
              >
                See the menu
              </Link>
            </div>

            <a
              href={site.phone.tel}
              className="text-ink-soft hover:text-forest-950 mt-6 inline-flex items-center gap-2 text-[0.8125rem] transition-colors"
            >
              <PhoneIcon className="size-4" />
              Or just call us: <strong className="font-semibold">{site.phone.display}</strong>
            </a>
          </div>

          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-50px_rgba(11,26,18,0.6)]">
            <Picture
              name={photos.puffPuff}
              alt="A basket of golden Nigerian puff puff"
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="block aspect-[4/5] w-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
