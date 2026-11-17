import { useEffect, useRef, useState } from 'react';

/**
 * Fades + lifts an element into view once, using one shared
 * IntersectionObserver per element. Falls back to "always visible" when the
 * API is missing or the user prefers reduced motion.
 */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={shown ? 'in' : ''}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
