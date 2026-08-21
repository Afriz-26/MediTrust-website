import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useHealthcare } from '../context/HealthcareContext';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import { Pharmacy } from '../types';
import { Pill, MapPin, Phone, Truck, Clock, Search, ShoppingBag, CheckCircle2, Sparkles, Store, ExternalLink, AlertCircle } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PHARMACY_SEARCH_KEYWORDS } from '../lib/seo';
import { PharmacyOrderModal } from '../components/modals/PharmacyOrderModal';
import { DemandRequestModal } from '../components/modals/DemandRequestModal';
import { SearchAutocomplete } from '../components/common/SearchAutocomplete';

export const PharmacySearchPage: React.FC = () => {
  const { allPharmacies } = useHealthcare();
  const { location, setIsLocationModalOpen } = useLocation();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPharmacyForOrder, setSelectedPharmacyForOrder] = useState<Pharmacy | null>(null);
  const [selectedPharmacyForRequest, setSelectedPharmacyForRequest] = useState<Pharmacy | null>(null);

  const filteredPharmacies = allPharmacies.filter(pharm => {
    const query = searchTerm ? searchTerm.toLowerCase().trim() : '';
    const matchesSearch = !query ||
                          (pharm.name && pharm.name.toLowerCase().includes(query)) ||
                          (pharm.address && pharm.address.toLowerCase().includes(query)) ||
                          (pharm.city && pharm.city.toLowerCase().includes(query));

    const matchesLocation = !location?.city || 
                            (pharm.city && location.city && pharm.city.toLowerCase() === location.city.toLowerCase()) || 
                            (pharm.address && location.city && pharm.address.toLowerCase().includes(location.city.toLowerCase())) ||
                            pharm.city === 'All India' ||
                            query.length > 0;

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-10">
      <SEO
        title="Pharmacies Near Me & 24 Hour Medicine Delivery | MediTrust India"
        description="Find 24-hour pharmacies, medical stores, and online medicine delivery in Hyderabad, Bengaluru, Tirupati, Chennai and across India with digital e-prescription upload."
        keywords={PHARMACY_SEARCH_KEYWORDS}
        canonicalUrl="https://medynex.com/pharmacies"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[11px] font-bold border border-blue-200">
                Verified Indian Pharmacies & Chemists
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1">{t('findPharmacies', 'Pharmacies & Doorstep Delivery')}</h1>
            <p className="text-sm text-slate-600 mt-1">
              Order genuine medicines in ₹ from licensed pharmacies in <strong className="text-blue-600">{location.city || 'your city'}</strong> or upload your prescription.
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
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <SearchAutocomplete 
            value={searchTerm} 
            onChange={setSearchTerm} 
            filterType="pharmacy"
            placeholder="Search pharmacy name, medicine, brand, or area (e.g. Apollo, MedPlus, Dolo 650)..." 
          />
        </div>

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
                            <span>Licensed Chemist</span>
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

                      {isOnboarded && (
                        <div className="text-xs text-emerald-700 font-mono font-semibold pt-1">
                          {pharm.inStockMedicinesCount.toLocaleString()} Medicines In Stock
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    {isOnboarded ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                          <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-amber-600" /> Express Doorstep Delivery</span>
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-emerald-600" /> 24x7 Open</span>
                        </div>
                        <button
                          onClick={() => setSelectedPharmacyForOrder(pharm)}
                          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Order Medicines / Upload Prescription</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs text-amber-800 leading-relaxed font-medium">
                          Request this pharmacy to join MediTrust so you can order home delivery and digital prescriptions!
                        </p>
                        <button
                          onClick={() => setSelectedPharmacyForRequest(pharm)}
                          className="w-full py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300 transition-all flex items-center justify-center space-x-1.5"
                        >
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>Request Pharmacy Onboarding ({pharm.requestCount || 18} Requests)</span>
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
        <PharmacyOrderModal
          pharmacy={selectedPharmacyForOrder}
          isOpen={!!selectedPharmacyForOrder}
          onClose={() => setSelectedPharmacyForOrder(null)}
        />

        {selectedPharmacyForRequest && (
          <DemandRequestModal
            provider={{
              id: selectedPharmacyForRequest.id,
              name: selectedPharmacyForRequest.name,
              type: 'Pharmacy',
              city: selectedPharmacyForRequest.city,
              area: selectedPharmacyForRequest.area
            }}
            isOpen={!!selectedPharmacyForRequest}
            onClose={() => setSelectedPharmacyForRequest(null)}
          />
        )}

      </div>
    </div>
  );
};

