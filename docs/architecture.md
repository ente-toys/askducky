# Ask Ducky — Architecture

## Overview

Ask Ducky is a single-page, client-only Next.js app with no backend. All content, logic, and assets are bundled into the static build. The app is a 2-state machine driven by question selection, shake gestures, or button taps.

## State machine

```
┌──────────┐  tap question   ┌────────────┐
│   IDLE   │  or shake       │   RESULT   │
│          │ ──────────────► │            │
│ Hero     │                 │ Share card │
│ 3 Qs    │                 │ Share CTA  │
│ Shake    │                 │ Ask again  │
│ hint     │                 │            │
└──────────┘                 └────────────┘
      ▲                            │
      └───── "Ask again" ──────────┘
```

**States:**
- **idle** — Landing screen with headline, 3 tappable question cards, shimmer shake hint, "More questions" button
- **result** — Share card as the hero view (outside card container), share/ask-again controls below

All state transitions fire haptic feedback on supported devices.

## Content engine

```
pickMultipleQuestions(count, history)
  │
  ├── Loop `count` times:
  │     ├── pickWeightedRandom(categories)
  │     ├── filterRecent(categoryQuestions, usedIds)
  │     └── pickRandom(filtered) → accumulate, track used IDs
  └── Return array of unique questions

generatePlayResultForQuestion(question, history)
  │
  ├── pickVerdict(question, recentVerdictIds)
  │     ├── resolveFamily(question)
  │     │     ├── high severity + hard_no pref  → 60% hard_no, 40% random preferred
  │     │     ├── low severity + soft_roast     → 55% soft_roast, 45% random preferred
  │     │     └── otherwise                     → random from preferred families
  │     ├── Filter by family
  │     ├── Prefer category-specific (70%)
  │     ├── Fall back to global pool
  │     └── filterRecent → pickRandom
  │
  ├── pickAfterburn(categoryId)
  │     ├── Prefer category-specific (70%)
  │     ├── Fall back to global pool
  │     └── filterRecent → pickRandom
  │
  ├── Mood selection → pickRandom(moodsByFamily[verdict.family])
  ├── Visual variant, footer, caption selection
  └── DripConfig → randomDripConfig() (cap, shoe, shade, accessory)

generatePlayResult(history)
  │
  └── pickQuestion(history) → generatePlayResultForQuestion(question, history)
```

**Result payload:** `{ question, verdict, afterburn, footer, caption, mood, visualVariant, dripConfig }`

## Content data model

```
Category (10)
  ├── id: CategoryId
  ├── name: string
  └── weight: number

Question (200, 20 per category)
  ├── id: string
  ├── categoryId: CategoryId
  ├── text: string
  ├── severity: "high" | "medium" | "low"  (inferred from keywords)
  ├── tags: string[]
  ├── weight: number
  └── preferredFamilies: VerdictFamily[]   (from category defaults)

VerdictLine (156 = ~10 global + ~2-4 per category per family)
  ├── id: string
  ├── family: VerdictFamily
  ├── text: string
  └── categoryIds?: CategoryId[]           (if set, used for category-matching)

AfterburnLine (75 = 15 global + 6 per category)
  ├── id: string
  ├── text: string
  └── categoryIds?: CategoryId[]

ShareFooter (14), ShareCaptionTemplate (10), DuckyMood (8)
```

## Component tree

```
RootLayout (server)
  └── inter font loaded via next/font/google
      └── HomePage (server)
          └── AskDuckyShell (client)
              ├── ServiceWorkerRegister
              ├── TopBar
              │   ├── Left: clickable ducky + "Ask Ducky" (resets to idle)
              │   └── Right: "Made with 💚 / ente" → ente.com
              └── Phase-switched content:
                  ├── idle (inside <section.card>):
                  │   ├── Hero text (title, subtitle)
                  │   ├── Shake hint (shimmer animation)
                  │   ├── Enable shake link (iOS only)
                  │   ├── 3 × QuestionItem buttons
                  │   └── "More questions" button (primary)
                  └── result (outside card, in shell):
                      ├── ShareCard
                      │   ├── QuestionWrap (frosted background)
                      │   ├── DuckyDrip (centered, 180px, randomized SVG layers)
                      │   ├── Content (verdict, afterburn)
                      │   ├── Divider line
                      │   └── Footer (tagline + ducky icon + "AskDucky.app")
                      ├── "Share this" button (primary)
                      └── "Ask again" button (secondary)
```

## Library interfaces

Each browser-dependent concern is isolated behind a small interface in `lib/`:

| Module | Purpose | Browser API |
|--------|---------|-------------|
| `shake.ts` | Shake detection + iOS permission | DeviceMotionEvent |
| `haptics.ts` | Vibration patterns (question tap, verdict, share) | navigator.vibrate |
| `share.ts` | 4-tier share fallback chain | navigator.share, navigator.clipboard |
| `exportImage.ts` | DOM → PNG export + download | html-to-image, URL.createObjectURL |
| `storage.ts` | History persistence | localStorage |
| `contentEngine.ts` | Question picking, result generation | — |
| `duckyDrip.ts` | Random Ducky Drip avatar config | — |

## Share flow

```
handleShare()
  │
  ├── exportShareBlob()               # html-to-image → PNG blob
  │   └── on failure → imageFallbackMode = true
  │
  ├── sharePayload(file, text, url)
  │   ├── 1. navigator.share({ files })     → "native-file"
  │   ├── 2. navigator.share({ text, url }) → "native-text"
  │   ├── 3. downloadFallback() + copyText  → "download-copy-caption"
  │   │       └── on image fail → plain text .txt download
  │   └── 4. copyText(url)                  → "copy-link"
  │
  └── hapticForShareSuccess() if method ≠ "none"
```

## Offline strategy

- **Content:** Bundled in the JS bundle. No runtime API calls.
- **Service worker:** `public/sw.js`
  - Cache name: `ask-ducky-v3` (bumped on breaking changes to invalidate old caches)
  - `skipWaiting()` + `clients.claim()` for immediate activation on update
  - Auto-detects its base path from `self.location.pathname` (works with or without basePath)
  - Pre-cached assets (`/`, manifest, icon): **network-first**, cache fallback for offline
  - Same-origin JS/CSS chunks: fetch-then-cache with offline fallback
  - External requests: network only
- **PWA manifest:** Standalone display, dark theme, Ente green accent

## CSS architecture

- **Global tokens:** `app/globals.css` — CSS custom properties for all colors, fonts, spacing, radii, shadows
- **Component styles:** CSS Modules (`.module.css`) scoped to each component
- **Font loading:** Inter loaded via `next/font/google`, injected as `--font-inter` CSS variable
- **Reduced motion:** Global `prefers-reduced-motion` media query disables all animations
- **Share card variants:** 20 category-specific CSS classes with unique gradient/texture backgrounds
- **Shimmer animation:** Green/gold gradient sweep on the shake hint text
- **Viewport fit:** Both screens use `max-height` with `svh` units to prevent page scrolling
- **Randomized backgrounds:** 7 color themes (emerald, aurora, sunset, ocean, neon, golden, cosmic) applied via CSS custom properties (`--blob-1` through `--blob-4`). Randomized on mount and on each "Ask again". Slow 40s `bgDrift` animation for ambient motion.

## Design tokens (current placeholders)

| Token | Value | Source |
|-------|-------|--------|
| `--bg` | `#07110b` | Ente-adjacent dark green |
| `--accent` | `#08C225` | Ente primary green (confirmed from Figma) |
| `--warning` | `#ffca72` | Ducky amber |
| `--text` | `#f4fff5` | Near-white |
| `--muted` | `#a9c8b2` | Desaturated green |
| `--font-display` | Inter (via next/font) | Placeholder — pending media kit |
| `--font-body` | Inter (via next/font) | Placeholder — pending media kit |

These are defined in `app/globals.css` and referenced throughout. `app/data/brandTokens.ts` holds the same values as a TypeScript object for programmatic use.
