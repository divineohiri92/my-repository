import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { site, whatsappLink } from '../../data/site';
import { PhoneIcon, WhatsAppIcon, ArrowUpRight } from '../ui/icons';

/**
 * Thumb-reach order bar on small screens. Slides in after the first scroll and
 * hides on the contact page (where the form is the primary action).
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
        <div className="border-forest-900/8 bg-cream-50/92 flex items-center gap-2 rounded-2xl border p-1.5 shadow-[0_-4px_30px_-10px_rgba(11,26,18,0.35),0_8px_30px_-14px_rgba(11,26,18,0.3)] backdrop-blur-xl">
          <a
            href={site.phone.tel}
            className="text-forest-950 active:bg-forest-900/8 flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-[0.8125rem] font-semibold transition-colors"
          >
            <PhoneIcon className="size-4" />
            Call
          </a>
          <span aria-hidden="true" className="bg-forest-900/10 h-6 w-px" />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-forest-900 text-cream-50 active:bg-forest-800 flex h-11 flex-[1.6] items-center justify-center gap-2 rounded-xl text-[0.8125rem] font-semibold transition-colors"
          >
            <WhatsAppIcon className="size-4 text-[#25D366]" />
            Order on WhatsApp
            <ArrowUpRight className="size-3.5 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  );
}
