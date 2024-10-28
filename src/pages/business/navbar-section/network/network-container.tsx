import React, { useEffect, useState } from 'react';
import NetworkScreen from './network.screen';

// Define the structure for each event category
interface NetworkProps {
  title: string;
  items: string[];
  imageUrl: string;
}

const Network: React.FC = () => {
  const [networkCategories, setNetworkCategories] = useState<NetworkProps[]>([]);

  // Simulate data fetching or you can replace it with actual API calls
  useEffect(() => {
    const fetchedData: NetworkProps[] = [
      {
        title: 'Business Events',
        items: ['Trade Shows', 'Conferences & Seminars', 'Product Launches', 'Training & Workshops', 'Networking'],
        imageUrl: '/path/to/business-image.jpg',
      },
      {
        title: 'Entertainment',
        items: ['Arts', 'Cultural Events & Festivals', 'Dance', 'Fashion', 'Music', 'Theater & Comedy'],
        imageUrl: '/path/to/entertainment-image.jpg',
      },
      {
        title: 'Sports',
        items: ['Boxing', 'Football', 'Marathons', 'Races', 'Racket sports', 'Wrestling'],
        imageUrl: '/path/to/sports-image.jpg',
      },
    ];

    // Simulating data fetching
    setNetworkCategories(fetchedData);
  }, []);

  // Pass the data as props to EventsScreen
  return <NetworkScreen networkCategories={networkCategories} />;
};

export default Network;
