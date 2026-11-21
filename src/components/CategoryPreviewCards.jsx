import React from 'react';
import { Cake, Sun, HeartHandshake, Baby, ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES_METADATA } from '../data/initialEvents';

export default function CategoryPreviewCards({ navigateTo, onSelectCategory }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Cake':
        return <Cake size={20} />;
      case 'Sun':
        return <Sun size={20} />;
      case 'HeartHandshake':
        return <HeartHandshake size={20} />;
      case 'Baby':
        return <Baby size={20} />;
      default:
        return <Sparkles size={20} />;
    }
  };

  const handleCardClick = (catName) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
    navigateTo('/events');
  };

  return (
    <section className="categories-preview-section" id="categories-section">
      <div className="section-header">
        <span className="section-tag">Cherished Milestones</span>
        <h2 className="section-title">Explore by Milestone</h2>
        <p className="section-subtitle">
          Select a celebration type to find tailored decor packages, authentic ritual setups, and hassle-free arrangements.
        </p>
      </div>

      <div className="categories-grid">
        {CATEGORIES_METADATA.map((cat) => (
          <article
            key={cat.name}
            className="category-card"
            id={`category-preview-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => handleCardClick(cat.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCardClick(cat.name);
              }
            }}
          >
            {/* Visual Media Header */}
            <div className="cat-image-container">
              <img
                src={cat.bannerImage}
                alt={`${cat.title} celebration`}
                className="cat-image"
                loading="lazy"
              />
              <span
                className="cat-badge-top"
                style={{
                  backgroundColor: cat.pastelBg,
                  color: cat.accentColor,
                  borderColor: cat.pastelBorder
                }}
              >
                {cat.badge}
              </span>
            </div>

            {/* Card Content */}
            <div className="cat-card-body">
              <div className="cat-card-header">
                <div
                  className="cat-icon-badge"
                  style={{
                    backgroundColor: cat.pastelBg,
                    color: cat.accentColor,
                    borderColor: cat.pastelBorder
                  }}
                >
                  {getIcon(cat.icon)}
                </div>
                <h3 className="cat-card-title">{cat.title}</h3>
              </div>

              <p className="cat-card-desc">{cat.subtitle}</p>

              <div className="cat-card-footer">
                <div className="cat-price-info">
                  <span className="cat-price-label">Starting from</span>
                  <span className="cat-price-val">{cat.startingPrice}</span>
                </div>

                <div
                  className="cat-btn-link"
                  aria-label={`Explore ${cat.title} packages`}
                >
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
