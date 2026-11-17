import Reveal from '../../components/ui/Reveal';
import SectionHeading from '../../components/ui/SectionHeading';
import { testimonials } from '../../data/menu';
import { StarIcon } from '../../components/ui/icons';

/** Editorial testimonial row on a dark forest band. */
export default function Testimonials() {
  return (
    <section className="bg-forest-900 text-cream-50 relative overflow-hidden py-20 sm:py-28">
      <div className="grain pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="bg-palm-500/10 pointer-events-none absolute top-1/3 -left-24 size-72 rounded-full blur-3xl"
      />

      <div className="shell relative">
        <SectionHeading
          tone="light"
          eyebrow="Word of mouth"
          title={
            <>
              We have never paid
              <br className="hidden sm:block" /> for an advert
            </>
          }
          lead="Every order since 2016 has come from someone telling someone else. Here is what they say."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 90}>
              <figure className="border-cream-50/10 bg-cream-50/[0.04] hover:border-palm-400/30 hover:bg-cream-50/[0.07] flex h-full flex-col rounded-[1.5rem] border p-6 backdrop-blur-sm transition-colors duration-500 sm:p-7">
                <div className="text-palm-400 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} className="size-3.5" />
                  ))}
                </div>

                <blockquote className="mt-5 flex-1">
                  <p className="text-cream-100/85 text-[0.9375rem] leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>

                <figcaption className="border-cream-50/10 mt-6 flex items-center gap-3 border-t pt-5">
                  <span
                    aria-hidden="true"
                    className="bg-palm-500/15 font-display text-palm-400 grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold"
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="text-cream-50 block text-[0.8125rem] font-semibold">
                      {t.name}
                    </span>
                    <span className="text-cream-200/45 block text-[0.6875rem] tracking-[0.12em] uppercase">
                      {t.context}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
