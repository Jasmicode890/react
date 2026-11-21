import React from 'react';
import { Star, Users, Clock, Check, ArrowRight, Sparkles } from 'lucide-react';

/**
 * Returns cohesive pastel style definitions for each celebration category
 */
export const getCategoryPastel = (category = '') => {
  const norm = category.toLowerCase();
  if (norm.includes('birthday')) {
    return {
      text: '#7e22ce',
      bg: '#f3e8ff',
      border: '#e9d5ff',
      dot: '#a855f7'
    };
  }
  if (norm.includes('haldi')) {
    return {
      text: '#b45309',
      bg: '#fef3c7',
      border: '#fde68a',
      dot: '#f59e0b'
    };
  }
  if (norm.includes('marr') || norm.includes('wed')) {
    return {
      text: '#be123c',
      bg: '#ffe4e6',
      border: '#fecdd3',
      dot: '#f43f5e'
    };
  }
  if (norm.includes('baby')) {
    return {
      text: '#0369a1',
      bg: '#e0f2fe',
      border: '#bae6fd',
      dot: '#0284c7'
    };
  }
  return {
    text: '#9d174d',
    bg: '#fce7f3',
    border: '#fbcfe8',
    dot: '#ec4899'
  };
};

/**
 * EventCard Component
 * Displays celebration type, base price, guest capacity, duration, and a "Book Now" button using Props.
 * Styled with soft, clean pastel aesthetics.
 */
export default function EventCard({ event, onBookNow }) {
  const pastel = getCategoryPastel(event.category);

  return (
    <article className="event-card" id={`event-card-${event.id}`}>
      {/* Media & Badges */}
      <div className="event-card-media">
        <img
          src={event.image || "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"}
          alt={`${event.title} - ${event.category}`}
          className="event-card-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Soft Category Pastel Pill */}
        <span
          className="event-category-chip"
          style={{
            backgroundColor: pastel.bg,
            color: pastel.text,
            borderColor: pastel.border
          }}
        >
          <span
            className="category-dot"
            style={{ backgroundColor: pastel.dot }}
          />
          <span>{event.category}</span>
        </span>

        {/* Soft Badge Tag */}
        {event.badge && (
          <span className="event-badge-tag">
            {event.badge}
          </span>
        )}

        {/* Rating Pill */}
        {event.rating && (
          <div className="event-rating-pill" title={`${event.rating} out of 5 stars`}>
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>{event.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="event-card-content">
        <h3 className="event-card-title">{event.title}</h3>
        {event.tagline && <p className="event-card-tagline">{event.tagline}</p>}
        <p className="event-card-desc">{event.description}</p>

        {/* Metadata info */}
        <div className="event-meta-row">
          <div className="meta-item">
            <Users size={14} />
            <span>{event.guestCapacity || "50 - 150 Guests"}</span>
          </div>
          <div className="meta-item">
            <Clock size={14} />
            <span>{event.duration || "5 Hours"}</span>
          </div>
        </div>

        {/* Features Checklist */}
        {event.features && event.features.length > 0 && (
          <ul className="event-features-list">
            {event.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="event-feature-item">
                <div className="feature-check-icon-wrap">
                  <Check size={12} className="feature-check-icon" />
                </div>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Card Footer: Base Price & Book Now button */}
        <div className="event-card-actions">
          <div className="event-price-box">
            <span className="event-price-label">Starts at</span>
            <span className="event-base-price">
              {event.formattedPrice || `₹${Number(event.price).toLocaleString('en-IN')}`}
            </span>
          </div>

          <button
            id={`book-btn-${event.id}`}
            className="btn-book-now"
            onClick={() => onBookNow(event)}
            aria-label={`Book ${event.title} celebration`}
          >
            <span>Book Now</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
