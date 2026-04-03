# Ask Ducky — Development Changelog

Issues discovered and fixed during the initial implementation review.

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
