export const CHAT_AGENT_IDS = ['sophia', 'luci', 'gabriella', 'angel'] as const;

export type ChatAgentId = (typeof CHAT_AGENT_IDS)[number];

export type ChatAgentGender = 'f' | 'm';

export type ChatAgent = {
  id: ChatAgentId;
  name: string;
  gender: ChatAgentGender;
  avatar160Jpg: string;
  avatar160Webp: string;
  avatar320Webp: string;
};

export const CHAT_AGENTS: readonly ChatAgent[] = [
  {
    id: 'sophia',
    name: 'Sophia',
    gender: 'f',
    avatar160Jpg: '/images/sophia-avatar-160.jpg',
    avatar160Webp: '/images/sophia-avatar-160.webp',
    avatar320Webp: '/images/sophia-avatar.webp',
  },
  {
    id: 'luci',
    name: 'Luci',
    gender: 'f',
    // Exact user upload (also mirrored as luci-avatar.jpg)
    avatar160Jpg: '/images/luci-source.jpg',
    avatar160Webp: '/images/luci-avatar-160.webp',
    avatar320Webp: '/images/luci-avatar.webp',
  },
  {
    id: 'gabriella',
    name: 'Gabriella',
    gender: 'f',
    // Exact user upload (also mirrored as gabriella-avatar.jpg)
    avatar160Jpg: '/images/gabriella-source.jpg',
    avatar160Webp: '/images/gabriella-avatar-160.webp',
    avatar320Webp: '/images/gabriella-avatar.webp',
  },
  {
    id: 'angel',
    name: 'Angel',
    gender: 'm',
    avatar160Jpg: '/images/angel-avatar-160.jpg',
    avatar160Webp: '/images/angel-avatar-160.webp',
    avatar320Webp: '/images/angel-avatar.webp',
  },
] as const;

const byId = Object.fromEntries(CHAT_AGENTS.map((a) => [a.id, a])) as Record<ChatAgentId, ChatAgent>;

export function isChatAgentId(value: unknown): value is ChatAgentId {
  return typeof value === 'string' && (CHAT_AGENT_IDS as readonly string[]).includes(value);
}

export function normalizeChatAgentId(value?: string | null): ChatAgentId {
  return isChatAgentId(value) ? value : 'sophia';
}

export function getChatAgent(id?: string | null): ChatAgent {
  return byId[normalizeChatAgentId(id)];
}

/** Pick a random guide; prefer a fresh one when `excludeId` is the current session pick. */
export function pickRandomChatAgent(excludeId?: string | null): ChatAgent {
  const pool = excludeId
    ? CHAT_AGENTS.filter((a) => a.id !== excludeId)
    : [...CHAT_AGENTS];
  const list = pool.length > 0 ? pool : [...CHAT_AGENTS];
  return list[Math.floor(Math.random() * list.length)]!;
}
