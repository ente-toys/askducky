# Ask Ducky — Claude Code Instructions

## Project overview

Ask Ducky is a mobile-first, share-first web toy. Users pick from 3 displayed questions (or shake for a random one) to get Ducky's privacy verdict, then share a polished result card. Built with Next.js 15 App Router, React 19, TypeScript, CSS Modules.

## Key documentation — read before making changes

- **PRD:** `ask_ducky_prd.md` — Full product requirements, content rules, tone guidance, visual direction, share strategy
- **Architecture:** `docs/architecture.md` — State machine, content engine flow, component tree, library interfaces, share flow, offline strategy, CSS architecture
- **Implementation plan:** `docs/implementation-plan.md` — Current status, key decisions, what's still needed
- **Changelog:** `docs/changelog.md` — All issues discovered and fixed, with rationale
- **Brand tokens:** `docs/brand-tokens.md` — Token extraction status, mascot mood mapping

## Commands

```bash
npm run dev          # Dev server at localhost:3000/askducky (basePath)
npm run build        # Production static export to out/
npx vitest run       # Run tests
npx tsc --noEmit     # Type check
```

## Deployment

- **Hosting:** GitHub Pages at https://ente-toys.github.io/askducky/
- **Repo:** https://github.com/ente-toys/askducky
- **Auto-deploy:** Every push to `main` triggers `.github/workflows/deploy.yml`
- **Static export:** `output: "export"` in `next.config.ts`, served from `out/`
- **basePath:** `/askducky` — all asset paths in components must use `process.env.NEXT_PUBLIC_BASE_PATH` prefix. Do NOT use `next/image` for static assets (it doesn't prepend basePath with `output: "export"` + `unoptimized: true`). Use plain `<img>` with the env variable instead.

## Architecture summary

- **Single client component** (`AskDuckyShell.tsx`) manages a 2-phase state machine: idle → result (question phase was removed — tapping or shaking goes directly to result)
- **Content engine** (`lib/contentEngine.ts`) composes results from category-weighted questions, family-resolved verdicts, category-matched afterburns, correlated moods, and visual variants
- **All content is bundled** — no backend, no API calls. Fully playable offline after first load
- **Browser APIs** (shake, haptics, share, export) are each isolated behind small library interfaces in `lib/`

## Content engine rules

- Verdicts and afterburns are tagged with `categoryIds`. The engine prefers category-matched content (70%) and falls back to global pools (30%)
- Mood correlates with verdict family — do not pick moods randomly
- Repeat avoidance uses a 10-item history window for both questions and verdicts
- Severity is inferred from question text keywords — this drives verdict family resolution

## Design decisions to preserve

- **Share card is the result screen.** The card renders outside the main card container (no double bounding box). Buttons sit below it.
- **No developer-facing text in UI.** Avoid technical labels like "offline-ready" or "varies by category" in user-visible copy.
- **Questions should sound natural.** Like something a real person would wonder, not comedy bits with forced punchlines.
- **CSS custom properties for all colors.** ShareCard and all components must use `var(--token)`, never hardcoded hex values.
- **Progressive enhancement for motion.** Button fallback must exist in every state. Never gate functionality behind shake. The "Enable shake" link only shows on iOS (where a user gesture is required for DeviceMotion permission). On Android/desktop, motion permission is auto-detected on mount.
- **basePath-aware asset paths.** All static asset references in components must use `process.env.NEXT_PUBLIC_BASE_PATH` prefix for GitHub Pages compatibility.
- **No-scroll viewport fit.** Both home and result screens are constrained to fit within the viewport without page scrolling. Home card uses `max-height: calc(100svh - 120px)` with internal scroll; result card uses `max-height: calc(100svh - 260px)`.
- **Topbar has ducky + brand link.** Left: clickable "Ask Ducky" with hero ducky (resets to home). Right: "Made with 💚 / ente" linking to `ente.com/?utm_source=askducky`.

## Mascot and mood illustrations

Ducky mascot illustrations are exported from the Ente Figma file and stored in `public/ducky/`:

| File | Usage | Figma node |
|------|-------|------------|
| `hero.png` | Topbar icon + ShareCard mood fallback | `5:6184` |
| `smug.png` | DuckyMood for `smug` verdict family | `5:4249` |
| `horrified.png` | DuckyMood for `horrified` | `5:4032` |
| `side_eye.png` | DuckyMood for `side_eye` | `5:3806` |
| `impressed.png` | DuckyMood for `impressed` | `5:3871` |
| `disappointed.png` | DuckyMood for `disappointed` | `5:3952` |
| `chaotic.png` | DuckyMood for `chaotic` | `5:3654` |
| `suspicious.png` | DuckyMood for `suspicious` | `5:4315` |
| `deeply_tired.png` | DuckyMood for `deeply_tired` | `5:4162` |

All exported at 0.25x from Figma (~300px height). No mood-specific facial expressions exist in Figma — variety comes from props/accessories (camera, trophy, globe, etc.).

## Color tokens (from Figma)

Primary accent green is `#08C225` (confirmed from Figma design system, not the previously assumed `#00BC45`). Full Ente green scale: `#E7F6E9` (light), `#BAECC2` (stroke), `#08C225` (primary), `#069D1E` (dark), `#057C18` (darker).

## Testing

Run `npx vitest run` before committing. Tests cover:
- Content quantity targets (questions, verdicts, afterburns, footers)
- All 5 verdict families present (including soft_roast)
- Content engine returns complete shareable results
- History trimming keeps 10 most recent unique items

## Figma integration

Figma MCP server is authenticated as `setal@ente.io` (ente team, Pro plan). File key: `yRdype7tLNdFKezukasJaF`.

- Design System (page `0:1`): Colors, typography, components
- Ducky Illustrations (page `5:3653`, frame `5:9306` "Dukcys"): All mascot assets

Note: Figma plugin `exportAsync` times out for complex illustrations. For asset exports, use Figma desktop app at 0.25x scale and save to `public/ducky/`.
