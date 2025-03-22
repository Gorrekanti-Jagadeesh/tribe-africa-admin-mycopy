import { Fragment as _Fragment, jsx as _jsx } from 'react/jsx-runtime';
import { Header } from './header';
import Discover from '../navbar/discover';
import Events from '../navbar/events';
import Blogs from '../navbar/blogs';
import TravelKnowledge from '../navbar/travel-knowledge';
import Network from '../navbar/network';
import OutAndAbout from '../navbar/out-and-about';
import PeaceProsperity from '../navbar/peace-prosperity';
import AfterWork from '../navbar/after-work';
import MustSeeAndDo from '../navbar/must-see-and-do';
import { fromKebabCase } from '@utils/common';
import HolidayEventsPage from '../../pages/events/holiday-events';
export const HomeHeader = () => {
  const menuItems = [
    {
      id: 'getting-there',
      title: 'Getting there',
      isNavLink: true,
      content: _jsx(_Fragment, { children: 'Coming soon' }),
    },
    { id: 'discover', title: 'Discover', isNavLink: true, content: _jsx(Discover, {}) },
    { id: 'events', title: 'Events', isNavLink: true, content: _jsx(Events, {}) },
    {
      id: 'institute-collaboration',
      title: 'Peace & Prosperity Institute',
      isNavLink: true,
      content: _jsx(PeaceProsperity, {}),
    },
    { id: 'blogs', title: 'Blogs', isNavLink: true, content: _jsx(Blogs, {}) },
    { id: 'contact', title: 'Contact', isNavLink: false, content: null },
  ];
  return _jsx(Header, { menuItems: menuItems });
};
export const BusinessHeader = ({ country }) => {
  const menuItems = [
    { id: 'country', title: fromKebabCase(country), isNavLink: false, redirect: `/country/${country}` },
    { id: 'network', title: 'Network', isNavLink: true, content: _jsx(Network, { country: fromKebabCase(country) }) },
    {
      id: 'market-place',
      title: 'Market Place',
      isNavLink: true,
      content: _jsx(_Fragment, { children: 'Coming soon' }),
    },
    { id: 'after-work', title: 'After Work', isNavLink: true, content: _jsx(AfterWork, {}) },
    {
      id: 'travel-knowledge',
      title: 'Travel Knowledge',
      isNavLink: true,
      content: _jsx(TravelKnowledge, { country: fromKebabCase(country), pageType: 'business' }),
    },
    { id: 'blogs', title: 'Blogs', isNavLink: true, content: _jsx(Blogs, {}) },
  ];
  return _jsx(Header, { country: country, menuItems: menuItems });
};
export const HolidayHeader = ({ country }) => {
  const menuItems = [
    { id: 'country', title: fromKebabCase(country), isNavLink: false, redirect: `/country/${country}` },
    { id: 'events', title: 'Events', isNavLink: true, content: _jsx(HolidayEventsPage, {}) },
    { id: 'must-see-and-do', title: 'Must See & Do', isNavLink: true, content: _jsx(MustSeeAndDo, {}) },
    { id: 'Out & about', title: 'Out & About', isNavLink: true, content: _jsx(OutAndAbout, {}) },
    {
      id: 'travel-knowledge',
      title: 'Travel Knowledge',
      isNavLink: true,
      content: _jsx(TravelKnowledge, { country: fromKebabCase(country), pageType: 'holiday' }),
    },
    { id: 'blogs', title: 'Blogs', isNavLink: true, content: _jsx(Blogs, {}) },
  ];
  return _jsx(Header, { menuItems: menuItems });
};
