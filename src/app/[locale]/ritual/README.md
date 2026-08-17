# Ritual landing page — Next.js handoff

Drop-in for `active-ie-next` (App Router, `[locale]` segment).

## Install
1. Copy `src/app/[locale]/ritual/` → `src/app/[locale]/ritual/` in your repo.
2. Copy `public/ritual/` → `public/ritual/`.
3. Optional: copy `src/app/api/ritual-waitlist/route.ts` (form endpoint stub). Without it the form still works and falls back to localStorage.
4. Visit `/{locale}/ritual`.

## Notes
- No new dependencies. Fonts load via Google Fonts `@import` in `ritual.css`; if the app already uses `next/font`, swap the import and map the `--font-*` variables in `ritual.css`.
- All styles are scoped under `.ritual` — nothing leaks into the rest of the site.
- Contact emails and the AIE link live in `config.ts` (any `@activeie.org` address can be swapped there).
- Dark mode: follows the visitor's system preference by default; header toggle overrides. Set `data-theme` handling in `RitualLanding.tsx` if you want to wire it to a site-wide theme.
- Waitlist: `RitualLanding.tsx` POSTs to `/api/ritual-waitlist`. The stub route just logs — persist to your store (you already have Sheets sync crons) or point `WAITLIST_ENDPOINT` in `config.ts` at Formspree etc.
- Copy is hardcoded English. If you want it through next-intl, lift the strings into your messages files.
