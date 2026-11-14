import Picture from '../../components/ui/Picture';
import Reveal from '../../components/ui/Reveal';
import { site, whatsappLink, photos } from '../../data/site';
import { WhatsAppIcon, PhoneIcon, ArrowRight } from '../../components/ui/icons';

/** Full-bleed closing CTA used at the bottom of most pages. */
export default function CtaBand({
  title = 'Hungry yet?',
  lead = 'Send us a message and we will tell you what is cooking, what it costs, and when we can deliver.',
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Picture
          name={photos.suya}
          alt=""
          aria-hidden="true"
          sizes="100vw"
          className="block h-full w-full"
          imgClassName="h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="bg-forest-950/82 absolute inset-0" />
        <div className="grain pointer-events-none absolute inset-0" />
      </div>

      <div className="shell text-cream-50 relative py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal as="p" className="eyebrow text-palm-400 justify-center">
            <span className="bg-palm-400/60 h-px w-6" />
            Let&rsquo;s feed people
          </Reveal>

          <Reveal
            as="h2"
            delay={60}
            className="mt-5 text-[2.2rem] leading-[0.95] tracking-[-0.04em] sm:text-[3.25rem]"
          >
            {title}
          </Reveal>

          <Reveal
            as="p"
            delay={120}
            className="text-cream-200/75 mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed"
          >
            {lead}
          </Reveal>

          <Reveal
            delay={180}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-[0.875rem] font-semibold text-[#062b14] transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
            >
              <WhatsAppIcon className="size-4.5" />
              Chat on WhatsApp
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={site.phone.tel}
              className="border-cream-50/30 text-cream-50 hover:bg-cream-50 hover:text-forest-950 inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full border px-6 text-[0.875rem] font-semibold transition-colors duration-300 sm:w-auto"
            >
              <PhoneIcon className="size-4" />
              {site.phone.display}
            </a>
          </Reveal>

          <Reveal
            as="p"
            delay={240}
            className="text-cream-200/40 mt-6 text-[0.6875rem] tracking-[0.16em] uppercase"
          >
            {site.hoursNote}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
