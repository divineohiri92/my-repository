/**
 * Menu, packages and services.
 * Prices are "starting from" guides in Naira — TODO(client): confirm pricing
 * before launch. Descriptions are written to sound human, not like a catalogue.
 */

export const menuCategories = [
  {
    id: 'small-chops',
    name: 'Small Chops',
    kicker: 'The crowd-opener',
    blurb:
      'Crisp, golden and impossible to stop eating. Boxed per person or served on platters by our team.',
    items: [
      {
        name: 'The Classic Small Chops Box',
        price: '₦4,500',
        unit: 'per person',
        description:
          'Puff puff, samosa, spring rolls, peppered gizzard and a suya skewer. Our most ordered box, every single weekend.',
        tags: ['Bestseller'],
        photo: 'small-chops',
      },
      {
        name: 'Puff Puff Tray',
        price: '₦12,000',
        unit: '50 pieces',
        description:
          'Light, airy and fried to order. Dusted with sugar or served with our chilli dip — say which.',
        tags: ['Vegetarian'],
        photo: 'puff-puff',
      },
      {
        name: 'Suya Skewer Platter',
        price: '₦18,000',
        unit: '20 skewers',
        description:
          'Beef or chicken, coated in our house yaji and grilled over open flame. Sliced onions and pepper on the side.',
        tags: ['Spicy'],
        photo: 'suya',
      },
      {
        name: 'Peppered Gizzard',
        price: '₦15,000',
        unit: 'large bowl',
        description:
          'Slow-simmered gizzard tossed in a thick pepper sauce. The one people ask for by name.',
        tags: ['Spicy', 'Bestseller'],
        photo: 'asun',
      },
    ],
  },
  {
    id: 'rice-mains',
    name: 'Rice & Mains',
    kicker: 'Party jollof, done right',
    blurb:
      'Cooked in firewood pots for that smoke you cannot fake. Delivered hot in foil trays, ready to serve.',
    items: [
      {
        name: 'Smoky Party Jollof',
        price: '₦28,000',
        unit: 'serves 8–10',
        description:
          'Long-grain rice, ripe pepper base and a real firewood finish. Served with fried plantain and coleslaw.',
        tags: ['Bestseller'],
        photo: 'hero-jollof',
      },
      {
        name: 'Jollof & Grilled Chicken Plate',
        price: '₦9,500',
        unit: 'per person',
        description:
          'A full plate: jollof, fried plantain, coleslaw and a peppered chicken thigh. Ideal for office lunches.',
        tags: ['Lunch'],
        photo: 'chicken',
      },
      {
        name: 'Native Fried Rice',
        price: '₦30,000',
        unit: 'serves 8–10',
        description:
          "Our jollof's quieter sibling — curry, liver, sweetcorn and prawns folded through, never dry.",
        tags: [],
        photo: 'catering-spread',
      },
      {
        name: 'Asun & Plantain',
        price: '₦22,000',
        unit: 'large bowl',
        description:
          'Charred goat meat in scotch bonnet, onion and herbs. Order extra plantain. You will want it.',
        tags: ['Spicy'],
        photo: 'asun',
      },
    ],
  },
  {
    id: 'soups',
    name: 'Soups & Swallow',
    kicker: 'Sunday-table energy',
    blurb:
      'Rich, slow-cooked pots with proper meat — not the kind you have to hunt for. Swallow made fresh daily.',
    items: [
      {
        name: 'Egusi & Pounded Yam',
        price: '₦16,000',
        unit: 'serves 4',
        description:
          'Melon-seed soup simmered with assorted meat, stockfish and spinach. Smooth pounded yam on the side.',
        tags: ['Bestseller'],
        photo: 'egusi',
      },
      {
        name: 'Peppered Chicken Pot',
        price: '₦20,000',
        unit: 'serves 4–6',
        description:
          'Grilled chicken brought back into a thick pepper stew with onions and sweet pepper. Pairs with rice, bread or nothing at all.',
        tags: ['Spicy'],
        photo: 'peppered-chicken',
      },
      {
        name: 'Ofada & Ayamase',
        price: '₦18,000',
        unit: 'serves 4',
        description:
          'Unpolished ofada rice with green pepper stew, boiled egg and assorted meat. Wrapped in leaves, as it should be.',
        tags: ['Spicy'],
        photo: 'egusi',
      },
    ],
  },
  {
    id: 'drinks',
    name: 'Drinks & Extras',
    kicker: 'Sip something cold',
    blurb: 'Brewed in-house, bottled the same day. No artificial colours, no shortcuts.',
    items: [
      {
        name: 'Zobo & Chapman Jug',
        price: '₦9,000',
        unit: '1.5 litres',
        description:
          'Deep hibiscus zobo with pineapple and ginger, or a proper Lagos chapman. Both served well chilled.',
        tags: ['Vegetarian'],
        photo: 'drinks',
      },
      {
        name: 'Salad & Coleslaw Bowls',
        price: '₦8,000',
        unit: 'large bowl',
        description:
          'Crisp cabbage, carrot, sweetcorn and cucumber in a light creamy dressing. The cool side of the table.',
        tags: ['Vegetarian'],
        photo: 'catering-spread',
      },
    ],
  },
];

/** Catering packages shown on the Services page. */
export const packages = [
  {
    id: 'essential',
    name: 'The Essential',
    price: '₦6,500',
    unit: 'per guest',
    min: 'Minimum 20 guests',
    summary: 'Small chops, one main rice and a drink — the reliable party starter.',
    includes: [
      'Small chops box per guest',
      'One rice (jollof or fried)',
      'Grilled chicken per guest',
      'Zobo or chapman',
      'Disposable serveware',
    ],
    featured: false,
  },
  {
    id: 'signature',
    name: 'The Signature',
    price: '₦11,500',
    unit: 'per guest',
    min: 'Minimum 30 guests',
    summary: 'Our most-booked package for weddings, birthdays and showers.',
    includes: [
      'Everything in The Essential',
      'Two rice options + swallow & soup',
      'Small chops served live, by our team',
      'Salad and plantain stations',
      'Chafing dishes, serveware & styling',
      'Two staff on site for service',
    ],
    featured: true,
  },
  {
    id: 'grand',
    name: 'The Grand Table',
    price: 'From ₦16,000',
    unit: 'per guest',
    min: 'Minimum 60 guests',
    summary: 'Full-service catering with a styled buffet and a dedicated chef.',
    includes: [
      'Everything in The Signature',
      'Live suya & grill station',
      'Three protein options',
      'Dessert table',
      'Buffet styling, linens & florals',
      'Full service team + on-site chef',
      'Tasting session before your date',
    ],
    featured: false,
  },
];

/** Service cards for the Services page / home. */
export const services = [
  {
    id: 'catering',
    title: 'Event catering',
    summary:
      'Weddings, birthdays, naming ceremonies, bridal showers and office parties — food that arrives hot, on time, and styled properly.',
    photo: 'catering',
    points: ['20–500+ guests', 'Buffet styling included', 'Lagos-wide delivery'],
  },
  {
    id: 'small-chops',
    title: 'Small chops & platters',
    summary:
      'Boxed per person or plattered for the table. The thing guests talk about long after the party.',
    photo: 'small-chops',
    points: ['Same-week orders', 'Vegetarian options', 'Individually sealed'],
  },
  {
    id: 'meal-prep',
    title: 'Weekly meal prep',
    summary:
      'Soup, stew and rice pots for the week, portioned and labelled. For homes that want real food without the daily cooking.',
    photo: 'egusi',
    points: ['Weekly or bi-weekly', 'Portioned & labelled', 'Freezer-friendly'],
  },
  {
    id: 'private-dining',
    title: 'Private dining',
    summary:
      'A chef in your kitchen for intimate dinners — date nights, family lunches, small celebrations.',
    photo: 'chicken',
    points: ['4–20 guests', 'Custom menu', 'Served & cleared'],
  },
];

/** Testimonials — TODO(client): replace with real, permission-given reviews. */
export const testimonials = [
  {
    quote:
      'We ordered for 120 guests and I spent the whole reception eating instead of worrying. Everything was hot, the suya station had a queue, and Cheryl kept sending me photos of the setup before she left.',
    name: 'Adeola A.',
    context: 'Wedding, Ikoyi',
  },
  {
    quote:
      'The small chops boxes were sealed and labelled before we even started setting up. Our MD asked who catered it twice. That never happens.',
    name: 'Tunde B.',
    context: 'Corporate lunch, Victoria Island',
  },
  {
    quote:
      "I order their egusi every other Sunday now. Tastes like my mum's, honestly — and she doesn't need to know I said that.",
    name: 'Ifeoma N.',
    context: 'Weekly meal prep, Lekki',
  },
];

export const faqs = [
  {
    q: 'How much notice do you need?',
    a: 'Small chops and regular menu orders need 24–48 hours. For events with 50+ guests, book at least two weeks ahead so we can plan the menu and tasting properly.',
  },
  {
    q: 'Do you deliver, and where?',
    a: 'Yes — we deliver across Lagos: Lekki, Ajah, Ikoyi, Victoria Island, Ikeja, Yaba, Surulere and Gbagada. Delivery is quoted by distance and added to your invoice.',
  },
  {
    q: 'Can you cater outside Lagos?',
    a: 'For weddings and large events we travel — Ibadan, Abeokuta, Abuja and Port Harcourt are all possible. Add travel and logistics to your quote, and let us know early.',
  },
  {
    q: 'Do you do tastings?',
    a: 'Yes. For weddings and events over 60 guests, we offer a tasting session before your date. It is included in The Grand Table and available as an add-on for other packages.',
  },
  {
    q: 'How do I pay?',
    a: 'A 60% deposit confirms your date, with the balance due 48 hours before delivery. We accept bank transfer, and you get a written invoice and receipt for every order.',
  },
  {
    q: 'What about allergies and dietary needs?',
    a: 'Tell us before ordering. We cook with peanuts in some dishes (suya, some soups) and can prepare vegetarian, no-pepper and low-salt versions with notice.',
  },
];
