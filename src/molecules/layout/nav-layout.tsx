import React, { useEffect } from 'react';
import { LinkList } from '../layout/link-list';
import { EventCategory } from '../../../src/types/index';
import Button from '@atoms/custom-button/button';
import EventForm from '../forms/event-form';
import { useModalContext } from '../../context/modalContext';

const NavCategoryItem: React.FC<{ category: EventCategory }> = ({ category }) => (
  <div className="flex justify-between md:flex-col md:justify-start">
    <div className="border-2 border-brand-orange rounded-[10px] overflow-hidden mb-4 order-2 md:order-1 w-1/2 md:w-full">
      <img
        src={category.imageUrl}
        alt={category.title}
        className="w-full h-48 object-cover"
        style={{ aspectRatio: '424/351' }}
      />
    </div>
    <LinkList
      heading={<h3 className="font-poppins font-semibold text-lg md:text-xl">{category.title}</h3>}
      links={category.items}
      className="text-left order-1 md:order-2 w-1/2 md:w-full"
    />
  </div>
);

const NavLayout: React.FC<{
  eventCategories: EventCategory[];
  showButton: boolean;
  navLayoutHeading: string;
}> = ({ eventCategories, showButton, navLayoutHeading }) => {
  const { setModalContent, setModalIsOpen } = useModalContext();

  useEffect(() => setModalContent(<EventForm />), [setModalContent]);

  return (
    <section className="flex flex-col p-3 md:p-4 max-w-8xl m-auto">
      <div className="flex flex-col items-start md:flex-row md:items-center mb-5 gap-3">
        <h4 className="text-left text-brand-orange font-poppins font-semibold text-lg">&rarr; {navLayoutHeading}</h4>
        {showButton && (
          <Button className="md:ms-auto" onClick={() => setModalIsOpen(true)}>
            Advertise on Tribe Africa
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {eventCategories.map((category, index) => (
          <NavCategoryItem key={index} category={category} />
        ))}
      </div>
    </section>
  );
};

export default NavLayout;
