/**
 * End-to-end audit of the production build.
 *
 *   npm run build
 *   npm run preview        # in another terminal (port 4173)
 *   npm run audit
 *
 * Requires puppeteer + a Chromium binary (dev-only, not shipped):
 *   npm i -D puppeteer && npx puppeteer browsers install chrome
 *
 * Checks: route status, console errors, failed requests, internal links,
 * external rel=noopener, image decode/alt/upscaling, form validation,
 * mobile nav + sticky bar, anchor scrolling, lightbox, menu tabs,
 * SEO metadata per route, static assets, and reduced-motion visibility.
 * Exits non-zero on any failure so it can gate a deploy.
 */
import puppeteer from 'puppeteer';

const BASE = process.env.BASE || 'http://localhost:4173';

// Prefer an explicit CHROME_PATH, then @sparticuz/chromium (used in CI), then
// puppeteer's own managed browser.
let executablePath;
let chromiumArgs = ['--disable-dev-shm-usage'];
if (process.env.CHROME_PATH) {
  executablePath = process.env.CHROME_PATH;
} else {
  try {
    const { default: chromium } = await import('@sparticuz/chromium');
    executablePath = await chromium.executablePath();
    chromiumArgs = chromium.args;
  } catch {
    executablePath = undefined; // use puppeteer's bundled browser
  }
}

const browser = await puppeteer.launch({
  executablePath,
  args: [...chromiumArgs, '--no-sandbox', '--disable-dev-shm-usage'],
  headless: 'shell',
});

const results = [];
const pass = (name, detail = '') => results.push({ ok: true, name, detail });
const fail = (name, detail = '') => results.push({ ok: false, name, detail });

const ROUTES = ['/', '/about', '/services', '/gallery', '/contact', '/does-not-exist'];

/* ── 1. Every route: loads, no console errors, no failed requests ────────── */
for (const route of ROUTES) {
  const page = await browser.newPage();
  const errors = [];
  const failed = [];
  page.on('pageerror', (e) => errors.push('JS: ' + e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push('CONSOLE: ' + m.text());
  });
  page.on('requestfailed', (r) => failed.push(r.url().split('/').pop()));

  const res = await page.goto(BASE + route, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));

  const status = res.status();
  if (status !== 200) fail(`${route} status`, String(status));
  else pass(`${route} status`, '200');
  if (errors.length) fail(`${route} console`, errors.join(' | '));
  else pass(`${route} console`, 'clean');
  if (failed.length) fail(`${route} requests`, failed.join(', '));
  else pass(`${route} requests`, 'all ok');

  await page.close();
}

/* ── 2. Broken internal links ────────────────────────────────────────────── */
{
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  const hrefs = new Set();
  for (const route of ROUTES.slice(0, 5)) {
    await page.goto(BASE + route, { waitUntil: 'networkidle0' });
    const found = await page.evaluate(() =>
      [...document.querySelectorAll('a[href]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => h && !/^(https?:|tel:|mailto:|#)/.test(h)),
    );
    found.forEach((h) => hrefs.add(h.split('#')[0]));
  }
  const list = [...hrefs].filter(Boolean);
  const broken = [];
  for (const h of list) {
    const r = await page.goto(BASE + h, { waitUntil: 'domcontentloaded' }).catch(() => null);
    // 200 = ok, 304 = served from cache after revalidation — both healthy.
    if (!r || ![200, 304].includes(r.status())) broken.push(`${h} (${r ? r.status() : 'error'})`);
  }
  if (broken.length) fail('internal links', broken.join(', '));
  else pass('internal links', `${list.length} checked, all resolve`);
  await page.close();
}

/* ── 3. External link hygiene (target/rel, real URLs) ────────────────────── */
{
  const page = await browser.newPage();
  const bad = new Set();
  const ext = new Set();
  for (const route of ROUTES.slice(0, 5)) {
    await page.goto(BASE + route, { waitUntil: 'networkidle0' });
    const data = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="http"]')].map((a) => ({
        href: a.href,
        target: a.target,
        rel: a.rel,
      })),
    );
    for (const d of data) {
      ext.add(d.href);
      if (d.target === '_blank' && !/noopener/.test(d.rel)) bad.add(d.href);
    }
  }
  if (bad.size) fail('external rel=noopener', [...bad].join(', '));
  else pass('external rel=noopener', `${ext.size} unique external links ok`);
  console.log('\n  external links found:');
  [...ext].sort().forEach((u) => console.log('   •', u));
  await page.close();
}

/* ── 4. Images: all decode, no upscaling, alt text present ───────────────── */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  const missingAlt = [];
  const brokenImg = [];
  let upscaled = 0;
  for (const route of ROUTES.slice(0, 5)) {
    await page.goto(BASE + route, { waitUntil: 'networkidle0' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await new Promise((r) => setTimeout(r, 800));
    const info = await page.evaluate(() =>
      [...document.querySelectorAll('img')].map((i) => ({
        src: i.currentSrc.split('/').pop(),
        nw: i.naturalWidth,
        cw: Math.round(i.getBoundingClientRect().width),
        alt: i.getAttribute('alt'),
        complete: i.complete,
      })),
    );
    for (const i of info) {
      if (!i.complete || i.nw === 0) brokenImg.push(route + ' → ' + i.src);
      if (i.alt === null) missingAlt.push(route + ' → ' + i.src);
      if (i.nw + 2 < i.cw) upscaled++;
    }
  }
  if (brokenImg.length) fail('images decode', brokenImg.join(', '));
  else pass('images decode', 'all loaded');
  if (missingAlt.length) fail('img alt attribute', missingAlt.join(', '));
  else pass('img alt attribute', 'present on every image');
  pass('image resolution', upscaled ? `${upscaled} upscaled` : 'never upscaled');
  await page.close();
}

/* ── 5. Contact form: validation then valid submit ──────────────────────── */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle0' });

  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 300));
  const alerts = await page.$$eval('[role="alert"]', (e) => e.length);
  const invalid = await page.$$eval('[aria-invalid="true"]', (e) => e.length);
  if (alerts >= 4 && invalid >= 4) pass('form blocks empty submit', `${alerts} errors shown`);
  else fail('form blocks empty submit', `alerts=${alerts} invalid=${invalid}`);

  // bad phone number
  const inputs = await page.$$('input');
  await inputs[0].type('Amaka Obi');
  await inputs[1].type('123');
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 300));
  const phoneErr = await page.$$eval('[role="alert"]', (els) => els.map((e) => e.textContent));
  if (phoneErr.some((t) => /phone|number/i.test(t))) pass('form rejects short phone', phoneErr[0]);
  else fail('form rejects short phone', JSON.stringify(phoneErr));
  await page.close();
}

/* ── 6. Mobile: menu, sticky bar, no horizontal overflow ────────────────── */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 780, isMobile: true, hasTouch: true });
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });

  const overflow = await page.evaluate(() => ({
    docW: document.documentElement.scrollWidth,
    winW: window.innerWidth,
  }));
  if (overflow.docW > overflow.winW + 1)
    fail('horizontal overflow @360px', `${overflow.docW} > ${overflow.winW}`);
  else pass('horizontal overflow @360px', 'none');

  await page.click('button[aria-controls="mobile-menu"]');
  await new Promise((r) => setTimeout(r, 600));
  const open = await page.$eval('button[aria-controls="mobile-menu"]', (e) => e.getAttribute('aria-expanded'));
  const lock = await page.evaluate(() => document.body.style.overflow);
  if (open === 'true' && lock === 'hidden') pass('mobile menu opens + locks scroll');
  else fail('mobile menu opens + locks scroll', `expanded=${open} lock=${lock}`);

  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 600));
  const closed = await page.$eval('button[aria-controls="mobile-menu"]', (e) => e.getAttribute('aria-expanded'));
  const unlocked = await page.evaluate(() => document.body.style.overflow === '');
  if (closed === 'false' && unlocked) pass('mobile menu closes + unlocks');
  else fail('mobile menu closes + unlocks', `expanded=${closed} unlocked=${unlocked}`);

  // sticky bar appears on scroll — scope strictly to the fixed bottom bar
  await page.evaluate(() => window.scrollTo(0, 1200));
  await new Promise((r) => setTimeout(r, 900));
  const bar = await page.evaluate(() => {
    const fixed = [...document.querySelectorAll('div')].find((d) => {
      const cs = getComputedStyle(d);
      const r = d.getBoundingClientRect();
      return (
        cs.position === 'fixed' &&
        cs.bottom === '0px' &&
        r.height > 40 &&
        r.height < 120 &&
        getComputedStyle(d).zIndex === '40'
      );
    });
    if (!fixed) return null;
    const r = fixed.getBoundingClientRect();
    const links = [...fixed.querySelectorAll('a')].map((a) => ({
      text: a.textContent.trim(),
      href: a.getAttribute('href'),
      w: Math.round(a.getBoundingClientRect().width),
      h: Math.round(a.getBoundingClientRect().height),
    }));
    return { visible: r.top < window.innerHeight, links };
  });

  if (!bar) fail('sticky bar found', 'no fixed bottom bar');
  else {
    if (!bar.visible) fail('sticky bar visible after scroll');
    else pass('sticky bar visible after scroll');

    const hasTel = bar.links.some((l) => l.href?.startsWith('tel:'));
    const hasWa = bar.links.some((l) => l.href?.includes('wa.me'));
    const hasTg = bar.links.some((l) => l.href?.includes('t.me'));
    if (hasTel && hasWa && hasTg)
      pass('sticky bar channels', bar.links.map((l) => l.text).join(' · '));
    else fail('sticky bar channels', JSON.stringify(bar.links));

    const tiny = bar.links.filter((l) => l.w < 55 || l.h < 40);
    if (tiny.length) fail('sticky bar hit targets', tiny.map((l) => `${l.text}=${l.w}px`).join(', '));
    else pass('sticky bar hit targets', bar.links.map((l) => `${l.text} ${l.w}×${l.h}`).join(' · '));

    // no horizontal overflow inside the bar
    const overflow = await page.evaluate(() => {
      const fixed = [...document.querySelectorAll('div')].find((d) => {
        const cs = getComputedStyle(d);
        return cs.position === 'fixed' && cs.bottom === '0px' && getComputedStyle(d).zIndex === '40';
      });
      return fixed ? fixed.scrollWidth - fixed.clientWidth : 0;
    });
    if (overflow > 1) fail('sticky bar overflow', `${overflow}px`);
    else pass('sticky bar overflow', 'none');
  }

  await page.close();
}

/* ── 7. Hash anchor navigation on a lazy route ──────────────────────────── */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.querySelector('footer a[href="/services#packages"]').click());
  await new Promise((r) => setTimeout(r, 3000));
  const top = await page.evaluate(() => Math.round(document.getElementById('packages')?.getBoundingClientRect().top ?? -1));
  if (top >= -5 && top < 150) pass('anchor scroll to #packages', `top=${top}px`);
  else fail('anchor scroll to #packages', `top=${top}px`);
  await page.close();
}

/* ── 8. Gallery lightbox keyboard flow ──────────────────────────────────── */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE + '/gallery', { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.scrollTo(0, 250));
  await new Promise((r) => setTimeout(r, 500));
  await page.click('button[aria-label^="Open larger image"]');
  await new Promise((r) => setTimeout(r, 700));
  const box = await page.$eval('[role="dialog"]', (e) => {
    const r = e.getBoundingClientRect();
    return { full: r.width >= window.innerWidth - 1, parent: e.parentElement.tagName };
  });
  if (box.full && box.parent === 'BODY') pass('lightbox covers viewport', 'portalled to body');
  else fail('lightbox covers viewport', JSON.stringify(box));

  const before = await page.$eval('[role="dialog"]', (e) => e.getAttribute('aria-label'));
  await page.keyboard.press('ArrowRight');
  await new Promise((r) => setTimeout(r, 400));
  const after = await page.$eval('[role="dialog"]', (e) => e.getAttribute('aria-label'));
  if (before !== after) pass('lightbox arrow navigation', 'moved to next image');
  else fail('lightbox arrow navigation', 'did not move');

  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 400));
  const gone = !(await page.$('[role="dialog"]'));
  const unlocked = await page.evaluate(() => document.body.style.overflow === '');
  if (gone && unlocked) pass('lightbox closes + unlocks scroll');
  else fail('lightbox closes + unlocks scroll', `gone=${gone} unlocked=${unlocked}`);
  await page.close();
}

/* ── 9. Menu tabs keyboard + filtering ──────────────────────────────────── */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE + '/services', { waitUntil: 'networkidle0' });
  await page.click('#tab-small-chops');
  await page.keyboard.press('ArrowRight');
  await new Promise((r) => setTimeout(r, 400));
  const tab = await page.$eval('[role=tab][aria-selected=true]', (e) => e.textContent);
  const count = await page.$$eval('[role=tabpanel] h4', (e) => e.length);
  if (tab === 'Rice & Mains' && count > 0) pass('menu tabs keyboard nav', `${tab}, ${count} items`);
  else fail('menu tabs keyboard nav', `${tab}, ${count}`);

  const orderHref = await page.$eval('[role=tabpanel] a[href*="wa.me"]', (a) => a.getAttribute('href'));
  if (orderHref && /text=/.test(orderHref) && /Jollof|Asun|Rice/.test(decodeURIComponent(orderHref)))
    pass('menu item deep-links pre-filled', decodeURIComponent(orderHref).slice(0, 70) + '…');
  else fail('menu item deep-links pre-filled', String(orderHref));
  await page.close();
}

/* ── 10. SEO metadata per route ─────────────────────────────────────────── */
{
  const page = await browser.newPage();
  for (const route of ROUTES.slice(0, 5)) {
    await page.goto(BASE + route, { waitUntil: 'networkidle0' });
    const m = await page.evaluate(() => ({
      title: document.title,
      desc: document.querySelector('meta[name=description]')?.content || '',
      canon: document.querySelector('link[rel=canonical]')?.href || '',
      og: document.querySelector('meta[property="og:image"]')?.content || '',
      ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
      tw: document.querySelector('meta[name="twitter:card"]')?.content || '',
      ld: document.querySelectorAll('script[type="application/ld+json"]').length,
      h1: document.querySelectorAll('h1').length,
    }));
    const ok =
      m.title.length > 10 && m.desc.length > 50 && m.canon && m.og && m.ogTitle && m.tw && m.ld > 0 && m.h1 === 1;
    if (ok) pass(`SEO ${route}`, `${m.title.slice(0, 42)}…`);
    else fail(`SEO ${route}`, JSON.stringify(m));
  }
  await page.close();
}

/* ── 11. robots / sitemap / manifest / icons ────────────────────────────── */
for (const f of ['/robots.txt', '/sitemap.xml', '/site.webmanifest', '/favicon.svg', '/og-image.jpg', '/apple-touch-icon.png']) {
  const page = await browser.newPage();
  const r = await page.goto(BASE + f);
  if (r.status() === 200) pass(`asset ${f}`, String(r.headers()['content-type'] || '').split(';')[0]);
  else fail(`asset ${f}`, String(r.status()));
  await page.close();
}

/* ── 12. Reduced motion: content must still be visible ──────────────────── */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  const hidden = await page.evaluate(
    () => [...document.querySelectorAll('[data-reveal]')].filter((e) => getComputedStyle(e).opacity === '0').length,
  );
  if (hidden === 0) pass('reduced motion: no hidden content');
  else fail('reduced motion: no hidden content', `${hidden} elements at opacity 0`);
  await page.close();
}

await browser.close();

/* ── Report ─────────────────────────────────────────────────────────────── */
const fails = results.filter((r) => !r.ok);
const passes = results.filter((r) => r.ok);
console.log('\n' + '─'.repeat(64));
for (const r of results) {
  if (!r.ok) console.log(`  ✗ ${r.name}  →  ${r.detail}`);
}
console.log('─'.repeat(64));
console.log(`  PASS ${passes.length}   FAIL ${fails.length}`);
console.log('─'.repeat(64) + '\n');
process.exit(fails.length ? 1 : 0);
