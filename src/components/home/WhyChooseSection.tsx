import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Lock, Cpu, Globe, HeartHandshake } from 'lucide-react';

const WHY_REASONS = [
  {
    icon: Globe,
    title: 'Unified Ecosystem Interoperability',
    description: 'Eliminate fragmented healthcare silos across Indian cities. MediTrust connects Patients, Doctors, Hospitals, and Pharmacies on a secure unified network.',
    badge: 'Interoperable',
    accentColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    icon: Zap,
    title: 'Sub-Second OPD Queue Engine',
    description: 'Patients receive live digital queue tokens with accurate wait-time countdowns on mobile, reducing clinic and hospital OPD overcrowding by over 65%.',
    badge: 'Real-Time Sync',
    accentColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    icon: Lock,
    title: 'ABDM & ISO 27001 Security',
    description: 'Engineered with strict role-based authorization, end-to-end encryption, and full Ayushman Bharat Digital Mission (ABDM M1-M3) compliance.',
    badge: 'NHA & ABDM',
    accentColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    badgeStyle: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    icon: Cpu,
    title: 'AI Clinical Health Assistant',
    description: 'Multilingual AI tools assist patients with symptom triaging in regional Indian languages, appointment routing, and digital prescription explanation.',
    badge: 'AI Powered',
    accentColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    icon: Shield,
    title: 'Tamper-Proof QR Prescriptions',
    description: 'Digital prescriptions issued by registered medical practitioners carry cryptographic QR signatures to prevent dispensing errors and fraud.',
    badge: 'Verified Rx',
    accentColor: 'text-teal-600',
    bgColor: 'bg-teal-50',
    badgeStyle: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  {
    icon: HeartHandshake,
    title: 'Patient-First Transparency',
    description: 'Patients hold complete ownership over their medical records, lab reports, and doctor consent sharing with 100% data privacy guarantees.',
    badge: 'Consent First',
    accentColor: 'text-rose-600',
    bgColor: 'bg-rose-50',
    badgeStyle: 'bg-rose-50 text-rose-700 border-rose-200'
  }
];

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-700 font-mono bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Why MediTrust Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for the Realities of Indian Healthcare
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Medynex Solutions LLP has engineered digital tools that reduce wait times, simplify prescriptions, and empower patients, clinicians, and pharmacists across India.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_REASONS.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/90 hover:border-blue-300 hover:bg-white transition-all duration-300 group hover:-translate-y-1 relative shadow-xs hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${reason.bgColor} flex items-center justify-center shadow-xs`}>
                    <Icon className={`w-6 h-6 ${reason.accentColor}`} />
                  </div>
                  <span className={`text-[10px] font-mono border px-2.5 py-0.5 rounded-full font-semibold ${reason.badgeStyle}`}>
                    {reason.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
