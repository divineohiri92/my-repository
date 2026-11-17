import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll on route change, or scrolls to an in-page #anchor
 * (used by footer links such as /services#packages).
 *
 * Lazy-loaded routes may not have rendered the target yet, so anchors are
 * retried for a short window instead of giving up after one frame.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer;

    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      // Give the lazy route up to ~2.5s to mount the anchor target.
      if (tries++ < 25) {
        timer = window.setTimeout(attempt, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    timer = window.setTimeout(attempt, 60);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
