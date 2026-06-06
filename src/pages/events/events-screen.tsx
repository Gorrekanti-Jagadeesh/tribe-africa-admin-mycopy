import React, { useState } from 'react';
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
    };
    type: string;
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

  return (
    <div className="px-4 py-6 max-w-8xl m-auto">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 my-4">
        <div>
          <h1 className="font-poppins font-normal text-3xl md:text-4xl text-black">{heading}</h1>
          <div className="border-b-2 border-brand-orange mt-2 w-3/4" />
        </div>
        <Button className="md:ms-auto shrink-0 text-lg px-6 py-3" onClick={() => setIsOpen(true)}>
          List your event
        </Button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <EventForm />
        </Modal>
      </div>

      {data && data.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.map((item) => (
            <div
              className="w-full cursor-pointer rounded-[10px] overflow-hidden border border-gray-200 hover:shadow-md hover:border-brand-orange transition-all duration-200"
              key={item._id}
              onClick={() => navigation(`${item._id}`)}
            >
              {/* Cover image with hover description overlay */}
              <div
                className="bg-cover bg-center group relative overflow-hidden"
                style={{
                  backgroundImage: `url(${sanityImageUrlBuilder(item.coverPhoto)})`,
                  aspectRatio: '16/9',
                }}
              >
                <div className="h-full bg-black/80 hidden group-hover:flex p-4 items-center justify-center transition-opacity duration-300">
                  <div className="text-white font-poppins text-xs text-center">
                    <PortableText value={item.description} />
                  </div>
                </div>
              </div>

              {/* Event details */}
              <div className="font-poppins text-sm flex flex-col gap-2 p-4">
                <p className="font-semibold text-xl text-black">{item.title}</p>
                <p>
                  <strong>Event By:</strong> {item.eventBy}
                </p>
                <p>
                  <strong>Start:</strong> {item.eventStartDate}, {item.eventStartTime}
                </p>
                <p>
                  <strong>End:</strong> {item.eventEndDate}, {item.eventEndTime}
                </p>
                <p>
                  <strong>Location:</strong> {item.venue}, {item.city}
                </p>
                <p>
                  <strong>Country:</strong> {item.country}
                </p>
                <p>
                  <strong>Tel:</strong> {item.countryCode} {item.phone}
                </p>
                {item.website && (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange hover:underline"
                  >
                    <strong>Website:</strong> {item.website.slice(0, 35)}
                  </a>
                )}
                <Button className="w-fit mt-1">
                  {item.isEventFree ? 'FREE' : `General: ${item.ticketPrices.general}`}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <img src={image} className="w-full rounded-[10px] object-cover" style={{ aspectRatio: '16/9' }} />
      )}
    </div>
  );
};

export default EventsScreen;
