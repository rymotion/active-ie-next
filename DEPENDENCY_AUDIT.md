# Dependency Audit (active-ie-next)

Generated: 2026-01-02

This report lists **direct** `dependencies` and `devDependencies` from `package.json`, what they generally do, whether they appear to be used in this branch (based on searching the repo **excluding** `node_modules/` and `.next/`), and a suggested action.

Notes:
- “Used” means we found **direct code/config references** (imports, config usage, scripts).
- “Implicit” means the framework/tooling uses it even if you don’t import it everywhere (e.g. `next`, `react`).
- “Not found” means **no references found** in repo code/config; it may still be used indirectly, but it’s a strong candidate for cleanup.

---

## Dependencies

| Package | Version | What it does | Evidence in this branch | Status | Recommendation |
|---|---:|---|---|---|---|
| `next` | `^15.3.1` | Next.js framework (routing, server rendering, bundling) | `next.config.ts`; many imports like `next/image`, `next/link`, `next/script`, `next/server`; scripts: `next dev/build/start` | Used (implicit + direct) | Keep |
| `react` | `^19.1.0` | React UI library | Many component files import React APIs; e.g. `src/components/custom-widget/marquee.tsx` | Used (implicit + direct) | Keep |
| `react-dom` | `^19.1.0` | React DOM renderer (web) | Used implicitly by Next/React runtime (no direct import found in repo search) | Used (implicit) | Keep |
| `next-intl` | `^4.5.5` | Internationalization (i18n) for Next.js | `src/providers/intl-provider.tsx` imports `NextIntlClientProvider`; `test/mocks/next-intl.ts` | Used | Keep |
| `@vercel/analytics` | `^1.5.0` | Vercel Analytics client | `import { Analytics } from "@vercel/analytics/react"` in: `src/app/landing/page.tsx`, `src/app/events/page.tsx`, `src/app/projects/page.tsx`, `src/app/special-event/page.tsx`, etc. | Used | Keep |
| `framer-motion` | `^12.10.4` | Animation library for React | Imports in multiple files, e.g. `src/app/special-event/page.tsx`, `src/components/animated/text/animated-text.tsx`, `src/components/logo.tsx` | Used | Keep |
| `react-icons` | `^5.5.0` | Icon library for React | `src/components/navbar.tsx` imports `react-icons/ai` | Used | Keep |
| `react-zoom-pan-pinch` | `^3.7.0` | Zoom/pan wrapper components | `src/components/sw-calendar/transformable-widget.tsx` | Used | Keep |
| `@next/third-parties` | `^15.3.1` | Next.js helper package for third-party scripts/components | No imports found in repo search | Not found | Investigate; likely removable if unused |
| `@supabase/ssr` | `^0.7.0` | Supabase SSR helpers for Next.js | No direct imports found in repo search | Not found | Investigate; likely removable if unused |
| `@supabase/supabase-js` | `^2.81.1` | Supabase client library | No direct imports found in repo search | Not found | Investigate; likely removable if unused |
| `@prisma/client` | `^6.16.2` | Prisma client (generated DB client) | No imports found in repo search | Not found | Investigate; removable unless DB layer exists elsewhere |
| `prisma` | `^6.16.2` | Prisma CLI / schema + generation | No `prisma/schema.prisma` found; no imports found | Not found | Investigate; likely removable if not using Prisma |
| `embla-carousel-react` | `^8.5.2` | Carousel library (Embla) | No imports found in repo search | Not found | Candidate to remove |
| `keen-slider` | `^6.8.6` | Slider/carousel library | No imports found in repo search | Not found | Candidate to remove |
| `react-iframe` | `^1.8.5` | React wrapper for iframes | No imports found in repo search | Not found | Candidate to remove (you use raw `<iframe>` in JSX) |
| `install` | `^0.13.0` | Legacy utility package (often unnecessary; sometimes accidentally added) | No imports found in repo search | Not found | Candidate to remove |

### Supabase/Prisma follow-up

- `src/components/database/supabase-database.jsx` imports `createClient` from `@/lib/supabase/client`, but there is **no matching file** found under `src/lib/supabase/*` in this branch.
  - If you want Supabase support, you likely need to add that missing module (or point the import to the correct path).
  - If you don’t need Supabase/Prisma right now, removing the dependencies is a good cleanup step.

---

## Dev Dependencies

| Package | Version | What it does | Evidence in this branch | Status | Recommendation |
|---|---:|---|---|---|---|
| `typescript` | `^5` | TypeScript compiler/types | `tsconfig.json`; TS files throughout | Used | Keep |
| `tailwindcss` | `^3.4.1` | Utility-first CSS framework | `tailwind.config.ts`; `@tailwind` directives in `src/app/globals.css` | Used | Keep |
| `postcss` | `^8` | CSS processing pipeline | `postcss.config.mjs` | Used (config) | Keep |
| `postcss-import` | `^16.1.1` | PostCSS plugin for `@import` | `postcss.config.mjs` | Used (config) | Keep |
| `autoprefixer` | `^10.4.21` | Adds vendor prefixes to CSS | `postcss.config.mjs` | Used (config) | Keep |
| `eslint` | `^9` | Linting tool | `eslint.config.mjs`; `npm run lint` | Used | Keep |
| `eslint-config-next` | `15.1.6` | Next.js ESLint rules | `eslint.config.mjs` uses `compat.extends("next/core-web-vitals", "next/typescript")` | Used | Keep |
| `@eslint/eslintrc` | `^3` | ESLint config compatibility helper | `eslint.config.mjs` imports `FlatCompat` | Used | Keep |
| `@types/node` | `^20` | Node.js types for TS | Typical TS/Next setup; used implicitly via TS | Used (implicit) | Keep |
| `@types/react` | `^19` | React types for TS | Typical TS/React setup; used implicitly | Used (implicit) | Keep |
| `@types/react-dom` | `^19` | React DOM types for TS | Typical TS/React setup; used implicitly | Used (implicit) | Keep |
| `webpack` | `^5.98.0` | Bundler (Next has its own bundling; webpack may not be necessary w/ Turbopack) | No direct references found | Not found | Investigate; possibly removable unless required by a plugin |
| `svelte` | `^5.20.2` | Svelte framework runtime | No `.svelte` files found; no imports found | Not found | Candidate to remove |
| `svelte-loader` | `^3.2.4` | Webpack loader for Svelte | No `.svelte` files found; no imports found | Not found | Candidate to remove |

---

## Script/tooling mismatches (important)

These commands exist in `package.json`, but the corresponding packages are **not listed** in `dependencies` or `devDependencies`:

- `test`, `test:watch`: uses `mocha`
- `test:coverage`: uses `c8`
- `translations:check`: uses `tsx`

Recommendation:
- If you rely on these scripts, add the missing dev deps:
  - `mocha`, `c8`, `tsx` (and typically also `chai`, plus testing utilities you already import in `test/*`)
- If you don’t run tests/translation scripts, remove the scripts (or keep but expect CI/local failures).

---

## Suggested cleanup shortlist

High-confidence candidates (no usage found in this branch):
- `install`
- `react-iframe`
- `embla-carousel-react`
- `keen-slider`
- `svelte`
- `svelte-loader`

Investigate before removing (may be planned / partially integrated):
- `@next/third-parties`
- `@supabase/ssr`
- `@supabase/supabase-js`
- `@prisma/client`
- `prisma`
- `webpack`

---

## Status

- This report reflects the **current `package.json`** and **repo search evidence** as of the generated date.
- If you want, I can follow up with a second report after we fix `package-lock.json` / reinstall, since some usage may be currently hidden behind missing source modules or broken installs.
