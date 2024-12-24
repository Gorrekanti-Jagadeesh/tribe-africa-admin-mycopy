import { Header } from './header';

import Discover from '../navbar/discover';
import Events from '../navbar/events';
import Blogs from '../navbar/blogs';
import TravelKnowledge from '../navbar/travel-knowledge';
import Network from '../navbar/network';
import OutAndAbout from '../navbar/out-and-about';
import PeaceProsperity from '../navbar/peace-prosperity';
import AfterWork from '../navbar/after-work';
import BusinessEvents from '../navbar/holiday-events';
import MustSeeAndDo from '../navbar/must-see-and-do';
import { fromKebabCase } from '@utils/common';

export const HomeHeader = () => {
  const menuItems = [
    { id: 'getting-there', title: 'Getting there', isNavLink: true, content: <>Coming soon</> },
    { id: 'discover', title: 'Discover', isNavLink: true, content: <Discover /> },
    { id: 'events', title: 'Events', isNavLink: true, content: <Events /> },
    {
      id: 'institute-collaboration',
      title: 'Peace & Prosperity Institute',
      isNavLink: true,
      content: <PeaceProsperity />,
    },
    { id: 'blogs', title: 'Blogs', isNavLink: true, content: <Blogs /> },
    { id: 'contact', title: 'Contact', isNavLink: false, content: null },
  ];

  return <Header menuItems={menuItems} />;
};

export const BusinessHeader = ({ country }: { country: string | undefined }) => {
  const menuItems = [
    { id: 'country', title: fromKebabCase(country), isNavLink: false, redirect: `/country/${country}` },
    { id: 'network', title: 'Network', isNavLink: true, content: <Network /> },
    { id: 'market-place', title: 'Market Place', isNavLink: true, content: <>Coming soon</> },
    { id: 'after-work', title: 'After Work', isNavLink: true, content: <AfterWork /> },
    {
      id: 'travel-knowledge',
      title: 'Travel Knowledge',
      isNavLink: true,
      content: <TravelKnowledge country={fromKebabCase(country)} />,
    },
    { id: 'blogs', title: 'Blogs', isNavLink: true, content: <Blogs /> },
  ];

  return <Header country={country} menuItems={menuItems} />;
};

export const HolidayHeader = ({ country }: { country: string | undefined }) => {
  const menuItems = [
    { id: 'country', title: fromKebabCase(country), isNavLink: false, redirect: `/country/${country}` },
    { id: 'Out & about', title: 'Out & About', isNavLink: true, content: <OutAndAbout /> },
    { id: 'events', title: 'Events', isNavLink: true, content: <BusinessEvents /> },
    { id: 'must-see-and-do', title: 'Must See & Do', isNavLink: true, content: <MustSeeAndDo /> },
    {
      id: 'travel-knowledge',
      title: 'Travel Knowledge',
      isNavLink: true,
      content: <TravelKnowledge country={country} />,
    },
    { id: 'blogs', title: 'Blogs', isNavLink: true, content: <Blogs /> },
  ];

  return <Header menuItems={menuItems} />;
};

// TODO:
// Add the remaining sections.
// Peace and Prosperity popup changes implementation pending.
