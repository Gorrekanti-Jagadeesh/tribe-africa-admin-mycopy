import React from 'react';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StarRating } from '../rating/star-rating';

import { useNavigate } from 'react-router-dom';

// Define the props interface
interface AccommodationCardProps {
  data: {
    _id: string;
    name: string;
    phone_number: string;
    website_url: string;
    location: string;
    rate: string;
    description: string;
    created_at: string;
    images: string[];
  };
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ data }) => {
  const { images, name, rate, _id } = data;
  const navigate = useNavigate();
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <img src={images[0].toString()} alt={name} className="w-full aspect-video rounded-lg h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center text-orange-500 mt-1">
          <StarRating rating={'3'} />
          <span className="text-gray-500 ml-2 text-sm">101 reviews</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <FontAwesomeIcon icon={faMap} />
          <span>{'5 km'}</span>
        </div>
        <hr className="my-2" />
        <div className="flex">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">From</span>
            <span className="font-bold text-lg mx-2">{rate}</span>
          </div>
          <button
            className="w-fit ms-auto bg-gray-500 hover:bg-gray-700 text-white font-semibold  p-2 rounded-md"
            onClick={() => {
              navigate(`/accomodations/${_id}`, { state: { data } });
            }}
          >
            View Hotel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
