import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header class="site-header">
      <div class="container navbar">
        <Link to="/" class="brand-logo" onClick={closeMobileMenu} aria-label="PhiZeeo Home Page">
          <AnimatedLogo fontSize="1.8rem" />
        </Link>

        <nav aria-label="Main Navigation">
          <ul class="nav-links">
            <li><NavLink to="/" class={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>
            <li><NavLink to="/about" class={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink></li>
            <li><NavLink to="/services" class={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink></li>
            <li><NavLink to="/contact" class={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink></li>
          </ul>
        </nav>

        <div class="nav-actions">
          <a 
            href="https://wa.me/919360447385?text=Hi%2C%20I%27d%20like%20to%20book%20a%20home%20physio%20visit." 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-primary btn-sm"
          >
            Book Appointment
          </a>
          <button 
            class="hamburger-btn" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div class={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul class="mobile-nav-links">
          <li><NavLink to="/" onClick={closeMobileMenu}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMobileMenu}>About Us</NavLink></li>
          <li><NavLink to="/services" onClick={closeMobileMenu}>Services</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMobileMenu}>Contact Us</NavLink></li>
        </ul>
        <a 
          href="https://wa.me/919360447385?text=Hi%2C%20I%27d%20like%20to%20book%20a%20home%20physio%20visit." 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn btn-primary"
          style={{ width: '100%', marginTop: '1rem' }}
          onClick={closeMobileMenu}
        >
          Book Appointment (WhatsApp)
        </a>
      </div>
    </header>
  );
}
