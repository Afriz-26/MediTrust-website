import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Newspaper, ArrowRight, Calendar, Clock } from 'lucide-react';

// Local High-Resolution Healthcare News Assets
import newsAbdmImg from '../../assets/images/news_abdm_health_1790873696454.jpg';
import newsOpdQueueImg from '../../assets/images/news_opd_queue_1790873710348.jpg';
import newsQrRxImg from '../../assets/images/news_qr_rx_1790873724556.jpg';

const HIGHLIGHT_STORIES = [
  {
    id: 'news-1',
    title: 'Medynex Solutions LLP Unveils MediTrust 2.0 Ecosystem for Seamless ABDM Integration',
    category: 'Product Roadmap',
    summary: 'Connecting hospitals, clinical OPDs, licensed pharmacies, and diagnostic laboratories into a unified Ayushman Bharat Digital Mission (ABDM) network.',
    date: 'October 1, 2026',
    readTime: '4 min read',
    image: newsAbdmImg
  },
  {
    id: 'news-2',
    title: 'How Dynamic Queue Management Solves the Indian Outpatient Waiting Crisis',
    category: 'Clinical Engineering',
    summary: 'An architectural deep-dive into the live queue token algorithm that notifies patients in real-time, staggering hospital arrivals and curbing waiting room crowding.',
    date: 'September 24, 2026',
    readTime: '6 min read',
    image: newsOpdQueueImg
  },
  {
    id: 'news-3',
    title: 'Ending Prescription Handwriting Errors: The Cryptographic QR Standard',
    category: 'Regulatory & ABDM',
    summary: 'Why digital prescriptions with tamper-proof QR codes are critical for eliminating drug dispensing mistakes and preventing counterfeit medicine distribution.',
    date: 'September 12, 2026',
    readTime: '5 min read',
    image: newsQrRxImg
  }
];

export const LatestNewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#F8FAFC] border-t border-slate-200 relative selection:bg-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3.5 py-1.5 rounded-full">
              <Newspaper className="w-3.5 h-3.5 text-teal-600" />
              <span>Media & Editorial Updates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Latest News & Press Releases
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Official announcements, clinical architecture whitepapers, and health-tech updates from Medynex Solutions LLP.
            </p>
          </div>

          <Link
            to="/news"
            id="btn-home-view-all-news"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0E6763] hover:text-[#167873] transition-colors shrink-0 group self-start md:self-auto"
          >
            <span>View All Press Releases</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HIGHLIGHT_STORIES.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-slate-900 relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = newsAbdmImg;
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] font-mono font-semibold">
                      {story.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{story.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-teal-800 transition-colors">
                    {story.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {story.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/news"
                  className="text-xs font-bold text-[#0E6763] hover:text-[#167873] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Press Release</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
