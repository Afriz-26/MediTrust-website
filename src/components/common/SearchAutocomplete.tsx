import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, Stethoscope, Pill, FlaskConical, ChevronRight, Sparkles, X } from 'lucide-react';
import { useHealthcare } from '../../context/HealthcareContext';
import { AUTHENTIC_MEDICINES } from '../../data/medicineCatalog';

export interface SuggestionItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'doctor' | 'hospital' | 'pharmacy' | 'lab' | 'specialty' | 'medicine';
  city?: string;
  price?: number | null;
}

interface SearchAutocompleteProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  filterType?: 'all' | 'doctor' | 'hospital' | 'pharmacy' | 'medicine' | 'lab';
  className?: string;
  onSelect?: (item: SuggestionItem) => void;
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  value = '',
  onChange,
  placeholder = "Search doctor, medicine, pharmacy, hospital...",
  filterType = 'all',
  className = "",
  onSelect
}) => {
  const navigate = useNavigate();
  const { allDoctors, hospitals, allPharmacies, laboratories } = useHealthcare();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'doctor' | 'medicine' | 'pharmacy' | 'hospital' | 'lab'>(filterType);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal filter if prop changes
  useEffect(() => {
    setActiveCategory(filterType);
  }, [filterType]);

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

  // Compute live suggestions with fast in-memory indexing
  const suggestions = useMemo((): SuggestionItem[] => {
    const rawQ = value.trim().toLowerCase();
    const cleanQ = rawQ.replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
    const compactQ = cleanQ.replace(/\s+/g, '');
    const effectiveFilter = activeCategory;

    // When empty, show top popular healthcare services
    if (!cleanQ) {
      if (effectiveFilter === 'medicine') {
        return [
          { id: 'quick-dolo', title: 'Dolo 650 Tablet', subtitle: 'Paracetamol 650mg • Analgesic & Fever', type: 'medicine' },
          { id: 'quick-pan-d', title: 'Pan-D Capsule', subtitle: 'Pantoprazole + Domperidone • Acidity & Gas', type: 'medicine' },
          { id: 'quick-montair', title: 'Montair-LC Tablet', subtitle: 'Montelukast + Levocetirizine • Cold & Allergy', type: 'medicine' },
          { id: 'quick-telma', title: 'Telma 40 Tablet', subtitle: 'Telmisartan 40mg • Blood Pressure', type: 'medicine' },
          { id: 'quick-glyco', title: 'Glycomet 500 Tablet', subtitle: 'Metformin 500mg • Diabetes Care', type: 'medicine' }
        ];
      }
      return [
        { id: 'quick-cardio', title: 'Cardiologist', subtitle: 'Heart specialists & ECG consultations', type: 'specialty' },
        { id: 'quick-dolo-med', title: 'Dolo 650 Tablet', subtitle: 'Paracetamol 650mg • Verified Pharmacy Stock', type: 'medicine' },
        { id: 'quick-pediatric', title: 'Pediatrician', subtitle: 'Child healthcare and immunizations', type: 'specialty' },
        { id: 'quick-pharmacy', title: '24/7 Verified Pharmacies', subtitle: 'Apollo, MedPlus & Jan Aushadhi Kendras', type: 'pharmacy' },
        { id: 'quick-ortho', title: 'Orthopedic Surgeon', subtitle: 'Bone, joint and robotic replacement specialists', type: 'specialty' },
        { id: 'quick-lab', title: 'Diagnostic Blood Tests', subtitle: 'CBC, Lipid, HbA1c with home collection', type: 'lab' }
      ];
    }

    const items: SuggestionItem[] = [];

    // 1. Medicines matching
    if (effectiveFilter === 'all' || effectiveFilter === 'medicine') {
      for (const med of AUTHENTIC_MEDICINES) {
        const nameClean = med.name.toLowerCase();
        const brandClean = med.brandName.toLowerCase();
        const genericClean = med.genericName.toLowerCase();
        const compactMed = (nameClean + brandClean + genericClean).replace(/\s+/g, '');

        if (
          brandClean.includes(cleanQ) ||
          nameClean.includes(cleanQ) ||
          genericClean.includes(cleanQ) ||
          compactMed.includes(compactQ) ||
          med.indications.some(i => i.toLowerCase().includes(cleanQ))
        ) {
          items.push({
            id: med.id,
            title: med.name,
            subtitle: `${med.genericName} • ${med.strength} (${med.manufacturer}) - ₹${med.sellingPrice || med.mrp}`,
            type: 'medicine',
            price: med.sellingPrice || med.mrp
          });
          if (items.length >= 8) break;
        }
      }
    }

    // 2. Doctors matching
    if (effectiveFilter === 'all' || effectiveFilter === 'doctor') {
      for (const doc of allDoctors) {
        if (
          (doc.name && doc.name.toLowerCase().includes(cleanQ)) ||
          (doc.specialty && doc.specialty.toLowerCase().includes(cleanQ)) ||
          (doc.hospitalName && doc.hospitalName.toLowerCase().includes(cleanQ)) ||
          (doc.clinicName && doc.clinicName.toLowerCase().includes(cleanQ)) ||
          (doc.city && doc.city.toLowerCase().includes(cleanQ))
        ) {
          items.push({
            id: doc.id,
            title: doc.name || 'Doctor',
            subtitle: `${doc.specialty || 'General'} • ${doc.hospitalName || doc.clinicName || 'Clinic'} (${doc.city || 'Tirupati'})`,
            type: 'doctor',
            city: doc.city
          });
          if (items.length >= 10) break;
        }
      }
    }

    // 3. Pharmacies matching
    if (effectiveFilter === 'all' || effectiveFilter === 'pharmacy') {
      for (const pharm of allPharmacies) {
        if (
          (pharm.name && pharm.name.toLowerCase().includes(cleanQ)) ||
          (pharm.address && pharm.address.toLowerCase().includes(cleanQ)) ||
          (pharm.city && pharm.city.toLowerCase().includes(cleanQ))
        ) {
          items.push({
            id: pharm.id,
            title: pharm.name || 'Pharmacy',
            subtitle: `${pharm.address || ''}, ${pharm.city || ''} ${pharm.open24x7 ? '• 24/7 Delivery' : ''}`,
            type: 'pharmacy',
            city: pharm.city
          });
          if (items.length >= 12) break;
        }
      }
    }

    // 4. Hospitals matching
    if (effectiveFilter === 'all' || effectiveFilter === 'hospital') {
      for (const hosp of hospitals) {
        if (
          (hosp.name && hosp.name.toLowerCase().includes(cleanQ)) ||
          (hosp.location && hosp.location.toLowerCase().includes(cleanQ)) ||
          (hosp.departments && hosp.departments.some(d => d && d.toLowerCase().includes(cleanQ)))
        ) {
          items.push({
            id: hosp.id,
            title: hosp.name || 'Hospital',
            subtitle: `${hosp.type || 'Medical Center'} • ${hosp.location || hosp.city || ''}`,
            type: 'hospital',
            city: hosp.city
          });
          if (items.length >= 14) break;
        }
      }
    }

    // 5. Laboratories matching
    if (effectiveFilter === 'all' || effectiveFilter === 'lab') {
      for (const lab of laboratories) {
        if (
          (lab.name && lab.name.toLowerCase().includes(cleanQ)) ||
          (lab.location && lab.location.toLowerCase().includes(cleanQ)) ||
          (lab.popularTests && lab.popularTests.some(t => t.name && t.name.toLowerCase().includes(cleanQ)))
        ) {
          items.push({
            id: lab.id,
            title: lab.name || 'Laboratory',
            subtitle: `Diagnostic Center • ${lab.location || lab.city || ''}`,
            type: 'lab',
            city: lab.city
          });
          if (items.length >= 16) break;
        }
      }
    }

    // 6. Specialties match
    if (effectiveFilter === 'all' || effectiveFilter === 'doctor') {
      const specialties = [
        'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 
        'Dermatology', 'General Surgery', 'Oncology', 'Gynecology', 
        'General Medicine', 'ENT', 'Ophthalmology', 'Psychiatry'
      ];
      for (const spec of specialties) {
        if (spec.toLowerCase().includes(cleanQ) && !items.some(s => s.title.toLowerCase() === spec.toLowerCase())) {
          items.push({
            id: `spec-${spec}`,
            title: spec,
            subtitle: `Medical Specialist Consultation`,
            type: 'specialty'
          });
        }
      }
    }

    return items.slice(0, 8);
  }, [value, activeCategory, allDoctors, hospitals, allPharmacies, laboratories]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSelectItem(suggestions[highlightedIndex]);
      } else if (value.trim()) {
        // Direct search
        triggerDefaultSearch(value.trim());
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const triggerDefaultSearch = (query: string) => {
    setIsOpen(false);
    if (activeCategory === 'medicine') {
      navigate(`/medicines?q=${encodeURIComponent(query)}`);
    } else if (activeCategory === 'pharmacy') {
      navigate(`/pharmacies?q=${encodeURIComponent(query)}`);
    } else if (activeCategory === 'hospital') {
      navigate(`/hospitals?q=${encodeURIComponent(query)}`);
    } else {
      navigate(`/doctors?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSelectItem = (item: SuggestionItem) => {
    onChange(item.title);
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (onSelect) {
      onSelect(item);
    } else {
      // Default smart navigation
      if (item.type === 'medicine') {
        navigate(`/medicines?q=${encodeURIComponent(item.title)}`);
      } else if (item.type === 'doctor') {
        navigate(`/doctors?q=${encodeURIComponent(item.title)}`);
      } else if (item.type === 'pharmacy') {
        navigate(`/pharmacies?q=${encodeURIComponent(item.title)}`);
      } else if (item.type === 'hospital') {
        navigate(`/hospitals?q=${encodeURIComponent(item.title)}`);
      } else if (item.type === 'specialty') {
        navigate(`/doctors?specialty=${encodeURIComponent(item.title)}`);
      } else if (item.type === 'lab') {
        navigate(`/labs`);
      }
    }
  };

  const getIcon = (type: SuggestionItem['type']) => {
    switch (type) {
      case 'doctor': return <Stethoscope className="w-4 h-4 text-emerald-600" />;
      case 'medicine': return <Pill className="w-4 h-4 text-emerald-700" />;
      case 'hospital': return <Building2 className="w-4 h-4 text-teal-600" />;
      case 'pharmacy': return <Pill className="w-4 h-4 text-amber-500" />;
      case 'lab': return <FlaskConical className="w-4 h-4 text-purple-500" />;
      case 'specialty': return <Sparkles className="w-4 h-4 text-cyan-600" />;
    }
  };

  const getTypeBadge = (type: SuggestionItem['type']) => {
    switch (type) {
      case 'doctor': return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">Doctor</span>;
      case 'medicine': return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-300 font-bold">Medicine</span>;
      case 'hospital': return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-semibold">Hospital</span>;
      case 'pharmacy': return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">Pharmacy</span>;
      case 'lab': return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">Lab</span>;
      case 'specialty': return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold">Specialty</span>;
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all shadow-sm"
        />

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in duration-100">
          
          {/* Fast Category Filter Chips */}
          <div className="p-2 bg-slate-50 flex items-center gap-1.5 overflow-x-auto text-xs">
            {(['all', 'doctor', 'medicine', 'pharmacy', 'hospital', 'lab'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setHighlightedIndex(-1);
                }}
                className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-all shrink-0 capitalize ${
                  activeCategory === cat
                    ? 'bg-emerald-700 text-white shadow-xs font-bold'
                    : 'bg-white hover:bg-slate-200/80 text-slate-600 border border-slate-200/80'
                }`}
              >
                {cat === 'all' ? 'All Results' : `${cat}s`}
              </button>
            ))}
          </div>

          {/* Quick Header */}
          <div className="px-3.5 py-1.5 bg-slate-50/70 text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>{value ? 'Fast Live Matches' : 'Popular Healthcare Services'}</span>
            <span className="text-emerald-700 font-bold">{suggestions.length} items</span>
          </div>

          {/* Suggestion List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
            {suggestions.map((item, idx) => {
              const isHighlighted = idx === highlightedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full p-3 text-left transition-colors flex items-center justify-between group ${
                    isHighlighted ? 'bg-emerald-50/90' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className={`p-2 rounded-xl border shrink-0 transition-colors ${
                      isHighlighted 
                        ? 'bg-emerald-100 border-emerald-300' 
                        : 'bg-slate-100 border-slate-200 group-hover:border-emerald-300'
                    }`}>
                      {getIcon(item.type)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 truncate transition-colors flex items-center space-x-2">
                        <span>{item.title}</span>
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    {getTypeBadge(item.type)}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Hint */}
          <div className="px-3.5 py-2 bg-slate-50 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Use ↑↓ arrows to navigate, Enter to select</span>
            <span className="font-mono text-emerald-700 font-semibold">MediTrust Fast Search</span>
          </div>
        </div>
      )}
    </div>
  );
};
