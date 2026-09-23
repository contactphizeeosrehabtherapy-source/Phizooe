import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Globe, Shield } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import { useSiteContent } from '../context/SiteContentContext';

export default function Footer() {
  const { siteContent } = useSiteContent();
  const { hero, contact } = siteContent;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand-logo" aria-label="PhiZeeo Footer Logo">
              <AnimatedLogo fontSize="1.8rem" />
            </Link>
            <p style={{ marginTop: '1rem', fontSize: '0.925rem', color: 'var(--color-muted-dark)', maxWidth: '340px' }}>
              {hero.subtext}
            </p>
            <p className="script-tagline" style={{ fontSize: '1.25rem', marginTop: '0.75rem', display: 'block' }}>
              {hero.tagline}
            </p>
          </div>

          <div className="footer-col">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>Home</Link></li>
              <li><Link to="/about" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>About Us</Link></li>
              <li><Link to="/services" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>Our Services</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>Book Appointment</Link></li>
              <li>
                <Link to="/admin" style={{ color: 'var(--color-orange)', fontSize: '0.925rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: '600' }}>
                  <Shield size={14} /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>Our Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {siteContent.services.slice(0, 4).map((serv) => (
                <li key={serv.id}>
                  <Link to="/services" style={{ color: 'var(--color-muted-dark)', fontSize: '0.925rem' }}>
                    {serv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>Connect With Us</h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-muted-dark)', marginBottom: '1rem', lineHeight: '1.6' }}>
              <div>📞 {contact.phone}</div>
              <div>📍 {contact.address}</div>
              <div>⏰ {contact.workingHours}</div>
            </div>
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

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} PhiZeeo</div>
          <div>Professional rehabilitation. Personal care. At home.</div>
        </div>
      </div>
    </footer>
  );
}
