import React from 'react';
import { Heart, Activity, Brain, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';

export default function WhoWeServe() {
  const patientGroups = [
    {
      title: "Elderly Individuals",
      description: "Dedicated geriatric care helping seniors regain balance, prevent falls, and maintain independent mobility at home.",
      icon: <Heart size={24} />
    },
    {
      title: "Post-Surgery & Injury Recovery",
      description: "Specialized rehabilitation following joint replacements, fractures, or major surgery to accelerate safe home healing.",
      icon: <Activity size={24} />
    },
    {
      title: "Neurological Rehab Patients",
      description: "Customized neuro therapy for stroke, paralysis, Parkinson's, and nerve disorders to rebuild movement pattern control.",
      icon: <Brain size={24} />
    },
    {
      title: "Musculoskeletal Conditions",
      description: "Effective drug-free pain relief and joint mobility restoration for neck, spine, knee, and shoulder pain.",
      icon: <ShieldAlert size={24} />
    },
    {
      title: "Patients Facing Travel Difficulty",
      description: "Convenient doorstep physio for those unable or unequipped to navigate busy roads, stairs, and clinic waiting rooms.",
      icon: <UserCheck size={24} />
    },
    {
      title: "Healthy Aging & Active Movement",
      description: "Proactive exercise programs designed to enhance posture, endurance, flexibility, and overall vitality.",
      icon: <Sparkles size={24} />
    }
  ];

  return (
    <section className="section-padding bg-cream" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="section-header text-center">
          <div className="eyebrow">TAILORED CARE</div>
          <h2>Who We <span className="text-orange">Serve</span></h2>
          <p>Delivering expert home-visit physical therapy across diverse rehabilitation needs in Chennai.</p>
        </div>

        <div className="grid-3">
          {patientGroups.map((group, index) => (
            <div key={index} className="serve-card">
              <div className="serve-icon">
                {group.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{group.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-muted-light)' }}>{group.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
