import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  MapPin,
  Pill,
  Search,
  ShieldCheck,
  Stethoscope,
  Store
} from 'lucide-react';
import { SearchAutocomplete, SuggestionItem } from '../common/SearchAutocomplete';
import { useLocation } from '../../context/LocationContext';
import '../../styles/home-editorial.css';

type SearchType = 'all' | 'doctor' | 'hospital' | 'pharmacy' | 'medicine';

const searchTabs: { id: SearchType; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All care', icon: <Search className="h-4 w-4" /> },
  { id: 'doctor', label: 'Doctors', icon: <Stethoscope className="h-4 w-4" /> },
  { id: 'hospital', label: 'Hospitals', icon: <Building2 className="h-4 w-4" /> },
  { id: 'pharmacy', label: 'Pharmacies', icon: <Store className="h-4 w-4" /> },
  { id: 'medicine', label: 'Medicines', icon: <Pill className="h-4 w-4" /> }
];

const heroImage =
  'https://media.base44.com/images/public/6b030cdbdc778ab3ef0d040a/0b050a4f2fe5fa67a4a7158366b1a985_generated_e5f7fd03.jpg';

export const HealthcareHero: React.FC = () => {
  const navigate = useNavigate();
  const { location, setIsLocationModalOpen } = useLocation();
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('all');

  const goToSearch = (type: SearchType, searchQuery: string) => {
    const value = searchQuery.trim();
    if (type === 'medicine') {
      navigate(value ? `/medicines?q=${encodeURIComponent(value)}` : '/medicines');
      return;
    }
    const path = type === 'hospital'
      ? '/hospitals'
      : type === 'pharmacy'
        ? '/pharmacies'
        : '/doctors';
    navigate(value ? `${path}?q=${encodeURIComponent(value)}` : path);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchType !== 'all') {
      goToSearch(searchType, query);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const medicineTerms = /\b(dolo|paracetamol|augmentin|azithral|telma|glycomet|tablet|capsule|syrup|medicine|medication|drug|mg)\b/i;
    const pharmacyTerms = /\b(pharmacy|chemist|medical store|drugstore|apollo|medplus)\b/i;
    const hospitalTerms = /\b(hospital|emergency|icu|medical center)\b/i;
    const type = medicineTerms.test(lowerQuery)
      ? 'medicine'
      : pharmacyTerms.test(lowerQuery)
        ? 'pharmacy'
        : hospitalTerms.test(lowerQuery)
          ? 'hospital'
          : 'doctor';
    goToSearch(type, query);
  };

  const handleSelect = (item: SuggestionItem) => {
    const type = item.type === 'specialty' ? 'doctor' : item.type;
    if (type === 'doctor' || type === 'hospital' || type === 'pharmacy' || type === 'medicine') {
      goToSearch(type, item.title);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAFAF7]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-36 h-[460px] w-[460px] rounded-full bg-[#dcebe6] opacity-70 blur-[70px]" />
        <div className="absolute -right-36 top-28 h-[420px] w-[420px] rounded-full bg-[#dbe8f0] opacity-70 blur-[70px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-[72px]">
        <div className="grid grid-cols-1 items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-[72px]">
          <div className="min-w-0">
            <div className="rise-1 mb-6 inline-flex items-center gap-2 rounded-full border border-[#cfe0dc] bg-white px-4 py-2 text-sm font-semibold leading-tight text-hero-primary">
              <ShieldCheck className="h-4 w-4" />
              Care that feels a little more connected
            </div>

            <h1 className="rise-2 m-0 text-[2.5rem] font-bold leading-[1.06] tracking-[-1.8px] text-[#102A43] sm:text-5xl lg:text-[64px]">
              Find the care you need,{' '}
              <em className="block not-italic text-hero-accent">without the runaround.</em>
            </h1>
            <p className="rise-3 mt-6 max-w-[520px] text-base leading-[1.65] text-[#486581] sm:text-lg">
              Find doctors and hospitals, explore nearby pharmacies, and look up medicine information. Open local listings in Google Maps.
            </p>

            <form
              onSubmit={handleSubmit}
              className="rise-4 mt-8 max-w-[560px] rounded-[20px] border border-[#e1e8ec] bg-white p-2.5 shadow-[0_24px_50px_-30px_rgba(16,42,67,0.35)]"
            >
              <div className="flex gap-1 overflow-x-auto px-0.5 pt-0.5" role="tablist" aria-label="Search category">
                {searchTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={searchType === tab.id}
                    onClick={() => setSearchType(tab.id)}
                    className={`inline-flex shrink-0 items-center gap-[7px] rounded-xl px-3 py-[9px] text-sm font-semibold leading-tight transition-colors duration-200 active:bg-[#e5eef0] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-hero-primary ${
                      searchType === tab.id
                        ? 'bg-[#e6f1f2] text-[#1d6a8a]'
                        : 'bg-transparent text-[#52667a] hover:bg-[#f1f5f6] hover:text-[#102A43]'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-2 flex flex-col gap-2 border-t border-[#eef2f3] pt-2.5 sm:flex-row">
                <div className="min-w-0 flex-1">
                  <SearchAutocomplete
                    value={query}
                    onChange={setQuery}
                    filterType={searchType}
                    onSelect={handleSelect}
                    placeholder={
                      searchType === 'medicine'
                        ? 'Medicine name or generic (e.g. Dolo 650)'
                        : searchType === 'hospital'
                          ? 'Hospital, city, or department'
                          : searchType === 'pharmacy'
                            ? 'Pharmacy or chemist name'
                            : 'Doctor, specialty, medicine, or service'
                    }
                    className="[&_input]:h-12 [&_input]:rounded-xl [&_input]:border-[#dfe7ea] [&_input]:bg-[#fafcfc] [&_input]:py-0 [&_input]:text-sm [&_input]:shadow-none [&_input]:placeholder:text-[#7b8b98] [&_input]:focus:border-[#247BA0] [&_input]:focus:ring-2 [&_input]:focus:ring-[#247BA0]/15"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-hero-primary px-5 text-sm font-bold text-white transition-[background,box-shadow] duration-200 hover:bg-hero-strong hover:shadow-[0_10px_22px_-12px_rgba(36,123,160,0.7)] active:bg-[#175370] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102A43]"
                >
                  Search care
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px]" />
                </button>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#eef2f3] px-1.5 pt-2.5">
                <span className="text-xs text-[#7b8b98]">Try “cardiologist” or “Paracetamol”</span>
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-[10px] p-2 text-sm font-semibold leading-none text-[#2f5f78] transition-colors duration-200 hover:bg-[#eef5f6] active:bg-[#e1edef] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-hero-primary"
                >
                  <MapPin className="h-4 w-4" />
                  {location.city || 'Choose location'}
                </button>
              </div>
            </form>

            <div className="rise-4 mt-6 flex flex-wrap gap-x-[22px] gap-y-3 text-sm text-[#52667a]">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-hero-accent" />
                Clear, useful healthcare information
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-hero-accent" />
                Search by location
              </span>
            </div>
          </div>

          <div className="rise-3 relative">
            <div aria-hidden="true" className="absolute -inset-x-3 -top-3 bottom-3 rotate-2 rounded-[28px] bg-[#dcebe6]" />
            <div className="relative overflow-hidden rounded-3xl border border-white bg-[#e6ece9] shadow-[0_30px_70px_-36px_rgba(16,42,67,0.55)]">
              <img
                src={heroImage}
                alt="A healthcare team standing together in a bright clinic"
                className="block aspect-[4/5] w-full object-cover"
                fetchPriority="high"
              />
            </div>
            <p className="relative mt-5 text-sm leading-[1.6] text-[#627d98]">
              A welcoming place to begin your search for care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
