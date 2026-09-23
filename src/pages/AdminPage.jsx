import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, Key, Image as ImageIcon, Edit3, Users, Stethoscope, Briefcase, 
  MessageSquare, Calendar, Trash2, CheckCircle, Upload, Eye, RefreshCw, 
  Plus, ExternalLink, Download, UploadCloud, Star, Phone, MessageCircle, 
  ShieldCheck, AlertCircle, ArrowLeft, LogOut, Check, X
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function AdminPage() {
  const {
    siteContent,
    updateHeroContent,
    updateContactContent,
    addPicture,
    setHeroPicture,
    deletePicture,
    updateService,
    addService,
    deleteService,
    updateDoctor,
    addDoctor,
    deleteDoctor,
    addTestimonial,
    deleteTestimonial,
    updateAppointmentStatus,
    resetToDefaults
  } = useSiteContent();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('phizeeo_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab State: 'pictures' | 'hero' | 'doctors' | 'services' | 'testimonials' | 'appointments' | 'settings'
  const [activeTab, setActiveTab] = useState('pictures');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Auth Handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'admin' || passcode === 'phizeeo2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('phizeeo_admin_auth', 'true');
      setAuthError('');
      showToast('Welcome back, Admin! Live Site Management active.');
    } else {
      setAuthError('Invalid passcode. Default passcode is admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('phizeeo_admin_auth');
  };

  // --- TAB 1: PICTURES & MEDIA MANAGERS ---
  const [newPicTitle, setNewPicTitle] = useState('');
  const [newPicCategory, setNewPicCategory] = useState('Home Visit');
  const [newPicUrlInput, setNewPicUrlInput] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadingState, setUploadingState] = useState(false);

  const handleFileUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    setUploadingState(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      addPicture({
        title: newPicTitle.trim() || file.name.replace(/\.[^/.]+$/, ""),
        category: newPicCategory,
        url: dataUrl,
        isHero: false
      });
      setNewPicTitle('');
      setUploadingState(false);
      showToast('New picture uploaded and saved to gallery!');
    };
    reader.readAsDataURL(file);
  };

  const handleAddPicByUrl = (e) => {
    e.preventDefault();
    if (!newPicUrlInput.trim()) return;
    addPicture({
      title: newPicTitle.trim() || 'Uploaded Picture',
      category: newPicCategory,
      url: newPicUrlInput.trim(),
      isHero: false
    });
    setNewPicTitle('');
    setNewPicUrlInput('');
    showToast('Picture added successfully via URL!');
  };

  // --- TAB 2: HERO & SITE CONTENT EDITOR ---
  const [heroForm, setHeroForm] = useState(siteContent.hero);
  const [contactForm, setContactForm] = useState(siteContent.contact);

  useEffect(() => {
    setHeroForm(siteContent.hero);
    setContactForm(siteContent.contact);
  }, [siteContent]);

  const handleSaveHero = (e) => {
    e.preventDefault();
    updateHeroContent(heroForm);
    updateContactContent(contactForm);
    showToast('Site hero and contact info updated live!');
  };

  // --- TAB 3: DOCTOR / SPECIALIST EDIT FORM ---
  const [editingDocId, setEditingDocId] = useState(null);
  const [docForm, setDocForm] = useState(null);
  const [showAddDocModal, setShowAddDocModal] = useState(false);

  const startEditDoc = (doc) => {
    setEditingDocId(doc.id);
    setDocForm({ ...doc, specialtiesText: doc.specialties.join('\n') });
  };

  const saveDocEdit = (e) => {
    e.preventDefault();
    if (!docForm) return;

    const specsArray = docForm.specialtiesText
      ? docForm.specialtiesText.split('\n').filter(s => s.trim())
      : docForm.specialties;

    const updated = {
      ...docForm,
      specialties: specsArray
    };
    delete updated.specialtiesText;

    updateDoctor(docForm.id, updated);
    setEditingDocId(null);
    setDocForm(null);
    showToast(`Doctor profile "${updated.name}" updated successfully!`);
  };

  const handleCreateNewDoc = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDoc = {
      name: formData.get('name'),
      role: formData.get('role'),
      credentials: formData.get('credentials'),
      experience: formData.get('experience'),
      img: formData.get('img') || '/zeedr.png',
      bio: formData.get('bio'),
      specialties: formData.get('specialties').split('\n').filter(s => s.trim())
    };
    addDoctor(newDoc);
    setShowAddDocModal(false);
    showToast(`New Specialist profile "${newDoc.name}" added!`);
  };

  // --- TAB 4: SERVICES MANAGER ---
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceForm, setServiceForm] = useState(null);

  const startEditService = (serv) => {
    setEditingServiceId(serv.id);
    setServiceForm({ ...serv });
  };

  const saveServiceEdit = (e) => {
    e.preventDefault();
    if (!serviceForm) return;
    updateService(serviceForm.id, serviceForm);
    setEditingServiceId(null);
    setServiceForm(null);
    showToast(`Service "${serviceForm.title}" updated!`);
  };

  const handleAddServiceSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newServ = {
      title: formData.get('title'),
      description: formData.get('description'),
      details: formData.get('details'),
      iconName: formData.get('iconName') || 'Activity',
      image: formData.get('image') || '/hero_physio_home.png'
    };
    addService(newServ);
    setShowAddServiceModal(false);
    showToast(`Service "${newServ.title}" added to site!`);
  };

  // --- TAB 5: TESTIMONIALS MANAGER ---
  const [newTestName, setNewTestName] = useState('');
  const [newTestSource, setNewTestSource] = useState('Verified Google Review');
  const [newTestRating, setNewTestRating] = useState(5);
  const [newTestText, setNewTestText] = useState('');

  const handleAddTestimonialSubmit = (e) => {
    e.preventDefault();
    if (!newTestText.trim()) return;
    addTestimonial({
      name: newTestName || 'Satisfied Patient',
      source: newTestSource,
      rating: Number(newTestRating),
      text: newTestText.trim()
    });
    setNewTestName('');
    setNewTestText('');
    showToast('New patient review added to Testimonials!');
  };

  // UNAUTHENTICATED: Render Passcode Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-lock-screen">
        <div className="admin-lock-card">
          <div className="lock-icon-badge">
            <ShieldCheck size={36} color="var(--color-orange)" />
          </div>
          <h2>PhiZeeo Admin Portal</h2>
          <p className="admin-lock-sub">Enter manager passcode to access live website editor & picture gallery</p>

          <form onSubmit={handleLogin} style={{ width: '100%', marginTop: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: '600' }}>Admin Passcode</label>
              <div style={{ position: 'relative' }}>
                <Key size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted-dark)' }} />
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (default: admin123)"
                  style={{ width: '100%', paddingLeft: '2.6rem' }}
                  className="form-control"
                  autoFocus
                />
              </div>
            </div>

            {authError && (
              <div className="admin-error-alert" style={{ marginBottom: '1rem' }}>
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}>
              <Lock size={18} />
              Unlock Admin Panel
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-muted-dark)' }}>
            <span>Hint: Default passcode is </span>
            <code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', color: 'var(--color-orange)' }}>admin123</code>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--color-orange)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowLeft size={16} /> Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED: Render Full Admin Panel
  return (
    <div className="admin-dashboard-layout">
      {/* Toast popup */}
      {toastMessage && (
        <div className="admin-toast-popup">
          <CheckCircle size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <Link to="/" className="admin-brand-link">
            <span style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
              Phi<span style={{ color: 'var(--color-orange)' }}>Zeeo</span>
            </span>
            <span className="admin-badge">ADMIN CONTROL</span>
          </Link>
        </div>

        <div className="admin-topbar-actions">
          <Link to="/" target="_blank" className="btn btn-outline-light btn-sm" title="Open live website in new tab">
            <Eye size={16} /> View Live Website <ExternalLink size={14} />
          </Link>

          <button 
            onClick={() => {
              if (window.confirm('Reset all edited content back to original factory defaults?')) {
                resetToDefaults();
                showToast('Website content restored to factory defaults!');
              }
            }}
            className="btn btn-outline-danger btn-sm"
            title="Reset site content"
          >
            <RefreshCw size={14} /> Reset Defaults
          </button>

          <button onClick={handleLogout} className="btn btn-dark btn-sm" style={{ backgroundColor: '#262626' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Quick Metrics Bar */}
      <div className="admin-metrics-container">
        <div className="container admin-metrics-grid">
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: 'rgba(242, 140, 27, 0.15)', color: 'var(--color-orange)' }}>
              <ImageIcon size={22} />
            </div>
            <div>
              <div className="metric-val">{siteContent.pictures.length}</div>
              <div className="metric-lbl">Gallery Pictures</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
              <Stethoscope size={22} />
            </div>
            <div>
              <div className="metric-val">{siteContent.doctors.length}</div>
              <div className="metric-lbl">Specialist Doctors</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <Briefcase size={22} />
            </div>
            <div>
              <div className="metric-val">{siteContent.services.length}</div>
              <div className="metric-lbl">Active Services</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#EC4899' }}>
              <Calendar size={22} />
            </div>
            <div>
              <div className="metric-val">
                {siteContent.appointments.filter(a => a.status === 'pending').length}
              </div>
              <div className="metric-lbl">Pending Leads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container with Sidebar Navigation */}
      <div className="container admin-main-body">
        <aside className="admin-sidebar">
          <nav className="admin-nav-menu">
            <button 
              className={`admin-nav-item ${activeTab === 'pictures' ? 'active' : ''}`}
              onClick={() => setActiveTab('pictures')}
            >
              <ImageIcon size={18} />
              <span>Pictures & Media</span>
              <span className="count-pill">{siteContent.pictures.length}</span>
            </button>

            <button 
              className={`admin-nav-item ${activeTab === 'hero' ? 'active' : ''}`}
              onClick={() => setActiveTab('hero')}
            >
              <Edit3 size={18} />
              <span>Hero & Site Info</span>
            </button>

            <button 
              className={`admin-nav-item ${activeTab === 'doctors' ? 'active' : ''}`}
              onClick={() => setActiveTab('doctors')}
            >
              <Users size={18} />
              <span>Doctors & Specialists</span>
              <span className="count-pill">{siteContent.doctors.length}</span>
            </button>

            <button 
              className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <Briefcase size={18} />
              <span>Services Manager</span>
              <span className="count-pill">{siteContent.services.length}</span>
            </button>

            <button 
              className={`admin-nav-item ${activeTab === 'testimonials' ? 'active' : ''}`}
              onClick={() => setActiveTab('testimonials')}
            >
              <MessageSquare size={18} />
              <span>Patient Testimonials</span>
              <span className="count-pill">{siteContent.testimonials.length}</span>
            </button>

            <button 
              className={`admin-nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              <Calendar size={18} />
              <span>Patient Appointments</span>
              {siteContent.appointments.filter(a => a.status === 'pending').length > 0 && (
                <span className="count-pill highlight">
                  {siteContent.appointments.filter(a => a.status === 'pending').length}
                </span>
              )}
            </button>
          </nav>

          <div className="admin-sidebar-footer">
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-dark)' }}>
              Connected to local storage & Supabase db
            </div>
          </div>
        </aside>

        {/* Content Panel Area */}
        <main className="admin-content-panel">
          {/* ======================================================== */}
          {/* TAB 1: PICTURES & MEDIA GALLERY */}
          {/* ======================================================== */}
          {activeTab === 'pictures' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <div>
                  <h2>Pictures & Media Gallery</h2>
                  <p>Upload new photos, edit picture categories, or select which photo displays in the Hero banner.</p>
                </div>
              </div>

              {/* Upload Box */}
              <div className="admin-card" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <UploadCloud size={20} color="var(--color-orange)" /> Add New Picture
                </h3>

                <div 
                  className={`picture-upload-dropzone ${isDragOver ? 'drag-over' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                >
                  <Upload size={38} color="var(--color-orange)" style={{ marginBottom: '0.75rem' }} />
                  <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    {uploadingState ? 'Processing Image...' : 'Drag & drop your picture here'}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-dark)', marginBottom: '1rem' }}>
                    Supports PNG, JPG, WEBP formats. Instant preview on live site.
                  </p>
                  
                  <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                    Select Image File
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>

                <div style={{ margin: '1.25rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <hr style={{ flex: 1, borderColor: 'var(--color-dark-border)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-dark)' }}>OR ADD VIA IMAGE URL</span>
                  <hr style={{ flex: 1, borderColor: 'var(--color-dark-border)' }} />
                </div>

                <form onSubmit={handleAddPicByUrl} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <input 
                    type="text"
                    placeholder="Picture Title (e.g. Spine Treatment)"
                    value={newPicTitle}
                    onChange={(e) => setNewPicTitle(e.target.value)}
                    className="form-control"
                    style={{ flex: 1, minWidth: '200px' }}
                  />
                  <select 
                    value={newPicCategory} 
                    onChange={(e) => setNewPicCategory(e.target.value)}
                    className="form-control"
                    style={{ width: '180px' }}
                  >
                    <option value="Home Visit">Home Visit</option>
                    <option value="Clinic & Team">Clinic & Team</option>
                    <option value="Orthopedic">Orthopedic</option>
                    <option value="Neuro Rehab">Neuro Rehab</option>
                    <option value="Doctors / Staff">Doctors / Staff</option>
                    <option value="Equipment">Equipment</option>
                  </select>
                  <input 
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={newPicUrlInput}
                    onChange={(e) => setNewPicUrlInput(e.target.value)}
                    className="form-control"
                    style={{ flex: 2, minWidth: '240px' }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">Add Picture URL</button>
                </form>
              </div>

              {/* Gallery Grid */}
              <div className="admin-card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>
                  Current Website Pictures ({siteContent.pictures.length})
                </h3>

                <div className="pictures-gallery-grid">
                  {siteContent.pictures.map((pic) => (
                    <div key={pic.id} className={`picture-card-item ${pic.isHero ? 'is-hero-active' : ''}`}>
                      <div className="picture-thumb-wrap">
                        <img src={pic.url} alt={pic.title} />
                        {pic.isHero && <span className="hero-active-badge">⭐ Active Hero Image</span>}
                        <span className="category-pill-tag">{pic.category}</span>
                      </div>

                      <div className="picture-card-body">
                        <h4 className="picture-card-title">{pic.title}</h4>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-dark)', marginBottom: '0.75rem' }}>
                          Added: {pic.dateAdded || '2026-09-23'}
                        </div>

                        <div className="picture-card-actions">
                          {!pic.isHero && (
                            <button 
                              onClick={() => {
                                setHeroPicture(pic.id);
                                showToast(`Set "${pic.title}" as Main Hero Picture!`);
                              }}
                              className="btn btn-outline-light btn-xs"
                            >
                              Set as Hero Image
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(pic.url);
                              showToast('Image URL copied to clipboard!');
                            }}
                            className="btn btn-dark btn-xs"
                            title="Copy link"
                          >
                            Copy Link
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm(`Delete picture "${pic.title}"?`)) {
                                deletePicture(pic.id);
                                showToast('Picture removed from gallery.');
                              }
                            }}
                            className="btn btn-danger btn-xs"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: HERO & SITE CONTENT EDITOR */}
          {/* ======================================================== */}
          {activeTab === 'hero' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <div>
                  <h2>Hero Banner & Website Contact Editor</h2>
                  <p>Modify headlines, subtext, taglines, phone numbers, and WhatsApp booking links in real-time.</p>
                </div>
              </div>

              <form onSubmit={handleSaveHero}>
                {/* Hero Section Card */}
                <div className="admin-card" style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-dark-border)', paddingBottom: '0.5rem' }}>
                    1. Main Hero Banner Text
                  </h3>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Hero Category Tagline (Eyebrow)</label>
                      <input 
                        type="text" 
                        value={heroForm.eyebrow} 
                        onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label>Script Motto / Tagline</label>
                      <input 
                        type="text" 
                        value={heroForm.tagline} 
                        onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-grid-3" style={{ marginTop: '1rem' }}>
                    <div className="form-group">
                      <label>Headline Prefix</label>
                      <input 
                        type="text" 
                        value={heroForm.titlePrefix} 
                        onChange={(e) => setHeroForm({ ...heroForm, titlePrefix: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Highlighted Word (Orange)</label>
                      <input 
                        type="text" 
                        value={heroForm.titleHighlight} 
                        onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Headline Suffix</label>
                      <input 
                        type="text" 
                        value={heroForm.titleSuffix} 
                        onChange={(e) => setHeroForm({ ...heroForm, titleSuffix: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label>Hero Subtitle / Description</label>
                    <textarea 
                      rows={3} 
                      value={heroForm.subtext} 
                      onChange={(e) => setHeroForm({ ...heroForm, subtext: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label>Main Hero Image URL</label>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <input 
                        type="text" 
                        value={heroForm.image} 
                        onChange={(e) => setHeroForm({ ...heroForm, image: e.target.value })}
                        className="form-control"
                        style={{ flex: 1 }}
                      />
                      <img 
                        src={heroForm.image} 
                        alt="Hero Preview" 
                        style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--color-dark-border)' }} 
                      />
                    </div>
                  </div>

                  <div className="form-grid-3" style={{ marginTop: '1rem' }}>
                    <div className="form-group">
                      <label>Trust Badge 1</label>
                      <input 
                        type="text" 
                        value={heroForm.googleRatingText} 
                        onChange={(e) => setHeroForm({ ...heroForm, googleRatingText: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Trust Badge 2</label>
                      <input 
                        type="text" 
                        value={heroForm.trustBadge2} 
                        onChange={(e) => setHeroForm({ ...heroForm, trustBadge2: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Trust Badge 3</label>
                      <input 
                        type="text" 
                        value={heroForm.trustBadge3} 
                        onChange={(e) => setHeroForm({ ...heroForm, trustBadge3: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info Card */}
                <div className="admin-card" style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-dark-border)', paddingBottom: '0.5rem' }}>
                    2. Contact Details & WhatsApp Settings
                  </h3>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Phone Number Display</label>
                      <input 
                        type="text" 
                        value={contactForm.phone} 
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label>WhatsApp Number (Country Code without +)</label>
                      <input 
                        type="text" 
                        value={contactForm.whatsappNumber} 
                        onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2" style={{ marginTop: '1rem' }}>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        value={contactForm.email} 
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label>Operating Hours</label>
                      <input 
                        type="text" 
                        value={contactForm.workingHours} 
                        onChange={(e) => setContactForm({ ...contactForm, workingHours: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label>Physical Address / Service Area</label>
                    <input 
                      type="text" 
                      value={contactForm.address} 
                      onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ minWidth: '220px' }}>
                  <CheckCircle size={18} /> Save Site Content Changes
                </button>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: DOCTORS & SPECIALISTS */}
          {/* ======================================================== */}
          {activeTab === 'doctors' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <div>
                  <h2>Specialist Doctors & Team Profiles</h2>
                  <p>Edit staff details, credentials, profile pictures, and clinical specialties.</p>
                </div>
                <button onClick={() => setShowAddDocModal(true)} className="btn btn-primary btn-sm">
                  <Plus size={16} /> Add Specialist Doctor
                </button>
              </div>

              {/* Add Doctor Modal */}
              {showAddDocModal && (
                <div className="admin-modal-overlay">
                  <div className="admin-modal-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <h3>Add New Specialist Profile</h3>
                      <button onClick={() => setShowAddDocModal(false)} className="btn-icon">
                        <X size={20} />
                      </button>
                    </div>

                    <form onSubmit={handleCreateNewDoc}>
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label>Full Name</label>
                          <input type="text" name="name" placeholder="Dr. John Doe (PT)" required className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Role / Title</label>
                          <input type="text" name="role" placeholder="Senior Physio Specialist" required className="form-control" />
                        </div>
                      </div>

                      <div className="form-grid-2" style={{ marginTop: '1rem' }}>
                        <div className="form-group">
                          <label>Credentials</label>
                          <input type="text" name="credentials" placeholder="B.P.T, M.P.T" required className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Experience</label>
                          <input type="text" name="experience" placeholder="6+ Years Exp." required className="form-control" />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Profile Picture Photo URL</label>
                        <input type="text" name="img" placeholder="/zeedr.png or image URL" className="form-control" />
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Bio Summary</label>
                        <textarea name="bio" rows={3} placeholder="Doctor bio..." required className="form-control" />
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Specialties (1 per line)</label>
                        <textarea name="specialties" rows={4} placeholder="Orthopedic Rehabilitation&#10;Stroke Therapy" required className="form-control" />
                      </div>

                      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button type="button" onClick={() => setShowAddDocModal(false)} className="btn btn-dark">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Doctor Profile</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Edit Doctor Inline Modal */}
              {editingDocId && docForm && (
                <div className="admin-modal-overlay">
                  <div className="admin-modal-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <h3>Edit Specialist Profile: {docForm.name}</h3>
                      <button onClick={() => setEditingDocId(null)} className="btn-icon">
                        <X size={20} />
                      </button>
                    </div>

                    <form onSubmit={saveDocEdit}>
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label>Doctor Full Name</label>
                          <input 
                            type="text" 
                            value={docForm.name} 
                            onChange={(e) => setDocForm({ ...docForm, name: e.target.value })}
                            className="form-control" 
                          />
                        </div>
                        <div className="form-group">
                          <label>Role</label>
                          <input 
                            type="text" 
                            value={docForm.role} 
                            onChange={(e) => setDocForm({ ...docForm, role: e.target.value })}
                            className="form-control" 
                          />
                        </div>
                      </div>

                      <div className="form-grid-2" style={{ marginTop: '1rem' }}>
                        <div className="form-group">
                          <label>Degrees & Credentials</label>
                          <input 
                            type="text" 
                            value={docForm.credentials} 
                            onChange={(e) => setDocForm({ ...docForm, credentials: e.target.value })}
                            className="form-control" 
                          />
                        </div>
                        <div className="form-group">
                          <label>Experience Badge</label>
                          <input 
                            type="text" 
                            value={docForm.experience} 
                            onChange={(e) => setDocForm({ ...docForm, experience: e.target.value })}
                            className="form-control" 
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Profile Picture URL</label>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <input 
                            type="text" 
                            value={docForm.img} 
                            onChange={(e) => setDocForm({ ...docForm, img: e.target.value })}
                            className="form-control"
                            style={{ flex: 1 }}
                          />
                          <img src={docForm.img} alt="Avatar" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Biography</label>
                        <textarea 
                          rows={3} 
                          value={docForm.bio} 
                          onChange={(e) => setDocForm({ ...docForm, bio: e.target.value })}
                          className="form-control" 
                        />
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Areas of Expertise (One line per skill)</label>
                        <textarea 
                          rows={4} 
                          value={docForm.specialtiesText} 
                          onChange={(e) => setDocForm({ ...docForm, specialtiesText: e.target.value })}
                          className="form-control" 
                        />
                      </div>

                      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button type="button" onClick={() => setEditingDocId(null)} className="btn btn-dark">Cancel</button>
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Doctors List Grid */}
              <div className="doctors-admin-grid">
                {siteContent.doctors.map((doc) => (
                  <div key={doc.id} className="admin-card doctor-admin-card">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                      <img 
                        src={doc.img} 
                        alt={doc.name} 
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-orange)' }} 
                      />
                      <div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{doc.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-orange)' }}>{doc.role}</p>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-dark)' }}>{doc.credentials} • {doc.experience}</span>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: '#D4D4D4', marginBottom: '1rem', lineHeight: '1.5' }}>
                      {doc.bio}
                    </p>

                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-muted-dark)', display: 'block', marginBottom: '0.4rem' }}>SPECIALTIES:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {doc.specialties.map((s, i) => (
                          <span key={i} className="badge-chip">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-dark-border)' }}>
                      <button onClick={() => startEditDoc(doc)} className="btn btn-outline-light btn-xs" style={{ flex: 1 }}>
                        <Edit3 size={14} /> Edit Profile
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Delete profile for ${doc.name}?`)) {
                            deleteDoctor(doc.id);
                            showToast('Doctor profile removed.');
                          }
                        }} 
                        className="btn btn-danger btn-xs"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: SERVICES MANAGER */}
          {/* ======================================================== */}
          {activeTab === 'services' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <div>
                  <h2>Website Services Manager</h2>
                  <p>Add, edit, or remove home visit treatment services.</p>
                </div>
                <button onClick={() => setShowAddServiceModal(true)} className="btn btn-primary btn-sm">
                  <Plus size={16} /> Add New Service
                </button>
              </div>

              {/* Add Service Modal */}
              {showAddServiceModal && (
                <div className="admin-modal-overlay">
                  <div className="admin-modal-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <h3>Add New Treatment Service</h3>
                      <button onClick={() => setShowAddServiceModal(false)} className="btn-icon">
                        <X size={20} />
                      </button>
                    </div>

                    <form onSubmit={handleAddServiceSubmit}>
                      <div className="form-group">
                        <label>Service Title</label>
                        <input type="text" name="title" placeholder="e.g. Laser & Electro Therapy" required className="form-control" />
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Short Description (Displays on cards)</label>
                        <input type="text" name="description" placeholder="Brief summary" required className="form-control" />
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Full Details & Treatment Scope</label>
                        <textarea name="details" rows={3} placeholder="Detailed explanation" className="form-control" />
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Service Photo Image URL</label>
                        <input type="text" name="image" placeholder="/hero_physio_home.png" className="form-control" />
                      </div>

                      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button type="button" onClick={() => setShowAddServiceModal(false)} className="btn btn-dark">Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Service</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Edit Service Modal */}
              {editingServiceId && serviceForm && (
                <div className="admin-modal-overlay">
                  <div className="admin-modal-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <h3>Edit Service: {serviceForm.title}</h3>
                      <button onClick={() => setEditingServiceId(null)} className="btn-icon">
                        <X size={20} />
                      </button>
                    </div>

                    <form onSubmit={saveServiceEdit}>
                      <div className="form-group">
                        <label>Service Title</label>
                        <input 
                          type="text" 
                          value={serviceForm.title} 
                          onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                          className="form-control" 
                        />
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Short Description</label>
                        <input 
                          type="text" 
                          value={serviceForm.description} 
                          onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                          className="form-control" 
                        />
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Full Details</label>
                        <textarea 
                          rows={3} 
                          value={serviceForm.details || ''} 
                          onChange={(e) => setServiceForm({ ...serviceForm, details: e.target.value })}
                          className="form-control" 
                        />
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Image URL</label>
                        <input 
                          type="text" 
                          value={serviceForm.image || ''} 
                          onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                          className="form-control" 
                        />
                      </div>

                      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button type="button" onClick={() => setEditingServiceId(null)} className="btn btn-dark">Cancel</button>
                        <button type="submit" className="btn btn-primary">Update Service</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Services List */}
              <div className="services-admin-grid">
                {siteContent.services.map((serv) => (
                  <div key={serv.id} className="admin-card">
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-orange)' }}>{serv.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#D4D4D4', marginBottom: '1rem' }}>{serv.description}</p>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                      <button onClick={() => startEditService(serv)} className="btn btn-outline-light btn-xs">
                        <Edit3 size={14} /> Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Delete service "${serv.title}"?`)) {
                            deleteService(serv.id);
                            showToast('Service deleted.');
                          }
                        }} 
                        className="btn btn-danger btn-xs"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: PATIENT TESTIMONIALS */}
          {/* ======================================================== */}
          {activeTab === 'testimonials' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <div>
                  <h2>Patient Testimonials & Google Reviews</h2>
                  <p>Manage review quotes displayed in the homepage testimonial slider.</p>
                </div>
              </div>

              {/* Add Testimonial Card */}
              <div className="admin-card" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Add New Patient Review</h3>
                <form onSubmit={handleAddTestimonialSubmit}>
                  <div className="form-grid-3">
                    <div className="form-group">
                      <label>Patient Name</label>
                      <input 
                        type="text" 
                        value={newTestName} 
                        onChange={(e) => setNewTestName(e.target.value)}
                        placeholder="e.g. Dhilipkumar G"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Review Source</label>
                      <input 
                        type="text" 
                        value={newTestSource} 
                        onChange={(e) => setNewTestSource(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Star Rating</label>
                      <select 
                        value={newTestRating} 
                        onChange={(e) => setNewTestRating(e.target.value)}
                        className="form-control"
                      >
                        <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                        <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label>Review Content Text</label>
                    <textarea 
                      rows={3} 
                      value={newTestText} 
                      onChange={(e) => setNewTestText(e.target.value)}
                      placeholder="Enter patient testimony..."
                      required
                      className="form-control"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
                    <Plus size={16} /> Add Testimonial
                  </button>
                </form>
              </div>

              {/* List of Testimonials */}
              <div className="testimonials-admin-grid">
                {siteContent.testimonials.map((t) => (
                  <div key={t.id} className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="testimonial-initials-badge">{t.initials}</div>
                        <div>
                          <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{t.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-dark)' }}>{t.source}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          deleteTestimonial(t.id);
                          showToast('Review removed.');
                        }}
                        className="btn btn-danger btn-xs"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#D4D4D4', lineHeight: '1.5' }}>
                      "{t.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: APPOINTMENT LEADS TRACKER */}
          {/* ======================================================== */}
          {activeTab === 'appointments' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <div>
                  <h2>Patient Appointment Booking Leads</h2>
                  <p>View and manage direct appointment requests submitted by patients online.</p>
                </div>
              </div>

              {siteContent.appointments.length === 0 ? (
                <div className="admin-card text-center" style={{ padding: '3rem' }}>
                  <Calendar size={48} color="var(--color-muted-dark)" style={{ marginBottom: '1rem' }} />
                  <h3>No Appointments Received Yet</h3>
                  <p style={{ color: 'var(--color-muted-dark)', fontSize: '0.9rem' }}>
                    When patients fill out the appointment booking form, their details will automatically show up here.
                  </p>
                </div>
              ) : (
                <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div className="appointments-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Date / Time</th>
                          <th>Patient Name</th>
                          <th>Phone</th>
                          <th>Requested Service</th>
                          <th>Preferred Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {siteContent.appointments.map((app) => (
                          <tr key={app.id}>
                            <td style={{ fontSize: '0.8rem', color: 'var(--color-muted-dark)' }}>
                              {new Date(app.createdAt).toLocaleDateString()}
                            </td>
                            <td style={{ fontWeight: '600' }}>{app.fullName}</td>
                            <td>{app.phone}</td>
                            <td><span className="badge-chip">{app.service}</span></td>
                            <td>{app.preferredDate}</td>
                            <td>
                              <select 
                                value={app.status}
                                onChange={(e) => {
                                  updateAppointmentStatus(app.id, e.target.value);
                                  showToast(`Updated status to ${e.target.value}`);
                                }}
                                className={`status-select-pill ${app.status}`}
                              >
                                <option value="pending">Pending ⏳</option>
                                <option value="contacted">Contacted 📞</option>
                                <option value="completed">Completed ✅</option>
                              </select>
                            </td>
                            <td>
                              <a 
                                href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${app.fullName}, this is Dr. Zeenith from PhiZeeo Physiotherapy following up on your home visit request for ${app.service}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-xs"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                              >
                                <MessageCircle size={14} /> Reply WhatsApp
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
