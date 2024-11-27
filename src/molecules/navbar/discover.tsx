import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import CardsGrid from '@molecules/layout/cards-grid';
import innovationsView from '@assets/home/discover/innovations.png';
import didYouKnowView from '@assets/home/discover/did-you-know.png';
import bucketListView from '@assets/home/discover/bucket-list.png';
import greatOutdoorsView from '@assets/home/discover/great-outdoors.png';
import pilgrimageView from '@assets/home/discover/pilgrimage.png';
import weddingDestinationView from '@assets/home/discover/destination-weddings.png';

const Discover: React.FC = () => {
  const [toggle, setToggle] = useState(true);
  const [content, setContent] = useState({
    title: '',
    onClick: () => console.log('clicked'),
    data: [],
  });

  const navigate = useNavigate();

  const handleToggle = (data) => {
    setToggle(false);
    setContent(data);
  };

  const discoverData = [
    {
      image: innovationsView,
      title: 'Innovations',
      onClick: () => handleToggle(InnovationsData),
    },
    {
      image: didYouKnowView,
      title: 'Did you know?',
      onClick: () => handleToggle({}),
    },
    {
      image: bucketListView,
      title: 'For the bucket list',
      onClick: () => handleToggle({}),
    },
    {
      image: greatOutdoorsView,
      title: 'The Great Outdoors',
      onClick: () => handleToggle({}),
    },
    {
      image: pilgrimageView,
      title: 'Pilgrimage',
      onClick: () => handleToggle({}),
    },
    {
      image: weddingDestinationView,
      title: 'Destination Weddings',
      onClick: () => handleToggle({}),
    },
  ];

  const InnovationsData = {
    title: 'Innovations',
    data: [
      {
        image: pilgrimageView,
        title: 'Amazing Smart Innovations',
        onClick: () => navigate('/africa/smart-innovations'),
      },
      {
        image: weddingDestinationView,
        title: 'Upcoming Smart Cities',
        onClick: () => setToggle(true),
      },
    ],
  };

  return (
    <div className="md:p-4">
      <h4 className="text-left text-orange-500 text-lg">&rarr; Discover</h4>
      {toggle ? (
        <CardsGrid data={discoverData} />
      ) : (
        <div
          id="sub-layout"
          className="p-2 md:p-8 border border-cyan-400 m-2 text-left bg-white text-black rounded-2xl"
        >
          <h4 className="text-orange-500 text-lg hover:underline cursor-pointer w-fit" onClick={() => setToggle(true)}>
            &larr; {content.title}
          </h4>
          {content.data ? <CardsGrid data={content.data} /> : <>Coming Soon</>}
        </div>
      )}
    </div>
  );
};

export default Discover;
