import React, { useState } from 'react';
import { LinkList } from '../layout/link-list';
import { EventCategory } from '@types';
import Button from '@atoms/custom-button/button';
import Modal from '../modal';
import EventForm from '../forms/event-form';

const NavcategoryItem: React.FC<{ category: EventCategory }> = ({ category }) => (
  <div className="flex justify-between md:flex-col md:justify-start">
    <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4 order-2 md:order-1 w-1/2 md:w-full">
      <img src={category.imageUrl} alt={category.title} className="w-full h-48 aspect-square object-cover" />
    </div>
    <LinkList
      heading={<h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>}
      links={category.items}
      className="text-left order-1 md:order-2 w-1/2 md:w-full"
    />
  </div>
);

const NavLayout: React.FC<{
  eventCategories: EventCategory[];
  showModal: boolean;
  showButton: boolean;
  navLayoutHeading: string;
}> = ({ eventCategories, showModal, showButton, navLayoutHeading }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex flex-col p-2 md:p-4 max-w-6xl m-auto">
      <div className="text-lg font-semibold flex flex-col md:flex-row mb-5">
        <h4 className=" text-left text-orange-500 text-lg">&rarr; {navLayoutHeading}</h4>
        {showModal && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} containerClasses="ms-auto">
            <EventForm />
          </Modal>
        )}
        {showButton && <Button onClick={() => setIsOpen(true)}>Advertise on tribe africa</Button>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {eventCategories.map((category, index) => (
          <NavcategoryItem key={index} category={category} />
        ))}
      </div>
    </section>
  );
};

export default NavLayout;
