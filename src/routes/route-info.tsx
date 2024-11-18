import HomeContainer from '../pages/home/home-container';
import BusinessContainer from '../pages/business/business-container';
import HolidayContainer from '../pages/holiday/holiday-container';
import Accomodation from '../pages/accomodation/accomodation-container';
import Events from '../molecules/navbar/events';
import EventsPage from '../pages/events/events-container';
import InnovationsScreen from '../pages/innovations/innovations-screen';
import DestinationDetailsContainer from '../pages/destination-details/details-container';
import BlogPage from '../pages/blogs/blogs-container';
import { QNA } from '../pages/qna-form/qna-container';

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
    path: '/accomodations/:accomodationId',
    element: <Accomodation />,
  },
  {
    name: 'accomodations list',
    path: '/accomodations',
    element: <Accomodation />,
  },
  {
    name: 'events',
    path: '/events',
    element: <Events />,
  },
  {
    name: 'events',
    path: '/events/:event-type',
    element: <EventsPage />,
  },
  {
    name: 'blogs list',
    path: '/blogs',
    element: <BlogPage />,
  },
  {
    name: 'blogs',
    path: '/blogs/:blogId',
    element: <BlogPage />,
  },
  {
    name: 'qna',
    path: '/qna',
    element: <QNA />,
  },
  {
    name: 'innovations',
    path: '/africa/smart-innovations',
    element: <InnovationsScreen />,
  },
  {
    name: 'destinations',
    path: '/details/:name',
    element: <DestinationDetailsContainer />,
  },
];

export default appRoutes;
