import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Newspaper, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Filter, 
  Download, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  Mail,
  ChevronRight,
  X,
  BookOpen
} from 'lucide-react';
import { SEO } from '../components/common/SEO';

// Local High-Resolution Healthcare News Assets
import newsAbdmImg from '../assets/images/news_abdm_health_1790873696454.jpg';
import newsOpdQueueImg from '../assets/images/news_opd_queue_1790873710348.jpg';
import newsQrRxImg from '../assets/images/news_qr_rx_1790873724556.jpg';
import newsCommunityHealthImg from '../assets/images/news_community_health_1790873738529.jpg';
import newsConsultationImg from '../assets/images/indian_consultation_1787291140026.jpg';
import newsPharmacyDispensaryImg from '../assets/images/pharmacy_dispensary_1790873041570.jpg';

interface EditorialArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Product Roadmap' | 'Clinical Engineering' | 'Regulatory & ABDM' | 'Community Care';
  summary: string;
  content: string[];
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  imageUrl: string;
  tags: string[];
}

const ARTICLES: EditorialArticle[] = [
  {
    id: 'news-1',
    title: 'Medynex Solutions LLP Unveils MediTrust 2.0 Ecosystem for Seamless ABDM Integration',
    slug: 'medynex-unveils-meditrust-2-0',
    category: 'Product Roadmap',
    summary: 'Connecting hospitals, clinical OPDs, licensed pharmacies, and diagnostic laboratories into a unified Ayushman Bharat Digital Mission (ABDM) compliant network.',
    content: [
      'Medynex Solutions LLP has officially unveiled the MediTrust 2.0 digital healthcare ecosystem, setting a new benchmark for interoperability and clinical workflow efficiency across India.',
      'Developed under the leadership of Founder & CEO Shaik Afriz and Co-Founder B. Nandini, the platform establishes a seamless digital bridge between patients, practicing clinicians, and local retail chemists.',
      'MediTrust 2.0 incorporates native ABDM (Ayushman Bharat Digital Mission) M1, M2, and M3 milestone integration, enabling patients to link their 14-digit ABHA (Ayushman Bharat Health Account) IDs and grant cryptographic consent for sharing diagnostic summaries and medical records.',
      '"Our vision with MediTrust is not just to replace paper slips with screens," stated Shaik Afriz. "It is to eliminate the painful hours families spend waiting in hospital hallways and to ensure that a patient in a tier-2 town or village receives the exact same standard of digital healthcare coordination as someone in a major metro."'
    ],
    author: 'Medynex Tech Bureau',
    authorRole: 'Official Press Release',
    publishedAt: 'October 1, 2026',
    readTime: '4 min read',
    featured: true,
    imageUrl: newsAbdmImg,
    tags: ['ABDM', 'Ayushman Bharat', 'Product Launch', 'Healthcare Tech']
  },
  {
    id: 'news-2',
    title: 'How Dynamic Queue Management Solves the Indian Outpatient Waiting Crisis',
    slug: 'digital-tokens-reduce-wait-times',
    category: 'Clinical Engineering',
    summary: 'An architectural deep-dive into the MediTrust live queue token algorithm that notifies patients in real-time, staggering hospital arrivals and curbing waiting room crowding.',
    content: [
      'In India, outpatient department (OPD) congestion remains one of the greatest sources of patient dissatisfaction and clinical burnout. Patients routinely arrive hours before their scheduled consultation, creating crowded corridors with elevated nosocomial cross-infection risks.',
      'MediTrust addresses this with a stateful, sub-second queue engine. When a patient registers for an OPD consultation, they receive a live token that continuously recalculates estimated wait times based on actual active consultation durations.',
      'Patients receive SMS and WhatsApp alerts when their token number is three slots away, allowing them to wait comfortably nearby rather than sitting in a crowded waiting hall.',
      'Clinical workflow tests indicate this staggered arrival model reduces indoor waiting room density by over 65% while increasing physician schedule adherence.'
    ],
    author: 'Shaik Afriz',
    authorRole: 'Founder & Lead Architect',
    publishedAt: 'September 24, 2026',
    readTime: '6 min read',
    imageUrl: newsOpdQueueImg,
    tags: ['Queue Algorithm', 'OPD Management', 'Hospital Efficiency']
  },
  {
    id: 'news-3',
    title: 'Ending Prescription Handwriting Errors: The Cryptographic QR Standard',
    slug: 'cryptographic-qr-prescriptions',
    category: 'Regulatory & ABDM',
    summary: 'Why digital prescriptions with tamper-proof QR codes are critical for eliminating drug dispensing mistakes and preventing counterfeit medicine distribution.',
    content: [
      'Illegible handwriting on paper prescriptions is a longstanding healthcare liability worldwide, often resulting in retail chemists misinterpreting dosages or dispensing look-alike drug brands.',
      'MediTrust digital prescriptions are generated using verified national drug brand catalogs with active chemical salt cross-checks. Each prescription is signed with a cryptographic QR code verifying the practitioner’s state medical council registration number.',
      'Licensed pharmacies can scan the QR code to instantly verify authenticity and dispense medications without manual transcription errors.',
      'This infrastructure also protects patient rights under the DPCO (Drugs Prices Control Order) by displaying official ceiling rates and government Jan Aushadhi alternatives.'
    ],
    author: 'B. Nandini',
    authorRole: 'Co-Founder & Healthcare Operations Lead',
    publishedAt: 'September 12, 2026',
    readTime: '5 min read',
    imageUrl: newsQrRxImg,
    tags: ['Patient Safety', 'Digital Rx', 'Pharmacy Networks']
  },
  {
    id: 'news-4',
    title: 'Expanding Digital Health Access to Tier-2 Cities and Rural Mandals',
    slug: 'tier-2-rural-health-access',
    category: 'Community Care',
    summary: 'A look at Medynex Solutions LLP’s grassroots mission to bring modern healthcare discovery and appointment coordination to towns across Andhra Pradesh and Telangana.',
    content: [
      'While metropolitan cities enjoy an abundance of digital health services, smaller towns like Kanigiri, Tirupati, Guntur, and Warangal often experience the greatest healthcare coordination friction.',
      'Medynex Solutions LLP is architected with a location-first mesh that maps local clinics, government dispensaries, and retail pharmacies across every district and mandal.',
      'Through lightweight mobile interfaces designed to function seamlessly even on low-bandwidth networks, patients can locate specialists, request provider onboarding, and access AI health guidance in their native language.',
      '"Access to technology should not depend on geography," notes the Medynex team. "True health tech serves every community."'
    ],
    author: 'Medynex Bureau',
    authorRole: 'Community Advocacy Team',
    publishedAt: 'August 28, 2026',
    readTime: '4 min read',
    imageUrl: newsCommunityHealthImg,
    tags: ['Rural Health', 'Inclusion', 'Andhra Pradesh']
  },
  {
    id: 'news-5',
    title: 'AI Multilingual Health Triage: Transforming Pre-Consultation Communication',
    slug: 'ai-multilingual-triage',
    category: 'Clinical Engineering',
    summary: 'Empowering patients to describe health symptoms in Telugu, Hindi, and English while providing structured pre-consultation briefings to clinicians.',
    content: [
      'Language barriers frequently hinder accurate patient triage in diverse Indian states. MediTrust integrates speech and text triage models grounded in verified medical taxonomy.',
      'Patients can speak or type their concerns in their regional language, and the system translates key symptom timelines into standard medical terminology for the doctor review screen.',
      'This eliminates repetitive data collection during valuable clinic minutes, allowing the doctor to focus entirely on physical diagnosis and patient empathy.'
    ],
    author: 'Shaik Afriz',
    authorRole: 'CEO & CTO',
    publishedAt: 'August 14, 2026',
    readTime: '5 min read',
    imageUrl: newsConsultationImg,
    tags: ['AI Triage', 'Multilingual Health', 'Doctor Productivity']
  },
  {
    id: 'news-6',
    title: 'Zero Medicine Stockouts: Real-Time Local Pharmacy Inventory Telemetry',
    slug: 'zero-medicine-stockouts',
    category: 'Product Roadmap',
    summary: 'Connecting licensed neighborhood chemists with real-time digital prescription dispatch to guarantee medicine availability for chronic care patients.',
    content: [
      'Chronic disease patients often struggle when searching across multiple pharmacies for specific antihypertensive or antidiabetic formulations.',
      'MediTrust connects local pharmacies via a low-latency inventory sync. When a patient receives a prescription, nearby chemists with active stock are immediately highlighted.',
      'Chemists can pre-pack the verified medications, enabling fast pickup or doorstep delivery with automated digital tax invoices.'
    ],
    author: 'B. Nandini',
    authorRole: 'Co-Founder & Operations Lead',
    publishedAt: 'July 30, 2026',
    readTime: '4 min read',
    imageUrl: newsPharmacyDispensaryImg,
    tags: ['Pharmacy Tech', 'Supply Chain', 'Chronic Care']
  }
];

const CATEGORIES = ['All', 'Product Roadmap', 'Clinical Engineering', 'Regulatory & ABDM', 'Community Care'];

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<EditorialArticle | null>(null);

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesQuery = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const featuredArticle = ARTICLES.find(a => a.featured) || ARTICLES[0];

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#101515] py-16 px-4 sm:px-6 lg:px-8 selection:bg-teal-100">
      <SEO
        title="News & Press Releases | Medynex Solutions LLP"
        description="Official press releases, product roadmap updates, clinical engineering whitepapers, and healthcare technology announcements from Medynex Solutions LLP."
        canonicalUrl="https://medynex.com/news"
        keywords={['Medynex news', 'MediTrust press release', 'ABDM updates', 'healthcare tech news India', 'Shaik Afriz']}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F1] border border-[#DCEFEA] text-[#0E6763] text-xs font-semibold">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Medynex Newsroom & Press Journal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#101515] tracking-tight">
            Latest News & Press Releases
          </h1>
          <p className="text-base sm:text-lg text-[#505755] leading-relaxed font-normal">
            Official announcements, engineering whitepapers, and clinical healthcare updates from Medynex Solutions LLP and the MediTrust platform.
          </p>
        </div>

        {/* Featured Hero Story */}
        {featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-white border border-[#E7EAE7] overflow-hidden shadow-sm hover:border-[#0E6763]/50 transition-all grid grid-cols-1 lg:grid-cols-12 group"
          >
            {/* Visual Image */}
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-900">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = newsAbdmImg;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-white/20">
                  Featured Release
                </span>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Clean Typographic Metadata */}
                <div className="flex items-center gap-2 text-xs text-[#737A78]">
                  <span className="font-semibold text-[#0E6763]">{featuredArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredArticle.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101515] tracking-tight leading-tight group-hover:text-[#0E6763] transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm text-[#505755] leading-relaxed">
                  {featuredArticle.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {featuredArticle.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] font-medium text-[#737A78] bg-[#F7F8F6] border border-[#E7EAE7] px-2.5 py-1 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & Action */}
              <div className="pt-6 border-t border-[#E7EAE7] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#101515]">{featuredArticle.author}</div>
                  <div className="text-[11px] text-[#737A78]">{featuredArticle.authorRole}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArticle(featuredArticle)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#101515] hover:bg-[#0E6763] text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search & Category Filter Navigation */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4 border-t border-[#E7EAE7]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-[#E7EAE7] shadow-2xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#101515] text-white shadow-xs'
                    : 'text-[#737A78] hover:text-[#101515] hover:bg-[#F7F8F6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737A78]" />
            <input
              type="text"
              id="input-news-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news & press..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E7EAE7] text-xs text-[#101515] placeholder:text-[#737A78] focus:outline-none focus:border-[#0E6763] transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737A78]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-white border border-[#E7EAE7] overflow-hidden shadow-xs hover:shadow-md hover:border-[#0E6763]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-slate-900 relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = newsAbdmImg;
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] font-mono font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-2 text-xs text-[#737A78]">
                    <span>{article.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#101515] leading-snug group-hover:text-[#0E6763] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#505755] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-4 border-t border-[#E7EAE7] flex items-center justify-between text-xs">
                <span className="text-[#737A78] font-medium">By {article.author}</span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className="text-[#0E6763] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Media & Press Office Contact Box */}
        <div className="rounded-3xl bg-[#101515] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#263737] shadow-xl">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#85D3CB]">
              MEDIA & COMMUNICATIONS DESK
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Press Enquiries & Official Statements
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              For press inquiries, editorial interviews, or verified company documentation from Medynex Solutions LLP, connect directly with our communications office.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="mailto:medynexsolutions26@gmail.com"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0E6763] hover:bg-[#2B9A91] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Press Desk</span>
            </a>
          </div>
        </div>

      </div>

      {/* Article Detail Reading Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
            >
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute right-6 top-6 p-2 rounded-full text-[#737A78] hover:text-[#101515] hover:bg-[#F7F8F6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#737A78]">
                  <span className="font-semibold text-[#0E6763]">{activeArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101515] tracking-tight leading-tight">
                  {activeArticle.title}
                </h2>
                <div className="text-xs text-[#737A78] pt-1">
                  Author: <strong className="text-[#101515]">{activeArticle.author}</strong> ({activeArticle.authorRole})
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900">
                <img 
                  src={activeArticle.imageUrl} 
                  alt={activeArticle.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = newsAbdmImg;
                  }}
                />
              </div>

              <div className="space-y-4 text-sm text-[#505755] leading-relaxed border-t border-[#E7EAE7] pt-4">
                {activeArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E7EAE7]">
                {activeArticle.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-medium text-[#737A78] bg-[#F7F8F6] border border-[#E7EAE7] px-3 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-[#737A78]">Medynex Solutions LLP © 2026</span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#101515] hover:bg-[#0E6763] text-white font-bold text-xs transition-colors"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
