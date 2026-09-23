import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DEFAULT_SITE_CONTENT = {
  hero: {
    eyebrow: "HOME PHYSIOTHERAPY IN CHENNAI",
    titlePrefix: "Heal Comfortably at ",
    titleHighlight: "Home",
    titleSuffix: "",
    subtext: "PhiZeeo is a home physiotherapy and rehabilitation service helping people recover, move better, and live more independently at home.",
    tagline: '"We Treat. God Heals."',
    image: "/hero_physio_home.png",
    googleRatingText: "5-Star Rated on Google",
    trustBadge2: "Home Practice Since 2017",
    trustBadge3: "Personalized Plans"
  },
  contact: {
    phone: "+91 93604 47385",
    whatsappNumber: "919360447385",
    email: "contact.phizeeo@gmail.com",
    address: "Chennai & Nearby Regions, Tamil Nadu, India",
    workingHours: "Mon - Sat: 7:00 AM - 8:30 PM",
    whatsappMessage: "Hi, I'd like to book a home physio visit."
  },
  pictures: [
    {
      id: "pic_1",
      title: "Home Physio Therapy Session",
      category: "Hero / Home Visit",
      url: "/hero_physio_home.png",
      dateAdded: "2026-09-01",
      isHero: true
    },
    {
      id: "pic_2",
      title: "PhiZeeo Rehabilitation Team",
      category: "Clinic & Team",
      url: "/about_physio_team.png",
      dateAdded: "2026-09-02",
      isHero: false
    },
    {
      id: "pic_3",
      title: "Dr. Zeenith VR Profile Photo",
      category: "Doctors / Staff",
      url: "/zeedr.png",
      dateAdded: "2026-09-03",
      isHero: false
    },
    {
      id: "pic_4",
      title: "Dr. Ramya Josephine Profile Photo",
      category: "Doctors / Staff",
      url: "/jdr.png",
      dateAdded: "2026-09-04",
      isHero: false
    }
  ],
  services: [
    {
      id: "home-physio",
      title: "Home Visit Physio",
      iconName: "Home",
      description: "Professional treatment delivered directly at your home.",
      details: "No travel stress, no waiting rooms—just focused, one-on-one care tailored around your daily home routine.",
      image: "/hero_physio_home.png"
    },
    {
      id: "orthopedic-rehab",
      title: "Orthopedic Rehab",
      iconName: "Activity",
      description: "Pain relief and mobility recovery for joints, spine and post-fractures.",
      details: "Specialized manual therapy, dry needling, joint mobilization, and strength rehabilitation for back pain, knee arthritis, and post-surgical joints.",
      image: "/about_physio_team.png"
    },
    {
      id: "neuro-rehab",
      title: "Neuro Rehabilitation",
      iconName: "Brain",
      description: "Stroke, paralysis and neurological recovery programs.",
      details: "Task-oriented neuro physiotherapy focused on balance recovery, gait training, stroke motor re-education, and Parkinson's mobility support.",
      image: "/hero_physio_home.png"
    },
    {
      id: "sports-rehab",
      title: "Sports Injury Rehab",
      iconName: "Zap",
      description: "Injury recovery and performance training for athletes.",
      details: "Targeted ligament rehabilitation, tendon management, electrotherapy, and return-to-sport physical conditioning.",
      image: "/about_physio_team.png"
    },
    {
      id: "pediatric-geriatric",
      title: "Pediatric & Geriatric Care",
      iconName: "Users",
      description: "Specialized care for children and elderly patients.",
      details: "Gentle balance conditioning, fall prevention, joint flexibility, and developmental physiotherapy delivered with patience and warmth.",
      image: "/hero_physio_home.png"
    },
    {
      id: "cardiopulmonary-rehab",
      title: "Cardiopulmonary Rehab",
      iconName: "HeartPulse",
      description: "Recovery support for heart and lung conditions.",
      details: "Breathing exercises, chest physio, oxygenation endurance training, and post-cardiac surgery rehabilitation at home.",
      image: "/about_physio_team.png"
    }
  ],
  doctors: [
    {
      id: "zee",
      name: "Dr. Zeenith VR (PT)",
      role: "Chief Rehabilitation Specialist",
      credentials: "B.P.T, M.P.T (Neuro Rehab)",
      experience: "8+ Years Exp.",
      rating: "5.0 ★ (120+ Patients)",
      location: "Chennai Home Visits",
      img: "/zeedr.png",
      bio: "Dr. Zeenith VR has practiced home-visit physiotherapy in Chennai since 2017. He specializes in comprehensive physical evaluation, orthopedic rehabilitation, neurological recovery (including post-stroke and paralysis therapy), and acute & chronic pain management.",
      specialties: [
        "Orthopedic & Joint Pain Rehab",
        "Stroke & Neurological Recovery",
        "Post-Surgical Care at Home",
        "Acute & Chronic Spine Therapy"
      ],
      whatsappMsg: "Hi Dr. Zeenith VR, I'd like to book a home physio consultation."
    },
    {
      id: "ramya",
      name: "Dr. Ramya Josephine (PT)",
      role: "Women's Health & Geriatric Specialist",
      credentials: "B.P.T, Women's Health Specialist",
      experience: "7+ Years Exp.",
      rating: "5.0 ★ (95+ Patients)",
      location: "Chennai Home Visits",
      img: "/jdr.png",
      bio: "Dr. Ramya Josephine specializes in post-surgery physical rehabilitation, geriatric care, stroke recovery therapy, and dedicated women's health physiotherapy. She delivers gentle, expert home visits designed for long-term mobility and wellness.",
      specialties: [
        "Women's Health & Postnatal Care",
        "Geriatric Balance & Fall Prevention",
        "Post-Op Knee & Hip Rehabilitation",
        "Gentle Stroke & Mobility Therapy"
      ],
      whatsappMsg: "Hi Dr. Ramya Josephine, I'd like to book a home physio consultation."
    }
  ],
  testimonials: [
    {
      id: "test_1",
      initials: "DG",
      name: "Dhilipkumar G",
      source: "Verified Google Review",
      rating: 5,
      text: "First-time experience was great; the doctor was friendly, took time to explain the condition and treatment options clearly. Highly recommend the home visit service!"
    },
    {
      id: "test_2",
      initials: "VP",
      name: "Verified Patient",
      source: "Verified Google Review",
      rating: 5,
      text: "Excellent, professional treatment with clear explanations and guidance throughout. Having physio at home is extremely convenient and comforting."
    },
    {
      id: "test_3",
      initials: "B",
      name: "Banumathy",
      source: "Verified Google Review",
      rating: 5,
      text: "My mother-in-law was hospitalized for 3 months and could not walk for over a month. After Dr. Zee's dedicated therapy, she now walks independently!"
    }
  ],
  appointments: []
};

const STORAGE_KEY = 'phizeeo_site_content_v2';

const SiteContentContext = createContext();

export function SiteContentProvider({ children }) {
  const [siteContent, setSiteContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          hero: { ...DEFAULT_SITE_CONTENT.hero, ...(parsed.hero || {}) },
          contact: { ...DEFAULT_SITE_CONTENT.contact, ...(parsed.contact || {}) },
          pictures: parsed.pictures?.length ? parsed.pictures : DEFAULT_SITE_CONTENT.pictures,
          services: parsed.services?.length ? parsed.services : DEFAULT_SITE_CONTENT.services,
          doctors: parsed.doctors?.length ? parsed.doctors : DEFAULT_SITE_CONTENT.doctors,
          testimonials: parsed.testimonials?.length ? parsed.testimonials : DEFAULT_SITE_CONTENT.testimonials,
          appointments: parsed.appointments || []
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved site content:', e);
    }
    return DEFAULT_SITE_CONTENT;
  });

  // Save to local storage on any change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteContent));
    } catch (e) {
      console.warn('Failed to save site content to localStorage:', e);
    }
  }, [siteContent]);

  // Fetch real appointments from Supabase if connected
  useEffect(() => {
    let isMounted = true;
    async function fetchSupabaseAppointments() {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && isMounted) {
          const formatted = data.map((item) => ({
            id: item.id || `app_${Math.random().toString(36).substr(2, 9)}`,
            fullName: item.full_name || 'Patient',
            phone: item.phone_number || '',
            service: item.service || 'General Consultation',
            preferredDate: item.preferred_date || 'Flexible',
            notes: item.notes || '',
            status: item.status || 'pending',
            createdAt: item.created_at || new Date().toISOString()
          }));

          setSiteContent((prev) => ({
            ...prev,
            appointments: formatted
          }));
        }
      } catch (err) {
        console.warn('Could not fetch Supabase appointments:', err);
      }
    }

    fetchSupabaseAppointments();
    return () => {
      isMounted = false;
    };
  }, []);

  // Update hero info
  const updateHeroContent = (newHeroData) => {
    setSiteContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...newHeroData }
    }));
  };

  // Update contact info
  const updateContactContent = (newContactData) => {
    setSiteContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...newContactData }
    }));
  };

  // Picture Management
  const addPicture = (pictureObj) => {
    const newPic = {
      id: `pic_${Date.now()}`,
      title: pictureObj.title || 'Uploaded Picture',
      category: pictureObj.category || 'General',
      url: pictureObj.url,
      dateAdded: new Date().toISOString().split('T')[0],
      isHero: Boolean(pictureObj.isHero)
    };

    setSiteContent((prev) => {
      let updatedPics = [newPic, ...prev.pictures];
      let updatedHero = prev.hero;

      if (newPic.isHero) {
        updatedPics = updatedPics.map(p => ({
          ...p,
          isHero: p.id === newPic.id
        }));
        updatedHero = { ...prev.hero, image: newPic.url };
      }

      return {
        ...prev,
        pictures: updatedPics,
        hero: updatedHero
      };
    });
    return newPic;
  };

  const setHeroPicture = (pictureId) => {
    setSiteContent((prev) => {
      const target = prev.pictures.find(p => p.id === pictureId);
      if (!target) return prev;

      const updatedPics = prev.pictures.map(p => ({
        ...p,
        isHero: p.id === pictureId
      }));

      return {
        ...prev,
        pictures: updatedPics,
        hero: { ...prev.hero, image: target.url }
      };
    });
  };

  const deletePicture = (pictureId) => {
    setSiteContent((prev) => ({
      ...prev,
      pictures: prev.pictures.filter(p => p.id !== pictureId)
    }));
  };

  // Services Management
  const updateService = (id, updatedData) => {
    setSiteContent((prev) => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...updatedData } : s)
    }));
  };

  const addService = (newService) => {
    const serviceObj = {
      id: `service_${Date.now()}`,
      title: newService.title || 'New Physio Service',
      iconName: newService.iconName || 'Activity',
      description: newService.description || '',
      details: newService.details || '',
      image: newService.image || '/hero_physio_home.png'
    };

    setSiteContent((prev) => ({
      ...prev,
      services: [...prev.services, serviceObj]
    }));
  };

  const deleteService = (id) => {
    setSiteContent((prev) => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  // Doctors / Specialists Management
  const updateDoctor = (id, updatedData) => {
    setSiteContent((prev) => ({
      ...prev,
      doctors: prev.doctors.map(d => d.id === id ? { ...d, ...updatedData } : d)
    }));
  };

  const addDoctor = (newDoc) => {
    const docObj = {
      id: newDoc.id || `doc_${Date.now()}`,
      name: newDoc.name || 'Dr. Physio',
      role: newDoc.role || 'Physiotherapy Specialist',
      credentials: newDoc.credentials || 'B.P.T',
      experience: newDoc.experience || '5+ Years Exp.',
      rating: newDoc.rating || '5.0 ★',
      location: newDoc.location || 'Chennai Home Visits',
      img: newDoc.img || '/zeedr.png',
      bio: newDoc.bio || '',
      specialties: newDoc.specialties || ['Home Visit Therapy'],
      whatsappMsg: newDoc.whatsappMsg || "Hi, I'd like to book a consultation."
    };

    setSiteContent((prev) => ({
      ...prev,
      doctors: [...prev.doctors, docObj]
    }));
  };

  const deleteDoctor = (id) => {
    setSiteContent((prev) => ({
      ...prev,
      doctors: prev.doctors.filter(d => d.id !== id)
    }));
  };

  // Testimonial Management
  const addTestimonial = (newTest) => {
    const item = {
      id: `test_${Date.now()}`,
      name: newTest.name || 'Patient',
      initials: (newTest.name || 'P').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      source: newTest.source || 'Verified Google Review',
      rating: newTest.rating || 5,
      text: newTest.text || ''
    };

    setSiteContent((prev) => ({
      ...prev,
      testimonials: [item, ...prev.testimonials]
    }));
  };

  const deleteTestimonial = (id) => {
    setSiteContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  // Appointment Lead Status Updater
  const updateAppointmentStatus = async (id, newStatus) => {
    setSiteContent((prev) => ({
      ...prev,
      appointments: prev.appointments.map(a => a.id === id ? { ...a, status: newStatus } : a)
    }));

    // Try updating Supabase if table exists
    try {
      await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
    } catch (e) {
      console.warn('Supabase update notice:', e);
    }
  };

  const addManualAppointment = (appData) => {
    const newApp = {
      id: `app_${Date.now()}`,
      fullName: appData.fullName,
      phone: appData.phone,
      service: appData.service,
      preferredDate: appData.preferredDate || 'Today',
      notes: appData.notes || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setSiteContent((prev) => ({
      ...prev,
      appointments: [newApp, ...prev.appointments]
    }));
  };

  // Factory Reset
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSiteContent(DEFAULT_SITE_CONTENT);
  };

  return (
    <SiteContentContext.Provider
      value={{
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
        addManualAppointment,
        resetToDefaults
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
}
