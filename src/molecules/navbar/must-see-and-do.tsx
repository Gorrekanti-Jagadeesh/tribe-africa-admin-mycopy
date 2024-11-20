import React from 'react';
import CardsGrid from '@molecules/layout/cards-grid';

const MustSeeAndDo: React.FC = () => {
  const mustseeAndDoData = [
    {
      image: 'https://placehold.co/400',
      title: 'Action Enthusiasts',
      //   onClick: () => (),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Historical & Cultural Sites',
      //   onClick: () => (),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Nature',
      //   onClick: () => handleToggle({}),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Sacred Sites',
      //   onClick: () => handleToggle({}),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Excursions',
      //   onClick: () => handleToggle({}),
    },
    {
      image: 'https://placehold.co/400',
      title: 'Voluntourism',
      //   onClick: () => handleToggle({}),
    },
  ];

  return (
    <div className="md:p-4">
      <h4 className="text-left text-orange-500 text-lg">&rarr; Must see & Do</h4>
      <CardsGrid data={mustseeAndDoData} />
    </div>
  );
};

export default MustSeeAndDo;
