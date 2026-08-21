import React from 'react';
import { MOCK_NEWS } from '../lib/api';
import { Newspaper, Calendar, Clock, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title="News & Press Releases | Medynex Solutions LLP"
        description="Latest product updates, press releases, research case studies, and healthcare technology announcements from Medynex Solutions LLP."
        canonicalUrl="https://medynex.com/news"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 font-mono bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Newspaper className="w-3.5 h-3.5" /> Media & Insights
          </span>
          <h1 className="text-4xl font-extrabold text-white">Latest News & Press Releases</h1>
          <p className="text-slate-400 text-sm">Official announcements and health-tech insights from Medynex Solutions LLP.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_NEWS.map(article => (
            <div key={article.id} className="rounded-3xl bg-[#111827] border border-slate-800 overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover" />
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-xs text-slate-400">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono font-semibold">{article.category}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.publishedAt}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white hover:text-blue-400 transition-colors">{article.title}</h2>
                  <p className="text-sm text-slate-300 leading-relaxed">{article.summary}</p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>By {article.author}</span>
                <span className="text-blue-400 font-semibold flex items-center gap-1">Read Article <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
