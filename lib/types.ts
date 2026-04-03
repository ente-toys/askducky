export type VerdictFamily =
  | "hard_no"
  | "cautious_maybe"
  | "approved"
  | "chaos"
  | "soft_roast";

export type QuestionSeverity = "high" | "medium" | "low";

export type DuckyMood =
  | "smug"
  | "horrified"
  | "side_eye"
  | "impressed"
  | "disappointed"
  | "chaotic"
  | "suspicious"
  | "deeply_tired";

export type CategoryId =
  | "permissions"
  | "ai_apps"
  | "cloud_storage"
  | "photo_sharing"
  | "family_groups"
  | "messaging"
  | "passwords_passkeys"
  | "signups_phone"
  | "public_wifi_travel"
  | "links_backups";

export interface Question {
  id: string;
  categoryId: CategoryId;
  text: string;
  severity: QuestionSeverity;
  tags: string[];
  weight?: number;
  preferredFamilies?: VerdictFamily[];
}

export interface Category {
  id: CategoryId;
  name: string;
  weight: number;
}

export interface VerdictLine {
  id: string;
  family: VerdictFamily;
  text: string;
  categoryIds?: CategoryId[];
}

export interface AfterburnLine {
  id: string;
  text: string;
  categoryIds?: CategoryId[];
}

export interface ShareFooter {
  id: string;
  text: string;
}

export interface ShareCaptionTemplate {
  id: string;
  text: string;
}

export interface DesignTokens {
  colors: {
    bg: string;
    bgElevated: string;
    surface: string;
    surfaceStrong: string;
    text: string;
    muted: string;
    accent: string;
    accentSoft: string;
    warning: string;
  };
  typography: {
    display: string;
    body: string;
    verdictWeight: number;
    questionWeight: number;
  };
  radius: {
    xl: number;
    lg: number;
    md: number;
  };
  shadow: string;
}

export interface PlayResult {
  question: Question;
  verdict: VerdictLine;
  afterburn: AfterburnLine;
  mood: DuckyMood;
  footer: ShareFooter;
  caption: ShareCaptionTemplate;
  visualVariant: string;
}

export interface RecentHistory {
  questionIds: string[];
  verdictIds: string[];
  lastResult?: PlayResult;
  motionPermission?: "granted" | "denied" | "unknown" | "unsupported";
}
