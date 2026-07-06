---
name: nonprofit-site-overhaul
description: Methodology for executing a multi-feature UI overhaul of a small organization's (nonprofit, club, community group) website — decomposing a big wishlist into phases, translating aesthetic references into mechanics, integrating third-party services safely, and shipping accessible, internationalized, conversion-optimized pages. Use when a user asks to "rewrite/redesign my org's website" with a list of features spanning design, integrations, accessibility, i18n, and legal/compliance pages.
---

# Nonprofit Site Overhaul

A wishlist like "new landing page + calendar + store + Instagram + GDPR page +
translations + accessibility" is not one task — it's a dependency graph.
This skill turns that wishlist into an ordered, verifiable build. It was
distilled from a real overhaul (Active Inland Empire, Next.js) where every
principle below earned its place.

## Phase 0 — Map before you plan

Never design against an imagined codebase. Inventory first:

- Framework/router/styling versions; installed-but-unused libraries
  (they change build-vs-buy decisions — here, framer-motion, Embla, and
  next-intl were already installed, converting "rewrite" into "upgrade").
- Every existing integration and HOW it's embedded (official script? iframe?
  raw API? hardcoded credentials in JSX?).
- Load-bearing bugs users described as "design problems." A "narrow site"
  complaint was one CSS rule (`main { max-width: mobile }`); "popups feel
  broken" was `onClose={() => {}}`.
- Config debt: declared-but-missing cron routes, dead rewrites shadowing
  pages, gitignore rules that block committing templates.
- The best existing code — find the internal "gold standard" (here, one
  accessible form) and match its patterns instead of inventing new ones.

Grep legacy embeds before asking users for config: store domains, account
IDs, and widget IDs usually already live in old embed code.

## Translate aesthetic references into mechanics

Users describe feelings ("like rockstargames.com/VI", "like apple.com").
Plans need mechanics. Do the translation explicitly and early:

| Reference | Mechanics |
|---|---|
| Rockstar VI landing | Fixed full-viewport looping video; content sections scroll over it; scroll-driven scrim (vivid hero → dimmed story); midline IntersectionObserver drives reveals + a right-edge dot indicator; huge condensed display type |
| Apple.com mobile menu | Full-screen overlay expanding from the header (clip-path inset, ~480ms, cubic-bezier(0.32,0.72,0,1)); backdrop blur; links stagger in ~50ms apart; hamburger = 3 animated bars morphing to X (never icon-swap); scroll lock + focus trap + `inert` on main |

Do NOT scroll-scrub remote video (`currentTime` writes): mobile Safari snaps
seeks to keyframes and remote files need range fetches. A normally-playing
fixed video with scroll-driven overlays gives the same feel and works
everywhere. Reduced motion = pause on a poster frame (capture one with
ffmpeg if none exists).

## Sort features by integration risk, not visual prominence

Anything needing third-party credentials gates architecture. Surface those
decisions to the human FIRST (they take days; CSS takes minutes):

- **Official API available + user can provision credentials** → best UX
  (Shopify Storefront API, Instagram Graph API). Build with graceful
  fallbacks so the site works before credentials arrive.
- **Official embed only, no API** (SweatPals, GiveButter) → keep the embed;
  improve theming/lazy-loading around it. Inject scripts via effects — a raw
  `<script>` tag in JSX is never executed by React.
- **No API at all** (GoFundMe) → scrape on a cron into a cache table, with a
  strict fallback chain: fresh snapshot → hand-maintained numbers → hide the
  element. Never overwrite good cached data with nulls.
- Long-lived tokens that expire (IG: 60 days) need a refresh cron, and the
  refreshed token must persist somewhere writable (a DB row) — host env vars
  can't be rewritten at runtime; the env var is only the bootstrap seed.
- Verify credentials with a raw curl BEFORE building UI on them, and verify
  guessed URLs (a plausible `givebutter.com/orgname` 404'd — the widget was
  the only real conversion surface).

## Cross-cutting concerns before components

i18n and accessibility touch every component; retrofitting doubles the work.

**i18n order of operations** (locale sub-paths with next-intl or equivalent):
1. Convert string catalogs to per-locale message files + a key-parity CI check.
2. Routing/middleware with default locale unprefixed (`as-needed`) so ALL
   existing URLs keep working; exclude `/api` and any path with a file
   extension from the middleware matcher.
3. Restructure pages under `[locale]/` in one commit; codemod call sites
   (if the old API was `t("dot.path")`, next-intl is a drop-in). NO compat
   shim — two live i18n systems is worse than one big diff.
4. Language switcher must be route-based (`router.replace(pathname, {locale})`)
   and actually PLACED (menus + footer) — orphaned components are common.
5. Machine-translate nothing silently: author new locales with register/tone
   rules (e.g. friendly 你 not 您) and keep proper nouns.
6. Gate: every route × every locale returns 200; unknown locale 404s; POSTs
   to API routes untouched; build stays static (`setRequestLocale`).

**Accessibility primitives before pages**: one Dialog on native `<dialog>`
+ `showModal()` (top layer, focus containment/restore, ESC free), one
focus-trap hook, one scroll-lock hook, `:focus-visible` styles, and a global
`prefers-reduced-motion` kill in CSS. Then components inherit compliance.

## Server-shell pattern for data-driven pages

Client pages can't fetch server-side. Convert once, reuse everywhere:
`page.tsx` = tiny async server component (params → locale, parallel data
fetches with `Promise.all`, each fetch cached with `revalidate` + tags) →
renders `content.tsx` (client) with data as props. The same shell later
serves metadata (`generateMetadata`) and any new data source.

## Conversion funnel for donation/participation pages

Structure each project/campaign as Discovery → Connection → Conversion:
- **Discovery**: hook headline (specific, warm), hero visual.
- **Connection**: story with SPECIFICS — real dollar amounts, dates, named
  people, progress bar with live numbers ("$3,392 of $16,000" beats
  "support us"), plus zero-cost participation (comment form, share).
- **Conversion**: ONE primary ask per surface. Match ask to warmth: cold
  pages (landing/blog) lead with story + share/follow micro-CTAs; warm pages
  (/projects, /support) lead with donate. Every CTA must land on a working
  destination — test each URL.
- Third-party donation embeds go behind click-to-load facades (button →
  mount embed) so their JS never taxes initial load.

## GDPR/consent checklist

- Behavioral analytics (session replay class) load ONLY after consent; the
  consent script component owns the `<Script>` tag. Cookieless aggregate
  analytics may stay ungated.
- Consent banner: non-modal `role="region"`, last in DOM, keyboard operable,
  Accept/Decline + policy link, 1-year cookie, "manage cookies" reopener in
  the footer.
- Data-policy page in EVERY locale: what's collected (each tool named), why
  (for a nonprofit: "participation data is how we fund the next event" is
  both true and persuasive), retention windows, GDPR/CCPA rights, cookie
  table, contact. Confirm retention windows with the org.

## Wide-display strategy

Delete global width caps; width control lives in a per-section `Container`
(prose 65ch / content 80rem / wide 96rem / bleed). Fluid type via `clamp()`
tokens, not breakpoint cliffs. Media bleeds edge-to-edge; text never
exceeds ~75ch.

## Sharp-edge catalog (bugs that WILL bite)

- A transformed ancestor becomes the containing block for `position: fixed`
  descendants — never put a fullscreen overlay inside an element that
  animates `transform` (hide/show headers!). Keep the outer element
  transform-free; animate an inner bar; manage `pointer-events`.
- React child effects run BEFORE parent effects: a context provider creating
  an observer in its own effect misses every child registration. Create
  observers lazily at first `register()` call.
- Hydration mismatches: no `useId` for singleton ids (tree-position drift);
  no window-derived initial state (compute in an effect after mount).
- A ResizeObserver observing an element whose size it sets = feedback loop;
  add a dead-band (ignore <8px deltas) + debounce.
- `npm run build` and a running dev server share `.next` — stop dev before
  production builds.
- Shopify Storefront modern API: `price`/`compareAtPrice` are MoneyV2 objects
  requiring subselections; old scalar queries fail silently into fallbacks.
- zsh does not word-split unquoted variables — pipe lists through
  `while read` in shell loops.

## Verification matrix (run per phase, fully at the end)

- Build green + all pages static/ISR; tests green; translation key parity.
- Routes × locales matrix (200s, translated content, `lang` attribute).
- Consent: analytics absent pre-accept, present + cookie post-accept.
- Keyboard: menu (open/Escape/focus), dialog (aria-modal, labelled, focus
  in/restore, scroll lock), carousel buttons, section indicator.
- DOM audit: unnamed buttons/links, missing alt, heading hierarchy (one h1),
  horizontal overflow at 375/768/1280/1920 (measure `scrollWidth` vs
  `innerWidth` — screenshots of emulated viewports can lie).
- External URLs in CTAs actually resolve.

## Working style

- Phase the work so EVERY phase leaves the site shippable; commit per phase
  with verification evidence in the message.
- Foundation fixes (CSS bugs, fonts, tokens) first — they make everything
  after look right and often fix standing complaints instantly.
- Delegate parallelizable self-contained work (new-locale authoring,
  research) to subagents while the main thread restructures.
- Keep secrets out of committed files; append to `.env.local` via shell so
  existing secrets never round-trip through the conversation; classify every
  received credential (public-by-design vs server-only) before writing it.
