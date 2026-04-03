import {
  afterburns,
  categories,
  questions,
  shareCaptions,
  shareFooters,
  verdicts,
  visualVariantsByCategory,
} from "@/app/data/content";
import { pickRandom, pickWeightedRandom } from "@/lib/randomize";
import type { DuckyMood, PlayResult, Question, RecentHistory, VerdictFamily, VerdictLine } from "@/lib/types";

const moodsByFamily: Record<VerdictFamily, DuckyMood[]> = {
  hard_no: ["horrified", "disappointed", "suspicious"],
  cautious_maybe: ["suspicious", "side_eye", "deeply_tired"],
  approved: ["impressed", "smug"],
  chaos: ["chaotic", "horrified", "side_eye"],
  soft_roast: ["side_eye", "smug", "deeply_tired"],
};

function filterRecent<T extends { id: string }>(items: T[], recentIds: string[]): T[] {
  const filtered = items.filter((item) => !recentIds.includes(item.id));
  return filtered.length > 0 ? filtered : items;
}

function resolveFamily(question: Question): VerdictFamily {
  if (question.preferredFamilies?.length) {
    if (question.severity === "high" && question.preferredFamilies.includes("hard_no")) {
      return Math.random() > 0.4 ? "hard_no" : pickRandom(question.preferredFamilies);
    }

    if (question.severity === "low" && question.preferredFamilies.includes("soft_roast")) {
      return Math.random() > 0.45 ? "soft_roast" : pickRandom(question.preferredFamilies);
    }

    return pickRandom(question.preferredFamilies);
  }

  return question.severity === "high" ? "hard_no" : "cautious_maybe";
}

function pickVerdict(question: Question, recentVerdictIds: string[]): VerdictLine {
  const family = resolveFamily(question);
  const familyPool = verdicts.filter((line) => line.family === family);

  // Prefer category-specific verdicts, fall back to global
  const categoryPool = familyPool.filter(
    (line) => line.categoryIds?.includes(question.categoryId),
  );
  const globalPool = familyPool.filter(
    (line) => !line.categoryIds || line.categoryIds.length === 0,
  );

  // Try category-specific first (70% chance if available), then global
  const preferCategory = categoryPool.length > 0 && Math.random() < 0.7;
  const primary = preferCategory ? categoryPool : globalPool.length > 0 ? globalPool : familyPool;

  const filtered = filterRecent(primary, recentVerdictIds);
  return pickRandom(filtered);
}

function pickQuestion(history: RecentHistory): Question {
  const category = pickWeightedRandom(categories);
  const categoryQuestions = filterRecent(
    questions.filter((item) => item.categoryId === category.id),
    history.questionIds,
  );

  return pickRandom(categoryQuestions);
}

function pickAfterburn(categoryId: string, recentIds: string[]) {
  // Prefer category-specific afterburns, fall back to global
  const categoryPool = afterburns.filter(
    (line) => line.categoryIds?.includes(categoryId as never),
  );
  const globalPool = afterburns.filter(
    (line) => !line.categoryIds || line.categoryIds.length === 0,
  );

  const preferCategory = categoryPool.length > 0 && Math.random() < 0.7;
  const primary = preferCategory ? categoryPool : globalPool.length > 0 ? globalPool : afterburns;

  const filtered = filterRecent(primary, recentIds);
  return pickRandom(filtered);
}

export function pickMultipleQuestions(count: number, history: RecentHistory): Question[] {
  const picked: Question[] = [];
  const usedIds: string[] = [...history.questionIds];

  for (let i = 0; i < count; i++) {
    const category = pickWeightedRandom(categories);
    const categoryQuestions = filterRecent(
      questions.filter((item) => item.categoryId === category.id),
      usedIds,
    );
    const q = pickRandom(categoryQuestions);
    picked.push(q);
    usedIds.push(q.id);
  }

  return picked;
}

export function generatePlayResultForQuestion(question: Question, history: RecentHistory): PlayResult {
  const verdict = pickVerdict(question, history.verdictIds);
  const footer = pickRandom(shareFooters);
  const afterburn = pickAfterburn(question.categoryId, []);
  const caption = pickRandom(shareCaptions);
  const mood = pickRandom(moodsByFamily[verdict.family]);
  const visualVariant = pickRandom(visualVariantsByCategory[question.categoryId]);

  return { question, verdict, afterburn, footer, caption, mood, visualVariant };
}

export function generatePlayResult(history: RecentHistory): PlayResult {
  const question = pickQuestion(history);
  return generatePlayResultForQuestion(question, history);
}
