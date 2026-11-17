import { Link } from 'react-router-dom';
import { site, telegramLink } from '../../data/site';

/**
 * Primary call-to-action buttons.
 *
 * Button  → normal action
 * LinkButton → react-router <Link>
 * AnchorButton → plain <a> (external / tel: / wa.me)
 * ExternalLink → <a target=_blank rel=noopener>
 */

const sizes = {
  sm: 'h-10 px-4 text-[0.8125rem] gap-1.5',
  md: 'h-12 px-6 text-sm gap-2',
  lg: 'h-14 px-7 text-[0.9375rem] gap-2.5',
};

const variants = {
  primary:
    'bg-palm-500 text-forest-950 hover:bg-palm-400 shadow-[0_10px_30px_-12px_rgba(239,139,60,0.75)]',
  forest: 'bg-forest-900 text-cream-50 hover:bg-forest-800',
  whatsapp: 'bg-[#25D366] text-[#062b14] hover:bg-[#3ee07a]',
  telegram: 'bg-[#2AABEE] text-[#04212f] hover:bg-[#55bdf5]',
  outline: 'border border-forest-900/25 text-forest-900 hover:bg-forest-900 hover:text-cream-50',
  ghost: 'text-forest-900 hover:bg-forest-900/6',
  onDark: 'border border-cream-50/30 text-cream-50 hover:bg-cream-50 hover:text-forest-950',
};

const shared =
  'group/btn relative inline-flex select-none items-center justify-center rounded-full font-semibold tracking-[-0.01em] transition-[background-color,color,transform,box-shadow] duration-300 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

function classesFor(variant, size, className) {
  return [shared, sizes[size], variants[variant], className].filter(Boolean).join(' ');
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }) {
  return (
    <button className={classesFor(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

/** Renders an internal route (client-side, no full reload). */
export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  return (
    <Link to={to} className={classesFor(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function AnchorButton({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  return (
    <a href={href} className={classesFor(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}

/** Opens WhatsApp with a pre-filled message. */
export function WhatsAppButton({
  message = site.whatsappMessage,
  size = 'md',
  variant = 'whatsapp',
  className = '',
  label = 'Order on WhatsApp',
  children = label,
  ...rest
}) {
  return (
    <a
      href={`https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={classesFor(variant, size, className)}
      data-wa="true"
      {...rest}
    >
      {children}
    </a>
  );
}

/** Opens Telegram — the backup channel when WhatsApp is unreachable. */
export function TelegramButton({
  size = 'md',
  variant = 'telegram',
  className = '',
  label = 'Message on Telegram',
  children = label,
  ...rest
}) {
  return (
    <a
      href={telegramLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={classesFor(variant, size, className)}
      data-telegram="true"
      {...rest}
    >
      {children}
    </a>
  );
}

/** Click-to-call. */
export function CallButton({
  size = 'md',
  variant = 'outline',
  className = '',
  children,
  ...rest
}) {
  return (
    <a href={site.phone.tel} className={classesFor(variant, size, className)} {...rest}>
      {children ?? site.phone.display}
    </a>
  );
}
