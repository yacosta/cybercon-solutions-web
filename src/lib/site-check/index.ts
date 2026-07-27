export { normalizeDomain } from './normalize';
export { fetchLiveEvidence } from './live-fetch';
export { fetchBuiltWith } from './builtwith';
export { synthesizeWithAi, siteCheckAiConfigured, siteCheckAiStatus } from './synthesize';
export { heuristicResult } from './heuristic';
export { captureSiteCheckLead } from './lead';
export { checkRateLimits, incrementRateLimits } from './rate-limit';
export { SAMPLE_RESULT, getSampleResult } from './sample';
export type {
  SiteCheckResult,
  ScanLogEntry,
  CategoryResult,
  LetterGrade,
  CategoryGrade,
  SiteCheckLocale,
} from './types';
export type { AiProvider } from './synthesize';
