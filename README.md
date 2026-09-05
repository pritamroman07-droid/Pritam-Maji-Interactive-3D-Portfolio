# Pritam Maji — Interactive 3D Portfolio

A full-stack personal portfolio built with Next.js, Three.js, and Express — featuring a 3D hero scene, cinematic scroll animations, dark/light modes, and a production-ready REST API.


---

## Tech Stack

**Frontend** — Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis smooth scroll · Three.js / React Three Fiber · Lucide Icons

**Backend** — Express 4 · TypeScript · Zod · JWT Auth · MongoDB (with JSON-file fallback) · CORS · Rate limiting

---

## Features

- Interactive 3D hero with mouse-follow rotation and particle effects
- Smooth scroll with Lenis and GSAP ScrollTrigger parallax
- Dark and light theme with system preference detection
- CGPA count-up animation with IntersectionObserver
- Responsive navigation with mobile menu overlay
- Project showcase with tilt cards and modals
- Achievement gallery with image carousel
- Contact form with validation and API integration
- Visitor counter and admin dashboard
- Loading screen with animated progress
- Custom cursor glow effect
- Full SEO (OG image, sitemap, robots, JSON-LD schema)
- Respects `prefers-reduced-motion`

---

## Getting Started

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

---

## Project Structure

```
PritamDash/
├── frontend/          Next.js 15 portfolio site
│   ├── app/           Routes and pages
│   ├── components/    UI, sections, 3D scene
│   └── lib/           Utilities, data, hooks
└── backend/           Express REST API
    └── src/           Routes, middleware, config
```

---

## Scripts

| Command | Frontend | Backend |
|---------|----------|---------|
| `npm run dev` | Development server | Development server |
| `npm run build` | Production build | TypeScript build |
| `npm run typecheck` | Type checking | Type checking |
| `npm run lint` | ESLint | ESLint |

---

## Deployment

**Frontend** — Deploy to Vercel. Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL` in environment variables.

**Backend** — Deploy to Render or any Node.js host. Set `MONGODB_URI`, `ADMIN_USER`, `ADMIN_PASSWORD`, `JWT_SECRET`, and `CORS_ORIGIN`.

---

## Author

**Pritam Maji** — Computer Science Student & Developer

- GitHub: [pritamroman07-droid](https://github.com/pritamroman07-droid)
- Email: pritamroman07@gmail.com

---

Built with Next.js, Three.js, and Express.
