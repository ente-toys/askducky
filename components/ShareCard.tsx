import styles from "./ShareCard.module.css";
import { DuckyDrip } from "@/components/DuckyDrip";
import type { PlayResult } from "@/lib/types";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export function ShareCard({
  result,
}: {
  result: PlayResult;
}) {
  const rgb = hexToRgb(result.accentColor);
  const cardStyle: React.CSSProperties = {
    ["--card-tint" as string]: `linear-gradient(var(--tint-angle, 135deg), transparent 20%, rgba(${rgb}, 0.25) 100%)`,
    ["--tr" as string]: rgb,
  };

  return (
    <div
      className={`${styles.card} ${styles[result.texture] ?? ""}`}
      style={cardStyle}
    >
      <p className={styles.headerTagline}>Privacy advice from a judgmental duck</p>
      <div className={styles.questionWrap}>
        <p className={styles.question}>{result.question.text}</p>
      </div>
      <div className={styles.moodWrap}>
        <DuckyDrip config={result.dripConfig} size={180} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.verdict}>{result.verdict.text}</h3>
        <p className={styles.afterburn}>{result.afterburn}</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <img
            src={`${basePath}/ducky/hero.png`}
            width={25}
            height={25}
            alt=""
            className={styles.footerDucky}
          />
          <span className={styles.footerTitle}>AskDucky.app</span>
        </div>
        <div className={styles.footerRight}>
          <span className={styles.footerMadeWith}>Made with ❤️</span>
          <span className={styles.footerEnte}>ente</span>
        </div>
      </div>
    </div>
  );
}
