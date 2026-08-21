import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Crown, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  User
} from 'lucide-react';
import { SEO } from '../components/common/SEO';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  initials: string;
  bio: string;
  badges: string[];
  link?: string;
  highlight?: boolean;
}

const TeamAvatar: React.FC<{
  initials: string;
  name: string;
  isFounder?: boolean;
}> = ({ initials, name, isFounder }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-base ${
        isFounder 
          ? 'bg-[#101515] text-white shadow-md border border-[#303735]' 
          : 'bg-[#EAF5F1] text-[#0E6763] border border-[#DCEFEA]'
      }`}>
        <span>{initials}</span>
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#101515]">{name}</h3>
        <p className="text-xs text-[#737A78]">Medynex Core Team</p>
      </div>
    </div>
  );
};

export const TeamPage: React.FC = () => {
  const navigate = useNavigate();

  const leadership: TeamMember[] = [
    {
      id: 'shaik-afriz',
      name: 'Shaik.Afriz',
      role: 'Founder / CEO / CTO',
      category: 'Founder & Executive Leadership',
      initials: 'SA',
      bio: "Founder of Medynex Solutions and visionary creator of MediTrust. Leading technology architecture, AI integrations, full-stack product development, and the overall company roadmap.",
      badges: ['Founder & CEO', 'Chief Technology Officer', 'Product Architecture'],
      link: '/founder',
      highlight: true
    },
    {
      id: 'b-nandini',
      name: 'B. Nandini',
      role: 'Co-founder and Team Lead',
      category: 'Co-Founder & Operations',
      initials: 'BN',
      bio: "Co-founder and Team Lead overseeing provider onboarding, team coordination, healthcare workflows, and network operations across the MediTrust ecosystem.",
      badges: ['Co-Founder', 'Team Lead', 'Healthcare Operations'],
      link: '/co-founder',
      highlight: true
    }
  ];

  const engineeringTeam: TeamMember[] = [
    {
      id: 'sravan',
      name: 'SRAVAN',
      role: 'Backend Developer',
      category: 'Engineering',
      initials: 'SR',
      bio: "Focuses on scalable server architecture, core REST API services, and backend data flow for patient and provider interactions.",
      badges: ['Backend Services', 'API Architecture', 'Database Flow']
    },
    {
      id: 'pavan',
      name: 'PAVAN',
      role: 'Backend Developer',
      category: 'Engineering',
      initials: 'PA',
      bio: "Specializes in secure API endpoints, verification workflows, and reliable server-side business logic.",
      badges: ['REST APIs', 'Server Logic', 'Security']
    },
    {
      id: 'karthik',
      name: 'KARTHIK',
      role: 'App Backend Developer',
      category: 'Mobile & Backend',
      initials: 'KA',
      bio: "Builds high-performance backend synchronization services, mobile notification queues, and real-time appointment endpoints.",
      badges: ['Mobile Services', 'Real-time APIs', 'Queue Engines']
    },
    {
      id: 'raviteja',
      name: 'RAVITEJA',
      role: 'App Backend Developer',
      category: 'Mobile & Backend',
      initials: 'RT',
      bio: "Develops application backend logic, provider data schemas, and token validation mechanisms.",
      badges: ['App Backend', 'Data Modeling', 'Token Engines']
    },
    {
      id: 'narasimha',
      name: 'NARASIMHA',
      role: 'App Backend Developer',
      category: 'Mobile & Backend',
      initials: 'NA',
      bio: "Architects scalable mobile API integrations, order pipelines, and secure data handling.",
      badges: ['Scalability', 'API Integrations', 'Data Pipelines']
    },
    {
      id: 'suman',
      name: 'SUMAN GOVARDHANA',
      role: 'App Frontend Developer',
      category: 'Frontend Engineering',
      initials: 'SG',
      bio: "Crafts responsive mobile interfaces, clean user experiences, and fluid clinical workflows for mobile devices.",
      badges: ['Mobile UI', 'React / Mobile', 'User Experience']
    },
    {
      id: 'prasanna',
      name: 'BUDDA PRASANNA',
      role: 'Website Developer / Website Builder',
      category: 'Web Platform',
      initials: 'BP',
      bio: "Develops responsive web experiences, modern components, and accessibility-first layouts for the public and discovery portals.",
      badges: ['Web Development', 'Modern UI', 'Component Design']
    },
    {
      id: 'aradhay',
      name: 'ARADHAY GUPTA',
      role: 'Website Developer / Website Builder',
      category: 'Web Platform',
      initials: 'AG',
      bio: "Builds client-side user interfaces, search discovery modules, and interactive patient-doctor interfaces.",
      badges: ['Frontend Web', 'Design Systems', 'Interactive UI']
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#101515] py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Meet the Team & Leadership | Medynex Solutions"
        description="Meet the founders, leadership, and engineering team behind Medynex Solutions and the MediTrust healthcare platform."
        keywords={['Medynex team', 'MediTrust leadership', 'Shaik Afriz', 'B Nandini', 'healthcare engineering team']}
        canonicalUrl="https://medynex.com/team"
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F1] border border-[#DCEFEA] text-[#0E6763] text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Medynex Team & Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#101515] tracking-tight">
            Meet the Builders of MediTrust
          </h1>
          <p className="text-base sm:text-lg text-[#737A78]">
            A dedicated team of technologists, software engineers, and product builders passionate about simplifying and connecting the Indian healthcare ecosystem.
          </p>
        </div>

        {/* Leadership Section */}
        <div className="space-y-6">
          <div className="border-b border-[#E7EAE7] pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#101515] flex items-center gap-2">
                <Crown className="w-6 h-6 text-[#0E6763]" />
                <span>Founders & Leadership</span>
              </h2>
              <p className="text-xs text-[#737A78] mt-0.5">Founding executives guiding technology architecture and healthcare operations.</p>
            </div>
            <span className="tag-pill bg-[#EAF5F1] text-[#0E6763] border border-[#DCEFEA] text-xs font-bold">
              Executive
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((member) => (
              <div
                key={member.id}
                className="card-editorial p-8 bg-white flex flex-col justify-between space-y-6 shadow-lg border border-[#E7EAE7]"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <TeamAvatar initials={member.initials} name={member.name} isFounder={true} />
                    <span className="tag-pill bg-[#101515] text-white text-[11px] font-bold">
                      {member.role}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#737A78] leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {member.badges.map((b, i) => (
                      <span key={i} className="tag-pill bg-[#F7F8F6] text-[#101515] border border-[#E7EAE7] text-xs font-semibold">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {member.link && (
                  <div className="pt-4 border-t border-[#E7EAE7] flex items-center justify-between text-xs">
                    <span className="text-[#737A78] font-medium">Executive Profile</span>
                    <Link
                      to={member.link}
                      className="px-4 py-2 rounded-xl bg-[#101515] hover:bg-[#0E6763] text-white font-bold transition-colors flex items-center gap-1.5"
                    >
                      <span>View Bio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Team */}
        <div className="space-y-6">
          <div className="border-b border-[#E7EAE7] pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#101515] flex items-center gap-2">
                <Code2 className="w-6 h-6 text-[#0E6763]" />
                <span>Core Engineering & Development Team</span>
              </h2>
              <p className="text-xs text-[#737A78] mt-0.5">Software engineers building backend APIs, mobile infrastructure, and web interfaces.</p>
            </div>
            <span className="tag-pill bg-[#F7F8F6] text-[#737A78] border border-[#E7EAE7] text-xs font-bold">
              Engineering
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringTeam.map((member) => (
              <div
                key={member.id}
                className="card-editorial p-6 bg-white flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5F1] text-[#0E6763] flex items-center justify-center font-bold text-sm border border-[#DCEFEA]">
                    {member.initials}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#101515]">{member.name}</h3>
                    <p className="text-xs font-semibold text-[#0E6763]">{member.role}</p>
                  </div>

                  <p className="text-xs text-[#737A78] leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {member.badges.map((b, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F7F8F6] text-[#737A78] border border-[#E7EAE7]">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join our team card */}
        <div className="card-editorial p-8 sm:p-10 bg-[#101515] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Want to build healthcare technology with us?</h3>
            <p className="text-sm text-slate-300 max-w-xl">
              We are expanding our product, engineering, and healthcare operations teams. Explore open roles on our Careers portal.
            </p>
          </div>
          <button
            onClick={() => navigate('/careers')}
            className="px-6 py-3.5 rounded-xl bg-[#0E6763] hover:bg-[#2B9A91] text-white font-bold text-sm transition-all shadow-lg flex items-center gap-2 shrink-0"
          >
            <Briefcase className="w-4 h-4" />
            <span>View Open Positions</span>
          </button>
        </div>

      </div>
    </div>
  );
};
