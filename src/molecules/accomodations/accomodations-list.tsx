import React from 'react';
import Button from '../../atoms/custom-button/button';
import AccommodationCard from '../../atoms/card/accomodation-card';

interface AccommodationListProps {
  hotelData: any[];
}

const AccommodationsList: React.FC<AccommodationListProps> = ({ hotelData }) => {
  return (
    <div>
      <div className="flex mb-4">
        <h1 className="text-4xl font-bold">Accommodations</h1>
        <Button className="ms-auto">List your accommodation</Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {hotelData.map((item) => (
          <AccommodationCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default AccommodationsList;
