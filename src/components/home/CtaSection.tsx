import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Compass, UserPlus } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative border-t border-slate-200 selection:bg-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-[#101515] text-white p-10 sm:p-16 text-center relative overflow-hidden border border-[#253636] shadow-2xl">
          {/* Subtle architectural ambient aura */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0E6763]/30 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#162222] text-[#85D3CB] border border-[#263737] text-xs font-semibold backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-[#2B9A91]" />
              <span>Showcasing Next-Generation Connected Healthcare</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Experience the MediTrust Healthcare Ecosystem
            </h2>

            <p className="text-base sm:text-lg text-[#BACAC7] leading-relaxed font-normal">
              Create your patient account today to try our clinical AI assistant, search healthcare providers across India, verify medicines, and request your local doctor or pharmacy to connect.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link 
                to="/register"
                id="cta-register-now"
                className="px-8 py-4 rounded-xl text-sm font-bold bg-[#0E6763] hover:bg-[#2B9A91] text-white transition-all shadow-lg hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <UserPlus className="w-4 h-4 text-white" />
                <span>Create User Account</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link 
                to="/ai-assistant"
                id="cta-try-ai-assistant"
                className="px-8 py-4 rounded-xl text-sm font-semibold bg-[#162121] text-[#E7EAE7] border border-[#2D3E3E] hover:border-[#2B9A91]/60 transition-all flex items-center space-x-2 hover:-translate-y-0.5"
              >
                <Bot className="w-4 h-4 text-[#85D3CB]" />
                <span>Try AI Health Assistant</span>
              </Link>
              <Link 
                to="/doctors"
                id="cta-search-directory"
                className="px-6 py-4 rounded-xl text-sm font-semibold bg-transparent text-[#9FB5B1] hover:text-white border border-[#283838] transition-all"
              >
                <span>Find Providers</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
