import { Link } from 'react-router-dom';
import Picture from '../../components/ui/Picture';
import Reveal from '../../components/ui/Reveal';
import SectionHeading from '../../components/ui/SectionHeading';
import { menuCategories } from '../../data/menu';
import { whatsappLink } from '../../data/site';
import { ArrowRight, ArrowUpRight, WhatsAppIcon } from '../../components/ui/icons';

/** Three signature dishes, pulled straight from the menu data. */
const picks = [
  { category: 'small-chops', item: 0, badge: 'Weekend favourite' },
  { category: 'rice-mains', item: 0, badge: 'Most ordered' },
  { category: 'soups', item: 0, badge: 'Sunday classic' },
];

function findItem(categoryId, index) {
  const cat = menuCategories.find((c) => c.id === categoryId);
  return cat ? { item: cat.items[index], category: cat } : null;
}

export default function Favourites() {
  return (
    <section className="bg-cream-100 relative py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="What people order"
          title={
            <>
              The three dishes that
              <br className="hidden sm:block" /> built this kitchen
            </>
          }
          lead="If it is your first time, start here. These leave the kitchen more often than anything else we cook."
          action={
            <Link
              to="/services"
              className="group border-forest-900/20 text-forest-950 hover:border-forest-900 hover:bg-forest-900 hover:text-cream-50 inline-flex h-12 items-center gap-2 rounded-full border px-5 text-[0.8125rem] font-semibold transition-colors"
            >
              Full menu
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          }
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {picks.map((pick, i) => {
            const found = findItem(pick.category, pick.item);
            if (!found) return null;
            const { item } = found;

            return (
              <Reveal as="li" key={item.name} delay={i * 90}>
                <article className="card-hover group border-forest-900/8 bg-cream-50 relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border shadow-[0_2px_20px_-12px_rgba(11,26,18,0.25)] hover:shadow-[0_30px_50px_-30px_rgba(11,26,18,0.4)]">
                  <div className="relative overflow-hidden">
                    <Picture
                      name={item.photo}
                      alt={item.name}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="block aspect-[4/3.3] w-full"
                      imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <span className="bg-cream-50/95 text-forest-900 absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.5625rem] font-bold tracking-[0.14em] uppercase backdrop-blur">
                      {pick.badge}
                    </span>
                    <span className="bg-forest-950/85 font-display text-cream-50 absolute right-3 bottom-3 rounded-full px-3 py-1.5 text-[0.8125rem] font-bold backdrop-blur">
                      {item.price}
                      <span className="text-cream-200/70 ml-1 text-[0.5625rem] font-medium tracking-wide">
                        {item.unit}
                      </span>
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-display text-forest-950 text-[1.1875rem] leading-tight tracking-[-0.025em]">
                      {item.name}
                    </h3>
                    <p className="text-ink-soft mt-2 flex-1 text-[0.8125rem] leading-relaxed">
                      {item.description}
                    </p>

                    <a
                      href={whatsappLink(
                        `Hi Cheryl's Kitchen! I'd like to order the ${item.name} (${item.price} ${item.unit}). Is it available this week?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-forest-900/5 text-forest-950 hover:bg-forest-900 hover:text-cream-50 mt-5 inline-flex items-center gap-2 self-start rounded-full py-2 pr-3.5 pl-3 text-[0.75rem] font-semibold transition-colors duration-300"
                    >
                      <WhatsAppIcon className="size-3.5" />
                      Order this
                      <ArrowUpRight className="size-3 opacity-50" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
