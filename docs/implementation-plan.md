# Ask Ducky V1 — Implementation Plan

This is the reviewed and approved execution plan for V1. It incorporates all feedback from the plan review process.

## Summary

Build Ask Ducky as a mobile-first, mostly static Next.js App Router web app centered on a fast two-step loop: idle (pick a question) → result/share. V1 ships as a launchable content-rich build with four priorities: official-brand visual fidelity, a solid content engine, reliable motion-plus-button interaction, and a polished share card that works online and offline after first load.

## Status

| Area | Status | Notes |
|------|--------|-------|
| Content engine | Done | Per-question verdicts (3 each) and afterburns (3 each), 9 combos per question, repeat avoidance |
| Content authoring | Done | 200 questions, 600 verdicts (3 per question), 600 afterburns (3 per question). Round 10 personality pass rewrote ~350 flat lines |
| 2-state UI | Done | Idle (scrollable list of all 200 shuffled questions) → result (no intermediate question phase) |
| Shake interaction | Done | Threshold 18, 1s debounce, iOS permission button, auto-grant on Android/desktop, works on both idle and result screens |
| Haptics | Done | 3 patterns: question reveal, verdict reveal, share success |
| Share flow | Done | 4-tier fallback chain with DOM-to-image failure handling |
| Share card renderer | Done | 6 texture overlays + drip-derived color wash for unique card visuals |
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

## Key decisions (current)

### Per-question verdicts and afterburns
Each question has 3 inline verdicts (each tagged with a verdict family) and 3 inline afterburns. The engine picks 1 of each randomly, giving 9 combinations per question — always relevant to the question asked.

### 2-state flow
Idle screen shows all 200 questions in a scrollable shuffled list. Tapping a question or shaking goes directly to the result screen. Shake works on both screens.

### Static export with conditional basePath
`output: "export"` for GitHub Pages. `CUSTOM_DOMAIN` env var controls basePath (`""` for askducky.app, `/askducky` for ente-toys.github.io). All static asset paths use `basePath` from `lib/config.ts`. `next/image` doesn't work with static export — use plain `<img>` tags.

### Service worker: network-first
Pre-cached assets serve network-first with cache fallback for offline. `skipWaiting()` + `clients.claim()` for immediate activation. Cache name bumped on breaking changes. Auto-detects basePath from `self.location.pathname`.

### Ducky Drip randomized avatars
Layered SVGs (base + cap + shoes + shades + accessories) from 48 assets. ~20% chance per category to be empty, guaranteeing at least one item. `dripAccentColor()` extracts the most colorful accessory color for share card tinting.

### Share card unique visuals
6 CSS texture patterns × drip-derived diagonal color wash. Footer hidden in web view, shown in exported image via `data-export-mode` attribute.

### Motion permission auto-detection
`requestMotionPermission()` on mount. Android/desktop resolve immediately to "granted". iOS shows "Enable shake" link since Safari requires a user gesture.

### Font loading
Inter via `next/font/google`, wired through CSS variables. Placeholder pending official media kit confirmation.

## What's still needed for launch

1. **Visual QA on share card** — Test PNG export quality across devices, verify card looks good when shared on social/chat
2. **Real-device testing** — Shake threshold tuning on physical iOS and Android devices
3. ~~**Content QA pass**~~ — Done. Round 10 personality pass: ~350 flat lines rewritten across all 10 categories
4. **Typography confirmation** — Inter is placeholder. Confirm against official media kit
5. ~~**Custom domain**~~ — Done. CNAME set to `askducky.app`, basePath removed

## Scope cut priority (if needed)

Cut extras before cutting:
1. Result screen polish
2. Share card quality
3. Content quality
4. Offline resilience
