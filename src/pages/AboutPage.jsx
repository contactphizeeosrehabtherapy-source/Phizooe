import React from 'react';
import { Heart, Activity, Shield, Sparkles } from 'lucide-react';
import PhysioSpecialists from '../components/PhysioSpecialists';
import WhoWeServe from '../components/WhoWeServe';

export default function AboutPage({ onSelectDoctor }) {
  return (
    <main>
      {/* Dark Hero */}
      <section className="hero-section bg-dark" style={{ paddingBottom: '4rem' }}>
        <div className="container text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="eyebrow eyebrow-dark">ABOUT US</div>
          <h1>Healing Comfortably, <span className="text-orange">Right at Home</span></h1>
          <p className="subtext" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            PhiZeeo is a home physiotherapy and rehabilitation service helping people recover, move better, and live more independently at home.
          </p>
          <span className="script-tagline" style={{ marginTop: '0.5rem' }}>"We Treat. God Heals."</span>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-cream">
        <div className="container about-grid">
          <div className="media-frame" style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
            <img 
              src="/about_physio_team.png" 
              alt="PhiZeeo Rehabilitation Team" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <div className="eyebrow">WHO WE ARE</div>
            <h2>Professional Rehabilitation. <span className="text-orange">Personal Touch.</span></h2>
            <p>
              PhiZeeo is one of Chennai's 5-star rated home physio services, founded on the mission of delivering professional, personalized physio through expert home visits.
            </p>
            <p>
              Dr. Zeenith VR and Dr. Ramya Josephine have practiced home-visit physiotherapy since 2017 and personally guide every patient. By assessing patients directly in their home environment, they create treatment plans that seamlessly integrate into daily life for optimal healing.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <a 
                href="#specialists" 
                className="btn btn-outline-dark"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('specialists')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Meet Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <WhoWeServe />

      {/* Our Values */}
      <section className="section-padding bg-cream" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header text-center">
            <div className="eyebrow">CORE PRINCIPLES</div>
            <h2>Our <span className="text-orange">Values</span></h2>
            <p>The foundations that guide every treatment and interaction with our patients.</p>
          </div>

          <div className="grid-4">
            <div className="card">
              <div className="card-icon"><Heart size={28} /></div>
              <h3>Care</h3>
              <p>Dedicated personal attention for every patient's unique recovery journey.</p>
            </div>
            <div className="card">
              <div className="card-icon"><Activity size={28} /></div>
              <h3>Expertise</h3>
              <p>Evidence-based physio techniques continuously refined since 2017.</p>
            </div>
            <div className="card">
              <div className="card-icon"><Shield size={28} /></div>
              <h3>Trust</h3>
              <p>Transparent, compassionate therapy delivered safely inside your home.</p>
            </div>
            <div className="card">
              <div className="card-icon"><Sparkles size={28} /></div>
              <h3>Recovery</h3>
              <p>Long-term mobility without relying on medication or invasive surgeries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Quote Banner */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div style={{ backgroundColor: 'var(--color-dark-card)', borderRadius: 'var(--radius-lg)', padding: '4.5rem 2.5rem', textAlign: 'center', border: '1px solid var(--color-dark-border)' }}>
            <blockquote style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '700', color: '#FFFFFF', maxWidth: '800px', margin: '0 auto 1.5rem auto', lineHeight: '1.3' }}>
              "Comfort at home speeds up healing."
            </blockquote>
            <div style={{ fontSize: '1.25rem', color: 'var(--color-orange)', fontFamily: 'var(--font-script)', fontWeight: '700' }}>
              We Treat. God Heals.
            </div>
          </div>
        </div>
      </section>

      {/* Physio Specialists Section */}
      <div id="specialists">
        <PhysioSpecialists onSelectDoctor={onSelectDoctor} />
      </div>
    </main>
  );
}
