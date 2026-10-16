import React, { useState, useEffect, useRef } from 'react';
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

// ─────────────────────────────────────────────────────────────────────────────
// 🚧 MAINTENANCE MODE — set to true to show the maintenance page, false to go live
const MAINTENANCE_MODE = true;
// ─────────────────────────────────────────────────────────────────────────────

function MaintenancePage() {
  const canvasRef = useRef(null);
  const [time, setTime] = useState({ h: '06', m: '00', s: '00' });
  const endRef = useRef(Date.now() + 6 * 3600 * 1000);

  // Countdown
  useEffect(() => {
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const diff = endRef.current - Date.now();
      if (diff <= 0) { setTime({ h: '00', m: '00', s: '00' }); return; }
      setTime({
        h: pad(Math.floor(diff / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const COLORS = ['#2DD4BF', '#818CF8', '#F472B6', '#34D399'];
    let W, H, pts = [], raf;
    const rand = (a, b) => Math.random() * (b - a) + a;
    const mkP = () => ({ x: rand(0, W), y: H + rand(0, 40), r: rand(1, 2.8), speed: rand(0.3, 1.1), op: rand(0.2, 0.65), color: COLORS[0 | rand(0, 4)], dx: rand(-0.4, 0.4) });
    const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 55; i++) { const p = mkP(); p.y = rand(0, H); pts.push(p); }
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.op; ctx.fill();
        p.y -= p.speed; p.x += p.dx; p.op -= 0.0012;
        if (p.y < -10 || p.op <= 0) pts[i] = mkP();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', background: '#060B17', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem', gap: '1.75rem', overflow: 'hidden', fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#E2E8F0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Caveat:wght@600;700&display=swap');
        @keyframes blobFloat { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,60px) scale(1.12); } }
        @keyframes spinA { to { transform: rotate(360deg); } }
        @keyframes spinB { to { transform: rotate(-360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fillBar { to { width: 72%; } }
        @keyframes blink { 50% { opacity: 0.15; } }
        @keyframes pulseDot { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        .mnt-logo { animation: fadeDown 0.8s ease both; }
        .mnt-gear { animation: fadeUp 0.9s ease 0.1s both; }
        .mnt-h1 { animation: fadeUp 0.9s ease 0.2s both; }
        .mnt-sub { animation: fadeUp 0.9s ease 0.3s both; }
        .mnt-cd { animation: fadeUp 0.9s ease 0.4s both; }
        .mnt-bar { animation: fadeUp 0.9s ease 0.5s both; }
        .mnt-status { animation: fadeUp 0.9s ease 0.6s both; }
        .mnt-contact { animation: fadeUp 0.9s ease 0.7s both; }
        .mnt-fill { animation: fillBar 2.5s ease 1s forwards; width: 0; }
        .mnt-colon { animation: blink 1s step-end infinite; }
        .dot-yellow { animation: pulseDot 1.8s ease-in-out infinite; }
        .spin-a { animation: spinA 9s linear infinite; }
        .spin-b { animation: spinB 7s linear infinite; }
        .mnt-card:hover { border-color: rgba(45,212,191,0.4) !important; background: rgba(45,212,191,0.06) !important; }
        .mnt-cd-box:hover { border-color: rgba(45,212,191,0.45) !important; }
        .mnt-link:hover { color: #fff !important; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.001ms !important; } }
      `}</style>

      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      {/* Blobs */}
      <div style={{ position: 'fixed', width: 640, height: 640, borderRadius: '50%', background: '#2DD4BF', filter: 'blur(120px)', opacity: 0.15, top: -200, left: -200, zIndex: 0, animation: 'blobFloat 14s ease-in-out infinite alternate', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: '#818CF8', filter: 'blur(120px)', opacity: 0.15, bottom: -150, right: -150, zIndex: 0, animation: 'blobFloat 18s ease-in-out infinite alternate', animationDelay: '-6s', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', width: 300, height: 300, borderRadius: '50%', background: '#F472B6', filter: 'blur(120px)', opacity: 0.08, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 0, pointerEvents: 'none' }} />

      {/* All content above canvas */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem', width: '100%' }}>

        {/* Logo */}
        <div className="mnt-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#2DD4BF,#818CF8)', borderRadius: 12, display: 'grid', placeItems: 'center', boxShadow: '0 0 24px rgba(45,212,191,0.4)' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21C12 21 3 14 3 8.5a4.5 4.5 0 0 1 9-0.5 4.5 4.5 0 0 1 9 .5C21 14 12 21 12 21z"/>
            </svg>
          </div>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(90deg,#2DD4BF,#818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.5px' }}>PhiZeeo</span>
        </div>

        {/* Gears */}
        <div className="mnt-gear" style={{ position: 'relative', width: 110, height: 110 }}>
          <div className="spin-a" style={{ position: 'absolute', inset: 0 }}>
            <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
              <path d="M50 5 L54 0 L62 0 L66 5 A45 45 0 0 1 82 18 L87 13 L93 19 L88 24 A45 45 0 0 1 95 40 L100 40 L100 60 L95 60 A45 45 0 0 1 88 76 L93 81 L87 87 L82 82 A45 45 0 0 1 66 95 L62 100 L54 100 L50 95 A45 45 0 0 1 34 95 L30 100 L22 100 L18 95 A45 45 0 0 1 2 82 L-3 87 L-9 81 L-4 76 A45 45 0 0 1 -11 60 L-16 60 L-16 40 L-11 40 A45 45 0 0 1 -4 24 L-9 19 L-3 13 L2 18 A45 45 0 0 1 18 5 L22 0 L30 0 L34 5 A45 45 0 0 1 50 5Z" stroke="#2DD4BF" strokeWidth="1.4"/>
              <circle cx="50" cy="50" r="22" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
            </svg>
          </div>
          <div className="spin-b" style={{ position: 'absolute', inset: 20 }}>
            <svg viewBox="0 0 60 60" fill="none" width="100%" height="100%">
              <path d="M30 3 L33 0 L39 0 L42 3 A27 27 0 0 1 51 12 L54 9 L58 13 L55 16 A27 27 0 0 1 57 24 L60 24 L60 36 L57 36 A27 27 0 0 1 55 44 L58 47 L54 51 L51 48 A27 27 0 0 1 42 57 L39 60 L33 60 L30 57 A27 27 0 0 1 18 57 L15 60 L9 60 L6 57 A27 27 0 0 1 -3 48 L-6 51 L-10 47 L-7 44 A27 27 0 0 1 -9 36 L-12 36 L-12 24 L-9 24 A27 27 0 0 1 -7 16 L-10 13 L-6 9 L-3 12 A27 27 0 0 1 6 3 L9 0 L15 0 L18 3 A27 27 0 0 1 30 3Z" stroke="#818CF8" strokeWidth="1.4"/>
              <circle cx="30" cy="30" r="10" stroke="#818CF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
            </svg>
          </div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 22, height: 22, background: 'linear-gradient(135deg,#2DD4BF,#818CF8)', borderRadius: '50%', boxShadow: '0 0 18px rgba(45,212,191,0.7)' }} />
        </div>

        {/* Heading */}
        <h1 className="mnt-h1" style={{ fontSize: 'clamp(1.75rem,5vw,3rem)', fontWeight: 800, lineHeight: 1.15, textAlign: 'center', letterSpacing: '-0.5px', margin: 0 }}>
          We're{' '}
          <span style={{ background: 'linear-gradient(90deg,#2DD4BF,#818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Upgrading</span>
          {' '}for You
        </h1>

        <p className="mnt-sub" style={{ fontSize: '0.97rem', color: '#64748B', textAlign: 'center', maxWidth: 400, lineHeight: 1.65, margin: 0 }}>
          Our team is working hard behind the scenes to bring you a better experience.<br />
          <em style={{ color: '#E2E8F0', fontFamily: "'Caveat', cursive", fontSize: '1.1rem' }}>We Treat. God Heals.</em>
        </p>

        {/* Countdown */}
        <div className="mnt-cd" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {[['cd-h', time.h, 'Hours'], ['cd-m', time.m, 'Mins'], ['cd-s', time.s, 'Secs']].reduce((acc, [key, val, label], i) => {
            if (i > 0) acc.push(<span key={`col${i}`} className="mnt-colon" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#64748B', alignSelf: 'center', marginTop: '-1rem' }}>:</span>);
            acc.push(
              <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                <div className="mnt-cd-box" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, width: 70, height: 70, display: 'grid', placeItems: 'center', fontSize: '1.9rem', fontWeight: 800, color: '#fff', backdropFilter: 'blur(12px)', transition: 'border-color 0.3s', cursor: 'default' }}>{val}</div>
                <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>{label}</span>
              </div>
            );
            return acc;
          }, [])}
        </div>

        {/* Progress */}
        <div className="mnt-bar" style={{ width: '100%', maxWidth: 390 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '0.06em' }}>
            <span>Maintenance Progress</span><span>72%</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
            <div className="mnt-fill" style={{ height: '100%', background: 'linear-gradient(90deg,#2DD4BF,#818CF8)', borderRadius: 99, boxShadow: '0 0 10px rgba(45,212,191,0.5)' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.7rem', justifyContent: 'center' }}>
            {['#818CF8','#818CF8','#818CF8','#2DD4BF','rgba(255,255,255,0.08)'].map((bg, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: bg }} />
            ))}
          </div>
        </div>

        {/* Status cards */}
        <div className="mnt-status" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'Database Backup', dot: '#34D399', shadow: '#34D399', pulse: false },
            { label: 'Core Upgrade',    dot: '#FBBF24', shadow: '#FBBF24', pulse: true },
            { label: 'UI Refresh',      dot: '#818CF8', shadow: '#818CF8', pulse: false },
          ].map(({ label, dot, shadow, pulse }) => (
            <div key={label} className="mnt-card" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0.55rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: '#E2E8F0', backdropFilter: 'blur(8px)', cursor: 'default', transition: 'border-color 0.3s, background 0.3s' }}>
              <div className={pulse ? 'dot-yellow' : ''} style={{ width: 8, height: 8, borderRadius: '50%', background: dot, boxShadow: `0 0 8px ${shadow}`, flexShrink: 0 }} />
              {label}
            </div>
          ))}
        </div>

        {/* Contact */}
        <p className="mnt-contact" style={{ fontSize: '0.83rem', color: '#64748B', textAlign: 'center', margin: 0 }}>
          Urgent? Call{' '}
          <a href="tel:+919360447385" className="mnt-link" style={{ color: '#2DD4BF', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}>+91 93604 47385</a>
          {' '}or{' '}
          <a href="https://www.instagram.com/phizeeo" target="_blank" rel="noopener noreferrer" className="mnt-link" style={{ color: '#2DD4BF', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}>Instagram</a>
        </p>

      </div>
    </div>
  );
}

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
  if (MAINTENANCE_MODE) return <MaintenancePage />;
  return (
    <SiteContentProvider>
      <MainLayout />
    </SiteContentProvider>
  );
}
