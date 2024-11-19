import { Header } from './header';

import Discover from '../navbar/discover';
import Events from '../navbar/events';
import Blogs from '../navbar/blogs';
import TravelKnowledge from '../navbar/travel-knowledge';
import Network from '../navbar/network';
import OutAndAbout from '../navbar/out-and-about';

export const HomeHeader = () => {
  const menuItems = [
    { id: 'getting-there', title: 'Getting there', isNavLink: true, content: <>Coming soon</> },
    { id: 'discover', title: 'Discover', isNavLink: true, content: <Discover /> },
    { id: 'events', title: 'Events', isNavLink: true, content: <Events /> },
    { id: 'institute-collaboration', title: 'Peace & Prosperity Institute', isNavLink: true, content: <>Content</> },
    { id: 'blogs', title: 'Blogs', isNavLink: true, content: <Blogs /> },
    { id: 'contact', title: 'Contact', isNavLink: false, content: null },
  ];

  return <Header menuItems={menuItems} />;
};

export const BusinessHeader = ({ country }: { country: string | undefined }) => {
  const menuItems = [
    { id: 'country', title: country, isNavLink: false, content: null },
    { id: 'network', title: 'Network', isNavLink: true, content: <Network /> },
    { id: 'market-place', title: 'Market Place', isNavLink: true, content: <>Content</> },
    { id: 'after-work', title: 'After Work', isNavLink: true, content: <>Content</> },
    { id: 'travel-knowledge', title: 'Travel Knowledge', isNavLink: true, content: <TravelKnowledge /> },
    { id: 'blogs', title: 'Blogs', isNavLink: true, content: <Blogs /> },
  ];

  return <Header country={country} menuItems={menuItems} />;
};

// TODO: Add holiday nav elements here, currently this is a copied version of business header
export const HolidayHeader = () => {
  const menuItems = [
    { id: 'country', title: 'Country Name', isNavLink: false, content: null },
    { id: 'Out & about', title: 'Network', isNavLink: true, content: <OutAndAbout /> },
    { id: 'market-place', title: 'Market Place', isNavLink: true, content: <>Coming Soon</> },
    { id: 'after-work', title: 'After Work', isNavLink: true, content: <>Coming soon</> },
    { id: 'travel-knowledge', title: 'Travel Knowledge', isNavLink: true, content: <TravelKnowledge /> },
    { id: 'blogs', title: 'Blogs', isNavLink: true, content: <Blogs /> },
  ];

  return <Header menuItems={menuItems} />;
};
