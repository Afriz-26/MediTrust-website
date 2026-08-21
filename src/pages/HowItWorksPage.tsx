import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  UserCheck, 
  Search, 
  CalendarCheck, 
  ShieldCheck, 
  Stethoscope, 
  Pill, 
  FileCheck, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Truck, 
  Bot,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const HowItWorksPage: React.FC = () => {
  const [activeRoleTab, setActiveRoleTab] = useState<'patient' | 'doctor' | 'pharmacy'>('patient');

  const patientSteps = [
    {
      step: '01',
      title: 'Discover & Search',
      desc: 'Search by medical specialty, location, doctor name, symptoms, or nearby verified pharmacies using real platform data.',
      icon: Search
    },
    {
      step: '02',
      title: 'Compare & Choose',
      desc: 'View verified qualifications, hospital affiliations, consultation fees, live availability tokens, and distance.',
      icon: UserCheck
    },
    {
      step: '03',
      title: 'Request or Book Instantly',
      desc: 'Select preferred OPD slot or instant online consultation. Receive instant digital token confirmation without physical lines.',
      icon: CalendarCheck
    },
    {
      step: '04',
      title: 'Manage & Connect AI',
      desc: 'Access QR-verified digital prescriptions, track ordered medicines, and converse with the context-aware AI assistant.',
      icon: Bot
    }
  ];

  const doctorSteps = [
    {
      step: '01',
      title: 'Doctor Registration',
      desc: 'Create your professional account with medical council registration details, qualifications, and clinic location.',
      icon: Stethoscope
    },
    {
      step: '02',
      title: 'Document & License Verification',
      desc: 'Submit medical council credentials and clinic licenses for strict administrative review by our verification team.',
      icon: FileCheck
    },
    {
      step: '03',
      title: 'Admin Review & Approval',
      desc: 'Our compliance team checks credentials. Only verified doctors earn the official MediTrust verified badge.',
      icon: ShieldCheck
    },
    {
      step: '04',
      title: 'Public Discovery & Patient Care',
      desc: 'Go live on the patient discovery network, manage daily OPD consultation queues, and issue digital prescriptions.',
      icon: Activity
    }
  ];

  const pharmacySteps = [
    {
      step: '01',
      title: 'Pharmacy Business Registration',
      desc: 'Register pharmacy store name, operating hours, delivery radius, and state drug license details.',
      icon: Pill
    },
    {
      step: '02',
      title: 'Drug License Audit',
      desc: 'Provide valid Form 20/21 drug licenses and GST details for administrative compliance verification.',
      icon: FileCheck
    },
    {
      step: '03',
      title: 'Catalog & Inventory Setup',
      desc: 'Activate real-time inventory management, price controls, and delivery zones within your city.',
      icon: ShieldCheck
    },
    {
      step: '04',
      title: 'Receive & Fulfill Orders',
      desc: 'Receive digital prescription orders from nearby patients, update fulfillment statuses, and streamline dispatch.',
      icon: Truck
    }
  ];

  const currentSteps = activeRoleTab === 'patient' ? patientSteps : activeRoleTab === 'doctor' ? doctorSteps : pharmacySteps;

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#101515] py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="How MediTrust Works | Connected Healthcare Ecosystem"
        description="Learn how MediTrust seamlessly connects patients, verified doctors, and licensed pharmacies with automated queue tokens and AI support."
        keywords={['how MediTrust works', 'healthcare platform workflow', 'doctor onboarding process', 'patient appointment flow']}
        canonicalUrl="https://medynex.com/how-it-works"
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F1] border border-[#DCEFEA] text-[#0E6763] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Ecosystem Workflows</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101515] tracking-tight">
            How MediTrust Connects the Pieces
          </h1>
          <p className="text-base sm:text-lg text-[#737A78]">
            A transparent, verified digital journey designed specifically for patients seeking care, doctors delivering clinical excellence, and pharmacies fulfilling prescriptions.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#E7EAE7] shadow-sm">
            <button
              onClick={() => setActiveRoleTab('patient')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeRoleTab === 'patient' 
                  ? 'bg-[#101515] text-white shadow-md' 
                  : 'text-[#737A78] hover:text-[#101515]'
              }`}
            >
              For Patients
            </button>
            <button
              onClick={() => setActiveRoleTab('doctor')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeRoleTab === 'doctor' 
                  ? 'bg-[#101515] text-white shadow-md' 
                  : 'text-[#737A78] hover:text-[#101515]'
              }`}
            >
              For Doctors
            </button>
            <button
              onClick={() => setActiveRoleTab('pharmacy')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeRoleTab === 'pharmacy' 
                  ? 'bg-[#101515] text-white shadow-md' 
                  : 'text-[#737A78] hover:text-[#101515]'
              }`}
            >
              For Pharmacies
            </button>
          </div>
        </div>

        {/* Dynamic Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {currentSteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <motion.div
                  key={`${activeRoleTab}-${step.step}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="card-editorial p-6 sm:p-7 bg-white relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-[#DCEFEA]">{step.step}</span>
                      <div className="w-10 h-10 rounded-xl bg-[#EAF5F1] text-[#0E6763] flex items-center justify-center border border-[#DCEFEA]">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#101515]">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-[#737A78] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E7EAE7]/60 flex items-center gap-1 text-xs font-semibold text-[#0E6763]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Step</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Action Call to Action Card */}
        <div className="card-editorial p-8 sm:p-10 bg-[#101515] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Ready to experience connected care?</h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Create your account on MediTrust in less than 2 minutes and access verified healthcare professionals in your area.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-[#0E6763] hover:bg-[#2B9A91] text-white text-sm font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={activeRoleTab === 'doctor' ? '/for-doctors' : activeRoleTab === 'pharmacy' ? '/for-pharmacies' : '/doctors'}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all border border-white/20"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
