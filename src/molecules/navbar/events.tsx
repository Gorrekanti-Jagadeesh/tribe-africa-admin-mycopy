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
    <section className="flex flex-col p-4 max-w-6xl m-auto">
      <div className="text-lg font-semibold flex">
        <h4 className="text-left text-orange-500 text-lg">&rarr; Events</h4>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trigger={<Button onClick={() => setIsOpen(true)}>Advertise on tribe africa</Button>}
          containerClasses="ms-auto"
        >
          <EventForm />
        </Modal>
      </div>
      <div className="grid grid-cols-1 p-4 md:grid-cols-3 gap-8">
        {eventCategories.map((category, index) => (
          <div key={index} className="flex flex-col">
            <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4">
              <img src={category.imageUrl} alt={category.title} className="w-full h-48 aspect-square object-cover" />
            </div>
            <LinkList
              heading={<h3 className="text-xl font-semibold">{category.title}</h3>}
              links={category.items}
              className="text-left"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
