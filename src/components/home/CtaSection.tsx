import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 sm:p-16 text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white border border-white/20 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Join India's Fastest Growing Healthcare Platform</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Experience the Future of Indian Healthcare?
            </h2>

            <p className="text-base sm:text-lg text-blue-100 leading-relaxed font-normal">
              Whether you are a Patient seeking instant digital care, a Doctor streamlining OPD queues, or a Pharmacy digitizing prescriptions—MediTrust by Medynex Solutions LLP is your trusted partner.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link 
                to="/register"
                id="cta-register-now"
                className="px-8 py-4 rounded-xl text-base font-bold bg-white text-blue-700 hover:bg-blue-50 transition-all shadow-lg hover:scale-105 flex items-center space-x-2"
              >
                <span>Get Started (Register)</span>
                <ArrowRight className="w-5 h-5 text-blue-700" />
              </Link>
              <Link 
                to="/contact"
                id="cta-contact-sales"
                className="px-8 py-4 rounded-xl text-base font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all"
              >
                <span>Contact Enterprise Team</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
