import React, { useEffect, useState } from 'react';
import EventsScreen from './events-screen';

// Define the structure for each event category
interface EventCategory {
  title: string;
  items: string[];
  imageUrl: string;
}

const EventsContainer: React.FC = () => {
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);

  // Simulate data fetching or you can replace it with actual API calls
  useEffect(() => {
    const fetchedData: EventCategory[] = [
      {
        title: 'Business Events',
        items: ['Trade Shows', 'Conferences & Seminars', 'Product Launches', 'Training & Workshops', 'Networking'],
        imageUrl: '/path/to/business-image.jpg',
      },
      {
        title: 'Entertainment',
        items: ['Arts', 'Cultural Events & Festivals', 'Dance', 'Fashion', 'Music', 'Theater & Comedy'],
        imageUrl: '/path/to/entertainment-image.jpg',
      },
      {
        title: 'Sports',
        items: ['Boxing', 'Football', 'Marathons', 'Races', 'Racket sports', 'Wrestling'],
        imageUrl: '/path/to/sports-image.jpg',
      },
    ];

    // Simulating data fetching
    setEventCategories(fetchedData);
  }, []);

  // Pass the data as props to EventsScreen
  return <EventsScreen eventCategories={eventCategories} />;
};

export default EventsContainer;
