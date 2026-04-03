import styles from "./ShareCard.module.css";
import { DuckyDrip } from "@/components/DuckyDrip";
import type { PlayResult } from "@/lib/types";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function ShareCard({
  result,
  fallbackMode = false,
}: {
  result: PlayResult;
  fallbackMode?: boolean;
}) {
  return (
    <div className={`${styles.card} ${styles[result.visualVariant] ?? ""}`}>
      <div className={styles.header}>
        <span className={styles.label}>Ask Ducky</span>
      </div>
      <div className={styles.questionWrap}>
        <p className={styles.question}>{result.question.text}</p>
      </div>
      <div className={styles.moodWrap}>
        <DuckyDrip config={result.dripConfig} size={140} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.verdict}>{result.verdict.text}</h3>
        <p className={styles.afterburn}>
          {result.afterburn.text}
          {fallbackMode ? " Plain fallback active." : ""}
        </p>
      </div>
      <div className={styles.divider} />
      <div className={styles.footer}>
        <span className={styles.tagline}>Ducky is judging your privacy choices</span>
        <div className={styles.footerBrand}>
          <img
            src={`${basePath}/ducky/hero.png`}
            width={24}
            height={24}
            alt=""
            className={styles.footerDucky}
          />
          <span className={styles.footerName}>AskDucky.app</span>
        </div>
      </div>
    </div>
  );
}
