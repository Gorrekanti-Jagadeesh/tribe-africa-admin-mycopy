import React from 'react';
import UnderlineHeading from '@atoms/heading/underline-heading';

import Button from '@atoms/custom-button/button';

interface EventsScreenProps {
  heading: string;
  image: string;
  data: {
    title: string;
    image: string;
    description: string;
    date: string;
    time: string;
    location: string;
    country: string;
    website: string;
    phone: string;
    whatsapp: string;
    amount: string;
  }[];
}

const EventsScreen: React.FC<EventsScreenProps> = ({ heading, image, data }) => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      {data.length ? (
        <>
          <UnderlineHeading className="font-bold">{heading}</UnderlineHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
            {data.map((item, index) => (
              <div className="w-full inline-block cursor-pointer rounded-md overflow-hidden border" key={index}>
                <div
                  className="aspect-video bg-cover group relative overflow-auto"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-black hidden group-hover:flex p-2 items-center justify-center transition-opacity duration-300">
                    <div className="text-white">
                      {item.description} {item.description.length}
                    </div>
                  </div>
                </div>
                <div className="text-sm flex flex-col gap-2 m-2">
                  <p id="title" className="font-semibold text-lg">
                    {item.title}
                  </p>
                  <p>
                    {item.date} {item.time}
                  </p>
                  <p>{item.location}</p>
                  <p>{item.country}</p>
                  <p>{item.website}</p>
                  <p>{item.phone}</p>
                  <p>{item.whatsapp}</p>
                  <p>{item.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="shadow-2xl">
          <div className="flex flex-col md:flex-row p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">{heading}</h1>
            <Button className="md:ms-auto px-4">List your event</Button>
          </div>
          <img src={image} className="aspect-video object-cover" />
        </div>
      )}
    </div>
  );
};

export default EventsScreen;
