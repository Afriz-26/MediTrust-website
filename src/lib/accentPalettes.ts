import type { AccentId } from './themeScope';

export interface SiteAccentPalette {
  /** Deep tone used for text and solid fills on the light clinical canvas. */
  primary: string;
  /** Brighter tone for hover states and small accents. */
  strong: string;
  /** Soft wash for tinted panels. */
  soft: string;
  /** Slightly deeper wash for borders and tags. */
  tint: string;
  /** Homepage hero roles: the hero keeps its own art direction per accent. */
  heroPrimary: string;
  heroStrong: string;
  heroSoft: string;
}

/**
 * Light-surface palettes for each accent. These are the values actually applied to
 * the site through CSS variables, so they must stay readable on the warm-white canvas.
 */
export const SITE_PALETTES: Record<AccentId, SiteAccentPalette> = {
  teal: {
    primary: '#0E6763', strong: '#2B9A91', soft: '#EAF5F1', tint: '#DCEFEA',
    heroPrimary: '#247BA0', heroStrong: '#1C6584', heroSoft: '#4A9B8A',
  },
  cyan: {
    primary: '#0E7490', strong: '#0891B2', soft: '#E7F6FA', tint: '#CBEAF2',
    heroPrimary: '#0E7490', heroStrong: '#0891B2', heroSoft: '#0891B2',
  },
  indigo: {
    primary: '#4338CA', strong: '#6366F1', soft: '#EEF0FE', tint: '#DDE2FC',
    heroPrimary: '#4338CA', heroStrong: '#6366F1', heroSoft: '#6366F1',
  },
  emerald: {
    primary: '#047857', strong: '#10B981', soft: '#E9F8F1', tint: '#CFEFE0',
    heroPrimary: '#047857', heroStrong: '#10B981', heroSoft: '#10B981',
  },
  violet: {
    primary: '#6D28D9', strong: '#8B5CF6', soft: '#F3EEFE', tint: '#E4D9FB',
    heroPrimary: '#6D28D9', heroStrong: '#8B5CF6', heroSoft: '#8B5CF6',
  },
  amber: {
    primary: '#B45309', strong: '#D97706', soft: '#FDF3E3', tint: '#FAE4C4',
    heroPrimary: '#B45309', heroStrong: '#D97706', heroSoft: '#D97706',
  },
  rose: {
    primary: '#BE123C', strong: '#E11D48', soft: '#FDEBEF', tint: '#FBD5DD',
    heroPrimary: '#BE123C', heroStrong: '#E11D48', heroSoft: '#E11D48',
  },
};

export const hexToRgba = (hex: string, alpha: number): string => {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const value = Number.parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
