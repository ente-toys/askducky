import {
  categories,
  questions,
  shareCaptions,
  visualVariantsByCategory,
} from "@/app/data/content";
import { randomDripConfig } from "@/lib/duckyDrip";
import { pickRandom, pickWeightedRandom } from "@/lib/randomize";
import type { PlayResult, Question, RecentHistory } from "@/lib/types";

function filterRecent<T extends { id: string }>(items: T[], recentIds: string[]): T[] {
  const filtered = items.filter((item) => !recentIds.includes(item.id));
  return filtered.length > 0 ? filtered : items;
}

function pickVerdictIndex(questionId: string, recentVerdictIds: string[]): number {
  const indices = [0, 1, 2];
  const available = indices.filter(
    (i) => !recentVerdictIds.includes(`${questionId}_v${i}`),
  );
  return pickRandom(available.length > 0 ? available : indices);
}

function pickQuestion(history: RecentHistory): Question {
  const category = pickWeightedRandom(categories);
  const categoryQuestions = filterRecent(
    questions.filter((item) => item.categoryId === category.id),
    history.questionIds,
  );
  return pickRandom(categoryQuestions);
}

export function shuffleAllQuestions(): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generatePlayResultForQuestion(question: Question, history: RecentHistory): PlayResult {
  const vi = pickVerdictIndex(question.id, history.verdictIds);
  const ai = Math.floor(Math.random() * 3);
  return {
    question,
    verdict: question.verdicts[vi],
    afterburn: question.afterburns[ai],
    caption: pickRandom(shareCaptions),
    visualVariant: pickRandom(visualVariantsByCategory[question.categoryId]),
    dripConfig: randomDripConfig(),
  };
}

export function generatePlayResult(history: RecentHistory): PlayResult {
  const question = pickQuestion(history);
  return generatePlayResultForQuestion(question, history);
}
