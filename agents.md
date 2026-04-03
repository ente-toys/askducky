# Ask Ducky — Agent Instructions

## For AI coding agents working on this project

Read these files before making any changes:

1. `CLAUDE.md` — Project-specific instructions, commands, architecture summary, design decisions to preserve
2. `ask_ducky_prd.md` — Full product requirements document with content rules, tone guidance, visual direction
3. `docs/architecture.md` — State machine, content engine flow, component tree, data model, share flow
4. `docs/implementation-plan.md` — Current status of all work areas, key decisions made, what's still needed
5. `docs/changelog.md` — Issues already discovered and fixed — do not reintroduce these problems

## Critical rules

- **All colors via CSS custom properties.** Never hardcode hex values in component CSS. Use `var(--token)` from `globals.css`.
- **Content engine is category-aware.** Verdicts and afterburns have `categoryIds`. The engine prefers category-matched content. Do not flatten this back to a global pool.
- **Mood correlates with verdict family.** See `moodsByFamily` in `contentEngine.ts`. Do not make mood selection random.
- **Share card IS the result screen.** Do not add duplicate inline text above it.
- **Questions must sound natural.** Real situations, not comedy bits. See changelog item #11 for context.
- **Button fallback in every state.** Shake is progressive enhancement. Never gate functionality behind motion.
- **Run tests before finishing.** `npx vitest run` and `npx tsc --noEmit`.

## Content changes

If modifying content in `app/data/content.ts`:
- New verdicts/afterburns should include `categoryIds` when they reference a specific topic
- Global lines (no `categoryIds`) should work for any category
- Maintain launch quantity targets: 180-250 questions, 80-200 verdicts, 60-100 afterburns, 12-20 footers
- All 5 verdict families must be represented: hard_no, cautious_maybe, approved, chaos, soft_roast
- Test bounds are in `tests/content.test.ts` — update if quantities change significantly

## Pending work (for context)

- Mascot assets: `OrbHero.tsx` and `DuckyMood.tsx` are placeholders awaiting official Ente media kit
- Design tokens: Colors/fonts are approximations awaiting official media kit confirmation
- Figma MCP: Configured but OAuth not yet authenticated
