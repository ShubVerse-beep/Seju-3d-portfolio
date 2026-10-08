<div align="center">

# ✦ Sejal Rai — 3D Portfolio

**An immersive, scroll-driven personal portfolio built with Next.js, GSAP and Tailwind CSS.**

*Cinematic preloader · pinned 3D hero · scroll-scrubbed project rail · glassmorphic UI*

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=black)](https://gsap.com)
[![pnpm](https://img.shields.io/badge/pnpm-12-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Feature & Motion Inventory](#-feature--motion-inventory)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Customising Content](#-customising-content)
- [Design System](#-design-system)
- [Accessibility & Performance](#-accessibility--performance)
- [Configuration Notes](#-configuration-notes)
- [Scripts](#-scripts)
- [License](#-license)

---

## 🌌 Overview

A single-page, dark-mode portfolio site that treats scrolling as a timeline. Every section is choreographed
with GSAP ScrollTrigger on top of a Lenis smooth-scroll engine, wrapped in a glassmorphic / aurora design
language with a fine film-grain overlay.

**Sections, in order:** Preloader → Hero (pinned 3D card) → About → Skills marquee → Expertise →
Projects (horizontal scroll) → Journey (experience + certifications) → Contact → Footer.

---

## 🧰 Tech Stack

| Layer | Technology | Why it's here |
|:------|:-----------|:--------------|
| Framework | **Next.js 16.4** (App Router, Turbopack) | RSC-enabled app router, fast dev server, `next/image` & metadata API |
| UI library | **React 19.2** | Server components, `use`, stable concurrent rendering |
| Language | **TypeScript 5.7** (strict) | Type-safe content models & component props |
| Styling | **Tailwind CSS 4.3** + `@tailwindcss/postcss` | Utility-first styling via CSS-first `@theme` config (no `tailwind.config.js`) |
| Animations | **GSAP 3.15** + **ScrollTrigger** + **@gsap/react** (`useGSAP`) | Pinned sections, scrubbed timelines, batched reveals, `matchMedia` responsive logic |
| Smooth scroll | **Lenis 1.3** | Inertial scrolling, synced to `gsap.ticker` + `ScrollTrigger.update` |
| Component kit | **shadcn/ui** (`base-nova` style) + **Base UI** (`@base-ui/react`) | Headless primitives, `cva` variants, lucide icons |
| Utilities | **clsx**, **tailwind-merge**, **class-variance-authority** | The `cn()` classname helper pattern (`lib/utils.ts`) |
| Icons | **lucide-react** | Tree-shaken inline SVG icons |
| Animations (CSS) | **tw-animate-css** | Tailwind-native keyframes/transition utilities |
| Analytics | **@vercel/analytics** | Injected automatically in production builds |
| Fonts | **Space Grotesk** + **JetBrains Mono** (`next/font/google`) | Display/body sans + monospace accent, self-hosted with zero layout shift |
| Package manager | **pnpm 12** | Strict, content-addressable installs |

---

## 🎬 Feature & Motion Inventory

### 1 · Boot / Preloader — `components/portfolio/experience.tsx`
- Fake-but-honest progress counter (min duration **1800 ms**, capped at 90 % until profile photo + webfonts finish preloading).
- Locks `overflow` and scroll while loading, then exits with a staggered item lift + full-screen `expo.inOut` wipe.
- Fires a custom `portfolio:ready` window event so the hero intro only plays **after** the loader leaves.
- Bootstraps **Lenis** (`lerp: 0.09`) and hooks it to the GSAP ticker; hijacks all in-page anchor clicks for smooth `lenis.scrollTo`.

### 2 · Hero — `components/portfolio/hero.tsx`
- **Pinned + scroll-scrubbed** timeline (`end: +=220%` desktop / `+=140%` mobile) driving:
  - a double-sided **3D photo card** that rotates 360° on `rotateY` (front portrait / back initials monogram),
  - a counter-rotating **skill orbit ring** (`-540°`) of 10 tech pills placed on a CSS 3D circle,
  - headline scale-up, a progress bar, and a fade-out of the bottom bar.
- **Pointer parallax rig** — `gsap.quickTo` maps mouse position to `rotateX/rotateY` (fine pointers only).
- Intro timeline (card scale/rotate-in → headline → ring → staggered CTA fades), gated on the ready event.
- Giant rotating **role switcher** (`App Developer → XR Creator → Web Designer`) with outlined second words.

### 3 · Global scroll reveals — `components/portfolio/reveal-init.tsx`
- `ScrollTrigger.batch` collects every `[data-reveal]` element and animates them in staggered groups at `top 88%`, `once: true`.

### 4 · Sections
| Section | Component | Motion |
|:--------|:----------|:-------|
| About | `about.tsx` | Scroll-scrubbed 3D tilt of the portrait card (`rotateZ -8° → -2°`, `rotateY 22° → 0°`) + stat cards |
| Skills | `tech-marquee.tsx` | Two **opposite-direction infinite marquees** (40 s), masked edges, pause on hover |
| Expertise | `expertise.tsx` | Glass cards with hover lift, accent glow and ghost index numbers over blurred violet orbs |
| Projects | `projects.tsx` | **Horizontal scroll-jacked rail**: pinned section translates the track, cards get per-frame `rotateY`, scale and opacity emphasis based on distance from viewport centre (desktop); native snap-scroll on mobile |
| Journey | `journey.tsx` | Vertical timeline with accent nodes + certification cards |
| Contact | `contact.tsx` | **Live JSON `payload_preview.json`** panel that mirrors the form state as you type; submit opens a pre-filled `mailto:` draft |
| Footer | `footer.tsx` | Mono meta grid + 19vw gradient outline wordmark |

### 5 · Chrome
- `nav.tsx` — floating glass pill header with mobile disclosure menu (`aria-expanded` / `aria-controls`).
- `section-tag.tsx` — reusable `// mono-label` eyebrow and `Chip` pill.
- `reveal-init.tsx` — one-line global reveal wiring.

---

## 🗂 Project Structure

```
├─ app/
│  ├─ layout.tsx          # Root layout: fonts, metadata/OG, Vercel Analytics
│  ├─ page.tsx            # Composition of all sections + skip-link
│  └─ globals.css         # Tailwind @theme, CSS variables, glass/aurora/grain utilities
├─ components/
│  ├─ portfolio/          # Every section (client components)
│  │  ├─ experience.tsx   # Preloader + Lenis bootstrap
│  │  ├─ hero.tsx         # Pinned 3D hero
│  │  ├─ about.tsx / expertise.tsx / projects.tsx / journey.tsx / contact.tsx
│  │  ├─ nav.tsx / footer.tsx / tech-marquee.tsx
│  │  ├─ role-switcher.tsx / section-tag.tsx / reveal-init.tsx
│  └─ ui/
│     └─ button.tsx       # shadcn/base-ui primitive
├─ lib/
│  ├─ content.ts          # ★ All editable copy: profile, skills, projects, experience
│  ├─ gsap.ts             # GSAP + ScrollTrigger + useGSAP registration, READY_EVENT, reduced-motion helper
│  └─ utils.ts            # cn() classname merger
├─ public/                # Icons, placeholders, profile photo (images/sejal.jpg)
├─ app/globals.css        # Design tokens & keyframes
├─ next.config.mjs        # TS error tolerance, unoptimized images
├─ components.json        # shadcn/ui configuration (style: base-nova)
├─ postcss.config.mjs     # @tailwindcss/postcss plugin
└─ tsconfig.json          # Strict mode, "@//*" path alias
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js 20+ and [pnpm](https://pnpm.io) (`corepack enable pnpm`).

```bash
# 1 · Clone / enter the project
cd 3-d-portfolio-website-build

# 2 · Install dependencies
pnpm install

# 3 · Start the dev server (Turbopack)
pnpm dev
```

Open **http://localhost:3000** in your browser.

```bash
pnpm build   # production build → .next/
pnpm start   # serve the production build
```

---

## ✍️ Customising Content

Everything you'll want to edit lives in **one file**: [`lib/content.ts`](lib/content.ts)

| Export | Controls |
|:-------|:---------|
| `profile` | Name, initials, roles, tagline, bio, email, phone, LinkedIn, region, photo path |
| `stats` | The three counters in the About section |
| `skillsRowA` / `skillsRowB` | The two marquee rows **and** the hero orbit ring (first 6 + first 4) |
| `expertise` | The four "roots" cards |
| `projects` | Project cards — paste URLs into `liveUrl` / `repoUrl` (leave `""` to render "Link coming soon") |
| `experience` / `certifications` | Journey timeline & certificate list |
| `navLinks` | Header navigation |

Swap your photo at `public/images/sejal.jpg`, then update the OpenGraph image path in
`app/layout.tsx` if you rename it.

---

## 🎨 Design System

Defined in `app/globals.css` as CSS variables + Tailwind `@theme` tokens.

| Token | Value | Role |
|:------|:------|:-----|
| `--background` | `#07060b` | Deep-space base |
| `--foreground` | `#f2f0f7` | Primary text |
| `--accent` / `--ring` | `#a78bfa` (violet) | Highlights, focus rings, progress |
| `--status` | `#34d399` (emerald) | "Online" / open-to-work pulse dot |
| `--muted-foreground` | `#a6a1b8` | Secondary copy |
| `--radius` | `1rem` | Rounded scale (`sm → 3xl`) |

**Signature utilities**

| Class | Effect |
|:------|:-------|
| `.glass` | `rgba(255,255,255,.04)` fill + 14 px backdrop blur + hairline border |
| `.bg-aurora` | Three layered violet radial gradients over near-black |
| `.grain::after` | SVG `feTurbulence` film-grain at 6 % opacity |
| `.text-outline` | `-webkit-text-stroke` transparent-fill display type |
| `.preserve-3d` / `.backface-hidden` | CSS 3D context for the hero card & orbit |
| `.marquee-left/right` | 40 s linear loops, paused on `.marquee:hover` |
| `.pulse-dot` | Emerald expanding ring (live status) |

Typography: **Space Grotesk** for everything human, **JetBrains Mono** for eyebrows, labels, code-ish
microcopy (`// booting profile`, `payload_preview.json`) and tabular numerals.

---

## ♿ Accessibility & Performance

- **Skip-to-content link**, semantic `<section>` landmarks, `aria-labelledby` on every section, `aria-hidden` on decorative layers.
- Loader is `role="status" aria-live="polite"`; contact status uses `aria-live`; nav toggle exposes `aria-expanded`.
- **`prefers-reduced-motion` respected everywhere** — `prefersReducedMotion()` in `lib/gsap.ts` short-circuits the loader animation, all ScrollTrigger timelines, marquees, pulse dots and the role switcher.
- Responsive motion via `gsap.matchMedia` (separate desktop/mobile hero pin lengths, projects rail disabled below 768 px in favour of native snap scrolling).
- Images are lazy/prioritised appropriately via `next/image`; fonts self-hosted through `next/font` (no CLS).
- Vercel Analytics loads only when `NODE_ENV === "production"`.

---

## ⚙️ Configuration Notes

`next.config.mjs`

```js
typescript: { ignoreBuildErrors: true },  // dev-tolerant; run tsc --noEmit before shipping
images:     { unoptimized: true },        // static-export friendly; remove for image optimisation
```

`components.json` — shadcn/ui configured with **`base-nova`** style, CSS variables enabled, lucide icon library,
aliases mapped to `@/components`, `@/lib`, `@/components/ui`.

---

## 📜 Scripts

| Command | Description |
|:--------|:------------|
| `pnpm dev` | Start Next.js dev server with Turbopack |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Serve the production build |

---

<div align="center">

**Built with Next.js · GSAP · Lenis · Tailwind CSS**

*Edit the story in `lib/content.ts` — the motion is already wired.*

</div>
# Seju-3d-portfolio
