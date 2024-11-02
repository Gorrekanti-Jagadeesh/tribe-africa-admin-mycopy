// screens/UpcomingEventsScreen.tsx

import CardsGrid from '../../../molecules/layout/cards-grid';

interface EventData {
  image: string;
  title: string;
  onClick: () => void;
  isOverlay: boolean;
  overlayText?: string;
}

interface UpcomingEventsScreenProps {
  data: EventData[];
}

const UpcomingEventsScreen: React.FC<UpcomingEventsScreenProps> = ({ data }) => {
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

export default UpcomingEventsScreen;
