import { runtimeEnv } from '../env';

const IP_DAILY_LIMIT = 40;
const GLOBAL_DAILY_LIMIT = 800;

function utcDayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function secondsUntilUtcMidnight(): number {
  const now = new Date();
  const tomorrow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  return Math.max(60, Math.floor((tomorrow - now.getTime()) / 1000));
}

async function readCount(cacheKey: string): Promise<number> {
  try {
    const cache = caches.default;
    const match = await cache.match(new Request(`https://chat-rate.internal/${cacheKey}`));
    if (!match) return 0;
    const text = await match.text();
    const n = Number.parseInt(text, 10);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

async function writeCount(cacheKey: string, value: number): Promise<void> {
  try {
    const cache = caches.default;
    const ttl = secondsUntilUtcMidnight();
    await cache.put(
      new Request(`https://chat-rate.internal/${cacheKey}`),
      new Response(String(value), {
        headers: {
          'content-type': 'text/plain',
          'cache-control': `public, max-age=${ttl}`,
        },
      }),
    );
  } catch (err) {
    console.warn('[chat] rate-limit cache write failed', err);
  }
}

export interface ChatRateLimitDecision {
  allowed: boolean;
  reason?: 'ip' | 'global';
  ipCount: number;
  globalCount: number;
  ipLimit: number;
  globalLimit: number;
}

/** Soft daily caps via Cache API (best-effort on Workers without KV). */
export async function checkChatRateLimits(clientIp: string): Promise<ChatRateLimitDecision> {
  const day = utcDayKey();
  const ipKey = `ip/${day}/${clientIp || 'unknown'}`;
  const globalKey = `global/${day}`;

  const configuredIp = Number.parseInt(runtimeEnv('CHAT_IP_DAILY_LIMIT') ?? '', 10);
  const configuredGlobal = Number.parseInt(runtimeEnv('CHAT_GLOBAL_DAILY_LIMIT') ?? '', 10);
  const ipLimit = Number.isFinite(configuredIp) && configuredIp > 0 ? configuredIp : IP_DAILY_LIMIT;
  const globalLimit =
    Number.isFinite(configuredGlobal) && configuredGlobal > 0 ? configuredGlobal : GLOBAL_DAILY_LIMIT;

  const [ipCount, globalCount] = await Promise.all([readCount(ipKey), readCount(globalKey)]);

  if (globalCount >= globalLimit) {
    return { allowed: false, reason: 'global', ipCount, globalCount, ipLimit, globalLimit };
  }
  if (ipCount >= ipLimit) {
    return { allowed: false, reason: 'ip', ipCount, globalCount, ipLimit, globalLimit };
  }

  return { allowed: true, ipCount, globalCount, ipLimit, globalLimit };
}

export async function incrementChatRateLimits(clientIp: string): Promise<void> {
  const day = utcDayKey();
  const ipKey = `ip/${day}/${clientIp || 'unknown'}`;
  const globalKey = `global/${day}`;
  const [ipCount, globalCount] = await Promise.all([readCount(ipKey), readCount(globalKey)]);
  await Promise.all([writeCount(ipKey, ipCount + 1), writeCount(globalKey, globalCount + 1)]);
}
