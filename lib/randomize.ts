export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function pickWeightedRandom<T extends { weight?: number }>(items: T[]): T {
  const total = items.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  let cursor = Math.random() * total;

  for (const item of items) {
    cursor -= item.weight ?? 1;
    if (cursor <= 0) {
      return item;
    }
  }

  return items[items.length - 1];
}
