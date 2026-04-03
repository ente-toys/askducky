# Ask Ducky — Claude Code Instructions

## Project overview

Ask Ducky is a mobile-first, share-first web toy. Users shake their phone (or tap) to get a privacy-themed question, shake again for Ducky's verdict, then share a polished result card. Built with Next.js 15 App Router, React 19, TypeScript, CSS Modules.

## Key documentation — read before making changes

- **PRD:** `ask_ducky_prd.md` — Full product requirements, content rules, tone guidance, visual direction, share strategy
- **Architecture:** `docs/architecture.md` — State machine, content engine flow, component tree, library interfaces, share flow, offline strategy, CSS architecture
- **Implementation plan:** `docs/implementation-plan.md` — Current status, key decisions, what's still needed
- **Changelog:** `docs/changelog.md` — All issues discovered and fixed, with rationale
- **Brand tokens:** `docs/brand-tokens.md` — Token extraction status, mascot mood mapping

## Commands

```bash
npm run dev          # Dev server at localhost:3000
npm run build        # Production static build
npx vitest run       # Run tests
npx tsc --noEmit     # Type check
```

## Architecture summary

- **Single client component** (`AskDuckyShell.tsx`) manages a 3-phase state machine: idle → question → result
- **Content engine** (`lib/contentEngine.ts`) composes results from category-weighted questions, family-resolved verdicts, category-matched afterburns, correlated moods, and visual variants
- **All content is bundled** — no backend, no API calls. Fully playable offline after first load
- **Browser APIs** (shake, haptics, share, export) are each isolated behind small library interfaces in `lib/`

## Content engine rules

- Verdicts and afterburns are tagged with `categoryIds`. The engine prefers category-matched content (70%) and falls back to global pools (30%)
- Mood correlates with verdict family — do not pick moods randomly
- Repeat avoidance uses a 10-item history window for both questions and verdicts
- Severity is inferred from question text keywords — this drives verdict family resolution

## Design decisions to preserve

- **Share card is the result screen.** Do not add inline text above the card. The card IS the view.
- **No developer-facing text in UI.** Avoid technical labels like "offline-ready" or "varies by category" in user-visible copy.
- **Questions should sound natural.** Like something a real person would wonder, not comedy bits with forced punchlines.
- **CSS custom properties for all colors.** ShareCard and all components must use `var(--token)`, never hardcoded hex values.
- **Progressive enhancement for motion.** Button fallback must exist in every state. Never gate functionality behind shake.

## Placeholders still in place

- `OrbHero.tsx` — SVG circle placeholder. Replace with official Ente/Ducky mascot asset.
- `DuckyMood.tsx` — ASCII face placeholder. Replace with mascot poses mapped to 8 moods.
- Typography uses Inter as placeholder. Confirm against official media kit.
- Color tokens are Ente-adjacent approximations. Confirm against official media kit.

## Testing

Run `npx vitest run` before committing. Tests cover:
- Content quantity targets (questions, verdicts, afterburns, footers)
- All 5 verdict families present (including soft_roast)
- Content engine returns complete shareable results
- History trimming keeps 10 most recent unique items

## Figma integration

Figma MCP server is configured (`claude mcp add --transport http figma https://mcp.figma.com/mcp`) but OAuth authentication is pending. Once authenticated, use it to pull:
- UX Design System: `https://www.figma.com/design/yRdype7tLNdFKezukasJaF/Ente-s-Agent-Workspace?node-id=0-1`
- Ducky illustration: `https://www.figma.com/design/yRdype7tLNdFKezukasJaF/Ente-s-Agent-Workspace?node-id=5-3653`
