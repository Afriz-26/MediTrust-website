import React from 'react';
import { ServerCrash, RefreshCw } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const ServerErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex items-center justify-center p-4">
      <SEO
        title="500 Server Error | MediTrust"
        description="Internal server error occurred."
      />
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#111827] border border-rose-500/30 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <ServerCrash className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-rose-400">500 Internal Error</span>
          <h1 className="text-2xl font-extrabold text-white">Server Communication Interrupted</h1>
          <p className="text-xs text-slate-400">An error occurred while communicating with the REST API. Please refresh or retry.</p>
        </div>

        <button onClick={() => window.location.reload()} className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">
          <RefreshCw className="w-4 h-4" />
          <span>Reload Application</span>
        </button>
      </div>
    </div>
  );
};
