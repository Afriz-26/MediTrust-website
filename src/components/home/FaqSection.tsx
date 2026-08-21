import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'What is Medynex Solutions LLP and how does it relate to MediTrust?',
    a: 'Medynex Solutions LLP is an Indian healthcare technology enterprise based in Andhra Pradesh and Telangana. MediTrust is the flagship digital ecosystem platform developed by Medynex to connect Patients, Doctors, Hospitals, Pharmacies, and Diagnostic Labs into an integrated, ABDM-ready network.'
  },
  {
    q: 'How do digital queue tokens work for hospital and clinic visits?',
    a: 'When you book an in-clinic appointment on MediTrust, the system issues a live digital token with an estimated countdown directly on your phone. You receive WhatsApp/SMS alerts when your token is 3 numbers away, eliminating crowded clinic waiting rooms.'
  },
  {
    q: 'Is MediTrust compliant with ABDM and Ayushman Bharat standards?',
    a: 'Yes! MediTrust is built according to Ayushman Bharat Digital Mission (ABDM M1, M2, M3) specifications by the National Health Authority (NHA), enabling secure generation and linking of ABHA IDs and digital health records.'
  },
  {
    q: 'How do pharmacies verify digital prescriptions in India?',
    a: 'Registered pharmacies simply scan the cryptographic QR code generated on the doctor’s MediTrust digital prescription. The prescription details, physician NMC/MCI registration number, and prescribed Indian drug dosages are validated in real-time.'
  },
  {
    q: 'Can I consult specialist doctors online via video?',
    a: 'Yes. MediTrust features high-definition encrypted video consultation lounges for remote specialist doctor appointments across Hyderabad, Bengaluru, Chennai, and other cities in India.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#F8FAFC] relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-700 font-mono bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Got Questions? We Have Answers.</h2>
          <p className="text-sm text-slate-500">Everything you need to know about MediTrust healthcare solutions across India.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between text-slate-900 font-bold text-base focus:outline-none hover:text-blue-600 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
