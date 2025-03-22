import { jsx as _jsx } from 'react/jsx-runtime';
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
import AccommodationForm from '@molecules/forms/accomodation-creation-form';
import CountryEventsPage from '../pages/events/business-events';
import FindABusinessLinksContainer from '../pages/find-a-business/find-a-business-links-container';
import FindABusinessContainer from '@/pages/find-a-business/find-a-business-container';
import FindaBusinessDetailsContainer from '@/pages/find-a-business/find-a-business-details-container';
import CandidateForm from '@/molecules/forms/candidate-form';
import CreateBusinessForm from '@/molecules/forms/business-creation-form';
import ProfessionalDataForm from '@/molecules/forms/proffessional-form';
import UserDashboardContainer from '@/pages/user-dashboard/user-dashboard-container';
import AfterWorkFrom from '@/molecules/forms/after-work-form';
import AfterWorkContainer from '@/pages/afterWork/afterwork-container';
import AfterWorkDetailsContainer from '@/pages/afterWork/afterwork-details-container';
import BusinessFormComponent from '@/molecules/forms/business-creation-form';
const appRoutes = [
  {
    name: 'Home',
    path: '/',
    element: _jsx(HomeContainer, {}),
  },
  {
    name: 'Business Page',
    path: '/:country/business',
    element: _jsx(BusinessContainer, {}),
  },
  {
    name: 'Holiday Page',
    path: '/:country/holiday',
    element: _jsx(HolidayContainer, {}),
  },
  {
    name: 'User Dashbaord',
    path: '/user/dashboard',
    element: _jsx(UserDashboardContainer, {}),
  },
  {
    name: 'Accommodation',
    path: '/:country/:pageType/:category/:sub_category/:categoryInfoId',
    element: _jsx(AccommodationDetailsContainer, {}),
  },
  {
    name: 'Accommodations List',
    path: ':country/:pageType/:category/:sub_category',
    element: _jsx(AccomodationContainer, {}),
  },
  {
    name: 'AfterWork',
    path: '/:country/:pageType/:category/afterwork/:sub_category/:categoryInfoId/',
    element: _jsx(AfterWorkDetailsContainer, {}),
  },
  {
    name: 'AfterWork List',
    path: ':country/:pageType/:category/afterwork/:sub_category',
    element: _jsx(AfterWorkContainer, {}),
  },
  {
    name: 'events',
    path: '/events/:event_category/:event_type',
    element: _jsx(EventsPage, {}),
  },
  {
    name: 'Event details',
    path: '/events/:event_category/:event_type/:eventId',
    element: _jsx(EventDetailsPage, {}),
  },
  {
    name: 'Country events',
    path: '/:country/events/:event_category/:event_type',
    element: _jsx(CountryEventsPage, {}),
  },
  {
    name: 'Country Business events',
    path: '/:country/events/:event_category/:event_type/:eventId',
    element: _jsx(EventDetailsPage, {}),
  },
  {
    name: 'Blogs List - No Country',
    path: '/:blogCategory/blogs',
    element: _jsx(BlogPage, {}),
  },
  {
    name: 'Blogs List - No Country',
    path: '/:country/:blogCategory/blogs',
    element: _jsx(BlogPage, {}),
  },
  {
    name: 'Blog Details - No Country',
    path: '/:blogCategory/blogs/:blogId',
    element: _jsx(BlogDetailsPage, {}),
  },
  {
    name: 'Blog Details - With Country',
    path: '/:country/:blogCategory/blogs/:blogId',
    element: _jsx(BlogDetailsPage, {}),
  },
  {
    name: 'qna',
    path: ':country/qna',
    element: _jsx(QNA, {}),
  },
  {
    name: 'innovations',
    path: '/discover/:category/:subcategory',
    element: _jsx(DiscoverArticles, {}),
  },
  {
    name: 'must see and do',
    path: '/:country/holiday/must-see-and-do/:category',
    element: _jsx(MustSeeAndDo, {}),
  },
  {
    name: 'must see and do details',
    path: '/:country/holiday/must-see-and-do/:category/:id',
    element: _jsx(MustSeeAndDoDetails, {}),
  },
  {
    name: 'destinations',
    path: '/details/:name',
    element: _jsx(DestinationDetailsContainer, {}),
  },
  {
    name: 'tribe africa pages',
    path: '/:country/business/tribe-africa-pages/:category/:subcategory',
    element: _jsx(TribeAfricaPagesContainer, {}),
  },
  {
    name: 'tribe africa details pages',
    path: '/:country/business/tribe-africa-pages/:category/:id',
    element: _jsx(TribeAfricaPagesDetailsContainer, {}),
  },
  {
    name: 'hire some one',
    path: '/:country/business/details/looking-to-hire-someone',
    element: _jsx(LookingToHireSomeoneContainer, {}),
  },
  {
    name: 'Find a business',
    path: '/:country/business/details/find-a-business',
    element: _jsx(FindABusinessLinksContainer, {}),
  },
  {
    name: 'hire some one details',
    path: '/:country/business/details/looking-to-hire-someone/:proffessionalId',
    element: _jsx(LookingToHireSomeoneDetailsContainer, {}),
  },
  {
    name: 'country information',
    path: '/country/:country',
    element: _jsx(CountryDetails, {}),
  },
  {
    name: 'not found page',
    path: '*',
    element: _jsx(NotFound, {}),
  },
  {
    name: 'hotel form',
    path: '/form',
    element: _jsx(AccommodationForm, {}),
  },
  {
    name: 'Business form',
    path: '/business-form',
    element: _jsx(BusinessFormComponent, {}),
  },
  {
    name: 'find a business screen',
    path: '/:country/business/find-a-business/:main_category/:sub_category?',
    element: _jsx(FindABusinessContainer, {}),
  },
  {
    name: 'find a business details screen',
    path: '/:country/business/find-a-business/details/:main_category/:sub_category?/:id',
    element: _jsx(FindaBusinessDetailsContainer, {}),
  },
  {
    name: 'Tribe africa pages - candidate form',
    path: '/candidate-form',
    element: _jsx(CandidateForm, {}),
  },
  {
    name: 'Tribe africa pages - create business form',
    path: '/create-business-form',
    element: _jsx(CreateBusinessForm, {}),
  },
  {
    name: 'Tribe africa pages - Proffessional form',
    path: '/proffessional-form',
    element: _jsx(ProfessionalDataForm, {}),
  },
  {
    name: 'After work form',
    path: '/after-work-form',
    element: _jsx(AfterWorkFrom, {}),
  },
];
export default appRoutes;
