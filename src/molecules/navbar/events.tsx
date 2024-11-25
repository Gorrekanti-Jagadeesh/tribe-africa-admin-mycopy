import React, { useEffect, useState } from 'react';

import { LinkList } from '../layout/link-list';

import { EventCategory } from '@types/index';
import Button from '@atoms/custom-button/button';
import Modal from '../modal';
import EventForm from '../forms/event-form';

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
