import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer({ navigateTo, onSelectCategory }) {
  const handleCatClick = (cat) => {
    if (onSelectCategory) onSelectCategory(cat);
    navigateTo('/events');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Column */}
        <div>
          <div className="brand-logo" style={{ cursor: 'pointer' }} onClick={() => navigateTo('/')}>
            <div className="brand-icon-wrap" style={{ width: '36px', height: '36px' }}>
              <Sparkles size={18} />
            </div>
            <div>
              <span className="brand-name" style={{ fontSize: '1.25rem' }}>CelebrationCraft</span>
              <span className="brand-tag">Milestone Celebrations</span>
            </div>
          </div>
          <p className="footer-brand-desc">
            Empowering families to cherish sacred rituals and grand milestones. 
            From Haldi marigolds and royal marriages to jubilant birthdays and divine baby showers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links-list">
            <li className="footer-link-item">
              <button onClick={() => navigateTo('/')}>Home Page</button>
            </li>
            <li className="footer-link-item">
              <button onClick={() => navigateTo('/events')}>Event Catalog</button>
            </li>
            <li className="footer-link-item">
              <button onClick={() => navigateTo('/book')}>Book Package</button>
            </li>
            <li className="footer-link-item">
              <button onClick={() => navigateTo('/create')}>Add Custom Event</button>
            </li>
          </ul>
        </div>

        {/* Milestone Categories */}
        <div>
          <h4 className="footer-col-title">Milestones</h4>
          <ul className="footer-links-list">
            <li className="footer-link-item">
              <button onClick={() => handleCatClick('Birthday')}>Milestone Birthdays</button>
            </li>
            <li className="footer-link-item">
              <button onClick={() => handleCatClick('Haldi Ceremony')}>Haldi Ceremonies</button>
            </li>
            <li className="footer-link-item">
              <button onClick={() => handleCatClick('Marriage')}>Royal Marriages</button>
            </li>
            <li className="footer-link-item">
              <button onClick={() => handleCatClick('Baby Shower')}>Baby Showers</button>
            </li>
          </ul>
        </div>

        {/* Project Submission Info */}
        <div>
          <h4 className="footer-col-title">Academic Submission</h4>
          <p className="footer-academic-text">
            Single-page React Application developed for <strong>Third Component Task Submission</strong>.
          </p>
          <div className="academic-badge">
            React State • Props • Validated Forms
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} CelebrationCraft. Crafted for milestone memories.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          Built with React & Pastel Vanilla CSS
        </div>
      </div>
    </footer>
  );
}
