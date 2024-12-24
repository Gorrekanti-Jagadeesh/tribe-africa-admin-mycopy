import HomeContainer from '../pages/home/home-container';
import BusinessContainer from '../pages/business/business-container';
import HolidayContainer from '../pages/holiday/holiday-container';
import Accomodation from '../pages/accomodation/accomodation-container';
import EventsPage from '../pages/events/events-container';
import DestinationDetailsContainer from '../pages/destination-details/details-container';
import BlogPage from '../pages/blogs/blogs-container';
import { QNA } from '../pages/qna-form/qna-container';
import AccommodationDetailsContainer from '../pages/accomodation/accomodation-details-container';
import TribeAfricaPagesContainer from '../pages/tribe-africa-pages/tribe-africa-pages-container';
import TribeAfricaPagesDetailsContainer from '../pages/tribe-africa-pages/tribe-africa-pages-details-container';
import LookingToHireSomeoneContainer from '../pages/looking-to-hire-someone/looking-to-hire-someone-container';
import LookingToHireSomeoneDetailsContainer from '../pages/looking-to-hire-someone/looking-to-hire-someone-details-container';
import BusinessEventsPage from '../pages/events/business-events';
import DiscoverArticles from '../pages/discover-articles/discover-articles-screen';
import BlogDetailsPage from '@molecules/blogs/blog-view';
import MustSeeAndDo from '../pages/must-see-and-do/must-see-and-do-container';

import CountryDetails from '../pages/country-details/country-details-container';
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
    path: '/accomodations/:accommodationId',
    element: <AccommodationDetailsContainer />,
  },
  {
    name: 'accomodations list',
    path: '/accomodations',
    element: <Accomodation />,
  },
  {
    name: 'events',
    path: '/events/:event_category/:event_type',
    element: <EventsPage />,
  },
  {
    name: 'Business events',
    path: '/:country/business/event/:event_type',
    element: <BusinessEventsPage />,
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
    path: '/qna',
    element: <QNA />,
  },
  {
    name: 'innovations',
    path: '/discover/:category/:subcategory',
    element: <DiscoverArticles />,
  },
  {
    name: 'must see and do',
    path: '/must-see-and-do/:category?/:id?',
    element: <MustSeeAndDo />,
  },
  {
    name: 'destinations',
    path: '/details/:name',
    element: <DestinationDetailsContainer />,
  },
  {
    name: 'tribe africa pages',
    path: '/tribe-africa-pages/:category',
    element: <TribeAfricaPagesContainer />,
  },
  {
    name: 'tribe africa details pages',
    path: '/tribe-africa-pages/:category/:id',
    element: <TribeAfricaPagesDetailsContainer />,
  },
  {
    name: 'hire some one',
    path: '/tribe-africa-pages/looking-to-hire-someone',
    element: <LookingToHireSomeoneContainer />,
  },
  {
    name: 'hire some one details',
    path: '/tribe-africa-pages/looking-to-hire-someone/:id',
    element: <LookingToHireSomeoneDetailsContainer />,
  },
  {
    name: 'country information',
    path: '/:country',
    element: <CountryDetails />,
  },
];

export default appRoutes;
