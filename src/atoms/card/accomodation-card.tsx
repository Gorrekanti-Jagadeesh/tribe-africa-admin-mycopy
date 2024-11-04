import React from 'react';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

interface AccommodationCardProps {
  image: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  price: string;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ image, name, rating, reviewCount, distance, price }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} className={i < rating ? 'text-orange-500' : 'text-gray-300'} />);
    }
    return stars;
  };

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <img src={image} alt={name} className="w-full aspect-video rounded-lg h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center text-orange-500 mt-1">
          {renderStars()}
          <span className="text-gray-500 ml-2 text-sm">{reviewCount} reviews</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <FaMapMarkerAlt className="mr-1" />
          <span>{distance}</span>
        </div>
        <hr className="my-2" />
        <div className="flex">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">From</span>
            <span className="font-bold text-lg mx-2">{price}</span>
          </div>
          <button className="w-fit ms-auto bg-gray-500 hover:bg-gray-700 text-white font-semibold  p-2 rounded-md">
            View Hotel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
