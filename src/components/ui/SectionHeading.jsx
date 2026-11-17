import Reveal from './Reveal';
import { SparkleIcon } from './icons';

/**
 * Consistent section header: small eyebrow, big display heading and an
 * optional supporting line. `tone` flips colours for dark sections.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'dark',
  className = '',
  action,
}) {
  const dark = tone === 'dark';
  const centered = align === 'center';

  return (
    <div
      className={[
        'flex flex-col gap-6',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      ].join(' ')}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && (
          <Reveal
            as="p"
            className={[
              'eyebrow',
              dark ? 'text-forest-700/70' : 'text-palm-400',
              centered ? 'justify-center' : '',
            ].join(' ')}
          >
            <SparkleIcon className="size-3" aria-hidden="true" />
            {eyebrow}
          </Reveal>
        )}

        <Reveal
          as="h2"
          delay={60}
          className={[
            'mt-4 text-[2rem] leading-[0.98] sm:text-[2.75rem] lg:text-[3.25rem]',
            dark ? 'text-forest-950' : 'text-cream-50',
          ].join(' ')}
        >
          {title}
        </Reveal>

        {lead && (
          <Reveal
            as="p"
            delay={120}
            className={[
              'mt-5 text-[0.9375rem] leading-relaxed sm:text-base',
              centered ? 'mx-auto max-w-xl' : 'max-w-lg',
              dark ? 'text-ink-soft' : 'text-cream-200/70',
            ].join(' ')}
          >
            {lead}
          </Reveal>
        )}
      </div>

      {action && (
        <Reveal delay={160} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
}
