import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Calendar, PhoneCall } from 'lucide-react';

export default function MobileTabBar() {
  return (
    <div class="mobile-bottom-tabbar" aria-label="Mobile Navigation Bar">
      <NavLink to="/" class={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <Home size={22} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/services" class={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <Briefcase size={22} />
        <span>Services</span>
      </NavLink>
      <a 
        href="https://wa.me/919360447385?text=Hi%2C%20I%27d%20like%20to%20book%20a%20home%20physio%20visit." 
        target="_blank" 
        rel="noopener noreferrer" 
        class="tab-item"
      >
        <Calendar size={22} />
        <span>Book</span>
      </a>
      <NavLink to="/contact" class={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <PhoneCall size={22} />
        <span>Contact</span>
      </NavLink>
    </div>
  );
}
