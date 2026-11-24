import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { LanguageProvider } from './context/LanguageContext';
import { HealthcareProvider } from './context/HealthcareContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Load route-specific code only when the page is visited.
const HomePage = React.lazy(() => import('./pages/HomePage').then(({ HomePage }) => ({ default: HomePage })));
const AboutMedynexPage = React.lazy(() => import('./pages/AboutMedynexPage').then(({ AboutMedynexPage }) => ({ default: AboutMedynexPage })));
const AboutMediTrustPage = React.lazy(() => import('./pages/AboutMediTrustPage').then(({ AboutMediTrustPage }) => ({ default: AboutMediTrustPage })));
const FounderPage = React.lazy(() => import('./pages/FounderPage').then(({ FounderPage }) => ({ default: FounderPage })));
const CoFounderPage = React.lazy(() => import('./pages/CoFounderPage').then(({ CoFounderPage }) => ({ default: CoFounderPage })));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage').then(({ ServicesPage }) => ({ default: ServicesPage })));
const WhyMediTrustPage = React.lazy(() => import('./pages/WhyMediTrustPage').then(({ WhyMediTrustPage }) => ({ default: WhyMediTrustPage })));
const TeamPage = React.lazy(() => import('./pages/TeamPage').then(({ TeamPage }) => ({ default: TeamPage })));
const DoctorSearchPage = React.lazy(() => import('./pages/DoctorSearchPage').then(({ DoctorSearchPage }) => ({ default: DoctorSearchPage })));
const PharmacySearchPage = React.lazy(() => import('./pages/PharmacySearchPage').then(({ PharmacySearchPage }) => ({ default: PharmacySearchPage })));
const HospitalSearchPage = React.lazy(() => import('./pages/HospitalSearchPage').then(({ HospitalSearchPage }) => ({ default: HospitalSearchPage })));
const LabSearchPage = React.lazy(() => import('./pages/LabSearchPage').then(({ LabSearchPage }) => ({ default: LabSearchPage })));
const MedicineSearchPage = React.lazy(() => import('./pages/MedicineSearchPage').then(({ MedicineSearchPage }) => ({ default: MedicineSearchPage })));
const HowItWorksPage = React.lazy(() => import('./pages/HowItWorksPage').then(({ HowItWorksPage }) => ({ default: HowItWorksPage })));
const ForDoctorsPage = React.lazy(() => import('./pages/ForDoctorsPage').then(({ ForDoctorsPage }) => ({ default: ForDoctorsPage })));
const ForPharmaciesPage = React.lazy(() => import('./pages/ForPharmaciesPage').then(({ ForPharmaciesPage }) => ({ default: ForPharmaciesPage })));
const AiAssistantPage = React.lazy(() => import('./pages/AiAssistantPage').then(({ AiAssistantPage }) => ({ default: AiAssistantPage })));
const NewsPage = React.lazy(() => import('./pages/NewsPage').then(({ NewsPage }) => ({ default: NewsPage })));
const BlogPage = React.lazy(() => import('./pages/BlogPage').then(({ BlogPage }) => ({ default: BlogPage })));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage').then(({ BlogPostPage }) => ({ default: BlogPostPage })));
const LocationDirectoryPage = React.lazy(() => import('./pages/LocationDirectoryPage').then(({ LocationDirectoryPage }) => ({ default: LocationDirectoryPage })));
const LocationSpecificPage = React.lazy(() => import('./pages/LocationSpecificPage').then(({ LocationSpecificPage }) => ({ default: LocationSpecificPage })));
const CareersPage = React.lazy(() => import('./pages/CareersPage').then(({ CareersPage }) => ({ default: CareersPage })));
const InternshipPage = React.lazy(() => import('./pages/InternshipPage').then(({ InternshipPage }) => ({ default: InternshipPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(({ ContactPage }) => ({ default: ContactPage })));
const LoginPage = React.lazy(() => import('./pages/LoginPage').then(({ LoginPage }) => ({ default: LoginPage })));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage').then(({ RegisterPage }) => ({ default: RegisterPage })));
const AdminLoginPage = React.lazy(() => import('./pages/AdminLoginPage').then(({ AdminLoginPage }) => ({ default: AdminLoginPage })));
const PatientDashboard = React.lazy(() => import('./pages/dashboards/PatientDashboard').then(({ PatientDashboard }) => ({ default: PatientDashboard })));
const DoctorDashboard = React.lazy(() => import('./pages/dashboards/DoctorDashboard').then(({ DoctorDashboard }) => ({ default: DoctorDashboard })));
const PharmacyDashboard = React.lazy(() => import('./pages/dashboards/PharmacyDashboard').then(({ PharmacyDashboard }) => ({ default: PharmacyDashboard })));
const AdminDashboard = React.lazy(() => import('./pages/dashboards/AdminDashboard').then(({ AdminDashboard }) => ({ default: AdminDashboard })));
const ServerErrorPage = React.lazy(() => import('./pages/errors/ServerErrorPage').then(({ ServerErrorPage }) => ({ default: ServerErrorPage })));
const UnauthorizedPage = React.lazy(() => import('./pages/errors/UnauthorizedPage').then(({ UnauthorizedPage }) => ({ default: UnauthorizedPage })));
const NotFoundPage = React.lazy(() => import('./pages/errors/NotFoundPage').then(({ NotFoundPage }) => ({ default: NotFoundPage })));
import { AnalyticsTracker } from './lib/analytics';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <AuthProvider>
        <LanguageProvider>
          <LocationProvider>
            <HealthcareProvider>
              <Router>
                <ThemeProvider>
                <ScrollToTop />
                <AnalyticsTracker />
                <div className="flex flex-col min-h-screen bg-[#F7F8F6] text-[#101515] font-sans selection:bg-teal-brand selection:text-white">
                  <Navbar />
                  <main className="flex-grow">
                    <React.Suspense fallback={
                      <div role="status" aria-live="polite" className="flex min-h-[40vh] items-center justify-center text-sm font-medium text-slate-600">
                        Loading page...
                      </div>
                    }>
                    <Routes>
                      {/* Public Gateway Pages */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about-medynex" element={<AboutMedynexPage />} />
                      <Route path="/about-meditrust" element={<AboutMediTrustPage />} />
                      <Route path="/founder" element={<FounderPage />} />
                      <Route path="/co-founder" element={<CoFounderPage />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/why-meditrust" element={<WhyMediTrustPage />} />
                      <Route path="/team" element={<TeamPage />} />
                      <Route path="/doctors" element={<DoctorSearchPage />} />
                      <Route path="/hospitals" element={<HospitalSearchPage />} />
                      <Route path="/hospitals/in/:city" element={<HospitalSearchPage />} />
                      <Route path="/pharmacies" element={<PharmacySearchPage />} />
                      <Route path="/labs" element={<LabSearchPage />} />
                      <Route path="/medicines" element={<MedicineSearchPage />} />
                      <Route path="/medicine-encyclopedia" element={<MedicineSearchPage />} />
                      <Route path="/how-it-works" element={<HowItWorksPage />} />
                      <Route path="/for-doctors" element={<ForDoctorsPage />} />
                      <Route path="/for-pharmacies" element={<ForPharmaciesPage />} />
                      <Route path="/ai-assistant" element={<AiAssistantPage />} />
                      <Route path="/news" element={<NewsPage />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/blog/:slug" element={<BlogPostPage />} />
                      <Route path="/locations" element={<LocationDirectoryPage />} />
                      <Route path="/doctors/in/:city" element={<LocationSpecificPage type="doctors" />} />
                      <Route path="/pharmacies/in/:city" element={<LocationSpecificPage type="pharmacies" />} />
                      <Route path="/careers" element={<CareersPage />} />
                      <Route path="/internship" element={<InternshipPage />} />
                      <Route path="/internships" element={<InternshipPage />} />
                      <Route path="/fellowships" element={<InternshipPage />} />
                      <Route path="/fellowship-internships" element={<InternshipPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/admin/login" element={<AdminLoginPage />} />
                      <Route path="/admin" element={<AdminLoginPage />} />
                      <Route path="/admin-portal" element={<AdminLoginPage />} />

                      {/* Role Protected Dashboards */}
                      <Route 
                        path="/dashboards/patient" 
                        element={
                          <ProtectedRoute allowedRoles={['patient']}>
                            <PatientDashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/dashboards/doctor" 
                        element={
                          <ProtectedRoute allowedRoles={['doctor']}>
                            <DoctorDashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/dashboards/pharmacy" 
                        element={
                          <ProtectedRoute allowedRoles={['pharmacy']}>
                            <PharmacyDashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/dashboards/admin" 
                        element={
                          <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                          </ProtectedRoute>
                        } 
                      />

                      {/* Errors */}
                      <Route path="/403" element={<UnauthorizedPage />} />
                      <Route path="/500" element={<ServerErrorPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    </React.Suspense>
                  </main>
                  <Footer />
                </div>
                </ThemeProvider>
              </Router>
            </HealthcareProvider>
          </LocationProvider>
        </LanguageProvider>
      </AuthProvider>
  );
}

export default App;
