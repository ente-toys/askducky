# Ask Ducky V1 — Implementation Plan

This is the reviewed and approved execution plan for V1. It incorporates all feedback from the plan review process.

## Summary

Build Ask Ducky as a mobile-first, mostly static Next.js App Router web app centered on a fast two-step loop: idle (pick a question) → result/share. V1 ships as a launchable content-rich build with four priorities: official-brand visual fidelity, a solid content engine, reliable motion-plus-button interaction, and a polished share card that works online and offline after first load.

## Status

| Area | Status | Notes |
|------|--------|-------|
| Content engine | Done | Category-weighted selection, repeat avoidance, layered verdict lookup |
| Content authoring | Done | 200 questions, 156 verdicts, 75 afterburns, all launch targets met |
| 2-state UI | Done | Idle (scrollable list of all 200 shuffled questions) → result (no intermediate question phase) |
| Shake interaction | Done | Threshold 18, 1s debounce, iOS permission button, auto-grant on Android/desktop, works on both idle and result screens |
| Haptics | Done | 3 patterns: question reveal, verdict reveal, share success |
| Share flow | Done | 4-tier fallback chain with DOM-to-image failure handling |
| Share card renderer | Done | Square export, 5 visual variants (warm tints on light theme) |
| Offline support | Done | Service worker + bundled content (basePath-aware) |
| Local persistence | Done | Recent history, motion permission, last result re-share |
| Design tokens | Done | Warm light theme: cream `#f7f5f0`, charcoal `#1c1c1c`, coral `#e8614d` action |
| Mascot assets | Done | 8 mood PNGs deleted, only hero.png retained. DuckyDrip SVGs are primary |
| Ducky Drip | Done | 48 SVG assets from ente-toys/Ducky-drip repo, randomized avatar per result |
| Haptics | Done | Fires on question tap + verdict reveal (double-pulse), patterns scaled 1.55x |
| Background themes | Done | Flat warm cream — no animated blobs or color rotation |
| Question list | Done | All 200 questions shown in scrollable shuffled list (273px max-height), replaces 3-card picker + "More questions" |
| Shake on result | Done | Shake works on both idle and result screens, goes directly to new result |
| Share card export | Done | Footer hidden in web view, shown in export via data-export-mode; lockWrapperHeight minimizes flash; cream background |
| Copy polish | Done | Shortened feedback messages, topbar "AskDucky.app", share title "AskDucky", manifest updated |
| Font loading | Done | Inter via next/font/google |
| State animations | Done | Phase transitions, orb float, verdict pop, card reveal |
| Figma MCP | Done | Authenticated as setal@ente.io, design system and Ducky assets explored |
| GitHub Pages | Done | Auto-deploy on push to main, custom domain `askducky.app` |

## Key decisions made during implementation

### Content engine: category-aware verdicts and afterburns
The original implementation used a single global pool for verdicts and afterburns. This caused dissonant pairings (e.g., a question about album sharing getting a verdict about "settings tweaks"). We restructured to:
- Tag verdicts and afterburns with `categoryIds`
- Engine prefers category-matched content (70% weight)
- Falls back to global pool when category pool is empty or by chance (30%)

### Content tone: grounded questions over forced humor
The original questions were over-written with forced punchlines ("Is it trying to illuminate my soul?"). We rewrote all 200 questions to sound like real things a person would wonder ("A flashlight app is asking for access to my contacts. Should I allow it?").

### Mood-verdict correlation
Mood was originally picked randomly, creating dissonant combinations (e.g., "impressed" face with "Absolutely not" verdict). We added a `moodsByFamily` mapping so mood selection correlates with the verdict family.

### Result screen: share card as hero
The original result screen showed the question/verdict/afterburn as inline text AND rendered the full ShareCard below it. We consolidated to show only the ShareCard as the hero of the result screen, with controls below.

### 5 verdict families including soft_roast
The PRD tone ladder listed 5 families but the initial content only seeded 4. We explicitly authored soft_roast content (20 global + per-category lines) during the content sprint.

### Font loading
The original implementation declared "Avenir Next" and "Inter" in CSS but never loaded either font. We added `next/font/google` for Inter, wired through CSS variables. Display and body both use Inter until the official media kit provides font guidance.

### Service worker strategy
The original SW only pre-cached 3 URLs. We improved to: pre-cached assets serve cache-first, same-origin JS/CSS chunks cache on first fetch with offline fallback, external requests are network-only. All paths are basePath-aware for GitHub Pages.

### Ducky mood illustrations via props/accessories
The Figma file has only one base Ducky expression (happy/content). There are no mood-specific facial expressions. Instead, we mapped moods to different prop/accessory combinations (trophy ducky = smug, cat-grabbing ducky = horrified, camera ducky = side_eye, etc.).

### Static export with basePath for GitHub Pages
Switched from `output: "standalone"` to `output: "export"` for GitHub Pages deployment. All static asset paths in components use `process.env.NEXT_PUBLIC_BASE_PATH` prefix. Note: `next/image` with `unoptimized: true` does NOT prepend basePath in static export — use plain `<img>` tags instead.

### Motion permission auto-detection
The "Enable shake" button was showing on all platforms. Fixed by calling `requestMotionPermission()` on mount — on Android/desktop it resolves immediately to "granted" (no permission API), hiding the button. On iOS the button remains since Safari requires a user gesture.

### UX redesign: 2-state flow with question cards
The original 3-state flow (idle → question → result) added an unnecessary intermediate step. Redesigned to 2 states:
- **Idle**: Shows all 200 questions in a scrollable shuffled list (273px max-height). User taps one to go directly to result, or shakes for a random question → result.
- **Result**: Share card renders outside the main card container (no double bounding box). "Share the advice" + "Ask Ducky again" buttons side-by-side. Shake hint with shimmer below buttons. Shake works here too — goes directly to new result.

### Topbar redesign
Replaced the plain "Ask Ducky" badge with: left side = clickable ducky icon + "AskDucky.app" text (resets to home); right side = "Made with ❤️" (small) + "ente" (large) linking to `ente.com/?utm_source=askducky`.

### Share card restructured
- Removed 1:1 aspect ratio, replaced with `max-height: calc(100svh - 260px)` for viewport fit
- DuckyMood moved from small top-right (92px) to centered (100px) between question and verdict
- Question text gets a frosted background panel to stand out
- Footer text changed from random share footers to fixed "Ducky is judging your privacy choices"
- Verdict and afterburn are center-aligned

### No-scroll viewport fit
Both home and result screens are constrained to the viewport height to prevent page scrolling on mobile. Home card uses `max-height: calc(100svh - 120px)` with internal `overflow-y: auto`; result card uses `max-height: calc(100svh - 260px)`.

### Service worker: network-first and auto-update
The original SW used cache-first for pre-cached assets (including HTML), causing new deploys to be invisible. Fixed by:
- Switching to network-first with cache fallback for offline
- Adding `skipWaiting()` + `clients.claim()` for immediate SW activation
- Bumping cache name on breaking changes to invalidate old caches

### Ducky Drip replaces static mood illustrations
The 8 static DuckyMood PNGs (one per mood) made every result look similar. Replaced with randomized Ducky Drip avatars — layered SVGs (base + cap + shoes + shades + accessories) from the `ente-toys/Ducky-drip` private repo. Each result gets a unique ducky combination from 48 SVG assets (14 caps, 12 shoes, 12 shades, 9 accessories). ~20% chance per category to be empty, guaranteeing at least one item. The `DuckyDrip` component uses absolutely positioned `<img>` tags matching the original Ducky Drip `AvatarPreview.jsx` approach.

### Haptics on question tap (double-pulse)
The existing `hapticForQuestionReveal()` function was defined but never called. Now fires when the user taps a question card, followed immediately by `hapticForVerdictReveal()` inside `goToResult()`, creating a two-beat tactile rhythm. All haptic durations scaled ~1.55x for a more noticeable feel.

### Randomized background color themes
The page background was a static dark green with faint gradients. Added 7 color themes (emerald, aurora, sunset, ocean, neon, golden, cosmic) applied via CSS custom properties on `<html>`. Randomly selected on mount and rotated on each "Ask again". A slow 40s `bgDrift` CSS animation adds ambient movement. The flat `#07110b` base on `html` (no vertical gradient) ensures blobs are equally visible top to bottom.

### Share card footer redesign
Replaced the plain "askducky.app" URL text with a branded footer: ducky hero icon (24px) + "AskDucky.app" in bold (matching topbar style). Added a horizontal divider line between the afterburn text and footer. Removed the redundant "Ask Ducky" header from the share card since the topbar already shows it.

### Custom domain askducky.app with conditional basePath
Switched from `ente-toys.github.io/askducky/` to custom domain `askducky.app`. The basePath in `next.config.ts` is conditional — reads `CUSTOM_DOMAIN` env var (set as a GitHub Actions repo variable). When set, basePath drops to `""` and the app serves from root. The SW auto-detects its base path from `self.location.pathname` so it works in both modes. CNAME file in `public/` ensures GitHub Pages serves the custom domain.

### Favicon: cropped Ducky Drip base
Replaced the generic icon with the Ducky Drip base SVG (`app/icon.svg`). Cropped the viewBox from 713×937 to 580×560 centered on the ducky so it renders clearly at favicon sizes (16-32px).

## What's still needed for launch

1. **Visual QA on share card** — Test PNG export quality across devices, verify card looks good when shared on social/chat
2. **Real-device testing** — Shake threshold tuning on physical iOS and Android devices
3. **Content QA pass** — Human review of all 200 questions and category-specific verdicts for tone consistency
4. **Typography confirmation** — Inter is placeholder. Confirm against official media kit
5. ~~**Custom domain**~~ — Done. CNAME set to `askducky.app`, basePath removed

## Scope cut priority (if needed)

Cut extras before cutting:
1. Result screen polish
2. Share card quality
3. Content quality
4. Offline resilience
