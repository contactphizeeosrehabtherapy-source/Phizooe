import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import { useSiteContent } from '../context/SiteContentContext';

export default function Header() {
  const { siteContent } = useSiteContent();
  const { contact } = siteContent;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  return (
    <header className="site-header">
      <div className="container navbar">
        <Link to="/" className="brand-logo" onClick={closeMobileMenu} aria-label="PhiZeeo Home Page">
          <AnimatedLogo fontSize="1.8rem" />
        </Link>

        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink></li>
            <li><NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary btn-sm"
          >
            Book Appointment
          </a>
          <button 
            className="hamburger-btn" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><NavLink to="/" onClick={closeMobileMenu}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMobileMenu}>About Us</NavLink></li>
          <li><NavLink to="/services" onClick={closeMobileMenu}>Services</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMobileMenu}>Contact Us</NavLink></li>
          <li><NavLink to="/admin" onClick={closeMobileMenu} style={{ color: 'var(--color-orange)' }}>Admin Portal</NavLink></li>
        </ul>
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1rem' }}
          onClick={closeMobileMenu}
        >
          Book Appointment (WhatsApp)
        </a>
      </div>
    </header>
  );
}
