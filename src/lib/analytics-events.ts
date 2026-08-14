/**
 * First-party attribution + conversion helpers (consent-aware).
 * Analytics events fire only when gtag is present (after cookie accept).
 */
export const ATTRIBUTION_STORAGE_KEY = 'cybercon-attribution-v1';

export type AttributionSnapshot = {
  firstLanding?: string;
  lastLanding?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  cta?: string;
  servicePage?: string;
  siteCheckCompleted?: boolean;
  breachCheckCompleted?: boolean;
};

const FUNNEL_EVENTS = [
  'assessment_started',
  'assessment_submitted',
  'assessment_delivery_success',
  'assessment_delivery_failed',
  'meeting_scheduler_opened',
  'meeting_booked',
  'phone_clicked',
  'email_clicked',
  'site_check_started',
  'site_check_completed',
  'breach_check_completed',
  'chat_lead_captured',
] as const;

export type FunnelEvent = (typeof FUNNEL_EVENTS)[number];

export function isFunnelEvent(name: string): name is FunnelEvent {
  return (FUNNEL_EVENTS as readonly string[]).includes(name);
}
