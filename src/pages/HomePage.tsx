import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Building2, FlaskConical, HeartHandshake, Pill, Stethoscope } from 'lucide-react';
import { HealthcareHero } from '../components/home/HealthcareHero';
import { SEO } from '../components/common/SEO';
import { HOMEPAGE_KEYWORDS } from '../lib/seo';

const careOptions = [
  {
    title: 'Find a doctor',
    description: 'Explore doctor and clinic listings by specialty and location.',
    href: '/doctors',
    icon: Stethoscope,
    tone: 'bg-[#edf4ed] text-[#28714d]'
  },
  {
    title: 'Find a hospital',
    description: 'Explore hospital listings and confirm services with providers.',
    href: '/hospitals',
    icon: Building2,
    tone: 'bg-[#edf2f5] text-[#456b7d]'
  },
  {
    title: 'Find a pharmacy',
    description: 'Find nearby pharmacies and contact them to check medicine stock.',
    href: '/pharmacies',
    icon: HeartHandshake,
    tone: 'bg-[#f5f1e8] text-[#8a6933]'
  },
  {
    title: 'Search medicines',
    description: 'Look up medicine names, generics, uses, and key details.',
    href: '/medicines',
    icon: Pill,
    tone: 'bg-[#f2eef6] text-[#76588a]'
  },
  {
    title: 'Find a diagnostic lab',
    description: 'Explore diagnostic laboratories and open nearby listings in Maps.',
    href: '/labs',
    icon: FlaskConical,
    tone: 'bg-[#eef2f7] text-[#4d6585]'
  }
];

const moreToExplore = [
  {
    title: 'How MediTrust works',
    description: 'Learn how to explore healthcare information and local listings.',
    href: '/how-it-works',
    icon: BookOpen
  },
  {
    title: 'Health guides and updates',
    description: 'Browse health education articles and MediTrust updates.',
    href: '/blog',
    icon: BookOpen
  },
  {
    title: 'About MediTrust',
    description: 'Meet the platform and the team building it.',
    href: '/about-meditrust',
    icon: HeartHandshake
  }
];

export const HomePage: React.FC = () => (
  <div className="min-h-screen bg-[#fbfcfa] text-[#20372a]">
    <SEO
      title="MediTrust | Find healthcare, close to home"
      description="Explore doctors, hospitals, pharmacies, and medicine information with MediTrust. Search by location and open local listings in Google Maps."
      keywords={HOMEPAGE_KEYWORDS}
      canonicalUrl="https://medynex.com"
    />
    <HealthcareHero />

    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#548064]">Start with what you need</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#20372a] sm:text-4xl">
            Everyday healthcare, easier to find.
          </h2>
        </div>
        <p className="max-w-md text-base leading-7 text-[#68766c]">
          One straightforward place to explore care options and make a more informed next move.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {careOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Link
              key={option.title}
              to={option.href}
              className="group rounded-2xl border border-[#e3e9e3] bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#b9d0bd] hover:shadow-[0_16px_35px_-24px_rgba(32,75,46,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#27714d]"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${option.tone}`}>
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-[#263d2e]">{option.title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-[#6d7b71]">{option.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#33734e]">
                Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10 lg:pb-20">
      <div className="max-w-xl">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#548064]">More to explore</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-[#20372a] sm:text-3xl">
          Get to know MediTrust.
        </h2>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {moreToExplore.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className="group flex min-h-28 items-start gap-4 rounded-2xl border border-[#e3e9e3] bg-white p-5 transition-colors hover:border-[#b9d0bd] hover:bg-[#f8fbf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#27714d]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf4ed] text-[#28714d]">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-[#263d2e]">{item.title}</span>
                <span className="mt-1 block text-sm leading-6 text-[#6d7b71]">{item.description}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#33734e]">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>

    <section className="border-y border-[#e3e9e3] bg-[#f2f6f1]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#548064]">A little guidance goes a long way</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#20372a] sm:text-3xl">
            Have a health question? Start a conversation.
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#68766c] sm:text-base">
            Ask the MediTrust assistant for general health information and help finding the right type of care.
          </p>
        </div>
        <Link
          to="/ai-assistant"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-[#27714d] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1e5b3c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#27714d] focus-visible:ring-offset-2 md:self-auto"
        >
          Open AI assistant <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>

    <div className="h-10" />
  </div>
);
