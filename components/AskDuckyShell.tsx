"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AskDuckyShell.module.css";
import { ShareCard } from "@/components/ShareCard";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { generatePlayResult, generatePlayResultForQuestion, pickMultipleQuestions } from "@/lib/contentEngine";
import { downloadBlob, exportNodeToPng } from "@/lib/exportImage";
import {
  hapticForShareSuccess,
  hapticForVerdictReveal,
} from "@/lib/haptics";
import { requestMotionPermission, createShakeController } from "@/lib/shake";
import { sharePayload } from "@/lib/share";
import { loadHistory, pushHistory, saveHistory } from "@/lib/storage";
import type { PlayResult, Question } from "@/lib/types";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Phase = "idle" | "result";
type MotionState = "unknown" | "granted" | "denied" | "unsupported";

export function AskDuckyShell() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<PlayResult | null>(null);
  const [motionPermission, setMotionPermission] = useState<MotionState>("unknown");
  const [feedback, setFeedback] = useState("");
  const [imageFallbackMode, setImageFallbackMode] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [displayedQuestions, setDisplayedQuestions] = useState<Question[]>([]);
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

    setDisplayedQuestions(pickMultipleQuestions(3, historyRef.current));

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
          goToResult(generatePlayResult(historyRef.current));
        }
      },
    });

    if (motionPermission === "granted") {
      controller.start();
    }

    return () => controller.stop();
  }, [phase, motionPermission]);

  function goToResult(playResult: PlayResult) {
    resultRef.current = playResult;
    setResult(playResult);

    const nextHistory = pushHistory(
      historyRef.current,
      playResult.question.id,
      playResult.verdict.id,
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
    goToResult(generatePlayResultForQuestion(question, historyRef.current));
  }

  function refreshQuestions() {
    setDisplayedQuestions(pickMultipleQuestions(3, historyRef.current));
  }

  function resetPlay() {
    setPhase("idle");
    setFeedback("");
    setImageFallbackMode(false);
    setDisplayedQuestions(pickMultipleQuestions(3, historyRef.current));
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
            <span className={styles.topbarTitle}>Ask Ducky</span>
          </button>
          <a
            href="https://ente.com/?utm_source=askducky"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.topbarRight}
          >
            <span className={styles.topbarMadeWith}>Made with 💚</span>
            <span className={styles.topbarEnte}>ente</span>
          </a>
        </div>

        {phase === "idle" ? (
          <section className={styles.card}>
            <div className={`${styles.hero} ${styles.phaseEnter}`}>
              <h1 className={styles.title}>Ask Ducky your privacy questions</h1>
              <p className={styles.subtitle}>
                Ducky is judging your privacy choices
              </p>
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
              </div>
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
              <button type="button" className={styles.primary} onClick={refreshQuestions}>
                More questions
              </button>
            </div>
            {feedback ? <div className={styles.feedback}>{feedback}</div> : null}
          </section>
        ) : null}

        {phase === "result" && result ? (
          <>
            <div className={`${styles.resultCardWrap} ${styles.cardEnter}`}>
              <div ref={cardRef}>
                <ShareCard result={result} fallbackMode={imageFallbackMode} />
              </div>
            </div>
            <div className={`${styles.resultControls} ${styles.controlsEnter}`}>
              <button type="button" className={styles.primary} onClick={() => void handleShare()} disabled={isSharing}>
                {isSharing ? "Sharing..." : "Share this"}
              </button>
              <button type="button" className={styles.secondary} onClick={resetPlay}>
                Ask again
              </button>
              {feedback ? <div className={styles.feedback}>{feedback}</div> : null}
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
