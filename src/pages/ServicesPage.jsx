import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Activity, Brain, Zap, Users, HeartPulse } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const ICON_MAP = {
  Home: Home,
  Activity: Activity,
  Brain: Brain,
  Zap: Zap,
  Users: Users,
  HeartPulse: HeartPulse
};

export default function ServicesPage() {
  const { siteContent } = useSiteContent();
  const { services, hero, contact } = siteContent;

  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  return (
    <main>
      {/* Dark Hero */}
      <section className="hero-section bg-dark" style={{ paddingBottom: '4rem' }}>
        <div className="container text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="eyebrow eyebrow-dark">WHAT WE TREAT</div>
          <h1>Our <span className="text-orange">Services</span></h1>
          <p className="subtext" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Professional physiotherapy and rehabilitation delivered at the patient's home. Tailored care designed around your comfort and daily routine.
          </p>
          <span className="script-tagline">{hero.tagline}</span>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="grid-3">
            {services.map((service) => {
              const IconComponent = ICON_MAP[service.iconName] || Activity;
              return (
                <div key={service.id} className="card">
                  <div className="card-icon"><IconComponent size={28} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  {service.details && (
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted-light)', marginTop: '0.5rem' }}>
                      {service.details}
                    </p>
                  )}
                  <Link 
                    to={`/contact?service=${encodeURIComponent(service.title)}`} 
                    style={{ marginTop: 'auto', paddingTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-heading)', fontWeight: '600', fontSize: '0.9rem', color: 'var(--color-orange-text-cream)' }}
                  >
                    Book This Service &rarr;
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Assessment-Led. Drug-Free. <span className="text-orange">At Your Doorstep.</span></h2>
              <p>Experience specialized, one-on-one physiotherapy designed around your home environment.</p>
            </div>
            <a 
              href={whatsappUrl} 
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
