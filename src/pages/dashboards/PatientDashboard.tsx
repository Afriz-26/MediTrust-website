import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';
import { MOCK_APPOINTMENTS, MOCK_PRESCRIPTIONS, MOCK_QUEUE_TOKENS } from '../../lib/api';
import { Ticket, Calendar, FileText, Pill, Clock, Activity, Download, CheckCircle, ShieldCheck, Sparkles, Bot, Camera, Search, Heart, MapPin, UserCheck, Mic } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { useNavigate } from 'react-router-dom';
import { MedicalHistory } from '../../components/patient/MedicalHistory';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { appointments } = useHealthcare();
  const navigate = useNavigate();

  const [savedDoctors] = useState<string[]>(['doc-101']);
  const [savedPharmacies] = useState<string[]>(['pharm-101']);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-10">
      <SEO
        title="Patient Portal Dashboard | MediTrust Platform"
        description="Patient Portal Dashboard on MediTrust - Manage appointments, track live digital tokens, access Gemini AI Assistant, skin scanner, and medicine verifier."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-[#111827] border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <img src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'} alt={user?.name} className="w-16 h-16 rounded-2xl object-cover border border-blue-400" />
            <div>
              <div className="text-xs font-mono text-blue-400 uppercase font-bold">Patient Health Vault • ABHA ID Active</div>
              <h1 className="text-2xl font-black text-white">{user?.name || 'Siddharth Varma'}</h1>
              <p className="text-xs text-slate-400">{user?.email || 'patient@meditrust.com'} • {user?.phone || '+91 98765 43210'}</p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold w-fit flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> ABHA Verified Health Account
          </span>
        </div>

        {/* Quick AI & Healthcare Feature Hub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => navigate('/ai-assistant')}
            className="p-5 rounded-2xl bg-[#111827] border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">Gemini Powered</span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">AI Healthcare Assistant</h3>
            <p className="text-xs text-slate-400 mt-1">Multi-turn symptom triage, voice assistant & grounded doctor search.</p>
          </div>

          <div 
            onClick={() => navigate('/ai-assistant')}
            className="p-5 rounded-2xl bg-[#111827] border border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">Gemini Vision</span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Multimodal Skin Scanner</h3>
            <p className="text-xs text-slate-400 mt-1">Upload skin photos to evaluate skin type, observations & dermatologists.</p>
          </div>

          <div 
            onClick={() => navigate('/ai-assistant')}
            className="p-5 rounded-2xl bg-[#111827] border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Pill className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">CDSCO Search</span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Medicine Verifier</h3>
            <p className="text-xs text-slate-400 mt-1">Search medicine names or packaging images for uses, dosage & side effects.</p>
          </div>

          <div 
            onClick={() => navigate('/doctors')}
            className="p-5 rounded-2xl bg-[#111827] border border-purple-500/30 hover:border-purple-400 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">OPD Directory</span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Search Nearby Doctors</h3>
            <p className="text-xs text-slate-400 mt-1">Filter clinicians by location, city, pincode, fee, or hospital availability.</p>
          </div>

        </div>

        {/* Live OPD Queue Token Banner */}
        {MOCK_QUEUE_TOKENS.map(q => (
          <div key={q.id} className="p-6 rounded-3xl bg-[#111827] border border-blue-500/40 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-2xl">
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-6">
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Live OPD Queue Token</div>
              <div className="text-4xl font-black text-blue-400 my-1">{q.tokenNumber}</div>
              <div className="text-xs text-emerald-400 font-bold">Status: {q.status}</div>
            </div>

            <div className="md:col-span-8 space-y-2 text-sm text-slate-300">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Doctor: <strong className="text-white">{q.doctorName}</strong></span>
                <span>Dept: <strong className="text-white">{q.department}</strong></span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0B1120] border border-slate-800 flex items-center justify-between text-xs">
                <span>Current Serving Token in OPD: <strong className="text-amber-400 font-mono text-sm">{q.currentServingToken}</strong></span>
                <span className="text-cyan-400 font-bold">Estimated Wait: ~{q.estimatedWaitMinutes} Mins</span>
              </div>
            </div>
          </div>
        ))}

        {/* Medical History Vault */}
        <MedicalHistory />

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Upcoming Appointments */}
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>My Appointment Requests</span>
              </h2>
              <button onClick={() => navigate('/doctors')} className="text-xs text-cyan-400 font-semibold hover:underline">
                Book New OPD +
              </button>
            </div>

            <div className="space-y-3">
              {appointments.length > 0 ? (
                appointments.map(apt => (
                  <div key={apt.id} className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-bold text-white">{apt.doctorName}</div>
                        <div className="text-xs text-slate-400">{apt.hospitalName}</div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        apt.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-300 pt-1 border-t border-slate-800">
                      <span>Date: {apt.date} at {apt.time}</span>
                      <span className="font-mono text-blue-400 font-bold">Token: {apt.tokenNumber || 'TK-011'}</span>
                    </div>
                  </div>
                ))
              ) : (
                MOCK_APPOINTMENTS.map(apt => (
                  <div key={apt.id} className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-bold text-white">{apt.doctorName} ({apt.specialty})</div>
                        <div className="text-xs text-slate-400">{apt.hospitalName}</div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {apt.type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-300 pt-1 border-t border-slate-800">
                      <span>Date: {apt.date} at {apt.time}</span>
                      <span className="font-mono text-blue-400 font-bold">Token: {apt.tokenNumber}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Saved Doctors & Saved Pharmacies */}
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400" />
              <span>Saved Doctors & Pharmacies</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block mb-2">Saved Doctors ({savedDoctors.length})</span>
                {savedDoctors.length === 0 ? (
                  <p className="text-slate-500 italic">No saved doctors yet. Bookmark doctors from search page.</p>
                ) : (
                  <div className="space-y-2">
                    {savedDoctors.map(docId => (
                      <div key={docId} className="p-3 rounded-xl bg-[#0B1120] border border-slate-800 flex justify-between items-center text-white">
                        <span>Doctor ID: {docId}</span>
                        <button onClick={() => navigate('/doctors')} className="text-cyan-400 font-bold hover:underline">View</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block mb-2">Saved Pharmacies ({savedPharmacies.length})</span>
                {savedPharmacies.length === 0 ? (
                  <p className="text-slate-500 italic">No saved pharmacies yet.</p>
                ) : (
                  <div className="space-y-2">
                    {savedPharmacies.map(pharmId => (
                      <div key={pharmId} className="p-3 rounded-xl bg-[#0B1120] border border-slate-800 flex justify-between items-center text-white">
                        <span>Pharmacy ID: {pharmId}</span>
                        <button onClick={() => navigate('/pharmacies')} className="text-amber-400 font-bold hover:underline">Order</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
