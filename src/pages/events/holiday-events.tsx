import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { sanityImageUrlBuilder } from '@api/index';
import { useNavigate, useParams } from 'react-router';
import { toKebabCase } from '@utils/common';
import EventForm from '@molecules/forms/event-form';
import Modal from '@molecules/modal';
import Button from '@atoms/custom-button/button';
import { useState } from 'react';
import OverLayCard from '@atoms/card/overlay-card';

const HolidayEventsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { country } = useParams();
  const navigation = useNavigate();
  const {
    data: eventsData,
    error: eventsError,
    isLoading: eventsLoading,
  } = useQuery({
    queryKey: ['holiday-events'],
    queryFn: () => sanity.GET(`*[_type == "event-categories" && category != "Business"]`),
  });

  if (eventsLoading) {
    return 'Loading...';
  }

  if (eventsError) {
    return 'An error occurred...';
  }

  return (
    <div>
      <div className="flex flex-col md:justify-between md:flex-row md:items-center p-4">
        <h1 className="text-lg text-orange-500">&rarr; Holiday Events</h1>
        <div>
          <Button onClick={() => setIsOpen(true)}>List your event</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 overflow-auto px-2">
        {eventsData[0].subCategories.map((each) => (
          <div
            onClick={() => navigation(`/${country}/events/entertainment/${toKebabCase(each.title)}`)}
            className="m-4"
          >
            <OverLayCard
              data={{
                title: each.title,
                image: sanityImageUrlBuilder(each.subCategoryImage).url(),
              }}
            />
          </div>
        ))}
        {eventsData[1].subCategories.map((each) => (
          <div onClick={() => navigation(`/${country}/events/sports/${toKebabCase(each.title)}`)} className="m-4">
            <OverLayCard
              data={{
                title: each.title,
                image: sanityImageUrlBuilder(each.subCategoryImage).url(),
              }}
            />
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <EventForm />
      </Modal>
    </div>
  );
};

export default HolidayEventsPage;
