import React from 'react';
import { Activity, ShieldCheck, Ticket, FileText, Bot, Stethoscope, Building2, Pill, FlaskConical, Cpu, CheckCircle2, Lock, Users, Smartphone, Server } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const AboutMediTrustPage: React.FC = () => {
  const schemaObj = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://medynex.com/#software',
        'name': 'MediTrust Healthcare Ecosystem',
        'operatingSystem': 'Web, Android, iOS',
        'applicationCategory': 'HealthApplication',
        'publisher': {
          '@type': 'Organization',
          'name': 'Medynex Solutions LLP',
          'url': 'https://medynex.com'
        },
        'description': 'Unified digital healthcare platform connecting patients, doctors, hospitals, pharmacies, and diagnostic laboratories across India.'
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://medynex.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'About MediTrust', 'item': 'https://medynex.com/about-meditrust' }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title="About MediTrust Platform | Digital Healthcare Engine by Medynex"
        description="Explore the MediTrust platform architecture connecting Patients, Doctors, Hospitals, Pharmacies, and Diagnostic Labs into a unified healthcare ecosystem."
        canonicalUrl="https://medynex.com/about-meditrust"
        schema={schemaObj}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 font-mono bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Platform Architecture & Pillars
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            About the MediTrust Platform
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            The flagship intelligent healthcare platform engineered by Medynex Solutions LLP. Built for sub-second performance, ABDM interoperability, and end-to-end patient care.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
            <Ticket className="w-8 h-8 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Digital OPD Queue Tokens</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Real-time token generation with live queue progress tracking on patient mobile phones, dramatically reducing outpatient waiting room congestion and patient anxiety.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
            <FileText className="w-8 h-8 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">QR Digital Prescriptions</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Cryptographically signed e-prescriptions issued by verified doctors, eliminating prescription fraud, illegible handwriting errors, and dosage confusion.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
            <Bot className="w-8 h-8 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">AI Health Triage Assistant</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Generative AI tool helping patients triage symptoms, translate lab report jargon, and navigate nearby specialist options responsibly.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
            <Building2 className="w-8 h-8 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Hospital Bed & ICU Matrix</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Real-time ICU and ward bed occupancy matrix for emergency trauma routing and multi-specialty hospital capacity optimization.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
            <Pill className="w-8 h-8 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Pharmacy Stock Lookup</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Instant medicine inventory verification across partner retail pharmacies with fast local fulfillment and order delivery dispatch.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
            <FlaskConical className="w-8 h-8 text-rose-400" />
            <h2 className="text-xl font-bold text-white">Laboratory Network & LIMS</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Automated diagnostic phlebotomist scheduling and digital NABL lab report linking directly to patient ABHA digital health accounts.
            </p>
          </div>

        </div>

        {/* Technical Capabilities & Security */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#111827] to-blue-950/40 border border-cyan-500/30 space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <span>Platform Capabilities & Security Guarantees</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">Sub-Second Token Engine</strong>
                <span>High-throughput event queue engine issuing doctor appointment tokens in under 150 milliseconds.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">End-to-End Encryption</strong>
                <span>TLS 1.3 in transit and AES-256 encryption at rest for all electronic health records (EHR) and prescriptions.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">ABDM & ABHA Integration</strong>
                <span>Full compliance with NHA's Ayushman Bharat Digital Mission guidelines for digital health ID creation and record sharing.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">Multi-Role Dashboards</strong>
                <span>Dedicated interfaces tailored for Patients, Doctors, Hospital Desk Operators, Pharmacies, and Lab Technicians.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
