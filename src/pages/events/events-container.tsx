import { useNavigate, useParams } from 'react-router';
import EventsScreen from './events-screen';
import demo from '@assets/homepage-welcome-image-3.png';
import { useEffect, useState } from 'react';
import { getDataByEntryType } from '../../api';
import { eventTypes } from '../../data';

const EventsPage = () => {
  const [data, setData] = useState([]);
  const [eventInfo, setEventInfo] = useState<{ title: string; value: string }>({
    title: '',
    value: '',
  });
  const { event_type } = useParams();
  const navigate = useNavigate();

  const findEventByValue = (value: string = '') => {
    for (const category of eventTypes) {
      const foundItem = category.items.find((item) => item.value === value);
      if (foundItem) {
        return foundItem;
      }
    }
    return { title: '', value: '' };
  };

  useEffect(() => {
    const event = findEventByValue(event_type);
    if (!event.title) {
      navigate('/events');
    } else {
      setEventInfo(event);
    }
  }, [event_type, navigate]);

  useEffect(() => {
    getDataByEntryType('event', `type == "${event_type}"`)
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, [event_type]);

  return <EventsScreen heading={eventInfo.title} image={demo} data={data} />;
};

export default EventsPage;
