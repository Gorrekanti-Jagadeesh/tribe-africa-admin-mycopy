import { Option, ServicesProps } from '../types';
import demoImage from '../assets/homepage-welcome-image-3.png';
import featuredBG from '../assets/branding-bg-dark.png';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const Countries: Option[] = [
  { value: 'Algeria', label: 'Algeria' },
  { value: 'Angola', label: 'Angola' },
  { value: 'Benin', label: 'Benin' },
  { value: 'Botswana', label: 'Botswana' },
  { value: 'Burkina-faso', label: 'Burkina Faso' },
];

export const Purpose: Option[] = [
  { value: 'Business', label: 'Business' },
  { value: 'Holiday', label: 'Holiday' },
];

export const Languages: Option[] = [
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
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

export const servicesData: ServicesProps[] = [
  {
    image: demoImage,
    heading: 'Executive Logistics',
    location: 'Fajara, The gambia',
  },
  {
    image: demoImage,
    heading: 'Executive Logistics',
    location: 'Fajara, The gambia',
  },
  {
    image: demoImage,
    heading: 'Executive Logistics',
    location: 'Fajara, The gambia',
  },
  {
    image: demoImage,
    heading: 'Executive Logistics',
    location: 'Fajara, The gambia',
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
    description: 'asdf',
  },
  {
    image: featuredBG,
    title: 'List your event here',
    redirectUrl: 'https://google.com',
  },
  {
    image: featuredBG,
    title: 'List your event here',
    redirectUrl: 'https://google.com',
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
      { label: 'Government & Official', url: '/events/trade-shows' },
      { label: 'Emergency & First Responders', url: '/events/conferences-seminars' },
      { label: 'Looking to hire someone?', url: '/events/product-launches' },
      { label: 'Find a Business', url: '/events/training-workshops' },
      { label: 'Accomidation', url: '/events/networking' },
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
