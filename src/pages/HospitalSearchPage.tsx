import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useHealthcare } from '../context/HealthcareContext';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import { Hospital } from '../types';
import { Building2, MapPin, Phone, ShieldCheck, Activity, Search, AlertCircle, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';
import { HOSPITAL_SEARCH_KEYWORDS } from '../lib/seo';
import { SEO } from '../components/common/SEO';
import { DemandRequestModal } from '../components/modals/DemandRequestModal';
import { SearchAutocomplete } from '../components/common/SearchAutocomplete';

export const HospitalSearchPage: React.FC = () => {
  const { hospitals } = useHealthcare();
  const { location, setIsLocationModalOpen } = useLocation();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospitalForRequest, setSelectedHospitalForRequest] = useState<Hospital | null>(null);

  const filteredHospitals = hospitals.filter(h => {
    const query = searchTerm ? searchTerm.toLowerCase().trim() : '';
    const matchesSearch = !query ||
                          (h.name && h.name.toLowerCase().includes(query)) ||
                          (h.location && h.location.toLowerCase().includes(query)) ||
                          (h.city && h.city.toLowerCase().includes(query)) ||
                          (h.departments && h.departments.some(d => d && d.toLowerCase().includes(query)));

    const matchesLocation = !location?.city || 
                            (h.city && location.city && h.city.toLowerCase() === location.city.toLowerCase()) || 
                            (h.location && location.city && h.location.toLowerCase().includes(location.city.toLowerCase())) ||
                            h.city === 'All India' ||
                            query.length > 0;

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-10">
      <SEO
        title="Hospitals Near Me & Emergency Bed Tracker | MediTrust"
        description="Find top multi-specialty, emergency, private & government hospitals in Hyderabad, Tirupati, Kanigiri & across India. Monitor live OPD queue tokens and ICU bed status."
        keywords={HOSPITAL_SEARCH_KEYWORDS}
        canonicalUrl="https://medynex.com/hospitals"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/20">
                Live Bed Occupancy & Demand Network
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-1">{t('findHospitals', 'Hospital Directory & Bed Tracker')}</h1>
            <p className="text-sm text-slate-400 mt-1">
              Check ICU bed availability or request new hospitals in <strong className="text-cyan-400">{location.city || 'your region'}</strong> to join MediTrust.
            </p>
          </div>

          <button 
            onClick={() => setIsLocationModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center space-x-2 self-start md:self-auto transition-all shadow-md"
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Location: {location.city || 'Select City'}, {location.state}</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 rounded-3xl bg-[#111827] border border-slate-800">
          <SearchAutocomplete 
            value={searchTerm} 
            onChange={setSearchTerm} 
            filterType="hospital"
            placeholder="Search hospital name, city, department, or NABH accreditation..." 
          />
        </div>

        {/* Location Notice Banner if no partnered hospital exists */}
        {location.city && filteredHospitals.filter(h => h.onboardingStatus === 'Active' || h.onboardingStatus === 'Verified').length === 0 && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-start space-x-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-sm text-amber-200">
                No partnered hospitals are currently available in {location.city}.
              </p>
              <p className="text-amber-300/80">
                You can browse nearby hospital facilities below and click <strong>"Request Hospital Partnership"</strong> to notify MediTrust operations!
              </p>
            </div>
          </div>
        )}

        {/* Hospital Cards Grid with Fade-in Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredHospitals.map((hospital, index) => {
              const isOnboarded = hospital.onboardingStatus === 'Active' || hospital.onboardingStatus === 'Verified';

              return (
                <motion.div 
                  key={hospital.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`rounded-3xl border overflow-hidden transition-all flex flex-col justify-between ${
                    isOnboarded 
                      ? 'bg-[#111827] border-slate-800 hover:border-emerald-500/50 shadow-lg' 
                      : 'bg-[#111827]/80 border-amber-500/30 hover:border-amber-500/60'
                  }`}
                >
                  <div className="h-48 relative">
                    <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/30 to-transparent"></div>
                    
                    {hospital.nabhAccredited && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-600/90 text-white border border-blue-400/40 shadow-lg">
                        NABH Accredited
                      </span>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      {isOnboarded ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-black font-mono font-bold text-[10px] shadow-md flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-black" />
                          <span>Active Partner</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-black font-mono font-bold text-[10px] shadow-md flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 text-black" />
                          <span>Not Yet Onboarded</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white leading-snug">{hospital.name}</h3>
                      <div className="text-xs text-slate-400 flex items-center justify-between gap-1 mt-1">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="truncate">{hospital.location}</span>
                        </div>
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ', ' + hospital.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-mono hover:underline shrink-0 ml-2"
                        >
                          <span>Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {isOnboarded ? (
                      <div className="space-y-3">
                        {/* Bed Availability Tracker */}
                        <div className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Live Bed Availability:</span>
                            <span className="font-mono font-bold text-emerald-400">{hospital.availableBeds} / {hospital.totalBeds} Beds</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 transition-all duration-500" 
                              style={{ width: `${(hospital.availableBeds / hospital.totalBeds) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                          <span className="flex items-center gap-1 text-emerald-400 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" /> Emergency 24x7
                          </span>
                          <span className="text-slate-400">{hospital.phone}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-2 border-t border-slate-800">
                        <p className="text-xs text-amber-300/90 leading-relaxed">
                          This hospital is requested by local patients. Click below to demand OPD & bed allocation onboarding!
                        </p>
                        <button
                          onClick={() => setSelectedHospitalForRequest(hospital)}
                          className="w-full py-2.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 transition-all flex items-center justify-center space-x-1.5"
                        >
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>Request Hospital Onboarding ({hospital.requestCount || 34} Requests)</span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Demand Modal */}
        {selectedHospitalForRequest && (
          <DemandRequestModal
            provider={{
              id: selectedHospitalForRequest.id,
              name: selectedHospitalForRequest.name,
              type: 'Hospital',
              city: selectedHospitalForRequest.city,
              area: selectedHospitalForRequest.area
            }}
            isOpen={!!selectedHospitalForRequest}
            onClose={() => setSelectedHospitalForRequest(null)}
          />
        )}

      </div>
    </div>
  );
};
