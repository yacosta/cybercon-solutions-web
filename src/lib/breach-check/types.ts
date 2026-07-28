export type BreachStatus = 'clear' | 'exposed' | 'elevated';

export interface BreachItem {
  name: string;
  title: string;
  breachDate: string | null;
  dataClasses: string[];
  isVerified: boolean;
  isSensitive: boolean;
}

export interface BreachCheckResult {
  email_masked: string;
  breach_count: number;
  status: BreachStatus;
  status_label: string;
  one_line_summary: string;
  top_finding: string;
  breaches: BreachItem[];
  additional_breach_count: number;
  hibp_checked: boolean;
  sample?: boolean;
}

export interface HibpBreach {
  Name?: string;
  Title?: string;
  Domain?: string;
  BreachDate?: string;
  AddedDate?: string;
  ModifiedDate?: string;
  PwnCount?: number;
  Description?: string;
  DataClasses?: string[];
  IsVerified?: boolean;
  IsFabricated?: boolean;
  IsSensitive?: boolean;
  IsRetired?: boolean;
  IsSpamList?: boolean;
  IsMalware?: boolean;
  IsSubscriptionFree?: boolean;
  LogoPath?: string;
}
