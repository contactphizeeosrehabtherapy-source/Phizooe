import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Shield, CheckCircle2, Home, Activity, Brain, Zap, Users, HeartPulse, MessageCircle } from 'lucide-react';
import PhysioSpecialists from '../components/PhysioSpecialists';
import WhoWeServe from '../components/WhoWeServe';
import TestimonialCarousel from '../components/TestimonialCarousel';

export default function HomePage({ onSelectDoctor }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.02, rootMargin: '0px 0px -20px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    // Fallback: reveal all elements so mobile scrolling is never delayed
    const timer = setTimeout(() => {
      elements.forEach((el) => el.classList.add('in-view'));
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <main>
      {/* 1. Dark Hero Section */}
      <section className="hero-section bg-dark">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="eyebrow eyebrow-dark">HOME PHYSIOTHERAPY IN CHENNAI</div>
            <h1>Heal Comfortably at <span className="text-orange">Home</span></h1>
            <p className="subtext">
              PhiZeeo is a home physiotherapy and rehabilitation service helping people recover, move better, and live more independently at home.
            </p>

            <div className="hero-cta-group">
              <a 
                href="https://wa.me/919360447385?text=Hi%2C%20I%27d%20like%20to%20book%20a%20home%20physio%20visit." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-lg"
              >
                <MessageCircle size={20} />
                Book Appointment
              </a>
              <Link to="/services" className="btn btn-outline btn-lg">Our Services</Link>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <span className="script-tagline">"We Treat. God Heals."</span>
            </div>

            <div className="trust-badges">
              <div className="trust-item">
                <Star size={18} />
                <span>5-Star Rated on Google</span>
              </div>
              <div className="trust-item">
                <Shield size={18} />
                <span>Home Practice Since 2017</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={18} />
                <span>Personalized Plans</span>
              </div>
            </div>
          </div>

          {/* Hero Media Section */}
          <div className="hero-media">
            <div className="media-frame">
              <svg width="100%" height="100%" viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: '#141618' }}>
                <rect width="600" height="450" fill="#141618"/>
                <circle cx="300" cy="180" r="90" fill="#F28C1B" fillOpacity="0.12"/>
                <path d="M250 200C250 160 270 140 300 140C330 140 350 160 350 200" stroke="#F28C1B" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="300" cy="120" r="30" stroke="#F28C1B" strokeWidth="4"/>
                <path d="M200 320L270 240L330 270L400 210" stroke="#F28C1B" strokeDasharray="8 8" strokeWidth="3"/>
                <rect x="180" y="320" width="240" height="60" rx="12" fill="#1E2024" stroke="#2C2F36" strokeWidth="2"/>
                <text x="300" y="355" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="16" fontWeight="700" textAnchor="middle">[Photo Placeholder: Home Physio Session]</text>
                <text x="300" y="375" fill="#A3A3A3" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Personalized assessment & treatment delivered in your living room</text>
              </svg>
            </div>
            <div className="floating-badge">
              <div className="badge-icon">
                <Home size={22} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '0.95rem', color: '#FFFFFF' }}>Chennai Home Visits</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-dark)' }}>Direct to your doorstep</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro Strip & 3x2 Mini Services Grid */}
      <section className="section-padding bg-cream reveal-on-scroll">
        <div className="container intro-grid">
          <div>
            <div className="eyebrow">OUR SPECIALTIES</div>
            <h2>Comprehensive Physio Care, <span className="text-orange">Right at Home</span></h2>
            <p>
              Professional physiotherapy and rehabilitation delivered at the patient's home. No travel stress, no waiting rooms—just focused, one-on-one care tailored around your daily routine.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/services" className="btn btn-primary">Explore All Services</Link>
            </div>
          </div>

          <div className="intro-cards-grid">
            <div className="card" style={{ padding: '1.5rem' }}>
              <Home size={28} style={{ color: 'var(--color-orange)', marginBottom: '0.85rem' }} />
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>Home Visit Physio</h4>
              <p style={{ fontSize: '0.85rem' }}>Professional treatment delivered at your home</p>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <Activity size={28} style={{ color: 'var(--color-orange)', marginBottom: '0.85rem' }} />
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>Orthopedic Rehab</h4>
              <p style={{ fontSize: '0.85rem' }}>Pain relief and mobility recovery for joints & spine</p>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <Brain size={28} style={{ color: 'var(--color-orange)', marginBottom: '0.85rem' }} />
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>Neuro Rehabilitation</h4>
              <p style={{ fontSize: '0.85rem' }}>Stroke, paralysis and neurological recovery programs</p>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <Zap size={28} style={{ color: 'var(--color-orange)', marginBottom: '0.85rem' }} />
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>Sports Injury Rehab</h4>
              <p style={{ fontSize: '0.85rem' }}>Injury recovery and performance training for athletes</p>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <Users size={28} style={{ color: 'var(--color-orange)', marginBottom: '0.85rem' }} />
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>Pediatric & Geriatric</h4>
              <p style={{ fontSize: '0.85rem' }}>Specialized care for children and elderly patients</p>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <HeartPulse size={28} style={{ color: 'var(--color-orange)', marginBottom: '0.85rem' }} />
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>Cardiopulmonary</h4>
              <p style={{ fontSize: '0.85rem' }}>Recovery support for heart and lung conditions</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Physio Specialists Section */}
      <div className="reveal-on-scroll">
        <PhysioSpecialists onSelectDoctor={onSelectDoctor} />
      </div>

      {/* 4. Who We Serve Section */}
      <div className="reveal-on-scroll">
        <WhoWeServe />
      </div>

      {/* 5. Why Choose PhiZeeo Band (Dark) */}
      <section className="section-padding bg-dark reveal-on-scroll">
        <div className="container">
          <div className="section-header text-center">
            <div className="eyebrow eyebrow-dark">CORE PROMISE</div>
            <h2>Professional Rehabilitation. <span className="text-orange">Personal Care. At Home.</span></h2>
            <p>We combine clinical excellence with home convenience to ensure your recovery is smooth, safe, and effective.</p>
          </div>

          <div className="grid-4" style={{ marginBottom: '3rem' }}>
            <div className="card" style={{ backgroundColor: '#161616', borderColor: '#262626', textAlign: 'center', alignItems: 'center' }}>
              <div className="card-icon"><Activity size={28} /></div>
              <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.6rem' }}>Assessment-led Care</h3>
              <p style={{ color: 'var(--color-muted-dark)', fontSize: '0.9rem' }}>Thorough physical evaluation before designing your specific movement plan.</p>
            </div>
            <div className="card" style={{ backgroundColor: '#161616', borderColor: '#262626', textAlign: 'center', alignItems: 'center' }}>
              <div className="card-icon"><Shield size={28} /></div>
              <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.6rem' }}>Drug-free & Surgery-less</h3>
              <p style={{ color: 'var(--color-muted-dark)', fontSize: '0.9rem' }}>Natural, movement-focused therapies that eliminate unnecessary interventions.</p>
            </div>
            <div className="card" style={{ backgroundColor: '#161616', borderColor: '#262626', textAlign: 'center', alignItems: 'center' }}>
              <div className="card-icon"><Home size={28} /></div>
              <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.6rem' }}>Expert Home Visits</h3>
              <p style={{ color: 'var(--color-muted-dark)', fontSize: '0.9rem' }}>Experienced physiotherapists delivering one-on-one sessions in your home.</p>
            </div>
            <div className="card" style={{ backgroundColor: '#161616', borderColor: '#262626', textAlign: 'center', alignItems: 'center' }}>
              <div className="card-icon"><CheckCircle2 size={28} /></div>
              <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.6rem' }}>Personalized Recovery</h3>
              <p style={{ color: 'var(--color-muted-dark)', fontSize: '0.9rem' }}>Customized exercise regimens tuned specifically to your age and mobility goals.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a 
              href="https://wa.me/919360447385?text=Hi%2C%20I%27d%20like%20to%20book%20a%20home%20physio%20visit." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-lg"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </section>

      {/* 6. How Treatment Works */}
      <section className="section-padding bg-cream reveal-on-scroll">
        <div className="container">
          <div className="section-header text-center">
            <div className="eyebrow">SIMPLE PROCESS</div>
            <h2>How Treatment <span className="text-orange">Works</span></h2>
            <p>Four easy steps to guide you from initial diagnosis to pain-free mobility.</p>
          </div>

          <div className="grid-4">
            <div className="card" style={{ position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-orange)', color: '#0B0B0B', fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>1</div>
              <h3>Assessment</h3>
              <p>Full physical evaluation performed at your home to identify root causes of pain or restricted mobility.</p>
            </div>
            <div className="card" style={{ position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-orange)', color: '#0B0B0B', fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>2</div>
              <h3>Treatment Plan</h3>
              <p>A customized physio program tailored to your physical condition, age, and recovery timeline.</p>
            </div>
            <div className="card" style={{ position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-orange)', color: '#0B0B0B', fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>3</div>
              <h3>Therapy Sessions</h3>
              <p>Hands-on treatment and guided physical exercises delivered safely in your living space.</p>
            </div>
            <div className="card" style={{ position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-orange)', color: '#0B0B0B', fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>4</div>
              <h3>Recovery Guidance</h3>
              <p>Continuous progress tracking, ergonomic advice, and home exercise support for long-term health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Patient Testimonials Carousel */}
      <div className="reveal-on-scroll">
        <TestimonialCarousel />
      </div>

      {/* 8. Dark Rounded CTA Banner */}
      <section className="section-padding bg-cream reveal-on-scroll">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Ready for a <span className="text-orange">Healthier Recovery</span>?</h2>
              <p>Message us on WhatsApp to book your personalized home visit in Chennai.</p>
            </div>
            <a 
              href="https://wa.me/919360447385?text=Hi%2C%20I%27d%20like%20to%20book%20a%20home%20physio%20visit." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-lg"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

