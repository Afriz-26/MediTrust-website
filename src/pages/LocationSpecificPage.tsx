import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Stethoscope, Building2, Pill, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { getGoogleMapsSearchUrl } from '../lib/googleMaps';

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

  const locationSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    'name': `MediTrust ${info.title} Network`,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': cityName,
      'addressCountry': 'IN'
    },
    'description': `Search ${type} in ${cityName} with MediTrust.`
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
        title={`${info.title} | MediTrust`}
        description={`Search ${type} in ${cityName} with MediTrust and open current local listings in Google Maps.`}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">{info.title}</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Search local healthcare listings in {cityName}. Google Maps provides current places; confirm provider credentials, hours, and availability directly. MediTrust does not provide booking.
          </p>
          <a
            href={getGoogleMapsSearchUrl(`${type === 'doctors' ? 'doctors and clinics' : type} in ${cityName}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-400"
          >
            <MapPin className="h-4 w-4" />
            Search {type} in {cityName} on Google Maps
            <ArrowRight className="h-4 w-4" />
          </a>

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
          <div className="rounded-3xl bg-[#111827] border border-slate-800 p-8 text-center shadow-xl">
            <Stethoscope className="mx-auto h-10 w-10 text-cyan-400" />
            <h2 className="mt-4 text-xl font-bold text-white">Search current local doctor listings</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              This page does not display sample doctor profiles. Open Google Maps to search current doctors and clinics in {cityName}; provider details are maintained by Google and the listed businesses.
            </p>
          </div>
        )}

        {type === 'hospitals' && (
          <div className="rounded-3xl bg-[#111827] border border-slate-800 p-8 text-center shadow-xl">
            <Building2 className="mx-auto h-10 w-10 text-blue-400" />
            <h2 className="mt-4 text-xl font-bold text-white">Search current hospital listings</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              MediTrust does not have live bed availability or OPD queue data. Open Google Maps for current hospital listings in {cityName} and contact the hospital directly to confirm services and capacity.
            </p>
            <a
              href={getGoogleMapsSearchUrl(`hospitals in ${cityName}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Search hospitals on Google Maps
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}

        {type === 'pharmacies' && (
          <div className="rounded-3xl bg-[#111827] border border-slate-800 p-8 text-center shadow-xl">
            <Pill className="mx-auto h-10 w-10 text-emerald-400" />
            <h2 className="mt-4 text-xl font-bold text-white">Search current pharmacy listings</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              MediTrust does not show live pharmacy inventory or process orders. Open Google Maps for current local pharmacies and contact them directly to confirm stock, hours, and prices.
            </p>
            <a
              href={getGoogleMapsSearchUrl(`pharmacies in ${cityName}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
            >
              Search pharmacies on Google Maps
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
