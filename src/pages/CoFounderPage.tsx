import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Award, Compass, Milestone, Quote, Building, ArrowUpRight, Cpu, Mail, Sparkles, User } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { COFOUNDER_KEYWORDS } from '../lib/seo';

export const COFOUNDER_DATA = {
  name: 'Bandi Nandini',
  alternateName: 'B. Nandini',
  designation: 'Co-Founder & Head of Operations',
  company: 'Medynex Solutions LLP',
  location: 'Tirupati / Hyderabad, India',
  profileImage: '', // Replace with uploaded photo URL in future without altering layout or card design
  initials: 'BN',
  linkedinUrl: 'https://www.linkedin.com/in/bandi-nandini-63686a379',
  email: 'nbandi388@gmail.com',
  phone: '+91 8328620294',
  quote: 'Healthcare operational excellence is achieved when hospital workflows, patient token management, and doctor care plans function in perfect alignment.',
  
  bio: `Bandi Nandini (B. Nandini) is the Co-Founder & Head of Operations at Medynex Solutions LLP. An alumnus of Mohan Babu University, Bandi Nandini leads platform operational strategy, partner hospital onboarding, diagnostic laboratory network management, and customer experience excellence for the MediTrust ecosystem.`,
  
  role: `Head of Operations at Medynex Solutions LLP. Directs hospital onboarding workflows, clinical operation compliance, customer support operations, and cross-departmental execution across all MediTrust solution verticals.`,
  
  leadership: `Manages operational teams across hospital integrations, pharmacy supply-chain synchronization, and patient assistance programs to ensure sub-second service delivery and zero downtime.`,
  
  vision: `To streamline operations across 1,000+ medical facilities in India, ensuring that every patient experiences zero wait-time anxiety and every doctor receives optimal schedule clarity.`,
  
  education: [
    { degree: 'Bachelor of Technology (B.Tech)', institution: 'Mohan Babu University', year: 'Engineering & Operational Leadership' }
  ],

  timeline: [
    { year: 'Mohan Babu Univ.', title: 'Academic Excellence', desc: 'Specialized in operations and technology systems engineering at Mohan Babu University.' },
    { year: '2024', title: 'Healthcare Operations Research', desc: 'Analyzed hospital OPD flow bottlenecks, emergency bed allocation delays, and pharmacy fulfillment processes.' },
    { year: '2025', title: 'Co-Founding Medynex Solutions', desc: 'Partnered with Shaik Afriz to co-found Medynex Solutions LLP and lead operational deployment.' },
    { year: '2026', title: 'Operational Scale for MediTrust', desc: 'Supervised smooth deployment of digital tokens, teleconsultations, and lab network integrations.' }
  ]
};

export const CoFounderPage: React.FC = () => {
  const cofounderSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://medynex.com/#b-nandini',
        'name': 'B. Nandini',
        'alternateName': 'Bandi Nandini',
        'jobTitle': 'Co-Founder & Head of Operations',
        'worksFor': {
          '@type': 'Organization',
          'name': 'Medynex Solutions LLP',
          'url': 'https://medynex.com'
        },
        'alumniOf': 'Mohan Babu University',
        'description': 'Co-Founder & Head of Operations at Medynex Solutions LLP, directing MediTrust operational ecosystem.',
        'sameAs': [
          'https://www.linkedin.com/in/bandi-nandini-63686a379'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://medynex.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Team', 'item': 'https://medynex.com/team' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Co-Founder B. Nandini', 'item': 'https://medynex.com/co-founder' }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title="B. Nandini (Bandi Nandini) | Co-Founder & Head of Operations - Medynex Solutions LLP"
        description="Official profile of B. Nandini (Bandi Nandini), Co-Founder & Head of Operations at Medynex Solutions LLP. Leading operations, hospital partnerships, and healthcare network expansion for MediTrust."
        keywords={COFOUNDER_KEYWORDS}
        canonicalUrl="https://medynex.com/co-founder"
        schema={cofounderSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 font-mono bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5" /> Co-Founder & Executive Leadership
          </span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl bg-[#111827] group p-8 flex flex-col items-center justify-center min-h-[420px]">
              {COFOUNDER_DATA.profileImage ? (
                <img 
                  src={COFOUNDER_DATA.profileImage} 
                  alt={COFOUNDER_DATA.name} 
                  className="w-full h-[400px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 shadow-xl shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-[#0B1120] backdrop-blur-md overflow-hidden flex items-center justify-center relative border border-slate-800">
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-[#0D1527] to-[#1E293B] flex flex-col items-center justify-center relative">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:8px_8px]" />
                        <User className="w-12 h-12 text-cyan-400/30 absolute -bottom-2 opacity-60" />
                        <span className="font-mono font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-white drop-shadow-md">
                          {COFOUNDER_DATA.initials}
                        </span>
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 w-5 h-5 bg-cyan-400 border-2 border-[#0B1120] rounded-full shadow-[0_0_12px_#38bdf8]" />
                  </div>
                  <span className="text-xs text-slate-400 font-medium tracking-tight flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Professional photo will be updated soon.</span>
                  </span>
                </div>
              )}
              
              <div className="mt-6 w-full p-5 rounded-2xl bg-[#0B1120]/90 border border-slate-800 backdrop-blur-md space-y-2">
                <h1 className="text-2xl font-bold text-white">{COFOUNDER_DATA.name}</h1>
                <p className="text-sm font-semibold text-cyan-400">{COFOUNDER_DATA.designation}</p>
                <p className="text-xs text-slate-400">{COFOUNDER_DATA.company} • {COFOUNDER_DATA.location}</p>
                
                <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                  <a 
                    href={COFOUNDER_DATA.linkedinUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-semibold flex items-center space-x-1.5 hover:bg-cyan-500 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a 
                    href={`mailto:${COFOUNDER_DATA.email}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold flex items-center space-x-1.5 hover:bg-slate-700 transition-colors border border-slate-700"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{COFOUNDER_DATA.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Biography & Technical Leadership
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                {COFOUNDER_DATA.bio}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800">
                <Cpu className="w-6 h-6 text-cyan-400 mb-2" />
                <h3 className="text-sm font-bold text-white mb-1">Executive Role</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{COFOUNDER_DATA.role}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800">
                <Compass className="w-6 h-6 text-blue-400 mb-2" />
                <h3 className="text-sm font-bold text-white mb-1">Technology Vision</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{COFOUNDER_DATA.vision}</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/30 relative">
              <Quote className="w-8 h-8 text-cyan-400/30 absolute top-4 left-4 pointer-events-none" />
              <p className="text-sm text-cyan-100 italic pl-6 leading-relaxed font-serif">
                "{COFOUNDER_DATA.quote}"
              </p>
              <div className="text-xs text-cyan-400 font-bold mt-2 pl-6">— {COFOUNDER_DATA.name}</div>
            </div>

          </motion.div>

        </div>

        {/* Timeline */}
        <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Milestone className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Leadership Timeline</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {COFOUNDER_DATA.timeline.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full inline-block mb-3">
                  {item.year}
                </span>
                <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
