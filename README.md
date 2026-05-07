# Serrurier Express

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Deployed on Replit](https://img.shields.io/badge/Deployed_on-Replit-F26207?logo=replit&logoColor=white)](https://replit.com)
[![Last Updated](https://img.shields.io/badge/Last_Updated-May_2026-brightgreen)](https://github.com)

---

## Screenshot

![Serrurier Express Homepage](./assets/screenshots/homepage.png)

> **Live demo:** [https://your-replit-url.replit.app](https://your-replit-url.replit.app) *(replace with your deployed URL)*

---

## Project Overview

**Serrurier Express** is a professional single-page business website for a French emergency locksmith service. It targets homeowners and businesses in the Île-de-France region who need rapid, trustworthy locksmith interventions — from locked-out emergencies to high-security door installations. The site is built to establish credibility with French customers through transparent pricing (31 services), trust signals specific to the French market (A2P certification, insurance approval, SIRET number), and a prominent 24/7 availability message. All user-facing content is in French, following French legal requirements including `Mentions légales` and a normalized quote (`Devis normalisé`).

---

## Features

### UI/UX Features

- **Sticky navigation bar** — Fixed header with smooth scroll anchor links (`#nos-services`, `#tarifs`, `#zones-dintervention`, `#contact`); collapses to a hamburger menu on mobile
- **French tricolor stripe** — 5 px blue/white/red accent bar rendered below the navbar on every viewport
- **Hero section** — Animated availability badge (`Disponible 24h/24 – 7j/7`), bold H1 headline, two CTA buttons (`Urgence – appeler`, `Devis gratuit`), and a floating technician status card showing ETA and star rating
- **Services grid** — Six responsive cards (3-column on desktop, 1-column on mobile) with hover scale animation on the icon
- **Certifications band** — Opacity-hover reveal of four trust badges (`Label A2P`, `Artisan certifié`, `Agréé assurances`, `Devis normalisé`)
- **Interactive pricing table** — Category filter pills (`Toutes / Ouverture / Réparation / Installation / Urgence`), paginated with a show/hide toggle for the full 31-row list
- **Emergency banner** — Full-width red section with a clickable phone-number pill button
- **Stats row** — Four metric cards (response time, years of experience, total interventions, star rating)
- **Customer reviews** — Three testimonial cards with avatar initials, city, and 5-star rating
- **Service zone chips** — 12 city pills + `+ 42 communes` badge
- **Callback form** — Phone number input with client-side submission confirmation state; auto-scrolls and pre-fills the selected service when a `Réserver` button is clicked in the pricing table
- **Fully responsive** — Mobile-first layout using Tailwind CSS responsive prefixes throughout

### Business Features

- **Pricing transparency** — 31 TTC price ranges across 4 categories (Ouverture, Réparation, Installation, Urgence) with an off-hours surcharge notice
- **Quick-reserve flow** — Each pricing row has a `Réserver` button that pre-populates the contact form with the service name via URL query parameter
- **A2P certification display** — Prominently shown in the trust bar, certifications band, and footer
- **Insurance approval signal** — `Agréé assurances` badge repeated across multiple sections
- **SIRET display** — SIRET number shown in the footer bottom bar as required by French commercial law
- **24/7 availability** — Green animated pulse dot and `Disponible 24h/24 – 7j/7` label visible in the hero and the sticky header
- **Phone CTA always visible** — Gold `Appeler` button pinned in the sticky nav; emergency section with large clickable phone number

### Technical Features

- **Static build** — Vite outputs to `dist/public`; zero server-side rendering, no API calls at runtime
- **pnpm monorepo** — Workspace-level TypeScript configuration with strict checks; separate packages for the website, API server, DB schema, and generated API client
- **Code generation** — OpenAPI → TypeScript client and Zod schemas generated via `orval`
- **Supply-chain protection** — `pnpm-workspace.yaml` enforces a 1,440-minute (24 h) minimum package release age before installation
- **Inter font** — Loaded from Google Fonts with `<link rel="preconnect">` for performance
- **Tailwind CSS v4** — Utility-first CSS with `@theme inline` custom properties for the brand palette; `tw-animate-css` for animation utilities
- **shadcn/ui component library** — 50+ Radix UI primitive components available in `src/components/ui/`
- **Framer Motion** — Available for page transitions and micro-animations
- **TanStack Query** — Client-side data-fetching infrastructure in place for future API integration
- **Wouter** — Lightweight SPA router (only `"/"` and a 404 route are currently active)
- **ESM throughout** — All packages use `"type": "module"`; Node.js 24 target

### Legal & Compliance Features

- **`Mentions légales`** — Link present in the footer bottom bar (required by French LCEN law)
- **SIRET number** — Displayed in footer (`SIRET 123 456 789`) — replace with real number before going live
- **`Devis normalisé`** — Badge displayed and referenced; normalized quote workflow implied by the free-quote CTA
- **Transparent pricing** — All prices are TTC (all taxes included), with a footnote clarifying they are indicative market rates
- **RGPD** — No third-party tracking scripts, no cookies set by the frontend; cookie consent banner can be added before production deployment

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19.1.0 | UI framework |
| [TypeScript](https://www.typescriptlang.org) | ~5.9.2 | Static typing across all packages |
| [Vite](https://vite.dev) | ^7.3.2 | Dev server and production bundler |
| [Tailwind CSS](https://tailwindcss.com) | ^4.1.14 | Utility-first CSS framework |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) | ^4.1.14 | Vite integration for Tailwind CSS v4 |
| [@tailwindcss/typography](https://tailwindcss-typography.vercel.app) | ^0.5.15 | Prose typography utilities |
| [tw-animate-css](https://github.com/joshuawootonn/tw-animate-css) | ^1.4.0 | CSS animation utilities for Tailwind |
| [shadcn/ui](https://ui.shadcn.com) | n/a | Accessible component library (copy-paste into `src/components/ui/`) |
| [Radix UI](https://www.radix-ui.com) | various | Headless primitives powering shadcn/ui |
| [lucide-react](https://lucide.dev) | ^0.545.0 | SVG icon library |
| [react-icons](https://react-icons.github.io/react-icons/) | ^5.4.0 | Additional icon packs |
| [wouter](https://github.com/molefrog/wouter) | ^3.3.5 | Lightweight SPA router |
| [@tanstack/react-query](https://tanstack.com/query) | ^5.90.21 | Async state and data-fetching |
| [react-hook-form](https://react-hook-form.com) | ^7.55.0 | Form state management |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | ^3.10.0 | Zod integration for react-hook-form |
| [zod](https://zod.dev) | ^3.25.76 | Runtime schema validation |
| [framer-motion](https://www.framer.com/motion/) | ^12.23.24 | Animation library |
| [Inter](https://fonts.google.com/specimen/Inter) | n/a | Primary typeface (Google Fonts) |
| [class-variance-authority](https://cva.style) | ^0.7.1 | Variant-based class composition |
| [clsx](https://github.com/lukeed/clsx) | ^2.1.1 | Conditional class name helper |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | ^3.3.1 | Merge conflicting Tailwind classes |
| [sonner](https://sonner.emilkowal.ski) | ^2.0.7 | Toast notifications |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4.6 | Dark/light theme toggling |
| [Express](https://expressjs.com) | ^5 | REST API server (`artifacts/api-server`) |
| [cors](https://github.com/expressjs/cors) | ^2 | CORS middleware for the API |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | ^1.4.7 | Cookie parsing middleware |
| [pino](https://getpino.io) | ^9 | Structured JSON logger |
| [pino-http](https://github.com/pinojs/pino-http) | ^10 | HTTP request logger middleware |
| [Drizzle ORM](https://orm.drizzle.team) | ^0.45.2 | Type-safe ORM (scaffolded, not yet active) |
| [drizzle-zod](https://orm.drizzle.team/docs/zod) | ^0.8.3 | Zod schema generation from Drizzle tables |
| [drizzle-kit](https://orm.drizzle.team/docs/kit-overview) | ^0.31.9 | Schema migration CLI |
| [pg](https://node-postgres.com) | ^8.20.0 | PostgreSQL client |
| [orval](https://orval.dev) | n/a | OpenAPI → TypeScript + Zod code generation |
| [esbuild](https://esbuild.github.io) | ^0.27.3 | API server bundler |
| [pnpm](https://pnpm.io) | 9+ | Package manager with workspace support |
| Node.js | 24 | JavaScript runtime |
| [@replit/vite-plugin-runtime-error-modal](https://github.com/replit/vite-plugins) | ^0.0.6 | Replit dev overlay for runtime errors |
| [@replit/vite-plugin-cartographer](https://github.com/replit/vite-plugins) | ^0.5.1 | Replit file explorer integration |
| [@replit/vite-plugin-dev-banner](https://github.com/replit/vite-plugins) | ^0.1.1 | Replit development banner |

---

## Project Structure

```
.
├── package.json                    # Workspace root — scripts (build, typecheck), MIT license
├── pnpm-workspace.yaml             # pnpm workspace config, package catalog, supply-chain settings
├── pnpm-lock.yaml                  # Lockfile (do not edit manually)
├── tsconfig.base.json              # Shared TypeScript compiler options (ES2022, strict)
├── tsconfig.json                   # Root tsconfig that references all lib packages
├── replit.md                       # Project overview, run commands, architecture notes
│
├── artifacts/
│   ├── serrurier-express/          # ★ Main website package (@workspace/serrurier-express)
│   │   ├── package.json            # Frontend dependencies (React, Vite, shadcn/ui, etc.)
│   │   ├── tsconfig.json           # Frontend TypeScript config
│   │   ├── vite.config.ts          # Vite config — reads PORT & BASE_PATH env vars, Replit plugins
│   │   ├── index.html              # HTML shell — <title>, Inter font preconnect, favicon
│   │   ├── public/                 # Static assets served at root (favicon.svg, etc.)
│   │   └── src/
│   │       ├── main.tsx            # React entry point — mounts <App /> into #root
│   │       ├── App.tsx             # Root component — wouter Router, QueryClientProvider, Toaster
│   │       ├── index.css           # Tailwind v4 @import, @theme inline brand tokens, light/dark vars
│   │       ├── pages/
│   │       │   ├── Home.tsx        # ★ Complete single-page website — all 11 sections + helper components
│   │       │   └── not-found.tsx   # 404 fallback page
│   │       ├── components/
│   │       │   └── ui/             # shadcn/ui component library (50+ components: button, input, toast…)
│   │       ├── hooks/
│   │       │   ├── use-mobile.tsx  # useIsMobile() hook (breakpoint detection)
│   │       │   └── use-toast.ts    # useToast() hook for sonner integration
│   │       └── lib/
│   │           └── utils.ts        # cn() utility — clsx + tailwind-merge
│   │
│   ├── api-server/                 # Express REST API (@workspace/api-server)
│   │   ├── package.json            # Server dependencies (Express 5, pino, cors, Drizzle)
│   │   ├── tsconfig.json           # Server TypeScript config
│   │   ├── build.mjs               # esbuild script — bundles server to dist/index.mjs
│   │   └── src/
│   │       ├── index.ts            # HTTP server entrypoint — binds PORT, starts Express app
│   │       ├── app.ts              # Express app setup — CORS, JSON, pino-http, routes
│   │       ├── routes/
│   │       │   ├── index.ts        # Mounts all sub-routers under /api
│   │       │   └── health.ts       # GET /api/healthz — returns { status: "ok" }
│   │       ├── middlewares/        # Directory for custom Express middlewares (empty scaffold)
│   │       └── lib/
│   │           └── logger.ts       # Pino logger instance
│   │
│   └── mockup-sandbox/             # Design playground (@workspace/mockup-sandbox)
│       ├── package.json            # Same UI stack as the main site
│       ├── vite.config.ts          # Vite config with custom mockup preview plugin
│       ├── mockupPreviewPlugin.ts  # Vite plugin — auto-discovers mockup components
│       └── src/
│           ├── App.tsx             # Sandbox router
│           └── components/
│               ├── mockups/
│               │   └── serrurier-express/  # Original canvas mockup (design reference)
│               └── ui/             # Full copy of shadcn/ui components for sandbox use
│
├── lib/
│   ├── api-spec/                   # OpenAPI source of truth
│   │   ├── openapi.yaml            # API spec — currently defines /healthz only
│   │   ├── orval.config.ts         # Code generation config (generates api-client-react & api-zod)
│   │   └── package.json
│   │
│   ├── api-client-react/           # Generated React Query hooks (@workspace/api-client-react)
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts            # Public exports
│   │       ├── custom-fetch.ts     # Fetch wrapper for generated client
│   │       └── generated/
│   │           ├── api.ts          # Generated TanStack Query hooks
│   │           └── api.schemas.ts  # Generated TypeScript types
│   │
│   ├── api-zod/                    # Generated Zod validation schemas (@workspace/api-zod)
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts
│   │       └── generated/
│   │           ├── api.ts          # Zod parse functions
│   │           └── types/          # Inferred TypeScript types from Zod schemas
│   │
│   └── db/                         # Database layer (@workspace/db)
│       ├── package.json            # Drizzle ORM, drizzle-zod, pg
│       ├── drizzle.config.ts       # Drizzle Kit config (DATABASE_URL)
│       └── src/
│           ├── index.ts            # Drizzle db instance (pg pool)
│           └── schema/
│               └── index.ts        # Table definitions (empty scaffold — no tables yet)
│
├── scripts/                        # Workspace utility scripts
│   ├── package.json
│   ├── post-merge.sh               # Git post-merge hook (e.g. pnpm install reminder)
│   └── src/
│       └── hello.ts                # Example script scaffold
│
└── attached_assets/                # Design briefs and feature request prompts
    ├── Pasted-Design-a-professional-locksmith-business-website-in-Fre_1778062757900.txt
    └── Pasted-Add-a-new-Tarifs-page-and-a-Tarifs-link-in-the-navigati_1778149044626.txt
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 24 — [Download](https://nodejs.org)
- **pnpm** ≥ 9 — Install with `npm install -g pnpm`

### Clone the Repository

```bash
git clone https://github.com/your-username/serrurier-express.git
cd serrurier-express
```

### Install Dependencies

```bash
pnpm install
```

> pnpm will install all workspace packages in one pass. A 24-hour minimum release-age policy is enforced — see `pnpm-workspace.yaml`.

### Set Environment Variables

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

Required variables are described in the [Configuration](#configuration) section below.

### Run the Development Server

**Website only (recommended):**

```bash
pnpm --filter @workspace/serrurier-express run dev
```

**API server (port 8080):**

```bash
pnpm --filter @workspace/api-server run dev
```

**Run the full typecheck across all packages:**

```bash
pnpm run typecheck
```

### Open in Browser

The Vite dev server will print the local URL. Navigate to:

```
http://localhost:<PORT>
```

where `<PORT>` is the value you set in your `.env` file (see [Configuration](#configuration)).

---

## Deployment

### Replit (primary — recommended)

This project is pre-configured for Replit deployment. The Replit Vite plugins (`@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`, `@replit/vite-plugin-runtime-error-modal`) are loaded automatically in development when the `REPL_ID` environment variable is present.

1. Import the repository into [Replit](https://replit.com/new)
2. Set the required environment variables (`PORT`, `BASE_PATH`) in the Replit Secrets panel
3. Run the workspace using the preconfigured workflow or:

   ```bash
   pnpm --filter @workspace/serrurier-express run dev
   ```

4. Click **Deploy** in the Replit toolbar to publish to a permanent `*.replit.app` URL

### Vercel (alternative)

```bash
# Build the static frontend
pnpm --filter @workspace/serrurier-express run build
# Output is in artifacts/serrurier-express/dist/public/
```

In your Vercel project settings:
- **Framework preset:** Vite
- **Root directory:** `artifacts/serrurier-express`
- **Build command:** `pnpm run build`
- **Output directory:** `dist/public`
- **Environment variables:** `PORT`, `BASE_PATH`

### Netlify (alternative)

```bash
# Same build command
pnpm --filter @workspace/serrurier-express run build
```

In `netlify.toml` (add at repo root):

```toml
[build]
  base    = "artifacts/serrurier-express"
  command = "pnpm run build"
  publish = "dist/public"
```

---

## Configuration

Create a `.env` file at the root of the `artifacts/serrurier-express/` directory (or set these as environment variables on your deployment platform):

```dotenv
# .env.example

# -----------------------------------------------
# Required — Vite dev server / production server
# -----------------------------------------------

# Port for the Vite dev server
PORT=5173

# Base URL path for the Vite build (use "/" for root deployments)
BASE_PATH=/

# -----------------------------------------------
# Required — API Server (artifacts/api-server)
# -----------------------------------------------

# Port the Express API server listens on
PORT=8080

# -----------------------------------------------
# Required — Database (lib/db) — not yet used by the website
# -----------------------------------------------

# PostgreSQL connection string
# Format: postgresql://user:password@host:5432/dbname
DATABASE_URL=postgresql://postgres:password@localhost:5432/serrurier_express

# -----------------------------------------------
# Automatically set by Replit — do not define manually
# -----------------------------------------------

# Replit deployment identifier (enables Replit Vite plugins when present)
# REPL_ID=<auto-set by Replit>

# Node environment (set to "production" for deployments)
NODE_ENV=development
```

> **Note:** Before going live, update the `PHONE` constant in [artifacts/serrurier-express/src/pages/Home.tsx](artifacts/serrurier-express/src/pages/Home.tsx) with the real phone number, and replace the SIRET placeholder (`123 456 789`) and the developer credit link (`votre-site.dev`) in the same file.

---

## Pricing Data

The pricing ranges displayed on the `Tarifs` section (`#tarifs`) cover 31 locksmith services across four categories (`Ouverture`, `Réparation`, `Installation`, `Urgence`). These figures are sourced from observed market rates in France for 2025–2026 and are provided for informational purposes only — they are not contractual. All prices are TTC (toutes taxes comprises) and include travel, labor, and cleanup.

> **Reference source:** [https://www.depanneo.com/prix/serrurier/](https://www.depanneo.com/prix/serrurier/)

A personalized, written quote (`devis`) is issued before any work begins, as required by French consumer law.

An off-hours surcharge notice is displayed prominently in the pricing section:

> *`Une majoration tarifaire s'applique en soirée (20h–7h), le week-end et les jours fériés.`*

---

## Legal & Compliance

The site implements the following French legal requirements:

| Requirement | Implementation |
|---|---|
| **Mentions légales (LCEN)** | Link in the footer bottom bar; required for all French commercial websites under the Loi pour la Confiance dans l'Économie Numérique |
| **SIRET display** | Business registration number shown in the footer (`SIRET 123 456 789`) — replace with the real SIRET before publication |
| **`Devis normalisé`** | Badge displayed in the certifications band; normalized quote workflow triggered by the free-quote CTA |
| **A2P certification** | Label displayed in the trust bar, certifications band, and footer — verifiable by insurers and customers |
| **`Agréé assurances`** | Insurance approval badge shown in certifications band and footer |
| **RGPD (GDPR)** | No third-party analytics, no tracking cookies, no fingerprinting. The contact form processes only a phone number client-side (no data is persisted). A cookie consent banner should be added before integrating any analytics or chat tool in production. |
| **`Devis gratuit`** | Prominently communicated; the callback form CTA sets the expectation of a 15-minute callback before any billable work |

---

## SEO

The following SEO baseline is in place:

| Element | Status |
|---|---|
| `<title>` tag | `Serrurier Express` — set in `index.html` |
| Viewport meta tag | `width=device-width, initial-scale=1.0, maximum-scale=1` |
| Language attribute | `lang="en"` on `<html>` — **update to `lang="fr"`** before production |
| Semantic HTML | `<header>`, `<section>`, `<footer>`, `<h1>`–`<h4>` hierarchy |
| Inter font | Loaded via Google Fonts with `<link rel="preconnect">` for reduced TTFB |
| SVG favicon | Served from `public/favicon.svg` |
| Anchor-based navigation | All sections have `id` attributes (`#nos-services`, `#tarifs`, `#zones-dintervention`, `#contact`) for deep-linking |

**Recommended additions before production:**

- Add `<meta name="description">` and Open Graph (`og:title`, `og:description`, `og:image`) tags to `index.html`
- Implement [Schema.org `LocalBusiness`](https://schema.org/Locksmith) structured data (JSON-LD) in the `<head>` — especially `Locksmith` type with `areaServed`, `openingHours`, and `priceRange`
- Generate `sitemap.xml` and `robots.txt` in `public/`
- Change `lang="en"` → `lang="fr"` on the `<html>` element in `index.html`
- Add `hreflang="fr-FR"` for French-market geo-targeting

---

## Contributing

1. **Fork** the repository
2. **Create a branch** following the naming convention:
   - `feature/<short-description>` — new features
   - `fix/<short-description>` — bug fixes
   - `chore/<short-description>` — maintenance, dependency updates, config changes
3. **Make your changes** and ensure all type checks pass:
   ```bash
   pnpm run typecheck
   ```
4. **Commit** using a clear, imperative commit message:
   ```bash
   git commit -m "feat: add cookie consent banner"
   ```
5. **Push** your branch and open a **Pull Request** against `main`

> Please keep PRs focused — one concern per PR. Do not include unrelated refactors or dependency upgrades in a feature PR.

---

## License

MIT License

Copyright (c) 2026 Serrurier Express

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Developed with ❤️ by [Votre Nom](https://votre-site.dev)
