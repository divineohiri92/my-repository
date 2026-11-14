/**
 * Builds the responsive image sets used by the site.
 *   node scripts/optimize-images.mjs
 *
 * Every source photo lives in assets-src/images (kept out of the deploy
 * bundle). We emit AVIF + WebP + JPEG at several widths into
 * src/assets/images, where Vite fingerprints and long-caches them.
 */
import sharp from 'sharp';
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets-src/images';
const OUT = 'src/assets/images';

/** widths generated per photo (never upscaled past the original) */
const WIDTHS = [400, 640, 900, 1200];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f));
const manifest = {};

for (const file of files) {
  const name = path.basename(file, path.extname(file));
  const { width: srcW, height: srcH } = await sharp(path.join(SRC, file)).metadata();

  const widths = [...new Set([...WIDTHS.filter((w) => w <= srcW), Math.min(srcW, 1200)])]
    .filter((w) => w <= srcW)
    .sort((a, b) => a - b);

  manifest[name] = { width: srcW, height: srcH, widths };

  for (const w of widths) {
    const base = path.join(OUT, `${name}-${w}`);
    const resized = () => sharp(path.join(SRC, file)).rotate().resize({ width: w });

    await Promise.all([
      resized().avif({ quality: 62, effort: 6 }).toFile(`${base}.avif`),
      resized().webp({ quality: 72, effort: 5 }).toFile(`${base}.webp`),
      resized().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(`${base}.jpg`),
    ]);
  }
  console.log(`✓ ${name} → ${widths.join(', ')}px`);
}

// Manifest consumed by <Picture> so it knows the intrinsic size + srcset widths.
await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

// Social share card, cropped to the 1200×630 Open Graph ratio.
await mkdir('public', { recursive: true });
await sharp(path.join(SRC, 'catering-spread.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/og-image.jpg');

console.log('\nwrote src/assets/images + public/og-image.jpg');
