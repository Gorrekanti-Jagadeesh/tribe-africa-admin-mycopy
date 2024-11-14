import React, { useEffect, useState } from 'react';

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

  return (
    <section className="flex flex-col p-4">
      <div className="text-lg font-semibold flex">
        <h4 className="text-left text-orange-500 text-lg">&rarr; Network</h4>
      </div>
      <div className="grid grid-cols-1 p-4 md:grid-cols-3 gap-8">
        {networkCategories.map((category, index) => (
          <div key={index} className="flex flex-col">
            <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4">
              <img src={category.imageUrl} alt={category.title} className="w-full h-48 aspect-square object-cover" />
            </div>
            <h3 className="text-left text-xl font-semibold">{category.title}</h3>
            <ul className="text-left space-y-1 mt-4">
              {category.items.map((item, idx) => (
                <li key={idx} className="text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Network;
