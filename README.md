# Cheryl's Kitchen — website

A production-ready marketing site for **Cheryl's Kitchen**, a Lagos catering and
small-chops business. Built with **React 19 + Vite 7 + Tailwind CSS 4**, mobile-first,
with every call-to-action wired to WhatsApp, click-to-call or an internal route.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # preview the production build
```

---

## Pages

| Route        | What it does                                                                 |
| ------------ | ---------------------------------------------------------------------------- |
| `/`          | Hero, brand story, signature dishes, services, testimonials, gallery teaser   |
| `/about`     | Founder story, values, timeline, "how ordering works"                        |
| `/services`  | Services, tabbed menu with per-item WhatsApp ordering, 3 catering packages, FAQ |
| `/gallery`   | Filterable photo grid with an accessible lightbox (arrow keys + Escape)       |
| `/contact`   | Validated enquiry form, direct WhatsApp/call/email, hours, delivery areas     |
| `*`          | Friendly 404                                                                  |

---

## Editing business details

**Everything the client is likely to change lives in two files:**

- `src/data/site.js` — phone number, email, socials, hours, delivery areas, WhatsApp greeting.
- `src/data/menu.js` — menu items, prices, catering packages, services, testimonials, FAQ.

Phone numbers are defined once and derived everywhere:

```js
const RAW_PHONE = '09035448624';   // shown on the page
const WA_NUMBER = '2349035448624'; // used for wa.me links
```

> Note: `0903 544 8624` is the local format of `+234 903 544 8624`. Both are generated
> from the same constants, so changing the number in one place updates calls, texts,
> WhatsApp links and the structured data.

### TODO before launch

Search the codebase for `TODO(client)`:

1. `site.url` — replace `https://cherrylskitchen.ng` with the live domain, then update
   `index.html`, `public/robots.txt` and `public/sitemap.xml` to match.
2. `site.email` — confirm the real inbox.
3. `site.telegram` — confirmed as **@Chochocolateee** (`t.me/Chochocolateee`).
4. `site.socials` — TikTok is confirmed (`@cheyersef`); confirm Instagram / Facebook.
5. Prices in `src/data/menu.js` — confirm current pricing.
6. Testimonials — replace with real, permission-given reviews.

---

## Contact channels

Three ways to start a conversation, because WhatsApp is not always reachable:

| Channel | Where it appears |
| --- | --- |
| **WhatsApp** | Header, hero, every menu item, every package, CTA bands, footer |
| **Telegram** | Header icon, mobile menu, sticky mobile bar, contact page, footer, CTA bands — `t.me/Chochocolateee` |
| **Call** | Header, hero, mobile menu, sticky mobile bar, footer, contact page |

The sticky mobile bar shows all three side by side so a visitor never hits a dead end.
The contact page and FAQ both tell people to fall back to Telegram or a call if
WhatsApp goes quiet — that matters for a business whose number is a mobile line.

Telegram links are built by `telegramLink()` in `src/data/site.js`:

```js
telegram: {
  username: 'Chochocolateee',                // t.me/Chochocolateee
  href: 'https://t.me/+2349035448624',       // fallback: phone-number link
}
```

## Ordering flow (why there is no backend)

The site is a static build, so the contact form does not POST to a server and silently
succeed. Instead it:

1. validates every field inline (with `aria-invalid` + `role="alert"` messages),
2. composes a formatted enquiry,
3. opens WhatsApp with the whole message pre-filled — the channel the business
   actually answers — and shows a success screen with a fallback call button.

Menu items and package cards deep-link into WhatsApp with the item name and price
already written in, so a customer never has to retype an order.

**Want a real backend?** Set `VITE_FORM_ENDPOINT` to a Formspree / Netlify Forms /
custom URL. The form will POST the enquiry there *and* open WhatsApp as a fallback.

```bash
# .env
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

---

## Images

Source photos live in `assets-src/images/` (kept out of the bundle). A script generates
responsive **AVIF + WebP + JPEG** derivatives at 400/640/900/1200 px into
`src/assets/images/`, where Vite fingerprints them for immutable caching.

```bash
npm run images   # regenerate after adding a new photo
```

`<Picture>` (in `src/components/ui/Picture.jsx`) builds the `<picture>` element with
`srcset`/`sizes`, AVIF → WebP → JPEG fallbacks, and intrinsic `width`/`height` to
prevent layout shift. The hero image is the only `priority` (eager) image; everything
else lazy-loads.

Typical transfer: **~30–70 KB per image** at the size actually displayed.

---

## SEO

- Per-page `<title>`, description, canonical, Open Graph and Twitter card tags,
  applied client-side by `usePageMeta()` in `src/lib/seo.js`.
- Static defaults for crawlers that do not run JS live in `index.html`.
- JSON-LD structured data: `LocalBusiness` / `FoodEstablishment` (NAP, opening hours,
  geo, area served), `WebSite`, `BreadcrumbList`, `FAQPage`, `ContactPage`.
- `public/robots.txt`, `public/sitemap.xml`, generated `public/og-image.jpg` (1200×630).
- Favicon: SVG (scales everywhere) + 32px PNG + 180px Apple touch icon + web manifest.

---

## Accessibility & motion

- Skip link, visible focus rings on both light and dark surfaces, semantic landmarks.
- Mobile menu: focus trap, `Escape` to close, body scroll lock, `aria-expanded`.
- Lightbox: arrow-key navigation, focus management, scroll lock.
- Menu tabs: roving tabindex with arrow-key support (`role="tablist"`).
- Every animation respects `prefers-reduced-motion`.
- No-JS fallback so revealed content is never hidden.

---

## Deployment

Static output in `dist/`. SPA rewrites are already configured for:

- **Vercel** — `vercel.json`
- **Netlify** — `public/_redirects` + `public/_headers`

For any other host, add a catch-all rewrite to `/index.html` and serve
`/assets/*` with `Cache-Control: public, max-age=31536000, immutable`.

---

## Project structure

```
src/
├── assets/images/        # generated, hashed image derivatives + manifest
├── components/
│   ├── layout/           # Header, Footer, PageHero, MobileActionBar, ScrollToTop
│   ├── ui/               # Picture, Button, Reveal, Lightbox, icons, Logo, Marquee
│   └── ContactForm.jsx
├── data/                 # site.js + menu.js — all editable content
├── lib/seo.js            # metadata + JSON-LD helpers
├── pages/                # Home, About, Services, Gallery, Contact, NotFound
├── sections/             # composable page sections
├── App.jsx
└── index.css             # Tailwind theme tokens, fonts, motion utilities
```
