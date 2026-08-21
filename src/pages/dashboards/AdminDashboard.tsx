import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';
import { 
  ShieldCheck, 
  Activity, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  BarChart3, 
  Building2, 
  Stethoscope, 
  Pill, 
  TestTube, 
  ArrowUpRight, 
  Check, 
  X, 
  UserX, 
  UserCheck, 
  Trash2, 
  Database, 
  DollarSign, 
  MapPin, 
  Flame, 
  ChevronRight, 
  Filter, 
  PhoneCall, 
  Calendar, 
  Handshake, 
  CheckSquare, 
  XCircle, 
  Search,
  KeyRound,
  UserPlus,
  Lock,
  Copy,
  Clock,
  Mail,
  Phone,
  Layers,
  FileCheck,
  AlertTriangle,
  Send,
  Ticket
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { AdminRoleScope, AdminCollaborator } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    user, 
    adminCollaborators, 
    isMasterAdminConfigured, 
    addAdminCollaborator, 
    updateAdminCollaboratorStatus, 
    removeAdminCollaborator 
  } = useAuth();

  const { 
    allDoctors, allPharmacies, hospitals, laboratories, 
    providerRequests, appointments, pharmacyOrders, allUsers,
    subscriptions, adBoosters,
    approveDoctor, rejectDoctor, approvePharmacy, rejectPharmacy,
    updateUserStatus, deleteUser, updateAppointmentStatus, updatePharmacyOrderStatus, refreshData
  } = useHealthcare();

  const [activeTab, setActiveTab] = useState<'bookings' | 'requests' | 'team' | 'pending' | 'heatmap' | 'users' | 'analytics'>('bookings');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [requestStatuses, setRequestStatuses] = useState<Record<string, string>>({});
  const [selectedHeatmapCity, setSelectedHeatmapCity] = useState<string>('all');
  const [serverOnboardingRequests, setServerOnboardingRequests] = useState<any[]>([]);

  // Search & Filter States
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('all');
  const [requestSearch, setRequestSearch] = useState('');
  const [requestTypeFilter, setRequestTypeFilter] = useState('all');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');

  // New Collaborator Form State
  const [collabName, setCollabName] = useState('');
  const [collabEmail, setCollabEmail] = useState('');
  const [collabPhone, setCollabPhone] = useState('');
  const [collabRoleScope, setCollabRoleScope] = useState<AdminRoleScope>('Operations Manager');
  const [collabDept, setCollabDept] = useState('');
  const [collabAccessKey, setCollabAccessKey] = useState('');
  const [collabNotes, setCollabNotes] = useState('');
  const [isAddingCollab, setIsAddingCollab] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Fetch server onboarding requests on mount and tab switch
  useEffect(() => {
    const fetchServerRequests = async () => {
      try {
        const res = await fetch('/api/onboarding/requests');
        if (res.ok) {
          const data = await res.json();
          setServerOnboardingRequests(data.requests || []);
        }
      } catch (err) {
        console.warn('[AdminDashboard fetch onboarding error]:', err);
      }
    };
    fetchServerRequests();
  }, [activeTab]);

  const pendingDoctors = allDoctors.filter(d => d.verificationStatus === 'Pending' || d.onboardingStatus === 'Verification Pending');
  const pendingPharmacies = allPharmacies.filter(p => p.verificationStatus === 'Pending' || p.onboardingStatus === 'Verification Pending');

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const triggerError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 4000);
  };

  // Appointment & Order Actions
  const handleUpdateBookingStatus = async (bookingId: string, newStatus: any) => {
    await updateAppointmentStatus(bookingId, newStatus);
    triggerSuccess(`Updated Booking #${bookingId} status to "${newStatus}".`);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: any) => {
    await updatePharmacyOrderStatus(orderId, newStatus);
    triggerSuccess(`Updated Order #${orderId} status to "${newStatus}".`);
  };

  // Verification Actions
  const handleApproveDoctor = async (id: string, name: string) => {
    await approveDoctor(id);
    triggerSuccess(`Dr. ${name} verified and approved! Profile is now active and live.`);
  };

  const handleRejectDoctor = async (id: string, name: string) => {
    await rejectDoctor(id);
    triggerSuccess(`Dr. ${name} application rejected.`);
  };

  const handleApprovePharmacy = async (id: string, name: string) => {
    await approvePharmacy(id);
    triggerSuccess(`${name} verified and approved! Pharmacy is now live.`);
  };

  const handleRejectPharmacy = async (id: string, name: string) => {
    await rejectPharmacy(id);
    triggerSuccess(`${name} application rejected.`);
  };

  // Onboarding Request Status Handler
  const handleStatusChange = async (reqId: string, newStatus: string) => {
    setRequestStatuses(prev => ({ ...prev, [reqId]: newStatus }));
    
    try {
      await fetch(`/api/onboarding/requests/${reqId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      triggerSuccess(`Updated onboarding pipeline status to "${newStatus}" for Request #${reqId}`);
    } catch (err) {
      console.warn('[Update Onboarding status error]:', err);
    }
  };

  // Collaborator Creation Handler
  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collabName.trim() || !collabEmail.trim()) {
      triggerError('Name and Email are required.');
      return;
    }

    setIsAddingCollab(true);
    const keyToAssign = collabAccessKey.trim() || `ADM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const res = await addAdminCollaborator({
      name: collabName.trim(),
      email: collabEmail.trim(),
      phone: collabPhone.trim(),
      roleScope: collabRoleScope,
      department: collabDept.trim() || 'Platform Operations',
      accessKey: keyToAssign,
      notes: collabNotes.trim()
    });

    setIsAddingCollab(false);

    if (res.success && 'collaborator' in res && res.collaborator) {
      triggerSuccess(`Collaborator ${res.collaborator.name} provisioned successfully with Access Key: ${res.collaborator.accessKey}`);
      setCollabName('');
      setCollabEmail('');
      setCollabPhone('');
      setCollabDept('');
      setCollabAccessKey('');
      setCollabNotes('');
    } else {
      triggerError(('error' in res && res.error) || 'Failed to add collaborator.');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKeyId(id);
      setTimeout(() => setCopiedKeyId(null), 2500);
      triggerSuccess('Credentials copied to clipboard!');
    }
  };

  // Calculate platform metrics
  const totalRevenue = subscriptions.reduce((sum, s) => sum + s.amount, 0) + adBoosters.reduce((sum, b) => sum + b.amount, 0);

  // Filtered Bookings
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = 
      a.patientName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      a.tokenNumber.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      a.specialty.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus = bookingStatusFilter === 'all' || a.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Requests
  const combinedRequests = [
    ...serverOnboardingRequests.map(r => ({
      id: r.id,
      name: r.providerName || r.name,
      type: r.providerType || 'Provider',
      requester: r.requesterName || 'Hospital Partner',
      phone: r.requesterPhone || r.phone || '+91 83286 20294',
      city: r.city || 'Hyderabad',
      state: r.state || 'Telangana',
      status: requestStatuses[r.id] || r.status || 'REQUESTED',
      createdAt: r.createdAt || 'Recent',
      source: 'Onboarding Pipeline'
    })),
    ...providerRequests.map(p => ({
      id: p.id,
      name: p.providerName,
      type: p.providerType,
      requester: p.patientName,
      phone: p.patientPhone,
      city: p.requestedCity,
      state: 'Andhra Pradesh',
      status: requestStatuses[p.id] || (p.status === 'Notified & Onboarded' ? 'ONBOARDED' : 'REQUESTED'),
      createdAt: p.createdAt,
      source: 'Patient Clinic Discovery'
    }))
  ];

  const filteredRequests = combinedRequests.filter(r => {
    const matchesSearch = 
      r.name.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.requester.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.city.toLowerCase().includes(requestSearch.toLowerCase());
    const matchesType = requestTypeFilter === 'all' || r.type.toLowerCase() === requestTypeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

  // Heatmap Data
  const heatmapCityData = [
    { city: 'Hyderabad', state: 'Telangana', requestCount: 1240, color: 'from-rose-500 to-amber-500', intensity: 100 },
    { city: 'Tirupati', state: 'Andhra Pradesh', requestCount: 870, color: 'from-amber-500 to-yellow-500', intensity: 70 },
    { city: 'Kanigiri', state: 'Andhra Pradesh', requestCount: 210, color: 'from-cyan-500 to-blue-500', intensity: 35 },
    { city: 'Ongole', state: 'Andhra Pradesh', requestCount: 165, color: 'from-blue-500 to-indigo-500', intensity: 25 },
    { city: 'Visakhapatnam', state: 'Andhra Pradesh', requestCount: 310, color: 'from-emerald-500 to-teal-500', intensity: 45 },
    { city: 'Kurnool', state: 'Andhra Pradesh', requestCount: 140, color: 'from-purple-500 to-pink-500', intensity: 20 },
    { city: 'Chennai', state: 'Tamil Nadu', requestCount: 280, color: 'from-amber-500 to-orange-500', intensity: 40 }
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 py-10" id="admin-dashboard-container">
      <SEO
        title="Admin Command Console | MediTrust Healthcare Platform"
        description="Centralized platform administration: View all website bookings, manage onboarding requests pipeline, invite team collaborators, and inspect demand heatmaps."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/80 via-[#0F172A] to-slate-900 border border-rose-500/40 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30 shrink-0">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <div>
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider font-semibold flex items-center gap-2">
                <span>Medynex Super-Admin Console</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/30 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Live Control
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{user?.name || 'Administrator Portal'}</h1>
              <p className="text-xs text-slate-400">All Website Bookings, Requests Pipeline, Collaborator Accounts, Provider Verification & Analytics.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => refreshData()}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Force Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            
            {/* Quick Master Slot Status Indicator */}
            <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Slot: Sealed</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Bar */}
        <div className="flex items-center bg-[#0F172A] p-1.5 rounded-2xl border border-slate-800 overflow-x-auto gap-1.5 shadow-md">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'bookings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>All Bookings ({appointments.length + pharmacyOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'requests' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>All Requests & Leads ({combinedRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'team' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team & Collaborators ({adminCollaborators.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'pending' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Verifications ({pendingDoctors.length + pendingPharmacies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('heatmap')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'heatmap' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Demand Heatmap</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'users' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>User Accounts ({allUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
        </div>

        {/* Feedback Notifications */}
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-white"><X className="w-4 h-4" /></button>
          </motion.div>
        )}

        {errorMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-white"><X className="w-4 h-4" /></button>
          </motion.div>
        )}

        {/* Global Key Metrics Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#0F172A] border border-blue-500/30 space-y-1">
            <div className="text-[11px] text-blue-400 font-mono flex items-center justify-between">
              <span>Total Bookings</span>
              <Ticket className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-white">{appointments.length + pharmacyOrders.length}</div>
            <div className="text-[10px] text-slate-500">OPD Tokens & Orders</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F172A] border border-cyan-500/30 space-y-1">
            <div className="text-[11px] text-cyan-400 font-mono flex items-center justify-between">
              <span>Total Requests</span>
              <Handshake className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-white">{combinedRequests.length}</div>
            <div className="text-[10px] text-cyan-300 font-mono">Onboarding & Leads</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
            <div className="text-[11px] text-emerald-400 font-mono flex items-center justify-between">
              <span>Admin Team</span>
              <Users className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-white">{adminCollaborators.length}</div>
            <div className="text-[10px] text-emerald-300 font-mono">Restricted Slots</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F172A] border border-amber-500/30 space-y-1">
            <div className="text-[11px] text-amber-400 font-mono flex items-center justify-between">
              <span>Doctors Live</span>
              <Stethoscope className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-white">{allDoctors.length}</div>
            <div className="text-[10px] text-slate-500">{pendingDoctors.length} pending verify</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F172A] border border-purple-500/30 space-y-1">
            <div className="text-[11px] text-purple-400 font-mono flex items-center justify-between">
              <span>Pharmacies</span>
              <Pill className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-white">{allPharmacies.length}</div>
            <div className="text-[10px] text-slate-500">Retail chains & stores</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F172A] border border-rose-500/30 space-y-1">
            <div className="text-[11px] text-rose-400 font-mono flex items-center justify-between">
              <span>Gross Volume</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-white">₹{(totalRevenue + 45000).toLocaleString()}</div>
            <div className="text-[10px] text-emerald-400 font-mono">+18% this month</div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ALL BOOKINGS (OPD Appointments & Medicine Orders) */}
        {/* ========================================================================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search bookings by patient, doctor, token #..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Booking Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* OPD Appointments Table */}
            <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-bold text-white">OPD Consultations & Clinic Appointments ({filteredAppointments.length})</h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">Live Patient Queue</span>
              </div>

              {filteredAppointments.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No appointments found matching current filters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                        <th className="pb-3 px-3">Token #</th>
                        <th className="pb-3 px-3">Patient Name</th>
                        <th className="pb-3 px-3">Doctor / Clinic</th>
                        <th className="pb-3 px-3">Specialty</th>
                        <th className="pb-3 px-3">Date & Slot</th>
                        <th className="pb-3 px-3">Consultation Fee</th>
                        <th className="pb-3 px-3">Status</th>
                        <th className="pb-3 px-3 text-right">Admin Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-3">
                            <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                              {apt.tokenNumber || apt.id}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-semibold text-white">
                            {apt.patientName}
                          </td>
                          <td className="py-3.5 px-3 text-slate-200">
                            {apt.doctorName}
                          </td>
                          <td className="py-3.5 px-3 text-slate-400">
                            {apt.specialty}
                          </td>
                          <td className="py-3.5 px-3 font-mono text-slate-300">
                            {apt.date} • {apt.time}
                          </td>
                          <td className="py-3.5 px-3 font-mono font-semibold text-emerald-400">
                            ₹{apt.consultationFee || 500}
                          </td>
                          <td className="py-3.5 px-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              apt.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              apt.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              apt.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                              'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <select
                              value={apt.status}
                              onChange={(e) => handleUpdateBookingStatus(apt.id, e.target.value)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
                            >
                              <option value="Confirmed">Set Confirmed</option>
                              <option value="In Progress">Set In Progress</option>
                              <option value="Completed">Set Completed</option>
                              <option value="Cancelled">Set Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pharmacy Orders Section */}
            <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Pill className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-bold text-white">Pharmacy Medicine Orders ({pharmacyOrders.length})</h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">Prescription & OTC Fulfillment</span>
              </div>

              {pharmacyOrders.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No pharmacy medicine orders placed yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                        <th className="pb-3 px-3">Order ID</th>
                        <th className="pb-3 px-3">Patient</th>
                        <th className="pb-3 px-3">Pharmacy</th>
                        <th className="pb-3 px-3">Delivery Address</th>
                        <th className="pb-3 px-3">Amount</th>
                        <th className="pb-3 px-3">Status</th>
                        <th className="pb-3 px-3 text-right">Fulfillment Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {pharmacyOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-amber-400">
                            {ord.id}
                          </td>
                          <td className="py-3 px-3 font-semibold text-white">
                            <div>{ord.patientName}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{ord.patientPhone}</div>
                          </td>
                          <td className="py-3 px-3 text-slate-300">
                            {ord.pharmacyName}
                          </td>
                          <td className="py-3 px-3 text-slate-400 max-w-xs truncate">
                            {ord.patientAddress}
                          </td>
                          <td className="py-3 px-3 font-mono font-semibold text-emerald-400">
                            ₹{ord.totalAmount}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
                            >
                              <option value="Order Received">Order Received</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Ready for Pickup">Ready for Pickup</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ALL REQUESTS & ONBOARDING PIPELINE */}
        {/* ========================================================================= */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search requests by provider name, requester, city..."
                  value={requestSearch}
                  onChange={(e) => setRequestSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={requestTypeFilter}
                  onChange={(e) => setRequestTypeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Provider Types</option>
                  <option value="Doctor">Doctors</option>
                  <option value="Hospital">Hospitals</option>
                  <option value="Pharmacy">Pharmacies</option>
                  <option value="Laboratory">Laboratories</option>
                </select>
              </div>
            </div>

            {/* Requests Table */}
            <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Handshake className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-bold text-white">Live Onboarding & Provider Discovery Requests ({filteredRequests.length})</h2>
                </div>
                <span className="text-xs text-cyan-400 font-mono">Direct CRM Pipeline</span>
              </div>

              {filteredRequests.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No requests matching the search filter.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                        <th className="pb-3 px-3">Request ID</th>
                        <th className="pb-3 px-3">Provider Name</th>
                        <th className="pb-3 px-3">Type</th>
                        <th className="pb-3 px-3">Requester / Lead</th>
                        <th className="pb-3 px-3">Contact</th>
                        <th className="pb-3 px-3">City / Location</th>
                        <th className="pb-3 px-3">Status</th>
                        <th className="pb-3 px-3 text-right">Pipeline Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-3 font-mono font-bold text-cyan-400">
                            #{req.id.substring(0, 8)}
                          </td>
                          <td className="py-3.5 px-3 font-semibold text-white">
                            {req.name}
                            <span className="block text-[10px] text-slate-500 font-normal">{req.source}</span>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300">
                              {req.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-slate-300">
                            {req.requester}
                          </td>
                          <td className="py-3.5 px-3 font-mono text-slate-300">
                            <a href={`tel:${req.phone}`} className="text-cyan-400 hover:underline flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {req.phone}
                            </a>
                          </td>
                          <td className="py-3.5 px-3 text-slate-300">
                            {req.city}, {req.state}
                          </td>
                          <td className="py-3.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              req.status === 'ONBOARDED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              req.status === 'CONTACTED' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                              req.status === 'INVITED' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                              req.status === 'REVIEW' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              'bg-slate-800 text-slate-300'
                            }`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <select
                              value={req.status}
                              onChange={(e) => handleStatusChange(req.id, e.target.value)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
                            >
                              <option value="REQUESTED">REQUESTED</option>
                              <option value="REVIEW">UNDER REVIEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="INVITED">INVITE SENT</option>
                              <option value="ONBOARDED">ONBOARDED</option>
                              <option value="REJECTED">REJECTED</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TEAM COLLABORATORS & RESTRICTED ADMIN ACCOUNT SLOTS */}
        {/* ========================================================================= */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            
            {/* Slot Policy Banner */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 space-y-3 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Administrator Account Creation & Slot Enforcement</h3>
                    <p className="text-xs text-slate-300">
                      Public registration for Admin accounts is strictly sealed. Only active administrators can provision access keys or add collaborator accounts below.
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold self-start sm:self-auto shrink-0">
                  Master Slot Sealed & Active
                </span>
              </div>
            </div>

            {/* Provision New Collaborator Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-2.5">
                  <UserPlus className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Provision Team Member / Collaborator Slot</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Delegated Credentials</span>
              </div>

              <form onSubmit={handleAddCollaborator} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bandi Nandini"
                      value={collabName}
                      onChange={(e) => setCollabName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="nandini.ops@medynex.com"
                      value={collabEmail}
                      onChange={(e) => setCollabEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 877 228 9911"
                      value={collabPhone}
                      onChange={(e) => setCollabPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Administrative Role Scope *</label>
                    <select
                      value={collabRoleScope}
                      onChange={(e) => setCollabRoleScope(e.target.value as AdminRoleScope)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Super-Admin">Super-Admin (Full Access)</option>
                      <option value="Operations Manager">Operations Manager (Onboarding & Bookings)</option>
                      <option value="Clinical Verifier">Clinical Verifier (Doctor & License Reviews)</option>
                      <option value="Support Lead">Support Lead (Patient Inquiries)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Department / Operations Unit</label>
                    <input
                      type="text"
                      placeholder="e.g. Hospital & Clinic Onboarding"
                      value={collabDept}
                      onChange={(e) => setCollabDept(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Access Key / Temporary Password</label>
                    <input
                      type="text"
                      placeholder="Leave blank to auto-generate"
                      value={collabAccessKey}
                      onChange={(e) => setCollabAccessKey(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Internal Notes & Permissions</label>
                  <input
                    type="text"
                    placeholder="e.g. Authorized to verify Tirupati & Hyderabad doctor applications"
                    value={collabNotes}
                    onChange={(e) => setCollabNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isAddingCollab}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center space-x-2 transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isAddingCollab ? 'Provisioning Slot...' : 'Grant Credentials & Add Collaborator'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Active Collaborators Directory */}
            <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Active Administrative Team Members ({adminCollaborators.length})</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Team Governance</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminCollaborators.map((collab) => (
                  <div key={collab.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">{collab.name}</h4>
                        <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-500" />
                          {collab.email}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        collab.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {collab.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-300">
                      <div className="flex justify-between py-1 border-t border-slate-800">
                        <span className="text-slate-500">Role Scope:</span>
                        <span className="font-semibold text-emerald-300">{collab.roleScope}</span>
                      </div>
                      <div className="flex justify-between py-1 border-t border-slate-800">
                        <span className="text-slate-500">Department:</span>
                        <span>{collab.department || 'Operations'}</span>
                      </div>
                      <div className="flex justify-between py-1 border-t border-slate-800">
                        <span className="text-slate-500">Assigned By:</span>
                        <span className="text-slate-400 text-[11px]">{collab.assignedBy || 'Master Slot'}</span>
                      </div>
                    </div>

                    {/* Access Key Bar with Copy Button */}
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 font-mono text-xs text-amber-400">
                        <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                        <span>{collab.accessKey || 'SUPER-KEY-VALID'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(collab.accessKey || `${collab.email} / Password123!`, collab.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Copy credentials"
                      >
                        {copiedKeyId === collab.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Status Toggle & Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => updateAdminCollaboratorStatus(collab.id, collab.status === 'Active' ? 'Suspended' : 'Active')}
                        className={`text-xs font-semibold hover:underline ${
                          collab.status === 'Active' ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      >
                        {collab.status === 'Active' ? 'Suspend Access' : 'Reactivate'}
                      </button>

                      {collab.id !== 'collab-01' && (
                        <button
                          type="button"
                          onClick={() => removeAdminCollaborator(collab.id)}
                          className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Revoke</span>
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: PENDING PROVIDER VERIFICATIONS */}
        {/* ========================================================================= */}
        {activeTab === 'pending' && (
          <div className="space-y-6">
            
            {/* Pending Doctors Section */}
            <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Doctors Awaiting Verification ({pendingDoctors.length})</h3>
                </div>
                <span className="text-xs text-amber-400 font-mono">MCI License & Profile Check</span>
              </div>

              {pendingDoctors.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-xs">
                  No doctors currently pending approval.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingDoctors.map((doc) => (
                    <div key={doc.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-white text-sm">{doc.name}</h4>
                          <div className="text-xs text-slate-400">{doc.specialty} • {doc.qualification}</div>
                          <div className="text-[11px] text-slate-500">{doc.hospitalName || doc.clinicName}, {doc.city || 'Tirupati'}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {doc.verificationStatus}
                        </span>
                      </div>

                      <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => handleRejectDoctor(doc.id, doc.name)}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs border border-rose-500/20 transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApproveDoctor(doc.id, doc.name)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Make Live</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Pharmacies Section */}
            <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Pill className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base font-bold text-white">Pharmacies Awaiting Drug License Verification ({pendingPharmacies.length})</h3>
                </div>
                <span className="text-xs text-purple-400 font-mono">Retail Compliance</span>
              </div>

              {pendingPharmacies.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-xs">
                  No pharmacies currently pending approval.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingPharmacies.map((pharm) => (
                    <div key={pharm.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-white text-sm">{pharm.name}</h4>
                          <div className="text-xs text-slate-400">License: {pharm.drugLicenseNumber || 'AP-DRUG-99201'}</div>
                          <div className="text-[11px] text-slate-500">{pharm.address}, {pharm.city}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {pharm.verificationStatus}
                        </span>
                      </div>

                      <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => handleRejectPharmacy(pharm.id, pharm.name)}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs border border-rose-500/20 transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApprovePharmacy(pharm.id, pharm.name)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Make Live</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: DEMAND HEATMAP */}
        {/* ========================================================================= */}
        {activeTab === 'heatmap' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-400" />
                    <span>Regional Healthcare Demand Heatmap</span>
                  </h3>
                  <p className="text-xs text-slate-400">Live aggregated search signals and provider request volumes across South India.</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Telemetry Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {heatmapCityData.map((h) => (
                  <div key={h.city} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-base">{h.city}</h4>
                        <span className="text-xs text-slate-400">{h.state}</span>
                      </div>
                      <span className="text-base font-black text-amber-400 font-mono">
                        {h.requestCount} queries
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${h.color} rounded-full transition-all duration-500`}
                        style={{ width: `${h.intensity}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                      <span>Demand Index: {h.intensity}/100</span>
                      <span className="text-emerald-400 font-semibold">Priority Expansion</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: REGISTERED PLATFORM USERS */}
        {/* ========================================================================= */}
        {activeTab === 'users' && (
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Registered Platform Accounts ({allUsers.length})</h3>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                    <th className="pb-3 px-3">Name & Email</th>
                    <th className="pb-3 px-3">Role</th>
                    <th className="pb-3 px-3">Location</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3 text-right">Account Governance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {allUsers
                    .filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
                    .map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-semibold text-white">{u.name}</div>
                          <div className="text-[11px] text-slate-400">{u.email}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize ${
                            u.role === 'admin' ? 'bg-rose-500/10 text-rose-400 font-bold' :
                            u.role === 'doctor' ? 'bg-cyan-500/10 text-cyan-400' :
                            u.role === 'pharmacy' ? 'bg-amber-500/10 text-amber-400' :
                            'bg-blue-500/10 text-blue-400'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-300">
                          {u.city || 'Tirupati'}, {u.state || 'AP'}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400">
                            {u.status || 'Active'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => updateUserStatus(u.id, u.status === 'Active' ? 'Suspended' : 'Active')}
                            className="text-xs text-amber-400 hover:underline mr-3"
                          >
                            {u.status === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="text-xs text-rose-400 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: ANALYTICS */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Platform Health & Telemetry Metrics</h3>
              </div>
              <span className="text-xs text-indigo-400 font-mono">Automated Ledger</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400">Active Subscriptions</div>
                <div className="text-2xl font-bold text-white">{subscriptions.length + 8} Clinics</div>
                <div className="text-xs text-emerald-400">Recurring Monthly ARR</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400">Live Ad Boosters</div>
                <div className="text-2xl font-bold text-white">{adBoosters.length + 4} Active</div>
                <div className="text-xs text-cyan-400">Targeting Tirupati & Hyderabad</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400">Token Fulfilled Ratio</div>
                <div className="text-2xl font-bold text-white">96.8%</div>
                <div className="text-xs text-emerald-400">Avg OPD Wait Time: 12 mins</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
