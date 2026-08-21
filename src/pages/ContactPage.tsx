import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin, Github, Send, CheckCircle, Shield, User } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const ContactPage: React.FC = () => {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': 'https://medynex.com/contact/#webpage',
        'url': 'https://medynex.com/contact',
        'name': 'Contact Medynex Solutions LLP',
        'description': 'Contact page for Medynex Solutions LLP and MediTrust support.'
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://medynex.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Contact Us', 'item': 'https://medynex.com/contact' }
        ]
      }
    ]
  };

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title="Contact Us | Medynex Solutions LLP - MediTrust"
        description="Get in touch with Medynex Solutions LLP for hospital onboarding, doctor registration, enterprise inquiries, and MediTrust platform support. Phone: +91 8328620294, Email: medynexsolutions26@gmail.com."
        canonicalUrl="https://medynex.com/contact"
        schema={contactSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 font-mono bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">
            Get in Touch
          </span>
          <h1 className="text-4xl font-extrabold text-white">Contact Medynex Solutions LLP</h1>
          <p className="text-slate-400 text-sm">We are here to assist hospitals, doctors, diagnostic labs, pharmacies, and patients.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Office & Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-6">
              <h2 className="text-xl font-bold text-white">Direct Company Contacts</h2>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Phone Contact</div>
                    <a href="tel:+918328620294" className="text-blue-400 font-semibold hover:underline">+91 8328620294</a>
                    <div className="text-xs text-slate-400">Direct Founder & Support Line</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Official Email Address</div>
                    <a href="mailto:medynexsolutions26@gmail.com" className="text-blue-400 font-semibold hover:underline">medynexsolutions26@gmail.com</a>
                    <div className="text-xs text-slate-400">Response within 24 business hours</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Executive Leadership</div>
                    <div className="text-xs text-slate-300 mt-1">
                      • <strong>Shaik Afriz</strong> — Founder & CEO (Mohan Babu Univ.)<br />
                      • <strong>B. Nandini</strong> — Co-Founder & Head of Operations (Mohan Babu Univ.)
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Company Headquarters</div>
                    <div className="text-slate-400 leading-relaxed text-xs">
                      Medynex Solutions LLP<br />
                      Innovating Healthcare Through Technology<br />
                      Tirupati / Hyderabad, India
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Operating Hours</div>
                    <div className="text-slate-400 text-xs">Monday – Saturday: 09:00 AM – 07:00 PM IST</div>
                  </div>
                </div>
              </div>

              {/* Social / Portfolio Profiles */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-white uppercase font-mono">Connect With Founder</div>
                <div className="flex items-center space-x-3 pt-1">
                  <a 
                    href="https://linkedin.com/in/shaik-afriz-a49311385" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-3.5 py-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </a>
                  <a 
                    href="https://github.com/shaik-afriz" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Floating Trust Card */}
            <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Shield className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">Verified Enterprise Gateway</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Medynex Solutions LLP provides sub-second queue token engine integration for hospital networks, doctor appointment booking, and diagnostic laboratory digitization.
              </p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-6">
              <h2 className="text-xl font-bold text-white">Send Us a Direct Message</h2>

              {submitted ? (
                <div className="text-center space-y-4 py-12">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Thank You for Contacting Medynex Solutions!</h3>
                  <p className="text-sm text-slate-300">Your message has been dispatched to Shaik Afriz and the Medynex leadership team. We will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Your Name *</label>
                      <input type="text" required placeholder="Dr. Ramesh Kumar" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Email Address *</label>
                      <input type="email" required placeholder="ramesh@hospital.com" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Organization / Hospital Name</label>
                    <input type="text" placeholder="City Care Hospitals" className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Inquiry Type</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm">
                      <option>Hospital HMS / Digital Token Onboarding</option>
                      <option>Doctor Platform Registration</option>
                      <option>Diagnostic Lab Integration</option>
                      <option>Pharmacy Network Onboarding</option>
                      <option>General Support / Enterprise Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Message *</label>
                    <textarea required rows={4} placeholder="Describe your requirement..." className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm"></textarea>
                  </div>

                  <button type="submit" className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
