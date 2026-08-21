import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  AlertTriangle, 
  Scissors, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Download, 
  X, 
  Sparkles,
  Info,
  Clock,
  Activity,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface ChronicCondition {
  id: string;
  name: string;
  diagnosedYear: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  status: 'Active' | 'Managed' | 'In Remission';
  treatingDoctor?: string;
  medications?: string;
  notes?: string;
}

export interface PastSurgery {
  id: string;
  procedureName: string;
  dateOrYear: string;
  hospital: string;
  surgeon?: string;
  notes?: string;
}

export interface KnownAllergy {
  id: string;
  allergen: string;
  category: 'Medication' | 'Food' | 'Environmental' | 'Contact / Latex';
  severity: 'Mild' | 'Moderate' | 'Severe (Anaphylaxis Risk)';
  symptoms: string;
  emergencyAction?: string;
}

export interface PatientMedicalHistoryData {
  chronicConditions: ChronicCondition[];
  pastSurgeries: PastSurgery[];
  allergies: KnownAllergy[];
  bloodGroup: string;
  emergencyContact: string;
  lastUpdated: string;
}

const DEFAULT_HISTORY: PatientMedicalHistoryData = {
  bloodGroup: 'B Positive (B+)',
  emergencyContact: '+91 98765 99999 (Ramesh Varma - Father)',
  lastUpdated: new Date().toISOString().split('T')[0],
  chronicConditions: [
    {
      id: 'cond-1',
      name: 'Essential Hypertension (High Blood Pressure)',
      diagnosedYear: '2023',
      severity: 'Moderate',
      status: 'Managed',
      treatingDoctor: 'Dr. Suresh Babu (SVIMS Tirupati)',
      medications: 'Telmisartan 40mg (1 OD morning)',
      notes: 'Blood pressure checked bi-weekly; well controlled within 125/82 mmHg.'
    },
    {
      id: 'cond-2',
      name: 'Mild Allergic Bronchial Asthma',
      diagnosedYear: '2021',
      severity: 'Mild',
      status: 'Managed',
      treatingDoctor: 'Dr. K. Radhika Rao',
      medications: 'Budecort Inhaler 200mcg (As needed during season change)',
      notes: 'Seasonal flare-ups triggered by winter pollen and cold air.'
    }
  ],
  pastSurgeries: [
    {
      id: 'surg-1',
      procedureName: 'Laparoscopic Appendectomy',
      dateOrYear: 'August 2022',
      hospital: 'Apollo Speciality Hospital, Tirupati',
      surgeon: 'Dr. S. Kanth, MS (General Surgery)',
      notes: 'Uncomplicated recovery, 3 small laparoscopic incisions healed cleanly with no residual pain.'
    }
  ],
  allergies: [
    {
      id: 'alg-1',
      allergen: 'Penicillin & Amoxicillin Derivatives',
      category: 'Medication',
      severity: 'Severe (Anaphylaxis Risk)',
      symptoms: 'Urticaria (hives), facial swelling, and bronchospasm within 30 mins.',
      emergencyAction: 'High Alert: Avoid all beta-lactam antibiotics. Administer antihistamines/epinephrine if exposed.'
    },
    {
      id: 'alg-2',
      allergen: 'Peanuts / Tree Nuts',
      category: 'Food',
      severity: 'Moderate',
      symptoms: 'Oral pruritus (mouth itchiness), lip edema, and mild stomach cramps.',
      emergencyAction: 'Avoid cross-contaminated bakery products. Take Cetirizine 10mg if accidentally ingested.'
    }
  ]
};

export const MedicalHistory: React.FC = () => {
  const { user } = useAuth();
  const storageKey = `meditrust_medical_history_${user?.id || 'demo_patient'}`;

  const [history, setHistory] = useState<PatientMedicalHistoryData>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read medical history from storage:', e);
    }
    return DEFAULT_HISTORY;
  });

  const [activeTab, setActiveTab] = useState<'conditions' | 'surgeries' | 'allergies'>('conditions');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'condition' | 'surgery' | 'allergy'>('condition');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields - Condition
  const [condName, setCondName] = useState('');
  const [condYear, setCondYear] = useState('');
  const [condSeverity, setCondSeverity] = useState<'Mild' | 'Moderate' | 'Severe' | 'Critical'>('Moderate');
  const [condStatus, setCondStatus] = useState<'Active' | 'Managed' | 'In Remission'>('Managed');
  const [condDoctor, setCondDoctor] = useState('');
  const [condMedications, setCondMedications] = useState('');
  const [condNotes, setCondNotes] = useState('');

  // Form Fields - Surgery
  const [surgName, setSurgName] = useState('');
  const [surgDate, setSurgDate] = useState('');
  const [surgHospital, setSurgHospital] = useState('');
  const [surgSurgeon, setSurgSurgeon] = useState('');
  const [surgNotes, setSurgNotes] = useState('');

  // Form Fields - Allergy
  const [algAllergen, setAlgAllergen] = useState('');
  const [algCategory, setAlgCategory] = useState<'Medication' | 'Food' | 'Environmental' | 'Contact / Latex'>('Medication');
  const [algSeverity, setAlgSeverity] = useState<'Mild' | 'Moderate' | 'Severe (Anaphylaxis Risk)'>('Moderate');
  const [algSymptoms, setAlgSymptoms] = useState('');
  const [algEmergency, setAlgEmergency] = useState('');

  // Save to localStorage
  const saveHistory = (newHistory: PatientMedicalHistoryData, msg: string) => {
    setHistory(newHistory);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newHistory));
    } catch (e) {
      console.warn('Failed to persist history to localStorage:', e);
    }
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Open Create Modal
  const openCreateModal = (type: 'condition' | 'surgery' | 'allergy') => {
    setModalType(type);
    setEditingId(null);

    // Reset fields
    setCondName('');
    setCondYear(new Date().getFullYear().toString());
    setCondSeverity('Moderate');
    setCondStatus('Managed');
    setCondDoctor('');
    setCondMedications('');
    setCondNotes('');

    setSurgName('');
    setSurgDate(new Date().getFullYear().toString());
    setSurgHospital('');
    setSurgSurgeon('');
    setSurgNotes('');

    setAlgAllergen('');
    setAlgCategory('Medication');
    setAlgSeverity('Moderate');
    setAlgSymptoms('');
    setAlgEmergency('');

    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (type: 'condition' | 'surgery' | 'allergy', item: any) => {
    setModalType(type);
    setEditingId(item.id);

    if (type === 'condition') {
      const c = item as ChronicCondition;
      setCondName(c.name);
      setCondYear(c.diagnosedYear);
      setCondSeverity(c.severity);
      setCondStatus(c.status);
      setCondDoctor(c.treatingDoctor || '');
      setCondMedications(c.medications || '');
      setCondNotes(c.notes || '');
    } else if (type === 'surgery') {
      const s = item as PastSurgery;
      setSurgName(s.procedureName);
      setSurgDate(s.dateOrYear);
      setSurgHospital(s.hospital);
      setSurgSurgeon(s.surgeon || '');
      setSurgNotes(s.notes || '');
    } else {
      const a = item as KnownAllergy;
      setAlgAllergen(a.allergen);
      setAlgCategory(a.category);
      setAlgSeverity(a.severity);
      setAlgSymptoms(a.symptoms);
      setAlgEmergency(a.emergencyAction || '');
    }

    setIsModalOpen(true);
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nowIsoDate = new Date().toISOString().split('T')[0];

    if (modalType === 'condition') {
      if (!condName.trim()) return;
      const updatedConditions = [...history.chronicConditions];

      if (editingId) {
        const idx = updatedConditions.findIndex(c => c.id === editingId);
        if (idx !== -1) {
          updatedConditions[idx] = {
            id: editingId,
            name: condName.trim(),
            diagnosedYear: condYear.trim(),
            severity: condSeverity,
            status: condStatus,
            treatingDoctor: condDoctor.trim() || undefined,
            medications: condMedications.trim() || undefined,
            notes: condNotes.trim() || undefined
          };
        }
      } else {
        updatedConditions.unshift({
          id: `cond-${Date.now()}`,
          name: condName.trim(),
          diagnosedYear: condYear.trim(),
          severity: condSeverity,
          status: condStatus,
          treatingDoctor: condDoctor.trim() || undefined,
          medications: condMedications.trim() || undefined,
          notes: condNotes.trim() || undefined
        });
      }

      saveHistory({
        ...history,
        chronicConditions: updatedConditions,
        lastUpdated: nowIsoDate
      }, editingId ? 'Condition updated successfully' : 'New chronic condition logged');

    } else if (modalType === 'surgery') {
      if (!surgName.trim()) return;
      const updatedSurgeries = [...history.pastSurgeries];

      if (editingId) {
        const idx = updatedSurgeries.findIndex(s => s.id === editingId);
        if (idx !== -1) {
          updatedSurgeries[idx] = {
            id: editingId,
            procedureName: surgName.trim(),
            dateOrYear: surgDate.trim(),
            hospital: surgHospital.trim(),
            surgeon: surgSurgeon.trim() || undefined,
            notes: surgNotes.trim() || undefined
          };
        }
      } else {
        updatedSurgeries.unshift({
          id: `surg-${Date.now()}`,
          procedureName: surgName.trim(),
          dateOrYear: surgDate.trim(),
          hospital: surgHospital.trim(),
          surgeon: surgSurgeon.trim() || undefined,
          notes: surgNotes.trim() || undefined
        });
      }

      saveHistory({
        ...history,
        pastSurgeries: updatedSurgeries,
        lastUpdated: nowIsoDate
      }, editingId ? 'Surgery record updated successfully' : 'New surgery record logged');

    } else if (modalType === 'allergy') {
      if (!algAllergen.trim()) return;
      const updatedAllergies = [...history.allergies];

      if (editingId) {
        const idx = updatedAllergies.findIndex(a => a.id === editingId);
        if (idx !== -1) {
          updatedAllergies[idx] = {
            id: editingId,
            allergen: algAllergen.trim(),
            category: algCategory,
            severity: algSeverity,
            symptoms: algSymptoms.trim(),
            emergencyAction: algEmergency.trim() || undefined
          };
        }
      } else {
        updatedAllergies.unshift({
          id: `alg-${Date.now()}`,
          allergen: algAllergen.trim(),
          category: algCategory,
          severity: algSeverity,
          symptoms: algSymptoms.trim(),
          emergencyAction: algEmergency.trim() || undefined
        });
      }

      saveHistory({
        ...history,
        allergies: updatedAllergies,
        lastUpdated: nowIsoDate
      }, editingId ? 'Allergy record updated successfully' : 'New allergy alert added');
    }

    setIsModalOpen(false);
  };

  // Delete Handlers
  const deleteCondition = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove condition "${name}" from your medical history?`)) {
      const updated = history.chronicConditions.filter(c => c.id !== id);
      saveHistory({ ...history, chronicConditions: updated }, `Removed "${name}"`);
    }
  };

  const deleteSurgery = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove surgery "${name}" from your records?`)) {
      const updated = history.pastSurgeries.filter(s => s.id !== id);
      saveHistory({ ...history, pastSurgeries: updated }, `Removed "${name}"`);
    }
  };

  const deleteAllergy = (id: string, allergen: string) => {
    if (window.confirm(`Are you sure you want to remove allergy "${allergen}"?`)) {
      const updated = history.allergies.filter(a => a.id !== id);
      saveHistory({ ...history, allergies: updated }, `Removed "${allergen}" alert`);
    }
  };

  // Export summary
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `MediTrust_Medical_History_${user?.name?.replace(/\s+/g, '_') || 'Patient'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-blue-500/30 space-y-6 shadow-xl" id="patient-medical-history-vault">
      
      {/* Header & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ABHA Compliant Digital Health Locker</span>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <span>Personal Medical History Vault</span>
          </h2>
          <p className="text-xs text-slate-400">
            Securely record and manage your chronic conditions, surgical history, and allergy alerts for instant doctor review.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExport}
            id="btn-export-medical-history"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Download Encrypted JSON Health Record"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export Record</span>
          </button>

          <button
            onClick={() => {
              if (activeTab === 'conditions') openCreateModal('condition');
              else if (activeTab === 'surgeries') openCreateModal('surgery');
              else openCreateModal('allergy');
            }}
            id="btn-add-medical-record"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>
              {activeTab === 'conditions' ? 'Add Condition' : activeTab === 'surgeries' ? 'Add Surgery' : 'Add Allergy'}
            </span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Vital Highlights Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0B1120] border border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Blood Group</div>
            <div className="font-bold text-white">{history.bloodGroup}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Active Allergy Alerts</div>
            <div className="font-bold text-amber-300">{history.allergies.length} High Alert Items</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Vault Last Synchronized</div>
            <div className="font-bold text-cyan-300">{history.lastUpdated}</div>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0B1120] border border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('conditions')}
          id="tab-chronic-conditions"
          className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'conditions'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Chronic Conditions ({history.chronicConditions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('surgeries')}
          id="tab-past-surgeries"
          className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'surgeries'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>Past Surgeries ({history.pastSurgeries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('allergies')}
          id="tab-known-allergies"
          className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'allergies'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Known Allergies ({history.allergies.length})</span>
        </button>
      </div>

      {/* TAB CONTENT 1: CHRONIC CONDITIONS */}
      {activeTab === 'conditions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Ongoing & Monitored Conditions</span>
            </h3>
            <button
              onClick={() => openCreateModal('condition')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Condition</span>
            </button>
          </div>

          {history.chronicConditions.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#0B1120] border border-slate-800 text-slate-400 text-xs space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="font-semibold text-white">No Chronic Conditions Logged</p>
              <p>You have no chronic medical conditions recorded on file.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.chronicConditions.map((cond) => (
                <div
                  key={cond.id}
                  className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800 hover:border-blue-500/40 transition-all space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">Diagnosed in {cond.diagnosedYear}</span>
                      <h4 className="text-sm font-bold text-white leading-snug mt-0.5">{cond.name}</h4>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        cond.severity === 'Severe' || cond.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : cond.severity === 'Moderate'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {cond.severity}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        {cond.status}
                      </span>
                    </div>
                  </div>

                  {cond.medications && (
                    <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800/80 text-xs">
                      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">Medication / Treatment:</div>
                      <div className="text-slate-200 mt-0.5">{cond.medications}</div>
                    </div>
                  )}

                  {cond.treatingDoctor && (
                    <div className="text-[11px] text-slate-400">
                      <strong>Physician:</strong> {cond.treatingDoctor}
                    </div>
                  )}

                  {cond.notes && (
                    <p className="text-xs text-slate-400 leading-relaxed italic border-t border-slate-800/60 pt-2">
                      &ldquo;{cond.notes}&rdquo;
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => openEditModal('condition', cond)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold inline-flex items-center gap-1"
                      title="Edit condition"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Edit</span>
                    </button>
                    <button
                      onClick={() => deleteCondition(cond.id, cond.name)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold inline-flex items-center gap-1"
                      title="Remove condition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: PAST SURGERIES */}
      {activeTab === 'surgeries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Surgical & Major Medical Procedures</span>
            </h3>
            <button
              onClick={() => openCreateModal('surgery')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Surgery Record</span>
            </button>
          </div>

          {history.pastSurgeries.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#0B1120] border border-slate-800 text-slate-400 text-xs space-y-2">
              <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto" />
              <p className="font-semibold text-white">No Past Surgeries Logged</p>
              <p>No surgical procedures or operations are listed in your history.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.pastSurgeries.map((surg) => (
                <div
                  key={surg.id}
                  className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">{surg.dateOrYear}</span>
                      <h4 className="text-sm font-bold text-white leading-snug mt-0.5">{surg.procedureName}</h4>
                    </div>
                    <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Scissors className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#111827] text-xs space-y-1 text-slate-300">
                    <div><strong>Hospital / Center:</strong> {surg.hospital}</div>
                    {surg.surgeon && <div><strong>Surgeon:</strong> {surg.surgeon}</div>}
                  </div>

                  {surg.notes && (
                    <p className="text-xs text-slate-400 leading-relaxed italic border-t border-slate-800/60 pt-2">
                      &ldquo;{surg.notes}&rdquo;
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => openEditModal('surgery', surg)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Edit</span>
                    </button>
                    <button
                      onClick={() => deleteSurgery(surg.id, surg.procedureName)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 3: ALLERGIES */}
      {activeTab === 'allergies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Known Allergies & High-Risk Adverse Reactions</span>
            </h3>
            <button
              onClick={() => openCreateModal('allergy')}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Allergy Alert</span>
            </button>
          </div>

          {history.allergies.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#0B1120] border border-slate-800 text-slate-400 text-xs space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="font-semibold text-white">No Known Drug or Food Allergies</p>
              <p>Add allergies to alert doctors and pharmacists automatically during consultations and e-prescriptions.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.allergies.map((alg) => (
                <div
                  key={alg.id}
                  className="p-4 rounded-2xl bg-[#0B1120] border border-rose-500/30 hover:border-rose-500/60 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">{alg.category} Allergy</span>
                      <h4 className="text-sm font-bold text-white leading-snug mt-0.5">{alg.allergen}</h4>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      alg.severity.includes('Severe')
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                        : alg.severity === 'Moderate'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {alg.severity}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#111827] text-xs space-y-1 text-slate-200 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Observed Reactions:</div>
                    <div className="text-slate-300">{alg.symptoms}</div>
                  </div>

                  {alg.emergencyAction && (
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-mono text-[10px] uppercase">Clinical Action Rule:</strong>
                        <span>{alg.emergencyAction}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => openEditModal('allergy', alg)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Edit</span>
                    </button>
                    <button
                      onClick={() => deleteAllergy(alg.id, alg.allergen)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT MEDICAL HISTORY RECORD */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#111827] border border-slate-700 rounded-3xl p-6 space-y-5 shadow-2xl animate-scaleIn my-8">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${
                  modalType === 'condition' ? 'bg-blue-500/20 text-blue-400' :
                  modalType === 'surgery' ? 'bg-cyan-500/20 text-cyan-400' :
                  'bg-rose-500/20 text-rose-400'
                }`}>
                  {modalType === 'condition' ? <Activity className="w-5 h-5" /> :
                   modalType === 'surgery' ? <Scissors className="w-5 h-5" /> :
                   <AlertTriangle className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingId ? 'Edit' : 'Add New'} {
                      modalType === 'condition' ? 'Chronic Condition' :
                      modalType === 'surgery' ? 'Past Surgery' :
                      'Known Allergy'
                    }
                  </h3>
                  <p className="text-xs text-slate-400">Synchronized into your personal health record</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* CHRONIC CONDITION FIELDS */}
              {modalType === 'condition' && (
                <>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Condition Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Type 2 Diabetes, Hypertension, Asthma"
                      value={condName}
                      onChange={(e) => setCondName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Diagnosed Year *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2022"
                        value={condYear}
                        onChange={(e) => setCondYear(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Severity</label>
                      <select
                        value={condSeverity}
                        onChange={(e) => setCondSeverity(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Status</label>
                      <select
                        value={condStatus}
                        onChange={(e) => setCondStatus(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Managed">Managed</option>
                        <option value="In Remission">In Remission</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Current Medications / Daily Dosage</label>
                    <input
                      type="text"
                      placeholder="e.g. Metformin 500mg (1 BD after meals)"
                      value={condMedications}
                      onChange={(e) => setCondMedications(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Treating Physician / Clinic (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Suresh Babu, SVIMS Hospital"
                      value={condDoctor}
                      onChange={(e) => setCondDoctor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Clinical Notes & Observations</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Fasting sugar maintained under 110 mg/dL with dietary restriction."
                      value={condNotes}
                      onChange={(e) => setCondNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              {/* PAST SURGERY FIELDS */}
              {modalType === 'surgery' && (
                <>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Surgical Procedure Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Total Knee Replacement, Appendectomy, Cataract"
                      value={surgName}
                      onChange={(e) => setSurgName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Date / Year of Surgery *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. March 2023 or 2023"
                        value={surgDate}
                        onChange={(e) => setSurgDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Hospital / Surgical Center *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apollo Hospital, Tirupati"
                        value={surgHospital}
                        onChange={(e) => setSurgHospital(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Operating Surgeon (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Ramesh Kumar Reddy, MS Ortho"
                      value={surgSurgeon}
                      onChange={(e) => setSurgSurgeon(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Post-Operative Recovery / Implant Notes</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Titanium implant in left knee, full weight-bearing achieved after 6 weeks."
                      value={surgNotes}
                      onChange={(e) => setSurgNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </>
              )}

              {/* KNOWN ALLERGY FIELDS */}
              {modalType === 'allergy' && (
                <>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Allergen (Drug, Food, or Substance) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Penicillin, Sulfa Drugs, Peanuts, Latex"
                      value={algAllergen}
                      onChange={(e) => setAlgAllergen(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Allergy Category</label>
                      <select
                        value={algCategory}
                        onChange={(e) => setAlgCategory(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                      >
                        <option value="Medication">Medication / Drug</option>
                        <option value="Food">Food / Nutritional</option>
                        <option value="Environmental">Environmental (Dust/Pollen)</option>
                        <option value="Contact / Latex">Contact / Latex / Chemical</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Severity</label>
                      <select
                        value={algSeverity}
                        onChange={(e) => setAlgSeverity(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                      >
                        <option value="Mild">Mild (Rash / Itching)</option>
                        <option value="Moderate">Moderate (Swelling / Hives)</option>
                        <option value="Severe (Anaphylaxis Risk)">Severe (Anaphylaxis / Breathing Risk)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Symptoms & Reactions *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Skin rash, facial hives, wheezing, throat swelling"
                      value={algSymptoms}
                      onChange={(e) => setAlgSymptoms(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Emergency Action / Clinical Warning</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. DO NOT administer penicillin or amoxicillin. Use macrolides (Azithromycin) instead."
                      value={algEmergency}
                      onChange={(e) => setAlgEmergency(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md shadow-blue-600/30"
                >
                  {editingId ? 'Save Changes' : 'Save to Vault'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
