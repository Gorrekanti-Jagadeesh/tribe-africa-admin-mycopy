import NavFloatingLayout from '../layout/nav-floating-layout';

const AfterWork = () => {
  const categories = [
    {
      title: 'Restaurants & Eateries',
      image: 'https://example.com/fine-dining',
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
      image: 'path/to/bars_image.jpg',
      items: [
        { title: 'Cocktail Bars', url: 'https://example.com/cocktail-bars' },
        { title: 'Sports Bars', url: 'https://example.com/sports-bars' },
        { title: 'Beer Gardens', url: 'https://example.com/beer-gardens' },
      ],
    },
    {
      title: 'Nightclubs',
      image: 'path/to/nightclub_image.jpg',
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
      image: 'path/to/shopping_image.jpg',
      items: [
        { title: 'Malls', url: 'https://example.com/malls' },
        { title: 'Boutiques', url: 'https://example.com/boutiques' },
        { title: 'Local Markets', url: 'https://example.com/local-markets' },
      ],
    },
    {
      title: 'Clubs & Special Groups',
      image: 'path/to/clubs_image.jpg',
      items: [
        { title: 'Toastmasters', url: 'https://example.com/toastmasters' },
        { title: 'Photography Club', url: 'https://example.com/photography-club' },
        { title: 'Book Club', url: 'https://example.com/book-club' },
      ],
    },
    {
      title: 'Wellness & Beauty',
      image: 'path/to/wellness_image.jpg',
      items: [
        { title: 'Gyms', url: 'https://example.com/gyms' },
        { title: 'Spas', url: 'https://example.com/spas' },
        { title: 'Yoga Studios', url: 'https://example.com/yoga-studios' },
      ],
    },
    {
      title: 'Religious Institutions',
      image: 'path/to/religious_image.jpg',
      items: [
        { title: 'Churches', url: 'https://example.com/churches' },
        { title: 'Mosques', url: 'https://example.com/mosques' },
        { title: 'Temples', url: 'https://example.com/temples' },
      ],
    },
    {
      title: 'For Children',
      image: 'path/to/children_image.jpg',
      items: [
        { title: 'Play Areas', url: 'https://example.com/play-areas' },
        { title: "Kids' Workshops", url: 'https://example.com/kids-workshops' },
        { title: 'Theme Parks', url: 'https://example.com/theme-parks' },
      ],
    },
  ];
  return (
    <NavFloatingLayout categories={categories} />
    // <div className="p-4">
    //   <h4 className="text-left text-orange-500 text-lg">&rarr; Discover</h4>
    //   <div className="flex">
    //     {data.map((item) => (
    //       <div className="inline-block p-2 my-2 cursor-pointer w-fit">
    //         <div
    //           className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
    //           style={{
    //             width: '200px',
    //             backgroundImage: `url(${item.image})`,
    //           }}
    //         ></div>
    //         <p className="text-left">{item.title}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default AfterWork;

// const data = [
//   {
//     title: '',
//     image: '',
//   },
// ];
