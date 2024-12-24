import { Option } from '../types';
import featuredBG from '../assets/branding-bg-dark.png';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { default as demoImage } from '@assets/homepage-welcome-image-3.png';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const demoData = [
  {
    title: 'image1',
    image: demoImage,
  },
  {
    title: 'image2',
    image: demoImage,
  },
  {
    title: 'image3',
    image: demoImage,
  },
  {
    title: 'image5',
    image: demoImage,
  },
  {
    title: 'image6',
    image: demoImage,
  },
  {
    title: 'image7',
    image: demoImage,
  },
  {
    title: 'image8',
    image: demoImage,
  },
  {
    title: 'image9',
    image: demoImage,
  },
];

export const Countries: Option[] = [
  { value: 'algeria', label: 'Algeria' },
  { value: 'angola', label: 'Angola' },
  { value: 'benin', label: 'Benin' },
  { value: 'botswana', label: 'Botswana' },
  { value: 'south-africa', label: 'South Africa' },
  { value: 'zimbabwe', label: 'Zimbabwe' },
];

// To be fetching using Sanity Later
export const countryInternetData = {
  algeria: { speed: '13.63 Mbps' },
  angola: { speed: '20.51 Mbps' },
  benin: { speed: '25.04 Mbps' },
  botswana: { speed: '24.14 Mbps' },
  'south-africa': { speed: '48.33 Mbps' },
  zimbabwe: { speed: '13.99 Mbps' },
};

export const Purpose: Option[] = [
  { value: 'business', label: 'Business' },
  { value: 'holiday', label: 'Holiday' },
];

export const Languages: Option[] = [
  { value: 'en_US', label: 'English' },
  { value: 'hin', label: 'Hindi' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'tel', label: 'Telugu' },
];

export const socialMediaLinks = [
  {
    icon: faFacebookF,
    link: 'https://facebook.com',
  },
  {
    icon: faTwitter,
    link: 'https://twitter.com',
  },
  {
    icon: faInstagram,
    link: 'https://instagram.com',
  },
  {
    icon: faLinkedinIn,
    link: 'https://linkedin.com',
  },
];

export { default as demoImage } from '@assets/homepage-welcome-image.png';

export const HolidayDestinationData = [
  {
    image: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(19).webp',
    title: 'One',
  },
  {
    image: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(65).webp',
    title: 'Two',
  },
  {
    image: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(11).webp',
    title: 'Three',
  },
  {
    image: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(99).webp',
    title: 'Four',
  },
  {
    image: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(41).webp',
    title: 'Five',
  },
  {
    image: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(11).webp',
    title: 'Three',
  },
  {
    image: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(99).webp',
    title: 'Four',
  },
  {
    image: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(41).webp',
    title: 'Five',
  },
];

export const carouselData: CarouselItem[] = [
  {
    id: 1,
    title: 'Title 1',
    description: 'Description 1',
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
  },
  {
    id: 2,
    title: 'Title 2',
    description: 'Description 2',
    image: 'https://cdn.fstoppers.com/styles/full/s3/media/2019/12/04/nando-jpeg-quality-001.jpg',
  },
  {
    id: 3,
    title: 'Title 3',
    description: 'Description 3',
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
  },
  {
    id: 4,
    title: 'Title 4',
    description: 'Description 4',
    image: 'https://cdn.fstoppers.com/styles/full/s3/media/2019/12/04/nando-jpeg-quality-001.jpg',
  },
  {
    id: 5,
    title: 'Title 5',
    description: 'Description 5',
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
  },
];

export const africanCurrencies = [
  'DZD',
  'AOA',
  'XOF',
  'BWP',
  'BIF',
  'CVE',
  'XAF',
  'KMF',
  'CDF',
  'DJF',
  'EGP',
  'ERN',
  'ETB',
  'GMD',
  'GHS',
  'GNF',
  'KES',
  'LSL',
  'LRD',
  'LYD',
  'MGA',
  'MWK',
  'MRO',
  'MUR',
  'MAD',
  'MZN',
  'NAD',
  'NGN',
  'RWF',
  'STD',
  'SCR',
  'SLL',
  'SOS',
  'ZAR',
  'SSP',
  'SDG',
  'SZL',
  'TZS',
  'TND',
  'UGX',
  'ZMW',
  'ZWL',
];

export const upcomingEvents = [
  {
    image: featuredBG,
    title: 'List your event here',
    redirectUrl: 'https://google.com',
    description: 'some description about this card',
    id: 1,
  },
  {
    image: featuredBG,
    title: 'List your event here',
    redirectUrl: 'https://google.com',
    id: 2,
  },
  {
    image: featuredBG,
    title: 'List your event here',
    redirectUrl: 'https://google.com',
    id: 3,
  },
];

// ----------- Events -------------------

export const eventURLs = [
  {
    title: 'Business Events',
    items: [
      { label: 'Trade Shows', url: '/events/trade-shows' },
      { label: 'Conferences & Seminars', url: '/events/conferences-seminars' },
      { label: 'Product Launches', url: '/events/product-launches' },
      { label: 'Training & Workshops', url: '/events/training-workshops' },
      { label: 'Networking', url: '/events/networking' },
    ],
    imageUrl: 'https://placehold.co/400',
  },
  {
    title: 'Entertainment',
    items: [
      { label: 'Arts', url: '/events/arts' },
      { label: 'Cultural Events & Festivals', url: '/events/cultural-events-festivals' },
      { label: 'Dance', url: '/events/dance' },
      { label: 'Fashion', url: '/events/fashion' },
      { label: 'Music', url: '/events/music' },
      { label: 'Theater & Comedy', url: '/events/theater-comedy' },
    ],
    imageUrl: 'https://placehold.co/400',
  },
  {
    title: 'Sports',
    items: [
      { label: 'Boxing', url: '/events/boxing' },
      { label: 'Football', url: '/events/football' },
      { label: 'Marathons', url: '/events/marathons' },
      { label: 'Races', url: '/events/races' },
      { label: 'Racket sports', url: '/events/racket-sports' },
      { label: 'Wrestling', url: '/events/wrestling' },
    ],
    imageUrl: 'https://placehold.co/400',
  },
];

export const travelKnowledgeURLs = [
  {
    items: [
      { label: 'General Info', url: '/events/trade-shows' },
      { label: 'Airlines that fly to ...', url: '/events/conferences-seminars' },
      { label: 'Product Launches', url: '/events/product-launches' },
      { label: 'Training & Workshops', url: '/events/training-workshops' },
      { label: 'Networking', url: '/events/networking' },
    ],
  },
  {
    title: 'Important Addresses',
    items: [
      { label: 'Arts', url: '/events/arts' },
      { label: 'Cultural Events & Festivals', url: '/events/cultural-events-festivals' },
      { label: 'Dance', url: '/events/dance' },
      { label: 'Fashion', url: '/events/fashion' },
      { label: 'Music', url: '/events/music' },
      { label: 'Theater & Comedy', url: '/events/theater-comedy' },
    ],
    imageUrl: 'https://placehold.co/400',
  },
  {
    title: 'Useful Services',
    items: [
      { label: 'Boxing', url: '/events/boxing' },
      { label: 'Football', url: '/events/football' },
      { label: 'Marathons', url: '/events/marathons' },
      { label: 'Races', url: '/events/races' },
      { label: 'Racket sports', url: '/events/racket-sports' },
      { label: 'Wrestling', url: '/events/wrestling' },
    ],
    imageUrl: 'https://placehold.co/400',
    subTitle: 'For more Services checkout',
    subitems: [{ label: 'Tribe Africa Pages', url: '/tribe-africa-pages' }],
  },
];

export const networkURLs = [
  {
    title: 'Tribe Africa Pages',
    items: [
      {
        label: 'Government & Official',
        subItems: [
          {
            subTitle: 'Government & Official',
            subItems: [
              { label: 'Ministries', url: '/tribe-africa-pages/ministries' },
              { label: 'National Boards', url: '/tribe-africa-pages/national-boards' },
              { label: 'Chambers of Commerce', url: '/tribe-africa-pages/chambers-of-commerce' },
              { label: 'Parastatals', url: '/tribe-africa-pages/parastatals' },
              { label: 'International Organizations', url: '/tribe-africa-pages/international-organizations' },
              { label: 'Foreign Embassies & Consultates', url: '/tribe-africa-pages/foreign-embassies-consultates' },
              { label: 'National Tourist Offices', url: '/tribe-africa-pages/national-tourist-offices' },
              { label: 'Immigration', url: '/tribe-africa-pages/immigration' },
            ],
          },
          {
            subTitle: 'Emergency & First Responders',
            subItems: [
              { label: 'Police', url: '/tribe-africa-pages/police' },
              { label: 'Hospitals & Clinics', url: '/tribe-africa-pages/hospitals-clinics' },
              { label: 'Pharmacutics', url: '/tribe-africa-pages/pharmacutics' },
              { label: 'Fire Stations', url: '/tribe-africa-pages/fire-stations' },
            ],
          },
          {
            subTitle: 'Looking to hire someone?',
            subItems: [
              { label: 'Ministries', url: '/tribe-africa-pages/ministries' },
              { label: 'National Boards', url: '/tribe-africa-pages/national-boards' },
              { label: 'Chambers of Commerce', url: '/tribe-africa-pages/national-boards' },
              { label: 'Parastatals', url: '/tribe-africa-pages/national-boards' },
              { label: 'International Organizations', url: '/tribe-africa-pages/national-boards' },
              { label: 'Foreign Embassies & Consultates', url: '/tribe-africa-pages/national-boards' },
              { label: 'National Tourist Offices', url: '/tribe-africa-pages/national-boards' },
              { label: 'Immigration', url: '/tribe-africa-pages/national-boards' },
            ],
          },
          {
            subTitle: 'Find a Business',
            subItems: [
              { label: 'Ministries', url: '/tribe-africa-pages/ministries' },
              { label: 'National Boards', url: '/tribe-africa-pages/national-boards' },
              { label: 'Chambers of Commerce', url: '/tribe-africa-pages/national-boards' },
              { label: 'Parastatals', url: '/tribe-africa-pages/national-boards' },
              { label: 'International Organizations', url: '/tribe-africa-pages/national-boards' },
              { label: 'Foreign Embassies & Consultates', url: '/tribe-africa-pages/national-boards' },
              { label: 'National Tourist Offices', url: '/tribe-africa-pages/national-boards' },
              { label: 'Immigration', url: '/tribe-africa-pages/national-boards' },
            ],
          },
          {
            subTitle: 'Accomidation',
            subItems: [
              { label: 'Ministries', url: '/tribe-africa-pages/ministries' },
              { label: 'National Boards', url: '/tribe-africa-pages/national-boards' },
              { label: 'Chambers of Commerce', url: '/tribe-africa-pages/national-boards' },
              { label: 'Parastatals', url: '/tribe-africa-pages/national-boards' },
              { label: 'International Organizations', url: '/tribe-africa-pages/national-boards' },
              { label: 'Foreign Embassies & Consultates', url: '/tribe-africa-pages/national-boards' },
              { label: 'National Tourist Offices', url: '/tribe-africa-pages/national-boards' },
              { label: 'Immigration', url: '/tribe-africa-pages/national-boards' },
            ],
          },
        ],
      },
    ],
    imageUrl: 'https://placehold.co/400',
  },
  {
    title: 'Business Events',
    items: [
      { label: 'Trade Shows', url: '/events/arts' },
      { label: 'Conferences & Seminars', url: '/events/cultural-events-festivals' },
      { label: 'Product Launches', url: '/events/dance' },
      { label: 'Training & Workshops', url: '/events/fashion' },
      { label: 'Networking', url: '/events/music' },
    ],
    imageUrl: 'https://placehold.co/400',
  },
  {
    title: 'My Tribe',
    items: [
      { label: 'Chat Room', url: '/events/boxing' },
      { label: 'Round Tables', url: '/events/football' },
      { label: 'Jobs (Coming Soon)', url: '/events/marathons' },
    ],
    imageUrl: 'https://placehold.co/400',
  },
];

export const eventTypes = [
  {
    title: 'Business Events',
    value: 'business',
    items: [
      { title: 'Trade Shows', value: 'trade-shows' },
      { title: 'Conferences & Seminars', value: 'conferences-seminars' },
      { title: 'Product Launches', value: 'product-launches' },
      { title: 'Training & Workshops', value: 'training-workshops' },
      { title: 'Networking', value: 'networking' },
    ],
  },
  {
    title: 'Entertainment',
    value: 'entertainment',
    items: [
      { title: 'Arts', value: 'arts' },
      { title: 'Cultural Events & Festivals', value: 'cultural-events-festivals' },
      { title: 'Dance', value: 'dance' },
      { title: 'Fashion', value: 'fashion' },
      { title: 'Music', value: 'music' },
      { title: 'Theater & Comedy', value: 'theater-comedy' },
    ],
  },
  {
    title: 'Sports',
    value: 'sports',
    items: [
      { title: 'Boxing', value: 'boxing' },
      { title: 'Football', value: 'football' },
      { title: 'Marathons', value: 'marathons' },
      { title: 'Races', value: 'races' },
      { title: 'Racket sports', value: 'racket-sports' },
      { title: 'Wrestling', value: 'wrestling' },
    ],
  },
];

// -----------Must see and do ---------------
export const msadCategories = [
  { category: 'action-enthusiasts', title: 'Action Enthusiasts' },
  { category: 'historical-cultural-sites', title: 'Historical & Cultural Sites' },
  { category: 'nature', title: 'Nature' },
  { category: 'sacred-sites', title: 'Sacred Sites' },
  { category: 'excursions', title: 'Excursions' },
  { category: 'voluntourism', title: 'Voluntourism' },
];

module.exports = { ...module.exports, demoImage };
