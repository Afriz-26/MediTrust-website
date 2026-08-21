import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, PRESET_USERS } from '../context/AuthContext';
import { UserRole } from '../types';
import { ShieldCheck, User, Stethoscope, Building2, Pill, FlaskConical, Lock, KeyRound, CheckCircle, Mail, AlertCircle, X } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const LoginPage: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Password123!');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const { login, loginWithPassword, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = async (role: UserRole) => {
    await login(role);
    navigate(`/dashboards/${role}`, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const targetEmail = email || PRESET_USERS[activeRole].email;
    const res = await loginWithPassword(targetEmail, password, activeRole);
    setIsSubmitting(false);

    if (res.success) {
      navigate(`/dashboards/${activeRole}`, { replace: true });
    } else {
      setErrorMessage(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    const res = await resetPassword(resetEmail);
    if (res.success) {
      setResetEmailSent(true);
    } else {
      alert(res.error || 'Failed to send reset email.');
    }
  };

  const rolesConfig: { role: UserRole; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    { role: 'patient', label: 'Patient', icon: User, color: 'text-blue-400' },
    { role: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'text-cyan-400' },
    { role: 'pharmacy', label: 'Pharmacy', icon: Pill, color: 'text-amber-400' },
    { role: 'admin', label: 'Admin', icon: ShieldCheck, color: 'text-rose-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 flex flex-col justify-center items-center px-4">
      <SEO
        title="Login Portal | MediTrust Healthcare Platform"
        description="Role-based login portal with Supabase Authentication for Patients, Doctors, Hospitals, Pharmacies, Laboratories, and Administrators on MediTrust."
        canonicalUrl="https://medynex.com/login"
      />
      
      <div className="w-full max-w-xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>Supabase Authentication & Role-Based Access</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Sign In to MediTrust</h1>
          <p className="text-xs text-slate-400">Choose your account role to log in with email, password or Google OAuth.</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-[#111827] border border-slate-800">
          {rolesConfig.map(r => {
            const Icon = r.icon;
            const isSelected = activeRole === r.role;
            return (
              <button
                key={r.role}
                type="button"
                onClick={() => {
                  setActiveRole(r.role);
                  setEmail(PRESET_USERS[r.role].email);
                  setErrorMessage('');
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : r.color}`} />
                <span className="capitalize">{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Login Form Box */}
        <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-6 shadow-2xl">
          
          {/* Quick Demo Preset Login Banner */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between gap-3">
            <div className="text-xs text-blue-300">
              <span className="font-bold block text-white capitalize">{activeRole} Demo Mode</span>
              <span>Instant 1-Click Access as {PRESET_USERS[activeRole].name}</span>
            </div>
            <button
              type="button"
              onClick={() => handleQuickLogin(activeRole)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shrink-0"
            >
              1-Click Demo Login
            </button>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input 
                type="email"
                required
                value={email || PRESET_USERS[activeRole].email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => { setShowForgotPassword(true); setResetEmail(email || PRESET_USERS[activeRole].email); }}
                  className="text-xs text-blue-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <input 
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-600/20 capitalize flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Signing In...' : `Sign In as ${activeRole}`}
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
              <span className="relative bg-[#111827] px-3 text-xs text-slate-500 font-mono">OR SOCIAL SIGN-IN</span>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-xl bg-[#0B1120] hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google Sign-In</span>
            </button>
          </form>

        </div>

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl bg-[#111827] border border-slate-700 p-6 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white">Reset Password</h3>
                <button onClick={() => { setShowForgotPassword(false); setResetEmailSent(false); }} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {resetEmailSent ? (
                <div className="text-center space-y-4 py-4">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Reset Link Sent!</h4>
                  <p className="text-xs text-slate-300">Password recovery instructions have been dispatched to <strong>{resetEmail}</strong> via Supabase Auth.</p>
                  <button onClick={() => { setShowForgotPassword(false); setResetEmailSent(false); }} className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Registered Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={resetEmail}
                      onChange={e => setResetEmail(e.target.value)}
                      placeholder="user@example.com" 
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" 
                    />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs">
                    Send Password Reset Link
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
