import React from 'react';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { accommodationCardProps } from '@/types';
import { sanityImageUrlBuilder } from '@api/index';
import { fromKebabCase, toKebabCase } from '@utils/common';

const AccommodationCard: React.FC<{
  data: accommodationCardProps;
  country: string;
  category: string;
  subCategory: string;
}> = ({ data, country, category, subCategory }) => {
  const { images, title, _id } = data;
  const { pageType } = useParams();
  const navigate = useNavigate();

  return (
    <div className="border rounded-[10px] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={sanityImageUrlBuilder(images).url()}
        alt={title}
        className="w-full object-cover"
        style={{ aspectRatio: '16/9', height: '200px' }}
      />
      <div className="p-4">
        <h3 className="font-poppins font-semibold text-xl">{title}</h3>
        <div className="flex items-center text-brand-orange mt-1" />
        <div className="flex items-center text-gray-500 text-sm mt-2 gap-2">
          <FontAwesomeIcon icon={faMap} />
          <span className="font-poppins">5 km</span>
        </div>
        <hr className="my-3 border-gray-200" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-poppins text-sm text-gray-500">From</span>
            <span className="font-poppins font-bold text-xl">{data.amount}</span>
          </div>
          <button
            className="bg-brand-orange hover:bg-[#E05A00] text-white font-poppins font-semibold px-4 py-2 rounded-[10px] transition-colors"
            onClick={() => {
              navigate(
                `/${toKebabCase(country)}/${pageType}/${toKebabCase(category)}/${toKebabCase(subCategory)}/${_id}`,
                { state: { data } }
              );
            }}
          >
            View {fromKebabCase(subCategory)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
