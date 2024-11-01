import HomeContainer from '../pages/home/home-container';
import BusinessContainer from '../pages/business/business-container';
import HolidayContainer from '../pages/holiday/holiday-container';
import InnovationsScreen from '../pages/home/navbar-section/discover-section/elements/innovations-screen';

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
    name: 'innovations',
    path: '/africa/smart-innovations',
    element: <InnovationsScreen />,
  },
];

export default appRoutes;
