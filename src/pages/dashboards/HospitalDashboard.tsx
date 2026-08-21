import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { Building2, Activity, Users, AlertCircle, ShieldCheck } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const HospitalDashboard: React.FC = () => {
  const { user } = useAuth();

  const bedStats = [
    { title: 'ICU Beds', count: '6 / 40', status: 'Available Now', color: 'text-white', statusColor: 'text-emerald-400' },
    { title: 'General Ward', count: '28 / 200', status: 'Available Now', color: 'text-white', statusColor: 'text-emerald-400' },
    { title: 'Private Suits', count: '8 / 50', status: 'Available Now', color: 'text-white', statusColor: 'text-emerald-400' },
    { title: 'OPD Tokens Issued Today', count: '482', status: 'Average Wait: 12 Mins', color: 'text-blue-400', statusColor: 'text-blue-300' }
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-10">
      <SEO
        title="Hospital Admin Console | MediTrust HMS"
        description="Hospital Management Console on MediTrust - Manage OPD token displays, ICU bed occupancy grid, and emergency trauma alerts."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="p-6 rounded-3xl bg-[#111827] border border-emerald-500/30 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <Building2 className="w-12 h-12 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
              <p className="text-xs text-slate-400">NABH Accredited Super Specialty Hospital • HMS Console Active</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">Emergency 24x7 Ready</span>
        </motion.div>

        {/* Bed Availability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {bedStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + idx * 0.08, ease: 'easeOut' }}
              className="p-6 rounded-2xl bg-[#111827] border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="text-xs text-slate-400 uppercase font-mono">{stat.title}</div>
              <div className={`text-3xl font-extrabold ${stat.color} mt-1`}>{stat.count}</div>
              <div className={`text-[10px] ${stat.statusColor} mt-1`}>{stat.status}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
