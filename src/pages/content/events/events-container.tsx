import EventsScreen from './events-screen';

import demo from '../../../assets/branding-bg-dark.png';

const data = [
  {
    image: demo,
    date: '30th sep, 2024',
    time: '11pm',
    title: 'DJ Suresh',
    description: '',
    location: 'beach mida',
    country: 'gambia',
    website: 'www.mana-event.com',
    phone: '9999999999',
    whatsapp: '9999999999',
    amount: '9500',
  },
  {
    image: demo,
    date: '30th sep, 2024',
    time: '11pm',
    title: 'DJ Suresh',
    description: '',
    location: 'beach mida',
    country: 'gambia',
    website: 'www.mana-event.com',
    phone: '9999999999',
    whatsapp: '9999999999',
    amount: '9500',
  },
];

const EventsPage = () => {
  return <EventsScreen heading={'Trade Shows'} image={demo} data={data} />;
};

export default EventsPage;
