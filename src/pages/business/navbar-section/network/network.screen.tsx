import React from 'react';

// Define the structure for the props
interface Network {
  title: string;
  items: string[];
  imageUrl: string;
}

interface NetworkScreenProps {
  networkCategories: Network[];
}

const NetworkScreen: React.FC<NetworkScreenProps> = ({ networkCategories }) => {
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

export default NetworkScreen;
