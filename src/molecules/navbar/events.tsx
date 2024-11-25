import React, { useEffect, useState } from 'react';
import { EventCategory } from '@types/index';
import NavLayout from '@molecules/layout/nav-layout';

import { eventURLs } from '@data/index';

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
