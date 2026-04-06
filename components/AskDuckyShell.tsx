"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AskDuckyShell.module.css";
import { ShareCard } from "@/components/ShareCard";
import { DuckyDrip } from "@/components/DuckyDrip";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { generatePlayResult, generatePlayResultForQuestion, shuffleAllQuestions } from "@/lib/contentEngine";
import { randomDripConfig } from "@/lib/duckyDrip";
import { downloadBlob, exportNodeToPng } from "@/lib/exportImage";
import {
  hapticForQuestionReveal,
  hapticForShareSuccess,
  hapticForVerdictReveal,
} from "@/lib/haptics";
import { requestMotionPermission, createShakeController } from "@/lib/shake";
import { sharePayload } from "@/lib/share";
import { loadHistory, pushHistory, saveHistory } from "@/lib/storage";
import type { DripConfig, PlayResult, Question } from "@/lib/types";
import { basePath } from "@/lib/config";

type Phase = "idle" | "result";
type MotionState = "unknown" | "granted" | "denied" | "unsupported";

export function AskDuckyShell() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<PlayResult | null>(null);
  const [motionPermission, setMotionPermission] = useState<MotionState>("unknown");
  const [feedback, setFeedback] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [displayedQuestions, setDisplayedQuestions] = useState<Question[]>([]);
  const [heroDripConfig, setHeroDripConfig] = useState<DripConfig | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef(loadHistory());
  const resultRef = useRef<PlayResult | null>(null);

  useEffect(() => {
    const saved = historyRef.current.motionPermission ?? "unknown";
    setMotionPermission(saved);
    if (historyRef.current.lastResult) {
      const saved = historyRef.current.lastResult;
      // Migration: old format had afterburn as { id, text } object
      if (saved.afterburn && typeof saved.afterburn === "object") {
        saved.afterburn = (saved.afterburn as unknown as { text: string }).text;
      }
      // Migration: old format had visualVariant instead of texture/accentColor
      if (!saved.texture) {
        saved.texture = "grain";
        saved.accentColor = "#08C225";
      }
      resultRef.current = saved;
      setResult(saved);
    }

    setDisplayedQuestions(shuffleAllQuestions());
    setHeroDripConfig(randomDripConfig());

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
        goToResult(generatePlayResult(historyRef.current));
      },
    });

    if (motionPermission === "granted") {
      controller.start();
    }

    return () => controller.stop();
  }, [motionPermission]);

  function goToResult(playResult: PlayResult) {
    resultRef.current = playResult;
    setResult(playResult);

    const nextHistory = pushHistory(
      historyRef.current,
      playResult.question.id,
      `${playResult.question.id}_v${playResult.question.verdicts.indexOf(playResult.verdict)}`,
    );
    nextHistory.lastResult = playResult;
    nextHistory.motionPermission = motionPermission;
    historyRef.current = nextHistory;
    saveHistory(nextHistory);

    setPhase("result");
    setFeedback("");
    hapticForVerdictReveal();
  }

  function selectQuestion(question: Question) {
    hapticForQuestionReveal();
    goToResult(generatePlayResultForQuestion(question, historyRef.current));
  }

  function resetPlay() {
    setPhase("idle");
    setFeedback("");
    setDisplayedQuestions(shuffleAllQuestions());
    setHeroDripConfig(randomDripConfig());
  }

  async function handleMotionRequest() {
    const permission = await requestMotionPermission();
    const normalized =
      permission === "unsupported" ? "unsupported" : permission === "granted" ? "granted" : "denied";

    historyRef.current = { ...historyRef.current, motionPermission: normalized };
    saveHistory(historyRef.current);
    setMotionPermission(normalized);
    if (normalized !== "granted") {
      setFeedback(
        normalized === "unsupported"
          ? "Shake isn't available here — just tap instead."
          : "Shake denied — just tap instead.",
      );
    }
  }

  function lockWrapperHeight(node: HTMLElement): Promise<() => void> {
    return new Promise((resolve) => {
      const wrapper = node.parentElement;
      if (!wrapper) { resolve(() => {}); return; }
      const height = wrapper.offsetHeight;
      wrapper.style.height = `${height}px`;
      wrapper.style.overflow = "hidden";
      // Wait for the clip to paint before revealing the footer
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          node.setAttribute("data-export-mode", "");
          resolve(() => {
            node.removeAttribute("data-export-mode");
            wrapper.style.height = "";
            wrapper.style.overflow = "";
          });
        });
      });
    });
  }

  async function exportShareBlob() {
    const node = cardRef.current;
    if (!node) {
      throw new Error("Share card node unavailable.");
    }

    const unlock = await lockWrapperHeight(node);
    try {
      const blob = await exportNodeToPng(node);
      unlock();
      return blob;
    } catch {
      unlock();
      throw new Error("Primary image export failed.");
    }
  }

  async function handleDownloadFallback() {
    if (!resultRef.current || !cardRef.current) {
      return;
    }

    const unlock = await lockWrapperHeight(cardRef.current);
    try {
      const blob = await exportNodeToPng(cardRef.current);
      unlock();
      await downloadBlob(blob, `ask-ducky-${resultRef.current.question.id}.png`);
      setFeedback("");
      return;
    } catch {
      unlock();
      const plainText = [
        resultRef.current.question.text,
        resultRef.current.verdict.text,
        resultRef.current.afterburn,
        "askducky.app",
      ].join("\n");
      const fallbackBlob = new Blob([plainText], { type: "text/plain" });
      await downloadBlob(fallbackBlob, `ask-ducky-${resultRef.current.question.id}.txt`);
      setFeedback("Couldn't save the image. Downloaded a text version instead.");
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
      setFeedback("");
    }

    const outcome = await sharePayload(
      {
        title: "AskDucky",
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
      "native-file": "",
      "native-text": "",
      "download-copy-caption": "Saved! Caption copied.",
      "copy-link": "Link copied!",
      none: "Sharing isn't available here.",
    };

    setFeedback(messages[outcome.method]);
    setIsSharing(false);
  }

  const showEnableShake = motionPermission === "unknown" || motionPermission === "denied";

  return (
    <main className={styles.page}>
      <ServiceWorkerRegister />
      <div className={styles.shell}>
        <div className={styles.topbar}>
          <button type="button" className={styles.topbarLeft} onClick={resetPlay}>
            <img
              src={`${basePath}/ducky/hero.png`}
              width={36}
              height={36}
              alt=""
              className={styles.topbarDucky}
            />
            <span className={styles.topbarTitle}>AskDucky.app</span>
          </button>
          <a
            href="https://ente.com"
            target="_blank"
            rel="noopener"
            className={styles.topbarRight}
          >
            <span className={styles.topbarMadeWith}>Made with ❤️</span>
            <span className={styles.topbarEnte}>ente</span>
          </a>
        </div>

        {phase === "idle" ? (
          <div className={styles.idle}>
            <div className={`${styles.hero} ${styles.phaseEnter}`}>
              {heroDripConfig ? (
                <div className={styles.heroMascot}>
                  <DuckyDrip config={heroDripConfig} size={180} />
                </div>
              ) : null}
              <h2 className={styles.title}>Privacy advice from<br /><span className={styles.titleEmphasis}>a judgmental duck</span></h2>
            </div>
            <div className={`${styles.questionList} ${styles.phaseEnter}`}>
              <div className={styles.shakeHintWrap}>
                <span className={styles.shakeHint}>Shake to ask a random question</span>
                {showEnableShake ? (
                  <button
                    type="button"
                    className={styles.enableShakeLink}
                    onClick={() => void handleMotionRequest()}
                  >
                    Enable shake
                  </button>
                ) : null}
                <span className={styles.shakeHintSub}>or pick one</span>
              </div>
              <div className={styles.questionScroll}>
                {displayedQuestions.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    className={styles.questionItem}
                    onClick={() => selectQuestion(q)}
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            </div>
            {feedback ? <div className={styles.feedback}>{feedback}</div> : null}
          </div>
        ) : null}

        {phase === "result" && result ? (
          <>
            <div className={`${styles.resultCardWrap} ${styles.cardEnter}`}>
              <div ref={cardRef}>
                <ShareCard result={result} />
              </div>
            </div>
            <div className={`${styles.resultControls} ${styles.controlsEnter}`}>
              <button type="button" className={styles.primary} onClick={() => void handleShare()} disabled={isSharing}>
                {isSharing ? "Sharing..." : "Share the advice"}
              </button>
              <button type="button" className={styles.secondary} onClick={resetPlay}>
                Ask Ducky again
              </button>
              {feedback ? <div className={styles.feedback}>{feedback}</div> : null}
              <div className={styles.resultShakeHint}>
                <span className={styles.shakeHint}>Shake to ask a random question</span>
                {showEnableShake ? (
                  <button
                    type="button"
                    className={styles.enableShakeLink}
                    onClick={() => void handleMotionRequest()}
                  >
                    Enable shake
                  </button>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
