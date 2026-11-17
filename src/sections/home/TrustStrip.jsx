import Marquee from '../../components/ui/Marquee';

const items = [
  'Small chops',
  'Party jollof',
  'Firewood smoke',
  'Suya grill',
  'Wedding catering',
  'Weekly meal prep',
  'Delivered hot in Lagos',
  'No shortcuts',
];

/** Infinite ticker band sitting between hero and story sections. */
export default function TrustStrip() {
  return (
    <div className="border-forest-900/10 bg-cream-100 text-forest-900/55 relative border-y py-4">
      <Marquee
        items={items}
        className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        itemClassName="font-display text-[0.8125rem] font-medium uppercase tracking-[0.2em] sm:text-sm"
      />
    </div>
  );
}
