import React from 'react';
import { StarRating } from '../rating/star-rating';
import { ReviewProps } from '../../types';
import { sanityImageUrlBuilder } from '../../api';

import { demoImage } from '@data/index';

interface ReviewCardProps {
  data: ReviewProps;
}

const demoUser = {
  image: demoImage,
  user_name: 'candidate',
};

const ReviewCard: React.FC<ReviewCardProps> = ({ data }) => {
  const { content, images, ratings, submitted_by, created_at } = data;

  const calculateTotal = () => {
    let total = 0;
    ratings.forEach((rating) => (total += typeof rating.score == 'string' ? parseInt(rating.score) : rating.score));
    return Math.floor(total / ratings.length);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col md:flex-row">
      {/* User Information */}
      <div className="flex flex-grow">
        <div className="flex-shrink-0 mr-2">
          {demoUser.image ? (
            <img src={demoUser.image} alt={demoUser.user_name} className="w-12 h-12 rounded-md" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-semibold">
              {demoUser.user_name?.charAt(0).toUpperCase() || submitted_by}
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex gap-4 items-center">
            <h3 className="font-semibold text-lg">{demoUser.user_name}</h3>
            <span className="text-gray-500 text-sm">{created_at}</span>
          </div>
          {/* <StarRating className='inline-block md:hidden' rating={total} /> */}
          <p className="text-gray-600 mt-2">{content}</p>

          {/* Review Images */}
          <div className="flex mt-4 space-x-2 overflow-auto">
            {images &&
              images.map((image, index) => (
                <img
                  key={index}
                  src={sanityImageUrlBuilder(image.asset._ref).url()}
                  alt={`Review image ${index + 1}`}
                  className="w-28 aspect-square object-cover rounded-lg"
                />
              ))}
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="w-full md:w-fit p-4 h-fit border rounded-lg border-orange-500">
        <div className="space-y-2 min-w-56">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold whitespace-nowrap">In Total</span>
            <StarRating rating={calculateTotal()} />
          </div>
          <hr className="border border-black" />
          {ratings.map((rating) => (
            <div className="flex gap-2 justify-between items-center" key={rating.title}>
              <span className="text-sm w-[40%]">{rating.title}</span>
              <StarRating rating={rating.score} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

// TODO:
// Get user details(username, image) with the userid in submitted_by key.
