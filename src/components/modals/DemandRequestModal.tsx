import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useHealthcare } from '../../context/HealthcareContext';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { Stethoscope, Pill, TestTube, Building2, Calendar, Clock, Sparkles, CheckCircle2, X, MessageSquare, Video, PhoneCall, UserCheck } from 'lucide-react';

interface DemandRequestModalProps {
  provider: {
    id: string;
    name: string;
    type: 'Doctor' | 'Hospital' | 'Pharmacy' | 'Laboratory';
    city?: string;
    area?: string;
    specialty?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const DemandRequestModal: React.FC<DemandRequestModalProps> = ({ provider, isOpen, onClose }) => {
  const { submitProviderRequest } = useHealthcare();
  const { location } = useLocation();
  const { user } = useAuth();

  const [serviceType, setServiceType] = useState<'Offline OPD' | 'Online Video' | 'Voice Call' | 'Chat' | 'Medicine Order' | 'Diagnostic Test'>('Offline OPD');
  const [reason, setReason] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-08-05');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [patientName, setPatientName] = useState(user?.name || 'Venkatesh K.');
  const [patientEmail, setPatientEmail] = useState(user?.email || 'patient@medynex.com');
  const [patientPhone, setPatientPhone] = useState(user?.phone || '+91 98765 43210');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Context storage
    submitProviderRequest({
      patientName,
      patientEmail,
      patientPhone,
      providerId: provider.id,
      providerName: provider.name,
      providerType: provider.type,
      serviceType,
      reason,
      preferredDate,
      preferredTime,
      requestedCity: provider.city || location.city,
      requestedArea: provider.area || location.area,
      specialization: provider.specialty
    });

    // 2. Server persistent lead capture
    try {
      await fetch('/api/onboarding/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requesterUserId: user?.id,
          requesterName: patientName,
          requesterPhone: patientPhone,
          requesterEmail: patientEmail,
          providerType: provider.type,
          providerName: provider.name,
          specialty: provider.specialty,
          city: provider.city || location.city || 'Tirupati',
          state: location.state || 'Andhra Pradesh',
          notes: `[Service: ${serviceType}] [Preferred: ${preferredDate} @ ${preferredTime}] - ${reason}`,
          source: 'Patient Demand Modal'
        })
      });
    } catch (err) {
      console.warn('[Onboarding Lead Post Error]:', err);
    }

    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-[#111827] border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold uppercase">Demand-First System</span>
                <h2 className="text-lg font-bold text-white mt-0.5">Request {provider.name}</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h3 className="text-xl font-extrabold text-white">Demand Request Registered!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Your request for <strong className="text-amber-300">{provider.name}</strong> has been saved. We are prioritizing provider outreach in <strong className="text-cyan-300">{provider.city || location.city}</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800 text-left text-xs space-y-1">
                <div className="text-slate-400 font-mono">AUTOMATED NOTIFICATION PROMISE:</div>
                <div className="text-emerald-400 font-medium">As soon as this provider completes onboarding, you will receive an instant notification with fee details and a direct "Book Now" link!</div>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700"
              >
                Close & Continue Browsing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
                This healthcare provider has not yet onboarded on MediTrust. Submitting a request helps us fast-track their onboarding and alerts you the moment they join!
              </div>

              {/* Service Type Buttons */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Select Requested Service Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Offline OPD', label: 'In-Person OPD', icon: Stethoscope },
                    { id: 'Online Video', label: 'Video Call', icon: Video },
                    { id: 'Voice Call', label: 'Voice Call', icon: PhoneCall },
                    { id: 'Chat', label: 'Chat Consult', icon: MessageSquare },
                    { id: 'Medicine Order', label: 'Medicine Order', icon: Pill },
                    { id: 'Diagnostic Test', label: 'Lab Service', icon: TestTube }
                  ].map(item => {
                    const Icon = item.icon;
                    const selected = serviceType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setServiceType(item.id as any)}
                        className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-all ${
                          selected ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm' : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reason / Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Reason for Visit / Special Requirement</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Skin rash consultation, routine cardiac checkup, monthly prescription medicine..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 placeholder-slate-600 resize-none"
                />
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Preferred Time Window</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="09:00 AM">Morning (09:00 AM)</option>
                    <option value="11:00 AM">Morning (11:00 AM)</option>
                    <option value="02:30 PM">Afternoon (02:30 PM)</option>
                    <option value="06:00 PM">Evening (06:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Patient Contact Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Submit Demand Request & Notify Me</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
