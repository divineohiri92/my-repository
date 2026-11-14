/**
 * Infinite horizontal ticker. The track holds two identical groups and slides
 * exactly -50%, so it loops seamlessly. Pauses on hover; frozen for users who
 * prefer reduced motion.
 */
export default function Marquee({ items, className = '', itemClassName = '' }) {
  const group = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          {item}
          <span className="mx-6 inline-block size-1.5 rounded-full bg-current opacity-40 sm:mx-8" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      {/* Screen-reader version of the same content */}
      <span className="sr-only">{items.join(' · ')}</span>
      <div className="marquee-track animate-marquee flex w-max">
        {group}
        {group}
      </div>
    </div>
  );
}
