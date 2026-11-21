import React from 'react';
import HeroSection from '../components/HeroSection';
import CategoryPreviewCards from '../components/CategoryPreviewCards';
import EventCard from '../components/EventCard';
import { Sparkles, ArrowRight, CheckCircle2, Heart } from 'lucide-react';

export default function HomePage({
  navigateTo,
  onSelectCategory,
  featuredEvents,
  onBookNow
}) {
  return (
    <div className="home-page-view" id="home-page-view">
      {/* 1. Hero Section: Welcome message with brief introduction */}
      <HeroSection navigateTo={navigateTo} />

      {/* 2. Category Preview Cards: 4 static cards for Birthday, Haldi, Marriage, and Baby Shower */}
      <CategoryPreviewCards
        navigateTo={navigateTo}
        onSelectCategory={onSelectCategory}
      />

      {/* Highlighted Featured Milestone Packages Preview */}
      <section style={{ marginTop: '3.5rem', marginBottom: '3rem' }}>
        <div className="section-header">
          <span className="section-tag">Curated Highlights</span>
          <h2 className="section-title">Popular Celebration Packages</h2>
          <p className="section-subtitle">
            A hand-picked selection of our most loved packages across India's most cherished celebrations.
          </p>
        </div>

        <div className="events-grid">
          {featuredEvents.slice(0, 3).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onBookNow={onBookNow}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            id="view-all-catalog-btn"
            className="btn-secondary"
            onClick={() => navigateTo('/events')}
            style={{ padding: '0.75rem 1.75rem' }}
          >
            <span>Explore All {featuredEvents.length} Celebration Packages</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Why CelebrationCraft Trust Banner */}
      <section className="trust-banner">
        <div className="trust-card">
          <div className="trust-icon-box" style={{ backgroundColor: 'var(--pastel-lavender-bg)', color: 'var(--pastel-lavender-text)' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="trust-card-title">Authentic Traditions</h4>
            <p className="trust-card-desc">
              Specialized setups adhering to traditional cultural rituals with modern elegance.
            </p>
          </div>
        </div>

        <div className="trust-card">
          <div className="trust-icon-box" style={{ backgroundColor: 'var(--pastel-yellow-bg)', color: 'var(--pastel-yellow-text)' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h4 className="trust-card-title">Transparent Pricing</h4>
            <p className="trust-card-desc">
              Clear breakdown of every service element with zero hidden surprise charges.
            </p>
          </div>
        </div>

        <div className="trust-card">
          <div className="trust-icon-box" style={{ backgroundColor: 'var(--pastel-rose-bg)', color: 'var(--pastel-rose-text)' }}>
            <Heart size={20} />
          </div>
          <div>
            <h4 className="trust-card-title">Custom Themes</h4>
            <p className="trust-card-desc">
              Design and add your own custom milestone packages directly with live React state.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
