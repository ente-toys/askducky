# Ask Ducky Brand Token Extraction

This file is the handoff point for replacing placeholder tokens with exact production tokens once the official Ente media-kit assets are available locally.

## Current status
- Ducky/brand assets are not present in the repository yet.
- The app uses temporary Ente-adjacent placeholders so UI work can proceed without hardcoding implementation details into the components.
- Swap points are already isolated in:
  - `app/data/brandTokens.ts`
  - `public/ducky/`
  - `components/DuckyMood.tsx`

## Tokens to confirm from official assets
- Exact accent greens and any secondary neutrals
- Display/body font choices and weight scale
- Corner radii, card shadows, and spacing cadence
- Approved mascot poses mapped to:
  - smug
  - horrified
  - side_eye
  - impressed
  - disappointed
  - chaotic
  - suspicious
  - deeply_tired

## Mascot rules
- Replace placeholder SVGs in `public/ducky/` with official media-kit assets.
- Preserve one mood-to-asset mapping table rather than hardcoding asset names throughout the UI.
- Keep result card compositions centered around the mascot rather than using it as detached clip art.
