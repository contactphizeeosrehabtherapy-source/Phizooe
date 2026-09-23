import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function TestimonialCarousel() {
  const { siteContent } = useSiteContent();
  const testimonials = siteContent.testimonials;

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section-padding bg-cream" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="section-header text-center">
          <div className="eyebrow">PATIENT STORIES</div>
          <h2>What Our Patients <span className="text-orange">Say</span></h2>
          <p>Real stories from patients across Chennai recovering in the comfort of their homes.</p>
        </div>

        <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative' }}>
          <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
            <div 
              style={{ 
                display: 'flex', 
                transform: `translateX(-${currentIndex * 100}%)`, 
                transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)' 
              }}
            >
              {testimonials.map((item, idx) => (
                <div key={item.id || idx} style={{ minWidth: '100%', boxSizing: 'border-box', padding: '0.5rem' }}>
                  <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', color: 'var(--color-orange)', marginBottom: '1.25rem' }}>
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                    </div>
                    <p style={{ fontSize: '1.125rem', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '1.75rem' }}>
                      "{item.text}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem' }}>
                      <div 
                        style={{ 
                          width: '48px', 
                          height: '48px', 
                          borderRadius: '50%', 
                          backgroundColor: 'var(--color-orange-light)', 
                          color: 'var(--color-orange-text-cream)', 
                          fontFamily: 'var(--font-heading)', 
                          fontWeight: '700', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}
                      >
                        {item.initials || 'P'}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--color-muted-light)' }}>{item.source}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          {testimonials.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
              <button 
                onClick={prevSlide}
                style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Previous review"
              >
                <ChevronLeft size={20} />
              </button>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {testimonials.map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => setCurrentIndex(i)}
                    style={{
                      width: i === currentIndex ? '24px' : '10px',
                      height: '10px',
                      borderRadius: '999px',
                      backgroundColor: i === currentIndex ? 'var(--color-orange)' : 'var(--color-border)',
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  />
                ))}
              </div>
              <button 
                onClick={nextSlide}
                style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Next review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
