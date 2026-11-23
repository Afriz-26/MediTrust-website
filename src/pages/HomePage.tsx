import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Building2, FlaskConical, HeartHandshake, Pill, Stethoscope } from 'lucide-react';
import { HealthcareHero } from '../components/home/HealthcareHero';
import { SEO } from '../components/common/SEO';
import { HOMEPAGE_KEYWORDS } from '../lib/seo';
import '../styles/home-editorial.css';

const careOptions = [
  {
    title: 'Find a doctor',
    description: 'Explore doctor and clinic listings by specialty and location.',
    href: '/doctors',
    icon: Stethoscope,
    tone: 'bg-[#e5f0f6] text-[#247BA0]'
  },
  {
    title: 'Find a hospital',
    description: 'Explore hospital listings and confirm services with providers.',
    href: '/hospitals',
    icon: Building2,
    tone: 'bg-[#e4f1ee] text-[#3d8a79]'
  },
  {
    title: 'Find a pharmacy',
    description: 'Find nearby pharmacies and contact them to check medicine stock.',
    href: '/pharmacies',
    icon: HeartHandshake,
    tone: 'bg-[#e8eef4] text-[#2c4f73]'
  },
  {
    title: 'Search medicines',
    description: 'Look up medicine names, generics, uses, and key details.',
    href: '/medicines',
    icon: Pill,
    tone: 'bg-[#e3eff0] text-[#2d7a84]'
  },
  {
    title: 'Find a diagnostic lab',
    description: 'Explore diagnostic laboratories and open nearby listings in Maps.',
    href: '/labs',
    icon: FlaskConical,
    tone: 'bg-[#eaf0f3] text-[#4b6a86]'
  }
];

const moreToExplore = [
  {
    title: 'How MediTrust works',
    description: 'Learn how to explore healthcare information and local listings.',
    href: '/how-it-works',
    icon: BookOpen,
    tone: 'bg-[#e5f0f6] text-[#247BA0]'
  },
  {
    title: 'Health guides and updates',
    description: 'Browse health education articles and MediTrust updates.',
    href: '/blog',
    icon: BookOpen,
    tone: 'bg-[#e4f1ee] text-[#3d8a79]'
  },
  {
    title: 'About MediTrust',
    description: 'Meet the platform and the team building it.',
    href: '/about-meditrust',
    icon: HeartHandshake,
    tone: 'bg-[#e8eef4] text-[#2c4f73]'
  },
  {
    title: 'About Medynex',
    description: 'Learn about the company behind the MediTrust platform.',
    href: '/about-medynex',
    icon: HeartHandshake,
    tone: 'bg-[#e3eff0] text-[#2d7a84]'
  },
  {
    title: 'Meet the team',
    description: 'Get to know the people working on MediTrust.',
    href: '/team',
    icon: HeartHandshake,
    tone: 'bg-[#eaf0f3] text-[#4b6a86]'
  },
  {
    title: 'Our services',
    description: 'Explore healthcare search and platform services.',
    href: '/services',
    icon: Stethoscope,
    tone: 'bg-[#e5f0f6] text-[#247BA0]'
  }
];

const bandImage =
  'https://media.base44.com/images/public/6b030cdbdc778ab3ef0d040a/1ccbc8745d09edcf2daa8f88ef674e2e_generated_7d9f9800.jpg';

const cardClass =
  'group flex flex-col rounded-[20px] border border-[#e1e8ec] bg-white p-[22px] text-inherit no-underline shadow-[0_14px_34px_-26px_rgba(16,42,67,0.35)] transition-[box-shadow,border-color,background] duration-300 hover:border-[#bcd6e0] hover:shadow-[0_22px_44px_-26px_rgba(36,123,160,0.45)] active:bg-[#f6fafb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#247BA0]';

export const HomePage: React.FC = () => (
  <div className="min-h-screen bg-[#FAFAF7] text-[#102A43]">
    <SEO
      title="MediTrust | Find healthcare, close to home"
      description="Explore doctors, hospitals, pharmacies, and medicine information with MediTrust. Search by location and open local listings in Google Maps."
      keywords={HOMEPAGE_KEYWORDS}
      canonicalUrl="https://medynex.com"
    />
    <HealthcareHero />

    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-[72px]">
      <section className="py-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end sm:gap-10">
          <div>
            <p className="m-0 text-[13px] font-bold uppercase tracking-[2px] text-[#4A9B8A]">Start with what you need</p>
            <h2 className="mt-3 text-[2rem] font-bold leading-[1.1] tracking-[-1.2px] text-[#102A43] sm:text-[40px]">
              Everyday healthcare, easier to find.
            </h2>
          </div>
          <p className="m-0 max-w-[400px] text-base leading-[1.7] text-[#627d98]">
            One straightforward place to explore care options and make a more informed next move.
          </p>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div
            aria-hidden="true"
            className="absolute -top-3.5 left-[10%] right-[10%] hidden h-0.5 bg-[#4A9B8A] opacity-70 lg:block"
          />
          {careOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link key={option.title} to={option.href} className={`relative ${cardClass}`}>
                <span
                  aria-hidden="true"
                  className="absolute -top-[19px] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#4A9B8A] shadow-[0_0_0_4px_#FAFAF7] lg:block"
                />
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${option.tone}`}>
                  <Icon className="h-[21px] w-[21px]" />
                </span>
                <h3 className="mt-[18px] text-lg font-bold leading-tight text-[#102A43]">{option.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-[1.6] text-[#627d98]">{option.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#247BA0]">
                  Explore
                  <ArrowRight className="h-[15px] w-[15px] transition-transform duration-200 group-hover:translate-x-[3px]" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="pt-7 pb-10">
        <p className="m-0 text-[13px] font-bold uppercase tracking-[2px] text-[#4A9B8A]">More to explore</p>
        <h2 className="mt-3 text-[26px] font-bold leading-[1.1] tracking-[-1px] text-[#102A43] sm:text-[32px]">
          Get to know MediTrust.
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moreToExplore.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} to={item.href} className={`${cardClass} min-h-[132px] flex-row items-start gap-4`}>
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.tone}`}>
                  <Icon className="h-[21px] w-[21px]" />
                </span>
                <span>
                  <h3 className="m-0 text-[17px] font-bold leading-tight text-[#102A43]">{item.title}</h3>
                  <span className="mt-2 block text-sm leading-[1.6] text-[#627d98]">{item.description}</span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#247BA0]">
                    Explore
                    <ArrowRight className="h-[15px] w-[15px] transition-transform duration-200 group-hover:translate-x-[3px]" />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="relative mt-6 overflow-hidden rounded-3xl bg-[#102A43]">
        <img
          src={bandImage}
          alt="A calm modern clinic reception area"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,42,67,0.92),rgba(16,42,67,0.55))]"
        />
        <div className="relative z-[1] flex flex-col items-start justify-between gap-8 px-6 py-11 sm:px-12 md:flex-row md:items-center">
          <div>
            <p className="m-0 text-[13px] font-bold uppercase tracking-[2px] text-[#8fd0c1]">
              A little guidance goes a long way
            </p>
            <h2 className="mt-3 max-w-[620px] text-[28px] font-bold leading-[1.1] tracking-[-1px] text-white sm:text-[34px]">
              Have a health question? Start a conversation.
            </h2>
            <p className="mt-3 max-w-[560px] text-base leading-[1.65] text-[#d5e3ee]">
              Ask the MediTrust assistant for general health information and help finding the right type of care.
            </p>
          </div>
          <Link
            to="/ai-assistant"
            className="group inline-flex min-h-[50px] shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-white px-6 text-sm font-bold text-[#102A43] transition-[background,box-shadow] duration-200 hover:bg-[#e9f4f1] hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)] active:bg-[#d7ebe5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8fd0c1]"
          >
            Open AI assistant
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px]" />
          </Link>
        </div>
      </section>

      <div className="h-14" />
    </div>
  </div>
);
