import type { DesignTokens } from "@/lib/types";

export const brandTokens: DesignTokens = {
  colors: {
    bg: "#f7f5f0",
    bgElevated: "#ffffff",
    surface: "#f0ede6",
    surfaceStrong: "#e8e5de",
    text: "#1c1c1c",
    muted: "#6b6966",
    accent: "#08C225",
    accentSoft: "rgba(8, 194, 37, 0.10)",
    warning: "#d08a11",
  },
  typography: {
    display: "\"Inter\", \"Segoe UI\", sans-serif",
    body: "\"Inter\", \"Segoe UI\", sans-serif",
    verdictWeight: 800,
    questionWeight: 600,
  },
  radius: {
    xl: 24,
    lg: 16,
    md: 12,
  },
  shadow: "none",
};
