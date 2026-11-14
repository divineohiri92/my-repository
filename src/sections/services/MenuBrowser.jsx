import { useState } from 'react';
import Picture from '../../components/ui/Picture';
import Reveal from '../../components/ui/Reveal';
import { menuCategories } from '../../data/menu';
import { whatsappLink } from '../../data/site';
import { WhatsAppIcon, ArrowUpRight } from '../../components/ui/icons';

/** Tabbed menu with a real filter — keyboard accessible, no dead ends. */
export default function MenuBrowser() {
  const [active, setActive] = useState(menuCategories[0].id);
  const category = menuCategories.find((c) => c.id === active) ?? menuCategories[0];

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Menu categories"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {menuCategories.map((cat) => {
          const selected = cat.id === active;
          return (
            <button
              key={cat.id}
              role="tab"
              type="button"
              id={`tab-${cat.id}`}
              aria-selected={selected}
              aria-controls={`panel-${cat.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(cat.id)}
              onKeyDown={(e) => {
                const i = menuCategories.findIndex((c) => c.id === active);
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  const next = menuCategories[(i + 1) % menuCategories.length];
                  setActive(next.id);
                  document.getElementById(`tab-${next.id}`)?.focus();
                }
                if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const prev =
                    menuCategories[(i - 1 + menuCategories.length) % menuCategories.length];
                  setActive(prev.id);
                  document.getElementById(`tab-${prev.id}`)?.focus();
                }
              }}
              className={[
                'shrink-0 rounded-full border px-4 py-2.5 text-[0.8125rem] font-semibold transition-all duration-300',
                selected
                  ? 'border-forest-900 bg-forest-900 text-cream-50 shadow-[0_8px_20px_-12px_rgba(11,26,18,0.8)]'
                  : 'border-forest-900/15 text-forest-900/70 hover:border-forest-900/30 hover:text-forest-950',
              ].join(' ')}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        id={`panel-${category.id}`}
        aria-labelledby={`tab-${category.id}`}
        key={category.id}
        className="page-enter mt-8"
      >
        <div className="border-forest-900/10 flex flex-col gap-2 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-palm-600">{category.kicker}</p>
            <h3 className="font-display text-forest-950 mt-2 text-[1.5rem] leading-tight tracking-[-0.03em] sm:text-[1.75rem]">
              {category.name}
            </h3>
          </div>
          <p className="text-ink-soft max-w-sm text-[0.8125rem] leading-relaxed">
            {category.blurb}
          </p>
        </div>

        <ul className="divide-forest-900/8 divide-y">
          {category.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.name}
              delay={i * 60}
              className="group flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="relative w-full shrink-0 overflow-hidden rounded-xl sm:size-24">
                <Picture
                  name={item.photo}
                  alt={item.name}
                  sizes="(min-width: 640px) 96px, 92vw"
                  className="block aspect-[16/10] w-full sm:aspect-square"
                  imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <h4 className="font-display text-forest-950 text-[1rem] font-semibold tracking-[-0.02em]">
                    {item.name}
                  </h4>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={[
                        'rounded-full px-2 py-0.5 text-[0.5625rem] font-bold tracking-[0.1em] uppercase',
                        tag === 'Spicy'
                          ? 'bg-pepper-500/10 text-pepper-500'
                          : tag === 'Vegetarian'
                            ? 'bg-forest-500/10 text-forest-600'
                            : 'bg-palm-500/15 text-palm-600',
                      ].join(' ')}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-ink-soft mt-1.5 text-[0.8125rem] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
                <div className="text-right">
                  <p className="font-display text-forest-950 text-[1.0625rem] font-semibold tracking-[-0.02em]">
                    {item.price}
                  </p>
                  <p className="text-ink-soft/60 text-[0.625rem] tracking-[0.1em] uppercase">
                    {item.unit}
                  </p>
                </div>
                <a
                  href={whatsappLink(
                    `Hi Cheryl's Kitchen! I'd like to order: ${item.name} (${item.price} ${item.unit}). Is it available?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Order ${item.name} on WhatsApp`}
                  className="border-forest-900/15 text-forest-900 hover:border-forest-900 hover:bg-forest-900 hover:text-cream-50 inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[0.6875rem] font-semibold transition-colors duration-300"
                >
                  <WhatsAppIcon className="size-3.5" />
                  Order
                  <ArrowUpRight className="size-2.5 opacity-50" />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>

        <p className="bg-cream-100 text-ink-soft mt-6 rounded-xl px-4 py-3 text-[0.75rem] leading-relaxed">
          <strong className="text-forest-900 font-semibold">Prices are guides.</strong> Final cost
          depends on guest count, protein choices and delivery distance. You always get an itemised
          quote before paying.
        </p>
      </div>
    </div>
  );
}
