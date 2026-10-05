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
import heroImage from '../../assets/images/hero_bright_healthcare_1790915208361.jpg';

type SearchType = 'all' | 'doctor' | 'hospital' | 'pharmacy' | 'medicine';

const searchTabs: { id: SearchType; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All care', icon: <Search className="h-4 w-4" /> },
  { id: 'doctor', label: 'Doctors', icon: <Stethoscope className="h-4 w-4" /> },
  { id: 'hospital', label: 'Hospitals', icon: <Building2 className="h-4 w-4" /> },
  { id: 'pharmacy', label: 'Pharmacies', icon: <Store className="h-4 w-4" /> },
  { id: 'medicine', label: 'Medicines', icon: <Pill className="h-4 w-4" /> }
];

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
    <section className="relative overflow-hidden bg-[#f4f8f4]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 -top-48 h-[34rem] w-[34rem] rounded-full bg-[#dcece1] blur-3xl opacity-70" />
        <div className="absolute -right-40 top-24 h-[30rem] w-[30rem] rounded-full bg-[#e4efeb] blur-3xl opacity-70" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9ddd0] bg-white/80 px-3.5 py-2 text-sm font-semibold text-[#315b46] shadow-sm">
            <ShieldCheck className="h-4 w-4 text-[#27714d]" />
            Care that feels a little more connected
          </div>

          <h1 className="max-w-2xl text-[2.65rem] font-semibold leading-[1.08] tracking-[-0.045em] text-[#172c23] sm:text-6xl lg:text-[4.25rem]">
            Find the care you need,{' '}
            <span className="font-serif font-medium italic text-[#27714d]">without the runaround.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#52665a] sm:text-lg">
            Find doctors and hospitals, explore nearby pharmacies, and look up medicine information. Open local listings in Google Maps.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-2xl rounded-[1.4rem] border border-[#dce5de] bg-white p-2 shadow-[0_18px_60px_-30px_rgba(30,70,48,0.35)]">
            <div className="flex gap-1 overflow-x-auto px-1 pt-1" role="tablist" aria-label="Search category">
              {searchTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={searchType === tab.id}
                  onClick={() => setSearchType(tab.id)}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#27714d] ${
                    searchType === tab.id
                      ? 'bg-[#eaf3ec] text-[#245d3d]'
                      : 'text-[#627267] hover:bg-[#f5f8f5] hover:text-[#294b37]'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-2 flex flex-col gap-2 border-t border-[#edf1ed] p-1 pt-3 sm:flex-row">
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
                  className="w-full"
                />
              </div>
              <button
                type="submit"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#27714d] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1e5b3c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#27714d] focus-visible:ring-offset-2"
              >
                Search care <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#edf1ed] px-2 pt-3">
              <span className="text-xs text-[#718075]">Try “cardiologist” or “Paracetamol”</span>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-[#35624a] transition-colors hover:bg-[#f2f7f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#27714d]"
              >
                <MapPin className="h-4 w-4" />
                {location.city || 'Choose location'}
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#637368]">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#31835a]" />
              Clear, useful healthcare information
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#31835a]" />
              Search by location
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[40rem] lg:ml-auto">
          <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-[#dce9dd]" />
          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/80 bg-[#e7ede7] shadow-[0_24px_80px_-35px_rgba(22,56,36,0.5)]">
            <img
              src={heroImage}
              alt="A doctor speaking with a patient in a bright, welcoming clinic"
              className="aspect-[4/3] w-full object-cover object-center"
              fetchPriority="high"
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-[#65766a]">
            A welcoming place to begin your search for care.
          </p>
        </div>
      </div>
    </section>
  );
};
