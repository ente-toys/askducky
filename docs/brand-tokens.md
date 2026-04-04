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

## Mascot assets

Ducky illustrations originally exported from Figma file `yRdype7tLNdFKezukasJaF`, page "Duckys" (5:3653), frame "Dukcys" (5:9306).

The 8 static mood PNGs have been deleted. Visual variety now comes from Ducky Drip -- randomized layered SVG avatars (base + cap + shoes + shades + accessories) from 48 assets in `public/ducky/drip/`. Only `hero.png` remains (used in topbar).

| Asset | File | Figma Node | Usage |
|-------|------|------------|-------|
| Hero | `hero.png` | `5:6184` | Topbar icon |

## Mascot rules
- Visual variety comes from DuckyDrip randomized avatar configs, not static mood illustrations.
- Replace assets by exporting from Figma at 0.25x scale, save to `public/ducky/`.
- Keep result card compositions centered around the mascot rather than using it as detached clip art.
