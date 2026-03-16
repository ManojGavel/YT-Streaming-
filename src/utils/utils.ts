/**
 * Extract a YouTube video ID from various URL formats.
 */
export function extractVideoId(url: string): string | null {
  // Already a plain ID (11 chars alphanumeric / dash / underscore)
  if (/^[\w-]{11}$/.test(url)) return url;

  try {
    const u = new URL(url);
    // youtu.be/<ID>
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('/')[0] || null;
    // youtube.com/watch?v=<ID>
    const v = u.searchParams.get('v');
    if (v) return v;
    // youtube.com/embed/<ID> or youtube.com/live/<ID>
    const match = u.pathname.match(/\/(embed|live|v)\/([\w-]{11})/);
    if (match) return match[2];
  } catch {
    // not a URL
  }
  return null;
}

/**
 * Format current date-time in surveillance-style format.
 */
export function formatSurveillanceTime(date: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/**
 * Generate a unique id.
 */
export function uid(): string {
  return `stream-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
