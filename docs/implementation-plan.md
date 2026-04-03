# Ask Ducky V1 — Implementation Plan

This is the reviewed and approved execution plan for V1. It incorporates all feedback from the plan review process.

## Summary

Build Ask Ducky as a mobile-first, mostly static Next.js App Router web app centered on a fast three-step loop: idle, question, result/share. V1 ships as a launchable content-rich build with four priorities: official-brand visual fidelity, a solid content engine, reliable motion-plus-button interaction, and a polished share card that works online and offline after first load.

## Status

| Area | Status | Notes |
|------|--------|-------|
| Content engine | Done | Category-weighted selection, repeat avoidance, layered verdict lookup |
| Content authoring | Done | 200 questions, 156 verdicts, 75 afterburns, all launch targets met |
| 3-state UI | Done | Idle, question, result with animations |
| Shake interaction | Done | Threshold 18, 1s debounce, iOS permission, button fallback |
| Haptics | Done | 3 patterns: question reveal, verdict reveal, share success |
| Share flow | Done | 4-tier fallback chain with DOM-to-image failure handling |
| Share card renderer | Done | Square export, 20 category/mood visual variants |
| Offline support | Done | Service worker + bundled content |
| Local persistence | Done | Recent history, motion permission, last result re-share |
| Design tokens | Partial | Placeholder tokens in place, pending official Ente media kit |
| Mascot assets | Blocked | OrbHero and DuckyMood are SVG/ASCII placeholders |
| Font loading | Done | Inter via next/font/google |
| State animations | Done | Phase transitions, orb float, verdict pop, card reveal |
| Figma MCP | Done | Authenticated as setal@ente.io, design system and Ducky assets explored |

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
The original SW only pre-cached 3 URLs. We improved to: pre-cached assets serve cache-first, same-origin JS/CSS chunks cache on first fetch with offline fallback, external requests are network-only.

## What's still needed for launch

1. **Official Ente/Ducky mascot assets** — Replace OrbHero.tsx SVG and DuckyMood.tsx ASCII with real mascot illustrations mapped to 8 moods
2. **Design token extraction from media kit** — Confirm exact accent greens, typography choices, spacing from official assets
3. **Figma MCP authentication** — Complete OAuth flow to pull design system and Ducky illustration from Figma
4. **Visual QA on share card** — Test PNG export quality across devices, verify card looks good when shared on social/chat
5. **Real-device testing** — Shake threshold tuning on physical iOS and Android devices
6. **Content QA pass** — Human review of all 200 questions and category-specific verdicts for tone consistency

## Scope cut priority (if needed)

Cut extras before cutting:
1. Result screen polish
2. Share card quality
3. Content quality
4. Offline resilience
