# buildroom

A curated co-founder matching cohort for serious founders from Indian colleges.

> find your co-founder. build something real.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- No backend — the apply form is a client-side modal with a stubbed thank-you state.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the project

## Project structure

```
app/
  layout.tsx        root layout, font, providers
  page.tsx          single-page landing composition
  globals.css       tailwind layers + brand tokens
components/
  Navbar.tsx        sticky navbar with mobile hamburger
  Hero.tsx          hero with pill, headline, CTAs
  Problem.tsx       3 pain-point cards
  HowItWorks.tsx    4 numbered steps
  CohortStats.tsx   4 stat boxes
  Testimonials.tsx  3 founder quotes
  FinalCTA.tsx      closing CTA
  Footer.tsx        compact footer
  ApplyProvider.tsx context provider for apply modal
  ApplyModal.tsx    application form modal
  Logo.tsx          purple dot + "buildroom"
  SectionHeader.tsx shared label + title
```

## Brand tokens

| Token        | Value     |
| ------------ | --------- |
| `brand`      | `#533AB7` |
| `ink`        | `#2C2C2A` |
| `paper`      | `#FAFAF7` |
| background   | `#FFFFFF` |

Defined in `tailwind.config.ts` and `app/globals.css`.

## Notes

- All copy is in sentence case.
- No gradients, no heavy shadows — flat design with 0.5px hairline borders.
- Animations are subtle: hero fades up on load, section headers and cards fade in on scroll, cards lift slightly on hover.
- Fully responsive: navbar collapses to a hamburger on mobile, all grids stack to a single column.

## Where applications go (Supabase)

Submissions are inserted as rows into a Supabase `applications` table. The flow:

```
apply modal  →  POST /api/apply  →  Supabase (applications table)
```

The form posts to the Next.js route handler at `app/api/apply/route.ts`, which validates the fields and inserts a row using the Supabase **service role key**. That key lives server-side only (`lib/supabase.ts`) and is never exposed to the browser.

### One-time setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com).
2. **Create the table.** Dashboard → `SQL Editor` → `New query`, paste the contents of [`supabase/schema.sql`](./supabase/schema.sql), and run it.
3. **Grab your credentials.** Dashboard → `Project Settings` → `API`:
   - Project URL → `SUPABASE_URL`
   - `service_role` key (under Project API keys) → `SUPABASE_SERVICE_ROLE_KEY`
4. **Configure env vars.** Copy `.env.local.example` to `.env.local` and fill in:

   ```bash
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
   ```

5. **Restart `npm run dev`** so the new env vars load. Submit a test application — a new row should appear in `Table Editor → applications`.

> On Vercel (or similar), add the same env vars in the project's environment settings. The `service_role` key is secret — keep it out of client code and version control (`.env.local` is gitignored).

## Login + save/resume drafts (optional)

Logged-in applicants can **save their progress** and finish the application later. Login uses Supabase Auth (email magic link); drafts are stored per-user in an `application_drafts` table protected by row-level security.

### Setup

1. **Add the public client env vars** (browser-safe) to `.env.local`:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...   # the "publishable"/anon key
   ```

2. **Create the drafts table.** Run [`supabase/migrations/0003_application_drafts.sql`](./supabase/migrations/0003_application_drafts.sql) in the SQL editor.
3. **Allow the redirect URL.** Supabase Dashboard → `Authentication` → `URL Configuration`: set the **Site URL** and add your dev/prod origins (e.g. `http://localhost:3000`) to **Redirect URLs**, so the magic link can return to the site.
4. **Restart `npm run dev`** to load the new public env vars.

### How it works

- `lib/supabaseBrowser.ts` is the browser client (uses the publishable key).
- `components/AuthProvider.tsx` tracks the session; `components/AuthModal.tsx` sends the magic link.
- In the apply modal, logged-in users get a **save & finish later** button; reopening the form restores their saved answers and step. Submitting clears the draft.

> Email sending uses Supabase's built-in SMTP, which is rate-limited (a few per hour). For production, configure a custom SMTP provider in Supabase.
