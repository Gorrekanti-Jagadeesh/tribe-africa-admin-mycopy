import React from 'react';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StarRating } from '../rating/star-rating';

import { useNavigate } from 'react-router-dom';

import { accommodationCardProps } from '../../types/index';
import { sanityImageUrlBuilder } from '@api/index';
import { toKebabCase } from '@utils/common';
import { getAverageOfObjectValues } from '@utils/common';

const AccommodationCard: React.FC<{ data: accommodationCardProps; country: string; category: string }> = ({
  data,
  country,
  category,
}) => {
  const { images, name, _id } = data;
  const navigate = useNavigate();
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <img
        src={sanityImageUrlBuilder(images).url()}
        alt={name}
        className="w-full aspect-video rounded-lg h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center text-orange-500 mt-1">
          <StarRating rating={getAverageOfObjectValues(data.reviews.fields)} />
          <span className="text-gray-500 ml-2 text-sm">{data.reviews.count} reviews</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <FontAwesomeIcon icon={faMap} />
          <span>{'5 km'}</span>
        </div>
        <hr className="my-2" />
        <div className="flex">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">From</span>
            <span className="font-bold text-lg mx-2">{data.amount}</span>
          </div>
          <button
            className="w-fit ms-auto bg-gray-500 hover:bg-gray-700 text-white font-semibold  p-2 rounded-md"
            onClick={() => {
              navigate(`/${toKebabCase(country)}/${toKebabCase(category)}/${_id}`, { state: { data } });
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
