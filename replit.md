# Serrurier Express

A professional French locksmith business website built in React + Vite, targeting homeowners and businesses needing emergency locksmith services.

## Run & Operate

- `pnpm --filter @workspace/serrurier-express run dev` — run the website (port dynamic, via workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite 7 + Tailwind CSS v4 + shadcn/ui
- Icons: lucide-react
- API: Express 5 (api-server artifact)
- DB: PostgreSQL + Drizzle ORM (not yet used by website)
- Build: Vite (static output)

## Where things live

- `artifacts/serrurier-express/` — the website artifact (react-vite, served at `/`)
  - `src/pages/Home.tsx` — full single-page website component (all sections)
  - `src/App.tsx` — root router (wouter)
  - `src/index.css` — Tailwind v4 theme with Serrurier Express brand colors
- `artifacts/mockup-sandbox/src/components/mockups/serrurier-express/SerrurierExpress.tsx` — original canvas mockup
- `artifacts/api-server/` — shared Express API (port 8080, path `/api`)
- `lib/api-spec/openapi.yaml` — OpenAPI source of truth

## Architecture decisions

- Pure frontend, no backend: the website is entirely static — no API calls, no DB reads. Contact form simulates a callback request (client-side state only).
- Single-page layout: all 11 sections live in one scrollable page (`Home.tsx`) — no routing needed beyond the root.
- Brand colors hardcoded as Tailwind arbitrary values: `#1a2744` (navy), `#c9a84c` (gold), `#ED2939` (red), `#002395` (blue) — avoids CSS variable indirection for a site with a fixed palette.
- Sticky navbar + smooth scroll anchors: all nav links use `#section-id` hrefs; the sticky header is 80px tall, handled by `pt-32` on the hero.

## Product

- Sticky nav with phone CTA + French tricolor stripe
- Hero with availability badge, bold headline, and floating technician status card
- Trust bar, services grid (6 cards), certifications band
- Emergency red banner with clickable phone number
- Stats row, customer reviews, service zone chips
- Free-quote callback form (with success confirmation state)
- Full footer with SIRET, certifications, Mentions légales, developer credit

## User preferences

- All content in French
- Dark navy (#1a2744) + gold (#c9a84c) palette with French tricolor accent
- Phone number prominently visible at all times

## Gotchas

- Phone number (`PHONE` constant in `Home.tsx`) must be updated before going live
- Developer credit link (`votre-site.dev`) is a placeholder — update before publishing
- The callback form is UI-only — wire to a real API/email service before production use

## Pointers

- See `.local/skills/react-vite/SKILL.md` for frontend build conventions
- See `.local/skills/pnpm-workspace/SKILL.md` for monorepo structure
