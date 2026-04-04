# Ask Ducky — Architecture

## Overview

Ask Ducky is a single-page, client-only Next.js app with no backend. All content, logic, and assets are bundled into the static build. The app is a 2-state machine driven by question selection, shake gestures, or button taps.

## State machine

```
┌──────────┐  tap question   ┌────────────┐
│   IDLE   │  or shake       │   RESULT   │
│          │ ──────────────► │            │
│ Hero     │                 │ Share card │
│ All Qs  │                 │ Share CTA  │
│ Shake    │                 │ Ask again  │
│ hint     │  shake          │ Shake hint │
└──────────┘                 └────────────┘
      ▲                            │ shake
      └───── "Ask again" ──────────┘
              or shake
```

**States:**
- **idle** — Hero DuckyDrip (180px), subtitle "Privacy advice from a judgmental duck", shimmer shake hint with "or pick one" sub-text, scrollable list of all 200 questions (shuffled, 273px max-height)
- **result** — Share card as the hero view (outside card container), "Share the advice" + "Ask Ducky again" buttons side-by-side, shimmer shake hint below

Shake triggers a new result from both screens (no phase dependency). All state transitions fire haptic feedback on supported devices.

## Content engine

```
shuffleAllQuestions()
  │
  └── Return all 200 questions in shuffled random order

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
              │   ├── Left: clickable ducky + "AskDucky.app" (resets to idle)
              │   └── Right: "Made with ❤️ / ente" → ente.com
              └── Phase-switched content:
                  ├── idle (no card container, flows on cream):
                  │   ├── Hero DuckyDrip (180px, randomized)
                  │   ├── Subtitle "Privacy advice from a judgmental duck"
                  │   ├── Shake hint (coral→green→coral shimmer, font-weight 600)
                  │   ├── "or pick one" sub-text
                  │   ├── Enable shake link (iOS only)
                  │   └── Scrollable question list (all 200 shuffled, 273px max-height)
                  └── result (outside card, in shell):
                      ├── ShareCard
                      │   ├── Header tagline "Privacy advice from a judgmental duck"
                      │   ├── QuestionWrap (frosted background, 1rem/1.4 text)
                      │   ├── DuckyDrip (centered, 180px, randomized SVG layers)
                      │   ├── Content (verdict, afterburn)
                      │   ├── Footer (divider + AskDucky.app + Made with ❤️ ente)
                      │   │   └── Hidden in web view, shown only in export via data-export-mode
                      ├── "Share the advice" button (primary)
                      ├── "Ask Ducky again" button (secondary)
                      └── Shake hint (shimmer, same as idle)
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
  │   ├── lockWrapperHeight() to minimize footer flash during export
  │   ├── Set data-export-mode on share card to show footer
  │   └── Export with cream #f7f5f0 background color
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
- **PWA manifest:** Standalone display, warm cream theme

## CSS architecture

- **Global tokens:** `app/globals.css` — CSS custom properties for all colors, fonts, spacing, radii
- **Component styles:** CSS Modules (`.module.css`) scoped to each component
- **Font loading:** Inter loaded via `next/font/google`, injected as `--font-inter` CSS variable
- **Reduced motion:** Global `prefers-reduced-motion` media query disables all animations
- **Share card variants:** 5 warm-tinted CSS classes (alert-halo, scan-lines, vault-beam, soft-cloud, film-glow)
- **Elevation model:** Soft two-layer shadows instead of borders — inspired by Clay/Lovable design systems
- **Viewport fit:** Idle screen flows on cream (no card container). Result screen uses side-by-side buttons
- **Background:** Flat warm cream `#f7f5f0` — no animated gradients or blobs

## Design tokens

| Token | Value | Source |
|-------|-------|--------|
| `--bg` | `#f7f5f0` | Warm cream (Clay/Lovable-inspired) |
| `--bg-elevated` | `#ffffff` | White cards on cream |
| `--surface` | `#f0ede6` | Slightly darker cream for question cards |
| `--text` | `#1c1c1c` | Charcoal (Lovable) |
| `--muted` | `#6b6966` | Warm gray |
| `--accent` | `#08C225` | Ente primary green (confirmed from Figma) |
| `--action` | `#e8614d` | Warm coral for primary buttons |
| `--line` | `#e5e2db` | Warm border for structural dividers |
| `--warning` | `#d08a11` | Deep amber |
| `--font-display` | Inter (via next/font) | Placeholder — pending media kit |
| `--font-body` | Inter (via next/font) | Placeholder — pending media kit |

These are defined in `app/globals.css` and referenced throughout. `app/data/brandTokens.ts` holds the same values as a TypeScript object for programmatic use.
