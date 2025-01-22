import { PortableText } from '@portabletext/react';
import { getEntryDataById, sanityImageUrlBuilder } from '../../api';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@atoms/common/loading';
import { FaGlobe, FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { parseImageUrl } from '@/utils/sanity';
import { truncateText } from '@/utils/common';

const EventDetailsPage = () => {
  const { eventId } = useParams();

  const {
    data: eventDetails,
    error: eventDetailsError,
    isLoading: eventDetailsLoading,
  } = useQuery({
    queryKey: ['events-details-page'],
    queryFn: () => getEntryDataById(eventId),
  });

  if (eventDetailsLoading) {
    return <Loading />;
  }
  if (eventDetailsError) {
    return 'Error Occurred';
  }

  return (
    <div className="flex flex-col gap-6 m-auto max-w-4xl px-10 md:px-0">
      <h1 className="text-3xl md:text-4xl font-semibold capitalize">{eventDetails.title}</h1>
      <img
        className="h-[50vh] w-full object-contain rounded-md"
        src={sanityImageUrlBuilder(eventDetails.coverPhoto).url()}
        alt="Event Cover"
      />
      <section>
        <h3 className="text-2xl font-semibold mb-2">Description</h3>
        <PortableText
          value={eventDetails.description}
          components={{
            types: {
              image: ({ value }) => (
                <img src={parseImageUrl(value.asset._ref)} alt={value.alt || 'Blog Image'} height={100} width={100} />
              ),
            },
          }}
        />
      </section>
      <div className="flex flex-col md:flex-row justify-around">
        <div className=" text-gray-700 text-lg mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={sanityImageUrlBuilder(eventDetails.businessPhoto).url()}
              alt="Business"
              className="h-20 w-20 rounded-xl object-cover border border-gray-300"
            />
            <p className="text-lg">
              By <strong>{eventDetails.eventBy}</strong>
            </p>
          </div>
          {eventDetails.website && (
            <div className="flex gap-3">
              <a href={eventDetails.website} target="_blank" rel="noopener noreferrer" className="flex gap-3">
                <FaGlobe className="text-2xl" />
                <p>{truncateText(eventDetails.website, 40)}</p>
              </a>
            </div>
          )}
          {eventDetails.phone && (
            <div className="flex gap-3">
              <a href={`tel:${eventDetails.phone}`} className="flex gap-3">
                <FaPhone className="text-2xl" />
                <p>{eventDetails.phone}</p>
              </a>
            </div>
          )}
          {eventDetails.whatsapp && (
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${eventDetails.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3"
              >
                <FaWhatsapp className="text-2xl" />
                <p>{eventDetails.whatsapp}</p>
              </a>
            </div>
          )}
          {eventDetails.email && (
            <div className="flex gap-3">
              <a href={`mailto:${eventDetails.email}`} target="_blank" rel="noopener noreferrer" className="flex gap-3">
                <FaEnvelope className="text-2xl" />
                <p>{eventDetails.email}</p>
              </a>
            </div>
          )}
          {eventDetails.location && (
            <div className="flex gap-3">
              <a href={`mailto:${eventDetails.location}`}>
                <FaLocationDot className="text-2xl" />
              </a>
              <p>{eventDetails.location}</p>
            </div>
          )}
        </div>
        <div>
          {eventDetails.ticketPrices && (
            <div className="mt-6">
              <h3 className="text-xl font-bold">Ticket Prices</h3>
              <PortableText
                value={eventDetails.ticketPrices}
                components={{
                  types: {
                    image: ({ value }) => (
                      <img
                        src={parseImageUrl(value.asset._ref)}
                        alt={value.alt || 'Blog Image'}
                        height={100}
                        width={100}
                      />
                    ),
                  },
                }}
              />
            </div>
          )}
          <div className="mt-6">
            <h3 className="text-xl font-bold">Date & Time</h3>
            <p>{eventDetails.eventTimings}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold">About the Event</h3>
        <PortableText
          value={eventDetails.aboutEvent}
          components={{
            types: {
              image: ({ value }) => <img src={parseImageUrl(value.asset._ref)} alt={value.alt || 'Blog Image'} />,
            },
          }}
        />
      </div>
    </div>
  );
};

export default EventDetailsPage;
