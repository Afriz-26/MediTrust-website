import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2, MapPin } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: 'MediTrust transformed our outpatient clinic operations in Hyderabad. The dynamic queue token engine reduced patient waiting room overcrowding by over 68%, and our doctors love the digital prescription generator with standard Indian drug brands.',
    author: 'Dr. Suresh R. Kulkarni',
    role: 'Chief Medical Director, Sunshine Super-Specialty Hospital',
    location: 'Hyderabad, Telangana',
    rating: 5,
    badge: 'ABDM Verified Doctor',
    initials: 'SK',
    avatarBg: 'bg-blue-600'
  },
  {
    quote: 'Managing my family’s health records, vaccine schedules, and doctor consultations across Bengaluru used to mean stacks of physical paper files. With MediTrust, our digital prescriptions and lab records sync instantly with ABHA.',
    author: 'Meera Deshmukh',
    role: 'Patient & Family Health Vault User',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    badge: 'Verified Patient',
    initials: 'MD',
    avatarBg: 'bg-emerald-600'
  },
  {
    quote: 'Our retail pharmacy in Tirupati receives clean, tamper-proof QR prescriptions directly from clinics. Prescription verification is instantaneous, eliminating illegible handwriting errors and dispensing wrong generics.',
    author: 'Rajeshwar Rao',
    role: 'Managing Pharmacist, Sri Balaji Pharma & Surgicals',
    location: 'Tirupati, Andhra Pradesh',
    rating: 5,
    badge: 'Licensed Pharmacy Partner',
    initials: 'RR',
    avatarBg: 'bg-amber-600'
  },
  {
    quote: 'The teleconsultation lounge and integrated queue system allow me to seamlessly manage both in-clinic patients and remote video consults across Tamil Nadu without scheduling chaos.',
    author: 'Dr. Anita Rao',
    role: 'Senior Consultant Gynecologist, Apollo Cradle',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    badge: 'Verified Specialist',
    initials: 'AR',
    avatarBg: 'bg-purple-600'
  },
  {
    quote: 'As a diabetic patient requiring routine refills and lab checkups, the automatic medicine reorder in ₹ with doorstep delivery has been life-changing. MediTrust is so intuitive even for senior citizens.',
    author: 'Amitav Sen',
    role: 'Chronic Care Patient',
    location: 'Kolkata, West Bengal',
    rating: 5,
    badge: 'Verified Patient',
    initials: 'AS',
    avatarBg: 'bg-teal-600'
  },
  {
    quote: 'Implementation across our 4 clinic branches in Pune took less than two days. Staff onboarding was effortless, and patient satisfaction scores have risen by 40% due to transparent queue countdowns.',
    author: 'Dr. Vikram Patil',
    role: 'Director of Clinical Operations, Care Clinics Network',
    location: 'Pune, Maharashtra',
    rating: 5,
    badge: 'NABH Clinic Partner',
    initials: 'VP',
    avatarBg: 'bg-indigo-600'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-700 font-mono bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Real Stories & Voices
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Doctors, Patients & Pharmacies Across India
          </h2>
          <p className="text-slate-600 text-base">
            Discover how MediTrust is elevating the standard of everyday healthcare delivery in metros and growing cities alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-blue-300 hover:bg-white transition-all duration-300 flex flex-col justify-between relative shadow-xs hover:shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{t.badge}</span>
                  </span>
                </div>

                <Quote className="w-6 h-6 text-blue-500/20 mb-3" />
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center space-x-3.5 pt-4 border-t border-slate-200">
                <div className={`w-11 h-11 rounded-full ${t.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0`}>
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">{t.author}</div>
                  <div className="text-xs text-slate-500 truncate">{t.role}</div>
                  <div className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
