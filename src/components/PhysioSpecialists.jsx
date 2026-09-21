import React from 'react';

export default function PhysioSpecialists({ onSelectDoctor }) {
  return (
    <section className="physio-specialists-section">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ color: 'var(--color-orange)', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>Our Physio Specialists</h2>
        </div>

        <div className="specialists-grid">
          {/* Specialist 1 */}
          <div className="specialist-card">
            <div className="specialist-avatar-wrap">
              <img 
                src="https://www.phizeeo.com/zeedr.png" 
                alt="Dr. Zeenith VR (PT)" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'140\' height=\'140\' viewBox=\'0 0 140 140\'%3E%3Crect width=\'140\' height=\'140\' fill=\'%231E1E1E\'/%3E%3Ctext x=\'70\' y=\'75\' font-family=\'Plus Jakarta Sans\' font-size=\'14\' font-weight=\'bold\' fill=\'%23FFFFFF\' text-anchor=\'middle\'%3EDr. Zee%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            <h3 className="specialist-name">Dr. Zeenith VR (PT)</h3>
            <p className="specialist-title">Rehabilitation Specialist</p>
            <button className="specialist-btn" onClick={() => onSelectDoctor('zee')}>View Details</button>
          </div>

          {/* Specialist 2 */}
          <div className="specialist-card">
            <div className="specialist-avatar-wrap">
              <img 
                src="https://www.phizeeo.com/jdr.jpg" 
                alt="Dr. Ramya Josephine (PT)" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'140\' height=\'140\' viewBox=\'0 0 140 140\'%3E%3Crect width=\'140\' height=\'140\' fill=\'%231E1E1E\'/%3E%3Ctext x=\'70\' y=\'75\' font-family=\'Plus Jakarta Sans\' font-size=\'14\' font-weight=\'bold\' fill=\'%23FFFFFF\' text-anchor=\'middle\'%3EDr. Ramya%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            <h3 className="specialist-name">Dr. Ramya Josephine (PT)</h3>
            <p className="specialist-title">Women's Health Physio</p>
            <button className="specialist-btn" onClick={() => onSelectDoctor('ramya')}>View Details</button>
          </div>
        </div>
      </div>
    </section>
  );
}
