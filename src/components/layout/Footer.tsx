import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  HeartPulse, 
  Linkedin, 
  Github, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Smartphone,
  Apple,
  Lock
} from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0F172A] border-t border-slate-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info & App Stores */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <Logo size="lg" theme="dark" />
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              <strong className="text-white">Innovating Healthcare Across India Through Technology.</strong> Connecting Patients, Doctors, and Pharmacies into one seamless digital ecosystem powered by Medynex Solutions LLP.
            </p>

            {/* Compliance Badges */}
            <div className="pt-1 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> ABDM M1-M3 Compliant
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                <HeartPulse className="w-3.5 h-3.5 mr-1" /> ISO 27001 Security
              </span>
            </div>

            {/* Mobile App Store Badges */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Mobile Apps (Coming Soon in India):</span>
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-2 opacity-90 cursor-not-allowed">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase leading-none">Get it on</div>
                    <div className="text-[11px] font-bold text-white">Google Play Store</div>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-2 opacity-90 cursor-not-allowed">
                  <Apple className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase leading-none">Download on</div>
                    <div className="text-[11px] font-bold text-white">Apple App Store</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Column 1: Company & Leadership */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase font-mono mb-4 text-blue-400">Company</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/about-medynex" className="hover:text-blue-400 transition-colors">About Medynex Solutions</Link></li>
              <li><Link to="/about-meditrust" className="hover:text-blue-400 transition-colors">About MediTrust Platform</Link></li>
              <li><Link to="/founder" className="hover:text-blue-400 transition-colors">Founder (Shaik Afriz)</Link></li>
              <li><Link to="/co-founder" className="hover:text-blue-400 transition-colors">Co-Founder (Bandi Nandini)</Link></li>
              <li><Link to="/team" className="text-emerald-400 font-bold hover:underline">Join Our Team (Hiring!)</Link></li>
              <li><Link to="/news" className="hover:text-blue-400 transition-colors">News & Media Coverage</Link></li>
              <li><Link to="/blog" className="text-slate-300 hover:text-blue-400">Healthcare Guides</Link></li>
              <li><Link to="/careers" className="hover:text-blue-400 transition-colors">Careers & Roles</Link></li>
              <li className="pt-1">
                <Link to="/admin/login" id="footer-admin-login-link" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Admin & Collaborator Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Ecosystem Services */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase font-mono mb-4 text-blue-400">Ecosystem</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/how-it-works" className="text-blue-400 font-semibold hover:underline">How It Works (Guide)</Link></li>
              <li><Link to="/medicines" className="hover:text-white transition-colors">Medicines & Catalog Search</Link></li>
              <li><Link to="/for-doctors" className="hover:text-white transition-colors">For Doctors & Clinics</Link></li>
              <li><Link to="/for-pharmacies" className="hover:text-white transition-colors">For Pharmacies</Link></li>
              <li><Link to="/doctors" className="hover:text-white transition-colors">Find Doctors & OPD Tokens</Link></li>
              <li><Link to="/pharmacies" className="hover:text-white transition-colors">Pharmacies Directory</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-white transition-colors">AI Healthcare Assistant</Link></li>
              <li><Link to="/why-meditrust" className="hover:text-white transition-colors">Why MediTrust Platform</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase font-mono mb-2 text-blue-400">Quick Contact</h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="mailto:medynexsolutions26@gmail.com" className="hover:text-white">medynexsolutions26@gmail.com</a>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="tel:+918328620294" className="hover:text-white">+91 8328620294</a>
              </li>
              <li className="flex items-start space-x-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">Hyderabad & Tirupati, Telangana & Andhra Pradesh, India</span>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-300 block">HealthTech Newsletter:</span>
              {subscribed ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed to Medynex updates!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button type="submit" className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors shrink-0">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons Bar */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-2">Connect With Us:</span>
              <div className="flex items-center space-x-2">
                <a 
                  href="https://linkedin.com/in/shaik-afriz-a49311385" 
                  target="_blank" rel="noreferrer" aria-label="LinkedIn"
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 border border-slate-700 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://github.com/shaik-afriz" 
                  target="_blank" rel="noreferrer" aria-label="GitHub"
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" rel="noreferrer" aria-label="Instagram"
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-pink-600 border border-slate-700 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" rel="noreferrer" aria-label="Twitter X"
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" rel="noreferrer" aria-label="YouTube"
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-red-600 border border-slate-700 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4 pt-2">
          <div>
            © {new Date().getFullYear()} Medynex Solutions LLP. All rights reserved. MediTrust is a registered healthcare technology platform of Medynex Solutions LLP.
          </div>
          <div className="flex flex-wrap items-center space-x-6 text-[11px]">
            <Link to="/contact" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-300">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-300">ABDM Data Security</Link>
            <Link to="/contact" className="hover:text-slate-300">Contact Us</Link>
            <Link to="/admin/login" id="footer-bottom-admin-link" className="text-amber-400/90 hover:text-amber-300 font-mono font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-400" /> Admin Sign In
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
