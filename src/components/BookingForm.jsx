import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  User, Calendar, Users, Sparkles, Mail, Phone, MapPin, 
  CheckCircle, AlertCircle, ShieldCheck, HeartHandshake, Clock 
} from 'lucide-react';
import { getCategoryPastel } from './EventCard';

export default function BookingForm({
  events,
  preSelectedEvent,
  onBookingSuccess,
  bookingsList = []
}) {
  // Form input states using useState
  const [formData, setFormData] = useState(() => ({
    userName: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    celebrationType: preSelectedEvent?.category || events[0]?.category || '',
    packageId: preSelectedEvent?.id || events[0]?.id || '',
    venueType: 'Banquet Hall',
    specialNotes: ''
  }));

  // Validation error state using useState
  const [errors, setErrors] = useState({});

  // Sync pre-selected event if user clicked "Book Now" on a specific card
  useEffect(() => {
    if (preSelectedEvent) {
      setFormData((prev) => ({
        ...prev,
        celebrationType: preSelectedEvent.category || prev.celebrationType,
        packageId: preSelectedEvent.id || prev.packageId
      }));
    }
  }, [preSelectedEvent]);

  // Extract distinct celebration types from events
  const celebrationTypes = Array.from(new Set(events.map((e) => e.category)));

  // Filter packages belonging to selected celebration type
  const availablePackages = events.filter(
    (e) => !formData.celebrationType || e.category.toLowerCase() === formData.celebrationType.toLowerCase()
  );

  // Selected package details for sidebar
  const activePackage = events.find((e) => e.id === formData.packageId) || availablePackages[0] || events[0];

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If celebration type changes, update packageId to first package of that type
    if (name === 'celebrationType') {
      const match = events.find((item) => item.category.toLowerCase() === value.toLowerCase());
      setFormData((prev) => ({
        ...prev,
        celebrationType: value,
        packageId: match ? match.id : ''
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field if corrected
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    validateField(field, formData[field]);
  };

  // Field-level validation using useState
  const validateField = (name, value) => {
    let errorMsg = '';
    const trimmed = typeof value === 'string' ? value.trim() : value;

    switch (name) {
      case 'userName':
        if (!trimmed) {
          errorMsg = 'Full name is required';
        } else if (trimmed.length < 3) {
          errorMsg = 'Name must be at least 3 characters';
        }
        break;

      case 'email':
        if (!trimmed) {
          errorMsg = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          errorMsg = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (!trimmed) {
          errorMsg = 'Contact phone number is required';
        } else if (!/^\+?[0-9\s-]{10,14}$/.test(trimmed)) {
          errorMsg = 'Please enter a valid 10-digit phone number';
        }
        break;

      case 'eventDate':
        if (!value) {
          errorMsg = 'Event date is required';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            errorMsg = 'Event date must be today or in the future';
          }
        }
        break;

      case 'guestCount':
        if (!value || value === '') {
          errorMsg = 'Guest count is required';
        } else if (Number(value) < 1) {
          errorMsg = 'Guest count must be at least 1';
        } else if (Number(value) > 2000) {
          errorMsg = 'For large gatherings over 2000, please contact our VIP team';
        }
        break;

      case 'celebrationType':
        if (!value) {
          errorMsg = 'Please select a celebration type';
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg;
  };

  // Comprehensive Form Validation on Submit
  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'Full name is required';
    } else if (formData.userName.trim().length < 3) {
      newErrors.userName = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    } else {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.eventDate = 'Event date must be today or in the future';
      }
    }

    if (!formData.guestCount) {
      newErrors.guestCount = 'Guest count is required';
    } else if (Number(formData.guestCount) < 1) {
      newErrors.guestCount = 'Guest count must be at least 1';
    }

    if (!formData.celebrationType) {
      newErrors.celebrationType = 'Celebration type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    // Generate Booking Record
    const bookingId = `CC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const pkg = activePackage || { title: `${formData.celebrationType} Package`, formattedPrice: '₹25,000' };

    const newBooking = {
      bookingId,
      userName: formData.userName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      eventDate: formData.eventDate,
      guestCount: Number(formData.guestCount),
      celebrationType: formData.celebrationType,
      packageName: pkg.title,
      estimatedPrice: pkg.formattedPrice || `₹${Number(pkg.price || 25000).toLocaleString('en-IN')}`,
      venueType: formData.venueType,
      specialNotes: formData.specialNotes,
      bookedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    // Festive Confetti
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#a78bfa', '#fde047', '#38bdf8', '#34d399']
      });
    } catch (_err) {
      // Ignore
    }

    // Reset Form
    setFormData({
      userName: '',
      email: '',
      phone: '',
      eventDate: '',
      guestCount: '',
      celebrationType: celebrationTypes[0] || 'Birthday',
      packageId: availablePackages[0]?.id || '',
      venueType: 'Banquet Hall',
      specialNotes: ''
    });
    setErrors({});

    if (onBookingSuccess) {
      onBookingSuccess(newBooking);
    }
  };

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const pkgPastel = getCategoryPastel(activePackage?.category || formData.celebrationType);

  return (
    <div className="booking-page-container">
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '1.75rem' }}>
        <span className="section-tag">Quick Reservation</span>
        <h2 className="section-title">Reserve Your Celebration</h2>
        <p className="section-subtitle" style={{ margin: 0 }}>
          Lock in your date with our event planners in a few simple steps.
        </p>
      </div>

      <div className="booking-page-layout">
        {/* Main Interactive Form Card */}
        <section className="booking-form-card">
          <form onSubmit={handleSubmit} noValidate id="celebration-booking-form">
            <h3 className="form-group-title">
              <span className="group-number-pill">1</span>
              <span>Contact Information</span>
            </h3>

            {/* Name Field */}
            <div className="form-field">
              <label htmlFor="booking-name" className="form-label">
                Full Name <span className="label-required">*</span>
              </label>
              <div className="input-with-icon">
                <User className="input-icon-left" size={17} />
                <input
                  id="booking-name"
                  name="userName"
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  className={`form-input ${errors.userName ? 'error' : ''}`}
                  value={formData.userName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('userName')}
                  required
                />
              </div>
              {errors.userName && (
                <span className="form-error-text" id="error-userName">
                  <AlertCircle size={13} />
                  <span>{errors.userName}</span>
                </span>
              )}
            </div>

            {/* Email & Phone Grid */}
            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="booking-email" className="form-label">
                  Email Address <span className="label-required">*</span>
                </label>
                <div className="input-with-icon">
                  <Mail className="input-icon-left" size={17} />
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    required
                  />
                </div>
                {errors.email && (
                  <span className="form-error-text" id="error-email">
                    <AlertCircle size={13} />
                    <span>{errors.email}</span>
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="booking-phone" className="form-label">
                  Phone Number <span className="label-required">*</span>
                </label>
                <div className="input-with-icon">
                  <Phone className="input-icon-left" size={17} />
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. 9876543210"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('phone')}
                    required
                  />
                </div>
                {errors.phone && (
                  <span className="form-error-text" id="error-phone">
                    <AlertCircle size={13} />
                    <span>{errors.phone}</span>
                  </span>
                )}
              </div>
            </div>

            <h3 className="form-group-title" style={{ marginTop: '1.75rem' }}>
              <span className="group-number-pill">2</span>
              <span>Celebration Details</span>
            </h3>

            {/* Celebration Type & Package Selection */}
            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="booking-celebration-type" className="form-label">
                  Celebration Type <span className="label-required">*</span>
                </label>
                <div className="input-with-icon">
                  <Sparkles className="input-icon-left" size={17} />
                  <select
                    id="booking-celebration-type"
                    name="celebrationType"
                    className={`form-select ${errors.celebrationType ? 'error' : ''}`}
                    value={formData.celebrationType}
                    onChange={handleChange}
                    onBlur={() => handleBlur('celebrationType')}
                    required
                  >
                    <option value="" disabled>Choose Celebration...</option>
                    {celebrationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.celebrationType && (
                  <span className="form-error-text" id="error-celebrationType">
                    <AlertCircle size={13} />
                    <span>{errors.celebrationType}</span>
                  </span>
                )}
              </div>

              {/* Package Selection */}
              <div className="form-field">
                <label htmlFor="booking-package" className="form-label">
                  Select Specific Package
                </label>
                <select
                  id="booking-package"
                  name="packageId"
                  className="form-select"
                  value={formData.packageId}
                  onChange={handleChange}
                  style={{ paddingLeft: '1rem' }}
                >
                  {availablePackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} ({pkg.formattedPrice || `₹${Number(pkg.price).toLocaleString()}`})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Event Date & Guest Count */}
            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="booking-date" className="form-label">
                  Event Date <span className="label-required">*</span>
                </label>
                <div className="input-with-icon">
                  <Calendar className="input-icon-left" size={17} />
                  <input
                    id="booking-date"
                    name="eventDate"
                    type="date"
                    min={todayStr}
                    className={`form-input ${errors.eventDate ? 'error' : ''}`}
                    value={formData.eventDate}
                    onChange={handleChange}
                    onBlur={() => handleBlur('eventDate')}
                    required
                  />
                </div>
                {errors.eventDate && (
                  <span className="form-error-text" id="error-eventDate">
                    <AlertCircle size={13} />
                    <span>{errors.eventDate}</span>
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="booking-guests" className="form-label">
                  Expected Guests <span className="label-required">*</span>
                </label>
                <div className="input-with-icon">
                  <Users className="input-icon-left" size={17} />
                  <input
                    id="booking-guests"
                    name="guestCount"
                    type="number"
                    min="1"
                    max="2000"
                    placeholder="e.g. 100"
                    className={`form-input ${errors.guestCount ? 'error' : ''}`}
                    value={formData.guestCount}
                    onChange={handleChange}
                    onBlur={() => handleBlur('guestCount')}
                    required
                  />
                </div>
                {errors.guestCount && (
                  <span className="form-error-text" id="error-guestCount">
                    <AlertCircle size={13} />
                    <span>{errors.guestCount}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Venue Preference */}
            <div className="form-field">
              <label htmlFor="booking-venue" className="form-label">
                Preferred Venue Setting
              </label>
              <div className="input-with-icon">
                <MapPin className="input-icon-left" size={17} />
                <select
                  id="booking-venue"
                  name="venueType"
                  className="form-select"
                  value={formData.venueType}
                  onChange={handleChange}
                >
                  <option value="Banquet Hall">Indoor Banquet Hall</option>
                  <option value="Outdoor Lawn">Lush Garden / Lawn</option>
                  <option value="Home Terrace">Private Residence / Terrace</option>
                  <option value="Destination Resort">Resort & Heritage Venue</option>
                </select>
              </div>
            </div>

            {/* Special Notes / Custom Requests */}
            <div className="form-field">
              <label htmlFor="booking-notes" className="form-label">
                Special Requests or Notes (Optional)
              </label>
              <textarea
                id="booking-notes"
                name="specialNotes"
                className="form-textarea"
                placeholder="Mention any specific color scheme, ritual preferences, or dietary requirements..."
                value={formData.specialNotes}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              id="submit-booking-btn"
              type="submit"
              className="btn-submit-booking"
            >
              <CheckCircle size={18} />
              <span>Confirm Celebration Reservation</span>
            </button>
          </form>
        </section>

        {/* Sidebar Summary & Trust Highlights */}
        <aside className="booking-sidebar">
          {/* Active Package Card */}
          {activePackage && (
            <div className="selected-package-summary-card">
              <div className="summary-card-header">
                <div>
                  <span
                    className="summary-category-pill"
                    style={{
                      backgroundColor: pkgPastel.bg,
                      color: pkgPastel.text,
                      borderColor: pkgPastel.border
                    }}
                  >
                    {activePackage.category}
                  </span>
                  <h4 className="summary-card-title">{activePackage.title}</h4>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.75rem' }}>
                <span className="summary-price-tag">
                  {activePackage.formattedPrice || `₹${Number(activePackage.price).toLocaleString('en-IN')}`}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Base Package</span>
              </div>

              <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1rem' }}>
                {activePackage.description}
              </p>

              <div style={{ borderTop: '1px solid var(--border-light)', margin: '0.75rem 0' }} />

              <div className="perk-item">
                <Users size={15} color="#d97706" />
                <span>Guest Capacity: {activePackage.guestCapacity}</span>
              </div>
              <div className="perk-item">
                <Clock size={15} color="#d97706" />
                <span>Duration: {activePackage.duration}</span>
              </div>

              {activePackage.features && (
                <ul className="perks-checklist">
                  {activePackage.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="perk-item">
                      <Sparkles size={13} color="#059669" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="trust-benefits-card">
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#1e293b' }}>
              CelebrationCraft Peace of Mind
            </h4>

            <div className="benefit-item">
              <div className="benefit-icon-wrap">
                <ShieldCheck size={17} />
              </div>
              <div>
                <h5 className="benefit-text-title">Price-Lock Guarantee</h5>
                <p className="benefit-text-sub">No hidden surcharges after confirmation.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-wrap">
                <HeartHandshake size={17} />
              </div>
              <div>
                <h5 className="benefit-text-title">Dedicated Event Curator</h5>
                <p className="benefit-text-sub">A personal coordinator to assist your family.</p>
              </div>
            </div>
          </div>

          {/* Recent Bookings List if any */}
          {bookingsList.length > 0 && (
            <div className="confirmed-bookings-card" id="recent-bookings-list">
              <h4 style={{ fontSize: '0.92rem', marginBottom: '0.75rem', color: '#1e293b' }}>
                Your Confirmed Reservations ({bookingsList.length})
              </h4>
              {bookingsList.slice(0, 3).map((b) => (
                <div key={b.bookingId} className="confirmed-booking-entry">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#f43f5e', fontSize: '0.85rem' }}>{b.bookingId}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.bookedAt}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.86rem', marginTop: '2px' }}>{b.packageName}</div>
                  <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
                    {b.eventDate} • {b.guestCount} Guests • {b.estimatedPrice}
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
