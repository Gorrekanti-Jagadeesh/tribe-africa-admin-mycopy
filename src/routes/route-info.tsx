import HomeContainer from '../pages/home/home-container';
import BusinessContainer from '../pages/business/business-container';
import HolidayContainer from '../pages/holiday/holiday-container';
import Accomodation from '../pages/content/accomodation/accomodation-container';
import EventsPage from '../pages/content/events/events-container';
import InnovationsScreen from '../pages/home/navbar-section/discover-section/elements/innovations-screen';
import DestinationDetailsContainer from '../pages/content/destination-details/details-container';
import { QNA } from '../pages/content/qna-form/qna-container';

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
    element: <EventsPage />,
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
