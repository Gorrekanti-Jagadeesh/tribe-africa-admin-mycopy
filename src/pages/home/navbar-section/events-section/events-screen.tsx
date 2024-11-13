import React from 'react';

import { EventCategory } from '../../../../types';

const EventsScreen: React.FC<{ eventCategories: EventCategory[] }> = ({ eventCategories }) => {
  return (
    <section className="flex flex-col p-4">
      <div className="text-lg font-semibold flex">
        <h4 className="text-left text-orange-500 text-lg">&rarr; Discover</h4>
        <button className="ms-auto px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg">
          Advertise on tribe africa
        </button>
      </div>
      <div className="grid grid-cols-1 p-4 md:grid-cols-3 gap-8">
        {eventCategories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4">
              <img src={category.imageUrl} alt={category.title} className="w-full h-48 aspect-square object-cover" />
            </div>
            <h3 className="text-center text-xl font-semibold">{category.title}</h3>
            <ul className="text-center space-y-1 mt-4">
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

export default EventsScreen;
