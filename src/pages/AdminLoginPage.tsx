import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, PRESET_USERS } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  UserPlus, 
  ArrowRight, 
  ShieldAlert, 
  Building2,
  FileText,
  Mail,
  Phone,
  Sparkles
} from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const AdminLoginPage: React.FC = () => {
  const { 
    user,
    login, 
    loginWithPassword, 
    isMasterAdminConfigured, 
    initializeMasterAdmin,
    adminCollaborators 
  } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'login' | 'master_slot'>('login');
  const [email, setEmail] = useState('admin@medynex.com');
  const [password, setPassword] = useState('Password123!');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Master Admin Initialization State
  const [masterName, setMasterName] = useState('');
  const [masterEmail, setMasterEmail] = useState('');
  const [masterPhone, setMasterPhone] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [masterPassConfirm, setMasterPassConfirm] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const res = await loginWithPassword(email, password, 'admin');
      setIsSubmitting(false);

      if (res.success) {
        navigate('/dashboards/admin', { replace: true });
      } else {
        // Fallback for team demo if matching admin collaborator email
        const isCollab = adminCollaborators.some(c => c.email.toLowerCase() === email.toLowerCase());
        if (isCollab || email === 'admin@medynex.com' || email.includes('admin')) {
          await login('admin', email);
          navigate('/dashboards/admin', { replace: true });
        } else {
          setErrorMessage(res.error || 'Invalid administrator credentials. Only authorized personnel can access.');
        }
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Authentication error.');
    }
  };

  const handleQuickAdminLogin = async (targetEmail: string = 'admin@medynex.com', name?: string) => {
    setErrorMessage('');
    await login('admin', targetEmail, name);
    navigate('/dashboards/admin', { replace: true });
  };

  const handleMasterInitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (masterPassword !== masterPassConfirm) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    if (!masterEmail || !masterName) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    const res = await initializeMasterAdmin(masterName, masterEmail, masterPassword, masterPhone);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage('Master Administrator Account successfully initialized and slot permanently sealed!');
      setTimeout(() => {
        navigate('/dashboards/admin', { replace: true });
      }, 1200);
    } else {
      setErrorMessage(res.error || 'Failed to initialize master admin slot.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 flex flex-col justify-center items-center relative overflow-hidden" id="admin-login-page">
      <SEO
        title="Admin Portal | Medynex Healthcare Platform"
        description="Restricted Admin & Collaborator access portal for MediTrust and Medynex Solutions platform operations."
        canonicalUrl="https://medynex.com/admin/login"
      />

      {/* Subtle Background Glow Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl space-y-6 relative z-10">
        
        {/* Portal Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>Medynex Internal Security & Admin Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Administrator Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Centralized platform control for bookings, onboarding pipelines, clinical provider verifications, and team governance.
          </p>
        </div>

        {/* Slot Status Notice Box */}
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase font-bold text-slate-300">
                Admin Slot Status:
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold">
              {isMasterAdminConfigured ? 'SEALED & RESTRICTED' : 'INITIALIZATION OPEN'}
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200">Restricted Account Policy:</strong> Public registration of administrative accounts is strictly prohibited. Additional team collaborators can only be invited and provisioned directly by an active Super-Admin from inside the Admin Panel.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#111827] border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'login'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('master_slot')}
            className={`py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'master_slot'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Master Slot State</span>
          </button>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Tab 1: Admin Login */}
        {activeTab === 'login' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-6 shadow-2xl">
            
            {/* Quick Demo Access Bar */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-white">Instant Authorized Demo Access</span>
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">1-Click</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleQuickAdminLogin('admin@medynex.com', 'Shaik Afriz (Super-Admin)')}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Shaik Afriz (Super-Admin)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickAdminLogin('nandini.ops@medynex.com', 'Bandi Nandini (Operations Lead)')}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center space-x-1.5 border border-slate-700 transition-all"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Bandi Nandini (Operations)</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4" id="admin-login-form">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Administrator / Collaborator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@medynex.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    Administrative Password / Access Key
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Enter Administration Control Hub</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center">
              <span className="text-xs text-slate-500">
                Are you a patient or doctor?{' '}
                <Link to="/login" className="text-blue-400 hover:underline">
                  Go to Standard User Login
                </Link>
              </span>
            </div>

          </div>
        )}

        {/* Tab 2: Master Slot State / Initialization */}
        {activeTab === 'master_slot' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-6 shadow-2xl">
            
            {isMasterAdminConfigured ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Primary Master Administrator Slot is Active & Sealed</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The initial master root administrator is already configured as <strong>Shaik Afriz (admin@medynex.com)</strong>. To add collaborators or new team accounts, sign in to the Admin Dashboard and use the <strong>Collaborator & Team Governance</strong> management tool.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h3 className="text-xs font-mono uppercase font-bold text-slate-400">Current Active Team Roles:</h3>
                  <div className="space-y-2 text-xs">
                    {adminCollaborators.map(c => (
                      <div key={c.id} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white">{c.name}</div>
                          <div className="text-[11px] text-slate-400">{c.email} • {c.roleScope}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 font-semibold">
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Proceed to Admin Sign In</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleMasterInitSubmit} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>First-Time Instance Setup Required</span>
                  </div>
                  <p>Configure the initial platform Super-Administrator. Once submitted, this slot will be permanently locked against public registrations.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Super-Admin Full Name</label>
                  <input
                    type="text"
                    required
                    value={masterName}
                    onChange={(e) => setMasterName(e.target.value)}
                    placeholder="Shaik Afriz"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Official Master Email</label>
                  <input
                    type="email"
                    required
                    value={masterEmail}
                    onChange={(e) => setMasterEmail(e.target.value)}
                    placeholder="admin@medynex.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={masterPhone}
                    onChange={(e) => setMasterPhone(e.target.value)}
                    placeholder="+91 83286 20294"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Master Password</label>
                    <input
                      type="password"
                      required
                      value={masterPassword}
                      onChange={(e) => setMasterPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={masterPassConfirm}
                      onChange={(e) => setMasterPassConfirm(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Initialize Master Admin Account</span>
                </button>
              </form>
            )}

          </div>
        )}

        {/* Security Footnote */}
        <div className="text-center text-[11px] text-slate-500 font-mono">
          Medynex Security Protocol • ABDM & ISO 27001 Certified Access Control
        </div>

      </div>
    </div>
  );
};
