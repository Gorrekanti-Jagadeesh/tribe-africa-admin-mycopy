import React, { useEffect, useState } from 'react';
import { EventCategory } from '@types';
import { eventURLs } from '../../data';
import NavLayout from '../layout/nav-layout';

const Events: React.FC = () => {
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);

  useEffect(() => {
    const fetchedData: EventCategory[] = eventURLs;
    setEventCategories(fetchedData);
  }, []);

  return (
    <NavLayout eventCategories={eventCategories || []} showButton={true} showModal={true} navLayoutHeading="Event" />
  );
};

export default Events;
