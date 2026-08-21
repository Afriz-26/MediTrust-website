import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentId = 'cyan' | 'teal' | 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose';

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
  accent: AccentId;
  setAccent: (accentId: AccentId) => void;
  activeTheme: AccentOption;
  accentOptions: AccentOption[];
  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accent, setAccentState] = useState<AccentId>(() => {
    const saved = localStorage.getItem('meditrust_theme_accent') as AccentId;
    return ACCENT_OPTIONS.some(a => a.id === saved) ? saved : 'cyan';
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const activeTheme = ACCENT_OPTIONS.find(a => a.id === accent) || ACCENT_OPTIONS[0];

  useEffect(() => {
    // Apply CSS variables on root document element
    const root = document.documentElement;
    root.setAttribute('data-accent', activeTheme.id);
    root.style.setProperty('--color-accent-primary', activeTheme.cssVars.primary);
    root.style.setProperty('--color-accent-hover', activeTheme.cssVars.hover);
    root.style.setProperty('--color-accent-light', activeTheme.cssVars.light);
    root.style.setProperty('--color-accent-bg-subtle', activeTheme.cssVars.bgSubtle);
    root.style.setProperty('--color-accent-border', activeTheme.cssVars.border);
    root.style.setProperty('--color-accent-glow', activeTheme.cssVars.glow);
  }, [activeTheme]);

  const setAccent = (accentId: AccentId) => {
    setAccentState(accentId);
    localStorage.setItem('meditrust_theme_accent', accentId);
  };

  const resetTheme = () => {
    setAccent('cyan');
  };

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent,
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
