import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Stethoscope, Building2, Pill, ChevronRight, Compass } from 'lucide-react';
import { INDIA_LOCATION_HIERARCHY } from '../context/LocationContext';
import { SEO } from '../components/common/SEO';

export const LocationDirectoryPage: React.FC = () => {
  const locationKeywords = [
    'Doctors in Hyderabad',
    'Doctors in Tirupati',
    'Doctors in Kanigiri',
    'Pharmacies in Hyderabad',
    'Hospitals in Hyderabad',
    'Healthcare near me',
    'MediTrust Cities',
    'MediTrust Locations'
  ];

  const featuredCities = [
    { city: 'Hyderabad', state: 'Telangana', description: 'Find top cardiologists, neurologists, emergency hospitals, and 24h pharmacies in Hitec City, Banjara Hills, and Jubilee Hills.', doctorCount: 24, hospitalCount: 12, pharmacyCount: 38 },
    { city: 'Tirupati', state: 'Andhra Pradesh', description: 'Access trusted general physicians, multi-specialty clinics, and OPD queue tokens near Alipiri, MR Palli, and TUDA Layout.', doctorCount: 18, hospitalCount: 8, pharmacyCount: 22 },
    { city: 'Kanigiri', state: 'Andhra Pradesh', description: 'Local community clinics, pediatricians, diagnostic centers, and medicine delivery services in Kanigiri region.', doctorCount: 10, hospitalCount: 4, pharmacyCount: 15 },
    { city: 'Visakhapatnam', state: 'Andhra Pradesh', description: 'Premier medical centers, dermatologists, and diagnostic labs in MVP Colony, Siripuram, and Gajuwaka.', doctorCount: 16, hospitalCount: 9, pharmacyCount: 28 },
    { city: 'Vijayawada', state: 'Andhra Pradesh', description: 'Specialist doctors, cardiac care hospitals, and round-the-clock medical stores near Benz Circle and MG Road.', doctorCount: 15, hospitalCount: 7, pharmacyCount: 25 },
    { city: 'Bengaluru', state: 'Karnataka', description: 'Leading health-tech integrated hospitals, orthopedic specialists, and digital prescription pharmacies in Indiranagar and Koramangala.', doctorCount: 32, hospitalCount: 18, pharmacyCount: 45 }
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title="Find Doctors, Hospitals & Pharmacies by City | MediTrust Locations"
        description="Explore verified doctors, multi-specialty hospitals, and 24/7 pharmacies across Hyderabad, Tirupati, Kanigiri, Visakhapatnam, Vijayawada, Bengaluru, and major cities in India."
        keywords={locationKeywords}
        canonicalUrl="https://medynex.com/locations"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 font-mono bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> City Healthcare Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Find Healthcare Services in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Your City</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Browse verified doctors, hospitals, pharmacies, and diagnostic laboratories pre-sorted by location for fast appointments and OPD tokens.
          </p>
        </div>

        {/* Featured Cities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCities.map((item) => (
            <div key={item.city} className="rounded-3xl bg-[#111827] border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item.city}</h2>
                      <p className="text-xs text-slate-400 font-mono">{item.state}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-center">
                  <div className="bg-[#0B1120] p-2 rounded-xl border border-slate-800">
                    <Stethoscope className="w-3.5 h-3.5 text-cyan-400 mx-auto mb-0.5" />
                    <span className="text-xs font-bold text-white block">{item.doctorCount}+</span>
                    <span className="text-[10px] text-slate-400">Doctors</span>
                  </div>
                  <div className="bg-[#0B1120] p-2 rounded-xl border border-slate-800">
                    <Building2 className="w-3.5 h-3.5 text-blue-400 mx-auto mb-0.5" />
                    <span className="text-xs font-bold text-white block">{item.hospitalCount}+</span>
                    <span className="text-[10px] text-slate-400">Hospitals</span>
                  </div>
                  <div className="bg-[#0B1120] p-2 rounded-xl border border-slate-800">
                    <Pill className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-0.5" />
                    <span className="text-xs font-bold text-white block">{item.pharmacyCount}+</span>
                    <span className="text-[10px] text-slate-400">Pharmacies</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <Link
                  to={`/doctors/in/${item.city.toLowerCase()}`}
                  className="w-full flex items-center justify-between text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all"
                >
                  <span>Doctors in {item.city}</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </Link>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/hospitals/in/${item.city.toLowerCase()}`}
                    className="flex-1 text-center text-[11px] font-medium py-2 rounded-xl bg-slate-900/60 text-slate-400 hover:text-cyan-400 border border-slate-800/80 transition-all"
                  >
                    Hospitals
                  </Link>
                  <Link
                    to={`/pharmacies/in/${item.city.toLowerCase()}`}
                    className="flex-1 text-center text-[11px] font-medium py-2 rounded-xl bg-slate-900/60 text-slate-400 hover:text-emerald-400 border border-slate-800/80 transition-all"
                  >
                    Pharmacies
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Complete State & District Accordion List */}
        <div className="rounded-3xl bg-[#111827] border border-slate-800 p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" /> All Covered States & Districts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDIA_LOCATION_HIERARCHY.map((stateObj) => (
              <div key={stateObj.state} className="space-y-3 bg-[#0B1120] p-5 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-cyan-400 font-mono uppercase tracking-wider">{stateObj.state}</h4>
                <div className="space-y-2">
                  {stateObj.districts.map((d) => (
                    <div key={d.district} className="space-y-1">
                      <span className="text-xs font-semibold text-slate-300 block">{d.district} District</span>
                      <div className="flex flex-wrap gap-1.5">
                        {d.cities.map((c) => (
                          <Link
                            key={c.city}
                            to={`/doctors/in/${c.city.toLowerCase()}`}
                            className="text-[11px] bg-slate-900 px-2.5 py-1 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 border border-slate-800/80"
                          >
                            {c.city}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
