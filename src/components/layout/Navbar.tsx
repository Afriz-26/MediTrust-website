import React, { useState } from 'react';
import { Link, useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  ChevronDown, 
  Menu, 
  X, 
  User as UserIcon, 
  Bot, 
  Stethoscope, 
  Building2, 
  Pill, 
  FlaskConical, 
  ShieldCheck, 
  LogOut,
  Sparkles,
  LayoutDashboard,
  MapPin,
  Globe,
  Bell,
  Palette
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import { useLanguage } from '../../context/LanguageContext';
import { useHealthcare } from '../../context/HealthcareContext';
import { useTheme } from '../../context/ThemeContext';
import { Logo } from '../common/Logo';
import { LocationSelectorModal } from '../modals/LocationSelectorModal';
import { LanguageSelectorModal } from '../modals/LanguageSelectorModal';
import { NotificationBellModal } from '../modals/NotificationBellModal';
import { ThemeSelectorModal } from '../modals/ThemeSelectorModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // Scroll direction state for hide on scroll down, show on scroll up
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 80 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const routerLocation = useRouterLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { location, setIsLocationModalOpen } = useLocation();
  const { language, t } = useLanguage();
  const { notifications } = useHealthcare();
  const { activeTheme, isThemeModalOpen, setIsThemeModalOpen } = useTheme();

  const unreadCount = notifications.filter(n => !n.read).length;

  const isLinkActive = (path: string) => routerLocation.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'patient': return '/dashboards/patient';
      case 'doctor': return '/dashboards/doctor';
      case 'pharmacy': return '/dashboards/pharmacy';
      case 'admin': return '/dashboards/admin';
      default: return '/dashboards/patient';
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-transform duration-300 shadow-xs ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-2">
            
            {/* Logo & Location Bar */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3 group" id="nav-brand-logo">
                <Logo size="md" theme="light" />
              </Link>

              {/* Location Pill */}
              <button
                onClick={() => setIsLocationModalOpen(true)}
                id="btn-nav-location"
                title="Change Healthcare Search Location"
                className="hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100/80 text-xs font-semibold transition-all shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span className="max-w-[130px] truncate">{location.city || 'Hyderabad'}, {location.state?.substring(0, 2).toUpperCase() || 'TS'}</span>
                <ChevronDown className="w-3 h-3 text-blue-600" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1" id="desktop-nav-menu">
              <Link 
                to="/" 
                id="nav-home"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isLinkActive('/') ? 'text-blue-600 bg-blue-50 font-semibold border border-blue-200/60' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              {/* About Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button 
                  id="nav-about-dropdown"
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                >
                  <span>About</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                {aboutDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50">
                    <Link 
                      to="/about-medynex" 
                      id="nav-about-medynex"
                      className="block px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <div className="font-semibold text-slate-900">About Medynex</div>
                      <div className="text-xs text-slate-500">The company behind MediTrust</div>
                    </Link>
                    <Link 
                      to="/about-meditrust" 
                      id="nav-about-meditrust"
                      className="block px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-blue-700 hover:bg-blue-50 mt-1"
                    >
                      <div className="font-semibold text-slate-900">About MediTrust</div>
                      <div className="text-xs text-slate-500">Ecosystem Architecture</div>
                    </Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <Link to="/founder" id="nav-founder" className="block px-3 py-2 rounded-xl text-sm text-slate-700 hover:text-blue-600 hover:bg-slate-50">Founder Profile</Link>
                    <Link to="/co-founder" id="nav-cofounder" className="block px-3 py-2 rounded-xl text-sm text-slate-700 hover:text-blue-600 hover:bg-slate-50">Co-Founder Profile</Link>
                    <Link to="/team" id="nav-team" className="block px-3 py-2 rounded-xl text-sm text-blue-600 font-semibold hover:bg-blue-50">Join Our Team (Hiring)</Link>
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button 
                  id="nav-services-dropdown"
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                >
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                {servicesDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50">
                    <Link to="/services" id="nav-all-services" className="block px-3 py-2 rounded-xl text-sm font-semibold text-blue-600 hover:bg-blue-50">All Solutions Overview</Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <Link to="/how-it-works" id="nav-how-it-works" className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-blue-600 font-semibold hover:bg-blue-50">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>How It Works (Guide)</span>
                    </Link>
                    <Link to="/doctors" id="nav-doctors" className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:text-blue-600 hover:bg-slate-50">
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      <span>{t('findDoctors', 'Doctors & Consultations')}</span>
                    </Link>
                    <Link to="/medicines" id="nav-medicines" className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:text-blue-600 hover:bg-slate-50">
                      <Pill className="w-4 h-4 text-emerald-600" />
                      <span>Medicines & Online Ordering</span>
                    </Link>
                    <Link to="/pharmacies" id="nav-pharmacies" className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:text-blue-600 hover:bg-slate-50">
                      <Building2 className="w-4 h-4 text-amber-600" />
                      <span>{t('findPharmacies', 'Pharmacies Directory')}</span>
                    </Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <Link to="/for-doctors" id="nav-for-doctors" className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-50">
                      <span>Join as Doctor / Clinic</span>
                    </Link>
                    <Link to="/for-pharmacies" id="nav-for-pharmacies" className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-50">
                      <span>Join as Licensed Pharmacy</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/why-meditrust" id="nav-why-meditrust" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Why MediTrust</Link>
              
              {/* AI Assistant Link with Badge */}
              <Link 
                to="/ai-assistant" 
                id="nav-ai-assistant"
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-blue-700 hover:text-blue-800 bg-blue-50 border border-blue-200/80 flex items-center gap-1.5"
              >
                <Bot className="w-4 h-4 text-blue-600" />
                <span>AI Assistant</span>
              </Link>

              <Link to="/news" id="nav-news" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">News</Link>
              <Link to="/contact" id="nav-contact" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Contact</Link>
            </nav>

            {/* Right Controls: Theme Accent + Language Pill + Notification Bell + Dashboard/Auth */}
            <div className="hidden lg:flex items-center space-x-2.5" id="desktop-user-actions">
              
              {/* Theme Accent Selector Button */}
              <button
                onClick={() => setIsThemeModalOpen(true)}
                id="btn-nav-theme"
                title="Customize Interface Theme Accent Color"
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors group"
              >
                <Palette className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-800" />
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full shadow-xs" style={{ backgroundColor: activeTheme.hex }}></span>
                  <span className="text-slate-800 font-medium">{activeTheme.name}</span>
                </span>
              </button>

              {/* Language Pill */}
              <button
                onClick={() => setIsLangModalOpen(true)}
                id="btn-nav-language"
                title="Change Platform Language"
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span className="uppercase font-mono font-bold text-slate-800">{language}</span>
              </button>

              {/* Notification Bell */}
              <button
                onClick={() => setIsNotifOpen(true)}
                id="btn-nav-notifications"
                title="View Provider Onboarding Alerts"
                className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <Link 
                    to={getDashboardPath()} 
                    id="nav-go-dashboard"
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 flex items-center space-x-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="capitalize">{user.role} Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    id="btn-nav-logout"
                    title="Sign Out"
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    id="btn-nav-login"
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    id="btn-nav-register"
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex xl:hidden items-center space-x-2">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center"
              >
                <MapPin className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsNotifOpen(true)}
                className="relative p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-600"></span>}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="btn-mobile-menu-toggle"
                className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setIsThemeModalOpen(true); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-xl bg-slate-100 text-slate-800 text-sm flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-slate-500" />
                  <span>Theme Accent</span>
                </span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeTheme.hex }}></span>
              </button>

              <button
                onClick={() => { setIsLangModalOpen(true); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-xl bg-slate-100 text-slate-800 text-sm flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Lang: {language.toUpperCase()}</span>
                </span>
                <span className="text-xs text-blue-600 font-bold">Change</span>
              </button>
            </div>

            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-slate-100">Home</Link>
            <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-blue-600 font-semibold hover:bg-blue-50">How It Works (Guide)</Link>
            
            <div className="px-3 py-1 text-xs font-semibold uppercase text-slate-400 font-mono tracking-wider">Services & Portals</div>
            <Link to="/doctors" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-100">{t('findDoctors', 'Find Doctors')}</Link>
            <Link to="/medicines" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-100">Search & Order Medicines</Link>
            <Link to="/pharmacies" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-100">{t('findPharmacies', 'Pharmacies Directory')}</Link>
            <Link to="/for-doctors" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100">Join as Doctor</Link>
            <Link to="/for-pharmacies" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100">Join as Pharmacy</Link>
            <Link to="/ai-assistant" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 rounded-lg text-sm text-blue-600 font-semibold hover:bg-blue-50">AI Health Assistant</Link>

            <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2">
              {user ? (
                <>
                  <Link 
                    to={getDashboardPath()} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white"
                  >
                    Go to {user.role} Dashboard
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full text-center py-2 rounded-xl text-sm text-rose-600 bg-rose-50 border border-rose-200 font-semibold"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-center py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-800 hover:bg-slate-200"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-center py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <LocationSelectorModal />
      <LanguageSelectorModal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)} />
      <NotificationBellModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <ThemeSelectorModal isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} />
    </>
  );
};

