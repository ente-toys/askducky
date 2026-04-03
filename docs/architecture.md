# Ask Ducky — Architecture

## Overview

Ask Ducky is a single-page, client-only Next.js app with no backend. All content, logic, and assets are bundled into the static build. The app is a 3-state machine driven by shake gestures or button taps.

## State machine

```
┌──────────┐  shake/tap   ┌────────────┐  shake/tap   ┌────────────┐
│   IDLE   │ ──────────►  │  QUESTION  │ ──────────►  │   RESULT   │
│          │              │            │              │            │
│ Hero orb │              │ Question   │              │ Share card │
│ CTA      │              │ Reveal CTA │              │ Share CTA  │
│ Shake    │              │ New Q skip │              │ Ask again  │
│ hint     │              │            │              │ Save/Copy  │
└──────────┘              └────────────┘              └────────────┘
      ▲                                                     │
      └─────────────────── "Ask again" ─────────────────────┘
```

**States:**
- **idle** — Landing screen with hero, branding, shake hint, "Get a question" button
- **question** — Dominant question text, "Reveal verdict" button, "New question" skip
- **result** — Share card as the hero view, share/save/copy controls

All state transitions fire haptic feedback on supported devices.

## Content engine

```
pickQuestion(history)
  │
  ├── pickWeightedRandom(categories)      # Category selected by weight
  ├── filterRecent(categoryQuestions)      # Avoid last 10 played questions
  └── pickRandom(filtered)                # Random from remaining
  
pickVerdict(question, recentVerdictIds)
  │
  ├── resolveFamily(question)             # Severity + preferred families → verdict family
  │     ├── high severity + hard_no pref  → 60% hard_no, 40% random preferred
  │     ├── low severity + soft_roast     → 55% soft_roast, 45% random preferred
  │     └── otherwise                     → random from preferred families
  │
  ├── Filter by family                    # All verdicts in resolved family
  ├── Prefer category-specific (70%)      # Lines tagged with question's category
  ├── Fall back to global pool            # Lines with no category tag
  └── filterRecent → pickRandom

pickAfterburn(categoryId)
  │
  ├── Prefer category-specific (70%)      # Lines tagged with question's category
  ├── Fall back to global pool
  └── filterRecent → pickRandom

Mood selection
  │
  └── pickRandom(moodsByFamily[verdict.family])
      # Mood correlates to verdict family:
      #   hard_no     → horrified, disappointed, suspicious
      #   cautious_maybe → suspicious, side_eye, deeply_tired
      #   approved    → impressed, smug
      #   chaos       → chaotic, horrified, side_eye
      #   soft_roast  → side_eye, smug, deeply_tired
```

**Result payload:** `{ question, verdict, afterburn, footer, caption, mood, visualVariant }`

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
              ├── TopBar ("Ask Ducky" badge)
              └── Card (phase-switched)
                  ├── idle:
                  │   ├── Hero text (eyebrow, title, subtitle)
                  │   ├── OrbHero (SVG placeholder)
                  │   ├── MotionPermissionGate
                  │   └── "Get a question" button
                  ├── question:
                  │   ├── Question text block
                  │   ├── OrbHero
                  │   ├── "Reveal verdict" button
                  │   └── "New question" button
                  └── result:
                      ├── ShareCard
                      │   ├── Header (label + DuckyMood)
                      │   ├── Content (question, verdict, afterburn)
                      │   └── Footer (footer line + URL)
                      ├── "Share this" button
                      ├── "Ask again" button
                      └── "Save image" / "Copy link" buttons
```

## Library interfaces

Each browser-dependent concern is isolated behind a small interface in `lib/`:

| Module | Purpose | Browser API |
|--------|---------|-------------|
| `shake.ts` | Shake detection + iOS permission | DeviceMotionEvent |
| `haptics.ts` | Vibration patterns | navigator.vibrate |
| `share.ts` | 4-tier share fallback chain | navigator.share, navigator.clipboard |
| `exportImage.ts` | DOM → PNG export + download | html-to-image, URL.createObjectURL |
| `storage.ts` | History persistence | localStorage |

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
  - Pre-caches `/`, `/manifest.webmanifest`, `/icon.svg` on install
  - Same-origin requests: network-first, cache on success, serve from cache on failure
  - External requests: network only
- **PWA manifest:** Standalone display, dark theme, Ente green accent

## CSS architecture

- **Global tokens:** `app/globals.css` — CSS custom properties for all colors, fonts, spacing, radii, shadows
- **Component styles:** CSS Modules (`.module.css`) scoped to each component
- **Font loading:** Inter loaded via `next/font/google`, injected as `--font-inter` CSS variable
- **Reduced motion:** Global `prefers-reduced-motion` media query disables all animations
- **Share card variants:** 20 category-specific CSS classes with unique gradient/texture backgrounds

## Design tokens (current placeholders)

| Token | Value | Source |
|-------|-------|--------|
| `--bg` | `#07110b` | Ente-adjacent dark green |
| `--accent` | `#00bc45` | Ente icon green |
| `--warning` | `#ffca72` | Ducky amber |
| `--text` | `#f4fff5` | Near-white |
| `--muted` | `#a9c8b2` | Desaturated green |
| `--font-display` | Inter (via next/font) | Placeholder — pending media kit |
| `--font-body` | Inter (via next/font) | Placeholder — pending media kit |

These are defined in `app/globals.css` and referenced throughout. `app/data/brandTokens.ts` holds the same values as a TypeScript object for programmatic use.
