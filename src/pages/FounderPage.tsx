import React from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, Compass, Milestone, Quote, Sparkles, Building, ArrowUpRight, User, Heart, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const FOUNDER_DATA = {
  name: 'Shaik.Afriz',
  designation: 'Founder / CEO / CTO',
  company: 'Medynex Solutions',
  platform: 'MediTrust',
  location: 'Kanigiri, Andhra Pradesh, India',
  father: 'Shaik Ahammad Basha',
  mother: 'Shaik Arshiya',
  initials: 'SA',
  quote: 'Healthcare is not merely a transaction; it is a fundamental human need. Our technology exists to simplify access, empower clinicians, and bridge patient trust.',
  
  bio: `Shaik.Afriz is the Founder, Chief Executive Officer, and Chief Technology Officer of Medynex Solutions, leading the creation of the MediTrust healthcare platform. Driven by personal and community observations of healthcare fragmentation across regional India, he architected MediTrust to bring patients, doctors, and pharmacies into one cohesive, intelligent digital ecosystem.`,
  
  vision: `To eliminate the friction in healthcare discovery and consultations by providing a unified digital layer where patients discover verified care, doctors manage appointments without waiting lines, and pharmacies dispense medications seamlessly.`,
  
  mission: `Building trusted, accessible, and intelligent healthcare technology that connects individuals with quality medical care across all communities.`,
  
  familyRespect: `Supported by his parents, Shaik Ahammad Basha and Shaik Arshiya, whose values of community service, perseverance, and dedication continue to guide the core principles and human-centric mission of Medynex Solutions.`,
  
  achievements: [
    'Founded Medynex Solutions to build the MediTrust connected healthcare platform.',
    'Architected full-stack multi-role discovery and consultation token workflows.',
    'Designed intelligent AI assistant workflows to assist patients and providers safely.',
    'Established rigorous credential verification standards for all participating healthcare providers.'
  ]
};

export const FounderPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#101515] py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Shaik.Afriz | Founder, CEO & CTO of Medynex Solutions"
        description="Official profile of Shaik.Afriz, Founder, CEO & CTO of Medynex Solutions and creator of the MediTrust healthcare ecosystem."
        keywords={['Shaik Afriz', 'Medynex founder', 'MediTrust founder', 'healthcare technology India']}
        canonicalUrl="https://medynex.com/founder"
      />

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Tag */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="tag-pill bg-[#EAF5F1] text-[#0E6763] border border-[#DCEFEA] text-xs font-bold">
            <Building className="w-3.5 h-3.5" /> Founder & Executive Leadership
          </span>
        </div>

        {/* Top Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5">
            <div className="card-editorial p-8 bg-white border border-[#E7EAE7] shadow-xl text-center space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-[#101515] text-white flex items-center justify-center font-extrabold text-4xl mx-auto shadow-md border border-[#303735]">
                {FOUNDER_DATA.initials}
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101515]">{FOUNDER_DATA.name}</h1>
                <p className="text-sm font-bold text-[#0E6763]">{FOUNDER_DATA.designation}</p>
                <p className="text-xs text-[#737A78]">{FOUNDER_DATA.company} • {FOUNDER_DATA.location}</p>
              </div>

              <div className="pt-4 border-t border-[#E7EAE7] text-xs text-[#737A78] space-y-1">
                <div>Origin: <strong>{FOUNDER_DATA.location}</strong></div>
                <div>Platform: <strong>{FOUNDER_DATA.platform}</strong></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101515] tracking-tight">
                Leadership, Vision & Technology
              </h2>
              <p className="text-sm sm:text-base text-[#737A78] leading-relaxed">
                {FOUNDER_DATA.bio}
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card-editorial p-5 bg-white space-y-2">
                <Compass className="w-5 h-5 text-[#0E6763]" />
                <h3 className="text-sm font-bold text-[#101515]">Vision</h3>
                <p className="text-xs text-[#737A78] leading-relaxed">{FOUNDER_DATA.vision}</p>
              </div>

              <div className="card-editorial p-5 bg-white space-y-2">
                <Sparkles className="w-5 h-5 text-[#0E6763]" />
                <h3 className="text-sm font-bold text-[#101515]">Mission</h3>
                <p className="text-xs text-[#737A78] leading-relaxed">{FOUNDER_DATA.mission}</p>
              </div>
            </div>

            {/* Quote */}
            <div className="p-6 rounded-2xl bg-[#EAF5F1] border border-[#DCEFEA] text-[#0E6763] space-y-2">
              <p className="text-xs sm:text-sm italic font-medium leading-relaxed">
                "{FOUNDER_DATA.quote}"
              </p>
              <div className="text-xs font-bold text-[#101515]">— {FOUNDER_DATA.name}</div>
            </div>
          </div>

        </div>

        {/* Family Roots & Heritage Card */}
        <div className="card-editorial p-8 bg-white border border-[#E7EAE7] space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0E6763]">
            <Heart className="w-4 h-4" />
            <span>Roots & Foundation</span>
          </div>
          <h3 className="text-xl font-bold text-[#101515]">Values & Family Inspiration</h3>
          <p className="text-xs sm:text-sm text-[#737A78] leading-relaxed max-w-3xl">
            {FOUNDER_DATA.familyRespect}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E7EAE7]/60">
              <span className="text-xs text-[#737A78] block">Father</span>
              <strong className="text-sm text-[#101515]">{FOUNDER_DATA.father}</strong>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E7EAE7]/60">
              <span className="text-xs text-[#737A78] block">Mother</span>
              <strong className="text-sm text-[#101515]">{FOUNDER_DATA.mother}</strong>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E7EAE7]/60">
              <span className="text-xs text-[#737A78] block">Hometown</span>
              <strong className="text-sm text-[#101515]">Kanigiri</strong>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="card-editorial p-8 bg-white border border-[#E7EAE7] space-y-6">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-[#0E6763]" />
            <h3 className="text-xl font-bold text-[#101515]">Key Milestones</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FOUNDER_DATA.achievements.map((ach, i) => (
              <div key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-[#737A78] p-3 rounded-xl bg-[#F7F8F6]">
                <ShieldCheck className="w-4 h-4 text-[#0E6763] shrink-0 mt-0.5" />
                <span>{ach}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
