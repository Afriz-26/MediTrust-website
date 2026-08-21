import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useHealthcare } from '../../context/HealthcareContext';
import { Bell, CheckCircle2, Sparkles, X, ArrowRight, Stethoscope, Pill, TestTube } from 'lucide-react';

interface NotificationBellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProviderToBook?: (providerId: string, providerType: string) => void;
}

export const NotificationBellModal: React.FC<NotificationBellModalProps> = ({ isOpen, onClose, onSelectProviderToBook }) => {
  const { notifications, markNotificationRead } = useHealthcare();

  if (!isOpen) return null;

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
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">MediTrust Notifications</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Notifications */}
          <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No new notifications at this time.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-4 rounded-2xl border transition-all ${
                    notif.read ? 'bg-[#0B1120] border-slate-800 opacity-80' : 'bg-cyan-950/30 border-cyan-500/50 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="flex items-center space-x-1.5 text-xs font-bold text-cyan-400">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{notif.title}</span>
                    </span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    )}
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed mt-1">{notif.message}</p>

                  {notif.consultationFee && (
                    <div className="mt-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                      <span>Consultation Fee: <strong className="text-emerald-400">₹{notif.consultationFee}</strong></span>
                      <span>Next Slots: {notif.availableSlots?.[0] || 'Today'}</span>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-end">
                    <button
                      onClick={() => {
                        onClose();
                        if (onSelectProviderToBook) {
                          onSelectProviderToBook(notif.providerId, notif.providerType);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center space-x-1 shadow-sm"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
