/**
 * Brand lockup: a serif monogram seal + stacked wordmark.
 * `tone` flips it for dark sections.
 */
export default function Logo({ tone = 'dark', compact = false, className = '' }) {
  const dark = tone === 'dark';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className={[
          'grid size-10 shrink-0 place-items-center rounded-full ring-1 sm:size-11',
          dark
            ? 'bg-forest-900 text-cream-100 ring-forest-900/15'
            : 'bg-cream-50/10 text-cream-50 ring-cream-50/25',
        ].join(' ')}
      >
        <span className="font-serif text-[1.15rem] leading-none tracking-tight italic sm:text-[1.25rem]">
          Ck
        </span>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={[
            'font-display text-[1.0625rem] font-semibold tracking-[-0.035em] sm:text-lg',
            dark ? 'text-forest-950' : 'text-cream-50',
          ].join(' ')}
        >
          Cheryl&rsquo;s Kitchen
        </span>
        {!compact && (
          <span
            className={[
              'mt-1 text-[0.5625rem] font-semibold tracking-[0.24em] uppercase',
              dark ? 'text-forest-700/70' : 'text-cream-200/60',
            ].join(' ')}
          >
            Lagos · Since 2016
          </span>
        )}
      </span>
    </span>
  );
}
