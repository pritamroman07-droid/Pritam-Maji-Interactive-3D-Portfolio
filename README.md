# Pritam.Maji — Interactive 3D Portfolio

Monorepo with **two separate applications**:

```
PritamDash/
├── frontend/   → Next.js 15 portfolio site (Vercel)
└── backend/    → Express REST API          (Render / Railway / any Node host)
```

## 🏗 Architecture

```
Browser
   │  Next.js (frontend/)
   │  ─ three.js 3D hero · cinematic scroll · all sections · SEO
   ▼
REST API (backend/)
   │  Express + TypeScript (port 5001)
   │  ─ /api/contact · /api/messages · /api/auth/login · /api/visitor
   │  ─ /api/stats · /api/github · /api/resume · /api/health
   ▼
MongoDB  (falls back to a local JSON file when MONGODB_URI is empty)
```

---

## 🚀 Frontend — Quick Start

```bash
cd frontend
npm install

cp .env.example .env.local
#   NEXT_PUBLIC_API_URL=http://localhost:5001   ← your backend URL

npm run dev          # http://localhost:3000
npm run build && npm start
```

**Stack**: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis · Three.js · React Three Fiber · Lucide Icons

**Sections**: 3D hero, tech marquee, about + timeline + animated counters, skills (rings + tilt), achievements (modals), education timeline, projects (filter/search), gallery (masonry + lightbox), certificates, testimonials, GitHub graph, contact. Plus loading screen, cursor glow, aurora blobs, theme toggle, scroll progress, custom 404, full SEO (OG image, sitemap, robots, manifest, JSON-LD).

---

## 🚀 Backend — Quick Start

```bash
cd backend
npm install

cp .env.example .env
#   PORT=5001                    # 5000 is taken by macOS AirPlay
#   MONGODB_URI=mongodb://localhost:27017   # or your Atlas URI
#   ADMIN_USER / ADMIN_PASSWORD / JWT_SECRET
#   CORS_ORIGIN=http://localhost:3000

npm run dev          # tsx watch
npm run build && npm start
```

**Stack**: Express 4 · TypeScript · Zod validation · JWT auth · MongoDB driver (with JSON-file fallback) · CORS · rate limiting

### Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/health` | — | health check for host platforms |
| POST | `/api/contact` | — | contact form (Zod-validated, rate-limited 5/min/IP) |
| POST | `/api/auth/login` | — | admin login → returns JWT (12h) |
| GET | `/api/messages` | JWT | list contact messages |
| DELETE | `/api/messages/:id` | JWT | delete a message |
| GET/POST | `/api/visitor` | — | visitor counter |
| GET | `/api/stats` | — | visitors + message count |
| GET | `/api/github?username=` | — | GitHub contribution graph proxy |
| GET | `/api/resume` | — | plain-text resume download |

Backend env vars: `PORT`, `MONGODB_URI`, `ADMIN_USER`, `ADMIN_PASSWORD`, `JWT_SECRET`, `CORS_ORIGIN`, `CONTACT_WEBHOOK_URL` (Discord/Slack/Zapier forwarding), optional `GITHUB_TOKEN` for higher rate limits.

---

## 🔐 Admin Dashboard

1. Set `ADMIN_USER` / `ADMIN_PASSWORD` / `JWT_SECRET` on the **backend**
2. Visit `http://localhost:3000/admin` — a login form appears
3. Inbox: view, delete, + inbound volume chart

---

## 🧊 3D Hero — Use Your Photo

Frontend only. Convert your photo to a `.glb` with [CSM](https://www.csm.ai) / [Meshy](https://www.meshy.ai) / [Luma Genie](https://lumalabs.ai), drop it in `frontend/public/models/`, set `NEXT_PUBLIC_MODEL_URL=/models/your-model.glb` — the scene swaps the abstract core for it. Tuning knobs in `frontend/components/three/hero-scene.tsx`.

---

## ✏️ Edit Content (no code required)

- `frontend/lib/data.ts` — all content: skills, projects, achievements, certificates, education, gallery, testimonials, timeline, stats
- `frontend/lib/site.ts` — name, email, socials, nav
- `backend/src/routes/content.ts` — mirrored data used by the resume generator

---

## ☁️ Deploy

### Frontend → Vercel
```bash
cd frontend && npx vercel
# add env: NEXT_PUBLIC_API_URL (your Render URL), NEXT_PUBLIC_SITE_URL
```

### Backend → Render (recommended)
1. New **Web Service** from this repo → root directory `backend`
2. Build: `npm install && npm run build` · Start: `npm start`
3. Env: `MONGODB_URI` (Atlas), `ADMIN_USER`, `ADMIN_PASSWORD`, `JWT_SECRET`, `CORS_ORIGIN` (your Vercel URL)

--- 

## 🧪 Scripts

| Frontend (cd frontend) | Backend (cd backend) |
|---|---|
| `npm run dev` | `npm run dev` |
| `npm run build` | `npm run build` |
| `npm run typecheck` | `npm run typecheck` |
| `npm run lint` | `npm run lint` |
| `npm run format` | — |

---

**© 2026 Pritam Maji** — Crafted with Next.js, Three.js, Express, and an unreasonable amount of coffee.