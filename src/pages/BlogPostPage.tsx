import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';
import { Calendar, Clock, ArrowLeft, Tag, Share2, Sparkles, CheckCircle2, UserCheck, BookOpen } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = BLOG_ARTICLES.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const postSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article.title,
    'description': article.summary,
    'image': article.imageUrl,
    'author': {
      '@type': 'Person',
      'name': article.author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Medynex Solutions LLP',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://medynex.com/logo.png'
      }
    },
    'datePublished': article.publishedAt
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-12 lg:py-20">
      <SEO
        title={`${article.title} | MediTrust Healthcare Blog`}
        description={article.summary}
        keywords={[...article.tags, 'Medynex Solutions', 'MediTrust', 'Healthcare Article']}
        canonicalUrl={`https://medynex.com/blog/${article.slug}`}
        ogImage={article.imageUrl}
        ogType="article"
        schema={postSchema}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Healthcare Articles
        </Link>

        {/* Article Banner Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono font-semibold border border-cyan-500/20">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> {article.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-400">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{article.author}</p>
              <p className="text-xs text-slate-400">{article.authorRole}</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="rounded-2xl bg-[#111827] border border-cyan-500/30 p-6 space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Key Article Takeaways
            </h3>
            <ul className="space-y-2">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content Paragraphs */}
        <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          {article.content.map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-bold text-white pt-4 border-b border-slate-800 pb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            return (
              <p key={idx} className="text-slate-300 leading-relaxed whitespace-pre-line">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags Footnote */}
        <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            {article.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-slate-900 text-slate-400 text-xs border border-slate-800">
                #{tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: article.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Article link copied to clipboard!');
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Article
          </button>
        </div>

      </div>
    </div>
  );
};
