import React from 'react';
import { Stethoscope, Building2, Pill, FlaskConical, Bot, Ticket, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title="Healthcare Technology Services | Medynex Solutions LLP"
        description="Explore full suite of healthcare technology solutions: HMS, EMR, Teleconsultations, Queue Tokens, LIMS, Pharmacy POS, and Clinical AI."
        canonicalUrl="https://medynex.com/services"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 font-mono bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">
            Solutions Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Healthcare Technology Services
          </h1>
          <p className="text-slate-300 text-lg">
            Empowering every stakeholder in the care continuum with intelligent software infrastructure.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Doctor Discovery & Consultation Platform</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Provides patients with search for nearby specialist doctors, real-time schedule availability, and seamless joining of HD video consultations.
            </p>
            <Link to="/doctors" className="inline-flex items-center space-x-2 text-sm font-semibold text-blue-400 hover:text-blue-300">
              <span>Find Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Hospital Management System (HMS)</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Full enterprise software for hospitals featuring live ICU/General bed availability matrix, OPD queue token broadcasting, and NABH compliance record keeping.
            </p>
            <Link to="/hospitals" className="inline-flex items-center space-x-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
              <span>Explore Hospital Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <Pill className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Pharmacy Stock & Medicine Delivery</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Enables local retail pharmacies to verify QR prescriptions instantly, manage stock inventory, and offer same-day doorstep medicine delivery.
            </p>
            <Link to="/pharmacies" className="inline-flex items-center space-x-2 text-sm font-semibold text-amber-400 hover:text-amber-300">
              <span>Search Pharmacies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">LIMS Diagnostic & Home Sample Booking</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Laboratory information management system providing automated phlebotomist dispatch, home sample collection, and digital report delivery to ABHA health accounts.
            </p>
            <Link to="/laboratories" className="inline-flex items-center space-x-2 text-sm font-semibold text-purple-400 hover:text-purple-300">
              <span>Explore Diagnostic Labs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
