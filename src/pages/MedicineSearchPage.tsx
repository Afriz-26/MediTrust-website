import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Pill, 
  ShieldAlert, 
  Building, 
  ShoppingCart, 
  CheckCircle2, 
  Info, 
  Filter, 
  MapPin, 
  ArrowRight,
  Sparkles,
  X,
  AlertCircle,
  Loader2,
  HelpCircle,
  Tag,
  Building2
} from 'lucide-react';
import { useHealthcare } from '../context/HealthcareContext';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/common/SEO';
import { PharmaceuticalMedicine } from '../types';

export const MedicineSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDosage, setSelectedDosage] = useState<string>('All');
  
  // Data state from API
  const [medicines, setMedicines] = useState<PharmaceuticalMedicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Autocomplete Suggestions
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<Array<{ id: string; name: string; genericName: string; category: string; manufacturer: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Modals
  const [selectedMedicine, setSelectedMedicine] = useState<PharmaceuticalMedicine | null>(null);
  const [orderingMedicine, setOrderingMedicine] = useState<PharmaceuticalMedicine | null>(null);
  
  // Order form state
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string>('');
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  const { pharmacies, placePharmacyOrder } = useHealthcare();
  const { location, setIsLocationModalOpen } = useLocation();
  const { user } = useAuth();

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
  
  const dosageForms = ['All', 'Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Inhaler', 'Drops', 'Suspension'];

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

  // Fetch medicines from backend on filter/search changes (debounced)
  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(async () => {
      try {
        const queryParams = new URLSearchParams({
          query: searchTerm.trim(),
          category: selectedCategory,
          dosageForm: selectedDosage,
          limit: '60'
        });

        const res = await fetch(`/api/medicines/search?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setMedicines(data.results || []);
          setTotalCount(data.total || 0);
        }
      } catch (err) {
        console.error('[MedicineSearchPage Fetch Error]:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(handler);
  }, [searchTerm, selectedCategory, selectedDosage]);

  // Fetch live autocomplete suggestions
  useEffect(() => {
    if (!searchTerm.trim() || searchTerm.trim().length < 2) {
      setAutocompleteSuggestions([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const res = await fetch(`/api/medicines/autocomplete?query=${encodeURIComponent(searchTerm.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setAutocompleteSuggestions(data.suggestions || []);
        }
      } catch (err) {
        console.warn('[Medicine Autocomplete Error]:', err);
      }
    }, 180);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleSelectSuggestion = (name: string) => {
    setSearchTerm(name);
    setShowSuggestions(false);
  };

  const handleOpenOrder = (med: PharmaceuticalMedicine) => {
    setOrderingMedicine(med);
    setSelectedPharmacyId(pharmacies[0]?.id || 'pharm-101');
    setOrderQuantity(1);
    setPatientName(user?.name || '');
    setPatientPhone(user?.phone || '');
    setDeliveryAddress(user?.address || `${location.area || 'Main Center'}, ${location.city || 'Tirupati'}, ${location.state || 'Andhra Pradesh'}`);
    setOrderSuccess(false);
    setOrderError('');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderingMedicine) return;
    if (!patientName.trim() || !patientPhone.trim() || !deliveryAddress.trim()) {
      setOrderError('Please fill in patient name, phone number, and delivery address.');
      return;
    }

    try {
      const selectedPharm = pharmacies.find(p => p.id === selectedPharmacyId) || pharmacies[0];
      const itemPrice = orderingMedicine.sellingPrice || orderingMedicine.mrp || 0;
      await placePharmacyOrder({
        patientName,
        patientPhone,
        patientAddress: deliveryAddress,
        pharmacyId: selectedPharmacyId,
        pharmacyName: selectedPharm?.name || 'Apollo Pharmacy - Alipiri Branch',
        deliveryType: 'Home Delivery',
        items: [
          {
            name: `${orderingMedicine.name} (${orderingMedicine.strength})`,
            quantity: orderQuantity,
            price: itemPrice
          }
        ],
        totalAmount: itemPrice * orderQuantity
      });

      setOrderSuccess(true);
      setTimeout(() => {
        setOrderingMedicine(null);
        setOrderSuccess(false);
      }, 2500);
    } catch (err: any) {
      setOrderError(err.message || 'Failed to place order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#101515] py-10 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Search Medicines & Verified Prescription Dispensary | MediTrust"
        description="Search genuine pharmaceutical medicines, composition details, dosage recommendations, and check availability at verified pharmacies near you."
        keywords={['medicine search', 'generic medicines', 'prescriptions online', 'pharmacy near me', 'MediTrust']}
        canonicalUrl="https://medynex.com/medicines"
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F1] border border-[#DCEFEA] text-[#0E6763] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Pharmaceutical Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101515] tracking-tight">
            Search Genuine Medicines & Active Dispensaries
          </h1>
          <p className="text-base sm:text-lg text-[#737A78]">
            Search by brand name, active chemical salts, or manufacturer. Compare transparent NPPA/DPCO ceiling prices and check stock at licensed pharmacies.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="card-editorial p-5 sm:p-6 bg-white space-y-4">
          <div ref={searchContainerRef} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737A78]" />
            <input 
              type="text"
              id="input-medicine-search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search by brand (e.g. Dolo 650, Augmentin, Telma 40, Glycomet) or generic salt..."
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-[#F7F8F6] border border-[#E7EAE7] text-[#101515] placeholder:text-[#737A78] text-base focus:outline-none focus:ring-2 focus:ring-[#0E6763]/20 focus:border-[#0E6763] transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setShowSuggestions(false);
                }} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737A78] hover:text-[#101515]"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Autocomplete Dropdown */}
            {showSuggestions && autocompleteSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#E7EAE7] rounded-2xl shadow-xl z-50 overflow-hidden max-h-72 overflow-y-auto divide-y divide-[#E7EAE7]/50 animate-in fade-in duration-150">
                <div className="px-4 py-2 bg-[#F7F8F6] text-[11px] font-mono text-[#737A78] uppercase tracking-wider flex justify-between">
                  <span>Matching Drugs in Database</span>
                  <span className="text-[#0E6763] font-bold">{autocompleteSuggestions.length} items</span>
                </div>
                {autocompleteSuggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(item.name)}
                    className="w-full p-3.5 text-left hover:bg-[#F7F8F6] transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-[#EAF5F1] text-[#0E6763] group-hover:scale-105 transition-transform">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#101515] group-hover:text-[#0E6763] transition-colors">
                          {item.name}
                        </div>
                        <div className="text-xs text-[#737A78]">
                          {item.genericName} • {item.manufacturer}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EAF5F1] text-[#0E6763] font-medium">
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-semibold text-[#737A78] mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#101515] text-white shadow-sm' 
                    : 'bg-[#F7F8F6] text-[#737A78] hover:text-[#101515] hover:bg-[#E7EAE7] border border-[#E7EAE7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dosage Form Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#E7EAE7]/60">
            <span className="text-xs font-semibold text-[#737A78] mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Form:
            </span>
            {dosageForms.map((df) => (
              <button
                key={df}
                onClick={() => setSelectedDosage(df)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedDosage === df 
                    ? 'bg-[#0E6763] text-white shadow-sm' 
                    : 'bg-transparent text-[#737A78] hover:text-[#101515]'
                }`}
              >
                {df}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Current Location Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-[#737A78] px-2">
          <div>
            Showing <strong className="text-[#101515]">{totalCount}</strong> verified pharmaceutical items
          </div>
          <button 
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-medium bg-white hover:bg-[#F7F8F6] px-3 py-1.5 rounded-full border border-[#E7EAE7] text-[#101515] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#0E6763]" />
            <span>Serving Area: <strong>{location.city || 'Tirupati'}, {location.state || 'Andhra Pradesh'}</strong> (Change)</span>
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#0E6763] animate-spin mx-auto" />
            <p className="text-sm text-[#737A78]">Searching pharmaceutical databases...</p>
          </div>
        )}

        {/* Medicine Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((med) => (
              <motion.div
                key={med.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-editorial card-editorial-hover p-6 bg-white flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#EAF5F1] text-[#0E6763] flex items-center justify-center shrink-0 border border-[#DCEFEA]">
                        <Pill className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#101515] tracking-tight leading-snug">
                          {med.name}
                        </h3>
                        <div className="text-xs font-semibold text-[#0E6763]">{med.manufacturer}</div>
                      </div>
                    </div>
                    {med.prescriptionRequired ? (
                      <span className="tag-pill bg-amber-50 text-amber-800 border border-amber-200/60 text-[11px] shrink-0">
                        <ShieldAlert className="w-3 h-3 text-amber-600" /> Rx Required
                      </span>
                    ) : (
                      <span className="tag-pill bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[11px] shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> OTC Safe
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-[#737A78]">
                    <div className="flex items-baseline justify-between border-b border-[#E7EAE7]/60 pb-1.5">
                      <span>Generic Salt:</span>
                      <strong className="text-[#101515] font-medium text-right max-w-[200px] truncate">{med.genericName}</strong>
                    </div>
                    <div className="flex items-baseline justify-between border-b border-[#E7EAE7]/60 pb-1.5">
                      <span>Dosage Form:</span>
                      <strong className="text-[#101515] font-medium">{med.dosageForm} ({med.strength})</strong>
                    </div>
                    <div className="flex items-baseline justify-between border-b border-[#E7EAE7]/60 pb-1.5">
                      <span>Packaging:</span>
                      <strong className="text-[#101515] font-medium">{med.packSize}</strong>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span>Schedule:</span>
                      <strong className="text-[#0E6763] font-medium">{med.scheduleClass}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#737A78] line-clamp-2 leading-relaxed">
                    {med.description}
                  </p>

                  {/* Jan Aushadhi generic highlight if available */}
                  {med.isJanAushadhiGenericAlternativeAvailable && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-[11px] text-emerald-900 flex items-center justify-between">
                      <div>
                        <span className="font-bold block">Jan Aushadhi Alternative:</span>
                        <span>{med.janAushadhiGenericName}</span>
                      </div>
                      {med.janAushadhiEstimatedPrice && (
                        <div className="text-right">
                          <span className="text-[10px] text-emerald-700 block">Govt Est.</span>
                          <strong className="text-emerald-900 font-extrabold">₹{med.janAushadhiEstimatedPrice}</strong>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Price & Action Footer */}
                <div className="pt-5 mt-4 border-t border-[#E7EAE7] flex items-center justify-between">
                  <div>
                    {med.mrp !== null ? (
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-[#101515]">₹{med.sellingPrice || med.mrp}</span>
                          {med.sellingPrice && med.sellingPrice < med.mrp && (
                            <span className="text-xs text-[#737A78] line-through">₹{med.mrp}</span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#737A78] block">
                          {med.priceSource}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xs font-semibold text-slate-500 block">
                          Price on Inquiry
                        </span>
                        <span className="text-[10px] text-slate-400">Local dispensary pricing</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedMedicine(med)}
                      className="p-2 rounded-xl text-[#737A78] hover:text-[#101515] hover:bg-[#F7F8F6] transition-colors"
                      title="View Clinical Information"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleOpenOrder(med)}
                      className="px-4 py-2 rounded-xl bg-[#101515] hover:bg-[#0E6763] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && medicines.length === 0 && (
          <div className="card-editorial p-12 text-center bg-white space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#EAF5F1] text-[#0E6763] flex items-center justify-center mx-auto">
              <Pill className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#101515]">No medicines match your search</h3>
            <p className="text-sm text-[#737A78]">
              We couldn't find any medications matching "{searchTerm}". Please check for spelling or search by generic chemical compound (e.g., Paracetamol, Telmisartan, Amoxicillin).
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedDosage('All'); }}
              className="px-5 py-2.5 rounded-full bg-[#101515] text-white text-xs font-semibold hover:bg-[#0E6763] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* Clinical Details Modal */}
      <AnimatePresence>
        {selectedMedicine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101515]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-editorial bg-white max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedMedicine(null)}
                className="absolute right-5 top-5 p-2 rounded-full text-[#737A78] hover:text-[#101515] hover:bg-[#F7F8F6]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5F1] text-[#0E6763] flex items-center justify-center shrink-0">
                  <Pill className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#101515]">{selectedMedicine.name}</h3>
                  <div className="text-xs text-[#0E6763] font-semibold">{selectedMedicine.manufacturer}</div>
                </div>
              </div>

              <div className="space-y-3 text-sm border-t border-b border-[#E7EAE7] py-4">
                <div>
                  <span className="text-xs font-semibold text-[#737A78] block">Salt Composition</span>
                  <strong className="text-[#101515]">{selectedMedicine.composition}</strong>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#737A78] block">Schedule & Regulation</span>
                  <span className="text-xs text-[#101515] font-medium">{selectedMedicine.scheduleClass} • {selectedMedicine.prescriptionRequired ? 'Requires Valid Registered Medical Practitioner Prescription' : 'Available Over the Counter (OTC)'}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#737A78] block">Directions & Usage</span>
                  <p className="text-xs text-[#101515] leading-relaxed">{selectedMedicine.directions}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#737A78] block">Storage Advice</span>
                  <p className="text-xs text-[#737A78]">{selectedMedicine.storageAdvice}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#737A78] block">Known Side Effects</span>
                  <ul className="list-disc pl-4 text-xs text-[#737A78] space-y-0.5">
                    {selectedMedicine.sideEffects.map((effect, idx) => (
                      <li key={idx}>{effect}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#737A78]">Reference / MRP</span>
                  <div className="text-2xl font-extrabold text-[#101515]">
                    {selectedMedicine.mrp ? `₹${selectedMedicine.sellingPrice || selectedMedicine.mrp}` : 'Price on Request'}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const med = selectedMedicine;
                    setSelectedMedicine(null);
                    handleOpenOrder(med);
                  }}
                  className="px-6 py-3 rounded-full bg-[#101515] hover:bg-[#0E6763] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Order from Dispensary</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order from Dispensary Modal */}
      <AnimatePresence>
        {orderingMedicine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101515]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-editorial bg-white max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setOrderingMedicine(null)}
                className="absolute right-5 top-5 p-2 rounded-full text-[#737A78] hover:text-[#101515] hover:bg-[#F7F8F6]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5F1] text-[#0E6763] flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#101515]">Order from Partner Dispensary</h3>
                  <div className="text-xs text-[#737A78] font-medium">{orderingMedicine.name} ({orderingMedicine.strength})</div>
                </div>
              </div>

              {orderSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-[#101515]">Order Placed Successfully!</h4>
                  <p className="text-xs text-[#737A78]">
                    Your prescription order has been routed to the dispensary. They will verify stock and contact you at {patientPhone}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  {orderError && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                      {orderError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#101515] mb-1">Select Licensed Dispensary</label>
                    <select
                      value={selectedPharmacyId}
                      onChange={(e) => setSelectedPharmacyId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#F7F8F6] border border-[#E7EAE7] text-sm text-[#101515] focus:outline-none focus:border-[#0E6763]"
                    >
                      {pharmacies.map((pharm) => (
                        <option key={pharm.id} value={pharm.id}>
                          {pharm.name} ({pharm.city || location.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#101515] mb-1">Quantity</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F7F8F6] border border-[#E7EAE7] text-sm text-[#101515] focus:outline-none focus:border-[#0E6763]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#101515] mb-1">Estimated Total</label>
                      <div className="px-3 py-2 rounded-xl bg-[#F7F8F6] border border-[#E7EAE7] text-sm font-bold text-[#101515]">
                        ₹{((orderingMedicine.sellingPrice || orderingMedicine.mrp || 0) * orderQuantity)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#101515] mb-1">Patient Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F8F6] border border-[#E7EAE7] text-sm text-[#101515] focus:outline-none focus:border-[#0E6763]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#101515] mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98480 12345"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F8F6] border border-[#E7EAE7] text-sm text-[#101515] focus:outline-none focus:border-[#0E6763]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#101515] mb-1">Delivery Address</label>
                    <textarea
                      rows={2}
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E7EAE7] text-sm text-[#101515] focus:outline-none focus:border-[#0E6763] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#101515] hover:bg-[#0E6763] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Order & Dispatch to Pharmacy</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
