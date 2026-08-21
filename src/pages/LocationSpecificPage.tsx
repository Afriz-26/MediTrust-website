import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_DOCTORS, MOCK_HOSPITALS, MOCK_PHARMACIES } from '../lib/api';
import { MapPin, Stethoscope, Building2, Pill, Star, Clock, ArrowRight, ShieldCheck, Phone, Compass, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';

interface LocationSpecificPageProps {
  type: 'doctors' | 'hospitals' | 'pharmacies';
}

export const LocationSpecificPage: React.FC<LocationSpecificPageProps> = ({ type }) => {
  const { city } = useParams<{ city: string }>();

  // Format City Name cleanly (e.g. hyderabad -> Hyderabad)
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() : 'Hyderabad';

  const typeLabels = {
    doctors: { title: `Doctors in ${cityName}`, singular: 'Doctor', icon: Stethoscope, color: 'cyan' },
    hospitals: { title: `Hospitals in ${cityName}`, singular: 'Hospital', icon: Building2, color: 'blue' },
    pharmacies: { title: `Pharmacies in ${cityName}`, singular: 'Pharmacy', icon: Pill, color: 'emerald' }
  };

  const info = typeLabels[type];
  const IconComponent = info.icon;

  // Filter mock items by city keyword or show fallback list
  const filteredDoctors = MOCK_DOCTORS.filter(d => 
    (d.location && d.location.toLowerCase().includes(cityName.toLowerCase())) || 
    (d.hospitalName && d.hospitalName.toLowerCase().includes(cityName.toLowerCase())) ||
    (d.city && d.city.toLowerCase().includes(cityName.toLowerCase()))
  );
  const displayDoctors = filteredDoctors.length > 0 ? filteredDoctors : MOCK_DOCTORS;

  const filteredHospitals = MOCK_HOSPITALS.filter(h => 
    (h.city && h.city.toLowerCase().includes(cityName.toLowerCase())) || 
    (h.address && h.address.toLowerCase().includes(cityName.toLowerCase())) ||
    (h.location && h.location.toLowerCase().includes(cityName.toLowerCase()))
  );
  const displayHospitals = filteredHospitals.length > 0 ? filteredHospitals : MOCK_HOSPITALS;

  const filteredPharmacies = MOCK_PHARMACIES.filter(p => 
    (p.city && p.city.toLowerCase().includes(cityName.toLowerCase())) || 
    (p.address && p.address.toLowerCase().includes(cityName.toLowerCase()))
  );
  const displayPharmacies = filteredPharmacies.length > 0 ? filteredPharmacies : MOCK_PHARMACIES;

  const locationSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    'name': `MediTrust ${info.title} Network`,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': cityName,
      'addressCountry': 'IN'
    },
    'description': `Verified list of ${type} in ${cityName} powered by Medynex Solutions LLP.`
  };

  const locationKeywords = [
    `${type} in ${cityName}`,
    `Best ${type} in ${cityName}`,
    `Find ${type} nearby ${cityName}`,
    `MediTrust ${cityName}`,
    `Medynex Solutions ${cityName}`
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title={`${info.title} | Book Online & Check Live Queue – MediTrust`}
        description={`Find top-rated verified ${type} in ${cityName}. Compare consultation fees, check real-time OPD queue tokens, 24/7 emergency care, and digital medicine delivery in ${cityName}.`}
        keywords={locationKeywords}
        canonicalUrl={`https://medynex.com/${type}/in/${cityName.toLowerCase()}`}
        schema={locationSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb & Navigation Header */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <span>/</span>
          <Link to="/locations" className="hover:text-cyan-400">Locations</Link>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">{info.title}</span>
        </div>

        {/* Hero Header */}
        <div className="rounded-3xl bg-[#111827] border border-slate-800 p-8 sm:p-10 space-y-4 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1 rounded-full text-xs font-mono font-semibold text-cyan-400">
            <MapPin className="w-3.5 h-3.5" /> Healthcare in {cityName}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Top Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">{info.title}</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Discover trusted general physicians, specialists, emergency care centers, and pharmacies in {cityName} with live OPD queue updates, instant digital bookings, and e-prescription support.
          </p>

          {/* Quick Filter Switchers */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
            <Link
              to={`/doctors/in/${cityName.toLowerCase()}`}
              className={`px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                type === 'doctors'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" /> Doctors in {cityName}
            </Link>
            <Link
              to={`/hospitals/in/${cityName.toLowerCase()}`}
              className={`px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                type === 'hospitals'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> Hospitals in {cityName}
            </Link>
            <Link
              to={`/pharmacies/in/${cityName.toLowerCase()}`}
              className={`px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                type === 'pharmacies'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Pill className="w-3.5 h-3.5" /> Pharmacies in {cityName}
            </Link>
          </div>
        </div>

        {/* Dynamic Items Listing */}
        {type === 'doctors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayDoctors.map((doc) => (
              <div key={doc.id} className="rounded-3xl bg-[#111827] border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl space-y-4">
                <div className="flex items-start gap-4">
                  <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-700" />
                  <div>
                    <span className="text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                      {doc.specialty}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{doc.name}</h3>
                    <p className="text-xs text-slate-400">{doc.qualification}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" /> {doc.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-y border-slate-800/80 text-xs">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {doc.rating} ({doc.reviewCount})
                  </div>
                  <span className="text-slate-300 font-mono font-semibold">₹{doc.consultationFee} Fee</span>
                </div>

                <Link
                  to="/doctors"
                  className="w-full text-center text-xs font-bold py-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/15"
                >
                  Book Appointment in {cityName}
                </Link>
              </div>
            ))}
          </div>
        )}

        {type === 'hospitals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayHospitals.map((hosp) => (
              <div key={hosp.id} className="rounded-3xl bg-[#111827] border border-slate-800 p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all shadow-xl space-y-4">
                <div className="flex items-start gap-4">
                  <img src={hosp.image} alt={hosp.name} className="w-20 h-20 rounded-2xl object-cover border border-slate-700" />
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">{hosp.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" /> {hosp.address}, {hosp.city}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hosp.departments.slice(0, 3).map((dept) => (
                        <span key={dept} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded-full border border-slate-800">
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-y border-slate-800/80 text-xs text-slate-300">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" /> ABDM Queue Token Enabled
                  </span>
                  <span className="font-mono text-cyan-400">Available Beds: {hosp.availableBeds}</span>
                </div>

                <Link
                  to="/hospitals"
                  className="w-full text-center text-xs font-bold py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                >
                  View OPD Live Token Queue
                </Link>
              </div>
            ))}
          </div>
        )}

        {type === 'pharmacies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPharmacies.map((pharm) => (
              <div key={pharm.id} className="rounded-3xl bg-[#111827] border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-xl space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      24/7 Verified Partner
                    </span>
                    <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {pharm.rating}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{pharm.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {pharm.address}, {pharm.city}
                  </p>
                </div>

                <div className="py-3 border-y border-slate-800/80 text-xs space-y-1.5">
                  <p className="text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" /> {pharm.phone}
                  </p>
                  <p className="text-slate-400 text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Digital Prescription Pickup Ready
                  </p>
                </div>

                <Link
                  to="/pharmacies"
                  className="w-full text-center text-xs font-bold py-2.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/15"
                >
                  Order Medicines in {cityName}
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
