import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Stethoscope, 
  Building2, 
  Navigation, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Globe2, 
  ShieldCheck, 
  Sparkles,
  HeartPulse
} from 'lucide-react';
import { useLocation } from '../../context/LocationContext';

const POPULAR_LOCALITIES = [
  { name: 'Hyderabad', state: 'Telangana', type: 'Metro' },
  { name: 'Bengaluru', state: 'Karnataka', type: 'Metro' },
  { name: 'Chennai', state: 'Tamil Nadu', type: 'Metro' },
  { name: 'Tirupati', state: 'Andhra Pradesh', type: 'Tier-2' },
  { name: 'Kanigiri', state: 'Andhra Pradesh', type: 'Town' },
  { name: 'Vijayawada', state: 'Andhra Pradesh', type: 'City' },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'City' },
  { name: 'Pune', state: 'Maharashtra', type: 'Metro' },
  { name: 'Delhi NCR', state: 'Delhi', type: 'Metro' }
];

export const StatsSection: React.FC = () => {
  const { location, setLocation } = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'doctors' | 'pharmacies'>('all');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim() || location.city || 'India';
    
    // Update active city if searched
    if (searchInput.trim()) {
      setLocation({
        ...location,
        city: searchInput.trim(),
        mode: 'manual'
      });
    }

    if (activeCategory === 'pharmacies') {
      navigate(`/pharmacies?q=${encodeURIComponent(query)}`);
    } else {
      navigate(`/doctors?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSelectLocality = (locality: { name: string; state: string }) => {
    setLocation({
      ...location,
      country: 'India',
      city: locality.name,
      state: locality.state,
      mode: 'manual'
    });
    setSearchInput(locality.name);
  };

  const handleDetectCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`/api/places/reverse-geocode?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`);
          if (res.ok) {
            const data = await res.json();
            setLocation({
              ...location,
              country: data.country || 'India',
              state: data.state || 'Andhra Pradesh',
              district: data.district || data.city || 'District',
              city: data.city || data.town || 'Detected City',
              area: data.area || data.village || '',
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              mode: 'gps'
            });
            setSearchInput(data.city || data.town || data.area || '');
          }
        } catch (err) {
          console.error('Failed to reverse geocode:', err);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      () => {
        setIsDetectingLocation(false);
      },
      { timeout: 10000 }
    );
  };

  return (
    <section className="py-16 bg-[#F8FAFC] border-y border-slate-200 relative selection:bg-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header: Humanized Purpose */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3.5 py-1.5 rounded-full">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            <span>Pan-India Universal Healthcare Search</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find Doctors & Pharmacies in Any Village, Town or City
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            MediTrust is designed to make healthcare discovery universal. Search for verified clinics, hospitals, and licensed pharmacies anywhere across India, or request to connect your local neighborhood doctor.
          </p>
        </div>

        {/* The Universal Discovery Interactive Console */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2 p-1 bg-slate-100/90 rounded-2xl">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Healthcare
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('doctors')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === 'doctors'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                <span>Doctors & OPD Clinics</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('pharmacies')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === 'pharmacies'
                    ? 'bg-white text-amber-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Licensed Pharmacies</span>
              </button>
            </div>

            {/* GPS Detection Button */}
            <button
              type="button"
              onClick={handleDetectCurrentLocation}
              disabled={isDetectingLocation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-xs font-semibold text-slate-700 hover:text-teal-900 transition-colors"
            >
              <Navigation className={`w-3.5 h-3.5 text-teal-600 ${isDetectingLocation ? 'animate-spin' : ''}`} />
              <span>{isDetectingLocation ? 'Locating...' : 'Use My Current Location (GPS)'}</span>
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                id="input-universal-healthcare-search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter city, town, village, or pincode (e.g. Kanigiri, Tirupati, Hyderabad, Pune, Guntur)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all"
              />
            </div>

            <button
              type="submit"
              id="btn-universal-search-submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-teal-brand hover:bg-teal-fresh text-white font-bold text-sm transition-all shadow-md shadow-teal-900/10 flex items-center justify-center gap-2 shrink-0 group"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Search Providers</span>
            </button>
          </form>

          {/* Fast Locality Quick-Picks */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-500">
              <Globe2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Quick Select Locality / District:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_LOCALITIES.map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectLocality(loc)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                    location.city === loc.name
                      ? 'bg-teal-50 text-teal-800 border-teal-300 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span>{loc.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({loc.state})</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Architectural Showcase Pillars (Replacing all fake counts with genuine platform value) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
              <Compass className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Every Village & Town Covered</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Integrated with Google Places and OpenStreetMap geolocation meshes to detect verified hospitals, clinics, and chemist stores across any Indian pincode.
              </p>
            </div>
            <div className="text-[11px] text-teal-700 font-semibold flex items-center gap-1 pt-2 border-t border-slate-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Open Geolocation Network</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Nominate Your Local Provider</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Have a trusted family doctor or medical store in your locality? Patients can submit connection requests so we can onboard them into the digital queue mesh.
              </p>
            </div>
            <div className="text-[11px] text-blue-700 font-semibold flex items-center gap-1 pt-2 border-t border-slate-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Community-Powered Onboarding</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">ABDM & Ayushman Bharat Standard</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Structured for National Health Authority (NHA) specifications. Issuing cryptographically verifiable digital prescriptions and ABHA-linked medical vaults.
              </p>
            </div>
            <div className="text-[11px] text-purple-700 font-semibold flex items-center gap-1 pt-2 border-t border-slate-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Tamper-Proof Healthcare Security</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
