import { useQuery } from '@tanstack/react-query';
import NavFloatingLayout from '../layout/nav-floating-layout';
import { demoImage } from '@data/index';
import { useParams } from 'react-router';
import { sanity } from '@utils/sanity';
import { fromKebabCase } from '@utils/common';
import { Loading } from '@atoms/common/loading';

const categories = [
  {
    title: 'Restaurants & Eateries',
    image: demoImage,
    items: [
      { title: 'Traditional', url: 'https://example.com/traditional' },
      { title: 'Casual Dining', url: 'https://example.com/casual-dining' },
      { title: 'Fine Dining', url: 'https://example.com/fine-dining' },
      { title: 'Street Food', url: 'https://example.com/street-food' },
      { title: 'Vegeterian & Vegan', url: 'https://example.com/vegaterian-vegan' },
      { title: 'Beach Bars', url: 'https://example.com/beach-bars' },
    ],
  },
  {
    title: 'Bars & Pubs',
    image: demoImage,
    items: [
      { title: 'Cocktail Bars', url: 'https://example.com/cocktail-bars' },
      { title: 'Sports Bars', url: 'https://example.com/sports-bars' },
      { title: 'Beer Gardens', url: 'https://example.com/beer-gardens' },
    ],
  },
  {
    title: 'Nightclubs',
    image: demoImage,
    items: [
      { title: 'DJ Nights', url: 'https://example.com/dj-nights' },
      { title: 'Live Music', url: 'https://example.com/live-music' },
      { title: 'Themed Nights', url: 'https://example.com/themed-nights' },
    ],
  },
  {
    title: 'Shopping',
    image: demoImage,
    items: [
      { title: 'Malls', url: 'https://example.com/malls' },
      { title: 'Boutiques', url: 'https://example.com/boutiques' },
      { title: 'Local Markets', url: 'https://example.com/local-markets' },
    ],
  },
  {
    title: 'Clubs & Special Groups',
    image: demoImage,
    items: [
      { title: 'Toastmasters', url: 'https://example.com/toastmasters' },
      { title: 'Photography Club', url: 'https://example.com/photography-club' },
      { title: 'Book Club', url: 'https://example.com/book-club' },
    ],
  },
  {
    title: 'Wellness & Beauty',
    image: demoImage,
    items: [
      { title: 'Gyms', url: 'https://example.com/gyms' },
      { title: 'Spas', url: 'https://example.com/spas' },
      { title: 'Yoga Studios', url: 'https://example.com/yoga-studios' },
    ],
  },
  {
    title: 'Religious Institutions',
    image: demoImage,
    items: [
      { title: 'Churches', url: 'https://example.com/churches' },
      { title: 'Mosques', url: 'https://example.com/mosques' },
      { title: 'Temples', url: 'https://example.com/temples' },
    ],
  },
  {
    title: 'For Children',
    image: demoImage,
    items: [
      { title: 'Play Areas', url: 'https://example.com/play-areas' },
      { title: "Kids' Workshops", url: 'https://example.com/kids-workshops' },
      { title: 'Theme Parks', url: 'https://example.com/theme-parks' },
    ],
  },
];

const OutAndAbout = () => {
  const { country } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ['accomodationData', country],
    queryFn: () => sanity.GET(`*[_type == "after-work" && country == "${fromKebabCase(country)}"]`),
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Data not loaded yet..</div>;

  return <NavFloatingLayout categories={categories} />;
};

export default OutAndAbout;
