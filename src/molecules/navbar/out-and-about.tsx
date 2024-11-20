import NavFloatingLayout from '../layout/nav-floating-layout';

const categories = [
  {
    title: 'Restaurants & Eateries',
    image: 'https://placehold.co/400',
    items: [
      { title: 'Fine Dining', url: 'https://example.com/fine-dining' },
      { title: 'Fast Food', url: 'https://example.com/fast-food' },
      { title: 'Vegan Options', url: 'https://example.com/vegan-options' },
    ],
  },
  {
    title: 'Bars & Pubs',
    image: 'https://placehold.co/400',
    items: [
      { title: 'Cocktail Bars', url: 'https://example.com/cocktail-bars' },
      { title: 'Sports Bars', url: 'https://example.com/sports-bars' },
      { title: 'Beer Gardens', url: 'https://example.com/beer-gardens' },
    ],
  },
  {
    title: 'Nightclubs',
    image: 'https://placehold.co/400',
    items: [
      { title: 'DJ Nights', url: 'https://example.com/dj-nights' },
      { title: 'Live Music', url: 'https://example.com/live-music' },
      { title: 'Themed Nights', url: 'https://example.com/themed-nights' },
      { title: 'DJ Nights', url: 'https://example.com/dj-nights' },
      { title: 'Live Music', url: 'https://example.com/live-music' },
      { title: 'Themed Nights', url: 'https://example.com/themed-nights' },
      { title: 'DJ Nights', url: 'https://example.com/dj-nights' },
      { title: 'Live Music', url: 'https://example.com/live-music' },
      { title: 'Themed Nights', url: 'https://example.com/themed-nights' },
      { title: 'DJ Nights', url: 'https://example.com/dj-nights' },
      { title: 'Live Music', url: 'https://example.com/live-music' },
      { title: 'Themed Nights', url: 'https://example.com/themed-nights' },
      { title: 'DJ Nights', url: 'https://example.com/dj-nights' },
      { title: 'Live Music', url: 'https://example.com/live-music' },
      { title: 'Themed Nights', url: 'https://example.com/themed-nights' },
      { title: 'DJ Nights', url: 'https://example.com/dj-nights' },
      { title: 'Live Music', url: 'https://example.com/live-music' },
      { title: 'Themed Nights', url: 'https://example.com/themed-nights' },
    ],
  },
  {
    title: 'Shopping',
    image: 'https://placehold.co/400',
    items: [
      { title: 'Malls', url: 'https://example.com/malls' },
      { title: 'Boutiques', url: 'https://example.com/boutiques' },
      { title: 'Local Markets', url: 'https://example.com/local-markets' },
    ],
  },
  {
    title: 'Clubs & Special Groups',
    image: 'https://placehold.co/400',
    items: [
      { title: 'Toastmasters', url: 'https://example.com/toastmasters' },
      { title: 'Photography Club', url: 'https://example.com/photography-club' },
      { title: 'Book Club', url: 'https://example.com/book-club' },
    ],
  },
  {
    title: 'Wellness & Beauty',
    image: 'https://placehold.co/400',
    items: [
      { title: 'Gyms', url: 'https://example.com/gyms' },
      { title: 'Spas', url: 'https://example.com/spas' },
      { title: 'Yoga Studios', url: 'https://example.com/yoga-studios' },
    ],
  },
  {
    title: 'Religious Institutions',
    image: 'https://placehold.co/400',
    items: [
      { title: 'Churches', url: 'https://example.com/churches' },
      { title: 'Mosques', url: 'https://example.com/mosques' },
      { title: 'Temples', url: 'https://example.com/temples' },
    ],
  },
  {
    title: 'For Children',
    image: 'https://placehold.co/400',
    items: [
      { title: 'Play Areas', url: 'https://example.com/play-areas' },
      { title: "Kids' Workshops", url: 'https://example.com/kids-workshops' },
      { title: 'Theme Parks', url: 'https://example.com/theme-parks' },
    ],
  },
];

const OutAndAbout = () => {
  return <NavFloatingLayout categories={categories} />;
};

export default OutAndAbout;
