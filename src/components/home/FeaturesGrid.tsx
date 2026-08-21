import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Stethoscope, 
  Building2, 
  Pill, 
  Bot, 
  FileText, 
  Ticket, 
  Smile,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

import indianDoctorsImg from '../../assets/images/indian_doctors_team_1787291153150.jpg';
import indianPharmacyImg from '../../assets/images/indian_pharmacy_care_1787291167139.jpg';
import indianPatientImg from '../../assets/images/indian_patient_care_1787291192534.jpg';
import indianConsultationImg from '../../assets/images/indian_consultation_1787291140026.jpg';

const CATEGORIES = [
  { id: 'doctors', label: 'Doctor Sector', icon: Stethoscope },
  { id: 'pharmacies', label: 'Pharmacy Sector', icon: Pill },
  { id: 'patient-exp', label: 'Patient Sector', icon: Smile },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
  { id: 'digital-rx', label: 'Digital Prescriptions', icon: FileText },
  { id: 'tokens', label: 'Queue Tokens', icon: Ticket },
];

const FEATURE_DATA: Record<string, {
  title: string;
  description: string;
  highlights: string[];
  linkText: string;
  linkUrl: string;
  image: string;
}> = {
  doctors: {
    title: 'Smart Clinical Workspace for Indian Doctors',
    description: 'Empower clinicians across Hyderabad, Bengaluru, Chennai, and tier-2/3 cities with dynamic OPD scheduling, instant EHR access, and teleconsultation lounge built for modern medical practice.',
    highlights: ['Single-click digital prescription generator with standard Indian drug dosage databases', 'Unified patient medical history with ABDM consent-based timeline access', 'Integrated teleconsultation video lounge with screen sharing and instant chat'],
    linkText: 'Explore Doctor Search & Consultations',
    linkUrl: '/doctors',
    image: indianDoctorsImg
  },
  pharmacies: {
    title: 'Digital Pharmacy Network & Medicine Inventory',
    description: 'Connect retail pharmacies with instant digital prescription parsing, fast medicine dispensing, and localized home delivery dispatch across Indian pincodes.',
    highlights: ['Automated QR prescription scanner verifying physician credentials & MCI/NMC registration', 'Live inventory stock tracking for essential Indian generic and branded medicines', 'Integrated delivery routing for fast patient home dispatch within 30-45 minutes'],
    linkText: 'Search Nearby Pharmacies',
    linkUrl: '/pharmacies',
    image: indianPharmacyImg
  },
  'ai-assistant': {
    title: 'Medynex Generative AI Health Assistant',
    description: '24/7 intelligent symptom guidance, appointment assistance, and medical report explainer trained on clinical databases with multilingual Indian language support.',
    highlights: ['Voice Assistant ready with Hindi, Telugu, Tamil, Kannada, and English support', 'Personalized triage recommendations directing to the right medical specialist', 'Simplified medical term explanation for diagnostic test results and lab reports'],
    linkText: 'Try AI Healthcare Assistant',
    linkUrl: '/ai-assistant',
    image: indianConsultationImg
  },
  'digital-rx': {
    title: 'Tamper-Proof Digital Prescriptions',
    description: 'Replaces illegible paper slips with cryptographic, QR-verified digital prescriptions compatible with pharmacy dispensaries across India.',
    highlights: ['E-signed by verified medical council registered practitioners with digital certificates', 'Directly linkable to partner pharmacies for automatic medicine ordering in ₹ (INR)', 'Permanently saved in the patient’s encrypted health locker and ABHA record vault'],
    linkText: 'View Digital Prescription Features',
    linkUrl: '/about-meditrust',
    image: indianDoctorsImg
  },
  tokens: {
    title: 'Dynamic OPD Queue Token System',
    description: 'Eliminates crowded hospital and clinic waiting rooms with live queue updates sent straight to patient mobile phones in real-time.',
    highlights: ['Algorithmic estimated wait time predictions adapting to active patient consultation pacing', 'Instant SMS & WhatsApp alerts when patient token is 3 numbers away in the queue', 'Digital OPD TV display integration for clinic reception halls and waiting areas'],
    linkText: 'Learn About Queue Token System',
    linkUrl: '/why-meditrust',
    image: indianPatientImg
  },
  'patient-exp': {
    title: 'Unified Patient Health Portal & ABHA Integration',
    description: 'A single, intuitive dashboard for patients to manage family health profiles, consultations, lab reports, and medicine orders with ease.',
    highlights: ['Family health vault with individual profiles and access control settings', 'Medication reminder schedule and automated pharmacy refill alerts', 'Seamless teleconsultation joining with zero software downloads required'],
    linkText: 'Register Patient Account',
    linkUrl: '/register',
    image: indianPatientImg
  }
};

export const FeaturesGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState('doctors');
  const activeData = FEATURE_DATA[activeTab];

  return (
    <section className="py-20 bg-[#F8FAFC] relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-700 font-mono bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Ecosystem Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Complete Digital Solutions for Every Healthcare Pillar
          </h2>
          <p className="text-slate-600 text-base">
            Explore how MediTrust transforms clinical workflows and patient experiences across India.
          </p>
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                    : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Card */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 rounded-3xl bg-white border border-slate-200 p-8 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {activeData.title}
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              {activeData.description}
            </p>

            {/* Highlights */}
            <div className="space-y-3 pt-2">
              {activeData.highlights.map((item, i) => (
                <div key={i} className="flex items-start space-x-3 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to={activeData.linkUrl}
                className="inline-flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
              >
                <span>{activeData.linkText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group aspect-[4/3]">
              <img 
                src={activeData.image} 
                alt={activeData.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
