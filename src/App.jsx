import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileTabBar from './components/MobileTabBar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ChatWidget from './components/ChatWidget';
import DoctorModal from './components/DoctorModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import { SiteContentProvider } from './context/SiteContentContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';

  const handleSelectDoctor = (id) => {
    setSelectedDoctorId(id);
  };

  const handleCloseDoctorModal = () => {
    setSelectedDoctorId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      <ScrollToTop />
      {!isAdminRoute && <Header />}

      <div style={{ flex: 1, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        <Routes>
          <Route path="/" element={<HomePage onSelectDoctor={handleSelectDoctor} />} />
          <Route path="/about" element={<AboutPage onSelectDoctor={handleSelectDoctor} />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>

      <DoctorModal doctorId={selectedDoctorId} onClose={handleCloseDoctorModal} />
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileTabBar />}
      {!isAdminRoute && <FloatingWhatsApp />}
      {!isAdminRoute && <ChatWidget />}
    </div>
  );
}

export default function App() {
  return (
    <SiteContentProvider>
      <MainLayout />
    </SiteContentProvider>
  );
}
