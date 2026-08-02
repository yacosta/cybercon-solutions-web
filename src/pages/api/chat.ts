import type { APIRoute } from 'astro';
import {
  captureChatLead,
  checkChatRateLimits,
  extractEmail,
  generateChatReply,
  incrementChatRateLimits,
  normalizeChatAgentId,
  normalizeChatLocale,
  sanitizeMessages,
  shouldAskEmail,
} from '../../lib/chat';
import { verifyTurnstile } from '../../lib/turnstile-verify';
import { runtimeEnv } from '../../lib/env';

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: {
    messages?: unknown;
    locale?: string;
    agentId?: string;
    email?: string;
    name?: string;
    turnstileToken?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const locale = normalizeChatLocale(body.locale);
  const agentId = normalizeChatAgentId(body.agentId);
  const messages = sanitizeMessages(body.messages);
  if (messages.length === 0 || messages[messages.length - 1]?.role !== 'user') {
    return Response.json({ error: 'Send at least one user message' }, { status: 400 });
  }

  const secret = runtimeEnv('TURNSTILE_SECRET_KEY');
  if (secret) {
    const token = body.turnstileToken?.trim() ?? '';
    // Soft gate: only require Turnstile when the widget token is present or after several turns.
    // First message without a token is allowed so the launcher stays frictionless; bots still hit rate limits.
    const userTurns = messages.filter((m) => m.role === 'user').length;
    if (userTurns >= 3 && !token) {
      return Response.json({ error: 'Turnstile verification required' }, { status: 400 });
    }
    if (token) {
      const ok = await verifyTurnstile(token, clientAddress);
      if (!ok) {
        return Response.json({ error: 'Turnstile verification failed' }, { status: 400 });
      }
    }
  }

  const limits = await checkChatRateLimits(clientAddress || 'unknown');
  if (!limits.allowed) {
    const reply =
      locale === 'es'
        ? 'Llegaste al límite de chat de hoy. Agenda la evaluación gratuita o usa el formulario de contacto — nuestro equipo te atiende.'
        : 'You’ve reached today’s chat limit. Book the free assessment or use the contact form — a real engineer will help.';
    return Response.json({
      ok: true,
      reply,
      ctas:
        locale === 'es'
          ? [
              { id: 'assessment', label: 'Reservar evaluación gratuita', href: '/es/assessment/' },
              { id: 'contact', label: 'Contactar', href: '/es/contact/' },
            ]
          : [
              { id: 'assessment', label: 'Book free assessment', href: '/assessment/' },
              { id: 'contact', label: 'Contact us', href: '/contact/' },
            ],
      askEmail: false,
      leadCaptured: false,
      limited: true,
      reason: limits.reason,
    });
  }

  const knownEmail =
    extractEmail(body.email) ||
    extractEmail(...messages.map((m) => m.content));

  const result = await generateChatReply(locale, messages, agentId);
  await incrementChatRateLimits(clientAddress || 'unknown');

  let leadCaptured = false;
  if (knownEmail) {
    const transcript = messages
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`)
      .concat([`Assistant: ${result.reply}`])
      .join('\n');
    leadCaptured = await captureChatLead({
      email: knownEmail,
      name: typeof body.name === 'string' ? body.name : undefined,
      locale,
      transcript,
      clientIp: clientAddress,
    });
  }

  return Response.json({
    ok: true,
    reply: result.reply,
    ctas: result.ctas,
    askEmail: shouldAskEmail(messages, knownEmail),
    leadCaptured,
    provider: result.provider,
  });
};
