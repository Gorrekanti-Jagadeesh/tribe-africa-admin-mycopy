import React from 'react';
import Button from '../../atoms/custom-button/button';
import AccommodationCard from '../../atoms/card/accomodation-card';

interface AccommodationListProps {
  data: {
    image: string;
    name: string;
    rating: string;
    review_count: string;
    distance: string;
    price: string;
  }[];
}

const AccomodationsList: React.FC<AccommodationListProps> = ({ data }) => {
  return (
    <div>
      <div className="flex mb-4">
        <h1 className="text-4xl font-bold">Accomodations</h1>
        <Button className="ms-auto">List your accomodation</Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {data.map((item, index) => (
          <AccommodationCard
            key={index}
            image={item.image}
            name={item.name}
            rating={item.rating}
            reviewCount={item.review_count}
            distance={item.distance}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default AccomodationsList;
