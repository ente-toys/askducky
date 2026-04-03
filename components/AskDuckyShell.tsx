"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AskDuckyShell.module.css";
import { MotionPermissionGate } from "@/components/MotionPermissionGate";
import { OrbHero } from "@/components/OrbHero";
import { ShareCard } from "@/components/ShareCard";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { generatePlayResult } from "@/lib/contentEngine";
import { downloadBlob, exportNodeToPng } from "@/lib/exportImage";
import {
  hapticForQuestionReveal,
  hapticForShareSuccess,
  hapticForVerdictReveal,
} from "@/lib/haptics";
import { requestMotionPermission, createShakeController } from "@/lib/shake";
import { sharePayload } from "@/lib/share";
import { loadHistory, pushHistory, saveHistory } from "@/lib/storage";
import type { PlayResult } from "@/lib/types";

type Phase = "idle" | "question" | "result";
type MotionState = "unknown" | "granted" | "denied" | "unsupported";

export function AskDuckyShell() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<PlayResult | null>(null);
  const [motionPermission, setMotionPermission] = useState<MotionState>("unknown");
  const [feedback, setFeedback] = useState("");
  const [imageFallbackMode, setImageFallbackMode] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef(loadHistory());
  const resultRef = useRef<PlayResult | null>(null);

  useEffect(() => {
    const saved = historyRef.current.motionPermission ?? "unknown";
    setMotionPermission(saved);
    if (historyRef.current.lastResult) {
      resultRef.current = historyRef.current.lastResult;
      setResult(historyRef.current.lastResult);
    }

    // On non-iOS platforms, motion doesn't need permission — resolve immediately
    if (saved !== "granted") {
      requestMotionPermission().then((permission) => {
        if (permission === "granted") {
          setMotionPermission("granted");
          historyRef.current = { ...historyRef.current, motionPermission: "granted" };
          saveHistory(historyRef.current);
        }
      });
    }
  }, []);

  useEffect(() => {
    const controller = createShakeController({
      onShake: () => {
        if (phase === "idle") {
          revealQuestion();
          return;
        }

        if (phase === "question") {
          revealVerdict();
        }
      },
    });

    if (motionPermission === "granted") {
      controller.start();
    }

    return () => controller.stop();
  }, [phase, motionPermission]);

  function revealQuestion() {
    const nextResult = generatePlayResult(historyRef.current);
    resultRef.current = nextResult;
    setResult(nextResult);
    setPhase("question");
    setFeedback("");
    hapticForQuestionReveal();
  }

  function revealVerdict() {
    if (!resultRef.current) {
      revealQuestion();
      return;
    }

    const nextHistory = pushHistory(
      historyRef.current,
      resultRef.current.question.id,
      resultRef.current.verdict.id,
    );
    nextHistory.lastResult = resultRef.current;
    nextHistory.motionPermission = motionPermission;
    historyRef.current = nextHistory;
    saveHistory(nextHistory);
    setPhase("result");
    hapticForVerdictReveal();
  }

  function resetPlay() {
    setPhase("idle");
    setFeedback("");
    setImageFallbackMode(false);
  }

  async function handleMotionRequest() {
    const permission = await requestMotionPermission();
    const normalized =
      permission === "unsupported" ? "unsupported" : permission === "granted" ? "granted" : "denied";

    historyRef.current = { ...historyRef.current, motionPermission: normalized };
    saveHistory(historyRef.current);
    setMotionPermission(normalized);
    setFeedback(
      normalized === "granted"
        ? "Shake is on."
        : normalized === "unsupported"
          ? "Motion not supported here. Buttons still work."
          : "Motion denied. Buttons still work.",
    );
  }

  async function exportShareBlob() {
    const node = cardRef.current;
    if (!node) {
      throw new Error("Share card node unavailable.");
    }

    try {
      setImageFallbackMode(false);
      return await exportNodeToPng(node);
    } catch {
      setImageFallbackMode(true);
      throw new Error("Primary image export failed.");
    }
  }

  async function handleDownloadFallback() {
    if (!resultRef.current || !cardRef.current) {
      return;
    }

    try {
      const blob = await exportNodeToPng(cardRef.current);
      await downloadBlob(blob, `ask-ducky-${resultRef.current.question.id}.png`);
      setFeedback("Image downloaded. Caption copied if supported.");
      return;
    } catch {
      setImageFallbackMode(true);
      const plainText = [
        resultRef.current.question.text,
        resultRef.current.verdict.text,
        resultRef.current.afterburn.text,
        "askducky.app",
      ].join("\n");
      const fallbackBlob = new Blob([plainText], { type: "text/plain" });
      await downloadBlob(fallbackBlob, `ask-ducky-${resultRef.current.question.id}.txt`);
      setFeedback("Image export failed. Downloaded a plain fallback card instead.");
    }
  }

  async function handleShare() {
    if (!resultRef.current) {
      return;
    }

    setIsSharing(true);
    setFeedback("");

    let file: File | undefined;
    try {
      const blob = await exportShareBlob();
      file = new File([blob], `ask-ducky-${resultRef.current.question.id}.png`, { type: "image/png" });
    } catch {
      setFeedback("Image export failed. Falling back to a plain share path.");
    }

    const outcome = await sharePayload(
      {
        title: "Ask Ducky",
        text: resultRef.current.caption.text,
        url: "https://askducky.app",
        file,
      },
      handleDownloadFallback,
    );

    if (outcome.method !== "none") {
      hapticForShareSuccess();
    }

    const messages: Record<typeof outcome.method, string> = {
      "native-file": "Shared with image.",
      "native-text": "Shared with link and caption.",
      "download-copy-caption": "Downloaded the card and copied a caption if supported.",
      "copy-link": "Copied the app link.",
      none: "Share was unavailable here.",
    };

    setFeedback(messages[outcome.method]);
    setIsSharing(false);
  }

  const categoryLabel = result ? result.question.categoryId.replace(/_/g, " ") : "mobile-first toy";

  return (
    <main className={styles.page}>
      <ServiceWorkerRegister />
      <div className={styles.shell}>
        <div className={styles.topbar}>
          <span className={styles.badge}>Ask Ducky</span>
        </div>

        <section className={styles.card}>
          {phase === "idle" ? (
            <>
              <div className={`${styles.hero} ${styles.phaseEnter}`}>
                <span className={styles.eyebrow}>Privacy advice, badly delivered</span>
                <h1 className={styles.title}>Shake for a privacy verdict</h1>
                <p className={styles.subtitle}>
                  A judgmental duck for your digital life.
                </p>
              </div>
              <div className={styles.orbWrap}>
                <OrbHero />
              </div>
              <div className={`${styles.controls} ${styles.controlsEnter}`}>
                <MotionPermissionGate permission={motionPermission} onRequest={handleMotionRequest} />
                <button type="button" className={styles.primary} onClick={revealQuestion}>
                  Get a question
                </button>
                <div className={styles.hint}>Shake your phone or tap to start.</div>
              </div>
            </>
          ) : null}

          {phase === "question" && result ? (
            <>
              <div className={`${styles.questionBlock} ${styles.phaseEnter}`}>
                <span className={styles.eyebrow}>{categoryLabel}</span>
                <h2 className={styles.question}>{result.question.text}</h2>
                <div className={styles.hint}>Shake again for Ducky’s verdict.</div>
              </div>
              <div className={styles.orbWrap}>
                <OrbHero />
              </div>
              <div className={`${styles.controls} ${styles.controlsEnter}`}>
                <button type="button" className={styles.primary} onClick={revealVerdict}>
                  Reveal verdict
                </button>
                <button type="button" className={styles.tertiary} onClick={revealQuestion}>
                  New question
                </button>
              </div>
            </>
          ) : null}

          {phase === "result" && result ? (
            <>
              <div className={`${styles.resultCardWrap} ${styles.cardEnter}`}>
                <div ref={cardRef}>
                  <ShareCard result={result} fallbackMode={imageFallbackMode} />
                </div>
              </div>
              <div className={`${styles.controls} ${styles.controlsEnter}`}>
                <button type="button" className={styles.primary} onClick={() => void handleShare()} disabled={isSharing}>
                  {isSharing ? "Sharing..." : "Share this"}
                </button>
                <button type="button" className={styles.secondary} onClick={resetPlay}>
                  Ask again
                </button>
                <div className={styles.smallActions}>
                  <button type="button" className={styles.tertiary} onClick={() => void handleDownloadFallback()}>
                    Save image
                  </button>
                  <button
                    type="button"
                    className={styles.tertiary}
                    onClick={() => navigator.clipboard?.writeText("https://askducky.app")}
                  >
                    Copy link
                  </button>
                </div>
                <div className={styles.feedback}>{feedback}</div>
              </div>
            </>
          ) : null}
        </section>
      </div>
    </main>
  );
}
