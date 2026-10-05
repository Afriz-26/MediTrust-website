import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Pill, 
  Filter, 
  MapPin, 
  Sparkles,
  X,
  AlertCircle,
  Loader2,
  HelpCircle,
  Tag,
  Building2,
  BookOpen,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { SEO } from '../components/common/SEO';
import { PharmaceuticalMedicine } from '../types';
import { searchMedicinesLocal, getMedicineAutocompleteSuggestions } from '../data/medicineCatalog';
import { MedicineEncyclopedia } from '../components/medicines/MedicineEncyclopedia';
import { getGoogleMapsSearchUrl } from '../lib/googleMaps';

export const MedicineSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameters
  const initialQ = searchParams.get('q') || searchParams.get('search') || searchParams.get('query') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialView = searchParams.get('view') === 'encyclopedia' ? 'encyclopedia' : 'catalog';

  const [activeView, setActiveView] = useState<'catalog' | 'encyclopedia'>(initialView);
  const [searchTerm, setSearchTerm] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDosage, setSelectedDosage] = useState<string>('All');
  
  // Selected medication for clinical monograph inspection
  const [monographMedication, setMonographMedication] = useState<string>(initialQ || 'Paracetamol');

  // Server results fallback state
  const [serverResults, setServerResults] = useState<PharmaceuticalMedicine[]>([]);
  const [loadingServer, setLoadingServer] = useState(false);

  // Autocomplete Suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { location, setIsLocationModalOpen } = useLocation();

  const categories = [
    'All',
    'Analgesics & Pain',
    'Antibiotics',
    'Cardiology & BP',
    'Diabetes Care',
    'Gastrointestinal',
    'Respiratory & Cold',
    'Dermatology',
    'Vitamins & Supplements'
  ];
  
  const dosageForms = ['All', 'Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Inhaler', 'Drops', 'Powder'];

  // Sync state if URL search parameters change
  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search') || searchParams.get('query') || '';
    const cat = searchParams.get('category') || 'All';
    const view = searchParams.get('view') === 'encyclopedia' ? 'encyclopedia' : 'catalog';
    if (q !== searchTerm) setSearchTerm(q);
    if (cat !== selectedCategory) setSelectedCategory(cat);
    if (view !== activeView) setActiveView(view);
  }, [searchParams]);

  // Handle outside click for autocomplete
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live instant local search results (0ms delay)
  const localResults = useMemo(() => {
    return searchMedicinesLocal({
      query: searchTerm,
      category: selectedCategory,
      dosageForm: selectedDosage,
      limit: 100
    });
  }, [searchTerm, selectedCategory, selectedDosage]);

  // Server Fallback: If local search found 0 items and query is present, check backend
  useEffect(() => {
    if (searchTerm.trim() && localResults.results.length === 0) {
      let isCancelled = false;
      setLoadingServer(true);

      const timer = setTimeout(async () => {
        try {
          const res = await fetch(`/api/medicines/search?q=${encodeURIComponent(searchTerm.trim())}&category=${encodeURIComponent(selectedCategory)}&dosageForm=${encodeURIComponent(selectedDosage)}`);
          if (res.ok && !isCancelled) {
            const data = await res.json();
            setServerResults(data.results || []);
          }
        } catch (e) {
          console.warn('[Medicine Server Search Error]:', e);
        } finally {
          if (!isCancelled) setLoadingServer(false);
        }
      }, 150);

      return () => {
        isCancelled = true;
        clearTimeout(timer);
      };
    } else {
      setServerResults([]);
    }
  }, [searchTerm, selectedCategory, selectedDosage, localResults.results.length]);

  // Final combined results
  const displayResults = localResults.results.length > 0 ? localResults.results : serverResults;
  const displayTotal = localResults.results.length > 0 ? localResults.total : serverResults.length;

  // Autocomplete live suggestions
  const autocompleteSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return getMedicineAutocompleteSuggestions(searchTerm);
  }, [searchTerm]);

  const handleSelectSuggestion = (name: string) => {
    setSearchTerm(name);
    setShowSuggestions(false);
    setActiveView('catalog');
    // Update URL param
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      updated.set('q', name);
      return updated;
    });
  };

  const handleOpenMonograph = (medName: string) => {
    setMonographMedication(medName);
    setActiveView('encyclopedia');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const symptomQuickFilters = [
    { label: '🌡️ Fever & Headache', term: 'Paracetamol' },
    { label: '🔥 Acidity & Gas', term: 'Pantoprazole' },
    { label: '🤧 Cough & Cold', term: 'Montair-LC' },
    { label: '🩺 Blood Pressure & Heart', term: 'Telma 40' },
    { label: '🩸 Diabetes Care', term: 'Glycomet 500' },
    { label: '💊 Antibiotics', term: 'Augmentin' },
    { label: '⚡ Immunity & Vitamins', term: 'Becosules' },
    { label: '🩹 Skin Care & Antiseptic', term: 'Betadine' }
  ];

  const quickPopularSearches = [
    'Paracetamol',
    'Dolo 650',
    'Augmentin 625',
    'Pan-D',
    'Telma 40',
    'Glycomet 500',
    'Montair-LC',
    'Azithral 500',
    'Allegra 120',
    'Becosules Z',
    'Shelcal 500',
    'Atorva 20',
    'Electral ORS'
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Search Medicines and Generic Alternatives | MediTrust"
        description="Search medicine names, active ingredients, and reference information in the MediTrust catalog. Use Google Maps to find nearby pharmacies and confirm current stock and prices directly."
        keywords={['medicine search', 'generic medicines', 'prescriptions online', 'pharmacy near me', 'Dolo 650', 'Paracetamol', 'MediTrust']}
        canonicalUrl="https://medynex.com/medicines"
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>MediTrust Medicine Reference Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Search Medicines & Generic Alternatives
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Search by brand name or active ingredient. Catalog details and prices are for reference only; pharmacy stock is not live. Confirm availability, current prices, and appropriate use with a registered pharmacist.
          </p>
          <a
            href={getGoogleMapsSearchUrl([
              searchTerm.trim() ? `pharmacies carrying ${searchTerm.trim()}` : 'pharmacies',
              location.city,
              location.state
            ].filter(Boolean).join(', '))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
          >
            <MapPin className="h-4 w-4" />
            <span>{searchTerm.trim() ? `Find pharmacies for ${searchTerm.trim()}` : 'Find nearby pharmacies'} on Google Maps</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Global Fast Search Bar (Available in both views) */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div ref={searchContainerRef} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input 
              type="text"
              id="input-medicine-search"
              value={searchTerm}
              onChange={(e) => {
                const val = e.target.value;
                setSearchTerm(val);
                setShowSuggestions(true);
                if (val.trim()) {
                  setMonographMedication(val.trim());
                }
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowSuggestions(false);
                  setSearchParams(prev => {
                    const u = new URLSearchParams(prev);
                    if (searchTerm.trim()) u.set('q', searchTerm.trim());
                    else u.delete('q');
                    return u;
                  });
                }
              }}
              placeholder="Search medicine brand (e.g. Dolo 650, Augmentin, Telma 40, Pan-D, Montair-LC) or generic salt..."
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all font-medium"
            />
            {searchTerm && (
              <button 
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setShowSuggestions(false);
                  setSearchParams(prev => {
                    const u = new URLSearchParams(prev);
                    u.delete('q');
                    return u;
                  });
                }} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Live Autocomplete Dropdown */}
            {showSuggestions && autocompleteSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden max-h-72 overflow-y-auto divide-y divide-slate-100 animate-in fade-in duration-100">
                <div className="px-4 py-2 bg-slate-50 text-[11px] font-mono text-slate-500 uppercase tracking-wider flex justify-between">
                  <span>Fast Suggestions ({autocompleteSuggestions.length})</span>
                  <span className="text-emerald-700 font-bold">MediTrust Medicine Catalog</span>
                </div>
                {autocompleteSuggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(item.name)}
                    className="w-full p-3.5 text-left hover:bg-emerald-50/70 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:scale-105 transition-transform border border-emerald-100">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-2">
                          <span>{item.name}</span>
                          {item.sellingPrice && (
                            <span className="text-xs font-mono font-semibold text-emerald-700">₹{item.sellingPrice}</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.genericName} • {item.manufacturer}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Symptoms & Health Intent Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold mr-1">Quick Symptoms:</span>
            {symptomQuickFilters.map((symptom, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(symptom.term)}
                className="px-3 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 transition-colors text-xs font-semibold"
              >
                {symptom.label}
              </button>
            ))}
          </div>

          {/* Quick Popular Search Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold mr-1">Popular:</span>
            {quickPopularSearches.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 transition-colors text-xs font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dosage Form Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" /> Form:
            </span>
            {dosageForms.map((df) => (
              <button
                key={df}
                type="button"
                onClick={() => setSelectedDosage(df)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedDosage === df 
                    ? 'bg-emerald-700 text-white shadow-xs font-bold' 
                    : 'bg-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {df}
              </button>
            ))}
          </div>
        </div>

        {/* View Toggle Ribbon: Medicine Catalog vs Clinical Monograph */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs gap-1">
            <button
              type="button"
              onClick={() => setActiveView('catalog')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeView === 'catalog'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Medicine Reference Catalog ({displayTotal})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveView('encyclopedia');
                if (searchTerm.trim()) setMonographMedication(searchTerm.trim());
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeView === 'encyclopedia'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Clinical Monograph & OpenFDA Data</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* VIEW 1: MEDICINE REFERENCE CATALOG */}
        {/* ============================================================ */}
        {activeView === 'catalog' && (
          <div className="space-y-6">
            
            {/* Results Counter & Current Location Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-slate-600 px-2">
              <div className="flex items-center gap-2">
                <span>Showing <strong className="text-slate-900">{displayTotal}</strong> catalog entries</span>
                {searchTerm && <span>for "<strong>{searchTerm}</strong>"</span>}
                {loadingServer && <Loader2 className="w-3.5 h-3.5 text-emerald-600 animate-spin" />}
                <span className="text-xs text-slate-500">Reference information only; no live pharmacy inventory.</span>
              </div>
              <button 
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 text-slate-800 transition-colors shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Serving Area: <strong>{location.city || 'Tirupati'}, {location.state || 'Andhra Pradesh'}</strong> (Change)</span>
              </button>
            </div>

            {/* Medicine Cards Grid */}
            {displayResults.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                  <Pill className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No medicines matched "{searchTerm}"</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Try searching by active chemical salt (e.g. Paracetamol, Amoxicillin, Telmisartan) or click one of the popular categories above.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedDosage('All');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-colors"
                >
                  Clear Filters & Show All
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayResults.map((med) => (
                  <motion.div
                    key={med.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                            <Pill className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                              {med.name}
                            </h3>
                            <div className="text-xs font-semibold text-emerald-700">{med.manufacturer}</div>
                          </div>
                        </div>

                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase shrink-0 border ${
                          med.prescriptionRequired 
                            ? 'bg-amber-50 text-amber-800 border-amber-200' 
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {med.prescriptionRequired ? 'Rx Required' : 'OTC Available'}
                        </span>
                      </div>

                      {/* Salt & Composition */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                        <div className="text-slate-500 font-medium">Active Generic Salt:</div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{med.genericName}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-emerald-700 font-mono text-[11px]">{med.strength}</span>
                        </div>
                      </div>

                      {/* Therapeutic Category & Pack */}
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium">
                          {med.category}
                        </span>
                        <span className="font-mono text-slate-500">{med.packSize}</span>
                      </div>

                      {/* Price Section */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="text-[11px] text-slate-400 font-medium">Catalog price (reference only):</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-extrabold text-slate-900">
                              ₹{med.sellingPrice || med.mrp || 0}
                            </span>
                            {med.mrp && med.sellingPrice && med.mrp > med.sellingPrice && (
                              <span className="text-xs text-slate-400 line-through">
                                ₹{med.mrp}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                            Reference value
                          </span>
                        </div>
                      </div>

                      {/* Jan Aushadhi Alternative Badge */}
                      {med.isJanAushadhiGenericAlternativeAvailable && med.janAushadhiEstimatedPrice && (
                        <div className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
                          <div className="flex items-center justify-between font-bold text-emerald-900">
                            <span className="flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                              Jan Aushadhi Generic
                            </span>
                            <span className="text-emerald-700 font-mono">₹{med.janAushadhiEstimatedPrice}</span>
                          </div>
                          <div className="text-[11px] text-emerald-800">
                            Indicative catalog comparison only; confirm current prices with a pharmacist.
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenMonograph(med.genericName || med.name)}
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                        <span>Monograph</span>
                      </button>

                      <a
                        href={getGoogleMapsSearchUrl([
                          `pharmacies carrying ${med.name}`,
                          location.city,
                          location.state
                        ].filter(Boolean).join(', '))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Find pharmacies</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: CLINICAL MONOGRAPH & OPENFDA REGULATORY DATA */}
        {/* ============================================================ */}
        {activeView === 'encyclopedia' && (
          <div className="py-2">
            <MedicineEncyclopedia 
              initialMedication={monographMedication} 
              showSearchBar={true} 
            />
          </div>
        )}

      </div>

    </div>
  );
};
