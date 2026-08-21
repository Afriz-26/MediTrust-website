import React from 'react';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SEO } from '../../components/common/SEO';

export const UnauthorizedPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex items-center justify-center p-4">
      <SEO
        title="403 Access Denied | MediTrust Platform"
        description="403 Forbidden - Role Based Access Control Restricted Page."
      />
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#111827] border border-rose-500/40 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-rose-400">403 Forbidden</span>
          <h1 className="text-2xl font-extrabold text-white">Access Restricted</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your current account role <strong className="text-white capitalize font-mono">({user?.role || 'Guest'})</strong> does not have authorization permissions to view this secure portal page.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          {user && (
            <Link 
              to={`/dashboards/${user.role}`} 
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20"
            >
              Return to My {user.role.toUpperCase()} Dashboard
            </Link>
          )}
          <Link 
            to="/" 
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
          >
            Go to Main Gateway Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
