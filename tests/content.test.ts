import { describe, expect, test } from "vitest";
import {
  questions,
  shareCaptions,
} from "@/app/data/content";
import { generatePlayResult } from "@/lib/contentEngine";
import { trimRecent } from "@/lib/storage";

describe("content pack", () => {
  test("has exactly 200 questions (20 per category)", () => {
    expect(questions.length).toBe(200);
  });

  test("each question has exactly 3 verdicts and 3 afterburns", () => {
    for (const q of questions) {
      expect(q.verdicts).toHaveLength(3);
      expect(q.afterburns).toHaveLength(3);
    }
  });

  test("each question's verdicts span at least 2 different families", () => {
    for (const q of questions) {
      const families = new Set(q.verdicts.map((v) => v.family));
      expect(families.size).toBeGreaterThanOrEqual(2);
    }
  });

  test("all 5 verdict families are represented across all questions", () => {
    const allFamilies = new Set(
      questions.flatMap((q) => q.verdicts.map((v) => v.family)),
    );
    expect(allFamilies).toEqual(
      new Set(["hard_no", "cautious_maybe", "approved", "chaos", "soft_roast"]),
    );
  });

  test("share captions exist", () => {
    expect(shareCaptions.length).toBeGreaterThan(0);
  });
});

describe("content engine", () => {
  test("returns a fully shareable result", () => {
    const result = generatePlayResult({
      questionIds: [],
      verdictIds: [],
      motionPermission: "unknown",
    });

    expect(result.question.id).toBeTruthy();
    expect(result.verdict.text).toBeTruthy();
    expect(typeof result.afterburn).toBe("string");
    expect(result.afterburn.length).toBeGreaterThan(0);
    expect(result.caption.id).toBeTruthy();
    expect(result.visualVariant).toBeTruthy();
  });
});

describe("history trimming", () => {
  test("keeps only the 10 most recent unique items", () => {
    expect(trimRecent(["a", "b", "c", "a", "d", "e", "f", "g", "h", "i", "j", "k"])).toEqual([
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
    ]);
  });
});
