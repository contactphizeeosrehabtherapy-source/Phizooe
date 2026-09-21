import React from 'react';
import { X, Award, MapPin, CheckCircle2, MessageCircle, Star, ShieldCheck } from 'lucide-react';

const doctorsData = {
  zee: {
    name: "Dr. Zeenith VR (PT)",
    role: "Chief Rehabilitation Specialist",
    credentials: "B.P.T, M.P.T (Neuro Rehab)",
    experience: "8+ Years Exp.",
    rating: "5.0 ★ (120+ Patients)",
    location: "Chennai Home Visits",
    img: "https://www.phizeeo.com/zeedr.png",
    bio: "Dr. Zeenith VR has practiced home-visit physiotherapy in Chennai since 2017. He specializes in comprehensive physical evaluation, orthopedic rehabilitation, neurological recovery (including post-stroke and paralysis therapy), and acute & chronic pain management.",
    specialties: [
      "Orthopedic & Joint Pain Rehab",
      "Stroke & Neurological Recovery",
      "Post-Surgical Care at Home",
      "Acute & Chronic Spine Therapy"
    ],
    whatsappMsg: "Hi Dr. Zeenith VR, I'd like to book a home physio consultation."
  },
  ramya: {
    name: "Dr. Ramya Josephine (PT)",
    role: "Women's Health & Geriatric Specialist",
    credentials: "B.P.T, Women's Health Specialist",
    experience: "7+ Years Exp.",
    rating: "5.0 ★ (95+ Patients)",
    location: "Chennai Home Visits",
    img: "https://www.phizeeo.com/jdr.jpg",
    bio: "Dr. Ramya Josephine specializes in post-surgery physical rehabilitation, geriatric care, stroke recovery therapy, and dedicated women's health physiotherapy. She delivers gentle, expert home visits designed for long-term mobility and wellness.",
    specialties: [
      "Women's Health & Postnatal Care",
      "Geriatric Balance & Fall Prevention",
      "Post-Op Knee & Hip Rehabilitation",
      "Gentle Stroke & Mobility Therapy"
    ],
    whatsappMsg: "Hi Dr. Ramya Josephine, I'd like to book a home physio consultation."
  }
};

export default function DoctorModal({ doctorId, onClose }) {
  if (!doctorId) return null;
  const doc = doctorsData[doctorId];
  if (!doc) return null;

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
              {doc.specialties.map((spec, i) => (
                <div key={i} className="doc-specialty-item">
                  <CheckCircle2 size={16} className="spec-icon" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee banner */}
          <div className="doc-guarantee-box">
            <ShieldCheck size={20} className="guarantee-icon" />
            <div>
              <strong>1-on-1 Personalized Doorstep Care</strong>
              <p>Thorough physical evaluation with clinical equipment brought directly to your home.</p>
            </div>
          </div>

          {/* CTA Action */}
          <div className="doctor-modal-cta">
            <a 
              href={`https://wa.me/919360447385?text=${encodeURIComponent(doc.whatsappMsg)}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-lg btn-block doctor-cta-btn" 
            >
              <MessageCircle size={20} />
              Book Home Appointment with Specialist
            </a>
            <span className="doctor-cta-subtext">⚡ Fast Confirmation via Direct WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  );
}

