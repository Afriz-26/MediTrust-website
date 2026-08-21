import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from '../../context/LocationContext';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Navigation, Check, X, Search, Globe, ChevronRight, Compass, Loader2, Sparkles } from 'lucide-react';

interface AutoSuggestion {
  placeId: string;
  mainText: string;
  secondaryText: string;
  fullText: string;
  source: 'google' | 'indian_geonames';
  types?: string[];
}

const POPULAR_LOCATIONS: { city: string; district: string; state: string; area: string; pincode: string; lat: number; lng: number }[] = [
  { city: 'Tirupati', district: 'Tirupati', state: 'Andhra Pradesh', area: 'Alipiri / MR Palli', pincode: '517501', lat: 13.6288, lng: 79.4192 },
  { city: 'Hyderabad', district: 'Hyderabad', state: 'Telangana', area: 'Banjara Hills / Hitec City', pincode: '500081', lat: 17.3850, lng: 78.4867 },
  { city: 'Bengaluru', district: 'Bengaluru Urban', state: 'Karnataka', area: 'Indiranagar / Koramangala', pincode: '560038', lat: 12.9716, lng: 77.5946 },
  { city: 'Kanigiri', district: 'Prakasam', state: 'Andhra Pradesh', area: 'Main Road / Bus Stand Circle', pincode: '523230', lat: 15.4011, lng: 79.5126 },
  { city: 'Visakhapatnam', district: 'Visakhapatnam', state: 'Andhra Pradesh', area: 'Siripuram / MVP Colony', pincode: '530001', lat: 17.6868, lng: 83.2185 },
  { city: 'Vijayawada', district: 'NTR District', state: 'Andhra Pradesh', area: 'Benz Circle / Labbipet', pincode: '520010', lat: 16.5062, lng: 80.6480 },
  { city: 'Chennai', district: 'Chennai', state: 'Tamil Nadu', area: 'Adyar / T. Nagar', pincode: '600020', lat: 13.0827, lng: 80.2707 },
  { city: 'Mumbai', district: 'Mumbai City', state: 'Maharashtra', area: 'Bandra / Andheri', pincode: '400050', lat: 19.0760, lng: 72.8777 },
  { city: 'New Delhi', district: 'New Delhi', state: 'Delhi', area: 'Connaught Place / South Ex', pincode: '110001', lat: 28.6139, lng: 77.2090 },
  { city: 'Guntur', district: 'Guntur', state: 'Andhra Pradesh', area: 'Brodipet / Kothapet', pincode: '522002', lat: 16.3067, lng: 80.4365 },
  { city: 'Nellore', district: 'SPSR Nellore', state: 'Andhra Pradesh', area: 'Trunk Road / Current Office', pincode: '524001', lat: 14.4426, lng: 79.9865 }
];

export const LocationSelectorModal: React.FC = () => {
  const { location, setLocation, requestGPSLocation, setPlaceById, isLocationModalOpen, setIsLocationModalOpen } = useLocation();
  const { t } = useLanguage();

  const [searchInput, setSearchInput] = useState('');
  const [liveSuggestions, setLiveSuggestions] = useState<AutoSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingGps, setLoadingGps] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'manual'>('search');

  const [selectedState, setSelectedState] = useState(location.state || 'Andhra Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState(location.district || 'Tirupati');
  const [selectedCity, setSelectedCity] = useState(location.city || 'Tirupati');
  const [selectedArea, setSelectedArea] = useState(location.area || 'Alipiri');
  const [pincode, setPincode] = useState(location.pincode || '517501');

  // Debounced live fetch to Google Places Autocomplete API
  useEffect(() => {
    if (!searchInput.trim() || searchInput.trim().length < 2) {
      setLiveSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }

    setLoadingSuggestions(true);
    const handler = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(searchInput.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setLiveSuggestions(data.suggestions || []);
        }
      } catch (err) {
        console.warn('[Location Autocomplete Error]:', err);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 280);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const handleSelectSuggestion = async (item: AutoSuggestion) => {
    setLoadingSuggestions(true);
    try {
      const resolved = await setPlaceById(item.placeId);
      if (!resolved) {
        // Fallback parse
        const parts = item.fullText.split(',').map(s => s.trim());
        const detectedCity = parts[0] || item.mainText;
        const detectedState = parts[1] || 'India';
        setLocation({
          mode: 'manual',
          country: 'India',
          state: detectedState,
          district: detectedCity,
          city: detectedCity,
          area: item.mainText,
          pincode: ''
        });
      }
      setIsLocationModalOpen(false);
    } catch (err) {
      console.warn('[Location selection error]:', err);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSelectPopularItem = (item: typeof POPULAR_LOCATIONS[0]) => {
    setLocation({
      mode: 'manual',
      country: 'India',
      state: item.state,
      district: item.district,
      city: item.city,
      area: item.area,
      pincode: item.pincode,
      latitude: item.lat,
      longitude: item.lng
    });
    setIsLocationModalOpen(false);
  };

  const handleUseGPS = async () => {
    setLoadingGps(true);
    try {
      await requestGPSLocation();
    } finally {
      setLoadingGps(false);
      setIsLocationModalOpen(false);
    }
  };

  const handleSaveManualLocation = () => {
    setLocation({
      mode: 'manual',
      country: 'India',
      state: selectedState,
      district: selectedDistrict,
      city: selectedCity,
      area: selectedArea,
      pincode
    });
    setIsLocationModalOpen(false);
  };

  if (!isLocationModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-[#111827] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-5 text-slate-100 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{t('locationLabel', 'Healthcare Location Setup')}</h2>
                <p className="text-xs text-slate-400">Find verified doctors, pharmacies & lab services near your exact location</p>
              </div>
            </div>
            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* GPS Detector */}
          <button
            onClick={handleUseGPS}
            disabled={loadingGps}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-indigo-600/20 border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-between text-cyan-300 font-semibold transition-all group shadow-md"
          >
            <div className="flex items-center space-x-3">
              <Navigation className={`w-5 h-5 text-cyan-400 ${loadingGps ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} />
              <div className="text-left">
                <div className="text-sm font-bold text-white">
                  {loadingGps ? 'Detecting Precise GPS Coordinates...' : 'Use My Current Location (GPS)'}
                </div>
                <div className="text-xs text-cyan-300/80">Reverse-geocodes your address for nearby clinic & pharmacy discovery</div>
              </div>
            </div>
            {loadingGps ? (
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
            ) : (
              <Compass className="w-5 h-5 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            )}
          </button>

          {/* Tab Selection */}
          <div className="flex rounded-2xl bg-[#0B1120] p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('search')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'search' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Places Autocomplete
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'manual' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Manual District Setup
            </button>
          </div>

          {activeTab === 'search' ? (
            <div className="space-y-4">
              {/* Autocomplete Input */}
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Type city, district, locality or pincode (e.g. Banjara Hills, Tirupati, Kanigiri)..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-all"
                  autoFocus
                />
                {loadingSuggestions && (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
                )}
              </div>

              {/* Suggestions List (Live from API or Popular list) */}
              <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                {searchInput.trim().length >= 2 ? (
                  <>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Places Results</span>
                      <span className="text-cyan-400 font-bold">{liveSuggestions.length} Matches</span>
                    </div>

                    {liveSuggestions.length === 0 && !loadingSuggestions && (
                      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400">
                        No locations found for "{searchInput}". Try searching a city name or district.
                      </div>
                    )}

                    {liveSuggestions.map((item) => (
                      <button
                        key={item.placeId}
                        type="button"
                        onClick={() => handleSelectSuggestion(item)}
                        className="w-full p-3 rounded-2xl bg-[#0B1120] border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 shrink-0">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {item.mainText}
                            </div>
                            <div className="text-xs text-slate-400 truncate max-w-[280px]">
                              {item.secondaryText}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Major Healthcare Hubs</span>
                      <span className="text-cyan-400 font-bold">{POPULAR_LOCATIONS.length} Cities</span>
                    </div>

                    {POPULAR_LOCATIONS.map((item) => (
                      <button
                        key={`${item.city}-${item.district}`}
                        type="button"
                        onClick={() => handleSelectPopularItem(item)}
                        className="w-full p-3 rounded-2xl bg-[#0B1120] border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 shrink-0">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {item.city} <span className="text-xs text-slate-400 font-normal">({item.district} Dist)</span>
                            </div>
                            <div className="text-xs text-slate-400">
                              {item.area} • PIN {item.pincode} ({item.state})
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          ) : (
            /* Manual Hierarchy Form */
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">State</label>
                  <input
                    type="text"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">District</label>
                  <input
                    type="text"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">City / Town</label>
                  <input
                    type="text"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Locality / Area</label>
                  <input
                    type="text"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">PIN Code</label>
                <input
                  type="text"
                  placeholder="e.g. 523230"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="button"
                onClick={handleSaveManualLocation}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Location Details</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
