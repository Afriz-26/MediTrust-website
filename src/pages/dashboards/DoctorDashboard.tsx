import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';
import { Stethoscope, Users, Ticket, FileText, CheckCircle, Calendar, Sparkles, DollarSign, Clock, MapPin, Check, X, Shield, Award } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    appointments, acceptAppointment, rejectAppointment, 
    allDoctors, updateDoctorProfile, purchaseSubscription, purchaseAdBooster 
  } = useHealthcare();

  const myDoctorRecord = allDoctors.find(d => d.email === user?.email || d.name === user?.name) || allDoctors[0];

  const [activeTab, setActiveTab] = useState<'appointments' | 'rx' | 'profile' | 'monetization'>('appointments');

  // Profile Edit State
  const [fee, setFee] = useState(myDoctorRecord?.consultationFee || 700);
  const [hours, setHours] = useState(myDoctorRecord?.workingHours || '09:00 AM - 05:00 PM');
  const [clinicAddress, setClinicAddress] = useState(myDoctorRecord?.clinicAddress || 'Alipiri Road, Tirupati');
  const [profileSaved, setProfileSaved] = useState(false);

  // E-Rx State
  const [rxWriter, setRxWriter] = useState({
    patientName: 'Siddharth Varma',
    diagnosis: 'Essential Hypertension',
    medicineName: 'Telmisartan 40mg',
    dosage: '1 Tab Once Daily',
    duration: '30 Days'
  });
  const [rxSuccess, setRxSuccess] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (myDoctorRecord) {
      await updateDoctorProfile(myDoctorRecord.id, {
        consultationFee: Number(fee),
        workingHours: hours,
        clinicAddress
      });
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    }
  };

  const handleBuyPlan = async (plan: 'Silver' | 'Gold' | 'Platinum', price: number) => {
    if (user) {
      await purchaseSubscription(user.id, user.name, 'doctor', plan, price);
      alert(`Successfully subscribed to ${plan} Plan (₹${price}/year)! Your doctor badge is updated.`);
    }
  };

  const handleBuyBooster = async () => {
    if (user) {
      await purchaseAdBooster(user.id, user.name, 'doctor', 'Tirupati', 1499);
      alert(`Ad Booster activated for Tirupati! Your profile will rank #1 in patient search results for 30 days.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-10">
      <SEO
        title="Doctor Clinical Workspace | MediTrust Platform"
        description="Doctor Clinical Workspace on MediTrust - Manage patient OPD appointments, accept/reject booking requests, issue e-prescriptions, and upgrade visibility with Ad Boosters."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Doctor Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-[#111827] to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <img src={user?.avatar || myDoctorRecord?.image} alt={user?.name} className="w-16 h-16 rounded-2xl object-cover border border-cyan-400" />
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase font-semibold flex items-center gap-2">
                <span>Clinician Workspace</span>
                {myDoctorRecord?.verificationStatus === 'Active' ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">Verified & Active</span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">Pending Admin Verification</span>
                )}
              </div>
              <h1 className="text-2xl font-black text-white">{user?.name || 'Dr. Ananya Sharma'}</h1>
              <p className="text-xs text-slate-400">{myDoctorRecord?.specialty || 'Cardiology'} • {myDoctorRecord?.hospitalName || 'MediTrust Heart Institute'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold ${activeTab === 'appointments' ? 'bg-cyan-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'}`}
            >
              Appointments ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab('rx')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold ${activeTab === 'rx' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'}`}
            >
              Issue E-Rx
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold ${activeTab === 'profile' ? 'bg-slate-700 text-white shadow-md' : 'bg-slate-800 text-slate-300'}`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab('monetization')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold ${activeTab === 'monetization' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300'}`}
            >
              Ad Booster
            </button>
          </div>
        </div>

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>Patient Appointment Requests & Queue</span>
              </h2>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                {appointments.length} Total Bookings
              </span>
            </div>

            {appointments.length === 0 ? (
              <div className="p-10 text-center rounded-2xl bg-[#0B1120] border border-slate-800">
                <p className="text-xs text-slate-400">No appointment requests at present.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0B1120] text-slate-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Token</th>
                      <th className="p-3">Patient</th>
                      <th className="p-3">Date & Slot</th>
                      <th className="p-3">Consultation Type</th>
                      <th className="p-3">Fee</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {appointments.map(apt => (
                      <tr key={apt.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 font-bold font-mono text-cyan-400">{apt.tokenNumber || 'TK-011'}</td>
                        <td className="p-3 font-semibold text-white">{apt.patientName}</td>
                        <td className="p-3 font-mono text-slate-300">{apt.date} • {apt.time}</td>
                        <td className="p-3 text-slate-300">{apt.type}</td>
                        <td className="p-3 font-bold text-emerald-400">₹{apt.consultationFee || 700}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            apt.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 
                            apt.status === 'Cancelled' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          {apt.status !== 'Confirmed' && apt.status !== 'Cancelled' && (
                            <>
                              <button
                                onClick={() => acceptAppointment(apt.id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => rejectAppointment(apt.id)}
                                className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-400 font-bold text-[10px]"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DIGITAL PRESCRIPTION WRITER */}
        {activeTab === 'rx' && (
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>Digital E-Prescription Writer</span>
            </h2>

            {rxSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Digital Prescription Issued!</h3>
                <p className="text-xs text-slate-300">Synchronized with patient ABHA record and partner pharmacies.</p>
                <button onClick={() => setRxSuccess(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold">
                  Issue Next Prescription
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setRxSuccess(true); }} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Patient Name</label>
                  <input type="text" value={rxWriter.patientName} onChange={e => setRxWriter({...rxWriter, patientName: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Diagnosis</label>
                  <input type="text" value={rxWriter.diagnosis} onChange={e => setRxWriter({...rxWriter, diagnosis: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Medicine Name</label>
                    <input type="text" value={rxWriter.medicineName} onChange={e => setRxWriter({...rxWriter, medicineName: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Dosage</label>
                    <input type="text" value={rxWriter.dosage} onChange={e => setRxWriter({...rxWriter, dosage: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Duration</label>
                    <input type="text" value={rxWriter.duration} onChange={e => setRxWriter({...rxWriter, duration: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20">
                  Generate E-Signed QR Prescription
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: EDIT PROFILE */}
        {activeTab === 'profile' && (
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4 max-w-xl mx-auto">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Edit Doctor Consultation Profile</h2>

            {profileSaved && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Profile updated in Supabase in real time!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Offline OPD Consultation Fee (₹)</label>
                <input type="number" value={fee} onChange={e => setFee(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Working Hours</label>
                <input type="text" value={hours} onChange={e => setHours(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Clinic Address</label>
                <input type="text" value={clinicAddress} onChange={e => setClinicAddress(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/20">
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: MONETIZATION & AD BOOSTERS */}
        {activeTab === 'monetization' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#111827] border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase font-semibold">Priority Local Search Ranking</span>
                  <h2 className="text-xl font-bold text-white">MediTrust Doctor Visibility Boosters</h2>
                  <p className="text-xs text-slate-400">Rank #1 in search results in your city for 30 days and double your OPD appointments.</p>
                </div>
                <button onClick={handleBuyBooster} className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs shadow-xl flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Activate City Ad Booster (₹1,499/mo)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
                <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Silver Plan</span>
                <div className="text-3xl font-black text-white">₹999 <span className="text-xs text-slate-400 font-normal">/yr</span></div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Verified Doctor Badge</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Unlimited E-Prescriptions</li>
                </ul>
                <button onClick={() => handleBuyPlan('Silver', 999)} className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">
                  Subscribe Silver
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-[#111827] border border-cyan-500/50 space-y-4 relative">
                <span className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px]">MOST POPULAR</span>
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">Gold Plan</span>
                <div className="text-3xl font-black text-white">₹2,999 <span className="text-xs text-slate-400 font-normal">/yr</span></div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Priority OPD Search Ranking</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Integrated Teleconsultation Suite</li>
                </ul>
                <button onClick={() => handleBuyPlan('Gold', 2999)} className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs">
                  Subscribe Gold
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-[#111827] border border-amber-500/50 space-y-4">
                <span className="text-xs font-mono text-amber-400 uppercase font-semibold">Platinum Plan</span>
                <div className="text-3xl font-black text-white">₹5,999 <span className="text-xs text-slate-400 font-normal">/yr</span></div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Featured Banner on Patient Homepage</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Account Manager</li>
                </ul>
                <button onClick={() => handleBuyPlan('Platinum', 5999)} className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs">
                  Subscribe Platinum
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
