import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import BookingPage from './pages/BookingPage';
import CreateEventPage from './pages/CreateEventPage';
import BookingModal from './components/BookingModal';
import Toast from './components/Toast';
import { INITIAL_EVENTS } from './data/initialEvents';

export default function App() {
  // 1. Navigation State with browser history sync
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname;
    if (['/events', '/book', '/create'].includes(path)) {
      return path;
    }
    return '/';
  });

  // 2. Events State (Requirement: live state list)
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('celebrationcraft_events');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return INITIAL_EVENTS;
  });

  // Save to localStorage when events change
  useEffect(() => {
    try {
      localStorage.setItem('celebrationcraft_events', JSON.stringify(events));
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }
  }, [events]);

  // 3. Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // 4. Booking State
  const [preSelectedEvent, setPreSelectedEvent] = useState(null);
  const [activeBookingReceipt, setActiveBookingReceipt] = useState(null);
  const [bookingsList, setBookingsList] = useState(() => {
    try {
      const saved = localStorage.getItem('celebrationcraft_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch (_e) {
      return [];
    }
  });

  // 5. Toast Notification State
  const [toast, setToast] = useState(null);

  // Sync route changes with browser history and popstate
  const navigateTo = (route) => {
    setCurrentRoute(route);
    try {
      window.history.pushState(null, '', route);
    } catch (_e) {
      // Fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (['/', '/events', '/book', '/create'].includes(path)) {
        setCurrentRoute(path);
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Show Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Handler: When user clicks "Book Now" on an event card
  const handleBookNow = (event) => {
    setPreSelectedEvent(event);
    navigateTo('/book');
    showToast(`Selected "${event.title}" for reservation!`, 'info');
  };

  // Handler: When user selects a category card from Home preview
  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchQuery('');
  };

  // Handler: When user completes a booking
  const handleBookingSuccess = (newBooking) => {
    const updatedBookings = [newBooking, ...bookingsList];
    setBookingsList(updatedBookings);
    try {
      localStorage.setItem('celebrationcraft_bookings', JSON.stringify(updatedBookings));
    } catch (_e) {
      // Ignore
    }

    setActiveBookingReceipt(newBooking);
    showToast(`🎉 Reservation ${newBooking.bookingId} Confirmed!`, 'success');
  };

  // Handler: State Management for adding a new celebration package
  const handleAddEvent = (newEvent) => {
    // Instantly update React State list
    setEvents((prev) => [newEvent, ...prev]);

    // Show toast and navigate to catalog so user sees the newly added theme
    showToast(`✨ "${newEvent.title}" published to Live Catalog!`, 'success');
    setSelectedCategory('All');
    setSearchQuery('');
    navigateTo('/events');
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <Navbar
        currentRoute={currentRoute}
        navigateTo={navigateTo}
        totalEvents={events.length}
      />

      {/* Main Page Content */}
      <main className="content-wrapper">
        {currentRoute === '/' && (
          <HomePage
            navigateTo={navigateTo}
            onSelectCategory={handleSelectCategory}
            featuredEvents={events}
            onBookNow={handleBookNow}
          />
        )}

        {currentRoute === '/events' && (
          <CatalogPage
            events={events}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onBookNow={handleBookNow}
            navigateTo={navigateTo}
          />
        )}

        {currentRoute === '/book' && (
          <BookingPage
            events={events}
            preSelectedEvent={preSelectedEvent}
            onBookingSuccess={handleBookingSuccess}
            bookingsList={bookingsList}
          />
        )}

        {currentRoute === '/create' && (
          <CreateEventPage
            onAddEvent={handleAddEvent}
            navigateTo={navigateTo}
          />
        )}
      </main>

      {/* Booking Confirmation Modal */}
      <BookingModal
        booking={activeBookingReceipt}
        onClose={() => setActiveBookingReceipt(null)}
        onBrowseMore={() => {
          setActiveBookingReceipt(null);
          navigateTo('/events');
        }}
      />

      {/* Global Notification Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Global Footer */}
      <Footer
        navigateTo={navigateTo}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}
