/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS
 *  Everything the client may want to change lives here: phone, socials,
 *  email, address, hours, prices. Nothing else in the codebase hard-codes it.
 *  Items marked  TODO(client)  must be confirmed before going live.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Local number exactly as advertised (used for display + tel: links). */
const RAW_PHONE = '09035448624';

/** Same number in international format for WhatsApp / SEO schema. */
const WA_NUMBER = '2349035448624';

/** Pretty printed variants */
const displayPhone = '0903 544 8624';
const intlPhone = '+234 903 544 8624';

export const site = {
  name: "Cheryl's Kitchen",
  shortName: "Cheryl's",
  tagline: 'Lagos catering & small chops, made like family.',
  description:
    "Cheryl's Kitchen is a Lagos-based catering and food business serving small chops, party jollof, soups, grills and full event catering. Freshly cooked in small batches, delivered across Lagos.",
  url: 'https://cherrylskitchen.ng', // TODO(client): replace with the live domain
  locale: 'en_NG',
  city: 'Lagos',
  region: 'Lagos State',
  country: 'Nigeria',
  areaServed: ['Lekki', 'Ikoyi', 'Victoria Island', 'Ikeja', 'Yaba', 'Surulere', 'Ajah', 'Gbagada'],

  phone: {
    raw: RAW_PHONE,
    display: displayPhone,
    intl: intlPhone,
    tel: `tel:+${WA_NUMBER}`,
    whatsapp: WA_NUMBER,
  },

  email: 'hello@cherrylskitchen.ng', // TODO(client): confirm the email inbox

  hours: [
    { days: 'Monday – Friday', time: '8:00am – 8:00pm' },
    { days: 'Saturday', time: '9:00am – 8:00pm' },
    { days: 'Sunday', time: 'Closed · pre-orders only' },
  ],
  hoursNote: 'Orders need 24–48 hours notice. Large events: please book 2 weeks ahead.',

  /** Default WhatsApp greeting pre-filled when someone taps a chat button. */
  whatsappMessage:
    "Hi Cheryl's Kitchen! I'd like to place an order. Could you share your menu and availability please?",

  socials: [
    // TODO(client): swap these handles for the real business accounts.
    {
      name: 'Instagram',
      handle: '@cherrylskitchen',
      href: 'https://instagram.com/cherrylskitchen',
    },
    { name: 'TikTok', handle: '@cherrylskitchen', href: 'https://tiktok.com/@cherrylskitchen' },
    { name: 'Facebook', handle: "Cheryl's Kitchen", href: 'https://facebook.com/cherrylskitchen' },
  ],
};

/** Maps friendly names (`drinks`) to real asset names (`zobo`). */
export function resolvePhoto(name) {
  return photos[name] ?? name;
}

/** Builds a wa.me link with an optional custom message. */
export function whatsappLink(message = site.whatsappMessage) {
  return `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Hero + section imagery, all served from the optimised asset folder. */
export const photos = {
  hero: 'hero-jollof',
  smallChops: 'small-chops',
  suya: 'suya-grill',
  egusi: 'egusi-swallow',
  chicken: 'peppered-chicken',
  drinks: 'zobo',
  catering: 'catering-spread',
  asun: 'asun',
  puffPuff: 'puff-puff',
  kitchen: 'kitchen',
};
