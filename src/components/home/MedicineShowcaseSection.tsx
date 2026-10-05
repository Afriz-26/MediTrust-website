import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, ArrowRight, ShieldCheck, Database, Scale, Sparkles } from 'lucide-react';
import { MedicineEncyclopedia } from '../medicines/MedicineEncyclopedia';

export const MedicineShowcaseSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#071618] border-t border-[#0F3538] text-slate-100 relative selection:bg-emerald-500/30">
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-900/15 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Editorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <Pill className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open-Source Healthcare API & Clinical Formulary</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Medicine Encyclopedia
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/70 leading-relaxed font-normal">
            Look up any medication by brand name or active generic salt. Retrieve legally structured clinical data—approved therapeutic uses, exact dosage protocols, potential adverse reactions, and CDSCO/FDA regulatory statuses.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs text-emerald-300/80 font-mono">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>openFDA Drug Label API</span>
            </span>
            <span className="text-emerald-700">•</span>
            <span className="flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>CDSCO National Formulary</span>
            </span>
            <span className="text-emerald-700">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Legal Prescribing Info</span>
            </span>
          </div>
        </div>

        {/* Embedded Medicine Encyclopedia Component */}
        <MedicineEncyclopedia initialMedication="Paracetamol" showSearchBar={true} />

        {/* Bottom Call to Action Strip */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#082224] to-[#0B2C2F] border border-[#134D52]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Looking for local pharmacy stock or price comparison?</span>
            </h4>
            <p className="text-xs text-emerald-200/70">
              Check real-time inventory at licensed pharmacies in your city and order for doorstep fulfillment.
            </p>
          </div>

          <Link
            to="/medicines"
            id="btn-goto-full-catalog"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <span>Explore Full Drug Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
