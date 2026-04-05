export type VerdictFamily =
  | "hard_no"
  | "cautious_maybe"
  | "approved"
  | "chaos"
  | "soft_roast";

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

export interface QuestionVerdict {
  family: VerdictFamily;
  text: string;
}

export interface Question {
  id: string;
  categoryId: CategoryId;
  text: string;
  verdicts: [QuestionVerdict, QuestionVerdict, QuestionVerdict];
  afterburns: [string, string, string];
}

export interface Category {
  id: CategoryId;
  name: string;
  weight: number;
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
  verdict: QuestionVerdict;
  afterburn: string;
  caption: ShareCaptionTemplate;
  visualVariant: string;
  dripConfig: DripConfig;
}

export interface DripConfig {
  cap: number | null;
  shoe: number | null;
  shade: number | null;
  acc: number | null;
}

export interface RecentHistory {
  questionIds: string[];
  verdictIds: string[];
  lastResult?: PlayResult;
  motionPermission?: "granted" | "denied" | "unknown" | "unsupported";
}
