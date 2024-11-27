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
    imageUrl: '/path/to/business-image.jpg',
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
    imageUrl: '/path/to/entertainment-image.jpg',
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
    imageUrl: '/path/to/sports-image.jpg',
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
