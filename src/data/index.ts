import { Option, ServicesProps } from '../types';
import demoImage from '../assets/homepage-welcome-image-3.png';
import featuredBG from '../assets/branding-bg-dark.png';

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
