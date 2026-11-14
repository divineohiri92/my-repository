import { useId, useState } from 'react';
import { site, whatsappLink, telegramLink } from '../data/site';
import { ArrowRight, CheckIcon, WhatsAppIcon, TelegramIcon } from './ui/icons';

/**
 * Contact / enquiry form.
 *
 * The site is a static build, so there is no server to POST to. Rather than
 * silently dropping messages, submitting composes a complete, formatted
 * enquiry and opens WhatsApp (or the visitor's mail app) pre-filled — the
 * business receives it in the channel it actually answers.
 *
 * To wire a real backend later, set VITE_FORM_ENDPOINT (e.g. a Formspree /
 * Netlify Forms URL) and the form will POST there first, then fall back.
 */

const BUDGETS = ['Under ₦50k', '₦50k – ₦150k', '₦150k – ₦400k', '₦400k+', 'Not sure yet'];

const initial = {
  name: '',
  phone: '',
  email: '',
  event: '',
  date: '',
  guests: '',
  budget: '',
  message: '',
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  else if (values.name.trim().length < 2) errors.name = 'That name looks a little short.';

  const digits = values.phone.replace(/[^\d]/g, '');
  if (!values.phone.trim()) errors.phone = 'We need a number to reach you on.';
  else if (digits.length < 10 || digits.length > 15)
    errors.phone = 'Enter a valid phone or WhatsApp number.';

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
    errors.email = 'That email address does not look right.';

  if (!values.event) errors.event = 'What are we cooking for?';
  if (!values.message.trim()) errors.message = 'A sentence or two about your order helps a lot.';
  else if (values.message.trim().length < 10)
    errors.message = 'Could you add a little more detail?';

  return errors;
}

function buildMessage(values) {
  const lines = [
    `*New enquiry — ${site.name} website*`,
    '',
    `*Name:* ${values.name}`,
    `*Phone:* ${values.phone}`,
  ];
  if (values.email) lines.push(`*Email:* ${values.email}`);
  lines.push(`*Occasion:* ${values.event}`);
  if (values.date) lines.push(`*Date:* ${values.date}`);
  if (values.guests) lines.push(`*Guests:* ${values.guests}`);
  if (values.budget) lines.push(`*Budget:* ${values.budget}`);
  lines.push('', '*Details:*', values.message);

  return lines.join('\n');
}

const fieldClasses = (invalid) =>
  [
    'w-full rounded-xl border bg-cream-50 px-4 py-3 text-[0.875rem] text-forest-950 placeholder:text-ink-soft/40 transition-colors duration-200',
    invalid
      ? 'border-pepper-500/60 bg-pepper-500/[0.03]'
      : 'border-forest-900/15 hover:border-forest-900/25',
  ].join(' ');

export default function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => {
      const next = { ...v, [key]: value };
      if (touched[key]) setErrors(validate(next));
      return next;
    });
  };

  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(Object.keys(initial).reduce((acc, k) => ({ ...acc, [k]: true }), {}));

    if (Object.keys(found).length > 0) {
      const first = document.querySelector('[aria-invalid="true"]');
      first?.focus();
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);
    const text = buildMessage(values);
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, _message: text }),
        });
      } catch {
        /* fall through to WhatsApp so the enquiry is never lost */
      }
    }

    // Hand the completed enquiry to WhatsApp, then show the success state.
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
    setSubmitting(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border-forest-900/10 bg-cream-100 rounded-[1.5rem] border p-8 text-center sm:p-12">
        <span className="bg-forest-900 text-palm-400 mx-auto grid size-14 place-items-center rounded-full">
          <CheckIcon className="size-7" />
        </span>
        <h3 className="font-display text-forest-950 mt-6 text-[1.5rem] leading-tight tracking-[-0.03em]">
          Your order is on its way
        </h3>
        <p className="text-ink-soft mx-auto mt-3 max-w-sm text-[0.875rem] leading-relaxed">
          WhatsApp should have opened with your details already filled in — just hit send. If it did
          not open, tap the button below or call us directly.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <a
            href={whatsappLink(buildMessage(values))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[0.8125rem] font-semibold text-[#062b14]"
          >
            <WhatsAppIcon className="size-4" />
            Open WhatsApp again
          </a>
          <a
            href={site.phone.tel}
            className="border-forest-900/20 text-forest-950 hover:bg-forest-900 hover:text-cream-50 inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-[0.8125rem] font-semibold transition-colors"
          >
            Call {site.phone.display}
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setSent(false);
            setValues(initial);
            setTouched({});
            setErrors({});
          }}
          className="text-ink-soft decoration-forest-900/20 hover:text-forest-950 mt-6 text-[0.75rem] font-medium underline underline-offset-4 transition-colors"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Your name" required error={touched.name && errors.name}>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set('name')}
            onBlur={blur('name')}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? `${uid}-name-err` : undefined}
            placeholder="Amaka Obi"
            className={fieldClasses(touched.name && errors.name)}
          />
        </Field>

        <Field
          id={`${uid}-phone`}
          label="Phone / WhatsApp"
          required
          error={touched.phone && errors.phone}
          hint="We reply on WhatsApp"
        >
          <input
            id={`${uid}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            onBlur={blur('phone')}
            aria-invalid={Boolean(touched.phone && errors.phone)}
            aria-describedby={touched.phone && errors.phone ? `${uid}-phone-err` : undefined}
            placeholder="0803 000 0000"
            className={fieldClasses(touched.phone && errors.phone)}
          />
        </Field>

        <Field id={`${uid}-email`} label="Email" error={touched.email && errors.email} optional>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            onBlur={blur('email')}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? `${uid}-email-err` : undefined}
            placeholder="you@email.com"
            className={fieldClasses(touched.email && errors.email)}
          />
        </Field>

        <Field
          id={`${uid}-event`}
          label="What is the occasion?"
          required
          error={touched.event && errors.event}
        >
          <div className="relative">
            <select
              id={`${uid}-event`}
              value={values.event}
              onChange={set('event')}
              onBlur={blur('event')}
              aria-invalid={Boolean(touched.event && errors.event)}
              aria-describedby={touched.event && errors.event ? `${uid}-event-err` : undefined}
              className={[
                fieldClasses(touched.event && errors.event),
                'appearance-none pr-10',
              ].join(' ')}
            >
              <option value="">Choose one…</option>
              <option>Wedding</option>
              <option>Birthday party</option>
              <option>Naming ceremony</option>
              <option>Corporate / office catering</option>
              <option>Small chops order</option>
              <option>Weekly meal prep</option>
              <option>Private dining</option>
              <option>Something else</option>
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="text-forest-900/50 pointer-events-none absolute top-1/2 right-3.5 size-3.5 -translate-y-1/2"
            >
              <path
                d="m5 8 5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Field>

        <Field id={`${uid}-date`} label="Event date" optional>
          <input
            id={`${uid}-date`}
            type="date"
            value={values.date}
            onChange={set('date')}
            className={fieldClasses(false)}
          />
        </Field>

        <Field id={`${uid}-guests`} label="Number of guests" optional>
          <input
            id={`${uid}-guests`}
            type="number"
            min="1"
            inputMode="numeric"
            value={values.guests}
            onChange={set('guests')}
            placeholder="e.g. 80"
            className={fieldClasses(false)}
          />
        </Field>
      </div>

      <Field id={`${uid}-budget`} label="Rough budget" optional>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setValues((v) => ({ ...v, budget: v.budget === b ? '' : b }))}
              aria-pressed={values.budget === b}
              className={[
                'rounded-full border px-3.5 py-2 text-[0.75rem] font-semibold transition-all duration-200',
                values.budget === b
                  ? 'border-forest-900 bg-forest-900 text-cream-50'
                  : 'border-forest-900/15 text-forest-900/70 hover:border-forest-900/35',
              ].join(' ')}
            >
              {b}
            </button>
          ))}
        </div>
      </Field>

      <Field
        id={`${uid}-message`}
        label="Tell us what you need"
        required
        error={touched.message && errors.message}
        hint={`${values.message.length} characters`}
      >
        <textarea
          id={`${uid}-message`}
          rows={4}
          value={values.message}
          onChange={set('message')}
          onBlur={blur('message')}
          aria-invalid={Boolean(touched.message && errors.message)}
          aria-describedby={touched.message && errors.message ? `${uid}-message-err` : undefined}
          placeholder="e.g. 60-guest 40th birthday on 12 Dec in Lekki — small chops, jollof, grilled chicken and zobo. Delivery by 4pm."
          className={[fieldClasses(touched.message && errors.message), 'resize-y'].join(' ')}
        />
      </Field>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting}
          className="group bg-forest-900 text-cream-50 hover:bg-forest-800 inline-flex h-13 items-center justify-center gap-2.5 rounded-full px-7 text-[0.875rem] font-semibold shadow-[0_14px_30px_-16px_rgba(11,26,18,0.8)] transition-all duration-300 active:scale-[0.99] disabled:opacity-60"
        >
          <WhatsAppIcon className="size-4.5 text-[#25D366]" />
          {submitting ? 'Sending…' : 'Send enquiry'}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p className="text-ink-soft/60 max-w-[16rem] text-[0.6875rem] leading-relaxed">
          Opens WhatsApp with your details filled in — no account needed. We reply within a few
          hours.
        </p>
      </div>
    </form>
  );
}

/** Labelled field wrapper with error + hint slots. */
function Field({ id, label, required, optional, error, hint, children }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-forest-900 text-[0.75rem] font-semibold">
          {label}
          {required && (
            <span className="text-pepper-500 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
          {optional && <span className="text-ink-soft/50 ml-1 font-normal">(optional)</span>}
        </label>
        {hint && !error && <span className="text-ink-soft/40 text-[0.625rem]">{hint}</span>}
      </div>
      {children}
      {error && (
        <p
          id={`${id}-err`}
          role="alert"
          className="text-pepper-500 mt-1.5 text-[0.6875rem] font-medium"
        >
          {error}
        </p>
      )}
    </div>
  );
}
