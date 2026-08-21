import React, { useState } from 'react';
import { MOCK_JOBS } from '../lib/api';
import { JobPosition } from '../types';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle, Upload, X, ShieldCheck, Send, AlertCircle, Sparkles } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const CareersPage: React.FC = () => {
  const careersSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://medynex.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Careers', 'item': 'https://medynex.com/careers' }
        ]
      }
    ]
  };

  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [submittedCandidateId, setSubmittedCandidateId] = useState('');
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    portfolio: '',
    experienceYears: '2-4 Years',
    skills: 'TypeScript, React, Node.js, Express, Healthcare APIs',
    whyInterested: '',
    resumeFileName: '',
    consentAccepted: false
  });

  const handleOpenModal = (job: JobPosition) => {
    setSelectedJob(job);
    setShowApplyModal(true);
    setApplicationSubmitted(false);
    setFormError('');
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError('Please complete your Name, Email, and Phone Number.');
      return;
    }

    if (!formData.resumeFileName) {
      setFormError('Please upload your Resume (PDF or DOCX file).');
      return;
    }

    if (!formData.consentAccepted) {
      setFormError('Please check the consent box to submit your job application.');
      return;
    }

    setIsSubmitting(true);

    // Simulate backend API call
    setTimeout(() => {
      setIsSubmitting(false);
      const randomRef = `MED-JOB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedCandidateId(randomRef);
      setApplicationSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title="Careers & Job Openings | Medynex Solutions LLP"
        description="Join Medynex Solutions LLP to build high-scale healthcare software, real-time token systems, and clinical AI assistants."
        canonicalUrl="https://medynex.com/careers"
        schema={careersSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 font-mono bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" /> Core Team Careers • Medynex Solutions LLP
          </span>
          <h1 className="text-4xl font-black text-white">Engineering & Operational Roles</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Help us engineer India's next-generation digital healthcare ecosystem connecting patients, doctors, hospitals, pharmacies, and diagnostic laboratories.
          </p>
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-6">
          {MOCK_JOBS.map(job => (
            <div key={job.id} className="p-8 rounded-3xl bg-[#111827] border border-slate-800 hover:border-blue-500/40 transition-all space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{job.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="text-blue-400 font-mono font-semibold">{job.department}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                    <span>•</span>
                    <span>Exp: {job.experienceRequired}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(job)}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20 shrink-0 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{job.summary}</p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Key Responsibilities:</div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {job.responsibilities.map((res, i) => <li key={i}>{res}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* APPLY MODAL */}
        {showApplyModal && selectedJob && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-xl rounded-3xl bg-[#111827] border border-slate-700 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">Medynex Recruitment Portal</span>
                  <h3 className="text-xl font-bold text-white">{selectedJob.title}</h3>
                  <p className="text-xs text-slate-400">{selectedJob.department} • {selectedJob.location}</p>
                </div>
                <button onClick={() => setShowApplyModal(false)} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {applicationSubmitted ? (
                <div className="text-center space-y-4 py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold">Ref Code: {submittedCandidateId}</span>
                    <h4 className="text-2xl font-bold text-white mt-1">Application Submitted Successfully!</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Your profile for <strong className="text-blue-400">{selectedJob.title}</strong> has been logged into Medynex Solutions LLP engineering systems.
                  </p>
                  <p className="text-xs text-slate-400">
                    Our technical leadership team will evaluate your background and reach out via email (<span className="text-cyan-400">{formData.email}</span>) for the next interview rounds.
                  </p>
                  <button onClick={() => setShowApplyModal(false)} className="px-8 py-3 rounded-2xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700">
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                  
                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Full Name *</label>
                    <input 
                      type="text" required placeholder="e.g. S. Karthik"
                      value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Email Address *</label>
                      <input 
                        type="email" required placeholder="karthik@example.com"
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Phone Number *</label>
                      <input 
                        type="tel" required placeholder="+91 98765 00000"
                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">LinkedIn Profile</label>
                      <input 
                        type="url" placeholder="https://linkedin.com/in/username"
                        value={formData.linkedIn} onChange={e => setFormData({...formData, linkedIn: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Portfolio / GitHub</label>
                      <input 
                        type="url" placeholder="https://github.com/username"
                        value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Primary Technical Skills</label>
                    <input 
                      type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Why do you want to join Medynex?</label>
                    <textarea 
                      placeholder="Share your interest in building digital healthcare solutions..."
                      value={formData.whyInterested} onChange={e => setFormData({...formData, whyInterested: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Upload Resume (PDF / DOCX) *</label>
                    <div className="p-4 rounded-xl bg-[#0B1120] border border-dashed border-slate-700 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                      <span className="text-slate-300 font-medium block">
                        {formData.resumeFileName || 'Click to upload resume PDF or DOCX file'}
                      </span>
                      <input 
                        type="file" accept=".pdf,.docx,.doc" className="hidden" id="career-resume-input"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFormData({...formData, resumeFileName: e.target.files[0].name});
                          }
                        }}
                      />
                      <label htmlFor="career-resume-input" className="inline-block mt-1 text-[11px] font-bold text-blue-400 underline cursor-pointer">
                        Browse Resume File
                      </label>
                    </div>
                  </div>

                  <label className="flex items-start gap-2 pt-2 cursor-pointer">
                    <input 
                      type="checkbox" checked={formData.consentAccepted} onChange={e => setFormData({...formData, consentAccepted: e.target.checked})}
                      className="mt-0.5 rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0"
                    />
                    <span className="text-slate-300 text-[11px] leading-relaxed">
                      I agree to Medynex Solutions LLP processing my job application data and contacting me regarding technical evaluation.
                    </span>
                  </label>

                  <button 
                    type="submit" disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Logging Application...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Job Application</span>
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
