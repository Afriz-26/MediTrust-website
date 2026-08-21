import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, Stethoscope, Building2, Ticket, ShieldCheck, Zap, MapPin, ArrowRight } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';

const INDIAN_CITIES = [
  { name: 'Hyderabad', state: 'Telangana', count: '450+ Doctors' },
  { name: 'Bengaluru', state: 'Karnataka', count: '620+ Doctors' },
  { name: 'Chennai', state: 'Tamil Nadu', count: '380+ Doctors' },
  { name: 'Mumbai', state: 'Maharashtra', count: '510+ Doctors' },
  { name: 'Delhi NCR', state: 'Delhi', count: '590+ Doctors' },
  { name: 'Tirupati', state: 'Andhra Pradesh', count: '140+ Doctors' },
  { name: 'Kanigiri', state: 'Andhra Pradesh', count: '45+ Doctors' },
  { name: 'Pune', state: 'Maharashtra', count: '290+ Doctors' },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', count: '180+ Doctors' },
];

const STATS = [
  { label: 'Registered Patients', value: '50,000+', icon: Users, change: 'Pan-India Active', color: 'from-blue-600 to-indigo-600', iconColor: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Verified Indian Doctors', value: '1,200+', icon: Stethoscope, change: '15+ Specialties', color: 'from-blue-500 to-cyan-500', iconColor: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Partner Pharmacies', value: '850+', icon: Building2, change: 'Apollo, MedPlus & Local', color: 'from-emerald-500 to-teal-500', iconColor: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'OPD Queue Tokens', value: '2.5M+', icon: Ticket, change: '65% Less Wait Time', color: 'from-amber-500 to-orange-500', iconColor: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Verified Prescriptions', value: '1.8M+', icon: ShieldCheck, change: 'QR Cryptographic', color: 'from-purple-500 to-indigo-500', iconColor: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'On-Time Accuracy', value: '98.4%', icon: Zap, change: 'AI Queue Sync', color: 'from-rose-500 to-pink-500', iconColor: 'text-rose-600', bg: 'bg-rose-50' },
];

export const StatsSection: React.FC = () => {
  const { location, setLocation } = useLocation();

  return (
    <section className="py-14 bg-[#F8FAFC] border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Location-First Healthcare Discovery Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-xs mb-2">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>India-Wide Healthcare Discovery</span>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Find Doctors, OPD Queues & Pharmacies Near You
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Select your city to view verified clinics, live queue token countdowns, and licensed pharmacies with home delivery.
              </p>
            </div>

            <Link
              to="/doctors"
              id="btn-stats-all-cities"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition-all shrink-0 self-start md:self-auto"
            >
              <span>Explore All Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Indian Cities Grid Pills */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {INDIAN_CITIES.map((city, idx) => (
              <Link
                key={idx}
                to="/doctors"
                onClick={() => setLocation({
                  ...location,
                  country: 'India',
                  city: city.name,
                  state: city.state,
                  mode: 'manual'
                })}
                className="group px-4 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">{city.name}</span>
                <span className="text-[10px] text-slate-500 group-hover:text-blue-600 font-medium">({city.count})</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Real-Time Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 transition-all duration-300 group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] font-mono text-emerald-600 font-semibold mt-1">
                  {stat.change}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
