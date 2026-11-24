import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Pill,
  Filter,
  MapPin,
  X,
  Tag,
  Building2,
  BookOpen,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { SEO } from '../components/common/SEO';
import { PharmaceuticalMedicine } from '../types';
import { searchMedicinesLocal, getMedicineAutocompleteSuggestions } from '../data/medicineCatalog';
import { MedicineEncyclopedia } from '../components/medicines/MedicineEncyclopedia';
import { getGoogleMapsSearchUrl } from '../lib/googleMaps';
import { getPriceStatus, formatRupees } from '../lib/priceVerification';
import '../styles/medicines-catalog.css';

const HERO_IMAGE =
  'https://media.base44.com/images/public/6b030cdbdc778ab3ef0d040a/3316da4b09494c5af6354bfb19bdccb4_generated_8dca5ce6.jpg';

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

  const pharmacySearchUrl = getGoogleMapsSearchUrl([
    searchTerm.trim() ? `pharmacies carrying ${searchTerm.trim()}` : 'pharmacies',
    location.city,
    location.state
  ].filter(Boolean).join(', '));

  return (
    <div className="mtcat">
      <SEO
        title="Search Medicines and Generic Alternatives | MediTrust"
        description="Search medicine names, active ingredients, and reference information in the MediTrust catalog. Use Google Maps to find nearby pharmacies and confirm current stock and prices directly."
        keywords={['medicine search', 'generic medicines', 'prescriptions online', 'pharmacy near me', 'Dolo 650', 'Paracetamol', 'MediTrust']}
        canonicalUrl="https://medynex.com/medicines"
      />

      {/* Hero */}
      <div className="mtcat-hero">
        <img
          className="mtcat-hero-img"
          src={HERO_IMAGE}
          alt="Medicine blister packs and a pharmacy bottle on a cool white surface"
        />
        <div className="mtcat-scrim" />
        <span className="mtcat-eyebrow">
          <span className="mtcat-dot" />
          MediTrust Medicine Reference Catalog
        </span>
        <h1 className="mtcat-h1">Search Medicines &amp; Generic Alternatives</h1>
        <a className="mtcat-btn" href={pharmacySearchUrl} target="_blank" rel="noopener noreferrer">
          <MapPin style={{ width: 15, height: 15 }} />
          <span>{searchTerm.trim() ? `Find pharmacies for ${searchTerm.trim()}` : 'Find nearby pharmacies'} on Google Maps</span>
          <ExternalLink style={{ width: 14, height: 14 }} />
        </a>
        <p className="mtcat-lead">
          Search by brand name or active ingredient. Catalog details and prices are for reference only; pharmacy stock is not live. Confirm availability, current prices, and appropriate use with a registered pharmacist.
        </p>
      </div>

      {/* Search + filters */}
      <div className="mtcat-panel">
        <div ref={searchContainerRef} className="mtcat-sbox">
          <Search className="mtcat-searchicon" style={{ width: 18, height: 18 }} />
          <input
            type="text"
            id="input-medicine-search"
            autoComplete="off"
            className="mtcat-inp"
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
          />
          {searchTerm && (
            <button
              type="button"
              className="mtcat-xbtn"
              aria-label="Clear search"
              onClick={() => {
                setSearchTerm('');
                setShowSuggestions(false);
                setSearchParams(prev => {
                  const u = new URLSearchParams(prev);
                  u.delete('q');
                  return u;
                });
              }}
            >
              <X style={{ width: 18, height: 18 }} />
            </button>
          )}

          {/* Live autocomplete */}
          {showSuggestions && autocompleteSuggestions.length > 0 && (
            <div className="mtcat-sug">
              <div className="mtcat-sughd">
                <span>Fast Suggestions ({autocompleteSuggestions.length})</span>
                <b>MediTrust Medicine Catalog</b>
              </div>
              <div className="mtcat-suglist">
                {autocompleteSuggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="mtcat-sugrow"
                    onClick={() => handleSelectSuggestion(item.name)}
                  >
                    <span className="mtcat-sugl">
                      <span className="mtcat-sugic">
                        <Pill style={{ width: 14, height: 14, color: '#0F7E75' }} />
                      </span>
                      <span>
                        <span className="mtcat-sugn">
                          {item.name}
                          {item.sellingPrice && <i>{formatRupees(item.sellingPrice)}</i>}
                        </span>
                        <span className="mtcat-sugs">
                          {item.genericName} • {item.manufacturer}
                        </span>
                      </span>
                    </span>
                    <span className="mtcat-sugc">{item.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick symptoms */}
        <div className="mtcat-row mtcat-sep">
          <span className="mtcat-lab">Quick Symptoms:</span>
          {symptomQuickFilters.map((symptom, idx) => (
            <button
              key={idx}
              type="button"
              className="mtcat-chip"
              onClick={() => handleSelectSuggestion(symptom.term)}
            >
              {symptom.label}
            </button>
          ))}
        </div>

        {/* Popular searches */}
        <div className="mtcat-row">
          <span className="mtcat-lab">Popular:</span>
          {quickPopularSearches.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className="mtcat-chip g"
              onClick={() => handleSelectSuggestion(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="mtcat-row mtcat-sep">
          <span className="mtcat-lab">
            <Filter style={{ width: 12, height: 12 }} /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`mtcat-cat${selectedCategory === cat ? ' on' : ''}`}
              aria-pressed={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dosage forms */}
        <div className="mtcat-row">
          <span className="mtcat-lab">
            <Tag style={{ width: 12, height: 12 }} /> Form:
          </span>
          {dosageForms.map((df) => (
            <button
              key={df}
              type="button"
              className={`mtcat-frm${selectedDosage === df ? ' on' : ''}`}
              aria-pressed={selectedDosage === df}
              onClick={() => setSelectedDosage(df)}
            >
              {df}
            </button>
          ))}
        </div>
      </div>

      {/* View tabs */}
      <div className="mtcat-tabs">
        <div className="mtcat-tabw">
          <button
            type="button"
            className={`mtcat-tab${activeView === 'catalog' ? ' on' : ''}`}
            onClick={() => setActiveView('catalog')}
          >
            <Building2 style={{ width: 15, height: 15 }} />
            Medicine Reference Catalog ({displayTotal})
          </button>
          <button
            type="button"
            className={`mtcat-tab${activeView === 'encyclopedia' ? ' on' : ''}`}
            onClick={() => {
              setActiveView('encyclopedia');
              if (searchTerm.trim()) setMonographMedication(searchTerm.trim());
            }}
          >
            <BookOpen style={{ width: 15, height: 15 }} />
            Clinical Monograph &amp; OpenFDA Data
          </button>
        </div>
      </div>

      {activeView === 'catalog' ? (
        <>
          {/* Result meta */}
          <div className="mtcat-meta">
            <div>
              <span>
                Showing <strong>{displayTotal}</strong> catalog {displayTotal === 1 ? 'entry' : 'entries'}
                {searchTerm && <> for "<strong>{searchTerm}</strong>"</>}
                {loadingServer && <span className="mtcat-spin" role="status" aria-label="Searching the server catalog" />}
              </span>
              <small>Reference information only; no live pharmacy inventory.</small>
            </div>
            <button type="button" className="mtcat-loc" onClick={() => setIsLocationModalOpen(true)}>
              <MapPin style={{ width: 14, height: 14, color: '#0F7E75' }} />
              <span>
                Serving Area: <strong>{location.city || 'Tirupati'}, {location.state || 'Andhra Pradesh'}</strong> (Change)
              </span>
            </button>
          </div>

          {/* Legend */}
          <div className="mtcat-legend">
            <span className="mtcat-lg"><span className="mtcat-lgs" />Catalog reference</span>
            <span className="mtcat-lg"><span className="mtcat-lgt" />Verified MRP</span>
          </div>

          {/* Price provenance */}
          <div className="mtcat-note">
            <ShieldAlert style={{ width: 14, height: 14 }} />
            <span>
              <strong>Prices are not verified MRPs.</strong> Every amount below is a catalog reference value that has not been checked against a government (NPPA/DPCO) or manufacturer price list. Treat it as a guide and confirm the MRP printed on the pack with your pharmacist.
            </span>
          </div>

          {/* Results */}
          {displayResults.length === 0 ? (
            <div className="mtcat-empty">
              <Pill style={{ width: 26, height: 26, color: '#1C9C92' }} />
              <h3>No medicines matched "{searchTerm}"</h3>
              <p>
                Try searching by active chemical salt (e.g. Paracetamol, Amoxicillin, Telmisartan) or pick one of the popular categories above.
              </p>
              <button
                type="button"
                className="mtcat-act"
                style={{ display: 'inline-flex' }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedDosage('All');
                }}
              >
                Clear filters &amp; show all
              </button>
            </div>
          ) : (
            <div className="mtcat-table">
              <div className="mtcat-th">
                <span>Medicine</span>
                <span>Category</span>
                <span>Price</span>
                <span>Status</span>
                <span>Action</span>
              </div>
              {displayResults.map((med) => {
                const price = getPriceStatus(med);
                const hasDiscount = Boolean(med.mrp && med.sellingPrice && med.mrp > med.sellingPrice);
                return (
                  <div key={med.id} className={`mtcat-tr${price.state === 'verified' ? ' t' : ''}`}>
                    <div>
                      <span className="mtcat-mn">{med.name}</span>
                      <span className="mtcat-mg">{med.genericName} • {med.manufacturer}</span>
                      <span className="mtcat-mtags">
                        {med.strength} · {med.packSize} · {med.prescriptionRequired ? 'Rx required' : 'OTC'}
                      </span>
                    </div>

                    <div className="mtcat-cl">
                      {med.category}
                      <small>{med.dosageForm}</small>
                    </div>

                    <div className="mtcat-pr">
                      {formatRupees(med.sellingPrice ?? med.mrp)}
                      {hasDiscount && <small>Catalog MRP {formatRupees(med.mrp)}</small>}
                      {med.isJanAushadhiGenericAlternativeAvailable && med.janAushadhiEstimatedPrice && (
                        <small>Jan Aushadhi est. {formatRupees(med.janAushadhiEstimatedPrice)}</small>
                      )}
                    </div>

                    <div>
                      <span
                        className={`mtcat-st${price.state === 'verified' ? ' t' : ''}`}
                        title={price.detail}
                      >
                        {price.label}
                      </span>
                    </div>

                    <div className="mtcat-acts">
                      <button
                        type="button"
                        className="mtcat-act"
                        onClick={() => handleOpenMonograph(med.genericName || med.name)}
                      >
                        Monograph
                      </button>
                      <a
                        className="mtcat-act s"
                        href={getGoogleMapsSearchUrl([
                          `pharmacies carrying ${med.name}`,
                          location.city,
                          location.state
                        ].filter(Boolean).join(', '))}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Maps
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="mtcat-enc">
          <MedicineEncyclopedia
            initialMedication={monographMedication}
            showSearchBar={true}
          />
        </div>
      )}
    </div>
  );
};
