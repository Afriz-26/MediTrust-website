import React from 'react';
import { motion } from 'motion/react';
import { Building2, ShieldCheck, HeartPulse, Linkedin, Github, Phone, Mail, GraduationCap, Server, Lock, AlertTriangle, FileText, CheckCircle2, Clock, MapPin, Cpu, ShieldAlert, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

export const AboutMedynexPage: React.FC = () => {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://medynex.com/about-medynex/#webpage',
        'url': 'https://medynex.com/about-medynex',
        'name': 'About Medynex Solutions LLP',
        'description': 'Official corporate profile of Medynex Solutions LLP, the healthtech organization behind MediTrust.',
        'publisher': {
          '@id': 'https://medynex.com/#organization'
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://medynex.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'About Medynex Solutions LLP', 'item': 'https://medynex.com/about-medynex' }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title="About Medynex Solutions LLP | Enterprise Healthcare Technology"
        description="Medynex Solutions LLP is a pioneering digital healthcare technology company founded by Shaik Afriz and B. Nandini (Mohan Babu University). Dedicated to innovating healthcare through technology."
        canonicalUrl="https://medynex.com/about-medynex"
        schema={aboutSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 font-mono bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" /> Corporate Profile & E-E-A-T Trust
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Medynex Solutions LLP
          </h1>
          <p className="text-xl font-medium text-cyan-400 font-mono">
            "Innovating Healthcare Through Technology"
          </p>
          <p className="text-slate-300 text-base leading-relaxed">
            The premier healthcare technology enterprise architecting India's most connected, accessible, and intelligent care ecosystem—MediTrust.
          </p>
        </div>

        {/* Company Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <Building2 className="w-8 h-8 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Who We Are</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Medynex Solutions LLP is a healthcare technology enterprise specializing in health data interoperability, real-time hospital queue management, teleconsultation systems, and clinical AI assistants.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <HeartPulse className="w-8 h-8 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Our Mission</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To eliminate healthcare delays, paper fragmentation, and administrative friction by connecting patients, clinicians, hospitals, pharmacies, and diagnostic centers on one unified cloud platform.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <ShieldCheck className="w-8 h-8 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Compliance & Security</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Built natively compliant with ABDM (Ayushman Bharat Digital Mission M1, M2, M3), ISO 27001 data security standards, and HIPAA patient privacy guidelines.
            </p>
          </div>
        </div>

        {/* Leadership Grid */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-blue-950/80 via-[#111827] to-indigo-950/60 border border-blue-500/30 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Executive Leadership</h2>
            <p className="text-sm text-slate-300">
              Founded and led by software innovators and operations leaders from <strong>Mohan Babu University</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-blue-400">
                <GraduationCap className="w-5 h-5" />
                <span className="text-xs font-mono uppercase font-bold">Mohan Babu University Alumnus</span>
              </div>
              <h3 className="text-xl font-bold text-white">Shaik Afriz (Afriz Shaik)</h3>
              <p className="text-xs text-blue-400 font-semibold">Founder & Chief Executive Officer</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pioneered the MediTrust ecosystem, real-time queue tokens, and ABDM interoperability layers for hospital networks.
              </p>
              <div className="pt-2 flex items-center space-x-3">
                <Link to="/founder" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500">View Founder Profile</Link>
                <a href="https://linkedin.com/in/shaik-afriz-a49311385" target="_blank" rel="noreferrer" title="LinkedIn Profile" className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"><Linkedin className="w-4 h-4" /></a>
                <a href="https://github.com/shaik-afriz" target="_blank" rel="noreferrer" title="GitHub Profile" className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"><Github className="w-4 h-4" /></a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-cyan-400">
                <GraduationCap className="w-5 h-5" />
                <span className="text-xs font-mono uppercase font-bold">Mohan Babu University Alumna</span>
              </div>
              <h3 className="text-xl font-bold text-white">Bandi Nandini (B. Nandini)</h3>
              <p className="text-xs text-cyan-400 font-semibold">Co-Founder & Head of Operations</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Directs hospital onboarding workflows, laboratory network synchronization, and customer experience operations.
              </p>
              <div className="pt-2 flex items-center space-x-3">
                <Link to="/co-founder" className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-semibold hover:bg-cyan-500">View Co-Founder Profile</Link>
                <a href="https://www.linkedin.com/in/bandi-nandini-63686a379" target="_blank" rel="noreferrer" title="LinkedIn Profile" className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"><Linkedin className="w-4 h-4 text-cyan-400" /></a>
                <a href="mailto:nbandi388@gmail.com" title="Email Bandi Nandini" className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"><Mail className="w-4 h-4 text-cyan-400" /></a>
                <a href="tel:+918328620294" title="Call Operations" className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"><Phone className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack & Platform Architecture */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#111827] border border-slate-800 space-y-6">
          <div className="flex items-center space-x-3">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Technology Stack & Architecture</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold">Frontend Engine</span>
              <h3 className="text-sm font-bold text-white">React 18 & TypeScript</h3>
              <p className="text-xs text-slate-400">Vite bundler, Tailwind CSS design system, Motion animations, and PWA offline capability.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-blue-400 font-bold">Backend Services</span>
              <h3 className="text-sm font-bold text-white">Node.js / Express microservices</h3>
              <p className="text-xs text-slate-400">Sub-second queue token engine, RESTful API gateway, and Supabase / PostgreSQL database cluster.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold">AI & Clinical Intelligence</span>
              <h3 className="text-sm font-bold text-white">Google Gemini Multimodal API</h3>
              <p className="text-xs text-slate-400">Symptom triage, prescription scanner, medicine verification, and medical terminology translator.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">Interoperability</span>
              <h3 className="text-sm font-bold text-white">ABDM / ABHA Standards</h3>
              <p className="text-xs text-slate-400">Milestone 1, 2, 3 compliant data bridges for linking health records and digital consent artifact exchange.</p>
            </div>
          </div>
        </div>

        {/* Healthcare Disclaimers & Trust Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-7 rounded-3xl bg-[#111827] border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Medical Disclaimer</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              MediTrust is a digital health platform designed for scheduling, workflow management, and informational support. MediTrust does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified registered medical practitioner for any clinical concerns.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#111827] border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Lock className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Responsible AI Disclaimer</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The MediTrust AI Assistant provides preliminary triage and medical educational information only. AI outputs must be validated by a licensed physician before taking any medical action or stopping prescribed treatments.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#111827] border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Patient Safety Statement</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In cases of acute medical emergency, chest pain, stroke, severe injury, or breathing difficulty, please bypass online booking immediately and proceed to the nearest emergency room or call local emergency services (108 in India).
            </p>
          </div>
        </div>

        {/* Official Contact & Business Details */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#111827] border border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-400" />
            <span>Corporate Contact Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-[#0B1120] border border-slate-800 space-y-1">
              <span className="font-mono text-slate-400 font-semibold block">Official Entity</span>
              <span className="font-bold text-white text-sm">Medynex Solutions LLP</span>
              <span className="block text-slate-400">Incorporated in India</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1120] border border-slate-800 space-y-1">
              <span className="font-mono text-slate-400 font-semibold block">Business & Support Email</span>
              <a href="mailto:medynexsolutions26@gmail.com" className="font-bold text-cyan-400 text-sm hover:underline block">medynexsolutions26@gmail.com</a>
              <span className="block text-slate-400">Average response time: &lt; 24 hrs</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1120] border border-slate-800 space-y-1">
              <span className="font-mono text-slate-400 font-semibold block">Support Hotline</span>
              <a href="tel:+918328620294" className="font-bold text-white text-sm hover:underline block">+91 8328620294</a>
              <span className="block text-slate-400">Mon-Sat, 9:00 AM - 7:00 PM IST</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1120] border border-slate-800 space-y-1">
              <span className="font-mono text-slate-400 font-semibold block">Operating Hubs</span>
              <span className="font-bold text-white text-sm">Tirupati & Hyderabad</span>
              <span className="block text-slate-400">Andhra Pradesh / Telangana, India</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
