import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Activity, Brain, Zap, Users, HeartPulse } from 'lucide-react';

export default function ServicesPage() {
  const servicesList = [
    {
      id: "Home Visit Physio",
      title: "Home Visit Physio",
      description: "Professional treatment delivered at your home.",
      icon: <Home size={28} />
    },
    {
      id: "Orthopedic Rehab",
      title: "Orthopedic Rehab",
      description: "Pain relief and mobility recovery for joints, spine and fractures.",
      icon: <Activity size={28} />
    },
    {
      id: "Neuro Rehabilitation",
      title: "Neuro Rehabilitation",
      description: "Stroke, paralysis and neurological recovery programs.",
      icon: <Brain size={28} />
    },
    {
      id: "Sports Injury Rehab",
      title: "Sports Injury Rehab",
      description: "Injury recovery and performance training for athletes.",
      icon: <Zap size={28} />
    },
    {
      id: "Pediatric and Geriatric Care",
      title: "Pediatric and Geriatric Care",
      description: "Specialized care for children and elderly patients.",
      icon: <Users size={28} />
    },
    {
      id: "Cardiopulmonary Rehab",
      title: "Cardiopulmonary Rehab",
      description: "Recovery support for heart and lung conditions.",
      icon: <HeartPulse size={28} />
    }
  ];

  return (
    <main>
      {/* Dark Hero */}
      <section class="hero-section bg-dark" style={{ paddingBottom: '4rem' }}>
        <div class="container text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div class="eyebrow eyebrow-dark">WHAT WE TREAT</div>
          <h1>Our <span class="text-orange">Services</span></h1>
          <p class="subtext" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Professional physiotherapy and rehabilitation delivered at the patient's home. Tailored care designed around your comfort and daily routine.
          </p>
          <span class="script-tagline">"We Treat. God Heals."</span>
        </div>
      </section>

      {/* 3x2 Services Grid */}
      <section class="section-padding bg-cream">
        <div class="container">
          <div class="grid-3">
            {servicesList.map((service, idx) => (
              <div key={idx} class="card">
                <div class="card-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link 
                  to={`/contact?service=${encodeURIComponent(service.id)}`} 
                  style={{ marginTop: 'auto', paddingTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-heading)', fontWeight: '600', fontSize: '0.9rem', color: 'var(--color-orange-text-cream)' }}
                >
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Banner Replacing Advanced Technology */}
      <section class="section-padding bg-cream">
        <div class="container">
          <div class="cta-banner">
            <div>
              <h2>Assessment-Led. Drug-Free. <span class="text-orange">At Your Doorstep.</span></h2>
              <p>Experience specialized, one-on-one physiotherapy designed around your home environment.</p>
            </div>
            <a 
              href="https://wa.me/919360447385?text=Hi%2C%20I%27d%20like%20to%20book%20a%20home%20physio%20visit." 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-primary btn-lg"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
