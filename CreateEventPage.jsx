import React from 'react';
import CreateEventForm from '../components/CreateEventForm';

export default function CreateEventPage({ onAddEvent, navigateTo }) {
  return (
    <div className="create-event-page-view" id="create-event-page-view">
      <CreateEventForm
        onAddEvent={onAddEvent}
        navigateTo={navigateTo}
      />
    </div>
  );
}
