import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Zap,
  PhoneCall,
  CalendarCheck2
} from 'lucide-react';
import heroConsultationImg from '../../assets/images/medynex_hero_consultation_1787293734626.jpg';

export const HeroSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'all' | 'patient' | 'doctor' | 'pharmacy'>('all');

  return (
    <div className="relative bg-[#101515] text-[#F7F8F6] overflow-hidden selection:bg-[#2B9A91]/30 selection:text-white">
      
      {/* Background Architectural Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft upper teal ambient radiance */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-[#0E6763]/25 via-[#2B9A91]/10 to-transparent blur-[140px] rounded-full" />
        {/* Atmospheric side accents */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#0E6763]/15 blur-[160px] rounded-full" />
        <div className="absolute top-2/3 -left-40 w-[550px] h-[550px] bg-[#2B9A91]/12 blur-[150px] rounded-full" />
        
        {/* Subtle architectural grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.025]" 
          style={{ 
            backgroundImage: `radial-gradient(#FFFFFF 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: THE IMMERSIVE CINEMATIC HERO */}
      {/* ============================================================ */}
      <section className="relative z-10 pt-12 pb-16 lg:pt-20 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Pill & Live Compliance Indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 lg:mb-14">
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#161F1F]/90 border border-[#263737] text-xs text-[#DCEFEA] backdrop-blur-md shadow-lg"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2B9A91] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2B9A91]"></span>
            </span>
            <span className="font-semibold text-white tracking-wide">MEDYNEX SOLUTIONS</span>
            <span className="text-[#526462]">•</span>
            <span className="text-[#85D3CB] font-mono font-medium">MEDYTRUST AI OS</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4 text-xs text-[#94A7A4] font-medium"
          >
            <span className="inline-flex items-center gap-1.5 text-[#DCEFEA]">
              <ShieldCheck className="w-4 h-4 text-[#2B9A91]" />
              <span>ABDM Compliant M1–M3</span>
            </span>
            <span className="text-[#324443] hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 text-[#DCEFEA] hidden sm:inline-flex">
              <Activity className="w-4 h-4 text-[#2B9A91]" />
              <span>Live Clinic & Pharmacy Mesh</span>
            </span>
          </motion.div>
        </div>

        {/* Editorial Headline & Value Statement (Centered, Bold, Art-Directed) */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12 lg:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[72px] font-bold text-white tracking-tight leading-[1.06]"
          >
            Healthcare, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B9A91] via-[#85D3CB] to-[#E7EAE7]">
              intelligently connected.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-xl text-[#BACAC7] max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Medynex Solutions connects patients, doctors, and pharmacies through a smarter digital healthcare experience powered by intelligent technology.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link
              to="/register"
              id="hero-btn-primary-get-started"
              className="px-8 py-4 rounded-xl font-bold text-sm bg-[#0E6763] hover:bg-[#2B9A91] text-white transition-all duration-300 shadow-xl shadow-[#0E6763]/40 hover:shadow-[#2B9A91]/50 hover:-translate-y-0.5 flex items-center space-x-2.5 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              to="/how-it-works"
              id="hero-btn-secondary-explore"
              className="px-7 py-4 rounded-xl font-semibold text-sm bg-[#162121]/90 hover:bg-[#1E2E2E] text-[#E7EAE7] border border-[#2D3E3E] hover:border-[#2B9A91]/60 transition-all duration-300 hover:-translate-y-0.5 flex items-center space-x-2 shadow-lg backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-[#2B9A91]" />
              <span>Explore MediTrust</span>
            </Link>

            <Link
              to="/contact"
              id="hero-btn-tertiary-demo"
              className="px-6 py-4 rounded-xl font-semibold text-sm bg-transparent hover:bg-[#162121]/50 text-[#C4D5D2] hover:text-white border border-transparent hover:border-[#283838] transition-all duration-300 flex items-center space-x-2"
            >
              <CalendarCheck2 className="w-4 h-4 text-[#85D3CB]" />
              <span>Book a Demo</span>
            </Link>
          </motion.div>

          {/* Quick Contextual Discovery Navigation Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs"
          >
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#687C79] mr-1 hidden md:inline-block">
              Quick Discovery:
            </span>

            <Link 
              to="/doctors" 
              id="hero-quick-link-doctors"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141E1E] hover:bg-[#1C2929] text-[#C4D7D4] hover:text-white border border-[#243434] transition-all hover:border-[#2B9A91]/50 shadow-xs"
            >
              <Stethoscope className="w-3.5 h-3.5 text-[#2B9A91]" />
              <span>Find a Doctor</span>
            </Link>

            <Link 
              to="/pharmacies" 
              id="hero-quick-link-pharmacies"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141E1E] hover:bg-[#1C2929] text-[#C4D7D4] hover:text-white border border-[#243434] transition-all hover:border-[#2B9A91]/50 shadow-xs"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Find a Pharmacy</span>
            </Link>

            <Link 
              to="/medicines" 
              id="hero-quick-link-medicines"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141E1E] hover:bg-[#1C2929] text-[#C4D7D4] hover:text-white border border-[#243434] transition-all hover:border-[#2B9A91]/50 shadow-xs"
            >
              <Pill className="w-3.5 h-3.5 text-[#85D3CB]" />
              <span>Order Medicines</span>
            </Link>

            <Link 
              to="/ai-assistant" 
              id="hero-quick-link-ai"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141E1E] hover:bg-[#1C2929] text-[#DCEFEA] hover:text-white border border-[#243434] transition-all hover:border-[#2B9A91]/50 shadow-xs"
            >
              <Bot className="w-3.5 h-3.5 text-[#2B9A91]" />
              <span>Ask AI</span>
            </Link>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* CINEMATIC COMPOSITION: EXPANSIVE PHOTOGRAPHY + REAL EMBEDDED UI */}
        {/* ============================================================ */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="relative rounded-3xl lg:rounded-[32px] overflow-hidden bg-[#121A1A] border border-[#253636] shadow-2xl shadow-black/90 group"
        >
          
          {/* Main Visual Image Window */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] w-full overflow-hidden">
            <img
              src={heroConsultationImg}
              alt="Authentic Medical Consultation in Modern Healthcare Clinic with Medynex Solutions"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-[1.02]"
            />

            {/* Editorial Scrim Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101515] via-[#101515]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#101515]/60 via-transparent to-[#101515]/40" />
            <div className="absolute inset-0 bg-[#0E6763]/10 mix-blend-color pointer-events-none" />

            {/* Subtle Brand Watermark Tag (Top-Left) */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#101717]/80 backdrop-blur-md border border-[#2B3E3E] text-[11px] font-mono text-[#DCEFEA] shadow-md">
                <Compass className="w-3.5 h-3.5 text-[#2B9A91]" />
                <span>INTEGRATED CARE CONSOLE</span>
              </div>
            </div>
          </div>

          {/* Bottom Layered Interface Ribbon: Doctor OPD Live Token + QR Prescription Dispatch */}
          <div className="p-5 sm:p-7 bg-gradient-to-t from-[#101515] via-[#121A1A]/95 to-[#121A1A]/85 border-t border-[#233535] relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center justify-between">
              
              {/* Doctor OPD Token Live Indicator (7 Cols) */}
              <div className="md:col-span-7 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#182424] border border-[#2D4040] flex items-center justify-center shrink-0 shadow-inner">
                  <Stethoscope className="w-6 h-6 text-[#2B9A91]" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-white">Dr. Anita Rao, MD (Cardiology)</p>
                    <span className="inline-flex items-center text-[10px] px-2.5 py-0.5 rounded-full bg-[#0E6763]/40 text-[#DCEFEA] font-mono font-semibold border border-[#2B9A91]/30">
                      Token #08 In Session
                    </span>
                  </div>
                  <p className="text-xs text-[#8EA3A0] flex items-center gap-2 mt-1">
                    <Clock className="w-3.5 h-3.5 text-[#2B9A91]" />
                    <span>Estimated wait: ~6 mins • Apollo Hospital OPD • ABDM Certified</span>
                  </p>
                </div>
              </div>

              {/* Digital E-Prescription & Pharmacy Dispatch Sync (5 Cols) */}
              <div className="md:col-span-5 flex items-center justify-between sm:justify-end gap-3 p-3 rounded-2xl bg-[#162222] border border-[#293B3B]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1E2E2E] flex items-center justify-center">
                    <QrCode className="w-4 h-4 text-[#85D3CB]" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white">E-Prescription Dispense</p>
                    <p className="text-[10px] text-[#7F9794]">Auto-routed to MedPlus Chemist</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified</span>
                </span>
              </div>

            </div>
          </div>

        </motion.div>

      </section>

      {/* ============================================================ */}
      {/* SECTION 2: NATURAL ARCHITECTURAL TRANSITION */}
      {/* "One platform. Three connected healthcare experiences." */}
      {/* ============================================================ */}
      <section className="relative z-10 border-t border-[#1C2A2A] bg-[#0C1111]/95 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-[#2B9A91] mb-2 font-semibold">
              UNIFIED HEALTHCARE ARCHITECTURE
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              One platform. Three connected healthcare experiences.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8FA3A0]">
              Medynex Solutions aligns patient discovery, clinical doctor workflows, and licensed pharmacy fulfillment in real time.
            </p>
          </div>

          {/* Three Audience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1: Patients */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="p-7 rounded-3xl bg-[#121A1A] border border-[#223333] hover:border-[#2B9A91]/60 transition-all flex flex-col justify-between group shadow-xl shadow-black/50"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#182424] border border-[#283C3C] flex items-center justify-center mb-6 group-hover:bg-[#0E6763]/25 transition-colors">
                  <Users className="w-6 h-6 text-[#2B9A91]" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">For Patients</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A2626] text-[#DCEFEA]">Discovery & Care</span>
                </div>
                <p className="text-sm text-[#94A7A4] leading-relaxed mb-6">
                  Find verified doctors by specialty, book live OPD queue tokens, access tamper-proof digital prescriptions, and order medications from local pharmacies.
                </p>
                <ul className="space-y-2.5 text-xs text-[#B2C5C2] mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2B9A91] shrink-0" />
                    <span>Real-time OPD queue live countdown</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2B9A91] shrink-0" />
                    <span>Instant WhatsApp token notifications</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2B9A91] shrink-0" />
                    <span>ABDM linked health records & Ayushman Bharat</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/doctors"
                id="hero-card-cta-patients"
                className="w-full py-3 px-4 rounded-xl bg-[#182424] hover:bg-[#0E6763] text-white text-xs font-semibold text-center border border-[#2B3E3E] hover:border-[#0E6763] transition-all flex items-center justify-center gap-2 shadow-xs group"
              >
                <span>Find Doctors & Book OPD</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Card 2: Doctors & Clinics */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="p-7 rounded-3xl bg-[#121A1A] border border-[#223333] hover:border-[#2B9A91]/60 transition-all flex flex-col justify-between group shadow-xl shadow-black/50"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#182424] border border-[#283C3C] flex items-center justify-center mb-6 group-hover:bg-[#0E6763]/25 transition-colors">
                  <Stethoscope className="w-6 h-6 text-[#85D3CB]" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">For Doctors & Clinics</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A2626] text-[#DCEFEA]">Clinical OS</span>
                </div>
                <p className="text-sm text-[#94A7A4] leading-relaxed mb-6">
                  Streamline clinic OPD operations, generate AI-assisted clinical summaries, issue QR-verified digital prescriptions, and reduce patient waiting crowds by 65%.
                </p>
                <ul className="space-y-2.5 text-xs text-[#B2C5C2] mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2B9A91] shrink-0" />
                    <span>Smart digital token queue management</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2B9A91] shrink-0" />
                    <span>1-Click Rx with drug-interaction checks</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2B9A91] shrink-0" />
                    <span>ABDM M1, M2, and M3 certified records</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/for-doctors"
                id="hero-card-cta-doctors"
                className="w-full py-3 px-4 rounded-xl bg-[#182424] hover:bg-[#0E6763] text-white text-xs font-semibold text-center border border-[#2B3E3E] hover:border-[#0E6763] transition-all flex items-center justify-center gap-2 shadow-xs group"
              >
                <span>Join as Doctor / Clinic</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Card 3: Pharmacies */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="p-7 rounded-3xl bg-[#121A1A] border border-[#223333] hover:border-[#2B9A91]/60 transition-all flex flex-col justify-between group shadow-xl shadow-black/50"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#182424] border border-[#283C3C] flex items-center justify-center mb-6 group-hover:bg-[#0E6763]/25 transition-colors">
                  <Building2 className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">For Pharmacies</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A2626] text-[#DCEFEA]">Fulfillment</span>
                </div>
                <p className="text-sm text-[#94A7A4] leading-relaxed mb-6">
                  Receive authenticated digital prescriptions directly from nearby clinics, manage live medicine inventory, and provide verified doorstep delivery.
                </p>
                <ul className="space-y-2.5 text-xs text-[#B2C5C2] mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2B9A91] shrink-0" />
                    <span>Instant QR prescription validation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2B9A91] shrink-0" />
                    <span>Real-time local inventory discovery</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2B9A91] shrink-0" />
                    <span>Digital billing & direct customer fulfillment</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/for-pharmacies"
                id="hero-card-cta-pharmacies"
                className="w-full py-3 px-4 rounded-xl bg-[#182424] hover:bg-[#0E6763] text-white text-xs font-semibold text-center border border-[#2B3E3E] hover:border-[#0E6763] transition-all flex items-center justify-center gap-2 shadow-xs group"
              >
                <span>Join as Licensed Pharmacy</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>

        </div>
      </section>

    </div>
  );
};
