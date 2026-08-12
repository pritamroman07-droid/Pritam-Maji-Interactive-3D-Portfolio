# Pritam.Maji — Interactive 3D Portfolio

An award-winning-grade, fully responsive personal portfolio built with a dark luxury
theme, cinematic scroll, real 3D (React Three Fiber) and a production-grade backend.

> "The first 5 seconds should create a strong wow effect." — that's the design brief.

---

## ✨ Feature Highlights

| Area | What's included |
|---|---|
| **3D Hero** | Real-time Three.js scene — glowing torus-knot core, particles, mouse-follow rotation, scroll-driven camera zoom. Swap in your own photo-based `.glb` model in seconds. |
| **Cinematic Scroll** | Lenis smooth scroll + GSAP ScrollTrigger parallax + Framer Motion reveals (fade / slide / blur / mask) everywhere. |
| **Sections** | Hero, Marina-style tech marquee, About + timeline + animated counters, Skills (progress rings + 3D tilt), Achievements (modal), Education (timeline), Projects (filter + search + detail modal), Gallery (masonry + lightbox), Certificates, Testimonials slider, GitHub contribution graph, Contact. |
| **Backend** | Next.js API routes: contact (Zod-validated), messages, visitor counter, GitHub proxy, resume generator. MongoDB when `MONGODB_URI` is set, otherwise a zero-config JSON file store. |
| **Admin** | `/admin` — Basic-auth protected dashboard: message inbox, delete, volume chart, visitor stats, dark UI. |
| **SEO** | Metadata + OpenGraph + Twitter cards, dynamic OG image, `sitemap.xml`, `robots.txt`, Web App Manifest, JSON-LD Person schema. |
| **Extras** | Loading screen, animated cursor glow, aurora blobs, glassmorphism, theme toggle, scroll progress bar, scroll-to-top, live clock, animated quotes, custom 404, visitor counter, reduced-motion support, custom loading + typing animations. |

## 🧱 Tech Stack

**Frontend** — Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis · Three.js · React Three Fiber · Drei · Lucide Icons

**Backend** — Next.js Route Handlers · Express-style REST under `/api` · Zod validation · MongoDB (optional) · JSON file fallback

**Hosting** — Vercel (frontend + API) · MongoDB Atlas · optional Render/Railway split

---

## 🚀 Quick Start

```bash
# 1. Install
npm install

# 2. Configure (optional — app works with zero config)
cp .env.example .env.local
#   set MONGODB_URI / ADMIN_USER / ADMIN_PASSWORD / NEXT_PUBLIC_SITE_URL

# 3. Run
npm run dev          # http://localhost:3000

# 4. Production
npm run build && npm start
```

### Using MongoDB Atlas (recommended for production)

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/portfolio
```
Collections are created automatically (`messages`, `counters`). Without this var the app
persists to `data/db.json` — perfect for local dev and demos.

### Using your photo as the 3D hero model

1. Convert your photo with [CSM](https://www.csm.ai) / [Meshy](https://www.meshy.ai) / [Luma Genie](https://lumalabs.ai) → `.glb`
2. Drop it in `public/models/`
3. Set `NEXT_PUBLIC_MODEL_URL=/models/your-model.glb` in `.env.local`
4. The scene swaps the abstract core for your model automatically. Tune scale/position in
   `components/three/hero-scene.tsx` → `HeroModel`.

### Admin dashboard

1. Set `ADMIN_USER` / `ADMIN_PASSWORD` in `.env.local` (defaults: `pritam` / `admin` — change them!)
2. Visit `http://localhost:3000/admin` — your browser will ask for credentials
3. Contact form submissions appear here with delete + volume chart

### Getting messages forwarded (Discord / Slack / Zapier)

Set `CONTACT_WEBHOOK_URL` — every submission is POSTed there as JSON automatically.

---

## 🔧 Customization (no code needed)

Every piece of content lives in `lib/data.ts` — one file, fully typed:

- `hero` — greeting, roles, descriptions, quotes
- `skills` — name + level + category (rings update automatically)
- `projects` — full CRUD-able dataset (edit JSON, done)
- `achievements`, `certificates`, `education`, `gallery`, `testimonials`, `timeline`, `stats`, `marqueeItems`
- Social links + contact info in `lib/site.ts`

## 🎨 Design System

- Dark luxury theme: `#050505` base, electric blue / purple / cyan accents, glassmorphism, neon borders, glow shadows, animated aurora blobs, noise grain
- Fonts: Space Grotesk-style display stack + system body + mono accents (fully self-hosted, no network font fetch — build-safe offline)
- Theme toggle: dark (default) ⇄ light, persisted in localStorage, no flash
- Accessibility: semantic landmarks, aria labels, focus-visible rings, `prefers-reduced-motion` honored in every animation

---

## 📁 Project Structure

```
app/                    # App Router: pages, API routes, SEO files, admin
  api/contact|visitor|stats|github|resume   # REST endpoints
  admin/                # protected dashboard (Basic auth via middleware)
  resume/page.tsx       # printable resume page
components/
  three/                # R3F hero scene + model placeholder
  sections/             # one component per page section
  ui/                   # primitives: Reveal, TiltCard, ProgressRing, Modal…
  layout/               # Navbar, Footer, LoadingScreen
lib/
  data.ts               # ★ all site content lives here
  site.ts               # name, URLs, socials
  db.ts                 # storage adapter (Mongo ⇄ JSON)
public/
  covers/               # generated SVG cover art
  models/               # drop your .glb here
middleware.ts           # admin Basic auth
```

## 📦 Deploy to Vercel

```bash
npm i -g vercel
vercel          # link project
vercel env add MONGODB_URI          # + ADMIN_USER, ADMIN_PASSWORD, NEXT_PUBLIC_SITE_URL
vercel --prod
```

**Running the admin on Vercel:** file storage is ephemeral on serverless — set
`MONGODB_URI` and messages persist in Atlas permanently.

## 🛠 Scripts

```bash
npm run dev           # dev server
npm run build         # production build
npm run start         # serve built app
npm run typecheck     # tsc --noEmit
npm run lint          # eslint
npm run format        # prettier
```

## 🔐 Security Notes

- `/admin` + `/admin/api/*` protected by HTTP Basic Auth middleware
- Contact form fully validated server-side (Zod): length/format limits, no raw HTML
- No secrets in client bundles — server-only envs used with `NEXT_PUBLIC_` prefix
- API input hardening: JSON parse errors → 400, no stack traces leaked

## 🧠 Roadmap Ideas

- OAuth login for admin (Auth.js / Clerk)
- Email notifications via Resend/Nodemailer
- i18n (EN / BN)
- CMS-driven content (Sanity)

---

**© 2026 Pritam Maji** — Crafted with Next.js, Three.js, and an unreasonable amount of coffee.