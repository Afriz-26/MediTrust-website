import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ShieldCheck, User, Stethoscope, Building2, Pill, FlaskConical, CheckCircle, AlertTriangle, Upload } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>('patient');
  const { registerPatient, registerDoctor, registerPharmacy, registerGeneric } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Patient Fields
  const [pFullName, setPFullName] = useState('');
  const [pEmail, setPEmail] = useState('');
  const [pPhone, setPPhone] = useState('');
  const [pAge, setPAge] = useState('32');
  const [pGender, setPGender] = useState('Male');
  const [pAddress, setPAddress] = useState('');
  const [pState, setPState] = useState('Andhra Pradesh');
  const [pDistrict, setPDistrict] = useState('Tirupati');
  const [pCity, setPCity] = useState('Tirupati');
  const [pPincode, setPPincode] = useState('517501');
  const [pLanguage, setPLanguage] = useState('en');
  const [pEmergency, setPEmergency] = useState('');
  const [pPassword, setPPassword] = useState('Password123!');

  // Doctor Fields
  const [dName, setDName] = useState('');
  const [dEmail, setDEmail] = useState('');
  const [dPhone, setDPhone] = useState('');
  const [dRegNo, setDRegNo] = useState('');
  const [dQualification, setDQualification] = useState('MD, DM (Cardiology)');
  const [dSpecialization, setDSpecialization] = useState('Cardiology');
  const [dExperience, setDExperience] = useState('12');
  const [dHospital, setDHospital] = useState('MediTrust Heart Institute');
  const [dClinicName, setDClinicName] = useState('');
  const [dClinicAddress, setDClinicAddress] = useState('');
  const [dState, setDState] = useState('Andhra Pradesh');
  const [dDistrict, setDDistrict] = useState('Tirupati');
  const [dCity, setDCity] = useState('Tirupati');
  const [dPincode, setDPincode] = useState('517501');
  const [dWorkingDays, setDWorkingDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [dWorkingHours, setDWorkingHours] = useState('09:00 AM - 05:00 PM');
  const [dFee, setDFee] = useState('700');
  const [dPassword, setDPassword] = useState('Password123!');

  // Pharmacy Fields
  const [phName, setPhName] = useState('');
  const [phOwner, setPhOwner] = useState('');
  const [phEmail, setPhEmail] = useState('');
  const [phPhone, setPhPhone] = useState('');
  const [phDrugLicense, setPhDrugLicense] = useState('');
  const [phGst, setPhGst] = useState('');
  const [phAddress, setPhAddress] = useState('');
  const [phState, setPhState] = useState('Andhra Pradesh');
  const [phDistrict, setPhDistrict] = useState('Tirupati');
  const [phCity, setPhCity] = useState('Tirupati');
  const [phPincode, setPhPincode] = useState('517501');
  const [phRadius, setPhRadius] = useState('10');
  const [phHours, setPhHours] = useState('08:00 AM - 10:00 PM');
  const [phPassword, setPhPassword] = useState('Password123!');

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    const res = await registerPatient({
      fullName: pFullName,
      email: pEmail,
      phone: pPhone,
      age: Number(pAge),
      gender: pGender,
      address: pAddress,
      state: pState,
      district: pDistrict,
      city: pCity,
      pincode: pPincode,
      preferredLanguage: pLanguage,
      emergencyContact: pEmergency,
      password: pPassword
    });
    setIsSubmitting(false);
    if (res.success) {
      navigate('/dashboards/patient', { replace: true });
    } else {
      setErrorMessage(res.error || 'Registration failed');
    }
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    const res = await registerDoctor({
      doctorName: dName,
      email: dEmail,
      phone: dPhone,
      registrationNumber: dRegNo,
      qualification: dQualification,
      specialization: dSpecialization,
      experienceYears: Number(dExperience),
      hospitalName: dHospital,
      clinicName: dClinicName,
      clinicAddress: dClinicAddress,
      state: dState,
      district: dDistrict,
      city: dCity,
      pincode: dPincode,
      workingDays: dWorkingDays,
      workingHours: dWorkingHours,
      offlineFee: Number(dFee),
      password: dPassword
    });
    setIsSubmitting(false);
    if (res.success) {
      navigate('/dashboards/doctor', { replace: true });
    } else {
      setErrorMessage(res.error || 'Registration failed');
    }
  };

  const handlePharmacySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    const res = await registerPharmacy({
      pharmacyName: phName,
      ownerName: phOwner,
      email: phEmail,
      phone: phPhone,
      drugLicenseNumber: phDrugLicense,
      gstNumber: phGst,
      address: phAddress,
      state: phState,
      district: phDistrict,
      city: phCity,
      pincode: phPincode,
      deliveryRadiusKm: Number(phRadius),
      workingHours: phHours,
      password: phPassword
    });
    setIsSubmitting(false);
    if (res.success) {
      navigate('/dashboards/pharmacy', { replace: true });
    } else {
      setErrorMessage(res.error || 'Registration failed');
    }
  };

  const toggleWorkingDay = (day: string) => {
    setDWorkingDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 flex flex-col justify-center items-center px-4">
      <SEO
        title="Register Portal | MediTrust Healthcare Platform"
        description="Onboard Patient, Doctor, or Pharmacy profiles synchronized in real time with Supabase."
        canonicalUrl="https://medynex.com/register"
      />
      <div className="w-full max-w-2xl space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 font-mono bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            Realtime Supabase Registration
          </span>
          <h1 className="text-3xl font-extrabold text-white">Register for MediTrust</h1>
          <p className="text-xs text-slate-400">Join the integrated digital healthcare ecosystem.</p>
        </div>

        {/* Role Tab selection */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#111827] border border-slate-800 text-center">
          {(['patient', 'doctor', 'pharmacy'] as UserRole[]).map(r => (
            <button
              key={r}
              type="button"
              onClick={() => { setRole(r); setErrorMessage(''); }}
              className={`py-2.5 px-1 rounded-xl text-xs font-bold capitalize transition-colors ${
                role === r ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-6 shadow-2xl">

          {/* PATIENT REGISTRATION FORM */}
          {role === 'patient' && (
            <form onSubmit={handlePatientSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Patient Personal Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input type="text" required value={pFullName} onChange={e => setPFullName(e.target.value)} placeholder="Siddharth Varma" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input type="email" required value={pEmail} onChange={e => setPEmail(e.target.value)} placeholder="patient@example.com" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone *</label>
                  <input type="tel" required value={pPhone} onChange={e => setPPhone(e.target.value)} placeholder="+91 98765 00000" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Account Password *</label>
                  <input type="password" required value={pPassword} onChange={e => setPPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Age *</label>
                  <input type="number" required value={pAge} onChange={e => setPAge(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Gender *</label>
                  <select value={pGender} onChange={e => setPGender(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Street Address *</label>
                  <input type="text" required value={pAddress} onChange={e => setPAddress(e.target.value)} placeholder="Door No, Street" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City *</label>
                  <input type="text" required value={pCity} onChange={e => setPCity(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">District *</label>
                  <input type="text" required value={pDistrict} onChange={e => setPDistrict(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">State *</label>
                  <input type="text" required value={pState} onChange={e => setPState(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pincode *</label>
                  <input type="text" required value={pPincode} onChange={e => setPPincode(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Emergency Contact Phone *</label>
                  <input type="tel" required value={pEmergency} onChange={e => setPEmergency(e.target.value)} placeholder="+91 98765 99999" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20">
                {isSubmitting ? 'Creating Patient Profile...' : 'Complete Patient Registration'}
              </button>
            </form>
          )}

          {/* DOCTOR REGISTRATION FORM */}
          {role === 'doctor' && (
            <form onSubmit={handleDoctorSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span><strong>Admin Approval Required:</strong> Your profile will be submitted to the MediTrust Medical Council Admin for verification before appearing in public doctor listings.</span>
              </div>

              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Clinician Registration</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Doctor Full Name *</label>
                  <input type="text" required value={dName} onChange={e => setDName(e.target.value)} placeholder="Dr. Ananya Sharma" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input type="email" required value={dEmail} onChange={e => setDEmail(e.target.value)} placeholder="dr.ananya@medynex.com" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input type="tel" required value={dPhone} onChange={e => setDPhone(e.target.value)} placeholder="+91 98765 22334" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Medical Reg Number (MCI/NMC) *</label>
                  <input type="text" required value={dRegNo} onChange={e => setDRegNo(e.target.value)} placeholder="MCI-2012-884920" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Qualification *</label>
                  <input type="text" required value={dQualification} onChange={e => setDQualification(e.target.value)} placeholder="MD, DM (Cardiology)" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Specialization *</label>
                  <input type="text" required value={dSpecialization} onChange={e => setDSpecialization(e.target.value)} placeholder="Cardiology" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Experience Years *</label>
                  <input type="number" required value={dExperience} onChange={e => setDExperience(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Offline Consultation Fee (₹) *</label>
                  <input type="number" required value={dFee} onChange={e => setDFee(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hospital / Medical Center Name *</label>
                  <input type="text" required value={dHospital} onChange={e => setDHospital(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Private Clinic Name (Optional)</label>
                  <input type="text" value={dClinicName} onChange={e => setDClinicName(e.target.value)} placeholder="e.g. Sharma Cardiac Clinic" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Clinic Address *</label>
                  <input type="text" required value={dClinicAddress} onChange={e => setDClinicAddress(e.target.value)} placeholder="Alipiri Main Road" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City *</label>
                  <input type="text" required value={dCity} onChange={e => setDCity(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Working Hours *</label>
                  <input type="text" required value={dWorkingHours} onChange={e => setDWorkingHours(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password *</label>
                  <input type="password" required value={dPassword} onChange={e => setDPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Working Days</label>
                <div className="flex flex-wrap gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleWorkingDay(day)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        dWorkingDays.includes(day) ? 'bg-cyan-600 text-white' : 'bg-[#0B1120] text-slate-400 border border-slate-700'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/20">
                {isSubmitting ? 'Registering Doctor...' : 'Submit Doctor Registration for Admin Approval'}
              </button>
            </form>
          )}

          {/* PHARMACY REGISTRATION FORM */}
          {role === 'pharmacy' && (
            <form onSubmit={handlePharmacySubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span><strong>Admin Approval Required:</strong> Your pharmacy will be verified by the Drug Control Admin before being listed publicly.</span>
              </div>

              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Pharmacy Outlet Registration</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pharmacy Outlet Name *</label>
                  <input type="text" required value={phName} onChange={e => setPhName(e.target.value)} placeholder="MediTrust Express Pharmacy" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Owner / Manager Name *</label>
                  <input type="text" required value={phOwner} onChange={e => setPhOwner(e.target.value)} placeholder="Siddharth Varma" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input type="email" required value={phEmail} onChange={e => setPhEmail(e.target.value)} placeholder="pharmacy@medynex.com" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input type="tel" required value={phPhone} onChange={e => setPhPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Drug License Number *</label>
                  <input type="text" required value={phDrugLicense} onChange={e => setPhDrugLicense(e.target.value)} placeholder="AP-DRUG-33921" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GST Number (Optional)</label>
                  <input type="text" value={phGst} onChange={e => setPhGst(e.target.value)} placeholder="37AAAAA0000A1Z5" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Address *</label>
                  <input type="text" required value={phAddress} onChange={e => setPhAddress(e.target.value)} placeholder="Alipiri Main Road" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City *</label>
                  <input type="text" required value={phCity} onChange={e => setPhCity(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Medicine Delivery Radius (km) *</label>
                  <input type="number" required value={phRadius} onChange={e => setPhRadius(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Working Hours *</label>
                  <input type="text" required value={phHours} onChange={e => setPhHours(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Account Password *</label>
                  <input type="password" required value={phPassword} onChange={e => setPhPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-lg shadow-amber-600/20">
                {isSubmitting ? 'Registering Pharmacy...' : 'Submit Pharmacy Registration for Admin Approval'}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
