import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useHealthcare } from '../context/HealthcareContext';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import { Laboratory, LabTest } from '../types';
import { FlaskConical, ShieldCheck, Home, Calendar, CheckCircle2, Clock, MapPin, Search, Sparkles, TestTube, ExternalLink, AlertCircle } from 'lucide-react';
import { LAB_SEARCH_KEYWORDS } from '../lib/seo';
import { SEO } from '../components/common/SEO';
import { LabBookingModal } from '../components/modals/LabBookingModal';
import { DemandRequestModal } from '../components/modals/DemandRequestModal';
import { SearchAutocomplete } from '../components/common/SearchAutocomplete';

export const LabSearchPage: React.FC = () => {
  const { laboratories } = useHealthcare();
  const { location, setIsLocationModalOpen } = useLocation();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLabForBooking, setSelectedLabForBooking] = useState<{ lab: Laboratory; test?: LabTest } | null>(null);
  const [selectedLabForRequest, setSelectedLabForRequest] = useState<Laboratory | null>(null);

  const filteredLabs = laboratories.filter(lab => {
    const query = searchTerm ? searchTerm.toLowerCase().trim() : '';
    const matchesSearch = !query ||
                          (lab.name && lab.name.toLowerCase().includes(query)) ||
                          (lab.location && lab.location.toLowerCase().includes(query)) ||
                          (lab.city && lab.city.toLowerCase().includes(query)) ||
                          (lab.popularTests && lab.popularTests.some(t => t.name && t.name.toLowerCase().includes(query)));

    const matchesLocation = !location?.city || 
                            (lab.city && location.city && lab.city.toLowerCase() === location.city.toLowerCase()) || 
                            (lab.location && location.city && lab.location.toLowerCase().includes(location.city.toLowerCase())) ||
                            lab.city === 'All India' ||
                            query.length > 0;

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-10">
      <SEO
        title="Diagnostic Labs Near Me & Blood Test Home Collection | MediTrust"
        description="Book NABL accredited pathology diagnostic labs, blood tests, and health checkups in Hyderabad, Tirupati and across India with doorstep home sample collection."
        keywords={LAB_SEARCH_KEYWORDS}
        canonicalUrl="https://medynex.com/laboratories"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-mono text-[11px] font-bold border border-purple-500/20">
                Diagnostic & Demand Network
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-1">{t('findLabs', 'Diagnostic Labs & Home Collection')}</h1>
            <p className="text-sm text-slate-400 mt-1">
              Book pathology tests in <strong className="text-cyan-400">{location.city || 'your area'}</strong> or request diagnostic centers to onboard on MediTrust.
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
            filterType="lab"
            placeholder="Search diagnostic lab name, test (CBC, Thyroid, Lipid Profile)..." 
          />
        </div>

        {/* Location Notice Banner if no partnered lab exists */}
        {location.city && filteredLabs.filter(l => l.onboardingStatus === 'Active' || l.onboardingStatus === 'Verified').length === 0 && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-start space-x-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-sm text-amber-200">
                No partnered diagnostic labs are currently available in {location.city}.
              </p>
              <p className="text-amber-300/80">
                You can browse local diagnostic centers below and click <strong>"Request Lab Partnership"</strong> to notify MediTrust operations!
              </p>
            </div>
          </div>
        )}

        {/* Diagnostic Grid Cards with Fade-in Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredLabs.map((lab, index) => {
              const isOnboarded = lab.onboardingStatus === 'Active' || lab.onboardingStatus === 'Verified';

              return (
                <motion.div 
                  key={lab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                    isOnboarded 
                      ? 'bg-[#111827] border-slate-800 hover:border-purple-500/50 shadow-lg' 
                      : 'bg-[#111827]/80 border-amber-500/30 hover:border-amber-500/60'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img src={lab.image} alt={lab.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shrink-0" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-white">{lab.name}</h3>
                          {isOnboarded ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20">
                              Active Partner
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30">
                              Not Yet Onboarded
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-400 flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1 overflow-hidden">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="truncate">{lab.location}</span>
                          </div>
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lab.name + ', ' + lab.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-mono hover:underline shrink-0 ml-2"
                          >
                            <span>Maps</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        {isOnboarded && (
                          <div className="flex items-center gap-2 mt-1">
                            {lab.nablAccredited && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">NABL Accredited</span>}
                            {lab.homeCollection && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Home Sample Collection</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tests Offered or Onboarding Request Box */}
                    {isOnboarded ? (
                      <div className="space-y-3 pt-2 border-t border-slate-800">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Popular Tests & Packages</div>
                        {lab.popularTests.map(test => (
                          <div key={test.id} className="p-3.5 rounded-2xl bg-[#0B1120] border border-slate-800 flex items-center justify-between">
                            <div>
                              <div className="text-sm font-bold text-white">{test.name}</div>
                              <div className="text-xs text-slate-400">{test.sampleType} • Turnaround: {test.turnaroundTime}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-emerald-400">₹{test.discountPrice || test.price}</div>
                              {test.discountPrice && <div className="text-[10px] text-slate-500 line-through">₹{test.price}</div>}
                              <button 
                                onClick={() => setSelectedLabForBooking({ lab, test })}
                                className="mt-1 px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-[11px] font-bold"
                              >
                                Book Test
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 pt-4 border-t border-slate-800">
                        <p className="text-xs text-amber-300/90 leading-relaxed">
                          This lab is not yet onboarded. Submitting a demand request alerts the laboratory management to register on MediTrust!
                        </p>
                        <button
                          onClick={() => setSelectedLabForRequest(lab)}
                          className="w-full py-2.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 transition-all flex items-center justify-center space-x-1.5"
                        >
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>Request Laboratory Onboarding ({lab.requestCount || 21} Requests)</span>
                        </button>
                      </div>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Modals */}
        {selectedLabForBooking && (
          <LabBookingModal
            lab={selectedLabForBooking.lab}
            test={selectedLabForBooking.test}
            isOpen={!!selectedLabForBooking}
            onClose={() => setSelectedLabForBooking(null)}
          />
        )}

        {selectedLabForRequest && (
          <DemandRequestModal
            provider={{
              id: selectedLabForRequest.id,
              name: selectedLabForRequest.name,
              type: 'Laboratory',
              city: selectedLabForRequest.city,
              area: selectedLabForRequest.area
            }}
            isOpen={!!selectedLabForRequest}
            onClose={() => setSelectedLabForRequest(null)}
          />
        )}

      </div>
    </div>
  );
};
