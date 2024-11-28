import ColsGrid from '@molecules/layout/cols-grid';
import OverLayCard from '../../atoms/card/overlay-card';
import { FloatingSibling } from '../common/floating-sibling';

import { demoImage } from '@data/index';

const categories = [
  {
    title: 'Restaurants & Eateries',
    image: demoImage,
    items: [
      { title: 'Fine Dining', url: 'https://example.com/fine-dining' },
      { title: 'Fast Food', url: 'https://example.com/fast-food' },
      { title: 'Vegan Options', url: 'https://example.com/vegan-options' },
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
  return (
    <div>
      <h4 className="text-left text-orange-500 p-4 max-w-6xl">&rarr; Out & About</h4>
      <ColsGrid>
        {categories.map((category) => (
          <FloatingSibling
            component={
              <div className="px-4 m-4">
                <OverLayCard
                  data={{
                    title: category.title,
                    image: category.image,
                  }}
                />
              </div>
            }
            sibling={
              <div className="min-w-64 aspect-square overflow-auto text-left p-4 rounded-lg bg-white text-black">
                <h4 className="text-orange-500 font-semibold">&rarr; {category.title}</h4>
                {category.items.map((item) => (
                  <p>{item.title}</p>
                ))}
              </div>
            }
            // offset="parent"
          />
        ))}
      </ColsGrid>
    </div>
  );
};

export default OutAndAbout;
