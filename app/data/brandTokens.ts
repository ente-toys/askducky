import type { DesignTokens } from "@/lib/types";

export const brandTokens: DesignTokens = {
  colors: {
    bg: "#07110b",
    bgElevated: "rgba(14, 25, 17, 0.88)",
    surface: "rgba(16, 30, 20, 0.78)",
    surfaceStrong: "rgba(22, 40, 28, 0.92)",
    text: "#f4fff5",
    muted: "#a9c8b2",
    accent: "#08C225",
    accentSoft: "rgba(8, 194, 37, 0.16)",
    warning: "#ffca72",
  },
  typography: {
    display: "\"Avenir Next\", \"Segoe UI\", sans-serif",
    body: "\"Inter\", \"Segoe UI\", sans-serif",
    verdictWeight: 800,
    questionWeight: 600,
  },
  radius: {
    xl: 28,
    lg: 22,
    md: 16,
  },
  shadow: "0 24px 80px rgba(0, 0, 0, 0.42)",
};
