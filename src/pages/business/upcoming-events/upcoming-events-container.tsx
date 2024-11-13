// containers/UpcomingEventsContainer.tsx

import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { upcomingEvents } from '../../../data';
import UpcomingEventsScreen from './upcoming-events-screen';

interface EventData {
  image: string;
  title: string;
  onClick: () => void;
  isOverlay: boolean;
  overlayText?: string;
}

const UpcomingEventsContainer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<EventData[]>([]);

  useEffect(() => {
    setData(
      upcomingEvents.map((item) => ({
        image: item.image,
        title: item.title,
        onClick: () => navigate(item.redirectUrl),
        isOverlay: !!item.description,
        overlayText: item.description,
      }))
    );
  }, [navigate]);

  return <UpcomingEventsScreen data={data} />;
};

export default UpcomingEventsContainer;
