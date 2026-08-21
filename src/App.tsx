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

// Pages
import { HomePage } from './pages/HomePage';
import { AboutMedynexPage } from './pages/AboutMedynexPage';
import { AboutMediTrustPage } from './pages/AboutMediTrustPage';
import { FounderPage } from './pages/FounderPage';
import { CoFounderPage } from './pages/CoFounderPage';
import { ServicesPage } from './pages/ServicesPage';
import { WhyMediTrustPage } from './pages/WhyMediTrustPage';
import { TeamPage } from './pages/TeamPage';
import { DoctorSearchPage } from './pages/DoctorSearchPage';
import { PharmacySearchPage } from './pages/PharmacySearchPage';
import { MedicineSearchPage } from './pages/MedicineSearchPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ForDoctorsPage } from './pages/ForDoctorsPage';
import { ForPharmaciesPage } from './pages/ForPharmaciesPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { NewsPage } from './pages/NewsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { LocationDirectoryPage } from './pages/LocationDirectoryPage';
import { LocationSpecificPage } from './pages/LocationSpecificPage';
import { CareersPage } from './pages/CareersPage';
import { InternshipPage } from './pages/InternshipPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

// Dashboards
import { PatientDashboard } from './pages/dashboards/PatientDashboard';
import { DoctorDashboard } from './pages/dashboards/DoctorDashboard';
import { PharmacyDashboard } from './pages/dashboards/PharmacyDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

import { ServerErrorPage } from './pages/errors/ServerErrorPage';
import { UnauthorizedPage } from './pages/errors/UnauthorizedPage';
import { NotFoundPage } from './pages/errors/NotFoundPage';
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
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <LocationProvider>
            <HealthcareProvider>
              <Router>
                <ScrollToTop />
                <AnalyticsTracker />
                <div className="flex flex-col min-h-screen bg-[#F7F8F6] text-[#101515] font-sans selection:bg-[#0E6763] selection:text-white">
                  <Navbar />
                  <main className="flex-grow">
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
                      <Route path="/pharmacies" element={<PharmacySearchPage />} />
                      <Route path="/medicines" element={<MedicineSearchPage />} />
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
                  </main>
                  <Footer />
                </div>
              </Router>
            </HealthcareProvider>
          </LocationProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
