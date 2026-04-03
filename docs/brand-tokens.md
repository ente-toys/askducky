# Ask Ducky Brand Token Extraction

## Current status
- Accent green confirmed from Figma design system: `#08C225`
- Full Ente green scale extracted: light → stroke → primary → dark → darker
- Ducky mascot illustrations exported from Figma and stored in `public/ducky/`
- Typography still uses Inter as placeholder pending media kit confirmation

## Color tokens (confirmed from Figma)

| Token | Value | Source |
|-------|-------|--------|
| Green-light | `#E7F6E9` | Figma design system (node 3:3299) |
| Green-stroke | `#BAECC2` | Figma design system |
| **Green (primary)** | **`#08C225`** | **Figma design system — used as `--accent`** |
| Green-dark | `#069D1E` | Figma design system |
| Green-darker | `#057C18` | Figma design system |

Additional palette colors available in Figma: full grayscale, reds (`#F63A3A`), blues (`#1071FF`), oranges (`#FFA939`), purples (`#8A38F5`), pinks (`#DF61BB`), teals (`#5FB7BB`).

## Typography (from Figma, not yet applied)

| Style | Size/Line-height |
|-------|-----------------|
| Title-bold | 20/28 |
| Title-text | 20/28 |
| Title-photo | 16/20 |
| Modal-Title-text | 18/24 |
| Primary-bold | 14/20 |
| Primary-text | 14/20 |
| Primary-Link | 14/20 |
| Listname-text | 14/16 |
| Recovery-key | 14/24 |
| Sub-text | 12/16 |
| Warning-text | 10/12 |

## Tokens still to confirm
- Display/body font choices (Inter is placeholder)
- Font weight scale
- Corner radii, card shadows, and spacing cadence

## Mascot mood mapping

Ducky illustrations exported from Figma file `yRdype7tLNdFKezukasJaF`, page "Duckys" (5:3653), frame "Dukcys" (5:9306). Exported at 0.25x scale as PNG.

No mood-specific facial expressions exist in the Figma file. The base Ducky has a single happy/content expression. Mood variation comes from different props, accessories, and poses:

| Mood | File | Figma Node | Illustration |
|------|------|------------|-------------|
| (hero) | `hero.png` | `5:6184` | Base happy ducky, standalone |
| smug | `smug.png` | `5:4249` | Trophy ducky with green cap |
| horrified | `horrified.png` | `5:4032` | Cat-grabbing ducky with green cap |
| side_eye | `side_eye.png` | `5:3806` | Camera ducky close-up with green cap |
| impressed | `impressed.png` | `5:3871` | Globe ducky with green cap |
| disappointed | `disappointed.png` | `5:3952` | Camera + coffee ducky with green cap |
| chaotic | `chaotic.png` | `5:3654` | Three duckies with gears |
| suspicious | `suspicious.png` | `5:4315` | Camera ducky full shot with green cap |
| deeply_tired | `deeply_tired.png` | `5:4162` | Two duckies hugging with green caps |

## Mascot rules
- Replace assets by exporting from Figma at 0.25x scale, save to `public/ducky/`.
- Preserve mood-to-asset mapping in `components/DuckyMood.tsx` rather than hardcoding asset names throughout the UI.
- Keep result card compositions centered around the mascot rather than using it as detached clip art.
