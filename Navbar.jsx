import React, { useState } from 'react';
import { Sparkles, Compass, CalendarPlus, BookmarkCheck, Menu, X, PlusCircle } from 'lucide-react';

export default function Navbar({ currentRoute, navigateTo, totalEvents }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (route) => {
    navigateTo(route);
    setMobileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Brand Logo */}
        <button 
          className="brand-logo" 
          onClick={() => handleNav('/')}
          aria-label="CelebrationCraft Home"
          id="nav-brand-logo"
        >
          <div className="brand-icon-wrap">
            <Sparkles size={22} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="brand-name">CelebrationCraft</span>
            <span className="brand-tag">Milestone Celebrations</span>
          </div>
        </button>

        {/* Desktop & Mobile Navigation Links */}
        <nav 
          className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}
          aria-label="Main Navigation"
        >
          <button
            id="nav-home-btn"
            className={`nav-item-btn ${currentRoute === '/' ? 'active' : ''}`}
            onClick={() => handleNav('/')}
          >
            <span>Home</span>
          </button>

          <button
            id="nav-events-btn"
            className={`nav-item-btn ${currentRoute === '/events' ? 'active' : ''}`}
            onClick={() => handleNav('/events')}
          >
            <Compass size={17} />
            <span>Event Catalog</span>
            <span className="nav-badge" title="Available Packages">{totalEvents}</span>
          </button>

          <button
            id="nav-book-btn"
            className={`nav-item-btn ${currentRoute === '/book' ? 'active' : ''}`}
            onClick={() => handleNav('/book')}
          >
            <BookmarkCheck size={17} />
            <span>Book Now</span>
          </button>

          <button
            id="nav-create-btn"
            className={`nav-item-btn ${currentRoute === '/create' ? 'active' : ''}`}
            onClick={() => handleNav('/create')}
          >
            <PlusCircle size={17} />
            <span>Add Custom Event</span>
          </button>

          <button
            id="nav-cta-plan"
            className="nav-cta-btn"
            onClick={() => handleNav('/book')}
          >
            <CalendarPlus size={16} />
            <span>Book Package</span>
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
          id="mobile-menu-toggle"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
