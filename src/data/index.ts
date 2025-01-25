import { Option } from '../types';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { default as demoImage } from '@assets/homepage-welcome-image-3.png';

interface MarkerType {
  name: string;
  coordinates: [number, number];
  category: string;
  subCategory?: string;
}

interface CountryDataType {
  center: [number, number];
  markers: MarkerType[];
  scale: number;
}

export { demoImage };

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
];

export const Countries: Option[] = [
  { label: 'Algeria', value: 'Algeria' },
  { label: 'Botswana', value: 'Botswana' },
  { label: 'Rwanda', value: 'Rwanda' },
  { label: 'Sierra Leone', value: 'Sierra-Leone' },
  { label: 'Ghana', value: 'Ghana' },
  { label: 'Tanzania', value: 'Tanzania' },
  { label: 'Zambia', value: 'Zambia' },
  { label: 'Mauritius', value: 'Mauritius' },
  { label: 'The Gambia', value: 'The-Gambia' },
  { label: 'Zimbabwe', value: 'Zimbabwe' },
  { label: 'Angola', value: 'Angola' },
  { label: 'Benin', value: 'Benin' },
  { label: 'South Africa', value: 'South-Africa' },
  { label: 'Mozambique', value: 'Mozambique' },
];

export const CountriesGeoData: Record<string, CountryDataType> = {
  algeria: {
    center: [2.6328, 28.0339],
    markers: [
      { name: 'Algiers', coordinates: [3.0588, 36.7323], category: 'Cities' },
      { name: 'Oran', coordinates: [-0.6299, 35.6971], category: 'Cities' },
      { name: 'Constantine', coordinates: [6.6147, 36.365], category: 'Cities' },
      { name: 'Annaba', coordinates: [7.7662, 36.8969], category: 'Cities' },
      { name: 'Batna', coordinates: [6.1739, 35.555], category: 'Cities' },
      {
        name: 'Hoggar Mountains',
        coordinates: [5.7749, 23.6854],
        category: 'Action Enthusiasts',
        subCategory: 'Conquer the Sahara',
      },
      {
        name: "Tassili n'Ajjer",
        coordinates: [9.2195, 24.7986],
        category: 'Action Enthusiasts',
        subCategory: 'Conquer the Sahara',
      },
      {
        name: 'Djurdjura Mountains',
        coordinates: [4.3286, 36.5661],
        category: 'Action Enthusiasts',
        subCategory: 'Climb to New heights',
      },
      {
        name: 'Tlemcen National Park',
        coordinates: [-1.2974, 34.8828],
        category: 'Action Enthusiasts',
        subCategory: 'Climb to New heights',
      },
      {
        name: 'Tamanrasset',
        coordinates: [5.5228, 22.785],
        category: 'Action Enthusiasts',
        subCategory: 'Dive into History',
      },
      {
        name: 'Timgad',
        coordinates: [6.4674, 35.4881],
        category: 'Action Enthusiasts',
        subCategory: 'Dive into History',
      },
      {
        name: 'Djemila',
        coordinates: [5.7382, 36.3147],
        category: 'Action Enthusiasts',
        subCategory: 'Surf the waves',
      },
      { name: 'Djanet', coordinates: [8.7, 24.55], category: 'Action Enthuisiasts', subCategory: 'Soar through sky' },
      {
        name: 'Sidi Boumediene Mosque',
        coordinates: [-1.3369, 34.8783],
        category: 'Action Enthuisiasts',
        subCategory: 'Soar through sky',
      },
      { name: 'Tipaza', coordinates: [2.4496, 36.5897], category: 'Action Enthusiasts', subCategory: 'Surf the waves' },
      { name: 'Beni Hammad Fort', coordinates: [4.7667, 35.8333], category: 'Nature', subCategory: 'Nature1' },
      { name: 'El Kala National Park', coordinates: [8.4667, 36.8833], category: 'Nature', subCategory: 'Nature1' },
      { name: 'Chréa National Park', coordinates: [2.8172, 36.4628], category: 'Nature', subCategory: 'Nature2' },
      { name: 'Ahaggar National Park', coordinates: [5.8735, 23.2856], category: 'Nature', subCategory: 'Nature2' },
      { name: 'Casbah of Algiers', coordinates: [3.0588, 36.7665], category: 'Historical & Cultural' },
      { name: 'Mzab Valley', coordinates: [3.6667, 32.4911], category: 'Historical & Cultural' },
      { name: 'Sidi Okba Mosque', coordinates: [5.743, 34.7059], category: 'Sacred Sites' },
      { name: "Qal'a of Beni Hammad", coordinates: [4.7782, 35.863], category: 'Sacred Sites' },
      { name: 'Sidi Abderrahmane', coordinates: [3.046, 36.7809], category: 'Sacred Sites' },
    ],
    scale: 2100,
  },
  angola: {
    center: [17.8739, -11.2027],
    markers: [
      { name: 'Luanda', coordinates: [13.2344, -8.8383], category: 'Cities' },
      { name: 'Huambo', coordinates: [15.7346, -12.7761], category: 'Cities' },
      { name: 'Lubango', coordinates: [13.4916, -14.9172], category: 'Cities' },
      { name: 'Kalandula Falls', coordinates: [16.0203, -9.0795], category: 'Nature' },
      { name: 'Quicama National Park', coordinates: [13.1395, -9.4514], category: 'Nature' },
      { name: 'Fortress of São Miguel', coordinates: [13.235, -8.8137], category: 'Historical & Cultural' },
    ],
    scale: 3000,
  },
  benin: {
    center: [2.3158, 9.3077],
    markers: [
      { name: 'Cotonou', coordinates: [2.4183, 6.3703], category: 'Cities' },
      { name: 'Porto-Novo', coordinates: [2.6167, 6.4969], category: 'Cities' },
      { name: 'Parakou', coordinates: [2.6163, 9.3372], category: 'Cities' },
      { name: 'Pendjari National Park', coordinates: [1.5416, 11.2382], category: 'Nature' },
      { name: 'Royal Palaces of Abomey', coordinates: [1.9876, 7.1825], category: 'Historical & Cultural' },
    ],
    scale: 2300,
  },
  botswana: {
    center: [24.6849, -22.3285],
    markers: [
      { name: 'Gaborone', coordinates: [25.9231, -24.6282], category: 'Cities' },
      { name: 'Francistown', coordinates: [27.5144, -21.1699], category: 'Cities' },
      { name: 'Maun', coordinates: [23.4167, -19.9833], category: 'Cities' },
      { name: 'Okavango Delta', coordinates: [23.0507, -19.9124], category: 'Nature' },
      { name: 'Chobe National Park', coordinates: [25.1999, -18.6616], category: 'Nature' },
    ],
    scale: 2300,
  },
  'south-africa': {
    center: [24.9916, -30.5595],
    markers: [
      { name: 'Johannesburg', coordinates: [28.0473, -26.2041], category: 'Cities' },
      { name: 'Cape Town', coordinates: [18.4241, -33.9249], category: 'Cities' },
      { name: 'Durban', coordinates: [31.0218, -29.8587], category: 'Cities' },
      { name: 'Kruger National Park', coordinates: [31.4857, -23.9884], category: 'Nature' },
      { name: 'Table Mountain', coordinates: [18.4156, -33.9628], category: 'Nature' },
      { name: 'Robben Island', coordinates: [18.3683, -33.8068], category: 'Historical & Cultural' },
    ],
    scale: 2400,
  },
  zimbabwe: {
    center: [29.1549, -19.0154],
    markers: [
      { name: 'Harare', coordinates: [31.0522, -17.8292], category: 'Cities' },
      { name: 'Bulawayo', coordinates: [28.5856, -20.1322], category: 'Cities' },
      { name: 'Victoria Falls', coordinates: [25.8485, -17.9243], category: 'Nature' },
      { name: 'Hwange National Park', coordinates: [26.9476, -18.6414], category: 'Nature' },
      { name: 'Great Zimbabwe', coordinates: [30.9341, -20.2679], category: 'Historical & Cultural' },
    ],
    scale: 4500,
  },
};

export const flags = {
  algeria: 'https://flagcdn.com/w320/dz.png',
  angola: 'https://flagcdn.com/w320/ao.png',
  benin: 'https://flagcdn.com/w320/bj.png',
  'burkina-faso': 'https://flagcdn.com/w320/bf.png',
  burundi: 'https://flagcdn.com/w320/bi.png',
  cameroon: 'https://flagcdn.com/w320/cm.png',
  'central-african-republic': 'https://flagcdn.com/w320/cf.png',
  chad: 'https://flagcdn.com/w320/td.png',
  comoros: 'https://flagcdn.com/w320/km.png',
  'congo-democratic-republic-of-the': 'https://flagcdn.com/w320/cd.png',
  'congo-republic-of-the': 'https://flagcdn.com/w320/cg.png',
  djibouti: 'https://flagcdn.com/w320/dj.png',
  egypt: 'https://flagcdn.com/w320/eg.png',
  'equatorial-guinea': 'https://flagcdn.com/w320/gq.png',
  eritrea: 'https://flagcdn.com/w320/er.png',
  eswatini: 'https://flagcdn.com/w320/sz.png',
  ethiopia: 'https://flagcdn.com/w320/et.png',
  gabon: 'https://flagcdn.com/w320/ga.png',
  gambia: 'https://flagcdn.com/w320/gm.png',
  ghana: 'https://flagcdn.com/w320/gh.png',
  guinea: 'https://flagcdn.com/w320/gn.png',
  'guinea-bissau': 'https://flagcdn.com/w320/gw.png',
  'ivory-coast': 'https://flagcdn.com/w320/ci.png',
  kenya: 'https://flagcdn.com/w320/ke.png',
  lesotho: 'https://flagcdn.com/w320/ls.png',
  liberia: 'https://flagcdn.com/w320/lr.png',
  libya: 'https://flagcdn.com/w320/ly.png',
  madagascar: 'https://flagcdn.com/w320/mg.png',
  malawi: 'https://flagcdn.com/w320/mw.png',
  mali: 'https://flagcdn.com/w320/ml.png',
  mauritania: 'https://flagcdn.com/w320/mr.png',
  mauritius: 'https://flagcdn.com/w320/mu.png',
  morocco: 'https://flagcdn.com/w320/ma.png',
  mozambique: 'https://flagcdn.com/w320/mz.png',
  namibia: 'https://flagcdn.com/w320/na.png',
  niger: 'https://flagcdn.com/w320/ne.png',
  nigeria: 'https://flagcdn.com/w320/ng.png',
  rwanda: 'https://flagcdn.com/w320/rw.png',
  'sao-tome-and-principe': 'https://flagcdn.com/w320/st.png',
  senegal: 'https://flagcdn.com/w320/sn.png',
  seychelles: 'https://flagcdn.com/w320/sc.png',
  'sierra-leone': 'https://flagcdn.com/w320/sl.png',
  somalia: 'https://flagcdn.com/w320/so.png',
  'south-africa': 'https://flagcdn.com/w320/za.png',
  'south-sudan': 'https://flagcdn.com/w320/ss.png',
  sudan: 'https://flagcdn.com/w320/sd.png',
  tanzania: 'https://flagcdn.com/w320/tz.png',
  togo: 'https://flagcdn.com/w320/tg.png',
  uganda: 'https://flagcdn.com/w320/ug.png',
  zambia: 'https://flagcdn.com/w320/zm.png',
  zimbabwe: 'https://flagcdn.com/w320/zw.png',
};

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

export const networkURLs = {
  title: 'My Tribe (Coming Soon)',
  items: [
    { label: 'Chat Room', hasSubcategories: false },
    { label: 'Round Tables', hasSubcategories: false },
    { label: 'Jobs', hasSubcategories: false },
  ],
  image: demoImage,
};

export const eventTypes = [
  {
    label: 'Business Events',
    value: 'Business',
    items: [
      { label: 'Trade Shows', value: 'Trade Shows' },
      { label: 'Conventions', value: 'Conventions' },
      { label: 'Conferences & Seminars', value: 'Conferences & Seminars' },
      { label: 'Product Launches', value: 'Product Launches' },
      { label: 'Training & Workshops', value: 'Training & Workshops' },
      { label: 'Networking', value: 'Networking' },
      { label: 'Others', value: 'Others' },
    ],
  },
  {
    label: 'Entertainment',
    value: 'Entertainment',
    items: [
      { label: 'Arts', value: 'Arts' },
      { label: 'Cultural Events & Festivals', value: 'Cultural Events & Festivals' },
      { label: 'Dance', value: 'Dance' },
      { label: 'Fashion', value: 'Fashion' },
      { label: 'Music', value: 'Music' },
      { label: 'Theater & Comedy', value: 'Theater & Comedy' },
      { label: 'Others', value: 'Others' },
    ],
  },
  {
    label: 'Sports',
    value: 'Sports',
    items: [
      { label: 'Boxing', value: 'Boxing' },
      { label: 'Football', value: 'Football' },
      { label: 'Marathons', value: 'Marathons' },
      { label: 'Races', value: 'Races' },
      { label: 'Racket Sports', value: 'Racket Sports' },
      { label: 'Wrestling', value: 'Wrestling' },
      { label: 'Others', value: 'Others' },
    ],
  },
];

export const africanCountriesPhoneCodes = [
  { value: '+27', label: 'South Africa' },
  { value: '+234', label: 'Nigeria' },
  { value: '+233', label: 'Ghana' },
  { value: '+254', label: 'Kenya' },
  { value: '+20', label: 'Egypt' },
];
// -----------Must see and do --------------
export const msadCategories = [
  { category: 'action-enthusiasts', title: 'Action Enthusiasts' },
  { category: 'historical-cultural-sites', title: 'Historical & Cultural Sites' },
  { category: 'nature', title: 'Nature' },
  { category: 'sacred-sites', title: 'Sacred Sites' },
  { category: 'excursions', title: 'Excursions' },
  { category: 'voluntourism', title: 'Voluntourism' },
];
