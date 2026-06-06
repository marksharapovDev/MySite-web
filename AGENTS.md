# AGENTS.md

This file provides guidance to Codex when working with this repository.

---

## Commands

- **Dev server**: `npm run dev`
- **Build**: `npm run build` (`tsc -b && vite build`)
- **Lint**: `npm run lint`
- **Preview**: `npm run preview`
- No test framework configured. <!-- UPDATE_ME: обнови, когда добавишь тесты (Vitest / Jest / etc.) -->

---

## Architecture

React 19 + TypeScript SPA built with Vite (SWC). Follows **Feature-Sliced Design (FSD)**:

- `src/app/` — App shell, router, providers
- `src/pages/` — Route pages: `DevPage`, `TutorPage`, `LandingPage`, `NotFoundPage`
- `src/layouts/` — `RootLayout` with `Header` / `Footer`
- `src/features/` — Feature modules: `LanguageToggle`, `SectionNav`, `TutorAccount`
- `src/shared/ui/` — Reusable components: `Button`, `Container`, `Input`, `Logo`
- `src/shared/lib/` — Utilities: `cn.ts`, `scrollToSection.ts`
- `src/shared/styles/` — Design tokens: `_variables.scss`, `_mixins.scss`, `_reset.scss`

**Routing** (`src/app/router.tsx`): React Router v7. Routes: `/`, `/tutor`, `/dev`, `/*` (404).  
The app switches between **tutor** (blue accent) and **dev** (red accent) modes based on pathname — sets `data-mode` on `<html>`.

**Styling**: SCSS Modules for component scoping + CSS custom properties for runtime theme switching.  
Glass-panel aesthetic with backdrop blur via mixins.

**Icons**: `@phosphor-icons/react`

---

## Theming / Design Tokens

CSS custom properties are set globally per `data-mode`. Always use tokens — never hardcode colors or spacing.

Key variables (defined in `_variables.scss`):
- `--accent` — primary accent color (blue in tutor, red in dev)
- `--accent-soft` — muted accent for backgrounds
- `--accent-hover` — hover state for accent elements

> ⚠️ If you add new color or spacing values, add them as CSS variables in `_variables.scss`, not as hardcoded values.

---

## Conventions

- Named exports only; barrel `index.ts` in each component directory
- `PascalCase` for components/files, `camelCase` for utilities
- SCSS Modules: `ComponentName.module.scss`, camelCase class names
- Class concatenation: `.filter(Boolean).join(' ')` or `clsx()`
- Props as `type Props = { ... }`, import types with `import type`
- Functional components only, no default exports
- ESLint flat config with `typescript-eslint`, `react-hooks`, `react-refresh`
- Strict TypeScript (no unused locals/parameters)

---

## Localization (i18n)

The app supports **RU and EN** languages via the `LanguageToggle` feature.

Rules that apply to every component and section:
- All user-visible strings must be localized — including placeholders, error messages, labels, and button text
- Never hardcode text directly in JSX
- When adding new sections or components, always provide both RU and EN variants

---

## Page Structure & Sections

> ⚠️ **When modifying any section, always preserve:**
> - RU/EN support
> - Correct rendering in both modes (dev/tutor)
> - Mobile-first responsiveness
> - Consistent container padding (same as Header — do not collapse side padding on mobile)
> - Design tokens instead of hardcoded values

### /dev page — Developer Mode

Goal: explain who I am as a developer, show proof (projects/stack), drive to contact/hire.

| Section | Key requirements |
|---|---|
| **A) Hero / Intro** | Headline (positioning) + subline (value/format). CTA: "Contact" / "Hire". Optional: 3–5 bullet strengths, social links (GitHub, Telegram) |
| **B) Skills / Stack** | Tech list as chips/badges/cards. Keep it airy — no long paragraphs |
| **C) Projects / Portfolio** | Card grid: name, short description, stack tags, Demo/GitHub links. Equal card heights. Hover uses `--accent` / `--accent-hover` |
| **D) Services** | List of services (site / SPA / integrations / design system). 1–2 lines each, no walls of text |
| **E) Process** | Optional. 3–5 steps: brief → design → dev → test → release. Goal: reduce client anxiety |
| **F) CTA / Contact** | Repeat CTA + alternative contact (Telegram/email). May include a form |

### /tutor page — Tutor Mode

Goal: sell tutoring — show directions, proof (results/reviews), pricing, answer questions (FAQ), drive to application.

| Section | Key requirements |
|---|---|
| **A) Hero / Intro** | Headline: "Подготовка / Репетиторство" + EN. Subline: target audience (OGE/EGE/programming/math), format. CTA: "Записаться / Apply". Optional: 3–5 advantages, metrics (students count, avg improvement) |
| **B) Directions** | Cards per direction: OGE, EGE, Programming, Math. Each: short description, 1–3 included items, CTA. **Do not reduce spacing between cards without explicit request** |
| **C) Platform (in development)** | Short explanation of upcoming platform/methodology. Goal: build trust. Keep it brief — not a longread |
| **D) Student Results** | Grid of "before → after" cases: scores, timeframe, short comment. Key proof block — do not break visual hierarchy. Spacing here was intentionally reduced (unlike Directions) |
| **E) Reviews** | Review cards: name/initials, 2–5 lines, optional source icon. Uniform card height or clean masonry. Text must not overflow on mobile |
| **F) Pricing** | Tiers/packages: format, price, what's included, CTA. Clear readable structure. Use tutor-mode accent tokens |
| **G) FAQ** | Accordion or list: format, duration, homework, rescheduling, payment, results. Good keyboard/focus accessibility. Do not shrink tap targets |
| **H) Lead Form** | Fields: name, contact (Telegram/phone/email), direction, **student situation description (required)**. Minimal non-aggressive validation. Success/error messages must be localized. Do not store sensitive data unnecessarily |

### Shared elements (both modes)

**Header**: mode switcher (RU/EN labels), `LanguageToggle`, optional `SectionNav`. Active/hover states use CSS variables. Do not break contrast or tap targets on mobile.

**Footer**: short — contacts, links, copyright. Do not overload.

**Containers**: single consistent width + side padding. Never collapse side padding on mobile. Never globally increase vertical section spacing without explicit request.

**Section spacing & scroll offsets** (reference: Directions section):
- Desktop: `padding: $space-10 0 $space-8` (64px top, 40px bottom), `scroll-margin-top: 100px` (compensate sticky header)
- Mobile (<768px): `padding-top: $space-5` (20px — same as gap between cards), `scroll-margin-top: 0` (header is at the bottom, no compensation needed)
- Section headings: left-aligned, `$fs-32` desktop / `$fs-24` mobile
- Sections are NOT wrapped in a single glass-panel frame; each card/block gets its own `@include m.glass-panel`

---

## Features

### LanguageToggle
Switches UI language between RU and EN. Translations location: <!-- UPDATE_ME: укажи путь к файлам переводов, когда i18n будет реализован -->

### SectionNav
Anchor-based navigation across page sections. Uses `scrollToSection.ts` utility.

### TutorAccount (planned — in development)
<!-- UPDATE_ME: обнови scope и rules, когда начнёшь реализацию аккаунта -->
Student personal account. MVP scope:
- Login / Register screens
- Student dashboard (progress placeholders, materials, homework)

Rules:
- Route guards only on account pages — rest of the site is public
- Do not over-engineer the backend integration
- Keep it extensible but minimal at MVP stage

---

## State Management & Data

<!-- UPDATE_ME: обнови этот раздел, когда добавишь стейт-менеджер, API или хранилище данных -->
- No global state management — only local `useState` in components (mode tracking in App, menu state in Header)
- No API / backend integration yet
- Lead form is UI-only (`alert('Request sent! (demo)')`) — needs backend connection
- No localStorage, sessionStorage, or cookie usage
- No data fetching libraries (axios, SWR, React Query, etc.)

---

## Environment & Deployment

<!-- UPDATE_ME: обнови, когда появятся новые .env переменные или изменится деплой -->
- No `.env` files or `import.meta.env` / `process.env` usage
- Vite config is minimal (React SWC plugin only)
- GitHub Actions deploy workflow exists at `.github/workflows/deploy.yml`
- Deployment target: VPS at `/var/www/marksharapov`; workflow runs `git pull`, `npm ci`, `npm run build`, then reloads nginx
- Git remote: `git@github.com:marksharapovDev/MySite-web.git`

---

## Roadmap & Known Issues

> 📋 **Keep this section up to date as the project evolves.**

### In progress / Planned
- [ ] TutorAccount MVP — directory exists, no implementation yet
- [ ] Lead form backend integration — UI complete, needs API
- [ ] Student Results section content — empty directory
- [ ] Reviews section content — empty directory
- [ ] Platform section content (tutor page) — empty directory
- [ ] Directions section — file exists but empty (0 lines)
- [ ] FAQ section — empty directory
- [ ] Pricing section — empty directory
- [ ] Dev page sections (about, services, cases, process, contacts) — placeholder text only

### Known issues / Tech debt
- `LanguageToggle` feature is an empty stub — no i18n system implemented
- `Logo` and `MarkNameLogo` components are empty stubs (0 lines)
- Utility files empty: `scrollToSection.ts`, `cn.ts`, `shared/types/index.ts`
- TutorHero has a TODO comment for silhouette image (line 5)
- Lead form shows `alert()` instead of real submission
- All Dev page sections are placeholder scaffolds ("will be filled later")

---

## What NOT to do

- Do not hardcode colors, spacing, or text — always use CSS variables and i18n
- Do not add default exports
- Do not remove or reduce section spacing without an explicit request
- Do not collapse container side padding on mobile
- Do not store sensitive user data without clear necessity
- Do not add global vertical spacing changes across sections without an explicit request
- Do not skip localization for any new user-visible string

## Updating This File

When the user says something like "fix the progress" / "update AGENTS.md" / "save current state",
you must update this file yourself:
- Mark completed items in Roadmap (change `[ ]` to `[x]`)
- Add new known issues or tech debt if discovered during the session
- Update TODO sections if new information was confirmed (state management, env vars, etc.)
- Do NOT rewrite sections the user didn't mention — only targeted updates
