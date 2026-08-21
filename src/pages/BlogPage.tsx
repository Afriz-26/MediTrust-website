import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';
import { BookOpen, Calendar, Clock, ArrowRight, Tag, Search, Sparkles, UserCheck } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Medynex Solutions & MediTrust Healthcare Insights',
    'description': 'Latest medical guides, AI healthcare research, and digital health technology updates.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Medynex Solutions LLP'
    }
  };

  const blogKeywords = [
    'Healthcare Blog',
    'Medynex Blog',
    'MediTrust Guides',
    'How to book a doctor online',
    'How AI is transforming healthcare',
    'Understanding digital prescriptions',
    'Tips for finding the right specialist',
    'Preventive health checkups',
    'Healthcare technology updates'
  ];

  const categories = ['All', ...Array.from(new Set(BLOG_ARTICLES.map(a => a.category)))];

  const filteredArticles = BLOG_ARTICLES.filter(article => {
    const query = searchQuery ? searchQuery.toLowerCase().trim() : '';
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = !query ||
      (article.title && article.title.toLowerCase().includes(query)) ||
      (article.summary && article.summary.toLowerCase().includes(query)) ||
      (article.tags && article.tags.some(t => t && t.toLowerCase().includes(query)));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title="Healthcare Blog & Guides | Medynex Solutions LLP & MediTrust"
        description="Read expert healthcare guides, AI medical insights, digital prescription tutorials, doctor booking tips, and product news from Medynex Solutions LLP."
        keywords={blogKeywords}
        canonicalUrl="https://medynex.com/blog"
        schema={blogSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 font-mono bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Health & Tech Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            MediTrust Healthcare <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Insights & Articles</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Empowering patients, doctors, and healthcare professionals with actionable medical knowledge, digital prescription standards, and AI innovation.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#111827] p-4 rounded-2xl border border-slate-800 shadow-xl">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles & topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B1120] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article: BlogArticle) => (
            <article key={article.id} className="rounded-3xl bg-[#111827] border border-slate-800 overflow-hidden hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-lg">
              <div>
                <div className="relative overflow-hidden h-52">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1120]/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-xs font-mono font-semibold text-cyan-400">
                    {article.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#0B1120]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> {article.readTime}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span className="text-slate-300 font-medium">{article.author}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                    <Link to={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] text-slate-400">{article.authorRole}</span>
                </div>
                <Link
                  to={`/blog/${article.slug}`}
                  className="text-cyan-400 font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all text-xs"
                >
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-[#111827] rounded-3xl border border-slate-800 p-8">
            <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No articles matching your search</h3>
            <p className="text-xs text-slate-400 mt-1">Try searching for keywords like "doctor", "AI", "prescription", or "checkup".</p>
          </div>
        )}

      </div>
    </div>
  );
};
