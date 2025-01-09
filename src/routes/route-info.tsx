import HomeContainer from '../pages/home/home-container';
import BusinessContainer from '../pages/business/business-container';
import HolidayContainer from '../pages/holiday/holiday-container';
import AccomodationContainer from '../pages/accomodation/accomodation-container';
import EventsPage from '../pages/events/events-container';
import DestinationDetailsContainer from '../pages/destination-details/details-container';
import BlogPage from '../pages/blogs/blogs-container';
import { QNA } from '../pages/qna-form/qna-container';
import AccommodationDetailsContainer from '../pages/accomodation/accomodation-details-container';
import TribeAfricaPagesContainer from '../pages/tribe-africa-pages/tribe-africa-pages-container';
import TribeAfricaPagesDetailsContainer from '../pages/tribe-africa-pages/tribe-africa-pages-details-container';
import LookingToHireSomeoneContainer from '../pages/looking-to-hire-someone/looking-to-hire-someone-container';
import LookingToHireSomeoneDetailsContainer from '../pages/looking-to-hire-someone/looking-to-hire-someone-details-container';
import DiscoverArticles from '../pages/discover-articles/discover-articles-screen';
import BlogDetailsPage from '@molecules/blogs/blog-view';
import MustSeeAndDo from '../pages/must-see-and-do/must-see-and-do-container';
import CountryDetails from '../pages/country-details/country-details-container';
import NotFound from '@molecules/common/not-found';
import MustSeeAndDoDetails from '../pages/must-see-and-do/must-see-and-do-details-screen';
import EventDetailsPage from '@molecules/events/events-view';
import HostelForm from '@molecules/forms/accomodation-creation-form';

import CountryEventsPage from '../pages/events/business-events';
import FindABusinessContainer from '../pages/find-a-business/find-a-business-container';
export interface RouteConfig {
  name: string;
  path: string;
  element: React.ReactElement;
}

const appRoutes: RouteConfig[] = [
  {
    name: 'home',
    path: '/',
    element: <HomeContainer />,
  },
  {
    name: 'business',
    path: '/:country/business',
    element: <BusinessContainer />,
  },
  {
    name: 'holiday',
    path: '/:country/holiday',
    element: <HolidayContainer />,
  },
  {
    name: 'accomodation',
    path: '/:country/:pageType/:category/:sub_category/:categoryInfoId',
    element: <AccommodationDetailsContainer />,
  },
  {
    name: 'accomodations list',
    path: ':country/:pageType/:category/:sub_category',
    element: <AccomodationContainer />,
  },
  {
    name: 'events',
    path: '/events/:event_category/:event_type',
    element: <EventsPage />,
  },
  {
    name: 'Event details',
    path: '/events/:event_category/:event_type/:eventId',
    element: <EventDetailsPage />,
  },
  {
    name: 'Country events',
    path: '/:country/events/:event_category/:event_type',
    element: <CountryEventsPage />,
  },
  {
    name: 'Country Business events',
    path: '/:country/events/:event_category/:event_type/:eventId',
    element: <EventDetailsPage />,
  },
  {
    name: 'Blogs List - No Country',
    path: '/:blogCategory/blogs',
    element: <BlogPage />,
  },
  {
    name: 'Blogs List - No Country',
    path: '/:country/:blogCategory/blogs',
    element: <BlogPage />,
  },
  {
    name: 'Blog Details - No Country',
    path: '/:blogCategory/blogs/:blogId',
    element: <BlogDetailsPage />,
  },
  {
    name: 'Blog Details - With Country',
    path: '/:country/:blogCategory/blogs/:blogId',
    element: <BlogDetailsPage />,
  },
  {
    name: 'qna',
    path: ':country/qna',
    element: <QNA />,
  },
  {
    name: 'innovations',
    path: '/discover/:category/:subcategory',
    element: <DiscoverArticles />,
  },
  {
    name: 'must see and do',
    path: '/:country/holiday/must-see-and-do/:category',
    element: <MustSeeAndDo />,
  },
  {
    name: 'must see and do details',
    path: '/:country/holiday/must-see-and-do/:category/:id',
    element: <MustSeeAndDoDetails />,
  },
  {
    name: 'destinations',
    path: '/details/:name',
    element: <DestinationDetailsContainer />,
  },
  {
    name: 'tribe africa pages',
    path: '/:country/business/tribe-africa-pages/:category/:subcategory',
    element: <TribeAfricaPagesContainer />,
  },
  {
    name: 'tribe africa details pages',
    path: '/:country/business/tribe-africa-pages/:category/:id',
    element: <TribeAfricaPagesDetailsContainer />,
  },
  {
    name: 'hire some one',
    path: '/:country/business/details/looking-to-hire-someone',
    element: <LookingToHireSomeoneContainer />,
  },
  {
    name: 'Find a business',
    path: '/:country/business/details/find-a-business',
    element: <FindABusinessContainer />,
  },
  {
    name: 'hire some one details',
    path: '/:country/business/details/looking-to-hire-someone/:proffessionalId',
    element: <LookingToHireSomeoneDetailsContainer />,
  },
  {
    name: 'country information',
    path: '/country/:country',
    element: <CountryDetails />,
  },
  {
    name: 'not found page',
    path: '*',
    element: <NotFound />,
  },
  {
    name: 'hotel form',
    path: '/form',
    element: <HostelForm />,
  },
];

export default appRoutes;
