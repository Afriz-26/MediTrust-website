import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Award,
  Zap
} from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const ForDoctorsPage: React.FC = () => {
  const benefits = [
    {
      title: 'Verified Digital Profile',
      desc: 'Showcase your specialization, surgical experience, degrees, clinic timings, and OPD locations to thousands of patients searching in your city.',
      icon: Award
    },
    {
      title: 'Streamlined OPD Token Engine',
      desc: 'Eliminate chaotic waiting room crowds with real-time digital queue tokens that notify patients when to arrive at your clinic.',
      icon: Clock
    },
    {
      title: 'Patient Acquisition & Reach',
      desc: 'Connect with patients actively searching for specialists in your geographic territory without relying on word-of-mouth alone.',
      icon: Users
    },
    {
      title: 'Digital Prescriptions & Records',
      desc: 'Generate secure, QR-coded electronic prescriptions compliant with Indian digital health guidelines and ABDM standards.',
      icon: FileText
    },
    {
      title: 'Dynamic Availability Controls',
      desc: 'Control your schedule with custom consultation slots, emergency leave toggles, and instant online/offline fee management.',
      icon: Calendar
    },
    {
      title: 'Ad Booster & Local Visibility',
      desc: 'Optionally highlight your profile in high-intent patient searches across targeted municipal districts.',
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#101515] py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="For Doctors | Expand Your Clinical Practice with MediTrust"
        description="Join MediTrust as a verified medical specialist. Manage OPD appointments, patient queues, and digital prescriptions effortlessly."
        keywords={['doctor registration', 'clinic management software', 'MediTrust doctors', 'digital prescriptions India']}
        canonicalUrl="https://medynex.com/for-doctors"
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F1] border border-[#DCEFEA] text-[#0E6763] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Physician & Specialist Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#101515] tracking-tight leading-[1.1]">
              Build your digital presence. <br />
              <span className="text-[#0E6763]">Reach the patients</span> looking for you.
            </h1>

            <p className="text-base sm:text-lg text-[#737A78] max-w-xl leading-relaxed">
              MediTrust provides verified medical practitioners with an intelligent practice ecosystem — connecting you directly with nearby patients, automating queue management, and securing patient health records.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/register?role=doctor"
                className="px-7 py-3.5 rounded-2xl bg-[#101515] hover:bg-[#0E6763] text-white font-bold text-sm transition-all shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Join as a Doctor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="px-6 py-3.5 rounded-2xl bg-white text-[#101515] border border-[#E7EAE7] hover:border-[#0E6763] font-semibold text-sm transition-all"
              >
                <span>Learn How It Works</span>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E7EAE7]/80">
              <div>
                <div className="text-2xl font-black text-[#101515]">100%</div>
                <div className="text-xs text-[#737A78]">Verified Practitioners</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#101515]">0 Min</div>
                <div className="text-xs text-[#737A78]">Crowded Waiting Queue</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#101515]">ABDM</div>
                <div className="text-xs text-[#737A78]">Ready & Compliant</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card-editorial p-8 bg-white border border-[#E7EAE7] shadow-xl space-y-6 relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#0E6763] uppercase tracking-wider">Fast Onboarding</span>
                <h3 className="text-2xl font-bold text-[#101515]">Doctor Verification Roadmap</h3>
                <p className="text-xs text-[#737A78]">Our 4-step credential verification ensures trust across the entire ecosystem.</p>
              </div>

              <div className="space-y-4">
                {[
                  { step: '1', title: 'Register Account', desc: 'Create your secure profile using email and phone.' },
                  { step: '2', title: 'Upload Medical Registration', desc: 'Provide State Medical Council or NMC registration details.' },
                  { step: '3', title: 'Administrative Audit', desc: 'MediTrust compliance verifies qualifications within 24-48 hours.' },
                  { step: '4', title: 'Public Verified Status', desc: 'Your profile goes live with verified badge on the patient search engine.' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3.5 p-3 rounded-xl bg-[#F7F8F6] border border-[#E7EAE7]/60">
                    <span className="w-7 h-7 rounded-full bg-[#101515] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#101515]">{item.title}</h4>
                      <p className="text-xs text-[#737A78]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/register?role=doctor"
                className="w-full py-3 rounded-xl bg-[#0E6763] hover:bg-[#2B9A91] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Start Doctor Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-[#101515]">Why Leading Doctors Choose MediTrust</h2>
            <p className="text-sm text-[#737A78]">
              Purpose-built clinical tools designed to respect your valuable consultation time and elevate patient experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="card-editorial p-7 bg-white space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5F1] text-[#0E6763] flex items-center justify-center border border-[#DCEFEA]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#101515]">{b.title}</h3>
                  <p className="text-xs sm:text-sm text-[#737A78] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Doctor CTA Banner */}
        <div className="card-editorial p-8 sm:p-12 bg-[#101515] text-white rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Join our network of healthcare specialists today</h3>
            <p className="text-sm text-slate-300">
              Transform how you manage appointments, connect with patients, and build a lasting professional digital reputation.
            </p>
          </div>
          <Link
            to="/register?role=doctor"
            className="px-8 py-4 rounded-2xl bg-[#0E6763] hover:bg-[#2B9A91] text-white font-bold text-sm transition-all shadow-xl shrink-0 flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Register as a Doctor</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
