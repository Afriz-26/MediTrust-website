import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AccentId,
  ThemeScope,
  PageAccents,
  DEFAULT_SITE_ACCENT,
  isAccentId,
  resolveAccent,
  routeKey,
  sanitizePageAccents,
  setPageAccent as withPageAccent,
} from '../lib/themeScope';
import { SITE_PALETTES, hexToRgba } from '../lib/accentPalettes';

export type { AccentId, ThemeScope };

const SITE_ACCENT_KEY = 'meditrust_theme_accent';
const PAGE_ACCENTS_KEY = 'meditrust_theme_page_accents';

export interface ThemeClasses {
  text: string;
  textHover: string;
  bg: string;
  bgHover: string;
  bgSubtle: string;
  border: string;
  borderActive: string;
  badge: string;
  gradient: string;
  ring: string;
}

export interface AccentOption {
  id: AccentId;
  name: string;
  tagline: string;
  hex: string;
  lightHex: string;
  cssVars: {
    primary: string;
    hover: string;
    light: string;
    bgSubtle: string;
    border: string;
    glow: string;
  };
  classes: ThemeClasses;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  {
    id: 'cyan',
    name: 'Cyan',
    tagline: 'Futuristic Healthcare',
    hex: '#06b6d4',
    lightHex: '#22d3ee',
    cssVars: {
      primary: '#06b6d4',
      hover: '#0891b2',
      light: '#22d3ee',
      bgSubtle: 'rgba(6, 182, 212, 0.12)',
      border: 'rgba(6, 182, 212, 0.35)',
      glow: 'rgba(6, 182, 212, 0.3)',
    },
    classes: {
      text: 'text-cyan-400',
      textHover: 'hover:text-cyan-300',
      bg: 'bg-cyan-600',
      bgHover: 'hover:bg-cyan-500',
      bgSubtle: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      borderActive: 'border-cyan-400',
      badge: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
      gradient: 'from-cyan-600 to-blue-600',
      ring: 'focus:ring-cyan-500',
    },
  },
  {
    id: 'teal',
    name: 'Teal',
    tagline: 'Clinical & Refreshing',
    hex: '#0d9488',
    lightHex: '#2dd4bf',
    cssVars: {
      primary: '#0d9488',
      hover: '#0f766e',
      light: '#2dd4bf',
      bgSubtle: 'rgba(20, 184, 166, 0.12)',
      border: 'rgba(20, 184, 166, 0.35)',
      glow: 'rgba(20, 184, 166, 0.3)',
    },
    classes: {
      text: 'text-teal-400',
      textHover: 'hover:text-teal-300',
      bg: 'bg-teal-600',
      bgHover: 'hover:bg-teal-500',
      bgSubtle: 'bg-teal-500/10',
      border: 'border-teal-500/30',
      borderActive: 'border-teal-400',
      badge: 'bg-teal-500/15 border-teal-500/30 text-teal-300',
      gradient: 'from-teal-600 to-emerald-600',
      ring: 'focus:ring-teal-500',
    },
  },
  {
    id: 'indigo',
    name: 'Indigo',
    tagline: 'Executive & Modern',
    hex: '#6366f1',
    lightHex: '#818cf8',
    cssVars: {
      primary: '#6366f1',
      hover: '#4f46e5',
      light: '#818cf8',
      bgSubtle: 'rgba(99, 102, 241, 0.12)',
      border: 'rgba(99, 102, 241, 0.35)',
      glow: 'rgba(99, 102, 241, 0.3)',
    },
    classes: {
      text: 'text-indigo-400',
      textHover: 'hover:text-indigo-300',
      bg: 'bg-indigo-600',
      bgHover: 'hover:bg-indigo-500',
      bgSubtle: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      borderActive: 'border-indigo-400',
      badge: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
      gradient: 'from-indigo-600 to-blue-600',
      ring: 'focus:ring-indigo-500',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald',
    tagline: 'Vitalizing & Healing',
    hex: '#10b981',
    lightHex: '#34d399',
    cssVars: {
      primary: '#10b981',
      hover: '#059669',
      light: '#34d399',
      bgSubtle: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.35)',
      glow: 'rgba(16, 185, 129, 0.3)',
    },
    classes: {
      text: 'text-emerald-400',
      textHover: 'hover:text-emerald-300',
      bg: 'bg-emerald-600',
      bgHover: 'hover:bg-emerald-500',
      bgSubtle: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      borderActive: 'border-emerald-400',
      badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      gradient: 'from-emerald-600 to-teal-600',
      ring: 'focus:ring-emerald-500',
    },
  },
  {
    id: 'violet',
    name: 'Violet',
    tagline: 'Royal & Premium',
    hex: '#8b5cf6',
    lightHex: '#a78bfa',
    cssVars: {
      primary: '#8b5cf6',
      hover: '#7c3aed',
      light: '#a78bfa',
      bgSubtle: 'rgba(139, 92, 246, 0.12)',
      border: 'rgba(139, 92, 246, 0.35)',
      glow: 'rgba(139, 92, 246, 0.3)',
    },
    classes: {
      text: 'text-violet-400',
      textHover: 'hover:text-violet-300',
      bg: 'bg-violet-600',
      bgHover: 'hover:bg-violet-500',
      bgSubtle: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      borderActive: 'border-violet-400',
      badge: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
      gradient: 'from-violet-600 to-purple-600',
      ring: 'focus:ring-violet-500',
    },
  },
  {
    id: 'amber',
    name: 'Amber',
    tagline: 'Warm & Radiant',
    hex: '#f59e0b',
    lightHex: '#fbbf24',
    cssVars: {
      primary: '#f59e0b',
      hover: '#d97706',
      light: '#fbbf24',
      bgSubtle: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.35)',
      glow: 'rgba(245, 158, 11, 0.3)',
    },
    classes: {
      text: 'text-amber-400',
      textHover: 'hover:text-amber-300',
      bg: 'bg-amber-600',
      bgHover: 'hover:bg-amber-500',
      bgSubtle: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      borderActive: 'border-amber-400',
      badge: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      gradient: 'from-amber-600 to-orange-600',
      ring: 'focus:ring-amber-500',
    },
  },
  {
    id: 'rose',
    name: 'Rose',
    tagline: 'Bold & Energetic',
    hex: '#f43f5e',
    lightHex: '#fb7185',
    cssVars: {
      primary: '#f43f5e',
      hover: '#e11d48',
      light: '#fb7185',
      bgSubtle: 'rgba(244, 63, 94, 0.12)',
      border: 'rgba(244, 63, 94, 0.35)',
      glow: 'rgba(244, 63, 94, 0.3)',
    },
    classes: {
      text: 'text-rose-400',
      textHover: 'hover:text-rose-300',
      bg: 'bg-rose-600',
      bgHover: 'hover:bg-rose-500',
      bgSubtle: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      borderActive: 'border-rose-400',
      badge: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
      gradient: 'from-rose-600 to-pink-600',
      ring: 'focus:ring-rose-500',
    },
  },
];

interface ThemeContextType {
  /** Accent currently in effect for the page being viewed. */
  accent: AccentId;
  /** Where the effective accent comes from: a page override or the site-wide choice. */
  accentSource: ThemeScope;
  /** Site-wide accent, used by pages without an override. */
  siteAccent: AccentId;
  /** Accent saved for this page only, or null when the page inherits the site accent. */
  pageAccent: AccentId | null;
  /** Scope selected in the theme panel. */
  scope: ThemeScope;
  setScope: (scope: ThemeScope) => void;
  setAccent: (accentId: AccentId, scope?: ThemeScope) => void;
  clearPageAccent: () => void;
  activeTheme: AccentOption;
  accentOptions: AccentOption[];
  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;
  resetTheme: (scope?: ThemeScope) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const readPageAccents = (): PageAccents => {
  try {
    return sanitizePageAccents(JSON.parse(localStorage.getItem(PAGE_ACCENTS_KEY) || '{}'));
  } catch {
    return {};
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const currentRoute = routeKey(pathname);

  const [siteAccent, setSiteAccentState] = useState<AccentId>(() => {
    const saved = localStorage.getItem(SITE_ACCENT_KEY);
    return isAccentId(saved) ? saved : DEFAULT_SITE_ACCENT;
  });
  const [pageAccents, setPageAccentsState] = useState<PageAccents>(readPageAccents);
  const [scope, setScope] = useState<ThemeScope>('site');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const { accent, source: accentSource } = resolveAccent(siteAccent, pageAccents, currentRoute);
  const pageAccent = pageAccents[currentRoute] ?? null;
  const activeTheme = ACCENT_OPTIONS.find(a => a.id === accent) || ACCENT_OPTIONS[0];
  const palette = SITE_PALETTES[accent];

  useEffect(() => {
    // Apply the accent tokens on the root element so every themed utility follows.
    const root = document.documentElement;
    root.setAttribute('data-accent', activeTheme.id);
    root.setAttribute('data-accent-scope', accentSource);
    root.style.setProperty('--accent-primary', palette.primary);
    root.style.setProperty('--accent-strong', palette.strong);
    root.style.setProperty('--accent-soft', palette.soft);
    root.style.setProperty('--accent-tint', palette.tint);
    root.style.setProperty('--accent-border', hexToRgba(palette.primary, 0.5));
    root.style.setProperty('--accent-glow', hexToRgba(palette.primary, 0.3));
    root.style.setProperty('--accent-hero-primary', palette.heroPrimary);
    root.style.setProperty('--accent-hero-strong', palette.heroStrong);
    root.style.setProperty('--accent-hero-soft', palette.heroSoft);
    // Legacy names kept for anything still reading them.
    root.style.setProperty('--color-accent-primary', activeTheme.cssVars.primary);
    root.style.setProperty('--color-accent-light', activeTheme.cssVars.light);
    root.style.setProperty('--color-accent-bg-subtle', activeTheme.cssVars.bgSubtle);
    root.style.setProperty('--color-accent-border', activeTheme.cssVars.border);
    root.style.setProperty('--color-accent-glow', activeTheme.cssVars.glow);
  }, [activeTheme, palette, accentSource]);

  const persistPageAccents = (next: PageAccents) => {
    setPageAccentsState(next);
    try {
      localStorage.setItem(PAGE_ACCENTS_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep the in-memory choice */
    }
  };

  const setAccent = (accentId: AccentId, targetScope: ThemeScope = scope) => {
    if (targetScope === 'page') {
      persistPageAccents(withPageAccent(pageAccents, currentRoute, accentId));
      return;
    }
    setSiteAccentState(accentId);
    try {
      localStorage.setItem(SITE_ACCENT_KEY, accentId);
    } catch {
      /* storage unavailable — keep the in-memory choice */
    }
    // A site-wide choice must win on the page the user is looking at.
    if (pageAccents[currentRoute]) {
      persistPageAccents(withPageAccent(pageAccents, currentRoute, null));
    }
  };

  const clearPageAccent = () => {
    if (pageAccents[currentRoute]) {
      persistPageAccents(withPageAccent(pageAccents, currentRoute, null));
    }
  };

  const resetTheme = (targetScope: ThemeScope = scope) => {
    if (targetScope === 'page') {
      clearPageAccent();
      return;
    }
    setAccent(DEFAULT_SITE_ACCENT, 'site');
  };

  return (
    <ThemeContext.Provider
      value={{
        accent,
        accentSource,
        siteAccent,
        pageAccent,
        scope,
        setScope,
        setAccent,
        clearPageAccent,
        activeTheme,
        accentOptions: ACCENT_OPTIONS,
        isThemeModalOpen,
        setIsThemeModalOpen,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
