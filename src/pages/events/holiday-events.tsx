import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { sanityImageUrlBuilder } from '@api/index';
import { useNavigate, useParams } from 'react-router';
import { toKebabCase } from '@utils/common';

const HolidayEventsPage = () => {
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
    <div className="px-2">
      <h4 className="text-left text-orange-500 p-4 max-w-6xl">&rarr; Holiday Events</h4>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 overflow-auto">
        {eventsData[0].subCategories.map((each) => (
          <div onClick={() => navigation(`/${country}/entertainment/event/${toKebabCase(each.title)}`)}>
            <img
              src={sanityImageUrlBuilder(each.subCategoryImage)}
              className="rounded-md aspect-square hover:border hover:border-orange-500"
            />
            <p>{each.title}</p>
          </div>
        ))}
        {eventsData[1].subCategories.map((each) => (
          <div onClick={() => navigation(`/${country}/sports/event/${toKebabCase(each.title)}`)}>
            <img
              src={sanityImageUrlBuilder(each.subCategoryImage).url()}
              className="rounded-md aspect-square hover:border hover:border-orange-500"
            />
            <p>{each.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayEventsPage;
