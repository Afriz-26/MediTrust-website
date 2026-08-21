import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Doctor } from '../types';
import { useHealthcare } from '../context/HealthcareContext';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import { Search, MapPin, Star, Calendar, Clock, Video, Building2, CheckCircle2, Sparkles, Filter, X, Stethoscope, UserCheck, AlertCircle, ExternalLink, Loader2, Navigation } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { DOCTOR_SEARCH_KEYWORDS } from '../lib/seo';
import { BookingModal } from '../components/modals/BookingModal';
import { DemandRequestModal } from '../components/modals/DemandRequestModal';
import { SearchAutocomplete } from '../components/common/SearchAutocomplete';

export const DoctorSearchPage: React.FC = () => {
  const { allDoctors } = useHealthcare();
  const { location, setIsLocationModalOpen } = useLocation();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedTierFilter, setSelectedTierFilter] = useState<'All' | 'VERIFIED' | 'EXTERNAL_DISCOVERY'>('All');
  
  const [discoveredDoctors, setDiscoveredDoctors] = useState<Doctor[]>([]);
  const [loadingDiscovery, setLoadingDiscovery] = useState(false);

  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [selectedDoctorForRequest, setSelectedDoctorForRequest] = useState<Doctor | null>(null);

  const specialties = [
    'All',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'General Medicine',
    'General Surgery',
    'Oncology',
    'Gynecology'
  ];

  // Fetch hybrid external discovery if coordinates exist
  useEffect(() => {
    let isCancelled = false;

    const fetchDiscovery = async () => {
      setLoadingDiscovery(true);
      try {
        const queryParams = new URLSearchParams();
        if (location.latitude && location.longitude) {
          queryParams.append('lat', location.latitude.toString());
          queryParams.append('lng', location.longitude.toString());
        }
        if (location.city) {
          queryParams.append('city', location.city);
        }
        if (selectedSpecialty !== 'All') {
          queryParams.append('specialty', selectedSpecialty);
        }
        if (searchTerm) {
          queryParams.append('q', searchTerm);
        }

        const res = await fetch(`/api/doctors/discovery?${queryParams.toString()}`);
        if (res.ok && !isCancelled) {
          const data = await res.json();
          setDiscoveredDoctors(data.results || []);
        }
      } catch (err) {
        console.warn('[Doctor Discovery Fetch Error]:', err);
      } finally {
        if (!isCancelled) setLoadingDiscovery(false);
      }
    };

    fetchDiscovery();

    return () => {
      isCancelled = true;
    };
  }, [location.latitude, location.longitude, location.city, selectedSpecialty, searchTerm]);

  // Combine verified doctors from context with discovered external places
  const combinedDoctors: Doctor[] = React.useMemo(() => {
    // 1. Filter internal verified doctors
    const query = searchTerm ? searchTerm.toLowerCase().trim() : '';
    const internalList = allDoctors.filter(doc => {
      const matchesSearch = !query || 
                            (doc.name && doc.name.toLowerCase().includes(query)) || 
                            (doc.specialty && doc.specialty.toLowerCase().includes(query)) ||
                            (doc.hospitalName && doc.hospitalName.toLowerCase().includes(query)) ||
                            (doc.clinicName && doc.clinicName.toLowerCase().includes(query)) ||
                            (doc.city && doc.city.toLowerCase().includes(query));
      
      const matchesSpecialty = selectedSpecialty === 'All' || 
                               (doc.specialty && doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()));

      const matchesLocation = !location?.city || 
                              (doc.city && doc.city.toLowerCase() === location.city.toLowerCase()) || 
                              doc.city === 'All India' ||
                              query.length > 0;

      return matchesSearch && matchesSpecialty && matchesLocation;
    });

    // 2. Format discovered external places
    const externalFormatted: Doctor[] = discoveredDoctors.map(d => ({
      id: d.id,
      name: d.name,
      specialty: d.specialty,
      qualification: d.qualification || 'MBBS',
      experienceYears: d.experienceYears || 5,
      hospitalName: d.hospitalName || d.clinicName || 'Local Clinic',
      clinicName: d.clinicName || d.hospitalName || 'Local Clinic',
      clinicAddress: d.clinicAddress || `${d.city}, ${d.state}`,
      city: d.city,
      district: d.district || d.city,
      state: d.state,
      location: `${d.city}, ${d.state}`,
      bio: d.bio || `Healthcare clinician located in ${d.city}, ${d.state}.`,
      languages: d.languages || ['English', 'Hindi', 'Telugu'],
      rating: d.rating || 4.2,
      reviewCount: d.reviewCount || 10,
      consultationFee: d.consultationFee || 400,
      availableOnline: d.availableOnline ?? false,
      availableOffline: d.availableOffline ?? true,
      nextAvailable: d.nextAvailable || 'Pending Onboarding',
      image: d.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      onboardingStatus: 'Not Yet Onboarded',
      distanceKm: d.distanceKm,
      isExternalPlace: true
    }));

    // Merge without duplicates
    const all = [...internalList];
    externalFormatted.forEach(ef => {
      if (!all.some(item => item.name.toLowerCase() === ef.name.toLowerCase())) {
        all.push(ef);
      }
    });

    // Apply Tier Filter if requested
    if (selectedTierFilter === 'VERIFIED') {
      return all.filter(d => d.onboardingStatus === 'Active' || d.onboardingStatus === 'Verified');
    }
    if (selectedTierFilter === 'EXTERNAL_DISCOVERY') {
      return all.filter(d => d.onboardingStatus === 'Not Yet Onboarded');
    }

    return all;
  }, [allDoctors, discoveredDoctors, searchTerm, selectedSpecialty, location.city, selectedTierFilter]);

  const verifiedCount = combinedDoctors.filter(d => d.onboardingStatus === 'Active' || d.onboardingStatus === 'Verified').length;
  const externalCount = combinedDoctors.filter(d => d.onboardingStatus === 'Not Yet Onboarded').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-10">
      <SEO
        title="Find Doctors & Book Online Appointments | MediTrust India"
        description="Search top verified doctors, specialists, cardiologists, pediatricians & general physicians in Hyderabad, Bengaluru, Tirupati, Chennai and across India. Book instant OPD queue tokens and online video consultations."
        keywords={DOCTOR_SEARCH_KEYWORDS}
        canonicalUrl="https://medynex.com/doctors"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Location Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[11px] font-bold border border-blue-200">
                ABDM Compliant Network
              </span>
              <span className="text-xs text-slate-500 font-medium">Pan-India Tiered Discovery</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1">{t('findDoctors', 'Find & Book Doctors in India')}</h1>
            <p className="text-sm text-slate-600 mt-1">
              Book verified OPD queue tokens or video consults in <strong className="text-blue-600">{location.city || 'your city'}</strong> ({location.state || 'India'}).
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

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          <div className="md:col-span-5 relative">
            <SearchAutocomplete 
              value={searchTerm} 
              onChange={setSearchTerm} 
              filterType="doctor"
              placeholder="Search doctor name, specialty, hospital, or clinic..." 
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-blue-500 font-medium"
            >
              {specialties.map(s => <option key={s} value={s}>{s === 'All' ? 'All Specialties' : s}</option>)}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedTierFilter}
              onChange={(e) => setSelectedTierFilter(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="All">All Providers ({combinedDoctors.length})</option>
              <option value="VERIFIED">Verified & Active Only ({verifiedCount})</option>
              <option value="EXTERNAL_DISCOVERY">Nearby Healthcare Clinics ({externalCount})</option>
            </select>
          </div>

        </div>

        {/* Summary Counter & Loading */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div className="flex items-center gap-3">
            <span>Showing <strong className="text-slate-900">{combinedDoctors.length}</strong> medical practitioners</span>
            <span className="hidden sm:inline-block">•</span>
            <span className="text-emerald-700 font-semibold">{verifiedCount} Active MediTrust Partners</span>
            <span className="hidden sm:inline-block">•</span>
            <span className="text-amber-700 font-semibold">{externalCount} Nearby Establishments</span>
          </div>
          {loadingDiscovery && (
            <div className="flex items-center gap-1.5 text-blue-600 font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Scanning nearby places...</span>
            </div>
          )}
        </div>

        {/* Location Notice Banner if no partnered doctor exists */}
        {location.city && verifiedCount === 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-sm text-amber-900">
                Direct OPD booking is not yet activated in {location.city}.
              </p>
              <p className="text-amber-800">
                You can browse local healthcare clinics discovered below and click <strong>"Request to Onboard Doctor"</strong>. We prioritize partner outreach in your area!
              </p>
            </div>
          </div>
        )}

        {/* Doctor Grid Cards with Smooth Fade-in Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {combinedDoctors.map((doctor, index) => {
              const isOnboarded = doctor.onboardingStatus === 'Active' || doctor.onboardingStatus === 'Verified';

              return (
                <motion.div 
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                    isOnboarded 
                      ? 'bg-white border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-lg' 
                      : 'bg-slate-50/90 border-amber-200/80 hover:border-amber-400 shadow-xs'
                  }`}
                >
                  {/* Status Banner */}
                  <div className="flex items-center justify-between mb-4">
                    {isOnboarded ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified MediTrust Clinician</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[10px] font-mono font-bold border border-amber-200 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Nearby Healthcare Clinic</span>
                      </span>
                    )}

                    {doctor.distanceKm && (
                      <span className="text-[10px] font-mono text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        {doctor.distanceKm} km away
                      </span>
                    )}
                  </div>

                  {/* Profile info */}
                  <div className="flex items-start space-x-4">
                    <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0 bg-slate-100" />
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900 leading-snug">{doctor.name}</h3>
                      <div className="text-xs font-semibold text-blue-600">{doctor.specialty}</div>
                      <div className="text-xs text-slate-500 font-medium">{doctor.qualification}</div>
                      {doctor.rating > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-amber-500 pt-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-slate-900">{doctor.rating}</span>
                          <span className="text-slate-500 font-normal">({doctor.reviewCount}) • {doctor.experienceYears} yrs exp</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate font-medium">{doctor.hospitalName || doctor.clinicName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{doctor.city || 'Hyderabad'}, {doctor.district || doctor.state}</span>
                      </div>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((doctor.clinicAddress || doctor.hospitalName) + ', ' + doctor.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-blue-600 hover:text-blue-700 flex items-center space-x-1 font-mono hover:underline shrink-0"
                      >
                        <span>Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    {isOnboarded ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500 font-medium">Consultation Fee: <strong className="text-emerald-700 text-sm font-bold">₹{doctor.consultationFee}</strong></span>
                          <span className="text-[10px] font-mono text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">{doctor.nextAvailable || 'Today Available'}</span>
                        </div>
                        <button
                          onClick={() => setSelectedDoctorForBooking(doctor)}
                          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book OPD / Video Consult</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                          Healthcare clinic discovered via Google Places. Request doctor onboarding to enable instant OPD queue token booking.
                        </p>
                        <button
                          onClick={() => setSelectedDoctorForRequest(doctor)}
                          className="w-full py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300 transition-all flex items-center justify-center space-x-1.5"
                        >
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>Request to Onboard Doctor</span>
                        </button>
                      </div>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {combinedDoctors.length === 0 && !loadingDiscovery && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 max-w-md mx-auto">
            <Stethoscope className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No doctors found</h3>
            <p className="text-xs text-slate-500">
              No medical practitioners found matching "{searchTerm}". Try clearing search or switching city.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedSpecialty('All'); setSelectedTierFilter('All'); }}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Booking & Demand Modals */}
        <BookingModal
          doctor={selectedDoctorForBooking}
          isOpen={!!selectedDoctorForBooking}
          onClose={() => setSelectedDoctorForBooking(null)}
        />

        {selectedDoctorForRequest && (
          <DemandRequestModal
            provider={{
              id: selectedDoctorForRequest.id,
              name: selectedDoctorForRequest.name,
              type: 'Doctor',
              city: selectedDoctorForRequest.city,
              area: selectedDoctorForRequest.area,
              specialty: selectedDoctorForRequest.specialty
            }}
            isOpen={!!selectedDoctorForRequest}
            onClose={() => setSelectedDoctorForRequest(null)}
          />
        )}

      </div>
    </div>
  );
};
