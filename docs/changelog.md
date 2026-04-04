# Ask Ducky — Development Changelog

Issues discovered and fixed during implementation.

## Round 1: Implementation review

After the first implementation was complete and running at localhost:3000, a full code review against the PRD and execution plan identified 11 issues. 8 were fixed immediately.

### Fixed

#### 1. No font loading (Critical)
**Problem:** `globals.css` declared `"Avenir Next"` and `"Inter"` as font families but neither was imported. On most Android devices and many desktops, users got generic sans-serif, breaking the typography system.
**Fix:** Added `next/font/google` import for Inter in `app/layout.tsx`. Wired through `--font-inter` CSS variable. Both `--font-display` and `--font-body` now resolve to the loaded Inter font.
**Files:** `app/layout.tsx`, `app/globals.css`

#### 2. Mood disconnected from verdict (Critical)
**Problem:** `contentEngine.ts` picked mood with `pickRandom(duckyMoods)` — completely independent of the verdict family. "Impressed" could pair with "Ducky says absolutely not."
**Fix:** Added `moodsByFamily` mapping in `contentEngine.ts`. Mood is now selected from a family-correlated pool (e.g., hard_no → horrified/disappointed/suspicious, approved → impressed/smug).
**Files:** `lib/contentEngine.ts`

#### 3. Zero animation between states (Critical)
**Problem:** State transitions (idle → question → result) were instant swaps with no visual feedback. The PRD's core promise of "playful and magical on mobile" was absent.
**Fix:** Added CSS keyframe animations: `orbFloat` (idle bob), `fadeSlideUp` (phase entrance), `verdictPop` (scale+blur burst for verdict), `cardReveal` (share card entrance), `fadeIn` (controls). All respect `prefers-reduced-motion`.
**Files:** `components/AskDuckyShell.module.css`, `components/AskDuckyShell.tsx`

#### 4. Result screen showed content twice (Significant)
**Problem:** The result phase rendered question/verdict/afterburn as inline text AND showed the full ShareCard below with the same content. Created redundancy.
**Fix:** Removed the inline result block. The result phase now shows only the ShareCard as the hero view, with controls below.
**Files:** `components/AskDuckyShell.tsx`, `components/AskDuckyShell.module.css`

#### 5. Developer-facing text shown to users (Significant)
**Problem:** Three pieces of developer/feature text were visible to users:
- "Offline-ready after first load" in the topbar (amber)
- "Share card varies subtly by category and mood" hint below the card
- "Mobile-first, share-first, and fully playable with buttons if motion is unavailable" in the idle subtitle
**Fix:** Removed topbar status text, removed share card hint, shortened subtitle to "A judgmental duck for your digital life."
**Files:** `components/AskDuckyShell.tsx`, `components/AskDuckyShell.module.css`

#### 6. ShareCard used hardcoded colors and bad vw scaling (Significant)
**Problem:** `ShareCard.module.css` used raw hex values (`#a9c8b2`, `#07110b`, `#f4fff5`) instead of CSS custom properties. The verdict font size used `6vw` which scales to viewport width, not the card container.
**Fix:** Replaced all hardcoded colors with `var(--text)`, `var(--muted)`, `var(--bg)`, `var(--line)`. Changed verdict font from `clamp(2rem, 6vw, 3rem)` to `clamp(1.6rem, 2.2em, 2.8rem)` so it scales relative to the card.
**Files:** `components/ShareCard.module.css`

#### 7. Unused QuestionCard component (Minor)
**Problem:** `components/QuestionCard.tsx` existed but was never imported. AskDuckyShell rendered the question directly.
**Fix:** Deleted the file.

#### 8. Service worker only pre-cached 3 URLs (Minor)
**Problem:** `sw.js` only pre-cached `/`, `/manifest.webmanifest`, and `/icon.svg`. Next.js JS/CSS bundles weren't pre-cached and relied on fetch-then-cache during first visit.
**Fix:** Rewrote fetch handler: pre-cached assets serve cache-first, same-origin assets (JS/CSS chunks) cache on first fetch with offline fallback, external requests are network-only.
**Files:** `public/sw.js`

### Noted but not fixed (blocked)

#### 9. Placeholder mascot art
OrbHero.tsx is a basic SVG circle with dots for eyes. DuckyMood.tsx renders ASCII faces. Blocked on obtaining official Ente media kit mascot assets.

#### 10. Severity inference is keyword-based
`content.ts` infers question severity from string matching ("passport", "bank", etc.). Could be pre-assigned per question in content data. Low priority — works acceptably.

## Round 2: Content and engine overhaul

User feedback: questions try too hard to be funny and verdicts feel unrelated to the question.

### Fixed

#### 11. Questions rewritten to be grounded (Major)
**Problem:** Questions were over-written comedy bits ("Is it trying to illuminate my soul?", "Is the clone worth the chaos?") instead of real situations.
**Fix:** Rewrote all 200 questions across 10 categories to sound like genuine questions a normal person would ask. Maintained privacy-literate angle without forced humor.
**Files:** `app/data/content.ts`

#### 12. Category-specific verdicts added (Major)
**Problem:** All verdicts were in a single global pool. A question about album sharing could get "You are one settings tweak away from dignity" — no connection to the topic.
**Fix:** Added 2-4 category-tagged verdict lines per family per category (e.g., links_backups hard_no: "Do not leave that share link active forever"). Engine prefers category-matched verdicts (70%) and falls back to global. Total verdicts: 100 → 156.
**Files:** `app/data/content.ts`, `lib/contentEngine.ts`, `lib/types.ts`

#### 13. Category-specific afterburns added (Major)
**Problem:** All afterburns were global. Same disconnect issue as verdicts.
**Fix:** Added 6 category-tagged afterburns per category (e.g., links_backups: "A link that never expires is a door that never closes"). Same 70/30 preference logic. Total afterburns: 61 → 75.
**Files:** `app/data/content.ts`, `lib/contentEngine.ts`, `lib/types.ts`

#### 14. Test bounds updated
**Problem:** Content test expected 80-120 verdicts (old global-only count). Now 156 with category-specific lines.
**Fix:** Updated upper bounds: verdicts ≤ 200, afterburns ≤ 100.
**Files:** `tests/content.test.ts`

## Round 3: Figma integration and deployment

Figma MCP authenticated, design system explored, mascot assets exported, GitHub Pages deployment configured.

### Fixed

#### 15. Accent green corrected from Figma (Significant)
**Problem:** Placeholder accent green `#00BC45` was an approximation. The official Ente primary green from Figma is `#08C225`.
**Fix:** Updated `--accent` and all `rgba(0,188,69,...)` references to use `#08C225` / `rgba(8,194,37,...)` across `globals.css`, `brandTokens.ts`, `ShareCard.module.css`, `layout.tsx`, and `manifest.webmanifest`.
**Files:** `app/globals.css`, `app/data/brandTokens.ts`, `app/layout.tsx`, `components/ShareCard.module.css`, `public/manifest.webmanifest`

#### 16. Placeholder mascot replaced with Figma exports (Major)
**Problem:** OrbHero was an SVG circle with dots. DuckyMood rendered ASCII faces. Both were placeholders.
**Fix:** Exported 9 Ducky illustrations from Figma at 0.25x scale. OrbHero now shows the base happy Ducky. DuckyMood shows mood-appropriate illustrations (trophy=smug, cat-grab=horrified, camera=side_eye, globe=impressed, camera+coffee=disappointed, three duckies=chaotic, camera full=suspicious, hugging=deeply_tired).
**Files:** `components/OrbHero.tsx`, `components/DuckyMood.tsx`, `public/ducky/*.png`

#### 17. GitHub Pages deployment (Major)
**Problem:** No deployment pipeline. App only ran locally.
**Fix:** Switched to `output: "export"` for static site generation. Added GitHub Actions workflow for auto-deploy on push to main. Configured `basePath: "/askducky"` for GitHub Pages subpath. Added `NEXT_PUBLIC_BASE_PATH` env for runtime path resolution.
**Files:** `next.config.ts`, `.github/workflows/deploy.yml`

#### 18. basePath not applied to static assets (Significant)
**Problem:** Plain `<img>` tags and `next/image` with `unoptimized: true` don't prepend basePath in static export. Ducky images, service worker, manifest, and favicon all loaded from wrong paths on GitHub Pages.
**Fix:** Used `process.env.NEXT_PUBLIC_BASE_PATH` prefix for all static asset `src` attributes. Updated service worker and manifest paths to include `/askducky` prefix.
**Files:** `components/OrbHero.tsx`, `components/DuckyMood.tsx`, `components/ServiceWorkerRegister.tsx`, `public/sw.js`, `public/manifest.webmanifest`

#### 19. "Enable shake" button showing on all platforms (Minor)
**Problem:** The motion permission button appeared on Android and desktop where no permission is needed.
**Fix:** Call `requestMotionPermission()` on mount. On non-iOS platforms it resolves immediately to "granted" (no `requestPermission` API), hiding the button. iOS still shows it since Safari requires a user gesture.
**Files:** `components/AskDuckyShell.tsx`

## Round 4: UX redesign

Major UX overhaul to simplify the flow and improve visual hierarchy.

### Fixed

#### 20. 3-state flow had unnecessary intermediate step (Major)
**Problem:** The idle → question → result flow required two interactions before seeing a verdict. The question phase showed the question text + OrbHero + "Reveal verdict" button, adding friction without value.
**Fix:** Removed the question phase entirely. Tapping a question card or shaking goes directly to the result screen. The idle screen now shows 3 randomly selected question cards that users can tap. Added `pickMultipleQuestions()` and `generatePlayResultForQuestion()` to the content engine.
**Files:** `components/AskDuckyShell.tsx`, `lib/contentEngine.ts`

#### 21. Topbar was plain text badge (Significant)
**Problem:** The topbar only showed "Ask Ducky" in a pill badge with no branding or navigation.
**Fix:** Left side: clickable ducky hero image (36px) + "Ask Ducky" text (resets to home). Right side: "Made with 💚" (small) + "ente" (large, green accent) linking to `ente.com/?utm_source=askducky`.
**Files:** `components/AskDuckyShell.tsx`, `components/AskDuckyShell.module.css`

#### 22. Result screen had double bounding box (Significant)
**Problem:** The share card (with its own border/background) was nested inside the main `.card` container (also with border/background), wasting space and creating visual redundancy.
**Fix:** Moved the result phase content outside the `<section>` card container. Share card and buttons now render directly in the shell with no wrapper card.
**Files:** `components/AskDuckyShell.tsx`, `components/AskDuckyShell.module.css`

#### 23. Share card clipped content at 3:4 aspect ratio (Significant)
**Problem:** Changing the share card from 1:1 to 3:4 aspect ratio caused the verdict text to be clipped by `overflow: hidden` when content was long.
**Fix:** Removed fixed aspect ratio. Used `max-height: calc(100svh - 260px)` with flexible grid rows (`minmax(0, 1fr)` for the mood row). DuckyMood shrinks gracefully on smaller screens. Increased padding (28px) and gaps (18px) for more breathing room.
**Files:** `components/ShareCard.module.css`

#### 24. Share card layout restructured (Major)
**Problem:** DuckyMood was small (92px) in the top-right header. Question text had no visual distinction from other content.
**Fix:** DuckyMood moved to centered position (100px) between question and verdict. Question text wrapped in a frosted background panel (`rgba(255,255,255,0.06)` + border). Verdict and afterburn are center-aligned. Footer text changed from random share footers to fixed "Ducky is judging your privacy choices".
**Files:** `components/ShareCard.tsx`, `components/ShareCard.module.css`, `components/DuckyMood.tsx`

#### 25. Home screen question cards too small (Minor)
**Problem:** Question cards had small padding (16px) and font size (1rem), feeling cramped.
**Fix:** Increased padding to 20px 22px, font size to 1.2rem, border radius to `--radius-lg`. "More questions" button uses primary (green) style. "Shake to ask a random question" is center-aligned with animated green/gold shimmer gradient.
**Files:** `components/AskDuckyShell.module.css`

#### 26. Pages scrolled on mobile (Minor)
**Problem:** Both home and result screens could extend beyond the viewport, requiring page scrolling.
**Fix:** Home card uses `max-height: calc(100svh - 120px)` with `overflow-y: auto` for internal scrolling. Result card uses `max-height: calc(100svh - 260px)`. Removed `min-height: 72vh` and mobile media query.
**Files:** `components/AskDuckyShell.module.css`, `components/ShareCard.module.css`

#### 27. Service worker served stale cache after deploy (Significant)
**Problem:** The SW used cache-first for pre-cached assets including the HTML page. New deploys were invisible until users manually cleared site data.
**Fix:** Bumped cache name to `ask-ducky-v2`. Pre-cached assets now use network-first with cache fallback. Added `skipWaiting()` + `clients.claim()` for immediate activation of new service worker versions.
**Files:** `public/sw.js`

## Round 5: Visual variety and haptics

Added randomized Ducky Drip characters, vibrant background themes, haptic feedback on question tap, and share card footer redesign.

### Fixed

#### 28. No haptic feedback on question tap (Significant)
**Problem:** `hapticForQuestionReveal()` existed in `lib/haptics.ts` but was never called. Users got no tactile feedback when tapping a question card — only on shake (via `goToResult`).
**Fix:** Added `hapticForQuestionReveal()` call at the top of `selectQuestion()`. Creates a double-pulse: question tap haptic fires, then verdict reveal haptic fires inside `goToResult()`. Also scaled all haptic durations ~1.55x (e.g., 18ms → 28ms, [16,32,22] → [25,50,34]) for a more noticeable feel.
**Files:** `lib/haptics.ts`, `components/AskDuckyShell.tsx`

#### 29. Same 8 ducky moods made results look repetitive (Major)
**Problem:** The share card always showed one of 8 static DuckyMood PNGs (one per mood). Every result with the same mood looked identical, reducing shareability.
**Fix:** Replaced `DuckyMood` with `DuckyDrip` — randomized Ducky avatars composed from layered SVGs (base + cap + shoes + shades + accessories). 48 SVG assets downloaded from `ente-toys/Ducky-drip` private repo into `public/ducky/drip/`. Each category has ~20% chance of being empty, guaranteeing at least one item. Added `DripConfig` to `PlayResult` type and `randomDripConfig()` to content engine.
**Files:** `components/DuckyDrip.tsx` (new), `lib/duckyDrip.ts` (new), `lib/types.ts`, `lib/contentEngine.ts`, `components/ShareCard.tsx`, `public/ducky/drip/` (48 SVGs)

#### 30. Flat dark background felt lifeless (Significant)
**Problem:** The page background was a static dark green with barely visible faint gradients (0.1-0.18 opacity). Every session looked the same.
**Fix:** Added 7 randomized background color themes (emerald, aurora, sunset, ocean, neon, golden, cosmic) using CSS custom properties (`--blob-1` through `--blob-4`). Themes applied via `document.documentElement.style` on mount and rotated on each "Ask again". Replaced the dark vertical gradient on `html` with flat `#07110b` so blobs are equally visible top to bottom. Added slow 40s `bgDrift` CSS animation for ambient movement. Respects `prefers-reduced-motion`.
**Files:** `app/globals.css`, `components/AskDuckyShell.tsx`

#### 31. Share card footer looked off with plain URL text (Minor)
**Problem:** The "askducky.app" URL in the share card footer used a different type style from the rest of the UI, looking inconsistent.
**Fix:** Replaced with a branded footer matching the topbar style: ducky hero icon (24px circle) + "AskDucky.app" in bold. Added a horizontal divider line between the afterburn text and footer. Tagline "Ducky is judging your privacy choices" moved to smaller muted text on the left.
**Files:** `components/ShareCard.tsx`, `components/ShareCard.module.css`

#### 32. Redundant "Ask Ducky" header in share card (Minor)
**Problem:** The share card had an "Ask Ducky" label at the top, duplicating what the topbar already shows. Wasted vertical space.
**Fix:** Removed the header row from the share card. Updated grid template rows. Increased padding (28px → 32px), gap (18px → 24px), and DuckyDrip size (100px → 180px) to use the freed space for better visual presence.
**Files:** `components/ShareCard.tsx`, `components/ShareCard.module.css`

#### 33. Custom domain askducky.app (Major)
**Problem:** App was served from `ente-toys.github.io/askducky/` requiring a `/askducky` basePath that complicated all asset references.
**Fix:** Added `public/CNAME` for `askducky.app`. Made basePath conditional in `next.config.ts` — checks `CUSTOM_DOMAIN` env var (set as GitHub Actions repo variable). When set, basePath is removed and app serves from root. Service worker auto-detects its base path from `self.location.pathname`. Manifest uses relative paths. Bumped SW cache to `ask-ducky-v3`.
**Files:** `next.config.ts`, `public/CNAME`, `public/sw.js`, `public/manifest.webmanifest`, `.github/workflows/deploy.yml`

#### 34. Favicon was generic SVG, not visible at small sizes (Minor)
**Problem:** `public/icon.svg` was a generic icon. After switching to the Ducky Drip base SVG, the original 713×937 viewBox had too much empty space — the ducky was tiny at favicon sizes.
**Fix:** Moved icon to `app/icon.svg` (Next.js App Router convention). Cropped viewBox to `75 240 580 560` to tightly frame the ducky for clear visibility at 16-32px.
**Files:** `app/icon.svg`

## Round 6: Design overhaul — warm light theme

Major visual redesign to replace the dark "vibe-coded" aesthetic with a warm, intentional light theme inspired by Clay and Lovable design systems. Principles: content-first warmth, borders/shadows over gradients, editorial restraint, Ducky as the visual star.

### Fixed

#### 35. Dead code cleanup (Significant)
**Problem:** Three unused components (`OrbHero.tsx`, `DuckyMood.tsx`, `MotionPermissionGate.tsx`) and 8 unused mood PNGs (~500KB) remained in the codebase after being replaced by DuckyDrip.
**Fix:** Deleted all three components and 8 mood PNGs. Removed the `DuckyMood` type, `moodsByFamily` mapping, `duckyMoods` array, and `mood` field from `PlayResult`. Only `hero.png` retained (used in topbar and share card footer).
**Files:** `components/OrbHero.tsx` (deleted), `components/DuckyMood.tsx` (deleted), `components/MotionPermissionGate.tsx` (deleted), `public/ducky/*.png` (8 deleted), `lib/types.ts`, `lib/contentEngine.ts`, `app/data/content.ts`

#### 36. Dark theme replaced with warm light theme (Major)
**Problem:** The dark theme (#07110b background, animated gradient blobs, glass-morphism surfaces) was the primary contributor to the "vibe-coded" feel. 4-blob animated backgrounds × 7 color themes × 40s drift animation created visual noise.
**Fix:** Complete palette swap to warm cream light theme. Background `#f7f5f0` (warm cream), elevated surfaces `#ffffff` (white), text `#1c1c1c` (charcoal), muted `#6b6966` (warm gray). Removed all blob variables, `bgDrift` animation, `bgThemes` array, and `applyBgTheme()` function. Added `--action: #e8614d` (warm coral) for primary buttons, `--surface: #f0ede6` for question card backgrounds. Updated `color-scheme` to `light`, theme colors in layout.tsx and manifest.webmanifest.
**Files:** `app/globals.css`, `app/layout.tsx`, `public/manifest.webmanifest`, `app/data/brandTokens.ts`, `components/AskDuckyShell.tsx`, `components/AskDuckyShell.module.css`

#### 37. Shadows for elevation instead of borders (Significant)
**Problem:** Borders (`1px solid var(--line)`) on cards and UI elements created a stroked look that felt flat and generic. Question cards were white-on-white with no visible separation.
**Fix:** Replaced borders with soft two-layer shadows on cards (`0 1px 3px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.04)`), question items (`0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)`), and secondary buttons. Question cards use cream surface background (`#f0ede6`) on white card for tonal contrast. Primary button uses Lovable-style inset shadow for tactile depth.
**Files:** `components/AskDuckyShell.module.css`, `components/ShareCard.module.css`

#### 38. Idle screen card container removed (Significant)
**Problem:** The idle screen wrapped all content in a white card container, creating a card-in-card nesting (cream → white card → white question cards) with three nearly identical layers.
**Fix:** Removed the outer `<section className={styles.card}>` wrapper. Idle content now flows directly on the cream background. Question cards with cream surface backgrounds stand out clearly against the page.
**Files:** `components/AskDuckyShell.tsx`, `components/AskDuckyShell.module.css`

#### 39. Hero DuckyDrip added to idle screen (Significant)
**Problem:** The idle/home screen was text-heavy with no visual anchor — just title, subtitle, shake hint, and question cards.
**Fix:** Added a randomized DuckyDrip (150px) to the hero section with gentle float animation. Randomizes on mount and refreshes with "More questions" and "Ask again". Deferred to `useEffect` to avoid SSR hydration mismatch from `Math.random()`.
**Files:** `components/AskDuckyShell.tsx`, `components/AskDuckyShell.module.css`

#### 40. Redundant h1 title removed (Minor)
**Problem:** "Ask Ducky" appeared as both the topbar title and a giant h1 in the hero section, wasting prime screen real estate.
**Fix:** Removed the h1. Promoted the subtitle "A judgmental duck for your digital life" to an h2 at heading size. Hero section is now: DuckyDrip → subtitle heading, centered.
**Files:** `components/AskDuckyShell.tsx`, `components/AskDuckyShell.module.css`

#### 41. Result screen buttons side-by-side (Minor)
**Problem:** "Share this" and "Ask again" buttons stacked vertically, consuming ~100px of vertical space and contributing to iOS clipping.
**Fix:** Changed `.resultControls` to `grid-template-columns: 1fr 1fr` for side-by-side layout. Feedback text spans both columns via `grid-column: 1 / -1`.
**Files:** `components/AskDuckyShell.module.css`

#### 42. Share card visual variants simplified (Minor)
**Problem:** 18 visual variants with near-identical dark gradient backgrounds were barely distinguishable.
**Fix:** Reduced to 5 distinct variants (alert-halo, scan-lines, vault-beam, soft-cloud, film-glow) with warm-tinted backgrounds visible on the light theme. Updated `visualVariantsByCategory` mapping to distribute these across 10 categories.
**Files:** `components/ShareCard.module.css`, `app/data/content.ts`

#### 43. Consistent question card styling across screens (Minor)
**Problem:** Question cards on the home screen and the question wrap in the share card used different backgrounds, borders, radii, and shadow treatments.
**Fix:** Both now use cream surface background (`--surface`), `border-radius: var(--radius-lg)`, no border, and matching soft shadow (`0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)`).
**Files:** `components/AskDuckyShell.module.css`, `components/ShareCard.module.css`

#### 44. Share card "Made with ❤️ ente" branding added (Minor)
**Problem:** The share card had no Ente branding beyond the AskDucky.app footer. When shared, there was no attribution to the parent brand.
**Fix:** Added a centered "Made with ❤️" / "ente" branding row below the existing footer, at ~75% of the topbar branding size.
**Files:** `components/ShareCard.tsx`, `components/ShareCard.module.css`

#### 45. Topbar branding simplified (Minor)
**Problem:** The "ente" text in the topbar used green accent color, and the heart emoji was green. Multiple accent colors made the UI feel busy.
**Fix:** Changed "ente" to charcoal (`var(--text)`) and heart emoji to red ❤️. Reduces color palette to: cream, white, charcoal, muted gray, coral (action), and Ente green (accent only).
**Files:** `components/AskDuckyShell.tsx`, `components/AskDuckyShell.module.css`
