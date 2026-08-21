import React from 'react';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex items-center justify-center p-4">
      <SEO
        title="404 Page Not Found | MediTrust"
        description="The requested healthcare portal route was not found."
      />
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#111827] border border-slate-800 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-blue-400">404 Error</span>
          <h1 className="text-2xl font-extrabold text-white">Page Not Found</h1>
          <p className="text-xs text-slate-400">The healthcare route or record you are searching for does not exist on the MediTrust gateway.</p>
        </div>

        <Link to="/" className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20">
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};
