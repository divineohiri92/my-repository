import { Link } from 'react-router-dom';
import Picture from '../../components/ui/Picture';
import Reveal from '../../components/ui/Reveal';
import SectionHeading from '../../components/ui/SectionHeading';
import { services } from '../../data/menu';
import { ArrowUpRight } from '../../components/ui/icons';

/** Four verticals: catering, small chops, meal prep, private dining. */
export default function ServicesTeaser() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              For the wedding, the office,
              <br className="hidden sm:block" /> and the
              <span className="text-forest-700 font-serif font-normal italic"> random Tuesday</span>
            </>
          }
          lead="Catering is the headline, but most of our week is spent feeding people who just want good food without the stress."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-5">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 80}>
              <Link
                to={`/services#${service.id}`}
                className="card-hover group border-forest-900/8 bg-cream-50 flex h-full flex-col overflow-hidden rounded-[1.5rem] border hover:shadow-[0_30px_60px_-40px_rgba(11,26,18,0.55)] sm:flex-row"
              >
                <div className="relative shrink-0 overflow-hidden sm:w-[42%]">
                  <Picture
                    name={service.photo}
                    alt={service.title}
                    sizes="(min-width: 640px) 21vw, 90vw"
                    className="block h-44 w-full sm:h-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-forest-950 text-[1.125rem] leading-tight tracking-[-0.025em]">
                        {service.title}
                      </h3>
                      <span className="border-forest-900/12 text-forest-900 group-hover:border-palm-500 group-hover:bg-palm-500 group-hover:text-forest-950 grid size-7 shrink-0 place-items-center rounded-full border transition-colors duration-300">
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                    <p className="text-ink-soft mt-2 text-[0.8125rem] leading-relaxed">
                      {service.summary}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-1.5">
                    {service.points.map((p) => (
                      <li
                        key={p}
                        className="bg-forest-900/5 text-forest-800/80 rounded-full px-2.5 py-1 text-[0.625rem] font-medium tracking-[0.01em]"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
