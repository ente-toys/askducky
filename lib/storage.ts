import type { RecentHistory } from "@/lib/types";

const STORAGE_KEY = "ask-ducky-history";
const MAX_RECENT_ITEMS = 10;

export function trimRecent(items: string[]): string[] {
  return Array.from(new Set(items)).slice(0, MAX_RECENT_ITEMS);
}

export function loadHistory(): RecentHistory {
  if (typeof window === "undefined") {
    return { questionIds: [], verdictIds: [], motionPermission: "unknown" };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { questionIds: [], verdictIds: [], motionPermission: "unknown" };
    }

    const parsed = JSON.parse(raw) as RecentHistory;

    return {
      questionIds: parsed.questionIds ?? [],
      verdictIds: parsed.verdictIds ?? [],
      lastResult: parsed.lastResult,
      motionPermission: parsed.motionPermission ?? "unknown",
    };
  } catch {
    return { questionIds: [], verdictIds: [], motionPermission: "unknown" };
  }
}

export function saveHistory(history: RecentHistory) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function pushHistory(history: RecentHistory, questionId: string, verdictId: string): RecentHistory {
  return {
    ...history,
    questionIds: trimRecent([questionId, ...history.questionIds]),
    verdictIds: trimRecent([verdictId, ...history.verdictIds]),
  };
}
