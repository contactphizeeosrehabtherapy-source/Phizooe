import React from 'react';
import { X, MapPin, CheckCircle2, MessageCircle, Star } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function DoctorModal({ doctorId, onClose }) {
  const { siteContent } = useSiteContent();
  if (!doctorId) return null;

  const doc = siteContent.doctors.find(d => d.id === doctorId);
  if (!doc) return null;

  const whatsappNumber = siteContent.contact.whatsappNumber || '919360447385';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(doc.whatsappMsg || `Hi ${doc.name}, I'd like to book a home physio consultation.`)}`;

  return (
    <div className="modal-overlay active" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card doctor-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="doctor-modal-header">
          <div className="doctor-avatar-container">
            <img 
              src={doc.img} 
              alt={doc.name} 
              className="doctor-modal-avatar" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='110' viewBox='0 0 110 110'%3E%3Crect width='110' height='110' fill='%231E1E1E'/%3E%3Ctext x='55' y='60' font-family='Plus Jakarta Sans' font-size='14' font-weight='bold' fill='%23FFFFFF' text-anchor='middle'%3EDr. Physio%3C/text%3E%3C/svg%3E";
              }}
            />
            <span className="doctor-status-dot" title="Available for Doorstep Visits"></span>
          </div>
          <div className="doctor-header-info">
            <div className="doctor-badge-row">
              <span className="doc-pill-badge">{doc.credentials}</span>
              <span className="doc-pill-badge accent">{doc.experience}</span>
            </div>
            <h2 className="doctor-modal-name">{doc.name}</h2>
            <p className="doctor-modal-role">{doc.role}</p>
            
            <div className="doctor-meta-items">
              <span className="doc-meta-tag"><MapPin size={14} /> {doc.location}</span>
              <span className="doc-meta-tag rating"><Star size={14} fill="#F28C1B" color="#F28C1B" /> {doc.rating}</span>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="doctor-modal-body">
          {/* Bio section */}
          <div className="doc-section">
            <h4 className="doc-section-title">About Specialist</h4>
            <p className="doctor-modal-bio">{doc.bio}</p>
          </div>

          {/* Specialties list */}
          <div className="doc-section">
            <h4 className="doc-section-title">Key Areas of Expertise</h4>
            <div className="doc-specialties-grid">
              {doc.specialties && doc.specialties.map((spec, i) => (
                <div key={i} className="doc-specialty-item">
                  <CheckCircle2 size={16} className="spec-icon" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Footer inside modal */}
          <div className="doctor-modal-footer">
            <a 
              href={whatsappUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary doc-whatsapp-btn"
            >
              <MessageCircle size={18} />
              Book Home Visit with {doc.name.split(' ')[1] || 'Doctor'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
