# Ask Ducky

A mobile-first, share-first web toy built with Next.js. Users shake their phone (or tap a button) to get a privacy-themed question, shake again for Ducky's verdict, then share a polished result card.

**Stack:** Next.js 15 App Router, React 19, TypeScript, CSS Modules, html-to-image

**Status:** V1 in active development. Content engine and core interaction loop complete. Visual design pending official Ente/Ducky media-kit assets.

## Quick start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Build

```bash
npm run build    # Static export, no backend required
npm run start    # Serve the build locally
```

## Test

```bash
npx vitest run
```

## Project structure

```
app/
  data/
    content.ts          # All content: questions, verdicts, afterburns, moods, footers, captions
    brandTokens.ts      # Design tokens (colors, typography, spacing, shadows)
  globals.css           # CSS custom properties and global styles
  layout.tsx            # Root layout with font loading (next/font)
  page.tsx              # Single page — renders AskDuckyShell
components/
  AskDuckyShell.tsx     # Main state machine (idle/question/result) and all interaction logic
  AskDuckyShell.module.css
  ShareCard.tsx         # Export-ready square card with category-specific visual variants
  ShareCard.module.css
  OrbHero.tsx           # Placeholder duck SVG (replace with official mascot)
  DuckyMood.tsx         # Mood indicator (ASCII placeholder, replace with mascot poses)
  MotionPermissionGate.tsx  # iOS motion permission request button
  ServiceWorkerRegister.tsx # PWA service worker registration
lib/
  contentEngine.ts      # Question selection, verdict resolution, result composition
  types.ts              # All TypeScript interfaces
  shake.ts              # DeviceMotion shake detection with iOS permission
  haptics.ts            # Vibration patterns for question/verdict/share
  share.ts              # Web Share API with 4-tier fallback chain
  exportImage.ts        # html-to-image PNG export with download fallback
  randomize.ts          # Weighted random and plain random selection
  storage.ts            # localStorage persistence for history and last result
public/
  sw.js                 # Service worker for offline support
  manifest.webmanifest  # PWA manifest
  icon.svg              # App icon
tests/
  content.test.ts       # Content quantity and engine integration tests
docs/
  brand-tokens.md       # Token extraction status and mascot mapping notes
```

## Documentation

- [PRD](ask_ducky_prd.md) — Full product requirements document
- [Architecture](docs/architecture.md) — System architecture and data flow
- [Implementation Plan](docs/implementation-plan.md) — Execution plan with decisions and status
- [Changelog](docs/changelog.md) — Issues discovered and fixed during development
- [Brand Tokens](docs/brand-tokens.md) — Design token extraction status

## Key design decisions

- **Static-first, no backend** — All content bundled in the JS bundle. Fully playable offline after first load.
- **Category-aware content engine** — Verdicts and afterburns are tagged to categories. The engine prefers category-matched content (70% weight) and falls back to global pools.
- **Mood-verdict correlation** — Ducky's mood is selected based on the verdict family, not randomly. "Horrified" pairs with hard_no, "impressed" with approved, etc.
- **Progressive enhancement for motion** — Shake detection with iOS permission handling, conservative threshold, debounce. Full button fallback in every state.
- **4-tier share fallback** — Native share with file > native share with text > download PNG + copy caption > copy link.
