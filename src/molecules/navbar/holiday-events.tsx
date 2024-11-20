import React from 'react';
import CardsGrid from '@molecules/layout/cards-grid';
import Button from '../../atoms/custom-button/button';

const BusinessEvents: React.FC = () => {
  const businessEventsData = [
    {
      image: 'https://placehold.co/400',
      title: 'Arts',
      //   onClick: () => (),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Cultural Events & Festivals',
      //   onClick: () => (),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Dance',
      //   onClick: () => handleToggle({}),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Fashion',
      //   onClick: () => handleToggle({}),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Music',
      //   onClick: () => handleToggle({}),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Sports',
      //   onClick: () => handleToggle({}),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Theatre & Comedy',
      //   onClick: () => handleToggle({}),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Others',
      //   onClick: () => handleToggle({}),
    },
  ];

  return (
    <div className="md:p-4">
      <div className="text-lg font-semibold flex flex-col md:flex-row md:justify-between md:items-center">
        <h4 className=" text-left text-orange-500 text-lg">&rarr; Events</h4>
        {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} containerClasses="ms-auto">
          <EventForm />
        </Modal> */}
        <Button>Advertise on tribe africa</Button>
      </div>
      <CardsGrid data={businessEventsData} />
    </div>
  );
};

export default BusinessEvents;
