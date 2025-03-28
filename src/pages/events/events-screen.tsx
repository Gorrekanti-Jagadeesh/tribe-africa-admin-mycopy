import React, { useState } from 'react';
import UnderlineHeading from '@atoms/heading/underline-heading';

import Button from '@atoms/custom-button/button';
import Modal from '../../molecules/modal';
import EventForm from '../../molecules/forms/event-form';
import { useNavigate } from 'react-router';
import { sanityImageUrlBuilder } from '@api/index';
import { PortableText } from '@portabletext/react';
import { TypedObject } from '@sanity/block-tools';

interface EventsScreenProps {
  heading: string;
  image: string;
  data: {
    title: string;
    eventStartDate: string;
    eventEndDate: string;
    eventStartTime: string;
    eventEndTime: string;
    email: string;
    venue: string;
    city: string;
    countryCode: string;
    isEventFree: boolean;
    ticketPrices: { general: string; earlyBird: string; vip: string };
    country: string;
    website: string;
    phone: string;
    socialMedia: { instagram: string; twitter: string; facebook: string; other: string };
    category: string;
    organizer: {
      organizerName: string;
      organizerEmergencyPhone: string;
      organizerRole: string;
      organizerEmail: string;
      organizerPhone: string;
      organizerCountryCode: string;
      organizerDisplayName: string;
      organizerEmergencyCountryCode: string;
      type: string;
    };

    eventBy: string;
    description: TypedObject | TypedObject[];
    aboutEvent: string;
    confirmDetails: boolean;
    agreeToFeature: boolean;
    rightsToContent: boolean;
    businessPhoto: File;
    coverPhoto: string | [];
    _id: string;
  }[];
}

const EventsScreen: React.FC<EventsScreenProps> = ({ heading, image, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  console.log(data, 'ee');

  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <div className="flex flex-col md:flex-row md:items-center my-3">
        <UnderlineHeading className="font-bold">{heading}</UnderlineHeading>
        <Button className="md:ms-auto px-4" onClick={() => setIsOpen(true)}>
          List your event
        </Button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <EventForm />
        </Modal>
      </div>

      {data && data.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
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
                    <PortableText value={item.description} />
                  </div>
                </div>
              </div>
              <div className="text-sm flex flex-col gap-2 m-2">
                <p id="title" className="font-semibold text-lg">
                  {item.title}
                </p>
                <p>
                  <strong> Event By:</strong> {item.eventBy}
                </p>
                <p>
                  <strong> Start Date & Time:</strong> {item.eventStartDate}, {item.eventStartTime}
                </p>
                <p>
                  <strong> End Date & Time:</strong> {item.eventEndDate}, {item.eventEndTime}
                </p>
                <p>
                  <strong> Location:</strong> {item.venue}, {item.city}
                </p>
                <p>
                  <strong> Country: </strong>
                  {item.country}
                </p>

                <p>
                  <strong>Tel:</strong>
                  {item.countryCode} {item.phone}
                </p>
                {item.website && (
                  <p>
                    <strong> Website:</strong> {item.website}
                  </p>
                )}
                <Button>{item.ticketPrices.general}</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <img src={image} className="aspect-video object-cover" />
      )}
    </div>
  );
};

export default EventsScreen;
