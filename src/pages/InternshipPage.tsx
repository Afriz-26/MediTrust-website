import React, { useState } from 'react';
import { MOCK_INTERNSHIPS } from '../lib/api';
import { InternshipProgram } from '../types';
import { GraduationCap, Award, CheckCircle, Clock, MapPin, X, Upload, Send, Sparkles, Building2, AlertCircle, ShieldCheck, Briefcase } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const InternshipPage: React.FC = () => {
  const internshipSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://medynex.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Internships & Fellowships', 'item': 'https://medynex.com/internships' }
        ]
      }
    ]
  };

  const [selectedProgram, setSelectedProgram] = useState<InternshipProgram | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [submittedCandidateId, setSubmittedCandidateId] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    degree: 'B.Tech',
    branch: 'Computer Science & Engineering',
    currentYear: '3rd Year',
    linkedIn: '',
    gitHub: '',
    portfolio: '',
    preferredTrack: 'Healthcare AI Fellowship',
    preferredLocation: 'Remote / Hybrid',
    joiningDate: '2026-08-15',
    skills: 'React, TypeScript, Express.js, Python, Tailwind CSS',
    projects: '',
    whyJoinMedynex: '',
    resumeFileName: '',
    consentAccepted: false
  });

  const [formError, setFormError] = useState('');

  const handleOpenApplyModal = (program: InternshipProgram) => {
    setSelectedProgram(program);
    setFormData(prev => ({ 
      ...prev, 
      preferredTrack: program.title, 
      preferredLocation: program.mode || program.location 
    }));
    setShowApplyModal(true);
    setApplicationSubmitted(false);
    setFormError('');
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError('Please fill in your Name, Email, and Phone Number.');
      return;
    }

    if (!formData.college.trim()) {
      setFormError('Please enter your College or University name.');
      return;
    }

    if (!formData.resumeFileName) {
      setFormError('Please upload your Resume (PDF or DOCX file).');
      return;
    }

    if (!formData.consentAccepted) {
      setFormError('Please accept the consent checkbox to process your fellowship application.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const randomId = `MED-FEL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedCandidateId(randomId);
      setApplicationSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title="Fellowship & Internship Programs 2026 | Medynex Solutions LLP"
        description="Apply for Healthcare AI, Software Engineering, UI/UX, Operations, Product Management, Digital Marketing Fellowships & Campus Ambassador program at Medynex Solutions LLP."
        canonicalUrl="https://medynex.com/internships"
        schema={internshipSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" /> Early Career Fellowships & Internships • Medynex Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Medynex Fellowship Programs</h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Gain real-world experience engineering digital health software, clinical AI tools, and hospital OPD token engines. Every fellowship includes verifiable certification and high PPO eligibility.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MOCK_INTERNSHIPS.map(program => (
            <div key={program.id} className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-xl">
              <div className="space-y-5">
                
                {/* Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 text-xs font-mono font-bold border border-blue-500/20">
                    Track: {program.track}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Stipend: {program.stipend}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white">{program.title}</h2>

                {/* Key Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#0B1120] border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-mono block">Duration</span>
                    <span className="font-bold text-white flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3 text-emerald-400" /> {program.durationMonths} Months</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-mono block">Mode</span>
                    <span className="font-bold text-cyan-400 flex items-center gap-1 mt-0.5"><Building2 className="w-3 h-3 text-cyan-400" /> {program.mode || 'Remote / Hybrid'}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-500 text-[10px] uppercase font-mono block">Eligibility</span>
                    <span className="font-semibold text-slate-300 truncate block mt-0.5" title={program.eligibility}>{program.eligibility || 'All Streams'}</span>
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-cyan-400 uppercase font-mono tracking-wider">Learning Outcomes:</div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {program.learningOutcomes?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Responsibilities */}
                {program.responsibilities && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-blue-400 uppercase font-mono tracking-wider">Key Responsibilities:</div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {program.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits & Certificate */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium flex items-center gap-1 border border-slate-700">
                      <Award className="w-3.5 h-3.5 text-amber-400" /> Certificate: {program.certificate || 'ISO Compliant'}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 font-medium flex items-center gap-1 border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> PPO: {program.ppoEligibility || 'High Priority PPO'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenApplyModal(program)}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>Apply for {program.title}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* APPLICATION FORM MODAL */}
        {showApplyModal && selectedProgram && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-[#111827] border border-slate-700 p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto shadow-2xl">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Medynex Fellowship Application</span>
                  <h3 className="text-xl font-bold text-white">{selectedProgram.title}</h3>
                  <p className="text-xs text-slate-400">{selectedProgram.track} • {selectedProgram.stipend}</p>
                </div>
                <button onClick={() => setShowApplyModal(false)} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {applicationSubmitted ? (
                /* SUCCESS CONFIRMATION SCREEN */
                <div className="text-center space-y-4 py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-emerald-400 font-bold">Candidate Reference: {submittedCandidateId}</span>
                    <h4 className="text-2xl font-black text-white">Application Received!</h4>
                  </div>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Your fellowship application for <strong className="text-emerald-400">{selectedProgram.title}</strong> has been logged into Medynex Solutions LLP recruitment portal.
                  </p>
                  <p className="text-xs text-slate-400">
                    A confirmation message has been registered for <span className="text-cyan-400">{formData.email}</span>. Our leadership team will review your profile for technical interview rounds.
                  </p>
                  <div className="pt-4">
                    <button onClick={() => setShowApplyModal(false)} className="px-8 py-3 rounded-2xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 border border-slate-700">
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                /* COMPREHENSIVE INTERNSHIP FORM */
                <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
                  
                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Personal Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Full Name *</label>
                      <input 
                        type="text" required placeholder="e.g. S. Karthik"
                        value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Email Address *</label>
                      <input 
                        type="email" required placeholder="karthik@college.edu"
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Phone Number *</label>
                      <input 
                        type="tel" required placeholder="+91 98765 43210"
                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Academic Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1 font-semibold">College / University *</label>
                      <input 
                        type="text" required placeholder="e.g. Mohan Babu University / SVU"
                        value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Degree</label>
                      <select 
                        value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none"
                      >
                        <option>B.Tech</option>
                        <option>B.E.</option>
                        <option>M.Tech</option>
                        <option>MCA</option>
                        <option>MBA / BBA</option>
                        <option>B.Pharm / Pharm.D</option>
                        <option>BSc / MSc</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Current Year</label>
                      <select 
                        value={formData.currentYear} onChange={e => setFormData({...formData, currentYear: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none"
                      >
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>Final Year</option>
                        <option>Recent Graduate</option>
                      </select>
                    </div>
                  </div>

                  {/* Profiles */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">LinkedIn Profile</label>
                      <input 
                        type="url" placeholder="https://linkedin.com/in/username"
                        value={formData.linkedIn} onChange={e => setFormData({...formData, linkedIn: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">GitHub / Portfolio</label>
                      <input 
                        type="url" placeholder="https://github.com/username"
                        value={formData.gitHub} onChange={e => setFormData({...formData, gitHub: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Primary Skills</label>
                      <input 
                        type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Why do you want to join Medynex Fellowship?</label>
                    <textarea 
                      placeholder="Tell us about your background, projects, or passion for HealthTech..."
                      value={formData.whyJoinMedynex} onChange={e => setFormData({...formData, whyJoinMedynex: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none h-16"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Upload Resume (PDF / DOCX) *</label>
                    <div className="p-3.5 rounded-xl bg-[#0B1120] border border-dashed border-slate-700 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                      <span className="text-slate-300 font-medium block text-xs">
                        {formData.resumeFileName || 'Click to select Resume PDF / DOCX'}
                      </span>
                      <input 
                        type="file" accept=".pdf,.docx,.doc" className="hidden" id="internship-resume-input"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFormData({...formData, resumeFileName: e.target.files[0].name});
                          }
                        }}
                      />
                      <label htmlFor="internship-resume-input" className="inline-block mt-1 text-[11px] font-bold text-emerald-400 underline cursor-pointer">
                        Browse Computer Files
                      </label>
                    </div>
                  </div>

                  <label className="flex items-start gap-2 pt-1 cursor-pointer">
                    <input 
                      type="checkbox" checked={formData.consentAccepted} onChange={e => setFormData({...formData, consentAccepted: e.target.checked})}
                      className="mt-0.5 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <span className="text-slate-300 text-[11px] leading-relaxed">
                      I authorize Medynex Solutions LLP to review my candidate profile for early career fellowship evaluation and potential PPO placement.
                    </span>
                  </label>

                  <button 
                    type="submit" disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Logging Application...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Fellowship Application</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
