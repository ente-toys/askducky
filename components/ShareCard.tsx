import styles from "./ShareCard.module.css";
import { DuckyMood } from "@/components/DuckyMood";
import type { PlayResult } from "@/lib/types";

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
        <DuckyMood mood={result.mood} />
      </div>
      <div className={styles.content}>
        <p className={styles.question}>{result.question.text}</p>
        <h3 className={styles.verdict}>{result.verdict.text}</h3>
        <p className={styles.afterburn}>
          {result.afterburn.text}
          {fallbackMode ? " Plain fallback active." : ""}
        </p>
      </div>
      <div className={styles.footer}>
        <span className={styles.label}>{result.footer.text}</span>
        <span className={styles.url}>askducky.app</span>
      </div>
    </div>
  );
}
