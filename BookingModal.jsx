import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { getCategoryPastel } from './EventCard';

export default function BookingModal({ booking, onClose, onBrowseMore }) {
  if (!booking) return null;

  const pastel = getCategoryPastel(booking.celebrationType);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="booking-receipt-modal" id="booking-confirmation-modal">
        {/* Success Icon */}
        <div className="receipt-success-badge">
          <CheckCircle2 size={32} />
        </div>

        <h2 className="receipt-title">Booking Confirmed!</h2>
        <p className="receipt-sub">
          Your celebration request is saved and registered with CelebrationCraft.
        </p>

        {/* Receipt Details Box */}
        <div className="receipt-details-table">
          <div className="receipt-row">
            <span className="receipt-label">Reference ID:</span>
            <span className="receipt-val" style={{ color: '#be123c', fontWeight: 700, letterSpacing: '0.5px' }}>
              {booking.bookingId}
            </span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Client Name:</span>
            <span className="receipt-val">{booking.userName}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Celebration Type:</span>
            <span
              className="receipt-val"
              style={{
                backgroundColor: pastel.bg,
                color: pastel.text,
                padding: '0.15rem 0.5rem',
                borderRadius: '6px',
                fontSize: '0.85rem'
              }}
            >
              {booking.celebrationType}
            </span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Package Name:</span>
            <span className="receipt-val">{booking.packageName}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Event Date:</span>
            <span className="receipt-val">{booking.eventDate}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Expected Guests:</span>
            <span className="receipt-val">{booking.guestCount} Guests</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Contact Email:</span>
            <span className="receipt-val">{booking.email}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Estimated Base Quote:</span>
            <span className="receipt-val" style={{ fontWeight: 700, color: '#1e293b' }}>
              {booking.estimatedPrice}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            id="close-receipt-btn"
            className="btn-secondary"
            onClick={onClose}
          >
            <span>Close</span>
          </button>

          <button
            id="browse-more-btn"
            className="btn-primary"
            onClick={onBrowseMore}
          >
            <span>Browse More Events</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
