import React from 'react';
import { ShieldCheck, Database, Server, Lock } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 font-mono bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Architecture & Security
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for National Scale, Security & Speed
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            MediTrust is powered by modern cloud native technology standards, prepared for Express.js REST API backends, ABDM gateway integration, and high availability across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-blue-300 hover:bg-white transition-all shadow-xs hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">High-Throughput REST APIs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consumes lightweight, stateless REST APIs powered by Express.js with JWT authentication and sub-50ms queue update latency.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-emerald-300 hover:bg-white transition-all shadow-xs hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Secure Cloud Database</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              PostgreSQL / Firestore powered backend with Row Level Security (RLS) policies and encrypted user sessions.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-purple-300 hover:bg-white transition-all shadow-xs hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">End-to-End Encryption</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              AES-256 payload encryption at rest and TLS 1.3 in transit. Meets ISO 27001, DISHA, and HIPAA data privacy guidelines.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-teal-300 hover:bg-white transition-all shadow-xs hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">ABDM & ABHA Integration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              National Health Authority (NHA) Ayushman Bharat Digital Mission (M1, M2, M3) gateway integration for linking ABHA IDs.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
