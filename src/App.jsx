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

// ─────────────────────────────────────────────
// 🚧 Set to true = maintenance page, false = live site
const MAINTENANCE_MODE = true;
// ─────────────────────────────────────────────

function MaintenancePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      fontFamily: 'sans-serif',
      color: '#111',
    }}>
      <img
        src="/zeedr.png"
        alt="PhiZeeo logo"
        style={{ width: 80, marginBottom: '1.5rem' }}
        onError={e => { e.target.style.display = 'none'; }}
      />
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
        🚧 Under Maintenance
      </h1>
      <p style={{ fontSize: '1rem', color: '#555', maxWidth: 380, lineHeight: 1.6, marginBottom: '1.5rem' }}>
        We're making some improvements to serve you better.<br />
        We'll be back shortly!
      </p>
      <p style={{ fontSize: '0.9rem', color: '#888' }}>
        Need help? Call us at{' '}
        <a href="tel:+919360447385" style={{ color: '#E87B2B', fontWeight: 600, textDecoration: 'none' }}>
          +91 93604 47385
        </a>
      </p>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function MainLayout() {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      <ScrollToTop />
      {!isAdminRoute && <Header />}

      <div style={{ flex: 1, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        <Routes>
          <Route path="/" element={<HomePage onSelectDoctor={setSelectedDoctorId} />} />
          <Route path="/about" element={<AboutPage onSelectDoctor={setSelectedDoctorId} />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>

      <DoctorModal doctorId={selectedDoctorId} onClose={() => setSelectedDoctorId(null)} />
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileTabBar />}
      {!isAdminRoute && <FloatingWhatsApp />}
      {!isAdminRoute && <ChatWidget />}
    </div>
  );
}

export default function App() {
  if (MAINTENANCE_MODE) return <MaintenancePage />;
  return (
    <SiteContentProvider>
      <MainLayout />
    </SiteContentProvider>
  );
}
