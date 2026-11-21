import React from 'react';
import { Sparkles, Compass, PlusCircle } from 'lucide-react';

export default function HeroSection({ navigateTo }) {
  return (
    <section className="hero-section">
      <div className="hero-glow-blob" />
      
      {/* Celebration Pill Badge */}
      <div className="hero-pill">
        <Sparkles size={15} />
        <span>Handcrafted Milestone Experiences</span>
      </div>

      {/* Main Title */}
      <h1 className="hero-title">
        Celebrate Life's Special Moments with{' '}
        <span className="hero-title-highlight">Effortless Grace</span>
      </h1>

      {/* Subtitle / Welcome Introduction */}
      <p className="hero-subtitle">
        Welcome to <strong>CelebrationCraft</strong> — your simple destination for personal celebrations.
        Whether you are planning a vibrant <strong>Haldi Ceremony</strong>, a dream <strong>Marriage</strong>, a milestone <strong>Birthday</strong>, or a tender <strong>Baby Shower</strong>, our packages make every moment sweet and stress-free.
      </p>

      {/* Hero Action Buttons */}
      <div className="hero-actions">
        <button
          id="hero-explore-btn"
          className="btn-primary"
          onClick={() => navigateTo('/events')}
        >
          <Compass size={17} />
          <span>Browse Event Catalog</span>
        </button>

        <button
          id="hero-create-btn"
          className="btn-secondary"
          onClick={() => navigateTo('/create')}
        >
          <PlusCircle size={17} />
          <span>Add Custom Theme</span>
        </button>
      </div>

      {/* Trust & Milestone Metrics */}
      <div className="hero-stats-grid">
        <div className="hero-stat-card">
          <div className="stat-value">5,200+</div>
          <div className="stat-label">Milestones Celebrated</div>
        </div>
        <div className="hero-stat-card">
          <div className="stat-value">4.95 ★</div>
          <div className="stat-label">Happy Client Rating</div>
        </div>
        <div className="hero-stat-card">
          <div className="stat-value">100%</div>
          <div className="stat-label">Transparent Pricing</div>
        </div>
      </div>
    </section>
  );
}
