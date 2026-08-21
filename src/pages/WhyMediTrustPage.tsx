import React from 'react';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
import { SEO } from '../components/common/SEO';

export const WhyMediTrustPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-8">
      <SEO
        title="Why MediTrust Platform | Medynex Solutions LLP"
        description="Learn why doctors, hospitals, and patients choose MediTrust for real-time queue tokens, QR prescriptions, and ABDM health interoperability."
        canonicalUrl="https://medynex.com/why-meditrust"
      />
      <WhyChooseSection />
    </div>
  );
};
