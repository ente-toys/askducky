import { describe, expect, test } from "vitest";
import {
  afterburns,
  questions,
  shareCaptions,
  shareFooters,
  verdicts,
} from "@/app/data/content";
import { generatePlayResult } from "@/lib/contentEngine";
import { trimRecent } from "@/lib/storage";

describe("content pack", () => {
  test("meets launch content targets", () => {
    expect(questions.length).toBeGreaterThanOrEqual(180);
    expect(questions.length).toBeLessThanOrEqual(250);
    expect(verdicts.length).toBeGreaterThanOrEqual(80);
    expect(verdicts.length).toBeLessThanOrEqual(200);
    expect(afterburns.length).toBeGreaterThanOrEqual(60);
    expect(afterburns.length).toBeLessThanOrEqual(100);
    expect(shareFooters.length).toBeGreaterThanOrEqual(12);
    expect(shareFooters.length).toBeLessThanOrEqual(20);
    expect(shareCaptions.length).toBeGreaterThan(0);
  });

  test("includes all verdict families including soft roast", () => {
    const families = new Set(verdicts.map((item) => item.family));
    expect(families).toEqual(
      new Set(["hard_no", "cautious_maybe", "approved", "chaos", "soft_roast"]),
    );
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
    expect(result.verdict.id).toBeTruthy();
    expect(result.afterburn.id).toBeTruthy();
    expect(result.footer.id).toBeTruthy();
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
