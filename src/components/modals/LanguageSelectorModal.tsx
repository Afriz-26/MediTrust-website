import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../../context/LanguageContext';
import { Globe, Check, X } from 'lucide-react';
import { SupportedLanguage } from '../../types';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useLanguage();

  if (!isOpen) return null;

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-[#111827] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">{t('selectLanguage', 'Select Preferred Language')}</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Choose your preferred language for MediTrust discovery, booking, prescriptions, and status alerts across India.
          </p>

          <div className="grid grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const selected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    selected
                      ? 'bg-cyan-500/20 border-cyan-500 text-white font-bold shadow-md'
                      : 'bg-[#0B1120] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold">{lang.name}</div>
                    <div className="text-xs text-cyan-400 font-medium">{lang.nativeName}</div>
                  </div>
                  {selected && <Check className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
