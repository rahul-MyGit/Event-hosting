// src/components/EventListing.tsx
// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { fetchEvents } from '../api/apiService';

const EventListing: React.FC = () => {
  // const { data, isLoading, error } = useQuery(['events'], fetchEvents);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h2>Upcoming Events</h2>
      {/* <ul>
        {data?.data.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.location}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default EventListing;