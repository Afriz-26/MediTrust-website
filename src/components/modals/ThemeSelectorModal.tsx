import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme, AccentOption, ACCENT_OPTIONS } from '../../context/ThemeContext';
import { Palette, Check, X, Sparkles, RefreshCw, Activity, ShieldCheck, Stethoscope, HeartHandshake } from 'lucide-react';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({ isOpen, onClose }) => {
  const { accent, setAccent, activeTheme, resetTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div 
                className="p-3 rounded-2xl border transition-colors"
                style={{ 
                  backgroundColor: activeTheme.cssVars.bgSubtle, 
                  borderColor: activeTheme.cssVars.border,
                  color: activeTheme.cssVars.light 
                }}
              >
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Interface Theme Accent</span>
                  <span 
                    className="text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold border"
                    style={{ 
                      backgroundColor: activeTheme.cssVars.bgSubtle, 
                      borderColor: activeTheme.cssVars.border,
                      color: activeTheme.cssVars.light 
                    }}
                  >
                    {activeTheme.name}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select your preferred highlight accent color while preserving the dark background.
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2.5 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Color Palette Grid */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex justify-between items-center">
              <span>Choose Accent Color</span>
              <span className="text-[11px] text-slate-500">{ACCENT_OPTIONS.length} Presets Available</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {ACCENT_OPTIONS.map((theme) => {
                const isSelected = accent === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setAccent(theme.id)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all relative group ${
                      isSelected
                        ? 'bg-slate-900 shadow-lg scale-[1.02]'
                        : 'bg-[#0B1120] border-slate-800 hover:border-slate-700'
                    }`}
                    style={{
                      borderColor: isSelected ? theme.hex : undefined,
                      boxShadow: isSelected ? `0 0 15px ${theme.cssVars.glow}` : undefined,
                    }}
                  >
                    {/* Color Swatch Circle */}
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-white/20"
                          style={{ backgroundColor: theme.hex }}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </div>
                        <span className="font-semibold text-sm text-white">{theme.name}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 leading-tight">
                      {theme.tagline}
                    </div>

                    {/* Highlight Bar */}
                    <div 
                      className="w-full h-1 rounded-full mt-3 transition-opacity"
                      style={{ 
                        backgroundColor: theme.hex,
                        opacity: isSelected ? 1 : 0.3 
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: activeTheme.cssVars.light }} />
                <span>Live Interface Preview</span>
              </span>
              <span className="text-[11px] text-slate-500">Real-time styling response</span>
            </div>

            {/* Sample Component */}
            <div 
              className="p-4 rounded-xl border transition-all"
              style={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                borderColor: activeTheme.cssVars.border,
                boxShadow: `0 4px 20px ${activeTheme.cssVars.glow}`
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-2.5 rounded-xl border"
                    style={{ 
                      backgroundColor: activeTheme.cssVars.bgSubtle, 
                      borderColor: activeTheme.cssVars.border,
                      color: activeTheme.cssVars.light
                    }}
                  >
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Dr. Ananya Sharma</div>
                    <div className="text-xs text-slate-400">Cardiology Specialist • Apollo Hospitals</div>
                  </div>
                </div>

                <span 
                  className="px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1"
                  style={{ 
                    backgroundColor: activeTheme.cssVars.bgSubtle, 
                    borderColor: activeTheme.cssVars.border,
                    color: activeTheme.cssVars.light 
                  }}
                >
                  <Activity className="w-3 h-3" />
                  <span>Available Today</span>
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4" style={{ color: activeTheme.cssVars.light }} />
                  <span>Verified Practitioner</span>
                </div>

                <button
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md"
                  style={{ 
                    backgroundColor: activeTheme.cssVars.primary,
                    boxShadow: `0 2px 10px ${activeTheme.cssVars.glow}` 
                  }}
                >
                  Book OPD Token
                </button>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              onClick={resetTheme}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Cyan</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-lg"
              style={{ 
                backgroundColor: activeTheme.cssVars.primary,
                boxShadow: `0 4px 15px ${activeTheme.cssVars.glow}`
              }}
            >
              Done & Apply
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
