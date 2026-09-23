import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, PhoneCall, Mail, Clock, Globe, MessageCircle } from 'lucide-react';
import { saveAppointmentRequest } from '../lib/supabase';
import { useSiteContent } from '../context/SiteContentContext';

export default function ContactPage() {
  const { siteContent, addManualAppointment } = useSiteContent();
  const { contact } = siteContent;
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    serviceSelect: '',
    preferredDate: '',
    userMessage: ''
  });
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serviceParam = queryParams.get('service');
    if (serviceParam) {
      setFormData(prev => ({ ...prev, serviceSelect: serviceParam }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phoneNumber, serviceSelect, preferredDate, userMessage } = formData;

    if (!fullName || !phoneNumber || !serviceSelect || !preferredDate) {
      setFormStatus({ message: 'Please fill in all required fields (*).', type: 'error' });
      return;
    }

    setFormStatus({ message: 'Saving request & opening WhatsApp...', type: 'success' });

    // Store in Local Context for Admin Panel Lead Tracking
    addManualAppointment({
      fullName,
      phone: phoneNumber,
      service: serviceSelect,
      preferredDate,
      notes: userMessage
    });

    // Store in Supabase database
    await saveAppointmentRequest(formData);

    const formattedMessage = 
      `Hi PhiZeeo, I'd like to book a home physio visit.\n\n` +
      `*Full Name:* ${fullName}\n` +
      `*Phone:* ${phoneNumber}\n` +
      `*Service Required:* ${serviceSelect}\n` +
      `*Preferred Date:* ${preferredDate}` +
      (userMessage ? `\n*Notes/Message:* ${userMessage}` : '');

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${contact.whatsappNumber || '919360447385'}?text=${encodedText}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  return (
    <main>
      {/* Dark Hero */}
      <section className="hero-section bg-dark" style={{ paddingBottom: '4rem' }}>
        <div className="container text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="eyebrow eyebrow-dark">GET IN TOUCH</div>
          <h1>Get in <span className="text-orange">Touch</span></h1>
          <p className="subtext" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Have questions or ready to schedule your home visit? Reach out directly or complete the appointment form below.
          </p>
          <span className="script-tagline">"We Treat. God Heals."</span>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="contact-grid">

            {/* Left Column: Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-orange-light)', color: 'var(--color-orange-text-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Service Area</h4>
                  <p style={{ color: 'var(--color-muted-light)', fontSize: '0.95rem' }}>{contact.address}</p>
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-orange-light)', color: 'var(--color-orange-text-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PhoneCall size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Call Us</h4>
                  <p><a href={`tel:${contact.phone}`} style={{ fontWeight: '700', color: 'var(--color-orange-text-cream)' }}>{contact.phone}</a></p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-light)' }}>Direct line for instant inquiries & booking</p>
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-orange-light)', color: 'var(--color-orange-text-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Email Us</h4>
                  <p style={{ fontWeight: '600', color: 'var(--color-orange-text-cream)' }}>{contact.email}</p>
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-orange-light)', color: 'var(--color-orange-text-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Working Hours</h4>
                  <p style={{ fontWeight: '600', color: 'var(--color-orange-text-cream)' }}>{contact.workingHours}</p>
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.25rem', backgroundColor: 'var(--color-light-bg)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-orange-light)', color: 'var(--color-orange-text-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Globe size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Online Listings</h4>
                  <p style={{ marginTop: '0.25rem' }}>
                    <a href="https://share.google/7J8mXikdaUgoGXsFX" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', color: 'var(--color-orange-text-cream)', marginRight: '1rem' }}>Google Listing &rarr;</a>
                    <a href="https://jsdl.in/DT-20AX71NHEWR" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', color: 'var(--color-orange-text-cream)' }}>JustDial Listing &rarr;</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="contact-form-card">
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Book Appointment</h3>
              <p style={{ color: 'var(--color-muted-light)', marginBottom: '1.75rem' }}>Fill in your details below and we will automatically prepare your request via WhatsApp.</p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    className="form-control" 
                    placeholder="e.g. Anitha Sundaram" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phoneNumber" 
                    className="form-control" 
                    placeholder="e.g. 9876543210" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="serviceSelect">Service Required *</label>
                  <select 
                    id="serviceSelect" 
                    className="form-control" 
                    value={formData.serviceSelect} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="" disabled>Select a physiotherapy service</option>
                    {siteContent.services.map((serv) => (
                      <option key={serv.id} value={serv.title}>{serv.title}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="preferredDate">Preferred Date *</label>
                  <input 
                    type="date" 
                    id="preferredDate" 
                    className="form-control" 
                    value={formData.preferredDate} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userMessage">Message / Notes (Optional)</label>
                  <textarea 
                    id="userMessage" 
                    className="form-control" 
                    placeholder="Briefly describe your symptoms or specific requirements..." 
                    value={formData.userMessage} 
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  <MessageCircle size={20} />
                  Send Request via WhatsApp
                </button>

                {formStatus.message && (
                  <div 
                    style={{ 
                      marginTop: '1rem', 
                      fontSize: '0.9rem', 
                      padding: '0.75rem 1rem', 
                      borderRadius: 'var(--radius-sm)', 
                      backgroundColor: formStatus.type === 'success' ? '#D1FAE5' : '#FEE2E2',
                      color: formStatus.type === 'success' ? '#065F46' : '#991B1B',
                      border: `1px solid ${formStatus.type === 'success' ? '#A7F3D0' : '#FCA5A5'}`
                    }}
                  >
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
