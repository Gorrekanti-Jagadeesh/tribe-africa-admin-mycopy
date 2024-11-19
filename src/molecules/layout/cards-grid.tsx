import React, { ReactNode } from 'react';
import OverLayCard from '../../atoms/card/overlay-card';
import FeaturedCard from '../../atoms/card/featured-card';

interface featured {
  title: string;
  redirectUrl: string;
  urlPlaceholder: string;
}

interface content {
  image: string;
  title?: string;
  isOverlay?: boolean;
  overlayText?: string;
  onClick?: () => void;
}

interface cardsProps {
  heading?: ReactNode;
  data: content[];
  max?: number;
  featuredCard?: featured;
}

const CardsGrid: React.FC<cardsProps> = ({ heading, data, max, featuredCard }) => {
  return (
    <div className="max-w-6xl m-auto">
      <h2 className="text-4xl my-4">{heading}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {data.slice(0, max).map((item, index) => (
          <OverLayCard data={item} key={index} />
        ))}
        {featuredCard && max && data.length < max && (
          <FeaturedCard
            title={featuredCard.title}
            redirectUrl={featuredCard.redirectUrl}
            UrlPlaceholder={featuredCard.urlPlaceholder}
          />
        )}
      </div>
    </div>
  );
};

export default CardsGrid;
