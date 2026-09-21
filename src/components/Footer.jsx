import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Globe } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

export default function Footer() {
  return (
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <Link to="/" class="brand-logo" aria-label="PhiZeeo Footer Logo">
              <AnimatedLogo fontSize="1.8rem" />
            </Link>
            <p style={{ marginTop: '1rem', fontSize: '0.925rem', color: 'var(--color-muted-dark)', maxWidth: '340px' }}>
              PhiZeeo is a home physiotherapy and rehabilitation service helping people recover, move better, and live more independently at home.
            </p>
            <p class="script-tagline" style={{ fontSize: '1.25rem', marginTop: '0.75rem', display: 'block' }}>
              "We Treat. God Heals."
            </p>
          </div>

          <div class="footer-col">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>Home</Link></li>
              <li><Link to="/about" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>About Us</Link></li>
              <li><Link to="/services" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>Our Services</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>Book Appointment</Link></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>Our Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/services" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>Home Visit Physio</Link></li>
              <li><Link to="/services" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>Orthopedic Rehab</Link></li>
              <li><Link to="/services" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>Neuro Rehabilitation</Link></li>
              <li><Link to="/services" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>Sports Injury Rehab</Link></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>Connect With Us</h4>
            <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.5rem' }}>
              <a 
                href="https://www.instagram.com/phizeeo" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--color-dark-card)', border: '1px solid var(--color-dark-border)', color: 'var(--color-muted-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://share.google/7J8mXikdaUgoGXsFX" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--color-dark-card)', border: '1px solid var(--color-dark-border)', color: 'var(--color-muted-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Google Business Listing"
              >
                <MapPin size={20} />
              </a>
              <a 
                href="https://jsdl.in/DT-20AX71NHEWR" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--color-dark-card)', border: '1px solid var(--color-dark-border)', color: 'var(--color-muted-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="JustDial Listing"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© 2025 PhiZeeo</div>
          <div>Professional rehabilitation. Personal care. At home.</div>
        </div>
      </div>
    </footer>
  );
}
