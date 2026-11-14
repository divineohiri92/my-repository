import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Picture from './Picture';
import { CloseIcon } from './icons';

/**
 * Accessible image lightbox: arrow-key navigation, Escape to close,
 * focus trapped on the close button, background scroll locked.
 */
export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const closeRef = useRef(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose, onNext, onPrev]);

  if (!open || !item) return null;

  /* Rendered into <body>: the page wrapper animates a transform, which would
     otherwise trap a fixed overlay inside it. */
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${items.length}: ${item.alt}`}
      className="bg-forest-950/96 fixed inset-0 z-100 flex flex-col backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <p className="text-cream-200/60 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
          {index + 1} / {items.length} · {item.caption}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="border-cream-50/20 text-cream-50 hover:bg-cream-50/10 grid size-10 place-items-center rounded-full border transition-colors"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous image"
          className="border-cream-50/20 bg-forest-950/60 text-cream-50 hover:bg-cream-50/15 absolute left-2 z-10 grid size-11 place-items-center rounded-full border transition-colors sm:left-5"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ‹
          </span>
        </button>

        <figure className="flex max-h-full max-w-4xl flex-col items-center">
          <Picture
            name={item.name}
            alt={item.alt}
            sizes="(min-width: 1024px) 60vw, 92vw"
            priority
            className="block max-h-[76vh] w-auto overflow-hidden rounded-xl"
            imgClassName="max-h-[76vh] w-auto rounded-xl object-contain"
          />
          <figcaption className="text-cream-200/70 mt-4 max-w-lg text-center text-[0.8125rem] leading-relaxed">
            {item.alt}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next image"
          className="border-cream-50/20 bg-forest-950/60 text-cream-50 hover:bg-cream-50/15 absolute right-2 z-10 grid size-11 place-items-center rounded-full border transition-colors sm:right-5"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ›
          </span>
        </button>
      </div>
    </div>,
    document.body,
  );
}
