import React, {useState} from "react";
import { EventCard } from "./eventCard";
import { SelectedEventCard } from "./selectedEventCard";
import mockData from "../data/events.json";

export const EventDetails = () => {
    const [selectedEvents, setSelectedEvents] = useState([]);

  const isEventSelected = (eventId) => {
    return selectedEvents.some(event => event.id === eventId);
  };

  const selectEvent = (event) => {
    if (selectedEvents.length >= 3) {
      alert("You can only select a maximum of 3 events.");
      return;
    }

    if (selectedEvents.some(selectedEvent => 
      (new Date(selectedEvent.start_time) < new Date(event.end_time) && 
      new Date(event.start_time) < new Date(selectedEvent.end_time)))) {
      alert("This event conflicts with another event you've selected.");
      return;
    }

    setSelectedEvents([...selectedEvents, event]);
  };

  const deselectEvent = (eventId) => {
    setSelectedEvents(selectedEvents.filter(event => event.id !== eventId));
  };

  return (
    <div className="app">
      <div className="all-events">
        <h2>All Events</h2>
        <div className="event-list">
          {mockData.map(event => (
            <EventCard 
              key={event.id}
              event={event}
              onSelect={() => selectEvent(event)}
              disabled={isEventSelected(event.id)}
            />
          ))}
        </div>
      </div>
      <div className="selected-events">
        <h2>Selected Events</h2>
        <div className="selected-event-list">
          {selectedEvents.map(event => (
            <SelectedEventCard 
              key={event.id}
              event={event}
              onDeselect={() => deselectEvent(event.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}