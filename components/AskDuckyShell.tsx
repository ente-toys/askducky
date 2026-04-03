"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AskDuckyShell.module.css";
import { ShareCard } from "@/components/ShareCard";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { generatePlayResult, generatePlayResultForQuestion, pickMultipleQuestions } from "@/lib/contentEngine";
import { downloadBlob, exportNodeToPng } from "@/lib/exportImage";
import {
  hapticForQuestionReveal,
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

const bgThemes = [
  { blob1: "rgba(8, 194, 37, 0.38)", blob2: "rgba(255, 202, 114, 0.28)", blob3: "rgba(8, 194, 37, 0.26)", blob4: "rgba(8, 194, 37, 0.12)" },         // emerald
  { blob1: "rgba(0, 220, 200, 0.38)", blob2: "rgba(170, 80, 250, 0.28)", blob3: "rgba(60, 210, 230, 0.26)", blob4: "rgba(100, 60, 220, 0.12)" },     // aurora
  { blob1: "rgba(255, 120, 40, 0.38)", blob2: "rgba(250, 60, 140, 0.28)", blob3: "rgba(255, 170, 50, 0.26)", blob4: "rgba(240, 80, 100, 0.12)" },    // sunset
  { blob1: "rgba(20, 130, 255, 0.38)", blob2: "rgba(0, 220, 240, 0.28)", blob3: "rgba(50, 110, 255, 0.26)", blob4: "rgba(0, 180, 220, 0.12)" },      // ocean
  { blob1: "rgba(30, 255, 80, 0.42)", blob2: "rgba(250, 40, 210, 0.28)", blob3: "rgba(50, 255, 100, 0.24)", blob4: "rgba(200, 40, 180, 0.12)" },     // neon
  { blob1: "rgba(255, 190, 40, 0.38)", blob2: "rgba(255, 225, 110, 0.26)", blob3: "rgba(250, 175, 30, 0.26)", blob4: "rgba(255, 200, 80, 0.12)" },   // golden
  { blob1: "rgba(160, 60, 250, 0.38)", blob2: "rgba(60, 120, 255, 0.28)", blob3: "rgba(230, 60, 210, 0.26)", blob4: "rgba(100, 80, 240, 0.12)" },    // cosmic
];

function applyBgTheme(theme: typeof bgThemes[number]) {
  const root = document.documentElement;
  root.style.setProperty("--blob-1", theme.blob1);
  root.style.setProperty("--blob-2", theme.blob2);
  root.style.setProperty("--blob-3", theme.blob3);
  root.style.setProperty("--blob-4", theme.blob4);
}

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
    applyBgTheme(bgThemes[Math.floor(Math.random() * bgThemes.length)]);
  }, []);

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
    hapticForQuestionReveal();
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
    applyBgTheme(bgThemes[Math.floor(Math.random() * bgThemes.length)]);
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
