import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Crown, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Quote, 
  Mail, 
  Building,
  GraduationCap,
  Megaphone,
  Share2,
  Users,
  Compass,
  Code2,
  HeartPulse,
  Send,
  CameraOff,
  Clock,
  Briefcase
} from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const TeamPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8 selection:bg-emerald-100 selection:text-emerald-900">
      <SEO
        title="Leadership & Team | Medynex Solutions LLP - MediTrust"
        description="Meet the passionate founding team and digital leaders behind Medynex Solutions LLP and MediTrust: Shaik Afriz (Founder, CEO & CTO), B. Nandini (Co-Founder & Head of Operations), and T Vrithika (Digital Marketing Lead)."
        keywords={['Shaik Afriz', 'B Nandini', 'T Vrithika', 'Medynex team', 'MediTrust founders', 'healthcare startup team India']}
        canonicalUrl="https://medynex.com/team"
      />

      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Editorial Section Kicker & Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
            <Crown className="w-3.5 h-3.5 text-emerald-600" />
            <span>Executive Leadership & Core Team</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            The Team Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">MediTrust</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Medynex Solutions LLP is spearheaded by young, ambitious technologists and leaders engineering transparent, patient-first digital healthcare infrastructure for India.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600">
            <CameraOff className="w-3.5 h-3.5 text-slate-500" />
            <span>Official member portraits reserved — authentic studio photographs will be published soon.</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* EXECUTIVE FOUNDER SPREAD 1: SHAIK AFRIZ */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group hover:border-emerald-400 transition-all"
        >
          {/* Monogram Badge Column (No Demo Image) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-10 bg-gradient-to-br from-slate-900 via-[#0A192F] to-[#042022] text-white overflow-hidden min-h-[340px]">
            {/* Ambient Background Aura */}
            <div className="absolute -top-16 -left-16 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-xl bg-slate-800/80 backdrop-blur-md text-emerald-300 text-[11px] font-mono font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <Crown className="w-3 h-3 text-emerald-400" />
                Founder & Executive
              </span>
            </div>

            {/* Elegant Monogram Card */}
            <div className="relative z-10 text-center space-y-4">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 p-[3px] shadow-2xl mx-auto group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-[22px] bg-[#07131B] flex flex-col items-center justify-center border border-white/10">
                  <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-white font-mono tracking-wider">
                    SA
                  </span>
                  <span className="text-[10px] text-emerald-400/80 font-mono tracking-widest mt-1">FOUNDER</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Shaik.Afriz</h3>
                <p className="text-xs text-emerald-400 font-medium">Founder / CEO / CTO</p>
                <p className="text-[11px] text-slate-400 mt-1">Medynex Solutions LLP • Kanigiri, AP</p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>Real Photograph Upload Pending</span>
              </div>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono font-semibold uppercase tracking-wider">
                <span>Technology Architecture</span>
                <span aria-hidden="true">·</span>
                <span>Clinical AI Systems</span>
                <span aria-hidden="true">·</span>
                <span>Executive Strategy</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Shaik.Afriz
                </h2>
                <p className="text-sm sm:text-base font-bold text-emerald-600 mt-1">
                  Founder / Chief Executive Officer / Chief Technology Officer
                </p>
                <p className="text-xs text-slate-500 font-medium">Medynex Solutions LLP</p>
              </div>

              {/* Biography Paragraphs */}
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed font-normal pt-2">
                <p>
                  Shaik Afriz is the visionary creator, primary software architect, and lead technologist behind the MediTrust digital health ecosystem. He directs core engineering across distributed cloud systems, real-time WebSocket token queues, clinical AI models, and national Ayushman Bharat Digital Mission (ABDM M1–M3) health data standards.
                </p>
                <p>
                  With a profound commitment to bridging the technological divide between metropolitan tertiary centers and regional Indian communities, he conceived MediTrust to eliminate overcrowded outpatient waiting rooms, safeguard patient prescription records, and empower verified independent pharmacists.
                </p>
              </div>

              {/* Founder Quote Block */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 relative mt-4">
                <Quote className="w-5 h-5 text-emerald-600/30 mb-1" />
                <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                  "Healthcare in India should not be a test of physical endurance in packed clinic waiting corridors. We are engineering software that restores dignity, transparency, and sub-second precision to every patient-doctor interaction."
                </p>
              </div>

              {/* Core Competencies Chips */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-800 block mb-2">Executive Focus Areas:</span>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">Full-Stack Cloud Architecture</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">Conversational Clinical AI</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">ABDM M1, M2 & M3 Integration</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">National Product Roadmap</span>
                </div>
              </div>
            </div>

            {/* Profile Action Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Medynex Executive Office</span>
              <Link
                to="/founder"
                id="btn-team-founder-bio"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-sm group"
              >
                <span>Read Full Founder Bio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* EXECUTIVE FOUNDER SPREAD 2: B. NANDINI */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group hover:border-teal-400 transition-all"
        >
          {/* Monogram Badge Column (No Demo Image) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-10 bg-gradient-to-br from-slate-900 via-[#0D1F2D] to-[#082E32] text-white overflow-hidden min-h-[340px] lg:order-last">
            {/* Ambient Aura */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-xl bg-teal-950/80 backdrop-blur-md text-teal-300 text-[11px] font-mono font-bold border border-teal-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-teal-400" />
                Co-Founder & Operations
              </span>
            </div>

            {/* Elegant Monogram Card */}
            <div className="relative z-10 text-center space-y-4">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-teal-500 via-cyan-500 to-emerald-400 p-[3px] shadow-2xl mx-auto group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-[22px] bg-[#071720] flex flex-col items-center justify-center border border-white/10">
                  <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-cyan-200 to-white font-mono tracking-wider">
                    BN
                  </span>
                  <span className="text-[10px] text-teal-400/80 font-mono tracking-widest mt-1">CO-FOUNDER</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">B. Nandini</h3>
                <p className="text-xs text-teal-400 font-medium">Co-Founder & Head of Operations</p>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <GraduationCap className="w-3 h-3 text-teal-400" />
                  Andhra Pradesh, India
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300">
                <Clock className="w-3 h-3 text-teal-400" />
                <span>Real Photograph Upload Pending</span>
              </div>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-teal-700 font-mono font-semibold uppercase tracking-wider">
                <span>Clinical Provider Workflows</span>
                <span aria-hidden="true">·</span>
                <span>Pharmacy Operations</span>
                <span aria-hidden="true">·</span>
                <span>Operations & Clinical Workflows</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  B. Nandini
                </h2>
                <p className="text-sm sm:text-base font-bold text-teal-700 mt-1">
                  Co-Founder and Head of Healthcare Operations
                </p>
                <p className="text-xs text-slate-500 font-medium">Medynex Solutions LLP • Co-Founder & Operations Lead</p>
              </div>

              {/* Biography Paragraphs */}
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed font-normal pt-2">
                <p>
                  B. Nandini (Bandi Nandini) is the co-founder directing healthcare operations, clinical provider engagement, organizational governance, and network onboarding standards across Medynex Solutions LLP. She ensures that clinical workflows mirror the ground realities of practicing doctors and retail pharmacists.
                </p>
                <p>
                  Her operational leadership oversees practitioner verification frameworks, e-prescription fulfillment pipelines, patient care protocols, and hospital outreach, ensuring that MediTrust delivers seamless, trustworthy service.
                </p>
              </div>

              {/* Founder Quote Block */}
              <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-100 relative mt-4">
                <Quote className="w-5 h-5 text-teal-600/30 mb-1" />
                <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                  "True digital healthcare is fundamentally human-centered. Our ongoing mission is to ensure that every doctor, clinic assistant, pharmacist, and family patient experiences fluid, compassionate, and reliable technology."
                </p>
              </div>

              {/* Core Competencies Chips */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-800 block mb-2">Operational Focus Areas:</span>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">Clinical Workflow Management</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">Provider Onboarding Frameworks</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">Patient Safety & Quality Assurance</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">Regional Operations Oversight</span>
                </div>
              </div>
            </div>

            {/* Profile Action Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Medynex Operations Bureau</span>
              <Link
                to="/co-founder"
                id="btn-team-cofounder-bio"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-sm group"
              >
                <span>Read Full Co-Founder Bio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* TRUSTED TEAM MEMBER SPREAD 3: T VRITHIKA */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group hover:border-indigo-400 transition-all"
        >
          {/* Monogram Badge Column (No Demo Image) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-10 bg-gradient-to-br from-slate-900 via-[#1E1B4B] to-[#0F172A] text-white overflow-hidden min-h-[340px]">
            {/* Ambient Aura */}
            <div className="absolute -top-16 -left-16 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-xl bg-indigo-950/80 backdrop-blur-md text-indigo-300 text-[11px] font-mono font-bold border border-indigo-500/30 flex items-center gap-1.5">
                <Megaphone className="w-3 h-3 text-indigo-400" />
                Digital Marketing Lead
              </span>
            </div>

            {/* Elegant Monogram Card */}
            <div className="relative z-10 text-center space-y-4">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 p-[3px] shadow-2xl mx-auto group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-[22px] bg-[#0E1026] flex flex-col items-center justify-center border border-white/10">
                  <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 font-mono tracking-wider">
                    TV
                  </span>
                  <span className="text-[10px] text-indigo-400/80 font-mono tracking-widest mt-1">MARKETING</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">T Vrithika</h3>
                <p className="text-xs text-indigo-400 font-medium">Digital Marketing & Growth Strategist</p>
                <p className="text-[11px] text-slate-300 mt-1 flex items-center justify-center gap-1">
                  <GraduationCap className="w-3 h-3 text-indigo-400" />
                  Andhra Pradesh, India
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span>Real Photograph Upload Pending</span>
              </div>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-indigo-700 font-mono font-semibold uppercase tracking-wider">
                <span>Brand Visibility</span>
                <span aria-hidden="true">·</span>
                <span>Growth Marketing</span>
                <span aria-hidden="true">·</span>
                <span>Community Growth</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  T Vrithika
                </h2>
                <p className="text-sm sm:text-base font-bold text-indigo-600 mt-1">
                  Digital Marketing Lead & Community Outreach Strategist
                </p>
                <p className="text-xs text-slate-500 font-medium">Medynex Solutions LLP • Digital Growth & Marketing</p>
              </div>

              {/* Biography Paragraphs */}
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed font-normal pt-2">
                <p>
                  <strong>T Vrithika</strong> is a core and trusted member of the Medynex team, working closely alongside the founders. She spearheads digital marketing initiatives, brand awareness campaigns, and online community growth for MediTrust across patient and healthcare provider networks.
                </p>
                <p>
                  Bringing dynamic creativity and data-driven insight, Vrithika manages cross-channel digital strategies, healthcare education content, university campus initiatives, and outreach campaigns. Her work ensures that patients, clinics, and pharmacies discover MediTrust's mission for transparent and accessible healthcare.
                </p>
              </div>

              {/* Team Member Quote Block */}
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 relative mt-4">
                <Quote className="w-5 h-5 text-indigo-600/30 mb-1" />
                <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                  "Digital marketing in healthcare isn't just about clicks or views; it is about building genuine trust and connecting patients and families with life-saving doctors and transparent medicines."
                </p>
              </div>

              {/* Core Competencies Chips */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-800 block mb-2">Key Focus Areas:</span>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">Digital Healthcare Marketing</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">Social Media Strategy & Campaigns</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">Campus & Youth Community Outreach</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-medium">Brand Communication & Engagement</span>
                </div>
              </div>
            </div>

            {/* Profile Action Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Medynex Marketing & Growth</span>
              <button
                type="button"
                onClick={() => handleCopyEmail('medynexsolutions26@gmail.com')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors border border-indigo-200"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{copiedEmail ? 'Email Copied!' : 'Contact Marketing Desk'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* JOIN OUR TEAM / WE'RE HIRING SECTION */}
        {/* ============================================================ */}
        <div id="join-us" className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              JOIN OUR MISSION • CAREERS & INTERNSHIPS
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Build the Future of Indian Healthcare With Us
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We are expanding! Whether you are an ambitious university student or a passionate engineer, healthcare specialist, or creative marketer across India, we invite you to collaborate with Medynex Solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Software Engineering</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-stack engineers, React/TypeScript developers, and cloud architects passionate about building sub-second clinical software.
              </p>
              <span className="inline-block text-[11px] font-mono text-emerald-700 font-semibold">Remote / Hybrid • Intern & Full-Time</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-teal-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <Megaphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Growth & Digital Marketing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work alongside T Vrithika on digital storytelling, healthcare content creation, university ambassador programs, and social media.
              </p>
              <span className="inline-block text-[11px] font-mono text-teal-700 font-semibold">Campus & Digital Outreach</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Healthcare Operations</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work with B. Nandini on clinical provider onboarding, hospital network relations, and independent pharmacy verification.
              </p>
              <span className="inline-block text-[11px] font-mono text-blue-700 font-semibold">Andhra Pradesh & Telangana</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h5 className="text-sm font-bold text-slate-900">Interested in working or interning with Medynex?</h5>
              <p className="text-xs text-slate-600">Send your CV, portfolio, or statement of purpose directly to our leadership desk.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="mailto:medynexsolutions26@gmail.com?subject=Application to Join Medynex Solutions Team"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Apply via Email</span>
              </a>
              <Link
                to="/careers"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors"
              >
                View Careers Page
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CORE FOUNDING COMMITMENTS & GOVERNANCE */}
        {/* ============================================================ */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600">
              COMPANY GOVERNANCE & ETHICS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Founding Principles
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Medynex Solutions LLP operates under transparent, patient-first guiding commitments designed for long-term clinical credibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Fake Claims or Fabrications</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                We present our platform truthfully. We do not manufacture fictitious provider partnerships, fake review stars, or artificial metrics. Our progress is built on genuine engineering.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pan-India Inclusivity</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Digital health tools must not be exclusive to large metropolitan hospitals. MediTrust is intentionally built to serve patients and doctors in mandal towns and growing districts.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Uncompromising Privacy & ABDM</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Patient health records are encrypted at rest and in transit. In strict adherence to Ayushman Bharat Digital Mission guidelines, all records remain governed exclusively by patient consent.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DIRECT EXECUTIVE CONNECT BANNER */}
        {/* ============================================================ */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0C1B2A] to-slate-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 text-center md:text-left max-w-xl relative z-10">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              OFFICIAL CORRESPONDENCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Connect With the Medynex Leadership Team
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              For partnership discussions, hospital network integrations, media queries, or institutional collaborations, get in touch directly with the founders of Medynex Solutions LLP.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10">
            <Link
              to="/contact"
              id="btn-team-contact-executives"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Executive Desk</span>
            </Link>

            <Link
              to="/careers"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-all border border-white/20 text-center"
            >
              <span>Explore Open Roles</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
