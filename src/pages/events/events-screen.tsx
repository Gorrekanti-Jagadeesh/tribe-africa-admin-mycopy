import React, { useState } from 'react';
import UnderlineHeading from '@atoms/heading/underline-heading';

import Button from '@atoms/custom-button/button';
import Modal from '../../molecules/modal';
import EventForm from '../../molecules/forms/event-form';
import { useNavigate } from 'react-router';
import { sanityImageUrlBuilder } from '@api/index';

interface EventsScreenProps {
  heading: string;
  image: string;
  data: {
    title: string;
    coverPhoto: string;
    description: [];
    eventTimings: string;
    location: string;
    country: string;
    website: string;
    phone: string;
    whatsapp: string;
    amount: string;
    category: string;
    type: string;
    _id: string;
  }[];
}

const EventsScreen: React.FC<EventsScreenProps> = ({ heading, image, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      {data && data.length ? (
        <>
          <UnderlineHeading className="font-bold">{heading}</UnderlineHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto my-3">
            {data.map((item) => (
              <div
                className="w-full inline-block cursor-pointer rounded-md overflow-hidden border"
                key={item._id}
                onClick={() => navigation(`${item._id}`)}
              >
                <div
                  className="aspect-video bg-cover group relative overflow-auto"
                  style={{
                    backgroundImage: `url(${sanityImageUrlBuilder(item.coverPhoto)})`,
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-black hidden group-hover:flex p-2 items-center justify-center transition-opacity duration-300">
                    <div className="text-white">
                      {item.description.map((block: { _type: string; children: {} }, index) => {
                        if (block._type === 'block') {
                          return (
                            <p key={index} className="text-base">
                              {block.children?.[0]?.text}
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-sm flex flex-col gap-2 m-2">
                  <p id="title" className="font-semibold text-lg">
                    {item.title}
                  </p>
                  <p>
                    <strong> Date & Time:</strong> {item.eventTimings}
                  </p>
                  <p>
                    <strong> Location:</strong> {item.location}
                  </p>
                  <p>
                    <strong> Country: </strong>
                    {item.country}
                  </p>
                  <p>
                    <strong> Website:</strong> {item.website}
                  </p>
                  <p>
                    <strong>Tel:</strong>
                    {item.phone}
                  </p>
                  <p>
                    <strong>Whats App:</strong>
                    {item.whatsapp}
                  </p>
                  <Button>{item.amount}</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="shadow-2xl">
          <div className="flex flex-col md:flex-row p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">{heading}</h1>
            <Button className="md:ms-auto px-4" onClick={() => setIsOpen(true)}>
              List your event
            </Button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
              <EventForm />
            </Modal>
          </div>
          <img src={image} className="aspect-video object-cover" />
        </div>
      )}
    </div>
  );
};

export default EventsScreen;
