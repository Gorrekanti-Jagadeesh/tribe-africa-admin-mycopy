import React, { useEffect, useState } from 'react';

import { LinkList } from '../layout/link-list';

import { EventCategory } from '@types';
import Button from '@atoms/custom-button/button';
import Modal from '../modal';
import EventForm from '../forms/event-form';

import { eventURLs } from '../../data';

const Events: React.FC = () => {
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchedData: EventCategory[] = eventURLs;

    // Simulating data fetching
    setEventCategories(fetchedData);
  }, []);

  return (
    <section className="flex flex-col p-2 md:p-4 max-w-6xl m-auto">
      <div className="text-lg font-semibold flex flex-col md:flex-row mb-5">
        <h4 className=" text-left text-orange-500 text-lg">&rarr; Events</h4>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} containerClasses="ms-auto">
          <EventForm />
        </Modal>
        <Button onClick={() => setIsOpen(true)}>Advertise on tribe africa</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {eventCategories.map((category, index) => (
          <div key={index} className="flex justify-between md:flex-col md:justify-start">
            <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4 order-2 md:order-1 w-1/2 md:w-full">
              <img src={category.imageUrl} alt={category.title} className="w-full h-48 aspect-square object-cover" />
            </div>
            <LinkList
              heading={<h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>}
              links={category.items}
              className="text-left order-1 md:order-2 w-1/2 md:w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
