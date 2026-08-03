/**
 * Shared consent keys for the ePrivacy/GDPR cookie banner.
 * Non-essential tools (analytics / Apollo / Zaraz purposes) load only after "accept".
 */
export const CONSENT_STORAGE_KEY = 'cybercon-consent-v1';
export const CONSENT_COOKIE_NAME = 'cybercon_consent';
/** 1 year — preference is strictly necessary for remembering the choice. */
export const CONSENT_MAX_AGE_SEC = 60 * 60 * 24 * 365;

export type ConsentValue = 'accept' | 'decline';
