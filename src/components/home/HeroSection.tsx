import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Stethoscope, 
  Pill, 
  Building2, 
  Bot, 
  CheckCircle2, 
  Activity, 
  ChevronRight, 
  Clock, 
  QrCode, 
  Users, 
  Compass, 
  Search,
  Lock,
  HeartPulse,
  Award,
  Zap,
  MapPin,
  X
} from 'lucide-react';
import { SearchAutocomplete } from '../common/SearchAutocomplete';
import heroBrightHealthcareImg from '../../assets/images/hero_bright_healthcare_1790915208361.jpg';
import doctorConsultationImg from '../../assets/images/indian_consultation_1787291140026.jpg';
import pharmacyDispensaryImg from '../../assets/images/pharmacy_dispensary_1790873041570.jpg';
import patientCareImg from '../../assets/images/indian_patient_care_1787291192534.jpg';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [heroSearchQuery, setHeroSearchQuery] = useState('');
  const [selectedSearchTab, setSelectedSearchTab] = useState<'all' | 'doctors' | 'medicines' | 'pharmacies'>('all');

  const handleFastSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = heroSearchQuery.trim();
    if (!query) {
      if (selectedSearchTab === 'doctors') navigate('/doctors');
      else if (selectedSearchTab === 'medicines') navigate('/medicines');
      else if (selectedSearchTab === 'pharmacies') navigate('/pharmacies');
      else navigate('/doctors');
      return;
    }

    if (selectedSearchTab === 'medicines') {
      navigate(`/medicines?q=${encodeURIComponent(query)}`);
      return;
    }
    if (selectedSearchTab === 'pharmacies') {
      navigate(`/pharmacies?q=${encodeURIComponent(query)}`);
      return;
    }
    if (selectedSearchTab === 'doctors') {
      navigate(`/doctors?q=${encodeURIComponent(query)}`);
      return;
    }

    // In 'all' tab, automatically detect intent
    const lower = query.toLowerCase();
    const isMedicineKeyword = /dolo|paracetamol|augmentin|azithral|telma|glycomet|pan|pantocid|montair|allegra|shelcal|becosules|atorva|ecosprin|rosuvas|crocin|combiflam|meftal|cetzine|tablet|capsule|syrup|injection|mg|medicine|rx|drug|inhaler|drops|ointment|antibiotic|fever|cough|cold|acidity|gas|vomit|sugar|bp|hypertension|vitamin|pain|gel|cream|ors|electral/i.test(lower);
    const isPharmacyKeyword = /pharmacy|chemist|medical store|druggist|apollo|medplus|chemist|dispensary/i.test(lower);

    if (isMedicineKeyword) {
      navigate(`/medicines?q=${encodeURIComponent(query)}`);
    } else if (isPharmacyKeyword) {
      navigate(`/pharmacies?q=${encodeURIComponent(query)}`);
    } else {
      navigate(`/doctors?q=${encodeURIComponent(query)}`);
    }
  };

  const quickPopularSearches = [
    { label: 'Cardiologist', type: 'doctor', path: '/doctors?q=Cardiology' },
    { label: 'General Physician', type: 'doctor', path: '/doctors?q=General' },
    { label: 'Paracetamol 650', type: 'medicine', path: '/medicines?q=Paracetamol' },
    { label: 'Verified Specialists', type: 'doctor', path: '/doctors' },
    { label: '24/7 Pharmacy', type: 'pharmacy', path: '/pharmacies' }
  ];

  return (
    <div className="relative bg-gradient-to-b from-emerald-50/80 via-teal-50/40 to-white text-slate-900 overflow-hidden selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Background Architectural Ambient Glows (Bright Medical Palette) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft Vibrant Emerald & Sky Gradients */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-emerald-200/50 via-teal-100/30 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-emerald-100/60 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-cyan-100/60 blur-[130px] rounded-full" />
        
        {/* Subtle modern dot matrix pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(#059669 1.5px, transparent 1.5px)`, 
            backgroundSize: '28px 28px' 
          }} 
        />
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: THE IMMERSIVE BRIGHT EDITORIAL HERO */}
      {/* ============================================================ */}
      <section className="relative z-10 pt-10 pb-16 lg:pt-16 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Pill & Live Compliance Indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 lg:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-emerald-200 text-xs text-emerald-900 backdrop-blur-md shadow-sm"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="font-bold tracking-wide text-slate-900">MEDYNEX SOLUTIONS</span>
            <span className="text-emerald-400">•</span>
            <span className="text-emerald-700 font-semibold">MEDITRUST HEALTH OS</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4 text-xs font-semibold text-slate-700"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-900 border border-emerald-200/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>ABDM Compliant M1–M3</span>
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 text-teal-900 border border-teal-200/80 hidden sm:inline-flex">
              <Activity className="w-3.5 h-3.5 text-teal-700" />
              <span>Verified Indian Healthcare Network</span>
            </span>
          </motion.div>
        </div>

        {/* Editorial Headline & Value Statement */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-10 lg:mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold text-slate-900 tracking-tight leading-[1.08]"
          >
            Healthcare, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              intelligently connected.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Medynex Solutions LLP unites patients, verified medical practitioners, and licensed retail pharmacies through a fast, transparent digital healthcare platform engineered in Andhra Pradesh.
          </motion.p>

          {/* ============================================================ */}
          {/* FAST INTERACTIVE SEARCH CONSOLE (NEW IN HERO) */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto w-full pt-2"
          >
            <div className="p-2 sm:p-3 rounded-3xl bg-white border border-emerald-200 shadow-xl shadow-emerald-900/5 space-y-2">
              
              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 text-xs font-semibold text-slate-600">
                <button
                  type="button"
                  onClick={() => setSelectedSearchTab('all')}
                  className={`flex-1 py-1.5 rounded-xl transition-all ${selectedSearchTab === 'all' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'hover:text-slate-900'}`}
                >
                  All Services
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSearchTab('doctors')}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${selectedSearchTab === 'doctors' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'hover:text-slate-900'}`}
                >
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Doctors</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSearchTab('medicines')}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${selectedSearchTab === 'medicines' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'hover:text-slate-900'}`}
                >
                  <Pill className="w-3.5 h-3.5 text-teal-600" />
                  <span>Medicines</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSearchTab('pharmacies')}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${selectedSearchTab === 'pharmacies' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'hover:text-slate-900'}`}
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pharmacies</span>
                </button>
              </div>

              {/* Fast Input Bar with Live Autocomplete */}
              <form onSubmit={handleFastSearch} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <SearchAutocomplete
                    value={heroSearchQuery}
                    onChange={setHeroSearchQuery}
                    filterType={selectedSearchTab === 'all' ? 'all' : (selectedSearchTab === 'medicines' ? 'medicine' : selectedSearchTab === 'doctors' ? 'doctor' : selectedSearchTab === 'pharmacies' ? 'pharmacy' : 'all')}
                    placeholder={
                      selectedSearchTab === 'doctors' 
                        ? 'Search doctors, specialties (e.g. Cardiologist, Dr. Suresh Babu)...' 
                        : selectedSearchTab === 'medicines'
                        ? 'Search medicines, generics, brands (e.g. Dolo 650, Paracetamol, Pan-D)...'
                        : selectedSearchTab === 'pharmacies'
                        ? 'Search 24/7 pharmacies, chemists near you (e.g. Apollo, MedPlus)...'
                        : 'Search doctors, medicines (Dolo, Paracetamol), pharmacies, specialties...'
                    }
                    onSelect={(item) => {
                      if (item.type === 'medicine') {
                        navigate(`/medicines?q=${encodeURIComponent(item.title)}`);
                      } else if (item.type === 'doctor') {
                        navigate(`/doctors?q=${encodeURIComponent(item.title)}`);
                      } else if (item.type === 'pharmacy') {
                        navigate(`/pharmacies?q=${encodeURIComponent(item.title)}`);
                      } else if (item.type === 'hospital') {
                        navigate(`/hospitals?q=${encodeURIComponent(item.title)}`);
                      } else if (item.type === 'specialty') {
                        navigate(`/doctors?specialty=${encodeURIComponent(item.title)}`);
                      } else {
                        navigate(`/doctors?q=${encodeURIComponent(item.title)}`);
                      }
                    }}
                  />
                </div>

                <button
                  type="submit"
                  id="hero-btn-fast-search"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 px-1 text-xs">
                <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold mr-1">Fast Queries:</span>
                {quickPopularSearches.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200/80 transition-colors text-[11px] font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Discovery Navigation Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs"
          >
            <Link 
              to="/doctors" 
              id="hero-quick-link-doctors"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition-all shadow-xs font-semibold"
            >
              <Stethoscope className="w-4 h-4 text-emerald-600" />
              <span>Find a Doctor</span>
            </Link>

            <Link 
              to="/pharmacies" 
              id="hero-quick-link-pharmacies"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-amber-50 text-slate-800 hover:text-amber-800 border border-slate-200 hover:border-amber-300 transition-all shadow-xs font-semibold"
            >
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Find a Pharmacy</span>
            </Link>

            <Link 
              to="/medicines" 
              id="hero-quick-link-medicines"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-teal-50 text-slate-800 hover:text-teal-800 border border-slate-200 hover:border-teal-300 transition-all shadow-xs font-semibold"
            >
              <Pill className="w-4 h-4 text-teal-600" />
              <span>Medicine Encyclopedia</span>
            </Link>

            <Link 
              to="/ai-assistant" 
              id="hero-quick-link-ai"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm font-bold"
            >
              <Bot className="w-4 h-4 text-white" />
              <span>Ask AI Assistant (Fast)</span>
            </Link>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* CINEMATIC COMPOSITION: HIGH-RESOLUTION BRIGHT CLINICAL SUITE */}
        {/* ============================================================ */}
        <motion.div 
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative rounded-3xl lg:rounded-[32px] overflow-hidden bg-white border border-slate-200/90 shadow-2xl shadow-emerald-950/10 group"
        >
          {/* Main Visual Image Window with Bright Realistic Asset */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] w-full overflow-hidden bg-slate-100">
            <img
              src={heroBrightHealthcareImg}
              alt="Modern bright Indian healthcare consultation suite with compassionate doctor and patient, digital health records"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-[1.02]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = doctorConsultationImg;
              }}
            />

            {/* Subtle Gradient Overlays for Readability (Clean & Bright) */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            
            {/* Top Badge: Verified Clinic Network */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-mono text-emerald-800 font-bold shadow-md">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>INTEGRATED CARE CONSOLE • LIVE</span>
              </div>
            </div>

            {/* Bottom Overlay Content */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 text-white max-w-lg">
              <span className="px-2.5 py-1 rounded-md bg-emerald-600/90 text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                Next-Generation Healthcare Innovation
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 drop-shadow-md">
                Modern Clinic Infrastructure for Andhra Pradesh & Beyond
              </h2>
            </div>
          </div>

          {/* Bottom Layered Interface Ribbon: Doctor OPD Live Token + QR Prescription Dispatch */}
          <div className="p-5 sm:p-7 bg-white border-t border-slate-100 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center justify-between">
              
              {/* Doctor OPD Token Live Indicator (7 Cols) */}
              <div className="md:col-span-7 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 shadow-inner">
                  <Stethoscope className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-slate-900">Outpatient Consultation Session</p>
                    <span className="inline-flex items-center text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-semibold border border-emerald-300">
                      Token #08 In Progress
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Estimated queue wait: ~6 mins • Direct clinic synchronization • ABDM Certified</span>
                  </p>
                </div>
              </div>

              {/* Digital E-Prescription & Pharmacy Dispatch Sync (5 Cols) */}
              <div className="md:col-span-5 flex items-center justify-between sm:justify-end gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                    <QrCode className="w-4 h-4 text-teal-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900">Cryptographic E-Prescription</p>
                    <p className="text-[11px] text-slate-500">Instant pharmacy handoff</p>
                  </div>
                </div>

                <Link
                  to="/pharmacies"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Verify Rx
                </Link>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:border-emerald-300 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Verified Doctor Directory & Timings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore verified specialist clinicians, qualifications, consultation hours, and clinic addresses across India.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:border-teal-300 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Pill className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">OpenFDA Medicine Directory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent drug pricing, generic substitutes, side-effect profiles, and regulatory monographs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:border-cyan-300 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Sub-Second AI Clinical Assistant</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time symptom triage, multilingual medical explanations in Telugu, Hindi, and English.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:border-indigo-300 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">ABDM National Health Network</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict Ayushman Bharat Digital Mission compliance with encrypted records and patient-governed consent.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
};
