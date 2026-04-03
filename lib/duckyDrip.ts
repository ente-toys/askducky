import type { DripConfig } from "@/lib/types";

const COUNTS = { cap: 14, shoe: 12, shade: 12, acc: 9 } as const;
const SKIP_CHANCE = 0.2;

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
