import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Building2, Stethoscope, Pill, FlaskConical, ChevronRight, Sparkles } from 'lucide-react';
import { useHealthcare } from '../../context/HealthcareContext';
import { useLocation } from '../../context/LocationContext';

interface SuggestionItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'doctor' | 'hospital' | 'pharmacy' | 'lab' | 'specialty';
  city?: string;
}

interface SearchAutocompleteProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  filterType?: 'all' | 'doctor' | 'hospital' | 'pharmacy' | 'lab';
  className?: string;
  onSelect?: (item: SuggestionItem) => void;
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Search doctor, hospital, pharmacy, specialty...",
  filterType = 'all',
  className = "",
  onSelect
}) => {
  const { allDoctors, hospitals, allPharmacies, laboratories } = useHealthcare();
  const { location } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live suggestions
  const getSuggestions = (): SuggestionItem[] => {
    const query = value.trim().toLowerCase();
    if (!query) return [];

    const suggestions: SuggestionItem[] = [];

    // 1. Doctors
    if (filterType === 'all' || filterType === 'doctor') {
      allDoctors.forEach(doc => {
        if (
          (doc.name && doc.name.toLowerCase().includes(query)) ||
          (doc.specialty && doc.specialty.toLowerCase().includes(query)) ||
          (doc.hospitalName && doc.hospitalName.toLowerCase().includes(query)) ||
          (doc.city && doc.city.toLowerCase().includes(query))
        ) {
          suggestions.push({
            id: doc.id,
            title: doc.name || 'Doctor',
            subtitle: `${doc.specialty || 'General'} • ${doc.hospitalName || doc.clinicName || ''} (${doc.city || 'AP'})`,
            type: 'doctor',
            city: doc.city
          });
        }
      });
    }

    // 2. Hospitals
    if (filterType === 'all' || filterType === 'hospital') {
      hospitals.forEach(hosp => {
        if (
          (hosp.name && hosp.name.toLowerCase().includes(query)) ||
          (hosp.location && hosp.location.toLowerCase().includes(query)) ||
          (hosp.departments && hosp.departments.some(d => d && d.toLowerCase().includes(query)))
        ) {
          suggestions.push({
            id: hosp.id,
            title: hosp.name || 'Hospital',
            subtitle: `${hosp.type || 'Medical Center'} • ${hosp.location || ''}`,
            type: 'hospital',
            city: hosp.city
          });
        }
      });
    }

    // 3. Pharmacies
    if (filterType === 'all' || filterType === 'pharmacy') {
      allPharmacies.forEach(pharm => {
        if (
          (pharm.name && pharm.name.toLowerCase().includes(query)) ||
          (pharm.address && pharm.address.toLowerCase().includes(query)) ||
          (pharm.city && pharm.city.toLowerCase().includes(query))
        ) {
          suggestions.push({
            id: pharm.id,
            title: pharm.name || 'Pharmacy',
            subtitle: `${pharm.address || ''}, ${pharm.city || ''}`,
            type: 'pharmacy',
            city: pharm.city
          });
        }
      });
    }

    // 4. Laboratories
    if (filterType === 'all' || filterType === 'lab') {
      laboratories.forEach(lab => {
        if (
          (lab.name && lab.name.toLowerCase().includes(query)) ||
          (lab.location && lab.location.toLowerCase().includes(query)) ||
          (lab.popularTests && lab.popularTests.some(t => t.name && t.name.toLowerCase().includes(query)))
        ) {
          suggestions.push({
            id: lab.id,
            title: lab.name || 'Laboratory',
            subtitle: `Diagnostic Center • ${lab.location || ''}`,
            type: 'lab',
            city: lab.city
          });
        }
      });
    }

    // Specialties match
    const specialties = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'General Surgery', 'Oncology', 'Gynecology', 'General Medicine'];
    specialties.forEach(spec => {
      if (spec.toLowerCase().includes(query) && !suggestions.some(s => s.title === spec)) {
        suggestions.push({
          id: `spec-${spec}`,
          title: spec,
          subtitle: `Medical Specialty Specialist`,
          type: 'specialty'
        });
      }
    });

    return suggestions.slice(0, 8);
  };

  const suggestions = getSuggestions();

  const getIcon = (type: SuggestionItem['type']) => {
    switch (type) {
      case 'doctor': return <Stethoscope className="w-4 h-4 text-cyan-400" />;
      case 'hospital': return <Building2 className="w-4 h-4 text-emerald-400" />;
      case 'pharmacy': return <Pill className="w-4 h-4 text-amber-400" />;
      case 'lab': return <FlaskConical className="w-4 h-4 text-purple-400" />;
      case 'specialty': return <Sparkles className="w-4 h-4 text-cyan-300" />;
    }
  };

  const getTypeBadge = (type: SuggestionItem['type']) => {
    switch (type) {
      case 'doctor': return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">Doctor</span>;
      case 'hospital': return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">Hospital</span>;
      case 'pharmacy': return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">Pharmacy</span>;
      case 'lab': return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">Lab</span>;
      case 'specialty': return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Specialty</span>;
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 z-10" />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#111827] border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-80 overflow-y-auto divide-y divide-slate-800/80 animate-in fade-in duration-150">
          <div className="px-3 py-1.5 bg-[#0B1120] text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Google Maps Live Suggestions</span>
            <span className="text-cyan-400 font-bold">{suggestions.length} Matches</span>
          </div>

          {suggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onChange(item.title);
                setIsOpen(false);
                if (onSelect) onSelect(item);
              }}
              className="w-full p-3 text-left hover:bg-slate-800/70 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0 group-hover:border-cyan-500/50 transition-colors">
                  {getIcon(item.type)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300 truncate transition-colors flex items-center space-x-2">
                    <span>{item.title}</span>
                  </div>
                  <div className="text-xs text-slate-400 truncate mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0 ml-3">
                {getTypeBadge(item.type)}
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
