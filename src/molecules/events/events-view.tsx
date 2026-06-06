import { PortableText } from '@portabletext/react';
import { getEntryDataById, sanityImageUrlBuilder } from '../../api';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@atoms/common/loading';
import { FaGlobe, FaPhone, FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { parseImageUrl } from '@/utils/sanity';
import { truncateText } from '@/utils/common';
import Button from '@/atoms/custom-button/button';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

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

  console.log(eventDetails, 'rr');

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
      <section className="flex flex-col gap-6 m-auto max-w-4xl px-10 md:px-0">
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

          {eventDetails.type && (
            <p>
              <strong>Event Type:</strong> {eventDetails.type}
            </p>
          )}
          {eventDetails.category && (
            <p>
              <strong>Category:</strong> {eventDetails.category}
            </p>
          )}
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
              <a href={`tel:${eventDetails.countryCode} ${eventDetails.phone}`} className="flex gap-3">
                <FaPhone className="text-2xl" />
                <p>
                  {eventDetails.countryCode} {eventDetails.phone}
                </p>
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
          {eventDetails.venue && (
            <div className="flex gap-3">
              <a href={`mailto:${eventDetails.location}`}>
                <FaLocationDot className="text-2xl" />
              </a>
              <p>
                {eventDetails.venue}, {eventDetails.city}, {eventDetails.country}
              </p>
            </div>
          )}
        </div>

        <div>
          {!eventDetails.isEventFree ? (
            <div className="mt-6">
              <h3 className="text-xl font-bold">Ticket Prices</h3>
              <p>General: {eventDetails.ticketPrices.general ? eventDetails.ticketPrices.general : 'NA'}</p>
              <p>VIP: {eventDetails.ticketPrices.vip ? eventDetails.ticketPrices.vip : 'NA'}</p>
              <p>Early Bird: {eventDetails.ticketPrices.earlyBird ? eventDetails.ticketPrices.earlyBird : 'NA'}</p>
            </div>
          ) : (
            <div className="mt-6">
              <Button>FREE EVENT</Button>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Social Media</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-blue-700">
              {eventDetails.socialMedia?.facebook && (
                <a href={eventDetails.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="text-2xl text-gray-500" />
                </a>
              )}
              {eventDetails.socialMedia?.instagram && (
                <a href={eventDetails.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-2xl text-gray-500" />
                </a>
              )}
              {eventDetails.socialMedia?.twitter && (
                <a href={eventDetails.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-2xl text-gray-500" />
                </a>
              )}
              {eventDetails.socialMedia?.other && (
                <a
                  href={eventDetails.socialMedia.other}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500"
                >
                  Others
                </a>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-3">Event Timings</h3>
            <p>
              <strong>Event Start Date:</strong> {eventDetails.eventStartDate}
            </p>
            <p>
              <strong>Event Start Time:</strong> {eventDetails.eventStartTime}
            </p>
            <p>
              <strong>Event End Date:</strong> {eventDetails.eventEndDate}
            </p>
            <p>
              <strong>Event End Time:</strong> {eventDetails.eventEndTime}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Organizer Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-[10px] shadow">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-base font-medium text-gray-900">{eventDetails.organizer?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-base font-medium text-gray-900">{eventDetails.organizer?.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-base font-medium text-gray-900">
              {eventDetails.organizer?.countryCode} {eventDetails.organizer?.phone}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium text-gray-900">{eventDetails.organizer?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Emergency Phone</p>
            <p className="text-base font-medium text-gray-900">
              {eventDetails.organizer?.emergencyCountryCode} {eventDetails.organizer?.emergencyPhone}
            </p>
          </div>
        </div>
      </div>

      {eventDetails.aboutEvent && (
        <section className="flex flex-col gap-6 m-auto max-w-4xl px-10 md:px-0">
          <h3 className="text-2xl font-semibold mb-2">About the Event</h3>
          <PortableText value={eventDetails.aboutEvent} />
        </section>
      )}
    </div>
  );
};

export default EventDetailsPage;
