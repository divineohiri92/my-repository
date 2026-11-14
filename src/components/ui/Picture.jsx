import manifest from '../../assets/images/manifest.json';
import { resolvePhoto } from '../../data/site';

/**
 * Vite resolves these at build time and fingerprints them, so the browser can
 * cache every derivative forever. Keys look like "asun-900.avif".
 */
const urls = import.meta.glob('../../assets/images/*.{avif,webp,jpg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const byName = Object.fromEntries(
  Object.entries(urls).map(([file, url]) => [file.split('/').pop(), url]),
);

function srcSet(name, ext) {
  return manifest[name].widths.map((w) => `${byName[`${name}-${w}.${ext}`]} ${w}w`).join(', ');
}

/**
 * Responsive <picture> with AVIF → WebP → JPEG fallbacks and intrinsic
 * width/height so nothing shifts while loading.
 */
export default function Picture({
  name,
  alt,
  sizes = '100vw',
  className = '',
  imgClassName = '',
  priority = false,
  ratio,
  style,
}) {
  const key = resolvePhoto(name);
  const meta = manifest[key];
  if (!meta) return null;

  const { width, height } = meta;

  return (
    <picture className={className} style={style}>
      <source type="image/avif" srcSet={srcSet(key, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(key, 'webp')} sizes={sizes} />
      <img
        src={byName[`${key}-${meta.widths.at(-1)}.jpg`]}
        srcSet={srcSet(key, 'jpg')}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
        style={ratio ? { aspectRatio: ratio } : undefined}
      />
    </picture>
  );
}
