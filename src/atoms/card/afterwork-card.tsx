import React from 'react';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { accommodationCardProps } from '@/types';
import { sanityImageUrlBuilder } from '@api/index';
import { toKebabCase } from '@utils/common';

const AfterWorkCard: React.FC<{
  data: accommodationCardProps;
  country: string;
  category: string;
  subCategory: string;
}> = ({ data, country, category, subCategory }) => {
  const { images, title, _id } = data;
  const { pageType } = useParams();
  const navigate = useNavigate();
  return (
    <div className="border rounded-[10px] shadow-sm overflow-hidden">
      <img
        src={sanityImageUrlBuilder(images).url()}
        alt={title}
        className="w-full aspect-video rounded-lg h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center text-brand-orange mt-1">
          {/* <StarRating rating={getAverageOfObjectValues(data?.reviews?.fields)} type="brief" />
          <span className="text-gray-500 ml-2 text-sm">{data?.reviews?.count} reviews</span> */}
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <FontAwesomeIcon icon={faMap} />
          <span className="ml-2">{'5 km'}</span>
        </div>
        <hr className="my-2" />
        <div className="flex">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">From</span>
            <span className="font-bold text-lg mx-2">{data.amount}</span>
          </div>
          <button
            className="w-fit ms-auto bg-brand-orange hover:bg-gray-700 text-white font-semibold  p-2 rounded-md"
            onClick={() => {
              navigate(
                `/${toKebabCase(country)}/${pageType}/${toKebabCase(category)}/afterwork/${toKebabCase(subCategory)}/${_id}`,
                { state: { data } }
              );
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default AfterWorkCard;
