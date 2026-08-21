import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FlaskConical, ShieldCheck, Home } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const LabDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-10">
      <SEO
        title="Diagnostic LIMS Portal | MediTrust"
        description="Diagnostic Laboratory Portal on MediTrust - Phlebotomist dispatch, test sample verification, and NABL digital report publishing."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-6 rounded-3xl bg-[#111827] border border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FlaskConical className="w-12 h-12 text-purple-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
              <p className="text-xs text-slate-400">NABL Accreditation: {user?.registrationNo}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-mono text-xs font-bold">18 Home Samples Scheduled</span>
        </div>
      </div>
    </div>
  );
};
