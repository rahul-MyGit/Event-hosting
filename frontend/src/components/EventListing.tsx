import React from 'react';


type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
};

type EventListingProps = {
  events: Event[];
};

const EventListing: React.FC<EventListingProps> = ({ events }) => {
  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListing;