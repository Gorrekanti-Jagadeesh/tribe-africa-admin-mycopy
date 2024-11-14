import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { upcomingEvents } from '../../../data';
import CardsGrid from '../../../molecules/layout/cards-grid';

interface EventData {
  image: string;
  title: string;
  onClick: () => void;
  isOverlay: boolean;
  overlayText?: string;
}

const UpcomingEvents: React.FC = () => {
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

  return (
    <div>
      <CardsGrid
        heading={
          <>
            Upcoming <span className="font-serif text-orange-500">Events</span>
          </>
        }
        max={6}
        data={data}
        featuredCard={{
          title: 'List your event here',
          redirectUrl: 'https://google.com',
          urlPlaceholder: 'Click to know more',
        }}
      />
    </div>
  );
};

export default UpcomingEvents;
