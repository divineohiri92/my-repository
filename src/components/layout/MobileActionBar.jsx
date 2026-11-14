import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { site, whatsappLink, telegramLink } from '../../data/site';
import { PhoneIcon, WhatsAppIcon, TelegramIcon } from '../ui/icons';

/**
 * Thumb-reach order bar on small screens. Slides in after the first scroll and
 * hides on the contact page (where the form is the primary action).
 *
 * Three channels, because WhatsApp is not always reachable: call, WhatsApp
 * and Telegram sit side by side so nobody hits a dead end.
 */
export default function MobileActionBar() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hidden = pathname === '/contact';

  const item =
    'flex h-11 items-center justify-center gap-1.5 rounded-xl text-[0.75rem] font-semibold transition-colors active:bg-forest-900/10';

  return (
    <div
      className={[
        'fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ease-out lg:hidden',
        hidden ? 'translate-y-full opacity-0' : '',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0',
      ].join(' ')}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="px-3">
        <div className="border-forest-900/8 bg-cream-50/92 flex items-center gap-1 rounded-2xl border p-1.5 shadow-[0_-4px_30px_-10px_rgba(11,26,18,0.35),0_8px_30px_-14px_rgba(11,26,18,0.3)] backdrop-blur-xl">
          <a href={site.phone.tel} className={`${item} text-forest-950 flex-1`}>
            <PhoneIcon className="size-4" />
            Call
          </a>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item} flex-1.35 bg-[#25D366]/12 text-[#0b6b36]`}
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>

          <a
            href={telegramLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item} flex-1 bg-[#2AABEE]/12 text-[#12628f]`}
          >
            <TelegramIcon className="size-4" />
            Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
