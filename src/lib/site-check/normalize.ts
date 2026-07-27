/** Normalize a visitor-entered domain to host-only form (no protocol/www/path). */
export function normalizeDomain(input: string): string | null {
  let raw = input.trim().toLowerCase();
  if (!raw || raw === 'admin') return null;

  raw = raw.replace(/^https?:\/\//, '');
  raw = raw.split(/[/?#]/)[0] ?? '';
  raw = raw.replace(/:\d+$/, '');
  raw = raw.replace(/^www\./, '');

  if (!raw || raw.length > 253) return null;
  if (raw.includes(' ') || raw.includes('..')) return null;
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(raw)) {
    return null;
  }

  return raw;
}
