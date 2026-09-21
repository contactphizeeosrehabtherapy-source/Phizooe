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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleSelectDoctor = (id) => {
    setSelectedDoctorId(id);
  };

  const handleCloseDoctorModal = () => {
    setSelectedDoctorId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      <ScrollToTop />
      <Header />

      <div style={{ flex: 1, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        <Routes>
          <Route path="/" element={<HomePage onSelectDoctor={handleSelectDoctor} />} />
          <Route path="/about" element={<AboutPage onSelectDoctor={handleSelectDoctor} />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      <DoctorModal doctorId={selectedDoctorId} onClose={handleCloseDoctorModal} />
      <Footer />
      <MobileTabBar />
      <FloatingWhatsApp />
      <ChatWidget />
    </div>
  );
}
