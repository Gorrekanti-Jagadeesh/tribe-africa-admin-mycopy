import React from 'react';
import AccommodationCard from '../../../atoms/card/accomodation-card';
import demo from '../../../assets/homepage-welcome-image.png';

const AccomodationScreen = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <AccommodationCard
        image={demo}
        name="Hotel XYZ"
        rating={4} // The number of filled stars
        reviewCount={50}
        distance="1.7 km"
        price="AFN 9,430"
      />
    </div>
  );
};

export default AccomodationScreen;
