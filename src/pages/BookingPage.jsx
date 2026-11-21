import React from 'react';
import BookingForm from '../components/BookingForm';

export default function BookingPage({
  events,
  preSelectedEvent,
  onBookingSuccess,
  bookingsList
}) {
  return (
    <div className="booking-page-view" id="booking-page-view">
      <BookingForm
        events={events}
        preSelectedEvent={preSelectedEvent}
        onBookingSuccess={onBookingSuccess}
        bookingsList={bookingsList}
      />
    </div>
  );
}
