export type AccentId = 'cyan' | 'teal' | 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose';

export type ThemeScope = 'site' | 'page';

export const ACCENT_IDS: AccentId[] = ['cyan', 'teal', 'indigo', 'emerald', 'violet', 'amber', 'rose'];

export const DEFAULT_SITE_ACCENT: AccentId = 'teal';

export type PageAccents = Record<string, AccentId>;

export const isAccentId = (value: unknown): value is AccentId =>
  typeof value === 'string' && (ACCENT_IDS as string[]).includes(value);

/** Route key used for page-scoped accents: '/medicines/' and '/medicines' are the same page. */
export function routeKey(pathname: string): string {
  if (!pathname) return '/';
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function resolveAccent(
  siteAccent: AccentId,
  pageAccents: PageAccents,
  pathname: string
): { accent: AccentId; source: ThemeScope } {
  const override = pageAccents[routeKey(pathname)];
  if (isAccentId(override)) {
    return { accent: override, source: 'page' };
  }
  return { accent: siteAccent, source: 'site' };
}

/** Returns a new map. Pass `null` to remove the override for that route. */
export function setPageAccent(pageAccents: PageAccents, pathname: string, accent: AccentId | null): PageAccents {
  const next = { ...pageAccents };
  const key = routeKey(pathname);
  if (accent) {
    next[key] = accent;
  } else {
    delete next[key];
  }
  return next;
}

/** Keeps only known accent ids so stale/corrupt stored values can't break rendering. */
export function sanitizePageAccents(value: unknown): PageAccents {
  if (!value || typeof value !== 'object') return {};
  const result: PageAccents = {};
  Object.entries(value as Record<string, unknown>).forEach(([path, accent]) => {
    if (path.startsWith('/') && isAccentId(accent)) {
      result[routeKey(path)] = accent;
    }
  });
  return result;
}
