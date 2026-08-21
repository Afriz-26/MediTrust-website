import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
import { FeaturesGrid } from '../components/home/FeaturesGrid';
import { TechStackSection } from '../components/home/TechStackSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FaqSection } from '../components/home/FaqSection';
import { CtaSection } from '../components/home/CtaSection';
import { SEO } from '../components/common/SEO';
import { HOMEPAGE_KEYWORDS } from '../lib/seo';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100">
      <SEO
        title="Medynex Solutions LLP | MediTrust – Digital Healthcare Platform for Patients, Doctors & Pharmacies"
        description="Medynex Solutions LLP is building MediTrust, a digital healthcare platform connecting patients, doctors, pharmacies and AI to simplify healthcare through secure appointments, healthcare discovery and digital solutions."
        keywords={HOMEPAGE_KEYWORDS}
        canonicalUrl="https://medynex.com"
      />
      <HeroSection />
      <StatsSection />
      <WhyChooseSection />
      <FeaturesGrid />
      <TechStackSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
};
