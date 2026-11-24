import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { useHealthcare } from '../context/HealthcareContext';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import { Pharmacy } from '../types';
import { MapPin, Search, ExternalLink, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PHARMACY_SEARCH_KEYWORDS } from '../lib/seo';
import { SearchAutocomplete } from '../components/common/SearchAutocomplete';
import { getGoogleMapsSearchUrl } from '../lib/googleMaps';
import { NearbyCareMap } from '../components/locator/NearbyCareMap';

export const PharmacySearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { allPharmacies } = useHealthcare();
  const { location, setIsLocationModalOpen } = useLocation();
  const { t } = useLanguage();

  const urlQ = searchParams.get('q') || searchParams.get('search') || searchParams.get('query') || '';

  const [searchTerm, setSearchTerm] = useState(urlQ);

  // Sync state if URL query changes
  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search') || searchParams.get('query');
    if (q !== null && q !== searchTerm) setSearchTerm(q);
  }, [searchParams]);

  const quickFilterPills = [
    'Apollo Pharmacy',
    'MedPlus',
    'Sri Venkateswara',
    '24/7 Delivery',
    'Jan Aushadhi'
  ];

  const filteredPharmacies = useMemo(() => {
    const query = searchTerm ? searchTerm.toLowerCase().trim() : '';
    
    // First, filter by search query
    const searchMatched = allPharmacies.filter(pharm => {
      if (!query) return true;
      if (query.includes('24/7') || query.includes('24x7') || query.includes('night')) {
        return pharm.open24x7;
      }
      if (query.includes('jan aushadhi') || query.includes('generic')) {
        return pharm.name.toLowerCase().includes('jan aushadhi') || pharm.name.toLowerCase().includes('generic');
      }
      return (
        (pharm.name && pharm.name.toLowerCase().includes(query)) ||
        (pharm.address && pharm.address.toLowerCase().includes(query)) ||
        (pharm.city && pharm.city.toLowerCase().includes(query))
      );
    });

    // If search term is present, show all matches regardless of location
    if (query) return searchMatched;

    // Filter by city if set
    if (location?.city) {
      const cityMatched = searchMatched.filter(pharm => 
        (pharm.city && location.city && pharm.city.toLowerCase() === location.city.toLowerCase()) ||
        (pharm.address && location.city && pharm.address.toLowerCase().includes(location.city.toLowerCase())) ||
        pharm.city === 'All India'
      );
      if (cityMatched.length > 0) return cityMatched;
    }

    // Fallback: show all verified pharmacies in the network
    return searchMatched;
  }, [allPharmacies, searchTerm, location?.city]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-10">
      <SEO
        title="Find Pharmacies Near You | MediTrust India"
        description="Search pharmacy directory entries or open current pharmacy listings in Google Maps. Contact pharmacies to confirm current hours, medicine stock, and prices."
        keywords={PHARMACY_SEARCH_KEYWORDS}
        canonicalUrl="https://medynex.com/pharmacies"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[11px] font-bold border border-blue-200">
                Pharmacy Directory
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1">{t('findPharmacies', 'Find Pharmacies')}</h1>
            <p className="text-sm text-slate-600 mt-1">
              Search pharmacy directory entries in <strong className="text-blue-600">{location.city || 'your city'}</strong>. This page does not place orders or show live stock. Call a pharmacy to confirm its hours and medicine availability.
            </p>
          </div>

          <button 
            onClick={() => setIsLocationModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 flex items-center space-x-2 self-start md:self-auto transition-all shadow-xs"
          >
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Location: {location.city || 'All India'}, {location.state}</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <SearchAutocomplete 
            value={searchTerm} 
            onChange={(val) => {
              setSearchTerm(val);
              setSearchParams(prev => {
                const u = new URLSearchParams(prev);
                if (val) u.set('q', val);
                else u.delete('q');
                return u;
              });
            }} 
            filterType="pharmacy"
            placeholder="Search pharmacy name, medicine, brand, or area (e.g. Apollo, MedPlus, Dolo 650)..." 
          />

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold mr-1">Quick Filters:</span>
            {quickFilterPills.map((pill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSearchTerm(pill);
                  setSearchParams(prev => {
                    const u = new URLSearchParams(prev);
                    u.set('q', pill);
                    return u;
                  });
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  searchTerm === pill
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200/80'
                }`}
              >
                {pill}
              </button>
            ))}
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSearchParams(prev => {
                    const u = new URLSearchParams(prev);
                    u.delete('q');
                    return u;
                  });
                }}
                className="px-2.5 py-1 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Directory information may be outdated and is not an endorsement or verification of pharmacy licensing. Use Google Maps or contact the pharmacy to confirm details.
          </p>
        </div>

        {/* OpenStreetMap locator: pharmacies and hospitals near the visitor */}
        <NearbyCareMap />

        {/* Location Notice Banner if no partnered pharmacy exists */}
        {location.city && filteredPharmacies.filter(p => p.onboardingStatus === 'Active' || p.onboardingStatus === 'Verified').length === 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-sm text-amber-900">
                No partnered pharmacies are currently available in {location.city}.
              </p>
              <p className="text-amber-800">
                You can browse local medical stores below and click <strong>"Request this Pharmacy"</strong>. MediTrust will reach out to onboard them for express delivery!
              </p>
            </div>
          </div>
        )}

        {/* Pharmacy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredPharmacies.map((pharm, index) => {
              const isOnboarded = pharm.onboardingStatus === 'Active' || pharm.onboardingStatus === 'Verified';

              return (
                <motion.div 
                  key={pharm.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                    isOnboarded 
                      ? 'bg-white border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-lg' 
                      : 'bg-slate-50/80 border-amber-200 hover:border-amber-400 shadow-xs'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <img src={pharm.image} alt={pharm.name} className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0 bg-slate-100" />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">{pharm.name}</h3>
                        {isOnboarded ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>MediTrust Directory Partner</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-mono text-[10px] font-bold border border-amber-200">
                            Not Yet Onboarded
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-500 flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1 overflow-hidden">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{pharm.address}, {pharm.city}</span>
                        </div>
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pharm.address + ', ' + pharm.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-600 hover:text-blue-700 flex items-center space-x-1 font-mono hover:underline shrink-0 ml-2"
                        >
                          <span>Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <a
                      href={getGoogleMapsSearchUrl([pharm.name, pharm.address, pharm.city].filter(Boolean).join(', '))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Open pharmacy in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
