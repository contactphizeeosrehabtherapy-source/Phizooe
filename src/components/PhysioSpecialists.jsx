import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';

export default function PhysioSpecialists({ onSelectDoctor }) {
  const { siteContent } = useSiteContent();
  const doctors = siteContent.doctors;

  return (
    <section className="physio-specialists-section" id="specialists">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ color: 'var(--color-orange)', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>Our Physio Specialists</h2>
        </div>

        <div className="specialists-grid">
          {doctors.map((doc) => (
            <div key={doc.id} className="specialist-card">
              <div className="specialist-avatar-wrap">
                <img 
                  src={doc.img} 
                  alt={doc.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Crect width='140' height='140' fill='%231E1E1E'/%3E%3Ctext x='70' y='75' font-family='Plus Jakarta Sans' font-size='14' font-weight='bold' fill='%23FFFFFF' text-anchor='middle'%3E${encodeURIComponent(doc.name)}%3C/text%3E%3C/svg%3E`;
                  }}
                />
              </div>
              <h3 className="specialist-name">{doc.name}</h3>
              <p className="specialist-title">{doc.role}</p>
              <button className="specialist-btn" onClick={() => onSelectDoctor(doc.id)}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
