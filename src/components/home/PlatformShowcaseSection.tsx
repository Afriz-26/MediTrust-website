import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Clock, 
  QrCode, 
  Building2, 
  Stethoscope, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  Users,
  Compass,
  FileCheck
} from 'lucide-react';
import { DemandRequestModal } from '../modals/DemandRequestModal';

export const PlatformShowcaseSection: React.FC = () => {
  const [isNominateModalOpen, setIsNominateModalOpen] = useState(false);

  return (
    <section className="py-20 bg-white border-t border-slate-200 relative selection:bg-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>The MediTrust Architecture Promise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Transparency: Reimagining Everyday Healthcare
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            We are designing MediTrust from the ground up to solve the real structural challenges in Indian outpatient care—eliminating chaotic waiting corridors, unreadable prescriptions, and fragmented records.
          </p>
        </div>

        {/* Traditional Healthcare vs MediTrust Architecture Contrast Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Column 1: The Outdated Experience */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200/80 px-3 py-1 rounded-full">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Conventional Healthcare Gaps</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Frustrating, Fragmented & Opaque
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Traditional OPD visits in Indian clinics and hospitals are characterized by uncertainty and friction for families.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Overcrowded Clinic Waiting Rooms</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Patients wait 2 to 4 hours in packed waiting halls with no visibility on doctor consultation pacing.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Illegible Paper Prescriptions</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Handwritten slips get misplaced easily and can lead to dangerous dispensing mistakes at retail chemists.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Hidden & Inflated Medicine Costs</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Lack of awareness about affordable Jan Aushadhi generic alternatives and ceiling prices capped by NPPA.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Scattered Physical Files</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Diagnostic test results and past medical history are scattered across paper files without unified ABHA linkage.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: The MediTrust Solution */}
          <div className="rounded-3xl bg-teal-brand text-white p-8 sm:p-10 space-y-6 flex flex-col justify-between shadow-xl shadow-teal-950/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-200 bg-white/10 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />
                <span>The MediTrust Connected Platform</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Intelligent, Dignified & Seamless
              </h3>
              <p className="text-sm text-teal-100 leading-relaxed font-normal">
                Connecting patients, clinicians, and licensed dispensaries into a cohesive, patient-centered digital health network.
              </p>
            </div>

            <div className="space-y-4 pt-2 relative z-10">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <Clock className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Live Digital OPD Queue Token</h4>
                  <p className="text-xs text-teal-100 mt-0.5">Receive real-time token countdowns on your mobile phone and arrive right when the doctor is ready.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <QrCode className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Tamper-Proof QR Digital Prescriptions</h4>
                  <p className="text-xs text-teal-100 mt-0.5">Cryptographically signed by verified medical practitioners, instantly verifiable at any chemist.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <FileCheck className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Government DPCO Price Transparency</h4>
                  <p className="text-xs text-teal-100 mt-0.5">Instant discovery of generic chemical compositions and government Jan Aushadhi alternatives.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <ShieldCheck className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">100% Patient Data Ownership & ABHA</h4>
                  <p className="text-xs text-teal-100 mt-0.5">End-to-end encrypted medical vault compliant with ABDM M1-M3 specifications and consent-based sharing.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Community Nomination Banner */}
        <div className="rounded-3xl bg-[#101515] text-white p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-[#253636] shadow-xl">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#85D3CB]">
              COMMUNITY-DRIVEN NETWORK
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Nominate Your Doctor or Pharmacy for Onboarding
            </h3>
            <p className="text-sm text-[#BACAC7] leading-relaxed">
              As we prepare to onboard providers across India, you can nominate your trusted family doctor, local clinic, or neighborhood medical store. We will contact them directly to integrate them into the MediTrust queue network.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setIsNominateModalOpen(true)}
              id="btn-platform-showcase-nominate"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-teal-brand hover:bg-teal-fresh text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <Building2 className="w-4 h-4" />
              <span>Nominate a Provider</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/how-it-works"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all border border-white/20 text-center"
            >
              <span>How It Works</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Provider Onboarding Nomination Modal */}
      <DemandRequestModal
        provider={{
          id: 'community-nomination',
          name: 'Community Doctor or Pharmacy Nomination',
          type: 'Doctor'
        }}
        isOpen={isNominateModalOpen}
        onClose={() => setIsNominateModalOpen(false)}
      />
    </section>
  );
};
