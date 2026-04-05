import type { DripConfig } from "@/lib/types";

const COUNTS = { cap: 14, shoe: 12, shade: 12, acc: 9 } as const;
const SKIP_CHANCE = 0.2;

// Dominant non-black fill color per accessory index (extracted from SVGs)
const CAP_COLORS: Record<number, string> = {
  1: "#449DD7",  // blue
  2: "#AF6734",  // brown
  3: "#58BF43",  // green
  4: "#514C4C",  // charcoal
  5: "#7F66D2",  // purple
  6: "#C7C3BA",  // tan
  7: "#BB1C4D",  // crimson
  8: "#4794D8",  // blue
  9: "#FF669D",  // pink
  10: "#BC96DA", // lavender
  11: "#E28F8A", // salmon
  12: "#DBDBDB", // silver
  13: "#5D6CF9", // indigo
  14: "#DBDBDB", // silver
};

const SHOE_COLORS: Record<number, string> = {
  1: "#FF402C",  // red
  2: "#487ECF",  // blue
  3: "#B74239",  // terracotta
  4: "#D3D3D3",  // silver
  5: "#FFAE2C",  // orange
  6: "#487ECF",  // blue
  7: "#F23BD0",  // magenta
  8: "#FFAE2C",  // orange
  9: "#EB5747",  // red
  10: "#F23BD0", // magenta
  11: "#12C51B", // green
  12: "#12C51B", // green
};

const SHADE_COLORS: Record<number, string> = {
  1: "#FF659D",  // pink
  2: "#606060",  // gray
  3: "#FF4343",  // red
  4: "#B898DA",  // purple
  5: "#232323",  // black
  6: "#E5E5E5",  // silver
  7: "#FF8FF8",  // magenta
  8: "#F0463F",  // red-orange
  9: "#606060",  // gray
  10: "#39BF7B", // emerald
  11: "#232323", // black
  12: "#232323", // black
};

const ACC_COLORS: Record<number, string> = {
  1: "#494949",  // dark gray
  2: "#E25247",  // red
  3: "#F4764E",  // orange
  4: "#006FE9",  // blue
  5: "#6B6B6B",  // gray
  6: "#17E269",  // green
  7: "#565656",  // gray
  8: "#727272",  // gray
  9: "#494949",  // dark gray
};

// Default tint when no colorful accessory is equipped
const FALLBACK_COLOR = "#08C225";

function pickSlot(max: number): number | null {
  if (Math.random() < SKIP_CHANCE) return null;
  return Math.floor(Math.random() * max) + 1;
}

export function randomDripConfig(): DripConfig {
  let config: DripConfig;
  do {
    config = {
      cap: pickSlot(COUNTS.cap),
      shoe: pickSlot(COUNTS.shoe),
      shade: pickSlot(COUNTS.shade),
      acc: pickSlot(COUNTS.acc),
    };
  } while (
    config.cap === null &&
    config.shoe === null &&
    config.shade === null &&
    config.acc === null
  );
  return config;
}

const NEUTRAL = /^#[0-9A-Fa-f]{6}$/;
function isColorful(hex: string): boolean {
  if (!NEUTRAL.test(hex)) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  // Skip near-grays: low saturation relative to lightness
  return (max - min) > 40;
}

/** Derive an accent color from the drip accessories (prefers colorful items). */
export function dripAccentColor(config: DripConfig): string {
  // Priority: cap > shade > shoe > acc (most visible to least)
  const candidates: string[] = [];
  if (config.cap != null && CAP_COLORS[config.cap]) candidates.push(CAP_COLORS[config.cap]);
  if (config.shade != null && SHADE_COLORS[config.shade]) candidates.push(SHADE_COLORS[config.shade]);
  if (config.shoe != null && SHOE_COLORS[config.shoe]) candidates.push(SHOE_COLORS[config.shoe]);
  if (config.acc != null && ACC_COLORS[config.acc]) candidates.push(ACC_COLORS[config.acc]);

  const colorful = candidates.filter(isColorful);
  return colorful.length > 0 ? colorful[0] : FALLBACK_COLOR;
}
